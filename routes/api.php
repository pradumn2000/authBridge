<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\BGVCase;
use App\Models\User;

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
Route::post('/login', function (Request $request) {

    $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user = Auth::user();

    // Disabled non-admin accounts cannot log in. Admins are always
    // treated as active regardless of what's stored (belt-and-suspenders
    // with the User model's saving() guard).
    if ($user->role !== 'admin' && $user->status !== 'active') {
        Auth::logout(); // undo the session Auth::attempt() just created
        return response()->json(['message' => 'Your account has been disabled. Please contact an administrator.'], 403);
    }

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user'  => [
            'id'           => $user->id,
            'name'         => $user->name,
            'email'        => $user->email,
            'role'         => $user->role,
            'status'       => $user->status,
            'billingMode'  => $user->billing_mode,
            'agreedChecks' => $user->agreed_checks,
            'checkRates'   => $user->check_rates,
            'checkTat'     => $user->check_tat,
        ],
    ]);
});

// ─────────────────────────────────────────
// CLIENT SELF-REGISTRATION (pending approval)
// ─────────────────────────────────────────
Route::post('/client-registrations', function (Request $request) {
    $request->validate([
        'companyName'    => 'required|string|max:255',
        'address'        => 'required|string|max:1000',
        'gstin'          => 'required|string|max:15',
        'primaryContact' => 'required|string|max:255',
        'contactPhone'   => 'nullable|string|max:20',
        'contactEmail'   => 'required|email|unique:client_registrations,contact_email',
        'billingMode'    => 'nullable|in:prepaid_client,prepaid_candidate,postpaid_client',
        'agreedChecks'   => 'required|array|min:1',
        'agreedChecks.*' => 'in:employment,education,address,database,criminal,drug,court',
        'notes'          => 'nullable|string',
    ]);

    $reg = \App\Models\ClientRegistration::create([
        'company_name'    => $request->companyName,
        'address'         => $request->address,
        'gstin'           => $request->gstin,
        'primary_contact' => $request->primaryContact,
        'contact_phone'   => $request->contactPhone,
        'contact_email'   => $request->contactEmail,
        'billing_mode'    => $request->billingMode,
        'agreed_checks'   => $request->agreedChecks,
        'notes'           => $request->notes,
        'status'          => 'pending',
    ]);

    // Notify admins
    $adminEmails = \App\Models\User::where('role', 'admin')->pluck('email');
    if ($adminEmails->isNotEmpty()) {
        \Illuminate\Support\Facades\Mail::raw(
            "New client registration from {$reg->company_name} ({$reg->contact_email}). Review it under Pending Registrations.",
            fn($m) => $m->to($adminEmails->all())->subject('New Client Registration — ' . $reg->company_name)
        );
    }

    return response()->json([
        'message'      => 'Registration submitted. An admin will review your account shortly.',
        'registration' => ['id' => $reg->id, 'status' => $reg->status],
    ], 201);
});

// ─────────────────────────────────────────
// REGISTER (individual user — unrelated to client company registration)
// ─────────────────────────────────────────
Route::post('/register', function (Request $request) {

    $request->validate([
        'name'     => 'required',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|min:8',
    ]);

    $user = \App\Models\User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
        'role'     => 'client',
    ]);

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user], 201);
});

// ─────────────────────────────────────────
// CLIENT COMPANY REGISTER — admin-authenticated Add Client submission.
// Also used to approve a pending self-registration (pass registrationId).
// ─────────────────────────────────────────
Route::post('/clients/register', function (Request $request) {
    // FormData sends checks/rates/tat as JSON strings (nested objects can't
    // ride in multipart form fields directly) — decode them back into
    // arrays before validating.
    foreach (['agreedChecks', 'checkRates', 'checkTat'] as $jsonField) {
        if (is_string($request->input($jsonField))) {
            $request->merge([$jsonField => json_decode($request->input($jsonField), true) ?? []]);
        }
    }

    $request->validate([
        'companyName'        => 'required|string|max:255',
        'address'            => 'required|string|max:1000',
        'gstin'              => 'required|string|max:15',
        'primaryContact'     => 'required|string|max:255',
        'contactPhone'       => 'nullable|string|max:20',
        'contactEmail'       => 'required|email|unique:users,email',
        'password'           => 'required|digits:8',
        'billingMode'        => 'required|in:prepaid_client,prepaid_candidate,postpaid_client',
        'agreedChecks'       => 'required|array|min:1',
        'agreedChecks.*'     => 'in:employment,education,address,database,criminal,drug,court',
        'checkRates'         => 'nullable|array',
        'checkRates.*'       => 'numeric|min:0',
        'checkTat'           => 'nullable|array',
        'checkTat.*'         => 'numeric|min:0',
        'notes'              => 'nullable|string',
        'registrationId'     => 'nullable|integer|exists:client_registrations,id',
        'agreementStartDate' => 'nullable|date',
        'agreementEndDate'   => 'nullable|date|after_or_equal:agreementStartDate',
        'agreement'          => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png',
    ]);

    // Calculate total amount from selected checks
    $totalAmount = 0;
    foreach ($request->agreedChecks as $check) {
        $rate = $request->checkRates[$check] ?? 1500; // fallback rate
        $totalAmount += $rate;
    }

    $agreementPath = null;
    if ($request->hasFile('agreement')) {
        $agreementPath = $request->file('agreement')->store('agreements', 'public');
    }

    $user = User::create([
        'name'                 => $request->companyName,
        'email'                => $request->contactEmail,
        'password'             => Hash::make($request->password),
        'role'                 => 'client',
        'address'              => $request->address,
        'gstin'                => $request->gstin,
        'primary_contact'      => $request->primaryContact,
        'contact_phone'        => $request->contactPhone,
        'billing_mode'         => $request->billingMode,
        'agreed_checks'        => $request->agreedChecks,
        'check_rates'          => $request->checkRates ?? [],
        'check_tat'            => $request->checkTat ?? [],
        'total_amount'         => $totalAmount,
        'notes'                => $request->notes,
        'agreement_path'       => $agreementPath,
        'agreement_start_date' => $request->agreementStartDate,
        'agreement_end_date'   => $request->agreementEndDate,
    ]);

    if ($request->registrationId) {
        \App\Models\ClientRegistration::where('id', $request->registrationId)
            ->update(['status' => 'converted', 'converted_user_id' => $user->id]);
    }

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json([
        'message' => 'Client registered successfully',
        'token'   => $token,
        'user'    => [
            'id'           => $user->id,
            'name'         => $user->name,
            'email'        => $user->email,
            'role'         => $user->role,
            'address'      => $user->address,
            'billingMode'  => $user->billing_mode,
            'agreedChecks' => $user->agreed_checks,
            'checkRates'   => $user->check_rates,
            'checkTat'     => $user->check_tat,
            'totalAmount'  => $totalAmount,
        ],
    ], 201);
});

// ─────────────────────────────────────────
// FORGOT PASSWORD — Step 1: Send OTP
// ─────────────────────────────────────────
Route::post('/forgot-password', function (Request $request) {

    $request->merge(['email' => trim(strtolower($request->email))]);
    $request->validate(['email' => 'required|email|exists:users,email']);

    $otp = rand(1000, 9999);

    DB::table('password_resets')->updateOrInsert(
        ['email' => $request->email],
        ['token' => $otp, 'verified' => false, 'created_at' => now()]
    );

    Mail::raw("Your OTP code is: $otp \nThis code expires in 10 minutes.", function ($message) use ($request) {
        $message->to($request->email)->subject('Password Reset OTP');
    });

    return response()->json(['message' => 'OTP sent successfully']);
});

// ─────────────────────────────────────────
// VERIFY OTP — Step 2
// ─────────────────────────────────────────
Route::post('/verify-otp', function (Request $request) {

    $request->merge(['email' => trim(strtolower($request->email))]);
    $request->validate(['email' => 'required|email', 'otp' => 'required|digits:4']);

    $record = DB::table('password_resets')->where('email', $request->email)->first();

    if (!$record) {
        return response()->json(['message' => 'OTP not found. Please request a new one.'], 400);
    }

    if (now()->diffInMinutes($record->created_at) > 10) {
        DB::table('password_resets')->where('email', $request->email)->delete();
        return response()->json(['message' => 'OTP has expired. Please request a new one.'], 400);
    }

    if ($record->token != $request->otp) {
        return response()->json(['message' => 'Invalid OTP. Please try again.'], 400);
    }

    DB::table('password_resets')->where('email', $request->email)->update(['verified' => true]);

    return response()->json(['message' => 'OTP verified successfully']);
});

// ─────────────────────────────────────────
// RESET PASSWORD — Step 3
// ─────────────────────────────────────────
Route::post('/reset-password', function (Request $request) {

    $request->merge(['email' => trim(strtolower($request->email))]);
    $request->validate([
        'email'                 => 'required|email',
        'password'              => 'required|min:6|confirmed',
        'password_confirmation' => 'required',
    ]);

    $record = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('verified', true)
        ->first();

    if (!$record) {
        return response()->json(['message' => 'Please verify your OTP before resetting password.'], 403);
    }

    $user = \App\Models\User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    $user->update(['password' => Hash::make($request->password)]);
    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password reset successful. You can now log in.']);
});

// ─────────────────────────────────────────
// DEV HELPERS (remove in production)
// ─────────────────────────────────────────
Route::get('/create-admin', function () {
    $user = \App\Models\User::updateOrCreate(
        ['email' => 'admin@satyapan.com'],
        ['name' => 'Admin', 'password' => Hash::make('Admin@123'), 'role' => 'admin']
    );
    return response()->json(['message' => 'Admin created', 'user' => $user]);
});

Route::get('/test-password', function () {
    $user = \App\Models\User::where('email', 'admin@satyapan.com')->first();
    if (!$user) return response()->json(['message' => 'Admin user not found']);
    return response()->json([
        'exists'         => true,
        'email'          => $user->email,
        'password_match' => Hash::check('Admin@123', $user->password),
    ]);
});

// ─────────────────────────────────────────
// CANDIDATE-FACING (public, token-gated)
// ─────────────────────────────────────────

$normalizeCheckKey = function ($key) {
    $map = [
        'emp' => 'employment', 'edu' => 'education', 'addr' => 'address', 'db' => 'database',
        'drug_test' => 'drug', 'courtroom' => 'court',
    ];
    return $map[$key] ?? $key;
};

Route::get('/candidate-link/{token}', function ($token) use ($normalizeCheckKey) {
    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);

    if ($link->expires_at && now()->greaterThan($link->expires_at)) {
        return response()->json(['message' => 'Link expired', 'expired' => true], 410);
    }
    if ($link->status === 'submitted') {
        return response()->json(['message' => 'Already submitted', 'submitted' => true], 200);
    }

    $checks = collect($link->checks ?? [])->map($normalizeCheckKey)->values()->all();
    $case = $link->case_id ? BGVCase::where('case_id', $link->case_id)->first() : null;

    return response()->json([
        'link' => [
            'candidateName' => $link->candidate_name,
            'email'         => $link->email,
            'mobile'        => $link->mobile,
            'position'      => $link->position,
            'caseId'        => $link->case_id,
            'checkType'     => $link->check_type ? $normalizeCheckKey($link->check_type) : null,
            'checks'        => $checks,
            'expiresAt'     => $link->expires_at,
        ],
        'checkDetails' => $case?->check_details ?? [],
    ]);
});

Route::patch('/candidate-link/{token}/fields', function (Request $request, $token) use ($normalizeCheckKey) {
    $request->validate(['check_type' => 'required|string', 'fields' => 'required|array']);

    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);
    if ($link->expires_at && now()->greaterThan($link->expires_at)) {
        return response()->json(['message' => 'Link expired'], 410);
    }
    if (!$link->case_id) return response()->json(['message' => 'This link has no linked case'], 422);

    $checkType = $normalizeCheckKey($request->check_type);
    $allowed   = collect($link->checks ?? [])->map($normalizeCheckKey)->push('general')->all();
    if (!in_array($checkType, $allowed)) {
        return response()->json(['message' => 'Check type not permitted for this link'], 403);
    }

    $case = BGVCase::where('case_id', $link->case_id)->first();
    if (!$case) return response()->json(['message' => 'Case not found'], 404);

    $details = $case->check_details ?? [];
    $details[$checkType]['fields']    = $request->fields;
    $details[$checkType]['documents'] = $details[$checkType]['documents'] ?? [];
    $case->check_details = $details;
    $case->save();

    return response()->json(['message' => 'Saved']);
});

Route::post('/candidate-link/{token}/documents', function (Request $request, $token) use ($normalizeCheckKey) {
    $request->validate([
        'check_type'   => 'required|string',
        'document_key' => 'required|string',
        'file'         => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png',
    ]);

    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);
    if ($link->expires_at && now()->greaterThan($link->expires_at)) {
        return response()->json(['message' => 'Link expired'], 410);
    }
    if (!$link->case_id) return response()->json(['message' => 'This link has no linked case'], 422);

    $checkType = $normalizeCheckKey($request->check_type);
    $allowed   = collect($link->checks ?? [])->map($normalizeCheckKey)->push('general')->all();
    if (!in_array($checkType, $allowed)) {
        return response()->json(['message' => 'Check type not permitted for this link'], 403);
    }

    $case = BGVCase::where('case_id', $link->case_id)->first();
    if (!$case) return response()->json(['message' => 'Case not found'], 404);

    $path = $request->file('file')->store("case-documents/{$case->case_id}/{$checkType}", 'public');
    $url  = \Illuminate\Support\Facades\Storage::disk('public')->url($path);

    $details = $case->check_details ?? [];
    $details[$checkType]['documents'][$request->document_key] = [
        'name'        => $request->file('file')->getClientOriginalName(),
        'path'        => $path,
        'url'         => $url,
        'uploaded_by' => 'candidate',
        'uploaded_at' => now()->toDateTimeString(),
    ];
    $details[$checkType]['fields'] = $details[$checkType]['fields'] ?? [];
    $case->check_details = $details;
    $case->save();

    return response()->json(['message' => 'Uploaded', 'url' => $url]);
});

Route::post('/candidate-link/{token}/submit', function (Request $request, $token) {
    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);
    if ($link->expires_at && now()->greaterThan($link->expires_at)) {
        return response()->json(['message' => 'Link expired'], 410);
    }

    $link->update(['status' => 'submitted']);

    if ($link->case_id) {
        $case = BGVCase::where('case_id', $link->case_id)->first();
        if ($case && $case->status === 'pending') {
            $case->update(['status' => 'in-progress']);
        }
        if ($case) {
            \App\Models\CaseEvent::log(
                $case->case_id,
                'candidate_submitted',
                'Candidate submitted documents',
                $link->check_type
                    ? ucfirst($link->check_type) . ' info/documents submitted by candidate'
                    : 'Documents submitted by candidate',
                ['check_type' => $link->check_type, 'checks' => $link->checks],
                null
            );
        }
    }

    return response()->json(['message' => 'Submitted successfully']);
});


// ═════════════════════════════════════════
// PROTECTED ROUTES (Bearer token required)
// ═════════════════════════════════════════
Route::middleware('auth:sanctum')->group(function () {
        // ── CLIENT ACTIVITY NOTIFICATIONS ─────────────────────────
    Route::get('/notifications/client-activity', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $pending = \App\Models\ClientRegistration::where('status', 'pending')
            ->latest()
            ->take(10)
            ->get();

        $recent = \App\Models\User::where('role', 'client')
            ->where('created_at', '>=', now()->subDays(7))
            ->latest()
            ->take(10)
            ->get(['id', 'name', 'email', 'created_at']);

        return response()->json([
            'pending_registrations' => $pending,
            'recent_clients' => $recent
        ]);
    });

    // ── GET LOGGED-IN USER ───────────────────────────────────
    // Returns the same profile fields /login sends (billingMode,
    // agreedChecks, checkRates, checkTat) so a client landing here via
    // a share link — instead of a normal password login — still gets
    // everything AddCase.jsx needs to prefill their form.
    Route::get('/me', function (Request $request) {
        $user = $request->user();
        return response()->json([
            'user' => [
                'id'           => $user->id,
                'name'         => $user->name,
                'email'        => $user->email,
                'role'         => $user->role,
                'billingMode'  => $user->billing_mode,
                'agreedChecks' => $user->agreed_checks,
                'checkRates'   => $user->check_rates,
                'checkTat'     => $user->check_tat,
            ],
        ]);
    });

    // ── LOGOUT ───────────────────────────────────────────────
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    // ── CREATE USER (admin only) ─────────────────────────────
    Route::post('/users/create', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role'     => 'required|in:admin,allocator,verifier,check_manager,report_writing,pvt_qc,client,onboarding,employment_verifier,education_verifier,address_verifier,database_verifier,criminal_verifier,drug_test_verifier,courtroom_verifier',
        ]);

        $user = \App\Models\User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            // New users are always created active. If role is 'admin', the
            // User model's saving() guard enforces this too, so it can
            // never be flipped off later regardless of the caller.
            'status'   => 'active',
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user'    => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'role' => $user->role, 'status' => $user->status],
        ], 201);
    });

    // ── GET ALL USERS (admin + allocator) ────────────────────
    Route::get('/users', function (Request $request) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) {
            return response()->json(['message' => 'Unauthorized. Admin or allocator access required.'], 403);
        }

        $users = \App\Models\User::select('id', 'name', 'email', 'role', 'status', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users]);
    });

    // ── UPDATE USER STATUS — enable / disable (admin only) ───
    Route::patch('/users/{id}/status', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate(['status' => 'required|in:active,inactive']);

        $user = \App\Models\User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->role === 'admin' && $request->status !== 'active') {
            return response()->json(['message' => 'Admin accounts cannot be disabled.'], 422);
        }

        if ($user->id === $request->user()->id && $request->status !== 'active') {
            return response()->json(['message' => 'You cannot disable your own account.'], 422);
        }

        $user->update(['status' => $request->status]);

        return response()->json([
            'message' => 'User status updated',
            'user'    => ['id' => $user->id, 'status' => $user->status],
        ]);
    });

    // ── DELETE USER (admin only) ─────────────────────────────
    Route::delete('/users/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $user = \App\Models\User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'You cannot delete your own account'], 400);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    });

    // ═════════════════════════════════════════════════════════
    // CLIENT REGISTRATIONS (admin review)
    // ═════════════════════════════════════════════════════════

    Route::get('/client-registrations', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $query = \App\Models\ClientRegistration::orderByDesc('created_at');
        if ($request->status) {
            $query->where('status', $request->status);
        }

        return response()->json(['registrations' => $query->get()]);
    });

    Route::get('/client-registrations/pending-count', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        return response()->json(['count' => \App\Models\ClientRegistration::where('status', 'pending')->count()]);
    });

    Route::get('/client-registrations/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        $reg = \App\Models\ClientRegistration::find($id);
        if (!$reg) return response()->json(['message' => 'Not found'], 404);
        return response()->json(['registration' => $reg]);
    });

    Route::post('/client-registrations/{id}/reject', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }
        $reg = \App\Models\ClientRegistration::find($id);
        if (!$reg) return response()->json(['message' => 'Not found'], 404);
        $reg->update(['status' => 'rejected']);
        return response()->json(['message' => 'Registration rejected']);
    });

    // ═════════════════════════════════════════════════════════
    // CASES ROUTES
    // ═════════════════════════════════════════════════════════

    // ── CREATE CASE ──────────────────────────────────────────
    Route::post('/cases', function (Request $request) {
        $request->validate([
            'candidate_name'  => 'required|string|max:255',
            'candidate_email' => 'required|email',
            'candidate_dob'   => 'required|date',
            'client_name'     => 'required|string|max:255',
            'billing_mode'    => 'required|in:prepaid_client,prepaid_candidate,postpaid_client',
            'checks'          => 'required|array|min:1',
            'checks.*'        => 'in:employment,education,address,database,criminal,drug,court',
            'check_tat'       => 'nullable|array',
            'check_tat.*'     => 'numeric|min:0',
            'check_rates'     => 'nullable|array',   
'check_rates.*'   => 'numeric|min:0',       
            'overall_tat'     => 'nullable|numeric|min:0',
        ]);

        $case = BGVCase::create([
            'case_id'          => BGVCase::generateCaseId(),
            'candidate_name'   => $request->candidate_name,
            'candidate_email'  => $request->candidate_email,
            'candidate_mobile' => $request->candidate_mobile,
            'candidate_dob'    => $request->candidate_dob,
            'position'         => $request->position,
            'client_name'      => $request->client_name,
            'client_id'        => $request->client_id,
            'checks'           => $request->checks,
            'check_tat'        => $request->check_tat ?? [],
            'check_rates'      => $request->check_rates ?? [], 
            'overall_tat'      => $request->overall_tat ?? 0,
            'priority'         => $request->priority ?? 'normal',
            'billing_mode'     => $request->billing_mode,
            'payment_timing'   => $request->payment_timing,
            'invoice_cycle'    => $request->invoice_cycle,
            'po_number'        => $request->po_number,
            'total_amount'     => $request->total_amount ?? 0,
            'payment_link'     => $request->payment_link,
            'status'           => 'pending',
            'notes'            => $request->notes,
            'created_by'       => $request->user()->id,
        ]);

        \App\Models\CaseEvent::log(
            $case->case_id,
            'created',
            'Case created',
            "Case opened for {$case->candidate_name}",
            ['checks' => $case->checks, 'billing_mode' => $case->billing_mode],
            $request->user()
        );

        return response()->json(['case' => $case], 201);
    });

    // ── LIST CASES ────────────────────────────────────────────
    // Route::get('/cases', function (Request $request) {
    //     $user = $request->user();
    //     $query = BGVCase::orderByDesc('created_at');

    //     if ($user->role === 'client') {
    //         $query->where(function ($q) use ($user) {
    //             $q->where('client_id', $user->id)
    //               ->orWhere('created_by', $user->id);
    //         });
    //     }

    //     if ($request->search) {
    //         $s = $request->search;
    //         $query->where(function ($q) use ($s) {
    //             $q->where('case_id', 'like', "%$s%")
    //               ->orWhere('candidate_name', 'like', "%$s%")
    //               ->orWhere('client_name', 'like', "%$s%");
    //         });
    //     }

    //     if ($request->status && $request->status !== 'all') {
    //         $query->where('status', $request->status);
    //     }

    //     $cases = $query->get()->map(function ($c) {
    //         return [
    //             'id'            => $c->id,
    //             'case_id'       => $c->case_id,
    //             'candidate'     => $c->candidate_name,
    //             'client'        => $c->client_name,
    //             'client_id'     => $c->client_id,
    //             'checks'        => $c->checks,
    //             'check_details' => $c->check_details,
    //             'check_tat'     => $c->check_tat,
    //             'check_rates'   => $c->check_rates,
    //             'overall_tat'   => $c->overall_tat,
    //             'status'        => $c->status,
    //             'priority'      => $c->priority,
    //             'billing_mode'  => $c->billing_mode,
    //             'total_amount'  => $c->total_amount,
    //             'created_at'    => $c->created_at?->format('d M Y'),
    //             // Legacy fallback only, for cases saved before check_tat/overall_tat
    //             // existed — the frontend prefers overall_tat above and only
    //             // drops to this (case age, not real TAT) when that's empty.
    //             'tat'           => $c->created_at?->diffInDays(now()) . 'd',
    //         ];
    //     });

    //     return response()->json(['cases' => $cases]);
    // });
        Route::get('/cases', function (Request $request) {
        $user  = $request->user();
        $query = BGVCase::orderByDesc('created_at');

        if ($user->role === 'client') {
            $query->where(function ($q) use ($user) {
                $q->where('client_id', $user->id)
                ->orWhere('created_by', $user->id);
            });
        }

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('case_id', 'like', "%$s%")
                ->orWhere('candidate_name', 'like', "%$s%")
                ->orWhere('client_name', 'like', "%$s%");
            });
        }

        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $verifierNames = \App\Models\User::pluck('name', 'id');

        $qcStatusFor = fn ($status) => match ($status) {
            'pending' => 'Not Reviewed',
            'on-hold' => 'Incomplete',
            default   => 'Approved',
        };

        $cases = $query->get()->map(function ($c) use ($verifierNames, $qcStatusFor) {
            $checks      = $c->checks ?? [];
            $totalChecks = count($checks);

            $results    = $c->check_results ?? [];
            $doneChecks = collect($results)
                ->filter(fn ($r) => !($r['is_draft'] ?? false))
                ->keys()
                ->intersect($checks)
                ->count();
            $progress = $totalChecks > 0 ? (int) round(($doneChecks / $totalChecks) * 100) : 0;

            $documentsCount = collect($c->check_details ?? [])
                ->sum(fn ($detail) => count($detail['documents'] ?? []));

            $assignedIds   = $c->assigned_verifiers ?? [];
            $assignedNames = collect($checks)
                ->map(fn ($chk) => $assignedIds[$chk] ?? null)
                ->filter()
                ->map(fn ($id) => $verifierNames[$id] ?? null)
                ->filter()
                ->unique()
                ->values();

            // Due date: created_at + the longest per-check TAT among this
            // case's assigned checks (not the sum). Falls back to
            // overall_tat/tat if check_tat is empty. Computed here, inside
            // the closure, so it has access to this row's $c and $checks.
            $checkTat = $c->check_tat ?? [];
            $maxTat = collect($checks)
                ->map(fn ($chk) => (float) ($checkTat[$chk] ?? 0))
                ->filter(fn ($t) => $t > 0)
                ->max();

            if (!$maxTat) {
                $maxTat = (float) ($c->overall_tat ?? $c->tat ?? 0);
            }

            $dueDate = ($maxTat > 0 && $c->created_at)
                ? $c->created_at->copy()->addDays((int) round($maxTat))->format('d M Y')
                : null;

            return [
                'id'                 => $c->id,
                'case_id'            => $c->case_id,
                'candidate'          => $c->candidate_name,
                'client'             => $c->client_name,
                'client_id'          => $c->client_id,
                'checks'             => $c->checks,
                'check_details'      => $c->check_details,
                'check_tat'          => $c->check_tat,
                'check_rates'        => $c->check_rates,
                'overall_tat'        => $c->overall_tat,
                'status'             => $c->status,
                'priority'           => $c->priority,
                'billing_mode'       => $c->billing_mode,
                'total_amount'       => $c->total_amount,
                'created_at'         => $c->created_at?->format('d M Y'),
                'due_date'           => $dueDate,
                'tat'                => $c->created_at?->diffInDays(now()) . 'd',
                'progress'           => $progress,
                'documents_count'    => $documentsCount,
                'qc_status'          => $qcStatusFor($c->status),
                'assigned_verifier'  => $assignedNames->isNotEmpty() ? $assignedNames->implode(', ') : null,
                'assigned_verifiers' => $assignedIds,
            ];
        });

        return response()->json(['cases' => $cases]);
    });

    // ── GET SINGLE CASE (for edit prefill) ───────────────────
    Route::get('/cases/{caseId}', function (Request $request, $caseId) {
        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json(['case' => $case]);
    });

    // ── UPDATE CASE (edit flow) ───────────────────────────────
    Route::put('/cases/{caseId}', function (Request $request, $caseId) {
        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        if ($case->status !== 'pending' && $user->role === 'client') {
            return response()->json(['message' => 'This case can no longer be edited — verification is already in progress.'], 422);
        }

        $request->validate([
            'candidate_name'  => 'required|string|max:255',
            'candidate_email' => 'required|email',
            'candidate_dob'   => 'required|date',
            'client_name'     => 'required|string|max:255',
            'billing_mode'    => 'required|in:prepaid_client,prepaid_candidate,postpaid_client',
            'checks'          => 'required|array|min:1',
            'checks.*'        => 'in:employment,education,address,database,criminal,drug,court',
            'check_tat'       => 'nullable|array',
            'check_tat.*'     => 'numeric|min:0',
            'check_rates'     => 'nullable|array',
            'check_rates.*'   => 'numeric|min:0',
            'overall_tat'     => 'nullable|numeric|min:0',
        ]);

        $before = $case->toArray();

        $case->update([
            'candidate_name'   => $request->candidate_name,
            'candidate_email'  => $request->candidate_email,
            'candidate_mobile' => $request->candidate_mobile,
            'candidate_dob'    => $request->candidate_dob,
            'position'         => $request->position,
            'client_name'      => $request->client_name,
            'client_id'        => $request->client_id,
            'checks'           => $request->checks,
            'check_tat'        => $request->check_tat ?? $case->check_tat,
            'check_rates'      => $request->check_rates ?? $case->check_rates,
            'overall_tat'      => $request->overall_tat ?? $case->overall_tat,
            'priority'         => $request->priority ?? $case->priority,
            'billing_mode'     => $request->billing_mode,
            'payment_timing'   => $request->payment_timing,
            'invoice_cycle'    => $request->invoice_cycle,
            'po_number'        => $request->po_number,
            'total_amount'     => $request->total_amount ?? $case->total_amount,
            'payment_link'     => $request->payment_link,
            'notes'            => $request->notes,
        ]);

        \App\Models\CaseEvent::log(
            $case->case_id,
            'edited',
            'Case details updated',
            "Case details for {$case->candidate_name} were edited",
            ['before' => $before, 'checks' => $case->checks],
            $user
        );

        return response()->json(['message' => 'Case updated', 'case' => $case]);
    });

    // ── DASHBOARD STATS ──────────────────────────────────────
    Route::get('/dashboard-stats', function (Request $request) {
        $user  = $request->user();
        $query = BGVCase::query();

        if ($user->role === 'client') {
            $query->where(function ($q) use ($user) {
                $q->where('client_id', $user->id)
                  ->orWhere('created_by', $user->id);
            });
        }

        $total      = (clone $query)->count();
        $inProgress = (clone $query)->where('status', 'in-progress')->count();
        $completed  = (clone $query)->where('status', 'completed')->count();
        $pending    = (clone $query)->where('status', 'pending')->count();
        $qcReview   = (clone $query)->where('status', 'qc-review')->count();
        $clients    = BGVCase::distinct('client_name')->count('client_name');
        $clearRate  = $total > 0 ? round(($completed / $total) * 100) : 0;

        $avgTat = BGVCase::where('status', 'completed')
            ->selectRaw('AVG(JULIANDAY(updated_at) - JULIANDAY(created_at)) as avg_days')
            ->value('avg_days');

        return response()->json([
            'total'       => $total,
            'in_progress' => $inProgress,
            'completed'   => $completed,
            'pending'     => $pending,
            'qc_review'   => $qcReview,
            'clients'     => $clients,
            'clear_rate'  => $clearRate . '%',
            'avg_tat'     => round($avgTat ?? 0, 1) . ' days',
        ]);
    });

    // ── UPDATE CASE STATUS ───────────────────────────────────
    Route::patch('/cases/{caseId}/status', function (Request $request, $caseId) {
        $request->validate([
            'status' => 'required|in:pending,in-progress,qc-review,completed,on-hold',
        ]);

        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $oldStatus = $case->status;
        $case->update(['status' => $request->status]);

        \App\Models\CaseEvent::log(
            $case->case_id,
            'status_change',
            'Status updated',
            'Status changed from ' . str_replace('-', ' ', $oldStatus) . ' to ' . str_replace('-', ' ', $request->status),
            ['from' => $oldStatus, 'to' => $request->status],
            $request->user()
        );

        return response()->json(['message' => 'Status updated', 'case' => $case]);
    });

    // ── SAVE CHECK RESULT (verifier) ─────────────────────────
    Route::post('/cases/{caseId}/check-result', function (Request $request, $caseId) {
        $request->validate([
            'check_type' => 'required|in:employment,education,address,database,criminal,drug,court',
            'outcome'    => 'required|in:clear,discrepancy,unable',
            'is_draft'   => 'boolean',
        ]);

        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $results = $case->check_results ?? [];
        $results[$request->check_type] = [
            'outcome'   => $request->outcome,
            'form_data' => $request->form_data ?? [],
            'is_draft'  => $request->is_draft ?? false,
            'saved_by'  => $request->user()->id,
            'saved_at'  => now()->toDateTimeString(),
        ];

        if (!($request->is_draft ?? false)) {
            $allChecks   = $case->checks;
            $doneChecks  = array_keys(array_filter($results, fn($r) => !($r['is_draft'] ?? false)));
            $allDone     = count(array_intersect($allChecks, $doneChecks)) === count($allChecks);
            $newStatus   = $allDone ? 'qc-review' : 'in-progress';
            $case->update(['status' => $newStatus, 'check_results' => $results]);
        } else {
            $case->update(['status' => 'in-progress', 'check_results' => $results]);
        }

        \App\Models\CaseEvent::log(
            $case->case_id,
            'check_result',
            ucfirst(str_replace('_', ' ', $request->check_type)) . ' check ' . (($request->is_draft ?? false) ? 'drafted' : 'completed'),
            'Outcome: ' . $request->outcome,
            ['check_type' => $request->check_type, 'outcome' => $request->outcome, 'is_draft' => $request->is_draft ?? false],
            $request->user()
        );

        return response()->json(['message' => 'Check result saved', 'check_results' => $results]);
    });
    // ── ASSIGN VERIFIER TO A CHECK (allocator/admin) ─────────────
Route::patch('/cases/{caseId}/assign', function (Request $request, $caseId) {
    if (!in_array($request->user()->role, ['admin', 'allocator'])) {
        return response()->json(['message' => 'Unauthorized. Admin or allocator access required.'], 403);
    }

    $request->validate([
        'check_type' => 'required|string',
        'user_id'    => 'nullable|integer|exists:users,id', // omit/null to unassign
    ]);

    $case = BGVCase::where('case_id', $caseId)->first();
    if (!$case) return response()->json(['message' => 'Case not found'], 404);

    if (!in_array($request->check_type, $case->checks ?? [])) {
        return response()->json(['message' => 'This check is not assigned to this case'], 422);
    }

    $assigned = $case->assigned_verifiers ?? [];
    if ($request->filled('user_id')) {
        $assigned[$request->check_type] = (int) $request->user_id;
    } else {
        unset($assigned[$request->check_type]);
    }
    $case->assigned_verifiers = $assigned;
    $case->save();

    \App\Models\CaseEvent::log(
        $case->case_id,
        'verifier_assigned',
        ucfirst($request->check_type) . ' verifier ' . ($request->filled('user_id') ? 'assigned' : 'unassigned'),
        $request->filled('user_id') ? "Assigned to user #{$request->user_id}" : 'Unassigned',
        ['check_type' => $request->check_type, 'user_id' => $request->user_id],
        $request->user()
    );

    return response()->json(['message' => 'Saved', 'assigned_verifiers' => $assigned]);
});

    // ── SAVE CHECK FIELDS (client/staff — from CheckDetailForm) ──
    // Also accepts an admin-only `amount` — this is the ONLY write path for
    // a case's per-check amount. It lands in check_rates (never in
    // check_details/fields), and only ever moves if the caller is admin —
    // this is a server-side check, independent of the frontend disabling
    // the input for non-admins.
    Route::patch('/cases/{caseId}/checks/{checkKey}', function (Request $request, $caseId, $checkKey) {
        $request->validate([
            'fields' => 'required|array',
            'amount' => 'nullable|numeric|min:0',
        ]);

        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        if (!in_array($checkKey, $case->checks ?? [])) {
            return response()->json(['message' => 'This check is not assigned to this case'], 422);
        }

        $details = $case->check_details ?? [];
        $details[$checkKey]['fields']    = $request->fields;
        $details[$checkKey]['documents'] = $details[$checkKey]['documents'] ?? [];
        $case->check_details = $details;

        if ($user->role === 'admin' && $request->filled('amount')) {
            $rates = $case->check_rates ?? [];
            $rates[$checkKey] = $request->amount;
            $case->check_rates = $rates;
        }

        $case->save();

        \App\Models\CaseEvent::log(
            $case->case_id,
            'check_fields_saved',
            ucfirst($checkKey) . ' details saved',
            'Fields updated for ' . $checkKey . ' check',
            ['check_type' => $checkKey],
            $user
        );

        return response()->json([
            'message'       => 'Saved',
            'check_details' => $details,
            'check_rates'   => $case->check_rates,
        ]);
    });

    // ── UPLOAD CHECK DOCUMENT (client/staff) ──
    Route::post('/cases/{caseId}/checks/{checkKey}/documents', function (Request $request, $caseId, $checkKey) {
        $request->validate([
            'document_key' => 'required|string',
            'file'         => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png',
        ]);

        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        if (!in_array($checkKey, $case->checks ?? [])) {
            return response()->json(['message' => 'This check is not assigned to this case'], 422);
        }

        $path = $request->file('file')->store("case-documents/{$case->case_id}/{$checkKey}", 'public');
        $url  = \Illuminate\Support\Facades\Storage::disk('public')->url($path);

        $details = $case->check_details ?? [];
        $details[$checkKey]['documents'][$request->document_key] = [
            'name'        => $request->file('file')->getClientOriginalName(),
            'path'        => $path,
            'url'         => $url,
            'uploaded_by' => 'client',
            'uploaded_at' => now()->toDateTimeString(),
        ];
        $details[$checkKey]['fields'] = $details[$checkKey]['fields'] ?? [];
        $case->check_details = $details;
        $case->save();

        return response()->json(['message' => 'Uploaded', 'url' => $url]);
    });

    // ── GENERATE SHARE LINK FOR A SINGLE CHECK (client → candidate) ──
    Route::post('/cases/{caseId}/checks/{checkKey}/share-link', function (Request $request, $caseId, $checkKey) {
        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        if (!in_array($checkKey, $case->checks ?? [])) {
            return response()->json(['message' => 'This check is not assigned to this case'], 422);
        }

        $token = \App\Models\CandidateLink::generateToken();

        \App\Models\CandidateLink::create([
            'token'          => $token,
            'candidate_name' => $case->candidate_name,
            'email'          => $case->candidate_email,
            'mobile'         => $case->candidate_mobile,
            'position'       => $case->position,
            'case_id'        => $case->case_id,
            'check_type'     => $checkKey,
            'checks'         => [$checkKey],
            'expiry'         => '72h',
            'status'         => 'pending',
            'client_id'      => $user->id,
            'expires_at'     => \App\Models\CandidateLink::expiryToCarbon('72h'),
        ]);

        return response()->json(['url' => url("/candidate/{$token}")]);
    });

    // ── CASE TIMELINE ─────────────────────────────────────────
    Route::get('/cases/{caseId}/timeline', function (Request $request, $caseId) {
        $case = BGVCase::where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client') {
            $owns = (int) $case->client_id === (int) $user->id
                || (int) $case->created_by === (int) $user->id;
            if (!$owns) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        $events = \App\Models\CaseEvent::where('case_id', $caseId)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn ($e) => [
                'id'          => $e->id,
                'type'        => $e->type,
                'title'       => $e->title,
                'description' => $e->description,
                'meta'        => $e->meta,
                'actor'       => $e->actor_name,
                'timestamp'   => $e->created_at->toIso8601String(),
            ]);

        return response()->json(['timeline' => $events]);
    });

    // ═════════════════════════════════════════════════════════
    // CANDIDATE LINKS (Candidate Portal — Link Generator)
    // ═════════════════════════════════════════════════════════

    Route::get('/candidate-links', function (Request $request) {
        $user  = $request->user();
        $query = \App\Models\CandidateLink::orderByDesc('created_at');

        if ($user->role !== 'admin') {
            $query->where('client_id', $user->id);
        }

        $links = $query->get()->map(function ($l) {
            return [
                'id'            => $l->id,
                'candidateName' => $l->candidate_name,
                'email'         => $l->email,
                'mobile'        => $l->mobile,
                'position'      => $l->position,
                'checks'        => $l->checks,
                'expiry'        => $l->expiry,
                'status'        => $l->status,
                'link'          => url("/candidate/{$l->token}"),
                'createdAt'     => $l->created_at->format('Y-m-d'),
            ];
        });

        return response()->json(['links' => $links]);
    });

    Route::post('/candidate-links', function (Request $request) {
        $request->validate([
            'candidateName' => 'required|string|max:255',
            'email'         => 'required|email',
            'mobile'        => 'nullable|string|max:20',
            'position'      => 'nullable|string|max:255',
            'checks'        => 'required|array|min:1',
            'checks.*'      => 'in:emp,edu,addr,db,criminal,drug,court',
            'expiry'        => 'required|in:24h,48h,72h,7 days',
        ]);

        $token = \App\Models\CandidateLink::generateToken();

        $link = \App\Models\CandidateLink::create([
            'token'          => $token,
            'candidate_name' => $request->candidateName,
            'email'          => $request->email,
            'mobile'         => $request->mobile,
            'position'       => $request->position,
            'checks'         => $request->checks,
            'expiry'         => $request->expiry,
            'status'         => 'pending',
            'client_id'      => $request->user()->id,
            'expires_at'     => \App\Models\CandidateLink::expiryToCarbon($request->expiry),
        ]);

        return response()->json([
            'message' => 'Candidate link generated',
            'link'    => [
                'id'            => $link->id,
                'candidateName' => $link->candidate_name,
                'email'         => $link->email,
                'mobile'        => $link->mobile,
                'position'      => $link->position,
                'checks'        => $link->checks,
                'expiry'        => $link->expiry,
                'status'        => $link->status,
                'link'          => url("/candidate/{$token}"),
                'createdAt'     => $link->created_at->format('Y-m-d'),
            ],
        ], 201);
    });

    Route::post('/candidate-links/bulk', function (Request $request) {
        $request->validate([
            'rows'                 => 'required|array|min:1',
            'rows.*.candidateName' => 'required|string|max:255',
            'rows.*.email'         => 'required|email',
            'rows.*.mobile'        => 'nullable|string|max:20',
            'rows.*.position'      => 'nullable|string|max:255',
            'rows.*.checks'        => 'required|array|min:1',
            'rows.*.checks.*'      => 'in:emp,edu,addr,db,criminal,drug,court',
        ]);

        $clientId = $request->user()->id;
        $created  = [];

        foreach ($request->rows as $row) {
            $token = \App\Models\CandidateLink::generateToken();

            $link = \App\Models\CandidateLink::create([
                'token'          => $token,
                'candidate_name' => $row['candidateName'],
                'email'          => $row['email'],
                'mobile'         => $row['mobile'] ?? null,
                'position'       => $row['position'] ?? null,
                'checks'         => $row['checks'],
                'expiry'         => '72h',
                'status'         => 'pending',
                'client_id'      => $clientId,
                'expires_at'     => \App\Models\CandidateLink::expiryToCarbon('72h'),
            ]);

            $created[] = [
                'id'            => $link->id,
                'candidateName' => $link->candidate_name,
                'email'         => $link->email,
                'mobile'        => $link->mobile,
                'position'      => $link->position,
                'checks'        => $link->checks,
                'expiry'        => $link->expiry,
                'status'        => $link->status,
                'link'          => url("/candidate/{$token}"),
                'createdAt'     => $link->created_at->format('Y-m-d'),
            ];
        }

        return response()->json([
            'message' => count($created) . ' candidate link(s) generated',
            'links'   => $created,
        ], 201);
    });

    Route::post('/candidate-links/{id}/send', function (Request $request, $id) {
        $request->validate(['method' => 'required|in:SMS,Email']);

        $link = \App\Models\CandidateLink::find($id);
        if (!$link) return response()->json(['message' => 'Link not found'], 404);

        if ($request->user()->role !== 'admin' && $link->client_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->method === 'Email') {
            Mail::raw(
                "Hi {$link->candidate_name},\n\nPlease complete your verification here: " . url("/candidate/{$link->token}"),
                function ($message) use ($link) {
                    $message->to($link->email)->subject('Complete Your Background Verification');
                }
            );
        }

        return response()->json(['message' => "{$request->method} sent to " . ($request->method === 'SMS' ? $link->mobile : $link->email)]);
    });

    Route::delete('/candidate-links/{id}', function (Request $request, $id) {
        $link = \App\Models\CandidateLink::find($id);
        if (!$link) return response()->json(['message' => 'Link not found'], 404);

        if ($request->user()->role !== 'admin' && $link->client_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $link->delete();
        return response()->json(['message' => 'Link revoked']);
    });

    // ═════════════════════════════════════════════════════════
    // INSTITUTIONS & COMPANIES
    // ═════════════════════════════════════════════════════════

    Route::get('/institutions', function (Request $request) {
        $query = \App\Models\Institution::query();

        if ($request->type && $request->type !== 'all') {
            $query->where('type', $request->type);
        }
        if ($request->scope) {
    $scope = strtolower($request->scope);
    $query->where(function ($q) use ($scope) {
        $q->where('scope', $scope)->orWhereNull('scope');
    });
}
        if (!$request->boolean('include_inactive')) {
            $query->where('status', '!=', 'inactive');
        }
        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhere('code', 'like', "%$s%")
                  ->orWhere('state', 'like', "%$s%");
            });
        }

        return response()->json(['institutions' => $query->orderBy('name')->get()]);
    });

    Route::post('/institutions', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate([
            'type'       => 'required|in:university,lab,court',
            'name'       => 'required|string|max:255',
            'code'       => 'nullable|string|max:20',
            'state'      => 'nullable|string|max:100',
            'website'    => 'nullable|string|max:255',
            'stature'    => 'nullable|string|max:50',
            'aicte'      => 'nullable|string|max:50',
            'accredited' => 'nullable|boolean',
            'level'      => 'nullable|string|max:50',
            'scope'      => 'nullable|in:national,international',
        ]);

        $institution = \App\Models\Institution::create([
            'type'       => $request->type,
            'name'       => $request->name,
            'code'       => $request->code,
            'state'      => $request->state,
            'website'    => $request->website,
            'stature'    => $request->stature,
            'aicte'      => $request->aicte,
            'accredited' => $request->boolean('accredited'),
            'level'      => $request->level,
            'scope'      => $request->scope,
        ]);

        return response()->json(['institution' => $institution], 201);
    });

    Route::post('/institutions/bulk', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate([
            'rows'           => 'required|array|min:1',
            'rows.*.type'    => 'required|in:university,lab,court',
            'rows.*.name'    => 'required|string|max:255',
            'rows.*.code'    => 'nullable|string|max:20',
            'rows.*.state'   => 'nullable|string|max:100',
            'rows.*.website' => 'nullable|string|max:255',
            'rows.*.scope'   => 'nullable|in:national,international',
        ]);

        $created = [];
        foreach ($request->rows as $row) {
            $created[] = \App\Models\Institution::create([
                'type'       => $row['type'],
                'name'       => $row['name'],
                'code'       => $row['code'] ?? null,
                'state'      => $row['state'] ?? null,
                'website'    => $row['website'] ?? null,
                'stature'    => $row['stature'] ?? null,
                'aicte'      => $row['aicte'] ?? null,
                'accredited' => filter_var($row['accredited'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'level'      => $row['level'] ?? null,
                'scope'      => $row['scope'] ?? null,
            ]);
        }

        return response()->json([
            'message'      => count($created) . ' institution(s) imported successfully',
            'institutions' => $created,
        ], 201);
    });

    Route::delete('/institutions/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $institution = \App\Models\Institution::find($id);
        if (!$institution) {
            return response()->json(['message' => 'Institution not found'], 404);
        }

        $institution->update(['status' => 'inactive']);

        return response()->json(['message' => 'Institution removed']);
    });

    // ═════════════════════════════════════════════════════════
    // COMPANIES
    // ═════════════════════════════════════════════════════════

    Route::get('/companies', function (Request $request) {
        $query = \App\Models\Company::query();

        if (!$request->boolean('include_inactive')) {
            $query->where('status', '!=', 'inactive');
        }
       if ($request->scope) {
    $scope = strtolower($request->scope);
    $query->where(function ($q) use ($scope) {
        $q->where('scope', $scope)->orWhereNull('scope');
    });
}
        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")
                  ->orWhere('code', 'like', "%$s%")
                  ->orWhere('industry', 'like', "%$s%");
            });
        }

        return response()->json(['companies' => $query->orderBy('name')->get()]);
    });

    Route::post('/companies', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate([
            'name'     => 'required|string|max:255',
            'code'     => 'nullable|string|max:20',
            'industry' => 'nullable|string|max:100',
            'state'    => 'nullable|string|max:100',
            'website'  => 'nullable|string|max:255',
            'scope'    => 'nullable|in:national,international',
        ]);

        $company = \App\Models\Company::create($request->only(['name', 'code', 'industry', 'state', 'website', 'scope']));

        return response()->json(['company' => $company], 201);
    });

    Route::post('/companies/bulk', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $request->validate([
            'rows'            => 'required|array|min:1',
            'rows.*.name'     => 'required|string|max:255',
            'rows.*.code'     => 'nullable|string|max:20',
            'rows.*.industry' => 'nullable|string|max:100',
            'rows.*.state'    => 'nullable|string|max:100',
            'rows.*.website'  => 'nullable|string|max:255',
            'rows.*.scope'    => 'nullable|in:national,international',
        ]);

        $created = [];
        foreach ($request->rows as $row) {
            $created[] = \App\Models\Company::create([
                'name'     => $row['name'],
                'code'     => $row['code'] ?? null,
                'industry' => $row['industry'] ?? null,
                'state'    => $row['state'] ?? null,
                'website'  => $row['website'] ?? null,
                'scope'    => $row['scope'] ?? null,
            ]);
        }

        return response()->json([
            'message'   => count($created) . ' company/companies imported successfully',
            'companies' => $created,
        ], 201);
    });

    Route::delete('/companies/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $company = \App\Models\Company::find($id);
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        $company->update(['status' => 'inactive']);

        return response()->json(['message' => 'Company removed']);
    });

    // ═════════════════════════════════════════════════════════
    // CLIENTS (User records with role = 'client')
    // ═════════════════════════════════════════════════════════

    // ── LIST CLIENTS ──────────────────────────────────────────
    Route::get('/clients', function (Request $request) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) {
            return response()->json(['message' => 'Unauthorized. Admin or allocator access required.'], 403);
        }

        $clients = \App\Models\User::where('role', 'client')
            ->orderBy('name')
            ->get()
            ->map(function ($u) {
                return [
                    'id'            => $u->id,
                    'company_name'  => $u->name,
                    'name'          => $u->primary_contact,
                    'contact_email' => $u->email,
                    'contact_phone' => $u->contact_phone,
                    'gstin'         => $u->gstin,
                    'billing_mode'  => $u->billing_mode,
                    'agreed_checks' => $u->agreed_checks,
                    'check_rates'   => $u->check_rates,
                    'check_tat'     => $u->check_tat,
                    'created_at'    => $u->created_at,
                ];
            });

        return response()->json(['clients' => $clients]);
    });

    // ── GET SINGLE CLIENT (for view / edit prefill) ──────────
    Route::get('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $client = \App\Models\User::where('role', 'client')->find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);

        return response()->json(['client' => [
            'id'                   => $client->id,
            'company_name'         => $client->name,
            'address'              => $client->address,
            'gstin'                => $client->gstin,
            'primary_contact'      => $client->primary_contact,
            'contact_phone'        => $client->contact_phone,
            'contact_email'        => $client->email,
            'billing_mode'         => $client->billing_mode,
            'agreed_checks'        => $client->agreed_checks,
            'check_rates'          => $client->check_rates,
            'check_tat'            => $client->check_tat,
            'notes'                => $client->notes,
            'agreement_start_date' => $client->agreement_start_date,
            'agreement_end_date'   => $client->agreement_end_date,
            'agreement_url'        => $client->agreement_path
                ? \Illuminate\Support\Facades\Storage::disk('public')->url($client->agreement_path)
                : null,
            'created_at'           => $client->created_at,
        ]]);
    });

    // ── UPDATE CLIENT ─────────────────────────────────────────
    Route::put('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $client = \App\Models\User::where('role', 'client')->find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);

        // FormData sends checks/rates/tat as JSON strings — decode them
        // back into arrays before validating.
        foreach (['agreedChecks', 'checkRates', 'checkTat'] as $jsonField) {
            if (is_string($request->input($jsonField))) {
                $request->merge([$jsonField => json_decode($request->input($jsonField), true) ?? []]);
            }
        }

        $request->validate([
            'companyName'        => 'required|string|max:255',
            'address'            => 'nullable|string|max:1000',
            'gstin'              => 'nullable|string|max:15',
            'primaryContact'     => 'nullable|string|max:255',
            'contactPhone'       => 'nullable|string|max:20',
            'contactEmail'       => 'required|email|unique:users,email,' . $client->id,
            'billingMode'        => 'nullable|in:prepaid_client,prepaid_candidate,postpaid_client',
            'agreedChecks'       => 'nullable|array',
            'agreedChecks.*'     => 'in:employment,education,address,database,criminal,drug,court',
            'checkRates'         => 'nullable|array',
            'checkTat'           => 'nullable|array',
            'notes'              => 'nullable|string',
            'agreementStartDate' => 'nullable|date',
            'agreementEndDate'   => 'nullable|date|after_or_equal:agreementStartDate',
            'agreement'          => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        $agreementPath = $client->agreement_path;
        if ($request->hasFile('agreement')) {
            // Replace the old file, if any
            if ($agreementPath) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($agreementPath);
            }
            $agreementPath = $request->file('agreement')->store('agreements', 'public');
        }

        $client->update([
            'name'                 => $request->companyName,
            'email'                => $request->contactEmail,
            'address'              => $request->address,
            'gstin'                => $request->gstin,
            'primary_contact'      => $request->primaryContact,
            'contact_phone'        => $request->contactPhone,
            'billing_mode'         => $request->billingMode,
            'agreed_checks'        => $request->agreedChecks ?? $client->agreed_checks,
            'check_rates'          => $request->checkRates ?? $client->check_rates,
            'check_tat'            => $request->checkTat ?? $client->check_tat,
            'notes'                => $request->notes,
            'agreement_path'       => $agreementPath,
            'agreement_start_date' => $request->agreementStartDate ?? $client->agreement_start_date,
            'agreement_end_date'   => $request->agreementEndDate ?? $client->agreement_end_date,
        ]);

        return response()->json(['message' => 'Client updated', 'client' => $client]);
    });

    // ── DELETE / REMOVE CLIENT ────────────────────────────────
    Route::delete('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $client = \App\Models\User::where('role', 'client')->find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);

        $client->delete();

        return response()->json(['message' => 'Client removed successfully']);
    });

    // ── GENERATE CLIENT SHARE LINK (admin → client, for case upload) ──
    // Mints a fresh Sanctum token for the client and hands it back so
    // the frontend can build a magic link. Any previously issued
    // share-link token for this client is revoked first, so only the
    // most recently generated link is valid.
    Route::post('/clients/{id}/share-link', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }

        $client = \App\Models\User::where('role', 'client')->find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);

        $client->tokens()->where('name', 'client-share-link')->delete();

        $token = $client->createToken('client-share-link')->plainTextToken;

        return response()->json([
            'token'  => $token,
            'client' => [
                'id'    => $client->id,
                'name'  => $client->name,
                'email' => $client->email,
            ],
        ]);
    });

});
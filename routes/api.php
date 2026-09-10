<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\BGVCase;
use App\Models\User;
use App\Models\CaseCheck;

// ─────────────────────────────────────────
// DEV HELPERS (Remove in production)
// ─────────────────────────────────────────
Route::get('/create-admin', function () {
    $user = \App\Models\User::updateOrCreate(
        ['email' => 'admin@satyapan.com'],
        [
            'name' => 'Admin', 
            'password' => Hash::make('Admin@123'), 
            'role' => 'admin',
            'status' => 'active' // Ensure status is active
        ]
    );
    return response()->json(['message' => 'Admin created successfully', 'user' => $user]);
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

    // Disabled non-admin accounts cannot log in. 
    if ($user->role !== 'admin' && $user->status !== 'active') {
        Auth::logout();
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
// CLIENT SELF-REGISTRATION (Pending Admin Approval)
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
        Mail::raw(
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
// REGISTER (Individual User — Unrelated to Client Company)
// ─────────────────────────────────────────
Route::post('/register', function (Request $request) {
    $request->validate([
        'name'     => 'required',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|min:8',
    ]);

    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
        'role'     => 'client',
        'status'   => 'active'
    ]);

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user], 201);
});

// ─────────────────────────────────────────
// PASSWORD RESET ROUTES
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

Route::post('/verify-otp', function (Request $request) {
    $request->merge(['email' => trim(strtolower($request->email))]);
    $request->validate(['email' => 'required|email', 'otp' => 'required|digits:4']);

    $record = DB::table('password_resets')->where('email', $request->email)->first();

    if (!$record || now()->diffInMinutes($record->created_at) > 10 || $record->token != $request->otp) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 400);
    }

    DB::table('password_resets')->where('email', $request->email)->update(['verified' => true]);

    return response()->json(['message' => 'OTP verified successfully']);
});

Route::post('/reset-password', function (Request $request) {
    $request->merge(['email' => trim(strtolower($request->email))]);
    $request->validate([
        'email'                 => 'required|email',
        'password'              => 'required|min:6|confirmed',
    ]);

    $record = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('verified', true)
        ->first();

    if (!$record) return response()->json(['message' => 'Please verify your OTP before resetting password.'], 403);

    $user = User::where('email', $request->email)->first();
    if (!$user) return response()->json(['message' => 'User not found.'], 404);

    $user->update(['password' => Hash::make($request->password)]);
    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password reset successful. You can now log in.']);
});

// ─────────────────────────────────────────
// CANDIDATE-FACING (Public, Token-gated)
// ─────────────────────────────────────────
$normalizeCheckKey = function ($key) {
    $map = ['emp' => 'employment', 'edu' => 'education', 'addr' => 'address', 'db' => 'database', 'drug_test' => 'drug', 'courtroom' => 'court'];
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
    
    // Transform CaseChecks back into old checkDetails shape for candidate portal
    $checkDetails = [];
    if ($link->case_id) {
        $caseChecks = CaseCheck::where('case_id', $link->case_id)->get();
        foreach ($caseChecks as $check) {
            $checkDetails[$check->check_type] = [
                'fields' => $check->fields ?? [],
                'documents' => $check->documents ?? [],
            ];
        }
    }

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
        'checkDetails' => $checkDetails,
    ]);
});

Route::patch('/candidate-link/{token}/fields', function (Request $request, $token) use ($normalizeCheckKey) {
    $request->validate(['check_type' => 'required|string', 'fields' => 'required|array']);

    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link || !$link->case_id) return response()->json(['message' => 'Invalid link or case'], 404);
    if ($link->expires_at && now()->greaterThan($link->expires_at)) return response()->json(['message' => 'Link expired'], 410);

    $checkType = $normalizeCheckKey($request->check_type);
    
    $check = CaseCheck::where('case_id', $link->case_id)->where('check_type', $checkType)->firstOrFail();
    $check->fields = $request->fields;
    $check->save();

    return response()->json(['message' => 'Saved']);
});

Route::post('/candidate-link/{token}/documents', function (Request $request, $token) use ($normalizeCheckKey) {
    $request->validate([
        'check_type'   => 'required|string',
        'document_key' => 'required|string',
        'file'         => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png',
    ]);

    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link || !$link->case_id) return response()->json(['message' => 'Invalid link or case'], 404);

    $checkType = $normalizeCheckKey($request->check_type);
    $check = CaseCheck::where('case_id', $link->case_id)->where('check_type', $checkType)->firstOrFail();

    $path = $request->file('file')->store("case-documents/{$link->case_id}/{$checkType}", 'public');
    $url  = \Illuminate\Support\Facades\Storage::disk('public')->url($path);

    $documents = $check->documents ?? [];
    $documents[$request->document_key] = [
        'name'        => $request->file('file')->getClientOriginalName(),
        'path'        => $path,
        'url'         => $url,
        'uploaded_by' => 'candidate',
        'uploaded_at' => now()->toDateTimeString(),
    ];
    
    $check->documents = $documents;
    $check->save();

    return response()->json(['message' => 'Uploaded', 'url' => $url]);
});

Route::post('/candidate-link/{token}/submit', function (Request $request, $token) {
    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);

    $link->update(['status' => 'submitted']);

    if ($link->case_id) {
        $case = BGVCase::where('case_id', $link->case_id)->first();
        if ($case && $case->status === 'pending') {
            $case->update(['status' => 'in-progress']);
        }
        
        \App\Models\CaseEvent::log(
            $case->case_id,
            'candidate_submitted',
            'Candidate submitted documents',
            $link->check_type ? ucfirst($link->check_type) . ' info/documents submitted by candidate' : 'Documents submitted by candidate',
            ['check_type' => $link->check_type, 'checks' => $link->checks],
            null
        );
    }

    return response()->json(['message' => 'Submitted successfully']);
});


// ═════════════════════════════════════════
// PROTECTED ROUTES (Bearer token required)
// ═════════════════════════════════════════
Route::middleware('auth:sanctum')->group(function () {

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

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    // ── USERS & CLIENT ACTIVITY ──────────────────────────────
    Route::get('/notifications/client-activity', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        return response()->json([
            'pending_registrations' => \App\Models\ClientRegistration::where('status', 'pending')->latest()->take(10)->get(),
            'recent_clients' => User::where('role', 'client')->where('created_at', '>=', now()->subDays(7))->latest()->take(10)->get(['id', 'name', 'email', 'created_at'])
        ]);
    });

    Route::post('/users/create', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role'     => 'required|string',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'status'   => 'active',
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    });

    Route::get('/users', function (Request $request) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) return response()->json(['message' => 'Unauthorized'], 403);
        return response()->json(['users' => User::select('id', 'name', 'email', 'role', 'status', 'created_at')->orderByDesc('created_at')->get()]);
    });

    Route::patch('/users/{id}/status', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['status' => 'required|in:active,inactive']);

        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);
        if ($user->role === 'admin' && $request->status !== 'active') return response()->json(['message' => 'Admin accounts cannot be disabled.'], 422);
        if ($user->id === $request->user()->id && $request->status !== 'active') return response()->json(['message' => 'You cannot disable your own account.'], 422);

        $user->update(['status' => $request->status]);
        return response()->json(['message' => 'User status updated', 'user' => $user]);
    });

    Route::delete('/users/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $user = User::find($id);
        if ($user->id === $request->user()->id) return response()->json(['message' => 'You cannot delete your own account'], 400);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    });

    // ── CLIENT REGISTRATIONS (Admin Review) ───────────────────
    Route::get('/client-registrations', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $query = \App\Models\ClientRegistration::orderByDesc('created_at');
        if ($request->status) $query->where('status', $request->status);
        return response()->json(['registrations' => $query->get()]);
    });

    Route::get('/client-registrations/pending-count', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        return response()->json(['count' => \App\Models\ClientRegistration::where('status', 'pending')->count()]);
    });

    Route::get('/client-registrations/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        return response()->json(['registration' => \App\Models\ClientRegistration::find($id)]);
    });

    Route::post('/client-registrations/{id}/reject', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        \App\Models\ClientRegistration::where('id', $id)->update(['status' => 'rejected']);
        return response()->json(['message' => 'Registration rejected']);
    });

    Route::post('/clients/register', function (Request $request) {
        // Decode nested arrays arriving as FormData strings
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
            'checkRates'         => 'nullable|array',
            'checkTat'           => 'nullable|array',
            'registrationId'     => 'nullable|integer|exists:client_registrations,id',
            'agreement'          => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        $totalAmount = 0;
        foreach ($request->agreedChecks as $check) {
            $totalAmount += ($request->checkRates[$check] ?? 1500);
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
            'status'               => 'active',
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
            \App\Models\ClientRegistration::where('id', $request->registrationId)->update(['status' => 'converted', 'converted_user_id' => $user->id]);
        }

        return response()->json(['message' => 'Client registered successfully', 'user' => $user], 201);
    });

    // ── CASES ROUTES (New CaseCheck Architecture) ─────────────
    
    // -------------------------------------------------------------
    // CREATE CASE - This maps the selected checks from AddCase!
    // -------------------------------------------------------------
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
            'check_rates'     => 'nullable|array',
            'overall_tat'     => 'nullable|numeric|min:0',
        ]);

        // 1. Create the Master Case record
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

        // 2. Map and Register Individual Checks in `case_checks` table
        $caseChecksData = [];
        foreach ($request->checks as $checkKey) {
            $caseChecksData[] = [
                'case_id'    => $case->case_id,
                'check_type' => $checkKey, // e.g. 'employment', 'education'
                'rate'       => $request->check_rates[$checkKey] ?? 0,
                'tat_days'   => $request->check_tat[$checkKey] ?? 0,
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        CaseCheck::insert($caseChecksData);

        \App\Models\CaseEvent::log($case->case_id, 'created', 'Case created', "Case opened for {$case->candidate_name}", ['checks' => $case->checks], $request->user());

        return response()->json(['case' => $case], 201);
    });

    // LIST CASES
    Route::get('/cases', function (Request $request) {
        $user  = $request->user();
        $query = BGVCase::with('caseChecks')->orderByDesc('created_at');

        if ($user->role === 'client') {
            $query->where(function ($q) use ($user) {
                $q->where('client_id', $user->id)->orWhere('created_by', $user->id);
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

        $verifierNames = User::pluck('name', 'id');

        $qcStatusFor = fn ($status) => match ($status) {
            'pending' => 'Not Reviewed',
            'on-hold' => 'Incomplete',
            default   => 'Approved',
        };

        $cases = $query->get()->map(function ($c) use ($verifierNames, $qcStatusFor) {
            $checks = $c->checks ?? [];
            $caseChecks = $c->caseChecks; // Using relationships
            
            $totalChecks = count($checks);
            $doneChecks = $caseChecks->where('status', 'completed')->count();
            $progress = $totalChecks > 0 ? (int) round(($doneChecks / $totalChecks) * 100) : 0;

            $documentsCount = $caseChecks->sum(fn ($chk) => count($chk->documents ?? []));
            $assignedIds = $caseChecks->pluck('verifier_id', 'check_type')->filter()->toArray();
            
            $assignedNames = collect($assignedIds)
                ->map(fn ($id) => $verifierNames[$id] ?? null)
                ->filter()->unique()->values();

            $checkTat = $caseChecks->pluck('tat_days', 'check_type')->toArray();
            $maxTat = collect($checkTat)->max() ?: ($c->overall_tat ?? 0);
            $dueDate = ($maxTat > 0 && $c->created_at) ? $c->created_at->copy()->addDays((int) round($maxTat))->format('d M Y') : null;

            // Reconstructing legacy array structures for the frontend
            $checkDetails = $caseChecks->mapWithKeys(function($chk) {
                return [$chk->check_type => ['fields' => $chk->fields, 'documents' => $chk->documents]];
            })->toArray();

            return [
                'id'                 => $c->id,
                'case_id'            => $c->case_id,
                'candidate'          => $c->candidate_name,
                'client'             => $c->client_name,
                'client_id'          => $c->client_id,
                'checks'             => $checks,
                'check_details'      => $checkDetails,
                'check_tat'          => $checkTat,
                'check_rates'        => $caseChecks->pluck('rate', 'check_type')->toArray(),
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

    // GET SINGLE CASE
    Route::get('/cases/{caseId}', function (Request $request, $caseId) {
        $case = BGVCase::with('caseChecks')->where('case_id', $caseId)->first();
        if (!$case) return response()->json(['message' => 'Case not found'], 404);

        $user = $request->user();
        if ($user->role === 'client' && $case->client_id !== $user->id && $case->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $caseArray = $case->toArray();
        $caseArray['check_tat'] = $case->caseChecks->pluck('tat_days', 'check_type')->toArray();
        $caseArray['check_rates'] = $case->caseChecks->pluck('rate', 'check_type')->toArray();
        $caseArray['check_details'] = $case->caseChecks->mapWithKeys(function($chk) {
            return [$chk->check_type => ['fields' => $chk->fields, 'documents' => $chk->documents]];
        })->toArray();

        return response()->json(['case' => $caseArray]);
    });

    // UPDATE CASE
    Route::put('/cases/{caseId}', function (Request $request, $caseId) {
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();

        $user = $request->user();
        if ($user->role === 'client' && $case->client_id !== $user->id && $case->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($case->status !== 'pending' && $user->role === 'client') {
            return response()->json(['message' => 'Case is already in progress.'], 422);
        }

        $case->update($request->only(['candidate_name', 'candidate_email', 'candidate_mobile', 'candidate_dob', 'position', 'client_name', 'client_id', 'checks', 'priority', 'billing_mode', 'payment_timing', 'invoice_cycle', 'po_number', 'total_amount', 'payment_link', 'notes', 'overall_tat']));

        // Synchronize checks: Add new checks if they were added to the case array
        foreach ($request->checks as $checkKey) {
            CaseCheck::firstOrCreate(
                ['case_id' => $caseId, 'check_type' => $checkKey],
                [
                    'rate'     => $request->check_rates[$checkKey] ?? 0,
                    'tat_days' => $request->check_tat[$checkKey] ?? 0,
                    'status'   => 'pending'
                ]
            );
        }

        \App\Models\CaseEvent::log($case->case_id, 'edited', 'Case details updated', "Case details for {$case->candidate_name} were edited", ['checks' => $case->checks], $user);

        return response()->json(['message' => 'Case updated', 'case' => $case]);
    });

    // UPDATE CASE STATUS
    Route::patch('/cases/{caseId}/status', function (Request $request, $caseId) {
        $request->validate(['status' => 'required|in:pending,in-progress,qc-review,completed,on-hold']);
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();
        $oldStatus = $case->status;
        $case->update(['status' => $request->status]);

        \App\Models\CaseEvent::log($case->case_id, 'status_change', 'Status updated', 'Status changed from ' . $oldStatus . ' to ' . $request->status, [], $request->user());
        return response()->json(['message' => 'Status updated', 'case' => $case]);
    });

    // DASHBOARD STATS
    Route::get('/dashboard-stats', function (Request $request) {
        $user  = $request->user();
        $query = BGVCase::query();

        if ($user->role === 'client') {
            $query->where(function ($q) use ($user) {
                $q->where('client_id', $user->id)->orWhere('created_by', $user->id);
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

    // ── CHECK SPECIFIC ROUTES ────────────────────────────────

    // ASSIGN VERIFIER TO A CHECK
    Route::patch('/cases/{caseId}/assign', function (Request $request, $caseId) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['check_type' => 'required|string', 'user_id' => 'nullable|integer|exists:users,id']);

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $request->check_type)->firstOrFail();
        $check->verifier_id = $request->filled('user_id') ? (int) $request->user_id : null;
        $check->save();

        \App\Models\CaseEvent::log($caseId, 'verifier_assigned', ucfirst($request->check_type) . ' verifier updated', 'Assigned to user #' . $request->user_id, [], $request->user());

        return response()->json(['message' => 'Assigned', 'verifier_id' => $check->verifier_id]);
    });

    // SAVE CHECK FIELDS (e.g. from Verifier Dashboards)
    Route::patch('/cases/{caseId}/checks/{checkKey}', function (Request $request, $caseId, $checkKey) {
        $request->validate(['fields' => 'required|array', 'amount' => 'nullable|numeric|min:0']);

        $case = BGVCase::where('case_id', $caseId)->firstOrFail();
        $user = $request->user();

        if ($user->role === 'client' && $case->client_id !== $user->id && $case->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $checkKey)->firstOrFail();
        
        $check->fields = $request->fields;
        
        if ($user->role === 'admin' && $request->filled('amount')) {
            $check->rate = $request->amount;
        }
        
        $check->save();

        \App\Models\CaseEvent::log($caseId, 'check_fields_saved', ucfirst($checkKey) . ' details saved', '', [], $user);

        return response()->json(['message' => 'Saved', 'fields' => $check->fields]);
    });

    // UPLOAD CHECK DOCUMENT
    Route::post('/cases/{caseId}/checks/{checkKey}/documents', function (Request $request, $caseId, $checkKey) {
        $request->validate([
            'document_key' => 'required|string',
            'file'         => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png',
        ]);

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $checkKey)->firstOrFail();

        $path = $request->file('file')->store("case-documents/{$caseId}/{$checkKey}", 'public');
        $url  = \Illuminate\Support\Facades\Storage::disk('public')->url($path);

        $documents = $check->documents ?? [];
        $documents[$request->document_key] = [
            'name'        => $request->file('file')->getClientOriginalName(),
            'path'        => $path,
            'url'         => $url,
            'uploaded_by' => $request->user()->role,
            'uploaded_at' => now()->toDateTimeString(),
        ];
        
        $check->documents = $documents;
        $check->save();

        return response()->json(['message' => 'Uploaded', 'url' => $url]);
    });

    // SAVE CHECK RESULT (Submit to QC)
    Route::post('/cases/{caseId}/check-result', function (Request $request, $caseId) {
        $request->validate([
            'check_type' => 'required|string',
            'outcome'    => 'required|in:clear,discrepancy,unable',
            'is_draft'   => 'boolean',
        ]);

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $request->check_type)->firstOrFail();
        
        $check->result = [
            'outcome'   => $request->outcome,
            'form_data' => $request->form_data ?? [],
            'is_draft'  => $request->is_draft ?? false,
            'saved_by'  => $request->user()->id,
            'saved_at'  => now()->toDateTimeString(),
        ];
        
        $check->status = ($request->is_draft ?? false) ? 'in-progress' : 'completed';
        $check->save();

        // Roll-up logic to the parent case
        $case = BGVCase::where('case_id', $caseId)->first();
        if ($case) {
            $allChecks = CaseCheck::where('case_id', $caseId)->get();
            $allDone = $allChecks->every(fn($c) => $c->status === 'completed');
            if ($allDone && $case->status !== 'qc-review' && $case->status !== 'completed') {
                $case->update(['status' => 'qc-review']);
            }
        }

        \App\Models\CaseEvent::log($caseId, 'check_result', ucfirst($request->check_type) . ' result saved', 'Outcome: ' . $request->outcome, [], $request->user());

        return response()->json(['message' => 'Result saved']);
    });

    // GENERATE SHARE LINK FOR A SINGLE CHECK
    Route::post('/cases/{caseId}/checks/{checkKey}/share-link', function (Request $request, $caseId, $checkKey) {
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();

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
            'client_id'      => $request->user()->id,
            'expires_at'     => \App\Models\CandidateLink::expiryToCarbon('72h'),
        ]);

        return response()->json(['url' => url("/candidate/{$token}")]);
    });

    // CASE TIMELINE
    Route::get('/cases/{caseId}/timeline', function (Request $request, $caseId) {
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();
        
        if ($request->user()->role === 'client' && $case->client_id !== $request->user()->id && $case->created_by !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
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

    // ── CANDIDATE LINKS (Link Generator Dashboard) ───────────
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

        return response()->json(['message' => 'Candidate link generated', 'link' => ['id' => $link->id, 'link' => url("/candidate/{$token}")]], 201);
    });

    Route::post('/candidate-links/bulk', function (Request $request) {
        $request->validate([
            'rows'                 => 'required|array|min:1',
            'rows.*.candidateName' => 'required|string|max:255',
            'rows.*.email'         => 'required|email',
            'rows.*.checks'        => 'required|array|min:1',
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
            $created[] = ['id' => $link->id, 'link' => url("/candidate/{$token}")];
        }

        return response()->json(['message' => count($created) . ' link(s) generated', 'links' => $created], 201);
    });

    Route::post('/candidate-links/{id}/send', function (Request $request, $id) {
        $request->validate(['method' => 'required|in:SMS,Email']);

        $link = \App\Models\CandidateLink::findOrFail($id);

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
        $link = \App\Models\CandidateLink::findOrFail($id);
        if ($request->user()->role !== 'admin' && $link->client_id !== $request->user()->id) return response()->json(['message' => 'Unauthorized'], 403);
        $link->delete();
        return response()->json(['message' => 'Link revoked']);
    });

    // ── INSTITUTIONS ──────────────────────────────────────────
    Route::get('/institutions', function (Request $request) {
        $query = \App\Models\Institution::query();
        if ($request->type && $request->type !== 'all') $query->where('type', $request->type);
        if ($request->scope) {
            $scope = strtolower($request->scope);
            $query->where(function ($q) use ($scope) {
                $q->where('scope', $scope)->orWhereNull('scope');
            });
        }
        if (!$request->boolean('include_inactive')) $query->where('status', '!=', 'inactive');
        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")->orWhere('code', 'like', "%$s%")->orWhere('state', 'like', "%$s%");
            });
        }
        return response()->json(['institutions' => $query->orderBy('name')->get()]);
    });

    Route::post('/institutions', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);

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

        $inst = \App\Models\Institution::create($request->all());
        return response()->json(['institution' => $inst], 201);
    });

    Route::post('/institutions/bulk', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['rows' => 'required|array|min:1']);
        
        $created = [];
        foreach ($request->rows as $row) {
            $created[] = \App\Models\Institution::create($row);
        }
        return response()->json(['message' => count($created) . ' imported'], 201);
    });

    Route::delete('/institutions/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        \App\Models\Institution::findOrFail($id)->update(['status' => 'inactive']);
        return response()->json(['message' => 'Institution removed']);
    });

    // ── COMPANIES ─────────────────────────────────────────────
    Route::get('/companies', function (Request $request) {
        $query = \App\Models\Company::query();
        if (!$request->boolean('include_inactive')) $query->where('status', '!=', 'inactive');
        if ($request->scope) {
            $scope = strtolower($request->scope);
            $query->where(function ($q) use ($scope) {
                $q->where('scope', $scope)->orWhereNull('scope');
            });
        }
        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%$s%")->orWhere('code', 'like', "%$s%")->orWhere('industry', 'like', "%$s%");
            });
        }
        return response()->json(['companies' => $query->orderBy('name')->get()]);
    });

    Route::post('/companies', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['name' => 'required|string|max:255']);
        $company = \App\Models\Company::create($request->all());
        return response()->json(['company' => $company], 201);
    });

    Route::post('/companies/bulk', function (Request $request) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['rows' => 'required|array|min:1']);
        
        $created = [];
        foreach ($request->rows as $row) {
            $created[] = \App\Models\Company::create($row);
        }
        return response()->json(['message' => count($created) . ' imported'], 201);
    });

    Route::delete('/companies/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        \App\Models\Company::findOrFail($id)->update(['status' => 'inactive']);
        return response()->json(['message' => 'Company removed']);
    });

    // ── CLIENTS DIRECTORY ─────────────────────────────────────
    Route::get('/clients', function (Request $request) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) return response()->json(['message' => 'Unauthorized'], 403);
        
        $clients = User::where('role', 'client')->orderBy('name')->get()->map(function ($u) {
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

    Route::get('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $client = User::where('role', 'client')->findOrFail($id);
        return response()->json(['client' => $client]);
    });

    Route::put('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $client = User::where('role', 'client')->findOrFail($id);

        foreach (['agreedChecks', 'checkRates', 'checkTat'] as $jsonField) {
            if (is_string($request->input($jsonField))) {
                $request->merge([$jsonField => json_decode($request->input($jsonField), true) ?? []]);
            }
        }

        $request->validate([
            'companyName'  => 'required|string|max:255',
            'contactEmail' => 'required|email|unique:users,email,' . $client->id,
            'agreement'    => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        $agreementPath = $client->agreement_path;
        if ($request->hasFile('agreement')) {
            if ($agreementPath) \Illuminate\Support\Facades\Storage::disk('public')->delete($agreementPath);
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

    Route::delete('/clients/{id}', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        User::where('role', 'client')->findOrFail($id)->delete();
        return response()->json(['message' => 'Client removed successfully']);
    });

    Route::post('/clients/{id}/share-link', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $client = User::where('role', 'client')->findOrFail($id);
        
        $client->tokens()->where('name', 'client-share-link')->delete();
        $token = $client->createToken('client-share-link')->plainTextToken;

        return response()->json(['token' => $token]);
    });
});
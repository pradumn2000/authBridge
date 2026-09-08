<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\BGVCase;
use App\Models\User;
use App\Models\CaseCheck; // Ensure your new model is imported

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
// CLIENT SELF-REGISTRATION
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
// CLIENT COMPANY REGISTER
// ─────────────────────────────────────────
Route::post('/clients/register', function (Request $request) {
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
        $rate = $request->checkRates[$check] ?? 1500;
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

    return response()->json([
        'message' => 'Client registered successfully',
        'user'    => ['id' => $user->id, 'name' => $user->name],
    ], 201);
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

    $record = DB::table('password_resets')->where('email', $request->email)->where('verified', true)->first();
    if (!$record) return response()->json(['message' => 'Please verify your OTP first.'], 403);

    $user = User::where('email', $request->email)->first();
    $user->update(['password' => Hash::make($request->password)]);
    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password reset successful.']);
});

// ─────────────────────────────────────────
// CANDIDATE-FACING (public, token-gated)
// ─────────────────────────────────────────
$normalizeCheckKey = function ($key) {
    $map = ['emp' => 'employment', 'edu' => 'education', 'addr' => 'address', 'db' => 'database', 'drug_test' => 'drug', 'courtroom' => 'court'];
    return $map[$key] ?? $key;
};

Route::get('/candidate-link/{token}', function ($token) use ($normalizeCheckKey) {
    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link) return response()->json(['message' => 'Invalid link'], 404);
    if ($link->expires_at && now()->greaterThan($link->expires_at)) return response()->json(['message' => 'Link expired', 'expired' => true], 410);

    $checks = collect($link->checks ?? [])->map($normalizeCheckKey)->values()->all();
    
    // Transform CaseChecks back into old checkDetails shape for candidate portal
    $checkDetails = [];
    if ($link->case_id) {
        $caseChecks = \App\Models\CaseCheck::where('case_id', $link->case_id)->get();
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
        ],
        'checkDetails' => $checkDetails,
    ]);
});

Route::patch('/candidate-link/{token}/fields', function (Request $request, $token) use ($normalizeCheckKey) {
    $request->validate(['check_type' => 'required|string', 'fields' => 'required|array']);

    $link = \App\Models\CandidateLink::where('token', $token)->first();
    if (!$link || !$link->case_id) return response()->json(['message' => 'Invalid link or case'], 404);

    $checkType = $normalizeCheckKey($request->check_type);
    
    $check = \App\Models\CaseCheck::where('case_id', $link->case_id)
                                  ->where('check_type', $checkType)
                                  ->firstOrFail();

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
    $check = \App\Models\CaseCheck::where('case_id', $link->case_id)->where('check_type', $checkType)->firstOrFail();

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
    }

    return response()->json(['message' => 'Submitted successfully']);
});


// ═════════════════════════════════════════
// PROTECTED ROUTES (Bearer token required)
// ═════════════════════════════════════════
Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/me', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    // ── USERS ───────────────────────────────────────────────
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
        return response()->json(['users' => User::orderBy('created_at', 'desc')->get()]);
    });

    Route::patch('/users/{id}/status', function (Request $request, $id) {
        if ($request->user()->role !== 'admin') return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['status' => 'required|in:active,inactive']);

        $user = User::find($id);
        if ($user->role === 'admin' && $request->status !== 'active') return response()->json(['message' => 'Admins cannot be disabled'], 422);
        
        $user->update(['status' => $request->status]);
        return response()->json(['message' => 'Status updated']);
    });

    // ── CASES ROUTES ────────────────────────────────────────
    
    // CREATE CASE
    Route::post('/cases', function (Request $request) {
        $request->validate([
            'candidate_name'  => 'required|string|max:255',
            'candidate_email' => 'required|email',
            'candidate_dob'   => 'required|date',
            'client_name'     => 'required|string|max:255',
            'billing_mode'    => 'required|in:prepaid_client,prepaid_candidate,postpaid_client',
            'checks'          => 'required|array|min:1',
            'check_tat'       => 'nullable|array',
            'check_rates'     => 'nullable|array',  
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
            'billing_mode'     => $request->billing_mode,
            'total_amount'     => $request->total_amount ?? 0,
            'status'           => 'pending',
            'created_by'       => $request->user()->id,
        ]);

        // Insert separate CaseCheck records mapping to this case
        $caseChecksData = [];
        foreach ($request->checks as $checkKey) {
            $caseChecksData[] = [
                'case_id'    => $case->case_id,
                'check_type' => $checkKey,
                'rate'       => $request->check_rates[$checkKey] ?? 0,
                'tat_days'   => $request->check_tat[$checkKey] ?? 0,
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        CaseCheck::insert($caseChecksData);

        return response()->json(['case' => $case], 201);
    });

    // LIST CASES
    Route::get('/cases', function (Request $request) {
        $user  = $request->user();
        
        // Eager load the caseChecks to prevent N+1 queries
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

        $cases = $query->get()->map(function ($c) use ($verifierNames) {
            // Transform the related models back into the JSON array shape the frontend expects
            $checks = $c->checks ?? [];
            $caseChecks = $c->caseChecks; // Collection of CaseCheck models
            
            $totalChecks = count($checks);
            $doneChecks = $caseChecks->where('status', 'completed')->count();
            $progress = $totalChecks > 0 ? (int) round(($doneChecks / $totalChecks) * 100) : 0;

            $documentsCount = $caseChecks->sum(fn ($chk) => count($chk->documents ?? []));

            $assignedIds = $caseChecks->pluck('verifier_id', 'check_type')->filter()->toArray();
            
            $assignedNames = collect($assignedIds)
                ->map(fn ($id) => $verifierNames[$id] ?? null)
                ->filter()
                ->unique()
                ->values();

            $checkTat = $caseChecks->pluck('tat_days', 'check_type')->toArray();
            $maxTat = collect($checkTat)->max();
            $dueDate = ($maxTat > 0 && $c->created_at)
                ? $c->created_at->copy()->addDays((int) round($maxTat))->format('d M Y')
                : null;

            // Optional: Construct old check_details array just in case table views need it
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
                'check_details'      => $checkDetails, // Computed dynamically now
                'check_tat'          => $checkTat,
                'check_rates'        => $caseChecks->pluck('rate', 'check_type')->toArray(),
                'status'             => $c->status,
                'created_at'         => $c->created_at?->format('d M Y'),
                'due_date'           => $dueDate,
                'progress'           => $progress,
                'documents_count'    => $documentsCount,
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

        // Map CaseChecks back to BGVCase attributes so the frontend editing form prefills correctly
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
        
        // Update basic case info
        $case->update($request->only(['candidate_name', 'candidate_email', 'candidate_mobile', 'candidate_dob', 'client_name', 'client_id', 'checks', 'total_amount', 'billing_mode']));

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

        return response()->json(['message' => 'Case updated']);
    });

    // SAVE CHECK FIELDS
    Route::patch('/cases/{caseId}/checks/{checkKey}', function (Request $request, $caseId, $checkKey) {
        $request->validate(['fields' => 'required|array', 'amount' => 'nullable|numeric|min:0']);

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $checkKey)->firstOrFail();
        
        $check->fields = $request->fields;
        if ($request->user()->role === 'admin' && $request->filled('amount')) {
            $check->rate = $request->amount;
        }
        $check->save();

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
            'uploaded_by' => 'client',
            'uploaded_at' => now()->toDateTimeString(),
        ];
        
        $check->documents = $documents;
        $check->save();

        return response()->json(['message' => 'Uploaded', 'url' => $url]);
    });

    // ASSIGN VERIFIER
    Route::patch('/cases/{caseId}/assign', function (Request $request, $caseId) {
        if (!in_array($request->user()->role, ['admin', 'allocator'])) return response()->json(['message' => 'Unauthorized'], 403);
        $request->validate(['check_type' => 'required|string', 'user_id' => 'nullable|integer|exists:users,id']);

        $check = CaseCheck::where('case_id', $caseId)->where('check_type', $request->check_type)->firstOrFail();
        $check->verifier_id = $request->filled('user_id') ? (int) $request->user_id : null;
        $check->save();

        return response()->json(['message' => 'Assigned', 'verifier_id' => $check->verifier_id]);
    });

    // SAVE CHECK RESULT (From a Verifier)
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
            $case->update(['status' => $allDone ? 'qc-review' : 'in-progress']);
        }

        return response()->json(['message' => 'Result saved']);
    });

    // (Keeping Candidate Link generators, Companies, Institutions, Clients largely the same as they don't depend on check_details JSON blobs...)
    Route::post('/cases/{caseId}/checks/{checkKey}/share-link', function (Request $request, $caseId, $checkKey) {
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();
        $token = \App\Models\CandidateLink::generateToken();
        \App\Models\CandidateLink::create([
            'token'          => $token,
            'candidate_name' => $case->candidate_name,
            'email'          => $case->candidate_email,
            'mobile'         => $case->candidate_mobile,
            'case_id'        => $case->case_id,
            'check_type'     => $checkKey,
            'checks'         => [$checkKey],
            'client_id'      => $request->user()->id,
            'expires_at'     => \App\Models\CandidateLink::expiryToCarbon('72h'),
        ]);
        return response()->json(['url' => url("/candidate/{$token}")]);
    });

    // Ensure status updates on the Case work
    Route::patch('/cases/{caseId}/status', function (Request $request, $caseId) {
        $request->validate(['status' => 'required|in:pending,in-progress,qc-review,completed,on-hold']);
        $case = BGVCase::where('case_id', $caseId)->firstOrFail();
        $case->update(['status' => $request->status]);
        return response()->json(['message' => 'Status updated']);
    });

    // ── DASHBOARD STATS ──────────────────────────────────────
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
        $clearRate  = $total > 0 ? round(($completed / $total) * 100) : 0;

        return response()->json([
            'total'       => $total,
            'in_progress' => $inProgress,
            'completed'   => $completed,
            'pending'     => $pending,
            'qc_review'   => $qcReview,
            'clear_rate'  => $clearRate . '%',
        ]);
    });
});
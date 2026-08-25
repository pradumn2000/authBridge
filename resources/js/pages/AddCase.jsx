
// // import { useState, useRef, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";
// // import { API_URL } from "../src/config";

// // const DEFAULT_CHECK_RATES = {
// //   employment: '', education: '', address: '',
// //   database: '',  criminal: '',  drug: '', court: '',
// // };

// // // ── Default turnaround time (in days) per check type — starts at 0,
// // //    admin fills in the actual TAT per case.
// // const DEFAULT_CHECK_TAT = {
// //   employment: '', education: '', address: '',
// //   database: '',  criminal: '',  drug: '', court: '',
// // };

// // const CHECK_TYPES = [
// //   { key: "employment", label: "Employment" },
// //   { key: "education",  label: "Education"  },
// //   { key: "address",    label: "Address"    },
// //   { key: "database",   label: "Database"   },
// //   { key: "criminal",   label: "Criminal"   },
// //   { key: "drug",       label: "Drug Test"  },
// //   { key: "court",      label: "Courtroom"  },
// // ];

// // const BILLING_MODES = [
// //   { key: "prepaid_client",    label: "Prepaid — Client",    desc: "Client pays upfront. Case created immediately.",          color: "#2b3b8c" },
// //   { key: "prepaid_candidate", label: "Prepaid — Candidate", desc: "Candidate pays via payment link before or after docs.",   color: "#0d9488" },
// //   { key: "postpaid_client",   label: "Postpaid — Client",   desc: "Case created now. Client invoiced at month end.",         color: "#7c3aed" },
// // ];

// // // ── SINGLE declaration — remove the duplicate below getEmptyForm ──
// // const CHECK_KEY_ALIASES = {
// //   drug_test: "drug",
// //   courtroom: "court",
// // };

// // function getUser() {
// //   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// // }

// // function buildCheckRates(user) {
// //   if (user.role === "client" && user.checkRates && typeof user.checkRates === "object") {
// //     const rates = { ...DEFAULT_CHECK_RATES };
// //     Object.entries(user.checkRates).forEach(([key, val]) => {
// //       const mapped = CHECK_KEY_ALIASES[key] || key;
// //       if (mapped in rates) rates[mapped] = Number(val) || 0;
// //     });
// //     return rates;
// //   }
// //   return DEFAULT_CHECK_RATES;
// // }

// // // ── Build the TAT map, same pattern as buildCheckRates ──────────────────────
// // function buildCheckTats(user) {
// //   if (user.role === "client" && user.checkTat && typeof user.checkTat === "object") {
// //     const tats = { ...DEFAULT_CHECK_TAT };
// //     Object.entries(user.checkTat).forEach(([key, val]) => {
// //       const mapped = CHECK_KEY_ALIASES[key] || key;
// //       if (mapped in tats) tats[mapped] = Number(val) || 0;
// //     });
// //     return tats;
// //   }
// //   return DEFAULT_CHECK_TAT;
// // }

// // function getEmptyForm(user) {
// //   const isClient = user.role === "client";
// //   const preselectedChecks = isClient && Array.isArray(user.agreedChecks)
// //     ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k).filter(k => CHECK_TYPES.some(ct => ct.key === k))
// //     : [];

// //   return {
// //     candidateName: "", candidateEmail: "", candidateMobile: "",
// //     position: "",
// //     DOB: "",
// //     clientId:   isClient ? String(user.id ?? "") : "",
// //     clientName: isClient ? (user.name || "") : "",
// //     priority: "normal",
// //     billingMode: isClient ? (user.billingMode || "") : "",
// //     checks: preselectedChecks,
// //     notes: "",
// //     paymentTiming: "before", paymentLinkSent: false,
// //     invoiceCycle: "monthly", poNumber: "",
// //   };
// // }

// // // ── <input type="date"> requires exactly "yyyy-MM-dd" — the API returns
// // //    full ISO datetimes (e.g. "2026-08-03T00:00:00.000000Z"), which the
// // //    browser silently rejects ("does not conform to required format").
// // //    Slicing to the first 10 chars keeps just the date part.
// // function toDateInputValue(v) {
// //   if (!v) return "";
// //   const s = String(v);
// //   return s.length >= 10 ? s.slice(0, 10) : s;
// // }

// // // ── Map a case object (as returned by the API) onto form field shape ────────
// // function caseToForm(c, fallback) {
// //   return {
// //     candidateName:   c.candidate_name || c.candidate || fallback.candidateName,
// //     candidateEmail:  c.candidate_email || fallback.candidateEmail,
// //     candidateMobile: c.candidate_mobile || fallback.candidateMobile,
// //     position:        c.position || fallback.position,
// //     DOB:             toDateInputValue(c.candidate_dob || c.dob) || fallback.DOB,
// //     clientId:        c.client_id != null ? String(c.client_id) : fallback.clientId,
// //     clientName:      c.client_name || c.client || fallback.clientName,
// //     priority:        c.priority || fallback.priority,
// //     billingMode:     c.billing_mode || fallback.billingMode,
// //     checks: Array.isArray(c.checks)
// //       ? c.checks.map(k => CHECK_KEY_ALIASES[k] || k)
// //       : (typeof c.checks === "string"
// //           ? c.checks.split(/[·,]/).map(k => CHECK_KEY_ALIASES[k.trim()] || k.trim()).filter(Boolean)
// //           : fallback.checks),
// //     notes:           c.notes || fallback.notes,
// //     paymentTiming:   c.payment_timing || fallback.paymentTiming,
// //     paymentLinkSent: fallback.paymentLinkSent,
// //     invoiceCycle:    c.invoice_cycle || fallback.invoiceCycle,
// //     poNumber:        c.po_number || fallback.poNumber,
// //   };
// // }

// // // ── Bulk upload CSV parser ────────────────────────────────────────────────────
// // function parseBulkCSV(text) {
// //   const lines = text.trim().split("\n").filter(Boolean);
// //   if (lines.length < 2) return { rows: [], errors: ["CSV must have a header row and at least one data row."] };
// //   const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
// //   const rows = [];
// //   const errors = [];
// //   lines.slice(1).forEach((line, i) => {
// //     const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
// //     const row = {};
// //     headers.forEach((h, j) => { row[h] = vals[j] || ""; });
// //     if (!row.candidate_name && !row.candidate) { errors.push(`Row ${i + 2}: missing candidate name`); return; }
// //     if (!row.candidate_email && !row.email)    { errors.push(`Row ${i + 2}: missing email`); return; }
// //     rows.push({
// //       candidate_name:  row.candidate_name || row.candidate,
// //       candidate_email: row.candidate_email || row.email,
// //       candidate_mobile: row.mobile || row.candidate_mobile || "",
// //       position:        row.position || "",
// //       checks:          (row.checks || "employment").split("|").map(c => c.trim()),
// //       billing_mode:    row.billing_mode || "postpaid_client",
// //       client_name:     row.client_name || row.client || "",
// //     });
// //   });
// //   return { rows, errors };
// // }

// // export default function AddCase() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const user = getUser();
// //   const isClientUser = user.role === "client";
// //   const isAdminUser  = user.role === "admin";

// //   // ── Edit mode is driven entirely by ?editCaseId=... in the URL ──────────────
// //   const editCaseId = new URLSearchParams(location.search).get("editCaseId") || null;
// //   const isEditMode = Boolean(editCaseId);

// //   const [form, setForm]               = useState(() => getEmptyForm(user));
// //   const [submitted, setSubmitted]     = useState(false);
// //   const [loading, setLoading]         = useState(false);
// //   const [error, setError]             = useState("");
// //   const [caseId, setCaseId]           = useState(null);
// //   const [generatedLink, setGeneratedLink] = useState("");
// //   const [linkCopied, setLinkCopied]   = useState(false);

// //   // ── Check rates — admin can edit these live per case; everyone else uses
// //   //    the fixed default / contract rate as-is.
// //   const [rates, setRates] = useState(() => buildCheckRates(user));

// //   // ── Check TAT (turnaround time, in days) — admin can edit these live per
// //   //    case; everyone else sees the fixed default / contract TAT as-is.
// //   const [tats, setTats] = useState(() => buildCheckTats(user));

// //   // ── Edit mode: fetch the existing case and prefill the form ─────────────────
// //   const [fetchingCase, setFetchingCase] = useState(isEditMode);
// //   const [loadError, setLoadError]       = useState("");

// //   // ── Real client list for the dropdown — client-role users have their
// //   //    own clientId/clientName locked already (getEmptyForm), so this only
// //   //    needs to run for admin/allocator users who are picking a client.
// //   const [clients, setClients]             = useState([]);
// //   const [clientsLoading, setClientsLoading] = useState(!isClientUser);
// //   const [clientsError, setClientsError]   = useState("");

// //   useEffect(() => {
// //     if (isClientUser) return;

// //     let cancelled = false;
// //     const token = localStorage.getItem("token");

// //     setClientsLoading(true);
// //     setClientsError("");

// //     fetch(`${API_URL}/api/clients`, {
// //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //     })
// //       .then(r => r.json())
// //       .then(data => { if (!cancelled) setClients(data.clients || []); })
// //       .catch(() => { if (!cancelled) setClientsError("Failed to load clients."); })
// //       .finally(() => { if (!cancelled) setClientsLoading(false); });

// //     return () => { cancelled = true; };
// //   }, [isClientUser]);

// //   useEffect(() => {
// //     if (!isEditMode) return;

// //     let cancelled = false;
// //     const token = localStorage.getItem("token");

// //     setFetchingCase(true);
// //     setLoadError("");

// //     fetch(`${API_URL}/api/cases/${encodeURIComponent(editCaseId)}`, {
// //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //     })
// //       .then(r => {
// //         if (!r.ok) throw new Error(r.status === 404 ? "This case could not be found." : "Failed to load case details.");
// //         return r.json();
// //       })
// //       .then(data => {
// //         if (cancelled) return;
// //         const c = data.case || data;
// //         setForm(prev => caseToForm(c, prev));
// //         if (c.total_amount != null) {
// //           // Keep admin-editable rates in sync with whatever was actually
// //           // billed on this case, if the API returns a per-check breakdown.
// //           if (c.check_rates && typeof c.check_rates === "object") {
// //             setRates(prev => {
// //               const next = { ...prev };
// //               Object.entries(c.check_rates).forEach(([k, v]) => {
// //                 const mapped = CHECK_KEY_ALIASES[k] || k;
// //                 if (mapped in next) next[mapped] = Number(v) || 0;
// //               });
// //               return next;
// //             });
// //           }
// //         }
// //         // Keep admin-editable TAT in sync with whatever was actually set on
// //         // this case, if the API returns a per-check TAT breakdown.
// //         if (c.check_tat && typeof c.check_tat === "object") {
// //           setTats(prev => {
// //             const next = { ...prev };
// //             Object.entries(c.check_tat).forEach(([k, v]) => {
// //               const mapped = CHECK_KEY_ALIASES[k] || k;
// //               if (mapped in next) next[mapped] = Number(v) || 0;
// //             });
// //             return next;
// //           });
// //         }
// //         if (c.payment_link) setGeneratedLink(c.payment_link);
// //       })
// //       .catch(err => { if (!cancelled) setLoadError(err.message || "Failed to load case details."); })
// //       .finally(() => { if (!cancelled) setFetchingCase(false); });

// //     return () => { cancelled = true; };
// //   }, [editCaseId, isEditMode]);

// //   // ── Bulk upload state ───────────────────────────────────────────────────────
// //   const [showBulkModal, setShowBulkModal] = useState(false);
// //   const [bulkRows, setBulkRows]           = useState([]);
// //   const [bulkErrors, setBulkErrors]       = useState([]);
// //   const [bulkUploading, setBulkUploading] = useState(false);
// //   const [bulkDone, setBulkDone]           = useState(false);
// //   const fileInputRef = useRef(null);

// //   const setRate = (key, value) => {
// //     const num = Number(value);
// //     setRates(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
// //   };

// //   // ── Update a single check's TAT (days) ───────────────────────────────────
// //   const setTat = (key, value) => {
// //     const num = Number(value);
// //     setTats(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
// //   };

// //   const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

// //   const toggleCheck = (key) =>
// //     setForm(p => ({
// //       ...p,
// //       checks: p.checks.includes(key)
// //         ? p.checks.filter(c => c !== key)
// //         : [...p.checks, key],
// //     }));

// //   const selectAll = () => setForm(p => ({ ...p, checks: visibleCheckTypes.map(c => c.key) }));
// //   const clearAll  = () => setForm(p => ({ ...p, checks: [] }));

// //   const totalAmount = form.checks.reduce((s, k) => s + (rates[k] || 0), 0);

// //   // ── Checks a client account is actually allowed to pick. A client is
// //   //    restricted to whatever the admin configured on their account
// //   //    (agreedChecks) — they shouldn't be able to add a check type they
// //   //    have no contract/rate for. Anything already on the case being
// //   //    edited stays visible too, so an existing case doesn't lose a row
// //   //    just because the client's contract changed after it was created.
// //   //    Admin/staff are never restricted.
// //   const agreedCheckKeys = isClientUser && Array.isArray(user.agreedChecks)
// //     ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k)
// //     : null; // null = no restriction

// //   const visibleCheckTypes = agreedCheckKeys
// //     ? CHECK_TYPES.filter(ct => agreedCheckKeys.includes(ct.key) || form.checks.includes(ct.key))
// //     : CHECK_TYPES;

// //   // ── Per-check TAT display — shows each selected check's day count
// //   //    individually (e.g. "5, 6, 7") instead of summing them. A sum
// //   //    overstates the real timeline since checks typically run in
// //   //    parallel, not back-to-back.
// //   const overallTatValues  = form.checks.map(k => Number(tats[k]) || 0);
// //   const overallTatDisplay = overallTatValues.length > 0 ? overallTatValues.join(", ") : "";

// //   // Kept as a single number for anything that still needs one — e.g.
// //   // AllClients.jsx's per-client average-TAT aggregate reads this field via
// //   // Number(c.overall_tat ?? c.tat). Using the longest single check here
// //   // (not the sum) so that aggregate stays meaningful.
// //   const overallTat = overallTatValues.length > 0 ? Math.max(...overallTatValues) : 0;

// //   // ── TAT payload actually sent to the API — scoped to selected checks only.
// //   //    `tats` state always carries all 7 keys (empty string default for
// //   //    anything the user hasn't touched), so sending the raw object as-is
// //   //    pushes empty strings for unselected checks and trips the backend's
// //   //    "must be a number" validation. Only the checks in form.checks are
// //   //    relevant, and everything in there gets coerced to a real number.
// //   const checkTatPayload = Object.fromEntries(
// //     form.checks.map(k => [k, Number(tats[k]) || 0])
// //   );
// //   const checkRatesPayload = Object.fromEntries(
// //   form.checks.map(k => [k, Number(rates[k]) || 0])
// // );

// //   // Only used by admin/allocator — clients have a locked clientId/clientName.
// //   // NOTE: billing_mode field name is a guess (billing_mode / billingMode /
// //   // billingDefault) until I can see the actual /api/clients response shape —
// //   // worth double-checking once the backend files are shared.
// //   const handleClientChange = (clientId) => {
// //     const client = clients.find(c => String(c.id) === clientId);
// //     setForm(p => ({
// //       ...p,
// //       clientId,
// //       clientName:  client?.company_name || client?.name || "",
// //       billingMode: client?.billing_mode || client?.billingMode || client?.billingDefault || p.billingMode,
// //     }));
// //   };

// //   const generatePaymentLink = () => {
// //     const fake = `https://pay.bgvportal.in/c/${Math.random().toString(36).slice(2, 10)}`;
// //     setGeneratedLink(fake);
// //   };

// //   const copyLink = () => {
// //     navigator.clipboard.writeText(generatedLink);
// //     setLinkCopied(true);
// //     setTimeout(() => setLinkCopied(false), 2000);
// //   };

// //   const validate = () => {
// //     if (!form.candidateName.trim())  return "Candidate name is required.";
// //     if (!form.candidateEmail.trim()) return "Candidate email is required.";
// //     if (!form.DOB)                   return "Candidate date of birth is required.";
// //     if (!form.clientId)              return "Please select a client.";
// //     if (!form.billingMode) {
// //       return isClientUser
// //         ? "Your account doesn't have a billing mode set. Please contact support."
// //         : "Please select a billing mode.";
// //     }
// //     if (form.checks.length === 0)    return "Select at least one check type.";
// //     return null;
// //   };

// //   // ── Submit to real API — POST to create, PUT to update an existing case ─────
// //   const handleSubmit = async () => {
// //     const err = validate();
// //     if (err) { setError(err); return; }

// //     setError("");
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem("token");
// //       const url    = isEditMode ? `${API_URL}/api/cases/${encodeURIComponent(editCaseId)}` : `${API_URL}/api/cases`;
// //       const method = isEditMode ? "PUT" : "POST";

// //       const res = await fetch(url, {
// //         method,
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           candidate_name:   form.candidateName,
// //           candidate_email:  form.candidateEmail,
// //           candidate_mobile: form.candidateMobile,
// //           candidate_dob:    form.DOB,
// //           position:         form.position,
// //           client_name:      form.clientName,
// //           client_id:        form.clientId || null,
// //           checks:           form.checks,
// //           priority:         form.priority,
// //           billing_mode:     form.billingMode,
// //           payment_timing:   form.paymentTiming,
// //           invoice_cycle:    form.invoiceCycle,
// //           po_number:        form.poNumber,
// //           total_amount:     totalAmount,
// //           check_tat:        checkTatPayload,
// //           check_rates:      checkRatesPayload, 
// //           overall_tat:      overallTat,
// //           payment_link:     generatedLink || null,
// //           notes:            form.notes,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.message || (isEditMode ? "Failed to update case." : "Failed to create case."));
// //         return;
// //       }

// //       setCaseId(isEditMode ? editCaseId : data.case.case_id);
// //       setSubmitted(true);

// //     } catch {
// //       setError("Server error. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setForm(getEmptyForm(user));
// //     setRates(buildCheckRates(user));
// //     setTats(buildCheckTats(user));
// //     setSubmitted(false);
// //     setCaseId(null);
// //     setGeneratedLink("");
// //     setError("");
// //   };

// //   // ── Bulk upload handlers ────────────────────────────────────────────────────
// //   const handleBulkFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = (ev) => {
// //       const { rows, errors } = parseBulkCSV(ev.target.result);
// //       setBulkRows(rows);
// //       setBulkErrors(errors);
// //       setBulkDone(false);
// //     };
// //     reader.readAsText(file);
// //   };

// //   const handleBulkSubmit = async () => {
// //     if (bulkRows.length === 0) return;
// //     setBulkUploading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const results = await Promise.allSettled(
// //         bulkRows.map(row =>
// //           fetch(`${API_URL}/api/cases`, {
// //             method: "POST",
// //             headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
// //             body: JSON.stringify(row),
// //           })
// //         )
// //       );
// //       const failed = results.filter(r => r.status === "rejected" || (r.value && !r.value.ok)).length;
// //       setBulkErrors(failed > 0 ? [`${failed} case(s) failed to upload. Others may have succeeded.`] : []);
// //       setBulkDone(true);
// //     } catch (err) {
// //       setBulkErrors([err.message]);
// //     } finally {
// //       setBulkUploading(false);
// //     }
// //   };

// //   const closeBulkModal = () => {
// //     setShowBulkModal(false);
// //     setBulkRows([]);
// //     setBulkErrors([]);
// //     setBulkDone(false);
// //     if (fileInputRef.current) fileInputRef.current.value = "";
// //   };

// //   const activeBilling = BILLING_MODES.find(b => b.key === form.billingMode);

// //   // ── Edit mode: loading state while the case is being fetched ────────────────
// //   if (isEditMode && fetchingCase) {
// //     return (
// //       <>
// //         <Sidebar />
// //         <section id="content">
// //           <Header />
// //           <main>
// //             <div className="dash-wrper">
// //               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
// //                 <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading case details…</p>
// //               </div>
// //             </div>
// //           </main>
// //         </section>
// //         <style>{sharedStyles}</style>
// //       </>
// //     );
// //   }

// //   // ── Edit mode: case failed to load ───────────────────────────────────────────
// //   if (isEditMode && loadError) {
// //     return (
// //       <>
// //         <Sidebar />
// //         <section id="content">
// //           <Header />
// //           <main>
// //             <div className="dash-wrper">
// //               <div style={{ textAlign: "center", padding: "80px 20px" }}>
// //                 <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>{loadError}</p>
// //                 <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
// //                   ← Back to Cases
// //                 </button>
// //               </div>
// //             </div>
// //           </main>
// //         </section>
// //         <style>{sharedStyles}</style>
// //       </>
// //     );
// //   }

// //   // ── Success Screen ────────────────────────────────────────
// //   if (submitted) {
// //     return (
// //       <>
// //         <Sidebar />
// //         <section id="content">
// //           <Header />
// //           <main>
// //             <div className="dash-wrper">
// //               <div className="ac-success-wrap">
// //                 <div className="ac-success-card">
// //                   <div className="ac-success-icon">✓</div>
// //                   <h2 className="ac-success-title">{isEditMode ? "Case Updated" : "Case Created"}</h2>
// //                   <p className="ac-success-id">{caseId}</p>

// //                   <div className="ac-success-meta">
// //                     <div className="ac-success-meta-row">
// //                       <span>Candidate</span><strong>{form.candidateName}</strong>
// //                     </div>
// //                     <div className="ac-success-meta-row">
// //                       <span>DOB</span><strong>{form.DOB}</strong>
// //                     </div>
// //                     <div className="ac-success-meta-row">
// //                       <span>Client</span><strong>{form.clientName}</strong>
// //                     </div>
// //                     <div className="ac-success-meta-row">
// //                       <span>Billing</span>
// //                       <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
// //                     </div>
// //                     <div className="ac-success-meta-row">
// //                       <span>Estimated TAT</span>
// //                       <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
// //                     </div>
// //                     {form.billingMode === "postpaid_client" && (
// //                       <div className="ac-success-meta-row">
// //                         <span>Invoice Cycle</span>
// //                         <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
// //                       </div>
// //                     )}
    
// //                   </div>

// //                   <div className="ac-success-checks">
// //                     {form.checks.map(c => (
// //                       <span key={c} className="ac-check-badge">
// //                         {CHECK_TYPES.find(t => t.key === c)?.label}
// //                       </span>
// //                     ))}
// //                   </div>

// //                   {form.billingMode === "prepaid_candidate" && generatedLink && (
// //                     <div className="ac-success-link-box">
// //                       <p className="ac-success-link-label">Payment Link</p>
// //                       <p className="ac-success-link-url">{generatedLink}</p>
// //                     </div>
// //                   )}

// //                   <div className="ac-success-actions">
// //                     <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
// //                       View All Cases
// //                     </button>
// //                     {!isEditMode && (
// //                       <button className="secondary-cta import" onClick={handleReset}>
// //                         Add Another
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </main>
// //         </section>
// //         <style>{sharedStyles}</style>
// //       </>
// //     );
// //   }

// //   // ── Main Form ─────────────────────────────────────────────
// //   return (
// //     <>
// //       <Sidebar />
// //       <section id="content">
// //         <Header />
// //         <main>
// //           <div className="dash-wrper">

// //             <div className="dash-upper-head">
// //               <div className="left">
// //                 <h2 className="ac-page-title">{isEditMode ? `Edit Case — ${editCaseId}` : "Add New Case"}</h2>
// //               </div>
// //               <div className="right">
// //                 {!isEditMode && (
// //                   <button className="secondary-cta import"
// //                     onClick={() => setShowBulkModal(true)}
// //                     style={{ display: "flex", alignItems: "center", gap: "6px" }}>
// //                     <img src="images/dashboard/export-excel.svg" alt="" style={{ width: "16px" }} />
// //                     Bulk Upload
// //                   </button>
// //                 )}
// //                 <button className="secondary-cta import" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
// //                   ← All Cases
// //                 </button>
// //               </div>
// //             </div>

// //             {isEditMode && (
// //               <div style={{
// //                 background: "#eef3ff", border: "1px solid #c7d2fe", borderRadius: "8px",
// //                 padding: "12px 16px", color: "#2b3b8c", fontSize: "14px", margin: "12px 0"
// //               }}>
// //                 Editing case <strong>{editCaseId}</strong>. Your changes will be saved to this case.
// //               </div>
// //             )}

// //             {error && (
// //               <div style={{
// //                 background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px",
// //                 padding: "12px 16px", color: "#dc2626", fontSize: "14px", margin: "12px 0"
// //               }}>
// //                 {error}
// //               </div>
// //             )}

// //             <div className="ac-layout">

// //               {/* ══ LEFT COLUMN ══ */}
// //               <div className="ac-left">

// //                 {/* 01 — Candidate Info */}
// //                 <div className="ac-card">
// //                   <div className="ac-card-header">
// //                     <span className="ac-num">01</span>
// //                     <h3>Candidate Information</h3>
// //                   </div>
// //                   <div className="ac-fields">
// //                     <div className="ac-field">
// //                       <label className="ac-label">Candidate Name <span className="ac-req">*</span></label>
// //                       <input className="ac-input" type="text" placeholder="Full name as per documents"
// //                         value={form.candidateName} onChange={e => set("candidateName", e.target.value)} />
// //                     </div>
// //                     <div className="ac-field">
// //                       <label className="ac-label">Email Address <span className="ac-req">*</span></label>
// //                       <input className="ac-input" type="email" placeholder="candidate@email.com"
// //                         value={form.candidateEmail} onChange={e => set("candidateEmail", e.target.value)} />
// //                     </div>
// //                     <div className="ac-field">
// //   <label className="ac-label">
// //     Mobile Number <span className="form-required">*</span>
// //   </label>

// //   <input
// //     className="ac-input"
// //     type="tel"
// //     placeholder="+91 XXXXX XXXXX"
// //     value={form.candidateMobile}
// //     onChange={(e) => {
// //       const value = e.target.value.replace(/\D/g, "").slice(0, 12);
// //       set("candidateMobile", value);
// //     }}
// //     required
// //     maxLength={12}
// //     pattern="[0-9]{12}"
// //     title="Please enter a valid 12-digit mobile number"
// //   />
// // </div>
// //                     <div className="ac-field">
// //   <label className="ac-label">
// //     Position Applied For <span className="form-required">*</span>
// //   </label>

// //   <input
// //     className="ac-input"
// //     type="text"
// //     placeholder="e.g. Senior Engineer"
// //     value={form.position}
// //     onChange={e => set("position", e.target.value)}
// //   />
// // </div>
// //                     <div className="ac-field">
// //                       <label className="ac-label">Date of Birth <span className="ac-req">*</span></label>
// //                       <input className="ac-input" type="date"
// //                         value={form.DOB} onChange={e => set("DOB", e.target.value)} />
// //                     </div>

// //                     {/* Client field — locked to self for client-role users */}
// //                     <div className="ac-field">
// //                       <label className="ac-label">Client <span className="ac-req">*</span></label>
// //                       {isClientUser ? (
// //                         <div className="ac-input ac-input-readonly">{form.clientName || user.name}</div>
// //                       ) : (
// //                         <>
// //                           <select className="ac-input ac-select" value={form.clientId}
// //                             onChange={e => handleClientChange(e.target.value)}
// //                             disabled={clientsLoading}>
// //                             <option value="">
// //                               {clientsLoading
// //                                 ? "Loading clients…"
// //                                 : clientsError
// //                                 ? "Failed to load clients"
// //                                 : clients.length === 0
// //                                 ? "No clients found"
// //                                 : "— Select Client —"}
// //                             </option>
// //                             {clients.map(c => (
// //                               <option key={c.id} value={c.id}>{c.company_name || c.name}</option>
// //                             ))}
// //                           </select>
// //                           {clientsError && (
// //                             <span style={{ fontSize: "0.72rem", color: "#dc2626" }}>
// //                               {clientsError} — check your connection and reload.
// //                             </span>
// //                           )}
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* 02 — Billing Mode */}
// //                 <div className="ac-card">
// //                   <div className="ac-card-header">
// //                     <span className="ac-num">02</span>
// //                     <h3>Billing Mode <span className="ac-req">*</span></h3>
// //                     {!isClientUser && form.clientId && (
// //                       <span className="ac-billing-hint">Auto-set from client · override below</span>
// //                     )}
// //                   </div>

// //                   {isClientUser ? (
// //                     activeBilling ? (
// //                       <div className="ac-billing-locked">
// //                         <div className="ac-billing-tile ac-billing-active"
// //                           style={{ borderColor: activeBilling.color, background: `${activeBilling.color}10`, cursor: "default" }}>
// //                           <div className="ac-billing-tile-top">
// //                             <span className="ac-billing-dot" style={{ background: activeBilling.color }} />
// //                             <span className="ac-billing-label" style={{ color: activeBilling.color }}>
// //                               🔒 {activeBilling.label}
// //                             </span>
// //                           </div>
// //                           <p className="ac-billing-desc">{activeBilling.desc}</p>
// //                         </div>
// //                         <p className="ac-billing-locked-note">
// //                           This is your account's registered billing mode and can't be changed here.
// //                           Contact your account manager to update it.
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626" }}>
// //                         <span className="ac-billing-info-icon">⚠</span>
// //                         <span>No billing mode is set on your account. Please contact support before creating a case.</span>
// //                       </div>
// //                     )
// //                   ) : (
// //                     <div className="ac-billing-grid">
// //                       {BILLING_MODES.map(mode => {
// //                         const active = form.billingMode === mode.key;
// //                         return (
// //                           <button key={mode.key} type="button"
// //                             className={`ac-billing-tile ${active ? "ac-billing-active" : ""}`}
// //                             style={active ? { borderColor: mode.color, background: `${mode.color}10` } : {}}
// //                             onClick={() => set("billingMode", mode.key)}>
// //                             <div className="ac-billing-tile-top">
// //                               <span className="ac-billing-dot"
// //                                 style={{ background: active ? mode.color : "#cbd5e1" }} />
// //                               <span className="ac-billing-label"
// //                                 style={active ? { color: mode.color } : {}}>
// //                                 {mode.label}
// //                               </span>
// //                             </div>
// //                             <p className="ac-billing-desc">{mode.desc}</p>
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
// //                   )}

// //                   {form.billingMode === "prepaid_client" && (
// //                     <div className="ac-billing-section">
// //                       <div className="ac-billing-info-row">
// //                         <span className="ac-billing-info-icon">ℹ</span>
// //                         <span>Client has prepaid. Case will be created and deducted from their balance immediately.</span>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {form.billingMode === "prepaid_candidate" && (
// //                     <div className="ac-billing-section">
// //                       <div className="ac-field">
// //                         <label className="ac-label">When does candidate pay?</label>
// //                         <div className="ac-timing-row">
// //                           {[
// //                             { key: "before", label: "Before submitting docs" },
// //                             { key: "after",  label: "After submitting docs"  },
// //                           ].map(t => (
// //                             <button key={t.key} type="button"
// //                               className={`ac-timing-btn ${form.paymentTiming === t.key ? "ac-timing-active" : ""}`}
// //                               onClick={() => set("paymentTiming", t.key)}>
// //                               {t.label}
// //                             </button>
// //                           ))}
// //                         </div>
// //                       </div>
// //                       {isAdminUser && (
// //                         <div className="ac-field">
// //                           <label className="ac-label">Payment Amount</label>
// //                           <div className="ac-amount-display">
// //                             ₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}
// //                             <span className="ac-amount-note">
// //                               {form.checks.length > 0
// //                                 ? `(${form.checks.length} checks selected)`
// //                                 : "Select checks to calculate"}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       )}
// //                       <div className="ac-field">
// //                         <label className="ac-label">Payment Link</label>
// //                         {!generatedLink ? (
// //                           <button type="button" className="ac-gen-link-btn" onClick={generatePaymentLink}>
// //                             + Generate Payment Link
// //                           </button>
// //                         ) : (
// //                           <>
// //                             <div className="ac-link-row">
// //                               <span className="ac-link-url">{generatedLink}</span>
// //                               <button type="button" className="ac-copy-btn" onClick={copyLink}>
// //                                 {linkCopied ? "Copied!" : "Copy"}
// //                               </button>
// //                             </div>
// //                             <div className="ac-link-send-row">
// //                               <button type="button" className="ac-send-btn ac-send-sms">📱 SMS</button>
// //                               <button type="button" className="ac-send-btn ac-send-email">✉ Email</button>
// //                               <button type="button" className="ac-send-btn ac-send-wa">💬 WhatsApp</button>
// //                             </div>
// //                           </>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}

// //                   {form.billingMode === "postpaid_client" && (
// //                     <div className="ac-billing-section">
// //                       <div className="ac-field">
// //                         <label className="ac-label">Invoice Cycle</label>
// //                         <div className="ac-timing-row">
// //                           {[
// //                             { key: "monthly",  label: "Monthly Invoice" },
// //                             { key: "per_case", label: "Per Case Invoice" },
// //                           ].map(t => (
// //                             <button key={t.key} type="button"
// //                               className={`ac-timing-btn ${form.invoiceCycle === t.key ? "ac-timing-active" : ""}`}
// //                               onClick={() => set("invoiceCycle", t.key)}>
// //                               {t.label}
// //                             </button>
// //                           ))}
// //                         </div>
// //                       </div>
// //                       <div className="ac-field">
// //                         <label className="ac-label">PO Number <span className="ac-optional">(optional)</span></label>
// //                         <input className="ac-input" type="text" placeholder="e.g. PO-2024-0391"
// //                           value={form.poNumber} onChange={e => set("poNumber", e.target.value)} />
// //                       </div>
// //                       {isAdminUser ? (
// //                         <div className="ac-billing-info-row">
// //                           <span className="ac-billing-info-icon">ℹ</span>
// //                           <span>
// //                             Invoice of <strong>₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}</strong> will be
// //                             raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
// //                           </span>
// //                         </div>
// //                       ) : (
// //                         <div className="ac-billing-info-row">
// //                           <span className="ac-billing-info-icon">ℹ</span>
// //                           <span>
// //                             Invoice will be raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>

// //               </div>

// //               {/* ══ RIGHT COLUMN ══ */}
// //               <div className="ac-right">

// //                 {/* 03 — Check Types */}
// //                 <div className="ac-card">
// //                   <div className="ac-card-header">
// //                     <span className="ac-num">03</span>
// //                     <h3>Check Types <span className="ac-req">*</span></h3>
// //                     <div className="ac-check-ctrl">
// //                       <button type="button" className="ac-link-btn" onClick={selectAll}>All</button>
// //                       <span>·</span>
// //                       <button type="button" className="ac-link-btn" onClick={clearAll}>Clear</button>
// //                     </div>
// //                   </div>

// //                   <div className="ac-checks-table-container">
// //   {isClientUser && visibleCheckTypes.length === 0 && (
// //     <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626", marginBottom: "12px" }}>
// //       <span className="ac-billing-info-icon">⚠</span>
// //       <span>No check types are configured on your account yet. Contact your account manager before creating a case.</span>
// //     </div>
// //   )}
// //   <table className="ac-checks-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
// //     <thead>
// //       <tr>
// //         <th style={{ textAlign: 'left', padding: '12px' }}>Check Type</th>
// //         <th style={{ textAlign: 'left', padding: '12px' }}>Amount</th>
// //         <th style={{ textAlign: 'left', padding: '12px' }}>TAT</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       {visibleCheckTypes.map(ct => {
// //         const active = form.checks.includes(ct.key);
// //         const tatValue = Number(tats[ct.key]) || 0;

// //         // TAT color logic based on reference image
// //         const getTatIndicator = (days) => {
// //           if (days <= 1) return { color: '#2ecc71', label: `${days} Day` }; // Green
// //           if (days <= 3) return { color: '#f1c40f', label: `${days} Days` }; // Yellow
// //           return { color: '#e74c3c', label: `${days} Days` }; // Red/Orange
// //         };

// //         const tatDetails = getTatIndicator(tatValue);

// //         return (
// //           <tr 
// //             key={ct.key} 
// //             className={active ? "ac-check-active" : ""}
// //             style={{ borderBottom: '1px solid #eaeaea', cursor: 'pointer' }}
// //             onClick={() => toggleCheck(ct.key)}
// //           >
// //             {/* Check Type Column (Name with dot indicator) */}
// //             <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <span className="ac-check-dot" />
// //               <span>{ct.label}</span>
// //             </td>

// //             {/* Amount Column */}
// //             <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
// //               {isAdminUser ? (
// //                 <div className="ac-check-rate-edit" title="Rate">
// //                   <span className="ac-rate-prefix">₹</span>
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     className="ac-rate-input"
// //                     value={rates[ct.key]}
// //                     onChange={(e) => setRate(ct.key, e.target.value)}
// //                   />
// //                 </div>
// //               ) : (
// //                 <div className="ac-check-rate-display" title="Configured rate">
// //                   <span className="ac-rate-prefix">₹</span>
// //                   <span className="ac-rate-value">{rates[ct.key]}</span>
// //                 </div>
// //               )}
// //             </td>

// //             {/* TAT Column */}
// //             <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
// //               {isAdminUser || !isClientUser ? (
// //                 <div className="ac-check-rate-edit" title="Turnaround time (days)" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                   <span 
// //                     style={{ 
// //                       height: '10px', 
// //                       width: '10px', 
// //                       backgroundColor: tatDetails.color, 
// //                       borderRadius: '50%', 
// //                       display: 'inline-block' 
// //                     }} 
// //                   />
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     className="ac-rate-input ac-tat-input"
// //                     value={tats[ct.key]}
// //                     onChange={(e) => setTat(ct.key, e.target.value)}
// //                     style={{ width: '60px' }}
// //                   />
// //                   <span className="ac-rate-suffix">days</span>
// //                 </div>
// //               ) : (
// //                 <div className="ac-check-rate-display" title="Turnaround time" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                   <span 
// //                     style={{ 
// //                       height: '10px', 
// //                       width: '10px', 
// //                       backgroundColor: tatDetails.color, 
// //                       borderRadius: '50%', 
// //                       display: 'inline-block' 
// //                     }} 
// //                   />
// //                   <span className="ac-rate-value">{tats[ct.key]}</span>
// //                   <span className="ac-rate-suffix">d</span>
// //                 </div>
// //               )}
// //             </td>
// //           </tr>
// //         );
// //       })}
// //     </tbody>
// //   </table>
// // </div>
// //                   <div className="ac-amount-bar">
// //                     <span>{form.checks.length} of {visibleCheckTypes.length} selected</span>
// //                     <span className="ac-tat-bar-item">
// //                       Est. TAT: <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
// //                     </span>
// //                     {isAdminUser && (
// //                       <span className="ac-total-amt">Total: ₹{totalAmount.toLocaleString()}</span>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* 04 — Notes */}
// //                 <div className="ac-card">
// //                   <div className="ac-card-header">
// //                     <span className="ac-num">04</span>
// //                     <h3>Internal Notes</h3>
// //                   </div>
// //                   <textarea className="ac-textarea" rows={4}
// //                     placeholder="Special instructions for the verifier team..."
// //                     value={form.notes} onChange={e => set("notes", e.target.value)} />
// //                 </div>

// //                 {/* Summary strip */}
// //                 {form.billingMode && form.checks.length > 0 && (
// //                   <div className="ac-summary-strip"
// //                     style={{ borderColor: activeBilling?.color, background: `${activeBilling?.color}0d` }}>
// //                     <div className="ac-summary-row">
// //                       <span>Billing</span>
// //                       <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
// //                     </div>
// //                     <div className="ac-summary-row">
// //                       <span>Checks</span>
// //                       <strong>{form.checks.length} selected</strong>
// //                     </div>
// //                     <div className="ac-summary-row">
// //                       <span>Estimated TAT</span>
// //                       <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
// //                     </div>
// //                     {form.billingMode === "prepaid_candidate" && (
// //                       <div className="ac-summary-row">
// //                         <span>Payment</span>
// //                         <strong>{form.paymentTiming === "before" ? "Before docs" : "After docs"}</strong>
// //                       </div>
// //                     )}
// //                     {form.billingMode === "postpaid_client" && form.invoiceCycle && (
// //                       <div className="ac-summary-row">
// //                         <span>Invoice</span>
// //                         <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 <button className="primary-cta ac-submit-btn"
// //                   onClick={handleSubmit} disabled={loading}>
// //                   {loading
// //                     ? (isEditMode ? "Saving Changes..." : "Creating Case...")
// //                     : (isEditMode ? "Save Changes" : "Create Case →")}
// //                 </button>

// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </section>

// //       {/* ── Bulk Upload Modal ────────────────────────────────────────────────── */}
// //       {showBulkModal && (
// //         <div style={{
// //           position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
// //           display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
// //         }}>
// //           <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "640px",
// //             width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
// //               <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Bulk Upload Cases</h3>
// //               <button onClick={closeBulkModal}
// //                 style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>×</button>
// //             </div>

// //             {!bulkDone ? (
// //               <>
// //                 <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "16px", marginBottom: "20px", fontSize: "13px", color: "#475569" }}>
// //                   <strong>CSV Format:</strong> Upload a CSV file with the following columns:<br />
// //                   <code style={{ fontSize: "12px", background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
// //                     candidate_name, candidate_email, mobile, position, checks, billing_mode, client_name
// //                   </code><br />
// //                   <span style={{ marginTop: "6px", display: "block" }}>
// //                     For <code>checks</code>, separate multiple checks with <code>|</code> e.g. <code>employment|education|address</code>
// //                   </span>
// //                 </div>

// //                 <input ref={fileInputRef} type="file" accept=".csv" onChange={handleBulkFileChange}
// //                   style={{ marginBottom: "16px", fontSize: "13px" }} />

// //                 {bulkErrors.length > 0 && (
// //                   <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px",
// //                     padding: "12px", marginBottom: "16px", fontSize: "13px", color: "#dc2626" }}>
// //                     {bulkErrors.map((e, i) => <div key={i}>⚠ {e}</div>)}
// //                   </div>
// //                 )}

// //                 {bulkRows.length > 0 && (
// //                   <div style={{ marginBottom: "16px" }}>
// //                     <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
// //                       <strong>{bulkRows.length}</strong> row(s) ready to upload:
// //                     </p>
// //                     <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
// //                       <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
// //                         <thead>
// //                           <tr style={{ background: "#f8fafc" }}>
// //                             {["Candidate", "Email", "Checks", "Billing"].map(h => (
// //                               <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700,
// //                                 borderBottom: "1px solid #e2e8f0", color: "#475569" }}>{h}</th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {bulkRows.map((r, i) => (
// //                             <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
// //                               <td style={{ padding: "7px 10px", color: "#1e293b" }}>{r.candidate_name}</td>
// //                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.candidate_email}</td>
// //                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.checks?.join(", ")}</td>
// //                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.billing_mode}</td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
// //                   <button className="secondary-cta" onClick={closeBulkModal}
// //                     style={{ padding: "10px 20px", height: "auto", borderRadius: "8px" }}>Cancel</button>
// //                   <button className="primary-cta"
// //                     disabled={bulkRows.length === 0 || bulkUploading}
// //                     onClick={handleBulkSubmit}
// //                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>
// //                     {bulkUploading ? "Uploading…" : `Upload ${bulkRows.length} Case(s)`}
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <div style={{ textAlign: "center", padding: "24px 0" }}>
// //                 <div style={{ width: "56px", height: "56px", background: "#10b981", borderRadius: "50%",
// //                   display: "flex", alignItems: "center", justifyContent: "center",
// //                   margin: "0 auto 16px", fontSize: "24px", color: "#fff" }}>✓</div>
// //                 <h4 style={{ color: "#1e293b", marginBottom: "8px" }}>Upload Complete!</h4>
// //                 <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
// //                   {bulkRows.length} case(s) were uploaded successfully.
// //                   {bulkErrors.length > 0 && ` ${bulkErrors.length} failed.`}
// //                 </p>
// //                 <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
// //                   <button className="secondary-cta import" onClick={closeBulkModal}
// //                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>Close</button>
// //                   <button className="primary-cta"
// //                     onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}
// //                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>View All Cases</button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       <style>{sharedStyles}</style>
// //     </>
// //   );
// // }

// // // ── Styles ─────────────────────────────────────────
// // const sharedStyles = `
// //   .ac-page-title { font-size: 1.25rem; font-weight: 700; color: #2b3b8c; margin: 0; }
// //   .ac-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 0px; }
// //   @media (max-width: 960px) { .ac-layout { grid-template-columns: 1fr; } }
// //   .ac-left, .ac-right { display: flex; flex-direction: column; gap: 20px; }
// //   .ac-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 22px; }
// //   .ac-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #f0f2f8; flex-wrap: wrap; }
// //   .ac-card-header h3 { font-size: 0.82rem; font-weight: 700; color: #2b3b8c; letter-spacing: 0.06em; text-transform: uppercase; margin: 0; flex: 1; }
// //   .ac-num { background: #2b3b8c; color: #fff; font-size: 0.68rem; font-weight: 800; width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
// //   .ac-billing-hint { font-size: 0.7rem; color: #94a3b8; font-style: italic; }
// //   .ac-fields { display: flex; flex-direction: column; gap: 14px; }
// //   .ac-field { display: flex; flex-direction: column; gap: 5px; }
// //   .ac-label { font-size: 0.78rem; font-weight: 600; color: #475569; }
// //   .ac-req { color: #eb4d4b; margin-left: 2px; }
// //   .ac-optional { color: #94a3b8; font-weight: 400; }
// //   .ac-input { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
// //   .ac-input:focus { border-color: #2b3b8c; background: #fff; }
// //   .ac-input-readonly { display: flex; align-items: center; background: #eef1fb; border: 1.5px solid #c7d2fe; color: #2b3b8c; font-weight: 700; cursor: default; }
// //   .ac-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232b3b8c' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
// //   .ac-billing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
// //   @media (max-width: 700px) { .ac-billing-grid { grid-template-columns: 1fr; } }
// //   .ac-billing-tile { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #f8fafc; cursor: pointer; text-align: left; transition: all 0.18s; }
// //   .ac-billing-active { box-shadow: 0 0 0 2px currentColor; }
// //   .ac-billing-tile-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
// //   .ac-billing-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
// //   .ac-billing-label { font-size: 0.78rem; font-weight: 700; color: #334155; }
// //   .ac-billing-desc { font-size: 0.7rem; color: #94a3b8; margin: 0; line-height: 1.4; }
// //   .ac-billing-section { border-top: 1px dashed #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 14px; }
// //   .ac-billing-info-row { display: flex; align-items: flex-start; gap: 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; color: #0369a1; }
// //   .ac-billing-info-icon { font-style: normal; font-weight: 700; flex-shrink: 0; }
// //   .ac-billing-locked { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
// //   .ac-billing-locked-note { font-size: 0.72rem; color: #94a3b8; margin: 0; }
// //   .ac-timing-row { display: flex; gap: 8px; }
// //   .ac-timing-btn { flex: 1; padding: 9px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.78rem; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.15s; }
// //   .ac-timing-active { border-color: #0d9488; background: #f0fdfa; color: #0d9488; }
// //   .ac-amount-display { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px 13px; font-size: 1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
// //   .ac-amount-note { font-size: 0.72rem; font-weight: 400; color: #94a3b8; }
// //   .ac-gen-link-btn { width: 100%; padding: 10px; border: 1.5px dashed #0d9488; border-radius: 8px; background: #f0fdfa; color: #0d9488; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
// //   .ac-gen-link-btn:hover { background: #ccfbf1; }
// //   .ac-link-row { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; }
// //   .ac-link-url { font-size: 0.72rem; color: #0d9488; flex: 1; word-break: break-all; }
// //   .ac-copy-btn { background: #0d9488; color: #fff; border: none; border-radius: 6px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; white-space: nowrap; }
// //   .ac-link-send-row { display: flex; gap: 8px; margin-top: 8px; }
// //   .ac-send-btn { flex: 1; padding: 7px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #f8fafc; font-size: 0.72rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
// //   .ac-send-sms:hover { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }
// //   .ac-send-email:hover { border-color: #2b3b8c; color: #2b3b8c; background: #eef1fb; }
// //   .ac-send-wa:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
// //   .ac-check-ctrl { display: flex; gap: 6px; align-items: center; font-size: 0.75rem; color: #94a3b8; }
// //   .ac-link-btn { background: none; border: none; color: #2b3b8c; font-size: 0.75rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; }
// //   .ac-checks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
// //   .ac-check-tile { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; cursor: pointer; transition: all 0.15s; gap: 8px; }
// //   .ac-check-tile:hover { border-color: #2b3b8c; }
// //   .ac-check-active { border-color: #2b3b8c; background: #eef1fb; }
// //   .ac-check-tile-top { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; font-weight: 600; color: #334155; }
// //   .ac-check-active .ac-check-tile-top { color: #2b3b8c; }
// //   .ac-check-dot { width: 8px; height: 8px; border-radius: 50%; border: 2px solid #cbd5e1; flex-shrink: 0; }
// //   .ac-check-active .ac-check-dot { border-color: #2b3b8c; background: #2b3b8c; }
// //   .ac-check-rate { font-size: 0.68rem; color: #94a3b8; font-weight: 600; text-align: right; white-space: nowrap; }
// //   .ac-check-active .ac-check-rate { color: #2b3b8c; }
// //   .ac-check-side { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
// //   .ac-check-rate-edit { display: flex; align-items: center; gap: 2px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 2px 6px; flex-shrink: 0; }
// //   .ac-check-rate-edit:focus-within { border-color: #2b3b8c; }
// //   .ac-rate-prefix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
// //   .ac-rate-suffix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
// //   .ac-rate-input { width: 52px; border: none; outline: none; background: transparent; font-size: 0.72rem; font-weight: 700; color: #1e293b; padding: 2px 0; }
// //   .ac-tat-input { width: 34px; }
// //   .ac-rate-input::-webkit-inner-spin-button, .ac-rate-input::-webkit-outer-spin-button { margin: 0; }
// //   .ac-amount-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: #94a3b8; flex-wrap: wrap; gap: 8px; }
// //   .ac-tat-bar-item strong { color: #0d9488; font-weight: 700; }
// //   .ac-total-amt { font-weight: 700; color: #2b3b8c; font-size: 0.85rem; }
// //   .ac-textarea { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box; }
// //   .ac-textarea:focus { border-color: #2b3b8c; background: #fff; }
// //   .ac-summary-strip { border: 1.5px solid; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
// //   .ac-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; }
// //   .ac-summary-row strong { font-weight: 700; color: #1e293b; }
// //   .ac-submit-btn { width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 700; }
// //   .ac-success-wrap { display: flex; align-items: center; justify-content: center; min-height: 70vh; }
// //   .ac-success-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 16px; padding: 48px 40px; text-align: center; max-width: 500px; width: 100%; }
// //   .ac-success-icon { width: 64px; height: 64px; background: #10b981; color: #fff; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
// //   .ac-success-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
// //   .ac-success-id { font-size: 1.1rem; font-weight: 700; color: #2b3b8c; background: #eef1fb; display: inline-block; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px!important; }
// //   .ac-success-meta { background: #f8fafc; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
// //   .ac-success-meta-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: #64748b; }
// //   .ac-success-checks { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 24px; }
// //   .ac-check-badge { background: #eef1fb; color: #2b3b8c; font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
// //   .ac-success-link-box { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 12px; margin-bottom: 20px; }
// //   .ac-success-link-label { font-size: 0.72rem; color: #64748b; margin: 0 0 4px; font-weight: 600; }
// //   .ac-success-link-url { font-size: 0.78rem; color: #0d9488; margin: 0; word-break: break-all; }
// //   .ac-success-actions { display: flex; gap: 12px; justify-content: center; }
// // `;
// import { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";

// const DEFAULT_CHECK_RATES = {
//   employment: '', education: '', address: '',
//   database: '',  criminal: '',  drug: '', court: '',
// };

// // ── Default turnaround time (in days) per check type — starts at 0,
// //    admin fills in the actual TAT per case.
// const DEFAULT_CHECK_TAT = {
//   employment: '', education: '', address: '',
//   database: '',  criminal: '',  drug: '', court: '',
// };

// const CHECK_TYPES = [
//   { key: "employment", label: "Employment" },
//   { key: "education",  label: "Education"  },
//   { key: "address",    label: "Address"    },
//   { key: "database",   label: "Database"   },
//   { key: "criminal",   label: "Criminal"   },
//   { key: "drug",       label: "Drug Test"  },
//   { key: "court",      label: "Courtroom"  },
// ];

// const BILLING_MODES = [
//   { key: "prepaid_client",    label: "Prepaid — Client",    desc: "Client pays upfront. Case created immediately.",          color: "#2b3b8c" },
//   { key: "prepaid_candidate", label: "Prepaid — Candidate", desc: "Candidate pays via payment link before or after docs.",   color: "#0d9488" },
//   { key: "postpaid_client",   label: "Postpaid — Client",   desc: "Case created now. Client invoiced at month end.",         color: "#7c3aed" },
//   { key: "postpaid_prepaid_client", label: "Postpaid/Prepaid — Client", desc: "Flexible client billing — paid upfront or invoiced later, decided per case.", color: "#c2410c" },
// ];

// // ── SINGLE declaration — remove the duplicate below getEmptyForm ──
// const CHECK_KEY_ALIASES = {
//   drug_test: "drug",
//   courtroom: "court",
// };

// function getUser() {
//   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// }

// function buildCheckRates(user) {
//   if (user.role === "client" && user.checkRates && typeof user.checkRates === "object") {
//     const rates = { ...DEFAULT_CHECK_RATES };
//     Object.entries(user.checkRates).forEach(([key, val]) => {
//       const mapped = CHECK_KEY_ALIASES[key] || key;
//       if (mapped in rates) rates[mapped] = Number(val) || 0;
//     });
//     return rates;
//   }
//   return DEFAULT_CHECK_RATES;
// }

// // ── Build the TAT map, same pattern as buildCheckRates ──────────────────────
// function buildCheckTats(user) {
//   if (user.role === "client" && user.checkTat && typeof user.checkTat === "object") {
//     const tats = { ...DEFAULT_CHECK_TAT };
//     Object.entries(user.checkTat).forEach(([key, val]) => {
//       const mapped = CHECK_KEY_ALIASES[key] || key;
//       if (mapped in tats) tats[mapped] = Number(val) || 0;
//     });
//     return tats;
//   }
//   return DEFAULT_CHECK_TAT;
// }

// function getEmptyForm(user) {
//   const isClient = user.role === "client";
//   const preselectedChecks = isClient && Array.isArray(user.agreedChecks)
//     ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k).filter(k => CHECK_TYPES.some(ct => ct.key === k))
//     : [];

//   return {
//     candidateName: "", candidateEmail: "", candidateMobile: "",
//     position: "",
//     DOB: "",
//     clientId:   isClient ? String(user.id ?? "") : "",
//     clientName: isClient ? (user.name || "") : "",
//     priority: "normal",
//     billingMode: isClient ? (user.billingMode || "") : "",
//     checks: preselectedChecks,
//     notes: "",
//     paymentTiming: "before", paymentLinkSent: false,
//     invoiceCycle: "monthly", poNumber: "",
//   };
// }

// // ── <input type="date"> requires exactly "yyyy-MM-dd" — the API returns
// //    full ISO datetimes (e.g. "2026-08-03T00:00:00.000000Z"), which the
// //    browser silently rejects ("does not conform to required format").
// //    Slicing to the first 10 chars keeps just the date part.
// function toDateInputValue(v) {
//   if (!v) return "";
//   const s = String(v);
//   return s.length >= 10 ? s.slice(0, 10) : s;
// }

// // ── Map a case object (as returned by the API) onto form field shape ────────
// function caseToForm(c, fallback) {
//   return {
//     candidateName:   c.candidate_name || c.candidate || fallback.candidateName,
//     candidateEmail:  c.candidate_email || fallback.candidateEmail,
//     candidateMobile: c.candidate_mobile || fallback.candidateMobile,
//     position:        c.position || fallback.position,
//     DOB:             toDateInputValue(c.candidate_dob || c.dob) || fallback.DOB,
//     clientId:        c.client_id != null ? String(c.client_id) : fallback.clientId,
//     clientName:      c.client_name || c.client || fallback.clientName,
//     priority:        c.priority || fallback.priority,
//     billingMode:     c.billing_mode || fallback.billingMode,
//     checks: Array.isArray(c.checks)
//       ? c.checks.map(k => CHECK_KEY_ALIASES[k] || k)
//       : (typeof c.checks === "string"
//           ? c.checks.split(/[·,]/).map(k => CHECK_KEY_ALIASES[k.trim()] || k.trim()).filter(Boolean)
//           : fallback.checks),
//     notes:           c.notes || fallback.notes,
//     paymentTiming:   c.payment_timing || fallback.paymentTiming,
//     paymentLinkSent: fallback.paymentLinkSent,
//     invoiceCycle:    c.invoice_cycle || fallback.invoiceCycle,
//     poNumber:        c.po_number || fallback.poNumber,
//   };
// }

// // ── Bulk upload CSV parser ────────────────────────────────────────────────────
// function parseBulkCSV(text) {
//   const lines = text.trim().split("\n").filter(Boolean);
//   if (lines.length < 2) return { rows: [], errors: ["CSV must have a header row and at least one data row."] };
//   const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
//   const rows = [];
//   const errors = [];
//   lines.slice(1).forEach((line, i) => {
//     const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
//     const row = {};
//     headers.forEach((h, j) => { row[h] = vals[j] || ""; });
//     if (!row.candidate_name && !row.candidate) { errors.push(`Row ${i + 2}: missing candidate name`); return; }
//     if (!row.candidate_email && !row.email)    { errors.push(`Row ${i + 2}: missing email`); return; }
//     rows.push({
//       candidate_name:  row.candidate_name || row.candidate,
//       candidate_email: row.candidate_email || row.email,
//       candidate_mobile: row.mobile || row.candidate_mobile || "",
//       position:        row.position || "",
//       checks:          (row.checks || "employment").split("|").map(c => c.trim()),
//       billing_mode:    row.billing_mode || "postpaid_client",
//       client_name:     row.client_name || row.client || "",
//     });
//   });
//   return { rows, errors };
// }

// export default function AddCase() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = getUser();
//   const isClientUser = user.role === "client";
//   const isAdminUser  = user.role === "admin";

//   // ── Edit mode is driven entirely by ?editCaseId=... in the URL ──────────────
//   const editCaseId = new URLSearchParams(location.search).get("editCaseId") || null;
//   const isEditMode = Boolean(editCaseId);

//   const [form, setForm]               = useState(() => getEmptyForm(user));
//   const [submitted, setSubmitted]     = useState(false);
//   const [loading, setLoading]         = useState(false);
//   const [error, setError]             = useState("");
//   const [caseId, setCaseId]           = useState(null);
//   const [generatedLink, setGeneratedLink] = useState("");
//   const [linkCopied, setLinkCopied]   = useState(false);

//   // ── Check rates — admin can edit these live per case; everyone else uses
//   //    the fixed default / contract rate as-is.
//   const [rates, setRates] = useState(() => buildCheckRates(user));

//   // ── Check TAT (turnaround time, in days) — admin can edit these live per
//   //    case; everyone else sees the fixed default / contract TAT as-is.
//   const [tats, setTats] = useState(() => buildCheckTats(user));

//   // ── Edit mode: fetch the existing case and prefill the form ─────────────────
//   const [fetchingCase, setFetchingCase] = useState(isEditMode);
//   const [loadError, setLoadError]       = useState("");

//   // ── Real client list for the dropdown — client-role users have their
//   //    own clientId/clientName locked already (getEmptyForm), so this only
//   //    needs to run for admin/allocator users who are picking a client.
//   const [clients, setClients]             = useState([]);
//   const [clientsLoading, setClientsLoading] = useState(!isClientUser);
//   const [clientsError, setClientsError]   = useState("");

//   useEffect(() => {
//     if (isClientUser) return;

//     let cancelled = false;
//     const token = localStorage.getItem("token");

//     setClientsLoading(true);
//     setClientsError("");

//     fetch(`${API_URL}/api/clients`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     })
//       .then(r => r.json())
//       .then(data => { if (!cancelled) setClients(data.clients || []); })
//       .catch(() => { if (!cancelled) setClientsError("Failed to load clients."); })
//       .finally(() => { if (!cancelled) setClientsLoading(false); });

//     return () => { cancelled = true; };
//   }, [isClientUser]);

//   useEffect(() => {
//     if (!isEditMode) return;

//     let cancelled = false;
//     const token = localStorage.getItem("token");

//     setFetchingCase(true);
//     setLoadError("");

//     fetch(`${API_URL}/api/cases/${encodeURIComponent(editCaseId)}`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     })
//       .then(r => {
//         if (!r.ok) throw new Error(r.status === 404 ? "This case could not be found." : "Failed to load case details.");
//         return r.json();
//       })
//       .then(data => {
//         if (cancelled) return;
//         const c = data.case || data;
//         setForm(prev => caseToForm(c, prev));
//         if (c.total_amount != null) {
//           // Keep admin-editable rates in sync with whatever was actually
//           // billed on this case, if the API returns a per-check breakdown.
//           if (c.check_rates && typeof c.check_rates === "object") {
//             setRates(prev => {
//               const next = { ...prev };
//               Object.entries(c.check_rates).forEach(([k, v]) => {
//                 const mapped = CHECK_KEY_ALIASES[k] || k;
//                 if (mapped in next) next[mapped] = Number(v) || 0;
//               });
//               return next;
//             });
//           }
//         }
//         // Keep admin-editable TAT in sync with whatever was actually set on
//         // this case, if the API returns a per-check TAT breakdown.
//         if (c.check_tat && typeof c.check_tat === "object") {
//           setTats(prev => {
//             const next = { ...prev };
//             Object.entries(c.check_tat).forEach(([k, v]) => {
//               const mapped = CHECK_KEY_ALIASES[k] || k;
//               if (mapped in next) next[mapped] = Number(v) || 0;
//             });
//             return next;
//           });
//         }
//         if (c.payment_link) setGeneratedLink(c.payment_link);
//       })
//       .catch(err => { if (!cancelled) setLoadError(err.message || "Failed to load case details."); })
//       .finally(() => { if (!cancelled) setFetchingCase(false); });

//     return () => { cancelled = true; };
//   }, [editCaseId, isEditMode]);

//   // ── Bulk upload state ───────────────────────────────────────────────────────
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [bulkRows, setBulkRows]           = useState([]);
//   const [bulkErrors, setBulkErrors]       = useState([]);
//   const [bulkUploading, setBulkUploading] = useState(false);
//   const [bulkDone, setBulkDone]           = useState(false);
//   const fileInputRef = useRef(null);

//   const setRate = (key, value) => {
//     const num = Number(value);
//     setRates(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
//   };

//   // ── Update a single check's TAT (days) ───────────────────────────────────
//   const setTat = (key, value) => {
//     const num = Number(value);
//     setTats(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
//   };

//   const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

//   const toggleCheck = (key) =>
//     setForm(p => ({
//       ...p,
//       checks: p.checks.includes(key)
//         ? p.checks.filter(c => c !== key)
//         : [...p.checks, key],
//     }));

//   const selectAll = () => setForm(p => ({ ...p, checks: visibleCheckTypes.map(c => c.key) }));
//   const clearAll  = () => setForm(p => ({ ...p, checks: [] }));

//   const totalAmount = form.checks.reduce((s, k) => s + (rates[k] || 0), 0);

//   // ── Checks a client account is actually allowed to pick. A client is
//   //    restricted to whatever the admin configured on their account
//   //    (agreedChecks) — they shouldn't be able to add a check type they
//   //    have no contract/rate for. Anything already on the case being
//   //    edited stays visible too, so an existing case doesn't lose a row
//   //    just because the client's contract changed after it was created.
//   //    Admin/staff are never restricted.
//   const agreedCheckKeys = isClientUser && Array.isArray(user.agreedChecks)
//     ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k)
//     : null; // null = no restriction

//   const visibleCheckTypes = agreedCheckKeys
//     ? CHECK_TYPES.filter(ct => agreedCheckKeys.includes(ct.key) || form.checks.includes(ct.key))
//     : CHECK_TYPES;

//   // ── Per-check TAT display — shows each selected check's day count
//   //    individually (e.g. "5, 6, 7") instead of summing them. A sum
//   //    overstates the real timeline since checks typically run in
//   //    parallel, not back-to-back.
//   const overallTatValues  = form.checks.map(k => Number(tats[k]) || 0);
//   const overallTatDisplay = overallTatValues.length > 0 ? overallTatValues.join(", ") : "";

//   // Kept as a single number for anything that still needs one — e.g.
//   // AllClients.jsx's per-client average-TAT aggregate reads this field via
//   // Number(c.overall_tat ?? c.tat). Using the longest single check here
//   // (not the sum) so that aggregate stays meaningful.
//   const overallTat = overallTatValues.length > 0 ? Math.max(...overallTatValues) : 0;

//   // ── TAT payload actually sent to the API — scoped to selected checks only.
//   //    `tats` state always carries all 7 keys (empty string default for
//   //    anything the user hasn't touched), so sending the raw object as-is
//   //    pushes empty strings for unselected checks and trips the backend's
//   //    "must be a number" validation. Only the checks in form.checks are
//   //    relevant, and everything in there gets coerced to a real number.
//   const checkTatPayload = Object.fromEntries(
//     form.checks.map(k => [k, Number(tats[k]) || 0])
//   );
//   const checkRatesPayload = Object.fromEntries(
//   form.checks.map(k => [k, Number(rates[k]) || 0])
// );

//   // Only used by admin/allocator — clients have a locked clientId/clientName.
//   // NOTE: billing_mode field name is a guess (billing_mode / billingMode /
//   // billingDefault) until I can see the actual /api/clients response shape —
//   // worth double-checking once the backend files are shared.
//   const handleClientChange = (clientId) => {
//     const client = clients.find(c => String(c.id) === clientId);
//     setForm(p => ({
//       ...p,
//       clientId,
//       clientName:  client?.company_name || client?.name || "",
//       billingMode: client?.billing_mode || client?.billingMode || client?.billingDefault || p.billingMode,
//     }));
//   };

//   const generatePaymentLink = () => {
//     const fake = `https://pay.bgvportal.in/c/${Math.random().toString(36).slice(2, 10)}`;
//     setGeneratedLink(fake);
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(generatedLink);
//     setLinkCopied(true);
//     setTimeout(() => setLinkCopied(false), 2000);
//   };

//   const validate = () => {
//     if (!form.candidateName.trim())  return "Candidate name is required.";
//     if (!form.candidateEmail.trim()) return "Candidate email is required.";
//     if (!form.DOB)                   return "Candidate date of birth is required.";
//     if (!form.clientId)              return "Please select a client.";
//     if (!form.billingMode) {
//       return isClientUser
//         ? "Your account doesn't have a billing mode set. Please contact support."
//         : "Please select a billing mode.";
//     }
//     if (form.checks.length === 0)    return "Select at least one check type.";
//     return null;
//   };

//   // ── Submit to real API — POST to create, PUT to update an existing case ─────
//   const handleSubmit = async () => {
//     const err = validate();
//     if (err) { setError(err); return; }

//     setError("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const url    = isEditMode ? `${API_URL}/api/cases/${encodeURIComponent(editCaseId)}` : `${API_URL}/api/cases`;
//       const method = isEditMode ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           candidate_name:   form.candidateName,
//           candidate_email:  form.candidateEmail,
//           candidate_mobile: form.candidateMobile,
//           candidate_dob:    form.DOB,
//           position:         form.position,
//           client_name:      form.clientName,
//           client_id:        form.clientId || null,
//           checks:           form.checks,
//           priority:         form.priority,
//           billing_mode:     form.billingMode,
//           payment_timing:   form.paymentTiming,
//           invoice_cycle:    form.invoiceCycle,
//           po_number:        form.poNumber,
//           total_amount:     totalAmount,
//           check_tat:        checkTatPayload,
//           check_rates:      checkRatesPayload, 
//           overall_tat:      overallTat,
//           payment_link:     generatedLink || null,
//           notes:            form.notes,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || (isEditMode ? "Failed to update case." : "Failed to create case."));
//         return;
//       }

//       setCaseId(isEditMode ? editCaseId : data.case.case_id);
//       setSubmitted(true);

//     } catch {
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setForm(getEmptyForm(user));
//     setRates(buildCheckRates(user));
//     setTats(buildCheckTats(user));
//     setSubmitted(false);
//     setCaseId(null);
//     setGeneratedLink("");
//     setError("");
//   };

//   // ── Bulk upload handlers ────────────────────────────────────────────────────
//   const handleBulkFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       const { rows, errors } = parseBulkCSV(ev.target.result);
//       setBulkRows(rows);
//       setBulkErrors(errors);
//       setBulkDone(false);
//     };
//     reader.readAsText(file);
//   };

//   const handleBulkSubmit = async () => {
//     if (bulkRows.length === 0) return;
//     setBulkUploading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const results = await Promise.allSettled(
//         bulkRows.map(row =>
//           fetch(`${API_URL}/api/cases`, {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
//             body: JSON.stringify(row),
//           })
//         )
//       );
//       const failed = results.filter(r => r.status === "rejected" || (r.value && !r.value.ok)).length;
//       setBulkErrors(failed > 0 ? [`${failed} case(s) failed to upload. Others may have succeeded.`] : []);
//       setBulkDone(true);
//     } catch (err) {
//       setBulkErrors([err.message]);
//     } finally {
//       setBulkUploading(false);
//     }
//   };

//   const closeBulkModal = () => {
//     setShowBulkModal(false);
//     setBulkRows([]);
//     setBulkErrors([]);
//     setBulkDone(false);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const activeBilling = BILLING_MODES.find(b => b.key === form.billingMode);

//   // ── Edit mode: loading state while the case is being fetched ────────────────
//   if (isEditMode && fetchingCase) {
//     return (
//       <>
//         <Sidebar />
//         <section id="content">
//           <Header />
//           <main>
//             <div className="dash-wrper">
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
//                 <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading case details…</p>
//               </div>
//             </div>
//           </main>
//         </section>
//         <style>{sharedStyles}</style>
//       </>
//     );
//   }

//   // ── Edit mode: case failed to load ───────────────────────────────────────────
//   if (isEditMode && loadError) {
//     return (
//       <>
//         <Sidebar />
//         <section id="content">
//           <Header />
//           <main>
//             <div className="dash-wrper">
//               <div style={{ textAlign: "center", padding: "80px 20px" }}>
//                 <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>{loadError}</p>
//                 <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
//                   ← Back to Cases
//                 </button>
//               </div>
//             </div>
//           </main>
//         </section>
//         <style>{sharedStyles}</style>
//       </>
//     );
//   }

//   // ── Success Screen ────────────────────────────────────────
//   if (submitted) {
//     return (
//       <>
//         <Sidebar />
//         <section id="content">
//           <Header />
//           <main>
//             <div className="dash-wrper">
//               <div className="ac-success-wrap">
//                 <div className="ac-success-card">
//                   <div className="ac-success-icon">✓</div>
//                   <h2 className="ac-success-title">{isEditMode ? "Case Updated" : "Case Created"}</h2>
//                   <p className="ac-success-id">{caseId}</p>

//                   <div className="ac-success-meta">
//                     <div className="ac-success-meta-row">
//                       <span>Candidate</span><strong>{form.candidateName}</strong>
//                     </div>
//                     <div className="ac-success-meta-row">
//                       <span>DOB</span><strong>{form.DOB}</strong>
//                     </div>
//                     <div className="ac-success-meta-row">
//                       <span>Client</span><strong>{form.clientName}</strong>
//                     </div>
//                     <div className="ac-success-meta-row">
//                       <span>Billing</span>
//                       <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
//                     </div>
//                     <div className="ac-success-meta-row">
//                       <span>Estimated TAT</span>
//                       <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
//                     </div>
//                     {form.billingMode === "postpaid_client" && (
//                       <div className="ac-success-meta-row">
//                         <span>Invoice Cycle</span>
//                         <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
//                       </div>
//                     )}
    
//                   </div>

//                   <div className="ac-success-checks">
//                     {form.checks.map(c => (
//                       <span key={c} className="ac-check-badge">
//                         {CHECK_TYPES.find(t => t.key === c)?.label}
//                       </span>
//                     ))}
//                   </div>

//                   {form.billingMode === "prepaid_candidate" && generatedLink && (
//                     <div className="ac-success-link-box">
//                       <p className="ac-success-link-label">Payment Link</p>
//                       <p className="ac-success-link-url">{generatedLink}</p>
//                     </div>
//                   )}

//                   <div className="ac-success-actions">
//                     <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
//                       View All Cases
//                     </button>
//                     {!isEditMode && (
//                       <button className="secondary-cta import" onClick={handleReset}>
//                         Add Another
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </section>
//         <style>{sharedStyles}</style>
//       </>
//     );
//   }

//   // ── Main Form ─────────────────────────────────────────────
//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             <div className="dash-upper-head">
//               <div className="left">
//                 <h2 className="ac-page-title">{isEditMode ? `Edit Case — ${editCaseId}` : "Add New Case"}</h2>
//               </div>
//               <div className="right">
//                 {!isEditMode && (
//                   <button className="secondary-cta import"
//                     onClick={() => setShowBulkModal(true)}
//                     style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                     <img src="images/dashboard/export-excel.svg" alt="" style={{ width: "16px" }} />
//                     Bulk Upload
//                   </button>
//                 )}
//                 <button className="secondary-cta import" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
//                   ← All Cases
//                 </button>
//               </div>
//             </div>

//             {isEditMode && (
//               <div style={{
//                 background: "#eef3ff", border: "1px solid #c7d2fe", borderRadius: "8px",
//                 padding: "12px 16px", color: "#2b3b8c", fontSize: "14px", margin: "12px 0"
//               }}>
//                 Editing case <strong>{editCaseId}</strong>. Your changes will be saved to this case.
//               </div>
//             )}

//             {error && (
//               <div style={{
//                 background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px",
//                 padding: "12px 16px", color: "#dc2626", fontSize: "14px", margin: "12px 0"
//               }}>
//                 {error}
//               </div>
//             )}

//             <div className="ac-layout">

//               {/* ══ LEFT COLUMN ══ */}
//               <div className="ac-left">

//                 {/* 01 — Candidate Info */}
//                 <div className="ac-card">
//                   <div className="ac-card-header">
//                     <span className="ac-num">01</span>
//                     <h3>Candidate Information</h3>
//                   </div>
//                   <div className="ac-fields">
//                     <div className="ac-field">
//                       <label className="ac-label">Candidate Name <span className="ac-req">*</span></label>
//                       <input className="ac-input" type="text" placeholder="Full name as per documents"
//                         value={form.candidateName} onChange={e => set("candidateName", e.target.value)} />
//                     </div>
//                     <div className="ac-field">
//                       <label className="ac-label">Email Address <span className="ac-req">*</span></label>
//                       <input className="ac-input" type="email" placeholder="candidate@email.com"
//                         value={form.candidateEmail} onChange={e => set("candidateEmail", e.target.value)} />
//                     </div>
//                     <div className="ac-field">
//   <label className="ac-label">
//     Mobile Number <span className="form-required">*</span>
//   </label>

//   <input
//     className="ac-input"
//     type="tel"
//     placeholder="+91 XXXXX XXXXX"
//     value={form.candidateMobile}
//     onChange={(e) => {
//       const value = e.target.value.replace(/\D/g, "").slice(0, 12);
//       set("candidateMobile", value);
//     }}
//     required
//     maxLength={12}
//     pattern="[0-9]{12}"
//     title="Please enter a valid 12-digit mobile number"
//   />
// </div>
//                     <div className="ac-field">
//   <label className="ac-label">
//     Position Applied For <span className="form-required">*</span>
//   </label>

//   <input
//     className="ac-input"
//     type="text"
//     placeholder="e.g. Senior Engineer"
//     value={form.position}
//     onChange={e => set("position", e.target.value)}
//   />
// </div>
//                     <div className="ac-field">
//                       <label className="ac-label">Date of Birth <span className="ac-req">*</span></label>
//                       <input className="ac-input" type="date"
//                         value={form.DOB} onChange={e => set("DOB", e.target.value)} />
//                     </div>

//                     {/* Client field — locked to self for client-role users */}
//                     <div className="ac-field">
//                       <label className="ac-label">Client <span className="ac-req">*</span></label>
//                       {isClientUser ? (
//                         <div className="ac-input ac-input-readonly">{form.clientName || user.name}</div>
//                       ) : (
//                         <>
//                           <select className="ac-input ac-select" value={form.clientId}
//                             onChange={e => handleClientChange(e.target.value)}
//                             disabled={clientsLoading}>
//                             <option value="">
//                               {clientsLoading
//                                 ? "Loading clients…"
//                                 : clientsError
//                                 ? "Failed to load clients"
//                                 : clients.length === 0
//                                 ? "No clients found"
//                                 : "— Select Client —"}
//                             </option>
//                             {clients.map(c => (
//                               <option key={c.id} value={c.id}>{c.company_name || c.name}</option>
//                             ))}
//                           </select>
//                           {clientsError && (
//                             <span style={{ fontSize: "0.72rem", color: "#dc2626" }}>
//                               {clientsError} — check your connection and reload.
//                             </span>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 02 — Billing Mode */}
//                 <div className="ac-card">
//                   <div className="ac-card-header">
//                     <span className="ac-num">02</span>
//                     <h3>Billing Mode <span className="ac-req">*</span></h3>
//                     {!isClientUser && form.clientId && (
//                       <span className="ac-billing-hint">Auto-set from client · override below</span>
//                     )}
//                   </div>

//                   {isClientUser ? (
//                     activeBilling ? (
//                       <div className="ac-billing-locked">
//                         <div className="ac-billing-tile ac-billing-active"
//                           style={{ borderColor: activeBilling.color, background: `${activeBilling.color}10`, cursor: "default" }}>
//                           <div className="ac-billing-tile-top">
//                             <span className="ac-billing-dot" style={{ background: activeBilling.color }} />
//                             <span className="ac-billing-label" style={{ color: activeBilling.color }}>
//                               🔒 {activeBilling.label}
//                             </span>
//                           </div>
//                           <p className="ac-billing-desc">{activeBilling.desc}</p>
//                         </div>
//                         <p className="ac-billing-locked-note">
//                           This is your account's registered billing mode and can't be changed here.
//                           Contact your account manager to update it.
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626" }}>
//                         <span className="ac-billing-info-icon">⚠</span>
//                         <span>No billing mode is set on your account. Please contact support before creating a case.</span>
//                       </div>
//                     )
//                   ) : (
//                     <div className="ac-billing-grid">
//                       {BILLING_MODES.map(mode => {
//                         const active = form.billingMode === mode.key;
//                         return (
//                           <button key={mode.key} type="button"
//                             className={`ac-billing-tile ${active ? "ac-billing-active" : ""}`}
//                             style={active ? { borderColor: mode.color, background: `${mode.color}10` } : {}}
//                             onClick={() => set("billingMode", mode.key)}>
//                             <div className="ac-billing-tile-top">
//                               <span className="ac-billing-dot"
//                                 style={{ background: active ? mode.color : "#cbd5e1" }} />
//                               <span className="ac-billing-label"
//                                 style={active ? { color: mode.color } : {}}>
//                                 {mode.label}
//                               </span>
//                             </div>
//                             <p className="ac-billing-desc">{mode.desc}</p>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {form.billingMode === "prepaid_client" && (
//                     <div className="ac-billing-section">
//                       <div className="ac-billing-info-row">
//                         <span className="ac-billing-info-icon">ℹ</span>
//                         <span>Client has prepaid. Case will be created and deducted from their balance immediately.</span>
//                       </div>
//                     </div>
//                   )}

//                   {form.billingMode === "postpaid_prepaid_client" && (
//                     <div className="ac-billing-section">
//                       <div className="ac-billing-info-row">
//                         <span className="ac-billing-info-icon">ℹ</span>
//                         <span>Flexible billing for this client. Confirm with the client whether this case is paid upfront or invoiced later before proceeding.</span>
//                       </div>
//                     </div>
//                   )}

//                   {form.billingMode === "prepaid_candidate" && (
//                     <div className="ac-billing-section">
//                       <div className="ac-field">
//                         <label className="ac-label">When does candidate pay?</label>
//                         <div className="ac-timing-row">
//                           {[
//                             { key: "before", label: "Before submitting docs" },
//                             { key: "after",  label: "After submitting docs"  },
//                           ].map(t => (
//                             <button key={t.key} type="button"
//                               className={`ac-timing-btn ${form.paymentTiming === t.key ? "ac-timing-active" : ""}`}
//                               onClick={() => set("paymentTiming", t.key)}>
//                               {t.label}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                       {isAdminUser && (
//                         <div className="ac-field">
//                           <label className="ac-label">Payment Amount</label>
//                           <div className="ac-amount-display">
//                             ₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}
//                             <span className="ac-amount-note">
//                               {form.checks.length > 0
//                                 ? `(${form.checks.length} checks selected)`
//                                 : "Select checks to calculate"}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                       <div className="ac-field">
//                         <label className="ac-label">Payment Link</label>
//                         {!generatedLink ? (
//                           <button type="button" className="ac-gen-link-btn" onClick={generatePaymentLink}>
//                             + Generate Payment Link
//                           </button>
//                         ) : (
//                           <>
//                             <div className="ac-link-row">
//                               <span className="ac-link-url">{generatedLink}</span>
//                               <button type="button" className="ac-copy-btn" onClick={copyLink}>
//                                 {linkCopied ? "Copied!" : "Copy"}
//                               </button>
//                             </div>
//                             <div className="ac-link-send-row">
//                               <button type="button" className="ac-send-btn ac-send-sms">📱 SMS</button>
//                               <button type="button" className="ac-send-btn ac-send-email">✉ Email</button>
//                               <button type="button" className="ac-send-btn ac-send-wa">💬 WhatsApp</button>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {form.billingMode === "postpaid_client" && (
//                     <div className="ac-billing-section">
//                       <div className="ac-field">
//                         <label className="ac-label">Invoice Cycle</label>
//                         <div className="ac-timing-row">
//                           {[
//                             { key: "monthly",  label: "Monthly Invoice" },
//                             { key: "per_case", label: "Per Case Invoice" },
//                           ].map(t => (
//                             <button key={t.key} type="button"
//                               className={`ac-timing-btn ${form.invoiceCycle === t.key ? "ac-timing-active" : ""}`}
//                               onClick={() => set("invoiceCycle", t.key)}>
//                               {t.label}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="ac-field">
//                         <label className="ac-label">PO Number <span className="ac-optional">(optional)</span></label>
//                         <input className="ac-input" type="text" placeholder="e.g. PO-2024-0391"
//                           value={form.poNumber} onChange={e => set("poNumber", e.target.value)} />
//                       </div>
//                       {isAdminUser ? (
//                         <div className="ac-billing-info-row">
//                           <span className="ac-billing-info-icon">ℹ</span>
//                           <span>
//                             Invoice of <strong>₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}</strong> will be
//                             raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="ac-billing-info-row">
//                           <span className="ac-billing-info-icon">ℹ</span>
//                           <span>
//                             Invoice will be raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//               </div>

//               {/* ══ RIGHT COLUMN ══ */}
//               <div className="ac-right">

//                 {/* 03 — Check Types */}
//                 <div className="ac-card">
//                   <div className="ac-card-header">
//                     <span className="ac-num">03</span>
//                     <h3>Check Types <span className="ac-req">*</span></h3>
//                     <div className="ac-check-ctrl">
//                       <button type="button" className="ac-link-btn" onClick={selectAll}>All</button>
//                       <span>·</span>
//                       <button type="button" className="ac-link-btn" onClick={clearAll}>Clear</button>
//                     </div>
//                   </div>

//                   <div className="ac-checks-table-container">
//   {isClientUser && visibleCheckTypes.length === 0 && (
//     <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626", marginBottom: "12px" }}>
//       <span className="ac-billing-info-icon">⚠</span>
//       <span>No check types are configured on your account yet. Contact your account manager before creating a case.</span>
//     </div>
//   )}
//   <table className="ac-checks-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
//     <thead>
//       <tr>
//         <th style={{ textAlign: 'left', padding: '12px' }}>Check Type</th>
//         <th style={{ textAlign: 'left', padding: '12px' }}>Amount</th>
//         <th style={{ textAlign: 'left', padding: '12px' }}>TAT</th>
//       </tr>
//     </thead>
//     <tbody>
//       {visibleCheckTypes.map(ct => {
//         const active = form.checks.includes(ct.key);
//         const tatValue = Number(tats[ct.key]) || 0;

//         // TAT color logic based on reference image
//         const getTatIndicator = (days) => {
//           if (days <= 1) return { color: '#2ecc71', label: `${days} Day` }; // Green
//           if (days <= 3) return { color: '#f1c40f', label: `${days} Days` }; // Yellow
//           return { color: '#e74c3c', label: `${days} Days` }; // Red/Orange
//         };

//         const tatDetails = getTatIndicator(tatValue);

//         return (
//           <tr 
//             key={ct.key} 
//             className={active ? "ac-check-active" : ""}
//             style={{ borderBottom: '1px solid #eaeaea', cursor: 'pointer' }}
//             onClick={() => toggleCheck(ct.key)}
//           >
//             {/* Check Type Column (Name with dot indicator) */}
//             <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <span className="ac-check-dot" />
//               <span>{ct.label}</span>
//             </td>

//             {/* Amount Column */}
//             <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
//               {isAdminUser ? (
//                 <div className="ac-check-rate-edit" title="Rate">
//                   <span className="ac-rate-prefix">₹</span>
//                   <input
//                     type="number"
//                     min="0"
//                     className="ac-rate-input"
//                     value={rates[ct.key]}
//                     onChange={(e) => setRate(ct.key, e.target.value)}
//                   />
//                 </div>
//               ) : (
//                 <div className="ac-check-rate-display" title="Configured rate">
//                   <span className="ac-rate-prefix">₹</span>
//                   <span className="ac-rate-value">{rates[ct.key]}</span>
//                 </div>
//               )}
//             </td>

//             {/* TAT Column */}
//             <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
//               {isAdminUser || !isClientUser ? (
//                 <div className="ac-check-rate-edit" title="Turnaround time (days)" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <span 
//                     style={{ 
//                       height: '10px', 
//                       width: '10px', 
//                       backgroundColor: tatDetails.color, 
//                       borderRadius: '50%', 
//                       display: 'inline-block' 
//                     }} 
//                   />
//                   <input
//                     type="number"
//                     min="0"
//                     className="ac-rate-input ac-tat-input"
//                     value={tats[ct.key]}
//                     onChange={(e) => setTat(ct.key, e.target.value)}
//                     style={{ width: '60px' }}
//                   />
//                   <span className="ac-rate-suffix">days</span>
//                 </div>
//               ) : (
//                 <div className="ac-check-rate-display" title="Turnaround time" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <span 
//                     style={{ 
//                       height: '10px', 
//                       width: '10px', 
//                       backgroundColor: tatDetails.color, 
//                       borderRadius: '50%', 
//                       display: 'inline-block' 
//                     }} 
//                   />
//                   <span className="ac-rate-value">{tats[ct.key]}</span>
//                   <span className="ac-rate-suffix">d</span>
//                 </div>
//               )}
//             </td>
//           </tr>
//         );
//       })}
//     </tbody>
//   </table>
// </div>
//                   <div className="ac-amount-bar">
//                     <span>{form.checks.length} of {visibleCheckTypes.length} selected</span>
//                     <span className="ac-tat-bar-item">
//                       Est. TAT: <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
//                     </span>
//                     {isAdminUser && (
//                       <span className="ac-total-amt">Total: ₹{totalAmount.toLocaleString()}</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* 04 — Notes */}
//                 <div className="ac-card">
//                   <div className="ac-card-header">
//                     <span className="ac-num">04</span>
//                     <h3>Internal Notes</h3>
//                   </div>
//                   <textarea className="ac-textarea" rows={4}
//                     placeholder="Special instructions for the verifier team..."
//                     value={form.notes} onChange={e => set("notes", e.target.value)} />
//                 </div>

//                 {/* Summary strip */}
//                 {form.billingMode && form.checks.length > 0 && (
//                   <div className="ac-summary-strip"
//                     style={{ borderColor: activeBilling?.color, background: `${activeBilling?.color}0d` }}>
//                     <div className="ac-summary-row">
//                       <span>Billing</span>
//                       <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
//                     </div>
//                     <div className="ac-summary-row">
//                       <span>Checks</span>
//                       <strong>{form.checks.length} selected</strong>
//                     </div>
//                     <div className="ac-summary-row">
//                       <span>Estimated TAT</span>
//                       <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
//                     </div>
//                     {form.billingMode === "prepaid_candidate" && (
//                       <div className="ac-summary-row">
//                         <span>Payment</span>
//                         <strong>{form.paymentTiming === "before" ? "Before docs" : "After docs"}</strong>
//                       </div>
//                     )}
//                     {form.billingMode === "postpaid_client" && form.invoiceCycle && (
//                       <div className="ac-summary-row">
//                         <span>Invoice</span>
//                         <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <button className="primary-cta ac-submit-btn"
//                   onClick={handleSubmit} disabled={loading}>
//                   {loading
//                     ? (isEditMode ? "Saving Changes..." : "Creating Case...")
//                     : (isEditMode ? "Save Changes" : "Create Case →")}
//                 </button>

//               </div>
//             </div>
//           </div>
//         </main>
//       </section>

//       {/* ── Bulk Upload Modal ────────────────────────────────────────────────── */}
//       {showBulkModal && (
//         <div style={{
//           position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
//           display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
//         }}>
//           <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "640px",
//             width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//               <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Bulk Upload Cases</h3>
//               <button onClick={closeBulkModal}
//                 style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>×</button>
//             </div>

//             {!bulkDone ? (
//               <>
//                 <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "16px", marginBottom: "20px", fontSize: "13px", color: "#475569" }}>
//                   <strong>CSV Format:</strong> Upload a CSV file with the following columns:<br />
//                   <code style={{ fontSize: "12px", background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
//                     candidate_name, candidate_email, mobile, position, checks, billing_mode, client_name
//                   </code><br />
//                   <span style={{ marginTop: "6px", display: "block" }}>
//                     For <code>checks</code>, separate multiple checks with <code>|</code> e.g. <code>employment|education|address</code>
//                   </span>
//                 </div>

//                 <input ref={fileInputRef} type="file" accept=".csv" onChange={handleBulkFileChange}
//                   style={{ marginBottom: "16px", fontSize: "13px" }} />

//                 {bulkErrors.length > 0 && (
//                   <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px",
//                     padding: "12px", marginBottom: "16px", fontSize: "13px", color: "#dc2626" }}>
//                     {bulkErrors.map((e, i) => <div key={i}>⚠ {e}</div>)}
//                   </div>
//                 )}

//                 {bulkRows.length > 0 && (
//                   <div style={{ marginBottom: "16px" }}>
//                     <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
//                       <strong>{bulkRows.length}</strong> row(s) ready to upload:
//                     </p>
//                     <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
//                       <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
//                         <thead>
//                           <tr style={{ background: "#f8fafc" }}>
//                             {["Candidate", "Email", "Checks", "Billing"].map(h => (
//                               <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700,
//                                 borderBottom: "1px solid #e2e8f0", color: "#475569" }}>{h}</th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {bulkRows.map((r, i) => (
//                             <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                               <td style={{ padding: "7px 10px", color: "#1e293b" }}>{r.candidate_name}</td>
//                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.candidate_email}</td>
//                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.checks?.join(", ")}</td>
//                               <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.billing_mode}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}

//                 <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
//                   <button className="secondary-cta" onClick={closeBulkModal}
//                     style={{ padding: "10px 20px", height: "auto", borderRadius: "8px" }}>Cancel</button>
//                   <button className="primary-cta"
//                     disabled={bulkRows.length === 0 || bulkUploading}
//                     onClick={handleBulkSubmit}
//                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>
//                     {bulkUploading ? "Uploading…" : `Upload ${bulkRows.length} Case(s)`}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div style={{ textAlign: "center", padding: "24px 0" }}>
//                 <div style={{ width: "56px", height: "56px", background: "#10b981", borderRadius: "50%",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   margin: "0 auto 16px", fontSize: "24px", color: "#fff" }}>✓</div>
//                 <h4 style={{ color: "#1e293b", marginBottom: "8px" }}>Upload Complete!</h4>
//                 <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
//                   {bulkRows.length} case(s) were uploaded successfully.
//                   {bulkErrors.length > 0 && ` ${bulkErrors.length} failed.`}
//                 </p>
//                 <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//                   <button className="secondary-cta import" onClick={closeBulkModal}
//                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>Close</button>
//                   <button className="primary-cta"
//                     onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}
//                     style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>View All Cases</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{sharedStyles}</style>
//     </>
//   );
// }

// // ── Styles ─────────────────────────────────────────
// const sharedStyles = `
//   .ac-page-title { font-size: 1.25rem; font-weight: 700; color: #2b3b8c; margin: 0; }
//   .ac-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 0px; }
//   @media (max-width: 960px) { .ac-layout { grid-template-columns: 1fr; } }
//   .ac-left, .ac-right { display: flex; flex-direction: column; gap: 20px; }
//   .ac-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 22px; }
//   .ac-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #f0f2f8; flex-wrap: wrap; }
//   .ac-card-header h3 { font-size: 0.82rem; font-weight: 700; color: #2b3b8c; letter-spacing: 0.06em; text-transform: uppercase; margin: 0; flex: 1; }
//   .ac-num { background: #2b3b8c; color: #fff; font-size: 0.68rem; font-weight: 800; width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//   .ac-billing-hint { font-size: 0.7rem; color: #94a3b8; font-style: italic; }
//   .ac-fields { display: flex; flex-direction: column; gap: 14px; }
//   .ac-field { display: flex; flex-direction: column; gap: 5px; }
//   .ac-label { font-size: 0.78rem; font-weight: 600; color: #475569; }
//   .ac-req { color: #eb4d4b; margin-left: 2px; }
//   .ac-optional { color: #94a3b8; font-weight: 400; }
//   .ac-input { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
//   .ac-input:focus { border-color: #2b3b8c; background: #fff; }
//   .ac-input-readonly { display: flex; align-items: center; background: #eef1fb; border: 1.5px solid #c7d2fe; color: #2b3b8c; font-weight: 700; cursor: default; }
//   .ac-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232b3b8c' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
//   .ac-billing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
//   @media (max-width: 700px) { .ac-billing-grid { grid-template-columns: 1fr; } }
//   .ac-billing-tile { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #f8fafc; cursor: pointer; text-align: left; transition: all 0.18s; }
//   .ac-billing-active { box-shadow: 0 0 0 2px currentColor; }
//   .ac-billing-tile-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
//   .ac-billing-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
//   .ac-billing-label { font-size: 0.78rem; font-weight: 700; color: #334155; }
//   .ac-billing-desc { font-size: 0.7rem; color: #94a3b8; margin: 0; line-height: 1.4; }
//   .ac-billing-section { border-top: 1px dashed #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 14px; }
//   .ac-billing-info-row { display: flex; align-items: flex-start; gap: 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; color: #0369a1; }
//   .ac-billing-info-icon { font-style: normal; font-weight: 700; flex-shrink: 0; }
//   .ac-billing-locked { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
//   .ac-billing-locked-note { font-size: 0.72rem; color: #94a3b8; margin: 0; }
//   .ac-timing-row { display: flex; gap: 8px; }
//   .ac-timing-btn { flex: 1; padding: 9px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.78rem; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.15s; }
//   .ac-timing-active { border-color: #0d9488; background: #f0fdfa; color: #0d9488; }
//   .ac-amount-display { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px 13px; font-size: 1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
//   .ac-amount-note { font-size: 0.72rem; font-weight: 400; color: #94a3b8; }
//   .ac-gen-link-btn { width: 100%; padding: 10px; border: 1.5px dashed #0d9488; border-radius: 8px; background: #f0fdfa; color: #0d9488; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
//   .ac-gen-link-btn:hover { background: #ccfbf1; }
//   .ac-link-row { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; }
//   .ac-link-url { font-size: 0.72rem; color: #0d9488; flex: 1; word-break: break-all; }
//   .ac-copy-btn { background: #0d9488; color: #fff; border: none; border-radius: 6px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; white-space: nowrap; }
//   .ac-link-send-row { display: flex; gap: 8px; margin-top: 8px; }
//   .ac-send-btn { flex: 1; padding: 7px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #f8fafc; font-size: 0.72rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
//   .ac-send-sms:hover { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }
//   .ac-send-email:hover { border-color: #2b3b8c; color: #2b3b8c; background: #eef1fb; }
//   .ac-send-wa:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
//   .ac-check-ctrl { display: flex; gap: 6px; align-items: center; font-size: 0.75rem; color: #94a3b8; }
//   .ac-link-btn { background: none; border: none; color: #2b3b8c; font-size: 0.75rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; }
//   .ac-checks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
//   .ac-check-tile { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; cursor: pointer; transition: all 0.15s; gap: 8px; }
//   .ac-check-tile:hover { border-color: #2b3b8c; }
//   .ac-check-active { border-color: #2b3b8c; background: #eef1fb; }
//   .ac-check-tile-top { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; font-weight: 600; color: #334155; }
//   .ac-check-active .ac-check-tile-top { color: #2b3b8c; }
//   .ac-check-dot { width: 8px; height: 8px; border-radius: 50%; border: 2px solid #cbd5e1; flex-shrink: 0; }
//   .ac-check-active .ac-check-dot { border-color: #2b3b8c; background: #2b3b8c; }
//   .ac-check-rate { font-size: 0.68rem; color: #94a3b8; font-weight: 600; text-align: right; white-space: nowrap; }
//   .ac-check-active .ac-check-rate { color: #2b3b8c; }
//   .ac-check-side { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
//   .ac-check-rate-edit { display: flex; align-items: center; gap: 2px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 2px 6px; flex-shrink: 0; }
//   .ac-check-rate-edit:focus-within { border-color: #2b3b8c; }
//   .ac-rate-prefix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
//   .ac-rate-suffix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
//   .ac-rate-input { width: 52px; border: none; outline: none; background: transparent; font-size: 0.72rem; font-weight: 700; color: #1e293b; padding: 2px 0; }
//   .ac-tat-input { width: 34px; }
//   .ac-rate-input::-webkit-inner-spin-button, .ac-rate-input::-webkit-outer-spin-button { margin: 0; }
//   .ac-amount-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: #94a3b8; flex-wrap: wrap; gap: 8px; }
//   .ac-tat-bar-item strong { color: #0d9488; font-weight: 700; }
//   .ac-total-amt { font-weight: 700; color: #2b3b8c; font-size: 0.85rem; }
//   .ac-textarea { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box; }
//   .ac-textarea:focus { border-color: #2b3b8c; background: #fff; }
//   .ac-summary-strip { border: 1.5px solid; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
//   .ac-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; }
//   .ac-summary-row strong { font-weight: 700; color: #1e293b; }
//   .ac-submit-btn { width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 700; }
//   .ac-success-wrap { display: flex; align-items: center; justify-content: center; min-height: 70vh; }
//   .ac-success-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 16px; padding: 48px 40px; text-align: center; max-width: 500px; width: 100%; }
//   .ac-success-icon { width: 64px; height: 64px; background: #10b981; color: #fff; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
//   .ac-success-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
//   .ac-success-id { font-size: 1.1rem; font-weight: 700; color: #2b3b8c; background: #eef1fb; display: inline-block; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px!important; }
//   .ac-success-meta { background: #f8fafc; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
//   .ac-success-meta-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: #64748b; }
//   .ac-success-checks { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 24px; }
//   .ac-check-badge { background: #eef1fb; color: #2b3b8c; font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
//   .ac-success-link-box { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 12px; margin-bottom: 20px; }
//   .ac-success-link-label { font-size: 0.72rem; color: #64748b; margin: 0 0 4px; font-weight: 600; }
//   .ac-success-link-url { font-size: 0.78rem; color: #0d9488; margin: 0; word-break: break-all; }
//   .ac-success-actions { display: flex; gap: 12px; justify-content: center; }
// `;
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

const DEFAULT_CHECK_RATES = {
  employment: '', education: '', address: '',
  database: '',  criminal: '',  drug: '', court: '',
};

// ── Default turnaround time (in days) per check type — starts at 0,
//    admin fills in the actual TAT per case.
const DEFAULT_CHECK_TAT = {
  employment: '', education: '', address: '',
  database: '',  criminal: '',  drug: '', court: '',
};

const CHECK_TYPES = [
  { key: "employment", label: "Employment" },
  { key: "education",  label: "Education"  },
  { key: "address",    label: "Address"    },
  { key: "database",   label: "Database"   },
  { key: "criminal",   label: "Criminal"   },
  { key: "drug",       label: "Drug Test"  },
  { key: "court",      label: "Courtroom"  },
];

const BILLING_MODES = [
  { key: "prepaid_client",    label: "Prepaid — Client",    desc: "Client pays upfront. Case created immediately.",          color: "#2b3b8c" },
  { key: "prepaid_candidate", label: "Prepaid — Candidate", desc: "Candidate pays via payment link before or after docs.",   color: "#0d9488" },
  { key: "postpaid_client",   label: "Postpaid — Client",   desc: "Case created now. Client invoiced at month end.",         color: "#7c3aed" },
  { key: "postpaid_prepaid_client", label: "Postpaid/Prepaid — Client", desc: "Flexible client billing — paid upfront or invoiced later, decided per case.", color: "#c2410c" },
];

// ── SINGLE declaration — remove the duplicate below getEmptyForm ──
const CHECK_KEY_ALIASES = {
  drug_test: "drug",
  courtroom: "court",
};

function getUser() {
  try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
}

function buildCheckRates(user) {
  if (user.role === "client" && user.checkRates && typeof user.checkRates === "object") {
    const rates = { ...DEFAULT_CHECK_RATES };
    Object.entries(user.checkRates).forEach(([key, val]) => {
      const mapped = CHECK_KEY_ALIASES[key] || key;
      if (mapped in rates) rates[mapped] = Number(val) || 0;
    });
    return rates;
  }
  return DEFAULT_CHECK_RATES;
}

// ── Build the TAT map, same pattern as buildCheckRates ──────────────────────
function buildCheckTats(user) {
  if (user.role === "client" && user.checkTat && typeof user.checkTat === "object") {
    const tats = { ...DEFAULT_CHECK_TAT };
    Object.entries(user.checkTat).forEach(([key, val]) => {
      const mapped = CHECK_KEY_ALIASES[key] || key;
      if (mapped in tats) tats[mapped] = Number(val) || 0;
    });
    return tats;
  }
  return DEFAULT_CHECK_TAT;
}

function getEmptyForm(user) {
  const isClient = user.role === "client";
  const preselectedChecks = isClient && Array.isArray(user.agreedChecks)
    ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k).filter(k => CHECK_TYPES.some(ct => ct.key === k))
    : [];

  return {
    candidateName: "", candidateEmail: "", candidateMobile: "",
    position: "",
    DOB: "",
    clientId:   isClient ? String(user.id ?? "") : "",
    clientName: isClient ? (user.name || "") : "",
    priority: "normal",
    billingMode: isClient ? (user.billingMode || "") : "",
    checks: preselectedChecks,
    notes: "",
    paymentTiming: "before", paymentLinkSent: false,
    invoiceCycle: "monthly", poNumber: "",
  };
}

// ── <input type="date"> requires exactly "yyyy-MM-dd" — the API returns
//    full ISO datetimes (e.g. "2026-08-03T00:00:00.000000Z"), which the
//    browser silently rejects ("does not conform to required format").
//    Slicing to the first 10 chars keeps just the date part.
function toDateInputValue(v) {
  if (!v) return "";
  const s = String(v);
  return s.length >= 10 ? s.slice(0, 10) : s;
}

// ── Map a case object (as returned by the API) onto form field shape ────────
function caseToForm(c, fallback) {
  return {
    candidateName:   c.candidate_name || c.candidate || fallback.candidateName,
    candidateEmail:  c.candidate_email || fallback.candidateEmail,
    candidateMobile: c.candidate_mobile || fallback.candidateMobile,
    position:        c.position || fallback.position,
    DOB:             toDateInputValue(c.candidate_dob || c.dob) || fallback.DOB,
    clientId:        c.client_id != null ? String(c.client_id) : fallback.clientId,
    clientName:      c.client_name || c.client || fallback.clientName,
    priority:        c.priority || fallback.priority,
    billingMode:     c.billing_mode || fallback.billingMode,
    checks: Array.isArray(c.checks)
      ? c.checks.map(k => CHECK_KEY_ALIASES[k] || k)
      : (typeof c.checks === "string"
          ? c.checks.split(/[·,]/).map(k => CHECK_KEY_ALIASES[k.trim()] || k.trim()).filter(Boolean)
          : fallback.checks),
    notes:           c.notes || fallback.notes,
    paymentTiming:   c.payment_timing || fallback.paymentTiming,
    paymentLinkSent: fallback.paymentLinkSent,
    invoiceCycle:    c.invoice_cycle || fallback.invoiceCycle,
    poNumber:        c.po_number || fallback.poNumber,
  };
}

// ── Bulk upload CSV parser ────────────────────────────────────────────────────
function parseBulkCSV(text) {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return { rows: [], errors: ["CSV must have a header row and at least one data row."] };
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const rows = [];
  const errors = [];
  lines.slice(1).forEach((line, i) => {
    const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
    const row = {};
    headers.forEach((h, j) => { row[h] = vals[j] || ""; });
    if (!row.candidate_name && !row.candidate) { errors.push(`Row ${i + 2}: missing candidate name`); return; }
    if (!row.candidate_email && !row.email)    { errors.push(`Row ${i + 2}: missing email`); return; }
    rows.push({
      candidate_name:  row.candidate_name || row.candidate,
      candidate_email: row.candidate_email || row.email,
      candidate_mobile: row.mobile || row.candidate_mobile || "",
      position:        row.position || "",
      checks:          (row.checks || "employment").split("|").map(c => c.trim()),
      billing_mode:    row.billing_mode || "postpaid_client",
      client_name:     row.client_name || row.client || "",
    });
  });
  return { rows, errors };
}

export default function AddCase() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const isClientUser = user.role === "client";
  const isAdminUser  = user.role === "admin";

  // ── Edit mode is driven entirely by ?editCaseId=... in the URL ──────────────
  const editCaseId = new URLSearchParams(location.search).get("editCaseId") || null;
  const isEditMode = Boolean(editCaseId);

  const [form, setForm]               = useState(() => getEmptyForm(user));
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [caseId, setCaseId]           = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [linkCopied, setLinkCopied]   = useState(false);

  // ── Candidate document portal link — separate from the payment link.
  //    Lets the candidate fill in check-specific forms and upload their
  //    supporting documents themselves, regardless of billing mode.
  const [candidatePortalLink, setCandidatePortalLink] = useState("");
  const [candidateLinkCopied, setCandidateLinkCopied] = useState(false);

  // ── Check rates — admin can edit these live per case; everyone else uses
  //    the fixed default / contract rate as-is.
  const [rates, setRates] = useState(() => buildCheckRates(user));

  // ── Check TAT (turnaround time, in days) — admin can edit these live per
  //    case; everyone else sees the fixed default / contract TAT as-is.
  const [tats, setTats] = useState(() => buildCheckTats(user));

  // ── Edit mode: fetch the existing case and prefill the form ─────────────────
  const [fetchingCase, setFetchingCase] = useState(isEditMode);
  const [loadError, setLoadError]       = useState("");

  // ── Real client list for the dropdown — client-role users have their
  //    own clientId/clientName locked already (getEmptyForm), so this only
  //    needs to run for admin/allocator users who are picking a client.
  const [clients, setClients]             = useState([]);
  const [clientsLoading, setClientsLoading] = useState(!isClientUser);
  const [clientsError, setClientsError]   = useState("");

  useEffect(() => {
    if (isClientUser) return;

    let cancelled = false;
    const token = localStorage.getItem("token");

    setClientsLoading(true);
    setClientsError("");

    fetch(`${API_URL}/api/clients`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => r.json())
      .then(data => { if (!cancelled) setClients(data.clients || []); })
      .catch(() => { if (!cancelled) setClientsError("Failed to load clients."); })
      .finally(() => { if (!cancelled) setClientsLoading(false); });

    return () => { cancelled = true; };
  }, [isClientUser]);

  useEffect(() => {
    if (!isEditMode) return;

    let cancelled = false;
    const token = localStorage.getItem("token");

    setFetchingCase(true);
    setLoadError("");

    fetch(`${API_URL}/api/cases/${encodeURIComponent(editCaseId)}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => {
        if (!r.ok) throw new Error(r.status === 404 ? "This case could not be found." : "Failed to load case details.");
        return r.json();
      })
      .then(data => {
        if (cancelled) return;
        const c = data.case || data;
        setForm(prev => caseToForm(c, prev));
        if (c.total_amount != null) {
          // Keep admin-editable rates in sync with whatever was actually
          // billed on this case, if the API returns a per-check breakdown.
          if (c.check_rates && typeof c.check_rates === "object") {
            setRates(prev => {
              const next = { ...prev };
              Object.entries(c.check_rates).forEach(([k, v]) => {
                const mapped = CHECK_KEY_ALIASES[k] || k;
                if (mapped in next) next[mapped] = Number(v) || 0;
              });
              return next;
            });
          }
        }
        // Keep admin-editable TAT in sync with whatever was actually set on
        // this case, if the API returns a per-check TAT breakdown.
        if (c.check_tat && typeof c.check_tat === "object") {
          setTats(prev => {
            const next = { ...prev };
            Object.entries(c.check_tat).forEach(([k, v]) => {
              const mapped = CHECK_KEY_ALIASES[k] || k;
              if (mapped in next) next[mapped] = Number(v) || 0;
            });
            return next;
          });
        }
        if (c.payment_link) setGeneratedLink(c.payment_link);
        if (c.candidate_portal_link) setCandidatePortalLink(c.candidate_portal_link);
      })
      .catch(err => { if (!cancelled) setLoadError(err.message || "Failed to load case details."); })
      .finally(() => { if (!cancelled) setFetchingCase(false); });

    return () => { cancelled = true; };
  }, [editCaseId, isEditMode]);

  // ── Bulk upload state ───────────────────────────────────────────────────────
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkRows, setBulkRows]           = useState([]);
  const [bulkErrors, setBulkErrors]       = useState([]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkDone, setBulkDone]           = useState(false);
  const fileInputRef = useRef(null);

  const setRate = (key, value) => {
    const num = Number(value);
    setRates(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
  };

  // ── Update a single check's TAT (days) ───────────────────────────────────
  const setTat = (key, value) => {
    const num = Number(value);
    setTats(p => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
  };

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const toggleCheck = (key) =>
    setForm(p => ({
      ...p,
      checks: p.checks.includes(key)
        ? p.checks.filter(c => c !== key)
        : [...p.checks, key],
    }));

  const selectAll = () => setForm(p => ({ ...p, checks: visibleCheckTypes.map(c => c.key) }));
  const clearAll  = () => setForm(p => ({ ...p, checks: [] }));

  const totalAmount = form.checks.reduce((s, k) => s + (rates[k] || 0), 0);

  // ── Checks a client account is actually allowed to pick. A client is
  //    restricted to whatever the admin configured on their account
  //    (agreedChecks) — they shouldn't be able to add a check type they
  //    have no contract/rate for. Anything already on the case being
  //    edited stays visible too, so an existing case doesn't lose a row
  //    just because the client's contract changed after it was created.
  //    Admin/staff are never restricted.
  const agreedCheckKeys = isClientUser && Array.isArray(user.agreedChecks)
    ? user.agreedChecks.map(k => CHECK_KEY_ALIASES[k] || k)
    : null; // null = no restriction

  const visibleCheckTypes = agreedCheckKeys
    ? CHECK_TYPES.filter(ct => agreedCheckKeys.includes(ct.key) || form.checks.includes(ct.key))
    : CHECK_TYPES;

  // ── Per-check TAT display — shows each selected check's day count
  //    individually (e.g. "5, 6, 7") instead of summing them. A sum
  //    overstates the real timeline since checks typically run in
  //    parallel, not back-to-back.
  const overallTatValues  = form.checks.map(k => Number(tats[k]) || 0);
  const overallTatDisplay = overallTatValues.length > 0 ? overallTatValues.join(", ") : "";

  // Kept as a single number for anything that still needs one — e.g.
  // AllClients.jsx's per-client average-TAT aggregate reads this field via
  // Number(c.overall_tat ?? c.tat). Using the longest single check here
  // (not the sum) so that aggregate stays meaningful.
  const overallTat = overallTatValues.length > 0 ? Math.max(...overallTatValues) : 0;

  // ── TAT payload actually sent to the API — scoped to selected checks only.
  //    `tats` state always carries all 7 keys (empty string default for
  //    anything the user hasn't touched), so sending the raw object as-is
  //    pushes empty strings for unselected checks and trips the backend's
  //    "must be a number" validation. Only the checks in form.checks are
  //    relevant, and everything in there gets coerced to a real number.
  const checkTatPayload = Object.fromEntries(
    form.checks.map(k => [k, Number(tats[k]) || 0])
  );
  const checkRatesPayload = Object.fromEntries(
  form.checks.map(k => [k, Number(rates[k]) || 0])
);

  // Only used by admin/allocator — clients have a locked clientId/clientName.
  // NOTE: billing_mode field name is a guess (billing_mode / billingMode /
  // billingDefault) until I can see the actual /api/clients response shape —
  // worth double-checking once the backend files are shared.
  const handleClientChange = (clientId) => {
    const client = clients.find(c => String(c.id) === clientId);
    setForm(p => ({
      ...p,
      clientId,
      clientName:  client?.company_name || client?.name || "",
      billingMode: client?.billing_mode || client?.billingMode || client?.billingDefault || p.billingMode,
    }));
  };

  const generatePaymentLink = () => {
    const fake = `https://pay.bgvportal.in/c/${Math.random().toString(36).slice(2, 10)}`;
    setGeneratedLink(fake);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const generateCandidatePortalLink = () => {
    const fake = `https://portal.bgvportal.in/candidate/${Math.random().toString(36).slice(2, 10)}`;
    setCandidatePortalLink(fake);
  };

  const copyCandidateLink = () => {
    navigator.clipboard.writeText(candidatePortalLink);
    setCandidateLinkCopied(true);
    setTimeout(() => setCandidateLinkCopied(false), 2000);
  };

  const validate = () => {
    if (!form.candidateName.trim())  return "Candidate name is required.";
    if (!form.candidateEmail.trim()) return "Candidate email is required.";
    if (!form.DOB)                   return "Candidate date of birth is required.";
    if (!form.clientId)              return "Please select a client.";
    if (!form.billingMode) {
      return isClientUser
        ? "Your account doesn't have a billing mode set. Please contact support."
        : "Please select a billing mode.";
    }
    if (form.checks.length === 0)    return "Select at least one check type.";
    return null;
  };

  // ── Submit to real API — POST to create, PUT to update an existing case ─────
  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url    = isEditMode ? `${API_URL}/api/cases/${encodeURIComponent(editCaseId)}` : `${API_URL}/api/cases`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          candidate_name:   form.candidateName,
          candidate_email:  form.candidateEmail,
          candidate_mobile: form.candidateMobile,
          candidate_dob:    form.DOB,
          position:         form.position,
          client_name:      form.clientName,
          client_id:        form.clientId || null,
          checks:           form.checks,
          priority:         form.priority,
          billing_mode:     form.billingMode,
          payment_timing:   form.paymentTiming,
          invoice_cycle:    form.invoiceCycle,
          po_number:        form.poNumber,
          total_amount:     totalAmount,
          check_tat:        checkTatPayload,
          check_rates:      checkRatesPayload, 
          overall_tat:      overallTat,
          payment_link:     generatedLink || null,
          candidate_portal_link: candidatePortalLink || null,
          notes:            form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || (isEditMode ? "Failed to update case." : "Failed to create case."));
        return;
      }

      setCaseId(isEditMode ? editCaseId : data.case.case_id);
      setSubmitted(true);

    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(getEmptyForm(user));
    setRates(buildCheckRates(user));
    setTats(buildCheckTats(user));
    setSubmitted(false);
    setCaseId(null);
    setGeneratedLink("");
    setCandidatePortalLink("");
    setCandidateLinkCopied(false);
    setError("");
  };

  // ── Bulk upload handlers ────────────────────────────────────────────────────
  const handleBulkFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const { rows, errors } = parseBulkCSV(ev.target.result);
      setBulkRows(rows);
      setBulkErrors(errors);
      setBulkDone(false);
    };
    reader.readAsText(file);
  };

  const handleBulkSubmit = async () => {
    if (bulkRows.length === 0) return;
    setBulkUploading(true);
    try {
      const token = localStorage.getItem("token");
      const results = await Promise.allSettled(
        bulkRows.map(row =>
          fetch(`${API_URL}/api/cases`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(row),
          })
        )
      );
      const failed = results.filter(r => r.status === "rejected" || (r.value && !r.value.ok)).length;
      setBulkErrors(failed > 0 ? [`${failed} case(s) failed to upload. Others may have succeeded.`] : []);
      setBulkDone(true);
    } catch (err) {
      setBulkErrors([err.message]);
    } finally {
      setBulkUploading(false);
    }
  };

  const closeBulkModal = () => {
    setShowBulkModal(false);
    setBulkRows([]);
    setBulkErrors([]);
    setBulkDone(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const activeBilling = BILLING_MODES.find(b => b.key === form.billingMode);

  // ── Edit mode: loading state while the case is being fetched ────────────────
  if (isEditMode && fetchingCase) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading case details…</p>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
      </>
    );
  }

  // ── Edit mode: case failed to load ───────────────────────────────────────────
  if (isEditMode && loadError) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>{loadError}</p>
                <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
                  ← Back to Cases
                </button>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
      </>
    );
  }

  // ── Success Screen ────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div className="ac-success-wrap">
                <div className="ac-success-card">
                  <div className="ac-success-icon">✓</div>
                  <h2 className="ac-success-title">{isEditMode ? "Case Updated" : "Case Created"}</h2>
                  <p className="ac-success-id">{caseId}</p>

                  <div className="ac-success-meta">
                    <div className="ac-success-meta-row">
                      <span>Candidate</span><strong>{form.candidateName}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>DOB</span><strong>{form.DOB}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Client</span><strong>{form.clientName}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Billing</span>
                      <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Estimated TAT</span>
                      <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
                    </div>
                    {form.billingMode === "postpaid_client" && (
                      <div className="ac-success-meta-row">
                        <span>Invoice Cycle</span>
                        <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
                      </div>
                    )}
    
                  </div>

                  <div className="ac-success-checks">
                    {form.checks.map(c => (
                      <span key={c} className="ac-check-badge">
                        {CHECK_TYPES.find(t => t.key === c)?.label}
                      </span>
                    ))}
                  </div>

                  <div className="ac-success-portal-box">
                    <p className="ac-success-portal-label">Candidate Document Portal</p>
                    {!candidatePortalLink ? (
                      <button type="button" className="ac-gen-link-btn" onClick={generateCandidatePortalLink}>
                        + Generate Candidate Link
                      </button>
                    ) : (
                      <>
                        <div className="ac-link-row">
                          <span className="ac-link-url">{candidatePortalLink}</span>
                          <button type="button" className="ac-copy-btn" onClick={copyCandidateLink}>
                            {candidateLinkCopied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <p className="ac-success-portal-hint">
                          Share this link with the candidate to fill in check-specific forms and upload supporting documents.
                        </p>
                        <div className="ac-link-send-row">
                          <button type="button" className="ac-send-btn ac-send-sms">📱 SMS</button>
                          <button type="button" className="ac-send-btn ac-send-email">✉ Email</button>
                          <button type="button" className="ac-send-btn ac-send-wa">💬 WhatsApp</button>
                        </div>
                      </>
                    )}
                  </div>

                  {form.billingMode === "prepaid_candidate" && generatedLink && (
                    <div className="ac-success-link-box">
                      <p className="ac-success-link-label">Payment Link</p>
                      <p className="ac-success-link-url">{generatedLink}</p>
                    </div>
                  )}

                  <div className="ac-success-actions">
                    <button className="primary-cta" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
                      View All Cases
                    </button>
                    {!isEditMode && (
                      <button className="secondary-cta import" onClick={handleReset}>
                        Add Another
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
      </>
    );
  }

  // ── Main Form ─────────────────────────────────────────────
  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            <div className="dash-upper-head">
              <div className="left">
                <h2 className="ac-page-title">{isEditMode ? `Edit Case — ${editCaseId}` : "Add New Case"}</h2>
              </div>
              <div className="right">
                {!isEditMode && (
                  <button className="secondary-cta import"
                    onClick={() => setShowBulkModal(true)}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="images/dashboard/export-excel.svg" alt="" style={{ width: "16px" }} />
                    Bulk Upload
                  </button>
                )}
                <button className="secondary-cta import" onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}>
                  ← All Cases
                </button>
              </div>
            </div>

            {isEditMode && (
              <div style={{
                background: "#eef3ff", border: "1px solid #c7d2fe", borderRadius: "8px",
                padding: "12px 16px", color: "#2b3b8c", fontSize: "14px", margin: "12px 0"
              }}>
                Editing case <strong>{editCaseId}</strong>. Your changes will be saved to this case.
              </div>
            )}

            {error && (
              <div style={{
                background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px",
                padding: "12px 16px", color: "#dc2626", fontSize: "14px", margin: "12px 0"
              }}>
                {error}
              </div>
            )}

            <div className="ac-layout">

              {/* ══ LEFT COLUMN ══ */}
              <div className="ac-left">

                {/* 01 — Candidate Info */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">01</span>
                    <h3>Candidate Information</h3>
                  </div>
                  <div className="ac-fields">
                    <div className="ac-field">
                      <label className="ac-label">Candidate Name <span className="ac-req">*</span></label>
                      <input className="ac-input" type="text" placeholder="Full name as per documents"
                        value={form.candidateName} onChange={e => set("candidateName", e.target.value)} />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">Email Address <span className="ac-req">*</span></label>
                      <input className="ac-input" type="email" placeholder="candidate@email.com"
                        value={form.candidateEmail} onChange={e => set("candidateEmail", e.target.value)} />
                    </div>
                    <div className="ac-field">
  <label className="ac-label">
    Mobile Number <span className="form-required">*</span>
  </label>

  <input
    className="ac-input"
    type="tel"
    placeholder="+91 XXXXX XXXXX"
    value={form.candidateMobile}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 12);
      set("candidateMobile", value);
    }}
    required
    maxLength={12}
    pattern="[0-9]{12}"
    title="Please enter a valid 12-digit mobile number"
  />
</div>
                    <div className="ac-field">
  <label className="ac-label">
    Position Applied For <span className="form-required">*</span>
  </label>

  <input
    className="ac-input"
    type="text"
    placeholder="e.g. Senior Engineer"
    value={form.position}
    onChange={e => set("position", e.target.value)}
  />
</div>
                    <div className="ac-field">
                      <label className="ac-label">Date of Birth <span className="ac-req">*</span></label>
                      <input className="ac-input" type="date"
                        value={form.DOB} onChange={e => set("DOB", e.target.value)} />
                    </div>

                    {/* Client field — locked to self for client-role users */}
                    {/* <div className="ac-field">
                      <label className="ac-label">Client <span className="ac-req">*</span></label>
                      {isClientUser ? (
                        <div className="ac-input ac-input-readonly">{form.clientName || user.name}</div>
                      ) : (
                        <>
                          <select className="ac-input ac-select" value={form.clientId}
                            onChange={e => handleClientChange(e.target.value)}
                            disabled={clientsLoading}>
                            <option value="">
                              {clientsLoading
                                ? "Loading clients…"
                                : clientsError
                                ? "Failed to load clients"
                                : clients.length === 0
                                ? "No clients found"
                                : "— Select Client —"}
                            </option>
                            {clients.map(c => (
                              <option key={c.id} value={c.id}>{c.company_name || c.name}</option>
                            ))}
                          </select>
                          {clientsError && (
                            <span style={{ fontSize: "0.72rem", color: "#dc2626" }}>
                              {clientsError} — check your connection and reload.
                            </span>
                          )}
                        </>
                      )}
                    </div> */}
                    <div className="ac-field">
  <label className="ac-label">
    Client <span className="ac-req">*</span>
  </label>
  <select
    className="ac-input ac-select"
    value={form.clientId}
    onChange={(e) => handleClientChange(e.target.value)}
  >
    <option value="">
      {clientsLoading
        ? "Loading clients…"
        : clientsError
        ? "Failed to load clients"
        : clients.length === 0
        ? "No clients found"
        : "— Select Client —"}
    </option>
    {clients.map((c) => (
      <option key={c.id} value={c.id}>
        {c.company_name || c.name}
      </option>
    ))}
  </select>
  {clientsError && (
    <span style={{ fontSize: "0.72rem", color: "#dc2626" }}>
      {clientsError} — check your connection and reload.
    </span>
  )}
</div>
                  </div>
                </div>

                {/* 02 — Billing Mode */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">02</span>
                    <h3>Billing Mode <span className="ac-req">*</span></h3>
                    {!isClientUser && form.clientId && (
                      <span className="ac-billing-hint">Auto-set from client · override below</span>
                    )}
                  </div>

                  {isClientUser ? (
                    activeBilling ? (
                      <div className="ac-billing-locked">
                        <div className="ac-billing-tile ac-billing-active"
                          style={{ borderColor: activeBilling.color, background: `${activeBilling.color}10`, cursor: "default" }}>
                          <div className="ac-billing-tile-top">
                            <span className="ac-billing-dot" style={{ background: activeBilling.color }} />
                            <span className="ac-billing-label" style={{ color: activeBilling.color }}>
                              🔒 {activeBilling.label}
                            </span>
                          </div>
                          <p className="ac-billing-desc">{activeBilling.desc}</p>
                        </div>
                        <p className="ac-billing-locked-note">
                          This is your account's registered billing mode and can't be changed here.
                          Contact your account manager to update it.
                        </p>
                      </div>
                    ) : (
                      <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626" }}>
                        <span className="ac-billing-info-icon">⚠</span>
                        <span>No billing mode is set on your account. Please contact support before creating a case.</span>
                      </div>
                    )
                  ) : (
                    <div className="ac-billing-grid">
                      {BILLING_MODES.map(mode => {
                        const active = form.billingMode === mode.key;
                        return (
                          <button key={mode.key} type="button"
                            className={`ac-billing-tile ${active ? "ac-billing-active" : ""}`}
                            style={active ? { borderColor: mode.color, background: `${mode.color}10` } : {}}
                            onClick={() => set("billingMode", mode.key)}>
                            <div className="ac-billing-tile-top">
                              <span className="ac-billing-dot"
                                style={{ background: active ? mode.color : "#cbd5e1" }} />
                              <span className="ac-billing-label"
                                style={active ? { color: mode.color } : {}}>
                                {mode.label}
                              </span>
                            </div>
                            <p className="ac-billing-desc">{mode.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {form.billingMode === "prepaid_client" && (
                    <div className="ac-billing-section">
                      <div className="ac-billing-info-row">
                        <span className="ac-billing-info-icon">ℹ</span>
                        <span>Client has prepaid. Case will be created and deducted from their balance immediately.</span>
                      </div>
                    </div>
                  )}

                  {form.billingMode === "postpaid_prepaid_client" && (
                    <div className="ac-billing-section">
                      <div className="ac-billing-info-row">
                        <span className="ac-billing-info-icon">ℹ</span>
                        <span>Flexible billing for this client. Confirm with the client whether this case is paid upfront or invoiced later before proceeding.</span>
                      </div>
                    </div>
                  )}

                  {form.billingMode === "prepaid_candidate" && (
                    <div className="ac-billing-section">
                      <div className="ac-field">
                        <label className="ac-label">When does candidate pay?</label>
                        <div className="ac-timing-row">
                          {[
                            { key: "before", label: "Before submitting docs" },
                            { key: "after",  label: "After submitting docs"  },
                          ].map(t => (
                            <button key={t.key} type="button"
                              className={`ac-timing-btn ${form.paymentTiming === t.key ? "ac-timing-active" : ""}`}
                              onClick={() => set("paymentTiming", t.key)}>
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {isAdminUser && (
                        <div className="ac-field">
                          <label className="ac-label">Payment Amount</label>
                          <div className="ac-amount-display">
                            ₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}
                            <span className="ac-amount-note">
                              {form.checks.length > 0
                                ? `(${form.checks.length} checks selected)`
                                : "Select checks to calculate"}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="ac-field">
                        <label className="ac-label">Payment Link</label>
                        {!generatedLink ? (
                          <button type="button" className="ac-gen-link-btn" onClick={generatePaymentLink}>
                            + Generate Payment Link
                          </button>
                        ) : (
                          <>
                            <div className="ac-link-row">
                              <span className="ac-link-url">{generatedLink}</span>
                              <button type="button" className="ac-copy-btn" onClick={copyLink}>
                                {linkCopied ? "Copied!" : "Copy"}
                              </button>
                            </div>
                            <div className="ac-link-send-row">
                              <button type="button" className="ac-send-btn ac-send-sms">📱 SMS</button>
                              <button type="button" className="ac-send-btn ac-send-email">✉ Email</button>
                              <button type="button" className="ac-send-btn ac-send-wa">💬 WhatsApp</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {form.billingMode === "postpaid_client" && (
                    <div className="ac-billing-section">
                      <div className="ac-field">
                        <label className="ac-label">Invoice Cycle</label>
                        <div className="ac-timing-row">
                          {[
                            { key: "monthly",  label: "Monthly Invoice" },
                            { key: "per_case", label: "Per Case Invoice" },
                          ].map(t => (
                            <button key={t.key} type="button"
                              className={`ac-timing-btn ${form.invoiceCycle === t.key ? "ac-timing-active" : ""}`}
                              onClick={() => set("invoiceCycle", t.key)}>
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="ac-field">
                        <label className="ac-label">PO Number <span className="ac-optional">(optional)</span></label>
                        <input className="ac-input" type="text" placeholder="e.g. PO-2024-0391"
                          value={form.poNumber} onChange={e => set("poNumber", e.target.value)} />
                      </div>
                      {isAdminUser ? (
                        <div className="ac-billing-info-row">
                          <span className="ac-billing-info-icon">ℹ</span>
                          <span>
                            Invoice of <strong>₹{totalAmount > 0 ? totalAmount.toLocaleString() : "—"}</strong> will be
                            raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
                          </span>
                        </div>
                      ) : (
                        <div className="ac-billing-info-row">
                          <span className="ac-billing-info-icon">ℹ</span>
                          <span>
                            Invoice will be raised {form.invoiceCycle === "monthly" ? "at month end" : "immediately after case closure"}.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* ══ RIGHT COLUMN ══ */}
              <div className="ac-right">

                {/* 03 — Check Types */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">03</span>
                    <h3>Check Types <span className="ac-req">*</span></h3>
                    <div className="ac-check-ctrl">
                      <button type="button" className="ac-link-btn" onClick={selectAll}>All</button>
                      <span>·</span>
                      <button type="button" className="ac-link-btn" onClick={clearAll}>Clear</button>
                    </div>
                  </div>

                  <div className="ac-checks-table-container">
  {isClientUser && visibleCheckTypes.length === 0 && (
    <div className="ac-billing-info-row" style={{ borderColor: "#fca5a5", background: "#fff5f5", color: "#dc2626", marginBottom: "12px" }}>
      <span className="ac-billing-info-icon">⚠</span>
      <span>No check types are configured on your account yet. Contact your account manager before creating a case.</span>
    </div>
  )}
  <table className="ac-checks-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ textAlign: 'left', padding: '12px' }}>Check Type</th>
        <th style={{ textAlign: 'left', padding: '12px' }}>Amount</th>
        <th style={{ textAlign: 'left', padding: '12px' }}>TAT</th>
      </tr>
    </thead>
    <tbody>
      {visibleCheckTypes.map(ct => {
        const active = form.checks.includes(ct.key);
        const tatValue = Number(tats[ct.key]) || 0;

        // TAT color logic based on reference image
        const getTatIndicator = (days) => {
          if (days <= 1) return { color: '#2ecc71', label: `${days} Day` }; // Green
          if (days <= 3) return { color: '#f1c40f', label: `${days} Days` }; // Yellow
          return { color: '#e74c3c', label: `${days} Days` }; // Red/Orange
        };

        const tatDetails = getTatIndicator(tatValue);

        return (
          <tr 
            key={ct.key} 
            className={active ? "ac-check-active" : ""}
            style={{ borderBottom: '1px solid #eaeaea', cursor: 'pointer' }}
            onClick={() => toggleCheck(ct.key)}
          >
            {/* Check Type Column (Name with dot indicator) */}
            <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="ac-check-dot" />
              <span>{ct.label}</span>
            </td>

            {/* Amount Column */}
            <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
              {isAdminUser ? (
                <div className="ac-check-rate-edit" title="Rate">
                  <span className="ac-rate-prefix">₹</span>
                  <input
                    type="number"
                    min="0"
                    className="ac-rate-input"
                    value={rates[ct.key]}
                    onChange={(e) => setRate(ct.key, e.target.value)}
                  />
                </div>
              ) : (
                <div className="ac-check-rate-display" title="Configured rate">
                  <span className="ac-rate-prefix">₹</span>
                  <span className="ac-rate-value">{rates[ct.key]}</span>
                </div>
              )}
            </td>

            {/* TAT Column */}
            <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
              {isAdminUser || !isClientUser ? (
                <div className="ac-check-rate-edit" title="Turnaround time (days)" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{ 
                      height: '10px', 
                      width: '10px', 
                      backgroundColor: tatDetails.color, 
                      borderRadius: '50%', 
                      display: 'inline-block' 
                    }} 
                  />
                  <input
                    type="number"
                    min="0"
                    className="ac-rate-input ac-tat-input"
                    value={tats[ct.key]}
                    onChange={(e) => setTat(ct.key, e.target.value)}
                    style={{ width: '60px' }}
                  />
                  <span className="ac-rate-suffix">days</span>
                </div>
              ) : (
                <div className="ac-check-rate-display" title="Turnaround time" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{ 
                      height: '10px', 
                      width: '10px', 
                      backgroundColor: tatDetails.color, 
                      borderRadius: '50%', 
                      display: 'inline-block' 
                    }} 
                  />
                  <span className="ac-rate-value">{tats[ct.key]}</span>
                  <span className="ac-rate-suffix">d</span>
                </div>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
                  <div className="ac-amount-bar">
                    <span>{form.checks.length} of {visibleCheckTypes.length} selected</span>
                    <span className="ac-tat-bar-item">
                      Est. TAT: <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
                    </span>
                    {isAdminUser && (
                      <span className="ac-total-amt">Total: ₹{totalAmount.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* 04 — Notes */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">04</span>
                    <h3>Internal Notes</h3>
                  </div>
                  <textarea className="ac-textarea" rows={4}
                    placeholder="Special instructions for the verifier team..."
                    value={form.notes} onChange={e => set("notes", e.target.value)} />
                </div>

                {/* Summary strip */}
                {form.billingMode && form.checks.length > 0 && (
                  <div className="ac-summary-strip"
                    style={{ borderColor: activeBilling?.color, background: `${activeBilling?.color}0d` }}>
                    <div className="ac-summary-row">
                      <span>Billing</span>
                      <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
                    </div>
                    <div className="ac-summary-row">
                      <span>Checks</span>
                      <strong>{form.checks.length} selected</strong>
                    </div>
                    <div className="ac-summary-row">
                      <span>Estimated TAT</span>
                      <strong>{overallTatDisplay ? `${overallTatDisplay} days` : "—"}</strong>
                    </div>
                    {form.billingMode === "prepaid_candidate" && (
                      <div className="ac-summary-row">
                        <span>Payment</span>
                        <strong>{form.paymentTiming === "before" ? "Before docs" : "After docs"}</strong>
                      </div>
                    )}
                    {form.billingMode === "postpaid_client" && form.invoiceCycle && (
                      <div className="ac-summary-row">
                        <span>Invoice</span>
                        <strong>{form.invoiceCycle === "monthly" ? "Monthly" : "Per Case"}</strong>
                      </div>
                    )}
                  </div>
                )}

                <button className="primary-cta ac-submit-btn"
                  onClick={handleSubmit} disabled={loading}>
                  {loading
                    ? (isEditMode ? "Saving Changes..." : "Creating Case...")
                    : (isEditMode ? "Save Changes" : "Create Case →")}
                </button>

              </div>
            </div>
          </div>
        </main>
      </section>

      {/* ── Bulk Upload Modal ────────────────────────────────────────────────── */}
      {showBulkModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
        }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "640px",
            width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Bulk Upload Cases</h3>
              <button onClick={closeBulkModal}
                style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>×</button>
            </div>

            {!bulkDone ? (
              <>
                <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "16px", marginBottom: "20px", fontSize: "13px", color: "#475569" }}>
                  <strong>CSV Format:</strong> Upload a CSV file with the following columns:<br />
                  <code style={{ fontSize: "12px", background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
                    candidate_name, candidate_email, mobile, position, checks, billing_mode, client_name
                  </code><br />
                  <span style={{ marginTop: "6px", display: "block" }}>
                    For <code>checks</code>, separate multiple checks with <code>|</code> e.g. <code>employment|education|address</code>
                  </span>
                </div>

                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleBulkFileChange}
                  style={{ marginBottom: "16px", fontSize: "13px" }} />

                {bulkErrors.length > 0 && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px",
                    padding: "12px", marginBottom: "16px", fontSize: "13px", color: "#dc2626" }}>
                    {bulkErrors.map((e, i) => <div key={i}>⚠ {e}</div>)}
                  </div>
                )}

                {bulkRows.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                      <strong>{bulkRows.length}</strong> row(s) ready to upload:
                    </p>
                    <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc" }}>
                            {["Candidate", "Email", "Checks", "Billing"].map(h => (
                              <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700,
                                borderBottom: "1px solid #e2e8f0", color: "#475569" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bulkRows.map((r, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "7px 10px", color: "#1e293b" }}>{r.candidate_name}</td>
                              <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.candidate_email}</td>
                              <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.checks?.join(", ")}</td>
                              <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.billing_mode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button className="secondary-cta" onClick={closeBulkModal}
                    style={{ padding: "10px 20px", height: "auto", borderRadius: "8px" }}>Cancel</button>
                  <button className="primary-cta"
                    disabled={bulkRows.length === 0 || bulkUploading}
                    onClick={handleBulkSubmit}
                    style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>
                    {bulkUploading ? "Uploading…" : `Upload ${bulkRows.length} Case(s)`}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: "56px", height: "56px", background: "#10b981", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: "24px", color: "#fff" }}>✓</div>
                <h4 style={{ color: "#1e293b", marginBottom: "8px" }}>Upload Complete!</h4>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                  {bulkRows.length} case(s) were uploaded successfully.
                  {bulkErrors.length > 0 && ` ${bulkErrors.length} failed.`}
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button className="secondary-cta import" onClick={closeBulkModal}
                    style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>Close</button>
                  <button className="primary-cta"
                    onClick={() => navigate(isClientUser ? "/Client?tab=all" : "/AllCases")}
                    style={{ padding: "10px 24px", height: "auto", borderRadius: "8px" }}>View All Cases</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{sharedStyles}</style>
    </>
  );
}

// ── Styles ─────────────────────────────────────────
const sharedStyles = `
  .ac-page-title { font-size: 1.25rem; font-weight: 700; color: #2b3b8c; margin: 0; }
  .ac-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 0px; }
  @media (max-width: 960px) { .ac-layout { grid-template-columns: 1fr; } }
  .ac-left, .ac-right { display: flex; flex-direction: column; gap: 20px; }
  .ac-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 22px; }
  .ac-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #f0f2f8; flex-wrap: wrap; }
  .ac-card-header h3 { font-size: 0.82rem; font-weight: 700; color: #2b3b8c; letter-spacing: 0.06em; text-transform: uppercase; margin: 0; flex: 1; }
  .ac-num { background: #2b3b8c; color: #fff; font-size: 0.68rem; font-weight: 800; width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ac-billing-hint { font-size: 0.7rem; color: #94a3b8; font-style: italic; }
  .ac-fields { display: flex; flex-direction: column; gap: 14px; }
  .ac-field { display: flex; flex-direction: column; gap: 5px; }
  .ac-label { font-size: 0.78rem; font-weight: 600; color: #475569; }
  .ac-req { color: #eb4d4b; margin-left: 2px; }
  .ac-optional { color: #94a3b8; font-weight: 400; }
  .ac-input { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
  .ac-input:focus { border-color: #2b3b8c; background: #fff; }
  .ac-input-readonly { display: flex; align-items: center; background: #eef1fb; border: 1.5px solid #c7d2fe; color: #2b3b8c; font-weight: 700; cursor: default; }
  .ac-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232b3b8c' stroke-width='2' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
  .ac-billing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
  @media (max-width: 700px) { .ac-billing-grid { grid-template-columns: 1fr; } }
  .ac-billing-tile { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #f8fafc; cursor: pointer; text-align: left; transition: all 0.18s; }
  .ac-billing-active { box-shadow: 0 0 0 2px currentColor; }
  .ac-billing-tile-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .ac-billing-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .ac-billing-label { font-size: 0.78rem; font-weight: 700; color: #334155; }
  .ac-billing-desc { font-size: 0.7rem; color: #94a3b8; margin: 0; line-height: 1.4; }
  .ac-billing-section { border-top: 1px dashed #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 14px; }
  .ac-billing-info-row { display: flex; align-items: flex-start; gap: 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; color: #0369a1; }
  .ac-billing-info-icon { font-style: normal; font-weight: 700; flex-shrink: 0; }
  .ac-billing-locked { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .ac-billing-locked-note { font-size: 0.72rem; color: #94a3b8; margin: 0; }
  .ac-timing-row { display: flex; gap: 8px; }
  .ac-timing-btn { flex: 1; padding: 9px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 0.78rem; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.15s; }
  .ac-timing-active { border-color: #0d9488; background: #f0fdfa; color: #0d9488; }
  .ac-amount-display { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px 13px; font-size: 1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
  .ac-amount-note { font-size: 0.72rem; font-weight: 400; color: #94a3b8; }
  .ac-gen-link-btn { width: 100%; padding: 10px; border: 1.5px dashed #0d9488; border-radius: 8px; background: #f0fdfa; color: #0d9488; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
  .ac-gen-link-btn:hover { background: #ccfbf1; }
  .ac-link-row { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; }
  .ac-link-url { font-size: 0.72rem; color: #0d9488; flex: 1; word-break: break-all; }
  .ac-copy-btn { background: #0d9488; color: #fff; border: none; border-radius: 6px; padding: 5px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; white-space: nowrap; }
  .ac-link-send-row { display: flex; gap: 8px; margin-top: 8px; }
  .ac-send-btn { flex: 1; padding: 7px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #f8fafc; font-size: 0.72rem; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.15s; }
  .ac-send-sms:hover { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }
  .ac-send-email:hover { border-color: #2b3b8c; color: #2b3b8c; background: #eef1fb; }
  .ac-send-wa:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
  .ac-check-ctrl { display: flex; gap: 6px; align-items: center; font-size: 0.75rem; color: #94a3b8; }
  .ac-link-btn { background: none; border: none; color: #2b3b8c; font-size: 0.75rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; }
  .ac-checks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .ac-check-tile { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #f8fafc; cursor: pointer; transition: all 0.15s; gap: 8px; }
  .ac-check-tile:hover { border-color: #2b3b8c; }
  .ac-check-active { border-color: #2b3b8c; background: #eef1fb; }
  .ac-check-tile-top { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; font-weight: 600; color: #334155; }
  .ac-check-active .ac-check-tile-top { color: #2b3b8c; }
  .ac-check-dot { width: 8px; height: 8px; border-radius: 50%; border: 2px solid #cbd5e1; flex-shrink: 0; }
  .ac-check-active .ac-check-dot { border-color: #2b3b8c; background: #2b3b8c; }
  .ac-check-rate { font-size: 0.68rem; color: #94a3b8; font-weight: 600; text-align: right; white-space: nowrap; }
  .ac-check-active .ac-check-rate { color: #2b3b8c; }
  .ac-check-side { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .ac-check-rate-edit { display: flex; align-items: center; gap: 2px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 2px 6px; flex-shrink: 0; }
  .ac-check-rate-edit:focus-within { border-color: #2b3b8c; }
  .ac-rate-prefix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
  .ac-rate-suffix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
  .ac-rate-input { width: 52px; border: none; outline: none; background: transparent; font-size: 0.72rem; font-weight: 700; color: #1e293b; padding: 2px 0; }
  .ac-tat-input { width: 34px; }
  .ac-rate-input::-webkit-inner-spin-button, .ac-rate-input::-webkit-outer-spin-button { margin: 0; }
  .ac-amount-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: #94a3b8; flex-wrap: wrap; gap: 8px; }
  .ac-tat-bar-item strong { color: #0d9488; font-weight: 700; }
  .ac-total-amt { font-weight: 700; color: #2b3b8c; font-size: 0.85rem; }
  .ac-textarea { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box; }
  .ac-textarea:focus { border-color: #2b3b8c; background: #fff; }
  .ac-summary-strip { border: 1.5px solid; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
  .ac-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; }
  .ac-summary-row strong { font-weight: 700; color: #1e293b; }
  .ac-submit-btn { width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 700; }
  .ac-success-wrap { display: flex; align-items: center; justify-content: center; min-height: 70vh; }
  .ac-success-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 16px; padding: 48px 40px; text-align: center; max-width: 500px; width: 100%; }
  .ac-success-icon { width: 64px; height: 64px; background: #10b981; color: #fff; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .ac-success-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
  .ac-success-id { font-size: 1.1rem; font-weight: 700; color: #2b3b8c; background: #eef1fb; display: inline-block; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px!important; }
  .ac-success-meta { background: #f8fafc; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
  .ac-success-meta-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: #64748b; }
  .ac-success-checks { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 24px; }
  .ac-check-badge { background: #eef1fb; color: #2b3b8c; font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
  .ac-success-link-box { background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 12px; margin-bottom: 20px; }
  .ac-success-link-label { font-size: 0.72rem; color: #64748b; margin: 0 0 4px; font-weight: 600; }
  .ac-success-link-url { font-size: 0.78rem; color: #0d9488; margin: 0; word-break: break-all; }
  .ac-success-portal-box { background: #eef3ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; text-align: left; }
  .ac-success-portal-label { font-size: 0.72rem; color: #2b3b8c; margin: 0 0 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
  .ac-success-portal-hint { font-size: 0.72rem; color: #64748b; margin: 8px 0 0; }
  .ac-success-actions { display: flex; gap: 12px; justify-content: center; }
`;
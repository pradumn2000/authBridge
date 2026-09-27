

// // // // // import { useState, useEffect, useRef } from "react";
// // // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // // import Sidebar from "./Sidebar";
// // // // // import Header from "./Header";
// // // // // import { API_URL } from "../src/config";

// // // // // // ── Check tab definitions ──────────────────────────────────────────────────────
// // // // // const CHECK_TABS = [
// // // // //   { key: "employment", label: "Employment" },
// // // // //   { key: "education",  label: "Education"  },
// // // // //   { key: "address",    label: "Address"    },
// // // // //   { key: "database",   label: "Database"   },
// // // // //   { key: "criminal",   label: "Criminal"   },
// // // // //   { key: "drug",       label: "Drug Test"  },
// // // // //   { key: "court",      label: "Courtroom"  },
// // // // // ];

// // // // // // ── Which API check key maps to which verifier role ───────────────────────────
// // // // // const ROLE_CHECK_MAP = {
// // // // //   employment_verifier:  "employment",
// // // // //   education_verifier:   "education",
// // // // //   address_verifier:     "address",
// // // // //   database_verifier:    "database",
// // // // //   criminal_verifier:    "criminal",
// // // // //   drug_test_verifier:   "drug",
// // // // //   courtroom_verifier:   "court",
// // // // // };

// // // // // // ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
// // // // // const NORMALISE_CHECK = {
// // // // //   emp:        "employment",
// // // // //   employment: "employment",
// // // // //   edu:        "education",
// // // // //   education:  "education",
// // // // //   addr:       "address",
// // // // //   address:    "address",
// // // // //   db:         "database",
// // // // //   database:   "database",
// // // // //   criminal:   "criminal",
// // // // //   cri:        "criminal",
// // // // //   drug:       "drug",
// // // // //   drug_test:  "drug",
// // // // //   court:      "court",
// // // // //   courtroom:  "court",
// // // // // };

// // // // // // ── Field definitions per check type ──────────────────────────────────────────
// // // // // const CHECK_FIELDS = {
// // // // //   employment: [
// // // // //     { key: "company_name",       label: "Company Name",         type: "text" },
// // // // //     { key: "designation",        label: "Designation",          type: "text" },
// // // // //     { key: "employee_id",        label: "Employee ID",          type: "text" },
// // // // //     { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
// // // // //     { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
// // // // //     { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
// // // // //     { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
// // // // //     { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
// // // // //     { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
// // // // //     { key: "hr_phone",           label: "HR Phone",             type: "text" },
// // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   education: [
// // // // //     { key: "institution_name",   label: "Institution Name",     type: "text" },
// // // // //     { key: "degree",             label: "Degree / Certificate", type: "text" },
// // // // //     { key: "course",             label: "Course / Specialization", type: "text" },
// // // // //     { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
// // // // //     { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
// // // // //     { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
// // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
// // // // //     { key: "result_link",        label: "Result Link (URL)",    type: "text" },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   address: [
// // // // //     { key: "address_line",       label: "Address",              type: "text" },
// // // // //     { key: "city",               label: "City",                 type: "text" },
// // // // //     { key: "state",              label: "State",                type: "text" },
// // // // //     { key: "pincode",            label: "Pincode",               type: "text" },
// // // // //     { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
// // // // //     { key: "years_at_address",   label: "Years at Address",     type: "text" },
// // // // //     { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
// // // // //     { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
// // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   database: [
// // // // //     { key: "db_checked",         label: "Databases Checked",    type: "text" },
// // // // //     { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
// // // // //     { key: "match_details",      label: "Match Details",        type: "textarea" },
// // // // //     { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // // //     { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   criminal: [
// // // // //     { key: "court_checked",      label: "Courts Checked",       type: "text" },
// // // // //     { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
// // // // //     { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
// // // // //     { key: "state_checked",      label: "State",                type: "text" },
// // // // //     { key: "district_checked",   label: "District",             type: "text" },
// // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   drug: [
// // // // //     { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
// // // // //     { key: "lab_name",           label: "Lab Name",             type: "text" },
// // // // //     { key: "test_date",          label: "Test Date",            type: "date" },
// // // // //     { key: "substances_tested",  label: "Substances Tested",    type: "text" },
// // // // //     { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
// // // // //     { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // //   court: [
// // // // //     { key: "court_name",         label: "Court Name",           type: "text" },
// // // // //     { key: "case_number",        label: "Case Number",          type: "text" },
// // // // //     { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
// // // // //     { key: "filing_date",        label: "Filing Date",          type: "date" },
// // // // //     { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
// // // // //     { key: "next_date",          label: "Next Hearing Date",    type: "date" },
// // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // //   ],
// // // // // };

// // // // // const VERIFICATION_RATES = {
// // // // //   employment: 350, education: 280, address: 180,
// // // // //   database: 120,   criminal: 220,  drug: 400, court: 160,
// // // // // };

// // // // // const PRIORITY_META = {
// // // // //   HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
// // // // //   MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // // //   MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // // //   LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
// // // // //   normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
// // // // // };

// // // // // const OUTCOME_OPTS = [
// // // // //   { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
// // // // //   { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
// // // // //   { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
// // // // // ];

// // // // // const STATUS_META = {
// // // // //   "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
// // // // //   "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
// // // // //   "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
// // // // //   "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
// // // // //   "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
// // // // // };

// // // // // // ── Helpers ────────────────────────────────────────────────────────────────────
// // // // // function getUser() {
// // // // //   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// // // // // }

// // // // // function getToken() { return localStorage.getItem("token"); }

// // // // // function normChecks(raw) {
// // // // //   if (!raw) return [];
// // // // //   const arr = Array.isArray(raw)
// // // // //     ? raw
// // // // //     : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
// // // // //   return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
// // // // // }

// // // // // function calcTAT(createdAt) {
// // // // //   if (!createdAt) return "—";
// // // // //   const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
// // // // //   return days === 0 ? "Today" : `${days}d`;
// // // // // }

// // // // // function normPriority(p) {
// // // // //   if (!p) return "LOW";
// // // // //   return String(p).toUpperCase();
// // // // // }

// // // // // // ── Shared input styles ────────────────────────────────────────────────────────
// // // // // const labelSt = {
// // // // //   display: "block", fontSize: "11px", fontWeight: 700,
// // // // //   color: "#475569", marginBottom: "5px",
// // // // //   textTransform: "uppercase", letterSpacing: "0.4px",
// // // // // };
// // // // // const inputSt = {
// // // // //   width: "100%", padding: "9px 12px",
// // // // //   border: "1.5px solid #e2e8f0", borderRadius: "8px",
// // // // //   fontSize: "13px", color: "#1e293b", background: "#f8fafc",
// // // // //   outline: "none", fontFamily: "inherit", boxSizing: "border-box",
// // // // // };
// // // // // const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// // // // // // ── FormField sub-component ────────────────────────────────────────────────────
// // // // // function FormField({ f, value, onChange }) {
// // // // //   if (f.type === "textarea") return (
// // // // //     <div style={{ gridColumn: "1 / -1" }}>
// // // // //       <label style={labelSt}>{f.label}</label>
// // // // //       <textarea
// // // // //         rows={3} value={value} onChange={e => onChange(e.target.value)}
// // // // //         placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // //   if (f.type === "select") return (
// // // // //     <div>
// // // // //       <label style={labelSt}>{f.label}</label>
// // // // //       <select value={value} onChange={e => onChange(e.target.value)}
// // // // //         style={{ ...inputSt, cursor: "pointer" }}>
// // // // //         <option value="">— Select —</option>
// // // // //         {f.options.map(o => <option key={o} value={o}>{o}</option>)}
// // // // //       </select>
// // // // //     </div>
// // // // //   );
// // // // //   return (
// // // // //     <div>
// // // // //       <label style={labelSt}>{f.label}</label>
// // // // //       <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
// // // // //         placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
// // // // //         style={inputSt} />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Main Component ─────────────────────────────────────────────────────────────
// // // // // export default function Verifyer() {
// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();
// // // // //   const user     = getUser();
// // // // //   const token    = getToken();

// // // // //   // Role resolution
// // // // //   const role           = user.role || "";
// // // // //   const isAdmin        = role === "admin";
// // // // //   const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

// // // // //   // ── Sidebar view: "active" | "completed"
// // // // //   const sidebarView = new URLSearchParams(location.search).get("view") || "active";

// // // // //   // ── State ─────────────────────────────────────────────────────────────────
// // // // //   const [cases,        setCases]        = useState([]);
// // // // //   const [loading,      setLoading]      = useState(true);
// // // // //   const [selectedCase, setSelectedCase] = useState(null);
// // // // //   const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
// // // // //   const [search,       setSearch]       = useState("");

// // // // //   // Form
// // // // //   const [form,       setForm]       = useState({});
// // // // //   const [outcome,    setOutcome]    = useState("");
// // // // //   const [saving,     setSaving]     = useState(false);
// // // // //   const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

// // // // //   // Comments
// // // // //   const [comments,      setComments]      = useState([]);
// // // // //   const [commentInput,  setCommentInput]  = useState("");
// // // // //   const commentsEndRef = useRef(null);

// // // // //   // ── Fetch real cases from API ──────────────────────────────────────────────
// // // // //   const fetchCases = () => {
// // // // //     setLoading(true);
// // // // //     fetch(`${API_URL}/api/cases`, {
// // // // //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// // // // //     })
// // // // //       .then(r => r.json())
// // // // //       .then(data => {
// // // // //         const raw = data.cases || [];
// // // // //         const normalised = raw.map(c => ({
// // // // //           ...c,
// // // // //           checks_raw:  c.checks,
// // // // //           checks_norm: normChecks(c.checks),
// // // // //           candidate:   c.candidate || c.candidate_name || "—",
// // // // //           priority:    normPriority(c.priority),
// // // // //           tat_display: calcTAT(c.created_at),
// // // // //         }));
// // // // //         setCases(normalised);
// // // // //         if (normalised.length > 0 && !selectedCase) {
// // // // //           const first = sidebarView === "completed"
// // // // //             ? normalised.find(c => c.status === "completed")
// // // // //             : normalised.find(c => c.status !== "completed");
// // // // //           setSelectedCase(first || normalised[0]);
// // // // //         }
// // // // //       })
// // // // //       .catch(console.error)
// // // // //       .finally(() => setLoading(false));
// // // // //   };

// // // // //   useEffect(() => { fetchCases(); }, []);

// // // // //   // Auto-scroll comments
// // // // //   useEffect(() => {
// // // // //     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // //   }, [comments]);

// // // // //   // Reset form when case / check changes
// // // // //   useEffect(() => {
// // // // //     setForm({});
// // // // //     setOutcome("");
// // // // //     setSaveMsg({ text: "", type: "" });
// // // // //   }, [selectedCase?.case_id, activeCheck]);

// // // // //   // Jump active check to first valid tab on case selection
// // // // //   useEffect(() => {
// // // // //     if (!selectedCase) return;
// // // // //     const validChecks = selectedCase.checks_norm;
// // // // //     if (validChecks.length === 0) return;
// // // // //     if (assignedCheck && validChecks.includes(assignedCheck)) {
// // // // //       setActiveCheck(assignedCheck);
// // // // //     } else if (!validChecks.includes(activeCheck)) {
// // // // //       setActiveCheck(validChecks[0]);
// // // // //     }
// // // // //   }, [selectedCase?.case_id]);

// // // // //   // ── Filtered queue lists ───────────────────────────────────────────────────
// // // // //   const activeCases    = cases.filter(c => c.status !== "completed");
// // // // //   const completedCases = cases.filter(c => c.status === "completed");

// // // // //   const filterBySearch = (list) => {
// // // // //     if (!search) return list;
// // // // //     const q = search.toLowerCase();
// // // // //     return list.filter(c =>
// // // // //       (c.case_id || "").toLowerCase().includes(q) ||
// // // // //       (c.candidate || "").toLowerCase().includes(q) ||
// // // // //       (c.client || c.client_name || "").toLowerCase().includes(q)
// // // // //     );
// // // // //   };

// // // // //   const queueList = filterBySearch(sidebarView === "completed" ? completedCases : activeCases);

// // // // //   // ── Tab accessibility ──────────────────────────────────────────────────────
// // // // //   // A tab is accessible if:
// // // // //   //   1. The case has that check type, AND
// // // // //   //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
// // // // //   const canAccessTab = (checkKey) => {
// // // // //     if (!selectedCase) return false;
// // // // //     const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
// // // // //     if (!caseHasCheck) return false;
// // // // //     if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
// // // // //     return checkKey === assignedCheck;                     // specialist verifier
// // // // //   };

// // // // //   // ── Select a case ──────────────────────────────────────────────────────────
// // // // //   const selectCase = (c) => {
// // // // //     setSelectedCase(c);
// // // // //     setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
// // // // //   };

// // // // //   // ── Save result ────────────────────────────────────────────────────────────
// // // // //   const handleSave = async (isDraft) => {
// // // // //     if (!outcome && !isDraft) {
// // // // //       setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
// // // // //       return;
// // // // //     }
// // // // //     setSaving(true);
// // // // //     setSaveMsg({ text: "", type: "" });
// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           "Content-Type": "application/json",
// // // // //           Accept: "application/json",
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           check_type: activeCheck,
// // // // //           outcome:    outcome || "unable",
// // // // //           form_data:  form,
// // // // //           is_draft:   isDraft,
// // // // //         }),
// // // // //       });
// // // // //       if (!res.ok) throw new Error("Server error");
// // // // //       setSaveMsg({
// // // // //         text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
// // // // //         type: "success",
// // // // //       });
// // // // //       fetchCases();
// // // // //     } catch {
// // // // //       setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
// // // // //     } finally {
// // // // //       setSaving(false);
// // // // //     }
// // // // //   };

// // // // //   // ── Send comment ───────────────────────────────────────────────────────────
// // // // //   const sendComment = () => {
// // // // //     if (!commentInput.trim()) return;
// // // // //     // TODO: POST /api/cases/{id}/comments
// // // // //     setComments(p => [...p, {
// // // // //       id:     Date.now(),
// // // // //       author: user.name || "Verifier",
// // // // //       avatar: (user.name || "V").charAt(0).toUpperCase(),
// // // // //       time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
// // // // //       text:   commentInput.trim(),
// // // // //     }]);
// // // // //     setCommentInput("");
// // // // //   };

// // // // //   // ── Charges for selected case ──────────────────────────────────────────────
// // // // //   const caseCharges = (selectedCase?.checks_norm || []).map(ch => ({
// // // // //     label:  CHECK_TABS.find(t => t.key === ch)?.label || ch,
// // // // //     amount: VERIFICATION_RATES[ch] || 0,
// // // // //     key:    ch,
// // // // //   }));
// // // // //   const totalCharge = caseCharges.reduce((s, c) => s + c.amount, 0);

// // // // //   // ── Case list item ─────────────────────────────────────────────────────────
// // // // //   const QueueItem = ({ c }) => {
// // // // //     const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
// // // // //     const sm       = STATUS_META[c.status] || STATUS_META["pending"];
// // // // //     const isActive = selectedCase?.case_id === c.case_id;
// // // // //     const checkLabels = c.checks_norm.map(k =>
// // // // //       CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
// // // // //     );

// // // // //     return (
// // // // //       <tr
// // // // //         className="boder-tbl active"
// // // // //         onClick={() => selectCase(c)}
// // // // //         style={{
// // // // //           cursor: "pointer",
// // // // //           background: isActive ? "#eef3ff" : undefined,
// // // // //           borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
// // // // //         }}
// // // // //       >
// // // // //         {/* Case ID + checks */}
// // // // //         <td>
// // // // //           <div className="criminal-case">
// // // // //             <p>
// // // // //               <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
// // // // //               <br />
// // // // //               <span style={{ fontSize: "11px", color: "#94a3b8" }}>
// // // // //                 {checkLabels.join(" · ")}
// // // // //               </span>
// // // // //             </p>
// // // // //           </div>
// // // // //         </td>

// // // // //         {/* Candidate name */}
// // // // //         <td>
// // // // //           <div className="client-names">{c.candidate}</div>
// // // // //         </td>

// // // // //         {/* Progress + TAT */}
// // // // //         <td>
// // // // //           <div className="custom-progress">
// // // // //             <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
// // // // //           </div>
// // // // //           <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
// // // // //         </td>

// // // // //         {/* Priority dot */}
// // // // //         <td>
// // // // //           <div className="parent-client-boxes">
// // // // //             <span
// // // // //               className="client-cases-box"
// // // // //               style={{ background: pm.dot }}
// // // // //               title={c.priority}
// // // // //             />
// // // // //           </div>
// // // // //         </td>
// // // // //       </tr>
// // // // //     );
// // // // //   };

// // // // //   // ── Middle panel: full detail of selected case ──────────────────────────────
// // // // //   const DetailPanel = () => {
// // // // //     if (!selectedCase) return (
// // // // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
// // // // //         <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
// // // // //       </div>
// // // // //     );

// // // // //     const fields = CHECK_FIELDS[activeCheck] || [];
// // // // //     const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
// // // // //     const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

// // // // //     return (
// // // // //       <>
// // // // //         {/* Header */}
// // // // //         <div style={{
// // // // //           background: "#27348B", color: "#fff", padding: "14px 18px",
// // // // //           fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
// // // // //           display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // //         }}>
// // // // //           <span>
// // // // //             {selectedCase.case_id} — {selectedCase.candidate}
// // // // //           </span>
// // // // //           <span style={{
// // // // //             background: pm.bg, color: pm.color, fontSize: "11px",
// // // // //             fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
// // // // //           }}>
// // // // //             {selectedCase.priority}
// // // // //           </span>
// // // // //         </div>

// // // // //         {/* Check type tabs — only show checks present in this case */}
// // // // //         <div style={{
// // // // //           display: "flex", background: "#fff",
// // // // //           borderBottom: "1px solid #e2e8f0", overflowX: "auto",
// // // // //         }}>
// // // // //           {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
// // // // //             const accessible = canAccessTab(t.key);
// // // // //             const isActive   = activeCheck === t.key;
// // // // //             return (
// // // // //               <button
// // // // //                 key={t.key}
// // // // //                 onClick={() => accessible && setActiveCheck(t.key)}
// // // // //                 title={!accessible ? "Your role cannot access this check type" : ""}
// // // // //                 style={{
// // // // //                   padding: "11px 18px", border: "none", whiteSpace: "nowrap",
// // // // //                   borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
// // // // //                   borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
// // // // //                   background: isActive ? "#f0f4ff" : "#fff",
// // // // //                   color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
// // // // //                   fontWeight: isActive ? 700 : 400,
// // // // //                   fontSize: "13px",
// // // // //                   cursor: accessible ? "pointer" : "not-allowed",
// // // // //                   opacity: accessible ? 1 : 0.45,
// // // // //                   transition: "all 0.15s",
// // // // //                 }}
// // // // //               >
// // // // //                 {t.label}
// // // // //               </button>
// // // // //             );
// // // // //           })}
// // // // //         </div>

// // // // //         {/* Scrollable form body */}
// // // // //         <div style={{
// // // // //           border: "1px solid #e2e8f0", borderTop: "none",
// // // // //           borderRadius: "0 0 6px 6px", background: "#fff",
// // // // //           maxHeight: "520px", overflowY: "auto", padding: "16px",
// // // // //         }}>

// // // // //           {/* Case summary strip */}
// // // // //           <div style={{
// // // // //             display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
// // // // //             gap: "10px", marginBottom: "18px",
// // // // //           }}>
// // // // //             {[
// // // // //               { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
// // // // //               { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
// // // // //               { label: "TAT",      value: selectedCase.tat_display },
// // // // //               { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
// // // // //             ].map(r => (
// // // // //               <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
// // // // //                 <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
// // // // //                 <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Outcome toggle */}
// // // // //           <div style={{ marginBottom: "16px" }}>
// // // // //             <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
// // // // //               Verification Outcome
// // // // //             </p>
// // // // //             <div style={{ display: "flex", gap: "8px" }}>
// // // // //               {OUTCOME_OPTS.map(o => (
// // // // //                 <button
// // // // //                   key={o.key}
// // // // //                   onClick={() => setOutcome(o.key)}
// // // // //                   style={{
// // // // //                     flex: 1, padding: "10px 8px", cursor: "pointer",
// // // // //                     border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
// // // // //                     borderRadius: "8px",
// // // // //                     background: outcome === o.key ? o.bg : "#f8fafc",
// // // // //                     color: outcome === o.key ? o.color : "#94a3b8",
// // // // //                     fontWeight: outcome === o.key ? 700 : 500,
// // // // //                     fontSize: "12px",
// // // // //                     transition: "all 0.15s",
// // // // //                   }}
// // // // //                 >
// // // // //                   {o.label}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Dynamic fields grid */}
// // // // //           {!canAccessTab(activeCheck) ? (
// // // // //             <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
// // // // //               Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
// // // // //               {fields.map(f => (
// // // // //                 <FormField
// // // // //                   key={f.key} f={f}
// // // // //                   value={form[f.key] || ""}
// // // // //                   onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
// // // // //                 />
// // // // //               ))}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Save message */}
// // // // //           {saveMsg.text && (
// // // // //             <div style={{
// // // // //               marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
// // // // //               background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
// // // // //               color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
// // // // //               fontSize: "13px", fontWeight: 600,
// // // // //             }}>
// // // // //               {saveMsg.text}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Action buttons */}
// // // // //         {canAccessTab(activeCheck) && (
// // // // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
// // // // //             <button
// // // // //               onClick={() => handleSave(true)}
// // // // //               disabled={saving}
// // // // //               style={{
// // // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // // //                 padding: "13px", background: "#27348B", color: "#fff", border: "none",
// // // // //                 borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
// // // // //               }}
// // // // //             >
// // // // //               💾 Save Draft
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => handleSave(false)}
// // // // //               disabled={saving || !outcome}
// // // // //               style={{
// // // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // // //                 padding: "13px",
// // // // //                 background: saving || !outcome ? "#94a3b8" : "#10b981",
// // // // //                 color: "#fff", border: "none", borderRadius: "6px",
// // // // //                 fontWeight: 700, fontSize: "13px",
// // // // //                 cursor: saving || !outcome ? "not-allowed" : "pointer",
// // // // //               }}
// // // // //             >
// // // // //               {saving ? "Saving…" : "✔ Save & Mark Done"}
// // // // //             </button>
// // // // //           </div>
// // // // //         )}
// // // // //       </>
// // // // //     );
// // // // //   };

// // // // //   // ── Right panel: Charges + Comments ─────────────────────────────────────────
// // // // //   const RightPanel = () => (
// // // // //     <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

// // // // //       {/* Verification Charges */}
// // // // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
// // // // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // // // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // // // //             VERIFICATION CHARGES
// // // // //           </h3>
// // // // //         </div>
// // // // //         {selectedCase ? (
// // // // //           <>
// // // // //             {caseCharges.map((c, i) => (
// // // // //               <div key={c.key} style={{
// // // // //                 display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // //                 padding: "12px 16px",
// // // // //                 background: i % 2 === 0 ? "#f8fafc" : "#fff",
// // // // //                 borderBottom: "1px solid #f1f5f9",
// // // // //                 fontSize: "13px",
// // // // //               }}>
// // // // //                 <span style={{ color: "#475569" }}>{c.label} Check</span>
// // // // //                 <span style={{ fontWeight: 700, color: "#1e293b" }}>₹{c.amount}</span>
// // // // //               </div>
// // // // //             ))}
// // // // //             <div style={{
// // // // //               display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // //               padding: "14px 16px", background: "#27348B",
// // // // //             }}>
// // // // //               <span style={{ color: "#fff", fontWeight: 700, fontSize: "13px" }}>TOTAL</span>
// // // // //               <span style={{ color: "#fff", fontWeight: 800, fontSize: "15px" }}>₹{totalCharge}</span>
// // // // //             </div>
// // // // //           </>
// // // // //         ) : (
// // // // //           <p style={{ padding: "16px", color: "#94a3b8", fontSize: "13px" }}>Select a case to see charges.</p>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Comments */}
// // // // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1 }}>
// // // // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // // // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // // // //             COMMENTS & NOTES
// // // // //           </h3>
// // // // //         </div>
// // // // //         <div style={{ maxHeight: "260px", overflowY: "auto", padding: "12px 14px" }}>
// // // // //           {comments.length === 0 ? (
// // // // //             <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
// // // // //               No comments yet.
// // // // //             </p>
// // // // //           ) : (
// // // // //             comments.map((c, i) => (
// // // // //               <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
// // // // //                 <div style={{
// // // // //                   width: "30px", height: "30px", borderRadius: "50%",
// // // // //                   background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
// // // // //                   color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
// // // // //                   fontSize: "13px", fontWeight: 700, flexShrink: 0,
// // // // //                 }}>
// // // // //                   {c.avatar}
// // // // //                 </div>
// // // // //                 <div style={{ flex: 1 }}>
// // // // //                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
// // // // //                     <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
// // // // //                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
// // // // //                   </div>
// // // // //                   <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))
// // // // //           )}
// // // // //           <div ref={commentsEndRef} />
// // // // //         </div>
// // // // //         <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
// // // // //           <input
// // // // //             type="text"
// // // // //             placeholder="Add a comment…"
// // // // //             value={commentInput}
// // // // //             onChange={e => setCommentInput(e.target.value)}
// // // // //             onKeyDown={e => e.key === "Enter" && sendComment()}
// // // // //             style={{
// // // // //               flex: 1, border: "none", padding: "11px 14px",
// // // // //               fontSize: "13px", outline: "none", background: "#fff",
// // // // //             }}
// // // // //           />
// // // // //           <button onClick={sendComment} style={{
// // // // //             background: "#27348B", border: "none", padding: "0 16px",
// // // // //             cursor: "pointer", color: "#fff",
// // // // //           }}>
// // // // //             <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // // // //               <line x1="22" y1="2" x2="11" y2="13" />
// // // // //               <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // // // //             </svg>
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   // ── Render ─────────────────────────────────────────────────────────────────
// // // // //   return (
// // // // //     <>
// // // // //       <Sidebar />
// // // // //       <section id="content">
// // // // //         <Header />
// // // // //         <main>
// // // // //           <div className="dash-wrper">

// // // // //             {/* Page header */}
// // // // //             <div className="dash-upper-head">
// // // // //               <div className="left">
// // // // //                 <div className="dash-title-flex">
// // // // //                   <h3 className="dash-title-text">Verifier Workspace</h3>
// // // // //                   <span style={{
// // // // //                     fontSize: "12px", color: "#64748b",
// // // // //                     background: "#eef3ff", padding: "3px 10px", borderRadius: "20px",
// // // // //                   }}>
// // // // //                     {user.name || "Verifier"} — {role}
// // // // //                   </span>
// // // // //                   {assignedCheck && (
// // // // //                     <span style={{
// // // // //                       fontSize: "11px", color: "#fff",
// // // // //                       background: "#27348B", padding: "3px 10px", borderRadius: "20px",
// // // // //                     }}>
// // // // //                       Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="right">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   className="dash-search-input"
// // // // //                   placeholder="Search case ID or candidate…"
// // // // //                   value={search}
// // // // //                   onChange={e => setSearch(e.target.value)}
// // // // //                 />
// // // // //                 {search && (
// // // // //                   <button onClick={() => setSearch("")}
// // // // //                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
// // // // //                     ×
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* View toggle: Active / Completed */}
// // // // //             <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
// // // // //               <button
// // // // //                 className={`tab-cta ${sidebarView === "active" ? "active" : ""}`}
// // // // //                 onClick={() => navigate("/Verifyer?view=active", { replace: true })}
// // // // //               >
// // // // //                 Active Cases
// // // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // // //                   {activeCases.length}
// // // // //                 </span>
// // // // //               </button>
// // // // //               <button
// // // // //                 className={`tab-cta ${sidebarView === "completed" ? "active" : ""}`}
// // // // //                 onClick={() => navigate("/Verifyer?view=completed", { replace: true })}
// // // // //               >
// // // // //                 Completed
// // // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // // //                   {completedCases.length}
// // // // //                 </span>
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Three-column layout: Queue | Form | Charges+Comments */}
// // // // //             <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

// // // // //               {/* ── LEFT: Case queue ── */}
// // // // //               <div className="down-table" style={{ margin: 0 }}>
// // // // //                 <div className="client-portal-cases">
// // // // //                   <h3>
// // // // //                     {sidebarView === "completed" ? "COMPLETED" : "ACTIVE"} ({queueList.length})
// // // // //                   </h3>
// // // // //                 </div>

// // // // //                 {loading ? (
// // // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
// // // // //                 ) : queueList.length === 0 ? (
// // // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
// // // // //                     No {sidebarView} cases found.
// // // // //                   </p>
// // // // //                 ) : (
// // // // //                   <table>
// // // // //                     <tbody>
// // // // //                       {queueList.map(c => <QueueItem key={c.case_id} c={c} />)}
// // // // //                     </tbody>
// // // // //                   </table>
// // // // //                 )}
// // // // //               </div>

// // // // //               {/* ── MIDDLE: Detail + form ── */}
// // // // //               <div className="second-card">
// // // // //                 <DetailPanel />
// // // // //               </div>

// // // // //               {/* ── RIGHT: Charges + Comments ── */}
// // // // //               <div className="thrid-card">
// // // // //                 <RightPanel />
// // // // //               </div>

// // // // //             </div>
// // // // //           </div>
// // // // //         </main>
// // // // //       </section>
// // // // //     </>
// // // // //   );
// // // // // }
// // // // // // import { useState, useEffect, useRef } from "react";
// // // // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // // // import Sidebar from "./Sidebar";
// // // // // // import Header from "./Header";
// // // // // // import { API_URL } from "../src/config";

// // // // // // // ── Check tab definitions ──────────────────────────────────────────────────────
// // // // // // const CHECK_TABS = [
// // // // // //   { key: "employment", label: "Employment" },
// // // // // //   { key: "education",  label: "Education"  },
// // // // // //   { key: "address",    label: "Address"    },
// // // // // //   { key: "database",   label: "Database"   },
// // // // // //   { key: "criminal",   label: "Criminal"   },
// // // // // //   { key: "drug",       label: "Drug Test"  },
// // // // // //   { key: "court",      label: "Courtroom"  },
// // // // // // ];

// // // // // // // ── Which API check key maps to which verifier role ───────────────────────────
// // // // // // const ROLE_CHECK_MAP = {
// // // // // //   employment_verifier:  "employment",
// // // // // //   education_verifier:   "education",
// // // // // //   address_verifier:     "address",
// // // // // //   database_verifier:    "database",
// // // // // //   criminal_verifier:    "criminal",
// // // // // //   drug_test_verifier:   "drug",
// // // // // //   courtroom_verifier:   "court",
// // // // // // };

// // // // // // // ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
// // // // // // const NORMALISE_CHECK = {
// // // // // //   emp:        "employment",
// // // // // //   employment: "employment",
// // // // // //   edu:        "education",
// // // // // //   education:  "education",
// // // // // //   addr:       "address",
// // // // // //   address:    "address",
// // // // // //   db:         "database",
// // // // // //   database:   "database",
// // // // // //   criminal:   "criminal",
// // // // // //   cri:        "criminal",
// // // // // //   drug:       "drug",
// // // // // //   drug_test:  "drug",
// // // // // //   court:      "court",
// // // // // //   courtroom:  "court",
// // // // // // };

// // // // // // // ── Field definitions per check type ──────────────────────────────────────────
// // // // // // const CHECK_FIELDS = {
// // // // // //   employment: [
// // // // // //     { key: "company_name",       label: "Company Name",         type: "text" },
// // // // // //     { key: "designation",        label: "Designation",          type: "text" },
// // // // // //     { key: "employee_id",        label: "Employee ID",          type: "text" },
// // // // // //     { key: "employment_type",    label: "Employment Type",      type: "select", options: ["Permanent", "FTE", "Contractual"] },
// // // // // //     { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
// // // // // //     { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
// // // // // //     { key: "epfo_number",        label: "EPFO Number",          type: "text" },
// // // // // //     { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
// // // // // //     { key: "company_country",    label: "Company Country",      type: "text" },
// // // // // //     { key: "company_state",      label: "Company State",        type: "text" },
// // // // // //     { key: "company_pincode",    label: "Company Pincode",      type: "text" },
// // // // // //     { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
// // // // // //     { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
// // // // // //     { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
// // // // // //     { key: "hr_phone",           label: "HR Phone",             type: "text" },
// // // // // //     { key: "document_type",      label: "Document Upload Type", type: "select", options: ["Relieving Letter", "Experience Slip", "Salary Slip", "ARN Letter", "Aadhar Card", "Voter ID", "PAN Card"] },
// // // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   education: [
// // // // // //     { key: "education_scope",    label: "Education Scope",      type: "radio", options: ["National", "International"] },
// // // // // //     { key: "qualification",      label: "Qualification",        type: "select", options: ["UG", "PG", "Secondary Education", "Senior Secondary", "Certification", "Diploma", "ITI"] },
// // // // // //     { key: "institution_name",   label: "Institute / University Name", type: "text" },
// // // // // //     { key: "degree",             label: "Degree / Certificate", type: "text" },
// // // // // //     { key: "course",             label: "Course / Specialization", type: "text" },
// // // // // //     { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
// // // // // //     { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
// // // // // //     { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
// // // // // //     { key: "mode_of_study",      label: "Mode of Study",        type: "select", options: ["Full Time", "Part Time", "Distance / Correspondence", "Online"] },
// // // // // //     { key: "document_type",      label: "Document Upload Type", type: "select", options: ["Marksheet", "Degree Certificate", "Provisional Certificate", "Consolidated Marksheet"] },
// // // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
// // // // // //     { key: "result_link",        label: "Result Link (URL)",    type: "text" },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   address: [
// // // // // //     { key: "address_line",       label: "Address",              type: "text" },
// // // // // //     { key: "city",               label: "City",                 type: "text" },
// // // // // //     { key: "state",              label: "State",                type: "text" },
// // // // // //     { key: "pincode",            label: "Pincode",               type: "text" },
// // // // // //     { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
// // // // // //     { key: "years_at_address",   label: "Years at Address",     type: "text" },
// // // // // //     { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
// // // // // //     { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
// // // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   database: [
// // // // // //     { key: "db_checked",         label: "Databases Checked",    type: "text" },
// // // // // //     { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
// // // // // //     { key: "match_details",      label: "Match Details",        type: "textarea" },
// // // // // //     { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // // // //     { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   criminal: [
// // // // // //     { key: "court_checked",      label: "Courts Checked",       type: "text" },
// // // // // //     { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
// // // // // //     { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
// // // // // //     { key: "state_checked",      label: "State",                type: "text" },
// // // // // //     { key: "district_checked",   label: "District",             type: "text" },
// // // // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   drug: [
// // // // // //     { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
// // // // // //     { key: "lab_name",           label: "Lab Name",             type: "text" },
// // // // // //     { key: "test_date",          label: "Test Date",            type: "date" },
// // // // // //     { key: "substances_tested",  label: "Substances Tested",    type: "text" },
// // // // // //     { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
// // // // // //     { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // //   court: [
// // // // // //     { key: "court_name",         label: "Court Name",           type: "text" },
// // // // // //     { key: "case_number",        label: "Case Number",          type: "text" },
// // // // // //     { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
// // // // // //     { key: "filing_date",        label: "Filing Date",          type: "date" },
// // // // // //     { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
// // // // // //     { key: "next_date",          label: "Next Hearing Date",    type: "date" },
// // // // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // // // //   ],
// // // // // // };

// // // // // // const VERIFICATION_RATES = {
// // // // // //   employment: 350, education: 280, address: 180,
// // // // // //   database: 120,   criminal: 220,  drug: 400, court: 160,
// // // // // // };

// // // // // // const PRIORITY_META = {
// // // // // //   HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
// // // // // //   MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // // // //   MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // // // //   LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
// // // // // //   normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
// // // // // // };

// // // // // // const OUTCOME_OPTS = [
// // // // // //   { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
// // // // // //   { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
// // // // // //   { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
// // // // // // ];

// // // // // // const STATUS_META = {
// // // // // //   "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
// // // // // //   "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
// // // // // //   "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
// // // // // //   "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
// // // // // //   "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
// // // // // // };

// // // // // // // ── Helpers ────────────────────────────────────────────────────────────────────
// // // // // // function getUser() {
// // // // // //   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// // // // // // }

// // // // // // function getToken() { return localStorage.getItem("token"); }

// // // // // // function normChecks(raw) {
// // // // // //   if (!raw) return [];
// // // // // //   const arr = Array.isArray(raw)
// // // // // //     ? raw
// // // // // //     : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
// // // // // //   return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
// // // // // // }

// // // // // // function calcTAT(createdAt) {
// // // // // //   if (!createdAt) return "—";
// // // // // //   const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
// // // // // //   return days === 0 ? "Today" : `${days}d`;
// // // // // // }

// // // // // // function normPriority(p) {
// // // // // //   if (!p) return "LOW";
// // // // // //   return String(p).toUpperCase();
// // // // // // }

// // // // // // // ── Shared input styles ────────────────────────────────────────────────────────
// // // // // // const labelSt = {
// // // // // //   display: "block", fontSize: "11px", fontWeight: 700,
// // // // // //   color: "#475569", marginBottom: "5px",
// // // // // //   textTransform: "uppercase", letterSpacing: "0.4px",
// // // // // // };
// // // // // // const inputSt = {
// // // // // //   width: "100%", padding: "9px 12px",
// // // // // //   border: "1.5px solid #e2e8f0", borderRadius: "8px",
// // // // // //   fontSize: "13px", color: "#1e293b", background: "#f8fafc",
// // // // // //   outline: "none", fontFamily: "inherit", boxSizing: "border-box",
// // // // // // };
// // // // // // const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// // // // // // // ── FormField sub-component ────────────────────────────────────────────────────
// // // // // // function FormField({ f, value, onChange }) {
// // // // // //   if (f.type === "radio") return (
// // // // // //     <div style={{
// // // // // //       gridColumn: "1 / -1", background: "#f0f4ff", border: "1.5px solid #c7d2fe",
// // // // // //       borderRadius: "8px", padding: "12px 14px", marginBottom: "4px",
// // // // // //     }}>
// // // // // //       <label style={labelSt}>{f.label}</label>
// // // // // //       <div style={{ display: "flex", gap: "20px" }}>
// // // // // //         {f.options.map(o => (
// // // // // //           <label key={o} style={{
// // // // // //             display: "flex", alignItems: "center", gap: "7px",
// // // // // //             fontSize: "13px", fontWeight: 600, color: "#27348B", cursor: "pointer",
// // // // // //           }}>
// // // // // //             <input
// // // // // //               type="radio"
// // // // // //               name={f.key}
// // // // // //               value={o}
// // // // // //               checked={value === o}
// // // // // //               onChange={() => onChange(o)}
// // // // // //               style={{ width: "15px", height: "15px", accentColor: "#27348B", cursor: "pointer" }}
// // // // // //             />
// // // // // //             {o}
// // // // // //           </label>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // //   if (f.type === "textarea") return (
// // // // // //     <div style={{ gridColumn: "1 / -1" }}>
// // // // // //       <label style={labelSt}>{f.label}</label>
// // // // // //       <textarea
// // // // // //         rows={3} value={value} onChange={e => onChange(e.target.value)}
// // // // // //         placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
// // // // // //       />
// // // // // //     </div>
// // // // // //   );
// // // // // //   if (f.type === "select") return (
// // // // // //     <div>
// // // // // //       <label style={labelSt}>{f.label}</label>
// // // // // //       <select value={value} onChange={e => onChange(e.target.value)}
// // // // // //         style={{ ...inputSt, cursor: "pointer" }}>
// // // // // //         <option value="">— Select —</option>
// // // // // //         {f.options.map(o => <option key={o} value={o}>{o}</option>)}
// // // // // //       </select>
// // // // // //     </div>
// // // // // //   );
// // // // // //   return (
// // // // // //     <div>
// // // // // //       <label style={labelSt}>{f.label}</label>
// // // // // //       <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
// // // // // //         placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
// // // // // //         style={inputSt} />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // ── Main Component ─────────────────────────────────────────────────────────────
// // // // // // export default function Verifyer() {
// // // // // //   const navigate = useNavigate();
// // // // // //   const location = useLocation();
// // // // // //   const user     = getUser();
// // // // // //   const token    = getToken();

// // // // // //   // Role resolution
// // // // // //   const role           = user.role || "";
// // // // // //   const isAdmin        = role === "admin";
// // // // // //   const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

// // // // // //   // ── Sidebar view: "active" | "completed"
// // // // // //   const sidebarView = new URLSearchParams(location.search).get("view") || "active";

// // // // // //   // ── State ─────────────────────────────────────────────────────────────────
// // // // // //   const [cases,        setCases]        = useState([]);
// // // // // //   const [loading,      setLoading]      = useState(true);
// // // // // //   const [selectedCase, setSelectedCase] = useState(null);
// // // // // //   const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
// // // // // //   const [search,       setSearch]       = useState("");

// // // // // //   // Form
// // // // // //   const [form,       setForm]       = useState({});
// // // // // //   const [outcome,    setOutcome]    = useState("");
// // // // // //   const [saving,     setSaving]     = useState(false);
// // // // // //   const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

// // // // // //   // Comments
// // // // // //   const [comments,      setComments]      = useState([]);
// // // // // //   const [commentInput,  setCommentInput]  = useState("");
// // // // // //   const commentsEndRef = useRef(null);

// // // // // //   // ── Fetch real cases from API ──────────────────────────────────────────────
// // // // // //   const fetchCases = () => {
// // // // // //     setLoading(true);
// // // // // //     fetch(`${API_URL}/api/cases`, {
// // // // // //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// // // // // //     })
// // // // // //       .then(r => r.json())
// // // // // //       .then(data => {
// // // // // //         const raw = data.cases || [];
// // // // // //         const normalised = raw.map(c => ({
// // // // // //           ...c,
// // // // // //           checks_raw:  c.checks,
// // // // // //           checks_norm: normChecks(c.checks),
// // // // // //           candidate:   c.candidate || c.candidate_name || "—",
// // // // // //           priority:    normPriority(c.priority),
// // // // // //           tat_display: calcTAT(c.created_at),
// // // // // //         }));
// // // // // //         setCases(normalised);
// // // // // //         if (normalised.length > 0 && !selectedCase) {
// // // // // //           const first = sidebarView === "completed"
// // // // // //             ? normalised.find(c => c.status === "completed")
// // // // // //             : normalised.find(c => c.status !== "completed");
// // // // // //           setSelectedCase(first || normalised[0]);
// // // // // //         }
// // // // // //       })
// // // // // //       .catch(console.error)
// // // // // //       .finally(() => setLoading(false));
// // // // // //   };

// // // // // //   useEffect(() => { fetchCases(); }, []);

// // // // // //   // Auto-scroll comments
// // // // // //   useEffect(() => {
// // // // // //     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // // // //   }, [comments]);

// // // // // //   // Reset form when case / check changes
// // // // // //   useEffect(() => {
// // // // // //     setForm({});
// // // // // //     setOutcome("");
// // // // // //     setSaveMsg({ text: "", type: "" });
// // // // // //   }, [selectedCase?.case_id, activeCheck]);

// // // // // //   // Jump active check to first valid tab on case selection
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedCase) return;
// // // // // //     const validChecks = selectedCase.checks_norm;
// // // // // //     if (validChecks.length === 0) return;
// // // // // //     if (assignedCheck && validChecks.includes(assignedCheck)) {
// // // // // //       setActiveCheck(assignedCheck);
// // // // // //     } else if (!validChecks.includes(activeCheck)) {
// // // // // //       setActiveCheck(validChecks[0]);
// // // // // //     }
// // // // // //   }, [selectedCase?.case_id]);

// // // // // //   // ── Filtered queue lists ───────────────────────────────────────────────────
// // // // // //   const activeCases    = cases.filter(c => c.status !== "completed");
// // // // // //   const completedCases = cases.filter(c => c.status === "completed");

// // // // // //   const filterBySearch = (list) => {
// // // // // //     if (!search) return list;
// // // // // //     const q = search.toLowerCase();
// // // // // //     return list.filter(c =>
// // // // // //       (c.case_id || "").toLowerCase().includes(q) ||
// // // // // //       (c.candidate || "").toLowerCase().includes(q) ||
// // // // // //       (c.client || c.client_name || "").toLowerCase().includes(q)
// // // // // //     );
// // // // // //   };

// // // // // //   const queueList = filterBySearch(sidebarView === "completed" ? completedCases : activeCases);

// // // // // //   // ── Tab accessibility ──────────────────────────────────────────────────────
// // // // // //   // A tab is accessible if:
// // // // // //   //   1. The case has that check type, AND
// // // // // //   //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
// // // // // //   const canAccessTab = (checkKey) => {
// // // // // //     if (!selectedCase) return false;
// // // // // //     const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
// // // // // //     if (!caseHasCheck) return false;
// // // // // //     if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
// // // // // //     return checkKey === assignedCheck;                     // specialist verifier
// // // // // //   };

// // // // // //   // ── Select a case ──────────────────────────────────────────────────────────
// // // // // //   const selectCase = (c) => {
// // // // // //     setSelectedCase(c);
// // // // // //     setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
// // // // // //   };

// // // // // //   // ── Save result ────────────────────────────────────────────────────────────
// // // // // //   const handleSave = async (isDraft) => {
// // // // // //     if (!outcome && !isDraft) {
// // // // // //       setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
// // // // // //       return;
// // // // // //     }
// // // // // //     setSaving(true);
// // // // // //     setSaveMsg({ text: "", type: "" });
// // // // // //     try {
// // // // // //       const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //           "Content-Type": "application/json",
// // // // // //           Accept: "application/json",
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           check_type: activeCheck,
// // // // // //           outcome:    outcome || "unable",
// // // // // //           form_data:  form,
// // // // // //           is_draft:   isDraft,
// // // // // //         }),
// // // // // //       });
// // // // // //       if (!res.ok) throw new Error("Server error");
// // // // // //       setSaveMsg({
// // // // // //         text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
// // // // // //         type: "success",
// // // // // //       });
// // // // // //       fetchCases();
// // // // // //     } catch {
// // // // // //       setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
// // // // // //     } finally {
// // // // // //       setSaving(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ── Send comment ───────────────────────────────────────────────────────────
// // // // // //   const sendComment = () => {
// // // // // //     if (!commentInput.trim()) return;
// // // // // //     // TODO: POST /api/cases/{id}/comments
// // // // // //     setComments(p => [...p, {
// // // // // //       id:     Date.now(),
// // // // // //       author: user.name || "Verifier",
// // // // // //       avatar: (user.name || "V").charAt(0).toUpperCase(),
// // // // // //       time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
// // // // // //       text:   commentInput.trim(),
// // // // // //     }]);
// // // // // //     setCommentInput("");
// // // // // //   };

// // // // // //   // ── Charges for selected case ──────────────────────────────────────────────
// // // // // //   const caseCharges = (selectedCase?.checks_norm || []).map(ch => ({
// // // // // //     label:  CHECK_TABS.find(t => t.key === ch)?.label || ch,
// // // // // //     amount: VERIFICATION_RATES[ch] || 0,
// // // // // //     key:    ch,
// // // // // //   }));
// // // // // //   const totalCharge = caseCharges.reduce((s, c) => s + c.amount, 0);

// // // // // //   // ── Case list item ─────────────────────────────────────────────────────────
// // // // // //   const QueueItem = ({ c }) => {
// // // // // //     const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
// // // // // //     const sm       = STATUS_META[c.status] || STATUS_META["pending"];
// // // // // //     const isActive = selectedCase?.case_id === c.case_id;
// // // // // //     const checkLabels = c.checks_norm.map(k =>
// // // // // //       CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
// // // // // //     );

// // // // // //     return (
// // // // // //       <tr
// // // // // //         className="boder-tbl active"
// // // // // //         onClick={() => selectCase(c)}
// // // // // //         style={{
// // // // // //           cursor: "pointer",
// // // // // //           background: isActive ? "#eef3ff" : undefined,
// // // // // //           borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
// // // // // //         }}
// // // // // //       >
// // // // // //         {/* Case ID + checks */}
// // // // // //         <td>
// // // // // //           <div className="criminal-case">
// // // // // //             <p>
// // // // // //               <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
// // // // // //               <br />
// // // // // //               <span style={{ fontSize: "11px", color: "#94a3b8" }}>
// // // // // //                 {checkLabels.join(" · ")}
// // // // // //               </span>
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         </td>

// // // // // //         {/* Candidate name */}
// // // // // //         <td>
// // // // // //           <div className="client-names">{c.candidate}</div>
// // // // // //         </td>

// // // // // //         {/* Progress + TAT */}
// // // // // //         <td>
// // // // // //           <div className="custom-progress">
// // // // // //             <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
// // // // // //           </div>
// // // // // //           <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
// // // // // //         </td>

// // // // // //         {/* Priority dot */}
// // // // // //         <td>
// // // // // //           <div className="parent-client-boxes">
// // // // // //             <span
// // // // // //               className="client-cases-box"
// // // // // //               style={{ background: pm.dot }}
// // // // // //               title={c.priority}
// // // // // //             />
// // // // // //           </div>
// // // // // //         </td>
// // // // // //       </tr>
// // // // // //     );
// // // // // //   };

// // // // // //   // ── Middle panel: full detail of selected case ──────────────────────────────
// // // // // //   const DetailPanel = () => {
// // // // // //     if (!selectedCase) return (
// // // // // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
// // // // // //         <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
// // // // // //       </div>
// // // // // //     );

// // // // // //     const fields = CHECK_FIELDS[activeCheck] || [];
// // // // // //     const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
// // // // // //     const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

// // // // // //     return (
// // // // // //       <>
// // // // // //         {/* Header */}
// // // // // //         <div style={{
// // // // // //           background: "#27348B", color: "#fff", padding: "14px 18px",
// // // // // //           fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
// // // // // //           display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // // //         }}>
// // // // // //           <span>
// // // // // //             {selectedCase.case_id} — {selectedCase.candidate}
// // // // // //           </span>
// // // // // //           <span style={{
// // // // // //             background: pm.bg, color: pm.color, fontSize: "11px",
// // // // // //             fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
// // // // // //           }}>
// // // // // //             {selectedCase.priority}
// // // // // //           </span>
// // // // // //         </div>

// // // // // //         {/* Check type tabs — only show checks present in this case */}
// // // // // //         <div style={{
// // // // // //           display: "flex", background: "#fff",
// // // // // //           borderBottom: "1px solid #e2e8f0", overflowX: "auto",
// // // // // //         }}>
// // // // // //           {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
// // // // // //             const accessible = canAccessTab(t.key);
// // // // // //             const isActive   = activeCheck === t.key;
// // // // // //             return (
// // // // // //               <button
// // // // // //                 key={t.key}
// // // // // //                 onClick={() => accessible && setActiveCheck(t.key)}
// // // // // //                 title={!accessible ? "Your role cannot access this check type" : ""}
// // // // // //                 style={{
// // // // // //                   padding: "11px 18px", border: "none", whiteSpace: "nowrap",
// // // // // //                   borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
// // // // // //                   borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
// // // // // //                   background: isActive ? "#f0f4ff" : "#fff",
// // // // // //                   color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
// // // // // //                   fontWeight: isActive ? 700 : 400,
// // // // // //                   fontSize: "13px",
// // // // // //                   cursor: accessible ? "pointer" : "not-allowed",
// // // // // //                   opacity: accessible ? 1 : 0.45,
// // // // // //                   transition: "all 0.15s",
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {t.label}
// // // // // //               </button>
// // // // // //             );
// // // // // //           })}
// // // // // //         </div>

// // // // // //         {/* Scrollable form body */}
// // // // // //         <div style={{
// // // // // //           border: "1px solid #e2e8f0", borderTop: "none",
// // // // // //           borderRadius: "0 0 6px 6px", background: "#fff",
// // // // // //           maxHeight: "520px", overflowY: "auto", padding: "16px",
// // // // // //         }}>

// // // // // //           {/* Case summary strip */}
// // // // // //           <div style={{
// // // // // //             display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
// // // // // //             gap: "10px", marginBottom: "18px",
// // // // // //           }}>
// // // // // //             {[
// // // // // //               { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
// // // // // //               { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
// // // // // //               { label: "TAT",      value: selectedCase.tat_display },
// // // // // //               { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
// // // // // //             ].map(r => (
// // // // // //               <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
// // // // // //                 <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
// // // // // //                 <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           {/* Outcome toggle */}
// // // // // //           <div style={{ marginBottom: "16px" }}>
// // // // // //             <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
// // // // // //               Verification Outcome
// // // // // //             </p>
// // // // // //             <div style={{ display: "flex", gap: "8px" }}>
// // // // // //               {OUTCOME_OPTS.map(o => (
// // // // // //                 <button
// // // // // //                   key={o.key}
// // // // // //                   onClick={() => setOutcome(o.key)}
// // // // // //                   style={{
// // // // // //                     flex: 1, padding: "10px 8px", cursor: "pointer",
// // // // // //                     border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
// // // // // //                     borderRadius: "8px",
// // // // // //                     background: outcome === o.key ? o.bg : "#f8fafc",
// // // // // //                     color: outcome === o.key ? o.color : "#94a3b8",
// // // // // //                     fontWeight: outcome === o.key ? 700 : 500,
// // // // // //                     fontSize: "12px",
// // // // // //                     transition: "all 0.15s",
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   {o.label}
// // // // // //                 </button>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Dynamic fields grid */}
// // // // // //           {!canAccessTab(activeCheck) ? (
// // // // // //             <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
// // // // // //               Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
// // // // // //               {fields.map(f => (
// // // // // //                 <FormField
// // // // // //                   key={f.key} f={f}
// // // // // //                   value={form[f.key] || ""}
// // // // // //                   onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* Save message */}
// // // // // //           {saveMsg.text && (
// // // // // //             <div style={{
// // // // // //               marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
// // // // // //               background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
// // // // // //               color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
// // // // // //               fontSize: "13px", fontWeight: 600,
// // // // // //             }}>
// // // // // //               {saveMsg.text}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Action buttons */}
// // // // // //         {canAccessTab(activeCheck) && (
// // // // // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
// // // // // //             <button
// // // // // //               onClick={() => handleSave(true)}
// // // // // //               disabled={saving}
// // // // // //               style={{
// // // // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // // // //                 padding: "13px", background: "#27348B", color: "#fff", border: "none",
// // // // // //                 borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
// // // // // //               }}
// // // // // //             >
// // // // // //               💾 Save Draft
// // // // // //             </button>
// // // // // //             <button
// // // // // //               onClick={() => handleSave(false)}
// // // // // //               disabled={saving || !outcome}
// // // // // //               style={{
// // // // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // // // //                 padding: "13px",
// // // // // //                 background: saving || !outcome ? "#94a3b8" : "#10b981",
// // // // // //                 color: "#fff", border: "none", borderRadius: "6px",
// // // // // //                 fontWeight: 700, fontSize: "13px",
// // // // // //                 cursor: saving || !outcome ? "not-allowed" : "pointer",
// // // // // //               }}
// // // // // //             >
// // // // // //               {saving ? "Saving…" : "✔ Save & Mark Done"}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </>
// // // // // //     );
// // // // // //   };

// // // // // //   // ── Right panel: Charges + Comments ─────────────────────────────────────────
// // // // // //   const RightPanel = () => (
// // // // // //     <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

// // // // // //       {/* Verification Charges */}
// // // // // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
// // // // // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // // // // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // // // // //             VERIFICATION CHARGES
// // // // // //           </h3>
// // // // // //         </div>
// // // // // //         {selectedCase ? (
// // // // // //           <>
// // // // // //             {caseCharges.map((c, i) => (
// // // // // //               <div key={c.key} style={{
// // // // // //                 display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // // //                 padding: "12px 16px",
// // // // // //                 background: i % 2 === 0 ? "#f8fafc" : "#fff",
// // // // // //                 borderBottom: "1px solid #f1f5f9",
// // // // // //                 fontSize: "13px",
// // // // // //               }}>
// // // // // //                 <span style={{ color: "#475569" }}>{c.label} Check</span>
// // // // // //                 <span style={{ fontWeight: 700, color: "#1e293b" }}>₹{c.amount}</span>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //             <div style={{
// // // // // //               display: "flex", justifyContent: "space-between", alignItems: "center",
// // // // // //               padding: "14px 16px", background: "#27348B",
// // // // // //             }}>
// // // // // //               <span style={{ color: "#fff", fontWeight: 700, fontSize: "13px" }}>TOTAL</span>
// // // // // //               <span style={{ color: "#fff", fontWeight: 800, fontSize: "15px" }}>₹{totalCharge}</span>
// // // // // //             </div>
// // // // // //           </>
// // // // // //         ) : (
// // // // // //           <p style={{ padding: "16px", color: "#94a3b8", fontSize: "13px" }}>Select a case to see charges.</p>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Comments */}
// // // // // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1 }}>
// // // // // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // // // // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // // // // //             COMMENTS & NOTES
// // // // // //           </h3>
// // // // // //         </div>
// // // // // //         <div style={{ maxHeight: "260px", overflowY: "auto", padding: "12px 14px" }}>
// // // // // //           {comments.length === 0 ? (
// // // // // //             <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
// // // // // //               No comments yet.
// // // // // //             </p>
// // // // // //           ) : (
// // // // // //             comments.map((c, i) => (
// // // // // //               <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
// // // // // //                 <div style={{
// // // // // //                   width: "30px", height: "30px", borderRadius: "50%",
// // // // // //                   background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
// // // // // //                   color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
// // // // // //                   fontSize: "13px", fontWeight: 700, flexShrink: 0,
// // // // // //                 }}>
// // // // // //                   {c.avatar}
// // // // // //                 </div>
// // // // // //                 <div style={{ flex: 1 }}>
// // // // // //                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
// // // // // //                     <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
// // // // // //                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
// // // // // //                   </div>
// // // // // //                   <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))
// // // // // //           )}
// // // // // //           <div ref={commentsEndRef} />
// // // // // //         </div>
// // // // // //         <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
// // // // // //           <input
// // // // // //             type="text"
// // // // // //             placeholder="Add a comment…"
// // // // // //             value={commentInput}
// // // // // //             onChange={e => setCommentInput(e.target.value)}
// // // // // //             onKeyDown={e => e.key === "Enter" && sendComment()}
// // // // // //             style={{
// // // // // //               flex: 1, border: "none", padding: "11px 14px",
// // // // // //               fontSize: "13px", outline: "none", background: "#fff",
// // // // // //             }}
// // // // // //           />
// // // // // //           <button onClick={sendComment} style={{
// // // // // //             background: "#27348B", border: "none", padding: "0 16px",
// // // // // //             cursor: "pointer", color: "#fff",
// // // // // //           }}>
// // // // // //             <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // // // // //               <line x1="22" y1="2" x2="11" y2="13" />
// // // // // //               <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // // // // //             </svg>
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   // ── Render ─────────────────────────────────────────────────────────────────
// // // // // //   return (
// // // // // //     <>
// // // // // //       <Sidebar />
// // // // // //       <section id="content">
// // // // // //         <Header />
// // // // // //         <main>
// // // // // //           <div className="dash-wrper">

// // // // // //             {/* Page header */}
// // // // // //             <div className="dash-upper-head">
// // // // // //               <div className="left">
// // // // // //                 <div className="dash-title-flex">
// // // // // //                   <h3 className="dash-title-text">Verifier Workspace</h3>
// // // // // //                   <span style={{
// // // // // //                     fontSize: "12px", color: "#64748b",
// // // // // //                     background: "#eef3ff", padding: "3px 10px", borderRadius: "20px",
// // // // // //                   }}>
// // // // // //                     {user.name || "Verifier"} — {role}
// // // // // //                   </span>
// // // // // //                   {assignedCheck && (
// // // // // //                     <span style={{
// // // // // //                       fontSize: "11px", color: "#fff",
// // // // // //                       background: "#27348B", padding: "3px 10px", borderRadius: "20px",
// // // // // //                     }}>
// // // // // //                       Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
// // // // // //                     </span>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="right">
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   className="dash-search-input"
// // // // // //                   placeholder="Search case ID or candidate…"
// // // // // //                   value={search}
// // // // // //                   onChange={e => setSearch(e.target.value)}
// // // // // //                 />
// // // // // //                 {search && (
// // // // // //                   <button onClick={() => setSearch("")}
// // // // // //                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
// // // // // //                     ×
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* View toggle: Active / Completed */}
// // // // // //             <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
// // // // // //               <button
// // // // // //                 className={`tab-cta ${sidebarView === "active" ? "active" : ""}`}
// // // // // //                 onClick={() => navigate("/Verifyer?view=active", { replace: true })}
// // // // // //               >
// // // // // //                 Active Cases
// // // // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // // // //                   {activeCases.length}
// // // // // //                 </span>
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 className={`tab-cta ${sidebarView === "completed" ? "active" : ""}`}
// // // // // //                 onClick={() => navigate("/Verifyer?view=completed", { replace: true })}
// // // // // //               >
// // // // // //                 Completed
// // // // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // // // //                   {completedCases.length}
// // // // // //                 </span>
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* Three-column layout: Queue | Form | Charges+Comments */}
// // // // // //             <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

// // // // // //               {/* ── LEFT: Case queue ── */}
// // // // // //               <div className="down-table" style={{ margin: 0 }}>
// // // // // //                 <div className="client-portal-cases">
// // // // // //                   <h3>
// // // // // //                     {sidebarView === "completed" ? "COMPLETED" : "ACTIVE"} ({queueList.length})
// // // // // //                   </h3>
// // // // // //                 </div>

// // // // // //                 {loading ? (
// // // // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
// // // // // //                 ) : queueList.length === 0 ? (
// // // // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
// // // // // //                     No {sidebarView} cases found.
// // // // // //                   </p>
// // // // // //                 ) : (
// // // // // //                   <table>
// // // // // //                     <tbody>
// // // // // //                       {queueList.map(c => <QueueItem key={c.case_id} c={c} />)}
// // // // // //                     </tbody>
// // // // // //                   </table>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               {/* ── MIDDLE: Detail + form ── */}
// // // // // //               <div className="second-card">
// // // // // //                 <DetailPanel />
// // // // // //               </div>

// // // // // //               {/* ── RIGHT: Charges + Comments ── */}
// // // // // //               <div className="thrid-card">
// // // // // //                 <RightPanel />
// // // // // //               </div>

// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </main>
// // // // // //       </section>
// // // // // //     </>
// // // // // //   );
// // // // // // }
// // // // import { useState, useEffect, useRef } from "react";
// // // // import { useNavigate, useLocation } from "react-router-dom";
// // // // import Sidebar from "./Sidebar";
// // // // import Header from "./Header";
// // // // import { API_URL } from "../src/config";

// // // // // ── Check tab definitions ──────────────────────────────────────────────────────
// // // // const CHECK_TABS = [
// // // //   { key: "employment", label: "Employment" },
// // // //   { key: "education",  label: "Education"  },
// // // //   { key: "address",    label: "Address"    },
// // // //   { key: "database",   label: "Database"   },
// // // //   { key: "criminal",   label: "Criminal"   },
// // // //   { key: "drug",       label: "Drug Test"  },
// // // //   { key: "court",      label: "Courtroom"  },
// // // // ];

// // // // // ── Which API check key maps to which verifier role ───────────────────────────
// // // // const ROLE_CHECK_MAP = {
// // // //   employment_verifier:  "employment",
// // // //   education_verifier:   "education",
// // // //   address_verifier:     "address",
// // // //   database_verifier:    "database",
// // // //   criminal_verifier:    "criminal",
// // // //   drug_test_verifier:   "drug",
// // // //   courtroom_verifier:   "court",
// // // // };

// // // // // ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
// // // // const NORMALISE_CHECK = {
// // // //   emp:        "employment",
// // // //   employment: "employment",
// // // //   edu:        "education",
// // // //   education:  "education",
// // // //   addr:       "address",
// // // //   address:    "address",
// // // //   db:         "database",
// // // //   database:   "database",
// // // //   criminal:   "criminal",
// // // //   cri:        "criminal",
// // // //   drug:       "drug",
// // // //   drug_test:  "drug",
// // // //   court:      "court",
// // // //   courtroom:  "court",
// // // // };

// // // // // ── Field definitions per check type ──────────────────────────────────────────
// // // // const CHECK_FIELDS = {
// // // //   employment: [
// // // //     { key: "company_name",       label: "Company Name",         type: "text" },
// // // //     { key: "designation",        label: "Designation",          type: "text" },
// // // //     { key: "employee_id",        label: "Employee ID",          type: "text" },
// // // //     { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
// // // //     { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
// // // //     { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
// // // //     { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
// // // //     { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
// // // //     { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
// // // //     { key: "hr_phone",           label: "HR Phone",             type: "text" },
// // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   education: [
// // // //     { key: "institution_name",   label: "Institution Name",     type: "text" },
// // // //     { key: "degree",             label: "Degree / Certificate", type: "text" },
// // // //     { key: "course",             label: "Course / Specialization", type: "text" },
// // // //     { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
// // // //     { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
// // // //     { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
// // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
// // // //     { key: "result_link",        label: "Result Link (URL)",    type: "text" },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   address: [
// // // //     { key: "address_line",       label: "Address",              type: "text" },
// // // //     { key: "city",               label: "City",                 type: "text" },
// // // //     { key: "state",              label: "State",                type: "text" },
// // // //     { key: "pincode",            label: "Pincode",               type: "text" },
// // // //     { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
// // // //     { key: "years_at_address",   label: "Years at Address",     type: "text" },
// // // //     { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
// // // //     { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
// // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   database: [
// // // //     { key: "db_checked",         label: "Databases Checked",    type: "text" },
// // // //     { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
// // // //     { key: "match_details",      label: "Match Details",        type: "textarea" },
// // // //     { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // //     { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   criminal: [
// // // //     { key: "court_checked",      label: "Courts Checked",       type: "text" },
// // // //     { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
// // // //     { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
// // // //     { key: "state_checked",      label: "State",                type: "text" },
// // // //     { key: "district_checked",   label: "District",             type: "text" },
// // // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   drug: [
// // // //     { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
// // // //     { key: "lab_name",           label: "Lab Name",             type: "text" },
// // // //     { key: "test_date",          label: "Test Date",            type: "date" },
// // // //     { key: "substances_tested",  label: "Substances Tested",    type: "text" },
// // // //     { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
// // // //     { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // //   court: [
// // // //     { key: "court_name",         label: "Court Name",           type: "text" },
// // // //     { key: "case_number",        label: "Case Number",          type: "text" },
// // // //     { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
// // // //     { key: "filing_date",        label: "Filing Date",          type: "date" },
// // // //     { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
// // // //     { key: "next_date",          label: "Next Hearing Date",    type: "date" },
// // // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // // //   ],
// // // // };

// // // // const PRIORITY_META = {
// // // //   HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
// // // //   MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // //   MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // // //   LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
// // // //   normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
// // // // };

// // // // const OUTCOME_OPTS = [
// // // //   { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
// // // //   { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
// // // //   { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
// // // // ];

// // // // const STATUS_META = {
// // // //   "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
// // // //   "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
// // // //   "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
// // // //   "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
// // // //   "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
// // // // };

// // // // // ── Helpers ────────────────────────────────────────────────────────────────────
// // // // function getUser() {
// // // //   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// // // // }

// // // // function getToken() { return localStorage.getItem("token"); }

// // // // function normChecks(raw) {
// // // //   if (!raw) return [];
// // // //   const arr = Array.isArray(raw)
// // // //     ? raw
// // // //     : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
// // // //   return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
// // // // }

// // // // function calcTAT(createdAt) {
// // // //   if (!createdAt) return "—";
// // // //   const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
// // // //   return days === 0 ? "Today" : `${days}d`;
// // // // }

// // // // function normPriority(p) {
// // // //   if (!p) return "LOW";
// // // //   return String(p).toUpperCase();
// // // // }

// // // // // ── Shared input styles ────────────────────────────────────────────────────────
// // // // const labelSt = {
// // // //   display: "block", fontSize: "11px", fontWeight: 700,
// // // //   color: "#475569", marginBottom: "5px",
// // // //   textTransform: "uppercase", letterSpacing: "0.4px",
// // // // };
// // // // const inputSt = {
// // // //   width: "100%", padding: "9px 12px",
// // // //   border: "1.5px solid #e2e8f0", borderRadius: "8px",
// // // //   fontSize: "13px", color: "#1e293b", background: "#f8fafc",
// // // //   outline: "none", fontFamily: "inherit", boxSizing: "border-box",
// // // // };
// // // // const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// // // // // ── FormField sub-component ────────────────────────────────────────────────────
// // // // function FormField({ f, value, onChange }) {
// // // //   if (f.type === "textarea") return (
// // // //     <div style={{ gridColumn: "1 / -1" }}>
// // // //       <label style={labelSt}>{f.label}</label>
// // // //       <textarea
// // // //         rows={3} value={value} onChange={e => onChange(e.target.value)}
// // // //         placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
// // // //       />
// // // //     </div>
// // // //   );
// // // //   if (f.type === "select") return (
// // // //     <div>
// // // //       <label style={labelSt}>{f.label}</label>
// // // //       <select value={value} onChange={e => onChange(e.target.value)}
// // // //         style={{ ...inputSt, cursor: "pointer" }}>
// // // //         <option value="">— Select —</option>
// // // //         {f.options.map(o => <option key={o} value={o}>{o}</option>)}
// // // //       </select>
// // // //     </div>
// // // //   );
// // // //   return (
// // // //     <div>
// // // //       <label style={labelSt}>{f.label}</label>
// // // //       <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
// // // //         placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
// // // //         style={inputSt} />
// // // //     </div>
// // // //   );
// // // // }

// // // // // ── Main Component ─────────────────────────────────────────────────────────────
// // // // export default function Verifyer() {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const user     = getUser();
// // // //   const token    = getToken();

// // // //   // Role resolution
// // // //   const role           = user.role || "";
// // // //   const isAdmin        = role === "admin";
// // // //   const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

// // // //   // ── Sidebar view: "active" | "completed"
// // // //   const sidebarView = new URLSearchParams(location.search).get("view") || "active";

// // // //   // ── State ─────────────────────────────────────────────────────────────────
// // // //   const [cases,        setCases]        = useState([]);
// // // //   const [loading,      setLoading]      = useState(true);
// // // //   const [selectedCase, setSelectedCase] = useState(null);
// // // //   const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
// // // //   const [search,       setSearch]       = useState("");

// // // //   // Form
// // // //   const [form,       setForm]       = useState({});
// // // //   const [outcome,    setOutcome]    = useState("");
// // // //   const [saving,     setSaving]     = useState(false);
// // // //   const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

// // // //   // Comments
// // // //   const [comments,      setComments]      = useState([]);
// // // //   const [commentInput,  setCommentInput]  = useState("");
// // // //   const commentsEndRef = useRef(null);

// // // //   // ── Fetch real cases from API ──────────────────────────────────────────────
// // // //   const fetchCases = () => {
// // // //     setLoading(true);
// // // //     fetch(`${API_URL}/api/cases`, {
// // // //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// // // //     })
// // // //       .then(r => r.json())
// // // //       .then(data => {
// // // //         const raw = data.cases || [];
// // // //         const normalised = raw.map(c => ({
// // // //           ...c,
// // // //           checks_raw:  c.checks,
// // // //           checks_norm: normChecks(c.checks),
// // // //           candidate:   c.candidate || c.candidate_name || "—",
// // // //           priority:    normPriority(c.priority),
// // // //           tat_display: calcTAT(c.created_at),
// // // //         }));
// // // //         setCases(normalised);
// // // //         if (normalised.length > 0 && !selectedCase) {
// // // //           const first = sidebarView === "completed"
// // // //             ? normalised.find(c => c.status === "completed")
// // // //             : normalised.find(c => c.status !== "completed");
// // // //           setSelectedCase(first || normalised[0]);
// // // //         }
// // // //       })
// // // //       .catch(console.error)
// // // //       .finally(() => setLoading(false));
// // // //   };

// // // //   useEffect(() => { fetchCases(); }, []);

// // // //   // Auto-scroll comments
// // // //   useEffect(() => {
// // // //     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // // //   }, [comments]);

// // // //   // Reset form when case / check changes
// // // //   useEffect(() => {
// // // //     setForm({});
// // // //     setOutcome("");
// // // //     setSaveMsg({ text: "", type: "" });
// // // //   }, [selectedCase?.case_id, activeCheck]);

// // // //   // Jump active check to first valid tab on case selection
// // // //   useEffect(() => {
// // // //     if (!selectedCase) return;
// // // //     const validChecks = selectedCase.checks_norm;
// // // //     if (validChecks.length === 0) return;
// // // //     if (assignedCheck && validChecks.includes(assignedCheck)) {
// // // //       setActiveCheck(assignedCheck);
// // // //     } else if (!validChecks.includes(activeCheck)) {
// // // //       setActiveCheck(validChecks[0]);
// // // //     }
// // // //   }, [selectedCase?.case_id]);

// // // //   // ── Filtered queue lists ───────────────────────────────────────────────────
// // // //   const activeCases    = cases.filter(c => c.status !== "completed");
// // // //   const completedCases = cases.filter(c => c.status === "completed");

// // // //   const filterBySearch = (list) => {
// // // //     if (!search) return list;
// // // //     const q = search.toLowerCase();
// // // //     return list.filter(c =>
// // // //       (c.case_id || "").toLowerCase().includes(q) ||
// // // //       (c.candidate || "").toLowerCase().includes(q) ||
// // // //       (c.client || c.client_name || "").toLowerCase().includes(q)
// // // //     );
// // // //   };

// // // //   const queueList = filterBySearch(sidebarView === "completed" ? completedCases : activeCases);

// // // //   // ── Tab accessibility ──────────────────────────────────────────────────────
// // // //   // A tab is accessible if:
// // // //   //   1. The case has that check type, AND
// // // //   //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
// // // //   const canAccessTab = (checkKey) => {
// // // //     if (!selectedCase) return false;
// // // //     const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
// // // //     if (!caseHasCheck) return false;
// // // //     if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
// // // //     return checkKey === assignedCheck;                     // specialist verifier
// // // //   };

// // // //   // ── Select a case ──────────────────────────────────────────────────────────
// // // //   const selectCase = (c) => {
// // // //     setSelectedCase(c);
// // // //     setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
// // // //   };

// // // //   // ── Save result ────────────────────────────────────────────────────────────
// // // //   const handleSave = async (isDraft) => {
// // // //     if (!outcome && !isDraft) {
// // // //       setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
// // // //       return;
// // // //     }
// // // //     setSaving(true);
// // // //     setSaveMsg({ text: "", type: "" });
// // // //     try {
// // // //       const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //           "Content-Type": "application/json",
// // // //           Accept: "application/json",
// // // //         },
// // // //         body: JSON.stringify({
// // // //           check_type: activeCheck,
// // // //           outcome:    outcome || "unable",
// // // //           form_data:  form,
// // // //           is_draft:   isDraft,
// // // //         }),
// // // //       });
// // // //       if (!res.ok) throw new Error("Server error");
// // // //       setSaveMsg({
// // // //         text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
// // // //         type: "success",
// // // //       });
// // // //       fetchCases();
// // // //     } catch {
// // // //       setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   // ── Send comment ───────────────────────────────────────────────────────────
// // // //   const sendComment = () => {
// // // //     if (!commentInput.trim()) return;
// // // //     // TODO: POST /api/cases/{id}/comments
// // // //     setComments(p => [...p, {
// // // //       id:     Date.now(),
// // // //       author: user.name || "Verifier",
// // // //       avatar: (user.name || "V").charAt(0).toUpperCase(),
// // // //       time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
// // // //       text:   commentInput.trim(),
// // // //     }]);
// // // //     setCommentInput("");
// // // //   };

// // // //   // ── Case list item ─────────────────────────────────────────────────────────
// // // //   const QueueItem = ({ c }) => {
// // // //     const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
// // // //     const sm       = STATUS_META[c.status] || STATUS_META["pending"];
// // // //     const isActive = selectedCase?.case_id === c.case_id;
// // // //     const checkLabels = c.checks_norm.map(k =>
// // // //       CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
// // // //     );

// // // //     return (
// // // //       <tr
// // // //         className="boder-tbl active"
// // // //         onClick={() => selectCase(c)}
// // // //         style={{
// // // //           cursor: "pointer",
// // // //           background: isActive ? "#eef3ff" : undefined,
// // // //           borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
// // // //         }}
// // // //       >
// // // //         {/* Case ID + checks */}
// // // //         <td>
// // // //           <div className="criminal-case">
// // // //             <p>
// // // //               <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
// // // //               <br />
// // // //               <span style={{ fontSize: "11px", color: "#94a3b8" }}>
// // // //                 {checkLabels.join(" · ")}
// // // //               </span>
// // // //             </p>
// // // //           </div>
// // // //         </td>

// // // //         {/* Candidate name */}
// // // //         <td>
// // // //           <div className="client-names">{c.candidate}</div>
// // // //         </td>

// // // //         {/* Progress + TAT */}
// // // //         <td>
// // // //           <div className="custom-progress">
// // // //             <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
// // // //           </div>
// // // //           <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
// // // //         </td>

// // // //         {/* Priority dot */}
// // // //         <td>
// // // //           <div className="parent-client-boxes">
// // // //             <span
// // // //               className="client-cases-box"
// // // //               style={{ background: pm.dot }}
// // // //               title={c.priority}
// // // //             />
// // // //           </div>
// // // //         </td>
// // // //       </tr>
// // // //     );
// // // //   };

// // // //   // ── Middle panel: full detail of selected case ──────────────────────────────
// // // //   const DetailPanel = () => {
// // // //     if (!selectedCase) return (
// // // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
// // // //         <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
// // // //       </div>
// // // //     );

// // // //     const fields = CHECK_FIELDS[activeCheck] || [];
// // // //     const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
// // // //     const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

// // // //     return (
// // // //       <>
// // // //         {/* Header */}
// // // //         <div style={{
// // // //           background: "#27348B", color: "#fff", padding: "14px 18px",
// // // //           fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
// // // //           display: "flex", justifyContent: "space-between", alignItems: "center",
// // // //         }}>
// // // //           <span>
// // // //             {selectedCase.case_id} — {selectedCase.candidate}
// // // //           </span>
// // // //           <span style={{
// // // //             background: pm.bg, color: pm.color, fontSize: "11px",
// // // //             fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
// // // //           }}>
// // // //             {selectedCase.priority}
// // // //           </span>
// // // //         </div>

// // // //         {/* Check type tabs — only show checks present in this case */}
// // // //         <div style={{
// // // //           display: "flex", background: "#fff",
// // // //           borderBottom: "1px solid #e2e8f0", overflowX: "auto",
// // // //         }}>
// // // //           {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
// // // //             const accessible = canAccessTab(t.key);
// // // //             const isActive   = activeCheck === t.key;
// // // //             return (
// // // //               <button
// // // //                 key={t.key}
// // // //                 onClick={() => accessible && setActiveCheck(t.key)}
// // // //                 title={!accessible ? "Your role cannot access this check type" : ""}
// // // //                 style={{
// // // //                   padding: "11px 18px", border: "none", whiteSpace: "nowrap",
// // // //                   borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
// // // //                   borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
// // // //                   background: isActive ? "#f0f4ff" : "#fff",
// // // //                   color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
// // // //                   fontWeight: isActive ? 700 : 400,
// // // //                   fontSize: "13px",
// // // //                   cursor: accessible ? "pointer" : "not-allowed",
// // // //                   opacity: accessible ? 1 : 0.45,
// // // //                   transition: "all 0.15s",
// // // //                 }}
// // // //               >
// // // //                 {t.label}
// // // //               </button>
// // // //             );
// // // //           })}
// // // //         </div>

// // // //         {/* Scrollable form body */}
// // // //         <div style={{
// // // //           border: "1px solid #e2e8f0", borderTop: "none",
// // // //           borderRadius: "0 0 6px 6px", background: "#fff",
// // // //           maxHeight: "520px", overflowY: "auto", padding: "16px",
// // // //         }}>

// // // //           {/* Case summary strip */}
// // // //           <div style={{
// // // //             display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
// // // //             gap: "10px", marginBottom: "18px",
// // // //           }}>
// // // //             {[
// // // //               { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
// // // //               { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
// // // //               { label: "TAT",      value: selectedCase.tat_display },
// // // //               { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
// // // //             ].map(r => (
// // // //               <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
// // // //                 <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
// // // //                 <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Outcome toggle */}
// // // //           <div style={{ marginBottom: "16px" }}>
// // // //             <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
// // // //               Verification Outcome
// // // //             </p>
// // // //             <div style={{ display: "flex", gap: "8px" }}>
// // // //               {OUTCOME_OPTS.map(o => (
// // // //                 <button
// // // //                   key={o.key}
// // // //                   onClick={() => setOutcome(o.key)}
// // // //                   style={{
// // // //                     flex: 1, padding: "10px 8px", cursor: "pointer",
// // // //                     border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
// // // //                     borderRadius: "8px",
// // // //                     background: outcome === o.key ? o.bg : "#f8fafc",
// // // //                     color: outcome === o.key ? o.color : "#94a3b8",
// // // //                     fontWeight: outcome === o.key ? 700 : 500,
// // // //                     fontSize: "12px",
// // // //                     transition: "all 0.15s",
// // // //                   }}
// // // //                 >
// // // //                   {o.label}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Dynamic fields grid */}
// // // //           {!canAccessTab(activeCheck) ? (
// // // //             <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
// // // //               Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
// // // //             </div>
// // // //           ) : (
// // // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
// // // //               {fields.map(f => (
// // // //                 <FormField
// // // //                   key={f.key} f={f}
// // // //                   value={form[f.key] || ""}
// // // //                   onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //           )}

// // // //           {/* Save message */}
// // // //           {saveMsg.text && (
// // // //             <div style={{
// // // //               marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
// // // //               background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
// // // //               color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
// // // //               fontSize: "13px", fontWeight: 600,
// // // //             }}>
// // // //               {saveMsg.text}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Action buttons */}
// // // //         {canAccessTab(activeCheck) && (
// // // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
// // // //             <button
// // // //               onClick={() => handleSave(true)}
// // // //               disabled={saving}
// // // //               style={{
// // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // //                 padding: "13px", background: "#27348B", color: "#fff", border: "none",
// // // //                 borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
// // // //               }}
// // // //             >
// // // //               💾 Save Draft
// // // //             </button>
// // // //             <button
// // // //               onClick={() => handleSave(false)}
// // // //               disabled={saving || !outcome}
// // // //               style={{
// // // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // // //                 padding: "13px",
// // // //                 background: saving || !outcome ? "#94a3b8" : "#10b981",
// // // //                 color: "#fff", border: "none", borderRadius: "6px",
// // // //                 fontWeight: 700, fontSize: "13px",
// // // //                 cursor: saving || !outcome ? "not-allowed" : "pointer",
// // // //               }}
// // // //             >
// // // //               {saving ? "Saving…" : "✔ Save & Mark Done"}
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </>
// // // //     );
// // // //   };

// // // //   // ── Right panel: Comments ────────────────────────────────────────────────
// // // //   const RightPanel = () => (
// // // //     <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>

// // // //       {/* Comments */}
// // // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1, display: "flex", flexDirection: "column" }}>
// // // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // // //             COMMENTS & NOTES
// // // //           </h3>
// // // //         </div>
// // // //         <div style={{ flex: 1, maxHeight: "460px", overflowY: "auto", padding: "12px 14px" }}>
// // // //           {comments.length === 0 ? (
// // // //             <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
// // // //               No comments yet.
// // // //             </p>
// // // //           ) : (
// // // //             comments.map((c, i) => (
// // // //               <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
// // // //                 <div style={{
// // // //                   width: "30px", height: "30px", borderRadius: "50%",
// // // //                   background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
// // // //                   color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
// // // //                   fontSize: "13px", fontWeight: 700, flexShrink: 0,
// // // //                 }}>
// // // //                   {c.avatar}
// // // //                 </div>
// // // //                 <div style={{ flex: 1 }}>
// // // //                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
// // // //                     <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
// // // //                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
// // // //                   </div>
// // // //                   <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))
// // // //           )}
// // // //           <div ref={commentsEndRef} />
// // // //         </div>
// // // //         <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Add a comment…"
// // // //             value={commentInput}
// // // //             onChange={e => setCommentInput(e.target.value)}
// // // //             onKeyDown={e => e.key === "Enter" && sendComment()}
// // // //             style={{
// // // //               flex: 1, border: "none", padding: "11px 14px",
// // // //               fontSize: "13px", outline: "none", background: "#fff",
// // // //             }}
// // // //           />
// // // //           <button onClick={sendComment} style={{
// // // //             background: "#27348B", border: "none", padding: "0 16px",
// // // //             cursor: "pointer", color: "#fff",
// // // //           }}>
// // // //             <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // // //               <line x1="22" y1="2" x2="11" y2="13" />
// // // //               <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // // //             </svg>
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   // ── Render ─────────────────────────────────────────────────────────────────
// // // //   return (
// // // //     <>
// // // //       <Sidebar />
// // // //       <section id="content">
// // // //         <Header />
// // // //         <main>
// // // //           <div className="dash-wrper">

// // // //             {/* Page header */}
// // // //             <div className="dash-upper-head">
// // // //               <div className="left">
// // // //                 <div className="dash-title-flex">
// // // //                   <h3 className="dash-title-text">Verifier Workspace</h3>
// // // //                   <span style={{
// // // //                     fontSize: "12px", color: "#64748b",
// // // //                     background: "#eef3ff", padding: "3px 10px", borderRadius: "20px",
// // // //                   }}>
// // // //                     {user.name || "Verifier"} — {role}
// // // //                   </span>
// // // //                   {assignedCheck && (
// // // //                     <span style={{
// // // //                       fontSize: "11px", color: "#fff",
// // // //                       background: "#27348B", padding: "3px 10px", borderRadius: "20px",
// // // //                     }}>
// // // //                       Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //               <div className="right">
// // // //                 <input
// // // //                   type="text"
// // // //                   className="dash-search-input"
// // // //                   placeholder="Search case ID or candidate…"
// // // //                   value={search}
// // // //                   onChange={e => setSearch(e.target.value)}
// // // //                 />
// // // //                 {search && (
// // // //                   <button onClick={() => setSearch("")}
// // // //                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
// // // //                     ×
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* View toggle: Active / Completed */}
// // // //             <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
// // // //               <button
// // // //                 className={`tab-cta ${sidebarView === "active" ? "active" : ""}`}
// // // //                 onClick={() => navigate("/Verifyer?view=active", { replace: true })}
// // // //               >
// // // //                 Active Cases
// // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // //                   {activeCases.length}
// // // //                 </span>
// // // //               </button>
// // // //               <button
// // // //                 className={`tab-cta ${sidebarView === "completed" ? "active" : ""}`}
// // // //                 onClick={() => navigate("/Verifyer?view=completed", { replace: true })}
// // // //               >
// // // //                 Completed
// // // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // // //                   {completedCases.length}
// // // //                 </span>
// // // //               </button>
// // // //             </div>

// // // //             {/* Three-column layout: Queue | Form | Charges+Comments */}
// // // //             <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

// // // //               {/* ── LEFT: Case queue ── */}
// // // //               <div className="down-table" style={{ margin: 0 }}>
// // // //                 <div className="client-portal-cases">
// // // //                   <h3>
// // // //                     {sidebarView === "completed" ? "COMPLETED" : "ACTIVE"} ({queueList.length})
// // // //                   </h3>
// // // //                 </div>

// // // //                 {loading ? (
// // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
// // // //                 ) : queueList.length === 0 ? (
// // // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
// // // //                     No {sidebarView} cases found.
// // // //                   </p>
// // // //                 ) : (
// // // //                   <table>
// // // //                     <tbody>
// // // //                       {queueList.map(c => <QueueItem key={c.case_id} c={c} />)}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 )}
// // // //               </div>

// // // //               {/* ── MIDDLE: Detail + form ── */}
// // // //               <div className="second-card">
// // // //                 <DetailPanel />
// // // //               </div>

// // // //               {/* ── RIGHT: Charges + Comments ── */}
// // // //               <div className="thrid-card">
// // // //                 <RightPanel />
// // // //               </div>

// // // //             </div>
// // // //           </div>
// // // //         </main>
// // // //       </section>
// // // //     </>
// // // //   );
// // // // }
// // // import { useState, useEffect, useRef } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import Sidebar from "./Sidebar";
// // // import Header from "./Header";
// // // import { API_URL } from "../src/config";

// // // // ── Check tab definitions ──────────────────────────────────────────────────────
// // // const CHECK_TABS = [
// // //   { key: "employment", label: "Employment" },
// // //   { key: "education",  label: "Education"  },
// // //   { key: "address",    label: "Address"    },
// // //   { key: "database",   label: "Database"   },
// // //   { key: "criminal",   label: "Criminal"   },
// // //   { key: "drug",       label: "Drug Test"  },
// // //   { key: "court",      label: "Courtroom"  },
// // // ];

// // // // ── Which API check key maps to which verifier role ───────────────────────────
// // // const ROLE_CHECK_MAP = {
// // //   employment_verifier:  "employment",
// // //   education_verifier:   "education",
// // //   address_verifier:     "address",
// // //   database_verifier:    "database",
// // //   criminal_verifier:    "criminal",
// // //   drug_test_verifier:   "drug",
// // //   courtroom_verifier:   "court",
// // // };

// // // // ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
// // // const NORMALISE_CHECK = {
// // //   emp:        "employment",
// // //   employment: "employment",
// // //   edu:        "education",
// // //   education:  "education",
// // //   addr:       "address",
// // //   address:    "address",
// // //   db:         "database",
// // //   database:   "database",
// // //   criminal:   "criminal",
// // //   cri:        "criminal",
// // //   drug:       "drug",
// // //   drug_test:  "drug",
// // //   court:      "court",
// // //   courtroom:  "court",
// // // };

// // // // ── Field definitions per check type ──────────────────────────────────────────
// // // const CHECK_FIELDS = {
// // //   employment: [
// // //     { key: "company_name",       label: "Company Name",         type: "text" },
// // //     { key: "designation",        label: "Designation",          type: "text" },
// // //     { key: "employee_id",        label: "Employee ID",          type: "text" },
// // //     { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
// // //     { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
// // //     { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
// // //     { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
// // //     { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
// // //     { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
// // //     { key: "hr_phone",           label: "HR Phone",             type: "text" },
// // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   education: [
// // //     { key: "institution_name",   label: "Institution Name",     type: "text" },
// // //     { key: "degree",             label: "Degree / Certificate", type: "text" },
// // //     { key: "course",             label: "Course / Specialization", type: "text" },
// // //     { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
// // //     { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
// // //     { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
// // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
// // //     { key: "result_link",        label: "Result Link (URL)",    type: "text" },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   address: [
// // //     { key: "address_line",       label: "Address",              type: "text" },
// // //     { key: "city",               label: "City",                 type: "text" },
// // //     { key: "state",              label: "State",                type: "text" },
// // //     { key: "pincode",            label: "Pincode",               type: "text" },
// // //     { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
// // //     { key: "years_at_address",   label: "Years at Address",     type: "text" },
// // //     { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
// // //     { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
// // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   database: [
// // //     { key: "db_checked",         label: "Databases Checked",    type: "text" },
// // //     { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
// // //     { key: "match_details",      label: "Match Details",        type: "textarea" },
// // //     { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
// // //     { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   criminal: [
// // //     { key: "court_checked",      label: "Courts Checked",       type: "text" },
// // //     { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
// // //     { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
// // //     { key: "state_checked",      label: "State",                type: "text" },
// // //     { key: "district_checked",   label: "District",             type: "text" },
// // //     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   drug: [
// // //     { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
// // //     { key: "lab_name",           label: "Lab Name",             type: "text" },
// // //     { key: "test_date",          label: "Test Date",            type: "date" },
// // //     { key: "substances_tested",  label: "Substances Tested",    type: "text" },
// // //     { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
// // //     { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // //   court: [
// // //     { key: "court_name",         label: "Court Name",           type: "text" },
// // //     { key: "case_number",        label: "Case Number",          type: "text" },
// // //     { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
// // //     { key: "filing_date",        label: "Filing Date",          type: "date" },
// // //     { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
// // //     { key: "next_date",          label: "Next Hearing Date",    type: "date" },
// // //     { key: "remarks",            label: "Remarks",              type: "textarea" },
// // //   ],
// // // };

// // // // ── Maps client-submitted field keys (from CheckDetailForm.jsx /
// // // //    checkFormsConfig.js, stored in case.check_details[checkKey].fields) onto
// // // //    the verifier's own field keys below. Only fields that genuinely exist on
// // // //    both sides are mapped — verifier-only fields (verification mode, HR
// // // //    contact, remarks, etc.) are intentionally left out so they stay blank
// // // //    for the verifier to fill in themselves.
// // // const CLIENT_TO_VERIFIER_FIELD_MAP = {
// // //   employment: {
// // //     lastCompanyName: "company_name",
// // //     dateOfJoining:   "date_of_joining",
// // //     dateOfLeaving:   "date_of_leaving",
// // //     salary:          "last_salary",
// // //   },
// // //   education: {
// // //     instituteName:  "institution_name",
// // //     qualification:  "degree",
// // //     rollNo:         "roll_number",
// // //     yearOfPassing:  "year_of_passing",
// // //   },
// // //   address: {
// // //     address: "address_line",
// // //     city:    "city",
// // //     state:   "state",
// // //     pinCode: "pincode",
// // //   },
// // //   // database / criminal / drug / court: client collects no fields for these
// // //   // yet (see checkFormsConfig.js), so there's nothing to prefill — verifiers
// // //   // fill these entirely from scratch.
// // // };

// // // // Builds the verifier's starting form for a given check, preferring a saved
// // // // verifier draft (check_results[checkKey].form_data) if one exists, and
// // // // otherwise prefilling whatever overlaps from the client's submitted data.
// // // function buildPrefilledForm(caseObj, checkKey) {
// // //   const draft = caseObj?.check_results?.[checkKey]?.form_data;
// // //   if (draft && Object.keys(draft).length > 0) return { form: draft, source: "draft" };

// // //   const clientFields = caseObj?.check_details?.[checkKey]?.fields;
// // //   const map = CLIENT_TO_VERIFIER_FIELD_MAP[checkKey];
// // //   if (!clientFields || !map) return { form: {}, source: null };

// // //   const prefilled = {};
// // //   Object.entries(map).forEach(([clientKey, verifierKey]) => {
// // //     const val = clientFields[clientKey];
// // //     if (val && String(val).trim() !== "") prefilled[verifierKey] = val;
// // //   });
// // //   return { form: prefilled, source: Object.keys(prefilled).length > 0 ? "client" : null };
// // // }

// // // const PRIORITY_META = {
// // //   HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
// // //   MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // //   MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
// // //   LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
// // //   normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
// // // };

// // // const OUTCOME_OPTS = [
// // //   { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
// // //   { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
// // //   { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
// // // ];

// // // const STATUS_META = {
// // //   "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
// // //   "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
// // //   "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
// // //   "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
// // //   "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
// // // };

// // // // ── Helpers ────────────────────────────────────────────────────────────────────
// // // function getUser() {
// // //   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// // // }

// // // function getToken() { return localStorage.getItem("token"); }

// // // function normChecks(raw) {
// // //   if (!raw) return [];
// // //   const arr = Array.isArray(raw)
// // //     ? raw
// // //     : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
// // //   return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
// // // }

// // // function calcTAT(createdAt) {
// // //   if (!createdAt) return "—";
// // //   const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
// // //   return days === 0 ? "Today" : `${days}d`;
// // // }

// // // function normPriority(p) {
// // //   if (!p) return "LOW";
// // //   return String(p).toUpperCase();
// // // }

// // // // ── Shared input styles ────────────────────────────────────────────────────────
// // // const labelSt = {
// // //   display: "block", fontSize: "11px", fontWeight: 700,
// // //   color: "#475569", marginBottom: "5px",
// // //   textTransform: "uppercase", letterSpacing: "0.4px",
// // // };
// // // const inputSt = {
// // //   width: "100%", padding: "9px 12px",
// // //   border: "1.5px solid #e2e8f0", borderRadius: "8px",
// // //   fontSize: "13px", color: "#1e293b", background: "#f8fafc",
// // //   outline: "none", fontFamily: "inherit", boxSizing: "border-box",
// // // };
// // // const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// // // // ── FormField sub-component ────────────────────────────────────────────────────
// // // function FormField({ f, value, onChange }) {
// // //   if (f.type === "textarea") return (
// // //     <div style={{ gridColumn: "1 / -1" }}>
// // //       <label style={labelSt}>{f.label}</label>
// // //       <textarea
// // //         rows={3} value={value} onChange={e => onChange(e.target.value)}
// // //         placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
// // //       />
// // //     </div>
// // //   );
// // //   if (f.type === "select") return (
// // //     <div>
// // //       <label style={labelSt}>{f.label}</label>
// // //       <select value={value} onChange={e => onChange(e.target.value)}
// // //         style={{ ...inputSt, cursor: "pointer" }}>
// // //         <option value="">— Select —</option>
// // //         {f.options.map(o => <option key={o} value={o}>{o}</option>)}
// // //       </select>
// // //     </div>
// // //   );
// // //   return (
// // //     <div>
// // //       <label style={labelSt}>{f.label}</label>
// // //       <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
// // //         placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
// // //         style={inputSt} />
// // //     </div>
// // //   );
// // // }

// // // // ── Main Component ─────────────────────────────────────────────────────────────
// // // export default function Verifyer() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const user     = getUser();
// // //   const token    = getToken();

// // //   // Role resolution
// // //   const role           = user.role || "";
// // //   const isAdmin        = role === "admin";
// // //   const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

// // //   // ── Sidebar view: "active" | "completed"
// // //   const sidebarView = new URLSearchParams(location.search).get("view") || "active";

// // //   // ── State ─────────────────────────────────────────────────────────────────
// // //   const [cases,        setCases]        = useState([]);
// // //   const [loading,      setLoading]      = useState(true);
// // //   const [selectedCase, setSelectedCase] = useState(null);
// // //   const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
// // //   const [search,       setSearch]       = useState("");

// // //   // Form
// // //   const [form,       setForm]       = useState({});
// // //   const [prefillSource, setPrefillSource] = useState(null); // "client" | "draft" | null
// // //   const [outcome,    setOutcome]    = useState("");
// // //   const [saving,     setSaving]     = useState(false);
// // //   const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

// // //   // Comments
// // //   const [comments,      setComments]      = useState([]);
// // //   const [commentInput,  setCommentInput]  = useState("");
// // //   const commentsEndRef = useRef(null);

// // //   // ── Fetch real cases from API ──────────────────────────────────────────────
// // //   const fetchCases = () => {
// // //     setLoading(true);
// // //     fetch(`${API_URL}/api/cases`, {
// // //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// // //     })
// // //       .then(r => r.json())
// // //       .then(data => {
// // //         const raw = data.cases || [];
// // //         const normalised = raw.map(c => ({
// // //           ...c,
// // //           checks_raw:  c.checks,
// // //           checks_norm: normChecks(c.checks),
// // //           candidate:   c.candidate || c.candidate_name || "—",
// // //           priority:    normPriority(c.priority),
// // //           tat_display: calcTAT(c.created_at),
// // //         }));
// // //         setCases(normalised);
// // //         if (normalised.length > 0 && !selectedCase) {
// // //           const first = sidebarView === "completed"
// // //             ? normalised.find(c => c.status === "completed")
// // //             : normalised.find(c => c.status !== "completed");
// // //           setSelectedCase(first || normalised[0]);
// // //         }
// // //       })
// // //       .catch(console.error)
// // //       .finally(() => setLoading(false));
// // //   };

// // //   useEffect(() => { fetchCases(); }, []);

// // //   // Auto-scroll comments
// // //   useEffect(() => {
// // //     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [comments]);

// // //   // Reset form when case / check changes — prefill from the client's
// // //   // submitted details (or a saved verifier draft, if one exists) rather than
// // //   // always starting blank.
// // //   useEffect(() => {
// // //     const { form: prefilled, source } = buildPrefilledForm(selectedCase, activeCheck);
// // //     setForm(prefilled);
// // //     setPrefillSource(source);
// // //     setOutcome(selectedCase?.check_results?.[activeCheck]?.outcome || "");
// // //     setSaveMsg({ text: "", type: "" });
// // //   }, [selectedCase?.case_id, activeCheck]);

// // //   // Jump active check to first valid tab on case selection
// // //   useEffect(() => {
// // //     if (!selectedCase) return;
// // //     const validChecks = selectedCase.checks_norm;
// // //     if (validChecks.length === 0) return;
// // //     if (assignedCheck && validChecks.includes(assignedCheck)) {
// // //       setActiveCheck(assignedCheck);
// // //     } else if (!validChecks.includes(activeCheck)) {
// // //       setActiveCheck(validChecks[0]);
// // //     }
// // //   }, [selectedCase?.case_id]);

// // //   // ── Filtered queue lists ───────────────────────────────────────────────────
// // //   const activeCases    = cases.filter(c => c.status !== "completed");
// // //   const completedCases = cases.filter(c => c.status === "completed");

// // //   const filterBySearch = (list) => {
// // //     if (!search) return list;
// // //     const q = search.toLowerCase();
// // //     return list.filter(c =>
// // //       (c.case_id || "").toLowerCase().includes(q) ||
// // //       (c.candidate || "").toLowerCase().includes(q) ||
// // //       (c.client || c.client_name || "").toLowerCase().includes(q)
// // //     );
// // //   };

// // //   const queueList = filterBySearch(sidebarView === "completed" ? completedCases : activeCases);

// // //   // ── Tab accessibility ──────────────────────────────────────────────────────
// // //   // A tab is accessible if:
// // //   //   1. The case has that check type, AND
// // //   //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
// // //   const canAccessTab = (checkKey) => {
// // //     if (!selectedCase) return false;
// // //     const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
// // //     if (!caseHasCheck) return false;
// // //     if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
// // //     return checkKey === assignedCheck;                     // specialist verifier
// // //   };

// // //   // ── Select a case ──────────────────────────────────────────────────────────
// // //   const selectCase = (c) => {
// // //     setSelectedCase(c);
// // //     setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
// // //   };

// // //   // ── Save result ────────────────────────────────────────────────────────────
// // //   const handleSave = async (isDraft) => {
// // //     if (!outcome && !isDraft) {
// // //       setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
// // //       return;
// // //     }
// // //     setSaving(true);
// // //     setSaveMsg({ text: "", type: "" });
// // //     try {
// // //       const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
// // //         method: "POST",
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           "Content-Type": "application/json",
// // //           Accept: "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           check_type: activeCheck,
// // //           outcome:    outcome || "unable",
// // //           form_data:  form,
// // //           is_draft:   isDraft,
// // //         }),
// // //       });
// // //       if (!res.ok) throw new Error("Server error");
// // //       setSaveMsg({
// // //         text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
// // //         type: "success",
// // //       });
// // //       fetchCases();
// // //     } catch {
// // //       setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   // ── Send comment ───────────────────────────────────────────────────────────
// // //   const sendComment = () => {
// // //     if (!commentInput.trim()) return;
// // //     // TODO: POST /api/cases/{id}/comments
// // //     setComments(p => [...p, {
// // //       id:     Date.now(),
// // //       author: user.name || "Verifier",
// // //       avatar: (user.name || "V").charAt(0).toUpperCase(),
// // //       time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
// // //       text:   commentInput.trim(),
// // //     }]);
// // //     setCommentInput("");
// // //   };

// // //   // ── Case list item ─────────────────────────────────────────────────────────
// // //   const QueueItem = ({ c }) => {
// // //     const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
// // //     const sm       = STATUS_META[c.status] || STATUS_META["pending"];
// // //     const isActive = selectedCase?.case_id === c.case_id;
// // //     const checkLabels = c.checks_norm.map(k =>
// // //       CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
// // //     );

// // //     return (
// // //       <tr
// // //         className="boder-tbl active"
// // //         onClick={() => selectCase(c)}
// // //         style={{
// // //           cursor: "pointer",
// // //           background: isActive ? "#eef3ff" : undefined,
// // //           borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
// // //         }}
// // //       >
// // //         {/* Case ID + checks */}
// // //         <td>
// // //           <div className="criminal-case">
// // //             <p>
// // //               <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
// // //               <br />
// // //               <span style={{ fontSize: "11px", color: "#94a3b8" }}>
// // //                 {checkLabels.join(" · ")}
// // //               </span>
// // //             </p>
// // //           </div>
// // //         </td>

// // //         {/* Candidate name */}
// // //         <td>
// // //           <div className="client-names">{c.candidate}</div>
// // //         </td>

// // //         {/* Progress + TAT */}
// // //         <td>
// // //           <div className="custom-progress">
// // //             <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
// // //           </div>
// // //           <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
// // //         </td>

// // //         {/* Priority dot */}
// // //         <td>
// // //           <div className="parent-client-boxes">
// // //             <span
// // //               className="client-cases-box"
// // //               style={{ background: pm.dot }}
// // //               title={c.priority}
// // //             />
// // //           </div>
// // //         </td>
// // //       </tr>
// // //     );
// // //   };

// // //   // ── Middle panel: full detail of selected case ──────────────────────────────
// // //   const DetailPanel = () => {
// // //     if (!selectedCase) return (
// // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
// // //         <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
// // //       </div>
// // //     );

// // //     const fields = CHECK_FIELDS[activeCheck] || [];
// // //     const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
// // //     const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

// // //     return (
// // //       <>
// // //         {/* Header */}
// // //         <div style={{
// // //           background: "#27348B", color: "#fff", padding: "14px 18px",
// // //           fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
// // //           display: "flex", justifyContent: "space-between", alignItems: "center",
// // //         }}>
// // //           <span>
// // //             {selectedCase.case_id} — {selectedCase.candidate}
// // //           </span>
// // //           <span style={{
// // //             background: pm.bg, color: pm.color, fontSize: "11px",
// // //             fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
// // //           }}>
// // //             {selectedCase.priority}
// // //           </span>
// // //         </div>

// // //         {/* Check type tabs — only show checks present in this case */}
// // //         <div style={{
// // //           display: "flex", background: "#fff",
// // //           borderBottom: "1px solid #e2e8f0", overflowX: "auto",
// // //         }}>
// // //           {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
// // //             const accessible = canAccessTab(t.key);
// // //             const isActive   = activeCheck === t.key;
// // //             return (
// // //               <button
// // //                 key={t.key}
// // //                 onClick={() => accessible && setActiveCheck(t.key)}
// // //                 title={!accessible ? "Your role cannot access this check type" : ""}
// // //                 style={{
// // //                   padding: "11px 18px", border: "none", whiteSpace: "nowrap",
// // //                   borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
// // //                   borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
// // //                   background: isActive ? "#f0f4ff" : "#fff",
// // //                   color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
// // //                   fontWeight: isActive ? 700 : 400,
// // //                   fontSize: "13px",
// // //                   cursor: accessible ? "pointer" : "not-allowed",
// // //                   opacity: accessible ? 1 : 0.45,
// // //                   transition: "all 0.15s",
// // //                 }}
// // //               >
// // //                 {t.label}
// // //               </button>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* Scrollable form body */}
// // //         <div style={{
// // //           border: "1px solid #e2e8f0", borderTop: "none",
// // //           borderRadius: "0 0 6px 6px", background: "#fff",
// // //           maxHeight: "520px", overflowY: "auto", padding: "16px",
// // //         }}>

// // //           {/* Case summary strip */}
// // //           <div style={{
// // //             display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
// // //             gap: "10px", marginBottom: "18px",
// // //           }}>
// // //             {[
// // //               { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
// // //               { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
// // //               { label: "TAT",      value: selectedCase.tat_display },
// // //               { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
// // //             ].map(r => (
// // //               <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
// // //                 <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
// // //                 <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Prefill source banner */}
// // //           {prefillSource === "client" && (
// // //             <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px",
// // //               padding: "10px 14px", fontSize: "12px", color: "#1d4ed8", marginBottom: "16px", fontWeight: 600 }}>
// // //               ℹ Some fields below were prefilled from what the client/candidate already submitted. Please verify and correct as needed.
// // //             </div>
// // //           )}
// // //           {prefillSource === "draft" && (
// // //             <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "8px",
// // //               padding: "10px 14px", fontSize: "12px", color: "#6d28d9", marginBottom: "16px", fontWeight: 600 }}>
// // //               ↻ Resumed your saved draft for this check.
// // //             </div>
// // //           )}

// // //           {/* Outcome toggle */}
// // //           <div style={{ marginBottom: "16px" }}>
// // //             <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
// // //               Verification Outcome
// // //             </p>
// // //             <div style={{ display: "flex", gap: "8px" }}>
// // //               {OUTCOME_OPTS.map(o => (
// // //                 <button
// // //                   key={o.key}
// // //                   onClick={() => setOutcome(o.key)}
// // //                   style={{
// // //                     flex: 1, padding: "10px 8px", cursor: "pointer",
// // //                     border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
// // //                     borderRadius: "8px",
// // //                     background: outcome === o.key ? o.bg : "#f8fafc",
// // //                     color: outcome === o.key ? o.color : "#94a3b8",
// // //                     fontWeight: outcome === o.key ? 700 : 500,
// // //                     fontSize: "12px",
// // //                     transition: "all 0.15s",
// // //                   }}
// // //                 >
// // //                   {o.label}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Dynamic fields grid */}
// // //           {!canAccessTab(activeCheck) ? (
// // //             <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
// // //               Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
// // //             </div>
// // //           ) : (
// // //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
// // //               {fields.map(f => (
// // //                 <FormField
// // //                   key={f.key} f={f}
// // //                   value={form[f.key] || ""}
// // //                   onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
// // //                 />
// // //               ))}
// // //             </div>
// // //           )}

// // //           {/* Save message */}
// // //           {saveMsg.text && (
// // //             <div style={{
// // //               marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
// // //               background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
// // //               color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
// // //               fontSize: "13px", fontWeight: 600,
// // //             }}>
// // //               {saveMsg.text}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Action buttons */}
// // //         {canAccessTab(activeCheck) && (
// // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
// // //             <button
// // //               onClick={() => handleSave(true)}
// // //               disabled={saving}
// // //               style={{
// // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // //                 padding: "13px", background: "#27348B", color: "#fff", border: "none",
// // //                 borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
// // //               }}
// // //             >
// // //               💾 Save Draft
// // //             </button>
// // //             <button
// // //               onClick={() => handleSave(false)}
// // //               disabled={saving || !outcome}
// // //               style={{
// // //                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
// // //                 padding: "13px",
// // //                 background: saving || !outcome ? "#94a3b8" : "#10b981",
// // //                 color: "#fff", border: "none", borderRadius: "6px",
// // //                 fontWeight: 700, fontSize: "13px",
// // //                 cursor: saving || !outcome ? "not-allowed" : "pointer",
// // //               }}
// // //             >
// // //               {saving ? "Saving…" : "✔ Save & Mark Done"}
// // //             </button>
// // //           </div>
// // //         )}
// // //       </>
// // //     );
// // //   };

// // //   // ── Right panel: Comments ────────────────────────────────────────────────
// // //   const RightPanel = () => (
// // //     <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>

// // //       {/* Comments */}
// // //       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1, display: "flex", flexDirection: "column" }}>
// // //         <div style={{ background: "#27348B", padding: "13px 16px" }}>
// // //           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
// // //             COMMENTS & NOTES
// // //           </h3>
// // //         </div>
// // //         <div style={{ flex: 1, maxHeight: "460px", overflowY: "auto", padding: "12px 14px" }}>
// // //           {comments.length === 0 ? (
// // //             <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
// // //               No comments yet.
// // //             </p>
// // //           ) : (
// // //             comments.map((c, i) => (
// // //               <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
// // //                 <div style={{
// // //                   width: "30px", height: "30px", borderRadius: "50%",
// // //                   background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
// // //                   color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
// // //                   fontSize: "13px", fontWeight: 700, flexShrink: 0,
// // //                 }}>
// // //                   {c.avatar}
// // //                 </div>
// // //                 <div style={{ flex: 1 }}>
// // //                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
// // //                     <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
// // //                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
// // //                   </div>
// // //                   <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           )}
// // //           <div ref={commentsEndRef} />
// // //         </div>
// // //         <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
// // //           <input
// // //             type="text"
// // //             placeholder="Add a comment…"
// // //             value={commentInput}
// // //             onChange={e => setCommentInput(e.target.value)}
// // //             onKeyDown={e => e.key === "Enter" && sendComment()}
// // //             style={{
// // //               flex: 1, border: "none", padding: "11px 14px",
// // //               fontSize: "13px", outline: "none", background: "#fff",
// // //             }}
// // //           />
// // //           <button onClick={sendComment} style={{
// // //             background: "#27348B", border: "none", padding: "0 16px",
// // //             cursor: "pointer", color: "#fff",
// // //           }}>
// // //             <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // //               <line x1="22" y1="2" x2="11" y2="13" />
// // //               <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   // ── Render ─────────────────────────────────────────────────────────────────
// // //   return (
// // //     <>
// // //       <Sidebar />
// // //       <section id="content">
// // //         <Header />
// // //         <main>
// // //           <div className="dash-wrper">

// // //             {/* Page header */}
// // //             <div className="dash-upper-head">
// // //               <div className="left">
// // //                 <div className="dash-title-flex">
// // //                   <h3 className="dash-title-text">Verifier Workspace</h3>
// // //                   <span style={{
// // //                     fontSize: "12px", color: "#64748b",
// // //                     background: "#eef3ff", padding: "3px 10px", borderRadius: "20px",
// // //                   }}>
// // //                     {user.name || "Verifier"} — {role}
// // //                   </span>
// // //                   {assignedCheck && (
// // //                     <span style={{
// // //                       fontSize: "11px", color: "#fff",
// // //                       background: "#27348B", padding: "3px 10px", borderRadius: "20px",
// // //                     }}>
// // //                       Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //               <div className="right">
// // //                 <input
// // //                   type="text"
// // //                   className="dash-search-input"
// // //                   placeholder="Search case ID or candidate…"
// // //                   value={search}
// // //                   onChange={e => setSearch(e.target.value)}
// // //                 />
// // //                 {search && (
// // //                   <button onClick={() => setSearch("")}
// // //                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
// // //                     ×
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* View toggle: Active / Completed */}
// // //             <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
// // //               <button
// // //                 className={`tab-cta ${sidebarView === "active" ? "active" : ""}`}
// // //                 onClick={() => navigate("/Verifyer?view=active", { replace: true })}
// // //               >
// // //                 Active Cases
// // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // //                   {activeCases.length}
// // //                 </span>
// // //               </button>
// // //               <button
// // //                 className={`tab-cta ${sidebarView === "completed" ? "active" : ""}`}
// // //                 onClick={() => navigate("/Verifyer?view=completed", { replace: true })}
// // //               >
// // //                 Completed
// // //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// // //                   {completedCases.length}
// // //                 </span>
// // //               </button>
// // //             </div>

// // //             {/* Three-column layout: Queue | Form | Charges+Comments */}
// // //             <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

// // //               {/* ── LEFT: Case queue ── */}
// // //               <div className="down-table" style={{ margin: 0 }}>
// // //                 <div className="client-portal-cases">
// // //                   <h3>
// // //                     {sidebarView === "completed" ? "COMPLETED" : "ACTIVE"} ({queueList.length})
// // //                   </h3>
// // //                 </div>

// // //                 {loading ? (
// // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
// // //                 ) : queueList.length === 0 ? (
// // //                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
// // //                     No {sidebarView} cases found.
// // //                   </p>
// // //                 ) : (
// // //                   <table>
// // //                     <tbody>
// // //                       {queueList.map(c => <QueueItem key={c.case_id} c={c} />)}
// // //                     </tbody>
// // //                   </table>
// // //                 )}
// // //               </div>

// // //               {/* ── MIDDLE: Detail + form ── */}
// // //               <div className="second-card">
// // //                 <DetailPanel />
// // //               </div>

// // //               {/* ── RIGHT: Charges + Comments ── */}
// // //               <div className="thrid-card">
// // //                 <RightPanel />
// // //               </div>

// // //             </div>
// // //           </div>
// // //         </main>
// // //       </section>
// // //     </>
// // //   );
// // // }
// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { API_URL } from "../src/config";

// // ── Check tab definitions ──────────────────────────────────────────────────────
// const CHECK_TABS = [
//   { key: "employment", label: "Employment" },
//   { key: "education",  label: "Education"  },
//   { key: "address",    label: "Address"    },
//   { key: "database",   label: "Database"   },
//   { key: "criminal",   label: "Criminal"   },
//   { key: "drug",       label: "Drug Test"  },
//   { key: "court",      label: "Courtroom"  },
// ];

// // ── Which API check key maps to which verifier role ───────────────────────────
// const ROLE_CHECK_MAP = {
//   employment_verifier:  "employment",
//   education_verifier:   "education",
//   address_verifier:     "address",
//   database_verifier:    "database",
//   criminal_verifier:    "criminal",
//   drug_test_verifier:   "drug",
//   courtroom_verifier:   "court",
// };

// // ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
// const NORMALISE_CHECK = {
//   emp:        "employment",
//   employment: "employment",
//   edu:        "education",
//   education:  "education",
//   addr:       "address",
//   address:    "address",
//   db:         "database",
//   database:   "database",
//   criminal:   "criminal",
//   cri:        "criminal",
//   drug:       "drug",
//   drug_test:  "drug",
//   court:      "court",
//   courtroom:  "court",
// };

// // ── Field definitions per check type ──────────────────────────────────────────
// const CHECK_FIELDS = {
//   employment: [
//     { key: "company_name",       label: "Company Name",         type: "text" },
//     { key: "designation",        label: "Designation",          type: "text" },
//     { key: "employee_id",        label: "Employee ID",          type: "text" },
//     { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
//     { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
//     { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
//     { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
//     { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
//     { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
//     { key: "hr_phone",           label: "HR Phone",             type: "text" },
//     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   education: [
//     { key: "institution_name",   label: "Institution Name",     type: "text" },
//     { key: "degree",             label: "Degree / Certificate", type: "text" },
//     { key: "course",             label: "Course / Specialization", type: "text" },
//     { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
//     { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
//     { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
//     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
//     { key: "result_link",        label: "Result Link (URL)",    type: "text" },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   address: [
//     { key: "address_line",       label: "Address",              type: "text" },
//     { key: "city",               label: "City",                 type: "text" },
//     { key: "state",              label: "State",                type: "text" },
//     { key: "pincode",            label: "Pincode",               type: "text" },
//     { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
//     { key: "years_at_address",   label: "Years at Address",     type: "text" },
//     { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
//     { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
//     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   database: [
//     { key: "db_checked",         label: "Databases Checked",    type: "text" },
//     { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
//     { key: "match_details",      label: "Match Details",        type: "textarea" },
//     { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
//     { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   criminal: [
//     { key: "court_checked",      label: "Courts Checked",       type: "text" },
//     { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
//     { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
//     { key: "state_checked",      label: "State",                type: "text" },
//     { key: "district_checked",   label: "District",             type: "text" },
//     { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   drug: [
//     { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
//     { key: "lab_name",           label: "Lab Name",             type: "text" },
//     { key: "test_date",          label: "Test Date",            type: "date" },
//     { key: "substances_tested",  label: "Substances Tested",    type: "text" },
//     { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
//     { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
//   court: [
//     { key: "court_name",         label: "Court Name",           type: "text" },
//     { key: "case_number",        label: "Case Number",          type: "text" },
//     { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
//     { key: "filing_date",        label: "Filing Date",          type: "date" },
//     { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
//     { key: "next_date",          label: "Next Hearing Date",    type: "date" },
//     { key: "remarks",            label: "Remarks",              type: "textarea" },
//   ],
// };

// // ── Maps client-submitted field keys (from CheckDetailForm.jsx /
// //    checkFormsConfig.js, stored in case.check_details[checkKey].fields) onto
// //    the verifier's own field keys below. Only fields that genuinely exist on
// //    both sides are mapped — verifier-only fields (verification mode, HR
// //    contact, remarks, etc.) are intentionally left out so they stay blank
// //    for the verifier to fill in themselves.
// const CLIENT_TO_VERIFIER_FIELD_MAP = {
//   employment: {
//     lastCompanyName: "company_name",
//     dateOfJoining:   "date_of_joining",
//     dateOfLeaving:   "date_of_leaving",
//     salary:          "last_salary",
//   },
//   education: {
//     instituteName:  "institution_name",
//     qualification:  "degree",
//     rollNo:         "roll_number",
//     yearOfPassing:  "year_of_passing",
//   },
//   address: {
//     address: "address_line",
//     city:    "city",
//     state:   "state",
//     pinCode: "pincode",
//   },
//   // database / criminal / drug / court: client collects no fields for these
//   // yet (see checkFormsConfig.js), so there's nothing to prefill — verifiers
//   // fill these entirely from scratch.
// };

// // Builds the verifier's starting form for a given check, preferring a saved
// // verifier draft (check_results[checkKey].form_data) if one exists, and
// // otherwise prefilling whatever overlaps from the client's submitted data.
// function buildPrefilledForm(caseObj, checkKey) {
//   const draft = caseObj?.check_results?.[checkKey]?.form_data;
//   if (draft && Object.keys(draft).length > 0) return { form: draft, source: "draft" };

//   const clientFields = caseObj?.check_details?.[checkKey]?.fields;
//   const map = CLIENT_TO_VERIFIER_FIELD_MAP[checkKey];
//   if (!clientFields || !map) return { form: {}, source: null };

//   const prefilled = {};
//   Object.entries(map).forEach(([clientKey, verifierKey]) => {
//     const val = clientFields[clientKey];
//     if (val && String(val).trim() !== "") prefilled[verifierKey] = val;
//   });
//   return { form: prefilled, source: Object.keys(prefilled).length > 0 ? "client" : null };
// }

// const PRIORITY_META = {
//   HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
//   MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
//   MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
//   LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
//   normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
// };

// const OUTCOME_OPTS = [
//   { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
//   { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
//   { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
// ];

// const STATUS_META = {
//   "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
//   "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
//   "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
//   "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
//   "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
// };

// // ── Date filters — same pattern as Intake.jsx ──────────────────────────────────
// const DATE_FILTERS = [
//   { key: "today",  label: "Today"      },
//   { key: "month",  label: "This Month" },
//   { key: "custom", label: "Custom"     },
//   { key: "all",    label: "All Time"   },
// ];

// // ── Valid sidebar/tab views for the queue ───────────────────────────────────────
// const VIEW_KEYS   = ["active", "completed", "clear", "discrepancy"];
// const VIEW_LABELS = { active: "ACTIVE", completed: "COMPLETED", clear: "CLEAR", discrepancy: "DISCREPANCY" };

// // ── Helpers ────────────────────────────────────────────────────────────────────
// function getUser() {
//   try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
// }

// function getToken() { return localStorage.getItem("token"); }

// function normChecks(raw) {
//   if (!raw) return [];
//   const arr = Array.isArray(raw)
//     ? raw
//     : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
//   return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
// }

// function calcTAT(createdAt) {
//   if (!createdAt) return "—";
//   const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
//   return days === 0 ? "Today" : `${days}d`;
// }

// function normPriority(p) {
//   if (!p) return "LOW";
//   return String(p).toUpperCase();
// }

// function getViewFromURL(search) {
//   const view = new URLSearchParams(search).get("view") || "active";
//   return VIEW_KEYS.includes(view) ? view : "active";
// }

// // ── Shared input styles ────────────────────────────────────────────────────────
// const labelSt = {
//   display: "block", fontSize: "11px", fontWeight: 700,
//   color: "#475569", marginBottom: "5px",
//   textTransform: "uppercase", letterSpacing: "0.4px",
// };
// const inputSt = {
//   width: "100%", padding: "9px 12px",
//   border: "1.5px solid #e2e8f0", borderRadius: "8px",
//   fontSize: "13px", color: "#1e293b", background: "#f8fafc",
//   outline: "none", fontFamily: "inherit", boxSizing: "border-box",
// };
// const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// // ── FormField sub-component ────────────────────────────────────────────────────
// function FormField({ f, value, onChange }) {
//   if (f.type === "textarea") return (
//     <div style={{ gridColumn: "1 / -1" }}>
//       <label style={labelSt}>{f.label}</label>
//       <textarea
//         rows={3} value={value} onChange={e => onChange(e.target.value)}
//         placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
//       />
//     </div>
//   );
//   if (f.type === "select") return (
//     <div>
//       <label style={labelSt}>{f.label}</label>
//       <select value={value} onChange={e => onChange(e.target.value)}
//         style={{ ...inputSt, cursor: "pointer" }}>
//         <option value="">— Select —</option>
//         {f.options.map(o => <option key={o} value={o}>{o}</option>)}
//       </select>
//     </div>
//   );
//   return (
//     <div>
//       <label style={labelSt}>{f.label}</label>
//       <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
//         placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
//         style={inputSt} />
//     </div>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function Verifyer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user     = getUser();
//   const token    = getToken();

//   // Role resolution
//   const role           = user.role || "";
//   const isAdmin        = role === "admin";
//   const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

//   // ── Sidebar/tab view: "active" | "completed" | "clear" | "discrepancy"
//   const sidebarView = getViewFromURL(location.search);

//   // ── State ─────────────────────────────────────────────────────────────────
//   const [cases,        setCases]        = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
//   const [search,       setSearch]       = useState("");

//   // Date filter — mirrors Intake.jsx
//   const [dateFilter, setDateFilter] = useState("month");
//   const [customFrom, setCustomFrom] = useState("");
//   const [customTo, setCustomTo]     = useState("");

//   // Form
//   const [form,       setForm]       = useState({});
//   const [prefillSource, setPrefillSource] = useState(null); // "client" | "draft" | null
//   const [outcome,    setOutcome]    = useState("");
//   const [saving,     setSaving]     = useState(false);
//   const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

//   // Comments
//   const [comments,      setComments]      = useState([]);
//   const [commentInput,  setCommentInput]  = useState("");
//   const commentsEndRef = useRef(null);

//   // ── Fetch real cases from API ──────────────────────────────────────────────
//   const fetchCases = () => {
//     setLoading(true);
//     fetch(`${API_URL}/api/cases`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     })
//       .then(r => r.json())
//       .then(data => {
//         const raw = data.cases || [];
//         const normalised = raw.map(c => ({
//           ...c,
//           checks_raw:  c.checks,
//           checks_norm: normChecks(c.checks),
//           candidate:   c.candidate || c.candidate_name || "—",
//           priority:    normPriority(c.priority),
//           tat_display: calcTAT(c.created_at),
//         }));
//         setCases(normalised);
//         if (normalised.length > 0 && !selectedCase) {
//           const first = sidebarView === "completed"
//             ? normalised.find(c => c.status === "completed")
//             : normalised.find(c => c.status !== "completed");
//           setSelectedCase(first || normalised[0]);
//         }
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { fetchCases(); }, []);

//   // Auto-scroll comments
//   useEffect(() => {
//     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [comments]);

//   // Reset form when case / check changes — prefill from the client's
//   // submitted details (or a saved verifier draft, if one exists) rather than
//   // always starting blank.
//   useEffect(() => {
//     const { form: prefilled, source } = buildPrefilledForm(selectedCase, activeCheck);
//     setForm(prefilled);
//     setPrefillSource(source);
//     setOutcome(selectedCase?.check_results?.[activeCheck]?.outcome || "");
//     setSaveMsg({ text: "", type: "" });
//   }, [selectedCase?.case_id, activeCheck]);

//   // Jump active check to first valid tab on case selection
//   useEffect(() => {
//     if (!selectedCase) return;
//     const validChecks = selectedCase.checks_norm;
//     if (validChecks.length === 0) return;
//     if (assignedCheck && validChecks.includes(assignedCheck)) {
//       setActiveCheck(assignedCheck);
//     } else if (!validChecks.includes(activeCheck)) {
//       setActiveCheck(validChecks[0]);
//     }
//   }, [selectedCase?.case_id]);

//   // ── Date range filter — same semantics as Intake.jsx ───────────────────────
//   const isInRange = (createdAt) => {
//     if (!createdAt) return true;
//     if (dateFilter === "all") return true;
//     const d   = new Date(createdAt);
//     const now = new Date();
//     if (dateFilter === "today") return d.toDateString() === now.toDateString();
//     if (dateFilter === "month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//     if (dateFilter === "custom") {
//       if (!customFrom && !customTo) return true;
//       const from = customFrom ? new Date(customFrom) : null;
//       const to   = customTo   ? new Date(customTo + "T23:59:59") : null;
//       if (from && d < from) return false;
//       if (to   && d > to)   return false;
//       return true;
//     }
//     return true;
//   };

//   // ── Does this case have any check whose outcome matches? Used for the
//   //    Clear / Discrepancy counts so they reflect the case as a whole,
//   //    rather than whichever check-type tab happens to be open right now.
//   const caseHasOutcome = (c, outcome) =>
//     Object.values(c.check_results || {}).some(r => r?.outcome === outcome);

//   // ── Filtered lists (status/outcome + date range) ────────────────────────────
//   const activeCases      = cases.filter(c => c.status !== "completed" && isInRange(c.created_at));
//   const completedCases   = cases.filter(c => c.status === "completed" && isInRange(c.created_at));
//   const clearCases       = cases.filter(c => isInRange(c.created_at) && caseHasOutcome(c, "clear"));
//   const discrepancyCases = cases.filter(c => isInRange(c.created_at) && caseHasOutcome(c, "discrepancy"));

//   const VIEW_LISTS = {
//     active:      activeCases,
//     completed:   completedCases,
//     clear:       clearCases,
//     discrepancy: discrepancyCases,
//   };

//   const filterBySearch = (list) => {
//     if (!search) return list;
//     const q = search.toLowerCase();
//     return list.filter(c =>
//       (c.case_id || "").toLowerCase().includes(q) ||
//       (c.candidate || "").toLowerCase().includes(q) ||
//       (c.client || c.client_name || "").toLowerCase().includes(q)
//     );
//   };

//   const queueList = filterBySearch(VIEW_LISTS[sidebarView] || activeCases);

//   // ── Tab accessibility ──────────────────────────────────────────────────────
//   // A tab is accessible if:
//   //   1. The case has that check type, AND
//   //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
//   const canAccessTab = (checkKey) => {
//     if (!selectedCase) return false;
//     const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
//     if (!caseHasCheck) return false;
//     if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
//     return checkKey === assignedCheck;                     // specialist verifier
//   };

//   // ── Select a case ──────────────────────────────────────────────────────────
//   const selectCase = (c) => {
//     setSelectedCase(c);
//     setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
//   };

//   // ── Save result ────────────────────────────────────────────────────────────
//   const handleSave = async (isDraft) => {
//     if (!outcome && !isDraft) {
//       setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
//       return;
//     }
//     setSaving(true);
//     setSaveMsg({ text: "", type: "" });
//     try {
//       const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           check_type: activeCheck,
//           outcome:    outcome || "unable",
//           form_data:  form,
//           is_draft:   isDraft,
//         }),
//       });
//       if (!res.ok) throw new Error("Server error");
//       setSaveMsg({
//         text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
//         type: "success",
//       });
//       fetchCases();
//     } catch {
//       setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Send comment ───────────────────────────────────────────────────────────
//   const sendComment = () => {
//     if (!commentInput.trim()) return;
//     // TODO: POST /api/cases/{id}/comments
//     setComments(p => [...p, {
//       id:     Date.now(),
//       author: user.name || "Verifier",
//       avatar: (user.name || "V").charAt(0).toUpperCase(),
//       time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
//       text:   commentInput.trim(),
//     }]);
//     setCommentInput("");
//   };

//   // ── Case list item ─────────────────────────────────────────────────────────
//   const QueueItem = ({ c }) => {
//     const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
//     const sm       = STATUS_META[c.status] || STATUS_META["pending"];
//     const isActive = selectedCase?.case_id === c.case_id;
//     const checkLabels = c.checks_norm.map(k =>
//       CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
//     );

//     return (
//       <tr
//         className="boder-tbl active"
//         onClick={() => selectCase(c)}
//         style={{
//           cursor: "pointer",
//           background: isActive ? "#eef3ff" : undefined,
//           borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
//         }}
//       >
//         {/* Case ID + checks */}
//         <td>
//           <div className="criminal-case">
//             <p>
//               <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
//               <br />
//               <span style={{ fontSize: "11px", color: "#94a3b8" }}>
//                 {checkLabels.join(" · ")}
//               </span>
//             </p>
//           </div>
//         </td>

//         {/* Candidate name */}
//         <td>
//           <div className="client-names">{c.candidate}</div>
//         </td>

//         {/* Progress + TAT */}
//         <td>
//           <div className="custom-progress">
//             <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
//           </div>
//           <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
//         </td>

//         {/* Priority dot */}
//         <td>
//           <div className="parent-client-boxes">
//             <span
//               className="client-cases-box"
//               style={{ background: pm.dot }}
//               title={c.priority}
//             />
//           </div>
//         </td>
//       </tr>
//     );
//   };

//   // ── Middle panel: full detail of selected case ──────────────────────────────
//   const DetailPanel = () => {
//     if (!selectedCase) return (
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
//         <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
//       </div>
//     );

//     const fields = CHECK_FIELDS[activeCheck] || [];
//     const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
//     const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

//     return (
//       <>
//         {/* Header */}
//         <div style={{
//           background: "#27348B", color: "#fff", padding: "14px 18px",
//           fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
//           display: "flex", justifyContent: "space-between", alignItems: "center",
//         }}>
//           <span>
//             {selectedCase.case_id} — {selectedCase.candidate}
//           </span>
//           <span style={{
//             background: pm.bg, color: pm.color, fontSize: "11px",
//             fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
//           }}>
//             {selectedCase.priority}
//           </span>
//         </div>

//         {/* Check type tabs — only show checks present in this case */}
//         <div style={{
//           display: "flex", background: "#fff",
//           borderBottom: "1px solid #e2e8f0", overflowX: "auto",
//         }}>
//           {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
//             const accessible = canAccessTab(t.key);
//             const isActive   = activeCheck === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => accessible && setActiveCheck(t.key)}
//                 title={!accessible ? "Your role cannot access this check type" : ""}
//                 style={{
//                   padding: "11px 18px", border: "none", whiteSpace: "nowrap",
//                   borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
//                   borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
//                   background: isActive ? "#f0f4ff" : "#fff",
//                   color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
//                   fontWeight: isActive ? 700 : 400,
//                   fontSize: "13px",
//                   cursor: accessible ? "pointer" : "not-allowed",
//                   opacity: accessible ? 1 : 0.45,
//                   transition: "all 0.15s",
//                 }}
//               >
//                 {t.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Scrollable form body */}
//         <div style={{
//           border: "1px solid #e2e8f0", borderTop: "none",
//           borderRadius: "0 0 6px 6px", background: "#fff",
//           maxHeight: "520px", overflowY: "auto", padding: "16px",
//         }}>

//           {/* Case summary strip */}
//           <div style={{
//             display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "10px", marginBottom: "18px",
//           }}>
//             {[
//               { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
//               { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
//               { label: "TAT",      value: selectedCase.tat_display },
//               { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
//             ].map(r => (
//               <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
//                 <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
//                 <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
//               </div>
//             ))}
//           </div>

//           {/* Prefill source banner */}
//           {prefillSource === "client" && (
//             <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px",
//               padding: "10px 14px", fontSize: "12px", color: "#1d4ed8", marginBottom: "16px", fontWeight: 600 }}>
//               ℹ Some fields below were prefilled from what the client/candidate already submitted. Please verify and correct as needed.
//             </div>
//           )}
//           {prefillSource === "draft" && (
//             <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "8px",
//               padding: "10px 14px", fontSize: "12px", color: "#6d28d9", marginBottom: "16px", fontWeight: 600 }}>
//               ↻ Resumed your saved draft for this check.
//             </div>
//           )}

//           {/* Outcome toggle */}
//           <div style={{ marginBottom: "16px" }}>
//             <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
//               Verification Outcome
//             </p>
//             <div style={{ display: "flex", gap: "8px" }}>
//               {OUTCOME_OPTS.map(o => (
//                 <button
//                   key={o.key}
//                   onClick={() => setOutcome(o.key)}
//                   style={{
//                     flex: 1, padding: "10px 8px", cursor: "pointer",
//                     border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
//                     borderRadius: "8px",
//                     background: outcome === o.key ? o.bg : "#f8fafc",
//                     color: outcome === o.key ? o.color : "#94a3b8",
//                     fontWeight: outcome === o.key ? 700 : 500,
//                     fontSize: "12px",
//                     transition: "all 0.15s",
//                   }}
//                 >
//                   {o.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Dynamic fields grid */}
//           {!canAccessTab(activeCheck) ? (
//             <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
//               Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               {fields.map(f => (
//                 <FormField
//                   key={f.key} f={f}
//                   value={form[f.key] || ""}
//                   onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Save message */}
//           {saveMsg.text && (
//             <div style={{
//               marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
//               background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
//               color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
//               fontSize: "13px", fontWeight: 600,
//             }}>
//               {saveMsg.text}
//             </div>
//           )}
//         </div>

//         {/* Action buttons */}
//         {canAccessTab(activeCheck) && (
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
//             <button
//               onClick={() => handleSave(true)}
//               disabled={saving}
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
//                 padding: "13px", background: "#27348B", color: "#fff", border: "none",
//                 borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
//               }}
//             >
//               💾 Save Draft
//             </button>
//             <button
//               onClick={() => handleSave(false)}
//               disabled={saving || !outcome}
//               style={{
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
//                 padding: "13px",
//                 background: saving || !outcome ? "#94a3b8" : "#10b981",
//                 color: "#fff", border: "none", borderRadius: "6px",
//                 fontWeight: 700, fontSize: "13px",
//                 cursor: saving || !outcome ? "not-allowed" : "pointer",
//               }}
//             >
//               {saving ? "Saving…" : "✔ Save & Mark Done"}
//             </button>
//           </div>
//         )}
//       </>
//     );
//   };

//   // ── Right panel: Comments ────────────────────────────────────────────────
//   const RightPanel = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>

//       {/* Comments */}
//       <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1, display: "flex", flexDirection: "column" }}>
//         <div style={{ background: "#27348B", padding: "13px 16px" }}>
//           <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
//             COMMENTS & NOTES
//           </h3>
//         </div>
//         <div style={{ flex: 1, maxHeight: "460px", overflowY: "auto", padding: "12px 14px" }}>
//           {comments.length === 0 ? (
//             <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
//               No comments yet.
//             </p>
//           ) : (
//             comments.map((c, i) => (
//               <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
//                 <div style={{
//                   width: "30px", height: "30px", borderRadius: "50%",
//                   background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
//                   color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: "13px", fontWeight: 700, flexShrink: 0,
//                 }}>
//                   {c.avatar}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
//                     <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
//                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
//                   </div>
//                   <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={commentsEndRef} />
//         </div>
//         <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
//           <input
//             type="text"
//             placeholder="Add a comment…"
//             value={commentInput}
//             onChange={e => setCommentInput(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && sendComment()}
//             style={{
//               flex: 1, border: "none", padding: "11px 14px",
//               fontSize: "13px", outline: "none", background: "#fff",
//             }}
//           />
//           <button onClick={sendComment} style={{
//             background: "#27348B", border: "none", padding: "0 16px",
//             cursor: "pointer", color: "#fff",
//           }}>
//             <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="22" y1="2" x2="11" y2="13" />
//               <polygon points="22 2 15 22 11 13 2 9 22 2" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* Page header */}
//             <div className="dash-upper-head">
//               <div className="left">
//                 <div className="dash-title-flex">
//                   <h3 className="dash-title-text">Verifier Workspace</h3>
//                   <span style={{
//                     fontSize: "12px", color: "#64748b",
//                     background: "#eef3ff", padding: "3px 10px", borderRadius: "20px",
//                   }}>
//                     {user.name || "Verifier"} — {role}
//                   </span>
//                   {assignedCheck && (
//                     <span style={{
//                       fontSize: "11px", color: "#fff",
//                       background: "#27348B", padding: "3px 10px", borderRadius: "20px",
//                     }}>
//                       Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="right">
//                 <input
//                   type="text"
//                   className="dash-search-input"
//                   placeholder="Search case ID or candidate…"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                 />
//                 {search && (
//                   <button onClick={() => setSearch("")}
//                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
//                     ×
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Date filters — same pattern as Intake.jsx */}
//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
//               {DATE_FILTERS.map(df => (
//                 <button
//                   key={df.key}
//                   className={`tab-cta ${dateFilter === df.key ? "active" : ""}`}
//                   onClick={() => setDateFilter(df.key)}
//                 >
//                   {df.label}
//                 </button>
//               ))}
//               {dateFilter === "custom" && (
//                 <>
//                   <input
//                     type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
//                     style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
//                   />
//                   <span style={{ color: "#94a3b8" }}>→</span>
//                   <input
//                     type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
//                     style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
//                   />
//                 </>
//               )}
//             </div>

//             {/* ── Stat cards — now double as the queue-view selector (replaces the old tab row) ── */}
//             <div className="cards-head-dash">
//               {[
//                 { key: "active",      cls: "bdr-total",    count: activeCases.length,      label: "Active" },
//                 { key: "completed",   cls: "bdr-com",       count: completedCases.length,   label: "Completed" },
//                 { key: "clear",       cls: "bdr-progress",  count: clearCases.length,       label: "Clear" },
//                 { key: "discrepancy", cls: "bdr-rate",      count: discrepancyCases.length,  label: "Discrepancy" },
//               ].map(card => (
//                 <div
//                   key={card.key}
//                   className={`card-inner-dash ${card.cls}`}
//                   onClick={() => navigate(`/Verifyer?view=${card.key}`, { replace: true })}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={e => e.key === "Enter" && navigate(`/Verifyer?view=${card.key}`, { replace: true })}
//                   style={{
//                     cursor: "pointer",
//                     outline: sidebarView === card.key ? "2px solid #27348B" : "none",
//                     outlineOffset: "-2px",
//                   }}
//                 >
//                   <h4>{loading ? "—" : card.count}</h4>
//                   <p>{card.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Three-column layout: Queue | Form | Charges+Comments */}
//             <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

//               {/* ── LEFT: Case queue ── */}
//               <div className="down-table" style={{ margin: 0 }}>
//                 <div className="client-portal-cases">
//                   <h3>
//                     {VIEW_LABELS[sidebarView] || "ACTIVE"} ({queueList.length})
//                   </h3>
//                 </div>

//                 {loading ? (
//                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
//                 ) : queueList.length === 0 ? (
//                   <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
//                     No {sidebarView} cases found.
//                   </p>
//                 ) : (
//                   <table>
//                     <tbody>
//                       {queueList.map(c => <QueueItem key={c.case_id} c={c} />)}
//                     </tbody>
//                   </table>
//                 )}
//               </div>

//               {/* ── MIDDLE: Detail + form ── */}
//               <div className="second-card">
//                 <DetailPanel />
//               </div>

//               {/* ── RIGHT: Charges + Comments ── */}
//               <div className="thrid-card">
//                 <RightPanel />
//               </div>

//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";

// ── Check tab definitions ──────────────────────────────────────────────────────
const CHECK_TABS = [
  { key: "employment", label: "Employment" },
  { key: "education",  label: "Education"  },
  { key: "address",    label: "Address"    },
  { key: "database",   label: "Database"   },
  { key: "criminal",   label: "Criminal"   },
  { key: "drug",       label: "Drug Test"  },
  { key: "court",      label: "Courtroom"  },
];

// ── Which API check key maps to which verifier role ───────────────────────────
const ROLE_CHECK_MAP = {
  employment_verifier:  "employment",
  education_verifier:   "education",
  address_verifier:     "address",
  database_verifier:    "database",
  criminal_verifier:    "criminal",
  drug_test_verifier:   "drug",
  courtroom_verifier:   "court",
};

// ── Normalise check keys coming from the API (emp→employment, edu→education…) ─
const NORMALISE_CHECK = {
  emp:        "employment",
  employment: "employment",
  edu:        "education",
  education:  "education",
  addr:       "address",
  address:    "address",
  db:         "database",
  database:   "database",
  criminal:   "criminal",
  cri:        "criminal",
  drug:       "drug",
  drug_test:  "drug",
  court:      "court",
  courtroom:  "court",
};

// ── Field definitions per check type ──────────────────────────────────────────
const CHECK_FIELDS = {
  employment: [
    { key: "company_name",       label: "Company Name",         type: "text" },
    { key: "designation",        label: "Designation",          type: "text" },
    { key: "employee_id",        label: "Employee ID",          type: "text" },
    { key: "date_of_joining",    label: "Date of Joining",      type: "date" },
    { key: "date_of_leaving",    label: "Date of Leaving",      type: "date" },
    { key: "last_salary",        label: "Last Salary (₹)",      type: "text" },
    { key: "reason_for_leaving", label: "Reason for Leaving",   type: "text" },
    { key: "reporting_manager",  label: "Reporting Manager",    type: "text" },
    { key: "hr_contact",         label: "HR Contact Email",     type: "text" },
    { key: "hr_phone",           label: "HR Phone",             type: "text" },
    { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Email", "Phone", "Email + Phone", "Portal", "Visit"] },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  education: [
    { key: "institution_name",   label: "Institution Name",     type: "text" },
    { key: "degree",             label: "Degree / Certificate", type: "text" },
    { key: "course",             label: "Course / Specialization", type: "text" },
    { key: "roll_number",        label: "Roll / Reg. Number",   type: "text" },
    { key: "year_of_passing",    label: "Year of Passing",      type: "text" },
    { key: "percentage",         label: "Percentage / CGPA",    type: "text" },
    { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["University Portal", "Email", "Phone", "Visit", "Result Link"] },
    { key: "result_link",        label: "Result Link (URL)",    type: "text" },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  address: [
    { key: "address_line",       label: "Address",              type: "text" },
    { key: "city",               label: "City",                 type: "text" },
    { key: "state",              label: "State",                type: "text" },
    { key: "pincode",            label: "Pincode",               type: "text" },
    { key: "residency_type",     label: "Residency Type",       type: "select", options: ["Owned", "Rented", "PG / Hostel", "Family Home"] },
    { key: "years_at_address",   label: "Years at Address",     type: "text" },
    { key: "neighbour_name",     label: "Neighbour / Ref Name", type: "text" },
    { key: "neighbour_phone",    label: "Neighbour Phone",      type: "text" },
    { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Physical Visit", "Digital", "Phone"] },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  database: [
    { key: "db_checked",         label: "Databases Checked",    type: "text" },
    { key: "match_found",        label: "Match Found?",         type: "select", options: ["No Match", "Potential Match", "Confirmed Match"] },
    { key: "match_details",      label: "Match Details",        type: "textarea" },
    { key: "pan_verified",       label: "PAN Verified?",        type: "select", options: ["Yes", "No", "Not Applicable"] },
    { key: "aadhar_verified",    label: "Aadhaar Verified?",    type: "select", options: ["Yes", "No", "Not Applicable"] },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  criminal: [
    { key: "court_checked",      label: "Courts Checked",       type: "text" },
    { key: "police_verified",    label: "Police Record Check",  type: "select", options: ["Clear", "Record Found", "Not Accessible"] },
    { key: "case_details",       label: "Case Details (if any)",type: "textarea" },
    { key: "state_checked",      label: "State",                type: "text" },
    { key: "district_checked",   label: "District",             type: "text" },
    { key: "verification_mode",  label: "Verification Mode",    type: "select", options: ["Online Portal", "Physical", "Phone"] },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  drug: [
    { key: "test_type",          label: "Test Type",            type: "select", options: ["Urine Test", "Blood Test", "Hair Follicle", "Saliva Test"] },
    { key: "lab_name",           label: "Lab Name",             type: "text" },
    { key: "test_date",          label: "Test Date",            type: "date" },
    { key: "substances_tested",  label: "Substances Tested",    type: "text" },
    { key: "result",             label: "Test Result",          type: "select", options: ["Negative (Clear)", "Positive", "Inconclusive", "Refused"] },
    { key: "lab_report_ref",     label: "Lab Report Ref No.",   type: "text" },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
  court: [
    { key: "court_name",         label: "Court Name",           type: "text" },
    { key: "case_number",        label: "Case Number",          type: "text" },
    { key: "case_type",          label: "Case Type",            type: "select", options: ["Civil", "Criminal", "Labour", "Consumer", "Other"] },
    { key: "filing_date",        label: "Filing Date",          type: "date" },
    { key: "current_status",     label: "Current Status",       type: "select", options: ["Active", "Disposed", "Appealed", "No Record Found"] },
    { key: "next_date",          label: "Next Hearing Date",    type: "date" },
    { key: "remarks",            label: "Remarks",              type: "textarea" },
  ],
};

// ── Maps client-submitted field keys (from CheckDetailForm.jsx /
//    checkFormsConfig.js, stored in case.check_details[checkKey].fields) onto
//    the verifier's own field keys below. Only fields that genuinely exist on
//    both sides are mapped — verifier-only fields (verification mode, HR
//    contact, remarks, etc.) are intentionally left out so they stay blank
//    for the verifier to fill in themselves.
const CLIENT_TO_VERIFIER_FIELD_MAP = {
  employment: {
    lastCompanyName: "company_name",
    dateOfJoining:   "date_of_joining",
    dateOfLeaving:   "date_of_leaving",
    salary:          "last_salary",
  },
  education: {
    instituteName:  "institution_name",
    qualification:  "degree",
    rollNo:         "roll_number",
    yearOfPassing:  "year_of_passing",
  },
  address: {
    address: "address_line",
    city:    "city",
    state:   "state",
    pinCode: "pincode",
  },
  // database / criminal / drug / court: client collects no fields for these
  // yet (see checkFormsConfig.js), so there's nothing to prefill — verifiers
  // fill these entirely from scratch.
};

// Builds the verifier's starting form for a given check, preferring a saved
// verifier draft (check_results[checkKey].form_data) if one exists, and
// otherwise prefilling whatever overlaps from the client's submitted data.
function buildPrefilledForm(caseObj, checkKey) {
  const draft = caseObj?.check_results?.[checkKey]?.form_data;
  if (draft && Object.keys(draft).length > 0) return { form: draft, source: "draft" };

  const clientFields = caseObj?.check_details?.[checkKey]?.fields;
  const map = CLIENT_TO_VERIFIER_FIELD_MAP[checkKey];
  if (!clientFields || !map) return { form: {}, source: null };

  const prefilled = {};
  Object.entries(map).forEach(([clientKey, verifierKey]) => {
    const val = clientFields[clientKey];
    if (val && String(val).trim() !== "") prefilled[verifierKey] = val;
  });
  return { form: prefilled, source: Object.keys(prefilled).length > 0 ? "client" : null };
}

const PRIORITY_META = {
  HIGH:   { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  MED:    { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
  MEDIUM: { bg: "#fef9c3", color: "#92400e", dot: "#f59e0b" },
  LOW:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  normal: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
};

const OUTCOME_OPTS = [
  { key: "clear",       label: "✔  Clear",            bg: "#f0fdf4", color: "#16a34a", border: "#16a34a" },
  { key: "discrepancy", label: "✗  Discrepancy",       bg: "#fef2f2", color: "#dc2626", border: "#dc2626" },
  { key: "unable",      label: "?  Unable to Verify",  bg: "#fffbeb", color: "#b45309", border: "#d97706" },
];

const STATUS_META = {
  "pending":     { color: "#f59e0b", pct: 20,  label: "Pending"     },
  "in-progress": { color: "#028090", pct: 60,  label: "In Progress" },
  "qc-review":   { color: "#7c3aed", pct: 85,  label: "QC Review"   },
  "completed":   { color: "#10b981", pct: 100, label: "Completed"   },
  "on-hold":     { color: "#94a3b8", pct: 30,  label: "On Hold"     },
};

// ── Date filters — same pattern as Intake.jsx ──────────────────────────────────
const DATE_FILTERS = [
  { key: "today",  label: "Today"      },
  { key: "month",  label: "This Month" },
  { key: "custom", label: "Custom"     },
  { key: "all",    label: "All Time"   },
];

// ── Valid sidebar/tab views for the queue ───────────────────────────────────────
const VIEW_KEYS   = ["active", "completed", "clear", "discrepancy"];
const VIEW_LABELS = { active: "ACTIVE", completed: "COMPLETED", clear: "CLEAR", discrepancy: "DISCREPANCY" };

// ── Helpers ────────────────────────────────────────────────────────────────────
function getUser() {
  try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
}

function getToken() { return localStorage.getItem("token"); }

function normChecks(raw) {
  if (!raw) return [];
  const arr = Array.isArray(raw)
    ? raw
    : String(raw).split(/[,·|]/).map(s => s.trim()).filter(Boolean);
  return arr.map(k => NORMALISE_CHECK[k.toLowerCase()] || k.toLowerCase());
}

function calcTAT(createdAt) {
  if (!createdAt) return "—";
  const days = Math.floor((Date.now() - new Date(createdAt)) / 86400000);
  return days === 0 ? "Today" : `${days}d`;
}

function normPriority(p) {
  if (!p) return "LOW";
  return String(p).toUpperCase();
}

function getViewFromURL(search) {
  const view = new URLSearchParams(search).get("view") || "active";
  return VIEW_KEYS.includes(view) ? view : "active";
}

// ── Shared input styles ────────────────────────────────────────────────────────
const labelSt = {
  display: "block", fontSize: "11px", fontWeight: 700,
  color: "#475569", marginBottom: "5px",
  textTransform: "uppercase", letterSpacing: "0.4px",
};
const inputSt = {
  width: "100%", padding: "9px 12px",
  border: "1.5px solid #e2e8f0", borderRadius: "8px",
  fontSize: "13px", color: "#1e293b", background: "#f8fafc",
  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
};
const textareaSt = { ...inputSt, resize: "vertical", minHeight: "72px" };

// ── FormField sub-component ────────────────────────────────────────────────────
function FormField({ f, value, onChange }) {
  if (f.type === "textarea") return (
    <div style={{ gridColumn: "1 / -1" }}>
      <label style={labelSt}>{f.label}</label>
      <textarea
        rows={3} value={value} onChange={e => onChange(e.target.value)}
        placeholder={`Enter ${f.label.toLowerCase()}…`} style={textareaSt}
      />
    </div>
  );
  if (f.type === "select") return (
    <div>
      <label style={labelSt}>{f.label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...inputSt, cursor: "pointer" }}>
        <option value="">— Select —</option>
        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <div>
      <label style={labelSt}>{f.label}</label>
      <input type={f.type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={f.type === "date" ? "" : `Enter ${f.label.toLowerCase()}…`}
        style={inputSt} />
    </div>
  );
}

// ── QueueItem / DetailPanel / RightPanel ───────────────────────────────────────
// These three used to be defined *inside* the Verifyer component body. That's
// the reason typing in a form field lost focus after one character: every
// state update (e.g. updating `form` on each keystroke) re-ran Verifyer,
// which redefined these as brand-new functions each time. React identifies
// JSX components by function reference, so a new reference for <DetailPanel />
// every render made React treat it as a totally different component type and
// unmount + remount the whole subtree — killing the input's focus every time.
// Defining them here at module scope gives them a stable identity across
// renders, so React just re-renders in place instead of remounting. All the
// data they need now comes in as props instead of via closure.

function QueueItem({ c, selectedCase, selectCase }) {
  const pm       = PRIORITY_META[c.priority] || PRIORITY_META.LOW;
  const sm       = STATUS_META[c.status] || STATUS_META["pending"];
  const isActive = selectedCase?.case_id === c.case_id;
  const checkLabels = c.checks_norm.map(k =>
    CHECK_TABS.find(t => t.key === k)?.label?.slice(0, 3).toUpperCase() || k.slice(0, 3).toUpperCase()
  );

  return (
    <tr
      className="boder-tbl active"
      onClick={() => selectCase(c)}
      style={{
        cursor: "pointer",
        background: isActive ? "#eef3ff" : undefined,
        borderLeft: isActive ? "3px solid #2b3b8c" : "3px solid transparent",
      }}
    >
      {/* Case ID + checks */}
      <td>
        <div className="criminal-case">
          <p>
            <span style={{ fontWeight: 700, color: "#27348B" }}>{c.case_id}</span>
            <br />
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              {checkLabels.join(" · ")}
            </span>
          </p>
        </div>
      </td>

      {/* Candidate name */}
      <td>
        <div className="client-names">{c.candidate}</div>
      </td>

      {/* Progress + TAT */}
      <td>
        <div className="custom-progress">
          <div className="custom-progress-bar" style={{ width: `${sm.pct}%`, background: sm.color }} />
        </div>
        <p className="progress-client-text" style={{ color: sm.color }}>{c.tat_display}</p>
      </td>

      {/* Priority dot */}
      <td>
        <div className="parent-client-boxes">
          <span
            className="client-cases-box"
            style={{ background: pm.dot }}
            title={c.priority}
          />
        </div>
      </td>
    </tr>
  );
}

function DetailPanel({
  selectedCase, activeCheck, setActiveCheck, canAccessTab,
  form, setForm, prefillSource, outcome, setOutcome,
  saveMsg, saving, handleSave,
}) {
  if (!selectedCase) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
      <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to begin verification</p>
    </div>
  );

  const fields = CHECK_FIELDS[activeCheck] || [];
  const sm     = STATUS_META[selectedCase.status] || STATUS_META["pending"];
  const pm     = PRIORITY_META[selectedCase.priority] || PRIORITY_META.LOW;

  return (
    <>
      {/* Header */}
      <div style={{
        background: "#27348B", color: "#fff", padding: "14px 18px",
        fontWeight: 700, fontSize: "13px", borderRadius: "6px 6px 0 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>
          {selectedCase.case_id} — {selectedCase.candidate}
        </span>
        <span style={{
          background: pm.bg, color: pm.color, fontSize: "11px",
          fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
        }}>
          {selectedCase.priority}
        </span>
      </div>

      {/* Check type tabs — only show checks present in this case */}
      <div style={{
        display: "flex", background: "#fff",
        borderBottom: "1px solid #e2e8f0", overflowX: "auto",
      }}>
        {CHECK_TABS.filter(t => selectedCase.checks_norm.includes(t.key)).map((t, i, arr) => {
          const accessible = canAccessTab(t.key);
          const isActive   = activeCheck === t.key;
          return (
            <button
              key={t.key}
              onClick={() => accessible && setActiveCheck(t.key)}
              title={!accessible ? "Your role cannot access this check type" : ""}
              style={{
                padding: "11px 18px", border: "none", whiteSpace: "nowrap",
                borderRight: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
                borderBottom: isActive ? "3px solid #27348B" : "3px solid transparent",
                background: isActive ? "#f0f4ff" : "#fff",
                color: isActive ? "#27348B" : accessible ? "#64748b" : "#cbd5e1",
                fontWeight: isActive ? 700 : 400,
                fontSize: "13px",
                cursor: accessible ? "pointer" : "not-allowed",
                opacity: accessible ? 1 : 0.45,
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable form body */}
      <div style={{
        border: "1px solid #e2e8f0", borderTop: "none",
        borderRadius: "0 0 6px 6px", background: "#fff",
        maxHeight: "520px", overflowY: "auto", padding: "16px",
      }}>

        {/* Case summary strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px", marginBottom: "18px",
        }}>
          {[
            { label: "Client",   value: selectedCase.client || selectedCase.client_name || "—" },
            { label: "Status",   value: <span style={{ background: sm.color, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>{sm.label}</span> },
            { label: "TAT",      value: selectedCase.tat_display },
            { label: "Created",  value: selectedCase.created_at ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
          ].map(r => (
            <div key={r.label} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{r.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{r.value}</div>
            </div>
          ))}
        </div>

        {/* Prefill source banner */}
        {prefillSource === "client" && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px",
            padding: "10px 14px", fontSize: "12px", color: "#1d4ed8", marginBottom: "16px", fontWeight: 600 }}>
            ℹ Some fields below were prefilled from what the client/candidate already submitted. Please verify and correct as needed.
          </div>
        )}
        {prefillSource === "draft" && (
          <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "8px",
            padding: "10px 14px", fontSize: "12px", color: "#6d28d9", marginBottom: "16px", fontWeight: 600 }}>
            ↻ Resumed your saved draft for this check.
          </div>
        )}

        {/* Outcome toggle */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Verification Outcome
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {OUTCOME_OPTS.map(o => (
              <button
                key={o.key}
                onClick={() => setOutcome(o.key)}
                style={{
                  flex: 1, padding: "10px 8px", cursor: "pointer",
                  border: `2px solid ${outcome === o.key ? o.border : "#e2e8f0"}`,
                  borderRadius: "8px",
                  background: outcome === o.key ? o.bg : "#f8fafc",
                  color: outcome === o.key ? o.color : "#94a3b8",
                  fontWeight: outcome === o.key ? 700 : 500,
                  fontSize: "12px",
                  transition: "all 0.15s",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic fields grid */}
        {!canAccessTab(activeCheck) ? (
          <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px", background: "#f8fafc", borderRadius: "8px" }}>
            Your role does not have access to the <strong>{CHECK_TABS.find(t => t.key === activeCheck)?.label}</strong> check.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {fields.map(f => (
              <FormField
                key={f.key} f={f}
                value={form[f.key] || ""}
                onChange={v => setForm(p => ({ ...p, [f.key]: v }))}
              />
            ))}
          </div>
        )}

        {/* Save message */}
        {saveMsg.text && (
          <div style={{
            marginTop: "14px", padding: "10px 14px", borderRadius: "8px",
            background: saveMsg.type === "success" ? "#f0fdf4" : "#fef2f2",
            color:      saveMsg.type === "success" ? "#16a34a" : "#dc2626",
            fontSize: "13px", fontWeight: 600,
          }}>
            {saveMsg.text}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {canAccessTab(activeCheck) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "13px", background: "#27348B", color: "#fff", border: "none",
              borderRadius: "6px", fontWeight: 700, fontSize: "13px", cursor: "pointer",
            }}
          >
            💾 Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving || !outcome}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "13px",
              background: saving || !outcome ? "#94a3b8" : "#10b981",
              color: "#fff", border: "none", borderRadius: "6px",
              fontWeight: 700, fontSize: "13px",
              cursor: saving || !outcome ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving…" : "✔ Save & Mark Done"}
          </button>
        </div>
      )}
    </>
  );
}

function RightPanel({ comments, commentInput, setCommentInput, sendComment, commentsEndRef }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>

      {/* Comments */}
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#27348B", padding: "13px 16px" }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
            COMMENTS & NOTES
          </h3>
        </div>
        <div style={{ flex: 1, maxHeight: "460px", overflowY: "auto", padding: "12px 14px" }}>
          {comments.length === 0 ? (
            <p style={{ color: "#cbd5e1", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>
              No comments yet.
            </p>
          ) : (
            comments.map((c, i) => (
              <div key={c.id} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: i % 2 === 0 ? "#7c3aed" : "#0d9488",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 700, flexShrink: 0,
                }}>
                  {c.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>{c.author}</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={commentsEndRef} />
        </div>
        <div style={{ borderTop: "1px solid #e2e8f0", display: "flex", gap: "0" }}>
          <input
            type="text"
            placeholder="Add a comment…"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendComment()}
            style={{
              flex: 1, border: "none", padding: "11px 14px",
              fontSize: "13px", outline: "none", background: "#fff",
            }}
          />
          <button onClick={sendComment} style={{
            background: "#27348B", border: "none", padding: "0 16px",
            cursor: "pointer", color: "#fff",
          }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Verifyer() {
  const navigate = useNavigate();
  const location = useLocation();
  const user     = getUser();
  const token    = getToken();

  // Role resolution
  const role           = user.role || "";
  const isAdmin        = role === "admin";
  const assignedCheck  = ROLE_CHECK_MAP[role] || null; // null = admin / generic verifier sees all

  // ── Sidebar/tab view: "active" | "completed" | "clear" | "discrepancy"
  const sidebarView = getViewFromURL(location.search);

  // ── State ─────────────────────────────────────────────────────────────────
  const [cases,        setCases]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeCheck,  setActiveCheck]  = useState(assignedCheck || "employment");
  const [search,       setSearch]       = useState("");

  // Date filter — mirrors Intake.jsx
  const [dateFilter, setDateFilter] = useState("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo]     = useState("");

  // Form
  const [form,       setForm]       = useState({});
  const [prefillSource, setPrefillSource] = useState(null); // "client" | "draft" | null
  const [outcome,    setOutcome]    = useState("");
  const [saving,     setSaving]     = useState(false);
  const [saveMsg,    setSaveMsg]    = useState({ text: "", type: "" });

  // Comments
  const [comments,      setComments]      = useState([]);
  const [commentInput,  setCommentInput]  = useState("");
  const commentsEndRef = useRef(null);

  // ── Fetch real cases from API ──────────────────────────────────────────────
  const fetchCases = () => {
    setLoading(true);
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => r.json())
      .then(data => {
        const raw = data.cases || [];
        const normalised = raw.map(c => ({
          ...c,
          checks_raw:  c.checks,
          checks_norm: normChecks(c.checks),
          candidate:   c.candidate || c.candidate_name || "—",
          priority:    normPriority(c.priority),
          tat_display: calcTAT(c.created_at),
        }));
        setCases(normalised);
        if (normalised.length > 0 && !selectedCase) {
          const first = sidebarView === "completed"
            ? normalised.find(c => c.status === "completed")
            : normalised.find(c => c.status !== "completed");
          setSelectedCase(first || normalised[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCases(); }, []);

  // Auto-scroll comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Reset form when case / check changes — prefill from the client's
  // submitted details (or a saved verifier draft, if one exists) rather than
  // always starting blank.
  useEffect(() => {
    const { form: prefilled, source } = buildPrefilledForm(selectedCase, activeCheck);
    setForm(prefilled);
    setPrefillSource(source);
    setOutcome(selectedCase?.check_results?.[activeCheck]?.outcome || "");
    setSaveMsg({ text: "", type: "" });
  }, [selectedCase?.case_id, activeCheck]);

  // Jump active check to first valid tab on case selection
  useEffect(() => {
    if (!selectedCase) return;
    const validChecks = selectedCase.checks_norm;
    if (validChecks.length === 0) return;
    if (assignedCheck && validChecks.includes(assignedCheck)) {
      setActiveCheck(assignedCheck);
    } else if (!validChecks.includes(activeCheck)) {
      setActiveCheck(validChecks[0]);
    }
  }, [selectedCase?.case_id]);

  // ── Date range filter — same semantics as Intake.jsx ───────────────────────
  const isInRange = (createdAt) => {
    if (!createdAt) return true;
    if (dateFilter === "all") return true;
    const d   = new Date(createdAt);
    const now = new Date();
    if (dateFilter === "today") return d.toDateString() === now.toDateString();
    if (dateFilter === "month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (dateFilter === "custom") {
      if (!customFrom && !customTo) return true;
      const from = customFrom ? new Date(customFrom) : null;
      const to   = customTo   ? new Date(customTo + "T23:59:59") : null;
      if (from && d < from) return false;
      if (to   && d > to)   return false;
      return true;
    }
    return true;
  };

  // ── Does this case have any check whose outcome matches? Used for the
  //    Clear / Discrepancy counts so they reflect the case as a whole,
  //    rather than whichever check-type tab happens to be open right now.
  const caseHasOutcome = (c, outcome) =>
    Object.values(c.check_results || {}).some(r => r?.outcome === outcome);

  // ── Filtered lists (status/outcome + date range) ────────────────────────────
  const activeCases      = cases.filter(c => c.status !== "completed" && isInRange(c.created_at));
  const completedCases   = cases.filter(c => c.status === "completed" && isInRange(c.created_at));
  const clearCases       = cases.filter(c => isInRange(c.created_at) && caseHasOutcome(c, "clear"));
  const discrepancyCases = cases.filter(c => isInRange(c.created_at) && caseHasOutcome(c, "discrepancy"));

  const VIEW_LISTS = {
    active:      activeCases,
    completed:   completedCases,
    clear:       clearCases,
    discrepancy: discrepancyCases,
  };

  const filterBySearch = (list) => {
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(c =>
      (c.case_id || "").toLowerCase().includes(q) ||
      (c.candidate || "").toLowerCase().includes(q) ||
      (c.client || c.client_name || "").toLowerCase().includes(q)
    );
  };

  const queueList = filterBySearch(VIEW_LISTS[sidebarView] || activeCases);

  // ── Tab accessibility ──────────────────────────────────────────────────────
  // A tab is accessible if:
  //   1. The case has that check type, AND
  //   2. The verifier's role allows it (admin / generic verifier: any; specialist: only their type)
  const canAccessTab = (checkKey) => {
    if (!selectedCase) return false;
    const caseHasCheck = selectedCase.checks_norm.includes(checkKey);
    if (!caseHasCheck) return false;
    if (isAdmin || !assignedCheck) return true;           // admin / generic verifier
    return checkKey === assignedCheck;                     // specialist verifier
  };

  // ── Select a case ──────────────────────────────────────────────────────────
  const selectCase = (c) => {
    setSelectedCase(c);
    setComments([]);   // TODO: fetch from API  GET /api/cases/{id}/comments
  };

  // ── Save result ────────────────────────────────────────────────────────────
  const handleSave = async (isDraft) => {
    if (!outcome && !isDraft) {
      setSaveMsg({ text: "Please select an outcome before saving.", type: "error" });
      return;
    }
    setSaving(true);
    setSaveMsg({ text: "", type: "" });
    try {
      const res = await fetch(`${API_URL}/api/cases/${selectedCase.case_id}/check-result`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          check_type: activeCheck,
          outcome:    outcome || "unable",
          form_data:  form,
          is_draft:   isDraft,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSaveMsg({
        text: isDraft ? "Draft saved — case stays In Progress." : "Result submitted — moved to QC Review.",
        type: "success",
      });
      fetchCases();
    } catch {
      setSaveMsg({ text: "Could not save. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // ── Send comment ───────────────────────────────────────────────────────────
  const sendComment = () => {
    if (!commentInput.trim()) return;
    // TODO: POST /api/cases/{id}/comments
    setComments(p => [...p, {
      id:     Date.now(),
      author: user.name || "Verifier",
      avatar: (user.name || "V").charAt(0).toUpperCase(),
      time:   new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      text:   commentInput.trim(),
    }]);
    setCommentInput("");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            {/* Page header */}
            <div className="dash-upper-head">
              <div className="left">
                <div className="dash-title-flex">
                  <h3 className="dash-title-text">Verifier Workspace</h3>
                  <span style={{
                    fontSize: "14px", color: "#606060", fontWeight:500,
                   padding: "3px 10px", borderRadius: "20px",
                  }}>
                    {user.name || "Verifier"} — {role}
                  </span>
                  {assignedCheck && (
                    <span style={{
                      fontSize: "11px", color: "#fff",
                      background: "#27348B", padding: "3px 10px", borderRadius: "20px",
                    }}>
                      Assigned: {CHECK_TABS.find(t => t.key === assignedCheck)?.label}
                    </span>
                  )}
                </div>
              </div>
              <div className="right">
                <input
                  type="text"
                  className="dash-search-input"
                  placeholder="Search case ID or candidate…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Date filters — same pattern as Intake.jsx */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {DATE_FILTERS.map(df => (
                <button
                  key={df.key}
                  className={`tab-cta ${dateFilter === df.key ? "active" : ""}`}
                  onClick={() => setDateFilter(df.key)}
                >
                  {df.label}
                </button>
              ))}
              {dateFilter === "custom" && (
                <>
                  <input
                    type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
                    style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                  />
                  <span style={{ color: "#94a3b8" }}>→</span>
                  <input
                    type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
                    style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                  />
                </>
              )}
            </div>

            {/* ── Stat cards — now double as the queue-view selector (replaces the old tab row) ── */}
            <div className="cards-head-dash">
              {[
                { key: "active",      cls: "bdr-total",    count: activeCases.length,      label: "Active" },
                { key: "completed",   cls: "bdr-com",       count: completedCases.length,   label: "Completed" },
                { key: "clear",       cls: "bdr-progress",  count: clearCases.length,       label: "Clear" },
                { key: "discrepancy", cls: "bdr-rate",      count: discrepancyCases.length,  label: "Discrepancy" },
              ].map(card => (
                <div
                  key={card.key}
                  className={`card-inner-dash ${card.cls}`}
                  onClick={() => navigate(`/Verifyer?view=${card.key}`, { replace: true })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && navigate(`/Verifyer?view=${card.key}`, { replace: true })}
                  style={{
                    cursor: "pointer",
                    outline: sidebarView === card.key ? "2px solid #27348B" : "none",
                    outlineOffset: "-2px",
                  }}
                >
                  <h4>{loading ? "—" : card.count}</h4>
                  <p>{card.label}</p>
                </div>
              ))}
            </div>

            {/* Three-column layout: Queue | Form | Charges+Comments */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 280px", gap: "16px", alignItems: "start" }}>

              {/* ── LEFT: Case queue ── */}
              <div className="down-table" style={{ margin: 0 }}>
                <div className="client-portal-cases">
                  <h3>
                    {VIEW_LABELS[sidebarView] || "ACTIVE"} ({queueList.length})
                  </h3>
                </div>

                {loading ? (
                  <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
                ) : queueList.length === 0 ? (
                  <p style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
                    No {sidebarView} cases found.
                  </p>
                ) : (
                  <table>
                    <tbody>
                      {queueList.map(c => (
                        <QueueItem
                          key={c.case_id}
                          c={c}
                          selectedCase={selectedCase}
                          selectCase={selectCase}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* ── MIDDLE: Detail + form ── */}
              <div className="second-card">
                <DetailPanel
                  selectedCase={selectedCase}
                  activeCheck={activeCheck}
                  setActiveCheck={setActiveCheck}
                  canAccessTab={canAccessTab}
                  form={form}
                  setForm={setForm}
                  prefillSource={prefillSource}
                  outcome={outcome}
                  setOutcome={setOutcome}
                  saveMsg={saveMsg}
                  saving={saving}
                  handleSave={handleSave}
                />
              </div>

              {/* ── RIGHT: Charges + Comments ── */}
              <div className="thrid-card">
                <RightPanel
                  comments={comments}
                  commentInput={commentInput}
                  setCommentInput={setCommentInput}
                  sendComment={sendComment}
                  commentsEndRef={commentsEndRef}
                />
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
}
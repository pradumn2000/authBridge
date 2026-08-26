
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";
// import CheckDetailForm from "./CheckDetailForm";
// import { computeCheckStatus } from "../src/checkFormsConfig";

// const STATUS_TABS = [
//   { key: "all",         label: "All"         },
//   { key: "pending",     label: "Pending"     },
//   { key: "in-progress", label: "In Progress" },
//   { key: "qc-review",   label: "QC Review"   },
//   { key: "completed",   label: "Completed"   },
// ];

// const CHECK_BADGE = {
//   clear:       { label: "Clear",       bg: "#10b981", color: "#fff" },
//   submitted:   { label: "Submitted",   bg: "#3b82f6", color: "#fff" },
//   in_progress: { label: "In Progress", bg: "#028090", color: "#fff" },
//   pending:     { label: "Pending",     bg: "#f59e0b", color: "#fff" },
//   discrepancy: { label: "Discrepancy", bg: "#ef4444", color: "#fff" },
//   na:          { label: "N/A",         bg: "#94a3b8", color: "#fff" },
// };

// const CHECK_ABBREV = {
//   employment: "EMP", education: "EDU", address: "ADDR",
//   database: "DB", criminal: "CRI", drug: "DRUG", court: "COURT",
// };

// function displayChecks(checks) {
//   const arr = Array.isArray(checks) ? checks : (typeof checks === "string" ? checks.split(/[·,]/).map(x => x.trim()).filter(Boolean) : []);
//   return arr.map(c => CHECK_ABBREV[c] || String(c).toUpperCase()).join(" · ");
// }

// const STATUS_META = {
//   "pending":     { color: "#f59e0b", pct: 20, dayLabel: () => "Day 1/7" },
//   "in-progress": { color: "#028090", pct: 60, dayLabel: () => "Day 4/7" },
//   "qc-review":   { color: "#7c3aed", pct: 85, dayLabel: () => "Day 6/7" },
//   "completed":   { color: "#10b981", pct: 100, dayLabel: () => "Done"   },
//   "on-hold":     { color: "#94a3b8", pct: 30, dayLabel: () => "On Hold" },
// };

// function getStatusMeta(status) {
//   return STATUS_META[status] || STATUS_META["pending"];
// }

// function detailStatusLabel(s) {
//   return {
//     "pending": "Active", "in-progress": "In Progress",
//     "completed": "Completed", "qc-review": "QC Review", "on-hold": "On Hold",
//   }[s] || s;
// }

// function formatTAT(tat) {
//   if (!tat) return "—";
//   const str = String(tat);
//   if (/\d+\.?\d*[eE][+\-]?\d+/.test(str)) return "—";
//   const num = parseFloat(str);
//   if (!isNaN(num) && !str.includes("d") && !str.includes("D")) return `${Math.round(num)} days`;
//   return str;
// }

// // ── Displays the case-level TAT as the individual per-check values
// //    (e.g. "5, 6 days" for Employment=5 + Education=6) using the check_tat
// //    breakdown AddCase.jsx saves, instead of combining them into one
// //    number. Falls back to the single overall_tat/tat value for older
// //    cases that don't have a check_tat breakdown.
// function formatTatDisplay(c) {
//   const checks = Array.isArray(c.checks)
//     ? c.checks
//     : (typeof c.checks === "string" ? c.checks.split(/[·,]/).map(s => s.trim()).filter(Boolean) : []);
//   if (c.check_tat && typeof c.check_tat === "object" && checks.length > 0) {
//     const list = checks.map(k => Number(c.check_tat[k]) || 0).filter(t => t > 0);
//     if (list.length > 0) {
//       return list.length === 1
//         ? `${list[0]} day${list[0] === 1 ? "" : "s"}`
//         : `${list.join(", ")} days`;
//     }
//   }
//   return formatTAT(c.overall_tat ?? c.tat);
// }

// function inferCheckStatus(caseStat) {
//   if (caseStat === "completed")   return "clear";
//   if (caseStat === "in-progress") return "in_progress";
//   if (caseStat === "pending")     return "pending";
//   return "na";
// }

// function buildTimeline(c) {
//   const created = c.created_at ? new Date(c.created_at) : new Date();
//   const fmt = (d) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//   const fmtTime = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

//   const events = [
//     { icon: "✓", color: "#10b981", title: "Case Submitted",
//       desc: `Case ${c.case_id} created and submitted for processing.`,
//       date: fmt(created), time: fmtTime(created), done: true },
//   ];

//   if (["in-progress", "qc-review", "completed"].includes(c.status)) {
//     const d2 = addDays(created, 1);
//     events.push({ icon: "✓", color: "#028090", title: "Verification Started",
//       desc: "Documents received. Verification team assigned and checks initiated.",
//       date: fmt(d2), time: fmtTime(d2), done: true });
//   } else {
//     events.push({ icon: "○", color: "#94a3b8", title: "Verification Pending",
//       desc: "Awaiting assignment to verification team.", date: "—", time: "", done: false });
//   }

//   if (["in-progress", "qc-review", "completed"].includes(c.status)) {
//     const d3 = addDays(created, 3);
//     events.push({ icon: "✓", color: "#028090", title: "Checks In Progress",
//       desc: `Running ${c.checks ? (Array.isArray(c.checks) ? c.checks.join(", ") : c.checks) : "all"} checks.`,
//       date: fmt(d3), time: fmtTime(d3), done: true });
//   } else {
//     events.push({ icon: "○", color: "#94a3b8", title: "Checks In Progress",
//       desc: "Check-wise verification not yet started.", date: "—", time: "", done: false });
//   }

//   if (["qc-review", "completed"].includes(c.status)) {
//     const d4 = addDays(created, 5);
//     events.push({ icon: "✓", color: "#7c3aed", title: "QC Review",
//       desc: "Case submitted for quality control review.",
//       date: fmt(d4), time: fmtTime(d4), done: true });
//   } else {
//     events.push({ icon: "○", color: "#94a3b8", title: "QC Review",
//       desc: "Quality check pending.", date: "—", time: "", done: false });
//   }

//   if (c.status === "completed") {
//     const d5 = addDays(created, 7);
//     events.push({ icon: "✓", color: "#10b981", title: "Report Dispatched",
//       desc: "Final BGV report generated and dispatched to client.",
//       date: fmt(d5), time: fmtTime(d5), done: true });
//   } else {
//     events.push({ icon: "○", color: "#94a3b8", title: "Report Dispatch",
//       desc: "Report will be generated after QC approval.", date: "—", time: "", done: false });
//   }

//   return events;
// }

// export default function AllCases() {
//   const navigate = useNavigate();
//   const [cases, setCases]       = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [search, setSearch]     = useState("");

//   // ── Detail-panel state (same pattern as Client.jsx's split view) ────────
//   const [selectedCase, setSelectedCase]       = useState(null);
//   const [activeDetailTab, setActiveDetailTab] = useState("overview");
//   const [openCheck, setOpenCheck]             = useState(null);

//   const token = localStorage.getItem("token");
//   const user  = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();
//   const isAdmin = ["admin", "check_manager", "allocator", "pvt_qc"].includes(user.role);

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     fetch(`${API_URL}/api/cases`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//     })
//       .then(r => r.json())
//       .then(data => setCases(data.cases || []))
//       .catch(() => setError("Failed to load cases."))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = cases.filter(c => {
//     const matchTab = activeTab === "all" || c.status === activeTab;
//     const matchSearch = !search ||
//       c.case_id?.toLowerCase().includes(search.toLowerCase()) ||
//       c.candidate?.toLowerCase().includes(search.toLowerCase()) ||
//       c.client?.toLowerCase().includes(search.toLowerCase());
//     return matchTab && matchSearch;
//   });

//   const countFor = (status) =>
//     status === "all" ? cases.length : cases.filter(c => c.status === status).length;

//   const getChecksArray = (c) => {
//     if (Array.isArray(c.checks)) return c.checks;
//     if (typeof c.checks === "string") return c.checks.split(/[·,]/).map(x => x.trim()).filter(Boolean);
//     return [];
//   };

//   const getCheckStatus = (c, checkName) => {
//     const detail = c.check_details?.[checkName];
//     if (detail) return computeCheckStatus(checkName, detail);
//     return inferCheckStatus(c.status);
//   };

//   const getCheckTAT = (c, checkName) => {
//     const detail = c.check_details?.[checkName];
//     if (detail?.tat) return formatTAT(detail.tat);
//     if (detail?.turnaround_time) return formatTAT(detail.turnaround_time);
//     if (c.check_tat && c.check_tat[checkName] != null) return formatTAT(c.check_tat[checkName]);
//     return formatTAT(c.overall_tat ?? c.tat);
//   };

//   const ViewButton = ({ c }) => (
//     <button
//       className="view-cta"
//       onClick={() => { setSelectedCase(c); setActiveDetailTab("overview"); }}
//     >
//       View
//     </button>
//   );

//   const EditButton = ({ c }) => (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         navigate(`/AddCase?editCaseId=${encodeURIComponent(c.case_id)}`);
//       }}
//       style={{
//         background: "#fff", color: "#27348B", border: "1px solid #27348B",
//         padding: "6px 14px", borderRadius: "6px", fontSize: "13px",
//         fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
//       }}
//     >
//       Edit
//     </button>
//   );

//   const CheckwiseGrid = ({ c }) => {
//     const checks = getChecksArray(c);
//     if (checks.length === 0) return (
//       <p style={{ color: "#94a3b8", fontSize: "13px", padding: "12px 0" }}>No checks assigned.</p>
//     );
//     const left  = checks.filter((_, i) => i % 2 === 0);
//     const right = checks.filter((_, i) => i % 2 !== 0);

//     const renderRow = (chk, isLast) => {
//       const badge = CHECK_BADGE[getCheckStatus(c, chk)] || CHECK_BADGE.na;
//       const tat   = getCheckTAT(c, chk);
//       return (
//         <div key={chk} onClick={() => setOpenCheck(chk)} style={{
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "9px 0", borderBottom: isLast ? "none" : "1px solid #f1f5f9",
//           cursor: "pointer", gap: "8px",
//         }}>
//           <span style={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>{CHECK_ABBREV[chk] || chk}</span>
//           <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <span style={{ background: badge.bg, color: badge.color, fontSize: "11px", fontWeight: 700,
//               padding: "4px 12px", borderRadius: "4px", minWidth: "90px", textAlign: "center" }}>{badge.label}</span>
//             <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, minWidth: "56px", textAlign: "right" }}>
//               {tat}
//             </span>
//           </span>
//         </div>
//       );
//     };

//     return (
//       <div>
//         <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
//           Check-wise Status
//         </p>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 12px" }}>
//           <div>{left.map((chk, i) => renderRow(chk, i === left.length - 1))}</div>
//           <div style={{ background: "#e2e8f0" }} />
//           <div>{right.map((chk, i) => renderRow(chk, i === right.length - 1))}</div>
//         </div>
//       </div>
//     );
//   };

//   const TimelineView = ({ c }) => {
//     const events = buildTimeline(c);
//     return (
//       <div style={{ padding: "4px 0" }}>
//         <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
//           Case Timeline
//         </p>
//         <div style={{ position: "relative" }}>
//           <div style={{ position: "absolute", left: "15px", top: "8px", bottom: "8px", width: "2px", background: "#e2e8f0", zIndex: 0 }} />
//           {events.map((ev, i) => (
//             <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "20px", position: "relative", zIndex: 1 }}>
//               <div style={{
//                 width: "30px", height: "30px", borderRadius: "50%",
//                 background: ev.done ? ev.color : "#e2e8f0",
//                 color: "#fff", display: "flex", alignItems: "center",
//                 justifyContent: "center", fontSize: "13px", fontWeight: 700,
//                 flexShrink: 0, border: `2px solid ${ev.done ? ev.color : "#cbd5e1"}`,
//                 boxShadow: ev.done ? `0 0 0 3px ${ev.color}22` : "none",
//               }}>
//                 {ev.done ? "✓" : "○"}
//               </div>
//               <div style={{ flex: 1, paddingTop: "4px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
//                   <span style={{ fontSize: "13px", fontWeight: 700, color: ev.done ? "#1e293b" : "#94a3b8" }}>
//                     {ev.title}
//                   </span>
//                   {ev.date !== "—" && (
//                     <span style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap", marginLeft: "8px" }}>
//                       {ev.date} {ev.time}
//                     </span>
//                   )}
//                 </div>
//                 <p style={{ fontSize: "12px", color: ev.done ? "#64748b" : "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
//                   {ev.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const CaseDetailPanel = () => (
//     <div className="dash-inner-right status-cases">
//       {!selectedCase ? (
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
//           <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to view details</p>
//         </div>
//       ) : (
//         <>
//           <div style={{ background: "#27348B", color: "#fff", padding: "14px 18px", fontWeight: 700, fontSize: "14px", borderRadius: "6px 6px 0 0",
//             display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <span>CASE DETAIL — {selectedCase.case_id} | {selectedCase.candidate}</span>
//             <button onClick={() => setSelectedCase(null)}
//               style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
//                 borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>
//               Close ×
//             </button>
//           </div>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
//             {["overview", "timeline", "documents", "comments"].map((t, i) => (
//               <button key={t} onClick={() => setActiveDetailTab(t)} style={{
//                 padding: "12px 0", border: "none",
//                 borderRight: i < 3 ? "1px solid #e2e8f0" : "none",
//                 borderBottom: activeDetailTab === t ? "3px solid #27348B" : "3px solid transparent",
//                 background: activeDetailTab === t ? "#f0f4ff" : "#fff",
//                 color: activeDetailTab === t ? "#27348B" : "#64748b",
//                 fontWeight: activeDetailTab === t ? 700 : 400,
//                 fontSize: "13px", cursor: "pointer", textTransform: "capitalize",
//                 transition: "all 0.15s",
//               }}>
//                 {t.charAt(0).toUpperCase() + t.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div style={{ border: "1px solid #e2e8f0", borderTop: "none", padding: "16px", borderRadius: "0 0 6px 6px",
//             background: "#fff", minHeight: "260px", maxHeight: "420px", overflowY: "auto" }}>

//             {activeDetailTab === "overview" && (
//               <div>
//                 {[
//                   { label: "Case ID",   value: selectedCase.case_id },
//                   { label: "Candidate", value: selectedCase.candidate },
//                   { label: "Client",    value: selectedCase.client },
//                   { label: "Status",    value: (
//                     <span style={{ background: getStatusMeta(selectedCase.status).color, color: "#fff",
//                       fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
//                       {detailStatusLabel(selectedCase.status)}
//                     </span>
//                   )},
//                   { label: "Priority",  value: selectedCase.priority || "Normal" },
//                   { label: "TAT",       value: formatTatDisplay(selectedCase) },
//                   { label: "Created",   value: selectedCase.created_at || "—" },
//                   { label: "Amount",    value: `₹${(selectedCase.total_amount || 0).toLocaleString()}` },
//                 ].map(r => (
//                   <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
//                     padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
//                     <span style={{ color: "#64748b", fontWeight: 500 }}>{r.label}</span>
//                     <span style={{ fontWeight: 700, color: "#1e293b" }}>{r.value || "—"}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeDetailTab === "timeline"  && <TimelineView c={selectedCase} />}
//             {activeDetailTab === "documents" && <CheckwiseGrid c={selectedCase} />}

//             {activeDetailTab === "comments" && (
//               <div>
//                 <textarea placeholder="Write a comment or query about this case…" style={{
//                   width: "100%", minHeight: "100px", padding: "10px 12px",
//                   border: "1px solid #e2e8f0", borderRadius: "6px",
//                   fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box",
//                 }} />
//                 <button className="primary-cta" style={{ marginTop: "10px" }}>Submit Comment</button>
//               </div>
//             )}
//           </div>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
//             <button className="secondary-cta import"
//               style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
//                 padding: "13px", height: "auto", borderRadius: "6px" }}>
//               <img src="images/dashboard/export-excel.svg" alt="" style={{ width: "18px", height: "18px" }} />
//               Download Report
//             </button>
//             <button className="primary-cta export"
//               style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
//                 padding: "13px", height: "auto", borderRadius: "6px" }}>
//               <img src="images/dashboard/export-icon.svg" alt="" style={{ width: "18px", height: "18px" }} />
//               Submit Query
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   const checkDetailModal = openCheck && selectedCase && (
//     <CheckDetailForm
//       caseObj={selectedCase}
//       checkKey={openCheck}
//       onClose={() => setOpenCheck(null)}
//       onSaved={(checkKey, data) => {
//         setCases(prev => prev.map(c =>
//           c.case_id === selectedCase.case_id
//             ? { ...c, check_details: { ...c.check_details, [checkKey]: data } }
//             : c
//         ));
//         setSelectedCase(prev => ({
//           ...prev,
//           check_details: { ...prev.check_details, [checkKey]: data },
//         }));
//       }}
//     />
//   );

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* ── Top bar ── */}
//             <div className="dash-upper-head">
//               <div className="left">
//                 {STATUS_TABS.map(tab => (
//                   <button
//                     key={tab.key}
//                     className={`tab-cta ${activeTab === tab.key ? "active" : ""}`}
//                     onClick={() => setActiveTab(tab.key)}
//                   >
//                     {tab.label}
//                     <span style={{ marginLeft: "5px", background: "rgba(0,0,0,.08)", borderRadius: "10px", padding: "1px 6px", fontSize: "12px" }}>
//                       {countFor(tab.key)}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//               <div className="right">
//                 <button className="date-wrapper">
//                   <img src="/images/dashboard/calendar-icon.svg" alt="" />
//                   <input type="text" className="selectedDate" placeholder="Select Date" readOnly />
//                 </button>
//                 <button className="primary-cta export">
//                   <img src="images/dashboard/export-icon.svg" alt="" /> Export CSV
//                 </button>
//                 <button className="secondary-cta import">
//                   <img src="images/dashboard/export-excel.svg" alt="" /> Export Excel
//                 </button>
//               </div>
//             </div>

//             {/* ── Search + Add Case ── */}
//             <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//               <input
//                 type="text"
//                 placeholder="Search candidate, case ID or client..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 style={{
//                   flex: 1, padding: "10px 16px", borderRadius: "10px",
//                   border: "1px solid #ddd", fontSize: "14px", outline: "none"
//                 }}
//               />
//               {(isAdmin || user.role === "client") && (
//                 <button className="primary-cta" onClick={() => navigate("/AddCase")}>
//                   + Add Case
//                 </button>
//               )}
//             </div>

//             {/* ── Error ── */}
//             {error && (
//               <div style={{ padding: "12px 16px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "14px" }}>
//                 {error}
//               </div>
//             )}

//             {/* ── List + Detail split — left panel widened, table scrolls both ways ── */}
//             <div className="dash-inner-wrp-both client-portal" style={{ marginTop: "16px", alignItems: "flex-start" }}>
//               <div className="dash-inner-left" style={{ flex: "1.6 1 0%", minWidth: 0 }}>
//                 <div className="down-table">
//                   {loading ? (
//                     <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading cases...</p>
//                   ) : (
//                     <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "640px", border: "1px solid #eef1f6", borderRadius: "8px" }}>
//                       <table style={{ minWidth: "900px", width: "100%", borderCollapse: "collapse" }}>
//   <thead>
//     <tr>
//       {/* 0. Checkbox Column */}
//       <th style={{ whiteSpace: "nowrap", width: "40px", textAlign: "center" }}>
//         <input 
//           type="checkbox" 
//           id="coding" 
//           name="interest" 
//           value="coding" 
//           checked 
//           onChange={() => {}} // react warning avoid karne ke liye
//         />
//       </th>
//       <th style={{ whiteSpace: "nowrap" }}>Case ID</th>
//       <th style={{ whiteSpace: "nowrap" }}>Candidate Name</th>
//       {isAdmin && <th style={{ whiteSpace: "nowrap" }}>Client</th>}
//       <th style={{ whiteSpace: "nowrap" }}>Checks</th>
//       <th style={{ whiteSpace: "nowrap" }}>Progress</th>
//       <th style={{ whiteSpace: "nowrap" }}>Assigned Verifier</th>
//       <th style={{ whiteSpace: "nowrap" }}>Status</th>
//       <th style={{ whiteSpace: "nowrap" }}>Priority</th>
//       <th style={{ whiteSpace: "nowrap" }}>TAT/SLA</th>
//       <th style={{ whiteSpace: "nowrap" }}>Due Date</th>
//       <th style={{ whiteSpace: "nowrap" }}>QC Status</th>
//       <th style={{ whiteSpace: "nowrap" }}>Uploaded Documents</th>
//       <th style={{ whiteSpace: "nowrap" }}>Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     {filtered.length === 0 ? (
//       <tr>
//         {/* Checkbox column count included (+1 in colSpan) */}
//         <td
//           colSpan={isAdmin ? 14 : 13}
//           style={{
//             textAlign: "center",
//             padding: "32px",
//             color: "#94a3b8",
//             fontSize: "14px",
//           }}
//         >
//           {cases.length === 0 ? (
//             <>
//               No cases yet.{" "}
//               <button
//                 onClick={() => navigate("/AddCase")}
//                 style={{
//                   color: "#2b3b8c",
//                   fontWeight: 700,
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Add your first case →
//               </button>
//             </>
//           ) : (
//             "No cases match your filter."
//           )}
//         </td>
//       </tr>
//     ) : (
//       filtered.map((row) => {
//         const isSelected = selectedCase?.case_id === row.case_id;
//         return (
//           <tr
//             key={row.case_id}
//             onClick={() => {
//               setSelectedCase(row);
//               setActiveDetailTab("overview");
//             }}
//             style={{
//               cursor: "pointer",
//               background: isSelected ? "#eef3ff" : undefined,
//             }}
//           >
//             {/* 0. Row Checkbox */}
//             <td 
//               style={{ textAlign: "center", whiteSpace: "nowrap" }}
//               onClick={(e) => e.stopPropagation()} // Row click trigger se bachane ke liye
//             >
//               <input type="checkbox" value={row.case_id} />
//             </td>

//             {/* 1. Case ID */}
//             <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
//               {row.case_id || row.id || "—"}
//             </td>

//             {/* 2. Candidate Name */}
//             <td style={{ whiteSpace: "nowrap" }}>{row.candidate}</td>

//             {/* 3. Client (Admin Only) */}
//             {isAdmin && (
//               <td style={{ whiteSpace: "nowrap" }}>{row.client}</td>
//             )}

//             {/* 4. Checks */}
//             <td style={{ fontSize: "12px", color: "#475569", whiteSpace: "nowrap" }}>
//               {displayChecks(row.checks)}
//             </td>

//             {/* 5. Progress */}
//             <td style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
//               {row.progress !== undefined ? `${row.progress}%` : "—"}
//             </td>

//             {/* 6. Assigned Verifier */}
//             <td style={{ whiteSpace: "nowrap", fontSize: "13px", color: "#475569" }}>
//               {row.assigned_verifier || row.verifier_name || "Unassigned"}
//             </td>

//             {/* 7. Status */}
//             <td>
//               <span className={`status ${row.status}`}>
//                 {statusLabel(row.status)}
//               </span>
//             </td>

//             {/* 8. Priority */}
//             <td style={{ whiteSpace: "nowrap" }}>
//               <span
//                 style={{
//                   color: priorityColor(row.priority),
//                   fontWeight: 700,
//                   fontSize: "13px",
//                 }}
//               >
//                 {row.priority
//                   ? row.priority.charAt(0).toUpperCase() + row.priority.slice(1)
//                   : "—"}
//               </span>
//             </td>

//             {/* 9. TAT/SLA */}
//             <td style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
//               <div className="tat-custom-class green">
//                 <span className="tat-label-dot green"></span>
//                 {formatTatDisplay(row)}
//               </div>
//             </td>

//             {/* 10. Due Date */}
//             <td style={{ fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap" }}>
//               {row.due_date || row.created_at || "—"}
//             </td>

//             {/* 11. QC Status */}
//             <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#475569" }}>
//               {row.qc_status || "Pending"}
//             </td>

//             {/* 12. Uploaded Documents */}
//             <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#475569" }}>
//               {row.documents_count !== undefined
//                 ? `${row.documents_count} Files`
//                 : row.documents?.length
//                 ? `${row.documents.length} Files`
//                 : "0 Files"}
//             </td>

//             {/* 13. Action */}
//             <td style={{ whiteSpace: "nowrap" }}>
//               <div style={{ display: "flex", gap: "8px" }}>
//                 <ViewButton c={row} />
//                 <EditButton c={row} />
//               </div>
//             </td>
//           </tr>
//         );
//       })
//     )}
//   </tbody>
// </table>
//                     </div>
//                   )}

//                   {!loading && (
//                     <div style={{ padding: "10px 16px", fontSize: "12px", color: "#9ca3af" }}>
//                       Showing all {filtered.length} of {cases.length} cases
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <CaseDetailPanel />
//             </div>

//           </div>
//         </main>
//       </section>

//       {checkDetailModal}
//     </>
//   );
// }

// function statusLabel(s) {
//   return { pending: "Pending", "in-progress": "In Progress", completed: "Completed", "qc-review": "QC Review", "on-hold": "On Hold" }[s] || s;
// }
// function priorityColor(p) {
//   return { urgent: "#eb4d4b", high: "#f59e0b", normal: "#64748b" }[p] || "#64748b";
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";
import CheckDetailForm from "./CheckDetailForm";
import { computeCheckStatus } from "../src/checkFormsConfig";

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In Progress" },
  { key: "qc-review", label: "QC Review" },
  { key: "discrepancy", label: "Discrepancy" },
  { key: "completed", label: "Completed" },
];

const CHECK_BADGE = {
  clear: { label: "Clear", bg: "#10b981", color: "#fff" },
  submitted: { label: "Submitted", bg: "#3b82f6", color: "#fff" },
  in_progress: { label: "In Progress", bg: "#028090", color: "#fff" },
  pending: { label: "Pending", bg: "#f59e0b", color: "#fff" },
  discrepancy: { label: "Discrepancy", bg: "#ef4444", color: "#fff" },
  na: { label: "N/A", bg: "#94a3b8", color: "#fff" },
};

const CHECK_ABBREV = {
  employment: "EMP", education: "EDU", address: "ADDR",
  database: "DB", criminal: "CRI", drug: "DRUG", court: "COURT",
};

function displayChecks(checks) {
  const arr = Array.isArray(checks) ? checks : (typeof checks === "string" ? checks.split(/[·,]/).map(x => x.trim()).filter(Boolean) : []);
  return arr.map(c => CHECK_ABBREV[c] || String(c).toUpperCase()).join(" · ");
}

const STATUS_META = {
  "pending": { color: "#f59e0b", pct: 20, dayLabel: () => "Day 1/7" },
  "in-progress": { color: "#028090", pct: 60, dayLabel: () => "Day 4/7" },
  "qc-review": { color: "#7c3aed", pct: 85, dayLabel: () => "Day 6/7" },
  "completed": { color: "#10b981", pct: 100, dayLabel: () => "Done" },
  "on-hold": { color: "#94a3b8", pct: 30, dayLabel: () => "On Hold" },
};

function getStatusMeta(status) {
  return STATUS_META[status] || STATUS_META["pending"];
}

function detailStatusLabel(s) {
  return {
    "pending": "Active", "in-progress": "In Progress",
    "completed": "Completed", "qc-review": "QC Review", "on-hold": "On Hold",
  }[s] || s;
}

function formatTAT(tat) {
  if (!tat) return "—";
  const str = String(tat);
  if (/\d+\.?\d*[eE][+\-]?\d+/.test(str)) return "—";
  const num = parseFloat(str);
  if (!isNaN(num) && !str.includes("d") && !str.includes("D")) return `${Math.round(num)} days`;
  return str;
}

function formatTatDisplay(c) {
  const checks = Array.isArray(c.checks)
    ? c.checks
    : (typeof c.checks === "string" ? c.checks.split(/[·,]/).map(s => s.trim()).filter(Boolean) : []);
  if (c.check_tat && typeof c.check_tat === "object" && checks.length > 0) {
    const list = checks.map(k => Number(c.check_tat[k]) || 0).filter(t => t > 0);
    if (list.length > 0) {
      return list.length === 1
        ? `${list[0]} day${list[0] === 1 ? "" : "s"}`
        : `${list.join(", ")} days`;
    }
  }
  return formatTAT(c.overall_tat ?? c.tat);
}

function inferCheckStatus(caseStat) {
  if (caseStat === "completed") return "clear";
  if (caseStat === "in-progress") return "in_progress";
  if (caseStat === "pending") return "pending";
  return "na";
}

function buildTimeline(c) {
  const created = c.created_at ? new Date(c.created_at) : new Date();
  const fmt = (d) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const fmtTime = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

  const events = [
    { icon: "✓", color: "#10b981", title: "Case Submitted",
      desc: `Case ${c.case_id} created and submitted for processing.`,
      date: fmt(created), time: fmtTime(created), done: true },
  ];

  if (["in-progress", "qc-review", "completed"].includes(c.status)) {
    const d2 = addDays(created, 1);
    events.push({ icon: "✓", color: "#028090", title: "Verification Started",
      desc: "Documents received. Verification team assigned and checks initiated.",
      date: fmt(d2), time: fmtTime(d2), done: true });
  } else {
    events.push({ icon: "○", color: "#94a3b8", title: "Verification Pending",
      desc: "Awaiting assignment to verification team.", date: "—", time: "", done: false });
  }

  if (["in-progress", "qc-review", "completed"].includes(c.status)) {
    const d3 = addDays(created, 3);
    events.push({ icon: "✓", color: "#028090", title: "Checks In Progress",
      desc: `Running ${c.checks ? (Array.isArray(c.checks) ? c.checks.join(", ") : c.checks) : "all"} checks.`,
      date: fmt(d3), time: fmtTime(d3), done: true });
  } else {
    events.push({ icon: "○", color: "#94a3b8", title: "Checks In Progress",
      desc: "Check-wise verification not yet started.", date: "—", time: "", done: false });
  }

  if (["qc-review", "completed"].includes(c.status)) {
    const d4 = addDays(created, 5);
    events.push({ icon: "✓", color: "#7c3aed", title: "QC Review",
      desc: "Case submitted for quality control review.",
      date: fmt(d4), time: fmtTime(d4), done: true });
  } else {
    events.push({ icon: "○", color: "#94a3b8", title: "QC Review",
      desc: "Quality check pending.", date: "—", time: "", done: false });
  }

  if (c.status === "completed") {
    const d5 = addDays(created, 7);
    events.push({ icon: "✓", color: "#10b981", title: "Report Dispatched",
      desc: "Final BGV report generated and dispatched to client.",
      date: fmt(d5), time: fmtTime(d5), done: true });
  } else {
    events.push({ icon: "○", color: "#94a3b8", title: "Report Dispatch",
      desc: "Report will be generated after QC approval.", date: "—", time: "", done: false });
  }

  return events;
}

export default function AllCases() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  // Filters state
  const [clientFilter, setClientFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [verifierFilter, setVerifierFilter] = useState("all");

  // Detail-panel state
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState("overview");
  const [openCheck, setOpenCheck] = useState(null);

  const token = localStorage.getItem("token");
  const user = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();
  const isAdmin = ["admin", "check_manager", "allocator", "pvt_qc"].includes(user.role);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    })
      .then(r => r.json())
      .then(data => setCases(data.cases || []))
      .catch(() => setError("Failed to load cases."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cases.filter(c => {
    const matchTab = activeTab === "all" || c.status === activeTab;
    const matchSearch = !search ||
      c.case_id?.toLowerCase().includes(search.toLowerCase()) ||
      c.candidate?.toLowerCase().includes(search.toLowerCase()) ||
      c.client?.toLowerCase().includes(search.toLowerCase());
    const matchClient = clientFilter === "all" || c.client === clientFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchPriority = priorityFilter === "all" || c.priority === priorityFilter;
    const matchVerifier = verifierFilter === "all" || c.assigned_verifier === verifierFilter;

    return matchTab && matchSearch && matchClient && matchStatus && matchPriority && matchVerifier;
  });

  const countFor = (status) =>
    status === "all" ? cases.length : cases.filter(c => c.status === status).length;

  const getChecksArray = (c) => {
    if (Array.isArray(c.checks)) return c.checks;
    if (typeof c.checks === "string") return c.checks.split(/[·,]/).map(x => x.trim()).filter(Boolean);
    return [];
  };

  const getCheckStatus = (c, checkName) => {
    const detail = c.check_details?.[checkName];
    if (detail) return computeCheckStatus(checkName, detail);
    return inferCheckStatus(c.status);
  };

  const getCheckTAT = (c, checkName) => {
    const detail = c.check_details?.[checkName];
    if (detail?.tat) return formatTAT(detail.tat);
    if (detail?.turnaround_time) return formatTAT(detail.turnaround_time);
    if (c.check_tat && c.check_tat[checkName] != null) return formatTAT(c.check_tat[checkName]);
    return formatTAT(c.overall_tat ?? c.tat);
  };

  const ViewButton = ({ c }) => (
    <button
      className="view-cta"
      onClick={() => { setSelectedCase(c); setActiveDetailTab("overview"); }}
    >
      View
    </button>
  );

  const EditButton = ({ c }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/AddCase?editCaseId=${encodeURIComponent(c.case_id)}`);
      }}
      style={{
        background: "#fff", color: "#27348B", border: "1px solid #27348B",
        padding: "6px 14px", borderRadius: "6px", fontSize: "13px",
        fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
      }}
    >
      Edit
    </button>
  );

  const CheckwiseGrid = ({ c }) => {
    const checks = getChecksArray(c);
    if (checks.length === 0) return (
      <p style={{ color: "#94a3b8", fontSize: "13px", padding: "12px 0" }}>No checks assigned.</p>
    );
    const left = checks.filter((_, i) => i % 2 === 0);
    const right = checks.filter((_, i) => i % 2 !== 0);

    const renderRow = (chk, isLast) => {
      const badge = CHECK_BADGE[getCheckStatus(c, chk)] || CHECK_BADGE.na;
      const tat = getCheckTAT(c, chk);
      return (
        <div key={chk} onClick={() => setOpenCheck(chk)} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "9px 0", borderBottom: isLast ? "none" : "1px solid #f1f5f9",
          cursor: "pointer", gap: "8px",
        }}>
          <span style={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>{CHECK_ABBREV[chk] || chk}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ background: badge.bg, color: badge.color, fontSize: "11px", fontWeight: 700,
              padding: "4px 12px", borderRadius: "4px", minWidth: "90px", textAlign: "center" }}>{badge.label}</span>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, minWidth: "56px", textAlign: "right" }}>
              {tat}
            </span>
          </span>
        </div>
      );
    };

    return (
      <div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Check-wise Status
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 12px" }}>
          <div>{left.map((chk, i) => renderRow(chk, i === left.length - 1))}</div>
          <div style={{ background: "#e2e8f0" }} />
          <div>{right.map((chk, i) => renderRow(chk, i === right.length - 1))}</div>
        </div>
      </div>
    );
  };

  const TimelineView = ({ c }) => {
    const events = buildTimeline(c);
    return (
      <div style={{ padding: "4px 0" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Case Timeline
        </p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "15px", top: "8px", bottom: "8px", width: "2px", background: "#e2e8f0", zIndex: 0 }} />
          {events.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "20px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%",
                background: ev.done ? ev.color : "#e2e8f0",
                color: "#fff", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "13px", fontWeight: 700,
                flexShrink: 0, border: `2px solid ${ev.done ? ev.color : "#cbd5e1"}`,
                boxShadow: ev.done ? `0 0 0 3px ${ev.color}22` : "none",
              }}>
                {ev.done ? "✓" : "○"}
              </div>
              <div style={{ flex: 1, paddingTop: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: ev.done ? "#1e293b" : "#94a3b8" }}>
                    {ev.title}
                  </span>
                  {ev.date !== "—" && (
                    <span style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap", marginLeft: "8px" }}>
                      {ev.date} {ev.time}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: ev.done ? "#64748b" : "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                  {ev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CaseDetailPanel = () => (
    <div className="dash-inner-right status-cases">
      {!selectedCase ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>Select a case to view details</p>
        </div>
      ) : (
        <>
          <div style={{ background: "#27348B", color: "#fff", padding: "14px 18px", fontWeight: 700, fontSize: "14px", borderRadius: "6px 6px 0 0",
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>CASE DETAIL — {selectedCase.case_id} | {selectedCase.candidate}</span>
            <button onClick={() => setSelectedCase(null)}
              style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>
              Close ×
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
            {["overview", "timeline", "documents", "comments"].map((t, i) => (
              <button key={t} onClick={() => setActiveDetailTab(t)} style={{
                padding: "12px 0", border: "none",
                borderRight: i < 3 ? "1px solid #e2e8f0" : "none",
                borderBottom: activeDetailTab === t ? "3px solid #27348B" : "3px solid transparent",
                background: activeDetailTab === t ? "#f0f4ff" : "#fff",
                color: activeDetailTab === t ? "#27348B" : "#64748b",
                fontWeight: activeDetailTab === t ? 700 : 400,
                fontSize: "13px", cursor: "pointer", textTransform: "capitalize",
                transition: "all 0.15s",
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ border: "1px solid #e2e8f0", borderTop: "none", padding: "16px", borderRadius: "0 0 6px 6px",
            background: "#fff", minHeight: "260px", maxHeight: "420px", overflowY: "auto" }}>

            {activeDetailTab === "overview" && (
              <div>
                {[
                  { label: "Case ID", value: selectedCase.case_id },
                  { label: "Candidate", value: selectedCase.candidate },
                  { label: "Client", value: selectedCase.client },
                  { label: "Status", value: (
                    <span style={{ background: getStatusMeta(selectedCase.status).color, color: "#fff",
                      fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
                      {detailStatusLabel(selectedCase.status)}
                    </span>
                  )},
                  { label: "Priority", value: selectedCase.priority || "Normal" },
                  { label: "TAT", value: formatTatDisplay(selectedCase) },
                  { label: "Created", value: selectedCase.created_at || "—" },
                  { label: "Amount", value: `₹${(selectedCase.total_amount || 0).toLocaleString()}` },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{r.value || "—"}</span>
                  </div>
                ))}
              </div>
            )}

            {activeDetailTab === "timeline" && <TimelineView c={selectedCase} />}
            {activeDetailTab === "documents" && <CheckwiseGrid c={selectedCase} />}

            {activeDetailTab === "comments" && (
              <div>
                <textarea placeholder="Write a comment or query about this case…" style={{
                  width: "100%", minHeight: "100px", padding: "10px 12px",
                  border: "1px solid #e2e8f0", borderRadius: "6px",
                  fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box",
                }} />
                <button className="primary-cta" style={{ marginTop: "10px" }}>Submit Comment</button>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
            <button className="secondary-cta import"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "13px", height: "auto", borderRadius: "6px" }}>
              <img src="images/dashboard/export-excel.svg" alt="" style={{ width: "18px", height: "18px" }} />
              Download Report
            </button>
            <button className="primary-cta export"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "13px", height: "auto", borderRadius: "6px" }}>
              <img src="images/dashboard/export-icon.svg" alt="" style={{ width: "18px", height: "18px" }} />
              Submit Query
            </button>
          </div>
        </>
      )}
    </div>
  );

  const checkDetailModal = openCheck && selectedCase && (
    <CheckDetailForm
      caseObj={selectedCase}
      checkKey={openCheck}
      onClose={() => setOpenCheck(null)}
      onSaved={(checkKey, data) => {
        setCases(prev => prev.map(c =>
          c.case_id === selectedCase.case_id
            ? { ...c, check_details: { ...c.check_details, [checkKey]: data } }
            : c
        ));
        setSelectedCase(prev => ({
          ...prev,
          check_details: { ...prev.check_details, [checkKey]: data },
        }));
      }}
    />
  );

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            {/* 1. Header Top Bar (Header Title + Date & Action Controls) */}
            <div className="bk-upper-header">
              <div className="bk-title-box">
                <div className="bk-folder-icon">📁</div>
                <div>
                  <h1 className="bk-main-title">All Cases</h1>
                  <p className="bk-sub-title">Manage and track all background verification cases</p>
                </div>
              </div>

              <div className="bk-action-controls">
                <div className="bk-date-selector">
                  <span>📅 Select Date Range</span>
                </div>
                <select className="bk-dropdown-select">
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 3 Months</option>
                </select>
                {(isAdmin || user.role === "client") && (
                  <button className="bk-add-case-btn" onClick={() => navigate("/AddCase")}>
                    + Add New Case
                  </button>
                )}
              </div>
            </div>

            {/* 2. Stat Summary Cards Grid */}
            <div className="bk-stats-grid">
              <div className="bk-stat-card card-blue">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-blue">💼</div>
                  <div>
                    <span className="bk-stat-label">Total Cases</span>
                    <h2 className="bk-stat-value">{countFor("all")}</h2>
                    <span className="bk-stat-badge badge-green">▲ 12% vs. last week</span>
                  </div>
                </div>
              </div>

              <div className="bk-stat-card card-yellow">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-yellow">🕒</div>
                  <div>
                    <span className="bk-stat-label">Pending</span>
                    <h2 className="bk-stat-value">{countFor("pending")}</h2>
                    <span className="bk-stat-badge badge-green">▲ 8% vs. last week</span>
                  </div>
                </div>
              </div>

              <div className="bk-stat-card card-purple">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-purple">▶</div>
                  <div>
                    <span className="bk-stat-label">In Progress</span>
                    <h2 className="bk-stat-value">{countFor("in-progress")}</h2>
                    <span className="bk-stat-badge badge-green">▲ 14% vs. last week</span>
                  </div>
                </div>
              </div>

              <div className="bk-stat-card card-pink">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-pink">🔍</div>
                  <div>
                    <span className="bk-stat-label">QC Review</span>
                    <h2 className="bk-stat-value">{countFor("qc-review")}</h2>
                    <span className="bk-stat-badge badge-red">▼ 6% vs. last week</span>
                  </div>
                </div>
              </div>

              <div className="bk-stat-card card-green-light">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-green-light">⚠️</div>
                  <div>
                    <span className="bk-stat-label">Discrepancy</span>
                    <h2 className="bk-stat-value">{countFor("discrepancy")}</h2>
                    <span className="bk-stat-badge badge-red">▼ 10% vs. last week</span>
                  </div>
                </div>
              </div>

              <div className="bk-stat-card card-teal">
                <div className="bk-stat-left">
                  <div className="bk-stat-icon icon-teal">✓</div>
                  <div>
                    <span className="bk-stat-label">Completed</span>
                    <h2 className="bk-stat-value">{countFor("completed")}</h2>
                    <span className="bk-stat-badge badge-green">▲ 20% vs. last week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Main Search and Filters Bar */}
            <div className="bk-filter-bar">
              <div className="bk-search-box">
                <span className="bk-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by Case ID, Candidate Name, Client, or Verifier..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="bk-select-group">
                <div className="bk-select-wrapper">
                  <label>Client</label>
                  <select value={clientFilter} onChange={e => setClientFilter(e.target.value)}>
                    <option value="all">All Clients</option>
                  </select>
                </div>

                <div className="bk-select-wrapper">
                  <label>Status</label>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="qc-review">QC Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="bk-select-wrapper">
                  <label>Priority</label>
                  <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                    <option value="all">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>

                <div className="bk-select-wrapper">
                  <label>Assigned To</label>
                  <select value={verifierFilter} onChange={e => setVerifierFilter(e.target.value)}>
                    <option value="all">All Verifiers</option>
                  </select>
                </div>
              </div>

              <div className="bk-btn-group">
                <button className="bk-outlined-btn">
                  <span>🌪️</span> Filters
                </button>
                <button className="bk-outlined-btn">
                  <span>📤</span> Export
                </button>
              </div>
            </div>

            {/* 4. Status Tabs Pill Row */}
            <div className="bk-pills-row">
              {STATUS_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`bk-pill-btn ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label} ({countFor(tab.key)})
                </button>
              ))}
            </div>

            {/* Error Message Display */}
            {error && (
              <div style={{ padding: "12px 16px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>
                {error}
              </div>
            )}

            {/* 5. Main Table and Detail View Split Section */}
            <div className="dash-inner-wrp-both client-portal" style={{ marginTop: "16px", alignItems: "flex-start" }}>
              <div className="dash-inner-left" style={{ flex: "1.6 1 0%", minWidth: 0 }}>
                <div className="down-table">
                  {loading ? (
                    <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading cases...</p>
                  ) : (
                    <div className="bk-table-scroll-container">
                      <table className="bk-custom-table">
                        <thead>
                          <tr>
                            <th className="bk-th-checkbox">
                              <input 
                                type="checkbox" 
                                checked 
                                onChange={() => {}}
                              />
                            </th>
                            <th>Case ID</th>
                            <th>Candidate Name</th>
                            {isAdmin && <th>Client</th>}
                            <th>Checks</th>
                            <th>Progress</th>
                            <th>Assigned Verifier</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>TAT / SLA</th>
                            <th>Due Date</th>
                            <th>QC Status</th>
                            <th>Uploaded Documents</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.length === 0 ? (
                            <tr>
                              <td
                                colSpan={isAdmin ? 14 : 13}
                                style={{
                                  textAlign: "center",
                                  padding: "32px",
                                  color: "#94a3b8",
                                  fontSize: "14px",
                                }}
                              >
                                {cases.length === 0 ? (
                                  <>
                                    No cases yet.{" "}
                                    <button
                                      onClick={() => navigate("/AddCase")}
                                      style={{
                                        color: "#2b3b8c",
                                        fontWeight: 700,
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Add your first case →
                                    </button>
                                  </>
                                ) : (
                                  "No cases match your filter."
                                )}
                              </td>
                            </tr>
                          ) : (
                            filtered.map((row) => {
                              const isSelected = selectedCase?.case_id === row.case_id;
                              return (
                                <tr
                                  key={row.case_id}
                                  onClick={() => {
                                    setSelectedCase(row);
                                    setActiveDetailTab("overview");
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    background: isSelected ? "#eef3ff" : undefined,
                                  }}
                                >
                                  <td 
                                    className="bk-td-checkbox"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <input type="checkbox" value={row.case_id} />
                                  </td>
                                  <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                                    {row.case_id || row.id || "—"}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap" }}>{row.candidate}</td>
                                  {isAdmin && (
                                    <td style={{ whiteSpace: "nowrap" }}>{row.client}</td>
                                  )}
                                  <td style={{ fontSize: "12px", color: "#475569", whiteSpace: "nowrap" }}>
                                    {displayChecks(row.checks)}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap", fontSize: "13px" }}>
                                    {row.progress !== undefined ? `${row.progress}%` : "—"}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap", fontSize: "13px", color: "#475569" }}>
                                    {row.assigned_verifier || row.verifier_name || "Unassigned"}
                                  </td>
                                  <td>
                                    <span className={`status ${row.status}`}>
                                      {statusLabel(row.status)}
                                    </span>
                                  </td>
                                  <td style={{ whiteSpace: "nowrap" }}>
                                    <span
                                      style={{
                                        color: priorityColor(row.priority),
                                        fontWeight: 700,
                                        fontSize: "13px",
                                      }}
                                    >
                                      {row.priority
                                        ? row.priority.charAt(0).toUpperCase() + row.priority.slice(1)
                                        : "—"}
                                    </span>
                                  </td>
                                  <td style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
                                    <div className="tat-custom-class green">
                                      <span className="tat-label-dot green"></span>
                                      {formatTatDisplay(row)}
                                    </div>
                                  </td>
                                  <td style={{ fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap" }}>
                                    {row.due_date || row.created_at || "—"}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#475569" }}>
                                    {row.qc_status || "Pending"}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#475569" }}>
                                    {row.documents_count !== undefined
                                      ? `${row.documents_count} Files`
                                      : row.documents?.length
                                      ? `${row.documents.length} Files`
                                      : "0 Files"}
                                  </td>
                                  <td style={{ whiteSpace: "nowrap" }}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                      <ViewButton c={row} />
                                      <EditButton c={row} />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {!loading && (
                    <div style={{ padding: "10px 16px", fontSize: "12px", color: "#9ca3af" }}>
                      Showing all {filtered.length} of {cases.length} cases
                    </div>
                  )}
                </div>
              </div>

              <CaseDetailPanel />
            </div>

          </div>
        </main>
      </section>

      {checkDetailModal}
    </>
  );
}

function statusLabel(s) {
  return { pending: "Pending", "in-progress": "In Progress", completed: "Completed", "qc-review": "QC Review", "on-hold": "On Hold" }[s] || s;
}
function priorityColor(p) {
  return { urgent: "#eb4d4b", high: "#f59e0b", normal: "#64748b" }[p] || "#64748b";
}

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import CaseTrendsChart from "./CaseTrendsChart";
// import { API_URL } from "../src/config";
// import CheckDetailForm from "./CheckDetailForm";
// import { computeCheckStatus } from "../src/checkFormsConfig";

// // ── Status tabs — kept for filtering logic
// const STATUS_TABS = [
//   { key: "all",         label: "All Cases"   },
//   { key: "pending",     label: "Active Cases" },
//   { key: "in-progress", label: "In Progress" },
//   { key: "completed",   label: "Completed"   },
// ];

// const DATE_FILTERS = [
//   { key: "today",  label: "Today"      },
//   { key: "week",   label: "This Week"  },
//   { key: "month",  label: "This Month" },
//   { key: "custom", label: "Custom"     },
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

// function statusLabel(s) {
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

// function getTabFromURL(search) {
//   const tab = new URLSearchParams(search).get("tab") || "";
//   return ["all", "pending", "in-progress", "completed"].includes(tab) ? tab : "";
// }

// function inferCheckStatus(caseStat) {
//   if (caseStat === "completed")   return "clear";
//   if (caseStat === "in-progress") return "in_progress";
//   if (caseStat === "pending")     return "pending";
//   return "na";
// }

// // ── Timeline events generator based on case status ─────────────────────────
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

// export default function Client() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [cases, setCases]               = useState([]);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [loading, setLoading]           = useState(true);
//   const [search, setSearch]             = useState("");
//   const [statusTab, setStatusTab]       = useState(() => getTabFromURL(location.search));
//   const [dateFilter, setDateFilter]     = useState("month");
//   const [customFrom, setCustomFrom]     = useState("");
//   const [customTo, setCustomTo]         = useState("");
//   const [activeDetailTab, setActiveDetailTab] = useState("overview");

//   const [openCheck, setOpenCheck] = useState(null);
//   const token = localStorage.getItem("token");
//   const user  = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();

//   const fetchCases = () => {
//     setLoading(true);
//     fetch(`${API_URL}/api/cases`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     })
//       .then(r => r.json())
//       .then(data => {
//         const list = data.cases || [];
//         setCases(list);
//         const currentTab = getTabFromURL(location.search);
//         const first = list.find(c => !currentTab || currentTab === "all" || c.status === currentTab);
//         setSelectedCase(first || list[0] || null);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { fetchCases(); }, []);

//   useEffect(() => {
//     const tab = getTabFromURL(location.search);
//     setStatusTab(tab);
//     setSearch("");
//     setActiveDetailTab("overview");
//     if (cases.length > 0) {
//       const first = cases.find(c => !tab || tab === "all" || c.status === tab);
//       setSelectedCase(first || null);
//     }
//   }, [location.search]);

//   const isInRange = (createdAt) => {
//     if (!createdAt) return true;
//     const d   = new Date(createdAt);
//     const now = new Date();
//     if (dateFilter === "today") return d.toDateString() === now.toDateString();
//     if (dateFilter === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
//     if (dateFilter === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
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

//   const isDashboard = !getTabFromURL(location.search);
//   const isSplitView = statusTab === "pending" || statusTab === "completed";
//   const isTotalCasesView = statusTab === "all";

//   const filtered = cases.filter(c => {
//     const matchTab    = !statusTab || statusTab === "all" || c.status === statusTab;
//     const matchSearch = !search ||
//       (c.case_id || "").toLowerCase().includes(search.toLowerCase()) ||
//       (c.candidate || c.candidate_name || "").toLowerCase().includes(search.toLowerCase());
//     const matchDate = isDashboard ? isInRange(c.created_at) : true;
//     return matchTab && matchSearch && matchDate;
//   });

//   const [totalDateFilter, setTotalDateFilter] = useState("month");
//   const [totalCustomFrom, setTotalCustomFrom] = useState("");
//   const [totalCustomTo, setTotalCustomTo]     = useState("");

//   const isInRangeWith = (createdAt, filterKey, from, to) => {
//     if (!createdAt) return true;
//     const d   = new Date(createdAt);
//     const now = new Date();
//     if (filterKey === "today") return d.toDateString() === now.toDateString();
//     if (filterKey === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
//     if (filterKey === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
//     if (filterKey === "custom") {
//       if (!from && !to) return true;
//       const f = from ? new Date(from) : null;
//       const t = to   ? new Date(to + "T23:59:59") : null;
//       if (f && d < f) return false;
//       if (t && d > t) return false;
//       return true;
//     }
//     return true;
//   };

//   const totalFiltered = cases.filter(c => {
//     const matchSearch = !search ||
//       (c.case_id || "").toLowerCase().includes(search.toLowerCase()) ||
//       (c.candidate || c.candidate_name || "").toLowerCase().includes(search.toLowerCase());
//     const matchDate = isInRangeWith(c.created_at, totalDateFilter, totalCustomFrom, totalCustomTo);
//     return matchSearch && matchDate;
//   });

//   const counts = {
//     all:           cases.length,
//     pending:       cases.filter(c => c.status === "pending").length,
//     "in-progress": cases.filter(c => c.status === "in-progress").length,
//     completed:     cases.filter(c => c.status === "completed").length,
//   };

//   const total           = cases.length;
//   const pendingLinkCount = counts["in-progress"];
//   const clearRate        = total > 0 ? Math.round((counts.completed / total) * 100) : 0;
//   const chartCases       = isDashboard ? cases.filter(c => isInRange(c.created_at)) : cases;

//   const getChecksArray = (c) => {
//     if (Array.isArray(c.checks)) return c.checks;
//     if (typeof c.checks === "string") return c.checks.split(/[·,]/).map(x => x.trim()).filter(Boolean);
//     return [];
//   };

//   const getCheckStatus = (c, checkName) => {
//     const detail = c.check_details?.[checkName];
//     if (detail) return computeCheckStatus(checkName, detail);
//     if (c.check_statuses && c.check_statuses[checkName]) return c.check_statuses[checkName];
//     return inferCheckStatus(c.status);
//   };

//   const getCheckTAT = (c, checkName) => {
//     const detail = c.check_details?.[checkName];
//     if (detail?.tat) return formatTAT(detail.tat);
//     if (detail?.turnaround_time) return formatTAT(detail.turnaround_time);
//     if (c.check_tats && c.check_tats[checkName]) return formatTAT(c.check_tats[checkName]);
//     return formatTAT(c.tat);
//   };

//   const exportCSV = () => {
//     const headers = ["Case ID", "Case Receive Date", "Candidate", "Client", "Checks", "TAT", "Status"];
//     const rows    = filtered.map(c => [
//       c.case_id,
//       c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—",
//       c.candidate || c.candidate_name,
//       c.client || c.client_name || "—",
//       displayChecks(c.checks),
//       formatTAT(c.tat),
//       statusLabel(c.status),
//     ]);
//     const csv  = [headers, ...rows].map(r => r.map(v => `"${v ?? ""}"`).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = `cases-${Date.now()}.csv`; a.click();
//     URL.revokeObjectURL(url);
//   };

//   // ── Summary Cards — Exact match to reference image ─────────────────────
//   const SummaryCards = ({ totalCount, activeCount, completedCount, pendingLinkCount: plCount, clearRate: cr }) => {
//     const cardBase = {
//       flex: 1,
//       minWidth: "210px",
//       background: "#fff",
//       borderRadius: "12px",
//       padding: "16px 20px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
//       cursor: "pointer",
//       transition: "transform 0.12s, box-shadow 0.12s",
//     };
//     const goTo = (tab) => navigate(`/Client?tab=${tab}`);

//     return (
//       <div style={{
//         display: "flex",
//         gap: "12px",
//         marginBottom: "24px",
//         flexWrap: "wrap"
//       }}>
//         {/* Total Cases — linked to sidebar's "Total Cases" tab */}
//         <div
//           onClick={() => goTo("all")}
//           title="View Total Cases"
//           style={{ ...cardBase, borderLeft: "6px solid #10b981" }}
//         >
//           <div style={{ fontSize: "36px", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>{totalCount}</div>
//           <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Total Cases</div>
//         </div>

//         {/* Active — linked to sidebar's "Active Cases" tab */}
//         <div
//           onClick={() => goTo("pending")}
//           title="View Active Cases"
//           style={{ ...cardBase, borderLeft: "6px solid #10b981" }}
//         >
//           <div style={{ fontSize: "36px", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>{activeCount}</div>
//           <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Active</div>
//         </div>

//         {/* Completed — linked to sidebar's "Completed Cases" tab */}
//         <div
//           onClick={() => goTo("completed")}
//           title="View Completed Cases"
//           style={{ ...cardBase, borderLeft: "6px solid #14b8a6" }}
//         >
//           <div style={{ fontSize: "36px", fontWeight: 700, color: "#14b8a6", lineHeight: 1 }}>{completedCount}</div>
//           <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Completed</div>
//         </div>

//         {/* Pending Link — linked to Generate Links (sidebar) */}
//         <div
//           onClick={() => navigate("/clientportal")}
//           title="Go to Generate Links"
//           style={{ ...cardBase, borderLeft: "6px solid #f59e0b" }}
//         >
//           <div style={{ fontSize: "36px", fontWeight: 700, color: "#f59e0b", lineHeight: 1 }}>{plCount}</div>
//           <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Pending Link</div>
//         </div>

//         {/* Clear Rate — linked to Reports & Trends (sidebar) */}
//         <div
//           onClick={() => navigate("/Trends")}
//           title="Go to Reports & Trends"
//           style={{ ...cardBase, borderLeft: "6px solid #1e40af" }}
//         >
//           <div style={{ fontSize: "36px", fontWeight: 700, color: "#1e40af", lineHeight: 1 }}>{cr}%</div>
//           <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Clear Rate</div>
//         </div>
//       </div>
//     );
//   };

//   // ── Check-wise Status grid ─────────────────────────────────────────────────
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
//           <div>
//             {left.map((chk, i) => renderRow(chk, i === left.length - 1))}
//           </div>
//           <div style={{ background: "#e2e8f0" }} />
//           <div>
//             {right.map((chk, i) => renderRow(chk, i === right.length - 1))}
//           </div>
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
//           <div style={{ background: "#27348B", color: "#fff", padding: "14px 18px", fontWeight: 700, fontSize: "14px", borderRadius: "6px 6px 0 0" }}>
//             CASE DETAIL — {selectedCase.case_id} | {selectedCase.candidate || selectedCase.candidate_name}
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
//                   { label: "Candidate", value: selectedCase.candidate || selectedCase.candidate_name },
//                   { label: "Status",    value: (
//                     <span style={{ background: getStatusMeta(selectedCase.status).color, color: "#fff",
//                       fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
//                       {statusLabel(selectedCase.status)}
//                     </span>
//                   )},
//                   { label: "Priority",  value: selectedCase.priority || "Normal" },
//                   { label: "TAT",       value: formatTAT(selectedCase.tat) },
//                   { label: "Created",   value: selectedCase.created_at
//                     ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
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
//             <button className="secondary-cta import" onClick={exportCSV}
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

//   const CaseListPanel = () => (
//     <div className="dash-inner-left">
//       <div className="down-table">
//         <div className="client-portal-cases">
//           <h3>{STATUS_TABS.find(t => t.key === statusTab)?.label.toUpperCase()} ({filtered.length})</h3>
//         </div>

//         {loading ? (
//           <p style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
//         ) : filtered.length === 0 ? (
//           <div style={{ padding: "40px", textAlign: "center" }}>
//             <p style={{ color: "#94a3b8", fontSize: "14px" }}>No {statusTab === "all" ? "" : statusTab + " "}cases found.</p>
//             {cases.length === 0 && (
//               <button className="primary-cta" onClick={() => navigate("/AddCase")} style={{ marginTop: "12px" }}>
//                 + Add Your First Case
//               </button>
//             )}
//           </div>
//         ) : (
//           <table>
//             <tbody>
//               {filtered.map(c => {
//                 const meta       = getStatusMeta(c.status);
//                 const color      = meta.color;
//                 const pct        = meta.pct;
//                 const dayLabel   = meta.dayLabel(c);
//                 const name       = c.candidate || c.candidate_name || "—";
//                 const isSelected = selectedCase?.case_id === c.case_id;
//                 return (
//                   <tr className="boder-tbl active" key={c.case_id}
//                     onClick={() => { setSelectedCase(c); setActiveDetailTab("overview"); }}
//                     style={{
//                       cursor: "pointer",
//                       background: isSelected ? "#eef3ff" : undefined,
//                       borderLeft: isSelected ? "3px solid #2b3b8c" : "3px solid transparent",
//                     }}>
//                     <td>
//                       <div className="criminal-case">
//                         <p>
//                           <span>{c.case_id}</span><br />
//                           <span style={{ fontSize: "11px", color: "#94a3b8" }}>
//                       {displayChecks(c.checks)}
//                           </span>
//                         </p>
//                       </div>
//                     </td>
//                     <td><div className="client-names">{name}</div></td>
//                     <td>
//                       <div className="custom-progress">
//                         <div className="custom-progress-bar" style={{ width: `${pct}%`, background: color }} />
//                       </div>
//                       <p className="progress-client-text" style={{ color }}>{dayLabel}</p>
//                     </td>
//                     <td>
//                       <div className="parent-client-boxes">
//                         <span className="client-cases-box" style={{ background: color }} />
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );

//   const StatusBadge = ({ status }) => (
//     <span style={{
//       background: getStatusMeta(status).color, color: "#fff", fontSize: "12px", fontWeight: 700,
//       padding: "6px 18px", borderRadius: "6px", display: "inline-block", minWidth: "90px", textAlign: "center",
//     }}>
//       {statusLabel(status)}
//     </span>
//   );

//   const ViewButton = ({ c }) => (
//     <button
//       onClick={() => {
//         const dest = c.status === "completed" ? "completed" : "pending";
//         navigate(`/Client?tab=${dest}`);
//         setSelectedCase(c);
//         setActiveDetailTab("overview");
//       }}
//       style={{
//         background: "#27348B", color: "#fff", border: "none", padding: "10px 22px",
//         borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
//       }}
//     >
//       View
//     </button>
//   );

//   const EditButton = ({ c }) => (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         // Client-editable only while the case hasn't gone to verification yet.
//         navigate(`/AddCase?editCaseId=${encodeURIComponent(c.case_id)}`);
//       }}
//       disabled={c.status !== "pending"}
//       title={c.status !== "pending" ? "Case is already in verification — editing is locked" : "Edit case"}
//       style={{
//         background: c.status === "pending" ? "#fff" : "#f1f5f9",
//         color: c.status === "pending" ? "#27348B" : "#94a3b8",
//         border: `1px solid ${c.status === "pending" ? "#27348B" : "#e2e8f0"}`,
//         padding: "9px 18px",
//         borderRadius: "6px", fontSize: "13px", fontWeight: 700,
//         cursor: c.status === "pending" ? "pointer" : "not-allowed",
//       }}
//     >
//       Edit
//     </button>
//   );

//   const CasesTable = ({ rows, showDate }) => (
//     <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
//       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
//         <thead>
//           <tr style={{ background: "#27348B" }}>
//             {[
//               "Case ID",
//               ...(showDate ? ["Case Receive Date"] : []),
//               "Candidate", "Client", "Checks", "Status", "TAT", "Action",
//             ].map(h => (
//               <th key={h} style={{
//                 padding: "16px 20px", textAlign: "left", color: "#fff",
//                 fontWeight: 700, fontSize: "13px", textTransform: "uppercase",
//                 letterSpacing: "0.04em", whiteSpace: "nowrap",
//               }}>
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr><td colSpan={showDate ? 8 : 7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
//           ) : rows.length === 0 ? (
//             <tr><td colSpan={showDate ? 8 : 7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No cases found.</td></tr>
//           ) : (
//             rows.map((c, i) => (
//               <tr key={c.case_id} style={{
//                 background: i % 2 === 0 ? "#f5f7fc" : "#fff",
//                 borderBottom: "1px solid #eef1f6",
//               }}>
//                 <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.case_id}</td>
//                 {showDate && (
//                   <td style={{ padding: "18px 20px", color: "#1e293b" }}>
//                     {c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
//                   </td>
//                 )}
//                 <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.candidate || c.candidate_name || "—"}</td>
//                 <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.client || c.client_name || "—"}</td>
//                 <td style={{ padding: "18px 20px", color: "#1e293b" }}>
//                   {displayChecks(c.checks) || "—"}
//                 </td>
//                 <td style={{ padding: "18px 20px" }}><StatusBadge status={c.status} /></td>
//                 <td style={{ padding: "18px 20px", color: "#1e293b" }}>{formatTAT(c.tat)}</td>
//                 <td style={{ padding: "18px 20px" }}>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <ViewButton c={c} />
//                     <EditButton c={c} />
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
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

//   // Shared Date Filter Component
//   const DateFilterBar = ({ filter, setFilter, customFromVal, setCustomFromVal, customToVal, setCustomToVal }) => (
//     <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
//       {DATE_FILTERS.map(df => (
//         <button 
//           key={df.key} 
//           className={`tab-cta ${filter === df.key ? "active" : ""}`}
//           onClick={() => setFilter(df.key)}
//         >
//           {df.label}
//         </button>
//       ))}
//       {filter === "custom" && (
//         <>
//           <input 
//             type="date" 
//             value={customFromVal} 
//             onChange={e => setCustomFromVal(e.target.value)}
//             style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }} 
//           />
//           <span style={{ color: "#94a3b8" }}>→</span>
//           <input 
//             type="date" 
//             value={customToVal} 
//             onChange={e => setCustomToVal(e.target.value)}
//             style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }} 
//           />
//         </>
//       )}
//     </div>
//   );

//   // ════════════════════════════════════════════════════════════════════════
//   // TOTAL CASES VIEW
//   // ════════════════════════════════════════════════════════════════════════
//   if (isTotalCasesView) {
//     return (
//       <>
//         <Sidebar />
//         <section id="content">
//           <Header />
//           <main>
//             <div className="dash-wrper">
//               <div className="dash-upper-head">
//                 <div className="left">
//                   <h3 className="dash-title-text">Total Cases</h3>
//                   <span style={{ fontSize: "12px", color: "#64748b", background: "#eef3ff", padding: "3px 10px", borderRadius: "20px", marginLeft: "10px" }}>
//                     {totalFiltered.length} records
//                   </span>
//                 </div>
//                 <div className="right">
//                   <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
//                     value={search} onChange={e => setSearch(e.target.value)} />
//                   {search && (
//                     <button onClick={() => setSearch("")}
//                       style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
//                   )}
//                   <button className="primary-cta export" onClick={exportCSV}>
//                     <img src="images/dashboard/export-icon.svg" alt="" /> Export
//                   </button>
//                 </div>
//               </div>

//             <SummaryCards 
//   totalCount={totalFiltered.length}
//   activeCount={counts.pending} 
//   completedCount={counts.completed} 
//   pendingLinkCount={pendingLinkCount} 
//   clearRate={clearRate} 
// />

//               <DateFilterBar 
//                 filter={totalDateFilter} 
//                 setFilter={setTotalDateFilter} 
//                 customFromVal={totalCustomFrom} 
//                 setCustomFromVal={setTotalCustomFrom} 
//                 customToVal={totalCustomTo} 
//                 setCustomToVal={setTotalCustomTo} 
//               />

//               <CasesTable rows={totalFiltered} showDate />
//             </div>
//           </main>
//         </section>

//         {checkDetailModal}
//       </>
//     );
//   }

//   // ════════════════════════════════════════════════════════════════════════
//   // SPLIT VIEW — Active / Completed Cases
//   // ════════════════════════════════════════════════════════════════════════
//   if (isSplitView) {
//     return (
//       <>
//         <Sidebar />
//         <section id="content">
//           <Header />
//           <main>
//             <div className="dash-wrper">
//               <div className="dash-upper-head">
//                 <div className="left">
//                   <h3 className="dash-title-text">
//                     {STATUS_TABS.find(t => t.key === statusTab)?.label}
//                   </h3>
//                 </div>
//                 <div className="right">
//                   <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
//                     value={search} onChange={e => setSearch(e.target.value)} />
//                   {search && (
//                     <button onClick={() => setSearch("")}
//                       style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
//                   )}
//                   <button className="primary-cta export" onClick={exportCSV}>
//                     <img src="images/dashboard/export-icon.svg" alt="" /> Export
//                   </button>
//                 </div>
//               </div>

//              <SummaryCards 
//   totalCount={total}
//   activeCount={counts.pending} 
//   completedCount={counts.completed} 
//   pendingLinkCount={pendingLinkCount} 
//   clearRate={clearRate} 
// />

//               <DateFilterBar 
//                 filter={dateFilter} 
//                 setFilter={setDateFilter} 
//                 customFromVal={customFrom} 
//                 setCustomFromVal={setCustomFrom} 
//                 customToVal={customTo} 
//                 setCustomToVal={setCustomTo} 
//               />

//               <div className="dash-inner-wrp-both client-portal">
//                 <CaseListPanel />
//                 <CaseDetailPanel />
//               </div>
//             </div>
//           </main>
//         </section>

//         {checkDetailModal}
//       </>
//     );
//   }

//   // ════════════════════════════════════════════════════════════════════════
//   // DASHBOARD (Home)
//   // ════════════════════════════════════════════════════════════════════════
//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">
//             <div className="dash-upper-head">
//               <div className="left">
//                 <div className="dash-title-flex">
//                   <h3 className="dash-title-text">Dashboard</h3>
//                   <span style={{ fontSize: "12px", color: "#64748b", background: "#eef3ff", padding: "3px 10px", borderRadius: "20px" }}>
//                     {user.name || "My Account"}
//                   </span>
//                 </div>
//               </div>
//               <div className="right">
//                 <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
//                   value={search} onChange={e => setSearch(e.target.value)} />
//                 {search && (
//                   <button onClick={() => setSearch("")}
//                     style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
//                 )}
//                 <button className="primary-cta export" onClick={exportCSV}>
//                   <img src="images/dashboard/export-icon.svg" alt="" /> Export
//                 </button>
//               </div>
//             </div>

//             <DateFilterBar 
//               filter={dateFilter} 
//               setFilter={setDateFilter} 
//               customFromVal={customFrom} 
//               setCustomFromVal={setCustomFrom} 
//               customToVal={customTo} 
//               setCustomToVal={setCustomTo} 
//             />

//             {/* Stat cards (matches screenshot) */}
//             <SummaryCards 
//               totalCount={total}
//               activeCount={counts.pending} 
//               completedCount={counts.completed} 
//               pendingLinkCount={pendingLinkCount} 
//               clearRate={clearRate} 
//             />

//             {/* Chart + Quick Stats */}
//             <div className="dash-inner-wrp-both" style={{ marginBottom: "0" }}>
//               <div className="dash-inner-left">
//                 <CaseTrendsChart
//                   casesData={chartCases}
//                   label={DATE_FILTERS.find(d => d.key === dateFilter)?.label}
//                   vsText={counts.completed > 0 ? `▲ ${clearRate}% clear rate` : "No completions yet"}
//                   vsColor={counts.completed > 0 ? "#14d8a7" : "#94a3b8"}
//                   dateFilter={dateFilter} customFrom={customFrom} customTo={customTo}
//                 />
//               </div>
//               <div className="dash-inner-right">
//                 <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", height: "100%" }}>
//                   <div style={{ background: "#27348B", padding: "14px 20px" }}>
//                     <h3 style={{ margin: 0, color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em" }}>
//                       QUICK STATS
//                     </h3>
//                   </div>
//                   {[
//                     { label: "Total Cases",  value: loading ? "—" : total },
//                     { label: "Active Cases", value: loading ? "—" : counts.pending },
//                     { label: "Pending Link", value: loading ? "—" : pendingLinkCount },
//                     { label: "Completed",    value: loading ? "—" : counts.completed },
//                     { label: "Clear Rate",   value: loading ? "—" : `${clearRate}%` },
//                     { label: "Avg TAT",      value: "—" },
//                   ].map((row, i) => (
//                     <div key={row.label} style={{
//                       display: "flex", justifyContent: "space-between", alignItems: "center",
//                       padding: "18px 20px",
//                       background: i % 2 === 0 ? "#eef3ff" : "#fff",
//                       borderBottom: "1px solid #e8edf5",
//                     }}>
//                       <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}>{row.label}</span>
//                       <strong style={{ fontSize: "15px", color: "#1e293b", fontWeight: 700 }}>{row.value}</strong>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div style={{ marginTop: "4px" }}>
//               <CasesTable rows={chartCases.slice(0, 5)} showDate={false} />
//             </div>
//           </div>
//         </main>
//       </section>

//       {checkDetailModal}
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";
import CheckDetailForm from "./CheckDetailForm";

const CHECK_ABBREV = {
  employment: "Employment Verification",
  education: "Education Verification",
  address: "Address Verification",
  database: "Database Check",
  criminal: "Criminal Verification",
  drug: "Drug Test",
  court: "Court Record Check",
  identity: "Identity Check",
  background: "Background Verification",
};

function displayChecks(checks) {
  const arr = Array.isArray(checks)
    ? checks
    : typeof checks === "string"
    ? checks.split(/[·,]/).map((x) => x.trim()).filter(Boolean)
    : [];
  return arr.map((c) => CHECK_ABBREV[c.toLowerCase()] || c).join(", ");
}

function getTabFromURL(search) {
  const tab = new URLSearchParams(search).get("tab") || "";
  return ["all", "pending", "completed"].includes(tab) ? tab : "all";
}

export default function ClientCases() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusTab, setStatusTab] = useState(() => getTabFromURL(location.search));

  // Search & Filter States
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("01 Sep 2025 - 30 Sep 2025");
  const [caseType, setCaseType] = useState("All");
  const [checkTypeFilter, setCheckTypeFilter] = useState("All");
  const [tatStatusFilter, setTatStatusFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [openCheck, setOpenCheck] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setCases(data.cases || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    const tab = getTabFromURL(location.search);
    setStatusTab(tab);
  }, [location.search]);

  const goToTab = (tab) => {
    navigate(`/Client?tab=${tab}`);
  };

  const resetFilters = () => {
    setSearch("");
    setCaseType("All");
    setCheckTypeFilter("All");
    setTatStatusFilter("All");
    setStatusFilter("All");
  };

  // Status Filter mapping logic
  const filteredCases = cases.filter((c) => {
    if (statusTab === "pending" && c.status !== "pending" && c.status !== "in-progress") return false;
    if (statusTab === "completed" && c.status !== "completed") return false;

    if (search) {
      const q = search.toLowerCase();
      const matchId = (c.case_id || "").toLowerCase().includes(q);
      const matchName = (c.candidate || c.candidate_name || "").toLowerCase().includes(q);
      if (!matchId && !matchName) return false;
    }
    return true;
  });

  const totalCount = cases.length;
  const activeCount = cases.filter((c) => c.status === "pending" || c.status === "in-progress").length;
  const completedCount = cases.filter((c) => c.status === "completed").length;
  const pendingLinkCount = cases.filter((c) => c.status === "pending_link").length || 4;

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed") {
      return <span style={{ background: "#dcfce7", color: "#166534", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>Completed</span>;
    }
    if (s === "in-progress" || s === "in progress" || s === "pending") {
      return <span style={{ background: "#d1fae5", color: "#065f46", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>• In Progress</span>;
    }
    if (s === "pending link" || s === "pending_link") {
      return <span style={{ background: "#ffedd5", color: "#9a3412", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>Pending Link</span>;
    }
    if (s === "failed") {
      return <span style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>Failed</span>;
    }
    return <span style={{ background: "#e2e8f0", color: "#475569", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>{status}</span>;
  };

  return (
    <>
      <Sidebar />
      <section id="content" style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <Header />
        <main style={{ padding: "24px" }}>
          {/* Header Title Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                {statusTab === "all" && "Total Cases"}
                {statusTab === "pending" && "Active Cases"}
                {statusTab === "completed" && "Completed Cases"}
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                {statusTab === "all" && "View all cases and their current status."}
                {statusTab === "pending" && "View and manage all cases that are currently in progress."}
                {statusTab === "completed" && "View all successfully completed cases and download reports."}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search by case ID, candidate name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: "8px 14px 8px 36px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    width: "280px",
                    fontSize: "13px",
                    background: "#fff",
                  }}
                />
                <span style={{ position: "absolute", left: "12px", top: "8px", color: "#94a3b8" }}>🔍</span>
              </div>
              <button style={{ background: "#059669", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                📥 Export
              </button>
              {statusTab !== "pending" && (
                <button style={{ background: "#fff", border: "1px solid #cbd5e1", padding: "8px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", color: "#334155", cursor: "pointer" }}>
                  📥 Download Documentation
                </button>
              )}
            </div>
          </div>

          {/* Top Cards Section - Switches / Displays according to Tab */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            {statusTab === "all" && (
              <>
                <div onClick={() => goToTab("all")} style={cardStyle("#22c55e", true)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dcfce7", "#16a34a")}>📄</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#16a34a" }}>{totalCount}</div>
                      <div style={{ fontSize: "13px", color: "#475569" }}>Total Cases</div>
                    </div>
                  </div>
                </div>

                <div onClick={() => goToTab("pending")} style={cardStyle("#3b82f6")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dbeafe", "#2563eb")}>📄</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#2563eb" }}>{activeCount}</div>
                      <div style={{ fontSize: "13px", color: "#475569" }}>Active Cases</div>
                    </div>
                  </div>
                </div>

                <div onClick={() => goToTab("completed")} style={cardStyle("#a855f7")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#f3e8ff", "#9333ea")}>✓</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#9333ea" }}>{completedCount}</div>
                      <div style={{ fontSize: "13px", color: "#475569" }}>Completed Cases</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#f59e0b")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#fef3c7", "#d97706")}>🕒</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#d97706" }}>{pendingLinkCount}</div>
                      <div style={{ fontSize: "13px", color: "#475569" }}>Pending Link</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {statusTab === "pending" && (
              <>
                <div style={cardStyle("#3b82f6")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dbeafe", "#2563eb")}>🔍</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#1e3a8a" }}>{activeCount}</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Active Cases</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>In Progress</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#22c55e")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dcfce7", "#16a34a")}>📅</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#16a34a" }}>0</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Due Today</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#f59e0b")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#fef3c7", "#d97706")}>🕒</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight 700, color: "#d97706" }}>0</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Due Soon</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Next 3 Days</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#ef4444")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#fee2e2", "#dc2626")}>📅</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#dc2626" }}>0</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Overdue</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {statusTab === "completed" && (
              <>
                <div style={cardStyle("#22c55e")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dcfce7", "#16a34a")}>📄</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#16a34a" }}>{completedCount}</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Completed Cases</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#3b82f6")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#dbeafe", "#2563eb")}>📄</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#2563eb" }}>{completedCount}</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Total Completed</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#a855f7")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#f3e8ff", "#9333ea")}>📄</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#9333ea" }}>0</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Reports Downloaded Today</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#f59e0b")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#fef3c7", "#d97706")}>🕒</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#d97706" }}>0</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Pending Link</div>
                    </div>
                  </div>
                </div>

                <div style={cardStyle("#10b981")}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={iconBoxStyle("#d1fae5", "#059669")}>📊</div>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#059669" }}>100%</div>
                      <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600 }}>Completion Rate</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Filters Bar Section */}
          <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={labelStyle}>Date Range</label>
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={selectStyle}>
                  <option>01 Sep 2025 - 30 Sep 2025</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Case Type</label>
                <select value={caseType} onChange={(e) => setCaseType(e.target.value)} style={selectStyle}>
                  <option value="All">All</option>
                  <option value="New Case">New Case</option>
                </select>
              </div>

              {statusTab === "all" && (
                <div>
                  <label style={labelStyle}>Status</label>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending Link">Pending Link</option>
                  </select>
                </div>
              )}

              <div>
                <label style={labelStyle}>Check Type (All Checks)</label>
                <select value={checkTypeFilter} onChange={(e) => setCheckTypeFilter(e.target.value)} style={selectStyle}>
                  <option value="All">All</option>
                  <option value="Address Verification">Address Verification</option>
                  <option value="Education Verification">Education Verification</option>
                  <option value="Identity Check">Identity Check</option>
                </select>
              </div>

              {statusTab === "pending" && (
                <div>
                  <label style={labelStyle}>TAT Status</label>
                  <select value={tatStatusFilter} onChange={(e) => setTatStatusFilter(e.target.value)} style={selectStyle}>
                    <option value="All">All</option>
                    <option value="On Time">On Time</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
              )}
            </div>

            {statusTab === "pending" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
                <div style={{ position: "relative", width: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search by Case ID, Candidate Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ ...selectStyle, paddingLeft: "30px" }}
                  />
                  <span style={{ position: "absolute", left: "10px", top: "7px", color: "#94a3b8" }}>🔍</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={resetFilters} style={{ background: "#fff", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", cursor: "pointer", color: "#334155" }}>
                    🔄 Reset
                  </button>
                  <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                    🔍 Apply Filters
                  </button>
                </div>
              </div>
            )}
            {statusTab !== "pending" && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#64748b", fontSize: "13px", cursor: "pointer" }}>
                  🔄 Reset
                </button>
              </div>
            )}
          </div>

          {/* Table Data View */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#0b192c", color: "#fff" }}>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>CASE ID ↕</th>
                  <th style={thStyle}>CANDIDATE NAME ↕</th>
                  <th style={thStyle}>CASE TYPE</th>
                  <th style={thStyle}>CHECK TYPE (ALL CHECKS)</th>
                  <th style={thStyle}>ASSIGNED DATE ↕</th>
                  <th style={thStyle}>TAT</th>
                  <th style={thStyle}>STATUS</th>
                  <th style={thStyle}>
                    {statusTab === "completed" ? "REPORT DOWNLOAD" : "DOCUMENTATION"}
                  </th>
                  <th style={thStyle}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>Loading cases...</td>
                  </tr>
                ) : filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>No cases found.</td>
                  </tr>
                ) : (
                  filteredCases.map((c, index) => (
                    <tr key={c.case_id || index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={{ ...tdStyle, color: "#2563eb", fontWeight: "600" }}>{c.case_id}</td>
                      <td style={{ ...tdStyle, fontWeight: "600", color: "#1e293b" }}>{c.candidate || c.candidate_name || "—"}</td>
                      <td style={tdStyle}>{c.case_type || "New Case"}</td>
                      <td style={{ ...tdStyle, maxWidth: "260px" }}>{displayChecks(c.checks)}</td>
                      <td style={tdStyle}>
                        {c.created_at ? new Date(c.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "12 Sep 2025"}
                      </td>
                      <td style={tdStyle}>{c.tat ? `${c.tat} Days` : "5 Days"}</td>
                      <td style={tdStyle}>{getStatusBadge(c.status)}</td>
                      <td style={tdStyle}>
                        {statusTab === "completed" ? (
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button style={btnLightStyle}>📥 Interim Report</button>
                            <button style={btnLightStyle}>📥 Final Report</button>
                          </div>
                        ) : (
                          <button style={btnLightStyle}>📥 Download</button>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            onClick={() => {
                              setSelectedCase(c);
                              setOpenCheck("overview");
                            }}
                            style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", padding: "4px 10px", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }}
                          >
                            View Details
                          </button>
                          <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", borderTop: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Showing 1 to {filteredCases.length} of {filteredCases.length} entries ({statusTab === "pending" ? "In Progress" : statusTab})
              </span>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <button style={pageBtnStyle}>&lt;</button>
                <button style={{ ...pageBtnStyle, background: "#2563eb", color: "#fff", border: "none" }}>1</button>
                <button style={pageBtnStyle}>&gt;</button>
              </div>
            </div>
          </div>
        </main>
      </section>

      {openCheck && selectedCase && (
        <CheckDetailForm
          caseObj={selectedCase}
          checkKey={openCheck}
          onClose={() => setOpenCheck(null)}
        />
      )}
    </>
  );
}

// Inline Style Helpers
const cardStyle = (borderColor, active = false) => ({
  background: "#fff",
  borderRadius: "8px",
  padding: "16px",
  border: "1px solid #e2e8f0",
  borderLeft: `4px solid ${borderColor}`,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  cursor: "pointer",
});

const iconBoxStyle = (bg, color) => ({
  width: "38px",
  height: "38px",
  borderRadius: "6px",
  background: bg,
  color: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
});

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "4px",
};

const selectStyle = {
  width: "100%",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "12px",
  background: "#fff",
  color: "#334155",
};

const thStyle = {
  padding: "12px 14px",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.05em",
};

const tdStyle = {
  padding: "12px 14px",
  color: "#334155",
};

const btnLightStyle = {
  background: "#f8fafc",
  border: "1px solid #cbd5e1",
  color: "#334155",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "11px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
};

const pageBtnStyle = {
  padding: "4px 10px",
  border: "1px solid #cbd5e1",
  background: "#fff",
  borderRadius: "4px",
  fontSize: "12px",
  cursor: "pointer",
  color: "#334155",
};
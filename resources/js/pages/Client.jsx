
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
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CaseTrendsChart from "./CaseTrendsChart";
import { API_URL } from "../src/config";
import CheckDetailForm from "./CheckDetailForm";
import { computeCheckStatus } from "../src/checkFormsConfig";

// ── Status tabs — kept for filtering logic
const STATUS_TABS = [
  { key: "all",         label: "All Cases"   },
  { key: "pending",     label: "Active Cases" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed",   label: "Completed"   },
];

const DATE_FILTERS = [
  { key: "today",  label: "Today"      },
  { key: "week",   label: "This Week"  },
  { key: "month",  label: "This Month" },
  { key: "custom", label: "Custom"     },
];

const CHECK_BADGE = {
  clear:       { label: "Clear",       bg: "#10b981", color: "#fff" },
  submitted:   { label: "Submitted",   bg: "#3b82f6", color: "#fff" },
  in_progress: { label: "In Progress", bg: "#028090", color: "#fff" },
  pending:     { label: "Pending",     bg: "#f59e0b", color: "#fff" },
  discrepancy: { label: "Discrepancy", bg: "#ef4444", color: "#fff" },
  na:          { label: "N/A",         bg: "#94a3b8", color: "#fff" },
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
  "pending":     { color: "#f59e0b", pct: 20, dayLabel: () => "Day 1/7" },
  "in-progress": { color: "#028090", pct: 60, dayLabel: () => "Day 4/7" },
  "qc-review":   { color: "#7c3aed", pct: 85, dayLabel: () => "Day 6/7" },
  "completed":   { color: "#10b981", pct: 100, dayLabel: () => "Done"   },
  "on-hold":     { color: "#94a3b8", pct: 30, dayLabel: () => "On Hold" },
};

function getStatusMeta(status) {
  return STATUS_META[status] || STATUS_META["pending"];
}

function statusLabel(s) {
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

// ── Displays the case-level TAT as the individual per-check values
//    (e.g. "5, 6 days" for Employment=5 + Education=6) using the check_tat
//    breakdown AddCase.jsx saves, instead of combining them into one
//    number. Falls back to the single overall_tat/tat value for older
//    cases that don't have a check_tat breakdown. Mirrors AllCases.jsx so
//    admin and client see the same TAT for the same case.
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

function getTabFromURL(search) {
  const tab = new URLSearchParams(search).get("tab") || "";
  return ["all", "pending", "in-progress", "completed"].includes(tab) ? tab : "";
}

function inferCheckStatus(caseStat) {
  if (caseStat === "completed")   return "clear";
  if (caseStat === "in-progress") return "in_progress";
  if (caseStat === "pending")     return "pending";
  return "na";
}

// ── Timeline events generator based on case status ─────────────────────────
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

export default function Client() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases]               = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [statusTab, setStatusTab]       = useState(() => getTabFromURL(location.search));
  const [dateFilter, setDateFilter]     = useState("month");
  const [customFrom, setCustomFrom]     = useState("");
  const [customTo, setCustomTo]         = useState("");
  const [activeDetailTab, setActiveDetailTab] = useState("overview");

  const [openCheck, setOpenCheck] = useState(null);
  const token = localStorage.getItem("token");
  const user  = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; } })();

  const fetchCases = () => {
    setLoading(true);
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => r.json())
      .then(data => {
        const list = data.cases || [];
        setCases(list);
        const currentTab = getTabFromURL(location.search);
        const first = list.find(c => !currentTab || currentTab === "all" || c.status === currentTab);
        setSelectedCase(first || list[0] || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCases(); }, []);

  useEffect(() => {
    const tab = getTabFromURL(location.search);
    setStatusTab(tab);
    setSearch("");
    setActiveDetailTab("overview");
    if (cases.length > 0) {
      const first = cases.find(c => !tab || tab === "all" || c.status === tab);
      setSelectedCase(first || null);
    }
  }, [location.search]);

  const isInRange = (createdAt) => {
    if (!createdAt) return true;
    const d   = new Date(createdAt);
    const now = new Date();
    if (dateFilter === "today") return d.toDateString() === now.toDateString();
    if (dateFilter === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
    if (dateFilter === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
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

  const isDashboard = !getTabFromURL(location.search);
  const isSplitView = statusTab === "pending" || statusTab === "completed";
  const isTotalCasesView = statusTab === "all";

  const filtered = cases.filter(c => {
    const matchTab    = !statusTab || statusTab === "all" || c.status === statusTab;
    const matchSearch = !search ||
      (c.case_id || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.candidate || c.candidate_name || "").toLowerCase().includes(search.toLowerCase());
    const matchDate = isDashboard ? isInRange(c.created_at) : true;
    return matchTab && matchSearch && matchDate;
  });

  const [totalDateFilter, setTotalDateFilter] = useState("month");
  const [totalCustomFrom, setTotalCustomFrom] = useState("");
  const [totalCustomTo, setTotalCustomTo]     = useState("");

  const isInRangeWith = (createdAt, filterKey, from, to) => {
    if (!createdAt) return true;
    const d   = new Date(createdAt);
    const now = new Date();
    if (filterKey === "today") return d.toDateString() === now.toDateString();
    if (filterKey === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
    if (filterKey === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
    if (filterKey === "custom") {
      if (!from && !to) return true;
      const f = from ? new Date(from) : null;
      const t = to   ? new Date(to + "T23:59:59") : null;
      if (f && d < f) return false;
      if (t && d > t) return false;
      return true;
    }
    return true;
  };

  const totalFiltered = cases.filter(c => {
    const matchSearch = !search ||
      (c.case_id || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.candidate || c.candidate_name || "").toLowerCase().includes(search.toLowerCase());
    const matchDate = isInRangeWith(c.created_at, totalDateFilter, totalCustomFrom, totalCustomTo);
    return matchSearch && matchDate;
  });

  const counts = {
    all:           cases.length,
    pending:       cases.filter(c => c.status === "pending").length,
    "in-progress": cases.filter(c => c.status === "in-progress").length,
    completed:     cases.filter(c => c.status === "completed").length,
  };

  const total           = cases.length;
  const pendingLinkCount = counts["in-progress"];
  const clearRate        = total > 0 ? Math.round((counts.completed / total) * 100) : 0;
  const chartCases       = isDashboard ? cases.filter(c => isInRange(c.created_at)) : cases;

  const getChecksArray = (c) => {
    if (Array.isArray(c.checks)) return c.checks;
    if (typeof c.checks === "string") return c.checks.split(/[·,]/).map(x => x.trim()).filter(Boolean);
    return [];
  };

  const getCheckStatus = (c, checkName) => {
    const detail = c.check_details?.[checkName];
    if (detail) return computeCheckStatus(checkName, detail);
    if (c.check_statuses && c.check_statuses[checkName]) return c.check_statuses[checkName];
    return inferCheckStatus(c.status);
  };

  // ── Per-check TAT — reads the real check_tat breakdown the API now
  //    returns (previously this looked for `check_tats`, plural, which
  //    the backend never sends, so this fallback silently never matched
  //    and every case fell through to the old case-age `tat` field).
  const getCheckTAT = (c, checkName) => {
    const detail = c.check_details?.[checkName];
    if (detail?.tat) return formatTAT(detail.tat);
    if (detail?.turnaround_time) return formatTAT(detail.turnaround_time);
    if (c.check_tat && c.check_tat[checkName] != null) return formatTAT(c.check_tat[checkName]);
    return formatTAT(c.overall_tat ?? c.tat);
  };

  const exportCSV = () => {
    const headers = ["Case ID", "Case Receive Date", "Candidate", "Client", "Checks", "TAT", "Status"];
    const rows    = filtered.map(c => [
      c.case_id,
      c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—",
      c.candidate || c.candidate_name,
      c.client || c.client_name || "—",
      displayChecks(c.checks),
      formatTatDisplay(c),
      statusLabel(c.status),
    ]);
    const csv  = [headers, ...rows].map(r => r.map(v => `"${v ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `cases-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Summary Cards — Exact match to reference image ─────────────────────
  const SummaryCards = ({ totalCount, activeCount, completedCount, pendingLinkCount: plCount, clearRate: cr }) => {
    const cardBase = {
      flex: 1,
      minWidth: "210px",
      background: "#fff",
      borderRadius: "12px",
      padding: "16px 20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      cursor: "pointer",
      transition: "transform 0.12s, box-shadow 0.12s",
    };
    const goTo = (tab) => navigate(`/Client?tab=${tab}`);

    return (
      <div style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap"
      }}>
        {/* Total Cases — linked to sidebar's "Total Cases" tab */}
        <div
          onClick={() => goTo("all")}
          title="View Total Cases"
          style={{ ...cardBase, borderLeft: "6px solid #10b981" }}
        >
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>{totalCount}</div>
          <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Total Cases</div>
        </div>

        {/* Active — linked to sidebar's "Active Cases" tab */}
        <div
          onClick={() => goTo("pending")}
          title="View Active Cases"
          style={{ ...cardBase, borderLeft: "6px solid #10b981" }}
        >
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>{activeCount}</div>
          <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Active</div>
        </div>

        {/* Completed — linked to sidebar's "Completed Cases" tab */}
        <div
          onClick={() => goTo("completed")}
          title="View Completed Cases"
          style={{ ...cardBase, borderLeft: "6px solid #14b8a6" }}
        >
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#14b8a6", lineHeight: 1 }}>{completedCount}</div>
          <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Completed</div>
        </div>

        {/* Pending Link — linked to Generate Links (sidebar) */}
        <div
          onClick={() => navigate("/clientportal")}
          title="Go to Generate Links"
          style={{ ...cardBase, borderLeft: "6px solid #f59e0b" }}
        >
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#f59e0b", lineHeight: 1 }}>{plCount}</div>
          <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Pending Link</div>
        </div>

        {/* Clear Rate — linked to Reports & Trends (sidebar) */}
        <div
          onClick={() => navigate("/Trends")}
          title="Go to Reports & Trends"
          style={{ ...cardBase, borderLeft: "6px solid #1e40af" }}
        >
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#1e40af", lineHeight: 1 }}>{cr}%</div>
          <div style={{ fontSize: "14px", color: "#475569", marginTop: "6px", fontWeight: 500 }}>Clear Rate</div>
        </div>
      </div>
    );
  };

  // ── Check-wise Status grid ─────────────────────────────────────────────────
  const CheckwiseGrid = ({ c }) => {
    const checks = getChecksArray(c);
    if (checks.length === 0) return (
      <p style={{ color: "#94a3b8", fontSize: "13px", padding: "12px 0" }}>No checks assigned.</p>
    );
    const left  = checks.filter((_, i) => i % 2 === 0);
    const right = checks.filter((_, i) => i % 2 !== 0);

    const renderRow = (chk, isLast) => {
      const badge = CHECK_BADGE[getCheckStatus(c, chk)] || CHECK_BADGE.na;
      const tat   = getCheckTAT(c, chk);
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
          <div>
            {left.map((chk, i) => renderRow(chk, i === left.length - 1))}
          </div>
          <div style={{ background: "#e2e8f0" }} />
          <div>
            {right.map((chk, i) => renderRow(chk, i === right.length - 1))}
          </div>
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
          <div style={{ background: "#27348B", color: "#fff", padding: "14px 18px", fontWeight: 700, fontSize: "14px", borderRadius: "6px 6px 0 0" }}>
            CASE DETAIL — {selectedCase.case_id} | {selectedCase.candidate || selectedCase.candidate_name}
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
                  { label: "Case ID",   value: selectedCase.case_id },
                  { label: "Candidate", value: selectedCase.candidate || selectedCase.candidate_name },
                  { label: "Status",    value: (
                    <span style={{ background: getStatusMeta(selectedCase.status).color, color: "#fff",
                      fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
                      {statusLabel(selectedCase.status)}
                    </span>
                  )},
                  { label: "Priority",  value: selectedCase.priority || "Normal" },
                  { label: "TAT",       value: formatTatDisplay(selectedCase) },
                  { label: "Created",   value: selectedCase.created_at
                    ? new Date(selectedCase.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
                  { label: "Amount",    value: `₹${(selectedCase.total_amount || 0).toLocaleString()}` },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{r.value || "—"}</span>
                  </div>
                ))}
              </div>
            )}

            {activeDetailTab === "timeline"  && <TimelineView c={selectedCase} />}
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
            <button className="secondary-cta import" onClick={exportCSV}
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

  const CaseListPanel = () => (
    <div className="dash-inner-left">
      <div className="down-table">
        <div className="client-portal-cases">
          <h3>{STATUS_TABS.find(t => t.key === statusTab)?.label.toUpperCase()} ({filtered.length})</h3>
        </div>

        {loading ? (
          <p style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>Loading cases…</p>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>No {statusTab === "all" ? "" : statusTab + " "}cases found.</p>
            {cases.length === 0 && (
              <button className="primary-cta" onClick={() => navigate("/AddCase")} style={{ marginTop: "12px" }}>
                + Add Your First Case
              </button>
            )}
          </div>
        ) : (
          <table>
            <tbody>
              {filtered.map(c => {
                const meta       = getStatusMeta(c.status);
                const color      = meta.color;
                const pct        = meta.pct;
                const dayLabel   = meta.dayLabel(c);
                const name       = c.candidate || c.candidate_name || "—";
                const isSelected = selectedCase?.case_id === c.case_id;
                return (
                  <tr className="boder-tbl active" key={c.case_id}
                    onClick={() => { setSelectedCase(c); setActiveDetailTab("overview"); }}
                    style={{
                      cursor: "pointer",
                      background: isSelected ? "#eef3ff" : undefined,
                      borderLeft: isSelected ? "3px solid #2b3b8c" : "3px solid transparent",
                    }}>
                    <td>
                      <div className="criminal-case">
                        <p>
                          <span>{c.case_id}</span><br />
                          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                      {displayChecks(c.checks)}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td><div className="client-names">{name}</div></td>
                    <td>
                      <div className="custom-progress">
                        <div className="custom-progress-bar" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <p className="progress-client-text" style={{ color }}>{dayLabel}</p>
                    </td>
                    <td>
                      <div className="parent-client-boxes">
                        <span className="client-cases-box" style={{ background: color }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span style={{
      background: getStatusMeta(status).color, color: "#fff", fontSize: "12px", fontWeight: 700,
      padding: "6px 18px", borderRadius: "6px", display: "inline-block", minWidth: "90px", textAlign: "center",
    }}>
      {statusLabel(status)}
    </span>
  );

  const ViewButton = ({ c }) => (
    <button
      onClick={() => {
        const dest = c.status === "completed" ? "completed" : "pending";
        navigate(`/Client?tab=${dest}`);
        setSelectedCase(c);
        setActiveDetailTab("overview");
      }}
      style={{
        background: "#27348B", color: "#fff", border: "none", padding: "10px 22px",
        borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
      }}
    >
      View
    </button>
  );

  const EditButton = ({ c }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        // Client-editable only while the case hasn't gone to verification yet.
        navigate(`/AddCase?editCaseId=${encodeURIComponent(c.case_id)}`);
      }}
      disabled={c.status !== "pending"}
      title={c.status !== "pending" ? "Case is already in verification — editing is locked" : "Edit case"}
      style={{
        background: c.status === "pending" ? "#fff" : "#f1f5f9",
        color: c.status === "pending" ? "#27348B" : "#94a3b8",
        border: `1px solid ${c.status === "pending" ? "#27348B" : "#e2e8f0"}`,
        padding: "9px 18px",
        borderRadius: "6px", fontSize: "13px", fontWeight: 700,
        cursor: c.status === "pending" ? "pointer" : "not-allowed",
      }}
    >
      Edit
    </button>
  );

  const CasesTable = ({ rows, showDate }) => (
    <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#27348B" }}>
            {[
              "Case ID",
              ...(showDate ? ["Case Receive Date"] : []),
              "Candidate", "Client", "Checks", "Status", "TAT", "Action",
            ].map(h => (
              <th key={h} style={{
                padding: "16px 20px", textAlign: "left", color: "#fff",
                fontWeight: 700, fontSize: "13px", textTransform: "uppercase",
                letterSpacing: "0.04em", whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={showDate ? 8 : 7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
          ) : rows.length === 0 ? (
            <tr><td colSpan={showDate ? 8 : 7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No cases found.</td></tr>
          ) : (
            rows.map((c, i) => (
              <tr key={c.case_id} style={{
                background: i % 2 === 0 ? "#f5f7fc" : "#fff",
                borderBottom: "1px solid #eef1f6",
              }}>
                <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.case_id}</td>
                {showDate && (
                  <td style={{ padding: "18px 20px", color: "#1e293b" }}>
                    {c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </td>
                )}
                <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.candidate || c.candidate_name || "—"}</td>
                <td style={{ padding: "18px 20px", color: "#1e293b" }}>{c.client || c.client_name || "—"}</td>
                <td style={{ padding: "18px 20px", color: "#1e293b" }}>
                  {displayChecks(c.checks) || "—"}
                </td>
                <td style={{ padding: "18px 20px" }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: "18px 20px", color: "#1e293b" }}>{formatTatDisplay(c)}</td>
                <td style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <ViewButton c={c} />
                    <EditButton c={c} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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

  // Shared Date Filter Component
  const DateFilterBar = ({ filter, setFilter, customFromVal, setCustomFromVal, customToVal, setCustomToVal }) => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
      {DATE_FILTERS.map(df => (
        <button 
          key={df.key} 
          className={`tab-cta ${filter === df.key ? "active" : ""}`}
          onClick={() => setFilter(df.key)}
        >
          {df.label}
        </button>
      ))}
      {filter === "custom" && (
        <>
          <input 
            type="date" 
            value={customFromVal} 
            onChange={e => setCustomFromVal(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }} 
          />
          <span style={{ color: "#94a3b8" }}>→</span>
          <input 
            type="date" 
            value={customToVal} 
            onChange={e => setCustomToVal(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }} 
          />
        </>
      )}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  // TOTAL CASES VIEW
  // ════════════════════════════════════════════════════════════════════════
  if (isTotalCasesView) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div className="dash-upper-head">
                <div className="left">
                  <h3 className="dash-title-text">Total Cases</h3>
                  <span style={{ fontSize: "12px", color: "#64748b", background: "#eef3ff", padding: "3px 10px", borderRadius: "20px", marginLeft: "10px" }}>
                    {totalFiltered.length} records
                  </span>
                </div>
                <div className="right">
                  <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
                    value={search} onChange={e => setSearch(e.target.value)} />
                  {search && (
                    <button onClick={() => setSearch("")}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
                  )}
                  <button className="primary-cta export" onClick={exportCSV}>
                    <img src="images/dashboard/export-icon.svg" alt="" /> Export
                  </button>
                </div>
              </div>

            <SummaryCards 
  totalCount={totalFiltered.length}
  activeCount={counts.pending} 
  completedCount={counts.completed} 
  pendingLinkCount={pendingLinkCount} 
  clearRate={clearRate} 
/>

              <DateFilterBar 
                filter={totalDateFilter} 
                setFilter={setTotalDateFilter} 
                customFromVal={totalCustomFrom} 
                setCustomFromVal={setTotalCustomFrom} 
                customToVal={totalCustomTo} 
                setCustomToVal={setTotalCustomTo} 
              />

              <CasesTable rows={totalFiltered} showDate />
            </div>
          </main>
        </section>

        {checkDetailModal}
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // SPLIT VIEW — Active / Completed Cases
  // ════════════════════════════════════════════════════════════════════════
  if (isSplitView) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div className="dash-upper-head">
                <div className="left">
                  <h3 className="dash-title-text">
                    {STATUS_TABS.find(t => t.key === statusTab)?.label}
                  </h3>
                </div>
                <div className="right">
                  <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
                    value={search} onChange={e => setSearch(e.target.value)} />
                  {search && (
                    <button onClick={() => setSearch("")}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
                  )}
                  <button className="primary-cta export" onClick={exportCSV}>
                    <img src="images/dashboard/export-icon.svg" alt="" /> Export
                  </button>
                </div>
              </div>

             <SummaryCards 
  totalCount={total}
  activeCount={counts.pending} 
  completedCount={counts.completed} 
  pendingLinkCount={pendingLinkCount} 
  clearRate={clearRate} 
/>

              <DateFilterBar 
                filter={dateFilter} 
                setFilter={setDateFilter} 
                customFromVal={customFrom} 
                setCustomFromVal={setCustomFrom} 
                customToVal={customTo} 
                setCustomToVal={setCustomTo} 
              />

              <div className="dash-inner-wrp-both client-portal">
                <CaseListPanel />
                <CaseDetailPanel />
              </div>
            </div>
          </main>
        </section>

        {checkDetailModal}
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // DASHBOARD (Home)
  // ════════════════════════════════════════════════════════════════════════
  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">
            <div className="dash-upper-head">
              <div className="left">
                <div className="dash-title-flex">
                  <h3 className="dash-title-text">Dashboard</h3>
                  <span style={{ fontSize: "12px", color: "#64748b", background: "#eef3ff", padding: "3px 10px", borderRadius: "20px" }}>
                    {user.name || "My Account"}
                  </span>
                </div>
              </div>
              <div className="right">
                <input type="text" className="dash-search-input" placeholder="Search case ID or candidate…"
                  value={search} onChange={e => setSearch(e.target.value)} />
                {search && (
                  <button onClick={() => setSearch("")}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#94a3b8" }}>×</button>
                )}
                <button className="primary-cta export" onClick={exportCSV}>
                  <img src="images/dashboard/export-icon.svg" alt="" /> Export
                </button>
              </div>
            </div>

            <DateFilterBar 
              filter={dateFilter} 
              setFilter={setDateFilter} 
              customFromVal={customFrom} 
              setCustomFromVal={setCustomFrom} 
              customToVal={customTo} 
              setCustomToVal={setCustomTo} 
            />

            {/* Stat cards (matches screenshot) */}
            <SummaryCards 
              totalCount={total}
              activeCount={counts.pending} 
              completedCount={counts.completed} 
              pendingLinkCount={pendingLinkCount} 
              clearRate={clearRate} 
            />

            {/* Chart + Quick Stats */}
            <div className="dash-inner-wrp-both" style={{ marginBottom: "0" }}>
              <div className="dash-inner-left">
                <CaseTrendsChart
                  casesData={chartCases}
                  label={DATE_FILTERS.find(d => d.key === dateFilter)?.label}
                  vsText={counts.completed > 0 ? `▲ ${clearRate}% clear rate` : "No completions yet"}
                  vsColor={counts.completed > 0 ? "#14d8a7" : "#94a3b8"}
                  dateFilter={dateFilter} customFrom={customFrom} customTo={customTo}
                />
              </div>
              <div className="dash-inner-right">
                <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0", height: "100%" }}>
                  <div style={{ background: "#27348B", padding: "14px 20px" }}>
                    <h3 style={{ margin: 0, color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em" }}>
                      QUICK STATS
                    </h3>
                  </div>
                  {[
                    { label: "Total Cases",  value: loading ? "—" : total },
                    { label: "Active Cases", value: loading ? "—" : counts.pending },
                    { label: "Pending Link", value: loading ? "—" : pendingLinkCount },
                    { label: "Completed",    value: loading ? "—" : counts.completed },
                    { label: "Clear Rate",   value: loading ? "—" : `${clearRate}%` },
                    { label: "Avg TAT",      value: "—" },
                  ].map((row, i) => (
                    <div key={row.label} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "18px 20px",
                      background: i % 2 === 0 ? "#eef3ff" : "#fff",
                      borderBottom: "1px solid #e8edf5",
                    }}>
                      <span style={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}>{row.label}</span>
                      <strong style={{ fontSize: "15px", color: "#1e293b", fontWeight: 700 }}>{row.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "4px" }}>
              <CasesTable rows={chartCases.slice(0, 5)} showDate={false} />
            </div>
          </div>
        </main>
      </section>

      {checkDetailModal}
    </>
  );
}
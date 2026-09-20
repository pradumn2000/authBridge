// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import "../../css/style.css";
// import Header from "./Header";

// export default function AddressCheck() {
//   const [activeTab, setActiveTab] = useState("verification"); // 'verification' | 'add_new'
//   const [showAssignModal, setShowAssignModal] = useState(true);
//   const [casesToAllocate, setCasesToAllocate] = useState(2);

//   const tableData = [
//     {
//       id: "CAN-10245",
//       caseId: "CASE-5001",
//       name: "Rahul Verma",
//       empId: "EMP-10045",
//       client: "ABC Technologies",
//       phone: "9876543210",
//       type: "Permanent",
//       address: "Pune, Maharashtra 411001",
//       mode: "Video Verification",
//       docs: "Documents",
//       verifier: "Amit Kumar",
//       verifierId: "VER-1001",
//       status: "Link Sent",
//       subStatus: "Assigned",
//       statusBg: "#eff6ff",
//       statusColor: "#2563eb",
//       dueDate: "27-Aug-26",
//       sla: "2 Days Left",
//       slaColor: "#16a34a",
//       action: "View Details",
//     },
//     {
//       id: "CAN-10245",
//       caseId: "CASE-5001",
//       name: "Rahul Verma",
//       empId: "EMP-10045",
//       client: "ABC Technologies",
//       phone: "9876543210",
//       type: "Correspondence",
//       address: "Nashik, Maharashtra 422001",
//       mode: "Physical Verification",
//       docs: "2 Docs 📄",
//       verifier: "—",
//       verifierId: "",
//       status: "Pending Assignment",
//       subStatus: "Not Assigned",
//       statusBg: "#f8fafc",
//       statusColor: "#64748b",
//       dueDate: "28-Aug-26",
//       sla: "3 Days Left",
//       slaColor: "#16a34a",
//       action: "Assign",
//     },
//     {
//       id: "CAN-10246",
//       caseId: "CASE-5002",
//       name: "Priya Sharma",
//       empId: "EMP-10046",
//       client: "XYZ Ltd.",
//       phone: "9123456780",
//       type: "Permanent",
//       address: "Delhi, India 110001",
//       mode: "Document Verification",
//       docs: "3 Docs 📄",
//       verifier: "Neha Singh",
//       verifierId: "VER-1002",
//       status: "In Progress",
//       subStatus: "Verified",
//       statusBg: "#f0fdf4",
//       statusColor: "#16a34a",
//       dueDate: "26-Aug-26",
//       sla: "1 Day Left",
//       slaColor: "#16a34a",
//       action: "View Details",
//     },
//     {
//       id: "CAN-10246",
//       caseId: "CASE-5002",
//       name: "Priya Sharma",
//       empId: "EMP-10046",
//       client: "XYZ Ltd.",
//       phone: "9123456780",
//       type: "Correspondence",
//       address: "Noida, UP 201301",
//       mode: "Video Verification",
//       docs: "2 Docs 📄",
//       verifier: "Amit Kumar",
//       verifierId: "VER-1001",
//       status: "Candidate Joined",
//       subStatus: "Link Sent",
//       statusBg: "#eff6ff",
//       statusColor: "#2563eb",
//       dueDate: "26-Aug-26",
//       sla: "1 Day Left",
//       slaColor: "#16a34a",
//       action: "Join Video",
//     },
//     {
//       id: "CAN-10247",
//       caseId: "CASE-5003",
//       name: "Amit Gupta",
//       empId: "EMP-10047",
//       client: "ABC Technologies",
//       phone: "9876543210",
//       type: "Permanent",
//       address: "Mumbai, Maharashtra 400001",
//       mode: "Physical + Video",
//       docs: "4 Docs 📄",
//       verifier: "Rajesh Kumar",
//       verifierId: "VER-1003",
//       status: "QC Review",
//       subStatus: "Submitted",
//       statusBg: "#faf5ff",
//       statusColor: "#9333ea",
//       dueDate: "25-Aug-26",
//       sla: "Overdue",
//       slaColor: "#dc2626",
//       action: "Review",
//     },
//     {
//       id: "CAN-10247",
//       caseId: "CASE-5003",
//       name: "Amit Gupta",
//       empId: "EMP-10047",
//       client: "ABC Technologies",
//       phone: "9876543210",
//       type: "Correspondence",
//       address: "Mumbai, Maharashtra 400001",
//       mode: "Document Verification",
//       docs: "2 Docs 📄",
//       verifier: "Neha Singh",
//       verifierId: "VER-1002",
//       status: "Verified",
//       subStatus: "QC Approved",
//       statusBg: "#f0fdf4",
//       statusColor: "#16a34a",
//       dueDate: "25-Aug-26",
//       sla: "On Time",
//       slaColor: "#16a34a",
//       action: "View Details",
//     },
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
//       {/* 1. Sidebar */}
//       <div id="sidebar">
//         <Sidebar />
//       </div>

//       {/* 2. Main Content Container */}
//       <div id="content" style={{ display: "flex", flexDirection: "column", minWidth: 0, width: "calc(100% - 270px)" }}>
//         {/* Fixed Top Header */}
//         <Header />

//         <main style={{ padding: "20px" }}>
          
//           {/* Top Header Section with Navigation Tabs */}
//           <div style={{ marginBottom: "20px" }}>
//             <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#000", margin: "0 0 2px 0" }}>Address Verification</h1>
//             <p style={{ fontSize: "14px", fontWeight: "500", color: "#606060", margin: "0 0 16px 0",textAlign:"left" }}>Manage and track address verification for all candidates</p>

//             {/* Image-2 Style Tabs Layout */}
//             <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", gap: "24px" }}>
//               <button
//                 onClick={() => setActiveTab("verification")}
//                 style={{
//                   padding: "8px 4px 12px 4px",
//                   fontSize: "14px",
//                   fontWeight: activeTab === "verification" ? "700" : "500",
//                   color: activeTab === "verification" ? "#1e3a8a" : "#64748b",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                   borderBottom: activeTab === "verification" ? "3px solid #1e3a8a" : "3px solid transparent",
//                   marginBottom: "-1px"
//                 }}
//               >
//                 Address Verification
//               </button>
//               <button
//                 onClick={() => setActiveTab("add_new")}
//                 style={{
//                   padding: "8px 4px 12px 4px",
//                   fontSize: "14px",
//                   fontWeight: activeTab === "add_new" ? "700" : "500",
//                   color: activeTab === "add_new" ? "#1e3a8a" : "#64748b",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                   borderBottom: activeTab === "add_new" ? "3px solid #1e3a8a" : "3px solid transparent",
//                   marginBottom: "-1px"
//                 }}
//               >
//                 Add New Address
//               </button>
//             </div>
//           </div>

//           {/* TAB 1: ADDRESS VERIFICATION */}
//           {activeTab === "verification" && (
//             <>
//               {/* Metric Summary Cards Grid */}
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "16px" }}>
//                 {[
//                   { label: "Total Cases", val: "250", sub: "All Address Verifications", icon: "📑", bg: "#eff6ff", color: "#2563eb" },
//                   { label: "Pending Assignment", val: "42", sub: "Awaiting Verifier", icon: "👤", bg: "#fff7ed", color: "#ea580c" },
//                   { label: "In Progress", val: "31", sub: "Under Verification", icon: "🔄", bg: "#f0fdf4", color: "#16a34a" },
//                   { label: "Verified", val: "156", sub: "Successfully Verified", icon: "🛡️", bg: "#f0fdf4", color: "#16a34a" },
//                   { label: "QC Review", val: "15", sub: "Awaiting QC Approval", icon: "🔍", bg: "#faf5ff", color: "#9333ea" },
//                   { label: "Overdue", val: "6", sub: "Past Due Date", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
//                 ].map((card, i) => (
//                   <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
//                       <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>{card.icon}</div>
//                       <div>
//                         <span style={{ fontSize: "10px", fontWeight: "600", color: "#64748b", display: "block" }}>{card.label}</span>
//                         <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
//                       </div>
//                     </div>
//                     <span style={{ fontSize: "9px", color: "#94a3b8" }}>{card.sub}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Action Box: New Address Verification Button */}
//               <div style={{ display: "flex", borderRadius: "4px", overflow: "hidden", justifyContent: "flex-end", marginBottom: "15px" }}>
//                 <button 
//                   onClick={() => setActiveTab("add_new")} 
//                   style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer", borderRadius: "4px" }}
//                 >
//                   New Address Verification
//                 </button>
//               </div>

//               {/* Multi-column Search/Filter Bar */}
//               <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
//                 <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
//                   <div style={{ position: "relative" }}>
//                     <input type="text" placeholder="Search Candidate / Case ID" style={{ width: "100%", padding: "6px 8px 6px 26px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
//                     <span style={{ position: "absolute", left: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>🔍</span>
//                   </div>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Client</option></select>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Address Type</option></select>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verification Mode</option></select>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verifier</option></select>
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Status</option></select>
//                   <div style={{ position: "relative" }}>
//                     <input type="text" placeholder="Due Date" style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
//                     <span style={{ position: "absolute", right: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>📅</span>
//                   </div>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>City</option></select>
//                   <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>State</option></select>

//                   <div style={{ display: "flex", gap: "6px" }}>
//                     <button style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", color: "#2563eb", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Clear</button>
//                     <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Apply Filters</button>
//                   </div>
//                 </div>
//               </div>

//               {/* MAIN DUAL-PANEL GRID LAYOUT */}
//               <div style={{ display: "grid", gridTemplateColumns: showAssignModal ? "1fr 280px" : "1fr", gap: "16px", alignItems: "start" }}>
                
//                 {/* Left Column: Table Container */}
//                 <div style={{ width: "100%", overflowX: "auto" }}>
//                   <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
//                     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "11px" }}>
//                       <thead>
//                         <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
//                           <th style={{ padding: "8px" }}><input type="checkbox" /></th>
//                           <th style={{ padding: "8px" }}>Candidate ID<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Case ID</span></th>
//                           <th style={{ padding: "8px" }}>Candidate Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Employee ID</span></th>
//                           <th style={{ padding: "8px" }}>Client Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Mobile Number</span></th>
//                           <th style={{ padding: "8px" }}>Address Type<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Address</span></th>
//                           <th style={{ padding: "8px" }}>Verification Mode<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Documents</span></th>
//                           <th style={{ padding: "8px" }}>Verifier<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Verifier ID</span></th>
//                           <th style={{ padding: "8px" }}>Status<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Assignment Status</span></th>
//                           <th style={{ padding: "8px" }}>SLA / Due Date<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Days Remaining</span></th>
//                           <th style={{ padding: "8px" }}>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {tableData.map((row, idx) => (
//                           <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                             <td style={{ padding: "8px" }}><input type="checkbox" /></td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.id}</span>
//                               <span style={{ fontSize: "9px", color: "#64748b" }}>{row.caseId}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
                            
//                               <a
//     href="https://authbridge-10.onrender.com/AddressUserProfile"
//     style={{
//       color: "#2563eb",
//       textDecoration: "none",
//       cursor: "pointer",
//       fontWeight: 700,
//       display: "block",
//     }}
//     onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
//     onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//   >
//     {row.name}
//   </a>
//   <span style={{ fontSize: "9px", color: "#64748b", display: "block" }}>
//     {row.empId}
//   </span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.client}</span>
//                               <span style={{ fontSize: "9px", color: "#64748b" }}>{row.phone}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ background: row.type === "Permanent" ? "#dbeafe" : "#ffedd5", color: row.type === "Permanent" ? "#1e40af" : "#9a3412", fontSize: "9px", padding: "1px 4px", borderRadius: "3px", fontWeight: 600 }}>{row.type}</span>
//                               <span style={{ fontSize: "10px", color: "#334155", display: "block", marginTop: "2px" }}>{row.address}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.mode}</span>
//                               <span style={{ fontSize: "9px", color: "#64748b" }}>{row.docs}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.verifier}</span>
//                               <span style={{ fontSize: "9px", color: "#64748b" }}>{row.verifierId}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ background: row.statusBg, color: row.statusColor, fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", display: "inline-block" }}>{row.status}</span>
//                               <span style={{ fontSize: "9px", color: "#64748b", display: "block", marginTop: "1px" }}>{row.subStatus}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.dueDate}</span>
//                               <span style={{ fontSize: "9px", color: row.slaColor, fontWeight: 700 }}>{row.sla}</span>
//                             </td>
//                             <td style={{ padding: "8px" }}>
//                               <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                                 <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, color: "#2563eb", cursor: "pointer" }}>{row.action}</button>
//                                 <button style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>⋮</button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>

//                     {/* Table Footer / Pagination */}
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", fontSize: "11px", color: "#64748b" }}>
//                       <span>Showing 1 to 8 of 250 entries</span>
//                       <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
//                         <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>‹</button>
//                         <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "3px 6px", borderRadius: "4px", fontWeight: 700 }}>1</button>
//                         <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>2</button>
//                         <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>3</button>
//                         <span>...</span>
//                         <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>32</button>
//                         <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>›</button>
//                       </div>
//                       <select style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 4px" }}><option>10 / page</option></select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column: Inline Panel (Assign Verification) */}
//                 {showAssignModal && (
//                   <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px", boxSizing: "border-box" }}>
                    
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
//                       <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>Assign Verification</h3>
//                       <button onClick={() => setShowAssignModal(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>✕</button>
//                     </div>

//                     <div>
//                       <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Select Verifier</label>
//                       <div style={{ position: "relative" }}>
//                         <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "5px 8px 5px 24px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
//                         <span style={{ position: "absolute", left: "6px", top: "5px", color: "#94a3b8", fontSize: "10px" }}>🔍</span>
//                       </div>
//                     </div>

//                     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                       {[
//                         { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
//                         { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
//                         { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
//                       ].map((v, i) => (
//                         <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", background: v.checked ? "#f8fafc" : "#fff" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                             <input type="checkbox" defaultChecked={v.checked} />
//                             <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700 }}>{v.name.charAt(0)}</div>
//                             <div>
//                               <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{v.name}</p>
//                               <span style={{ fontSize: "9px", color: "#64748b" }}>{v.title}</span>
//                             </div>
//                           </div>
//                           <div style={{ textAlign: "right" }}>
//                             <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{v.cases}</span>
//                             <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Cases to Allocate</label>
//                       <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "4px", width: "fit-content", padding: "2px" }}>
//                         <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>-</button>
//                         <span style={{ width: "28px", textAlign: "center", fontSize: "11px", fontWeight: 700 }}>{casesToAllocate}</span>
//                         <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>+</button>
//                       </div>
//                     </div>

//                     <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
//                       <button onClick={() => setShowAssignModal(false)} style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
//                       <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Allocate Cases</button>
//                     </div>

//                   </div>
//                 )}

//               </div>
//             </>
//           )}

//           {/* TAB 2: ADD NEW ADDRESS (Image 1 Form) */}
//           {activeTab === "add_new" && (
//             <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              
//               {/* Form Title */}
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
//                 <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
//                   <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📍</div>
//                   <div>
//                     <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Add New Address</h2>
//                     <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Enter candidate and address details to add a new address record.</p>
//                   </div>
//                 </div>
//                 {/* <button onClick={() => setActiveTab("verification")} style={{ border: "none", background: "none", fontSize: "18px", color: "#64748b", cursor: "pointer" }}>✕</button> */}
//               </div>

//               {/* Basic Details Section */}
//               <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", padding: "16px", marginBottom: "20px", background: "#f8fafc" }}>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
//                   <div>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Candidate Name *</label>
//                     <div style={{ position: "relative" }}>
//                       <input type="text" placeholder="Enter candidate name" style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
//                       <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>👤</span>
//                     </div>
//                   </div>
//                   <div>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Candidate ID *</label>
//                     <div style={{ position: "relative" }}>
//                       <input type="text" placeholder="Enter candidate ID" style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
//                       <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🪪</span>
//                     </div>
//                   </div>
//                   <div>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Client Name *</label>
//                     <div style={{ position: "relative" }}>
//                       <select style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#64748b", outline: "none", boxSizing: "border-box" }}>
//                         <option>Select Client</option>
//                       </select>
//                       <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🏢</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
//                   <div>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Mobile Number *</label>
//                     <div style={{ position: "relative" }}>
//                       <input type="text" placeholder="Enter mobile number" style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
//                       <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>📞</span>
//                     </div>
//                   </div>
//                   <div>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Email ID *</label>
//                     <div style={{ position: "relative" }}>
//                       <input type="email" placeholder="Enter email address" style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
//                       <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>✉️</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Two Column Layout: Permanent Address vs Correspondence Address */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                
//                 {/* Permanent Address */}
//                 <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
//                     <span style={{ color: "#2563eb", fontSize: "16px" }}>🏠</span>
//                     <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Permanent Address</h3>
//                   </div>

//                   <div style={{ marginBottom: "12px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address Proof Type *</label>
//                     <select style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#64748b" }}>
//                       <option>Select Address Proof Type</option>
//                     </select>
//                   </div>

//                   <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
//                     <input type="checkbox" id="sameAsCurrent" />
//                     <label htmlFor="sameAsCurrent" style={{ fontSize: "12px", color: "#475569" }}>Same as Current Address</label>
//                   </div>

//                   <div style={{ marginBottom: "12px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address *</label>
//                     <textarea placeholder="Enter full address (Flat/House No., Street, Area, City, State, PIN)" rows="3" style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "none" }}></textarea>
//                     <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", textAlign: "right" }}>0/500</span>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Country *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select Country</option></select>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>State *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select State</option></select>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>City *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select City</option></select>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "16px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>PIN Code *</label>
//                     <input type="text" placeholder="Enter PIN code" style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", boxSizing: "border-box" }} />
//                   </div>

//                   {/* Upload Container */}
//                   <div style={{ border: "1px dashed #cbd5e1", background: "#f8fafc", padding: "12px", borderRadius: "6px", textAlign: "center" }}>
//                     <span style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>☁️ Upload Address Proof Document(s)</span>
//                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
//                       <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", color: "#2563eb", cursor: "pointer" }}>Choose File</button>
//                       <span style={{ fontSize: "11px", color: "#94a3b8" }}>No file chosen</span>
//                     </div>
//                     <span style={{ fontSize: "9px", color: "#94a3b8", marginTop: "4px", display: "block" }}>Supported formats: PDF, JPG, PNG | Max size: 5 MB</span>
//                   </div>
//                 </div>

//                 {/* Correspondence Address */}
//                 <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
//                     <span style={{ color: "#2563eb", fontSize: "16px" }}>📍</span>
//                     <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Correspondence Address</h3>
//                   </div>

//                   <div style={{ marginBottom: "38px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address Proof Type *</label>
//                     <select style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: "#64748b" }}>
//                       <option>Select Address Proof Type</option>
//                     </select>
//                   </div>

//                   <div style={{ marginBottom: "12px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address *</label>
//                     <textarea placeholder="Enter full address (Flat/House No., Street, Area, City, State, PIN)" rows="3" style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "none" }}></textarea>
//                     <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", textAlign: "right" }}>0/500</span>
//                   </div>

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Country *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select Country</option></select>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>State *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select State</option></select>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>City *</label>
//                       <select style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: "#64748b" }}><option>Select City</option></select>
//                     </div>
//                   </div>

//                   <div style={{ marginBottom: "16px" }}>
//                     <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>PIN Code *</label>
//                     <input type="text" placeholder="Enter PIN code" style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", boxSizing: "border-box" }} />
//                   </div>

//                   {/* Upload Container */}
//                   <div style={{ border: "1px dashed #cbd5e1", background: "#f8fafc", padding: "12px", borderRadius: "6px", textAlign: "center" }}>
//                     <span style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>☁️ Upload Address Proof Document(s)</span>
//                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
//                       <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", color: "#2563eb", cursor: "pointer" }}>Choose File</button>
//                       <span style={{ fontSize: "11px", color: "#94a3b8" }}>No file chosen</span>
//                     </div>
//                     <span style={{ fontSize: "9px", color: "#94a3b8", marginTop: "4px", display: "block" }}>Supported formats: PDF, JPG, PNG | Max size: 5 MB</span>
//                   </div>
//                 </div>

//               </div>

//               {/* Form Footer Buttons */}
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid #e2e8f0" }}>
//                 <button 
//                   onClick={() => setActiveTab("verification")}
//                   style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "8px 20px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#334155", cursor: "pointer" }}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   style={{ border: "none", background: "#2563eb", padding: "8px 20px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#fff", cursor: "pointer" }}
//                 >
//                   Save & Next
//                 </button>
//               </div>

//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import "../../css/style.css";
import Header from "./Header";
import { API_URL } from "../src/config";

const EMPTY_ADDRESS = () => ({
  addressProofType: "",
  sameAsCurrent: false,
  address: "",
  country: "",
  state: "",
  city: "",
  pinCode: "",
});

const STATUS_STYLES = {
  pending: { status: "Pending Assignment", subStatus: "Not Assigned", bg: "#f8fafc", color: "#64748b" },
  "in-progress": { status: "In Progress", subStatus: "Assigned", bg: "#eff6ff", color: "#2563eb" },
  "qc-review": { status: "QC Review", subStatus: "Submitted", bg: "#faf5ff", color: "#9333ea" },
  completed: { status: "Verified", subStatus: "QC Approved", bg: "#f0fdf4", color: "#16a34a" },
  "on-hold": { status: "On Hold", subStatus: "Incomplete", bg: "#fef2f2", color: "#dc2626" },
};

export default function AddressCheck() {
  const [activeTab, setActiveTab] = useState("verification"); // 'verification' | 'add_new'
  const [showAssignModal, setShowAssignModal] = useState(true);
  const [casesToAllocate, setCasesToAllocate] = useState(2);
  const [saving, setSaving] = useState(false);

  // Candidate Information Form State
  const [candidateInfo, setCandidateInfo] = useState({
    candidateName: "",
    candidateId: "",
    mobileNumber: "",
    emailAddress: "",
  });
  const handleCandidateChange = (field, value) => {
    setCandidateInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Permanent + Correspondence Address state
  const [permanentAddress, setPermanentAddress] = useState(EMPTY_ADDRESS());
  const [correspondenceAddress, setCorrespondenceAddress] = useState(EMPTY_ADDRESS());

  const updateAddress = (setter, field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  // ── Clients + Cases (Select Client / Select Candidate linkage) ─────────
  // Same pattern as Employment/Education: address is a check_type on an
  // existing BGVCase, so this screen fills in the details on a case that
  // already has "address" in its checks array.
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState("");

  const [cases, setCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");

  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedCandidateKey, setSelectedCandidateKey] = useState("");

  const fetchClients = () => {
    const token = localStorage.getItem("token");
    setClientsLoading(true);
    setClientsError("");

    return fetch(`${API_URL}/api/clients`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => setClientsError("Failed to load clients."))
      .finally(() => setClientsLoading(false));
  };

  const fetchCases = () => {
    const token = localStorage.getItem("token");
    setCasesLoading(true);
    setCasesError("");

    return fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => setCases(data.cases || []))
      .catch(() => setCasesError("Failed to load cases."))
      .finally(() => setCasesLoading(false));
  };

  useEffect(() => {
    fetchClients();
    fetchCases();
  }, []);

  const addressCases = useMemo(
    () => cases.filter((c) => (c.checks || []).includes("address")),
    [cases]
  );

  const candidateOptions = useMemo(
    () =>
      addressCases.map((c) => ({
        key: c.case_id,
        name: c.candidate || "Unnamed Candidate",
      })),
    [addressCases]
  );

  const clientCase = useMemo(() => {
    if (!selectedClientId) return null;
    return (
      addressCases.find((c) => String(c.client_id) === String(selectedClientId)) || null
    );
  }, [addressCases, selectedClientId]);

  const candidateCase = useMemo(() => {
    if (!selectedCandidateKey) return null;
    return addressCases.find((c) => c.case_id === selectedCandidateKey) || null;
  }, [addressCases, selectedCandidateKey]);

  const clientCaseId = clientCase ? clientCase.case_id : "";
  const candidateCaseId = candidateCase ? candidateCase.case_id : "";

  // Pre-fill from whatever address details are already saved on the
  // selected case, so re-opening a case doesn't blank the form.
  useEffect(() => {
    if (!candidateCase) return;

    const savedFields = candidateCase.check_details?.address?.fields;

    setCandidateInfo((prev) => ({
      ...prev,
      candidateName: savedFields?.candidate_name ?? candidateCase.candidate ?? prev.candidateName,
      candidateId: savedFields?.candidate_id ?? prev.candidateId,
      mobileNumber: savedFields?.mobile_number ?? prev.mobileNumber,
      emailAddress: savedFields?.email_address ?? prev.emailAddress,
    }));

    if (savedFields?.permanent_address) {
      setPermanentAddress({ ...EMPTY_ADDRESS(), ...savedFields.permanent_address });
    }
    if (savedFields?.correspondence_address) {
      setCorrespondenceAddress({ ...EMPTY_ADDRESS(), ...savedFields.correspondence_address });
    }
  }, [candidateCase]);

  // ── Save — reuses PATCH /cases/{caseId}/checks/address, same route
  // family as employment/education, writing into case_checks.fields.
  const handleSaveCase = async () => {
    if (!candidateCase) {
      alert("Select a candidate with an address case first.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/api/cases/${candidateCase.case_id}/checks/address`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fields: {
              candidate_name: candidateInfo.candidateName,
              candidate_id: candidateInfo.candidateId,
              mobile_number: candidateInfo.mobileNumber,
              email_address: candidateInfo.emailAddress,
              permanent_address: permanentAddress,
              correspondence_address: correspondenceAddress,
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Save failed");
      }

      await fetchCases(); // refetch — feeds the verification table below
      alert("Address details saved successfully!");
      setActiveTab("verification");
    } catch (err) {
      alert("Failed to save case: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Verification table (Tab 1) — two rows per case (Permanent +
  // Correspondence), same shape as the original mock. "Verification Mode"
  // and document counts aren't collected anywhere in the form, so they
  // show as "—" rather than invented values.
  const tableRows = useMemo(() => {
    const rows = [];
    addressCases.forEach((c) => {
      const fields = c.check_details?.address?.fields;
      const style = STATUS_STYLES[c.status] || STATUS_STYLES.pending;

      [
        { key: "Permanent", data: fields?.permanent_address },
        { key: "Correspondence", data: fields?.correspondence_address },
      ].forEach(({ key, data }) => {
        rows.push({
          id: fields?.candidate_id || "—",
          caseId: c.case_id,
          name: c.candidate,
          empId: fields?.candidate_id || "—",
          client: c.client,
          phone: fields?.mobile_number || "—",
          type: key,
          address: data?.address || "Not yet provided",
          mode: "—",
          docs: "—",
          verifier: c.assigned_verifier || "—",
          verifierId: "",
          status: style.status,
          subStatus: style.subStatus,
          statusBg: style.bg,
          statusColor: style.color,
          dueDate: c.due_date || "—",
          sla: c.tat || "—",
          slaColor: c.status === "on-hold" ? "#dc2626" : "#16a34a",
          action: c.status === "pending" ? "Assign" : "View Details",
        });
      });
    });
    return rows;
  }, [addressCases]);

  const summaryStats = useMemo(() => {
    return {
      total: addressCases.length,
      pending: addressCases.filter((c) => c.status === "pending").length,
      inProgress: addressCases.filter((c) => c.status === "in-progress").length,
      verified: addressCases.filter((c) => c.status === "completed").length,
      qcReview: addressCases.filter((c) => c.status === "qc-review").length,
      onHold: addressCases.filter((c) => c.status === "on-hold").length,
    };
  }, [addressCases]);

  // Reusable renderer for the Permanent / Correspondence address blocks —
  // avoids duplicating the same large JSX block twice with different state.
  const renderAddressSection = (title, icon, state, setState, showSameAsCurrent) => (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span style={{ color: "#2563eb", fontSize: "16px" }}>{icon}</span>
        <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>{title}</h3>
      </div>

      <div style={{ marginBottom: showSameAsCurrent ? "12px" : "38px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address Proof Type *</label>
        <select
          value={state.addressProofType}
          onChange={(e) => updateAddress(setState, "addressProofType", e.target.value)}
          style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", color: state.addressProofType ? "#0f172a" : "#64748b" }}
        >
          <option value="">Select Address Proof Type</option>
          <option value="Aadhaar Card">Aadhaar Card</option>
          <option value="Passport">Passport</option>
          <option value="Utility Bill">Utility Bill</option>
          <option value="Rental Agreement">Rental Agreement</option>
          <option value="Bank Statement">Bank Statement</option>
        </select>
      </div>

      {showSameAsCurrent && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <input
            type="checkbox"
            id="sameAsCurrent"
            checked={state.sameAsCurrent}
            onChange={(e) => updateAddress(setState, "sameAsCurrent", e.target.checked)}
          />
          <label htmlFor="sameAsCurrent" style={{ fontSize: "12px", color: "#475569" }}>Same as Current Address</label>
        </div>
      )}

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Address *</label>
        <textarea
          placeholder="Enter full address (Flat/House No., Street, Area, City, State, PIN)"
          rows="3"
          value={state.address}
          onChange={(e) => updateAddress(setState, "address", e.target.value)}
          maxLength={500}
          style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "none" }}
        ></textarea>
        <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", textAlign: "right" }}>{state.address.length}/500</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>Country *</label>
          <select
            value={state.country}
            onChange={(e) => updateAddress(setState, "country", e.target.value)}
            style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", color: state.country ? "#0f172a" : "#64748b" }}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>State *</label>
          <input
            type="text"
            placeholder="Enter state"
            value={state.state}
            onChange={(e) => updateAddress(setState, "state", e.target.value)}
            style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>City *</label>
          <input
            type="text"
            placeholder="Enter city"
            value={state.city}
            onChange={(e) => updateAddress(setState, "city", e.target.value)}
            style={{ width: "100%", padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "11px", boxSizing: "border-box" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "4px" }}>PIN Code *</label>
        <input
          type="text"
          placeholder="Enter PIN code"
          value={state.pinCode}
          onChange={(e) => updateAddress(setState, "pinCode", e.target.value)}
          style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", boxSizing: "border-box" }}
        />
      </div>

      {/* Upload Container — not yet wired to a real upload; same gap as
          the document boxes in Employment/Education */}
      <div style={{ border: "1px dashed #cbd5e1", background: "#f8fafc", padding: "12px", borderRadius: "6px", textAlign: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>☁️ Upload Address Proof Document(s)</span>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", color: "#2563eb", cursor: "pointer" }}>Choose File</button>
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>No file chosen</span>
        </div>
        <span style={{ fontSize: "9px", color: "#94a3b8", marginTop: "4px", display: "block" }}>Supported formats: PDF, JPG, PNG | Max size: 5 MB</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* 1. Sidebar */}
      <div id="sidebar">
        <Sidebar />
      </div>

      {/* 2. Main Content Container */}
      <div id="content" style={{ display: "flex", flexDirection: "column", minWidth: 0, width: "calc(100% - 270px)" }}>
        {/* Fixed Top Header */}
        <Header />

        <main style={{ padding: "20px" }}>

          {/* Top Header Section with Navigation Tabs */}
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#000", margin: "0 0 2px 0" }}>Address Verification</h1>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#606060", margin: "0 0 16px 0",textAlign:"left" }}>Manage and track address verification for all candidates</p>

            {/* Image-2 Style Tabs Layout */}
            <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", gap: "24px" }}>
              <button
                onClick={() => setActiveTab("verification")}
                style={{
                  padding: "8px 4px 12px 4px",
                  fontSize: "14px",
                  fontWeight: activeTab === "verification" ? "700" : "500",
                  color: activeTab === "verification" ? "#1e3a8a" : "#64748b",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  borderBottom: activeTab === "verification" ? "3px solid #1e3a8a" : "3px solid transparent",
                  marginBottom: "-1px"
                }}
              >
                Address Verification
              </button>
              <button
                onClick={() => setActiveTab("add_new")}
                style={{
                  padding: "8px 4px 12px 4px",
                  fontSize: "14px",
                  fontWeight: activeTab === "add_new" ? "700" : "500",
                  color: activeTab === "add_new" ? "#1e3a8a" : "#64748b",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  borderBottom: activeTab === "add_new" ? "3px solid #1e3a8a" : "3px solid transparent",
                  marginBottom: "-1px"
                }}
              >
                Add New Address
              </button>
            </div>
          </div>

          {/* TAB 1: ADDRESS VERIFICATION */}
          {activeTab === "verification" && (
            <>
              {/* Metric Summary Cards Grid — derived from live case data */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "16px" }}>
                {[
                  { label: "Total Cases", val: summaryStats.total, sub: "All Address Verifications", icon: "📑", bg: "#eff6ff", color: "#2563eb" },
                  { label: "Pending Assignment", val: summaryStats.pending, sub: "Awaiting Verifier", icon: "👤", bg: "#fff7ed", color: "#ea580c" },
                  { label: "In Progress", val: summaryStats.inProgress, sub: "Under Verification", icon: "🔄", bg: "#f0fdf4", color: "#16a34a" },
                  { label: "Verified", val: summaryStats.verified, sub: "Successfully Verified", icon: "🛡️", bg: "#f0fdf4", color: "#16a34a" },
                  { label: "QC Review", val: summaryStats.qcReview, sub: "Awaiting QC Approval", icon: "🔍", bg: "#faf5ff", color: "#9333ea" },
                  { label: "On Hold", val: summaryStats.onHold, sub: "Needs Attention", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
                ].map((card, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>{card.icon}</div>
                      <div>
                        <span style={{ fontSize: "10px", fontWeight: "600", color: "#64748b", display: "block" }}>{card.label}</span>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
                      </div>
                    </div>
                    <span style={{ fontSize: "9px", color: "#94a3b8" }}>{card.sub}</span>
                  </div>
                ))}
              </div>

              {/* Action Box: New Address Verification Button */}
              <div style={{ display: "flex", borderRadius: "4px", overflow: "hidden", justifyContent: "flex-end", marginBottom: "15px" }}>
                <button 
                  onClick={() => setActiveTab("add_new")} 
                  style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer", borderRadius: "4px" }}
                >
                  New Address Verification
                </button>
              </div>

              {/* Multi-column Search/Filter Bar */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
                  <div style={{ position: "relative" }}>
                    <input type="text" placeholder="Search Candidate / Case ID" style={{ width: "100%", padding: "6px 8px 6px 26px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                    <span style={{ position: "absolute", left: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>🔍</span>
                  </div>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Client</option></select>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Address Type</option></select>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verification Mode</option></select>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verifier</option></select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Status</option></select>
                  <div style={{ position: "relative" }}>
                    <input type="text" placeholder="Due Date" style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                    <span style={{ position: "absolute", right: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>📅</span>
                  </div>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>City</option></select>
                  <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>State</option></select>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", color: "#2563eb", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Clear</button>
                    <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Apply Filters</button>
                  </div>
                </div>
              </div>

              {/* MAIN DUAL-PANEL GRID LAYOUT */}
              <div style={{ display: "grid", gridTemplateColumns: showAssignModal ? "1fr 280px" : "1fr", gap: "16px", alignItems: "start" }}>
                
                {/* Left Column: Table Container */}
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "11px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                          <th style={{ padding: "8px" }}><input type="checkbox" /></th>
                          <th style={{ padding: "8px" }}>Candidate ID<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Case ID</span></th>
                          <th style={{ padding: "8px" }}>Candidate Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Employee ID</span></th>
                          <th style={{ padding: "8px" }}>Client Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Mobile Number</span></th>
                          <th style={{ padding: "8px" }}>Address Type<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Address</span></th>
                          <th style={{ padding: "8px" }}>Verification Mode<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Documents</span></th>
                          <th style={{ padding: "8px" }}>Verifier<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Verifier ID</span></th>
                          <th style={{ padding: "8px" }}>Status<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Assignment Status</span></th>
                          <th style={{ padding: "8px" }}>SLA / Due Date<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Days Remaining</span></th>
                          <th style={{ padding: "8px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {casesLoading ? (
                          <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                        ) : casesError ? (
                          <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#dc2626" }}>{casesError}</td></tr>
                        ) : tableRows.length === 0 ? (
                          <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>No address cases yet.</td></tr>
                        ) : (
                          tableRows.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "8px" }}><input type="checkbox" /></td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.id}</span>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{row.caseId}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                            
                              <a
    href={`https://authbridge-10.onrender.com/AddressUserProfile?case_id=${row.caseId}`}
    style={{
      color: "#2563eb",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: 700,
      display: "block",
    }}
    onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
    onMouseOut={(e) => (e.target.style.textDecoration = "none")}
  >
    {row.name}
  </a>
  <span style={{ fontSize: "9px", color: "#64748b", display: "block" }}>
    {row.empId}
  </span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.client}</span>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{row.phone}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ background: row.type === "Permanent" ? "#dbeafe" : "#ffedd5", color: row.type === "Permanent" ? "#1e40af" : "#9a3412", fontSize: "9px", padding: "1px 4px", borderRadius: "3px", fontWeight: 600 }}>{row.type}</span>
                              <span style={{ fontSize: "10px", color: "#334155", display: "block", marginTop: "2px" }}>{row.address}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.mode}</span>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{row.docs}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.verifier}</span>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{row.verifierId}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ background: row.statusBg, color: row.statusColor, fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", display: "inline-block" }}>{row.status}</span>
                              <span style={{ fontSize: "9px", color: "#64748b", display: "block", marginTop: "1px" }}>{row.subStatus}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.dueDate}</span>
                              <span style={{ fontSize: "9px", color: row.slaColor, fontWeight: 700 }}>{row.sla}</span>
                            </td>
                            <td style={{ padding: "8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, color: "#2563eb", cursor: "pointer" }}>{row.action}</button>
                                <button style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>⋮</button>
                              </div>
                            </td>
                          </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    {/* Table Footer / Pagination */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", fontSize: "11px", color: "#64748b" }}>
                      <span>Showing {tableRows.length === 0 ? 0 : 1} to {tableRows.length} of {tableRows.length} entries</span>
                      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>‹</button>
                        <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "3px 6px", borderRadius: "4px", fontWeight: 700 }}>1</button>
                        <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>›</button>
                      </div>
                      <select style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 4px" }}><option>10 / page</option></select>
                    </div>
                  </div>
                </div>

                {/* Right Column: Inline Panel (Assign Verification) */}
                {showAssignModal && (
                  <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px", boxSizing: "border-box" }}>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                      <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>Assign Verification</h3>
                      <button onClick={() => setShowAssignModal(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>✕</button>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Select Verifier</label>
                      <div style={{ position: "relative" }}>
                        <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "5px 8px 5px 24px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                        <span style={{ position: "absolute", left: "6px", top: "5px", color: "#94a3b8", fontSize: "10px" }}>🔍</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { name: "Amit Kumar", title: "Address Verifier", cases: 12, checked: true },
                        { name: "Neha Patel", title: "Address Verifier", cases: 8, checked: true },
                        { name: "Rahul Verma", title: "Address Verifier", cases: 15, checked: false },
                      ].map((v, i) => (
                        <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", background: v.checked ? "#f8fafc" : "#fff" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input type="checkbox" defaultChecked={v.checked} />
                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700 }}>{v.name.charAt(0)}</div>
                            <div>
                              <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{v.name}</p>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{v.title}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{v.cases}</span>
                            <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Cases to Allocate</label>
                      <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "4px", width: "fit-content", padding: "2px" }}>
                        <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>-</button>
                        <span style={{ width: "28px", textAlign: "center", fontSize: "11px", fontWeight: 700 }}>{casesToAllocate}</span>
                        <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>+</button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <button onClick={() => setShowAssignModal(false)} style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                      <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Allocate Cases</button>
                    </div>

                  </div>
                )}

              </div>
            </>
          )}

          {/* TAB 2: ADD NEW ADDRESS */}
          {activeTab === "add_new" && (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              
              {/* Form Title */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📍</div>
                  <div>
                    <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Add New Address</h2>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Enter candidate and address details to add a new address record.</p>
                  </div>
                </div>
              </div>

              {/* Basic Details Section */}
              <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", padding: "16px", marginBottom: "20px", background: "#f8fafc" }}>

                {/* Select Client / Select Candidate — ties this address check
                    to an existing case, same pattern as Employment/Education. */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Select Client</label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="">
                        {clientsLoading ? "Loading clients…" : clientsError ? "Failed to load clients" : clients.length === 0 ? "No clients found" : "— Select Client —"}
                      </option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>{c.company_name || c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Case ID (Client)</label>
                    <div style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#eef1fb", color: "#2b3b8c", fontWeight: 700, boxSizing: "border-box", fontSize: "12px" }}>
                      {!selectedClientId ? "—" : casesLoading ? "Loading…" : clientCaseId || "No address case found for this client"}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Select Candidate</label>
                    <select
                      value={selectedCandidateKey}
                      onChange={(e) => setSelectedCandidateKey(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="">
                        {casesLoading ? "Loading candidates…" : casesError ? "Failed to load candidates" : candidateOptions.length === 0 ? "No candidates found" : "— Select Candidate —"}
                      </option>
                      {candidateOptions.map((cand) => (
                        <option key={cand.key} value={cand.key}>{cand.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Case ID (Candidate)</label>
                    <div style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#eef1fb", color: "#2b3b8c", fontWeight: 700, boxSizing: "border-box", fontSize: "12px" }}>
                      {!selectedCandidateKey ? "—" : casesLoading ? "Loading…" : candidateCaseId || "No address case found for this candidate"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Candidate Name *</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={candidateInfo.candidateName}
                        onChange={(e) => handleCandidateChange("candidateName", e.target.value)}
                        style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                      <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>👤</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Candidate ID *</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="Enter candidate ID"
                        value={candidateInfo.candidateId}
                        onChange={(e) => handleCandidateChange("candidateId", e.target.value)}
                        style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                      <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🪪</span>
                    </div>
                  </div>
                  <div style={{ display: "none" }}>
                    {/* Client Name superseded by the Select Client dropdown above */}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Mobile Number *</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={candidateInfo.mobileNumber}
                        onChange={(e) => handleCandidateChange("mobileNumber", e.target.value)}
                        style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                      <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>📞</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Email ID *</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={candidateInfo.emailAddress}
                        onChange={(e) => handleCandidateChange("emailAddress", e.target.value)}
                        style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", outline: "none", boxSizing: "border-box" }}
                      />
                      <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>✉️</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Permanent Address vs Correspondence Address */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                {renderAddressSection("Permanent Address", "🏠", permanentAddress, setPermanentAddress, true)}
                {renderAddressSection("Correspondence Address", "📍", correspondenceAddress, setCorrespondenceAddress, false)}
              </div>

              {/* Form Footer Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid #e2e8f0" }}>
                <button 
                  onClick={() => setActiveTab("verification")}
                  style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "8px 20px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#334155", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCase}
                  disabled={saving}
                  style={{ border: "none", background: "#2563eb", padding: "8px 20px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#fff", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Saving…" : "Save & Next"}
                </button>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
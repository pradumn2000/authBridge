// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function EmploymentCheck() {
//   const [activeTab, setActiveTab] = useState("allocation");
//   const [openEmployer, setOpenEmployer] = useState(1); // Track active accordion tab

//   // Pagination States for Table 1 (Company Allocation)
//   const [table1Page, setTable1Page] = useState(1);
//   const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

//   // Pagination States for Table 2 (Recent Cases)
//   const [table2Page, setTable2Page] = useState(1);
//   const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

//   // Form State for Employment Cases Tab
//   const [formData, setFormData] = useState({
//     candidateName: "",
//     date: "",
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSaveCase = (e) => {
//     e.preventDefault();
//     console.log("Saved Case Data:", formData);
//     alert("Employment Case Saved Successfully!");
//   };

//   // Reusable Pagination Component
//   const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startItem = (currentPage - 1) * itemsPerPage + 1;
//     const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//     return (
//       <div
//         style={{
//           display: "flex",
//           justify: "space-between",
//           alignItems: "center",
//           marginTop: "16px",
//           paddingTop: "12px",
//           borderTop: "1px solid #f1f5f9",
//           fontSize: "12px",
//           color: "#64748b"
//         }}
//       >
//         {/* Left Side: Showing items count */}
//         <div>
//           Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startItem}</span> to{" "}
//           <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of{" "}
//           <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
//         </div>

//         {/* Center: Page Navigation Buttons */}
//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             style={{
//               padding: "4px 8px",
//               borderRadius: "4px",
//               border: "1px solid #cbd5e1",
//               background: "#fff",
//               cursor: currentPage === 1 ? "not-allowed" : "pointer",
//               opacity: currentPage === 1 ? 0.5 : 1
//             }}
//           >
//             ‹
//           </button>

//           {[1, 2, 3, 4, 5].map((pageNum) => (
//             <button
//               key={pageNum}
//               onClick={() => onPageChange(pageNum)}
//               style={{
//                 padding: "4px 10px",
//                 borderRadius: "4px",
//                 border: pageNum === currentPage ? "none" : "1px solid #cbd5e1",
//                 background: pageNum === currentPage ? "#1e2761" : "#fff",
//                 color: pageNum === currentPage ? "#fff" : "#1e293b",
//                 fontWeight: pageNum === currentPage ? 700 : 500,
//                 cursor: "pointer"
//               }}
//             >
//               {pageNum}
//             </button>
//           ))}

//           <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>

//           <button
//             onClick={() => onPageChange(10)}
//             style={{
//               padding: "4px 10px",
//               borderRadius: "4px",
//               border: 10 === currentPage ? "none" : "1px solid #cbd5e1",
//               background: 10 === currentPage ? "#1e2761" : "#fff",
//               color: 10 === currentPage ? "#fff" : "#1e293b",
//               cursor: "pointer"
//             }}
//           >
//             10
//           </button>

//           <button
//             onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             style={{
//               padding: "4px 8px",
//               borderRadius: "4px",
//               border: "1px solid #cbd5e1",
//               background: "#fff",
//               cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//               opacity: currentPage === totalPages ? 0.5 : 1
//             }}
//           >
//             ›
//           </button>
//         </div>

//         {/* Right Side: Rows per page selector */}
//         <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => onRowsChange(Number(e.target.value))}
//             style={{
//               padding: "4px 8px",
//               borderRadius: "4px",
//               border: "1px solid #cbd5e1",
//               background: "#fff",
//               fontSize: "12px",
//               cursor: "pointer"
//             }}
//           >
//             <option value={5}>5 / page</option>
//             <option value={10}>10 / page</option>
//             <option value={20}>20 / page</option>
//             <option value={50}>50 / page</option>
//           </select>
//         </div>
//       </div>
//     );
//   };

//   // Common Accordion Form Body Component
//   const renderEmployerFields = (num) => (
//     <div style={{ background: "#fff", padding: "16px", borderTop: "1px solid #e2e8f0" }}>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>COMPANY NAME *</label>
//           <input type="text" placeholder="Enter company name" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DESIGNATION *</label>
//           <input type="text" placeholder="Enter designation" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>EMPLOYEE ID</label>
//           <input type="text" placeholder="Enter employee ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR EMAIL ID *</label>
//           <input type="email" placeholder="Enter HR email ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR PHONE NUMBER *</label>
//           <div style={{ display: "flex", gap: "8px" }}>
//             <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
//               <option>+91</option>
//             </select>
//             <input type="text" placeholder="Enter phone number" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//           </div>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF JOINING (DOJ) *</label>
//           <input type="date" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//         <div>
//           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF EXIT (DOE) *</label>
//           <input type="date" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
//         </div>
//       </div>

//       {/* Documents Upload Section */}
//       <div>
//         <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "10px", color: "#374151" }}>DOCUMENTS * (Upload up to 4 documents)</label>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
//           {[1, 2, 3, 4].map((docNum) => (
//             <div key={docNum} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#f8fafc" }}>
//               <p style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 4px 0", color: "#334155" }}>Document {docNum}</p>
//               <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "10px" }}>PDF, JPG, PNG (Max 10MB)</span>
//               <label style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
//                 ☁ Choose File
//                 <input type="file" style={{ display: "none" }} />
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Sidebar />

//       <section id="content">
//         <Header />

//         <main style={{ padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
//           <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            
//             {/* Top Navigation Bar */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
//               <ul className="nav nav-pills" style={{ gap: "10px", marginBottom: "0" }}>
//                 <li className="nav-item">
//                   <button
//                     className={`nav-link ${activeTab === "allocation" ? "active" : ""}`}
//                     onClick={() => setActiveTab("allocation")}
//                     style={{
//                       padding: "8px 4px 12px 4px",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: activeTab === "allocation" ? 700 : 500,
//                   fontSize: "14px",
//                   color: activeTab === "allocation" ? "#1e2761" : "#64748b",
//                   borderBottom: activeTab === "allocation" ? "2.5px solid #1e2761" : "none",
//                   borderRadius:"0",
//                   cursor: "pointer",
//                     }}
//                   >
//                     Company Allocation
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     className={`nav-link ${activeTab === "employment" ? "active" : ""}`}
//                     onClick={() => setActiveTab("employment")}
//                     style={{
//                       padding: "8px 4px 12px 4px",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: activeTab === "employment" ? 700 : 500,
//                   fontSize: "14px",
//                   color: activeTab === "employment" ? "#1e2761" : "#64748b",
//                   borderBottom: activeTab === "employment" ? "2.5px solid #1e2761" : "none",
//                   borderRadius:"0",
//                   cursor: "pointer",
//                     }}
//                   >
//                     Employment Cases
//                   </button>
//                 </li>
//               </ul>

//               {activeTab === "allocation" && (
//                 <button
//   onClick={() => setActiveTab("employment")}
//   className="secondary-cta"
// >
//   + Add New Employment Case
// </button>
//               )}
//             </div>

//             {/* TAB 1: COMPANY ALLOCATION */}
//             {activeTab === "allocation" && (
//               <div>
//                 {/* Search & Filter Bar */}
//                 <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
//                   <input
//                     type="text"
//                     placeholder="Search by Candidate, Case ID, Company..."
//                     style={{ flex: "2", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
//                   />
//                   <select style={{ flex: "1", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
//                     <option value="">All States</option>
//                   </select>
//                   <select style={{ flex: "1", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
//                     <option value="">All Cities</option>
//                   </select>
//                   <button style={{ padding: "10px 18px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontWeight: 600 }}>
//                     🌪️ Filters
//                   </button>
//                 </div>

//                 {/* Summary Stat Cards */}
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
//                   <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                     <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Total Employment Cases</span>
//                     <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>2,458</h2>
//                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>Across all companies</span>
//                   </div>
//                   <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                     <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Unassigned Cases</span>
//                     <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#d97706" }}>188</h2>
//                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>Require allocation</span>
//                   </div>
//                   <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                     <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>In Progress</span>
//                     <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#2563eb" }}>1,235</h2>
//                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>With verifiers</span>
//                   </div>
//                   <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                     <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Completed (This Month)</span>
//                     <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#16a34a" }}>1,035</h2>
//                     <span style={{ fontSize: "11px", color: "#94a3b8" }}>This month</span>
//                   </div>
//                 </div>

//                 {/* Table 1 & Verifier Selection Section */}
//                 <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
//                   <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                     <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>Company-wise Case Allocation</h3>
//                     <div style={{ overflowX: "auto" }}>
//                       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
//                         <thead>
//                           <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
//                             <th style={{ padding: "10px" }}><input type="checkbox" /></th>
//                             <th style={{ padding: "10px" }}>#</th>
//                             <th style={{ padding: "10px" }}>Client Name</th>
//                             <th style={{ padding: "10px" }}>Company Name</th>
//                             <th style={{ padding: "10px" }}>New Cases</th>
//                             <th style={{ padding: "10px" }}>Pending</th>
//                             <th style={{ padding: "10px" }}>In Progress</th>
//                             <th style={{ padding: "10px" }}>Completed</th>
//                             <th style={{ padding: "10px" }}>Verifiers (Name)</th>
//                             <th style={{ padding: "10px" }}>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {[
//                             { id: 1, client: "ABC Corp", company: "ABC Technologies Pvt. Ltd.", newCases: 24, pending: 8, progress: 6, done: 10, verifiers: "Amit Kumar, Neha Patel, Rahul Verma" },
//                             { id: 2, client: "XYZ Solutions", company: "XYZ Infotech Ltd.", newCases: 18, pending: 5, progress: 7, done: 6, verifiers: "Neha Patel, Rahul Verma" },
//                             { id: 3, client: "Infosys Limited", company: "Infosys Ltd.", newCases: 31, pending: 12, progress: 8, done: 11, verifiers: "Amit Kumar, Priya Singh" },
//                             { id: 4, client: "Tata Group", company: "Tata Consultancy Services", newCases: 27, pending: 9, progress: 10, done: 8, verifiers: "Rahul Verma, Smita Joshi, Amit Kumar" },
//                             { id: 5, client: "Wipro Enterprises", company: "Wipro Ltd.", newCases: 15, pending: 4, progress: 5, done: 6, verifiers: "Amit Kumar, Neha Patel" }
//                           ].map((row) => (
//                             <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                               <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked={row.id <= 2} /></td>
//                               <td style={{ padding: "10px" }}>{row.id}</td>
//                               <td style={{ padding: "10px", fontWeight: 600 }}>{row.client}</td>
//                               <td style={{ padding: "10px" }}>{row.company}</td>
//                               <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
//                               <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
//                               <td style={{ padding: "10px", color: "#028090", fontWeight: 700 }}>{row.progress}</td>
//                               <td style={{ padding: "10px", color: "#16a34a", fontWeight: 700 }}>{row.done}</td>
//                               <td style={{ padding: "10px", color: "#64748b" }}>{row.verifiers}</td>
//                               <td style={{ padding: "10px" }}>
//                                 <button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}>
//                                   Allocate
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                     {/* Pagination for Table 1 */}
//                     {renderPagination(table1Page, 50, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
//                   </div>

//                   {/* Select Verifier Panel */}
//                   <div style={{ width: "320px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                     <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#0f172a" }}>Select Verifier</h3>
//                     <input type="text" placeholder="🔍 Search verifier..." style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "16px", fontSize: "13px" }} />
//                     <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
//                       {[
//                         { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
//                         { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
//                         { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
//                       ].map((verifier, idx) => (
//                         <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                             <input type="checkbox" defaultChecked={verifier.checked} style={{ cursor: "pointer" }} />
//                             <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#334155" }}>
//                               {verifier.name.charAt(0)}
//                             </div>
//                             <div>
//                               <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{verifier.name}</p>
//                               <span style={{ fontSize: "11px", color: "#64748b" }}>{verifier.title}</span>
//                             </div>
//                           </div>
//                           <div style={{ textAlign: "right" }}>
//                             <span style={{ fontSize: "13px", fontWeight: 800, color: "#2563eb", display: "block" }}>{verifier.cases}</span>
//                             <span style={{ fontSize: "10px", color: "#2563eb", fontWeight: 600 }}>Active Cases</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Cancel</button>
//                       <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Allocate Cases</button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Table 2: Recent Employment Cases */}
//                 <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                   <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>Recent Employment Cases</h3>
//                   <div style={{ overflowX: "auto" }}>
//                     <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
//                       <thead>
//                         <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
//                           <th style={{ padding: "10px" }}><input type="checkbox" /></th>
//                           <th style={{ padding: "10px" }}>Case ID</th>
//                           <th style={{ padding: "10px" }}>Candidate Name</th>
//                           <th style={{ padding: "10px" }}>Client Name</th>
//                           <th style={{ padding: "10px" }}>Company Name</th>
//                           <th style={{ padding: "10px" }}>HR Email ID</th>
//                           <th style={{ padding: "10px" }}>HR Phone Number</th>
//                           <th style={{ padding: "10px" }}>Verifier (Name)</th>
//                           <th style={{ padding: "10px" }}>SLA</th>
//                           <th style={{ padding: "10px" }}>Status</th>
//                           <th style={{ padding: "10px" }}>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {[
//                           { id: "EMP-10245", candidate: "Rahul Sharma", client: "ABC Corp", company: "ABC Technologies Pvt. Ltd.", hr: "hr@abctech.com", phone: "+91 98765 43210", verifier: "Amit Kumar", sla: "3 Days", status: "In Progress", statusBg: "#fef3c7", statusColor: "#d97706" },
//                           { id: "EMP-10246", candidate: "Priya Singh", client: "XYZ Solutions", company: "XYZ Infotech Ltd.", hr: "hr@xyz.com", phone: "+91 91234 56789", verifier: "Neha Patel", sla: "3 Days", status: "Assigned", statusBg: "#dbeafe", statusColor: "#2563eb" },
//                           { id: "EMP-10247", candidate: "Arjun Mehta", client: "Infosys Limited", company: "Infosys Ltd.", hr: "hr@infosys.com", phone: "+91 98450 67890", verifier: "Unassigned", sla: "5 Days", status: "Unassigned", statusBg: "#fee2e2", statusColor: "#dc2626" },
//                           { id: "EMP-10248", candidate: "Sneha Joshi", client: "Tata Group", company: "Tata Consultancy Services", hr: "hr@tcs.com", phone: "+91 88765 12345", verifier: "Rahul Verma", sla: "3 Days", status: "In Progress", statusBg: "#fef3c7", statusColor: "#d97706" },
//                           { id: "EMP-10249", candidate: "Karan Verma", client: "Wipro Enterprises", company: "Wipro Ltd.", hr: "hr@wipro.com", phone: "+91 99087 66554", verifier: "Amit Kumar", sla: "5 Days", status: "Awaiting Response", statusBg: "#f3e8ff", statusColor: "#7e22ce" }
//                         ].map((row) => (
//                           <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                             <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked={row.id === "EMP-10245" || row.id === "EMP-10246"} /></td>
//                             <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.id}</td>
//                             <td style={{ padding: "10px", fontWeight: 600 }}><a
//     href="https://authbridge-10.onrender.com/EmploymentUserProfile"
//     style={{
//       color: "#2563eb",
//       textDecoration: "none",
//       cursor: "pointer",
//       fontWeight: 600,
//     }}
//     onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
//     onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//   >
//     {row.candidate}
//   </a></td>
//                             <td style={{ padding: "10px" }}>{row.client}</td>
//                             <td style={{ padding: "10px" }}>{row.company}</td>
//                             <td style={{ padding: "10px", color: "#64748b" }}>{row.hr}</td>
//                             <td style={{ padding: "10px", color: "#64748b" }}>{row.phone}</td>
//                             <td style={{ padding: "10px" }}>{row.verifier}</td>
//                             <td style={{ padding: "10px" }}>{row.sla}</td>
//                             <td style={{ padding: "10px" }}>
//                               <span style={{ background: row.statusBg, color: row.statusColor, padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>
//                                 {row.status}
//                               </span>
//                             </td>
//                             <td style={{ padding: "10px" }}>
//                               <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>View</button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Pagination for Table 2 */}
//                   {renderPagination(table2Page, 25, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
//                 </div>
//               </div>
//             )}

//             {/* TAB 2: EMPLOYMENT CASES (ACCORDION FORM) */}
//             {activeTab === "employment" && (
//               <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>
                
//                 {/* Header Actions */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//                   <div>
//                     <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Add Employment Case</h2>
//                     <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
//                       Add candidate employment details. You can add up to 4 previous employers.
//                     </p>
//                   </div>
//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <button
//                       type="button"
//                       onClick={() => setActiveTab("allocation")}
//                       style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}
//                     >
//                       ✕ Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleSaveCase}
//                       style={{ padding: "8px 20px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer" }}
//                     >
//                       💾 Save Case
//                     </button>
//                   </div>
//                 </div>

//                 {/* Candidate Details Card */}
//                 <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
//                   <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#2563eb", marginBottom: "12px" }}>Candidate Details</h4>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//                     <div>
//                       <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CANDIDATE NAME *</label>
//                       <input
//                         type="text"
//                         placeholder="Enter candidate name"
//                         value={formData.candidateName}
//                         onChange={(e) => handleInputChange("candidateName", e.target.value)}
//                         style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE *</label>
//                       <input
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) => handleInputChange("date", e.target.value)}
//                         style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Employers Accordion */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//                   {[1, 2, 3, 4].map((num) => {
//                     const isOpen = openEmployer === num;
//                     return (
//                       <div key={num} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
//                         <button
//                           type="button"
//                           onClick={() => setOpenEmployer(isOpen ? null : num)}
//                           style={{
//   width: "100%",
//   padding: "14px 16px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   background: "#ffffff",
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 700,
//   fontSize: "14px",
//   color: "#1e293b"
// }}
//                         >
//                           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                             <span
//   style={{
//     background: isOpen ? "#1e2761" : "#94a3b8",
//     color: "#fff",
//     borderRadius: "50%",
//     width: "24px",
//     height: "24px",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "12px",
//   }}
// >
//   {num}
// </span>
//                             Employer {num}
//                           </div>
//                           <span style={{ fontSize: "16px", color: "#1e2761" }}>
//                             {isOpen ? "➖" : "➕"}
//                           </span>
//                         </button>

//                         {/* Expandable Content */}
//                         {isOpen && renderEmployerFields(num)}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Bottom Action Footer */}
//                 <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
//                   <button
//                     type="button"
//                     onClick={() => setActiveTab("allocation")}
//                     style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}
//                   >
//                     ✕ Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSaveCase}
//                     style={{ padding: "10px 24px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer" }}
//                   >
//                     💾 Save Case
//                   </button>
//                 </div>

//               </div>
//             )}

//           </div>
//         </main>
//       </section>
//     </>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";

const EMPTY_EMPLOYER = {
  companyName: "",
  designation: "",
  employeeId: "",
  hrEmail: "",
  hrPhone: "",
  doj: "",
  doe: "",
};

export default function EmploymentCheck() {
  const [activeTab, setActiveTab] = useState("allocation");
  const [openEmployer, setOpenEmployer] = useState(1); // Track active accordion tab

  // Pagination States for Table 1 (Company Allocation)
  const [table1Page, setTable1Page] = useState(1);
  const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

  // Pagination States for Table 2 (Recent Cases)
  const [table2Page, setTable2Page] = useState(1);
  const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

  // Form State for Employment Cases Tab
  const [formData, setFormData] = useState({
    candidateName: "",
    date: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ── Employer accordion state (was uncontrolled — nothing typed here
  // ever reached JS before). Up to 4 employers, keyed by index 0-3.
  const [employers, setEmployers] = useState([
    { ...EMPTY_EMPLOYER },
    { ...EMPTY_EMPLOYER },
    { ...EMPTY_EMPLOYER },
    { ...EMPTY_EMPLOYER },
  ]);

  const updateEmployer = (idx, field, value) => {
    setEmployers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const [saving, setSaving] = useState(false);

  // ── Select Client / Select Candidate + linked Case ID ──────────────────
  // Fetches the real client list and the real case list so the Add
  // Employment Case form can tie this employment check back to a specific
  // client and a specific candidate, each auto-showing the one case
  // associated with the selection (read-only — not editable here).
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

  // /api/cases already returns everything both tables need: case_id,
  // candidate, client, client_id, checks, check_details (fields/documents
  // per check type), check_tat, status, assigned_verifier. No separate
  // "employment cases" endpoint required — we just filter to cases whose
  // `checks` array includes "employment".
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

  // Only cases that actually have an employment check attached — this is
  // the set both the candidate dropdown and both tables below draw from.
  const employmentCases = useMemo(
    () => cases.filter((c) => (c.checks || []).includes("employment")),
    [cases]
  );

  // Candidates derived from employment cases. Each case IS one candidate
  // (case_id is already unique), so no separate dedup key is needed.
  const candidateOptions = useMemo(
    () =>
      employmentCases.map((c) => ({
        key: c.case_id,
        name: c.candidate || "Unnamed Candidate",
      })),
    [employmentCases]
  );

  // First matching employment case for the selected client — read-only
  // display, per the "auto-filled, shows the one case tied to that
  // client" behavior.
  const clientCase = useMemo(() => {
    if (!selectedClientId) return null;
    return (
      employmentCases.find((c) => String(c.client_id) === String(selectedClientId)) ||
      null
    );
  }, [employmentCases, selectedClientId]);

  const candidateCase = useMemo(() => {
    if (!selectedCandidateKey) return null;
    return employmentCases.find((c) => c.case_id === selectedCandidateKey) || null;
  }, [employmentCases, selectedCandidateKey]);

  const clientCaseId = clientCase ? clientCase.case_id : "";
  const candidateCaseId = candidateCase ? candidateCase.case_id : "";

  // When a candidate/case is picked, load whatever employment details are
  // already saved on it (editing an existing case) instead of always
  // starting from a blank form.
  useEffect(() => {
    if (!candidateCase) return;

    const savedFields = candidateCase.check_details?.employment?.fields;
    if (!savedFields) return;

    setFormData((prev) => ({
      ...prev,
      candidateName: savedFields.candidate_name ?? candidateCase.candidate ?? prev.candidateName,
      date: savedFields.date ?? prev.date,
    }));

    if (Array.isArray(savedFields.employers) && savedFields.employers.length > 0) {
      setEmployers((prev) =>
        prev.map((emp, idx) => ({ ...EMPTY_EMPLOYER, ...(savedFields.employers[idx] || {}) }))
      );
    }
  }, [candidateCase]);

  // ── Save: reuses the existing PATCH /cases/{caseId}/checks/{checkKey}
  // route (the same one candidate/verifier dashboards already use to save
  // check fields) rather than a new endpoint — it writes straight into
  // the `case_checks.fields` JSON column and logs a CaseEvent.
  const handleSaveCase = async (e) => {
    e.preventDefault();

    if (!candidateCase) {
      alert("Select a candidate with an employment case first.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/api/cases/${candidateCase.case_id}/checks/employment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fields: {
              candidate_name: formData.candidateName,
              date: formData.date,
              employers: employers.filter((emp) => emp.companyName.trim() !== ""),
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Save failed");
      }

      await fetchCases(); // refetch — feeds both tables below
      alert("Employment Case Saved Successfully!");
      setActiveTab("allocation");
    } catch (err) {
      alert("Failed to save case: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Recent Employment Cases (Table 2) — derived from employmentCases
  const recentCaseRows = useMemo(() => {
    return employmentCases.map((c) => {
      const empFields = c.check_details?.employment?.fields;
      const firstEmployer = empFields?.employers?.[0];
      const tat = c.check_tat?.employment;
      const statusStyles = {
        pending: { bg: "#fee2e2", color: "#dc2626", label: "Unassigned" },
        "in-progress": { bg: "#fef3c7", color: "#d97706", label: "In Progress" },
        "qc-review": { bg: "#f3e8ff", color: "#7e22ce", label: "Awaiting Response" },
        completed: { bg: "#dcfce7", color: "#16a34a", label: "Completed" },
        "on-hold": { bg: "#dbeafe", color: "#2563eb", label: "On Hold" },
      };
      const style = statusStyles[c.status] || { bg: "#f1f5f9", color: "#64748b", label: c.status };

      return {
        id: c.case_id,
        candidate: c.candidate,
        client: c.client,
        company: firstEmployer?.companyName || "—",
        hr: firstEmployer?.hrEmail || "—",
        phone: firstEmployer?.hrPhone || "—",
        verifier: c.assigned_verifier || "Unassigned",
        sla: tat ? `${tat.working_days || tat.calendar_days || 0} Days` : "—",
        status: style.label,
        statusBg: style.bg,
        statusColor: style.color,
      };
    });
  }, [employmentCases]);

  // ── Company-wise Case Allocation (Table 1) — grouped by client, since
  // BGVCase only has one client per case (no separate "company" entity
  // distinct from the client). New/Pending/In Progress/Completed map from
  // the case status enum (pending / qc-review / in-progress / completed).
  const allocationRows = useMemo(() => {
    const byClient = {};

    employmentCases.forEach((c) => {
      const key = c.client_id ?? c.client;
      if (!byClient[key]) {
        byClient[key] = {
          id: key,
          client: c.client,
          company: c.client,
          newCases: 0,
          pending: 0,
          progress: 0,
          done: 0,
          verifiers: new Set(),
        };
      }
      const row = byClient[key];
      if (c.status === "pending") row.newCases += 1;
      else if (c.status === "qc-review") row.pending += 1;
      else if (c.status === "in-progress") row.progress += 1;
      else if (c.status === "completed") row.done += 1;

      if (c.assigned_verifier) {
        c.assigned_verifier.split(", ").forEach((v) => row.verifiers.add(v));
      }
    });

    return Object.values(byClient).map((r) => ({
      ...r,
      verifiers: [...r.verifiers].join(", ") || "Unassigned",
    }));
  }, [employmentCases]);

  // Summary stat cards, derived from the same data instead of hardcoded numbers
  const summaryStats = useMemo(() => {
    const total = employmentCases.length;
    const unassigned = employmentCases.filter((c) => c.status === "pending").length;
    const inProgress = employmentCases.filter((c) => c.status === "in-progress").length;
    const completed = employmentCases.filter((c) => c.status === "completed").length;
    return { total, unassigned, inProgress, completed };
  }, [employmentCases]);

  // Reusable Pagination Component
  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div
        style={{
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          marginTop: "16px",
          paddingTop: "12px",
          borderTop: "1px solid #f1f5f9",
          fontSize: "12px",
          color: "#64748b"
        }}
      >
        {/* Left Side: Showing items count */}
        <div>
          Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startItem}</span> to{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
        </div>

        {/* Center: Page Navigation Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            ‹
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: pageNum === currentPage ? "none" : "1px solid #cbd5e1",
                background: pageNum === currentPage ? "#1e2761" : "#fff",
                color: pageNum === currentPage ? "#fff" : "#1e293b",
                fontWeight: pageNum === currentPage ? 700 : 500,
                cursor: "pointer"
              }}
            >
              {pageNum}
            </button>
          ))}

          {totalPages > 5 && (
            <>
              <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: totalPages === currentPage ? "none" : "1px solid #cbd5e1",
                  background: totalPages === currentPage ? "#1e2761" : "#fff",
                  color: totalPages === currentPage ? "#fff" : "#1e293b",
                  cursor: "pointer"
                }}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            ›
          </button>
        </div>

        {/* Right Side: Rows per page selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <select
            value={itemsPerPage}
            onChange={(e) => onRowsChange(Number(e.target.value))}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
    );
  };

  // Paged slices for each table
  const pagedAllocationRows = useMemo(() => {
    const start = (table1Page - 1) * table1RowsPerPage;
    return allocationRows.slice(start, start + table1RowsPerPage);
  }, [allocationRows, table1Page, table1RowsPerPage]);

  const pagedRecentCaseRows = useMemo(() => {
    const start = (table2Page - 1) * table2RowsPerPage;
    return recentCaseRows.slice(start, start + table2RowsPerPage);
  }, [recentCaseRows, table2Page, table2RowsPerPage]);

  // Common Accordion Form Body Component
  const renderEmployerFields = (num) => {
    const idx = num - 1;
    const emp = employers[idx];

    return (
      <div style={{ background: "#fff", padding: "16px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>COMPANY NAME *</label>
            <input
              type="text"
              placeholder="Enter company name"
              value={emp.companyName}
              onChange={(e) => updateEmployer(idx, "companyName", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DESIGNATION *</label>
            <input
              type="text"
              placeholder="Enter designation"
              value={emp.designation}
              onChange={(e) => updateEmployer(idx, "designation", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>EMPLOYEE ID</label>
            <input
              type="text"
              placeholder="Enter employee ID"
              value={emp.employeeId}
              onChange={(e) => updateEmployer(idx, "employeeId", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR EMAIL ID *</label>
            <input
              type="email"
              placeholder="Enter HR email ID"
              value={emp.hrEmail}
              onChange={(e) => updateEmployer(idx, "hrEmail", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR PHONE NUMBER *</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
                <option>+91</option>
              </select>
              <input
                type="text"
                placeholder="Enter phone number"
                value={emp.hrPhone}
                onChange={(e) => updateEmployer(idx, "hrPhone", e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF JOINING (DOJ) *</label>
            <input
              type="date"
              value={emp.doj}
              onChange={(e) => updateEmployer(idx, "doj", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF EXIT (DOE) *</label>
            <input
              type="date"
              value={emp.doe}
              onChange={(e) => updateEmployer(idx, "doe", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
            />
          </div>
        </div>

        {/* Documents Upload Section */}
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "10px", color: "#374151" }}>DOCUMENTS * (Upload up to 4 documents)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[1, 2, 3, 4].map((docNum) => (
              <div key={docNum} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#f8fafc" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 4px 0", color: "#334155" }}>Document {docNum}</p>
                <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "10px" }}>PDF, JPG, PNG (Max 10MB)</span>
                <label style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
                  ☁ Choose File
                  <input type="file" style={{ display: "none" }} />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        <main style={{ padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {/* Top Navigation Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
              <ul className="nav nav-pills" style={{ gap: "10px", marginBottom: "0" }}>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "allocation" ? "active" : ""}`}
                    onClick={() => setActiveTab("allocation")}
                    style={{
                      padding: "8px 4px 12px 4px",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "allocation" ? 700 : 500,
                  fontSize: "14px",
                  color: activeTab === "allocation" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "allocation" ? "2.5px solid #1e2761" : "none",
                  borderRadius:"0",
                  cursor: "pointer",
                    }}
                  >
                    Company Allocation
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "employment" ? "active" : ""}`}
                    onClick={() => setActiveTab("employment")}
                    style={{
                      padding: "8px 4px 12px 4px",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "employment" ? 700 : 500,
                  fontSize: "14px",
                  color: activeTab === "employment" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "employment" ? "2.5px solid #1e2761" : "none",
                  borderRadius:"0",
                  cursor: "pointer",
                    }}
                  >
                    Employment Cases
                  </button>
                </li>
              </ul>

              {activeTab === "allocation" && (
                <button
  onClick={() => setActiveTab("employment")}
  className="secondary-cta"
>
  + Add New Employment Case
</button>
              )}
            </div>

            {/* TAB 1: COMPANY ALLOCATION */}
            {activeTab === "allocation" && (
              <div>
                {/* Search & Filter Bar */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <input
                    type="text"
                    placeholder="Search by Candidate, Case ID, Company..."
                    style={{ flex: "2", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }}
                  />
                  <select style={{ flex: "1", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
                    <option value="">All States</option>
                  </select>
                  <select style={{ flex: "1", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
                    <option value="">All Cities</option>
                  </select>
                  <button style={{ padding: "10px 18px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontWeight: 600 }}>
                    🌪️ Filters
                  </button>
                </div>

                {/* Summary Stat Cards — derived from live case data */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Total Employment Cases</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>{summaryStats.total}</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Across all companies</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Unassigned Cases</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#d97706" }}>{summaryStats.unassigned}</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Require allocation</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>In Progress</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#2563eb" }}>{summaryStats.inProgress}</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>With verifiers</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Completed</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#16a34a" }}>{summaryStats.completed}</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>All time</span>
                  </div>
                </div>

                {/* Table 1 & Verifier Selection Section */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>Company-wise Case Allocation</h3>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                            <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                            <th style={{ padding: "10px" }}>#</th>
                            <th style={{ padding: "10px" }}>Client Name</th>
                            <th style={{ padding: "10px" }}>Company Name</th>
                            <th style={{ padding: "10px" }}>New Cases</th>
                            <th style={{ padding: "10px" }}>Pending</th>
                            <th style={{ padding: "10px" }}>In Progress</th>
                            <th style={{ padding: "10px" }}>Completed</th>
                            <th style={{ padding: "10px" }}>Verifiers (Name)</th>
                            <th style={{ padding: "10px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {casesLoading ? (
                            <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                          ) : casesError ? (
                            <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#dc2626" }}>{casesError}</td></tr>
                          ) : pagedAllocationRows.length === 0 ? (
                            <tr><td colSpan={10} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>No employment cases yet.</td></tr>
                          ) : (
                            pagedAllocationRows.map((row, i) => (
                              <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                                <td style={{ padding: "10px" }}>{(table1Page - 1) * table1RowsPerPage + i + 1}</td>
                                <td style={{ padding: "10px", fontWeight: 600 }}>{row.client}</td>
                                <td style={{ padding: "10px" }}>{row.company}</td>
                                <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
                                <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
                                <td style={{ padding: "10px", color: "#028090", fontWeight: 700 }}>{row.progress}</td>
                                <td style={{ padding: "10px", color: "#16a34a", fontWeight: 700 }}>{row.done}</td>
                                <td style={{ padding: "10px", color: "#64748b" }}>{row.verifiers}</td>
                                <td style={{ padding: "10px" }}>
                                  <button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}>
                                    Allocate
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination for Table 1 */}
                    {renderPagination(table1Page, allocationRows.length, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
                  </div>

                  {/* Select Verifier Panel */}
                  <div style={{ width: "320px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#0f172a" }}>Select Verifier</h3>
                    <input type="text" placeholder="🔍 Search verifier..." style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "16px", fontSize: "13px" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                      {[
                        { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
                        { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
                        { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
                      ].map((verifier, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="checkbox" defaultChecked={verifier.checked} style={{ cursor: "pointer" }} />
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#334155" }}>
                              {verifier.name.charAt(0)}
                            </div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{verifier.name}</p>
                              <span style={{ fontSize: "11px", color: "#64748b" }}>{verifier.title}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: "13px", fontWeight: 800, color: "#2563eb", display: "block" }}>{verifier.cases}</span>
                            <span style={{ fontSize: "10px", color: "#2563eb", fontWeight: 600 }}>Active Cases</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Cancel</button>
                      <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Allocate Cases</button>
                    </div>
                  </div>
                </div>

                {/* Table 2: Recent Employment Cases */}
                <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>Recent Employment Cases</h3>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                          <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                          <th style={{ padding: "10px" }}>Case ID</th>
                          <th style={{ padding: "10px" }}>Candidate Name</th>
                          <th style={{ padding: "10px" }}>Client Name</th>
                          <th style={{ padding: "10px" }}>Company Name</th>
                          <th style={{ padding: "10px" }}>HR Email ID</th>
                          <th style={{ padding: "10px" }}>HR Phone Number</th>
                          <th style={{ padding: "10px" }}>Verifier (Name)</th>
                          <th style={{ padding: "10px" }}>SLA</th>
                          <th style={{ padding: "10px" }}>Status</th>
                          <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {casesLoading ? (
                          <tr><td colSpan={11} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                        ) : casesError ? (
                          <tr><td colSpan={11} style={{ padding: "16px", textAlign: "center", color: "#dc2626" }}>{casesError}</td></tr>
                        ) : pagedRecentCaseRows.length === 0 ? (
                          <tr><td colSpan={11} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>No employment cases yet.</td></tr>
                        ) : (
                          pagedRecentCaseRows.map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                              <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.id}</td>
                              <td style={{ padding: "10px", fontWeight: 600 }}>
                                <a
                                  href={`https://authbridge-10.onrender.com/EmploymentUserProfile?case_id=${row.id}`}
                                  style={{
                                    color: "#2563eb",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                  }}
                                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                                >
                                  {row.candidate}
                                </a>
                              </td>
                              <td style={{ padding: "10px" }}>{row.client}</td>
                              <td style={{ padding: "10px" }}>{row.company}</td>
                              <td style={{ padding: "10px", color: "#64748b" }}>{row.hr}</td>
                              <td style={{ padding: "10px", color: "#64748b" }}>{row.phone}</td>
                              <td style={{ padding: "10px" }}>{row.verifier}</td>
                              <td style={{ padding: "10px" }}>{row.sla}</td>
                              <td style={{ padding: "10px" }}>
                                <span style={{ background: row.statusBg, color: row.statusColor, padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>
                                  {row.status}
                                </span>
                              </td>
                              <td style={{ padding: "10px" }}>
                                <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>View</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination for Table 2 */}
                  {renderPagination(table2Page, recentCaseRows.length, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
                </div>
              </div>
            )}

            {/* TAB 2: EMPLOYMENT CASES (ACCORDION FORM) */}
            {activeTab === "employment" && (
              <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>

                {/* Header Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Add Employment Case</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                      Add candidate employment details. You can add up to 4 previous employers.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab("allocation")}
                      style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}
                    >
                      ✕ Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCase}
                      disabled={saving}
                      style={{ padding: "8px 20px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
                    >
                      💾 {saving ? "Saving…" : "Save Case"}
                    </button>
                  </div>
                </div>

                {/* Candidate Details Card */}
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#2563eb", marginBottom: "12px" }}>Candidate Details</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CANDIDATE NAME *</label>
                      <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={formData.candidateName}
                        onChange={(e) => handleInputChange("candidateName", e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
                      />
                    </div>
                  </div>

                  {/* ── Select Client / Case ID + Select Candidate / Case ID ──
                      Ties this employment case to a real client and a real
                      candidate from the system. Each Case ID is read-only —
                      it auto-fills with the one case tied to whichever
                      client/candidate is selected above it. */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>SELECT CLIENT</label>
                      <select
                        value={selectedClientId}
                        onChange={(e) => setSelectedClientId(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
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
                        <span style={{ fontSize: "11px", color: "#dc2626", display: "block", marginTop: "4px" }}>
                          {clientsError}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CASE ID (CLIENT)</label>
                      <div
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#eef1fb",
                          color: "#2b3b8c",
                          fontWeight: 700,
                          boxSizing: "border-box",
                        }}
                      >
                        {!selectedClientId
                          ? "—"
                          : casesLoading
                          ? "Loading…"
                          : clientCaseId || "No employment case found for this client"}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>SELECT CANDIDATE</label>
                      <select
                        value={selectedCandidateKey}
                        onChange={(e) => setSelectedCandidateKey(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff" }}
                      >
                        <option value="">
                          {casesLoading
                            ? "Loading candidates…"
                            : casesError
                            ? "Failed to load candidates"
                            : candidateOptions.length === 0
                            ? "No candidates found"
                            : "— Select Candidate —"}
                        </option>
                        {candidateOptions.map((cand) => (
                          <option key={cand.key} value={cand.key}>
                            {cand.name}
                          </option>
                        ))}
                      </select>
                      {casesError && (
                        <span style={{ fontSize: "11px", color: "#dc2626", display: "block", marginTop: "4px" }}>
                          {casesError}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CASE ID (CANDIDATE)</label>
                      <div
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#eef1fb",
                          color: "#2b3b8c",
                          fontWeight: 700,
                          boxSizing: "border-box",
                        }}
                      >
                        {!selectedCandidateKey
                          ? "—"
                          : casesLoading
                          ? "Loading…"
                          : candidateCaseId || "No employment case found for this candidate"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employers Accordion */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[1, 2, 3, 4].map((num) => {
                    const isOpen = openEmployer === num;
                    return (
                      <div key={num} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                        <button
                          type="button"
                          onClick={() => setOpenEmployer(isOpen ? null : num)}
                          style={{
  width: "100%",
  padding: "14px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#ffffff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "14px",
  color: "#1e293b"
}}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span
  style={{
    background: isOpen ? "#1e2761" : "#94a3b8",
    color: "#fff",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  }}
>
  {num}
</span>
                            Employer {num}
                          </div>
                          <span style={{ fontSize: "16px", color: "#1e2761" }}>
                            {isOpen ? "➖" : "➕"}
                          </span>
                        </button>

                        {/* Expandable Content */}
                        {isOpen && renderEmployerFields(num)}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action Footer */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("allocation")}
                    style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}
                  >
                    ✕ Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCase}
                    disabled={saving}
                    style={{ padding: "10px 24px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
                  >
                    💾 {saving ? "Saving…" : "Save Case"}
                  </button>
                </div>

              </div>
            )}

          </div>
        </main>
      </section>
    </>
  );
}
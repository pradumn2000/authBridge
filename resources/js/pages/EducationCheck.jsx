

// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import "../../css/style.css";
// import Header from "./Header";

// export default function EducationVerification() {
//   // Active Tab State: 'allocation' | 'education'
//   const [activeTab, setActiveTab] = useState("allocation");

//   // Pagination States
//   const [table1Page, setTable1Page] = useState(1);
//   const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

//   const [table2Page, setTable2Page] = useState(1);
//   const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

//   // Candidate Information Form State
//   const [candidateInfo, setCandidateInfo] = useState({
//     candidateName: "",
//     candidateId: "",
//     clientName: "",
//     mobileNumber: "",
//     emailAddress: "",
//   });

//   // Qualification Dynamic Accordions State
//   const [qualifications, setQualifications] = useState([
//     {
//       id: 1,
//       isOpen: true,
//       qualificationType: "",
//       courseStream: "",
//       specialization: "",
//       instituteUniversity: "",
//       boardUniversity: "",
//       studyType: "National",
//       verificationFeesBy: "",
//       fromYOP: "",
//       toYOP: "",
//       universityFees: "",
//       serviceCharge: "",
//       gst: "",
//       totalAmount: "",
//     },
//   ]);

//   const handleCandidateChange = (field, value) => {
//     setCandidateInfo((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleQualificationChange = (id, field, value) => {
//     setQualifications((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
//     );
//   };

//   // Accordion Toggle Handler
//   const toggleAccordion = (id) => {
//     setQualifications((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q))
//     );
//   };

//   const addQualification = () => {
//     setQualifications((prev) => [
//       ...prev.map((q) => ({ ...q, isOpen: false })),
//       {
//         id: Date.now(),
//         isOpen: true,
//         qualificationType: "",
//         courseStream: "",
//         specialization: "",
//         instituteUniversity: "",
//         boardUniversity: "",
//         studyType: "National",
//         verificationFeesBy: "",
//         fromYOP: "",
//         toYOP: "",
//         universityFees: "",
//         serviceCharge: "",
//         gst: "",
//         totalAmount: "",
//       },
//     ]);
//   };

//   const removeQualification = (id, e) => {
//     e.stopPropagation();
//     if (qualifications.length === 1) return;
//     setQualifications((prev) => prev.filter((q) => q.id !== id));
//   };

//   // Reusable Table Pagination Component
//   const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startItem = (currentPage - 1) * itemsPerPage + 1;
//     const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//     return (
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#64748b" }}>
//         <div>
//           Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startItem}</span> to <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
//             ‹
//           </button>
//           {[1, 2, 3, 4, 5].map((pageNum) => (
//             <button key={pageNum} onClick={() => onPageChange(pageNum)} style={{ padding: "4px 10px", borderRadius: "4px", border: pageNum === currentPage ? "none" : "1px solid #cbd5e1", background: pageNum === currentPage ? "#2563eb" : "#fff", color: pageNum === currentPage ? "#fff" : "#1e293b", fontWeight: pageNum === currentPage ? 700 : 500, cursor: "pointer" }}>
//               {pageNum}
//             </button>
//           ))}
//           <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>
//           <button onClick={() => onPageChange(15)} style={{ padding: "4px 10px", borderRadius: "4px", border: 15 === currentPage ? "none" : "1px solid #cbd5e1", background: 15 === currentPage ? "#2563eb" : "#fff", color: 15 === currentPage ? "#fff" : "#1e293b", cursor: "pointer" }}>15</button>
//           <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
//             ›
//           </button>
//         </div>

//         <select value={itemsPerPage} onChange={(e) => onRowsChange(Number(e.target.value))} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", fontSize: "12px", cursor: "pointer" }}>
//           <option value={5}>5 / page</option>
//           <option value={10}>10 / page</option>
//           <option value={20}>20 / page</option>
//         </select>
//       </div>
//     );
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <div id="sidebar">
//         <Sidebar />
//       </div>

//       <div id="content">
//         <Header />

//         {/* 3. Main Body Container */}
//         <main style={{ padding: "24px" }}>
//           {/* Top Bar Search & Conditional Button */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type="text"
//                   placeholder="Search by Candidate, Case ID, University..."
//                   style={{ width: "340px", padding: "8px 12px 8px 34px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", background: "#fff" }}
//                 />
//                 <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🔍</span>
//               </div>
//               <button style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px 12px", cursor: "pointer" }}>🌪️ Filter</button>
//             </div>

//             {/* CONDITIONAL BUTTON */}
//             {activeTab === "allocation" && (
//               <button
//                 onClick={() => setActiveTab("education")}
//                 className="secondary-cta import"
//               >
//                 + New Education Case
//               </button>
//             )}
//           </div>

//           {/* Navigation Tabs Header */}
//           <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "24px" }}>
//               <button
//                 onClick={() => setActiveTab("allocation")}
//                 style={{
//                   padding: "8px 4px 12px 4px",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: activeTab === "allocation" ? 700 : 500,
//                   fontSize: "14px",
//                   color: activeTab === "allocation" ? "#1e2761" : "#64748b",
//                   borderBottom: activeTab === "allocation" ? "2.5px solid #1e2761" : "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 University Allocation
//               </button>
//               <button
//                 onClick={() => setActiveTab("education")}
//                 style={{
//                   padding: "8px 4px 12px 4px",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: activeTab === "education" ? 700 : 500,
//                   fontSize: "14px",
//                   color: activeTab === "education" ? "#1e2761" : "#64748b",
//                   borderBottom: activeTab === "education" ? "2.5px solid #1e2761" : "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Education Cases
//               </button>
//             </div>
//           </div>

//           {/* TAB 1: UNIVERSITY ALLOCATION TAB */}
//           {activeTab === "allocation" && (
//             <div>
//               {/* Stat Cards */}
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
//                 {[
//                   { title: "Total Education Cases", val: "1,248", sub: "Across all Universities", icon: "🎓", bg: "#eff6ff" },
//                   { title: "Unassigned Cases", val: "143", sub: "Require allocation", icon: "👤", bg: "#fff7ed" },
//                   { title: "In Progress", val: "685", sub: "With Verifiers", icon: "👥", bg: "#f0fdf4" },
//                   { title: "Completed (This Month)", val: "420", sub: "This Month", icon: "✓", bg: "#dcfce7" },
//                 ].map((st, i) => (
//                   <div key={i} style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <div>
//                       <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>{st.title}</span>
//                       <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>{st.val}</h2>
//                       <span style={{ fontSize: "11px", color: "#94a3b8" }}>{st.sub}</span>
//                     </div>
//                     <div style={{ background: st.bg, width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{st.icon}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Summary Table & Select Verifier Drawer */}
//               <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
//                 <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
//                     <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1e293b" }}>University-wise Case Summary</h3>
//                     <input type="text" placeholder="Search University / Client..." style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }} />
//                   </div>

//                   <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
//                     <thead>
//                       <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
//                         <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
//                         <th style={{ padding: "10px" }}>#</th>
//                         <th style={{ padding: "10px" }}>University / Institution</th>
//                         <th style={{ padding: "10px" }}>Client Name</th>
//                         <th style={{ padding: "10px" }}>New Cases</th>
//                         <th style={{ padding: "10px" }}>Pending</th>
//                         <th style={{ padding: "10px" }}>Verifier Name</th>
//                         <th style={{ padding: "10px" }}>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         { id: 1, uni: "Pune University", client: "ABC Corp", newCases: 24, pending: 8, verifier: "Amit Kumar" },
//                         { id: 2, uni: "Mumbai University", client: "XYZ Solutions", newCases: 18, pending: 5, verifier: "Neha Patel" },
//                         { id: 3, uni: "Delhi University", client: "Infosys Ltd.", newCases: 31, pending: 12, verifier: "Rahul Verma" },
//                       ].map((row) => (
//                         <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                           <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
//                           <td style={{ padding: "10px" }}>{row.id}</td>
//                           <td style={{ padding: "10px", fontWeight: 600 }}>{row.uni}</td>
//                           <td style={{ padding: "10px" }}>{row.client}</td>
//                           <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
//                           <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
//                           <td style={{ padding: "10px" }}>{row.verifier}</td>
//                           <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Allocate</button></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   {renderPagination(table1Page, 50, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
//                 </div>

//                 {/* Verifier Selection Side Modal Box */}
//                 <div style={{ width: "320px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                   <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#0f172a" }}>Select Verifier</h3>
//                   <input type="text" placeholder="🔍 Search verifier..." style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "16px", fontSize: "13px" }} />
//                   <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
//                     {[
//                       { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
//                       { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
//                       { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
//                     ].map((verifier, idx) => (
//                       <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                           <input type="checkbox" defaultChecked={verifier.checked} style={{ cursor: "pointer" }} />
//                           <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#334155" }}>
//                             {verifier.name.charAt(0)}
//                           </div>
//                           <div>
//                             <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{verifier.name}</p>
//                             <span style={{ fontSize: "11px", color: "#64748b" }}>{verifier.title}</span>
//                           </div>
//                         </div>
//                         <div style={{ textAlign: "right" }}>
//                           <span style={{ fontSize: "13px", fontWeight: 800, color: "#2563eb", display: "block" }}>{verifier.cases}</span>
//                           <span style={{ fontSize: "10px", color: "#2563eb", fontWeight: 600 }}>Active Cases</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Cancel</button>
//                     <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Allocate Cases</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Unassigned Cases Table */}
//               <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
//                 <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px", color: "#1e293b" }}>Unassigned Education Cases</h3>
//                 <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
//                   <thead>
//                     <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
//                       <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
//                       <th style={{ padding: "10px" }}>Case ID</th>
//                       <th style={{ padding: "10px" }}>Candidate Name</th>
//                       <th style={{ padding: "10px" }}>University</th>
//                       <th style={{ padding: "10px" }}>Status</th>
//                       <th style={{ padding: "10px" }}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       { id: "EDU-10245", candidate: "Rahul Sharma", uni: "Pune University" },
//                       { id: "EDU-10246", candidate: "Priya Singh", uni: "Mumbai University" },
//                     ].map((r) => (
//                       <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
//                         <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
//                         <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{r.id}</td>
//                         <td style={{ padding: "10px", fontWeight: 600 }}>
//                           <a
//                             href={`/candidate/${r.id}`}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               console.log("Navigating to candidate:", r.candidate);
//                             }}
//                             style={{
//                               color: "#2563eb",
//                               textDecoration: "none",
//                               cursor: "pointer",
//                               fontWeight: 600,
//                             }}
//                             onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
//                             onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//                           >
//                             {r.candidate}
//                           </a>
//                         </td>
//                         <td style={{ padding: "10px" }}>{r.uni}</td>
//                         <td style={{ padding: "10px" }}><span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>Unassigned</span></td>
//                         <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "4px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Assign</button></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {renderPagination(table2Page, 143, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
//               </div>
//             </div>
//           )}

//           {/* TAB 2: ADD NEW EDUCATION FORM TAB */}
//           {activeTab === "education" && (
//             <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>
              
//               {/* Form Header */}
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                   <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#2563eb" }}>📖</div>
//                   <div>
//                     <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Education Details</h2>
//                     <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" }}>Add all educational qualifications of the candidate</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={addQualification}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     padding: "8px 16px",
//                     borderRadius: "6px",
//                     border: "1px solid #cbd5e1",
//                     background: "#ffffff",
//                     color: "#2563eb",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     fontSize: "13px",
//                   }}
//                 >
//                   <span style={{ fontSize: "16px" }}>+</span> Add Qualification
//                 </button>
//               </div>

//               {/* Candidate Info Input Card */}
//               <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "24px" }}>
//                 <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 16px 0", color: "#1e293b" }}>👤 Candidate Information</h4>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
//                   {[
//                     { label: "CANDIDATE NAME *", key: "candidateName", placeholder: "Enter Candidate Name" },
//                     { label: "CANDIDATE ID *", key: "candidateId", placeholder: "Enter Candidate ID" },
//                     { label: "CLIENT NAME *", key: "clientName", placeholder: "Enter Client Name" },
//                     { label: "MOBILE NUMBER *", key: "mobileNumber", placeholder: "Enter Mobile Number" },
//                     { label: "EMAIL ADDRESS *", key: "emailAddress", placeholder: "Enter Email Address" },
//                   ].map((field, i) => (
//                     <div key={i}>
//                       <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>{field.label}</label>
//                       <input
//                         type="text"
//                         placeholder={field.placeholder}
//                         value={candidateInfo[field.key]}
//                         onChange={(e) => handleCandidateChange(field.key, e.target.value)}
//                         style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Dynamic Qualifications List */}
//               <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
//                 {qualifications.map((q, index) => (
//                   <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", background: "#ffffff", overflow: "hidden" }}>
                    
//                     {/* ACCORDION HEADER */}
//                     <div
//                       onClick={() => toggleAccordion(q.id)}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "14px 16px",
//                         background: "#ffffff",
//                         cursor: "pointer",
//                         borderBottom: q.isOpen ? "1px solid #f1f5f9" : "none",
//                         userSelect: "none",
//                       }}
//                     >
//                       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         <span style={{ color: "#94a3b8", fontSize: "14px", cursor: "grab" }}>⣿</span>
//                         <span style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>
//                           Qualification {index + 1}
//                         </span>
//                       </div>

//                       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                         <button
//                           onClick={(e) => removeQualification(q.id, e)}
//                           style={{
//                             padding: "4px 12px",
//                             borderRadius: "4px",
//                             border: "1px solid #fecaca",
//                             background: "#ffffff",
//                             color: "#dc2626",
//                             fontSize: "12px",
//                             fontWeight: 600,
//                             cursor: "pointer",
//                           }}
//                         >
//                           Remove
//                         </button>
//                         <span style={{ fontSize: "12px", color: "#64748b", transform: q.isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
//                           ▼
//                         </span>
//                       </div>
//                     </div>

//                     {/* ACCORDION BODY */}
//                     {q.isOpen && (
//                       <div style={{ padding: "16px 20px" }}>
//                         {/* Row 1: 5 Inputs */}
//                         <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "16px" }}>
//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Qualification Type *</label>
//                             <select
//                               value={q.qualificationType}
//                               onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.qualificationType ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Select Qualification Type</option>
//                               <option value="Graduation">Graduation</option>
//                               <option value="Post Graduation">Post Graduation</option>
//                               <option value="Diploma">Diploma</option>
//                               <option value="10th / 12th">10th / 12th</option>
//                             </select>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Course / Stream *</label>
//                             <select
//                               value={q.courseStream}
//                               onChange={(e) => handleQualificationChange(q.id, "courseStream", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.courseStream ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Select Course / Stream</option>
//                               <option value="B.Tech">B.Tech</option>
//                               <option value="B.Sc">B.Sc</option>
//                               <option value="B.Com">B.Com</option>
//                               <option value="MBA">MBA</option>
//                             </select>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Specialization (Optional)</label>
//                             <input
//                               type="text"
//                               placeholder="Enter Specialization"
//                               value={q.specialization}
//                               onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Institute / University *</label>
//                             <select
//                               value={q.instituteUniversity}
//                               onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.instituteUniversity ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Enter Institute / School / University</option>
//                               <option value="University of Delhi">University of Delhi</option>
//                               <option value="Pune University">Pune University</option>
//                               <option value="Mumbai University">Mumbai University</option>
//                             </select>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Board / University *</label>
//                             <select
//                               value={q.boardUniversity}
//                               onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.boardUniversity ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Select Board / University</option>
//                               <option value="CBSE">CBSE</option>
//                               <option value="ICSE">ICSE</option>
//                               <option value="State Board">State Board</option>
//                             </select>
//                           </div>
//                         </div>

//                         {/* Row 2: National/International + Verification Fees By + From YOP + To YOP */}
//                         <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>National / International *</label>
//                             <div style={{ display: "flex", gap: "16px", alignItems: "center", height: "36px" }}>
//                               <label style={{ fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                                 <input
//                                   type="radio"
//                                   name={`studyType-${q.id}`}
//                                   value="National"
//                                   checked={q.studyType === "National"}
//                                   onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
//                                 />
//                                 National
//                               </label>
//                               <label style={{ fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                                 <input
//                                   type="radio"
//                                   name={`studyType-${q.id}`}
//                                   value="International"
//                                   checked={q.studyType === "International"}
//                                   onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
//                                 />
//                                 International
//                               </label>
//                             </div>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Verification Fees By *</label>
//                             <select
//                               value={q.verificationFeesBy}
//                               onChange={(e) => handleQualificationChange(q.id, "verificationFeesBy", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.verificationFeesBy ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Select Fees By</option>
//                               <option value="Client">Client</option>
//                               <option value="Candidate">Candidate</option>
//                               <option value="Company">Company</option>
//                             </select>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>From YOP *</label>
//                             <input
//                               type="text"
//                               placeholder="YYYY"
//                               value={q.fromYOP}
//                               onChange={(e) => handleQualificationChange(q.id, "fromYOP", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>To YOP *</label>
//                             <input
//                               type="text"
//                               placeholder="YYYY"
//                               value={q.toYOP}
//                               onChange={(e) => handleQualificationChange(q.id, "toYOP", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>
//                         </div>

//                         {/* Row 3: University Fees, Service Charge, GST, Total Amount */}
//                         <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>
//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>University Fees (₹)</label>
//                             <input
//                               type="number"
//                               placeholder="Enter University Fees"
//                               value={q.universityFees}
//                               onChange={(e) => handleQualificationChange(q.id, "universityFees", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Service Charge (₹)</label>
//                             <input
//                               type="number"
//                               placeholder="Enter Service Charge"
//                               value={q.serviceCharge}
//                               onChange={(e) => handleQualificationChange(q.id, "serviceCharge", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>GST</label>
//                             <input
//                               type="text"
//                               placeholder="Enter GST"
//                               value={q.gst}
//                               onChange={(e) => handleQualificationChange(q.id, "gst", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Total Amount</label>
//                             <input
//                               type="number"
//                               placeholder="Total Amount"
//                               value={q.totalAmount}
//                               onChange={(e) => handleQualificationChange(q.id, "totalAmount", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>
//                         </div>

//                         {/* Documents Upload Section */}
//                         <div>
//                           <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "10px", color: "#374151" }}>DOCUMENTS * (Upload up to 4 documents)</label>
//                           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
//                             {[1, 2, 3, 4].map((docNum) => (
//                               <div key={docNum} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#f8fafc" }}>
//                                 <p style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 4px 0", color: "#334155" }}>Document {docNum}</p>
//                                 <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "10px" }}>PDF, JPG, PNG (Max 10MB)</span>
//                                 <label style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
//                                   ☁ Choose File
//                                   <input type="file" style={{ display: "none" }} />
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Form Actions */}
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
//                 <button
//                   onClick={() => setActiveTab("allocation")}
//                   style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => alert("Form Submitted Successfully!")}
//                   className="secondary-cta"
//                 >
//                   Submit Details
//                 </button>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Upload, 
  FileText, 
  X, 
  GraduationCap, 
  Briefcase, 
  Eye,
  Download,
  User,
  CreditCard,
  Lock,
  Camera
} from 'lucide-react';

export default function CandidateVerificationWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form States
  const [dpdpAccepted, setDpdpAccepted] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Priya Sharma',
    profileImage: null,
    profileImagePreview: null,
    candidateId: '',
    clientName: '',
    dob: '',
    gender: '',
    mobile: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    currentAddress: '',
    currentAddressDocType: '',
    currentAddressDocFile: null,
    isPermanentSame: false,
    permanentAddress: '',
    permanentAddressDocType: '',
    permanentAddressDocFile: null,
    aadhaarNumber: '',
    panNumber: '',
    candidateDate: ''
  });

  // Step 4 Tabs: 'education' | 'employment'
  const [step4Tab, setStep4Tab] = useState('education');

  // Education state with dynamic fields
  const [qualifications, setQualifications] = useState([
    { 
      qualificationType: '', 
      courseStream: '', 
      specialization: '', 
      institute: '', 
      boardUniversity: '', 
      nationalInternational: 'National', 
      verificationFeesBy: 'Normal',
      fromYop: '',
      toYop: '',
      universityFees: '',
      commission: '',
      serviceCharge: '',
      modeOfStudy: '', 
      documents: [null, null, null, null] 
    }
  ]);
  
  // Employment state
  const [employers, setEmployers] = useState([
    { 
      companyName: '', 
      designation: '', 
      employeeId: '', 
      hrEmail: '', 
      hrPhoneCode: '+91',
      hrPhone: '', 
      doj: '', 
      doe: '',
      documents: [null, null, null, null]
    }
  ]);

  // Step 5 Document Upload State
  const [uploadedFile, setUploadedFile] = useState({
    name: 'CLIENT PORTAL.png',
    status: 'Uploaded · OCR complete',
    confidenceScore: 96,
    ocrData: [
      { label: 'Full Name', value: 'PRIYA SHARMA' },
      { label: 'Date of Birth', value: '14 March 1997' },
      { label: 'Issuing Authority', value: 'UNIVERSITY OF MUMBAI' },
      { label: 'Degree', value: 'Bachelor of Engineering' },
      { label: 'Passing Year', value: '2019' },
      { label: 'Roll Number', value: 'MU-ENG-2019-04782' }
    ],
    matches: ['Name Match', 'Date Match', 'Institution'],
    forgeryStatus: 'Low — No anomalies detected'
  });

  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Profile Image Handler
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonalDetails({
        ...personalDetails,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file)
      });
    }
  };

  // Qualification Handlers
  const addQualification = () => {
    setQualifications([
      ...qualifications, 
      { 
        qualificationType: '', 
        courseStream: '', 
        specialization: '', 
        institute: '', 
        boardUniversity: '', 
        nationalInternational: 'National', 
        verificationFeesBy: 'Normal',
        fromYop: '',
        toYop: '',
        universityFees: '',
        commission: '',
        serviceCharge: '',
        modeOfStudy: '', 
        documents: [null, null, null, null] 
      }
    ]);
  };

  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((_, i) => i !== index));
    }
  };

  const handleQualificationChange = (index, field, value) => {
    const updated = [...qualifications];
    updated[index][field] = value;
    setQualifications(updated);
  };

  const handleQualDocumentUpload = (qualIndex, docIndex, file) => {
    const updated = [...qualifications];
    updated[qualIndex].documents[docIndex] = file;
    setQualifications(updated);
  };

  // Employer Handlers
  const addEmployer = () => {
    setEmployers([
      ...employers, 
      { 
        companyName: '', 
        designation: '', 
        employeeId: '', 
        hrEmail: '', 
        hrPhoneCode: '+91',
        hrPhone: '', 
        doj: '', 
        doe: '',
        documents: [null, null, null, null]
      }
    ]);
  };

  const removeEmployer = (index) => {
    if (employers.length > 1) {
      setEmployers(employers.filter((_, i) => i !== index));
    }
  };

  const handleEmployerChange = (index, field, value) => {
    const updated = [...employers];
    updated[index][field] = value;
    setEmployers(updated);
  };

  const handleFileUpload = (empIndex, docIndex, file) => {
    const updated = [...employers];
    updated[empIndex].documents[docIndex] = file;
    setEmployers(updated);
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    },
    card: {
      width: '100%',
      maxWidth: '1000px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      overflow: 'hidden'
    },
    initialCard: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '32px',
      textAlign: 'center',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9'
    },
    iconHeaderCircle: {
      width: '64px',
      height: '64px',
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    step1IconCircle: {
      width: '64px',
      height: '64px',
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    successIconCircle: {
      width: '64px',
      height: '64px',
      backgroundColor: '#d1fae5',
      color: '#059669',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto'
    },
    badgeCheck: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#d1fae5',
      color: '#059669',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '700'
    },
    innerPadding: {
      padding: '32px'
    },
    stepperContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px 0',
      marginBottom: '16px'
    },
    stepperLine: {
      width: '24px',
      height: '2px'
    },
    mainTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '8px'
    },
    stepHeaderTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#0f172a',
      margin: '4px 0'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '14px',
      marginBottom: '24px'
    },
    stepBadge: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#2563eb',
      textTransform: 'uppercase'
    },
    sectionBox: {
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px'
    },
    sectionBoxGray: {
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      backgroundColor: '#f8fafc'
    },
    sectionBoxAmber: {
      border: '1px solid #fde68a',
      backgroundColor: '#fffbeb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#1e293b',
      letterSpacing: '0.02em',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    sectionTitleCentered: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#2563eb',
      textAlign: 'center',
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '11px',
      fontWeight: '700',
      color: '#334155',
      textTransform: 'uppercase',
      marginBottom: '6px',
      letterSpacing: '0.02em'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '13px',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#1e293b',
      backgroundColor: '#ffffff'
    },
    inputReadOnly: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '13px',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#1e293b',
      backgroundColor: '#f8fafc'
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '13px',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#1e293b',
      height: '60px',
      resize: 'none'
    },
    otpInput: {
      width: '40px',
      height: '40px',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '700',
      backgroundColor: '#f8fafc'
    },
    grid5: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '12px',
      marginBottom: '16px'
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px',
      marginBottom: '16px'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '16px'
    },
    avatarUploadContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px',
      border: '1px dashed #cbd5e1',
      borderRadius: '10px',
      backgroundColor: '#f8fafc'
    },
    avatarCircle: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: '2px solid #cbd5e1',
      flexShrink: 0
    },
    docGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginTop: '12px'
    },
    docBox: {
      border: '1px dashed #cbd5e1',
      borderRadius: '8px',
      padding: '16px 8px',
      textAlign: 'center',
      backgroundColor: '#ffffff'
    },
    uploadBtnLabel: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#eff6ff',
      color: '#2563eb',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    btnPrimary: {
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '14px',
      padding: '10px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnPrimaryFull: {
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '14px',
      padding: '10px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
      justifyContent: 'center'
    },
    btnSecondary: {
      backgroundColor: 'transparent',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    btnRemove: {
      backgroundColor: 'transparent',
      color: '#ef4444',
      border: '1px solid #fca5a5',
      borderRadius: '6px',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    btnOutlineFull: {
      backgroundColor: 'transparent',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '14px',
      border: '1px solid #cbd5e1',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      marginTop: '16px'
    },
    btnDashedAdd: {
      width: '100%',
      border: '2px dashed #cbd5e1',
      backgroundColor: 'transparent',
      color: '#2563eb',
      padding: '12px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '8px'
    },
    footer: {
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #f1f5f9',
      marginTop: '24px'
    },
    tabContainer: {
      display: 'flex',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '4px',
      backgroundColor: '#f8fafc',
      marginBottom: '20px'
    },
    tabBtnActive: {
      flex: 1,
      padding: '8px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: '#0f172a',
      color: '#ffffff'
    },
    tabBtnInactive: {
      flex: 1,
      padding: '8px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: 'transparent',
      color: '#475569'
    },
    termsBox: {
      height: '120px',
      overflowY: 'auto',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      color: '#475569',
      lineHeight: '1.5'
    },
    digilockerBox: {
      marginTop: '16px',
      border: '1px solid #fde68a',
      backgroundColor: '#fffbeb',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    digilockerBtn: {
      backgroundColor: '#ea580c',
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '12px',
      cursor: 'pointer'
    },
    badgeGreen: {
      fontSize: '12px',
      color: '#059669',
      backgroundColor: '#ecfdf5',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: '600'
    },
    flexRowBetween: {
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center'
    },
    flexColumnGap: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    flexAlignGap: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginTop: '12px',
      cursor: 'pointer'
    },
    ocrRow: {
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      fontSize: '13px'
    },
    progressBarBg: {
      height: '8px',
      backgroundColor: '#f1f5f9',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressBarFill: {
      width: '96%',
      height: '100%',
      backgroundColor: '#059669'
    },
    btnAccept: {
      backgroundColor: '#059669',
      color: '#ffffff',
      border: 'none',
      padding: '10px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    btnFlag: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      border: 'none',
      padding: '10px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    radioGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      height: '38px'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '13px',
      color: '#1e293b',
      cursor: 'pointer'
    }
  };

  const getStepCircleStyle = (step) => {
    const isCompleted = step < currentStep;
    const isCurrent = step === currentStep;
    return {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.2s',
      backgroundColor: isCompleted ? '#059669' : isCurrent ? '#2563eb' : '#f1f5f9',
      color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
      boxShadow: isCurrent ? '0 0 0 4px #dbeafe' : 'none'
    };
  };

  const renderStepper = () => (
    <div style={styles.stepperContainer}>
      {[1, 2, 3, 4, 5, 6, 7].map((step) => {
        const isCompleted = step < currentStep;
        return (
          <React.Fragment key={step}>
            <div style={getStepCircleStyle(step)}>
              {isCompleted ? <Check size={16} /> : step}
            </div>
            {step < 7 && (
              <div
                style={{
                  ...styles.stepperLine,
                  backgroundColor: step < currentStep ? '#059669' : '#e2e8f0'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div style={styles.container}>
      
      {!isOpen ? (
        <div style={styles.initialCard}>
          <div style={styles.iconHeaderCircle}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={styles.mainTitle}>Candidate Verification Portal</h1>
          <p style={styles.subtitle}>
            Start the 7-step identity, education, document, and background verification process.
          </p>
          <button onClick={() => setIsOpen(true)} style={styles.btnPrimaryFull}>
            <span>Start Verification Flow</span>
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          
          {currentStep > 1 && currentStep < 7 && renderStepper()}

          <div style={styles.innerPadding}>

            {/* STEP 1: WELCOME SCREEN */}
            {currentStep === 1 && (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.step1IconCircle}>
                  <ShieldCheck size={36} />
                </div>
                <span style={styles.stepBadge}>Step 1 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Background Verification</h2>
                <p style={styles.subtitle}>
                  Welcome! Please complete your background verification to proceed with your onboarding process.
                </p>

                <div style={{ ...styles.sectionBoxGray, textAlign: 'left' }}>
                  <h3 style={styles.sectionTitle}>Before you begin, ensure you have:</h3>
                  <div style={styles.flexColumnGap}>
                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Government ID (Aadhaar / PAN card)</span>
                    </div>
                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Educational Certificates (Degree / Marksheets)</span>
                    </div>
                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Employment details & HR contact information</span>
                    </div>
                  </div>
                </div>

                <div style={styles.footer}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated time: ~5 minutes</span>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Begin Verification</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONSENT & VERIFICATION */}
            {currentStep === 2 && (
              <div>
                <span style={styles.stepBadge}>Step 2 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Consent & Verification</h2>
                <p style={styles.subtitle}>Verify your email address and provide consent under DPDP Act.</p>

                <div style={styles.sectionBox}>
                  <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
                    <label style={styles.label}>E-mail Verification</label>
                    <span style={styles.badgeGreen}>✓ E-mail Verified</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input key={i} type="text" value="•" readOnly style={styles.otpInput} />
                    ))}
                  </div>
                  <div style={{ ...styles.flexRowBetween, fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                    <span>Enter 6-digit OTP sent to priya.sharma@email.com</span>
                    <span style={{ color: '#2563eb', cursor: 'pointer' }}>Resend OTP</span>
                  </div>
                </div>

                <div style={styles.sectionBoxGray}>
                  <label style={styles.label}>Data Protection Consent (DPDP Act 2023)</label>
                  <div style={styles.termsBox}>
                    In accordance with the Digital Personal Data Protection Act, 2023, by checking the box below, you explicitly consent to the collection, processing, and sharing of your personal, educational, and professional data for background verification.
                  </div>
                  <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={dpdpAccepted} onChange={(e) => setDpdpAccepted(e.target.checked)} style={{ marginTop: '3px' }} />
                    <span style={{ fontSize: '12px', color: '#475569' }}>I have read and agree to the data protection consent terms and authorize background checks.</span>
                  </label>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} disabled={!dpdpAccepted} style={{ ...styles.btnPrimary, opacity: dpdpAccepted ? 1 : 0.5, cursor: dpdpAccepted ? 'pointer' : 'not-allowed' }}>
                    <span>Give Consent & Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PERSONAL & IDENTITY */}
            {currentStep === 3 && (
              <div>
                <span style={styles.stepBadge}>Step 3 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Personal & Identity</h2>
                <p style={styles.subtitle}>Provide your personal details and government identity documents.</p>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Personal Details</h3>
                  
                  {/* FULL NAME & PROFILE IMAGE UPLOAD IN GRID */}
                  <div style={{ ...styles.grid2, alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <label style={styles.label}>Full Name *</label>
                      <input 
                        type="text" 
                        value={personalDetails.fullName} 
                        onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })} 
                        style={styles.input} 
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Candidate Photo *</label>
                      <div style={styles.avatarUploadContainer}>
                        <div style={styles.avatarCircle}>
                          {personalDetails.profileImagePreview ? (
                            <img 
                              src={personalDetails.profileImagePreview} 
                              alt="Candidate Profile" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <User size={36} color="#94a3b8" />
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ ...styles.uploadBtnLabel, width: 'fit-content' }}>
                            <Camera size={14} /> Upload Image
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }} 
                              onChange={handleProfileImageChange}
                            />
                          </label>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>JPG, PNG (Max 5MB)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Date of Birth</label>
                      <input type="date" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>Gender</label>
                      <select style={styles.input}>
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Mobile</label>
                      <input type="text" value={personalDetails.mobile} readOnly style={styles.inputReadOnly} />
                    </div>
                    <div>
                      <label style={styles.label}>Email</label>
                      <input type="email" value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} style={styles.input} />
                    </div>
                  </div>
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Address Details</h3>
                  
                  {/* CURRENT ADDRESS BLOCK */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.label}>Current Address *</label>
                    <textarea 
                      placeholder="Flat/House No., Street, Area, City, State — PIN" 
                      style={styles.textarea} 
                      value={personalDetails.currentAddress}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddress: e.target.value })}
                    />
                    
                    <div style={{ ...styles.grid2, marginTop: '12px' }}>
                      <div>
                        <label style={styles.label}>Current Address Proof Type *</label>
                        <select 
                          style={styles.input}
                          value={personalDetails.currentAddressDocType}
                          onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocType: e.target.value })}
                        >
                          <option value="">Select Document Type</option>
                          <option value="Aadhaar Card">Aadhaar Card</option>
                          <option value="Driving License">Driving License (DL)</option>
                          <option value="Electricity Bill">Electricity Bill</option>
                          <option value="Passport">Passport</option>
                          <option value="Rent Agreement">Rent Agreement</option>
                          <option value="Voter ID">Voter ID</option>
                        </select>
                      </div>
                      <div>
                        <label style={styles.label}>Upload Address Proof Document *</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
                            <Upload size={14} /> Choose File
                            <input 
                              type="file" 
                              style={{ display: 'none' }}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocFile: e.target.files[0] })}
                            />
                          </label>
                        </div>
                        {personalDetails.currentAddressDocFile && (
                          <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            ✓ {personalDetails.currentAddressDocFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={personalDetails.isPermanentSame}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setPersonalDetails({ 
                          ...personalDetails, 
                          isPermanentSame: checked,
                          permanentAddress: checked ? personalDetails.currentAddress : '',
                          permanentAddressDocType: checked ? personalDetails.currentAddressDocType : '',
                          permanentAddressDocFile: checked ? personalDetails.currentAddressDocFile : null
                        });
                      }}
                    />
                    <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>Permanent address same as current</span>
                  </label>

                  {/* PERMANENT ADDRESS BLOCK */}
                  {!personalDetails.isPermanentSame && (
                    <div style={{ marginTop: '12px' }}>
                      <label style={styles.label}>Permanent Address *</label>
                      <textarea 
                        placeholder="Flat/House No., Street, Area, City, State — PIN" 
                        style={styles.textarea} 
                        value={personalDetails.permanentAddress}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddress: e.target.value })}
                      />

                      <div style={{ ...styles.grid2, marginTop: '12px' }}>
                        <div>
                          <label style={styles.label}>Permanent Address Proof Type *</label>
                          <select 
                            style={styles.input}
                            value={personalDetails.permanentAddressDocType}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocType: e.target.value })}
                          >
                            <option value="">Select Document Type</option>
                            <option value="Aadhaar Card">Aadhaar Card</option>
                            <option value="Driving License">Driving License (DL)</option>
                            <option value="Electricity Bill">Electricity Bill</option>
                            <option value="Passport">Passport</option>
                            <option value="Rent Agreement">Rent Agreement</option>
                            <option value="Voter ID">Voter ID</option>
                          </select>
                        </div>
                        <div>
                          <label style={styles.label}>Upload Address Proof Document *</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
                              <Upload size={14} /> Choose File
                              <input 
                                type="file" 
                                style={{ display: 'none' }}
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocFile: e.target.files[0] })}
                              />
                            </label>
                          </div>
                          {personalDetails.permanentAddressDocFile && (
                            <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              ✓ {personalDetails.permanentAddressDocFile.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* IDENTITY DOCUMENTS (AADHAAR & PAN) */}
                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>
                    <CreditCard size={16} color="#2563eb" /> Identity Documents
                  </h3>
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Aadhaar Number *</label>
                      <input 
                        type="text" 
                        placeholder="Enter 12-digit Aadhaar Number" 
                        style={styles.input}
                        maxLength={12}
                        value={personalDetails.aadhaarNumber}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, aadhaarNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={styles.label}>PAN Number *</label>
                      <input 
                        type="text" 
                        placeholder="ABCDE1234F" 
                        style={{ ...styles.input, textTransform: 'uppercase' }} 
                        maxLength={10}
                        value={personalDetails.panNumber}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, panNumber: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>

                  {/* DIGILOCKER INTEGRATION BOX */}
                  <div style={styles.digilockerBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Lock size={20} color="#ea580c" />
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: '#9a3412' }}>Fast-track with DigiLocker</h4>
                        <p style={{ fontSize: '11px', color: '#c2410c', margin: '2px 0 0 0' }}>Fetch verified Aadhaar & PAN instantly via DigiLocker.</p>
                      </div>
                    </div>
                    <button style={styles.digilockerBtn}>Connect DigiLocker</button>
                  </div>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Verify Identity</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: EDUCATION & EMPLOYMENT */}
            {currentStep === 4 && (
              <div>
                <span style={styles.stepBadge}>Step 4 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Education & Employment</h2>
                <p style={styles.subtitle}>Add your qualifications and professional history.</p>

                <div style={styles.tabContainer}>
                  <button
                    onClick={() => setStep4Tab('education')}
                    style={step4Tab === 'education' ? styles.tabBtnActive : styles.tabBtnInactive}
                  >
                    <GraduationCap size={16} /> Education
                  </button>
                  <button
                    onClick={() => setStep4Tab('employment')}
                    style={step4Tab === 'employment' ? styles.tabBtnActive : styles.tabBtnInactive}
                  >
                    <Briefcase size={16} /> Employment
                  </button>
                </div>

                {step4Tab === 'education' ? (
                  <div>
                    <div style={styles.sectionBox}>
                      <h3 style={styles.sectionTitle}>
                        <User size={16} color="#4f46e5" /> Candidate Information
                      </h3>
                      <div style={styles.grid5}>
                        <div>
                          <label style={styles.label}>Candidate Name *</label>
                          <input 
                            type="text" 
                            placeholder="Enter Candidate Name" 
                            style={styles.input}
                            value={personalDetails.fullName}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={styles.label}>Candidate ID *</label>
                          <input 
                            type="text" 
                            placeholder="Enter Candidate ID" 
                            style={styles.input}
                            value={personalDetails.candidateId}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, candidateId: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={styles.label}>Client Name *</label>
                          <input 
                            type="text" 
                            placeholder="Enter Client Name" 
                            style={styles.input}
                            value={personalDetails.clientName}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, clientName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={styles.label}>Mobile Number *</label>
                          <input 
                            type="text" 
                            placeholder="Enter Mobile Number" 
                            style={styles.input}
                            value={personalDetails.mobile}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, mobile: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={styles.label}>Email Address *</label>
                          <input 
                            type="email" 
                            placeholder="Enter Email Address" 
                            style={styles.input}
                            value={personalDetails.email}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {qualifications.map((qual, idx) => (
                      <div key={idx} style={styles.sectionBox}>
                        <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
                          <h3 style={styles.sectionTitle}>Qualification {idx + 1}</h3>
                          {qualifications.length > 1 && (
                            <button onClick={() => removeQualification(idx)} style={styles.btnRemove}>
                              Remove
                            </button>
                          )}
                        </div>

                        <div style={styles.grid5}>
                          <div>
                            <label style={styles.label}>Qualification Type *</label>
                            <select 
                              style={styles.input}
                              value={qual.qualificationType}
                              onChange={(e) => handleQualificationChange(idx, 'qualificationType', e.target.value)}
                            >
                              <option value="">Select Qualification Type</option>
                              <option value="Post Graduate">Post Graduate</option>
                              <option value="Graduate">Graduate</option>
                              <option value="Diploma">Diploma</option>
                              <option value="12th">12th Standard</option>
                              <option value="10th">10th Standard</option>
                            </select>
                          </div>
                          <div>
                            <label style={styles.label}>Course / Stream *</label>
                            <select 
                              style={styles.input}
                              value={qual.courseStream}
                              onChange={(e) => handleQualificationChange(idx, 'courseStream', e.target.value)}
                            >
                              <option value="">Select Course / Stream</option>
                              <option value="B.Tech">B.Tech / B.E.</option>
                              <option value="B.Sc">B.Sc</option>
                              <option value="B.Com">B.Com</option>
                              <option value="B.A">B.A</option>
                              <option value="MCA">MCA</option>
                            </select>
                          </div>
                          <div>
                            <label style={styles.label}>Specialization (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="Enter Specialization" 
                              style={styles.input}
                              value={qual.specialization}
                              onChange={(e) => handleQualificationChange(idx, 'specialization', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={styles.label}>Institute / University *</label>
                            <select 
                              style={styles.input}
                              value={qual.institute}
                              onChange={(e) => handleQualificationChange(idx, 'institute', e.target.value)}
                            >
                              <option value="">Enter Institute / School / Univer</option>
                              <option value="University of Mumbai">University of Mumbai</option>
                              <option value="Delhi University">Delhi University</option>
                              <option value="IIT Bombay">IIT Bombay</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label style={styles.label}>Board / University *</label>
                            <select 
                              style={styles.input}
                              value={qual.boardUniversity}
                              onChange={(e) => handleQualificationChange(idx, 'boardUniversity', e.target.value)}
                            >
                              <option value="">Select Board / University</option>
                              <option value="State Board">State Board</option>
                              <option value="CBSE">CBSE</option>
                              <option value="ICSE">ICSE</option>
                              <option value="Deemed University">Deemed University</option>
                            </select>
                          </div>
                        </div>

                        {/* NATIONAL / INTERNATIONAL RADIO & DYNAMIC DROPDOWN SECTION */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div>
                            <label style={styles.label}>National / International *</label>
                            <div style={styles.radioGroup}>
                              <label style={styles.radioLabel}>
                                <input 
                                  type="radio" 
                                  name={`nat-int-${idx}`} 
                                  value="National" 
                                  checked={qual.nationalInternational === 'National'} 
                                  onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
                                />
                                National
                              </label>
                              <label style={styles.radioLabel}>
                                <input 
                                  type="radio" 
                                  name={`nat-int-${idx}`} 
                                  value="International" 
                                  checked={qual.nationalInternational === 'International'} 
                                  onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
                                />
                                International
                              </label>
                            </div>
                          </div>

                          <div>
                            <label style={styles.label}>Verification Fees By *</label>
                            <select 
                              style={styles.input}
                              value={qual.verificationFeesBy}
                              onChange={(e) => handleQualificationChange(idx, 'verificationFeesBy', e.target.value)}
                            >
                              <option value="Normal">Normal</option>
                              <option value="Year of Passing">Year of Passing</option>
                              <option value="UG/PG">UG/PG</option>
                            </select>
                          </div>

                          <div>
                            <label style={styles.label}>From YOP *</label>
                            <input 
                              type="text" 
                              placeholder="YYYY" 
                              style={styles.input}
                              value={qual.fromYop}
                              onChange={(e) => handleQualificationChange(idx, 'fromYop', e.target.value)}
                            />
                          </div>

                          <div>
                            <label style={styles.label}>To YOP *</label>
                            <input 
                              type="text" 
                              placeholder="YYYY" 
                              style={styles.input}
                              value={qual.toYop}
                              onChange={(e) => handleQualificationChange(idx, 'toYop', e.target.value)}
                            />
                          </div>
                        </div>

                        {/* FEES DETAILS SECTION */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div>
                            <label style={styles.label}>University Fees (₹)</label>
                            <input 
                              type="text" 
                              placeholder="Enter University Fees" 
                              style={styles.input}
                              value={qual.universityFees}
                              onChange={(e) => handleQualificationChange(idx, 'universityFees', e.target.value)}
                            />
                          </div>

                          <div>
                            <label style={styles.label}>Commission (₹)</label>
                            <input 
                              type="text" 
                              placeholder="Enter Commission" 
                              style={styles.input}
                              value={qual.commission}
                              onChange={(e) => handleQualificationChange(idx, 'commission', e.target.value)}
                            />
                          </div>

                          <div>
                            <label style={styles.label}>Service Charge (₹)</label>
                            <input 
                              type="text" 
                              placeholder="Enter Service Charge" 
                              style={styles.input}
                              value={qual.serviceCharge}
                              onChange={(e) => handleQualificationChange(idx, 'serviceCharge', e.target.value)}
                            />
                          </div>

                          <div>
                            <label style={styles.label}>Mode of Study *</label>
                            <select 
                              style={styles.input}
                              value={qual.modeOfStudy}
                              onChange={(e) => handleQualificationChange(idx, 'modeOfStudy', e.target.value)}
                            >
                              <option value="">Select Mode</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Distance">Distance / Correspondence</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={styles.label}>DOCUMENTS * (Upload up to 4 documents)</label>
                          <div style={styles.docGrid}>
                            {[1, 2, 3, 4].map((docNum, dIdx) => (
                              <div key={dIdx} style={styles.docBox}>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                                  Document {docNum}
                                </div>
                                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '10px' }}>
                                  PDF, JPG, PNG (Max 10MB)
                                </div>
                                <label style={styles.uploadBtnLabel}>
                                  <Upload size={12} /> Choose File
                                  <input 
                                    type="file" 
                                    style={{ display: 'none' }}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleQualDocumentUpload(idx, dIdx, e.target.files[0])}
                                  />
                                </label>
                                {qual.documents[dIdx] && (
                                  <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                    {qual.documents[dIdx].name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}

                    <button onClick={addQualification} style={styles.btnDashedAdd}>+ Add Qualification</button>
                  </div>
                ) : (
                  <div>
                    <div style={styles.sectionBox}>
                      <h3 style={styles.sectionTitleCentered}>Candidate Details</h3>
                      <div style={styles.grid2}>
                        <div>
                          <label style={styles.label}>CANDIDATE NAME *</label>
                          <input 
                            type="text" 
                            placeholder="Enter candidate name" 
                            style={styles.input}
                            value={personalDetails.fullName}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={styles.label}>DATE *</label>
                          <input 
                            type="date" 
                            style={styles.input}
                            value={personalDetails.candidateDate}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, candidateDate: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {employers.map((emp, idx) => (
                      <div key={idx} style={styles.sectionBox}>
                        <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
                          <h3 style={styles.sectionTitle}>Employer {idx + 1}</h3>
                          {employers.length > 1 && (
                            <button onClick={() => removeEmployer(idx)} style={styles.btnRemove}>
                              Remove
                            </button>
                          )}
                        </div>

                        <div style={styles.grid3}>
                          <div>
                            <label style={styles.label}>Company Name *</label>
                            <input 
                              type="text" 
                              placeholder="Enter company name" 
                              style={styles.input}
                              value={emp.companyName}
                              onChange={(e) => handleEmployerChange(idx, 'companyName', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={styles.label}>Designation *</label>
                            <input 
                              type="text" 
                              placeholder="Enter designation" 
                              style={styles.input}
                              value={emp.designation}
                              onChange={(e) => handleEmployerChange(idx, 'designation', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={styles.label}>Employee ID</label>
                            <input 
                              type="text" 
                              placeholder="Enter employee ID" 
                              style={styles.input}
                              value={emp.employeeId}
                              onChange={(e) => handleEmployerChange(idx, 'employeeId', e.target.value)}
                            />
                          </div>
                        </div>

                        <div style={styles.grid2}>
                          <div>
                            <label style={styles.label}>HR Email ID *</label>
                            <input 
                              type="email" 
                              placeholder="Enter HR email ID" 
                              style={styles.input}
                              value={emp.hrEmail}
                              onChange={(e) => handleEmployerChange(idx, 'hrEmail', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={styles.label}>HR Phone Number *</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <select 
                                style={{ ...styles.input, width: '80px' }}
                                value={emp.hrPhoneCode}
                                onChange={(e) => handleEmployerChange(idx, 'hrPhoneCode', e.target.value)}
                              >
                                <option value="+91">+91</option>
                              </select>
                              <input 
                                type="text" 
                                placeholder="Enter phone number" 
                                style={{ ...styles.input, flex: 1 }}
                                value={emp.hrPhone}
                                onChange={(e) => handleEmployerChange(idx, 'hrPhone', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div style={styles.grid2}>
                          <div>
                            <label style={styles.label}>Date of Joining (DOJ) *</label>
                            <input 
                              type="date" 
                              style={styles.input}
                              value={emp.doj}
                              onChange={(e) => handleEmployerChange(idx, 'doj', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={styles.label}>Date of Exit (DOE) *</label>
                            <input 
                              type="date" 
                              style={styles.input}
                              value={emp.doe}
                              onChange={(e) => handleEmployerChange(idx, 'doe', e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={styles.label}>Documents * (Upload up to 4 documents)</label>
                          <div style={styles.docGrid}>
                            {[1, 2, 3, 4].map((docNum, dIdx) => (
                              <div key={dIdx} style={styles.docBox}>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                                  Document {docNum}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                                  PDF, JPG, PNG (Max 10MB)
                                </div>
                                <label style={styles.uploadBtnLabel}>
                                  <Upload size={14} /> Choose File
                                  <input 
                                    type="file" 
                                    style={{ display: 'none' }}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload(idx, dIdx, e.target.files[0])}
                                  />
                                </label>
                                {emp.documents[dIdx] && (
                                  <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                    {emp.documents[dIdx].name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                    <button onClick={addEmployer} style={styles.btnDashedAdd}>+ Add Employer</button>
                  </div>
                )}

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: DOCUMENT UPLOAD */}
            {currentStep === 5 && (
              <div>
                <span style={styles.stepBadge}>Step 5 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Document Upload</h2>
                <p style={styles.subtitle}>Upload a supporting certificate. Our AI will extract and verify content automatically.</p>

                {uploadedFile && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ ...styles.sectionBox, ...styles.flexRowBetween, padding: '12px 16px', margin: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText color="#2563eb" size={24} />
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{uploadedFile.name}</h4>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{uploadedFile.status}</span>
                        </div>
                      </div>
                      <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setUploadedFile(null)} />
                    </div>

                    <div style={styles.sectionBox}>
                      <div style={{ ...styles.flexRowBetween, marginBottom: '8px' }}>
                        <span style={styles.label}>AI Confidence Score</span>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>96%</span>
                      </div>
                      <div style={styles.progressBarBg}>
                        <div style={styles.progressBarFill} />
                      </div>
                    </div>

                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>
                        <span style={styles.label}>OCR Extracted Fields</span>
                      </div>
                      {uploadedFile.ocrData.map((row, i) => (
                        <div key={i} style={{ ...styles.ocrRow, borderBottom: i < uploadedFile.ocrData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                          <span style={{ color: '#64748b' }}>{row.label}</span>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{row.value}</span>
                          <span style={styles.badgeGreen}>✓ Match</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <button style={styles.btnAccept}>
                        <Check size={16} /> Auto Accept
                      </button>
                      <button style={styles.btnFlag}>
                        <Eye size={16} /> Flag for Review
                      </button>
                    </div>
                  </div>
                )}

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & SUBMIT */}
            {currentStep === 6 && (
              <div>
                <span style={styles.stepBadge}>Step 6 of 7</span>
                <h2 style={styles.stepHeaderTitle}>Review & Submit</h2>
                <p style={styles.subtitle}>Verify all information before submitting your verification request.</p>

                <div style={styles.sectionBox}>
                  <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
                    <h3 style={styles.sectionTitle}>Personal Information</h3>
                    <span onClick={() => setCurrentStep(3)} style={{ color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div><span style={{ color: '#94a3b8' }}>Full Name</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.fullName}</p></div>
                    <div><span style={{ color: '#94a3b8' }}>Mobile</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.mobile}</p></div>
                    <div><span style={{ color: '#94a3b8' }}>Email</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.email}</p></div>
                  </div>
                </div>

                <div style={styles.sectionBoxAmber}>
                  <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} style={{ marginTop: '2px' }} />
                    <span style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
                      I hereby declare that all information provided is true and accurate to the best of my knowledge.
                    </span>
                  </label>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} disabled={!declarationAccepted} style={{ ...styles.btnPrimary, opacity: declarationAccepted ? 1 : 0.5, cursor: declarationAccepted ? 'pointer' : 'not-allowed' }}>
                    <span>Submit for Verification</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: VERIFICATION SUBMITTED */}
            {currentStep === 7 && (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.successIconCircle}>
                  <Check size={36} />
                </div>
                <h2 style={styles.stepHeaderTitle}>Verification Submitted</h2>
                <p style={{ ...styles.subtitle, fontSize: '13px' }}>
                  Your background verification request has been submitted. We will notify you at <b>{personalDetails.email}</b>.
                </p>

                <div style={{ ...styles.sectionBox, textAlign: 'left' }}>
                  <h3 style={styles.sectionTitle}>Reference Details</h3>
                  <div style={{ ...styles.flexColumnGap, gap: '8px', fontSize: '13px' }}>
                    <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Case ID</span><span style={{ fontFamily: 'monospace', fontWeight: '700' }}>BGV-2024-08734</span></div>
                    <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Submitted</span><span style={{ fontWeight: '700' }}>25 August 2026</span></div>
                    <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Company</span><span style={{ fontWeight: '700' }}>Accenture Solutions Pvt. Ltd.</span></div>
                  </div>
                </div>

                <button style={styles.btnOutlineFull}>
                  <Download size={16} /> Download Acknowledgment PDF
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
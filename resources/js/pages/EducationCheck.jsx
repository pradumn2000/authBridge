
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
//                   { title: "Total Education Cases", val: "1,248", sub: "Across all Universities", icon:<img src="/images/dashboard/education-icon.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#eff6ff" },
//                   { title: "Unassigned Cases", val: "143", sub: "Require allocation", icon: <img src="/images/dashboard/un-asign.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#fff7ed" },
//                   { title: "In Progress", val: "685", sub: "With Verifiers", icon: <img src="/images/dashboard/progress-icon.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#f0fdf4" },
//                   { title: "Completed (This Month)", val: "420", sub: "This Month", icon: <img src="/images/dashboard/final-check.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#dcfce7" },
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
// <td style={{ padding: "10px", fontWeight: 600 }}>
//   <a
//     href="https://authbridge-10.onrender.com/EducationUserProfile"
//     style={{
//       color: "#2563eb",
//       textDecoration: "none",
//       cursor: "pointer",
//       fontWeight: 600,
//     }}
//     onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
//     onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//   >
//     {r.candidate}
//   </a>
// </td>
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
//   {/* ACCORDION HEADER */}
//   <div
//     onClick={() => toggleAccordion(q.id)}
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "14px 16px",
//       background: "#ffffff",
//       cursor: "pointer",
//       borderBottom: q.isOpen ? "1px solid #f1f5f9" : "none",
//       userSelect: "none",
//     }}
//   >
//     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <span style={{ color: "#94a3b8", fontSize: "14px", cursor: "grab" }}>⣿</span>
//       <span style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>
//         Qualification {index + 1}
//       </span>
//     </div>

//     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//       <button
//         onClick={(e) => removeQualification(q.id, e)}
//         style={{
//           padding: "4px 12px",
//           borderRadius: "4px",
//           border: "1px solid #fecaca",
//           background: "#ffffff",
//           color: "#dc2626",
//           fontSize: "12px",
//           fontWeight: 600,
//           cursor: "pointer",
//         }}
//       >
//         Remove
//       </button>
//       <span style={{ fontSize: "12px", color: "#64748b", transform: q.isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
//         ▼
//       </span>
//     </div>
//   </div>

//   {/* ACCORDION BODY */}
//   {q.isOpen && (
//     <div style={{ padding: "16px 20px" }}>

//       {/* TOP SEPARATE ROW: QUALIFICATION SCOPE (NAV TAB) */}
//       <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", background: "#ffffff" }}>
//         <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 6px 0",textAlign: "left", fontWeight: 500 }}>Primary Selection</p>
//         <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//           <span style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", letterSpacing: "0.5px" }}>
//             QUALIFICATION SCOPE <span style={{ color: "#ef4444" }}>*</span>
//           </span>

//           {/* Nav Tab Container */}
//           <div style={{ display: "flex", background: "#e2e8f0", borderRadius: "8px", padding: "3px", width: "320px" }}>
//             <button
//               type="button"
//               onClick={() => handleQualificationChange(q.id, "studyType", "National")}
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "6px",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 border: "none",
//                 fontSize: "12px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//                 background: q.studyType === "National" ? "#003883" : "transparent",
//                 color: q.studyType === "National" ? "#ffffff" : "#475569",
//               }}
//             >
//               🇮🇳 National
//             </button>
//             <button
//               type="button"
//               onClick={() => handleQualificationChange(q.id, "studyType", "International")}
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "6px",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 border: "none",
//                 fontSize: "12px",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//                 background: q.studyType === "International" ? "#003883" : "transparent",
//                 color: q.studyType === "International" ? "#ffffff" : "#475569",
//               }}
//             >
//               🌐 International
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ROW 1: QUALIFICATION INPUTS (Qualification Type, Course, Specialization, Institute, Board) */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "16px" }}>
//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Qualification Type *</label>
//           <select
//             value={q.qualificationType || ""}
//             onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)}
//             style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.qualificationType ? "#0f172a" : "#94a3b8" }}
//           >
//             <option value="">Select Qualification Type</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Post Graduation">Post Graduation</option>
//             <option value="Diploma">Diploma</option>
//             <option value="10th / 12th">10th / 12th</option>
//           </select>
//         </div>

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Course / Stream *</label>
//           <select
//             value={q.courseStream || ""}
//             onChange={(e) => handleQualificationChange(q.id, "courseStream", e.target.value)}
//             style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.courseStream ? "#0f172a" : "#94a3b8" }}
//           >
//             <option value="">Select Course / Stream</option>
//             <option value="B.Tech">B.Tech</option>
//             <option value="B.Sc">B.Sc</option>
//             <option value="B.Com">B.Com</option>
//             <option value="MBA">MBA</option>
//           </select>
//         </div>

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Specialization (Optional)</label>
//           <input
//             type="text"
//             placeholder="Enter Specialization"
//             value={q.specialization || ""}
//             onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
//             style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//           />
//         </div>

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Institute / University *</label>
//           <select
//             value={q.instituteUniversity || ""}
//             onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)}
//             style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.instituteUniversity ? "#0f172a" : "#94a3b8" }}
//           >
//             <option value="">Enter Institute / School / University</option>
//             <option value="University of Delhi">University of Delhi</option>
//             <option value="Pune University">Pune University</option>
//             <option value="Mumbai University">Mumbai University</option>
//           </select>
//         </div>

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Board / University *</label>
//           <select
//             value={q.boardUniversity || ""}
//             onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
//             style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.boardUniversity ? "#0f172a" : "#94a3b8" }}
//           >
//             <option value="">Select Board / University</option>
//             <option value="CBSE">CBSE</option>
//             <option value="ICSE">ICSE</option>
//             <option value="State Board">State Board</option>
//           </select>
//         </div>
//       </div>

//       {/* ROW 2: VERIFICATION FEES & YOP (National Selection Only) */}
//       {q.studyType === "National" && (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
//           <div>
//             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Verification Fees By *</label>
//             <select
//               value={q.verificationFeesBy || ""}
//               onChange={(e) => handleQualificationChange(q.id, "verificationFeesBy", e.target.value)}
//               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.verificationFeesBy ? "#0f172a" : "#94a3b8" }}
//             >
//               <option value="">None</option>
//               <option value="Normal">Normal</option>
//               <option value="Year of Passing">Year of Passing</option>
//               <option value="UGPG">UGPG</option>
//             </select>
//           </div>

//           {/* Dynamic From/To YOP when "Year of Passing" is selected */}
//           {q.verificationFeesBy === "Year of Passing" && (
//             <>
//               <div>
//                 <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>From YOP *</label>
//                 <input
//                   type="text"
//                   placeholder="YYYY"
//                   value={q.fromYOP || ""}
//                   onChange={(e) => handleQualificationChange(q.id, "fromYOP", e.target.value)}
//                   style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                 />
//               </div>

//               <div>
//                 <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>To YOP *</label>
//                 <input
//                   type="text"
//                   placeholder="YYYY"
//                   value={q.toYOP || ""}
//                   onChange={(e) => handleQualificationChange(q.id, "toYOP", e.target.value)}
//                   style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* ROW 3: BILLING & FEES */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>
//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>
// Verification Fees (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter Verification Fees"
//             value={q.universityFees || ""}
//             onChange={(e) => handleQualificationChange(q.id, "universityFees", e.target.value)}
//             style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//           />
//         </div>

//         {/* <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Service Charge (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter Service Charge"
//             value={q.serviceCharge || ""}
//             onChange={(e) => handleQualificationChange(q.id, "serviceCharge", e.target.value)}
//             style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//           />
//         </div> */}

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>GST</label>
//           <input
//             type="text"
//             placeholder="Enter GST"
//             value={q.gst || ""}
//             onChange={(e) => handleQualificationChange(q.id, "gst", e.target.value)}
//             style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//           />
//         </div>

//         <div>
//           <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Total Amount</label>
//           <input
//             type="number"
//             placeholder="Total Amount"
//             value={q.totalAmount || ""}
//             onChange={(e) => handleQualificationChange(q.id, "totalAmount", e.target.value)}
//             style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//           />
//         </div>
//       </div>

//       {/* ROW 4: DOCUMENTS UPLOAD */}
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
//   )}
// </div>
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
import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import "../../css/style.css";
import Header from "./Header";
import { API_URL } from "../src/config";

const EMPTY_QUALIFICATION = () => ({
  id: Date.now() + Math.random(),
  isOpen: true,
  qualificationType: "",
  courseStream: "",
  specialization: "",
  instituteUniversity: "",
  boardUniversity: "",
  studyType: "National",
  verificationFeesBy: "",
  fromYOP: "",
  toYOP: "",
  universityFees: "",
  serviceCharge: "",
  gst: "",
  totalAmount: "",
});

export default function EducationVerification() {
  // Active Tab State: 'allocation' | 'education'
  const [activeTab, setActiveTab] = useState("allocation");

  // Pagination States
  const [table1Page, setTable1Page] = useState(1);
  const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

  const [table2Page, setTable2Page] = useState(1);
  const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

  // Candidate Information Form State
  const [candidateInfo, setCandidateInfo] = useState({
    candidateName: "",
    candidateId: "",
    mobileNumber: "",
    emailAddress: "",
  });

  // Qualification Dynamic Accordions State
  const [qualifications, setQualifications] = useState([EMPTY_QUALIFICATION()]);

  const [saving, setSaving] = useState(false);

  const handleCandidateChange = (field, value) => {
    setCandidateInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (id, field, value) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };
  const handleInstituteSelect = (qId, universityName) => {
  const uni = universities.find((u) => u.name === universityName);

  setQualifications((prev) =>
    prev.map((q) => {
      if (q.id !== qId) return q;
      if (!uni) return { ...q, instituteUniversity: universityName };

      return {
        ...q,
        instituteUniversity: universityName,
        verificationFeesBy: uni.verification_fees_by || q.verificationFeesBy,
        universityFees:
          q.studyType === "International"
            ? uni.university_fees ?? q.universityFees
            : uni.fees_amount ?? q.universityFees,
        gst: uni.gst_percent ?? q.gst,
        totalAmount: uni.total_amount ?? q.totalAmount,
      };
    })
  );
};

  // Accordion Toggle Handler
  const toggleAccordion = (id) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q))
    );
  };

  const addQualification = () => {
    setQualifications((prev) => [
      ...prev.map((q) => ({ ...q, isOpen: false })),
      EMPTY_QUALIFICATION(),
    ]);
  };

  const removeQualification = (id, e) => {
    e.stopPropagation();
    if (qualifications.length === 1) return;
    setQualifications((prev) => prev.filter((q) => q.id !== id));
  };

  // ── Universities (Institute / University + Board / University dropdowns)
  // Same data AddInstitution.jsx writes via POST /api/institutions — no new
  // backend needed, just pointed at the existing GET /api/institutions?type=university
  const [universities, setUniversities] = useState([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [universitiesError, setUniversitiesError] = useState("");

  const fetchUniversities = () => {
    const token = localStorage.getItem("token");
    setUniversitiesLoading(true);
    setUniversitiesError("");

    return fetch(`${API_URL}/api/institutions?type=university`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => setUniversities(data.institutions || []))
      .catch(() => setUniversitiesError("Failed to load universities."))
      .finally(() => setUniversitiesLoading(false));
  };

  // ── Clients + Cases (Select Client / Select Candidate linkage) ─────────
  // Same pattern as EmploymentCheck.jsx: education is a check_type on an
  // existing BGVCase, so this screen fills in the details on a case that
  // already has "education" in its checks array, rather than creating a
  // brand-new case from scratch.
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
    fetchUniversities();
    fetchClients();
    fetchCases();
  }, []);

  const educationCases = useMemo(
    () => cases.filter((c) => (c.checks || []).includes("education")),
    [cases]
  );

  const candidateOptions = useMemo(
    () =>
      educationCases.map((c) => ({
        key: c.case_id,
        name: c.candidate || "Unnamed Candidate",
      })),
    [educationCases]
  );

  const clientCase = useMemo(() => {
    if (!selectedClientId) return null;
    return (
      educationCases.find((c) => String(c.client_id) === String(selectedClientId)) ||
      null
    );
  }, [educationCases, selectedClientId]);

  const candidateCase = useMemo(() => {
    if (!selectedCandidateKey) return null;
    return educationCases.find((c) => c.case_id === selectedCandidateKey) || null;
  }, [educationCases, selectedCandidateKey]);

  const clientCaseId = clientCase ? clientCase.case_id : "";
  const candidateCaseId = candidateCase ? candidateCase.case_id : "";

  // Pre-fill from whatever education details are already saved on the
  // selected case, so re-opening a case doesn't blank the form.
  useEffect(() => {
    if (!candidateCase) return;

    const savedFields = candidateCase.check_details?.education?.fields;

    setCandidateInfo((prev) => ({
      ...prev,
      candidateName: savedFields?.candidate_name ?? candidateCase.candidate ?? prev.candidateName,
      candidateId: savedFields?.candidate_id ?? prev.candidateId,
      mobileNumber: savedFields?.mobile_number ?? prev.mobileNumber,
      emailAddress: savedFields?.email_address ?? prev.emailAddress,
    }));

    if (Array.isArray(savedFields?.qualifications) && savedFields.qualifications.length > 0) {
      setQualifications(
        savedFields.qualifications.map((q, idx) => ({
          ...EMPTY_QUALIFICATION(),
          ...q,
          id: Date.now() + idx,
          isOpen: idx === 0,
        }))
      );
    }
  }, [candidateCase]);

  // ── Save — reuses PATCH /cases/{caseId}/checks/education, same route
  // family as employment, writing into case_checks.fields (JSON column).
  const handleSaveCase = async () => {
    if (!candidateCase) {
      alert("Select a candidate with an education case first.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/api/cases/${candidateCase.case_id}/checks/education`,
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
              qualifications: qualifications.map(({ isOpen, ...q }) => q),
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Save failed");
      }

      await fetchCases(); // refetch — feeds both tables below
      alert("Education details saved successfully!");
      setActiveTab("allocation");
    } catch (err) {
      alert("Failed to save case: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── University Allocation (Table 1) — grouped by the first qualification's
  // Institute/University, since that's the primary university per case.
  const allocationRows = useMemo(() => {
    const byUniversity = {};

    educationCases.forEach((c) => {
      const eduFields = c.check_details?.education?.fields;
      const uniName = eduFields?.qualifications?.[0]?.instituteUniversity || "Unassigned University";
      const key = uniName;

      if (!byUniversity[key]) {
        byUniversity[key] = {
          id: key,
          university: uniName,
          client: c.client,
          newCases: 0,
          pending: 0,
          verifiers: new Set(),
        };
      }
      const row = byUniversity[key];
      if (c.status === "pending") row.newCases += 1;
      else if (c.status === "qc-review" || c.status === "on-hold") row.pending += 1;

      if (c.assigned_verifier) {
        c.assigned_verifier.split(", ").forEach((v) => row.verifiers.add(v));
      }
    });

    return Object.values(byUniversity).map((r) => ({
      ...r,
      verifiers: [...r.verifiers].join(", ") || "Unassigned",
    }));
  }, [educationCases]);

  const unassignedRows = useMemo(() => {
    return educationCases
      .filter((c) => c.status === "pending")
      .map((c) => {
        const eduFields = c.check_details?.education?.fields;
        return {
          id: c.case_id,
          candidate: c.candidate,
          university: eduFields?.qualifications?.[0]?.instituteUniversity || "—",
        };
      });
  }, [educationCases]);

  const summaryStats = useMemo(() => {
    const total = educationCases.length;
    const unassigned = educationCases.filter((c) => c.status === "pending").length;
    const inProgress = educationCases.filter((c) => c.status === "in-progress").length;
    const completed = educationCases.filter((c) => c.status === "completed").length;
    return { total, unassigned, inProgress, completed };
  }, [educationCases]);

  const pagedAllocationRows = useMemo(() => {
    const start = (table1Page - 1) * table1RowsPerPage;
    return allocationRows.slice(start, start + table1RowsPerPage);
  }, [allocationRows, table1Page, table1RowsPerPage]);

  const pagedUnassignedRows = useMemo(() => {
    const start = (table2Page - 1) * table2RowsPerPage;
    return unassignedRows.slice(start, start + table2RowsPerPage);
  }, [unassignedRows, table2Page, table2RowsPerPage]);

  // Reusable Table Pagination Component
  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#64748b" }}>
        <div>
          Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startItem}</span> to <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
            ‹
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
            <button key={pageNum} onClick={() => onPageChange(pageNum)} style={{ padding: "4px 10px", borderRadius: "4px", border: pageNum === currentPage ? "none" : "1px solid #cbd5e1", background: pageNum === currentPage ? "#2563eb" : "#fff", color: pageNum === currentPage ? "#fff" : "#1e293b", fontWeight: pageNum === currentPage ? 700 : 500, cursor: "pointer" }}>
              {pageNum}
            </button>
          ))}
          {totalPages > 5 && (
            <>
              <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>
              <button onClick={() => onPageChange(totalPages)} style={{ padding: "4px 10px", borderRadius: "4px", border: totalPages === currentPage ? "none" : "1px solid #cbd5e1", background: totalPages === currentPage ? "#2563eb" : "#fff", color: totalPages === currentPage ? "#fff" : "#1e293b", cursor: "pointer" }}>{totalPages}</button>
            </>
          )}
          <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
            ›
          </button>
        </div>

        <select value={itemsPerPage} onChange={(e) => onRowsChange(Number(e.target.value))} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", fontSize: "12px", cursor: "pointer" }}>
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div id="sidebar">
        <Sidebar />
      </div>

      <div id="content">
        <Header />

        {/* 3. Main Body Container */}
        <main style={{ padding: "24px" }}>
          {/* Top Bar Search & Conditional Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search by Candidate, Case ID, University..."
                  style={{ width: "340px", padding: "8px 12px 8px 34px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none", background: "#fff" }}
                />
                <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🔍</span>
              </div>
              <button style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px 12px", cursor: "pointer" }}>🌪️ Filter</button>
            </div>

            {/* CONDITIONAL BUTTON */}
            {activeTab === "allocation" && (
              <button
                onClick={() => setActiveTab("education")}
                className="secondary-cta import"
              >
                + New Education Case
              </button>
            )}
          </div>

          {/* Navigation Tabs Header */}
          <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "24px" }}>
              <button
                onClick={() => setActiveTab("allocation")}
                style={{
                  padding: "8px 4px 12px 4px",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "allocation" ? 700 : 500,
                  fontSize: "14px",
                  color: activeTab === "allocation" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "allocation" ? "2.5px solid #1e2761" : "none",
                  cursor: "pointer",
                }}
              >
                University Allocation
              </button>
              <button
                onClick={() => setActiveTab("education")}
                style={{
                  padding: "8px 4px 12px 4px",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "education" ? 700 : 500,
                  fontSize: "14px",
                  color: activeTab === "education" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "education" ? "2.5px solid #1e2761" : "none",
                  cursor: "pointer",
                }}
              >
                Education Cases
              </button>
            </div>
          </div>

          {/* TAB 1: UNIVERSITY ALLOCATION TAB */}
          {activeTab === "allocation" && (
            <div>
              {/* Stat Cards — derived from live case data */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {[
                  { title: "Total Education Cases", val: summaryStats.total, sub: "Across all Universities", icon:<img src="/images/dashboard/education-icon.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#eff6ff" },
                  { title: "Unassigned Cases", val: summaryStats.unassigned, sub: "Require allocation", icon: <img src="/images/dashboard/un-asign.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#fff7ed" },
                  { title: "In Progress", val: summaryStats.inProgress, sub: "With Verifiers", icon: <img src="/images/dashboard/progress-icon.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#f0fdf4" },
                  { title: "Completed", val: summaryStats.completed, sub: "All time", icon: <img src="/images/dashboard/final-check.svg" alt="" style={{ width: "20px", height: "20px" }} />, bg: "#dcfce7" },
                ].map((st, i) => (
                  <div key={i} style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>{st.title}</span>
                      <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>{st.val}</h2>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>{st.sub}</span>
                    </div>
                    <div style={{ background: st.bg, width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{st.icon}</div>
                  </div>
                ))}
              </div>

              {/* Summary Table & Select Verifier Drawer */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
                <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1e293b" }}>University-wise Case Summary</h3>
                    <input type="text" placeholder="Search University / Client..." style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }} />
                  </div>

                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                        <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                        <th style={{ padding: "10px" }}>#</th>
                        <th style={{ padding: "10px" }}>University / Institution</th>
                        <th style={{ padding: "10px" }}>Client Name</th>
                        <th style={{ padding: "10px" }}>New Cases</th>
                        <th style={{ padding: "10px" }}>Pending</th>
                        <th style={{ padding: "10px" }}>Verifier Name</th>
                        <th style={{ padding: "10px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {casesLoading ? (
                        <tr><td colSpan={8} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                      ) : casesError ? (
                        <tr><td colSpan={8} style={{ padding: "16px", textAlign: "center", color: "#dc2626" }}>{casesError}</td></tr>
                      ) : pagedAllocationRows.length === 0 ? (
                        <tr><td colSpan={8} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>No education cases yet.</td></tr>
                      ) : (
                        pagedAllocationRows.map((row, i) => (
                          <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                            <td style={{ padding: "10px" }}>{(table1Page - 1) * table1RowsPerPage + i + 1}</td>
                            <td style={{ padding: "10px", fontWeight: 600 }}>{row.university}</td>
                            <td style={{ padding: "10px" }}>{row.client}</td>
                            <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
                            <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
                            <td style={{ padding: "10px" }}>{row.verifiers}</td>
                            <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Allocate</button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {renderPagination(table1Page, allocationRows.length, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
                </div>

                {/* Verifier Selection Side Modal Box */}
                <div style={{ width: "320px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#0f172a" }}>Select Verifier</h3>
                  <input type="text" placeholder="🔍 Search verifier..." style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "16px", fontSize: "13px" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    {[
                      { name: "Amit Kumar", title: "Education Verifier", cases: 12, checked: true },
                      { name: "Neha Patel", title: "Education Verifier", cases: 8, checked: true },
                      { name: "Rahul Verma", title: "Education Verifier", cases: 15, checked: false },
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
                    <button style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Allocate Cases</button>
                  </div>
                </div>
              </div>

              {/* Unassigned Cases Table */}
              <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px", color: "#1e293b" }}>Unassigned Education Cases</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                      <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                      <th style={{ padding: "10px" }}>Case ID</th>
                      <th style={{ padding: "10px" }}>Candidate Name</th>
                      <th style={{ padding: "10px" }}>University</th>
                      <th style={{ padding: "10px" }}>Status</th>
                      <th style={{ padding: "10px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {casesLoading ? (
                      <tr><td colSpan={6} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                    ) : casesError ? (
                      <tr><td colSpan={6} style={{ padding: "16px", textAlign: "center", color: "#dc2626" }}>{casesError}</td></tr>
                    ) : pagedUnassignedRows.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>No unassigned education cases.</td></tr>
                    ) : (
                      pagedUnassignedRows.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                          <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{r.id}</td>
                          <td style={{ padding: "10px", fontWeight: 600 }}>
                            <a
                              href={`https://authbridge-10.onrender.com/EducationUserProfile?case_id=${r.id}`}
                              style={{ color: "#2563eb", textDecoration: "none", cursor: "pointer", fontWeight: 600 }}
                              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                            >
                              {r.candidate}
                            </a>
                          </td>
                          <td style={{ padding: "10px" }}>{r.university}</td>
                          <td style={{ padding: "10px" }}><span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>Unassigned</span></td>
                          <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "4px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Assign</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {renderPagination(table2Page, unassignedRows.length, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW EDUCATION FORM TAB */}
          {activeTab === "education" && (
            <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>

              {/* Form Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#2563eb" }}>📖</div>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Education Details</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" }}>Add all educational qualifications of the candidate</p>
                  </div>
                </div>
                <button
                  onClick={addQualification}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#2563eb",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>+</span> Add Qualification
                </button>
              </div>

              {/* Candidate Info Input Card */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 16px 0", color: "#1e293b" }}>👤 Candidate Information</h4>

                {/* Select Client / Select Candidate — ties this education check
                    to an existing case, same pattern as Employment. Case IDs
                    are read-only, auto-filled from the selection. */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>SELECT CLIENT</label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff", fontSize: "12px" }}
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
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CASE ID (CLIENT)</label>
                    <div style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#eef1fb", color: "#2b3b8c", fontWeight: 700, boxSizing: "border-box", fontSize: "12px" }}>
                      {!selectedClientId ? "—" : casesLoading ? "Loading…" : clientCaseId || "No education case found for this client"}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>SELECT CANDIDATE</label>
                    <select
                      value={selectedCandidateKey}
                      onChange={(e) => setSelectedCandidateKey(e.target.value)}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: "#fff", fontSize: "12px" }}
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
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CASE ID (CANDIDATE)</label>
                    <div style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#eef1fb", color: "#2b3b8c", fontWeight: 700, boxSizing: "border-box", fontSize: "12px" }}>
                      {!selectedCandidateKey ? "—" : casesLoading ? "Loading…" : candidateCaseId || "No education case found for this candidate"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                  {[
                    { label: "CANDIDATE NAME *", key: "candidateName", placeholder: "Enter Candidate Name" },
                    { label: "CANDIDATE ID *", key: "candidateId", placeholder: "Enter Candidate ID" },
                    { label: "MOBILE NUMBER *", key: "mobileNumber", placeholder: "Enter Mobile Number" },
                    { label: "EMAIL ADDRESS *", key: "emailAddress", placeholder: "Enter Email Address" },
                  ].map((field, i) => (
                    <div key={i}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={candidateInfo[field.key]}
                        onChange={(e) => handleCandidateChange(field.key, e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {universitiesError && (
                <div style={{ padding: "10px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5", marginBottom: "16px" }}>
                  ⚠ {universitiesError}
                </div>
              )}

              {/* Dynamic Qualifications List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {qualifications.map((q, index) => (
                  <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", background: "#ffffff", overflow: "hidden" }}>
  {/* ACCORDION HEADER */}
  <div
    onClick={() => toggleAccordion(q.id)}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 16px",
      background: "#ffffff",
      cursor: "pointer",
      borderBottom: q.isOpen ? "1px solid #f1f5f9" : "none",
      userSelect: "none",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ color: "#94a3b8", fontSize: "14px", cursor: "grab" }}>⣿</span>
      <span style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>
        Qualification {index + 1}
      </span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button
        onClick={(e) => removeQualification(q.id, e)}
        style={{
          padding: "4px 12px",
          borderRadius: "4px",
          border: "1px solid #fecaca",
          background: "#ffffff",
          color: "#dc2626",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Remove
      </button>
      <span style={{ fontSize: "12px", color: "#64748b", transform: q.isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
        ▼
      </span>
    </div>
  </div>

  {/* ACCORDION BODY */}
  {q.isOpen && (
    <div style={{ padding: "16px 20px" }}>

      {/* TOP SEPARATE ROW: QUALIFICATION SCOPE (NAV TAB) */}
      <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", background: "#ffffff" }}>
        <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 6px 0",textAlign: "left", fontWeight: 500 }}>Primary Selection</p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#1e293b", letterSpacing: "0.5px" }}>
            QUALIFICATION SCOPE <span style={{ color: "#ef4444" }}>*</span>
          </span>

          {/* Nav Tab Container */}
          <div style={{ display: "flex", background: "#e2e8f0", borderRadius: "8px", padding: "3px", width: "320px" }}>
            <button
              type="button"
              onClick={() => handleQualificationChange(q.id, "studyType", "National")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: q.studyType === "National" ? "#003883" : "transparent",
                color: q.studyType === "National" ? "#ffffff" : "#475569",
              }}
            >
              🇮🇳 National
            </button>
            <button
              type="button"
              onClick={() => handleQualificationChange(q.id, "studyType", "International")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: q.studyType === "International" ? "#003883" : "transparent",
                color: q.studyType === "International" ? "#ffffff" : "#475569",
              }}
            >
              🌐 International
            </button>
          </div>
        </div>
      </div>

      {/* ROW 1: QUALIFICATION INPUTS (Qualification Type, Course, Specialization, Institute, Board) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Qualification Type *</label>
          <select
            value={q.qualificationType || ""}
            onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.qualificationType ? "#0f172a" : "#94a3b8" }}
          >
            <option value="">Select Qualification Type</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
            <option value="Diploma">Diploma</option>
            <option value="10th / 12th">10th / 12th</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Course / Stream *</label>
          <select
            value={q.courseStream || ""}
            onChange={(e) => handleQualificationChange(q.id, "courseStream", e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.courseStream ? "#0f172a" : "#94a3b8" }}
          >
            <option value="">Select Course / Stream</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Com">B.Com</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Specialization (Optional)</label>
          <input
            type="text"
            placeholder="Enter Specialization"
            value={q.specialization || ""}
            onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
          />
        </div>

        {/* Institute / University — sourced live from AddInstitution.jsx's
            data via GET /api/institutions?type=university */}
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Institute / University *</label>
          <select
  value={q.instituteUniversity || ""}
  onChange={(e) => handleInstituteSelect(q.id, e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.instituteUniversity ? "#0f172a" : "#94a3b8" }}
          >
            <option value="">
              {universitiesLoading ? "Loading universities…" : universitiesError ? "Failed to load" : universities.length === 0 ? "No universities found" : "Select Institute / University"}
            </option>
            {universities.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Board / University — same institutions list; no separate "board"
            catalogue exists in the backend, so this shares the data source */}
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Board / University *</label>
          <select
            value={q.boardUniversity || ""}
            onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.boardUniversity ? "#0f172a" : "#94a3b8" }}
          >
            <option value="">
              {universitiesLoading ? "Loading…" : universitiesError ? "Failed to load" : "Select Board / University"}
            </option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
            {universities.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ROW 2: VERIFICATION FEES & YOP (National Selection Only) */}
      {q.studyType === "National" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Verification Fees By *</label>
            <select
              value={q.verificationFeesBy || ""}
              onChange={(e) => handleQualificationChange(q.id, "verificationFeesBy", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.verificationFeesBy ? "#0f172a" : "#94a3b8" }}
            >
              <option value="">None</option>
              <option value="Normal">Normal</option>
              <option value="Year of Passing">Year of Passing</option>
              <option value="UGPG">UGPG</option>
            </select>
          </div>

          {/* Dynamic From/To YOP when "Year of Passing" is selected */}
          {q.verificationFeesBy === "Year of Passing" && (
            <>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>From YOP *</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  value={q.fromYOP || ""}
                  onChange={(e) => handleQualificationChange(q.id, "fromYOP", e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>To YOP *</label>
                <input
                  type="text"
                  placeholder="YYYY"
                  value={q.toYOP || ""}
                  onChange={(e) => handleQualificationChange(q.id, "toYOP", e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* ROW 3: BILLING & FEES */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>
Verification Fees (₹)</label>
          <input
            type="number"
            placeholder="Enter Verification Fees"
            value={q.universityFees || ""}
            onChange={(e) => handleQualificationChange(q.id, "universityFees", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>GST</label>
          <input
            type="text"
            placeholder="Enter GST"
            value={q.gst || ""}
            onChange={(e) => handleQualificationChange(q.id, "gst", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Total Amount</label>
          <input
            type="number"
            placeholder="Total Amount"
            value={q.totalAmount || ""}
            onChange={(e) => handleQualificationChange(q.id, "totalAmount", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
          />
        </div>
      </div>

      {/* ROW 4: DOCUMENTS UPLOAD */}
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
  )}
</div>
                ))}
              </div>

              {/* Form Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  onClick={() => setActiveTab("allocation")}
                  style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCase}
                  disabled={saving}
                  className="secondary-cta"
                  style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
                >
                  {saving ? "Saving…" : "Submit Details"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
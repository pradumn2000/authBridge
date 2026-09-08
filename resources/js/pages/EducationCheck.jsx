// // import React, { useState } from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";

// // export default function EducationCheck() {
// //   const [formData, setFormData] = useState({
// //     institutionName: "",
// //     degreeCertificate: "",
// //     courseSpecialization: "",
// //     rollRegNumber: "",
// //     yearOfPassing: "",
// //     percentageCgpa: "",
// //     verificationMode: "",
// //     resultLinkUrl: "",
// //     remarks: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSaveDraft = (e) => {
// //     e.preventDefault();
// //     console.log("Draft Saved:", formData);
// //     alert("Draft saved successfully!");
// //   };

// //   const handleSaveAndMarkDone = (e) => {
// //     e.preventDefault();
// //     console.log("Submitted Data:", formData);
// //     alert("Saved and Marked Done!");

// //     // State reset after completion
// //     setFormData({
// //       institutionName: "",
// //       degreeCertificate: "",
// //       courseSpecialization: "",
// //       rollRegNumber: "",
// //       yearOfPassing: "",
// //       percentageCgpa: "",
// //       verificationMode: "",
// //       resultLinkUrl: "",
// //       remarks: "",
// //     });
// //   };

// //   return (
// //     <>
// //       {/* 1. Sidebar (Fixed 270px) */}
// //       <Sidebar />

// //       {/* 2. Main Layout Section */}
// //       <section id="content">
// //         <Header />

// //         <main>
// //           <div style={styles.container}>
// //             <form style={styles.card}>
// //               <h2 style={styles.title}>Education Verification Check</h2>

// //               {/* Row 1: Institution Name & Degree/Certificate */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>INSTITUTION NAME</label>
// //                   <input
// //                     type="text"
// //                     name="institutionName"
// //                     value={formData.institutionName}
// //                     onChange={handleChange}
// //                     placeholder="Enter institution name..."
// //                     style={styles.input}
// //                   />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>DEGREE / CERTIFICATE</label>
// //                   <input
// //                     type="text"
// //                     name="degreeCertificate"
// //                     value={formData.degreeCertificate}
// //                     onChange={handleChange}
// //                     placeholder="Enter degree / certificate..."
// //                     style={styles.input}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 2: Course / Specialization & Roll / Reg. Number */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>COURSE / SPECIALIZATION</label>
// //                   <input
// //                     type="text"
// //                     name="courseSpecialization"
// //                     value={formData.courseSpecialization}
// //                     onChange={handleChange}
// //                     placeholder="Enter course / specialization..."
// //                     style={styles.input}
// //                   />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>ROLL / REG. NUMBER</label>
// //                   <input
// //                     type="text"
// //                     name="rollRegNumber"
// //                     value={formData.rollRegNumber}
// //                     onChange={handleChange}
// //                     placeholder="Enter roll / reg. number..."
// //                     style={styles.input}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 3: Year of Passing & Percentage / CGPA */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>YEAR OF PASSING</label>
// //                   <input
// //                     type="text"
// //                     name="yearOfPassing"
// //                     value={formData.yearOfPassing}
// //                     onChange={handleChange}
// //                     placeholder="Enter year of passing..."
// //                     style={styles.input}
// //                   />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>PERCENTAGE / CGPA</label>
// //                   <input
// //                     type="text"
// //                     name="percentageCgpa"
// //                     value={formData.percentageCgpa}
// //                     onChange={handleChange}
// //                     placeholder="Enter percentage / cgpa..."
// //                     style={styles.input}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 4: Verification Mode & Result Link (URL) */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>VERIFICATION MODE</label>
// //                   <select
// //                     name="verificationMode"
// //                     value={formData.verificationMode}
// //                     onChange={handleChange}
// //                     style={styles.select}
// //                   >
// //                     <option value="">— Select —</option>
// //                     <option value="Online">Online</option>
// //                     <option value="Email">Email</option>
// //                     <option value="Physical">Physical</option>
// //                     <option value="VeriFact">VeriFact / Portal</option>
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>RESULT LINK (URL)</label>
// //                   <input
// //                     type="url"
// //                     name="resultLinkUrl"
// //                     value={formData.resultLinkUrl}
// //                     onChange={handleChange}
// //                     placeholder="Enter result link (url)..."
// //                     style={styles.input}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 5: Remarks */}
// //               <div style={styles.formGroupFull}>
// //                 <label style={styles.label}>REMARKS</label>
// //                 <textarea
// //                   name="remarks"
// //                   value={formData.remarks}
// //                   onChange={handleChange}
// //                   placeholder="Enter remarks..."
// //                   rows={4}
// //                   style={styles.textarea}
// //                 />
// //               </div>

// //               {/* Action Buttons */}
// //               <div style={styles.buttonContainer}>
// //                 <button
// //                   type="button"
// //                   onClick={handleSaveDraft}
// //                   style={styles.btnSaveDraft}
// //                 >
// //                   💾 Save Draft
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={handleSaveAndMarkDone}
// //                   style={styles.btnSaveDone}
// //                 >
// //                   ✓ Save & Mark Done
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </main>
// //       </section>
// //     </>
// //   );
// // }

// // // Inline Styles strictly aligned with the design
// // const styles = {
// //   container: {
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "flex-start",
// //     width: "100%",
// //   },
// //   card: {
// //     backgroundColor: "#ffffff",
// //     borderRadius: "8px",
// //     padding: "24px 28px",
// //     maxWidth: "850px",
// //     width: "100%",
// //     boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
// //     borderTop: "4px solid #1a237e",
// //     boxSizing: "border-box",
// //   },
// //   title: {
// //     fontSize: "20px",
// //     fontWeight: "700",
// //     color: "#1a237e",
// //     marginBottom: "24px",
// //     textTransform: "uppercase",
// //     letterSpacing: "0.5px",
// //   },
// //   row: {
// //     display: "flex",
// //     gap: "20px",
// //     marginBottom: "16px",
// //     flexWrap: "wrap",
// //   },
// //   formGroup: {
// //     flex: "1 1 calc(50% - 10px)",
// //     display: "flex",
// //     flexDirection: "column",
// //     minWidth: "260px",
// //   },
// //   formGroupFull: {
// //     display: "flex",
// //     flexDirection: "column",
// //     marginBottom: "20px",
// //     width: "100%",
// //   },
// //   label: {
// //     fontSize: "12px",
// //     fontWeight: "700",
// //     color: "#374151",
// //     marginBottom: "8px",
// //     letterSpacing: "0.4px",
// //   },
// //   input: {
// //     padding: "10px 14px",
// //     borderRadius: "6px",
// //     border: "1px solid #e5e7eb",
// //     backgroundColor: "#f9fafb",
// //     fontSize: "14px",
// //     color: "#1f2937",
// //     outline: "none",
// //   },
// //   select: {
// //     padding: "10px 14px",
// //     borderRadius: "6px",
// //     border: "1px solid #e5e7eb",
// //     backgroundColor: "#f9fafb",
// //     fontSize: "14px",
// //     color: "#1f2937",
// //     outline: "none",
// //     cursor: "pointer",
// //   },
// //   textarea: {
// //     padding: "10px 14px",
// //     borderRadius: "6px",
// //     border: "1px solid #e5e7eb",
// //     backgroundColor: "#f9fafb",
// //     fontSize: "14px",
// //     color: "#1f2937",
// //     outline: "none",
// //     resize: "vertical",
// //     minHeight: "90px",
// //   },
// //   buttonContainer: {
// //     display: "flex",
// //     gap: "16px",
// //     marginTop: "20px",
// //   },
// //   btnSaveDraft: {
// //     flex: 1,
// //     padding: "12px 20px",
// //     backgroundColor: "#23318c",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "6px",
// //     fontWeight: "700",
// //     fontSize: "14px",
// //     cursor: "pointer",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: "8px",
// //   },
// //   btnSaveDone: {
// //     flex: 1,
// //     padding: "12px 20px",
// //     backgroundColor: "#475569",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "6px",
// //     fontWeight: "700",
// //     fontSize: "14px",
// //     cursor: "pointer",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: "8px",
// //   },
// // };
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

//   // Qualification Dynamic Accordions State with all image UI fields
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
//       modeOfStudy: "",
//       yearOfPassing: "",
//       educationCharges: "",
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
//         modeOfStudy: "",
//         yearOfPassing: "",
//         educationCharges: "",
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
//           <Header />
        

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
//   onClick={() => setActiveTab("education")}
//   className="secondary-cta import"
// >
//   + New Education Case
// </button>
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
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "14px 16px",
//   background: "#ffffff",
//   cursor: "pointer",
//   borderBottom: q.isOpen ? "1px solid #f1f5f9" : "none",
//   userSelect: "none",
// }}
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

//                         {/* Row 2: Radio & Remaining Inputs */}
//                         <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "20px" }}>
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
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Mode of Study *</label>
//                             <select
//                               value={q.modeOfStudy}
//                               onChange={(e) => handleQualificationChange(q.id, "modeOfStudy", e.target.value)}
//                               style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.modeOfStudy ? "#0f172a" : "#94a3b8" }}
//                             >
//                               <option value="">Select Mode</option>
//                               <option value="Full Time">Full Time</option>
//                               <option value="Part Time">Part Time</option>
//                               <option value="Distance">Distance</option>
//                             </select>
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Year of Passing *</label>
//                             <input
//                               type="text"
//                               placeholder="YYYY"
//                               value={q.yearOfPassing}
//                               onChange={(e) => handleQualificationChange(q.id, "yearOfPassing", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>

//                           <div>
//                             <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Education Charges (₹)</label>
//                             <input
//                               type="number"
//                               placeholder="Enter Charges"
//                               value={q.educationCharges}
//                               onChange={(e) => handleQualificationChange(q.id, "educationCharges", e.target.value)}
//                               style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
//                             />
//                           </div>
//                         </div>
//                       {/* Documents Upload Section */}
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
//   onClick={() => alert("Form Submitted Successfully!")}
//   className="secondary-cta"
// >
//   Submit Details
// </button>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config"; 

export default function EmploymentCheck() {
  const [activeTab, setActiveTab] = useState("allocation");
  const [loading, setLoading] = useState(true);

  // --- API Data States ---
  const [cases, setCases] = useState([]);
  const [verifiers, setVerifiers] = useState([]);
  
  // --- Allocation States ---
  const [selectedCaseIds, setSelectedCaseIds] = useState([]);
  const [selectedVerifierId, setSelectedVerifierId] = useState("");

  // --- Form States (Tab 2) ---
  const [currentCase, setCurrentCase] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState({ candidateName: "", date: "" });
  const [employers, setEmployers] = useState([
    { id: 1, isOpen: true, companyName: "", designation: "", employeeId: "", hrEmailId: "", hrPhonePrefix: "+91", hrPhoneNumber: "", doj: "", doe: "", uploadedDocs: {} }
  ]);

  // Pagination
  const [tablePage, setTablePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ──────────────────────────────────────────────────────────────
  // 1. DATA FETCHING (Dynamic Backend Connection)
  // ──────────────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };

      const [casesRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/cases`, { headers }),
        fetch(`${API_URL}/api/users`, { headers })
      ]);

      const casesData = await casesRes.json();
      const usersData = await usersRes.json();

      // Filter cases that specifically require employment verification
      if (casesRes.ok) {
        const empCases = (casesData.cases || []).filter(c => c.checks?.includes("employment"));
        setCases(empCases);
      }

      // Get users who can act as verifiers
      if (usersRes.ok) {
        const verifierList = (usersData.users || []).filter(u => 
          ['admin', 'allocator', 'employment_verifier', 'verifier', 'check_manager'].includes(u.role)
        );
        setVerifiers(verifierList);
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ──────────────────────────────────────────────────────────────
  // 2. ASSIGN VERIFIER LOGIC
  // ──────────────────────────────────────────────────────────────
  const toggleCaseSelection = (caseId) => {
    setSelectedCaseIds(prev => 
      prev.includes(caseId) ? prev.filter(id => id !== caseId) : [...prev, caseId]
    );
  };

  const handleAllocate = async () => {
    if (selectedCaseIds.length === 0) return alert("Please select at least one case from the table.");
    if (!selectedVerifierId) return alert("Please select a verifier from the panel.");

    const token = localStorage.getItem("token");
    try {
      // Assign the verifier to all selected cases concurrently
      await Promise.all(selectedCaseIds.map(caseId => 
        fetch(`${API_URL}/api/cases/${caseId}/assign`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ check_type: 'employment', user_id: selectedVerifierId })
        })
      ));

      alert("Verifier(s) successfully assigned!");
      setSelectedCaseIds([]);
      setSelectedVerifierId("");
      fetchData(); // Refresh table data to show new assignments
    } catch (error) {
      console.error(error);
      alert("Failed to allocate verifier.");
    }
  };

  // ──────────────────────────────────────────────────────────────
  // 3. EDIT / FORM LOGIC
  // ──────────────────────────────────────────────────────────────
  const handleViewCase = (caseObj) => {
    setCurrentCase(caseObj);
    setCandidateInfo({ 
      candidateName: caseObj.candidate || "", 
      date: caseObj.created_at || new Date().toISOString().split('T')[0] 
    });

    // Populate existing employer fields if they exist in the DB JSON
    const existingEmployers = caseObj.check_details?.employment?.fields?.employers;
    if (existingEmployers && existingEmployers.length > 0) {
      setEmployers(existingEmployers.map((emp, index) => ({ 
        ...emp, 
        isOpen: index === 0, // Only open the first one by default for clean UX
        uploadedDocs: {} 
      })));
    } else {
      // Default empty state
      setEmployers([{ id: 1, isOpen: true, companyName: "", designation: "", employeeId: "", hrEmailId: "", hrPhonePrefix: "+91", hrPhoneNumber: "", doj: "", doe: "", uploadedDocs: {} }]);
    }
    setActiveTab("employment");
  };

  const handleEmployerChange = (id, field, value) => {
    setEmployers(prev => prev.map(emp => emp.id === id ? { ...emp, [field]: value } : emp));
  };

  const handleFileChange = (empId, docNum, file) => {
    if (file && file.size > 10 * 1024 * 1024) return alert("File exceeds 10MB limit.");
    setEmployers(prev => prev.map(emp => {
      if (emp.id === empId) {
        return { ...emp, uploadedDocs: { ...emp.uploadedDocs, [`doc${docNum}`]: file } };
      }
      return emp;
    }));
  };

  const toggleAccordion = (id) => {
    setEmployers(prev => prev.map(emp => emp.id === id ? { ...emp, isOpen: !emp.isOpen } : emp));
  };

  const addEmployer = () => {
    if (employers.length >= 4) return alert("Maximum 4 employers allowed.");
    setEmployers(prev => [
      ...prev.map(e => ({ ...e, isOpen: false })),
      { id: Date.now(), isOpen: true, companyName: "", designation: "", employeeId: "", hrEmailId: "", hrPhonePrefix: "+91", hrPhoneNumber: "", doj: "", doe: "", uploadedDocs: {} }
    ]);
  };

  const removeEmployer = (id, e) => {
    e.stopPropagation();
    if (employers.length === 1) return;
    setEmployers(prev => prev.filter(emp => emp.id !== id));
  };

  const handleSaveCase = async (e) => {
    e.preventDefault();
    if (!currentCase) return alert("No case selected. Please select a case from the Allocation tab first.");
    
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. Save text fields (Strip out UI-only properties like isOpen and uploadedDocs)
      const cleanEmployers = employers.map(({ isOpen, uploadedDocs, ...rest }) => rest);
      
      const patchRes = await fetch(`${API_URL}/api/cases/${currentCase.case_id}/checks/employment`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { employers: cleanEmployers } })
      });

      if (!patchRes.ok) throw new Error("Failed to save employer data.");

      // 2. Upload documents individually
      for (const emp of employers) {
        for (const [docKey, file] of Object.entries(emp.uploadedDocs)) {
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("document_key", `employer_${emp.id}_${docKey}`); 
            
            await fetch(`${API_URL}/api/cases/${currentCase.case_id}/checks/employment/documents`, {
              method: "POST",
              headers, // Do NOT set Content-Type for FormData
              body: formData
            });
          }
        }
      }

      alert("Employment Case Saved Successfully!");
      setActiveTab("allocation");
      fetchData(); // Refresh to pull down any new DB statuses
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the case.");
    }
  };

  // ──────────────────────────────────────────────────────────────
  // 4. UI RENDER HELPERS
  // ──────────────────────────────────────────────────────────────
  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
    const startItem = (tablePage - 1) * rowsPerPage + 1;
    const endItem = Math.min(tablePage * rowsPerPage, totalItems);

    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#64748b" }}>
        <div>
          Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems > 0 ? startItem : 0}</span> to{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button onClick={() => setTablePage(Math.max(1, tablePage - 1))} disabled={tablePage === 1} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: tablePage === 1 ? "not-allowed" : "pointer", opacity: tablePage === 1 ? 0.5 : 1 }}>‹</button>
          <span style={{ padding: "4px 10px", borderRadius: "4px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 700 }}>{tablePage}</span>
          <button onClick={() => setTablePage(Math.min(totalPages, tablePage + 1))} disabled={tablePage === totalPages} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", cursor: tablePage === totalPages ? "not-allowed" : "pointer", opacity: tablePage === totalPages ? 0.5 : 1 }}>›</button>
        </div>

        <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setTablePage(1); }} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", background: "#fff", fontSize: "12px", cursor: "pointer" }}>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    );
  };

  const renderEmployerFields = (emp) => (
    <div style={{ background: "#fff", padding: "16px", borderTop: "1px solid #e2e8f0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>COMPANY NAME *</label>
          <input type="text" value={emp.companyName} onChange={e => handleEmployerChange(emp.id, 'companyName', e.target.value)} placeholder="Enter company name" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DESIGNATION *</label>
          <input type="text" value={emp.designation} onChange={e => handleEmployerChange(emp.id, 'designation', e.target.value)} placeholder="Enter designation" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>EMPLOYEE ID</label>
          <input type="text" value={emp.employeeId} onChange={e => handleEmployerChange(emp.id, 'employeeId', e.target.value)} placeholder="Enter employee ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR EMAIL ID *</label>
          <input type="email" value={emp.hrEmailId} onChange={e => handleEmployerChange(emp.id, 'hrEmailId', e.target.value)} placeholder="Enter HR email ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>HR PHONE NUMBER *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <select value={emp.hrPhonePrefix} onChange={e => handleEmployerChange(emp.id, 'hrPhonePrefix', e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="text" value={emp.hrPhoneNumber} onChange={e => handleEmployerChange(emp.id, 'hrPhoneNumber', e.target.value)} placeholder="Enter phone number" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF JOINING (DOJ) *</label>
          <input type="date" value={emp.doj} onChange={e => handleEmployerChange(emp.id, 'doj', e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE OF EXIT (DOE) *</label>
          <input type="date" value={emp.doe} onChange={e => handleEmployerChange(emp.id, 'doe', e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
        </div>
      </div>

      {/* Documents Upload Section */}
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "10px", color: "#374151" }}>DOCUMENTS * (Upload up to 4 documents)</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {[1, 2, 3, 4].map((docNum) => {
            const selectedFile = emp.uploadedDocs[`doc${docNum}`];
            return (
              <div key={docNum} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#f8fafc" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 4px 0", color: "#334155" }}>Document {docNum}</p>
                <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "10px" }}>PDF, JPG, PNG (Max 10MB)</span>
                
                <label style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
                  {selectedFile ? '🔄 Replace File' : '☁ Choose File'}
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={(e) => handleFileChange(emp.id, docNum, e.target.files[0])} />
                </label>

                {selectedFile && (
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#16a34a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    ✓ {selectedFile.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Pagination Slice
  const paginatedCases = cases.slice((tablePage - 1) * rowsPerPage, tablePage * rowsPerPage);

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />

        <main style={{ padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            
            {/* Top Navigation Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
              <ul className="nav nav-pills" style={{ gap: "10px", marginBottom: "0", listStyle: "none", display: "flex", padding: 0 }}>
                <li>
                  <button
                    onClick={() => setActiveTab("allocation")}
                    style={{
                      fontWeight: 600, borderRadius: "6px", cursor: "pointer", padding: "8px 20px",
                      backgroundColor: activeTab === "allocation" ? "#1e2761" : "transparent",
                      color: activeTab === "allocation" ? "#ffffff" : "#64748b", border: "none"
                    }}
                  >
                    Case Allocation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveTab("employment"); setCurrentCase(null); setEmployers([{ id: 1, isOpen: true, companyName: "", designation: "", employeeId: "", hrEmailId: "", hrPhonePrefix: "+91", hrPhoneNumber: "", doj: "", doe: "", uploadedDocs: {} }]); }}
                    style={{
                      fontWeight: 600, borderRadius: "6px", cursor: "pointer", padding: "8px 20px",
                      backgroundColor: activeTab === "employment" ? "#1e2761" : "transparent",
                      color: activeTab === "employment" ? "#ffffff" : "#64748b", border: "none"
                    }}
                  >
                    Employment Form
                  </button>
                </li>
              </ul>
            </div>

            {/* TAB 1: COMPANY ALLOCATION */}
            {activeTab === "allocation" && (
              <div>
                {/* Dynamic Summary Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Total Employment Cases</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>{cases.length}</h2>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Unassigned</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#d97706" }}>
                      {cases.filter(c => !c.assigned_verifiers?.employment).length}
                    </h2>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>In Progress</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#2563eb" }}>
                      {cases.filter(c => c.status === 'in-progress').length}
                    </h2>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Completed</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#16a34a" }}>
                      {cases.filter(c => c.status === 'completed' || c.status === 'qc-review').length}
                    </h2>
                  </div>
                </div>

                {/* Main Table and Allocation Panel */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
                  
                  {/* Table Section */}
                  <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>Case Allocation Table</h3>
                    
                    {loading ? (
                      <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading cases...</div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                          <thead>
                            <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                              <th style={{ padding: "10px" }}><input type="checkbox" onChange={(e) => setSelectedCaseIds(e.target.checked ? paginatedCases.map(c => c.case_id) : [])} checked={selectedCaseIds.length > 0 && selectedCaseIds.length === paginatedCases.length} /></th>
                              <th style={{ padding: "10px" }}>Case ID</th>
                              <th style={{ padding: "10px" }}>Candidate Name</th>
                              <th style={{ padding: "10px" }}>Client</th>
                              <th style={{ padding: "10px" }}>Status</th>
                              <th style={{ padding: "10px" }}>Verifier</th>
                              <th style={{ padding: "10px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCases.length === 0 ? (
                              <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#94a3b8" }}>No employment cases found.</td></tr>
                            ) : paginatedCases.map((row) => (
                              <tr key={row.case_id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "10px" }}>
                                  <input type="checkbox" checked={selectedCaseIds.includes(row.case_id)} onChange={() => toggleCaseSelection(row.case_id)} />
                                </td>
                                <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.case_id}</td>
                                <td style={{ padding: "10px", fontWeight: 600 }}>{row.candidate}</td>
                                <td style={{ padding: "10px" }}>{row.client}</td>
                                <td style={{ padding: "10px" }}>
                                  <span style={{ 
                                    background: row.status === 'completed' ? '#dcfce7' : row.status === 'in-progress' ? '#dbeafe' : '#f1f5f9',
                                    color: row.status === 'completed' ? '#166534' : row.status === 'in-progress' ? '#1e40af' : '#475569',
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize'
                                  }}>
                                    {row.status}
                                  </span>
                                </td>
                                <td style={{ padding: "10px", color: "#64748b" }}>
                                  {row.assigned_verifiers?.employment ? verifiers.find(v => v.id === row.assigned_verifiers.employment)?.name || `ID: ${row.assigned_verifiers.employment}` : "Unassigned"}
                                </td>
                                <td style={{ padding: "10px" }}>
                                  <button onClick={() => handleViewCase(row)} style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}>
                                    View / Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {!loading && renderPagination(cases.length)}
                  </div>

                  {/* Select Verifier Panel */}
                  <div style={{ width: "320px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#0f172a" }}>Select Verifier</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", maxHeight: "400px", overflowY: "auto" }}>
                      {verifiers.map((verifier) => (
                        <div key={verifier.id} onClick={() => setSelectedVerifierId(verifier.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", border: selectedVerifierId === verifier.id ? "2px solid #2563eb" : "1px solid #f1f5f9", background: selectedVerifierId === verifier.id ? "#eff6ff" : "#f8fafc", cursor: "pointer" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#334155" }}>
                              {verifier.name.charAt(0)}
                            </div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{verifier.name}</p>
                              <span style={{ fontSize: "11px", color: "#64748b", textTransform: 'capitalize' }}>{verifier.role.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {verifiers.length === 0 && <p style={{ fontSize: "12px", color: "#94a3b8" }}>No verifiers found.</p>}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={handleAllocate} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>
                        Allocate Selected ({selectedCaseIds.length})
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: EMPLOYMENT CASES (FORM) */}
            {activeTab === "employment" && (
              <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>
                
                {/* Header Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      {currentCase ? `Edit Employment Case: ${currentCase.case_id}` : "Add Employment Case"}
                    </h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                      Add candidate employment details. You can add up to 4 previous employers.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="button" onClick={() => setActiveTab("allocation")} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}>
                      ✕ Cancel
                    </button>
                    <button type="button" onClick={handleSaveCase} style={{ padding: "8px 20px", borderRadius: "6px", border: "none", background: "#1e2761", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
                      💾 Save Details
                    </button>
                  </div>
                </div>

                {/* Candidate Details */}
                <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#2563eb", marginBottom: "12px" }}>Candidate Details</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CANDIDATE NAME *</label>
                      <input type="text" disabled={!!currentCase} value={candidateInfo.candidateName} onChange={(e) => setCandidateInfo(p => ({...p, candidateName: e.target.value}))} style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: currentCase ? "#f1f5f9" : "#fff", color: currentCase ? "#94a3b8" : "#0f172a" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>DATE *</label>
                      <input type="date" disabled={!!currentCase} value={candidateInfo.date} onChange={(e) => setCandidateInfo(p => ({...p, date: e.target.value}))} style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", background: currentCase ? "#f1f5f9" : "#fff", color: currentCase ? "#94a3b8" : "#0f172a" }} />
                    </div>
                  </div>
                </div>

                {/* Employers Accordion */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {employers.map((emp, index) => (
                    <div key={emp.id} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", borderBottom: emp.isOpen ? "1px solid #e2e8f0" : "none" }}>
                        <button type="button" onClick={() => toggleAccordion(emp.id)} style={{ flex: 1, padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", background: "transparent", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#1e293b", textAlign: "left" }}>
                          <span style={{ background: emp.isOpen ? "#1e2761" : "#94a3b8", color: "#fff", borderRadius: "50%", width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>{index + 1}</span>
                          Employer {index + 1} {emp.companyName && `— ${emp.companyName}`}
                        </button>
                        <div style={{ display: "flex", alignItems: "center", paddingRight: "16px", gap: "12px" }}>
                          <button type="button" onClick={(e) => removeEmployer(emp.id, e)} style={{ border: "1px solid #fecaca", background: "#fff", color: "#dc2626", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Remove</button>
                          <span style={{ cursor: "pointer" }} onClick={() => toggleAccordion(emp.id)}>{emp.isOpen ? "➖" : "➕"}</span>
                        </div>
                      </div>
                      
                      {emp.isOpen && renderEmployerFields(emp)}
                    </div>
                  ))}
                </div>

                <button onClick={addEmployer} type="button" style={{ padding: "10px 16px", borderRadius: "6px", border: "1px dashed #2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600, cursor: "pointer", width: "100%", fontSize: "13px" }}>
                  + Add Another Employer
                </button>

              </div>
            )}

          </div>
        </main>
      </section>
    </>
  );
}
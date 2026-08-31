// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function EducationCheck() {
//   const [formData, setFormData] = useState({
//     institutionName: "",
//     degreeCertificate: "",
//     courseSpecialization: "",
//     rollRegNumber: "",
//     yearOfPassing: "",
//     percentageCgpa: "",
//     verificationMode: "",
//     resultLinkUrl: "",
//     remarks: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveDraft = (e) => {
//     e.preventDefault();
//     console.log("Draft Saved:", formData);
//     alert("Draft saved successfully!");
//   };

//   const handleSaveAndMarkDone = (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formData);
//     alert("Saved and Marked Done!");

//     // State reset after completion
//     setFormData({
//       institutionName: "",
//       degreeCertificate: "",
//       courseSpecialization: "",
//       rollRegNumber: "",
//       yearOfPassing: "",
//       percentageCgpa: "",
//       verificationMode: "",
//       resultLinkUrl: "",
//       remarks: "",
//     });
//   };

//   return (
//     <>
//       {/* 1. Sidebar (Fixed 270px) */}
//       <Sidebar />

//       {/* 2. Main Layout Section */}
//       <section id="content">
//         <Header />

//         <main>
//           <div style={styles.container}>
//             <form style={styles.card}>
//               <h2 style={styles.title}>Education Verification Check</h2>

//               {/* Row 1: Institution Name & Degree/Certificate */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>INSTITUTION NAME</label>
//                   <input
//                     type="text"
//                     name="institutionName"
//                     value={formData.institutionName}
//                     onChange={handleChange}
//                     placeholder="Enter institution name..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DEGREE / CERTIFICATE</label>
//                   <input
//                     type="text"
//                     name="degreeCertificate"
//                     value={formData.degreeCertificate}
//                     onChange={handleChange}
//                     placeholder="Enter degree / certificate..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 2: Course / Specialization & Roll / Reg. Number */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>COURSE / SPECIALIZATION</label>
//                   <input
//                     type="text"
//                     name="courseSpecialization"
//                     value={formData.courseSpecialization}
//                     onChange={handleChange}
//                     placeholder="Enter course / specialization..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>ROLL / REG. NUMBER</label>
//                   <input
//                     type="text"
//                     name="rollRegNumber"
//                     value={formData.rollRegNumber}
//                     onChange={handleChange}
//                     placeholder="Enter roll / reg. number..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 3: Year of Passing & Percentage / CGPA */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>YEAR OF PASSING</label>
//                   <input
//                     type="text"
//                     name="yearOfPassing"
//                     value={formData.yearOfPassing}
//                     onChange={handleChange}
//                     placeholder="Enter year of passing..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>PERCENTAGE / CGPA</label>
//                   <input
//                     type="text"
//                     name="percentageCgpa"
//                     value={formData.percentageCgpa}
//                     onChange={handleChange}
//                     placeholder="Enter percentage / cgpa..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 4: Verification Mode & Result Link (URL) */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>VERIFICATION MODE</label>
//                   <select
//                     name="verificationMode"
//                     value={formData.verificationMode}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Online">Online</option>
//                     <option value="Email">Email</option>
//                     <option value="Physical">Physical</option>
//                     <option value="VeriFact">VeriFact / Portal</option>
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>RESULT LINK (URL)</label>
//                   <input
//                     type="url"
//                     name="resultLinkUrl"
//                     value={formData.resultLinkUrl}
//                     onChange={handleChange}
//                     placeholder="Enter result link (url)..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 5: Remarks */}
//               <div style={styles.formGroupFull}>
//                 <label style={styles.label}>REMARKS</label>
//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   placeholder="Enter remarks..."
//                   rows={4}
//                   style={styles.textarea}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div style={styles.buttonContainer}>
//                 <button
//                   type="button"
//                   onClick={handleSaveDraft}
//                   style={styles.btnSaveDraft}
//                 >
//                   💾 Save Draft
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSaveAndMarkDone}
//                   style={styles.btnSaveDone}
//                 >
//                   ✓ Save & Mark Done
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// }

// // Inline Styles strictly aligned with the design
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     width: "100%",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: "8px",
//     padding: "24px 28px",
//     maxWidth: "850px",
//     width: "100%",
//     boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
//     borderTop: "4px solid #1a237e",
//     boxSizing: "border-box",
//   },
//   title: {
//     fontSize: "20px",
//     fontWeight: "700",
//     color: "#1a237e",
//     marginBottom: "24px",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//   },
//   row: {
//     display: "flex",
//     gap: "20px",
//     marginBottom: "16px",
//     flexWrap: "wrap",
//   },
//   formGroup: {
//     flex: "1 1 calc(50% - 10px)",
//     display: "flex",
//     flexDirection: "column",
//     minWidth: "260px",
//   },
//   formGroupFull: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//     width: "100%",
//   },
//   label: {
//     fontSize: "12px",
//     fontWeight: "700",
//     color: "#374151",
//     marginBottom: "8px",
//     letterSpacing: "0.4px",
//   },
//   input: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #e5e7eb",
//     backgroundColor: "#f9fafb",
//     fontSize: "14px",
//     color: "#1f2937",
//     outline: "none",
//   },
//   select: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #e5e7eb",
//     backgroundColor: "#f9fafb",
//     fontSize: "14px",
//     color: "#1f2937",
//     outline: "none",
//     cursor: "pointer",
//   },
//   textarea: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #e5e7eb",
//     backgroundColor: "#f9fafb",
//     fontSize: "14px",
//     color: "#1f2937",
//     outline: "none",
//     resize: "vertical",
//     minHeight: "90px",
//   },
//   buttonContainer: {
//     display: "flex",
//     gap: "16px",
//     marginTop: "20px",
//   },
//   btnSaveDraft: {
//     flex: 1,
//     padding: "12px 20px",
//     backgroundColor: "#23318c",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "700",
//     fontSize: "14px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//   },
//   btnSaveDone: {
//     flex: 1,
//     padding: "12px 20px",
//     backgroundColor: "#475569",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "700",
//     fontSize: "14px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//   },
// };
import React, { useState } from "react";
// Aapke existing components ka import
import Sidebar from "./Sidebar";
import "../../css/style.css";
import Header from "./Header";

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
    clientName: "",
    mobileNumber: "",
    emailAddress: "",
  });

  // Qualification Dynamic Accordions State with all image UI fields
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      isOpen: true,
      qualificationType: "",
      courseStream: "",
      specialization: "",
      instituteUniversity: "",
      boardUniversity: "",
      studyType: "National",
      modeOfStudy: "",
      yearOfPassing: "",
      educationCharges: "",
    },
  ]);

  const handleCandidateChange = (field, value) => {
    setCandidateInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (id, field, value) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
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
      {
        id: Date.now(),
        isOpen: true,
        qualificationType: "",
        courseStream: "",
        specialization: "",
        instituteUniversity: "",
        boardUniversity: "",
        studyType: "National",
        modeOfStudy: "",
        yearOfPassing: "",
        educationCharges: "",
      },
    ]);
  };

  const removeQualification = (id, e) => {
    e.stopPropagation();
    if (qualifications.length === 1) return;
    setQualifications((prev) => prev.filter((q) => q.id !== id));
  };

  // Reusable Table Pagination Component
  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
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
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button key={pageNum} onClick={() => onPageChange(pageNum)} style={{ padding: "4px 10px", borderRadius: "4px", border: pageNum === currentPage ? "none" : "1px solid #cbd5e1", background: pageNum === currentPage ? "#2563eb" : "#fff", color: pageNum === currentPage ? "#fff" : "#1e293b", fontWeight: pageNum === currentPage ? 700 : 500, cursor: "pointer" }}>
              {pageNum}
            </button>
          ))}
          <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>
          <button onClick={() => onPageChange(15)} style={{ padding: "4px 10px", borderRadius: "4px", border: 15 === currentPage ? "none" : "1px solid #cbd5e1", background: 15 === currentPage ? "#2563eb" : "#fff", color: 15 === currentPage ? "#fff" : "#1e293b", cursor: "pointer" }}>15</button>
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
      {/* 1. Sidebar Wrapper */}
      <div id="sidebar">
        <Sidebar />
      </div>

      {/* 2. Main Content Wrapper */}
      <div id="content">
        {/* Navbar Header */}
        
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
                style={{ backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "6px", padding: "9px 20px", fontWeight: 600, fontSize: "13.5px", cursor: "pointer" }}
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
                  color: activeTab === "allocation" ? "#2563eb" : "#64748b",
                  borderBottom: activeTab === "allocation" ? "2.5px solid #2563eb" : "none",
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
                  color: activeTab === "education" ? "#2563eb" : "#64748b",
                  borderBottom: activeTab === "education" ? "2.5px solid #2563eb" : "none",
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
              {/* Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {[
                  { title: "Total Education Cases", val: "1,248", sub: "Across all Universities", icon: "🎓", bg: "#eff6ff" },
                  { title: "Unassigned Cases", val: "143", sub: "Require allocation", icon: "👤", bg: "#fff7ed" },
                  { title: "In Progress", val: "685", sub: "With Verifiers", icon: "👥", bg: "#f0fdf4" },
                  { title: "Completed (This Month)", val: "420", sub: "This Month", icon: "✓", bg: "#dcfce7" },
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
                        <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
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
                      {[
                        { id: 1, uni: "Pune University", client: "ABC Corp", newCases: 24, pending: 8, verifier: "Amit Kumar" },
                        { id: 2, uni: "Mumbai University", client: "XYZ Solutions", newCases: 18, pending: 5, verifier: "Neha Patel" },
                        { id: 3, uni: "Delhi University", client: "Infosys Ltd.", newCases: 31, pending: 12, verifier: "Rahul Verma" },
                      ].map((row) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
                          <td style={{ padding: "10px" }}>{row.id}</td>
                          <td style={{ padding: "10px", fontWeight: 600 }}>{row.uni}</td>
                          <td style={{ padding: "10px" }}>{row.client}</td>
                          <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
                          <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
                          <td style={{ padding: "10px" }}>{row.verifier}</td>
                          <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Allocate</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {renderPagination(table1Page, 50, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
                </div>

                {/* Verifier Selection Side Modal Box */}
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
                      <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
                      <th style={{ padding: "10px" }}>Case ID</th>
                      <th style={{ padding: "10px" }}>Candidate Name</th>
                      <th style={{ padding: "10px" }}>University</th>
                      <th style={{ padding: "10px" }}>Status</th>
                      <th style={{ padding: "10px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "EDU-10245", candidate: "Rahul Sharma", uni: "Pune University" },
                      { id: "EDU-10246", candidate: "Priya Singh", uni: "Mumbai University" },
                    ].map((r) => (
                      <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
                        <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{r.id}</td>
                        <td style={{ padding: "10px", fontWeight: 600 }}>
                          <a
                            href={`/candidate/${r.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Navigating to candidate:", r.candidate);
                            }}
                            style={{
                              color: "#2563eb",
                              textDecoration: "none",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                          >
                            {r.candidate}
                          </a>
                        </td>
                        <td style={{ padding: "10px" }}>{r.uni}</td>
                        <td style={{ padding: "10px" }}><span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>Unassigned</span></td>
                        <td style={{ padding: "10px" }}><button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "4px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Assign</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {renderPagination(table2Page, 143, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                  {[
                    { label: "CANDIDATE NAME *", key: "candidateName", placeholder: "Enter Candidate Name" },
                    { label: "CANDIDATE ID *", key: "candidateId", placeholder: "Enter Candidate ID" },
                    { label: "CLIENT NAME *", key: "clientName", placeholder: "Enter Client Name" },
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

              {/* Dynamic Qualifications List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                {qualifications.map((q, index) => (
                  <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", background: "#ffffff", overflow: "hidden" }}>
                    
                    {/* ACCORDION HEADER */}
                    <div
                      onClick={() => toggleAccordion(q.id)}
                      style={{
                        display: "flex",
                        justify: "space-between",
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
                        {/* Row 1: 5 Inputs */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Qualification Type *</label>
                            <select
                              value={q.qualificationType}
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
                              value={q.courseStream}
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
                              value={q.specialization}
                              onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Institute / University *</label>
                            <select
                              value={q.instituteUniversity}
                              onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)}
                              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.instituteUniversity ? "#0f172a" : "#94a3b8" }}
                            >
                              <option value="">Enter Institute / School / University</option>
                              <option value="University of Delhi">University of Delhi</option>
                              <option value="Pune University">Pune University</option>
                              <option value="Mumbai University">Mumbai University</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Board / University *</label>
                            <select
                              value={q.boardUniversity}
                              onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
                              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.boardUniversity ? "#0f172a" : "#94a3b8" }}
                            >
                              <option value="">Select Board / University</option>
                              <option value="CBSE">CBSE</option>
                              <option value="ICSE">ICSE</option>
                              <option value="State Board">State Board</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 2: Radio & Remaining Inputs */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "20px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>National / International *</label>
                            <div style={{ display: "flex", gap: "16px", alignItems: "center", height: "36px" }}>
                              <label style={{ fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                                <input
                                  type="radio"
                                  name={`studyType-${q.id}`}
                                  value="National"
                                  checked={q.studyType === "National"}
                                  onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
                                />
                                National
                              </label>
                              <label style={{ fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                                <input
                                  type="radio"
                                  name={`studyType-${q.id}`}
                                  value="International"
                                  checked={q.studyType === "International"}
                                  onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
                                />
                                International
                              </label>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Mode of Study *</label>
                            <select
                              value={q.modeOfStudy}
                              onChange={(e) => handleQualificationChange(q.id, "modeOfStudy", e.target.value)}
                              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: q.modeOfStudy ? "#0f172a" : "#94a3b8" }}
                            >
                              <option value="">Select Mode</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Distance">Distance</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Year of Passing *</label>
                            <input
                              type="text"
                              placeholder="YYYY"
                              value={q.yearOfPassing}
                              onChange={(e) => handleQualificationChange(q.id, "yearOfPassing", e.target.value)}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>Education Charges (₹)</label>
                            <input
                              type="number"
                              placeholder="Enter Charges"
                              value={q.educationCharges}
                              onChange={(e) => handleQualificationChange(q.id, "educationCharges", e.target.value)}
                              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                            />
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
                  onClick={() => alert("Form Submitted Successfully!")}
                  style={{ padding: "9px 24px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                >
                  Submit Details
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
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

  // Qualification Dynamic Accordions State
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
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

  const addQualification = () => {
    setQualifications((prev) => [
      ...prev,
      {
        id: prev.length + 1,
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

  const removeQualification = (id) => {
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
      {/* 1. Sidebar Wrapper with #sidebar */}
      <div id="sidebar">
        <Sidebar />
      </div>

      {/* 2. Main Content Wrapper with #content */}
      <div id="content">
        {/* Navbar Header */}
        <nav>
          <Header />
        </nav>

        {/* 3. Main Body Container with main tag */}
        <main>
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

            {/* CONDITIONAL BUTTON: Hide hone ke liye check logic */}
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
                <div style={{ width: "270px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px", color: "#0f172a" }}>Select Verifier</h3>
                  <input type="text" placeholder="🔍 Search verifier..." style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "14px", fontSize: "12px" }} />
                  {[
                    { name: "Amit Kumar", role: "Education Verifier", cases: 12, checked: true },
                    { name: "Neha Patel", role: "Education Verifier", cases: 8, checked: false },
                  ].map((v, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderRadius: "6px", border: "1px solid #f1f5f9", background: "#f8fafc", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="radio" name="verifier" defaultChecked={v.checked} />
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "12px" }}>{v.name}</p>
                          <span style={{ fontSize: "10px", color: "#64748b" }}>{v.role}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb" }}>{v.cases}</span>
                    </div>
                  ))}
                  <button style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "12px", marginTop: "10px" }}>Allocate Cases</button>
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
                          {/* Candidate Name Wrapped in Anchor Tag */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🎓</div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Add New Education</h2>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" }}>Add candidate's education details and upload documents for verification</p>
                </div>
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

              {/* Dynamic Education Input Section */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1e293b" }}>📖 Education Details</h4>
                  <button onClick={addQualification} style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>+ Add Qualification</button>
                </div>

                {qualifications.map((q, index) => (
                  <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "16px", background: "#ffffff", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontWeight: 700, fontSize: "13px" }}>Qualification {index + 1}</span>
                      {qualifications.length > 1 && (
                        <button onClick={() => removeQualification(q.id)} style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", fontSize: "11px", cursor: "pointer" }}>Remove</button>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>QUALIFICATION TYPE *</label>
                        <select value={q.qualificationType} onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}>
                          <option value="">Select Qualification</option>
                          <option value="Graduation">Graduation</option>
                          <option value="Post Graduation">Post Graduation</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>INSTITUTE / UNIVERSITY *</label>
                        <input type="text" placeholder="Enter University" value={q.instituteUniversity} onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>YEAR OF PASSING *</label>
                        <input type="text" placeholder="e.g. 2023" value={q.yearOfPassing} onChange={(e) => handleQualificationChange(q.id, "yearOfPassing", e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>EDUCATION CHARGES (INR)</label>
                        <input type="text" placeholder="₹ Amount" value={q.educationCharges} onChange={(e) => handleQualificationChange(q.id, "educationCharges", e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }} />
                      </div>
                    </div>

                    {/* Document Upload Component Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                      {["Marksheet", "Passing Certificate", "Degree Certificate", "Other Document"].map((doc, idx) => (
                        <div key={idx} style={{ border: "1px dashed #cbd5e1", borderRadius: "6px", padding: "12px", textAlign: "center", background: "#f8fafc" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{doc}</span>
                          <label style={{ color: "#2563eb", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                            ☁ Upload File
                            <input type="file" style={{ display: "none" }} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Action Controls */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button onClick={() => setActiveTab("allocation")} style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => alert("Saved as Draft")} style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer" }}>Save as Draft</button>
                <button onClick={() => alert("Sent for Verification")} style={{ padding: "9px 24px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" }}>🚀 Save & Send for Verification</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
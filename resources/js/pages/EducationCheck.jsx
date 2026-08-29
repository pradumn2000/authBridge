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

export default function EducationVerificationDashboard() {
  const [activeTab, setActiveTab] = useState("University Allocation");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedVerifier, setSelectedVerifier] = useState(null);

  // Pagination States for Table 1
  const [pageTable1, setPageTable1] = useState(1);
  const [rowsTable1, setRowsTable1] = useState(5);

  // Pagination States for Table 2
  const [pageTable2, setPageTable2] = useState(1);
  const [rowsTable2, setRowsTable2] = useState(5);

  // Mock Data for University-wise Summary
  const universitySummary = [
    { id: 1, university: "Pune University", client: "ABC Corp", newCases: 24, pending: 8, inProgress: 6, completed: 10, verifier: "Amit Kumar", avatar: "https://via.placeholder.com/28" },
    { id: 2, university: "Mumbai University", client: "XYZ Solutions", newCases: 18, pending: 5, inProgress: 7, completed: 6, verifier: "Neha Patel", avatar: "https://via.placeholder.com/28" },
    { id: 3, university: "Delhi University", client: "Infosys Ltd.", newCases: 31, pending: 12, inProgress: 8, completed: 11, verifier: "Rahul Verma", avatar: "https://via.placeholder.com/28" },
    { id: 4, university: "Bangalore University", client: "Tata Group", newCases: 15, pending: 4, inProgress: 5, completed: 6, verifier: "Sneha Joshi", avatar: "https://via.placeholder.com/28" },
    { id: 5, university: "Anna University", client: "Wipro Ltd.", newCases: 12, pending: 3, inProgress: 4, completed: 5, verifier: "Karan Verma", avatar: "https://via.placeholder.com/28" },
  ];

  // Mock Data for Unassigned Education Cases
  const unassignedCases = [
    { id: 1, caseId: "EDU-10245", client: "Rahul Sharma", university: "Pune University", verifier: "Amit Kumar", status: "Unassigned" },
    { id: 2, caseId: "EDU-10246", client: "Priya Singh", university: "Mumbai University", verifier: "Neha Patel", status: "Unassigned" },
    { id: 3, caseId: "EDU-10247", client: "Arjun Mehta", university: "Delhi University", verifier: "Rahul Verma", status: "Unassigned" },
    { id: 4, caseId: "EDU-10248", client: "Sneha Joshi", university: "Bangalore University", verifier: "Sneha Joshi", status: "Unassigned" },
    { id: 5, caseId: "EDU-10249", client: "Karan Verma", university: "Anna University", verifier: "Karan Verma", status: "Unassigned" },
  ];

  // Verifier Selection List for Modal
  const verifiersList = [
    { id: 1, name: "Amit Kumar", role: "Education Verifier", activeCases: 12, avatar: "https://via.placeholder.com/32" },
    { id: 2, name: "Neha Patel", role: "Education Verifier", activeCases: 8, avatar: "https://via.placeholder.com/32" },
    { id: 3, name: "Rahul Verma", role: "Education Verifier", activeCases: 15, avatar: "https://via.placeholder.com/32" },
  ];

  const handleOpenAllocateModal = (item) => {
    setSelectedCase(item);
    setIsModalOpen(true);
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: "20px" }}>
      {/* Outer Scroll Container */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", overflowY: "auto", maxHeight: "calc(100vh - 40px)" }}>
        
        {/* Top Header - Space Between */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="text"
              placeholder="🔍 Search by Candidate, Case ID, University, Client..."
              style={{ padding: "8px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", width: "320px", fontSize: "13px", outline: "none" }}
            />
            <button style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px 12px", cursor: "pointer" }}>⚡</button>
          </div>

          <button
            style={{
              background: "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 18px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>+</span> New Education Case
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "24px", borderBottom: "2px solid #e2e8f0", marginBottom: "20px" }}>
          {["University Allocation", "Education Cases"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                paddingBottom: "10px",
                cursor: "pointer",
                fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? "#1d4ed8" : "#64748b",
                borderBottom: activeTab === tab ? "2px solid #1d4ed8" : "none",
                marginBottom: "-2px",
                fontSize: "14px",
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Summary Metric Cards (4 Grid) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Total Education Cases</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>1,248</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Across all Universities</div>
            </div>
            <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#1d4ed8" }}>🎓</div>
          </div>

          <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Unassigned Cases</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>143</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>Require allocation</div>
            </div>
            <div style={{ background: "#fff7ed", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>👤</div>
          </div>

          <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>In Progress</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>685</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>With Verifiers</div>
            </div>
            <div style={{ background: "#f0fdf4", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>⏳</div>
          </div>

          <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Completed (This Month)</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>420</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>This Month</div>
            </div>
            <div style={{ background: "#f0fdf4", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>✔</div>
          </div>
        </div>

        {/* --- Section 1: University-wise Case Summary Table --- */}
        <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "28px", padding: "16px" }}>
          
          {/* Header Controls - Space Between */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>University-wise Case Summary</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                <option>All States</option>
              </select>
              <input type="text" placeholder="Search University / Client..." style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", width: "200px" }} />
              <button style={{ padding: "6px 10px", border: "1px solid #cbd5e1", background: "#fff", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>📥</button>
            </div>
          </div>

          {/* Table 1 Scroll Box */}
          <div style={{ overflowX: "auto", maxHeight: "350px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 1 }}>
                  <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                  <th style={{ padding: "10px" }}>#</th>
                  <th style={{ padding: "10px" }}>University / Institution</th>
                  <th style={{ padding: "10px" }}>Client Name</th>
                  <th style={{ padding: "10px" }}>New Cases</th>
                  <th style={{ padding: "10px" }}>Pending</th>
                  <th style={{ padding: "10px" }}>In Progress</th>
                  <th style={{ padding: "10px" }}>Completed</th>
                  <th style={{ padding: "10px" }}>Verifier Name</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {universitySummary.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 10px" }}><input type="checkbox" /></td>
                    <td style={{ padding: "12px 10px", color: "#64748b" }}>{row.id}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 600, color: "#1e293b" }}>{row.university}</td>
                    <td style={{ padding: "12px 10px", color: "#475569" }}>{row.client}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#2563eb" }}>{row.newCases}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#ea580c" }}>{row.pending}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#2563eb" }}>{row.inProgress}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#16a34a" }}>{row.completed}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img src={row.avatar} alt="" style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                        <span style={{ fontSize: "12px", color: "#334155" }}>{row.verifier}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 10px" }}>
                      <button
                        onClick={() => handleOpenAllocateModal(row)}
                        style={{ border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", borderRadius: "6px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                      >
                        👤 Allocate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table 1 Pagination - Space Between */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", fontSize: "12px", color: "#64748b" }}>
            <div>Showing 1 to 5 of 5 universities</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button disabled style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "not-allowed" }}>‹</button>
              <button style={{ padding: "4px 8px", border: "none", borderRadius: "4px", background: "#1d4ed8", color: "#fff", fontWeight: 700 }}>1</button>
              <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>2</button>
              <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>3</button>
              <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>›</button>
              <select value={rowsTable1} onChange={(e) => setRowsTable1(Number(e.target.value))} style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #cbd5e1", marginLeft: "10px" }}>
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Section 2: Unassigned Education Cases Table --- */}
        <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "16px" }}>
          
          {/* Header Controls - Space Between */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Unassigned Education Cases</h3>
              <select style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                <option>All Clients</option>
              </select>
              <select style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                <option>All Universities</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input type="text" placeholder="Search Candidate / Case ID..." style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", width: "200px" }} />
              <a href="#view-all" style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>View All (143)</a>
            </div>
          </div>

          {/* Table 2 Scroll Box */}
          <div style={{ overflowX: "auto", maxHeight: "350px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 1 }}>
                  <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                  <th style={{ padding: "10px" }}>Case ID</th>
                  <th style={{ padding: "10px" }}>Client Name</th>
                  <th style={{ padding: "10px" }}>University / Institution</th>
                  <th style={{ padding: "10px" }}>Verifier Name</th>
                  <th style={{ padding: "10px" }}>Status</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedCases.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 10px" }}><input type="checkbox" /></td>
                    <td style={{ padding: "12px 10px", fontWeight: 700, color: "#2563eb" }}>{row.caseId}</td>
                    <td style={{ padding: "12px 10px", fontWeight: 600, color: "#1e293b" }}>{row.client}</td>
                    <td style={{ padding: "12px 10px", color: "#475569" }}>{row.university}</td>
                    <td style={{ padding: "12px 10px", color: "#475569" }}>{row.verifier}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <span style={{ background: "#fef2f2", color: "#ef4444", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 10px" }}>
                      <button
                        onClick={() => handleOpenAllocateModal(row)}
                        style={{ border: "none", background: "#eff6ff", color: "#2563eb", borderRadius: "6px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table 2 Bottom & Pagination - Space Between */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", flexWrap: "wrap", gap: "10px" }}>
            <button style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
              + New Education Case
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#64748b" }}>
              <span>Showing 1 to 5 of 143 cases</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button disabled style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "not-allowed" }}>‹</button>
                <button style={{ padding: "4px 8px", border: "none", borderRadius: "4px", background: "#1d4ed8", color: "#fff", fontWeight: 700 }}>1</button>
                <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>2</button>
                <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>3</button>
                <span>...</span>
                <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>15</button>
                <button style={{ padding: "4px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff" }}>›</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- Right Slide-over / Modal for Verifier Allocation --- */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(15, 23, 42, 0.4)", display: "flex", justifyContent: "flex-end", zIndex: 1000 }}>
          <div style={{ width: "360px", background: "#fff", height: "100%", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "-4px 0 15px rgba(0,0,0,0.1)" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Select Verifier</h4>
                <button onClick={() => setIsModalOpen(false)} style={{ border: "none", background: "transparent", fontSize: "18px", cursor: "pointer", color: "#64748b" }}>✕</button>
              </div>

              <input
                type="text"
                placeholder="🔍 Search verifier..."
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", marginBottom: "16px", outline: "none" }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {verifiersList.map((verifier) => (
                  <div
                    key={verifier.id}
                    onClick={() => setSelectedVerifier(verifier.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justify: "space-between",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: selectedVerifier === verifier.id ? "1.5px solid #2563eb" : "1px solid #e2e8f0",
                      background: selectedVerifier === verifier.id ? "#eff6ff" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="radio" checked={selectedVerifier === verifier.id} readOnly />
                      <img src={verifier.avatar} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>{verifier.name}</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{verifier.role}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb" }}>{verifier.activeCases}</div>
                      <div style={{ fontSize: "10px", color: "#64748b" }}>Active Cases</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions - Space Between */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", pt: "16px", borderTop: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ width: "48%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer", color: "#334155" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Case allocated successfully!");
                  setIsModalOpen(false);
                }}
                style={{ width: "48%", padding: "10px", border: "none", borderRadius: "6px", background: "#1d4ed8", color: "#fff", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
              >
                Allocate Cases
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
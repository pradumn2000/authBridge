// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function EmploymentCheck() {
//   const [formData, setFormData] = useState({
//     databasesChecked: "",
//     matchFound: "",
//     matchDetails: "",
//     panVerified: "",
//     aadhaarVerified: "",
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
//     console.log("Draft Saved Data:", formData);
//     alert("Draft saved successfully!");
//   };

//   const handleSaveAndMarkDone = (e) => {
//     e.preventDefault();
//     console.log("Final Submitted Data:", formData);
//     alert("Submitted and Marked Done!");

//     setFormData({
//       databasesChecked: "",
//       matchFound: "",
//       matchDetails: "",
//       panVerified: "",
//       aadhaarVerified: "",
//       remarks: "",
//     });
//   };

//   return (
//     <>
//       {/* 1. Sidebar (Fixed 270px) */}
//       <Sidebar />

//       {/* 2. Main Content Wrapper (Left 270px, Width calc(100% - 270px)) */}
//       <section id="content">
//         {/* Header/Nav inside #content */}
//         <Header />

//         {/* Main Content Body */}
//         <main>
//           <div style={styles.container}>
//             <form style={styles.card}>
//               <h2 style={styles.title}>Database Check Verification</h2>

//               {/* Row 1: Databases Checked & Match Found */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DATABASES CHECKED</label>
//                   <input
//                     type="text"
//                     name="databasesChecked"
//                     value={formData.databasesChecked}
//                     onChange={handleChange}
//                     placeholder="Enter databases checked..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>MATCH FOUND?</label>
//                   <select
//                     name="matchFound"
//                     value={formData.matchFound}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 2: Match Details */}
//               <div style={styles.formGroupFull}>
//                 <label style={styles.label}>MATCH DETAILS</label>
//                 <textarea
//                   name="matchDetails"
//                   value={formData.matchDetails}
//                   onChange={handleChange}
//                   placeholder="Enter match details..."
//                   rows={3}
//                   style={styles.textarea}
//                 />
//               </div>

//               {/* Row 3: PAN Verified & Aadhaar Verified */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>PAN VERIFIED?</label>
//                   <select
//                     name="panVerified"
//                     value={formData.panVerified}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>AADHAAR VERIFIED?</label>
//                   <select
//                     name="aadhaarVerified"
//                     value={formData.aadhaarVerified}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 4: Remarks */}
//               <div style={styles.formGroupFull}>
//                 <label style={styles.label}>REMARKS</label>
//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   placeholder="Enter remarks..."
//                   rows={3}
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

// // Inline Styles for Form Elements
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
//     padding: "28px",
//     maxWidth: "800px",
//     width: "100%",
//     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
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
//     minWidth: "250px",
//   },
//   formGroupFull: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "16px",
//     width: "100%",
//   },
//   label: {
//     fontSize: "12px",
//     fontWeight: "700",
//     color: "#4a5568",
//     marginBottom: "8px",
//     letterSpacing: "0.5px",
//   },
//   input: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     backgroundColor: "#f8fafc",
//     fontSize: "14px",
//     color: "#2d3748",
//     outline: "none",
//   },
//   select: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     backgroundColor: "#f8fafc",
//     fontSize: "14px",
//     color: "#2d3748",
//     outline: "none",
//   },
//   textarea: {
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     backgroundColor: "#f8fafc",
//     fontSize: "14px",
//     color: "#2d3748",
//     outline: "none",
//     resize: "vertical",
//   },
//   buttonContainer: {
//     display: "flex",
//     gap: "16px",
//     marginTop: "24px",
//   },
//   btnSaveDraft: {
//     flex: 1,
//     padding: "12px 20px",
//     backgroundColor: "#22338b",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "600",
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
//     fontWeight: "600",
//     fontSize: "14px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "8px",
//   },
// };
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function EmploymentCheck() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     designation: "",
//     employeeId: "",
//     employmentType: "",
//     dateOfJoining: "",
//     dateOfLeaving: "",
//     hrContactName: "",
//     hrContactDetails: "",
//     verificationMode: "",
//     employmentStatusConfirmed: "",
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

//     // Reset form after submission
//     setFormData({
//       companyName: "",
//       designation: "",
//       employeeId: "",
//       employmentType: "",
//       dateOfJoining: "",
//       dateOfLeaving: "",
//       hrContactName: "",
//       hrContactDetails: "",
//       verificationMode: "",
//       employmentStatusConfirmed: "",
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
//               <h2 style={styles.title}>Employment Verification Check</h2>

//               {/* Row 1: Company Name & Designation */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>COMPANY NAME</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     placeholder="Enter company name..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DESIGNATION</label>
//                   <input
//                     type="text"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     placeholder="Enter designation..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 2: Employee ID & Employment Type */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>EMPLOYEE ID</label>
//                   <input
//                     type="text"
//                     name="employeeId"
//                     value={formData.employeeId}
//                     onChange={handleChange}
//                     placeholder="Enter employee id..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>EMPLOYMENT TYPE</label>
//                   <select
//                     name="employmentType"
//                     value={formData.employmentType}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Full-time">Full-time</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Intern">Intern</option>
//                     <option value="Consultant">Consultant</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 3: Date of Joining & Date of Leaving */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DATE OF JOINING</label>
//                   <input
//                     type="date"
//                     name="dateOfJoining"
//                     value={formData.dateOfJoining}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DATE OF LEAVING</label>
//                   <input
//                     type="date"
//                     name="dateOfLeaving"
//                     value={formData.dateOfLeaving}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 4: HR Contact Name & HR Contact Details */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>HR CONTACT NAME</label>
//                   <input
//                     type="text"
//                     name="hrContactName"
//                     value={formData.hrContactName}
//                     onChange={handleChange}
//                     placeholder="Enter HR contact name..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>HR CONTACT (EMAIL / PHONE)</label>
//                   <input
//                     type="text"
//                     name="hrContactDetails"
//                     value={formData.hrContactDetails}
//                     onChange={handleChange}
//                     placeholder="Enter HR email or phone..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 5: Verification Mode & Employment Status Confirmed */}
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
//                     <option value="Email">Email</option>
//                     <option value="Phone">Phone</option>
//                     <option value="Portal">Portal</option>
//                     <option value="Physical">Physical</option>
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>EMPLOYMENT STATUS CONFIRMED?</label>
//                   <select
//                     name="employmentStatusConfirmed"
//                     value={formData.employmentStatusConfirmed}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="Pending">Pending</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 6: Remarks */}
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

// // Inline Styles — matches EducationCheck.jsx / DatabaseCheck.jsx conventions
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
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function EmploymentCheck() {
  const [activeTab, setActiveTab] = useState("allocation");

  // Form State for Employment Cases Tab
  const [formData, setFormData] = useState({
    candidateName: "",
    date: "",
    employers: [
      {
        companyName: "",
        designation: "",
        employeeId: "",
        hrEmail: "",
        hrPhone: "",
        doj: "",
        doe: "",
      },
    ],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCase = (e) => {
    e.preventDefault();
    console.log("Saved Case Data:", formData);
    alert("Employment Case Saved Successfully!");
  };

  return (
    <>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Layout Section */}
      <section id="content">
        <Header />

        <main style={{ padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            
            {/* Top Navigation Bar with Action Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", pb: "10px" }}>
              <ul className="nav nav-pills" style={{ gap: "10px", marginBottom: "0" }}>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "allocation" ? "active" : ""}`}
                    onClick={() => setActiveTab("allocation")}
                    style={{
                      fontWeight: 600,
                      borderRadius: "6px",
                      cursor: "pointer",
                      padding: "8px 20px",
                      backgroundColor: activeTab === "allocation" ? "#2563eb" : "transparent",
                      color: activeTab === "allocation" ? "#ffffff" : "#64748b",
                      border: "none"
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
                      fontWeight: 600,
                      borderRadius: "6px",
                      cursor: "pointer",
                      padding: "8px 20px",
                      backgroundColor: activeTab === "employment" ? "#2563eb" : "transparent",
                      color: activeTab === "employment" ? "#ffffff" : "#64748b",
                      border: "none"
                    }}
                  >
                    Employment Cases
                  </button>
                </li>
              </ul>

              {/* Add New Employment Case Button -> Triggers Employment Tab */}
              {activeTab === "allocation" && (
                <button
                  onClick={() => setActiveTab("employment")}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 20px",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
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

                {/* Summary Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Total Employment Cases</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>2,458</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Across all companies</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Unassigned Cases</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#d97706" }}>188</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>Require allocation</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>In Progress</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#2563eb" }}>1,235</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>With verifiers</span>
                  </div>
                  <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Completed (This Month)</span>
                    <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800, color: "#16a34a" }}>1,035</h2>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>This month</span>
                  </div>
                </div>

                {/* Table 1: Company-wise Case Allocation */}
                <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>
                    Company-wise Case Allocation
                  </h3>
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
                        {[
                          { id: 1, client: "ABC Corp", company: "ABC Technologies Pvt. Ltd.", newCases: 24, pending: 8, progress: 6, done: 10, verifiers: "Amit Kumar, Neha Patel" },
                          { id: 2, client: "XYZ Solutions", company: "XYZ Infotech Ltd.", newCases: 18, pending: 5, progress: 7, done: 6, verifiers: "Neha Patel, Rahul Verma" },
                          { id: 3, client: "Infosys Limited", company: "Infosys Ltd.", newCases: 31, pending: 12, progress: 8, done: 11, verifiers: "Amit Kumar, Priya Singh" }
                        ].map((row) => (
                          <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                            <td style={{ padding: "10px" }}>{row.id}</td>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Recent Employment Cases */}
                <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>
                    Recent Employment Cases
                  </h3>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                          <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                          <th style={{ padding: "10px" }}>Case ID</th>
                          <th style={{ padding: "10px" }}>Candidate Name</th>
                          <th style={{ padding: "10px" }}>Client Name</th>
                          <th style={{ padding: "10px" }}>HR Email ID</th>
                          <th style={{ padding: "10px" }}>Verifier</th>
                          <th style={{ padding: "10px" }}>SLA</th>
                          <th style={{ padding: "10px" }}>Status</th>
                          <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "EMP-10245", candidate: "Rahul Sharma", client: "ABC Corp", hr: "hr@abctech.com", verifier: "Amit Kumar", sla: "3 Days", status: "In Progress", statusBg: "#fef3c7", statusColor: "#d97706" },
                          { id: "EMP-10246", candidate: "Priya Singh", client: "XYZ Solutions", hr: "hr@xyz.com", verifier: "Neha Patel", sla: "3 Days", status: "Assigned", statusBg: "#dbeafe", statusColor: "#2563eb" },
                          { id: "EMP-10247", candidate: "Arjun Mehta", client: "Infosys Limited", hr: "hr@infosys.com", verifier: "Unassigned", sla: "5 Days", status: "Unassigned", statusBg: "#fee2e2", statusColor: "#dc2626" }
                        ].map((row) => (
                          <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                            <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.id}</td>
                            <td style={{ padding: "10px", fontWeight: 600 }}>{row.candidate}</td>
                            <td style={{ padding: "10px" }}>{row.client}</td>
                            <td style={{ padding: "10px", color: "#64748b" }}>{row.hr}</td>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EMPLOYMENT CASES (FORM WITH ACCORDION) */}
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
                      style={{ padding: "8px 20px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" }}
                    >
                      💾 Save Case
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
                </div>

                {/* Employers Accordion Section */}
                <div className="accordion" id="employerAccordion">
                  
                  {/* Item 1: Employer 1 */}
                  <div className="accordion-item" style={{ marginBottom: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                    <h2 className="accordion-header" id="headingEmployer1">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmployer1"
                        aria-expanded="true"
                        aria-controls="collapseEmployer1"
                        style={{ fontWeight: 700, color: "#1e293b", background: "#ffffff" }}
                      >
                        <span style={{ background: "#2563eb", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", marginRight: "10px" }}>1</span>
                        Employer 1
                      </button>
                    </h2>
                    <div id="collapseEmployer1" className="accordion-collapse collapse show" aria-labelledby="headingEmployer1" data-bs-parent="#employerAccordion">
                      <div className="accordion-body" style={{ background: "#fff", paddingTop: "16px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>COMPANY NAME *</label>
                            <input type="text" placeholder="Enter company name" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>DESIGNATION *</label>
                            <input type="text" placeholder="Enter designation" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>EMPLOYEE ID</label>
                            <input type="text" placeholder="Enter employee ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>HR EMAIL ID *</label>
                            <input type="email" placeholder="Enter HR email ID" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>HR PHONE NUMBER *</label>
                            <input type="text" placeholder="Enter phone number" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>DATE OF JOINING (DOJ) *</label>
                            <input type="date" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight 700, marginBottom: "6px" }}>DATE OF EXIT (DOE) *</label>
                            <input type="date" style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                          </div>
                        </div>

                        {/* Documents Upload Section */}
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "10px" }}>DOCUMENTS * (Upload up to 4 documents)</label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                            {[1, 2, 3, 4].map((num) => (
                              <div key={num} style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", background: "#f8fafc" }}>
                                <p style={{ fontSize: "12px", fontWeight: 700, margin: "0 0 4px 0" }}>Document {num}</p>
                                <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "10px" }}>PDF, JPG, PNG (Max 10MB)</span>
                                <label style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                                  ☁ Choose File
                                  <input type="file" style={{ display: "none" }} />
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Item 2: Employer 2 */}
                  <div className="accordion-item" style={{ marginBottom: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                    <h2 className="accordion-header" id="headingEmployer2">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmployer2"
                        aria-expanded="false"
                        aria-controls="collapseEmployer2"
                        style={{ fontWeight: 700, color: "#1e293b", background: "#ffffff" }}
                      >
                        <span style={{ background: "#94a3b8", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", marginRight: "10px" }}>2</span>
                        Employer 2
                      </button>
                    </h2>
                    <div id="collapseEmployer2" className="accordion-collapse collapse" aria-labelledby="headingEmployer2" data-bs-parent="#employerAccordion">
                      <div className="accordion-body" style={{ background: "#fff", paddingTop: "16px" }}>
                        <p style={{ color: "#64748b", fontSize: "13px" }}>Click to fill details for Employer 2.</p>
                      </div>
                    </div>
                  </div>

                  {/* Item 3: Employer 3 */}
                  <div className="accordion-item" style={{ marginBottom: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                    <h2 className="accordion-header" id="headingEmployer3">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmployer3"
                        aria-expanded="false"
                        aria-controls="collapseEmployer3"
                        style={{ fontWeight: 700, color: "#1e293b", background: "#ffffff" }}
                      >
                        <span style={{ background: "#94a3b8", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", marginRight: "10px" }}>3</span>
                        Employer 3
                      </button>
                    </h2>
                    <div id="collapseEmployer3" className="accordion-collapse collapse" aria-labelledby="headingEmployer3" data-bs-parent="#employerAccordion">
                      <div className="accordion-body" style={{ background: "#fff", paddingTop: "16px" }}>
                        <p style={{ color: "#64748b", fontSize: "13px" }}>Click to fill details for Employer 3.</p>
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Employer 4 */}
                  <div className="accordion-item" style={{ marginBottom: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                    <h2 className="accordion-header" id="headingEmployer4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmployer4"
                        aria-expanded="false"
                        aria-controls="collapseEmployer4"
                        style={{ fontWeight: 700, color: "#1e293b", background: "#ffffff" }}
                      >
                        <span style={{ background: "#94a3b8", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", marginRight: "10px" }}>4</span>
                        Employer 4
                      </button>
                    </h2>
                    <div id="collapseEmployer4" className="accordion-collapse collapse" aria-labelledby="headingEmployer4" data-bs-parent="#employerAccordion">
                      <div className="accordion-body" style={{ background: "#fff", paddingTop: "16px" }}>
                        <p style={{ color: "#64748b", fontSize: "13px" }}>Click to fill details for Employer 4.</p>
                      </div>
                    </div>
                  </div>

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
                    style={{ padding: "10px 24px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer" }}
                  >
                    💾 Save Case
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
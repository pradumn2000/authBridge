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

  // Reusable Table Pagination
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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* 1. Aapka Bna Hua Custom Sidebar */}
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* 2. Aapka Bna Hua Custom Header */}
        <Header />

        {/* 3. Page Main Area */}
        <main style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
          
          {/* Top Bar Search & New Case Button */}
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

            {/* CLICK EVENT: Switch to Education Tab */}
            <button
              onClick={() => setActiveTab("education")}
              style={{ backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "6px", padding: "9px 20px", fontWeight: 600, fontSize: "13.5px", cursor: "pointer" }}
            >
              + New Education Case
            </button>
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

                {/* Verifier Modal Box */}
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
                      <th style={{ padding: "10px" }}>Client Name</th>
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
                        <td style={{ padding: "10px", fontWeight: 600 }}>{r.candidate}</td>
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

              {/* Candidate Info Box */}
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

              {/* Dynamic Education Section */}
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

                    {/* File Upload Component Cards */}
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
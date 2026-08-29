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

export default function EducationCheck() {
  // Navigation State
  const [activeTab, setActiveTab] = useState("allocation"); // 'allocation' | 'education'

  // Pagination States for Table 1 (University-wise Case Summary)
  const [table1Page, setTable1Page] = useState(1);
  const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

  // Pagination States for Table 2 (Unassigned Education Cases)
  const [table2Page, setTable2Page] = useState(1);
  const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

  // Candidate Form State
  const [candidateInfo, setCandidateInfo] = useState({
    candidateName: "",
    candidateId: "",
    clientName: "",
    mobileNumber: "",
    emailAddress: "",
  });

  // Dynamic Dynamic Qualifications List State
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      qualificationType: "",
      courseStream: "",
      specialization: "",
      instituteUniversity: "",
      boardUniversity: "",
      studyType: "National", // 'National' | 'International'
      modeOfStudy: "",
      yearOfPassing: "",
      educationCharges: "",
      documents: {
        marksheet: null,
        passingCertificate: null,
        degreeCertificate: null,
        otherDocument: null,
      },
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
    const newId = qualifications.length + 1;
    setQualifications((prev) => [
      ...prev,
      {
        id: newId,
        qualificationType: "",
        courseStream: "",
        specialization: "",
        instituteUniversity: "",
        boardUniversity: "",
        studyType: "National",
        modeOfStudy: "",
        yearOfPassing: "",
        educationCharges: "",
        documents: {
          marksheet: null,
          passingCertificate: null,
          degreeCertificate: null,
          otherDocument: null,
        },
      },
    ]);
  };

  const removeQualification = (id) => {
    if (qualifications.length === 1) return;
    setQualifications((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSaveForm = (isDraft = false) => {
    console.log("Saving Education Case:", { candidateInfo, qualifications, isDraft });
    alert(isDraft ? "Saved as Draft successfully!" : "Sent for Verification successfully!");
  };

  // Reusable Pagination Component
  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
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
          color: "#64748b",
        }}
      >
        <div>
          Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startItem}</span> to{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{endItem}</span> of{" "}
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalItems}</span> entries
        </div>

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
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            ‹
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: pageNum === currentPage ? "none" : "1px solid #cbd5e1",
                background: pageNum === currentPage ? "#2563eb" : "#fff",
                color: pageNum === currentPage ? "#fff" : "#1e293b",
                fontWeight: pageNum === currentPage ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {pageNum}
            </button>
          ))}

          <span style={{ padding: "0 4px", color: "#94a3b8" }}>...</span>

          <button
            onClick={() => onPageChange(15)}
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              border: 15 === currentPage ? "none" : "1px solid #cbd5e1",
              background: 15 === currentPage ? "#2563eb" : "#fff",
              color: 15 === currentPage ? "#fff" : "#1e293b",
              cursor: "pointer",
            }}
          >
            15
          </button>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            ›
          </button>
        </div>

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
              cursor: "pointer",
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

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        <main style={{ padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
          <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
            
            {/* Top Bar Header Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Search Bar */}
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by Candidate, Case ID, University, Client..."
                    style={{
                      width: "360px",
                      padding: "8px 12px 8px 34px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      outline: "none",
                      background: "#fff",
                    }}
                  />
                  <span style={{ position: "absolute", left: "10px", top: "8px", color: "#94a3b8" }}>🔍</span>
                </div>
                <button style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 12px", cursor: "pointer" }}>
                  🌪️
                </button>
              </div>

              {/* + New Education Case Button */}
              <button
                onClick={() => setActiveTab("education")}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "9px 20px",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
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

            {/* TAB 1: UNIVERSITY ALLOCATION */}
            {activeTab === "allocation" && (
              <div>
                {/* Statistics Cards Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Total Education Cases</span>
                      <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>1,248</h2>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>Across all Universities</span>
                    </div>
                    <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🎓</div>
                  </div>

                  <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Unassigned Cases</span>
                      <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>143</h2>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>Require allocation</span>
                    </div>
                    <div style={{ background: "#fff7ed", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👤</div>
                  </div>

                  <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>In Progress</span>
                      <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>685</h2>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>With Verifiers</span>
                    </div>
                    <div style={{ background: "#f0fdf4", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👥</div>
                  </div>

                  <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Completed (This Month)</span>
                      <h2 style={{ fontSize: "22px", margin: "4px 0", fontWeight: 800 }}>420</h2>
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>This Month</span>
                    </div>
                    <div style={{ background: "#dcfce7", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✓</div>
                  </div>
                </div>

                {/* Main Allocation Content (Table 1 + Select Verifier Side Panel) */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
                  {/* Table 1: University-wise Case Summary */}
                  <div style={{ flex: 1, background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1e293b" }}>University-wise Case Summary</h3>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <select style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                          <option>All States</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Search University / Client..."
                          style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                        />
                        <button style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer" }}>📥</button>
                      </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                            <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
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
                          {[
                            { id: 1, uni: "Pune University", client: "ABC Corp", newCases: 24, pending: 8, progress: 6, done: 10, verifier: "Amit Kumar" },
                            { id: 2, uni: "Mumbai University", client: "XYZ Solutions", newCases: 18, pending: 5, progress: 7, done: 6, verifier: "Neha Patel" },
                            { id: 3, uni: "Delhi University", client: "Infosys Ltd.", newCases: 31, pending: 12, progress: 8, done: 11, verifier: "Rahul Verma" },
                            { id: 4, uni: "Bangalore University", client: "Tata Group", newCases: 15, pending: 4, progress: 5, done: 6, verifier: "Sneha Joshi" },
                            { id: 5, uni: "Anna University", client: "Wipro Ltd.", newCases: 12, pending: 3, progress: 4, done: 5, verifier: "Karan Verma" },
                          ].map((row) => (
                            <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
                              <td style={{ padding: "10px" }}>{row.id}</td>
                              <td style={{ padding: "10px", fontWeight: 600 }}>{row.uni}</td>
                              <td style={{ padding: "10px" }}>{row.client}</td>
                              <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.newCases}</td>
                              <td style={{ padding: "10px", color: "#d97706", fontWeight: 700 }}>{row.pending}</td>
                              <td style={{ padding: "10px", color: "#028090", fontWeight: 700 }}>{row.progress}</td>
                              <td style={{ padding: "10px", color: "#16a34a", fontWeight: 700 }}>{row.done}</td>
                              <td style={{ padding: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>
                                    {row.verifier.charAt(0)}
                                  </div>
                                  <span>{row.verifier}</span>
                                </div>
                              </td>
                              <td style={{ padding: "10px" }}>
                                <button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "5px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>
                                  👤 Allocate
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table 1 Pagination */}
                    {renderPagination(table1Page, 50, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
                  </div>

                  {/* Select Verifier Panel */}
                  <div style={{ width: "280px", background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "16px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px", color: "#0f172a" }}>Select Verifier</h3>
                    <input
                      type="text"
                      placeholder="🔍 Search verifier..."
                      style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "14px", fontSize: "12px" }}
                    />
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                      {[
                        { name: "Amit Kumar", role: "Education Verifier", cases: 12, checked: true },
                        { name: "Neha Patel", role: "Education Verifier", cases: 8, checked: false },
                        { name: "Rahul Verma", role: "Education Verifier", cases: 15, checked: false },
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "8px", border: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input type="radio" name="verifierSelect" defaultChecked={item.checked} />
                            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "11px" }}>
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p style={{ margin: 0, fontWeight: 700, fontSize: "12px", color: "#1e293b" }}>{item.name}</p>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>{item.role}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", display: "block" }}>{item.cases}</span>
                            <span style={{ fontSize: "9px", color: "#2563eb", fontWeight: 600 }}>Active Cases</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Cancel</button>
                      <button style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>Allocate Cases</button>
                    </div>
                  </div>
                </div>

                {/* Table 2: Unassigned Education Cases */}
                <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1e293b" }}>Unassigned Education Cases</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                        <option>All Clients</option>
                      </select>
                      <select style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", background: "#fff" }}>
                        <option>All Universities</option>
                      </select>
                      <input
                        type="text"
                        placeholder="🔍 Search Candidate / Case ID..."
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }}
                      />
                      <button style={{ background: "none", border: "none", color: "#2563eb", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>View All (143)</button>
                    </div>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                          <th style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></th>
                          <th style={{ padding: "10px" }}>Case ID</th>
                          <th style={{ padding: "10px" }}>Client Name</th>
                          <th style={{ padding: "10px" }}>University / Institution</th>
                          <th style={{ padding: "10px" }}>Verifier Name</th>
                          <th style={{ padding: "10px" }}>Status</th>
                          <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "EDU-10245", candidate: "Rahul Sharma", uni: "Pune University", verifier: "Amit Kumar" },
                          { id: "EDU-10246", candidate: "Priya Singh", uni: "Mumbai University", verifier: "Neha Patel" },
                          { id: "EDU-10247", candidate: "Arjun Mehta", uni: "Delhi University", verifier: "Rahul Verma" },
                          { id: "EDU-10248", candidate: "Sneha Joshi", uni: "Bangalore University", verifier: "Sneha Joshi" },
                          { id: "EDU-10249", candidate: "Karan Verma", uni: "Anna University", verifier: "Karan Verma" },
                        ].map((row) => (
                          <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "10px" }}><input type="checkbox" defaultChecked /></td>
                            <td style={{ padding: "10px", color: "#2563eb", fontWeight: 700 }}>{row.id}</td>
                            <td style={{ padding: "10px", fontWeight: 600 }}>{row.candidate}</td>
                            <td style={{ padding: "10px" }}>{row.uni}</td>
                            <td style={{ padding: "10px" }}>{row.verifier}</td>
                            <td style={{ padding: "10px" }}>
                              <span style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "11px" }}>
                                Unassigned
                              </span>
                            </td>
                            <td style={{ padding: "10px" }}>
                              <button style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "4px 12px", borderRadius: "4px", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}>
                                Assign
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table 2 Bottom Action & Pagination */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                    <button
                      onClick={() => setActiveTab("education")}
                      style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
                    >
                      + New Education Case
                    </button>
                    {renderPagination(table2Page, 143, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADD NEW EDUCATION FORM */}
            {activeTab === "education" && (
              <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>
                
                {/* Form Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                    🎓
                  </div>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Add New Education</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" }}>
                      Add candidate's education details and upload documents for verification
                    </p>
                  </div>
                </div>

                {/* Candidate Information Card */}
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "24px", background: "#ffffff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ color: "#2563eb" }}>👤</span>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1e293b" }}>Candidate Information</h4>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CANDIDATE NAME *</label>
                      <input
                        type="text"
                        placeholder="Enter Candidate Name"
                        value={candidateInfo.candidateName}
                        onChange={(e) => handleCandidateChange("candidateName", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CANDIDATE ID *</label>
                      <input
                        type="text"
                        placeholder="Enter Candidate ID"
                        value={candidateInfo.candidateId}
                        onChange={(e) => handleCandidateChange("candidateId", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>CLIENT NAME *</label>
                      <input
                        type="text"
                        placeholder="Enter Client Name"
                        value={candidateInfo.clientName}
                        onChange={(e) => handleCandidateChange("clientName", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>MOBILE NUMBER *</label>
                      <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={candidateInfo.mobileNumber}
                        onChange={(e) => handleCandidateChange("mobileNumber", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={candidateInfo.emailAddress}
                        onChange={(e) => handleCandidateChange("emailAddress", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Education Details Card */}
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#2563eb" }}>📖</span>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1e293b" }}>Education Details</h4>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Add all educational qualifications of the candidate</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addQualification}
                      style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600, cursor: "pointer", fontSize: "12px" }}
                    >
                      + Add Qualification
                    </button>
                  </div>

                  {/* Qualifications Accordion List */}
                  {qualifications.map((q, index) => (
                    <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "16px", background: "#f8fafc", overflow: "hidden" }}>
                      
                      {/* Qualification Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>Qualification {index + 1}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <button
                            type="button"
                            onClick={() => removeQualification(q.id)}
                            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                          >
                            Remove
                          </button>
                          <span style={{ fontSize: "12px", color: "#94a3b8", cursor: "pointer" }}>▲</span>
                        </div>
                      </div>

                      {/* Qualification Form Body */}
                      <div style={{ padding: "16px", background: "#ffffff" }}>
                        {/* Row 1 */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>QUALIFICATION TYPE *</label>
                            <select
                              value={q.qualificationType}
                              onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px", background: "#fff" }}
                            >
                              <option value="">Select Qualification Type</option>
                              <option value="Graduation">Graduation</option>
                              <option value="Post Graduation">Post Graduation</option>
                              <option value="Diploma">Diploma</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>COURSE / STREAM *</label>
                            <select
                              value={q.courseStream}
                              onChange={(e) => handleQualificationChange(q.id, "courseStream", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px", background: "#fff" }}
                            >
                              <option value="">Select Course / Stream</option>
                              <option value="B.Tech">B.Tech</option>
                              <option value="B.Sc">B.Sc</option>
                              <option value="B.Com">B.Com</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>SPECIALIZATION (OPTIONAL)</label>
                            <input
                              type="text"
                              placeholder="Enter Specialization"
                              value={q.specialization}
                              onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>INSTITUTE / UNIVERSITY *</label>
                            <input
                              type="text"
                              placeholder="Enter Institute / School / University"
                              value={q.instituteUniversity}
                              onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>BOARD / UNIVERSITY *</label>
                            <select
                              value={q.boardUniversity}
                              onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px", background: "#fff" }}
                            >
                              <option value="">Select Board / University</option>
                              <option value="CBSE">CBSE</option>
                              <option value="State Board">State Board</option>
                              <option value="Pune University">Pune University</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>NATIONAL / INTERNATIONAL *</label>
                            <div style={{ display: "flex", gap: "16px", fontSize: "12px", marginTop: "6px" }}>
                              <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                                <input
                                  type="radio"
                                  name={`studyType-${q.id}`}
                                  checked={q.studyType === "National"}
                                  onChange={() => handleQualificationChange(q.id, "studyType", "National")}
                                />
                                National
                              </label>
                              <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                                <input
                                  type="radio"
                                  name={`studyType-${q.id}`}
                                  checked={q.studyType === "International"}
                                  onChange={() => handleQualificationChange(q.id, "studyType", "International")}
                                />
                                International
                              </label>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>MODE OF STUDY *</label>
                            <select
                              value={q.modeOfStudy}
                              onChange={(e) => handleQualificationChange(q.id, "modeOfStudy", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px", background: "#fff" }}
                            >
                              <option value="">Select Mode of Study</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Distance">Distance</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>YEAR OF PASSING *</label>
                            <select
                              value={q.yearOfPassing}
                              onChange={(e) => handleQualificationChange(q.id, "yearOfPassing", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none", fontSize: "12px", background: "#fff" }}
                            >
                              <option value="">Select Year</option>
                              {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "6px", color: "#374151" }}>EDUCATION CHARGES (INR) *</label>
                            <div style={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: "6px", paddingLeft: "8px", background: "#fff" }}>
                              <span style={{ fontSize: "12px", color: "#64748b" }}>₹</span>
                              <input
                                type="text"
                                placeholder="Enter Amount"
                                value={q.educationCharges}
                                onChange={(e) => handleQualificationChange(q.id, "educationCharges", e.target.value)}
                                style={{ width: "100%", padding: "8px", border: "none", outline: "none", fontSize: "12px" }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Upload Documents Section */}
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "10px", color: "#374151" }}>UPLOAD DOCUMENTS *</label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                            {[
                              { label: "Marksheet(s) *", field: "marksheet" },
                              { label: "Passing Certificate *", field: "passingCertificate" },
                              { label: "Degree Certificate (if applicable)", field: "degreeCertificate" },
                              { label: "Other Document (if any)", field: "otherDocument" },
                            ].map((doc, idx) => (
                              <div key={idx} style={{ border: "1px dashed #cbd5e1", borderRadius: "8px", padding: "16px 10px", textAlign: "center", background: "#f8fafc" }}>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "8px" }}>{doc.label}</span>
                                <label style={{ cursor: "pointer", display: "inline-block" }}>
                                  <div style={{ color: "#2563eb", fontSize: "12px", fontWeight: 600 }}>☁ Upload</div>
                                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>or drag & drop</span>
                                  <input type="file" style={{ display: "none" }} />
                                </label>
                                <span style={{ fontSize: "9px", color: "#94a3b8", display: "block", marginTop: "8px" }}>Supported: PDF, JPG, PNG</span>
                              </div>
                            ))}

                            {/* Info Box */}
                            <div style={{ border: "1px solid #eff6ff", borderRadius: "8px", padding: "12px", background: "#f0f9ff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                              <span style={{ fontSize: "18px", marginBottom: "4px" }}>📑</span>
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#1e293b" }}>Allowed file types</span>
                              <span style={{ fontSize: "10px", color: "#64748b" }}>PDF, JPG, PNG</span>
                              <span style={{ fontSize: "9px", color: "#94a3b8", marginTop: "6px" }}>No file size restriction</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Action Controls */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("allocation")}
                    style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveForm(true)}
                    style={{ padding: "9px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveForm(false)}
                    style={{ padding: "9px 24px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                  >
                    🚀 Save & Send for Verification
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
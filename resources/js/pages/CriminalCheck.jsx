// // import React, { useState } from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";

// // export default function CourtPoliceCheck() {
// //   const [formData, setFormData] = useState({
// //     courtsChecked: "",
// //     policeRecordCheck: "",
// //     caseDetails: "",
// //     state: "",
// //     district: "",
// //     verificationMode: "",
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

// //     // State reset
// //     setFormData({
// //       courtsChecked: "",
// //       policeRecordCheck: "",
// //       caseDetails: "",
// //       state: "",
// //       district: "",
// //       verificationMode: "",
// //       remarks: "",
// //     });
// //   };

// //   return (
// //     <>
// //       {/* 1. Sidebar */}
// //       <Sidebar />

// //       {/* 2. Main Layout Section */}
// //       <section id="content">
// //         <Header />

// //         <main>
// //           <div style={styles.container}>
// //             <form style={styles.card}>
// //               <h2 style={styles.title}>Court & Police Verification Check</h2>

// //               {/* Row 1: Courts Checked & Police Record Check */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>COURTS CHECKED</label>
// //                   <input
// //                     type="text"
// //                     name="courtsChecked"
// //                     value={formData.courtsChecked}
// //                     onChange={handleChange}
// //                     placeholder="Enter courts checked..."
// //                     style={styles.input}
// //                   />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>POLICE RECORD CHECK</label>
// //                   <select
// //                     name="policeRecordCheck"
// //                     value={formData.policeRecordCheck}
// //                     onChange={handleChange}
// //                     style={styles.select}
// //                   >
// //                     <option value="">— Select —</option>
// //                     <option value="Clear">Clear</option>
// //                     <option value="Record Found">Record Found</option>
// //                     <option value="Pending">Pending</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Row 2: Case Details (If Any) */}
// //               <div style={styles.formGroupFull}>
// //                 <label style={styles.label}>CASE DETAILS (IF ANY)</label>
// //                 <textarea
// //                   name="caseDetails"
// //                   value={formData.caseDetails}
// //                   onChange={handleChange}
// //                   placeholder="Enter case details (if any)..."
// //                   rows={4}
// //                   style={styles.textarea}
// //                 />
// //               </div>

// //               {/* Row 3: State & District */}
// //               <div style={styles.row}>
// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>STATE</label>
// //                   <input
// //                     type="text"
// //                     name="state"
// //                     value={formData.state}
// //                     onChange={handleChange}
// //                     placeholder="Enter state..."
// //                     style={styles.input}
// //                   />
// //                 </div>

// //                 <div style={styles.formGroup}>
// //                   <label style={styles.label}>DISTRICT</label>
// //                   <input
// //                     type="text"
// //                     name="district"
// //                     value={formData.district}
// //                     onChange={handleChange}
// //                     placeholder="Enter district..."
// //                     style={styles.input}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 4: Verification Mode */}
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
// //                     <option value="Online Portal">Online Portal</option>
// //                     <option value="Police Station Visit">Police Station Visit</option>
// //                     <option value="Advocate Search">Advocate Search</option>
// //                   </select>
// //                 </div>

// //                 <div style={styles.formGroup}></div>
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

// // // Cleaned Inline Styles
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
// //     marginBottom: "16px",
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
// //     backgroundColor: "#93a3be",
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


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// // Component-Scoped CSS Stylesheet
// const scopedCss = `
//   /* Scope Prefix: pvc- (Police Verification Component) */
//   .pvc-main-wrapper {
//     padding: 24px;
//     background-color: #f8fafc;
//     min-height: 100vh;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//   }

//   .pvc-top-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 16px;
//   }

//   .pvc-page-title {
//     font-size: 18px;
//     font-weight: 700;
//     color: #0f172a;
//     margin: 0;
//   }

//   .pvc-btn-primary {
//     background-color: #2563eb;
//     color: #ffffff;
//     border: none;
//     border-radius: 6px;
//     padding: 8px 16px;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: background-color 0.2s;
//   }

//   .pvc-btn-primary:hover {
//     background-color: #1d4ed8;
//   }

//   /* Tabs Navigation */
//   .pvc-tabs-header {
//     border-bottom: 1px solid #e2e8f0;
//     margin-bottom: 20px;
//   }

//   .pvc-tabs-container {
//     display: flex;
//     gap: 32px;
//   }

//   .pvc-tab-btn {
//     padding: 8px 0 12px 0;
//     border: none;
//     background: transparent;
//     font-size: 15px;
//     color: #64748b;
//     font-weight: 500;
//     cursor: pointer;
//     border-bottom: 3px solid transparent;
//   }

//   .pvc-tab-btn.pvc-active {
//     font-weight: 700;
//     color: #1e2761;
//     border-bottom-color: #1e2761;
//   }

//   /* Card & Filter Bar */
//   .pvc-card-container {
//     background: #ffffff;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     padding: 16px;
//   }

//   .pvc-filter-bar {
//     display: grid;
//     grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
//     gap: 12px;
//     margin-bottom: 16px;
//   }

//   .pvc-filter-input,
//   .pvc-filter-select {
//     padding: 8px 12px;
//     border-radius: 6px;
//     border: 1px solid #cbd5e1;
//     font-size: 13px;
//     outline: none;
//     width: 100%;
//     box-sizing: border-box;
//     background-color: #ffffff;
//   }

//   /* Table Responsive Scroll */
//   .pvc-table-responsive {
//     overflow-x: auto;
//     width: 100%;
//     white-space: nowrap;
//   }

//   .pvc-data-table {
//     width: 100%;
//     min-width: 1100px;
//     border-collapse: collapse;
//     font-size: 13px;
//     text-align: left;
//   }

//   .pvc-data-table thead tr {
//     background: #f8fafc;
//     color: #1e2761;
//     border-bottom: 1px solid #e2e8f0;
//   }

//   .pvc-data-table th,
//   .pvc-data-table td {
//     padding: 12px;
//   }

//   .pvc-data-table tbody tr {
//     border-bottom: 1px solid #f1f5f9;
//   }

//   .pvc-avatar-img {
//     width: 32px;
//     height: 32px;
//     border-radius: 50%;
//     object-fit: cover;
//   }

//   .pvc-badge-mode {
//     padding: 4px 8px;
//     border-radius: 12px;
//     font-size: 11px;
//     font-weight: 600;
//   }

//   .pvc-mode-online {
//     background: #eff6ff;
//     color: #2563eb;
//   }

//   .pvc-mode-offline {
//     background: #f3e8ff;
//     color: #9333ea;
//   }

//   .pvc-status-badge {
//     padding: 4px 8px;
//     border-radius: 4px;
//     font-size: 11px;
//     font-weight: 700;
//   }

//   .pvc-status-completed {
//     background-color: #dcfce7;
//     color: #166534;
//   }

//   .pvc-status-progress {
//     background-color: #fef3c7;
//     color: #92400e;
//   }

//   .pvc-status-pending {
//     background-color: #f1f5f9;
//     color: #475569;
//   }

//   .pvc-doc-link {
//     border: none;
//     background: none;
//     color: #2563eb;
//     cursor: pointer;
//     font-size: 12px;
//     font-weight: 600;
//   }

//   .pvc-btn-view {
//     background-color: #2563eb;
//     color: #ffffff;
//     border: none;
//     padding: 6px 12px;
//     border-radius: 4px;
//     font-size: 12px;
//     cursor: pointer;
//   }

//   /* Pagination */
//   .pvc-pagination-container {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: 16px;
//     padding-top: 12px;
//     border-top: 1px solid #e2e8f0;
//     font-size: 13px;
//     color: #64748b;
//   }

//   .pvc-pagination-btns {
//     display: flex;
//     gap: 6px;
//   }

//   .pvc-page-btn {
//     padding: 6px 12px;
//     border-radius: 4px;
//     border: 1px solid #cbd5e1;
//     background: #ffffff;
//     color: #1e293b;
//     cursor: pointer;
//   }

//   .pvc-page-btn:disabled {
//     background: #f1f5f9;
//     cursor: not-allowed;
//   }

//   .pvc-page-btn.pvc-active-page {
//     background: #2563eb;
//     color: #ffffff;
//     font-weight: 600;
//   }

//   /* Form Container & Layout */
//   .pvc-form-container {
//     background: #ffffff;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     padding: 24px;
//     max-width: 1200px;
//     margin: 0 auto;
//   }

//   .pvc-form-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 20px;
//   }

//   .pvc-btn-guidelines {
//     background-color: #eff6ff;
//     color: #2563eb;
//     border: 1px solid #bfdbfe;
//     padding: 6px 14px;
//     border-radius: 6px;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }

//   .pvc-form-section {
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     padding: 16px;
//     margin-bottom: 16px;
//     background-color: #ffffff;
//   }

//   .pvc-section-title {
//     font-size: 14px;
//     font-weight: 700;
//     color: #1e2761;
//     margin-top: 0;
//     margin-bottom: 14px;
//   }

//   .pvc-grid-4 {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 16px;
//   }

//   .pvc-grid-1-3 {
//     display: grid;
//     grid-template-columns: 1fr 3fr;
//     gap: 16px;
//     margin-bottom: 16px;
//   }

//   .pvc-grid-2-1-1 {
//     display: grid;
//     grid-template-columns: 2fr 1fr 1fr;
//     gap: 16px;
//   }

//   .pvc-form-group {
//     display: flex;
//     flex-direction: column;
//   }

//   .pvc-form-label {
//     display: block;
//     font-size: 12px;
//     font-weight: 600;
//     color: #475569;
//     margin-bottom: 6px;
//   }

//   .pvc-form-input,
//   .pvc-form-select {
//     width: 100%;
//     padding: 8px 12px;
//     border-radius: 6px;
//     border: 1px solid #cbd5e1;
//     font-size: 13px;
//     outline: none;
//     box-sizing: border-box;
//     background-color: #ffffff;
//   }

//   .pvc-radio-group {
//     display: flex;
//     gap: 20px;
//     margin-top: 8px;
//   }

//   .pvc-radio-label {
//     font-size: 13px;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     cursor: pointer;
//   }

//   .pvc-bottom-grid {
//     display: grid;
//     grid-template-columns: 1.2fr 0.8fr;
//     gap: 20px;
//     margin-bottom: 24px;
//   }

//   /* File Upload Elements */
//   .pvc-upload-box {
//     border: 1px dashed #bfdbfe;
//     border-radius: 6px;
//     padding: 20px;
//     text-align: center;
//     background-color: #f8fafc;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     position: relative;
//   }

//   .pvc-file-input-hidden {
//     display: none;
//   }

//   .pvc-upload-icon {
//     font-size: 28px;
//     color: #2563eb;
//   }

//   .pvc-upload-title {
//     margin: 4px 0;
//     font-size: 13px;
//     font-weight: 600;
//     color: #2563eb;
//   }

//   .pvc-upload-subtext {
//     font-size: 11px;
//     color: #94a3b8;
//     margin-bottom: 8px;
//   }

//   .pvc-btn-outline {
//     padding: 8px 16px;
//     border: 1px solid #2563eb;
//     background: #ffffff;
//     color: #2563eb;
//     border-radius: 6px;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     display: inline-block;
//   }

//   .pvc-upload-type-row {
//     display: flex;
//     gap: 12px;
//     margin-top: 16px;
//     margin-bottom: 16px;
//     align-items: flex-end;
//   }

//   .pvc-docs-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 12px;
//     border: 1px solid #f1f5f9;
//   }

//   .pvc-docs-table th {
//     background: #f8fafc;
//     color: #64748b;
//     text-align: left;
//     padding: 8px;
//   }

//   .pvc-docs-table td {
//     padding: 12px;
//     text-align: center;
//     color: #94a3b8;
//   }

//   .pvc-photo-preview {
//     border: 1px solid #e2e8f0;
//     border-radius: 6px;
//     padding: 12px;
//     display: flex;
//     justify-content: center;
//     background: #f8fafc;
//   }

//   .pvc-photo-img {
//     width: 80px;
//     height: 90px;
//     border-radius: 4px;
//     border: 1px solid #cbd5e1;
//     object-fit: cover;
//   }

//   .pvc-form-actions {
//     display: flex;
//     justify-content: flex-end;
//     gap: 12px;
//     padding-top: 16px;
//     border-top: 1px solid #e2e8f0;
//   }

//   .pvc-btn-cancel {
//     padding: 10px 24px;
//     border-radius: 6px;
//     border: 1px solid #cbd5e1;
//     background: #ffffff;
//     color: #475569;
//     font-weight: 600;
//     font-size: 13px;
//     cursor: pointer;
//   }
// `;

// export default function PoliceVerificationModule() {
//   const [activeTab, setActiveTab] = useState("verification");

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedClient, setSelectedClient] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedMode, setSelectedMode] = useState("");
//   const [dateRange, setDateRange] = useState("");

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   // Input File Refs
//   const dragDocInputRef = useRef(null);
//   const chooseDocInputRef = useRef(null);
//   const candidatePhotoInputRef = useRef(null);

//   // Auto Inject Scoped CSS into DOM head
//   useEffect(() => {
//     const styleTag = document.createElement("style");
//     styleTag.id = "pvc-scoped-styles";
//     styleTag.innerHTML = scopedCss;
//     document.head.appendChild(styleTag);

//     return () => {
//       const existingTag = document.getElementById("pvc-scoped-styles");
//       if (existingTag) {
//         existingTag.remove();
//       }
//     };
//   }, []);

//   // Table Data
//   const [tableData] = useState([
//     { id: 1, photo: "https://via.placeholder.com/32", name: "Amit Sharma", client: "ABC Pvt. Ltd.", refNo: "PV-001234", mode: "Online", type: "Police Verification", status: "In Progress", verifier: "Rohit Verma", tat: "5 Days", docs: "View (2)" },
//     { id: 2, photo: "https://via.placeholder.com/32", name: "Priya Singh", client: "XYZ Corp.", refNo: "PV-001235", mode: "Offline", type: "Police Verification", status: "Completed", verifier: "Neha Kapoor", tat: "-", docs: "View (3)" },
//     { id: 3, photo: "https://via.placeholder.com/32", name: "Rahul Mehta", client: "Global Tech Ltd.", refNo: "PV-001236", mode: "Online", type: "Police Verification", status: "Pending", verifier: "Suresh Yadav", tat: "7 Days", docs: "View (1)" },
//     { id: 4, photo: "https://via.placeholder.com/32", name: "Sneha Patel", client: "Bright Future Ltd.", refNo: "PV-001237", mode: "Offline", type: "Police Verification", status: "Completed", verifier: "Anjali Sharma", tat: "-", docs: "View (2)" },
//     { id: 5, photo: "https://via.placeholder.com/32", name: "Vikram Reddy", client: "Tech Solutions", refNo: "PV-001238", mode: "Online", type: "Police Verification", status: "In Progress", verifier: "Rohit Verma", tat: "4 Days", docs: "View (1)" },
//     { id: 6, photo: "https://via.placeholder.com/32", name: "Karan Gupta", client: "ABC Pvt. Ltd.", refNo: "PV-001239", mode: "Offline", type: "Police Verification", status: "Completed", verifier: "Neha Kapoor", tat: "-", docs: "View (1)" },
//     { id: 7, photo: "https://via.placeholder.com/32", name: "Pooja Verma", client: "XYZ Corp.", refNo: "PV-001240", mode: "Online", type: "Police Verification", status: "Pending", verifier: "Suresh Yadav", tat: "3 Days", docs: "View (2)" },
//   ]);

//   // Form State
//   const [formData, setFormData] = useState({
//     candidateName: "",
//     candidateId: "",
//     clientName: "",
//     jobRole: "",
//     verificationType: "Online",
//     policeVerificationMode: "",
//     state: "",
//     district: "",
//     referenceNo: "",
//     caseDetails: "",
//     purposeOfVerification: "",
//     expectedTat: "",
//     priority: "",
//     documentType: "",
//   });

//   const [uploadedFiles, setUploadedFiles] = useState({
//     supportingDoc: null,
//     typeDoc: null,
//     candidatePhoto: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, fileKey) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFiles((prev) => ({ ...prev, [fileKey]: file }));
//     }
//   };

//   // Pagination Logic
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(tableData.length / rowsPerPage);

//   const getBadgeClass = (status) => {
//     switch (status) {
//       case "Completed":
//         return "pvc-status-completed";
//       case "In Progress":
//         return "pvc-status-progress";
//       case "Pending":
//       default:
//         return "pvc-status-pending";
//     }
//   };

//   return (
//     <>
//       <Sidebar />

//       <section id="content">
//         <Header />

//         <main className="pvc-main-wrapper">
//           {/* Top Header Bar */}
//           <div className="pvc-top-header">
//             <h2 className="pvc-page-title">POLICE VERIFICATION</h2>

//             {activeTab === "verification" && (
//               <button
//                 className="pvc-btn-primary"
//                 onClick={() => setActiveTab("new_verification")}
//               >
//                 + New Police Verification
//               </button>
//             )}
//           </div>

//           {/* Navigation Tabs Header */}
//           <div className="pvc-tabs-header">
//             <div className="pvc-tabs-container">
//               <button
//                 className={`pvc-tab-btn ${activeTab === "verification" ? "pvc-active" : ""}`}
//                 onClick={() => setActiveTab("verification")}
//               >
//                 Police Verification
//               </button>
//               <button
//                 className={`pvc-tab-btn ${activeTab === "new_verification" ? "pvc-active" : ""}`}
//                 onClick={() => setActiveTab("new_verification")}
//               >
//                 New Police Verification
//               </button>
//             </div>
//           </div>

//           {/* TAB 1: DATA TABLE VIEW */}
//           {activeTab === "verification" && (
//             <div className="pvc-card-container">
//               {/* Filter Bar */}
//               <div className="pvc-filter-bar">
//                 <input
//                   type="text"
//                   className="pvc-filter-input"
//                   placeholder="🔍 Search Candidate Name / Ref No."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select
//                   className="pvc-filter-select"
//                   value={selectedClient}
//                   onChange={(e) => setSelectedClient(e.target.value)}
//                 >
//                   <option value="">Select Client</option>
//                   <option value="ABC Pvt. Ltd.">ABC Pvt. Ltd.</option>
//                 </select>
//                 <select
//                   className="pvc-filter-select"
//                   value={selectedStatus}
//                   onChange={(e) => setSelectedStatus(e.target.value)}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//                 <select
//                   className="pvc-filter-select"
//                   value={selectedMode}
//                   onChange={(e) => setSelectedMode(e.target.value)}
//                 >
//                   <option value="">Select Mode</option>
//                   <option value="Online">Online</option>
//                   <option value="Offline">Offline</option>
//                 </select>
//                 <input
//                   type="text"
//                   className="pvc-filter-input"
//                   placeholder="📅 From Date - To Date"
//                   value={dateRange}
//                   onChange={(e) => setDateRange(e.target.value)}
//                 />
//               </div>

//               {/* Responsive Scrollable Table Container */}
//               <div className="pvc-table-responsive">
//                 <table className="pvc-data-table">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Photo</th>
//                       <th>Candidate Name</th>
//                       <th>Client Name</th>
//                       <th>Reference No.</th>
//                       <th>Mode</th>
//                       <th>Verification Type</th>
//                       <th>Status</th>
//                       <th>Assigned Verifier</th>
//                       <th>TAT</th>
//                       <th>Document</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentRows.map((row) => (
//                       <tr key={row.id}>
//                         <td>{row.id}</td>
//                         <td>
//                           <img src={row.photo} alt={row.name} className="pvc-avatar-img" />
//                         </td>
//                         <td><strong>{row.name}</strong></td>
//                         <td>{row.client}</td>
//                         <td>{row.refNo}</td>
//                         <td>
//                           <span className={`pvc-badge-mode ${row.mode === "Online" ? "pvc-mode-online" : "pvc-mode-offline"}`}>
//                             {row.mode}
//                           </span>
//                         </td>
//                         <td>{row.type}</td>
//                         <td>
//                           <span className={`pvc-status-badge ${getBadgeClass(row.status)}`}>
//                             {row.status}
//                           </span>
//                         </td>
//                         <td>{row.verifier}</td>
//                         <td>{row.tat}</td>
//                         <td>
//                           <button className="pvc-doc-link">📄 {row.docs}</button>
//                         </td>
//                         <td>
//                           <button 
//     className="pvc-btn-view" 
//     onClick={() => navigate("/CriminalUserProfile")}
//   >
//     View Details
//   </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination Controls */}
//               <div className="pvc-pagination-container">
//                 <span>
//                   Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, tableData.length)} of {tableData.length} entries
//                 </span>
//                 <div className="pvc-pagination-btns">
//                   <button
//                     className="pvc-page-btn"
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage((prev) => prev - 1)}
//                   >
//                     Previous
//                   </button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`pvc-page-btn ${currentPage === i + 1 ? "pvc-active-page" : ""}`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     className="pvc-page-btn"
//                     disabled={currentPage === totalPages}
//                     onClick={() => setCurrentPage((prev) => prev + 1)}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TAB 2: NEW POLICE VERIFICATION FORM */}
//           {activeTab === "new_verification" && (
//             <div className="pvc-form-container">
              
//               {/* Header Bar */}
//               <div className="pvc-form-header">
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <span style={{ fontSize: "20px" }}>🛡️</span>
//                   <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e2761", margin: 0 }}>New Police Verification</h2>
//                 </div>
//                 <button className="pvc-btn-guidelines">
//                   ℹ️ View Guidelines
//                 </button>
//               </div>

//               {/* Section 1: Candidate Details */}
//               <div className="pvc-form-section">
//                 <h3 className="pvc-section-title">Candidate Details</h3>
//                 <div className="pvc-grid-4">
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Candidate Name *</label>
//                     <input type="text" name="candidateName" value={formData.candidateName} onChange={handleInputChange} placeholder="Enter candidate name" className="pvc-form-input" />
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Candidate ID / Reference No. *</label>
//                     <input type="text" name="candidateId" value={formData.candidateId} onChange={handleInputChange} placeholder="Enter candidate ID" className="pvc-form-input" />
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Client Name *</label>
//                     <select name="clientName" value={formData.clientName} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select Client</option>
//                     </select>
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Job Role *</label>
//                     <select name="jobRole" value={formData.jobRole} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select Job Role</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Section 2: Verification Details */}
//               <div className="pvc-form-section">
//                 <h3 className="pvc-section-title">Verification Details</h3>
                
//                 {/* Row 1 */}
//                 <div className="pvc-grid-4" style={{ marginBottom: "16px" }}>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Verification Type *</label>
//                     <div className="pvc-radio-group">
//                       <label className="pvc-radio-label">
//                         <input type="radio" name="verificationType" value="Online" checked={formData.verificationType === "Online"} onChange={handleInputChange} /> Online
//                       </label>
//                       <label className="pvc-radio-label">
//                         <input type="radio" name="verificationType" value="Offline" checked={formData.verificationType === "Offline"} onChange={handleInputChange} /> Offline
//                       </label>
//                     </div>
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Police Verification Mode *</label>
//                     <select name="policeVerificationMode" value={formData.policeVerificationMode} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select Mode</option>
//                     </select>
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">State *</label>
//                     <select name="state" value={formData.state} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select State</option>
//                     </select>
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">District *</label>
//                     <select name="district" value={formData.district} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select District</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Row 2 */}
//                 <div className="pvc-grid-1-3">
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Reference No. (if any)</label>
//                     <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} placeholder="Enter reference number" className="pvc-form-input" />
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Case Details / Remarks</label>
//                     <input type="text" name="caseDetails" value={formData.caseDetails} onChange={handleInputChange} placeholder="Enter case details / remarks" className="pvc-form-input" />
//                   </div>
//                 </div>

//                 {/* Row 3 */}
//                 <div className="pvc-grid-2-1-1">
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Purpose of Verification *</label>
//                     <select name="purposeOfVerification" value={formData.purposeOfVerification} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select Purpose</option>
//                     </select>
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Expected TAT (Days) *</label>
//                     <input type="number" name="expectedTat" value={formData.expectedTat} onChange={handleInputChange} placeholder="Enter expected TAT" className="pvc-form-input" />
//                   </div>
//                   <div className="pvc-form-group">
//                     <label className="pvc-form-label">Priority</label>
//                     <select name="priority" value={formData.priority} onChange={handleInputChange} className="pvc-form-select">
//                       <option value="">Select Priority</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Upload & Photograph Grid */}
//               <div className="pvc-bottom-grid">
                
//                 {/* Documents Upload Box */}
//                 <div className="pvc-form-section">
//                   <h3 className="pvc-section-title">Documents Upload</h3>

//                   {/* Upload Box 1: Drag and Drop Supporting Documents */}
//                   <div 
//                     className="pvc-upload-box" 
//                     onClick={() => dragDocInputRef.current.click()}
//                   >
//                     <input 
//                       type="file" 
//                       ref={dragDocInputRef} 
//                       className="pvc-file-input-hidden" 
//                       accept=".pdf,.jpg,.png"
//                       onChange={(e) => handleFileChange(e, "supportingDoc")}
//                     />
//                     <span className="pvc-upload-icon">☁️</span>
//                     <p className="pvc-upload-title">
//                       {uploadedFiles.supportingDoc ? uploadedFiles.supportingDoc.name : "Upload Supporting Documents"}
//                     </p>
//                     <span className="pvc-upload-subtext">Click to upload or drag and drop (PDF, JPG, PNG - Max 5MB)</span>
//                   </div>

//                   {/* Upload Box 2: Select Document Type & Choose File Input */}
//                   <div className="pvc-upload-type-row">
//                     <div style={{ flex: 1 }} className="pvc-form-group">
//                       <label className="pvc-form-label">Select Document Type</label>
//                       <select name="documentType" value={formData.documentType} onChange={handleInputChange} className="pvc-form-select">
//                         <option value="">Select Document Type</option>
//                         <option value="Aadhar Card">Aadhar Card</option>
//                         <option value="PAN Card">PAN Card</option>
//                         <option value="Voter ID">Voter ID</option>
//                       </select>
//                     </div>

//                     <div>
//                       <input 
//                         type="file" 
//                         id="pvc-choose-doc-file" 
//                         ref={chooseDocInputRef} 
//                         className="pvc-file-input-hidden"
//                         accept=".pdf,.jpg,.png"
//                         onChange={(e) => handleFileChange(e, "typeDoc")}
//                       />
//                       <label htmlFor="pvc-choose-doc-file" className="pvc-btn-outline">
//                         {uploadedFiles.typeDoc ? "File Selected" : "Choose File"}
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="pvc-form-label">Uploaded Documents</label>
//                     <table className="pvc-docs-table">
//                       <thead>
//                         <tr>
//                           <th>Document Name</th>
//                           <th>Document Type</th>
//                           <th>Uploaded On</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {uploadedFiles.typeDoc || uploadedFiles.supportingDoc ? (
//                           <tr>
//                             <td>{uploadedFiles.typeDoc?.name || uploadedFiles.supportingDoc?.name}</td>
//                             <td>{formData.documentType || "Supporting Doc"}</td>
//                             <td>{new Date().toLocaleDateString()}</td>
//                             <td><button style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Delete</button></td>
//                           </tr>
//                         ) : (
//                           <tr>
//                             <td colSpan="4">No documents uploaded yet.</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {/* Candidate Photograph Box */}
//                 <div className="pvc-form-section">
//                   <h3 className="pvc-section-title">Candidate Photograph</h3>

//                   {/* Upload Box 3: Candidate Photo File Input */}
//                   <div className="pvc-upload-box" style={{ marginBottom: "16px" }} onClick={() => candidatePhotoInputRef.current.click()}>
//                     <input 
//                       type="file" 
//                       ref={candidatePhotoInputRef}
//                       className="pvc-file-input-hidden" 
//                       accept="image/jpeg, image/png"
//                       onChange={(e) => handleFileChange(e, "candidatePhoto")}
//                     />
//                     <span className="pvc-upload-icon">👤</span>
//                     <p className="pvc-upload-title">
//                       {uploadedFiles.candidatePhoto ? uploadedFiles.candidatePhoto.name : "Upload Candidate Photo"}
//                     </p>
//                     <span className="pvc-upload-subtext">Click to upload or drag and drop (JPG, PNG - Max 2MB)</span>
//                     <button type="button" className="pvc-btn-outline" style={{ marginTop: "8px" }}>
//                       Choose File
//                     </button>
//                   </div>

//                   <div className="pvc-photo-preview">
//                     <img 
//                       src={uploadedFiles.candidatePhoto ? URL.createObjectURL(uploadedFiles.candidatePhoto) : "https://via.placeholder.com/80x90"} 
//                       alt="Candidate Sample" 
//                       className="pvc-photo-img" 
//                     />
//                   </div>
//                 </div>

//               </div>

//               {/* Actions Footer */}
//               <div className="pvc-form-actions">
//                 <button
//                   type="button"
//                   className="pvc-btn-cancel"
//                   onClick={() => setActiveTab("verification")}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="pvc-btn-primary"
//                   style={{ padding: "10px 24px" }}
//                 >
//                   Save & Continue →
//                 </button>
//               </div>

//             </div>
//           )}
//         </main>
//       </section>
//     </>
//   );
// }
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";

// Component-Scoped CSS Stylesheet
const scopedCss = `
  /* Scope Prefix: pvc- (Police/Criminal Verification Component) */
  .pvc-main-wrapper {
    padding: 24px;
    background-color: #f8fafc;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .pvc-top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .pvc-page-title {
    font-size: 24px;
    font-weight: 600;
    color: #000;
    margin: 0;
  }

  .pvc-btn-primary {
    background-color: #2563eb;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .pvc-btn-primary:hover {
    background-color: #1d4ed8;
  }

  .pvc-btn-primary:disabled {
    background-color: #93a3be;
    cursor: not-allowed;
  }

  /* Tabs Navigation */
  .pvc-tabs-header {
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 20px;
  }

  .pvc-tabs-container {
    display: flex;
    gap: 32px;
  }

  .pvc-tab-btn {
    padding: 8px 0 12px 0;
    border: none;
    background: transparent;
    font-size: 15px;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 3px solid transparent;
  }

  .pvc-tab-btn.pvc-active {
    font-weight: 700;
    color: #1e2761;
    border-bottom-color: #1e2761;
  }

  /* Card & Filter Bar */
  .pvc-card-container {
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 16px;
  }

  .pvc-filter-bar {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .pvc-filter-input,
  .pvc-filter-select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    font-size: 13px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  /* Table Responsive Scroll */
  .pvc-table-responsive {
    overflow-x: auto;
    width: 100%;
    white-space: nowrap;
  }

  .pvc-data-table {
    width: 100%;
    min-width: 1100px;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
  }

  .pvc-data-table thead tr {
    background: #f8fafc;
    color: #1e2761;
    border-bottom: 1px solid #e2e8f0;
  }

  .pvc-data-table th,
  .pvc-data-table td {
    padding: 12px;
  }

  .pvc-data-table tbody tr {
    border-bottom: 1px solid #f1f5f9;
  }

  .pvc-avatar-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background: #e2e8f0;
  }

  .pvc-badge-mode {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
  }

  .pvc-mode-online {
    background: #eff6ff;
    color: #2563eb;
  }

  .pvc-mode-offline {
    background: #f3e8ff;
    color: #9333ea;
  }

  .pvc-status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
  }

  .pvc-status-completed {
    background-color: #dcfce7;
    color: #166534;
  }

  .pvc-status-progress {
    background-color: #fef3c7;
    color: #92400e;
  }

  .pvc-status-pending {
    background-color: #f1f5f9;
    color: #475569;
  }

  .pvc-status-hold {
    background-color: #fee2e2;
    color: #dc2626;
  }

  .pvc-doc-link {
    border: none;
    background: none;
    color: #2563eb;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
  }

  .pvc-btn-view {
    background-color: #2563eb;
    color: #ffffff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }

  /* Pagination */
  .pvc-pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #e2e8f0;
    font-size: 13px;
    color: #64748b;
  }

  .pvc-pagination-btns {
    display: flex;
    gap: 6px;
  }

  .pvc-page-btn {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #1e293b;
    cursor: pointer;
  }

  .pvc-page-btn:disabled {
    background: #f1f5f9;
    cursor: not-allowed;
  }

  .pvc-page-btn.pvc-active-page {
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
  }

  /* Form Container & Layout */
  .pvc-form-container {
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .pvc-form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .pvc-btn-guidelines {
    background-color: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pvc-form-section {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: #ffffff;
  }

  .pvc-section-title {
    font-size: 14px;
    font-weight: 700;
    color: #1e2761;
    margin-top: 0;
    margin-bottom: 14px;
  }

  .pvc-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .pvc-grid-1-3 {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .pvc-grid-2-1-1 {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
  }

  .pvc-form-group {
    display: flex;
    flex-direction: column;
  }

  .pvc-form-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 6px;
  }

  .pvc-form-input,
  .pvc-form-select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .pvc-form-input:disabled,
  .pvc-form-select:disabled {
    background-color: #f1f5f9;
    color: #64748b;
  }

  .pvc-radio-group {
    display: flex;
    gap: 20px;
    margin-top: 8px;
  }

  .pvc-radio-label {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .pvc-bottom-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  /* File Upload Elements */
  .pvc-upload-box {
    border: 1px dashed #bfdbfe;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    background-color: #f8fafc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
  }

  .pvc-file-input-hidden {
    display: none;
  }

  .pvc-upload-icon {
    font-size: 28px;
    color: #2563eb;
  }

  .pvc-upload-title {
    margin: 4px 0;
    font-size: 13px;
    font-weight: 600;
    color: #2563eb;
  }

  .pvc-upload-subtext {
    font-size: 11px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .pvc-btn-outline {
    padding: 8px 16px;
    border: 1px solid #2563eb;
    background: #ffffff;
    color: #2563eb;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
  }

  .pvc-upload-type-row {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    margin-bottom: 16px;
    align-items: flex-end;
  }

  .pvc-docs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    border: 1px solid #f1f5f9;
  }

  .pvc-docs-table th {
    background: #f8fafc;
    color: #64748b;
    text-align: left;
    padding: 8px;
  }

  .pvc-docs-table td {
    padding: 12px;
    text-align: left;
    color: #334155;
  }

  .pvc-photo-preview {
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px;
    display: flex;
    justify-content: center;
    background: #f8fafc;
  }

  .pvc-photo-img {
    width: 80px;
    height: 90px;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    object-fit: cover;
  }

  .pvc-form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }

  .pvc-btn-cancel {
    padding: 10px 24px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #475569;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  .pvc-banner-error {
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fca5a5;
    margin-bottom: 16px;
  }

  .pvc-banner-info {
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    margin-bottom: 16px;
  }
`;

const EMPTY_FORM = () => ({
  candidateName: "",
  candidateId: "",
  jobRole: "",
  verificationType: "Online",
  policeVerificationMode: "",
  state: "",
  district: "",
  referenceNo: "",
  caseDetails: "",
  purposeOfVerification: "",
  expectedTat: "",
  priority: "",
});

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const authHeaders = (extra = {}) => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}`, Accept: "application/json", ...extra };
};

export default function CriminalCheck() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("verification");

  // Filter States (wired to live data)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Input File Refs
  const dragDocInputRef = useRef(null);
  const chooseDocInputRef = useRef(null);
  const candidatePhotoInputRef = useRef(null);

  // Auto Inject Scoped CSS into DOM head
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.id = "pvc-scoped-styles";
    styleTag.innerHTML = scopedCss;
    document.head.appendChild(styleTag);
    return () => {
      const existingTag = document.getElementById("pvc-scoped-styles");
      if (existingTag) existingTag.remove();
    };
  }, []);

  // ── Clients (Client Name dropdown, same as Education's) ─────────────
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState("");

  const fetchClients = () => {
    setClientsLoading(true);
    setClientsError("");
    return fetch(`${API_URL}/api/clients`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => setClientsError("Failed to load clients."))
      .finally(() => setClientsLoading(false));
  };

  // ── Cases (Criminal is a check_type on an existing BGVCase, same as
  // Employment/Education — this screen fills in the details on a case
  // that already has "criminal" in its checks array) ──────────────────
  const [cases, setCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState("");

  const fetchCases = () => {
    setCasesLoading(true);
    setCasesError("");
    return fetch(`${API_URL}/api/cases`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => setCases(data.cases || []))
      .catch(() => setCasesError("Failed to load cases."))
      .finally(() => setCasesLoading(false));
  };

  useEffect(() => {
    fetchClients();
    fetchCases();
  }, []);

  const criminalCases = useMemo(
    () => cases.filter((c) => (c.checks || []).includes("criminal")),
    [cases]
  );

  // ── List tab: derive display rows from live case data ───────────────
  const statusBadgeInfo = (status) => {
    switch (status) {
      case "completed":
        return { label: "Completed", cls: "pvc-status-completed" };
      case "in-progress":
        return { label: "In Progress", cls: "pvc-status-progress" };
      case "qc-review":
        return { label: "QC Review", cls: "pvc-status-progress" };
      case "on-hold":
        return { label: "On Hold", cls: "pvc-status-hold" };
      default:
        return { label: "Pending", cls: "pvc-status-pending" };
    }
  };

  const allRows = useMemo(() => {
    return criminalCases.map((c) => {
      const fields = c.check_details?.criminal?.fields || {};
      const documents = c.check_details?.criminal?.documents || {};
      const docCount = Object.keys(documents).length;
      const tat = c.check_tat?.criminal;
      const tatLabel = tat && (tat.working_days || tat.calendar_days)
        ? `${tat.working_days || tat.calendar_days} Days`
        : "-";

      return {
        caseId: c.case_id,
        photo: documents?.candidate_photo?.url || null,
        name: fields.candidateName || c.candidate,
        client: c.client,
        clientId: c.client_id,
        refNo: fields.referenceNo || c.case_id,
        mode: fields.verificationType || "Online",
        status: c.status,
        verifier: c.assigned_verifier || "Unassigned",
        tat: tatLabel,
        docCount,
      };
    });
  }, [criminalCases]);

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        if (!row.name?.toLowerCase().includes(s) && !row.refNo?.toLowerCase().includes(s)) {
          return false;
        }
      }
      if (selectedClient && String(row.clientId) !== String(selectedClient)) return false;
      if (selectedStatus && row.status !== selectedStatus) return false;
      if (selectedMode && row.mode !== selectedMode) return false;
      return true;
    });
  }, [allRows, searchTerm, selectedClient, selectedStatus, selectedMode]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

  // ── New Verification form state ──────────────────────────────────────
  const [formData, setFormData] = useState(EMPTY_FORM());
  const [selectedCandidateKey, setSelectedCandidateKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [candidatePhotoPreview, setCandidatePhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedCase = useMemo(
    () => criminalCases.find((c) => c.case_id === selectedCandidateKey) || null,
    [criminalCases, selectedCandidateKey]
  );

  const selectedCaseDocuments = selectedCase?.check_details?.criminal?.documents || {};

  // Pre-fill from whatever criminal check details are already saved on the
  // selected case, so re-opening a case doesn't blank the form.
  useEffect(() => {
    if (!selectedCase) {
      setFormData(EMPTY_FORM());
      setCandidatePhotoPreview(null);
      return;
    }
    const savedFields = selectedCase.check_details?.criminal?.fields;
    setFormData({
      ...EMPTY_FORM(),
      candidateName: selectedCase.candidate || "",
      candidateId: selectedCase.case_id || "",
      ...(savedFields || {}),
    });
    setCandidatePhotoPreview(selectedCaseDocuments?.candidate_photo?.url || null);
  }, [selectedCase]); // eslint-disable-line react-hooks/exhaustive-deps

  const candidateOptions = useMemo(
    () => criminalCases.map((c) => ({
      key: c.case_id,
      label: `${c.candidate || "Unnamed Candidate"} — ${c.case_id} (${c.client || "No client"})`,
    })),
    [criminalCases]
  );

  // ── Save form fields — PATCH /cases/{caseId}/checks/criminal, same
  // route family Employment/Education already use ──────────────────────
  const handleSaveCase = async () => {
    if (!selectedCase) {
      alert("Select an existing candidate case first.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/api/cases/${selectedCase.case_id}/checks/criminal`,
        {
          method: "PATCH",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({ fields: formData }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Save failed");
      }
      await fetchCases();
      alert("Police verification details saved successfully!");
      setActiveTab("verification");
      setSelectedCandidateKey("");
    } catch (err) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Upload a document — POST /cases/{caseId}/checks/criminal/documents
  const uploadDocument = async (file, docKey) => {
    if (!selectedCase) {
      alert("Select an existing candidate case first.");
      return;
    }
    if (!docKey) {
      alert("Choose a document type first.");
      return;
    }
    setUploading(true);
    try {
      const body = new FormData();
      body.append("document_key", docKey);
      body.append("file", file);

      const res = await fetch(
        `${API_URL}/api/cases/${selectedCase.case_id}/checks/criminal/documents`,
        { method: "POST", headers: authHeaders(), body }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Upload failed");
      }
      await fetchCases();
    } catch (err) {
      alert("Failed to upload document: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDragDocChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadDocument(file, "supporting_doc");
  };

  const handleTypeDocChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadDocument(file, documentType || "supporting_doc");
  };

  const handleCandidatePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCandidatePhotoPreview(URL.createObjectURL(file));
    uploadDocument(file, "candidate_photo");
  };

  const uploadedDocRows = useMemo(() => {
    return Object.entries(selectedCaseDocuments)
      .filter(([key]) => key !== "candidate_photo")
      .map(([key, doc]) => ({ key, ...doc }));
  }, [selectedCaseDocuments]);

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main className="pvc-main-wrapper">
          {/* Top Header Bar */}
          <div className="pvc-top-header">
            <h2 className="pvc-page-title">POLICE VERIFICATION</h2>
            {activeTab === "verification" && (
              <button className="pvc-btn-primary" onClick={() => { setSelectedCandidateKey(""); setActiveTab("new_verification"); }}>
                + New Police Verification
              </button>
            )}
          </div>

          {/* Navigation Tabs Header */}
          <div className="pvc-tabs-header">
            <div className="pvc-tabs-container">
              <button
                className={`pvc-tab-btn ${activeTab === "verification" ? "pvc-active" : ""}`}
                onClick={() => setActiveTab("verification")}
              >
                Police Verification
              </button>
              <button
                className={`pvc-tab-btn ${activeTab === "new_verification" ? "pvc-active" : ""}`}
                onClick={() => setActiveTab("new_verification")}
              >
                New Police Verification
              </button>
            </div>
          </div>

          {/* TAB 1: DATA TABLE VIEW */}
          {activeTab === "verification" && (
            <div className="pvc-card-container">
              {/* Filter Bar */}
              <div className="pvc-filter-bar">
                <input
                  type="text"
                  className="pvc-filter-input"
                  placeholder="🔍 Search Candidate Name / Ref No."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
                <select
                  className="pvc-filter-select"
                  value={selectedClient}
                  onChange={(e) => { setSelectedClient(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">
                    {clientsLoading ? "Loading clients…" : "Select Client"}
                  </option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.company_name || c.name}</option>
                  ))}
                </select>
                <select
                  className="pvc-filter-select"
                  value={selectedStatus}
                  onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="qc-review">QC Review</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                <select
                  className="pvc-filter-select"
                  value={selectedMode}
                  onChange={(e) => { setSelectedMode(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                <input type="text" className="pvc-filter-input" placeholder="📅 From Date - To Date" disabled />
              </div>

              {clientsError && <div className="pvc-banner-error">⚠ {clientsError}</div>}
              {casesError && <div className="pvc-banner-error">⚠ {casesError}</div>}

              {/* Responsive Scrollable Table Container */}
              <div className="pvc-table-responsive">
                <table className="pvc-data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>Candidate Name</th>
                      <th>Client Name</th>
                      <th>Reference No.</th>
                      <th>Mode</th>
                      <th>Verification Type</th>
                      <th>Status</th>
                      <th>Assigned Verifier</th>
                      <th>TAT</th>
                      <th>Document</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {casesLoading ? (
                      <tr><td colSpan={12} style={{ padding: 16, textAlign: "center", color: "#94a3b8" }}>Loading…</td></tr>
                    ) : currentRows.length === 0 ? (
                      <tr><td colSpan={12} style={{ padding: 16, textAlign: "center", color: "#94a3b8" }}>No criminal verification cases found.</td></tr>
                    ) : (
                      currentRows.map((row, i) => {
                        const badge = statusBadgeInfo(row.status);
                        return (
                          <tr key={row.caseId}>
                            <td>{indexOfFirstRow + i + 1}</td>
                            <td>
                              <img
                                src={row.photo || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='%23e2e8f0'/%3E%3C/svg%3E"}
                                alt={row.name}
                                className="pvc-avatar-img"
                              />
                            </td>
                            <td>
                              <a
                                href={`/CriminalUserProfile?case_id=${encodeURIComponent(row.caseId)}`}
                                style={{ color: "#2563eb", textDecoration: "none", cursor: "pointer", fontWeight: 600 }}
                                onClick={(e) => { e.preventDefault(); navigate(`/CriminalUserProfile?case_id=${encodeURIComponent(row.caseId)}`); }}
                                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                              >
                                {row.name}
                              </a>
                            </td>
                            <td>{row.client}</td>
                            <td>{row.refNo}</td>
                            <td>
                              <span className={`pvc-badge-mode ${row.mode === "Online" ? "pvc-mode-online" : "pvc-mode-offline"}`}>
                                {row.mode}
                              </span>
                            </td>
                            <td>Police Verification</td>
                            <td>
                              <span className={`pvc-status-badge ${badge.cls}`}>{badge.label}</span>
                            </td>
                            <td>{row.verifier}</td>
                            <td>{row.tat}</td>
                            <td>
                              <button className="pvc-doc-link" onClick={() => navigate(`/CriminalUserProfile?case_id=${encodeURIComponent(row.caseId)}`)}>
                                📄 View ({row.docCount})
                              </button>
                            </td>
                            <td>
                              <button
                                className="pvc-btn-view"
                                onClick={() => navigate(`/CriminalUserProfile?case_id=${encodeURIComponent(row.caseId)}`)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="pvc-pagination-container">
                <span>
                  Showing {filteredRows.length === 0 ? 0 : indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredRows.length)} of {filteredRows.length} entries
                </span>
                <div className="pvc-pagination-btns">
                  <button className="pvc-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`pvc-page-btn ${currentPage === i + 1 ? "pvc-active-page" : ""}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button className="pvc-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NEW POLICE VERIFICATION FORM */}
          {activeTab === "new_verification" && (
            <div className="pvc-form-container">
              <div className="pvc-form-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "20px" }}>🛡️</span>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e2761", margin: 0 }}>New Police Verification</h2>
                </div>
              </div>

              {casesError && <div className="pvc-banner-error">⚠ {casesError}</div>}
              {!casesLoading && criminalCases.length === 0 && (
                <div className="pvc-banner-info">
                  No cases with a "Criminal" check found yet. Create one from Add Case and select the Criminal check type first.
                </div>
              )}

              {/* Case Selection */}
              <div className="pvc-form-section">
                <h3 className="pvc-section-title">Select Candidate Case</h3>
                <div className="pvc-form-group">
                  <label className="pvc-form-label">Candidate / Case *</label>
                  <select
                    className="pvc-form-select"
                    value={selectedCandidateKey}
                    onChange={(e) => setSelectedCandidateKey(e.target.value)}
                  >
                    <option value="">
                      {casesLoading ? "Loading candidates…" : "— Select Candidate Case —"}
                    </option>
                    {candidateOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section 1: Candidate Details */}
              <div className="pvc-form-section">
                <h3 className="pvc-section-title">Candidate Details</h3>
                <div className="pvc-grid-4">
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Candidate Name *</label>
                    <input type="text" name="candidateName" value={formData.candidateName} onChange={handleInputChange} placeholder="Enter candidate name" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Candidate ID / Reference No. *</label>
                    <input type="text" name="candidateId" value={formData.candidateId} onChange={handleInputChange} placeholder="Enter candidate ID" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Client Name</label>
                    <input type="text" value={selectedCase?.client || ""} disabled className="pvc-form-input" />
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Job Role</label>
                    <input type="text" name="jobRole" value={formData.jobRole} onChange={handleInputChange} placeholder="Enter job role" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                </div>
              </div>

              {/* Section 2: Verification Details */}
              <div className="pvc-form-section">
                <h3 className="pvc-section-title">Verification Details</h3>

                <div className="pvc-grid-4" style={{ marginBottom: "16px" }}>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Verification Type *</label>
                    <div className="pvc-radio-group">
                      <label className="pvc-radio-label">
                        <input type="radio" name="verificationType" value="Online" checked={formData.verificationType === "Online"} onChange={handleInputChange} disabled={!selectedCase} /> Online
                      </label>
                      <label className="pvc-radio-label">
                        <input type="radio" name="verificationType" value="Offline" checked={formData.verificationType === "Offline"} onChange={handleInputChange} disabled={!selectedCase} /> Offline
                      </label>
                    </div>
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Police Verification Mode *</label>
                    <select name="policeVerificationMode" value={formData.policeVerificationMode} onChange={handleInputChange} className="pvc-form-select" disabled={!selectedCase}>
                      <option value="">Select Mode</option>
                      <option value="Online Portal">Online Portal</option>
                      <option value="Police Station Visit">Police Station Visit</option>
                      <option value="Third-Party Agency">Third-Party Agency</option>
                      <option value="Advocate Search">Advocate Search</option>
                    </select>
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">State *</label>
                    <select name="state" value={formData.state} onChange={handleInputChange} className="pvc-form-select" disabled={!selectedCase}>
                      <option value="">Select State</option>
                      {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">District *</label>
                    <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Enter district" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                </div>

                <div className="pvc-grid-1-3">
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Reference No. (if any)</label>
                    <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} placeholder="Enter reference number" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Case Details / Remarks</label>
                    <input type="text" name="caseDetails" value={formData.caseDetails} onChange={handleInputChange} placeholder="Enter case details / remarks" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                </div>

                <div className="pvc-grid-2-1-1">
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Purpose of Verification *</label>
                    <select name="purposeOfVerification" value={formData.purposeOfVerification} onChange={handleInputChange} className="pvc-form-select" disabled={!selectedCase}>
                      <option value="">Select Purpose</option>
                      <option value="Pre-Employment">Pre-Employment</option>
                      <option value="Employment Renewal">Employment Renewal</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Expected TAT (Days) *</label>
                    <input type="number" name="expectedTat" value={formData.expectedTat} onChange={handleInputChange} placeholder="Enter expected TAT" className="pvc-form-input" disabled={!selectedCase} />
                  </div>
                  <div className="pvc-form-group">
                    <label className="pvc-form-label">Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} className="pvc-form-select" disabled={!selectedCase}>
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottom Upload & Photograph Grid */}
              <div className="pvc-bottom-grid">
                <div className="pvc-form-section">
                  <h3 className="pvc-section-title">Documents Upload</h3>

                  <div
                    className="pvc-upload-box"
                    onClick={() => selectedCase && dragDocInputRef.current.click()}
                    style={{ opacity: selectedCase ? 1 : 0.5, cursor: selectedCase ? "pointer" : "not-allowed" }}
                  >
                    <input type="file" ref={dragDocInputRef} className="pvc-file-input-hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleDragDocChange} />
                    <span className="pvc-upload-icon">☁️</span>
                    <p className="pvc-upload-title">{uploading ? "Uploading…" : "Upload Supporting Documents"}</p>
                    <span className="pvc-upload-subtext">Click to upload (PDF, JPG, PNG - Max 10MB)</span>
                  </div>

                  <div className="pvc-upload-type-row">
                    <div style={{ flex: 1 }} className="pvc-form-group">
                      <label className="pvc-form-label">Select Document Type</label>
                      <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="pvc-form-select" disabled={!selectedCase}>
                        <option value="">Select Document Type</option>
                        <option value="aadhar_card">Aadhar Card</option>
                        <option value="pan_card">PAN Card</option>
                        <option value="voter_id">Voter ID</option>
                        <option value="police_clearance">Police Clearance Certificate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <input type="file" id="pvc-choose-doc-file" ref={chooseDocInputRef} className="pvc-file-input-hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleTypeDocChange} />
                      <label
                        htmlFor="pvc-choose-doc-file"
                        className="pvc-btn-outline"
                        style={{ opacity: selectedCase ? 1 : 0.5, pointerEvents: selectedCase ? "auto" : "none" }}
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="pvc-form-label">Uploaded Documents</label>
                    <table className="pvc-docs-table">
                      <thead>
                        <tr>
                          <th>Document Name</th>
                          <th>Document Type</th>
                          <th>Uploaded On</th>
                          <th>Uploaded By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedDocRows.length === 0 ? (
                          <tr><td colSpan="4" style={{ textAlign: "center", color: "#94a3b8" }}>No documents uploaded yet.</td></tr>
                        ) : (
                          uploadedDocRows.map((doc) => (
                            <tr key={doc.key}>
                              <td>
                                <a href={doc.url} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>{doc.name || doc.key}</a>
                              </td>
                              <td>{doc.key}</td>
                              <td>{doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : "-"}</td>
                              <td>{doc.uploaded_by || "-"}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pvc-form-section">
                  <h3 className="pvc-section-title">Candidate Photograph</h3>
                  <div
                    className="pvc-upload-box"
                    style={{ marginBottom: "16px", opacity: selectedCase ? 1 : 0.5, cursor: selectedCase ? "pointer" : "not-allowed" }}
                    onClick={() => selectedCase && candidatePhotoInputRef.current.click()}
                  >
                    <input type="file" ref={candidatePhotoInputRef} className="pvc-file-input-hidden" accept="image/jpeg, image/png" onChange={handleCandidatePhotoChange} />
                    <span className="pvc-upload-icon">👤</span>
                    <p className="pvc-upload-title">{uploading ? "Uploading…" : "Upload Candidate Photo"}</p>
                    <span className="pvc-upload-subtext">Click to upload (JPG, PNG - Max 10MB)</span>
                  </div>
                  <div className="pvc-photo-preview">
                    <img
                      src={candidatePhotoPreview || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='90'%3E%3Crect width='80' height='90' fill='%23e2e8f0'/%3E%3C/svg%3E"}
                      alt="Candidate"
                      className="pvc-photo-img"
                    />
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pvc-form-actions">
                <button type="button" className="pvc-btn-cancel" onClick={() => setActiveTab("verification")}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="pvc-btn-primary"
                  style={{ padding: "10px 24px" }}
                  onClick={handleSaveCase}
                  disabled={!selectedCase || saving}
                >
                  {saving ? "Saving…" : "Save & Continue →"}
                </button>
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
}
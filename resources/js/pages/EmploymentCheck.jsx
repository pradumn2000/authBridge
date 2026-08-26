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
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function EmploymentCheck() {
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    employeeId: "",
    employmentType: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    hrContactName: "",
    hrContactDetails: "",
    verificationMode: "",
    employmentStatusConfirmed: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    console.log("Draft Saved:", formData);
    alert("Draft saved successfully!");
  };

  const handleSaveAndMarkDone = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Saved and Marked Done!");

    // Reset form after submission
    setFormData({
      companyName: "",
      designation: "",
      employeeId: "",
      employmentType: "",
      dateOfJoining: "",
      dateOfLeaving: "",
      hrContactName: "",
      hrContactDetails: "",
      verificationMode: "",
      employmentStatusConfirmed: "",
      remarks: "",
    });
  };

  return (
    <>
      {/* 1. Sidebar (Fixed 270px) */}
      <Sidebar />

      {/* 2. Main Layout Section */}
      <section id="content">
        <Header />

        <main>
          <div style={styles.container}>
            <form style={styles.card}>
              <h2 style={styles.title}>Employment Verification Check</h2>

              {/* Row 1: Company Name & Designation */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>COMPANY NAME</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>DESIGNATION</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter designation..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 2: Employee ID & Employment Type */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>EMPLOYEE ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Enter employee id..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>EMPLOYMENT TYPE</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">— Select —</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date of Joining & Date of Leaving */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DATE OF JOINING</label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>DATE OF LEAVING</label>
                  <input
                    type="date"
                    name="dateOfLeaving"
                    value={formData.dateOfLeaving}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 4: HR Contact Name & HR Contact Details */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>HR CONTACT NAME</label>
                  <input
                    type="text"
                    name="hrContactName"
                    value={formData.hrContactName}
                    onChange={handleChange}
                    placeholder="Enter HR contact name..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>HR CONTACT (EMAIL / PHONE)</label>
                  <input
                    type="text"
                    name="hrContactDetails"
                    value={formData.hrContactDetails}
                    onChange={handleChange}
                    placeholder="Enter HR email or phone..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 5: Verification Mode & Employment Status Confirmed */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>VERIFICATION MODE</label>
                  <select
                    name="verificationMode"
                    value={formData.verificationMode}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">— Select —</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Portal">Portal</option>
                    <option value="Physical">Physical</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>EMPLOYMENT STATUS CONFIRMED?</label>
                  <select
                    name="employmentStatusConfirmed"
                    value={formData.employmentStatusConfirmed}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">— Select —</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Remarks */}
              <div style={styles.formGroupFull}>
                <label style={styles.label}>REMARKS</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks..."
                  rows={4}
                  style={styles.textarea}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  style={styles.btnSaveDraft}
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndMarkDone}
                  style={styles.btnSaveDone}
                >
                  ✓ Save & Mark Done
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

// Inline Styles — matches EducationCheck.jsx / DatabaseCheck.jsx conventions
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px 28px",
    maxWidth: "850px",
    width: "100%",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    borderTop: "4px solid #1a237e",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "24px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  formGroup: {
    flex: "1 1 calc(50% - 10px)",
    display: "flex",
    flexDirection: "column",
    minWidth: "260px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    width: "100%",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "8px",
    letterSpacing: "0.4px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    resize: "vertical",
    minHeight: "90px",
  },
  buttonContainer: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
  },
  btnSaveDraft: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#23318c",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  btnSaveDone: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#475569",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
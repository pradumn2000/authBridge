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
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function EducationVerification() {
  const [activeTab, setActiveTab] = useState("education");

  // Multi-qualification state according to image
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
    { id: 2, isOpen: false, qualificationType: "", courseStream: "", specialization: "", instituteUniversity: "", boardUniversity: "", studyType: "National", modeOfStudy: "", yearOfPassing: "", educationCharges: "" },
    { id: 3, isOpen: false, qualificationType: "", courseStream: "", specialization: "", instituteUniversity: "", boardUniversity: "", studyType: "National", modeOfStudy: "", yearOfPassing: "", educationCharges: "" },
    { id: 4, isOpen: false, qualificationType: "", courseStream: "", specialization: "", instituteUniversity: "", boardUniversity: "", studyType: "National", modeOfStudy: "", yearOfPassing: "", educationCharges: "" },
    { id: 5, isOpen: false, qualificationType: "", courseStream: "", specialization: "", instituteUniversity: "", boardUniversity: "", studyType: "National", modeOfStudy: "", yearOfPassing: "", educationCharges: "" },
  ]);

  const handleQualificationChange = (id, field, value) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const toggleAccordion = (id) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q))
    );
  };

  const addQualification = () => {
    const newId = qualifications.length > 0 ? Math.max(...qualifications.map((q) => q.id)) + 1 : 1;
    setQualifications((prev) => [
      ...prev,
      {
        id: newId,
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div id="sidebar">
        <Sidebar />
      </div>

      <div id="content">
        <nav>
          <Header />
        </nav>

        <main style={{ padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "24px" }}>
            {/* Header Section with Icon and + Add Qualification Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", width:"100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "#eff6ff", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "20px" }}>
                  📖
                </div>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Education Details</h2>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0 0" }}>Add all educational qualifications of the candidate</p>
                </div>
              </div>

              <button
                onClick={addQualification}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                + Add Qualification
              </button>
            </div>

            {/* Qualification Cards List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              {qualifications.map((q, index) => (
                <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", background: "#ffffff", overflow: "hidden" }}>
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleAccordion(q.id)}
                    style={{
                      display: "flex",
                      justify: "space-between",
                      alignItems: "center",
                      padding: "14px 20px",
                      background: "#ffffff",
                      cursor: "pointer",
                      userSelect: "none",
                      borderBottom: q.isOpen ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: "#94a3b8", fontSize: "14px", cursor: "grab" }}>:::</span>
                      <span style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>Qualification {index + 1}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={(e) => removeQualification(q.id, e)}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "4px",
                          border: "1px solid #fecaca",
                          background: "#fff",
                          color: "#dc2626",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Remove
                      </button>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{q.isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {q.isOpen && (
                    <div style={{ padding: "20px" }}>
                      {/* Row 1: Select Inputs & Text Field */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "20px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Qualification Type <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <select
                            value={q.qualificationType}
                            onChange={(e) => handleQualificationChange(q.id, "qualificationType", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                          >
                            <option value="">Select Qualification Type</option>
                            <option value="10th">10th Standard</option>
                            <option value="12th">12th Standard</option>
                            <option value="Graduation">Graduation</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Course / Stream <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <select
                            value={q.courseStream}
                            onChange={(e) => handleQualificationChange(q.id, "courseStream", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                          >
                            <option value="">Select Course / Stream</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="B.Sc">B.Sc</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>Specialization (Optional)</label>
                          <input
                            type="text"
                            placeholder="Enter Specialization"
                            value={q.specialization}
                            onChange={(e) => handleQualificationChange(q.id, "specialization", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Institute / University <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <select
                            value={q.instituteUniversity}
                            onChange={(e) => handleQualificationChange(q.id, "instituteUniversity", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                          >
                            <option value="">Enter Institute / School / University</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Board / University <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <select
                            value={q.boardUniversity}
                            onChange={(e) => handleQualificationChange(q.id, "boardUniversity", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                          >
                            <option value="">Select Board / University</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Radio & Numbers */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "8px", color: "#1e293b" }}>
                            National / International <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <div style={{ display: "flex", gap: "16px", alignItems: "center", paddingTop: "6px" }}>
                            <label style={{ fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                              <input
                                type="radio"
                                name={`studyType-${q.id}`}
                                value="National"
                                checked={q.studyType === "National"}
                                onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
                                style={{ accentColor: "#2563eb" }}
                              />
                              National
                            </label>
                            <label style={{ fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                              <input
                                type="radio"
                                name={`studyType-${q.id}`}
                                value="International"
                                checked={q.studyType === "International"}
                                onChange={(e) => handleQualificationChange(q.id, "studyType", e.target.value)}
                                style={{ accentColor: "#2563eb" }}
                              />
                              International
                            </label>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Mode of Study <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <select
                            value={q.modeOfStudy}
                            onChange={(e) => handleQualificationChange(q.id, "modeOfStudy", e.target.value)}
                            style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                          >
                            <option value="">Select Mode of Study</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Year of Passing <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <select
                              value={q.yearOfPassing}
                              onChange={(e) => handleQualificationChange(q.id, "yearOfPassing", e.target.value)}
                              style={{ width: "100%", padding: "9px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", color: "#64748b", outline: "none" }}
                            >
                              <option value="">Select Year</option>
                            </select>
                            <span style={{ position: "absolute", right: "12px", top: "10px", fontSize: "14px", color: "#94a3b8", pointerEvents: "none" }}>📅</span>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
                            Education Charges (INR) <span style={{ color: "#dc2626" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: "12px", top: "9px", fontSize: "13px", color: "#64748b" }}>₹</span>
                            <input
                              type="text"
                              placeholder="Enter Amount"
                              value={q.educationCharges}
                              onChange={(e) => handleQualificationChange(q.id, "educationCharges", e.target.value)}
                              style={{ width: "100%", padding: "9px 12px 9px 28px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", outline: "none" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Upload Documents */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "12px", color: "#1e293b" }}>
                          Upload Documents <span style={{ color: "#dc2626" }}>*</span>
                        </label>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
                          {[
                            { label: "Marksheet(s)", req: true, note: null },
                            { label: "Passing Certificate", req: true, note: null },
                            { label: "Degree Certificate", req: false, note: "(if applicable)" },
                            { label: "Other Document", req: false, note: "(if any)" },
                          ].map((doc, idx) => (
                            <div
                              key={idx}
                              style={{
                                border: "1px solid #f1f5f9",
                                borderRadius: "8px",
                                padding: "16px",
                                background: "#fafafa",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b", marginBottom: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                                {doc.label} {doc.req && <span style={{ color: "#dc2626" }}>*</span>} {doc.note && <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 400 }}>{doc.note}</span>}{" "}
                                <span style={{ color: "#94a3b8", fontSize: "12px" }}>ⓘ</span>
                              </span>

                              <div style={{ border: "1px dashed #cbd5e1", borderRadius: "6px", width: "100%", padding: "16px 8px", textAlign: "center", background: "#fff" }}>
                                <label style={{ cursor: "pointer", display: "block" }}>
                                  <div style={{ color: "#2563eb", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>☁ Upload</div>
                                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>or drag & drop</span>
                                  <input type="file" style={{ display: "none" }} />
                                </label>
                              </div>

                              <span style={{ fontSize: "10px", color: "#94a3b8", marginTop: "8px" }}>Supported: PDF, JPG, PNG</span>
                            </div>
                          ))}

                          {/* File Format Card */}
                          <div
                            style={{
                              border: "1px solid #f1f5f9",
                              borderRadius: "8px",
                              padding: "16px",
                              background: "#f8fafc",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justify: "center",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ background: "#eff6ff", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", marginBottom: "8px" }}>
                              📄
                            </div>
                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>Allowed file types</span>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginTop: "2px" }}>PDF, JPG, PNG</span>
                            <div style={{ borderTop: "1px solid #e2e8f0", width: "80%", margin: "10px 0" }}></div>
                            <span style={{ fontSize: "11px", color: "#64748b" }}>No file size restriction</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Form Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button style={{ padding: "9px 24px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", color: "#334155", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button style={{ padding: "9px 24px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", color: "#334155", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}>Save as Draft</button>
              <button style={{ padding: "9px 24px", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>✈</span> Save & Send for Verification
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
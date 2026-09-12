// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function CourtPoliceCheck() {
//   const [formData, setFormData] = useState({
//     courtsChecked: "",
//     policeRecordCheck: "",
//     caseDetails: "",
//     state: "",
//     district: "",
//     verificationMode: "",
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

//     // State reset
//     setFormData({
//       courtsChecked: "",
//       policeRecordCheck: "",
//       caseDetails: "",
//       state: "",
//       district: "",
//       verificationMode: "",
//       remarks: "",
//     });
//   };

//   return (
//     <>
//       {/* 1. Sidebar */}
//       <Sidebar />

//       {/* 2. Main Layout Section */}
//       <section id="content">
//         <Header />

//         <main>
//           <div style={styles.container}>
//             <form style={styles.card}>
//               <h2 style={styles.title}>Court & Police Verification Check</h2>

//               {/* Row 1: Courts Checked & Police Record Check */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>COURTS CHECKED</label>
//                   <input
//                     type="text"
//                     name="courtsChecked"
//                     value={formData.courtsChecked}
//                     onChange={handleChange}
//                     placeholder="Enter courts checked..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>POLICE RECORD CHECK</label>
//                   <select
//                     name="policeRecordCheck"
//                     value={formData.policeRecordCheck}
//                     onChange={handleChange}
//                     style={styles.select}
//                   >
//                     <option value="">— Select —</option>
//                     <option value="Clear">Clear</option>
//                     <option value="Record Found">Record Found</option>
//                     <option value="Pending">Pending</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Row 2: Case Details (If Any) */}
//               <div style={styles.formGroupFull}>
//                 <label style={styles.label}>CASE DETAILS (IF ANY)</label>
//                 <textarea
//                   name="caseDetails"
//                   value={formData.caseDetails}
//                   onChange={handleChange}
//                   placeholder="Enter case details (if any)..."
//                   rows={4}
//                   style={styles.textarea}
//                 />
//               </div>

//               {/* Row 3: State & District */}
//               <div style={styles.row}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>STATE</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="Enter state..."
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>DISTRICT</label>
//                   <input
//                     type="text"
//                     name="district"
//                     value={formData.district}
//                     onChange={handleChange}
//                     placeholder="Enter district..."
//                     style={styles.input}
//                   />
//                 </div>
//               </div>

//               {/* Row 4: Verification Mode */}
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
//                     <option value="Online Portal">Online Portal</option>
//                     <option value="Police Station Visit">Police Station Visit</option>
//                     <option value="Advocate Search">Advocate Search</option>
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}></div>
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

// // Cleaned Inline Styles
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
//     marginBottom: "16px",
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
//     backgroundColor: "#93a3be",
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

export default function CourtPoliceCheck() {
  // Active Tab State: 'verification' | 'new_verification'
  const [activeTab, setActiveTab] = useState("verification");

  // Table Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    courtsChecked: "",
    policeRecordCheck: "",
    caseDetails: "",
    state: "",
    district: "",
    verificationMode: "",
    remarks: "",
  });

  // Table Data Sample
  const tableData = [
    { id: 1, photo: "https://via.placeholder.com/32", name: "Amit Sharma", client: "ABC Pvt. Ltd.", refNo: "PV-001234", mode: "Online", type: "Police Verification", status: "In Progress", verifier: "Rohit Verma", tat: "5 Days", docs: "View (2)" },
    { id: 2, photo: "https://via.placeholder.com/32", name: "Priya Singh", client: "XYZ Corp.", refNo: "PV-001235", mode: "Offline", type: "Police Verification", status: "Completed", verifier: "Neha Kapoor", tat: "-", docs: "View (3)" },
    { id: 3, photo: "https://via.placeholder.com/32", name: "Rahul Mehta", client: "Global Tech Ltd.", refNo: "PV-001236", mode: "Online", type: "Police Verification", status: "Pending", verifier: "Suresh Yadav", tat: "7 Days", docs: "View (1)" },
    { id: 4, photo: "https://via.placeholder.com/32", name: "Sneha Patel", client: "Bright Future Ltd.", refNo: "PV-001237", mode: "Offline", type: "Police Verification", status: "Completed", verifier: "Anjali Sharma", tat: "-", docs: "View (2)" },
    { id: 5, photo: "https://via.placeholder.com/32", name: "Vikram Reddy", client: "Tech Solutions", refNo: "PV-001238", mode: "Online", type: "Police Verification", status: "In Progress", verifier: "Rohit Verma", tat: "4 Days", docs: "View (1)" },
  ];

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

    setFormData({
      courtsChecked: "",
      policeRecordCheck: "",
      caseDetails: "",
      state: "",
      district: "",
      verificationMode: "",
      remarks: "",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return { bg: "#dcfce7", color: "#166534" };
      case "In Progress":
        return { bg: "#fef3c7", color: "#92400e" };
      case "Pending":
        return { bg: "#f1f5f9", color: "#475569" };
      case "Rejected":
        return { bg: "#fee2e2", color: "#991b1b" };
      default:
        return { bg: "#f1f5f9", color: "#475569" };
    }
  };

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        <main style={{ padding: "24px", backgroundColor: "#f8fafc" }}>
          
          {/* Top Title & Conditional Action Button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              POLICE VERIFICATION – DATA TABLE
            </h2>

            {/* Hidden when activeTab === "new_verification" */}
            {activeTab === "verification" && (
              <button
                onClick={() => setActiveTab("new_verification")}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + New Police Verification
              </button>
            )}
          </div>

          {/* Navigation Tabs Header */}
          <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "32px" }}>
              <button
                onClick={() => setActiveTab("verification")}
                style={{
                  padding: "8px 0 12px 0",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "verification" ? 700 : 500,
                  fontSize: "15px",
                  color: activeTab === "verification" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "verification" ? "3px solid #1e2761" : "none",
                  cursor: "pointer",
                }}
              >
                Police Verification
              </button>
              <button
                onClick={() => setActiveTab("new_verification")}
                style={{
                  padding: "8px 0 12px 0",
                  border: "none",
                  background: "transparent",
                  fontWeight: activeTab === "new_verification" ? 700 : 500,
                  fontSize: "15px",
                  color: activeTab === "new_verification" ? "#1e2761" : "#64748b",
                  borderBottom: activeTab === "new_verification" ? "3px solid #1e2761" : "none",
                  cursor: "pointer",
                }}
              >
                New police verification
              </button>
            </div>
          </div>

          {/* TAB 1: DATA TABLE VIEW */}
          {activeTab === "verification" && (
            <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "16px" }}>
              
              {/* Filter Bar */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="🔍 Search by Candidate Name / Reference No."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                />
                <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}>
                  <option value="">Select Client</option>
                  <option value="ABC Pvt. Ltd.">ABC Pvt. Ltd.</option>
                </select>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}>
                  <option value="">Select Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}>
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                <input
                  type="text"
                  placeholder="📅 From Date - To Date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                />
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", color: "#2563eb", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "12px" }}>#</th>
                      <th style={{ padding: "12px" }}>Candidate Photo</th>
                      <th style={{ padding: "12px" }}>Candidate Name</th>
                      <th style={{ padding: "12px" }}>Client Name</th>
                      <th style={{ padding: "12px" }}>Reference No.</th>
                      <th style={{ padding: "12px" }}>Mode</th>
                      <th style={{ padding: "12px" }}>Verification Type</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Assigned Verifier</th>
                      <th style={{ padding: "12px" }}>TAT</th>
                      <th style={{ padding: "12px" }}>Document</th>
                      <th style={{ padding: "12px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => {
                      const badge = getStatusBadge(row.status);
                      return (
                        <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px", fontWeight: 600 }}>{row.id}</td>
                          <td style={{ padding: "12px" }}>
                            <img src={row.photo} alt={row.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                          </td>
                          <td style={{ padding: "12px", fontWeight: 600 }}>{row.name}</td>
                          <td style={{ padding: "12px", color: "#64748b" }}>{row.client}</td>
                          <td style={{ padding: "12px", color: "#64748b" }}>{row.refNo}</td>
                          <td style={{ padding: "12px" }}>
                            <span style={{ background: row.mode === "Online" ? "#eff6ff" : "#f3e8ff", color: row.mode === "Online" ? "#2563eb" : "#9333ea", padding: "4px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>
                              {row.mode}
                            </span>
                          </td>
                          <td style={{ padding: "12px", color: "#64748b" }}>{row.type}</td>
                          <td style={{ padding: "12px" }}>
                            <span style={{ background: badge.bg, color: badge.color, padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: "12px" }}>{row.verifier}</td>
                          <td style={{ padding: "12px", color: "#64748b" }}>{row.tat}</td>
                          <td style={{ padding: "12px" }}>
                            <button style={{ border: "none", background: "none", color: "#2563eb", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
                              📄 {row.docs}
                            </button>
                          </td>
                          <td style={{ padding: "12px" }}>
                            <button style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                              👁 View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: COURT & POLICE FORM VIEW */}
          {activeTab === "new_verification" && (
            <div style={styles.container}>
              <form style={styles.card}>
                <h2 style={styles.title}>Court & Police Verification Check</h2>

                {/* Row 1: Courts Checked & Police Record Check */}
                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>COURTS CHECKED</label>
                    <input
                      type="text"
                      name="courtsChecked"
                      value={formData.courtsChecked}
                      onChange={handleChange}
                      placeholder="Enter courts checked..."
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>POLICE RECORD CHECK</label>
                    <select
                      name="policeRecordCheck"
                      value={formData.policeRecordCheck}
                      onChange={handleChange}
                      style={styles.select}
                    >
                      <option value="">— Select —</option>
                      <option value="Clear">Clear</option>
                      <option value="Record Found">Record Found</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Case Details */}
                <div style={styles.formGroupFull}>
                  <label style={styles.label}>CASE DETAILS (IF ANY)</label>
                  <textarea
                    name="caseDetails"
                    value={formData.caseDetails}
                    onChange={handleChange}
                    placeholder="Enter case details (if any)..."
                    rows={4}
                    style={styles.textarea}
                  />
                </div>

                {/* Row 3: State & District */}
                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>STATE</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state..."
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>DISTRICT</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Enter district..."
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* Row 4: Verification Mode */}
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
                      <option value="Online Portal">Online Portal</option>
                      <option value="Police Station Visit">Police Station Visit</option>
                      <option value="Advocate Search">Advocate Search</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}></div>
                </div>

                {/* Row 5: Remarks */}
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
          )}

        </main>
      </section>
    </>
  );
}

// Cleaned Inline Styles
const styles = {
  container: {
    display: "flex",
    justify: "center",
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
    marginBottom: "16px",
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
    backgroundColor: "#93a3be",
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
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function DatabaseCheck() {
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
//     console.log("Draft Saved:", formData);
//     alert("Draft saved successfully!");
//   };

//   const handleSaveAndMarkDone = (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formData);
//     alert("Saved and Marked Done!");

//     // Reset form after submission
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
//       {/* 1. Sidebar */}
//       <Sidebar />

//       {/* 2. Main Layout Section */}
//       <section id="content">
//         <Header />

//         <main>
//           <div style={styles.container}>
//             <form style={styles.card}>
//               <h2 style={styles.title}>Database Verification Check</h2>

//               {/* Row 1: Databases Checked & Match Found? */}
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
//                   rows={4}
//                   style={styles.textarea}
//                 />
//               </div>

//               {/* Row 3: PAN Verified? & Aadhaar Verified? */}
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
//                     <option value="Pending">Pending</option>
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
//                     <option value="Pending">Pending</option>
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
//     buttonContainer: {
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

export default function DatabaseVerificationCheck() {
  const [showAssignPanel, setShowAssignPanel] = useState(true);
  const [casesToAllocate, setCasesToAllocate] = useState(8);

  const tableData = [
    { id: "CAN-10245", name: "Rahul Verma", client: "ABC Technologies", sources: "PAN, Aadhaar", verifier: "Amit Kumar (VER-1001)", date: "26-Aug-2026 10:38 AM", tat: "24", tatStatus: "On Time", status: "In Progress", updated: "26-Aug-2026 11:30 AM" },
    { id: "CAN-10246", name: "Priya Sharma", client: "XYZ Ltd.", sources: "PAN, Aadhaar", verifier: "Neha Patel (VER-1002)", date: "26-Aug-2026 09:45 AM", tat: "24", tatStatus: "On Time", status: "In Progress", updated: "26-Aug-2026 10:50 AM" },
    { id: "CAN-10247", name: "Amit Gupta", client: "ABC Technologies", sources: "PAN, Aadhaar", verifier: "Amit Kumar (VER-1001)", date: "25-Aug-2026 03:15 PM", tat: "24", tatStatus: "On Time", status: "Completed", updated: "25-Aug-2026 05:05 PM" },
    { id: "CAN-10248", name: "Sneha Patel", client: "PQR Ltd.", sources: "PAN, Aadhaar", verifier: "Neha Patel (VER-1002)", date: "25-Aug-2026 11:00 AM", tat: "24", tatStatus: "On Time", status: "Completed", updated: "25-Aug-2026 02:33 PM" },
    { id: "CAN-10249", name: "Vikram Singh", client: "LMN Solutions", sources: "PAN, Aadhaar", verifier: "Rahul Verma (VER-1003)", date: "25-Aug-2026 08:30 AM", tat: "24", tatStatus: "Overdue", status: "In Progress", updated: "26-Aug-2026 09:15 AM" },
    { id: "CAN-10250", name: "Anjali Mehta", client: "ABC Technologies", sources: "PAN, Aadhaar", verifier: "Amit Kumar (VER-1001)", date: "24-Aug-2026 04:00 PM", tat: "24", tatStatus: "On Time", status: "Completed", updated: "24-Aug-2026 06:10 PM" },
    { id: "CAN-10251", name: "Rohit Yadav", client: "XYZ Ltd.", sources: "PAN, Aadhaar", verifier: "Neha Patel (VER-1002)", date: "24-Aug-2026 10:15 AM", tat: "24", tatStatus: "Overdue", status: "Discrepancy", updated: "25-Aug-2026 01:40 PM" },
    { id: "CAN-10252", name: "Kavya Nair", client: "LMN Solutions", sources: "PAN, Aadhaar", verifier: "Rahul Verma (VER-1003)", date: "24-Aug-2026 09:00 AM", tat: "24", tatStatus: "On Time", status: "Completed", updated: "24-Aug-2026 11:25 AM" },
    { id: "CAN-10253", name: "Manish Kumar", client: "DEF Enterprises", sources: "PAN, Aadhaar", verifier: "Amit Kumar (VER-1001)", date: "23-Aug-2026 02:30 PM", tat: "24", tatStatus: "Overdue", status: "In Progress", updated: "25-Aug-2026 10:30 AM" },
    { id: "CAN-10254", name: "Pooja Iyer", client: "XYZ Ltd.", sources: "PAN, Aadhaar", verifier: "Neha Patel (VER-1002)", date: "23-Aug-2026 11:45 AM", tat: "24", tatStatus: "On Time", status: "Completed", updated: "23-Aug-2026 01:25 PM" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <main style={{ padding: "20px" }}>
          
          {/* Top Title Bar & Export */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: 0 }}>DATABASE VERIFICATION CHECK</h1>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>Manage and track database verification requests assigned to verifiers</p>
            </div>
            <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>📥</span> Export
            </button>
          </div>

          {/* Top Metric Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "20px" }}>
            {[
              { label: "Total Requests", val: "248", sub: "All Database Verifications", icon: "📄", bg: "#eff6ff", color: "#2563eb" },
              { label: "Assigned", val: "112", sub: "Pending Verification", icon: "👤", bg: "#fff7ed", color: "#ea580c" },
              { label: "In Progress", val: "74", sub: "Verification in Progress", icon: "🕒", bg: "#eff6ff", color: "#0284c7" },
              { label: "Completed", val: "142", sub: "Successfully Completed", icon: "Check", bg: "#f0fdf4", color: "#16a34a" },
              { label: "Discrepancy", val: "18", sub: "Discrepancy Raised", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
            ].map((card, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                  {card.icon === "Check" ? "✓" : card.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>{card.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters Bar */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1.2fr auto auto", gap: "10px", alignItems: "center" }}>
              <input type="text" placeholder="Search by Case ID / Candidate Name..." style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", outline: "none" }} />
              <select style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: "#64748b" }}><option>- All -</option></select>
              <select style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: "#64748b" }}><option>- All -</option></select>
              <select style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: "#64748b" }}><option>- All -</option></select>
              <select style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: "#64748b" }}><option>- All -</option></select>
              <input type="text" defaultValue="26-May-2026 - 26-Aug-2026" style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", color: "#334155" }} />
              <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "7px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Clear</button>
              <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "7px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Apply Filters</button>
            </div>

            <div style={{ marginTop: "12px" }}>
              <button style={{ border: "1px solid #2563eb", background: "#fff", color: "#2563eb", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                + Add New Database Verification
              </button>
            </div>
          </div>

          {/* Main Grid: Table Left + Assign Panel Right */}
          <div style={{ display: "grid", gridTemplateColumns: showAssignPanel ? "1fr 280px" : "1fr", gap: "16px", alignItems: "start" }}>
            
            {/* Left Table Section */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px" }}><input type="checkbox" /></th>
                    <th style={{ padding: "10px" }}>Case ID</th>
                    <th style={{ padding: "10px" }}>Candidate Name</th>
                    <th style={{ padding: "10px" }}>Client</th>
                    <th style={{ padding: "10px" }}>Database Sources</th>
                    <th style={{ padding: "10px" }}>Verifier Name</th>
                    <th style={{ padding: "10px" }}>Assigned Date</th>
                    <th style={{ padding: "10px" }}>TAT (hrs)</th>
                    <th style={{ padding: "10px" }}>TAT Status</th>
                    <th style={{ padding: "10px" }}>Status</th>
                    <th style={{ padding: "10px" }}>Last Updated</th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px" }}><input type="checkbox" /></td>
                      <td style={{ padding: "10px", color: "#2563eb", fontWeight: 600 }}>{row.id}</td>
                      <td style={{ padding: "10px", color: "#0f172a", fontWeight: 600 }}>{row.name}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{row.client}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{row.sources}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{row.verifier}</td>
                      <td style={{ padding: "10px", color: "#64748b" }}>{row.date}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{row.tat}</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{ color: row.tatStatus === "On Time" ? "#16a34a" : "#dc2626", fontWeight: 600 }}>{row.tatStatus}</span>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span style={{
                          background: row.status === "Completed" ? "#f0fdf4" : row.status === "In Progress" ? "#eff6ff" : "#fff7ed",
                          color: row.status === "Completed" ? "#16a34a" : row.status === "In Progress" ? "#2563eb" : "#ea580c",
                          padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px", color: "#64748b" }}>{row.updated}</td>
                      <td style={{ padding: "10px", color: "#94a3b8", cursor: "pointer" }}>⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderTop: "1px solid #e2e8f0", fontSize: "11px", color: "#64748b" }}>
                <span>Showing 1 to 10 of 248 entries</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>‹</button>
                  <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontWeight: 700 }}>1</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>2</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>3</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>...</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>25</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>›</button>
                </div>
              </div>
            </div>

            {/* Right Side Panel (Select Verifier) WITHOUT Allocation Method */}
            {showAssignPanel && (
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                  <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>Select Verifier</h3>
                  <button onClick={() => setShowAssignPanel(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>✕</button>
                </div>

                {/* Verifier Search */}
                <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "11px", boxSizing: "border-box" }} />

                {/* Verifiers List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { name: "Amit Kumar", title: "Education Verifier", cases: 12, checked: true },
                    { name: "Neha Patel", title: "Education Verifier", cases: 8, checked: false },
                    { name: "Rahul Verma", title: "Education Verifier", cases: 15, checked: false },
                  ].map((v, i) => (
                    <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="radio" name="verifierSelect" defaultChecked={v.checked} />
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#cbd5e1" }} />
                        <div>
                          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{v.name}</p>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{v.title}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{v.cases}</span>
                        <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cases to Allocate Stepper */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#374151", marginBottom: "6px" }}>Cases to Allocate</label>
                  <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "6px", width: "fit-content", padding: "2px" }}>
                    <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} style={{ border: "none", background: "none", width: "28px", height: "28px", fontWeight: 700, cursor: "pointer" }}>-</button>
                    <span style={{ width: "32px", textAlign: "center", fontSize: "12px", fontWeight: 700 }}>{casesToAllocate}</span>
                    <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} style={{ border: "none", background: "none", width: "28px", height: "28px", fontWeight: 700, cursor: "pointer" }}>+</button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setShowAssignPanel(false)} style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", padding: "8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                  <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", padding: "8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Allocate Cases</button>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}
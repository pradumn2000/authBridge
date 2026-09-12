// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import "../../css/style.css";
// import Header from "./Header";

// export default function DrugTestVerification() {
//   const [showAssignPanel, setShowAssignPanel] = useState(true);
//   const [casesToAllocate, setCasesToAllocate] = useState(1);
//   const [selectedVerifier, setSelectedVerifier] = useState("Amit Kumar");

//   const tableData = [
//     { id: "CAN-10245", name: "Rahul Verma", client: "ABC Technologies", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "26-Aug-2026", sample: "Yes", result: "Positive", reportDate: "26-Aug-2026 11:20 AM" },
//     { id: "CAN-10246", name: "Priya Sharma", client: "XYZ Ltd.", lab: "Redcliffe Labs", date: "26-Aug-2026", sample: "Yes", result: "Negative", reportDate: "26-Aug-2026 10:50 AM" },
//     { id: "CAN-10247", name: "Amit Gupta", client: "ABC Technologies", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "25-Aug-2026", sample: "Yes", result: "Negative", reportDate: "25-Aug-2026 05:05 PM" },
//     { id: "CAN-10248", name: "Sneha Patel", client: "PQR Ltd.", lab: "Dr. Lal PathLabs", date: "25-Aug-2026", sample: "Yes", result: "Negative", reportDate: "25-Aug-2026 02:20 PM" },
//     { id: "CAN-10249", name: "Vikram Singh", client: "LMN Solutions", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "25-Aug-2026", sample: "Yes", result: "Positive", reportDate: "26-Aug-2026 09:15 AM" },
//     { id: "CAN-10250", name: "Anjali Mehta", client: "ABC Technologies", lab: "Redcliffe Labs", date: "24-Aug-2026", sample: "Yes", result: "Negative", reportDate: "24-Aug-2026 06:10 PM" },
//     { id: "CAN-10251", name: "Rohit Yadav", client: "XYZ Ltd.", lab: "Dr. Lal PathLabs", date: "24-Aug-2026", sample: "Yes", result: "Positive", reportDate: "25-Aug-2026 01:40 PM" },
//     { id: "CAN-10252", name: "Kavya Nair", client: "LMN Solutions", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "24-Aug-2026", sample: "Yes", result: "Negative", reportDate: "24-Aug-2026 11:25 AM" },
//     { id: "CAN-10253", name: "Manish Kumar", client: "DEF Enterprises", lab: "Redcliffe Labs", date: "23-Aug-2026", sample: "Yes", result: "Positive", reportDate: "25-Aug-2026 10:30 AM" },
//     { id: "CAN-10254", name: "Pooja Iyer", client: "XYZ Ltd.", lab: "Dr. Lal PathLabs", date: "23-Aug-2026", sample: "Yes", result: "Negative", reportDate: "23-Aug-2026 01:25 PM" },
//   ];

//   return (
//     <>
//       <style>{`
//         .dtv-wrapper {
//           display: flex;
//           min-height: 100vh;
//           background-color: #f8fafc;
//           font-family: 'Inter', sans-serif;
//         }

//         .dtv-main-content {
//           {/* flex: 1; */}
//           display: flex;
//           flex-direction: column;
//           min-width: 0;
//               width: calc(100% - 270px);
//     transition: all .3s;
//     position: relative;
//     left: 270px;
//         }
// nav {
//     background-color: var(--primary-color);
//     z-index: 9;
//     align-items: center;
//     gap: 20px;
//     height: 66px;
//     padding: 0 24px;
//     display: flex;
//     position: sticky;
//     top: 0;
//     left: 0;
// }
//         .dtv-container {
//           padding: 20px;
//         }

//         /* Top Bar */
//         .dtv-top-bar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//         }

//         .dtv-heading {
//           font-size: 18px;
//           font-weight: 800;
//           color: #0f172a;
//           margin: 0;
//         }

//         .dtv-subheading {
//           font-size: 12px;
//           color: #64748b;
//           margin: 2px 0 0 0;
//         }

//         .dtv-btn-export {
//           border: 1px solid #cbd5e1;
//           background: #ffffff;
//           padding: 8px 14px;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//         }

//         .dtv-btn-primary {
//           border: none;
//           background: #1d4ed8;
//           color: #ffffff;
//           padding: 8px 14px;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         /* Metric Cards */
//         .dtv-metrics-grid {
//           display: grid;
//           grid-template-columns: repeat(5, 1fr);
//           gap: 14px;
//           margin-bottom: 20px;
//         }

//         .dtv-metric-card {
//           background: #ffffff;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           padding: 14px;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .dtv-metric-icon {
//           width: 38px;
//           height: 38px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 16px;
//         }

//         /* Filters Bar */
//         .dtv-filters-card {
//           background: #ffffff;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           padding: 14px;
//           margin-bottom: 16px;
//         }

//         .dtv-filters-grid {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1.2fr auto auto;
//           gap: 10px;
//           align-items: center;
//         }

//         .dtv-field-group label {
//           display: block;
//           font-size: 10px;
//           font-weight: 700;
//           color: #475569;
//           margin-bottom: 4px;
//         }

//         .dtv-field-group input,
//         .dtv-field-group select {
//           width: 100%;
//           padding: 6px 10px;
//           border-radius: 6px;
//           border: 1px solid #cbd5e1;
//           font-size: 12px;
//           color: #334155;
//           box-sizing: border-box;
//         }

//         .dtv-btn-clear {
//           border: 1px solid #cbd5e1;
//           background: #ffffff;
//           padding: 7px 12px;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           margin-top: 14px;
//           cursor: pointer;
//         }

//         .dtv-btn-apply {
//           border: none;
//           background: #1d4ed8;
//           color: #ffffff;
//           padding: 7px 14px;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           margin-top: 14px;
//           cursor: pointer;
//         }

//         /* Content Grid */
//         .dtv-content-grid {
//           display: grid;
//           gap: 16px;
//           align-items: start;
//         }

//         /* Data Table */
//         .dtv-table-card {
//           background: #ffffff;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         .dtv-table {
//           width: 100%;
//           border-collapse: collapse;
//           text-align: left;
//           font-size: 11px;
//         }

//         .dtv-table th {
//           background: #f8fafc;
//           color: #64748b;
//           border-bottom: 1px solid #e2e8f0;
//           padding: 10px 12px;
//         }

//         .dtv-table td {
//           padding: 10px 12px;
//           border-bottom: 1px solid #f1f5f9;
//         }

//         .dtv-badge-positive {
//           background: #fee2e2;
//           color: #991b1b;
//           padding: 3px 8px;
//           border-radius: 4px;
//           font-size: 10px;
//           font-weight: 700;
//         }

//         .dtv-badge-negative {
//           background: #dcfce7;
//           color: #166534;
//           padding: 3px 8px;
//           border-radius: 4px;
//           font-size: 10px;
//           font-weight: 700;
//         }

//         /* Pagination */
//         .dtv-pagination {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 10px 14px;
//           border-top: 1px solid #e2e8f0;
//           font-size: 11px;
//           color: #64748b;
//         }

//         .dtv-page-btn {
//           border: 1px solid #cbd5e1;
//           background: #ffffff;
//           padding: 4px 8px;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .dtv-page-btn.active {
//           border: none;
//           background: #1d4ed8;
//           color: #ffffff;
//           font-weight: 700;
//         }

//         /* Right Panel */
//         .dtv-panel {
//           background: #ffffff;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           padding: 16px;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .dtv-panel-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-bottom: 1px solid #f1f5f9;
//           padding-bottom: 10px;
//         }

//         .dtv-verifier-item {
//           border: 1px solid #e2e8f0;
//           border-radius: 6px;
//           padding: 8px 10px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           cursor: pointer;
//         }

//         .dtv-stepper {
//           display: flex;
//           align-items: center;
//           background: #f8fafc;
//           border: 1px solid #cbd5e1;
//           border-radius: 6px;
//           width: fit-content;
//           padding: 2px;
//         }

//         .dtv-stepper-btn {
//           border: none;
//           background: none;
//           width: 26px;
//           height: 24px;
//           font-weight: 700;
//           cursor: pointer;
//         }
//       `}</style>

//       <div className="dtv-wrapper">
//          <div id="sidebar">
//                 <Sidebar />
//               </div>

//         <div className="dtv-main-content"  id="content">
//           <Header />

//           <main className="dtv-container">
//             {/* Header Action Bar */}
//             <div className="dtv-top-bar">
//               <div>
//                 <h1 className="dtv-heading">DRUG TEST VERIFICATION</h1>
//                 <p className="dtv-subheading">View and manage all drug test verification requests</p>
//               </div>
//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button className="dtv-btn-export">
//                   <span>📥</span> Export
//                 </button>
//                 <button className="dtv-btn-primary">+ New Drug Verification</button>
//               </div>
//             </div>

//             {/* Top Metric Cards */}
//             <div className="dtv-metrics-grid">
//               {[
//                 { val: "248", sub: "All Drug Test Requests", icon: "🧪", bg: "#eff6ff", color: "#2563eb" },
//                 { val: "74", sub: "Reports in Progress", icon: "📋", bg: "#fff7ed", color: "#ea580c" },
//                 { val: "142", sub: "Successfully Completed", icon: "✓", bg: "#f0fdf4", color: "#16a34a" },
//                 { val: "18", sub: "Positive Results", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
//                 { val: "24 hrs", sub: "Turnaround Time", icon: "🕒", bg: "#f3e8ff", color: "#9333ea" },
//               ].map((card, i) => (
//                 <div key={i} className="dtv-metric-card">
//                   <div className="dtv-metric-icon" style={{ background: card.bg, color: card.color }}>
//                     {card.icon}
//                   </div>
//                   <div>
//                     <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
//                     <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>{card.sub}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Filter Options */}
//             <div className="dtv-filters-card">
//               <div className="dtv-filters-grid">
//                 <div className="dtv-field-group">
//                   <label>Search by Case ID / Candidate Name</label>
//                   <input type="text" placeholder="Search..." />
//                 </div>
//                 <div className="dtv-field-group">
//                   <label>Client</label>
//                   <select><option>All</option></select>
//                 </div>
//                 <div className="dtv-field-group">
//                   <label>Lab Name</label>
//                   <select><option>All</option></select>
//                 </div>
//                 <div className="dtv-field-group">
//                   <label>Overall Result</label>
//                   <select><option>All</option></select>
//                 </div>
//                 <div className="dtv-field-group">
//                   <label>Sample Type</label>
//                   <select><option>All</option></select>
//                 </div>
//                 <div className="dtv-field-group">
//                   <label>Date Range</label>
//                   <input type="text" defaultValue="26-May-2026 - 26-Aug-2026" style={{ fontSize: "11px" }} />
//                 </div>
//                 <button className="dtv-btn-clear">Clear</button>
//                 <button className="dtv-btn-apply">Apply Filters</button>
//               </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="dtv-content-grid" style={{ gridTemplateColumns: showAssignPanel ? "1fr 290px" : "1fr" }}>
              
//               {/* Table */}
//               <div className="dtv-table-card">
//                 <table className="dtv-table">
//                   <thead>
//                     <tr>
//                       <th><input type="checkbox" /></th>
//                       <th>Case ID</th>
//                       <th>Candidate Name</th>
//                       <th>Client Name</th>
//                       <th>Lab Name</th>
//                       <th>Test Date ⇕</th>
//                       <th>Sample Type</th>
//                       <th>Overall Result</th>
//                       <th>Report Date</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.map((row, i) => (
//                       <tr key={i}>
//                         <td><input type="checkbox" /></td>
//                         <td style={{ color: "#2563eb", fontWeight: 600 }}>{row.id}</td>
//                         <td style={{ color: "#0f172a", fontWeight: 600 }}>{row.name}</td>
//                         <td style={{ color: "#334155" }}>{row.client}</td>
//                         <td style={{ color: "#334155" }}>{row.lab}</td>
//                         <td style={{ color: "#64748b" }}>{row.date}</td>
//                         <td style={{ color: "#334155" }}>{row.sample}</td>
//                         <td>
//                           <span className={row.result === "Negative" ? "dtv-badge-negative" : "dtv-badge-positive"}>
//                             {row.result}
//                           </span>
//                         </td>
//                         <td style={{ color: "#64748b" }}>{row.reportDate}</td>
//                         <td style={{ color: "#94a3b8", cursor: "pointer", fontSize: "14px" }}>⋮</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {/* Pagination */}
//                 <div className="dtv-pagination">
//                   <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                     <select style={{ padding: "3px 6px", borderRadius: "4px", border: "1px solid #cbd5e1" }}><option>10</option></select>
//                     <span>entries per page</span>
//                   </div>
//                   <div style={{ display: "flex", gap: "4px" }}>
//                     <button className="dtv-page-btn">‹</button>
//                     <button className="dtv-page-btn active">1</button>
//                     <button className="dtv-page-btn">2</button>
//                     <button className="dtv-page-btn">3</button>
//                     <button className="dtv-page-btn">...</button>
//                     <button className="dtv-page-btn">25</button>
//                     <button className="dtv-page-btn">›</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Select Verifier Panel (Allocation Method Redacted) */}
//               {showAssignPanel && (
//                 <div className="dtv-panel">
//                   <div className="dtv-panel-header">
//                     <h3 style={{ margin: 0, fontSize: "12px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase" }}>Select Verifier</h3>
//                     <button onClick={() => setShowAssignPanel(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>^</button>
//                   </div>

//                   <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "11px", boxSizing: "border-box" }} />

//                   {/* List of Verifiers */}
//                   <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                     {[
//                       { name: "Amit Kumar (VER-1001)", role: "Education Verifier", cases: 12 },
//                       { name: "Neha Patel (VER-1002)", role: "Education Verifier", cases: 8 },
//                       { name: "Rahul Verma (VER-1003)", role: "Education Verifier", cases: 15 },
//                     ].map((item, idx) => (
//                       <div key={idx} onClick={() => setSelectedVerifier(item.name)} className="dtv-verifier-item">
//                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <input type="radio" name="verifier" checked={selectedVerifier.includes(item.name.split(" ")[0])} onChange={() => {}} />
//                           <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#cbd5e1" }} />
//                           <div>
//                             <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{item.name}</p>
//                             <span style={{ fontSize: "9px", color: "#64748b" }}>{item.role}</span>
//                           </div>
//                         </div>
//                         <div style={{ textAlign: "right" }}>
//                           <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{item.cases}</span>
//                           <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Cases to Allocate Stepper */}
//                   <div>
//                     <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Cases to Allocate</label>
//                     <div className="dtv-stepper">
//                       <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} className="dtv-stepper-btn">-</button>
//                       <span style={{ width: "30px", textAlign: "center", fontSize: "12px", fontWeight: 700 }}>{casesToAllocate}</span>
//                       <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} className="dtv-stepper-btn">+</button>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <button className="dtv-btn-primary" style={{ width: "100%", padding: "10px", marginTop: "4px" }}>
//                     Assign Verifier
//                   </button>
//                 </div>
//               )}

//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../../css/style.css";
import Header from "./Header";

export default function DrugTestVerification() {
  const [activeTab, setActiveTab] = useState("verification"); // 'verification' | 'new'
  const [showAssignPanel, setShowAssignPanel] = useState(true);
  const [casesToAllocate, setCasesToAllocate] = useState(1);
  const [selectedVerifier, setSelectedVerifier] = useState("Amit Kumar");

  // Form State
  const [formData, setFormData] = useState({
    candidateName: "",
    requestDate: "2026-08-27",
    testType: "",
    sampleType: "",
    collectionDate: "2026-08-27",
    collectionTime: "10:30",
    labName: "",
    labCode: "",
    collectionPersonName: "",
    countryCode: "+91",
    phoneNumber: "",
    labAddress: "",
    tat: "",
    reportFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, reportFile: e.target.files[0] }));
    }
  };

  const tableData = [
    { id: "CAN-10245", name: "Rahul Verma", client: "ABC Technologies", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "26-Aug-2026", sample: "Yes", result: "Positive", reportDate: "26-Aug-2026 11:20 AM" },
    { id: "CAN-10246", name: "Priya Sharma", client: "XYZ Ltd.", lab: "Redcliffe Labs", date: "26-Aug-2026", sample: "Yes", result: "Negative", reportDate: "26-Aug-2026 10:50 AM" },
    { id: "CAN-10247", name: "Amit Gupta", client: "ABC Technologies", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "25-Aug-2026", sample: "Yes", result: "Negative", reportDate: "25-Aug-2026 05:05 PM" },
    { id: "CAN-10248", name: "Sneha Patel", client: "PQR Ltd.", lab: "Dr. Lal PathLabs", date: "25-Aug-2026", sample: "Yes", result: "Negative", reportDate: "25-Aug-2026 02:20 PM" },
    { id: "CAN-10249", name: "Vikram Singh", client: "LMN Solutions", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "25-Aug-2026", sample: "Yes", result: "Positive", reportDate: "26-Aug-2026 09:15 AM" },
    { id: "CAN-10250", name: "Anjali Mehta", client: "ABC Technologies", lab: "Redcliffe Labs", date: "24-Aug-2026", sample: "Yes", result: "Negative", reportDate: "24-Aug-2026 06:10 PM" },
    { id: "CAN-10251", name: "Rohit Yadav", client: "XYZ Ltd.", lab: "Dr. Lal PathLabs", date: "24-Aug-2026", sample: "Yes", result: "Positive", reportDate: "25-Aug-2026 01:40 PM" },
    { id: "CAN-10252", name: "Kavya Nair", client: "LMN Solutions", lab: "HealthCare Diagnostics Pvt. Ltd.", date: "24-Aug-2026", sample: "Yes", result: "Negative", reportDate: "24-Aug-2026 11:25 AM" },
    { id: "CAN-10253", name: "Manish Kumar", client: "DEF Enterprises", lab: "Redcliffe Labs", date: "23-Aug-2026", sample: "Yes", result: "Positive", reportDate: "25-Aug-2026 10:30 AM" },
    { id: "CAN-10254", name: "Pooja Iyer", client: "XYZ Ltd.", lab: "Dr. Lal PathLabs", date: "23-Aug-2026", sample: "Yes", result: "Negative", reportDate: "23-Aug-2026 01:25 PM" },
  ];

  return (
    <>
      <style>{`
        .dtv-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: 'Inter', sans-serif;
        }

        .dtv-main-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: calc(100% - 270px);
          transition: all .3s;
          position: relative;
          left: 270px;
        }

        .dtv-container {
          padding: 20px;
        }

        /* Tabs Styling */
        .dtv-tabs-container {
          display: flex;
          gap: 20px;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 20px;
        }

        .dtv-tab-btn {
          background: none;
          border: none;
          padding: 10px 4px;
          font-size: 14px;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }

        .dtv-tab-btn.active {
          color: #1d4ed8;
        }

        .dtv-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #1d4ed8;
          border-radius: 2px 2px 0 0;
        }

        /* Top Bar */
        .dtv-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .dtv-heading {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .dtv-subheading {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        .dtv-btn-export {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dtv-btn-primary {
          border: none;
          background: #1d4ed8;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Metric Cards */
        .dtv-metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .dtv-metric-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dtv-metric-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        /* Filters Bar */
        .dtv-filters-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 16px;
        }

        .dtv-filters-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1.2fr auto auto;
          gap: 10px;
          align-items: center;
        }

        .dtv-field-group label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 4px;
        }

        .dtv-field-group input,
        .dtv-field-group select {
          width: 100%;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 12px;
          color: #334155;
          box-sizing: border-box;
        }

        .dtv-btn-clear {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 14px;
          cursor: pointer;
        }

        .dtv-btn-apply {
          border: none;
          background: #1d4ed8;
          color: #ffffff;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 14px;
          cursor: pointer;
        }

        /* Content Grid */
        .dtv-content-grid {
          display: grid;
          gap: 16px;
          align-items: start;
        }

        /* Data Table */
        .dtv-table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .dtv-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 11px;
        }

        .dtv-table th {
          background: #f8fafc;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 12px;
        }

        .dtv-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .dtv-badge-positive {
          background: #fee2e2;
          color: #991b1b;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
        }

        .dtv-badge-negative {
          background: #dcfce7;
          color: #166534;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
        }

        /* Pagination */
        .dtv-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-top: 1px solid #e2e8f0;
          font-size: 11px;
          color: #64748b;
        }

        .dtv-page-btn {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .dtv-page-btn.active {
          border: none;
          background: #1d4ed8;
          color: #ffffff;
          font-weight: 700;
        }

        /* Right Panel */
        .dtv-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dtv-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 10px;
        }

        .dtv-verifier-item {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .dtv-stepper {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          width: fit-content;
          padding: 2px;
        }

        .dtv-stepper-btn {
          border: none;
          background: none;
          width: 26px;
          height: 24px;
          font-weight: 700;
          cursor: pointer;
        }

        /* New Form Styling */
        .dtv-form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
        }

        .dtv-form-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .dtv-form-subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 24px 0;
        }

        .dtv-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .dtv-input-group {
          display: flex;
          flex-direction: column;
        }

        .dtv-input-group label {
          font-size: 12px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .dtv-input-group label span {
          color: #ef4444;
          margin-left: 2px;
        }

        .dtv-input-group input,
        .dtv-input-group select,
        .dtv-input-group textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 13px;
          color: #334155;
          box-sizing: border-box;
          outline: none;
          background-color: #ffffff;
        }

        .dtv-input-group input:focus,
        .dtv-input-group select:focus,
        .dtv-input-group textarea:focus {
          border-color: #2563eb;
        }

        .dtv-phone-container {
          display: flex;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          overflow: hidden;
        }

        .dtv-phone-container select {
          width: 80px;
          border: none;
          border-right: 1px solid #cbd5e1;
          border-radius: 0;
          background-color: #f8fafc;
          padding: 10px 6px;
        }

        .dtv-phone-container input {
          border: none;
          border-radius: 0;
        }

        .dtv-upload-zone {
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          background: #fafafa;
          cursor: pointer;
          margin-top: 10px;
          margin-bottom: 24px;
        }

        .dtv-upload-icon {
          font-size: 24px;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .dtv-upload-text {
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 4px;
        }

        .dtv-upload-subtext {
          font-size: 11px;
          color: #94a3b8;
        }

        .dtv-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .dtv-btn-cancel {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #2563eb;
          padding: 10px 24px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .dtv-btn-submit {
          border: none;
          background: #1d4ed8;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="dtv-wrapper">
        <div id="sidebar">
          <Sidebar />
        </div>

        <div className="dtv-main-content" id="content">
          <Header />

          <main className="dtv-container">
            {/* Header Action Bar */}
            <div className="dtv-top-bar">
              <div>
                <h1 className="dtv-heading">DRUG TEST VERIFICATION</h1>
                <p className="dtv-subheading">View and manage all drug test verification requests</p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="dtv-btn-export">
                  <span>📥</span> Export
                </button>
                <button className="dtv-btn-primary" onClick={() => setActiveTab("new")}>
                  + New Drug Verification
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="dtv-tabs-container">
              <button
                className={`dtv-tab-btn ${activeTab === "verification" ? "active" : ""}`}
                onClick={() => setActiveTab("verification")}
              >
                Drug Test Verification
              </button>
              <button
                className={`dtv-tab-btn ${activeTab === "new" ? "active" : ""}`}
                onClick={() => setActiveTab("new")}
              >
                New Drug Verification
              </button>
            </div>

            {/* Tab 1: Drug Test Verification */}
            {activeTab === "verification" && (
              <>
                {/* Top Metric Cards */}
                <div className="dtv-metrics-grid">
                  {[
                    { val: "248", sub: "All Drug Test Requests", icon: "🧪", bg: "#eff6ff", color: "#2563eb" },
                    { val: "74", sub: "Reports in Progress", icon: "📋", bg: "#fff7ed", color: "#ea580c" },
                    { val: "142", sub: "Successfully Completed", icon: "✓", bg: "#f0fdf4", color: "#16a34a" },
                    { val: "18", sub: "Positive Results", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
                    { val: "24 hrs", sub: "Turnaround Time", icon: "🕒", bg: "#f3e8ff", color: "#9333ea" },
                  ].map((card, i) => (
                    <div key={i} className="dtv-metric-card">
                      <div className="dtv-metric-icon" style={{ background: card.bg, color: card.color }}>
                        {card.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
                        <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>{card.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filter Options */}
                <div className="dtv-filters-card">
                  <div className="dtv-filters-grid">
                    <div className="dtv-field-group">
                      <label>Search by Case ID / Candidate Name</label>
                      <input type="text" placeholder="Search..." />
                    </div>
                    <div className="dtv-field-group">
                      <label>Client</label>
                      <select><option>All</option></select>
                    </div>
                    <div className="dtv-field-group">
                      <label>Lab Name</label>
                      <select><option>All</option></select>
                    </div>
                    <div className="dtv-field-group">
                      <label>Overall Result</label>
                      <select><option>All</option></select>
                    </div>
                    <div className="dtv-field-group">
                      <label>Sample Type</label>
                      <select><option>All</option></select>
                    </div>
                    <div className="dtv-field-group">
                      <label>Date Range</label>
                      <input type="text" defaultValue="26-May-2026 - 26-Aug-2026" style={{ fontSize: "11px" }} />
                    </div>
                    <button className="dtv-btn-clear">Clear</button>
                    <button className="dtv-btn-apply">Apply Filters</button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="dtv-content-grid" style={{ gridTemplateColumns: showAssignPanel ? "1fr 290px" : "1fr" }}>
                  {/* Table */}
                  <div className="dtv-table-card">
                    <table className="dtv-table">
                      <thead>
                        <tr>
                          <th><input type="checkbox" /></th>
                          <th>Case ID</th>
                          <th>Candidate Name</th>
                          <th>Client Name</th>
                          <th>Lab Name</th>
                          <th>Test Date ⇕</th>
                          <th>Sample Type</th>
                          <th>Overall Result</th>
                          <th>Report Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, i) => (
                          <tr key={i}>
                            <td><input type="checkbox" /></td>
                            <td style={{ color: "#2563eb", fontWeight: 600 }}>{row.id}</td>
                            <td style={{ color: "#0f172a", fontWeight: 600 }}>{row.name}</td>
                            <td style={{ color: "#334155" }}>{row.client}</td>
                            <td style={{ color: "#334155" }}>{row.lab}</td>
                            <td style={{ color: "#64748b" }}>{row.date}</td>
                            <td style={{ color: "#334155" }}>{row.sample}</td>
                            <td>
                              <span className={row.result === "Negative" ? "dtv-badge-negative" : "dtv-badge-positive"}>
                                {row.result}
                              </span>
                            </td>
                            <td style={{ color: "#64748b" }}>{row.reportDate}</td>
                            <td style={{ color: "#94a3b8", cursor: "pointer", fontSize: "14px" }}>⋮</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="dtv-pagination">
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <select style={{ padding: "3px 6px", borderRadius: "4px", border: "1px solid #cbd5e1" }}><option>10</option></select>
                        <span>entries per page</span>
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button className="dtv-page-btn">‹</button>
                        <button className="dtv-page-btn active">1</button>
                        <button className="dtv-page-btn">2</button>
                        <button className="dtv-page-btn">3</button>
                        <button className="dtv-page-btn">...</button>
                        <button className="dtv-page-btn">25</button>
                        <button className="dtv-page-btn">›</button>
                      </div>
                    </div>
                  </div>

                  {/* Select Verifier Panel */}
                  {showAssignPanel && (
                    <div className="dtv-panel">
                      <div className="dtv-panel-header">
                        <h3 style={{ margin: 0, fontSize: "12px", fontWeight: "800", color: "#0f172a", textTransform: "uppercase" }}>Select Verifier</h3>
                        <button onClick={() => setShowAssignPanel(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>^</button>
                      </div>

                      <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "11px", boxSizing: "border-box" }} />

                      {/* List of Verifiers */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {[
                          { name: "Amit Kumar (VER-1001)", role: "Education Verifier", cases: 12 },
                          { name: "Neha Patel (VER-1002)", role: "Education Verifier", cases: 8 },
                          { name: "Rahul Verma (VER-1003)", role: "Education Verifier", cases: 15 },
                        ].map((item, idx) => (
                          <div key={idx} onClick={() => setSelectedVerifier(item.name)} className="dtv-verifier-item">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <input type="radio" name="verifier" checked={selectedVerifier.includes(item.name.split(" ")[0])} onChange={() => {}} />
                              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#cbd5e1" }} />
                              <div>
                                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{item.name}</p>
                                <span style={{ fontSize: "9px", color: "#64748b" }}>{item.role}</span>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{item.cases}</span>
                              <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cases to Allocate Stepper */}
                      <div>
                        <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Cases to Allocate</label>
                        <div className="dtv-stepper">
                          <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} className="dtv-stepper-btn">-</button>
                          <span style={{ width: "30px", textAlign: "center", fontSize: "12px", fontWeight: 700 }}>{casesToAllocate}</span>
                          <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} className="dtv-stepper-btn">+</button>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="dtv-btn-primary" style={{ width: "100%", padding: "10px", marginTop: "4px" }}>
                        Assign Verifier
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tab 2: New Drug Verification Form (Based on Provided Image) */}
            {activeTab === "new" && (
              <div className="dtv-form-card">
                <h2 className="dtv-form-title">New Drug Test Verification</h2>
                <p className="dtv-form-subtitle">Enter drug test request details</p>

                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Row 1 */}
                  <div className="dtv-form-grid">
                    <div className="dtv-input-group">
                      <label>Candidate Name <span>*</span></label>
                      <select name="candidateName" value={formData.candidateName} onChange={handleInputChange}>
                        <option value="">Select Candidate</option>
                      </select>
                    </div>
                    <div className="dtv-input-group">
                      <label>Request Date <span>*</span></label>
                      <input type="date" name="requestDate" value={formData.requestDate} onChange={handleInputChange} />
                    </div>
                    <div className="dtv-input-group">
                      <label>Test Type <span>*</span></label>
                      <select name="testType" value={formData.testType} onChange={handleInputChange}>
                        <option value="">Select Test Type</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="dtv-form-grid">
                    <div className="dtv-input-group">
                      <label>Sample Type <span>*</span></label>
                      <select name="sampleType" value={formData.sampleType} onChange={handleInputChange}>
                        <option value="">Select Sample Type</option>
                      </select>
                    </div>
                    <div className="dtv-input-group">
                      <label>Collection Date <span>*</span></label>
                      <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} />
                    </div>
                    <div className="dtv-input-group">
                      <label>Collection Time <span>*</span></label>
                      <input type="time" name="collectionTime" value={formData.collectionTime} onChange={handleInputChange} />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="dtv-form-grid">
                    <div className="dtv-input-group">
                      <label>Lab Name <span>*</span></label>
                      <select name="labName" value={formData.labName} onChange={handleInputChange}>
                        <option value="">Select Lab Name</option>
                      </select>
                    </div>
                    <div className="dtv-input-group">
                      <label>Lab Code <span>*</span></label>
                      <input type="text" name="labCode" placeholder="Enter Lab Code" value={formData.labCode} onChange={handleInputChange} />
                    </div>
                    <div className="dtv-input-group">
                      <label>Collection Person Name <span>*</span></label>
                      <input type="text" name="collectionPersonName" placeholder="Enter Collection Person Name" value={formData.collectionPersonName} onChange={handleInputChange} />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="dtv-form-grid">
                    <div className="dtv-input-group">
                      <label>Phone Number <span>*</span></label>
                      <div className="dtv-phone-container">
                        <select name="countryCode" value={formData.countryCode} onChange={handleInputChange}>
                          <option value="+91">🇮🇳 +91</option>
                        </select>
                        <input type="text" name="phoneNumber" placeholder="Enter Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="dtv-input-group">
                      <label>Lab Address <span>*</span></label>
                      <textarea name="labAddress" rows="1" placeholder="Enter Lab Address" value={formData.labAddress} onChange={handleInputChange} />
                    </div>
                    <div className="dtv-input-group">
                      <label>TAT (Turnaround Time) <span>*</span></label>
                      <select name="tat" value={formData.tat} onChange={handleInputChange}>
                        <option value="">Select TAT</option>
                      </select>
                    </div>
                  </div>

                  {/* Report Upload Section */}
                  <div style={{ marginTop: "10px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#1e293b" }}>Report Download</label>
                    <label className="dtv-upload-zone">
                      <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
                      <div className="dtv-upload-icon">📤</div>
                      <div className="dtv-upload-text">Upload Report</div>
                      <div className="dtv-upload-subtext">PDF, JPG, PNG (Max 10MB)</div>
                      {formData.reportFile && (
                        <div style={{ marginTop: "8px", fontSize: "12px", color: "#16a34a", fontWeight: "600" }}>
                          Selected: {formData.reportFile.name}
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="dtv-form-actions">
                    <button type="button" className="dtv-btn-cancel" onClick={() => setActiveTab("verification")}>
                      Cancel
                    </button>
                    <button type="submit" className="dtv-btn-submit">
                      Save & Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
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
import "./EmploymentCheck.css";

export default function EmploymentCheck() {
  const [activeTab, setActiveTab] = useState("allocation");
  const [openEmployer, setOpenEmployer] = useState(1);

  // Pagination States for Table 1 (Company Allocation)
  const [table1Page, setTable1Page] = useState(1);
  const [table1RowsPerPage, setTable1RowsPerPage] = useState(5);

  // Pagination States for Table 2 (Recent Cases)
  const [table2Page, setTable2Page] = useState(1);
  const [table2RowsPerPage, setTable2RowsPerPage] = useState(5);

  // Form State for Employment Cases Tab
  const [formData, setFormData] = useState({
    candidateName: "",
    date: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCase = (e) => {
    e.preventDefault();
    console.log("Saved Case Data:", formData);
    alert("Employment Case Saved Successfully!");
  };

  // Dynamic Pagination Renderer
  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange, onRowsChange) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }

        if (currentPage < totalPages - 2) pages.push("...");
        if (!pages.includes(totalPages)) pages.push(totalPages);
      }
      return pages;
    };

    return (
      <div className="pagination-container">
        {/* Left Side: Showing items count */}
        <div className="pagination-info">
          Showing <span>{startItem}</span> to <span>{endItem}</span> of <span>{totalItems}</span> entries
        </div>

        {/* Center: Dynamic Page Navigation */}
        <div className="pagination-controls">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="pagination-btn arrow-btn"
          >
            ‹
          </button>

          {getPageNumbers().map((num, idx) =>
            num === "..." ? (
              <span key={`dots-${idx}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`pagination-btn ${num === currentPage ? "active" : ""}`}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn arrow-btn"
          >
            ›
          </button>
        </div>

        {/* Right Side: Rows per page selector */}
        <div className="pagination-selector">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onRowsChange(Number(e.target.value));
              onPageChange(1);
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

  // Reusable Employer Accordion Field Group
  const renderEmployerFields = (num) => (
    <div className="employer-fields-container">
      <div className="form-grid grid-3">
        <div>
          <label className="form-label">COMPANY NAME *</label>
          <input type="text" placeholder="Enter company name" className="form-input" />
        </div>
        <div>
          <label className="form-label">DESIGNATION *</label>
          <input type="text" placeholder="Enter designation" className="form-input" />
        </div>
        <div>
          <label className="form-label">EMPLOYEE ID</label>
          <input type="text" placeholder="Enter employee ID" className="form-input" />
        </div>
      </div>

      <div className="form-grid grid-2">
        <div>
          <label className="form-label">HR EMAIL ID *</label>
          <input type="email" placeholder="Enter HR email ID" className="form-input" />
        </div>
        <div>
          <label className="form-label">HR PHONE NUMBER *</label>
          <div className="phone-input-group">
            <select className="form-select phone-code">
              <option>+91</option>
            </select>
            <input type="text" placeholder="Enter phone number" className="form-input" />
          </div>
        </div>
      </div>

      <div className="form-grid grid-2 mb-20">
        <div>
          <label className="form-label">DATE OF JOINING (DOJ) *</label>
          <input type="date" className="form-input" />
        </div>
        <div>
          <label className="form-label">DATE OF EXIT (DOE) *</label>
          <input type="date" className="form-input" />
        </div>
      </div>

      <div>
        <label className="form-label">DOCUMENTS * (Upload up to 4 documents)</label>
        <div className="upload-grid">
          {[1, 2, 3, 4].map((docNum) => (
            <div key={docNum} className="upload-card">
              <p className="upload-title">Document {docNum}</p>
              <span className="upload-subtitle">PDF, JPG, PNG (Max 10MB)</span>
              <label className="upload-btn">
                ☁ Choose File
                <input type="file" style={{ display: "none" }} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        <main className="main-container">
          <div className="content-wrapper">
            
            {/* Action Bar without Nav Tabs */}
            {activeTab === "allocation" && (
              <div className="action-bar-container">
                <button
                  onClick={() => setActiveTab("employment")}
                  className="secondary-cta"
                >
                  + Add New Employment Case
                </button>
              </div>
            )}

            {/* TAB 1: COMPANY ALLOCATION */}
            {activeTab === "allocation" && (
              <div>
                {/* Search & Filter Bar */}
                <div className="filter-bar">
                  <input
                    type="text"
                    placeholder="Search by Candidate, Case ID, Company..."
                    className="form-input search-input"
                  />
                  <select className="form-select filter-select">
                    <option value="">All States</option>
                  </select>
                  <select className="form-select filter-select">
                    <option value="">All Cities</option>
                  </select>
                  <button className="filter-btn">
                    🌪️ Filters
                  </button>
                </div>

                {/* Summary Stat Cards */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Total Employment Cases</span>
                    <h2 className="stat-value">2,458</h2>
                    <span className="stat-subtext">Across all companies</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Unassigned Cases</span>
                    <h2 className="stat-value color-warning">188</h2>
                    <span className="stat-subtext">Require allocation</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">In Progress</span>
                    <h2 className="stat-value color-primary">1,235</h2>
                    <span className="stat-subtext">With verifiers</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Completed (This Month)</span>
                    <h2 className="stat-value color-success">1,035</h2>
                    <span className="stat-subtext">This month</span>
                  </div>
                </div>

                {/* Table 1 & Verifier Selection Section */}
                <div className="allocation-layout">
                  <div className="table-card flex-1">
                    <h3 className="card-title">Company-wise Case Allocation</h3>
                    <div className="table-wrapper">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th><input type="checkbox" /></th>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Company Name</th>
                            <th>New Cases</th>
                            <th>Pending</th>
                            <th>In Progress</th>
                            <th>Completed</th>
                            <th>Verifiers (Name)</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id: 1, client: "ABC Corp", company: "ABC Technologies Pvt. Ltd.", newCases: 24, pending: 8, progress: 6, done: 10, verifiers: "Amit Kumar, Neha Patel, Rahul Verma" },
                            { id: 2, client: "XYZ Solutions", company: "XYZ Infotech Ltd.", newCases: 18, pending: 5, progress: 7, done: 6, verifiers: "Neha Patel, Rahul Verma" },
                            { id: 3, client: "Infosys Limited", company: "Infosys Ltd.", newCases: 31, pending: 12, progress: 8, done: 11, verifiers: "Amit Kumar, Priya Singh" },
                            { id: 4, client: "Tata Group", company: "Tata Consultancy Services", newCases: 27, pending: 9, progress: 10, done: 8, verifiers: "Rahul Verma, Smita Joshi, Amit Kumar" },
                            { id: 5, client: "Wipro Enterprises", company: "Wipro Ltd.", newCases: 15, pending: 4, progress: 5, done: 6, verifiers: "Amit Kumar, Neha Patel" }
                          ].map((row) => (
                            <tr key={row.id}>
                              <td><input type="checkbox" defaultChecked={row.id <= 2} /></td>
                              <td>{row.id}</td>
                              <td className="font-semibold">{row.client}</td>
                              <td>{row.company}</td>
                              <td className="text-primary font-bold">{row.newCases}</td>
                              <td className="text-warning font-bold">{row.pending}</td>
                              <td className="text-info font-bold">{row.progress}</td>
                              <td className="text-success font-bold">{row.done}</td>
                              <td className="text-muted">{row.verifiers}</td>
                              <td>
                                <button className="action-btn">
                                  Allocate
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination for Table 1 */}
                    {renderPagination(table1Page, 50, table1RowsPerPage, setTable1Page, setTable1RowsPerPage)}
                  </div>

                  {/* Select Verifier Panel */}
                  <div className="verifier-panel">
                    <h3 className="card-title">Select Verifier</h3>
                    <input type="text" placeholder="🔍 Search verifier..." className="form-input search-verifier" />
                    <div className="verifier-list">
                      {[
                        { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
                        { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
                        { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
                      ].map((verifier, idx) => (
                        <div key={idx} className="verifier-item">
                          <div className="verifier-info">
                            <input type="checkbox" defaultChecked={verifier.checked} />
                            <div className="avatar">
                              {verifier.name.charAt(0)}
                            </div>
                            <div>
                              <p className="verifier-name">{verifier.name}</p>
                              <span className="verifier-title">{verifier.title}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="case-count">{verifier.cases}</span>
                            <span className="case-label">Active Cases</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="panel-actions">
                      <button className="btn-cancel">Cancel</button>
                      <button className="btn-submit">Allocate Cases</button>
                    </div>
                  </div>
                </div>

                {/* Table 2: Recent Employment Cases */}
                <div className="table-card">
                  <h3 className="card-title">Recent Employment Cases</h3>
                  <div className="table-wrapper">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th><input type="checkbox" /></th>
                          <th>Case ID</th>
                          <th>Candidate Name</th>
                          <th>Client Name</th>
                          <th>Company Name</th>
                          <th>HR Email ID</th>
                          <th>HR Phone Number</th>
                          <th>Verifier (Name)</th>
                          <th>SLA</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "EMP-10245", candidate: "Rahul Sharma", client: "ABC Corp", company: "ABC Technologies Pvt. Ltd.", hr: "hr@abctech.com", phone: "+91 98765 43210", verifier: "Amit Kumar", sla: "3 Days", status: "In Progress", statusBg: "#fef3c7", statusColor: "#d97706" },
                          { id: "EMP-10246", candidate: "Priya Singh", client: "XYZ Solutions", company: "XYZ Infotech Ltd.", hr: "hr@xyz.com", phone: "+91 91234 56789", verifier: "Neha Patel", sla: "3 Days", status: "Assigned", statusBg: "#dbeafe", statusColor: "#2563eb" },
                          { id: "EMP-10247", candidate: "Arjun Mehta", client: "Infosys Limited", company: "Infosys Ltd.", hr: "hr@infosys.com", phone: "+91 98450 67890", verifier: "Unassigned", sla: "5 Days", status: "Unassigned", statusBg: "#fee2e2", statusColor: "#dc2626" },
                          { id: "EMP-10248", candidate: "Sneha Joshi", client: "Tata Group", company: "Tata Consultancy Services", hr: "hr@tcs.com", phone: "+91 88765 12345", verifier: "Rahul Verma", sla: "3 Days", status: "In Progress", statusBg: "#fef3c7", statusColor: "#d97706" },
                          { id: "EMP-10249", candidate: "Karan Verma", client: "Wipro Enterprises", company: "Wipro Ltd.", hr: "hr@wipro.com", phone: "+91 99087 66554", verifier: "Amit Kumar", sla: "5 Days", status: "Awaiting Response", statusBg: "#f3e8ff", statusColor: "#7e22ce" }
                        ].map((row) => (
                          <tr key={row.id}>
                            <td><input type="checkbox" defaultChecked={row.id === "EMP-10245" || row.id === "EMP-10246"} /></td>
                            <td className="text-primary font-bold">{row.id}</td>
                            <td className="font-semibold">{row.candidate}</td>
                            <td>{row.client}</td>
                            <td>{row.company}</td>
                            <td className="text-muted">{row.hr}</td>
                            <td className="text-muted">{row.phone}</td>
                            <td>{row.verifier}</td>
                            <td>{row.sla}</td>
                            <td>
                              <span
                                className="status-badge"
                                style={{ background: row.statusBg, color: row.statusColor }}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td>
                              <button className="link-btn">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination for Table 2 */}
                  {renderPagination(table2Page, 25, table2RowsPerPage, setTable2Page, setTable2RowsPerPage)}
                </div>
              </div>
            )}

            {/* TAB 2: EMPLOYMENT CASES (ACCORDION FORM) */}
            {activeTab === "employment" && (
              <div className="form-card">
                
                {/* Header Actions */}
                <div className="form-header">
                  <div>
                    <h2 className="form-title">Add Employment Case</h2>
                    <p className="form-subtitle">
                      Add candidate employment details. You can add up to 4 previous employers.
                    </p>
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setActiveTab("allocation")}
                      className="btn-outline"
                    >
                      ✕ Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCase}
                      className="btn-primary"
                    >
                      💾 Save Case
                    </button>
                  </div>
                </div>

                {/* Candidate Details Card */}
                <div className="candidate-section">
                  <h4 className="section-title">Candidate Details</h4>
                  <div className="form-grid grid-2">
                    <div>
                      <label className="form-label">CANDIDATE NAME *</label>
                      <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={formData.candidateName}
                        onChange={(e) => handleInputChange("candidateName", e.target.value)}
                        className="form-input bg-white"
                      />
                    </div>
                    <div>
                      <label className="form-label">DATE *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="form-input bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Employers Accordion */}
                <div className="accordion-wrapper">
                  {[1, 2, 3, 4].map((num) => {
                    const isOpen = openEmployer === num;
                    return (
                      <div key={num} className="accordion-item">
                        <button
                          type="button"
                          onClick={() => setOpenEmployer(isOpen ? null : num)}
                          className="accordion-header"
                        >
                          <div className="accordion-header-left">
                            <span
                              className="badge-number"
                              style={{
                                background: isOpen ? "#1e2761" : "#94a3b8",
                                color: "#fff",
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                              }}
                            >
                              {num}
                            </span>
                            <span>Employer {num}</span>
                          </div>
                          <span style={{ fontSize: "16px", color: "#1e2761" }}>
                            {isOpen ? "➖" : "➕"}
                          </span>
                        </button>

                        {/* Expandable Content */}
                        {isOpen && renderEmployerFields(num)}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action Footer */}
                <div className="form-footer-actions">
                  <button
                    type="button"
                    onClick={() => setActiveTab("allocation")}
                    className="btn-outline"
                  >
                    ✕ Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCase}
                    className="btn-primary"
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
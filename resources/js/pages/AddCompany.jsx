// import React, { useState } from "react";

// export default function CompanyManagement() {
//   const [showForm, setShowForm] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [companies, setCompanies] = useState([
//     { id: 1, name: "Tata Consultancy Services", code: "TCS", industry: "IT Sector", state: "Maharashtra", website: "https://tcs.com", status: "Verified" },
//     { id: 2, name: "Infosys Limited", code: "INFY", industry: "IT Sector", state: "Karnataka", website: "https://infosys.com", status: "Pending" }
//   ]);

//   const [formData, setFormData] = useState({
//     name: "",
//     code: "",
//     industry: "",
//     state: "",
//     website: ""
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const newCompany = {
//       id: companies.length + 1,
//       name: formData.name,
//       code: formData.code || "—",
//       industry: formData.industry || "—",
//       state: formData.state || "—",
//       website: formData.website || "",
//       status: "Pending"
//     };

//     setCompanies([...companies, newCompany]);
//     setFormData({ name: "", code: "", industry: "", state: "", website: "" });
//     setShowForm(false);
//   };

//   const openDeleteModal = (companyName) => {
//     setSelectedCompany(companyName);
//     setShowDeleteModal(true);
//   };

//   const filteredCompanies = companies.filter((c) =>
//     c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     c.industry.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Sidebar />

//       <section id="content">
//          <Header />

//         <main>
//           <div className="dash-wrper">

//             <div className="dash-upper-head">
//               <div className="left">
//                 <div className="dash-title-flex">
//                   <h3 className="dash-title-text">Company Database</h3>
//                 </div>
//               </div>

//               <div className="right">
//                 <input
//                   type="text"
//                   placeholder="Search name, code, industry…"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="dash-search-input"
//                 />

//                 <input type="file" id="bulk-file-input" accept=".csv" className="hidden-file-input" />
//                 <button className="secondary-cta import" onClick={() => document.getElementById("bulk-file-input").click()}>
//                   <img src="/images/dashboard/export-excel.svg" alt="" />
//                   Import CSV
//                 </button>

//                 <button className="primary-cta export">
//                   <img src="/images/dashboard/export-icon.svg" alt="" />
//                   Export CSV
//                 </button>

//                 <button className="primary-cta" onClick={() => setShowForm(!showForm)}>
//                   {showForm ? "Cancel Form" : "+ Add Company"}
//                 </button>
//               </div>
//             </div>

//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total">
//                 <h4>{companies.length}</h4>
//                 <p>Total Companies</p>
//               </div>

//               <div className="card-inner-dash bdr-com">
//                 <h4>{companies.filter(c => c.status === "Verified").length}</h4>
//                 <p>Verified</p>
//               </div>

//               <div className="card-inner-dash bdr-progress">
//                 <h4>{companies.filter(c => c.status === "Pending").length}</h4>
//                 <p>Pending Verification</p>
//               </div>

//               <div className="card-inner-dash bdr-client">
//                 <h4>{[...new Set(companies.map(c => c.industry))].length}</h4>
//                 <p>Industries</p>
//               </div>
//             </div>

//             <div className="dash-inner-wrp-both">
//               <div className="dash-inner-left">
                
//                 {showForm && (
//                   <div className="up-table form-container-box">
//                     <div className="form-header-bar">
//                       <span>ADD NEW EMPLOYER / COMPANY</span>
//                     </div>

//                     <form onSubmit={handleFormSubmit}>
//                       <div className="form-grid-inputs">
//                         <div className="form-field-group">
//                           <label>COMPANY NAME *</label>
//                           <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Infosys" required className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>SHORT CODE</label>
//                           <input type="text" name="code" value={formData.code} onChange={handleInputChange} placeholder="e.g. INFY" maxLength={8} className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>INDUSTRY</label>
//                           <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} placeholder="e.g. IT Sector" className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>STATE</label>
//                           <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="e.g. Karnataka" className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>WEBSITE</label>
//                           <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://..." className="form-theme-input" />
//                         </div>
//                       </div>

//                       <div className="form-actions-flex">
//                         <button type="submit" className="primary-cta pad-btn">Save Company</button>
//                         <button type="button" className="secondary-cta pad-btn" onClick={() => setShowForm(false)}>Cancel</button>
//                       </div>
//                     </form>
//                   </div>
//                 )}

//                 <div className="down-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Company Name</th>
//                         <th>Code</th>
//                         <th>Industry</th>
//                         <th>State</th>
//                         <th>Website</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredCompanies.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="empty-table-cell">No companies found</td>
//                         </tr>
//                       ) : (
//                         filteredCompanies.map((company, index) => (
//                           <tr key={company.id}>
//                             <td>{index + 1}</td>
//                             <td className="company-name-cell">{company.name}</td>
//                             <td className="code-cell">{company.code}</td>
//                             <td>{company.industry}</td>
//                             <td>{company.state}</td>
//                             <td>
//                               {company.website ? (
//                                 <a href={company.website} target="_blank" rel="noreferrer" className="table-link-anchor">Link ↗</a>
//                               ) : "—"}
//                             </td>
//                             <td>
//                               <span className={`status ${company.status === "Verified" ? "completed" : "pending"}`}>
//                                 {company.status}
//                               </span>
//                             </td>
//                             <td>
//                               <button className="view-cta remove-btn-theme" onClick={() => openDeleteModal(company.name)}>
//                                 Remove
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//               </div>

//               <div className="dash-inner-right">
//                 <div className="quick-stats">
//                   <div className="stats-header">
//                     <h3>DATABASE UTILITIES</h3>
//                   </div>
//                   <div className="stats-body">
//                     <div className="utility-box-inner">
//                       <p className="utility-desc-text">
//                         Use the sample file structure to perform error-free bulk uploads via CSV format.
//                       </p>
//                       <button className="secondary-cta full-width-center-btn">
//                         🏢 Download CSV Template ↓
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

//           </div>
//         </main>
//       </section>

//       {showDeleteModal && (
//         <div className="modal-overlay-blur">
//           <div className="modal-card-wrapper">
//             <h3 className="modal-title-heading">Remove Employer?</h3>
//             <p className="modal-body-text">
//               <strong>{selectedCompany}</strong> will be permanently removed from the active verifier dropdown list.
//             </p>
//             <div className="modal-actions-right">
//               <button className="secondary-cta pad-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//               <button className="primary-cta pad-btn delete-confirm-bg" onClick={() => setShowDeleteModal(false)}>Yes, Remove</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// AddCompany.jsx — Admin page to manage the company / employer database
// Route: /AddCompany (admin only — visible to admins via Sidebar)
// Features:
//   - Manual add form (single company) — saved via API
//   - Bulk import via CSV (parsed client-side, saved via API)
//   - Table with search, delete (soft-delete via API)
//   - Download template CSV / export current list

// import { useState, useRef } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { useCompanies } from "../src/store/companyStore";

// const EMPTY_FORM = { name: "", code: "", industry: "", state: "", website: "", scope: "" };

// export default function CompanyManagement() {
//   const { companies, loading, error, addOne, bulkAdd, remove } = useCompanies();

//   const [showForm, setShowForm]       = useState(false);
//   const [search, setSearch]           = useState("");
//   const [form, setForm]               = useState(EMPTY_FORM);
//   const [formError, setFormError]     = useState("");
//   const [formSuccess, setFormSuccess] = useState("");
//   const [submitting, setSubmitting]   = useState(false);
//   const [bulkResult, setBulkResult]   = useState(null);
//   const [bulkBusy, setBulkBusy]       = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const fileRef = useRef(null);

//   const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

//   // ── Filtered list ──────────────────────────────────────────────────────────
//   const filtered = companies.filter((c) => {
//     if (c.status === "inactive") return false;
//     if (!search) return true;
//     const q = search.toLowerCase();
//     return (
//       c.name.toLowerCase().includes(q) ||
//       (c.code || "").toLowerCase().includes(q) ||
//       (c.industry || "").toLowerCase().includes(q)
//     );
//   });

//   // ── Manual add ────────────────────────────────────────────────────────────
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) { setFormError("Company name is required."); return; }
//     setFormError("");
//     setSubmitting(true);
//     try {
//       await addOne(form);
//       setForm(EMPTY_FORM);
//       setFormSuccess(`"${form.name}" added successfully.`);
//       setTimeout(() => { setFormSuccess(""); setShowForm(false); }, 1500);
//     } catch (err) {
//       setFormError(err.message || "Failed to add company.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Bulk CSV parse ──────────────────────────────────────────────────────────
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = async (evt) => {
//       try {
//         const text    = evt.target.result;
//         const lines   = text.trim().split("\n");
//         const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
//         const rows = lines.slice(1).map((line) => {
//           const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
//           const obj  = {};
//           headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
//           return obj;
//         }).filter((r) => r.name);

//         if (rows.length === 0) {
//           setBulkResult({ error: "No valid rows found. Make sure the CSV has a 'name' column." });
//           return;
//         }

//         setBulkBusy(true);
//         await bulkAdd(rows);
//         setBulkResult({ count: rows.length });
//         setTimeout(() => setBulkResult(null), 4000);
//       } catch (err) {
//         setBulkResult({ error: err.message || "Failed to import file. Please use the template format." });
//       } finally {
//         setBulkBusy(false);
//       }
//     };
//     reader.readAsText(file);
//     e.target.value = "";
//   };

//   // ── Template CSV download ───────────────────────────────────────────────────
//   const downloadTemplate = () => {
//     const csv = "name,code,industry,state,website\nExample Corp Ltd,ECL,IT Sector,Karnataka,https://example.com";
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = "company_template.csv"; a.click();
//     URL.revokeObjectURL(url);
//   };

//   // ── Export current list ─────────────────────────────────────────────────────
//   const exportCSV = () => {
//     const rows = filtered.map((c) =>
//       [c.name, c.code, c.industry, c.state, c.website, c.verified ? "true" : "false"].join(",")
//     );
//     const csv  = `name,code,industry,state,website,verified\n${rows.join("\n")}`;
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = "companies_export.csv"; a.click();
//     URL.revokeObjectURL(url);
//   };

//   // ── Delete ───────────────────────────────────────────────────────────────────
//   const handleRemove = async (company) => {
//     try {
//       await remove(company.id);
//     } catch (err) {
//       setBulkResult({ error: err.message || "Failed to remove company." });
//       setTimeout(() => setBulkResult(null), 4000);
//     } finally {
//       setDeleteConfirm(null);
//     }
//   };

//     // Calculate pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filtered.length / usersPerPage);


//   const industryCount = [...new Set(companies.filter(c => c.status !== "inactive").map(c => c.industry).filter(Boolean))].length;

 

 

//   return (
//     <>
//       <Sidebar />

//       <section id="content">
//         <Header />

//         <main>
//           <div className="dash-wrper">

//             <div className="dash-upper-head">
//               <div className="left">
//                 <div className="dash-title-flex">
//                   <h3 className="dash-title-text">Company Database</h3>
//                 </div>
//               </div>

//               <div className="right" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                 <input
//                   type="text"
//                   placeholder="Search name, code, industry…"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="dash-search-input"
//                 />

//                 <input ref={fileRef} type="file" id="bulk-file-input" accept=".csv" className="hidden-file-input" onChange={handleFileUpload} style={{ display: "none" }} />
//                 <button className="secondary-cta import" onClick={() => fileRef.current?.click()} disabled={bulkBusy}>
//                   <img src="/images/dashboard/export-excel.svg" alt="" />
//                   {bulkBusy ? "Importing…" : "Import CSV"}
//                 </button>

//                 <button className="primary-cta export" onClick={exportCSV}>
//                   <img src="/images/dashboard/export-icon.svg" alt="" />
//                   Export CSV
//                 </button>

//                 <button className="primary-cta" onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}>
//                   {showForm ? "Cancel Form" : "+ Add Company"}
//                 </button>
//               </div>
//             </div>

//             {/* ── Load error ── */}
//             {error && (
//               <div style={{ padding: "12px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5" }}>
//                 ⚠ {error}
//               </div>
//             )}

//             {/* ── Bulk result toast ── */}
//             {bulkResult && (
//               <div style={{ padding: "12px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: bulkResult.error ? "#fef2f2" : "#f0fdf4", color: bulkResult.error ? "#b91c1c" : "#15803d", border: `1px solid ${bulkResult.error ? "#fca5a5" : "#bbf7d0"}` }}>
//                 {bulkResult.error ? `⚠ ${bulkResult.error}` : `✔ ${bulkResult.count} company/companies imported successfully.`}
//               </div>
//             )}

//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total">
//                 <h4>{companies.filter(c => c.status !== "inactive").length}</h4>
//                 <p>Total Companies</p>
//               </div>

//               <div className="card-inner-dash bdr-com">
//                 <h4>{companies.filter(c => c.status !== "inactive" && c.verified).length}</h4>
//                 <p>Verified</p>
//               </div>

//               <div className="card-inner-dash bdr-progress">
//                 <h4>{companies.filter(c => c.status !== "inactive" && !c.verified).length}</h4>
//                 <p>Pending Verification</p>
//               </div>

//               <div className="card-inner-dash bdr-client">
//                 <h4>{industryCount}</h4>
//                 <p>Industries</p>
//               </div>
//             </div>

//             <div className="dash-inner-wrp-both">
//               <div className="dash-inner-left">

//                 {showForm && (
//                   <div className="up-table form-container-box">
//                     <div className="form-header-bar">
//                       <span>ADD NEW EMPLOYER / COMPANY</span>
//                     </div>

//                     <form onSubmit={handleAdd}>
//                       <div className="form-grid-inputs">
//                         <div className="form-field-group">
//                           <label>COMPANY NAME *</label>
//                           <input type="text" name="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Infosys" required className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>SHORT CODE</label>
//                           <input type="text" name="code" value={form.code} onChange={(e) => set("code", e.target.value.toUpperCase())} placeholder="e.g. INFY" maxLength={8} className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>INDUSTRY</label>
//                           <input type="text" name="industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="e.g. IT Sector" className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>STATE</label>
//                           <input type="text" name="state" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="e.g. Karnataka" className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//                           <label>WEBSITE</label>
//                           <input type="url" name="website" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className="form-theme-input" />
//                         </div>
//                         <div className="form-field-group">
//   <label>SCOPE</label>
//   <select value={form.scope} onChange={(e) => set("scope", e.target.value)} className="form-theme-input">
//     <option value="">Select</option>
//     <option value="national">National</option>
//     <option value="international">International</option>
//   </select>
// </div>
//                       </div>

//                       {formError   && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px" }}>{formError}</p>}
//                       {formSuccess && <p style={{ color: "#16a34a", fontSize: "13px", marginTop: "8px" }}>✔ {formSuccess}</p>}

//                       <div className="form-actions-flex">
//                         <button type="submit" className="primary-cta pad-btn" disabled={submitting}>
//                           {submitting ? "Saving…" : "Save Company"}
//                         </button>
//                         <button type="button" className="secondary-cta pad-btn" onClick={() => setShowForm(false)}>Cancel</button>
//                       </div>
//                     </form>
//                   </div>
//                 )}

//                 <div className="down-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Company Name</th>
//                         <th>Code</th>
//                         <th>Industry</th>
//                         <th>State</th>
//                         <th>Website</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="8" className="empty-table-cell">Loading companies…</td>
//                         </tr>
//                       ) : filtered.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="empty-table-cell">No companies found</td>
//                         </tr>
//                       ) : (
//                         filtered.map((company, index) => (
//                           <tr key={company.id}>
//                             <td>{index + 1}</td>
//                             <td className="company-name-cell">{company.name}</td>
//                             <td className="code-cell">{company.code || "—"}</td>
//                             <td>{company.industry || "—"}</td>
//                             <td>{company.state || "—"}</td>
//                             <td>
//                               {company.website ? (
//                                 <a href={company.website} target="_blank" rel="noreferrer" className="table-link-anchor">Link ↗</a>
//                               ) : "—"}
//                             </td>
//                             <td>
//                               <span className={`status ${company.verified ? "completed" : "pending"}`}>
//                                 {company.verified ? "Verified" : "Pending"}
//                               </span>
//                             </td>
//                             <td>
//                               <button className="view-cta remove-btn-theme" onClick={() => setDeleteConfirm(company)}>
//                                 Remove
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>

//                    {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
//                   <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
//                   <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
//                   ))}
//                   <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
//                   <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
//                 </div>
//               )}

//                   <div style={{ padding: "8px 16px", fontSize: "12px", color: "#94a3b8", borderTop: "1px solid #f1f5f9" }}>
//                     Showing {filtered.length} of {companies.filter(c => c.status !== "inactive").length} companies
//                   </div>
//                 </div>

//               </div>

//               <div className="dash-inner-right">
//                 <div className="quick-stats">
//                   <div className="stats-header">
//                     <h3>DATABASE UTILITIES</h3>
//                   </div>
//                   <div className="stats-body">
//                     <div className="utility-box-inner">
//                       <p className="utility-desc-text">
//                         Use the sample file structure to perform error-free bulk uploads via CSV format.
//                       </p>
//                       <button className="secondary-cta full-width-center-btn" onClick={downloadTemplate}>
//                         🏢 Download CSV Template ↓
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

//           </div>
//         </main>
//       </section>

//       {deleteConfirm && (
//         <div className="modal-overlay-blur">
//           <div className="modal-card-wrapper">
//             <h3 className="modal-title-heading">Remove Employer?</h3>
//             <p className="modal-body-text">
//               <strong>{deleteConfirm.name}</strong> will be permanently removed from the active verifier dropdown list.
//             </p>
//             <div className="modal-actions-right">
//               <button className="secondary-cta pad-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
//               <button className="primary-cta pad-btn delete-confirm-bg" onClick={() => handleRemove(deleteConfirm)}>Yes, Remove</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useCompanies } from "../src/store/companyStore";

const EMPTY_FORM = { name: "", code: "", industry: "", state: "", website: "", scope: "" };

export default function CompanyManagement() {
  const { companies, loading, error, addOne, bulkAdd, remove } = useCompanies();

  const [showForm, setShowForm]         = useState(false);
  const [search, setSearch]             = useState("");
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [formError, setFormError]       = useState("");
  const [formSuccess, setFormSuccess]   = useState("");
  const [submitting, setSubmitting]     = useState(false);
  const [bulkResult, setBulkResult]     = useState(null);
  const [bulkBusy, setBulkBusy]         = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Pagination states added
  const [currentPage, setCurrentPage]   = useState(1);
  const usersPerPage                    = 10;

  const fileRef = useRef(null);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = companies.filter((c) => {
    if (c.status === "inactive") return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.code || "").toLowerCase().includes(q) ||
      (c.industry || "").toLowerCase().includes(q)
    );
  });

  // ── Manual add ────────────────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setFormError("Company name is required."); return; }
    setFormError("");
    setSubmitting(true);
    try {
      await addOne(form);
      setForm(EMPTY_FORM);
      setFormSuccess(`"${form.name}" added successfully.`);
      setTimeout(() => { setFormSuccess(""); setShowForm(false); }, 1500);
    } catch (err) {
      setFormError(err.message || "Failed to add company.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Bulk CSV parse ──────────────────────────────────────────────────────────
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text    = evt.target.result;
        const lines   = text.trim().split("\n");
        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
        const rows = lines.slice(1).map((line) => {
          const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
          const obj  = {};
          headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
          return obj;
        }).filter((r) => r.name);

        if (rows.length === 0) {
          setBulkResult({ error: "No valid rows found. Make sure the CSV has a 'name' column." });
          return;
        }

        setBulkBusy(true);
        await bulkAdd(rows);
        setBulkResult({ count: rows.length });
        setTimeout(() => setBulkResult(null), 4000);
      } catch (err) {
        setBulkResult({ error: err.message || "Failed to import file. Please use the template format." });
      } finally {
        setBulkBusy(false);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Template CSV download ───────────────────────────────────────────────────
  const downloadTemplate = () => {
    const csv = "name,code,industry,state,website\nExample Corp Ltd,ECL,IT Sector,Karnataka,https://example.com";
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "company_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Export current list ─────────────────────────────────────────────────────
  const exportCSV = () => {
    const rows = filtered.map((c) =>
      [c.name, c.code, c.industry, c.state, c.website, c.verified ? "true" : "false"].join(",")
    );
    const csv  = `name,code,industry,state,website,verified\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "companies_export.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const handleRemove = async (company) => {
    try {
      await remove(company.id);
    } catch (err) {
      setBulkResult({ error: err.message || "Failed to remove company." });
      setTimeout(() => setBulkResult(null), 4000);
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Calculate pagination variables safely
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  const industryCount = [...new Set(companies.filter(c => c.status !== "inactive").map(c => c.industry).filter(Boolean))].length;

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        <main>
          <div className="dash-wrper">

            <div className="dash-upper-head">
              <div className="left">
                <div className="dash-title-flex">
                  <h3 className="dash-title-text">Company Database</h3>
                </div>
              </div>

              <div className="right" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search name, code, industry…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="dash-search-input"
                />

                <input ref={fileRef} type="file" id="bulk-file-input" accept=".csv" className="hidden-file-input" onChange={handleFileUpload} style={{ display: "none" }} />
                <button className="secondary-cta import" onClick={() => fileRef.current?.click()} disabled={bulkBusy}>
                  <img src="/images/dashboard/export-excel.svg" alt="" />
                  {bulkBusy ? "Importing…" : "Import CSV"}
                </button>

                <button className="primary-cta export" onClick={exportCSV}>
                  <img src="/images/dashboard/export-icon.svg" alt="" />
                  Export CSV
                </button>

                <button className="primary-cta" onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}>
                  {showForm ? "Cancel Form" : "+ Add Company"}
                </button>
              </div>
            </div>

            {/* ── Load error ── */}
            {error && (
              <div style={{ padding: "12px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5" }}>
                ⚠ {error}
              </div>
            )}

            {/* ── Bulk result toast ── */}
            {bulkResult && (
              <div style={{ padding: "12px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: bulkResult.error ? "#fef2f2" : "#f0fdf4", color: bulkResult.error ? "#b91c1c" : "#15803d", border: `1px solid ${bulkResult.error ? "#fca5a5" : "#bbf7d0"}` }}>
                {bulkResult.error ? `⚠ ${bulkResult.error}` : `✔ ${bulkResult.count} company/companies imported successfully.`}
              </div>
            )}

            <div className="cards-head-dash">
              <div className="card-inner-dash bdr-total">
                <h4>{companies.filter(c => c.status !== "inactive").length}</h4>
                <p>Total Companies</p>
              </div>

              <div className="card-inner-dash bdr-com">
                <h4>{companies.filter(c => c.status !== "inactive" && c.verified).length}</h4>
                <p>Verified</p>
              </div>

              <div className="card-inner-dash bdr-progress">
                <h4>{companies.filter(c => c.status !== "inactive" && !c.verified).length}</h4>
                <p>Pending Verification</p>
              </div>

              <div className="card-inner-dash bdr-client">
                <h4>{industryCount}</h4>
                <p>Industries</p>
              </div>
            </div>

            <div className="dash-inner-wrp-both">
              <div className="dash-inner-left">

                {showForm && (
                  <div className="up-table form-container-box">
                    <div className="form-header-bar">
                      <span>ADD NEW EMPLOYER / COMPANY</span>
                    </div>

                    <form onSubmit={handleAdd}>
                      <div className="form-grid-inputs">
                        <div className="form-field-group">
                          <label>COMPANY NAME *</label>
                          <input type="text" name="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Infosys" required className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>SHORT CODE</label>
                          <input type="text" name="code" value={form.code} onChange={(e) => set("code", e.target.value.toUpperCase())} placeholder="e.g. INFY" maxLength={8} className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>INDUSTRY</label>
                          <input type="text" name="industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="e.g. IT Sector" className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>STATE</label>
                          <input type="text" name="state" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="e.g. Karnataka" className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>WEBSITE</label>
                          <input type="url" name="website" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>SCOPE</label>
                          <select value={form.scope} onChange={(e) => set("scope", e.target.value)} className="form-theme-input">
                            <option value="">Select</option>
                            <option value="national">National</option>
                            <option value="international">International</option>
                          </select>
                        </div>
                      </div>

                      {formError   && <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px" }}>{formError}</p>}
                      {formSuccess && <p style={{ color: "#16a34a", fontSize: "13px", marginTop: "8px" }}>✔ {formSuccess}</p>}

                      <div className="form-actions-flex">
                        <button type="submit" className="primary-cta pad-btn" disabled={submitting}>
                          {submitting ? "Saving…" : "Save Company"}
                        </button>
                        <button type="button" className="secondary-cta pad-btn" onClick={() => setShowForm(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="down-table">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company Code</th>
                        <th>Industry</th>
                        <th>State</th>
                        <th>Website</th>
                        <th>Contact person</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="empty-table-cell">Loading companies…</td>
                        </tr>
                      ) : currentUsers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="empty-table-cell">No companies found</td>
                        </tr>
                      ) : (
                        currentUsers.map((company, index) => (
                          <tr key={company.id}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td className="company-name-cell">{company.name}</td>
                            <td className="code-cell">{company.code || "—"}</td>
                            <td>{company.industry || "—"}</td>
                            <td>{company.state || "—"}</td>
                            <td>
                              {company.website ? (
                                <a href={company.website} target="_blank" rel="noreferrer" className="table-link-anchor">Link ↗</a>
                              ) : "—"}
                            </td>
                            <td>
                              <span className={`status ${company.verified ? "completed" : "pending"}`}>
                                {company.verified ? "Verified" : "Pending"}
                              </span>
                            </td>
                            <td>
                              <button className="view-cta remove-btn-theme" onClick={() => setDeleteConfirm(company)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
                      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
                      <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
                      ))}
                      <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
                      <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
                    </div>
                  )}

                  <div style={{ padding: "8px 16px", fontSize: "12px", color: "#94a3b8", borderTop: "1px solid #f1f5f9" }}>
                    Showing {filtered.length} of {companies.filter(c => c.status !== "inactive").length} companies
                  </div>
                </div>

              </div>

              <div className="dash-inner-right">
                <div className="quick-stats">
                  <div className="stats-header">
                    <h3>DATABASE UTILITIES</h3>
                  </div>
                  <div className="stats-body">
                    <div className="utility-box-inner">
                      <p className="utility-desc-text">
                        Use the sample file structure to perform error-free bulk uploads via CSV format.
                      </p>
                      <button className="secondary-cta full-width-center-btn" onClick={downloadTemplate}>
                        🏢 Download CSV Template ↓
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </section>

      {deleteConfirm && (
        <div className="modal-overlay-blur">
          <div className="modal-card-wrapper">
            <h3 className="modal-title-heading">Remove Employer?</h3>
            <p className="modal-body-text">
              <strong>{deleteConfirm.name}</strong> will be permanently removed from the active verifier dropdown list.
            </p>
            <div className="modal-actions-right">
              <button className="secondary-cta pad-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="primary-cta pad-btn delete-confirm-bg" onClick={() => handleRemove(deleteConfirm)}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
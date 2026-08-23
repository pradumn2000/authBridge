
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { useCases } from "../src/hooks/useCases";
// import { useCaseFilters } from "../src/hooks/useCaseFilters";
// import DateRangePicker from "../src/components/DateRangePicker";

// const STATUS_MAP = {
//   "In Progress": "in-progress",
//   "QC Review":   "qc-review",
//   "Pending":     "pending",
//   "Completed":   "completed",
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { cases } = useCases();

//   const {
//     filtered,
//     datePreset, setDatePreset,
//     customRange, applyCustomRange, clearDate,
//     showPicker, setShowPicker,
//     dateLabel,
//     exportCSV,
//     exportExcel,
//   } = useCaseFilters(cases, { showStatusFilter: false });

//   // ── Derived stats (from filtered set) ─────────────────────
//   const total      = filtered.length;
//   const inProgress = filtered.filter(c => c.label === "In Progress").length;
//   const completed  = filtered.filter(c => c.label === "Completed").length;
//   const clients    = new Set(filtered.map(c => c.clientId).filter(Boolean)).size;
//   const clearRate  = total > 0 ? Math.round((completed / total) * 100) : 0;
//   const recent     = filtered.slice(0, 5);

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="form-container">
//       <h2>Add Institute</h2>
//       <form onSubmit={handleSubmit}>

//         {/* Name */}
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input 
//             type="text" 
//             id="name" 
//             name="name" 
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Verification From University (Checkbox) */}
//         <div className="form-group checkbox-group">
//           <input 
//             type="checkbox" 
//             id="university_verification" 
//             name="university_verification"
//             checked={formData.university_verification}
//             onChange={handleChange}
//           />
//           <label htmlFor="university_verification">Verification From University</label>
//         </div>

//         {/* Address */}
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input 
//             type="text" 
//             id="address" 
//             name="address" 
//             placeholder="Enter full address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>

//         {/* State */}
//         <div className="form-group">
//           <label htmlFor="state">State</label>
//           <input 
//             type="text" 
//             id="state" 
//             name="state" 
//             placeholder="Enter state name"
//             value={formData.state}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Pin Code */}
//         <div className="form-group">
//           <label htmlFor="pincode">Pin Code</label>
//           <input 
//             type="text" 
//             id="pincode" 
//             name="pincode" 
//             placeholder="Enter 6-digit pin code"
//             value={formData.pincode}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Unique Code */}
//         <div className="form-group">
//           <label htmlFor="unique_code">Unique Code</label>
//           <input 
//             type="text" 
//             id="unique_code" 
//             name="unique_code" 
//             placeholder="Enter unique code"
//             value={formData.unique_code}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Website */}
//         <div className="form-group">
//           <label htmlFor="website">Website</label>
//           <input 
//             type="text" 
//             id="website" 
//             name="website" 
//             placeholder="https://example.com"
//             value={formData.website}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Stature Of institute (Disposition) */}
//         <div className="form-group">
//           <label htmlFor="stature">Stature Of Institute (Disposition)</label>
//           <select 
//             id="stature" 
//             name="stature"
//             value={formData.stature}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Stature --</option>
//             <option value="government">Government</option>
//             <option value="private">Private</option>
//             <option value="autonomous">Autonomous</option>
//             <option value="deemed">Deemed University</option>
//           </select>
//         </div>

//         {/* Name Of Collaborate */}
//         <div className="form-group">
//           <label htmlFor="collaborate_name">Name Of Collaborate</label>
//           <input 
//             type="text" 
//             id="collaborate_name" 
//             name="collaborate_name" 
//             placeholder="Enter collaborator name"
//             value={formData.collaborate_name}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Source Category */}
//         <div className="form-group">
//           <label htmlFor="source_category">Source Category</label>
//           <select 
//             id="source_category" 
//             name="source_category"
//             value={formData.source_category}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Category --</option>
//             <option value="category_a">Category A</option>
//             <option value="category_b">Category B</option>
//             <option value="category_c">Category C</option>
//           </select>
//         </div>

//         {/* Aicte Status */}
//         <div className="form-group">
//           <label htmlFor="aicte_status">AICTE Status</label>
//           <select 
//             id="aicte_status" 
//             name="aicte_status"
//             value={formData.aicte_status}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Status --</option>
//             <option value="approved">Approved</option>
//             <option value="not_approved">Not Approved</option>
//             <option value="applied">Applied / Pending</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn">Submit Details</button>

//       </form>
//     </div>
//         </main>
//       </section>
//     </>
//   );
// }



import React, { useState } from "react";

export default function AddInstitute() {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [institutes, setInstitutes] = useState([
    { id: 1, name: "Indian Institute of Technology", code: "IIT-B", type: "Technical", city: "Mumbai", university: "Autonomous", status: "Verified" },
    { id: 2, name: "Delhi University", code: "DU", type: "Central", city: "New Delhi", university: "Delhi University", status: "Pending" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    city: "",
    university: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newInstitute = {
      id: institutes.length + 1,
      name: formData.name,
      code: formData.code || "—",
      type: formData.type || "—",
      city: formData.city || "—",
      university: formData.university || "—",
      status: "Pending"
    };

    setInstitutes([...institutes, newInstitute]);
    setFormData({ name: "", code: "", type: "", city: "", university: "" });
    setShowForm(false);
  };

  const openDeleteModal = (instituteName) => {
    setSelectedInstitute(instituteName);
    setShowDeleteModal(true);
  };

  const filteredInstitutes = institutes.filter((inst) =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <h3 className="dash-title-text">Institute Database</h3>
                </div>
              </div>

              <div className="right">
                <input
                  type="text"
                  placeholder="Search name, code, city…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dash-search-input"
                />

                <input type="file" id="bulk-file-input" accept=".csv" className="hidden-file-input" />
                <button className="secondary-cta import" onClick={() => document.getElementById("bulk-file-input").click()}>
                  <img src="/images/dashboard/export-excel.svg" alt="" />
                  Import CSV
                </button>

                <button className="primary-cta export">
                  <img src="/images/dashboard/export-icon.svg" alt="" />
                  Export CSV
                </button>

                <button className="primary-cta" onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Cancel Form" : "+ Add Institute"}
                </button>
              </div>
            </div>

            <div className="cards-head-dash">
              <div className="card-inner-dash bdr-total">
                <h4>{institutes.length}</h4>
                <p>Total Institutes</p>
              </div>

              <div className="card-inner-dash bdr-com">
                <h4>{institutes.filter(i => i.status === "Verified").length}</h4>
                <p>Verified</p>
              </div>

              <div className="card-inner-dash bdr-progress">
                <h4>{institutes.filter(i => i.status === "Pending").length}</h4>
                <p>Pending Verification</p>
              </div>

              <div className="card-inner-dash bdr-client">
                <h4>{[...new Set(institutes.map(i => i.type))].length}</h4>
                <p>Institute Types</p>
              </div>
            </div>

            <div className="dash-inner-wrp-both">
              <div className="dash-inner-left">
                
                {showForm && (
                  <div className="up-table form-container-box">
                    <div className="form-header-bar">
                      <span>ADD NEW INSTITUTE / UNIVERSITY</span>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                      <div className="form-grid-inputs">
                        <div className="form-field-group">
                          <label>INSTITUTE NAME *</label>
                          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. IIT Bombay" required className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>INSTITUTE CODE</label>
                          <input type="text" name="code" value={formData.code} onChange={handleInputChange} placeholder="e.g. IIT-B" maxLength={10} className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>INSTITUTE TYPE</label>
                          <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="e.g. Technical / Medical" className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>CITY / LOCATION</label>
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Mumbai" className="form-theme-input" />
                        </div>
                        <div className="form-field-group">
                          <label>AFFILIATED UNIVERSITY</label>
                          <input type="text" name="university" value={formData.university} onChange={handleInputChange} placeholder="e.g. Autonomous / UGC" className="form-theme-input" />
                        </div>
                      </div>

                      <div className="form-actions-flex">
                        <button type="submit" className="primary-cta pad-btn">Save Institute</button>
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
      <th>Institute Name</th>
      <th>Code</th>
      <th>Type</th>
      <th>State</th>
      <th>Regulatory Body</th>
      <th>Email</th>
      <th>Website</th>
      <th>Charges</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredInstitutes.length === 0 ? (
      <tr>
        {/* Total 11 columns hain toh colSpan 11 hoga */}
        <td colSpan="11" className="empty-table-cell">
          No institutes found
        </td>
      </tr>
    ) : (
      filteredInstitutes.map((institute, index) => (
        <tr key={institute.id}>
          <td>{index + 1}</td>
          <td className="company-name-cell">{institute.name}</td>
          <td className="code-cell">{institute.code}</td>
          <td>{institute.type}</td>
          <td>{institute.city || institute.state}</td>
          <td>{institute.university || institute.regulatoryBody}</td>
          <td>{institute.email || "N/A"}</td>
          <td>
            {institute.website ? (
              <a href={institute.website} target="_blank" rel="noreferrer">
                {institute.website}
              </a>
            ) : (
              "N/A"
            )}
          </td>
          <td>{institute.charges ? `₹${institute.charges}` : "N/A"}</td>
          <td>
            <span
              className={`status ${
                institute.status === "Verified" ? "completed" : "pending"
              }`}
            >
              {institute.status}
            </span>
          </td>
          <td>
            <button
              className="view-cta remove-btn-theme"
              onClick={() => openDeleteModal(institute.name)}
            >
              Remove
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
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
                      <button className="secondary-cta full-width-center-btn">
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

      {showDeleteModal && (
        <div className="modal-overlay-blur">
          <div className="modal-card-wrapper">
            <h3 className="modal-title-heading">Remove Institute?</h3>
            <p className="modal-body-text">
              <strong>{selectedInstitute}</strong> will be permanently removed from the active verifier dropdown list.
            </p>
            <div className="modal-actions-right">
              <button className="secondary-cta pad-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="primary-cta pad-btn delete-confirm-bg" onClick={() => setShowDeleteModal(false)}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


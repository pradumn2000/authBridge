import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AddNewTl() {
  // Password hide/show state
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    password: "",
    email: "",
    role: "TL - Employment",
    status: true,
  });

  // Table Data
  const [teamLeads, setTeamLeads] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      email: "rohit.sharma@company.com",
      mobile: "+91 9876543210",
      role: "TL - Employment",
      roleClass: "role-employment",
      status: true,
      createdOn: "05 Sep 2025 10:24 AM",
    },
    {
      id: 2,
      name: "Priya Nair",
      email: "priya.nair@company.com",
      mobile: "+91 9123456780",
      role: "TL - Education",
      roleClass: "role-education",
      status: true,
      createdOn: "03 Sep 2025 02:15 PM",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit.verma@company.com",
      mobile: "+91 9988776655",
      role: "TL - Database",
      roleClass: "role-database",
      status: true,
      createdOn: "01 Sep 2025 11:42 AM",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      email: "neha.kapoor@company.com",
      mobile: "+91 8765432109",
      role: "TL - Criminal",
      roleClass: "role-criminal",
      status: true,
      createdOn: "29 Aug 2025 04:30 PM",
    },
    {
      id: 5,
      name: "Sandeep Yadav",
      email: "sandeep.yadav@company.com",
      mobile: "+91 7654321098",
      role: "TL - Global Database",
      roleClass: "role-global",
      status: true,
      createdOn: "27 Aug 2025 09:20 AM",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      password: "",
      email: "",
      role: "TL - Employment",
      status: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
  };

  return (
    <div className="add-tl-layout">
      <Sidebar />
      <div className="add-tl-main-content">
        <Header />

        <div className="add-tl-container">
          {/* Title Header */}
          <div className="add-tl-page-header">
            <h2>Add New TL</h2>
            <p>Create a new Team Lead and assign role with permissions</p>
          </div>

          {/* Form Card */}
          <div className="add-tl-card">
            <div className="add-tl-card-header">
              <i className="fa-solid fa-user-plus"></i> Add New TL
            </div>

            <form onSubmit={handleSubmit} className="add-tl-form-body">
              <div className="add-tl-form-grid">
                {/* Full Name */}
                <div className="add-tl-input-group">
                  <label>
                    Full Name <span>*</span>
                  </label>
                  <div className="add-tl-input-wrapper">
                    <i className="fa-regular fa-user input-icon"></i>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="add-tl-input-group">
                  <label>
                    Mobile Number <span>*</span>
                  </label>
                  <div className="add-tl-input-wrapper">
                    <i className="fa-solid fa-phone input-icon"></i>
                    <input
                      type="text"
                      name="mobileNumber"
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password with Eye Icon Toggle */}
                <div className="add-tl-input-group">
                  <label>
                    Password <span>*</span>
                  </label>
                  <div className="add-tl-input-wrapper">
                    <i className="fa-solid fa-lock input-icon"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={
                          showPassword
                            ? "fa-regular fa-eye-slash"
                            : "fa-regular fa-eye"
                        }
                      ></i>
                    </button>
                  </div>
                </div>

                {/* Email ID */}
                <div className="add-tl-input-group">
                  <label>
                    Email ID <span>*</span>
                  </label>
                  <div className="add-tl-input-wrapper">
                    <i className="fa-regular fa-envelope input-icon"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Select Role */}
                <div className="add-tl-input-group">
                  <label>
                    Select Role <span>*</span>
                  </label>
                  <div className="add-tl-input-wrapper select-wrapper">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="TL - Employment">TL - Employment</option>
                      <option value="TL - Education">TL - Education</option>
                      <option value="TL - Database">TL - Database</option>
                      <option value="TL - Criminal">TL - Criminal</option>
                      <option value="TL - Global Database">
                        TL - Global Database
                      </option>
                    </select>
                  </div>
                </div>

                {/* Status Switch */}
                <div className="add-tl-input-group">
                  <label>Status</label>
                  <div className="status-toggle-wrapper">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={formData.status}
                        onChange={handleStatusToggle}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="status-label">
                      {formData.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="add-tl-form-actions">
                <button
                  type="button"
                  className="add-tl-btn-reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className="add-tl-btn-submit">
                  <i className="fa-solid fa-user-plus"></i> Save TL
                </button>
              </div>
            </form>
          </div>

          {/* Table Card */}
          <div className="add-tl-card">
            <div className="add-tl-card-header table-card-header">
              <div className="header-title">
                <i className="fa-solid fa-users"></i> Created Team Leads
              </div>
              <div className="header-controls">
                <div className="table-search-box">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder="Search by name, email or role..."
                  />
                </div>
                <button className="add-tl-btn-filter">
                  <i className="fa-solid fa-filter"></i> Filter
                </button>
              </div>
            </div>

            <div className="add-tl-table-wrapper">
              <table className="add-tl-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Mobile Number</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamLeads.map((tl, index) => (
                    <tr key={tl.id}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{tl.name}</td>
                      <td className="text-muted">{tl.email}</td>
                      <td>{tl.mobile}</td>
                      <td>
                        <span className={`role-badge ${tl.roleClass}`}>
                          {tl.role}
                        </span>
                      </td>
                      <td>
                        <div className="table-status">
                          <span className="status-dot"></span> Active
                        </div>
                      </td>
                      <td className="text-muted">{tl.createdOn}</td>
                      <td>
                        <button className="action-menu-btn">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="add-tl-table-footer">
              <span>Showing 1 to 5 of 5 entries</span>
              <div className="pagination">
                <button disabled className="page-btn">
                  &lt;
                </button>
                <button className="page-btn active">1</button>
                <button disabled className="page-btn">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
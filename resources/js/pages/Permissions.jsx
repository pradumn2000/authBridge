import { useState } from "react";
import "../../css/style.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Permissions() {
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

  // Permissions Tab State
  const [activeTab, setActiveTab] = useState("permissions");

  // Module Permissions Checkbox State
  const [permissions, setPermissions] = useState({
    education: true,
    employment: true,
    address: true,
    identity: true,
    criminal: true,
    drugTest: true,
    courtroom: true,
    globalDatabase: true,
    caseAllocation: true,
    verifierCases: true,
    qcReview: true,
    reportWriting: true,
    finalReport: true,
    screenModule: true,
    universitySelection: true,
    viewPermission: true,
  });

  // Select All state
  const isAllSelected = Object.values(permissions).every(Boolean);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const updated = {};
    Object.keys(permissions).forEach((key) => {
      updated[key] = checked;
    });
    setPermissions(updated);
  };

  const handlePermissionChange = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Table Data State
  const [teamLeads, setTeamLeads] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      email: "rohit.sharma@company.com",
      mobile: "+91 9876543210",
      role: "TL - Employment",
      roleClass: "role-employment",
      permissionsCount: "12 Modules",
      status: true,
      createdOn: "05 Sep 2025\n10:24 AM",
    },
    {
      id: 2,
      name: "Priya Nair",
      email: "priya.nair@company.com",
      mobile: "+91 9123456780",
      role: "TL - Education",
      roleClass: "role-education",
      permissionsCount: "11 Modules",
      status: true,
      createdOn: "03 Sep 2025\n02:15 PM",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit.verma@company.com",
      mobile: "+91 9988776655",
      role: "TL - Database",
      roleClass: "role-database",
      permissionsCount: "10 Modules",
      status: true,
      createdOn: "01 Sep 2025\n11:42 AM",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      email: "neha.kapoor@company.com",
      mobile: "+91 8765432109",
      role: "TL - Criminal",
      roleClass: "role-criminal",
      permissionsCount: "9 Modules",
      status: true,
      createdOn: "29 Aug 2025\n04:30 PM",
    },
    {
      id: 5,
      name: "Sandeep Yadav",
      email: "sandeep.yadav@company.com",
      mobile: "+91 7654321098",
      role: "TL - Global Database",
      roleClass: "role-global",
      permissionsCount: "8 Modules",
      status: true,
      createdOn: "27 Aug 2025\n09:20 AM",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormStatusToggle = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleTableStatusToggle = (id) => {
    setTeamLeads((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
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
    console.log("Saved Data:", { formData, permissions });
  };

  return (
    <>
      <style>{`
        /* Layout Styling */
        .add-tl-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f9;
        }

        .add-tl-main-content {
          {/* flex: 1; */}
          display: flex;
          flex-direction: column;
        }

        .add-tl-container {
          padding: 20px 30px;
        }

        /* Page Header */
        .add-tl-page-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .add-tl-page-header p {
          font-size: 13px;
          color: #64748b;
          margin-top: 4px;
          margin-bottom: 20px;
          text-align: left;
        }

        /* Card General */
        .add-tl-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 25px;
          overflow: hidden;
        }

        .add-tl-card-header {
          background-color: #0f2c59;
          color: #ffffff;
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Form Styling */
        .add-tl-form-body {
          padding: 20px;
        }

        .add-tl-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .add-tl-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .add-tl-input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .add-tl-input-group label span {
          color: #ef4444;
        }

        .add-tl-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .add-tl-input-wrapper .input-icon-svg {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .add-tl-input-wrapper input,
        .add-tl-input-wrapper select {
          width: 100%;
          padding: 9px 12px 9px 38px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 13px;
          color: #1e293b;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .add-tl-input-wrapper input:focus,
        .add-tl-input-wrapper select:focus {
          border-color: #0f2c59;
        }

        .password-toggle-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .password-toggle-btn:hover {
          color: #0f2c59;
        }

        .password-toggle-btn svg {
          width: 18px;
          height: 18px;
        }

        .select-wrapper select {
          padding-left: 12px;
          appearance: none;
          background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")
            no-repeat right 12px center;
          background-size: 10px auto;
        }

        /* Status Toggle Switch */
        .status-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 38px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 22px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: 0.3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
        }

        input:checked + .slider {
          background-color: #10b981;
        }

        input:checked + .slider:before {
          transform: translateX(22px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .status-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        /* Tabs Navigation */
        .permissions-tab-bar {
          display: flex;
          gap: 20px;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 20px;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 8px 4px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          position: relative;
        }

        .tab-btn.active {
          color: #10b981;
        }

        .tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #10b981;
          border-radius: 2px;
        }

        /* Permissions Card */
        .perm-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .select-all-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .select-all-label input {
          cursor: pointer;
          accent-color: #10b981;
          width: 15px;
          height: 15px;
        }

        .permissions-grid {
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
        }

        .perm-checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }

        .perm-checkbox-item:hover {
          border-color: #0f2c59;
        }

        .perm-checkbox-item input {
          accent-color: #10b981;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .perm-info-text {
          padding: 0 20px 15px 20px;
          font-size: 12px;
          color: #0284c7;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Buttons */
        .add-tl-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .add-tl-btn-reset {
          padding: 8px 24px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .add-tl-btn-submit {
          padding: 8px 20px;
          border: none;
          background: #0f2c59;
          color: #ffffff;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Table Styling */
        .table-card-header {
          justify-content: space-between;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .table-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .table-search-box svg {
          position: absolute;
          left: 10px;
          color: #94a3b8;
          width: 14px;
          height: 14px;
        }

        .table-search-box input {
          padding: 6px 12px 6px 30px;
          border-radius: 4px;
          border: none;
          font-size: 12px;
          width: 220px;
          outline: none;
        }

        .add-tl-btn-filter {
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .add-tl-table-wrapper {
          overflow-x: auto;
        }

        .add-tl-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .add-tl-table th {
          background-color: #f8fafc;
          color: #475569;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
        }

        .add-tl-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
          vertical-align: middle;
        }

        .fw-bold {
          font-weight: 600;
        }

        .text-muted {
          color: #64748b;
          white-space: pre-line;
        }

        .perm-link {
          color: #2563eb;
          font-weight: 500;
          cursor: pointer;
        }

        /* Role Badges */
        .role-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .role-employment { background-color: #e0f2fe; color: #0284c7; }
        .role-education { background-color: #f3e8ff; color: #9333ea; }
        .role-database { background-color: #dcfce7; color: #16a34a; }
        .role-criminal { background-color: #ffedd5; color: #ea580c; }
        .role-global { background-color: #ccfbf1; color: #0d9488; }

        .action-menu-btn {
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-menu-btn:hover {
          background-color: #f1f5f9;
          color: #0f2c59;
        }

        .add-tl-table-footer {
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748b;
        }

        .pagination {
          display: flex;
          gap: 4px;
        }

        .page-btn {
          border: 1px solid #cbd5e1;
          background: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .page-btn.active {
          background: #0f2c59;
          color: #fff;
          border-color: #0f2c59;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="add-tl-layout">
        <Sidebar />
        <div className="add-tl-main-content" id="content">
          <Header />

          <div className="add-tl-container">
            {/* Title Header */}
            <div className="add-tl-page-header">
              <h2>Add New TL</h2>
              <p>Create a new Team Lead and assign role with permissions</p>
            </div>

            

            {/* Middle Section: Permissions Tabs & Module Checkboxes */}
            <div className="permissions-tab-bar">
              <button
                className={`tab-btn ${activeTab === "permissions" ? "active" : ""}`}
                onClick={() => setActiveTab("permissions")}
              >
                Permissions
              </button>
              {/* <button
                className={`tab-btn ${activeTab === "screen" ? "active" : ""}`}
                onClick={() => setActiveTab("screen")}
              >
                Screen / Module Permissions
              </button> */}
            </div>

            {/* Module Permissions Card */}
            <div className="add-tl-card">
              <div className="add-tl-card-header perm-card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Module Permissions
                </div>
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>

              <div className="permissions-grid">
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.education}
                    onChange={() => handlePermissionChange("education")}
                  />
                  Education Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.employment}
                    onChange={() => handlePermissionChange("employment")}
                  />
                  Employment Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.address}
                    onChange={() => handlePermissionChange("address")}
                  />
                  Address Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.identity}
                    onChange={() => handlePermissionChange("identity")}
                  />
                  Identity/Database Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.criminal}
                    onChange={() => handlePermissionChange("criminal")}
                  />
                  Criminal Verification
                </label>

                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.drugTest}
                    onChange={() => handlePermissionChange("drugTest")}
                  />
                  Drug Test
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.courtroom}
                    onChange={() => handlePermissionChange("courtroom")}
                  />
                  Courtroom Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.globalDatabase}
                    onChange={() => handlePermissionChange("globalDatabase")}
                  />
                  Global Database Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.caseAllocation}
                    onChange={() => handlePermissionChange("caseAllocation")}
                  />
                  Case Allocation
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.verifierCases}
                    onChange={() => handlePermissionChange("verifierCases")}
                  />
                  Verifier Cases
                </label>

                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.qcReview}
                    onChange={() => handlePermissionChange("qcReview")}
                  />
                  QC Review
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.reportWriting}
                    onChange={() => handlePermissionChange("reportWriting")}
                  />
                  Report Writing
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.finalReport}
                    onChange={() => handlePermissionChange("finalReport")}
                  />
                  Final Report Approval
                </label>
                {/* <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.screenModule}
                    onChange={() => handlePermissionChange("screenModule")}
                  />
                  Screen / Module Permissions
                </label> */}
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.universitySelection}
                    onChange={() => handlePermissionChange("universitySelection")}
                  />
                  University Selection
                </label>

               
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.viewPermission}
                    onChange={() => handlePermissionChange("viewPermission")}
                  />
                  View Permission
                </label>
              </div>

              <div className="perm-info-text">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                Team Lead will be able to view, manage and assign selected verification modules.
              </div>
            </div>

            {/* Table Card */}
            <div className="add-tl-card">
              <div className="add-tl-card-header table-card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Created Team Leads
                </div>
                <div className="header-controls">
                  <div className="table-search-box">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" placeholder="Search by name, email or role..." />
                  </div>
                  <button className="add-tl-btn-filter">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
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
                      <th>Permissions</th>
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
                        <td className="perm-link">{tl.permissionsCount}</td>
                        <td>
                          <div className="status-toggle-wrapper">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={tl.status}
                                onChange={() => handleTableStatusToggle(tl.id)}
                              />
                              <span className="slider round"></span>
                            </label>
                            <span className="status-label">
                              {tl.status ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>
                        <td className="text-muted">{tl.createdOn}</td>
                        <td>
                          <button className="action-menu-btn" title="Actions">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="add-tl-table-footer">
                <span>Showing 1 to 5 of 5 entries</span>
                <div className="pagination">
                  <button disabled className="page-btn">&lt;</button>
                  <button className="page-btn active">1</button>
                  <button disabled className="page-btn">&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
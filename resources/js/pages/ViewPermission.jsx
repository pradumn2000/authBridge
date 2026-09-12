import { useState } from "react";
import "../../css/style.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ViewPermission() {
  // Dropdown States
  const [selectedRole, setSelectedRole] = useState("TL - Education");
  const [selectedName, setSelectedName] = useState("Priya Nair");

  // Section Toggle States
  const [sectionStatus, setSectionStatus] = useState({
    mainHeader: true,
    educationVerification: true,
    universitySelection: true,
    screenModulePermissions: true,
    otherPermissions: false,
  });

  // Checkbox Sub-Permissions State
  const [subPermissions, setSubPermissions] = useState({
    // Education Verification
    viewCases: true,
    verifyDocuments: true,
    generateReport: true,
    qcReview: true,

    // University Selection
    viewUniversities: true,
    manageCharges: true,
    applyGst: true,
    viewReports: true,

    // Screen / Module Permissions
    educationCases: true,
    addNewEducation: true,
    viewUniversityCharges: true,
    viewDashboard: true,

    // Other Permissions
    reportDownload: false,
    bulkAction: false,
    dataExport: false,
    settingsAccess: false,
  });

  const handleToggle = (key) => {
    setSectionStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (key) => {
    setSubPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <style>{`
        /* Layout Structure */
        .view-perm-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f9;
        }

        .view-perm-main-content {
          {/* flex: 1; */}
          display: flex;
          flex-direction: column;
        }

        .view-perm-container {
          padding: 20px 30px;
        }

        /* Top Page Header */
        .view-perm-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .view-perm-header-icon {
          width: 36px;
          height: 36px;
          background-color: #e0f2fe;
          color: #0284c7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-perm-header-title h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .view-perm-header-title p {
          font-size: 13px;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        /* Top Dropdowns & Info Card Grid */
        .view-perm-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .view-perm-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          padding: 16px;
        }

        .input-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
          display: block;
        }

        .input-label span {
          color: #ef4444;
        }

        .select-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-input-wrapper .input-icon {
          position: absolute;
          left: 12px;
          color: #64748b;
          width: 18px;
          height: 18px;
          pointer-events: none;
        }

        .select-input-wrapper select {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 13px;
          color: #1e293b;
          outline: none;
          background-color: #ffffff;
          appearance: none;
          background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")
            no-repeat right 12px center;
          background-size: 10px auto;
        }

        /* Top Info Box */
        .user-info-card {
          background-color: #f0f7ff;
          border: 1px solid #e0f2fe;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .user-info-icon {
          color: #0f2c59;
          margin-top: 2px;
        }

        .user-info-details h4 {
          margin: 0;
          font-size: 13px;
          color: #1e293b;
          font-weight: 700;
        }

        .user-info-details p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }

        /* Main Section Header Bar */
        .section-header-bar {
          background-color: #0f2c59;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 600;
        }

        .section-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge-status {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .badge-enabled {
          background-color: #ffffff;
          color: #0f2c59;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10b981;
        }

        /* Permissions Container Box */
        .permissions-wrapper-card {
          background: #ffffff;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 20px;
        }

        /* Individual Permission Row Block */
        .perm-row-block {
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .perm-row-block:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .perm-row-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .perm-title-group {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .perm-icon-box {
          color: #0f2c59;
          margin-top: 2px;
        }

        .perm-title-text h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
        }

        .perm-title-text p {
          margin: 2px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }

        /* Toggle Switch Styling */
        .toggle-switch-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 42px;
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
          transform: translateX(20px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .switch-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          min-width: 45px;
        }

        .switch-label.enabled {
          color: #10b981;
        }

        /* Sub Checkboxes Grid */
        .sub-perm-grid {
          background-color: #f8fafc;
          border-radius: 6px;
          padding: 12px 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .checkbox-label-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }

        .checkbox-label-item input {
          accent-color: #10b981;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        /* Bottom Info Banner */
        .bottom-info-banner {
          background-color: #e0f2fe;
          color: #0369a1;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
        }
      `}</style>

      <div className="view-perm-layout">
        <Sidebar />
        <div className="view-perm-main-content" id="content">
          <Header />

          <div className="view-perm-container">
            {/* Title Header */}
            <div className="view-perm-header-title">
              <div className="view-perm-header-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h2>View Permission</h2>
                <p>Check the permissions assigned to each Team Lead role</p>
              </div>
            </div>

            {/* Top Controls Grid */}
            <div className="view-perm-top-grid">
              {/* Select TL Role */}
              <div className="view-perm-card">
                <label className="input-label">
                  Select TL Role <span>*</span>
                </label>
                <div className="select-input-wrapper">
                  <svg className="input-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="TL - Education">TL - Education</option>
                    <option value="TL - Employment">TL - Employment</option>
                    <option value="TL - Database">TL - Database</option>
                    <option value="TL - Criminal">TL - Criminal</option>
                  </select>
                </div>
              </div>

              {/* Select TL Name */}
              <div className="view-perm-card">
                <label className="input-label">
                  Select TL Name <span>*</span>
                </label>
                <div className="select-input-wrapper">
                  <svg className="input-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <select
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                  >
                    <option value="Priya Nair">Priya Nair</option>
                    <option value="Rohit Sharma">Rohit Sharma</option>
                    <option value="Amit Verma">Amit Verma</option>
                    <option value="Neha Kapoor">Neha Kapoor</option>
                  </select>
                </div>
              </div>

              {/* User Summary Info Card */}
              <div className="view-perm-card user-info-card">
                <div className="user-info-icon">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="user-info-details">
                  <h4>Role: {selectedRole}</h4>
                  <h4>Name: {selectedName}</h4>
                  <p>You are viewing the permissions assigned to this Team Lead.</p>
                </div>
              </div>
            </div>

            {/* Section Header Bar */}
            <div className="section-header-bar">
              <div className="section-header-title">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                {selectedRole} Permissions
              </div>
              <span className="badge-status badge-enabled">
                <span className="badge-dot"></span> Enabled
              </span>
            </div>

            {/* Permissions Card Body */}
            <div className="permissions-wrapper-card">

              {/* 1. Education Verification Block */}
              <div className="perm-row-block">
                <div className="perm-row-header">
                  <div className="perm-title-group">
                    <div className="perm-icon-box">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div className="perm-title-text">
                      <h3>Education Verification</h3>
                      <p>Can view and manage education verification cases</p>
                    </div>
                  </div>
                  <div className="toggle-switch-group">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={sectionStatus.educationVerification}
                        onChange={() => handleToggle("educationVerification")}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`switch-label ${sectionStatus.educationVerification ? "enabled" : ""}`}>
                      {sectionStatus.educationVerification ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div className="sub-perm-grid">
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.viewCases}
                      onChange={() => handleCheckboxChange("viewCases")}
                    />
                    View Cases
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.verifyDocuments}
                      onChange={() => handleCheckboxChange("verifyDocuments")}
                    />
                    Verify Documents
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.generateReport}
                      onChange={() => handleCheckboxChange("generateReport")}
                    />
                    Generate Report
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.qcReview}
                      onChange={() => handleCheckboxChange("qcReview")}
                    />
                    QC Review
                  </label>
                </div>
              </div>

              {/* 2. University Selection Block */}
              <div className="perm-row-block">
                <div className="perm-row-header">
                  <div className="perm-title-group">
                    <div className="perm-icon-box">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="perm-title-text">
                      <h3>University Selection</h3>
                      <p>Can view and manage university selection</p>
                    </div>
                  </div>
                  <div className="toggle-switch-group">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={sectionStatus.universitySelection}
                        onChange={() => handleToggle("universitySelection")}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`switch-label ${sectionStatus.universitySelection ? "enabled" : ""}`}>
                      {sectionStatus.universitySelection ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div className="sub-perm-grid">
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.viewUniversities}
                      onChange={() => handleCheckboxChange("viewUniversities")}
                    />
                    View Universities
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.manageCharges}
                      onChange={() => handleCheckboxChange("manageCharges")}
                    />
                    Manage Charges
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.applyGst}
                      onChange={() => handleCheckboxChange("applyGst")}
                    />
                    Apply GST
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.viewReports}
                      onChange={() => handleCheckboxChange("viewReports")}
                    />
                    View Reports
                  </label>
                </div>
              </div>

              {/* 3. Screen / Module Permissions Block */}
              <div className="perm-row-block">
                <div className="perm-row-header">
                  <div className="perm-title-group">
                    <div className="perm-icon-box">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div className="perm-title-text">
                      <h3>Screen / Module Permissions</h3>
                      <p>Access to specific screens and modules</p>
                    </div>
                  </div>
                  <div className="toggle-switch-group">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={sectionStatus.screenModulePermissions}
                        onChange={() => handleToggle("screenModulePermissions")}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`switch-label ${sectionStatus.screenModulePermissions ? "enabled" : ""}`}>
                      {sectionStatus.screenModulePermissions ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div className="sub-perm-grid">
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.educationCases}
                      onChange={() => handleCheckboxChange("educationCases")}
                    />
                    Education Cases
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.addNewEducation}
                      onChange={() => handleCheckboxChange("addNewEducation")}
                    />
                    Add New Education
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.viewUniversityCharges}
                      onChange={() => handleCheckboxChange("viewUniversityCharges")}
                    />
                    View University Charges
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.viewDashboard}
                      onChange={() => handleCheckboxChange("viewDashboard")}
                    />
                    View Dashboard
                  </label>
                </div>
              </div>

              {/* 4. Other Permissions Block */}
              <div className="perm-row-block">
                <div className="perm-row-header">
                  <div className="perm-title-group">
                    <div className="perm-icon-box">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                    </div>
                    <div className="perm-title-text">
                      <h3>Other Permissions</h3>
                      <p>Additional access and actions</p>
                    </div>
                  </div>
                  <div className="toggle-switch-group">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={sectionStatus.otherPermissions}
                        onChange={() => handleToggle("otherPermissions")}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className={`switch-label ${sectionStatus.otherPermissions ? "enabled" : ""}`}>
                      {sectionStatus.otherPermissions ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div className="sub-perm-grid">
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.reportDownload}
                      onChange={() => handleCheckboxChange("reportDownload")}
                    />
                    Report Download
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.bulkAction}
                      onChange={() => handleCheckboxChange("bulkAction")}
                    />
                    Bulk Action
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.dataExport}
                      onChange={() => handleCheckboxChange("dataExport")}
                    />
                    Data Export
                  </label>
                  <label className="checkbox-label-item">
                    <input
                      type="checkbox"
                      checked={subPermissions.settingsAccess}
                      onChange={() => handleCheckboxChange("settingsAccess")}
                    />
                    Settings Access
                  </label>
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="bottom-info-banner">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                Only the permissions assigned to this Team Lead are shown here.
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
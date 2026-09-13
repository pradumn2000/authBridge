import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CriminalUserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="cup-layout">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="cup-main-content">
        {/* Header Component */}
        <Header />

        {/* Component Styles */}
        <style>{`
          .cup-layout {
            display: flex;
            min-height: 100vh;
            background-color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #334155;
          }

          .cup-main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
          }

          .cup-container {
            padding: 24px;
          }

          .cup-back-wrapper {
            margin-bottom: 16px;
          }

          .cup-back-btn {
            background: none;
            border: none;
            color: #475569;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 0;
          }

          .cup-back-btn:hover {
            color: #1e293b;
          }

          .cup-card {
            background: #ffffff;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
          }

          .cup-header-card {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 16px;
          }

          .cup-profile-left {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          .cup-avatar {
            width: 80px;
            height: 90px;
            border-radius: 6px;
            object-fit: cover;
            border: 1px solid #cbd5e1;
          }

          .cup-name-badge {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 14px;
          }

          .cup-name-badge h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
          }

          .cup-status-tag {
            font-size: 12px;
            padding: 2px 10px;
            border-radius: 12px;
            font-weight: 500;
          }

          .cup-status-tag.completed {
            background-color: #dcfce7;
            color: #166534;
          }

          .cup-info-grid {
            display: flex;
            gap: 28px;
            flex-wrap: wrap;
          }

          .cup-label {
            display: block;
            font-size: 11px;
            color: #64748b;
            margin-bottom: 3px;
          }

          .cup-value {
            font-size: 13px;
            font-weight: 600;
            color: #1e293b;
          }

          .cup-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .cup-btn {
            padding: 8px 14px;
            font-size: 13px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }

          .cup-btn-outline {
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #334155;
          }

          .cup-btn-outline:hover {
            background: #f1f5f9;
          }

          .cup-btn-primary {
            background: #2563eb;
            color: #ffffff;
            border: none;
          }

          .cup-btn-primary:hover {
            background: #1d4ed8;
          }

          .cup-tabs {
            display: flex;
            gap: 24px;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 20px;
          }

          .cup-tab-btn {
            background: none;
            border: none;
            padding: 10px 4px;
            font-size: 14px;
            color: #64748b;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            font-weight: 500;
          }

          .cup-tab-btn.active {
            color: #2563eb;
            border-bottom-color: #2563eb;
            font-weight: 600;
          }

          .cup-grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
          }

          .cup-card-header h3 {
            margin: 0 0 16px 0;
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
          }

          .cup-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px 24px;
          }

          .cup-sub-label {
            font-size: 12px;
            color: #64748b;
            display: block;
          }

          .cup-sub-val {
            margin: 3px 0 0 0;
            font-size: 13px;
            font-weight: 500;
            color: #0f172a;
          }

          .text-green {
            color: #16a34a;
          }

          .cup-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }

          .cup-table th {
            text-align: left;
            background: #f8fafc;
            padding: 10px;
            color: #64748b;
            font-weight: 600;
            border-bottom: 1px solid #e2e8f0;
          }

          .cup-table td {
            padding: 12px 10px;
            border-top: 1px solid #f1f5f9;
            color: #334155;
          }

          .cup-badge-verified {
            background: #dcfce7;
            color: #15803d;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
          }

          .cup-doc-actions {
            display: flex;
            gap: 10px;
          }

          .cup-link-btn {
            background: none;
            border: none;
            color: #2563eb;
            cursor: pointer;
            font-size: 12px;
            padding: 0;
            font-weight: 500;
          }

          .cup-timeline {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .cup-timeline-item {
            display: flex;
            gap: 14px;
          }

          .cup-timeline-dot {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #2563eb;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            flex-shrink: 0;
          }

          .cup-timeline-dot.success {
            background: #16a34a;
          }

          .cup-timeline-content h4 {
            margin: 0;
            font-size: 13px;
            color: #0f172a;
          }

          .cup-timeline-content p {
            margin: 2px 0 0 0;
            font-size: 12px;
            color: #64748b;
          }

          .cup-time {
            font-size: 11px;
            color: #94a3b8;
          }

          .cup-remarks-text {
            font-size: 13px;
            color: #475569;
            margin: 0;
            line-height: 1.5;
          }
        `}</style>

        {/* Page Container */}
        <div className="cup-container">
          {/* Back Button */}
          <div className="cup-back-wrapper">
            <button className="cup-back-btn" onClick={() => navigate("/CriminalCheck")}>
              ← Back to List
            </button>
          </div>

          {/* Top Profile Card */}
          <div className="cup-card cup-header-card">
            <div className="cup-profile-left">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="cup-avatar"
              />
              <div className="cup-user-meta">
                <div className="cup-name-badge">
                  <h2>Amit Sharma</h2>
                  <span className="cup-status-tag completed">Completed</span>
                </div>
                <div className="cup-info-grid">
                  <div>
                    <span className="cup-label">📄 Candidate ID</span>
                    <span className="cup-value">PV-001234</span>
                  </div>
                  <div>
                    <span className="cup-label">🏢 Client Name</span>
                    <span className="cup-value">ABC Pvt. Ltd.</span>
                  </div>
                  <div>
                    <span className="cup-label">💼 Job Role</span>
                    <span className="cup-value">Software Developer</span>
                  </div>
                  <div>
                    <span className="cup-label">📞 Mobile Number</span>
                    <span className="cup-value">+91 98765 43210</span>
                  </div>
                  <div>
                    <span className="cup-label">✉ Email ID</span>
                    <span className="cup-value">amit.sharma@email.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cup-actions">
              <button className="cup-btn cup-btn-outline">📥 Download Report</button>
              <button className="cup-btn cup-btn-outline">👁 View Documents</button>
              <button className="cup-btn cup-btn-primary">✈ Send Verification Link</button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="cup-tabs">
            {["Overview", "Verification Details", "Documents", "Activity Log"].map((tab) => (
              <button
                key={tab}
                className={`cup-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Grid Content */}
          <div className="cup-grid-2">
            {/* Personal Information */}
            <div className="cup-card">
              <div className="cup-card-header">
                <h3>👤 Personal Information</h3>
              </div>
              <div className="cup-details-grid">
                <div>
                  <span className="cup-sub-label">Full Name</span>
                  <p className="cup-sub-val">Amit Sharma</p>
                </div>
                <div>
                  <span className="cup-sub-label">Current Address</span>
                  <p className="cup-sub-val">B-102, Green Park, New Delhi - 110016</p>
                </div>
                <div>
                  <span className="cup-sub-label">Date of Birth</span>
                  <p className="cup-sub-val">15-06-1995</p>
                </div>
                <div>
                  <span className="cup-sub-label">Permanent Address</span>
                  <p className="cup-sub-val">B-102, Green Park, New Delhi - 110016</p>
                </div>
                <div>
                  <span className="cup-sub-label">Gender</span>
                  <p className="cup-sub-val">Male</p>
                </div>
                <div>
                  <span className="cup-sub-label">Nationality</span>
                  <p className="cup-sub-val">Indian</p>
                </div>
                <div>
                  <span className="cup-sub-label">Father's Name</span>
                  <p className="cup-sub-val">Ramesh Sharma</p>
                </div>
                <div>
                  <span className="cup-sub-label">Marital Status</span>
                  <p className="cup-sub-val">Single</p>
                </div>
                <div>
                  <span className="cup-sub-label">Mother's Name</span>
                  <p className="cup-sub-val">Sunita Sharma</p>
                </div>
                <div>
                  <span className="cup-sub-label">Educational Qualification</span>
                  <p className="cup-sub-val">B.Tech</p>
                </div>
              </div>
            </div>

            {/* Police Verification Details */}
            <div className="cup-card">
              <div className="cup-card-header">
                <h3>🛡 Police Verification Details</h3>
              </div>
              <div className="cup-details-grid">
                <div>
                  <span className="cup-sub-label">Verification Mode</span>
                  <p className="cup-sub-val text-green">Online</p>
                </div>
                <div>
                  <span className="cup-sub-label">Reference Number</span>
                  <p className="cup-sub-val">PV-001234</p>
                </div>
                <div>
                  <span className="cup-sub-label">Purpose of Verification</span>
                  <p className="cup-sub-val">Pre-Employment Verification</p>
                </div>
                <div>
                  <span className="cup-sub-label">Verification Date</span>
                  <p className="cup-sub-val">12-09-2025</p>
                </div>
                <div>
                  <span className="cup-sub-label">State</span>
                  <p className="cup-sub-val">Delhi</p>
                </div>
                <div>
                  <span className="cup-sub-label">Expected TAT</span>
                  <p className="cup-sub-val">7 Days</p>
                </div>
                <div>
                  <span className="cup-sub-label">District</span>
                  <p className="cup-sub-val">New Delhi</p>
                </div>
                <div>
                  <span className="cup-sub-label">Status</span>
                  <p style={{ margin: "3px 0 0 0" }}>
                    <span className="cup-status-tag completed">Completed</span>
                  </p>
                </div>
                <div>
                  <span className="cup-sub-label">Police Station</span>
                  <p className="cup-sub-val">Central Police Station</p>
                </div>
                <div>
                  <span className="cup-sub-label">Assigned Verifier</span>
                  <p className="cup-sub-val">Rohit Verma</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cup-grid-2">
            {/* Documents Table */}
            <div className="cup-card">
              <div className="cup-card-header">
                <h3>📄 Documents</h3>
              </div>
              <table className="cup-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Uploaded On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "ID Proof (Aadhaar Card)", type: "Identity Proof", date: "12-09-2025" },
                    { name: "Address Proof (Utility Bill)", type: "Address Proof", date: "12-09-2025" },
                    { name: "Passport Size Photo", type: "Photo", date: "12-09-2025" },
                    { name: "Police Verification Form", type: "Form", date: "12-09-2025" },
                  ].map((doc, idx) => (
                    <tr key={idx}>
                      <td>{doc.name}</td>
                      <td>{doc.type}</td>
                      <td>{doc.date}</td>
                      <td><span className="cup-badge-verified">Verified</span></td>
                      <td>
                        <div className="cup-doc-actions">
                          <button className="cup-link-btn">👁 View</button>
                          <button className="cup-link-btn">📥 Download</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Verification Timeline */}
            <div className="cup-card">
              <div className="cup-card-header">
                <h3>⏱ Verification Timeline</h3>
              </div>
              <div className="cup-timeline">
                <div className="cup-timeline-item">
                  <div className="cup-timeline-dot">✓</div>
                  <div className="cup-timeline-content">
                    <span className="cup-time">12-09-2025</span>
                    <h4>Verification Requested</h4>
                    <p>Police verification initiated by admin.</p>
                  </div>
                </div>
                <div className="cup-timeline-item">
                  <div className="cup-timeline-dot">✓</div>
                  <div className="cup-timeline-content">
                    <span className="cup-time">13-09-2025</span>
                    <h4>In Progress</h4>
                    <p>Verification process started.</p>
                  </div>
                </div>
                <div className="cup-timeline-item">
                  <div className="cup-timeline-dot success">✓</div>
                  <div className="cup-timeline-content">
                    <span className="cup-time">16-09-2025</span>
                    <h4>Completed</h4>
                    <p>Police verification completed successfully.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          <div className="cup-card">
            <div className="cup-card-header">
              <h3>📋 Remarks</h3>
            </div>
            <p className="cup-remarks-text">
              No discrepancies found. Candidate's background verified successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriminalUserProfile;
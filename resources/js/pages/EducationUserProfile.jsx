import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function EducationUserProfile() {
  const navigate = useNavigate();
  const [selectedQualification, setSelectedQualification] = useState("10th (Secondary)");
  const [activeRightTab, setActiveRightTab] = useState("documents");
  const [verifier, setVerifier] = useState("Amit Kumar");

  // Sample Qualifications Data as shown in design
  const qualifications = [
    { id: 1, type: "10th (Secondary)", course: "General", institute: "Kendriya Vidyalaya No.1", year: "2012", status: "Pending" },
    { id: 2, type: "12th (Higher Secondary)", course: "Science", institute: "Kendriya Vidyalaya No.1", year: "2014", status: "Pending" },
    { id: 3, type: "Graduation", course: "B.Tech - Computer Science", institute: "Visvesvaraya Technological University", year: "2018", status: "Pending" },
    { id: 4, type: "Post Graduation", course: "M.Tech - Software Engineering", institute: "Indian Institute of Technology", year: "2020", status: "Pending" },
    { id: 5, type: "Diploma / Certification", course: "Java Full Stack Development", institute: "JSpiders Training Institute", year: "2018", status: "Pending" },
    { id: 6, type: "Professional Certification", course: "AWS Certified Solutions Architect", institute: "Amazon Web Services", year: "2021", status: "Pending" },
    { id: 7, type: "Any Other", course: "NCC - 'B' Certificate", institute: "13 Karnataka BN NCC", year: "2013", status: "Pending" },
    { id: 8, type: "Any Other", course: "Spoken English Course", institute: "British Council", year: "2015", status: "Pending" },
  ];

  return (
    <div className="eup-app-layout">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="eup-main-wrapper" id="content">
        {/* Header Component */}
        <Header />

        {/* Main Content Container */}
        <div className="eup-container">
          <style>{`
            .eup-app-layout {
              display: flex;
              min-height: 100vh;
              background-color: #f8fafc;
            }

            .eup-main-wrapper {
              {/* flex: 1; */}
              display: flex;
              flex-direction: column;
              {/* overflow-x: hidden; */}
            }

            .eup-container {
              padding: 20px 24px;
              background-color: #f8fafc;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #1e293b;
            }

            /* Global Paragraph Style as requested */
            p {
              color: rgb(100, 116, 139) !important;
              text-align: left !important;
              margin: 0;
            }

            .eup-top-bar {
              margin-bottom: 16px;
            }

            .eup-back-btn {
              background: none;
              border: none;
              color: #2563eb;
              font-weight: 600;
              cursor: pointer;
              font-size: 14px;
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 0;
            }

            /* Top Overview Header Cards */
            .eup-top-grid {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr;
              gap: 16px;
              margin-bottom: 20px;
            }

            .eup-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 16px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            }

            .eup-profile-header {
              display: flex;
              gap: 16px;
            }

            .eup-avatar {
              width: 56px;
              height: 56px;
              border-radius: 50%;
              object-fit: cover;
            }

            .eup-profile-info {
              flex: 1;
            }

            .eup-title-badge {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 12px;
            }

            .eup-title-badge h3 {
              margin: 0;
              font-size: 18px;
              font-weight: 700;
              color: #0f172a;
            }

            .eup-badge-active {
              background: #dcfce7;
              color: #15803d;
              font-size: 11px;
              padding: 2px 8px;
              border-radius: 12px;
              font-weight: 600;
            }

            .eup-details-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px 8px;
            }

            .eup-meta-item label {
              font-size: 11px;
              color: #64748b;
              display: block;
              margin-bottom: 2px;
            }

            .eup-meta-item span {
              font-size: 12px;
              font-weight: 600;
              color: #1e293b;
            }

            /* Overview & Verifier Cards */
            .eup-card h4 {
              margin: 0 0 12px 0;
              font-size: 13px;
              font-weight: 700;
              color: #1e293b;
            }

            .eup-overview-row {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-bottom: 8px;
            }

            .eup-overview-row span {
              color: #64748b;
              display: flex;
              align-items: center;
              gap: 6px;
            }

            .eup-overview-row strong {
              color: #0f172a;
            }

            .eup-select-input {
              width: 100%;
              padding: 8px 10px;
              border-radius: 6px;
              border: 1px solid #cbd5e1;
              font-size: 12px;
              margin-top: 6px;
              margin-bottom: 16px;
              background-color: #fff;
            }

            .eup-btn-primary {
              width: 100%;
              background: #1d4ed8;
              color: #ffffff;
              border: none;
              padding: 9px;
              border-radius: 6px;
              font-weight: 600;
              font-size: 12px;
              cursor: pointer;
              text-align: center;
            }

            .eup-btn-primary:hover {
              background: #1e40af;
            }

            /* Main Layout Body */
            .eup-main-layout {
              display: grid;
              grid-template-columns: 1.5fr 1fr;
              gap: 16px;
              align-items: start;
            }

            .eup-section-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            }

            .eup-section-header h3 {
              margin: 0;
              font-size: 15px;
              font-weight: 700;
              color: #0f172a;
            }

            .eup-btn-download {
              background: #ffffff;
              border: 1px solid #cbd5e1;
              color: #2563eb;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              cursor: pointer;
            }

            /* Table Styles */
            .eup-table-container {
              overflow-x: auto;
            }

            .eup-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
            }

            .eup-table th {
              background: #f1f5f9;
              color: #475569;
              text-align: left;
              padding: 10px 8px;
              font-weight: 600;
              border-bottom: 1px solid #e2e8f0;
            }

            .eup-table td {
              padding: 12px 8px;
              border-bottom: 1px solid #f1f5f9;
              color: #334155;
            }

            .eup-table tr.selected {
              background-color: #eff6ff;
            }

            .eup-badge-pending {
              background: #fef3c7;
              color: #d97706;
              font-weight: 600;
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 11px;
            }

            .eup-action-icon {
              background: none;
              border: none;
              color: #2563eb;
              cursor: pointer;
              font-size: 14px;
            }

            /* Right Side Qualification Details Panel */
            .eup-right-panel {
              position: relative;
            }

            .eup-close-panel {
              position: absolute;
              right: 16px;
              top: 16px;
              background: none;
              border: none;
              font-size: 16px;
              color: #64748b;
              cursor: pointer;
            }

            .eup-panel-tabs {
              display: flex;
              gap: 16px;
              border-bottom: 1px solid #e2e8f0;
              margin-bottom: 16px;
              margin-top: 8px;
            }

            .eup-panel-tab-btn {
              background: none;
              border: none;
              padding: 6px 0 10px 0;
              font-size: 12px;
              color: #64748b;
              cursor: pointer;
              border-bottom: 2px solid transparent;
            }

            .eup-panel-tab-btn.active {
              color: #2563eb;
              font-weight: 600;
              border-bottom-color: #2563eb;
            }

            .eup-docs-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            }

            .eup-docs-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
              margin-bottom: 16px;
            }

            .eup-docs-table th {
              color: #64748b;
              text-align: left;
              padding: 6px 4px;
              border-bottom: 1px solid #e2e8f0;
            }

            .eup-docs-table td {
              padding: 8px 4px;
              border-bottom: 1px solid #f1f5f9;
            }

            /* Dropzone Box */
            .eup-dropzone {
              border: 1px dashed #cbd5e1;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              background: #f8fafc;
              margin-bottom: 16px;
            }

            .eup-upload-icon {
              font-size: 24px;
              color: #2563eb;
              margin-bottom: 4px;
            }

            .eup-browse-btn {
              background: #ffffff;
              border: 1px solid #cbd5e1;
              padding: 4px 12px;
              border-radius: 4px;
              font-size: 11px;
              cursor: pointer;
              margin-top: 6px;
              color: #1e293b;
              font-weight: 500;
            }

            .eup-remarks-box {
              margin-top: 12px;
            }

            .eup-remarks-box textarea {
              width: 100%;
              height: 60px;
              border: 1px solid #cbd5e1;
              border-radius: 6px;
              padding: 8px;
              font-size: 12px;
              margin-top: 6px;
              box-sizing: border-box;
              resize: none;
            }

            /* Bottom Action Bar */
            .eup-bottom-actions {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 24px;
              padding-top: 16px;
              border-top: 1px solid #e2e8f0;
            }

            .eup-btn-secondary {
              background: #ffffff;
              border: 1px solid #cbd5e1;
              color: #2563eb;
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              cursor: pointer;
            }

            .eup-right-actions {
              display: flex;
              gap: 10px;
            }

            .eup-btn-outline-gray {
              background: #ffffff;
              border: 1px solid #cbd5e1;
              color: #334155;
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              cursor: pointer;
            }
          `}</style>

          {/* Top Left Navigation Button */}
          <div className="eup-top-bar">
            <button
              className="eup-back-btn"
              onClick={() => navigate("/EducationCheck")}
            >
              ‹ Back to Education Cases
            </button>
          </div>

          {/* Top Info Header Grid */}
          <div className="eup-top-grid">
            {/* Candidate Info */}
            <div className="eup-card eup-profile-header">
              <img
                src="https://via.placeholder.com/60"
                alt="Rahul Sharma"
                className="eup-avatar"
              />
              <div className="eup-profile-info">
                <div className="eup-title-badge">
                  <h3>Rahul Sharma</h3>
                  <span className="eup-badge-active">Active</span>
                </div>
                <div className="eup-details-grid">
                  <div className="eup-meta-item">
                    <label>Case ID</label>
                    <span>EDU-10245</span>
                  </div>
                  <div className="eup-meta-item">
                    <label>Client Name</label>
                    <span>ABC Corp</span>
                  </div>
                  <div className="eup-meta-item">
                    <label>Candidate ID</label>
                    <span>CAND-78231</span>
                  </div>
                  <div className="eup-meta-item">
                    <label>Date of Birth</label>
                    <span>15 Aug 1996</span>
                  </div>
                  <div className="eup-meta-item">
                    <label>Mobile Number</label>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="eup-meta-item">
                    <label>Email Address</label>
                    <span>rahul.sharma@email.com</span>
                  </div>
                  <div className="eup-meta-item" style={{ gridColumn: "span 2" }}>
                    <label>Current Location</label>
                    <span>Bangalore, Karnataka</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Overview */}
            <div className="eup-card">
              <h4>Case Overview</h4>
              <div className="eup-overview-row">
                <span>📋 Verification Type</span>
                <strong>Education</strong>
              </div>
              <div className="eup-overview-row">
                <span>📅 Case Created On</span>
                <strong>27 May 2026</strong>
              </div>
              <div className="eup-overview-row">
                <span>⏰ Expected Completion</span>
                <strong>03 Jun 2026</strong>
              </div>
              <div className="eup-overview-row">
                <span>⏱️ SLA</span>
                <strong>5 Days</strong>
              </div>
            </div>

            {/* Select Verifier */}
            <div className="eup-card">
              <h4>Select Verifier</h4>
              <select
                className="eup-select-input"
                value={verifier}
                onChange={(e) => setVerifier(e.target.value)}
              >
                <option value="Amit Kumar">Amit Kumar (Education Verifier)</option>
                <option value="Rajesth Singh">Rajesh Singh</option>
              </select>
              <button className="eup-btn-primary">Reassign Verifier</button>
            </div>
          </div>

          {/* Main Body Grid */}
          <div className="eup-main-layout">
            {/* Left Column - Qualifications List */}
            <div className="eup-card">
              <div className="eup-section-header">
                <h3>Education Details</h3>
                <button className="eup-btn-download">📥 Download All Documents</button>
              </div>

              <div className="eup-table-container">
                <table className="eup-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Qualification Type</th>
                      <th>Course / Stream</th>
                      <th>Institute / University</th>
                      <th>Year of Passing</th>
                      <th>Verification Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualifications.map((item) => (
                      <tr
                        key={item.id}
                        className={selectedQualification === item.type ? "selected" : ""}
                        onClick={() => setSelectedQualification(item.type)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{item.id}</td>
                        <td><strong>{item.type}</strong></td>
                        <td>{item.course}</td>
                        <td>{item.institute}</td>
                        <td>{item.year}</td>
                        <td>
                          <span className="eup-badge-pending">{item.status}</span>
                        </td>
                        <td>
                          <button className="eup-action-icon" title="View Details">
                            👁️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: "11px", marginTop: "12px" }}>Showing 1 to 8 of 8 qualifications</p>
            </div>

            {/* Right Column - Selected Qualification Side Panel */}
            <div className="eup-card eup-right-panel">
              <button className="eup-close-panel">✕</button>
              <p style={{ fontSize: "11px" }}>Selected Qualification</p>
              <h4 style={{ fontSize: "15px", margin: "2px 0 10px 0" }}>{selectedQualification}</h4>

              {/* Panel Tabs */}
              <div className="eup-panel-tabs">
                <button
                  className={`eup-panel-tab-btn ${activeRightTab === "details" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("details")}
                >
                  Details
                </button>
                <button
                  className={`eup-panel-tab-btn ${activeRightTab === "documents" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("documents")}
                >
                  Documents
                </button>
                <button
                  className={`eup-panel-tab-btn ${activeRightTab === "history" ? "active" : ""}`}
                  onClick={() => setActiveRightTab("history")}
                >
                  Verification History
                </button>
              </div>

              {/* Documents Tab Content */}
              {activeRightTab === "documents" && (
                <div>
                  <div className="eup-docs-header">
                    <strong style={{ fontSize: "12px" }}>Documents Provided by Candidate</strong>
                    <button className="eup-btn-download" style={{ padding: "4px 8px", fontSize: "11px" }}>
                      📤 Upload Document
                    </button>
                  </div>

                  <table className="eup-docs-table">
                    <thead>
                      <tr>
                        <th>Document Type</th>
                        <th>File Name</th>
                        <th>Uploaded On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Marksheet</td>
                        <td>10th_Marksheet.pdf</td>
                        <td>27 May 2026</td>
                        <td>
                          <button className="eup-action-icon">👁️</button>{" "}
                          <button className="eup-action-icon">📥</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Passing Certificate</td>
                        <td>10th_PassingCert.pdf</td>
                        <td>27 May 2026</td>
                        <td>
                          <button className="eup-action-icon">👁️</button>{" "}
                          <button className="eup-action-icon">📥</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Photo ID Proof</td>
                        <td>[Aadhaar Redacted]</td>
                        <td>27 May 2026</td>
                        <td>
                          <button className="eup-action-icon">👁️</button>{" "}
                          <button className="eup-action-icon">📥</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Others (If Any)</td>
                        <td>School_LeavingCert.pdf</td>
                        <td>27 May 2026</td>
                        <td>
                          <button className="eup-action-icon">👁️</button>{" "}
                          <button className="eup-action-icon">📥</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Drag & Drop File Box */}
                  <div className="eup-dropzone">
                    <div className="eup-upload-icon">☁️</div>
                    <p style={{ fontSize: "12px", fontWeight: "600" }}>Drag & drop files here</p>
                    <p style={{ fontSize: "10px" }}>or</p>
                    <button className="eup-browse-btn">Browse Files</button>
                    <p style={{ fontSize: "9px", marginTop: "6px" }}>
                      Allowed file types: PDF, JPG, PNG (Max size: 10MB each)
                    </p>
                  </div>

                  {/* Verifier Remarks */}
                  <div className="eup-remarks-box">
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>
                      Verifier Remarks
                    </label>
                    <textarea placeholder="Add remarks (optional)..."></textarea>
                  </div>

                  <button className="eup-btn-primary" style={{ marginTop: "12px" }}>
                    Send Verification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="eup-bottom-actions">
            <button className="eup-btn-secondary">⊕ Add Additional Qualification</button>

            <div className="eup-right-actions">
              <button className="eup-btn-outline-gray">Save as Draft</button>
              <button className="eup-btn-outline-gray">Request More Info</button>
              <button className="eup-btn-primary" style={{ width: "auto", padding: "8px 20px" }}>
                🚀 Send Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
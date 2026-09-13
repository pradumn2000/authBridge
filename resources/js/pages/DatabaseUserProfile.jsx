import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DatabaseUserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("id_address");
  const [selectedDocType, setSelectedDocType] = useState("PAN Card");

  return (
    <div className="dup-app-layout">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="dup-main-wrapper" id="content">
        {/* Header Component */}
        <Header />

        {/* Main Content Area */}
        <div className="dup-container">
          {/* Inline Stylesheet */}
          <style>{`
            .dup-app-layout {
              display: flex;
              min-height: 100vh;
              background-color: #f8fafc;
            }

            .dup-main-wrapper {
              {/* flex: 1; */}
              display: flex;
              flex-direction: column;
              overflow-x: hidden;
            }

            .dup-container {
              padding: 24px;
              background-color: #f8fafc;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #1e293b;
            }

            /* Paragraph Global Styling */
            p {
              color: rgb(100, 116, 139) !important;
              text-align: left !important;
            }

            .dup-top-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            }

            .dup-back-btn {
              background: none;
              border: none;
              color: #2563eb;
              font-weight: 600;
              cursor: pointer;
              font-size: 14px;
            }

            .dup-top-actions {
              display: flex;
              gap: 8px;
            }

            .dup-btn-outline {
              padding: 6px 12px;
              border: 1px solid #cbd5e1;
              background: #ffffff;
              border-radius: 6px;
              font-size: 12px;
              cursor: pointer;
              font-weight: 500;
            }

            .dup-page-header h2 {
              margin: 0;
              font-size: 18px;
              color: #0f172a;
            }

            .dup-page-header p {
              margin: 4px 0 16px 0;
              font-size: 12px;
            }

            .dup-tabs {
              display: flex;
              gap: 24px;
              border-bottom: 1px solid #e2e8f0;
              margin-bottom: 16px;
            }

            .dup-tab-btn {
              background: none;
              border: none;
              padding: 8px 0 12px 0;
              font-size: 13px;
              color: #64748b;
              cursor: pointer;
              border-bottom: 2px solid transparent;
            }

            .dup-tab-btn.active {
              color: #2563eb;
              font-weight: 600;
              border-bottom-color: #2563eb;
            }

            .dup-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 16px;
            }

            .dup-card h4 {
              margin: 0 0 4px 0;
              font-size: 13px;
              font-weight: 700;
              color: #1e293b;
              text-transform: uppercase;
              text-align: left;
            }

            .dup-card p.subtext {
              margin: 0 0 16px 0;
              font-size: 11px;
            }

            .dup-profile-card {
              display: flex;
              justify-content: space-between;
            }

            .dup-avatar-section {
              display: flex;
              gap: 16px;
            }

            .dup-avatar {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
            }

            .dup-name-badge {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 12px;
            }

            .dup-name-badge h3 {
              margin: 0;
              font-size: 16px;
            }

            .dup-status-tag.active {
              background: #dcfce7;
              color: #15803d;
              font-size: 10px;
              padding: 2px 6px;
              border-radius: 4px;
              font-weight: 600;
            }

            .dup-info-grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 16px;
            }

            .dup-info-grid label {
              font-size: 11px;
              color: #64748b;
              display: block;
            }

            .dup-info-grid p {
              margin: 2px 0 0 0;
              font-size: 12px;
              font-weight: 600;
            }

            .dup-status-box .badge.progress {
              background: #eff6ff;
              color: #2563eb;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
            }

            .dup-main-layout {
              display: grid;
              grid-template-columns: 3fr 1fr;
              gap: 16px;
            }

            .dup-doc-section-grid {
              display: grid;
              grid-template-columns: 1.2fr 2fr 1.5fr;
              gap: 16px;
            }
            .dup-doc-section-grid.sec-wrp{
                grid-template-columns: 1fr 1fr;
            }

            .dup-selector-col label {
              font-size: 12px;
              font-weight: 600;
              display: block;
              margin-bottom: 6px;
            }

            .dup-select-input {
              width: 100%;
              padding: 8px;
              border-radius: 6px;
              border: 1px solid #cbd5e1;
              font-size: 13px;
              margin-bottom: 16px;
            }

            .dup-verification-status-box {
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 10px;
              border-radius: 6px;
              display: flex;
              gap: 8px;
              margin-bottom: 16px;
            }

            .dup-verification-status-box strong {
              font-size: 12px;
              color: #166534;
            }

            .dup-verification-status-box p {
              margin: 2px 0 0 0;
              font-size: 10px;
            }

            .dup-digilocker-btn {
              width: 100%;
              background: #2563eb;
              color: #ffffff;
              border: none;
              padding: 10px;
              border-radius: 6px;
              font-weight: 600;
              font-size: 12px;
              cursor: pointer;
            }

            .dup-details-col h5,
            .dup-preview-col h5 {
              margin: 0 0 12px 0;
              font-size: 11px;
              color: #64748b;
              text-transform: uppercase;
            }

            .dup-detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 12px;
            }

            .dup-detail-row span {
              color: #64748b;
            }

            .dup-image-container {
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              padding: 8px;
              background: #f8fafc;
            }

            .dup-image-container img {
              width: 100%;
              border-radius: 4px;
            }

            .dup-file-footer {
              display: flex;
              justify-content: space-between;
              margin-top: 6px;
              font-size: 11px;
              color: #2563eb;
            }

            .dup-download-icon {
              background: none;
              border: none;
              cursor: pointer;
            }

            .dup-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
              margin-top: 8px;
            }

            .dup-table th,
            .dup-table td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #f1f5f9;
            }

            .dup-table th {
              background: #f8fafc;
              color: #64748b;
            }

            .dup-badge.success {
              background: #dcfce7;
              color: #166534;
              padding: 2px 6px;
              border-radius: 4px;
            }

            .dup-badge.warning {
              background: #fef3c7;
              color: #92400e;
              padding: 2px 6px;
              border-radius: 4px;
            }

            .dup-side-stat {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .dup-side-stat label {
              font-size: 11px;
              color: #64748b;
            }

            .dup-side-stat p {
              margin: 2px 0 0 0;
              font-weight: 700;
              font-size: 13px;
            }

            .dup-summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 12px;
            }

            .dup-summary-row span {
              color: #64748b;
            }

            .dup-action-btn {
              width: 100%;
              padding: 8px;
              border: 1px solid #cbd5e1;
              background: #ffffff;
              border-radius: 6px;
              margin-bottom: 8px;
              font-size: 12px;
              text-align: left;
              cursor: pointer;
              color: #2563eb;
              font-weight: 500;
            }

            .dup-action-btn:hover {
              background: #f1f5f9;
            }

            .text-success {
              color: #166534;
            }
          `}</style>

          {/* Top Header / Back Navigation */}
          <div className="dup-top-bar">
            <button className="dup-back-btn" onClick={() => navigate("/DatabaseCheck")}>
              ← Back to Database Verification
            </button>
            <div className="dup-top-actions">
              <button className="dup-btn-outline">📥 Download Report</button>
              <button className="dup-btn-outline">🖨️ Print</button>
            </div>
          </div>

          {/* Title */}
          <div className="dup-page-header">
            <h2>CANDIDATE DETAILS</h2>
            <p>View candidate information, documents and verification details</p>
          </div>

          {/* Tabs */}
          <div className="dup-tabs">
            <button
              className={`dup-tab-btn ${activeTab === "personal" ? "active" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Details
            </button>
            <button
              className={`dup-tab-btn ${activeTab === "id_address" ? "active" : ""}`}
              onClick={() => setActiveTab("id_address")}
            >
              ID & Address Proof
            </button>
            <button
              className={`dup-tab-btn ${activeTab === "uploaded" ? "active" : ""}`}
              onClick={() => setActiveTab("uploaded")}
            >
              Uploaded Documents
            </button>
            <button
              className={`dup-tab-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Verification History
            </button>
            <button
              className={`dup-tab-btn ${activeTab === "notes" ? "active" : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              Notes & Remarks
            </button>
          </div>

          {/* Candidate Profile Header Card */}
          <div className="dup-card dup-profile-card">
            <div className="dup-avatar-section">
              <img
                src="https://via.placeholder.com/60"
                alt="Rahul Verma"
                className="dup-avatar"
              />
              <div>
                <div className="dup-name-badge">
                  <h3>Rahul Verma</h3>
                  <span className="dup-status-tag active">Active</span>
                </div>
                <div className="dup-info-grid">
                  <div>
                    <label>Case ID</label>
                    <p>CAN-10245</p>
                  </div>
                  <div>
                    <label>Client</label>
                    <p>ABC Technologies</p>
                  </div>
                  <div>
                    <label>Assigned Verifier</label>
                    <p>Amit Kumar (VER-1001)</p>
                  </div>
                  <div>
                    <label>Mobile</label>
                    <p>+91 98765 43210</p>
                  </div>
                  <div>
                    <label>Email</label>
                    <p>rahul.verma@email.com</p>
                  </div>
                  <div>
                    <label>Assigned On</label>
                    <p>26-Aug-2026 10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dup-profile-right">
              <div className="dup-status-box">
                <span className="label">Status</span>
                <span className="badge progress">In Progress</span>
              </div>
            </div>
          </div>

          {/* Main Content & Sidebar Grid */}
          <div className="dup-main-layout">
            {/* Left Column - Main Details */}
            <div className="dup-left-content">
              {/* Section: ID & Address Proof */}
              <div className="dup-card">
                <h4>ID & ADDRESS PROOF DETAILS</h4>
                <p className="subtext">Select document type to view details and upload documents</p>

                <div className="dup-doc-section-grid">
                  {/* Left Selector Column */}
                  <div className="dup-selector-col">
                    <label>Select Document Type *</label>
                    <select
                      value={selectedDocType}
                      onChange={(e) => setSelectedDocType(e.target.value)}
                      className="dup-select-input"
                    >
                      <option value="PAN Card">PAN Card</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Passport">Passport</option>
                    </select>

                    <div className="dup-verification-status-box">
                      <span className="dup-check-icon">✓</span>
                      <div>
                        <strong>Document Verified</strong>
                        <p>Verified on 26-Aug-2026 11:20 AM</p>
                        <p>Verified By: Amit Kumar (VER-1001)</p>
                      </div>
                    </div>

                    <button className="dup-digilocker-btn">
                      🏢 DigiLocker Verification
                    </button>
                  </div>

                  {/* Middle Details Column */}
                  <div className="dup-details-col">
                    <h5>DOCUMENT DETAILS</h5>
                    <div className="dup-detail-row">
                      <span>Document Type</span>
                      <strong>PAN Card</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Document Number</span>
                      <strong>PANDD8876543210</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>PAN Holder Name</span>
                      <strong>Rahul Verma</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Father's Name</span>
                      <strong>Suresh Verma</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Date of Birth</span>
                      <strong>15-Mar-1992</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>PAN Status</span>
                      <span className="text-success">Active</span>
                    </div>
                    <div className="dup-detail-row">
                      <span>Issue Date</span>
                      <strong>12-Apr-2018</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Assessment Year</span>
                      <strong>2024-25</strong>
                    </div>
                  </div>

                  {/* Right Uploaded Document Preview */}
                  <div className="dup-preview-col">
                    <h5>UPLOADED DOCUMENT</h5>
                    <div className="dup-image-container">
                      <img
                        src="https://via.placeholder.com/260x150"
                        alt="PAN Card Preview"
                      />
                      <div className="dup-file-footer">
                        <span>PAN_Card.png</span>
                        <button className="dup-download-icon">⬇</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Address Proof Details */}
              <div className="dup-card">
                <h4>ADDRESS PROOF DETAILS</h4>
                <div className="dup-doc-section-grid sec-wrp">
                  <div className="dup-details-col flex-2">
                    <div className="dup-detail-row">
                      <span>Document Type</span>
                      <strong>Aadhaar Card</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Document Number</span>
                      <strong>[Aadhaar Redacted]</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Name as per Document</span>
                      <strong>Rahul Verma</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Full Address</span>
                      <strong>Flat No. 502, A Wing, Green Park Residency, Andheri West, Mumbai, Maharashtra - 400058</strong>
                    </div>
                    <div className="dup-detail-row">
                      <span>Issue Date</span>
                      <strong>20-Jan-2017</strong>
                    </div>
                  </div>

                  <div className="dup-preview-col">
                    <h5>UPLOADED DOCUMENT</h5>
                    <div className="dup-image-container">
                      <img
                        src="https://via.placeholder.com/260x130"
                        alt="Aadhaar Card Preview"
                      />
                      <div className="dup-file-footer">
                        <span>Aadhaar_Card.pdf</span>
                        <button className="dup-download-icon">⬇</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Additional Documents Table */}
              <div className="dup-card">
                <h4>ADDITIONAL DOCUMENTS</h4>
                <table className="dup-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Document Number</th>
                      <th>Issue Date</th>
                      <th>Expiry Date</th>
                      <th>Uploaded Document</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Passport</td>
                      <td>N1234567</td>
                      <td>10-Feb-2016</td>
                      <td>09-Feb-2026</td>
                      <td><a href="#passport">Passport.pdf (512 KB)</a></td>
                      <td><span className="dup-badge success">Verified</span></td>
                    </tr>
                    <tr>
                      <td>Driving License</td>
                      <td>MH02 20190012345</td>
                      <td>15-Jun-2019</td>
                      <td>14-Jun-2029</td>
                      <td><a href="#dl">Driving_License.pdf (310 KB)</a></td>
                      <td><span className="dup-badge success">Verified</span></td>
                    </tr>
                    <tr>
                      <td>Bank Passbook</td>
                      <td>SBIN0001234</td>
                      <td>-</td>
                      <td>-</td>
                      <td><a href="#passbook">Bank_Passbook.pdf (680 KB)</a></td>
                      <td><span className="dup-badge warning">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Side Panels */}
            <div className="dup-right-sidebar">
              {/* Sources & TAT Box */}
              <div className="dup-card">
                <div className="dup-side-stat">
                  <span className="icon">📂</span>
                  <div>
                    <label>Database Sources</label>
                    <p>PAN, Aadhaar</p>
                  </div>
                </div>
                <hr />
                <div className="dup-side-stat">
                  <span className="icon">⏱️</span>
                  <div>
                    <label>TAT (hrs)</label>
                    <p>24</p>
                  </div>
                </div>
                <hr />
                <div className="dup-side-stat">
                  <span className="icon">🟢</span>
                  <div>
                    <label>TAT Status</label>
                    <p className="text-success">On Time</p>
                  </div>
                </div>
              </div>

              {/* Candidate Summary */}
              <div className="dup-card">
                <h4>Candidate Summary</h4>
                <div className="dup-summary-row">
                  <span>Date of Birth</span>
                  <strong>15-Mar-1992</strong>
                </div>
                <div className="dup-summary-row">
                  <span>Gender</span>
                  <strong>Male</strong>
                </div>
                <div className="dup-summary-row">
                  <span>Phone</span>
                  <strong>+91 98765 43210</strong>
                </div>
                <div className="dup-summary-row">
                  <span>Email</span>
                  <strong>rahul.verma@email.com</strong>
                </div>
                <div className="dup-summary-row">
                  <span>Current Location</span>
                  <strong>Mumbai, Maharashtra</strong>
                </div>
                <div className="dup-summary-row">
                  <span>Nationality</span>
                  <strong>Indian</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="dup-card">
                <h4>Actions</h4>
                <button className="dup-action-btn">➕ Add Document</button>
                <button className="dup-action-btn">🔄 Change Document Type</button>
                <button className="dup-action-btn">📨 Send for Re-verification</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
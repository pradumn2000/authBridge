// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// const CriminalUserProfile = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Overview");

//   return (
//     <div className="cup-layout">
//       {/* Sidebar Component */}
//       <Sidebar />

//       <div className="cup-main-content" id="content">
//         {/* Header Component */}
//         <Header />

//         {/* Component Styles */}
//         <style>{`
//           .cup-layout {
//             display: flex;
//             min-height: 100vh;
//             background-color: #f8fafc;
//             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//             color: #334155;
//           }

//           .cup-main-content {
//             {/* flex: 1; */}
//             display: flex;
//             flex-direction: column;
//             {/* overflow-x: hidden; */}
//           }

//           .cup-container {
//             padding: 24px;
//           }

//           .cup-back-wrapper {
//             margin-bottom: 16px;
//           }

//           .cup-back-btn {
//             background: none;
//             border: none;
//             color: #475569;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             display: inline-flex;
//             align-items: center;
//             gap: 6px;
//             padding: 0;
//           }

//           .cup-back-btn:hover {
//             color: #1e293b;
//           }

//           .cup-card {
//             background: #ffffff;
//             border-radius: 8px;
//             padding: 20px;
//             margin-bottom: 20px;
//             border: 1px solid #e2e8f0;
//             box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
//           }

//           .cup-header-card {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             flex-wrap: wrap;
//             gap: 16px;
//           }

//           .cup-profile-left {
//             display: flex;
//             gap: 20px;
//             {/* flex-wrap: wrap; */}
//             flex: 1;
//           }

//           .cup-avatar {
//             width: 80px;
//             height: 90px;
//             border-radius: 6px;
//             object-fit: cover;
//             border: 1px solid #cbd5e1;
//           }

//           .cup-name-badge {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             margin-bottom: 14px;
//           }

//           .cup-name-badge h2 {
//             margin: 0;
//             font-size: 20px;
//             font-weight: 700;
//             color: #0f172a;
//           }

//           .cup-status-tag {
//             font-size: 12px;
//             padding: 2px 10px;
//             border-radius: 12px;
//             font-weight: 500;
//           }

//           .cup-status-tag.completed {
//             background-color: #dcfce7;
//             color: #166534;
//           }

//           .cup-info-grid {
//             display: flex;
//             gap: 28px;
//             flex-wrap: wrap;
//           }

//           .cup-label {
//             display: block;
//             font-size: 11px;
//             color: #64748b;
//             margin-bottom: 3px;
//           }

//           .cup-value {
//             font-size: 13px;
//             font-weight: 600;
//             color: #1e293b;
//           }

//           .cup-actions {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             flex-wrap: wrap;
//             margin-left: auto;
//           }

//           .cup-btn {
//             padding: 8px 14px;
//             font-size: 13px;
//             border-radius: 6px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s;
//             display: inline-flex;
//             align-items: center;
//             gap: 6px;
//           }

//           .cup-btn-outline {
//             border: 1px solid #cbd5e1;
//             background: #ffffff;
//             color: #334155;
//           }

//           .cup-btn-outline:hover {
//             background: #f1f5f9;
//           }

//           .cup-btn-primary {
//             background: #2563eb;
//             color: #ffffff;
//             border: none;
//           }

//           .cup-btn-primary:hover {
//             background: #1d4ed8;
//           }

//           .cup-tabs {
//             display: flex;
//             gap: 24px;
//             border-bottom: 1px solid #e2e8f0;
//             margin-bottom: 20px;
//           }

//           .cup-tab-btn {
//             background: none;
//             border: none;
//             padding: 10px 4px;
//             font-size: 14px;
//             color: #64748b;
//             cursor: pointer;
//             border-bottom: 2px solid transparent;
//             font-weight: 500;
//           }

//           .cup-tab-btn.active {
//             color: #2563eb;
//             border-bottom-color: #2563eb;
//             font-weight: 600;
//           }

//           .cup-grid-2 {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//             gap: 20px;
//           }

//           .cup-card-header h3 {
//             margin: 0 0 16px 0;
//             font-size: 15px;
//             font-weight: 600;
//             color: #0f172a;
//           }

//           .cup-details-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 14px 24px;
//           }

//           .cup-sub-label {
//             font-size: 12px;
//             color: #64748b;
//             display: block;
//           }

//           .cup-sub-val {
//             margin: 3px 0 0 0;
//             font-size: 13px;
//             font-weight: 500;
//             color: #0f172a;
//             text-align: left;
//           }

//           .text-green {
//             color: #16a34a;
//           }

//           .cup-table {
//             width: 100%;
//             border-collapse: collapse;
//             font-size: 12px;
//           }

//           .cup-table th {
//             text-align: left;
//             background: #f8fafc;
//             padding: 10px;
//             color: #64748b;
//             font-weight: 600;
//             border-bottom: 1px solid #e2e8f0;
//           }

//           .cup-table td {
//             padding: 12px 10px;
//             border-top: 1px solid #f1f5f9;
//             color: #334155;
//           }

//           .cup-badge-verified {
//             background: #dcfce7;
//             color: #15803d;
//             padding: 2px 8px;
//             border-radius: 4px;
//             font-size: 11px;
//             font-weight: 500;
//           }

//           .cup-doc-actions {
//             display: flex;
//             gap: 10px;
//           }

//           .cup-link-btn {
//             background: none;
//             border: none;
//             color: #2563eb;
//             cursor: pointer;
//             font-size: 12px;
//             padding: 0;
//             font-weight: 500;
//           }

//           /* Timeline with vertical connector line */
//           .cup-timeline {
//             display: flex;
//             flex-direction: column;
//             gap: 24px;
//             position: relative;
//           }

//           .cup-timeline-item {
//             display: flex;
//             gap: 16px;
//             position: relative;
//           }

//           /* Vertical connecting line behind the dots */
//           .cup-timeline-item:not(:last-child)::before {
//             content: "";
//             position: absolute;
//             left: 11px;
//             top: 24px;
//             bottom: -24px;
//             width: 2px;
//             background-color: #3b82f6;
//             z-index: 1;
//           }

//           .cup-timeline-dot {
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #2563eb;
//             color: #fff;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 11px;
//             flex-shrink: 0;
//             z-index: 2;
//           }

//           .cup-timeline-dot.success {
//             background: #16a34a;
//           }

//           .cup-timeline-content h4 {
//             margin: 0;
//             font-size: 13px;
//             color: #0f172a;
//           }

//           .cup-timeline-content p {
//             margin: 2px 0 0 0;
//             font-size: 12px;
//             color: #64748b;
//           }

//           .cup-time {
//             font-size: 11px;
//             color: #94a3b8;
//           }

//           .cup-remarks-text {
//             font-size: 13px;
//             color: #475569;
//             margin: 0;
//             line-height: 1.5;
//             text-align: left;
//           }
//           .cup-name-badge-wrp{
//           display: flex;
//             justify-content: space-between;
//           }
//           .cup-user-meta {
//     width: 100%;
// }
//         `}</style>

//         {/* Page Container */}
//         <div className="cup-container">
//           {/* Back Button */}
//           <div className="cup-back-wrapper">
//             <button className="cup-back-btn" onClick={() => navigate("/CriminalCheck")}>
//               ← Back to List
//             </button>
//           </div>

//           {/* Top Profile Card */}
//           <div className="cup-card cup-header-card">
//             <div className="cup-profile-left">
//               <img
//                 src="https://via.placeholder.com/100"
//                 alt="Profile"
//                 className="cup-avatar"
//               />
//               <div className="cup-user-meta">
//                 <div className="cup-name-badge-wrp">
//                 <div className="cup-name-badge">
//                   <h2>Amit Sharma</h2>
//                   <span className="cup-status-tag completed">Completed</span>
//                 </div>
//                 <div className="cup-actions">
//               <button className="cup-btn cup-btn-outline">📥 Download Report</button>
//               <button className="cup-btn cup-btn-outline">👁 View Documents</button>
//               <button className="cup-btn cup-btn-primary">✈ Send Verification Link</button>
//             </div>
//                 </div>
//                 <div className="cup-info-grid">
//                   <div>
//                     <span className="cup-label">📄 Candidate ID</span>
//                     <span className="cup-value">PV-001234</span>
//                   </div>
//                   <div>
//                     <span className="cup-label">🏢 Client Name</span>
//                     <span className="cup-value">ABC Pvt. Ltd.</span>
//                   </div>
//                   <div>
//                     <span className="cup-label">💼 Job Role</span>
//                     <span className="cup-value">Software Developer</span>
//                   </div>
//                   <div>
//                     <span className="cup-label">📞 Mobile Number</span>
//                     <span className="cup-value">+91 98765 43210</span>
//                   </div>
//                   <div>
//                     <span className="cup-label">✉ Email ID</span>
//                     <span className="cup-value">amit.sharma@email.com</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="cup-actions">
//               <button className="cup-btn cup-btn-outline">📥 Download Report</button>
//               <button className="cup-btn cup-btn-outline">👁 View Documents</button>
//               <button className="cup-btn cup-btn-primary">✈ Send Verification Link</button>
//             </div> */}
//           </div>

//           {/* Navigation Tabs */}
//           <div className="cup-tabs">
//             {["Overview", "Verification Details", "Documents", "Activity Log"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`cup-tab-btn ${activeTab === tab ? "active" : ""}`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Dashboard Grid Content */}
//           <div className="cup-grid-2">
//             {/* Personal Information */}
//             <div className="cup-card">
//               <div className="cup-card-header">
//                 <h3>👤 Personal Information</h3>
//               </div>
//               <div className="cup-details-grid">
//                 <div>
//                   <span className="cup-sub-label">Full Name</span>
//                   <p className="cup-sub-val">Amit Sharma</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Current Address</span>
//                   <p className="cup-sub-val">B-102, Green Park, New Delhi - 110016</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Date of Birth</span>
//                   <p className="cup-sub-val">15-06-1995</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Permanent Address</span>
//                   <p className="cup-sub-val">B-102, Green Park, New Delhi - 110016</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Gender</span>
//                   <p className="cup-sub-val">Male</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Nationality</span>
//                   <p className="cup-sub-val">Indian</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Father's Name</span>
//                   <p className="cup-sub-val">Ramesh Sharma</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Marital Status</span>
//                   <p className="cup-sub-val">Single</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Mother's Name</span>
//                   <p className="cup-sub-val">Sunita Sharma</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Educational Qualification</span>
//                   <p className="cup-sub-val">B.Tech</p>
//                 </div>
//               </div>
//             </div>

//             {/* Police Verification Details */}
//             <div className="cup-card">
//               <div className="cup-card-header">
//                 <h3>🛡 Police Verification Details</h3>
//               </div>
//               <div className="cup-details-grid">
//                 <div>
//                   <span className="cup-sub-label">Verification Mode</span>
//                   <p className="cup-sub-val text-green">Online</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Reference Number</span>
//                   <p className="cup-sub-val">PV-001234</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Purpose of Verification</span>
//                   <p className="cup-sub-val">Pre-Employment Verification</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Verification Date</span>
//                   <p className="cup-sub-val">12-09-2025</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">State</span>
//                   <p className="cup-sub-val">Delhi</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Expected TAT</span>
//                   <p className="cup-sub-val">7 Days</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">District</span>
//                   <p className="cup-sub-val">New Delhi</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Status</span>
//                   <p style={{ margin: "3px 0 0 0", textAlign: "left" }}>
//                     <span className="cup-status-tag completed">Completed</span>
//                   </p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Police Station</span>
//                   <p className="cup-sub-val">Central Police Station</p>
//                 </div>
//                 <div>
//                   <span className="cup-sub-label">Assigned Verifier</span>
//                   <p className="cup-sub-val">Rohit Verma</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="cup-grid-2">
//             {/* Documents Table */}
//             <div className="cup-card">
//               <div className="cup-card-header">
//                 <h3>📄 Documents</h3>
//               </div>
//               <table className="cup-table">
//                 <thead>
//                   <tr>
//                     <th>Document Name</th>
//                     <th>Type</th>
//                     <th>Uploaded On</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     { name: "ID Proof (Aadhaar Card)", type: "Identity Proof", date: "12-09-2025" },
//                     { name: "Address Proof (Utility Bill)", type: "Address Proof", date: "12-09-2025" },
//                     { name: "Passport Size Photo", type: "Photo", date: "12-09-2025" },
//                     { name: "Police Verification Form", type: "Form", date: "12-09-2025" },
//                   ].map((doc, idx) => (
//                     <tr key={idx}>
//                       <td>{doc.name}</td>
//                       <td>{doc.type}</td>
//                       <td>{doc.date}</td>
//                       <td><span className="cup-badge-verified">Verified</span></td>
//                       <td>
//                         <div className="cup-doc-actions">
//                           <button className="cup-link-btn">👁 View</button>
//                           <button className="cup-link-btn">📥 Download</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Verification Timeline */}
//             <div className="cup-card">
//               <div className="cup-card-header">
//                 <h3>⏱ Verification Timeline</h3>
//               </div>
//               <div className="cup-timeline">
//                 <div className="cup-timeline-item">
//                   <div className="cup-timeline-dot">✓</div>
//                   <div className="cup-timeline-content">
//                     <span className="cup-time">12-09-2025</span>
//                     <h4>Verification Requested</h4>
//                     <p>Police verification initiated by admin.</p>
//                   </div>
//                 </div>
//                 <div className="cup-timeline-item">
//                   <div className="cup-timeline-dot">✓</div>
//                   <div className="cup-timeline-content">
//                     <span className="cup-time">13-09-2025</span>
//                     <h4>In Progress</h4>
//                     <p>Verification process started.</p>
//                   </div>
//                 </div>
//                 <div className="cup-timeline-item">
//                   <div className="cup-timeline-dot success">✓</div>
//                   <div className="cup-timeline-content">
//                     <span className="cup-time">16-09-2025</span>
//                     <h4>Completed</h4>
//                     <p>Police verification completed successfully.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Remarks Section */}
//           <div className="cup-card">
//             <div className="cup-card-header">
//               <h3>📋 Remarks</h3>
//             </div>
//             <p className="cup-remarks-text">
//               No discrepancies found. Candidate's background verified successfully.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CriminalUserProfile;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";

const authHeaders = (extra = {}) => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}`, Accept: "application/json", ...extra };
};

const STATUS_LABELS = {
  completed: { label: "Completed", cls: "completed" },
  "in-progress": { label: "In Progress", cls: "progress" },
  "qc-review": { label: "QC Review", cls: "progress" },
  "on-hold": { label: "On Hold", cls: "hold" },
  pending: { label: "Pending", cls: "pending" },
};

const statusInfo = (status) => STATUS_LABELS[status] || STATUS_LABELS.pending;

const fmtDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
};

const CriminalUserProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("case_id");

  const [activeTab, setActiveTab] = useState("Overview");

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeline, setTimeline] = useState([]);
  const [timelineLoading, setTimelineLoading] = useState(true);

  // Best-effort: used only to resolve a verifier_id to a display name.
  // GET /api/users is admin/allocator-only, so a 403 here is expected for
  // client-role users and just falls back to showing the id.
  const [userNames, setUserNames] = useState({});

  const [linkGenerating, setLinkGenerating] = useState(false);

  const fetchCase = () => {
    if (!caseId) {
      setError("No case selected — open this page from a Police Verification row.");
      setLoading(false);
      return Promise.resolve();
    }
    setLoading(true);
    setError("");
    return fetch(`${API_URL}/api/cases/${encodeURIComponent(caseId)}`, { headers: authHeaders() })
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Case not found." : "Failed to load case.");
        return r.json();
      })
      .then((data) => setCaseData(data.case))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const fetchTimeline = () => {
    if (!caseId) return Promise.resolve();
    setTimelineLoading(true);
    return fetch(`${API_URL}/api/cases/${encodeURIComponent(caseId)}/timeline`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => setTimeline(data.timeline || []))
      .catch(() => {})
      .finally(() => setTimelineLoading(false));
  };

  const fetchUsers = () => {
    return fetch(`${API_URL}/api/users`, { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.users) return;
        const map = {};
        data.users.forEach((u) => { map[u.id] = u.name; });
        setUserNames(map);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCase();
    fetchTimeline();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  // The single-case response includes the loaded `caseChecks` relation
  // (serialized as either case_checks or caseChecks depending on Eloquent
  // config) alongside the flattened check_tat/check_rates/check_details
  // this page also reads.
  const criminalCheck = useMemo(() => {
    if (!caseData) return null;
    const list = caseData.case_checks || caseData.caseChecks || [];
    return list.find((c) => c.check_type === "criminal") || null;
  }, [caseData]);

  const fields = caseData?.check_details?.criminal?.fields || {};
  const documents = caseData?.check_details?.criminal?.documents || {};
  const documentRows = useMemo(
    () => Object.entries(documents)
      .filter(([key]) => key !== "candidate_photo")
      .map(([key, doc]) => ({ key, ...doc })),
    [documents]
  );
  const photoUrl = documents?.candidate_photo?.url || null;

  const overallStatus = statusInfo(caseData?.status);
  const checkStatus = statusInfo(criminalCheck?.status);

  const verifierName = criminalCheck?.verifier_id
    ? (userNames[criminalCheck.verifier_id] || `Verifier #${criminalCheck.verifier_id}`)
    : (caseData?.assigned_verifier || "Unassigned");

  const remarksText = criminalCheck?.result?.form_data?.remarks
    || (criminalCheck?.result?.outcome ? `Outcome recorded: ${criminalCheck.result.outcome}.` : "No remarks recorded yet.");

  const handleViewDocuments = () => {
    const el = document.getElementById("cup-documents-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSendVerificationLink = async () => {
    if (!caseData) return;
    setLinkGenerating(true);
    try {
      const res = await fetch(
        `${API_URL}/api/cases/${encodeURIComponent(caseData.case_id)}/checks/criminal/share-link`,
        { method: "POST", headers: authHeaders() }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to generate link");
      }
      const data = await res.json();
      if (navigator.clipboard) {
        try { await navigator.clipboard.writeText(data.url); } catch { /* ignore clipboard failures */ }
      }
      alert(`Verification link generated:\n${data.url}\n\n(copied to clipboard if supported)`);
    } catch (err) {
      alert("Failed to generate verification link: " + err.message);
    } finally {
      setLinkGenerating(false);
    }
  };

  const handleDownloadReport = () => {
    alert("Report generation isn't available yet — no export endpoint exists on the backend for this check.");
  };

  return (
    <div className="cup-layout">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="cup-main-content" id="content">
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
            display: flex;
            flex-direction: column;
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

          .cup-banner-error {
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            background: #fef2f2;
            color: #b91c1c;
            border: 1px solid #fca5a5;
            margin-bottom: 16px;
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
            flex: 1;
          }

          .cup-avatar {
            width: 80px;
            height: 90px;
            border-radius: 6px;
            object-fit: cover;
            border: 1px solid #cbd5e1;
            background: #e2e8f0;
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

          .cup-status-tag.progress {
            background-color: #fef3c7;
            color: #92400e;
          }

          .cup-status-tag.hold {
            background-color: #fee2e2;
            color: #dc2626;
          }

          .cup-status-tag.pending {
            background-color: #f1f5f9;
            color: #475569;
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
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
            margin-left: auto;
          }

          .cup-btn {
            padding: 8px 14px;
            font-size: 13px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .cup-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
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
            text-align: left;
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
            text-decoration: none;
          }

          /* Timeline with vertical connector line */
          .cup-timeline {
            display: flex;
            flex-direction: column;
            gap: 24px;
            position: relative;
          }

          .cup-timeline-item {
            display: flex;
            gap: 16px;
            position: relative;
          }

          .cup-timeline-item:not(:last-child)::before {
            content: "";
            position: absolute;
            left: 11px;
            top: 24px;
            bottom: -24px;
            width: 2px;
            background-color: #3b82f6;
            z-index: 1;
          }

          .cup-timeline-dot {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2563eb;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            flex-shrink: 0;
            z-index: 2;
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
            text-align: left;
          }
          .cup-name-badge-wrp{
            display: flex;
            justify-content: space-between;
          }
          .cup-user-meta {
            width: 100%;
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

          {error && <div className="cup-banner-error">⚠ {error}</div>}

          {loading ? (
            <div className="cup-card">Loading case…</div>
          ) : !caseData ? null : (
            <>
              {/* Top Profile Card */}
              <div className="cup-card cup-header-card">
                <div className="cup-profile-left">
                  <img
                    src={photoUrl || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="cup-avatar"
                  />
                  <div className="cup-user-meta">
                    <div className="cup-name-badge-wrp">
                      <div className="cup-name-badge">
                        <h2>{fields.candidateName || caseData.candidate_name}</h2>
                        <span className={`cup-status-tag ${overallStatus.cls}`}>{overallStatus.label}</span>
                      </div>
                      <div className="cup-actions">
                        <button className="cup-btn cup-btn-outline" onClick={handleDownloadReport}>📥 Download Report</button>
                        <button className="cup-btn cup-btn-outline" onClick={handleViewDocuments}>👁 View Documents</button>
                        <button className="cup-btn cup-btn-primary" onClick={handleSendVerificationLink} disabled={linkGenerating}>
                          {linkGenerating ? "Generating…" : "✈ Send Verification Link"}
                        </button>
                      </div>
                    </div>
                    <div className="cup-info-grid">
                      <div>
                        <span className="cup-label">📄 Candidate ID</span>
                        <span className="cup-value">{caseData.case_id}</span>
                      </div>
                      <div>
                        <span className="cup-label">🏢 Client Name</span>
                        <span className="cup-value">{caseData.client_name || "—"}</span>
                      </div>
                      <div>
                        <span className="cup-label">💼 Job Role</span>
                        <span className="cup-value">{caseData.position || fields.jobRole || "—"}</span>
                      </div>
                      <div>
                        <span className="cup-label">📞 Mobile Number</span>
                        <span className="cup-value">{caseData.candidate_mobile || "—"}</span>
                      </div>
                      <div>
                        <span className="cup-label">✉ Email ID</span>
                        <span className="cup-value">{caseData.candidate_email || "—"}</span>
                      </div>
                    </div>
                  </div>
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
                      <p className="cup-sub-val">{fields.candidateName || caseData.candidate_name}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Current Address</span>
                      <p className="cup-sub-val">{fields.currentAddress || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Date of Birth</span>
                      <p className="cup-sub-val">{fmtDate(caseData.candidate_dob)}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Permanent Address</span>
                      <p className="cup-sub-val">{fields.permanentAddress || fields.currentAddress || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Gender</span>
                      <p className="cup-sub-val">{fields.gender || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Nationality</span>
                      <p className="cup-sub-val">{fields.nationality || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Father's Name</span>
                      <p className="cup-sub-val">{fields.fathersName || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Marital Status</span>
                      <p className="cup-sub-val">{fields.maritalStatus || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Mother's Name</span>
                      <p className="cup-sub-val">{fields.mothersName || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Educational Qualification</span>
                      <p className="cup-sub-val">{fields.educationalQualification || "—"}</p>
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
                      <p className="cup-sub-val text-green">{fields.verificationType || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Reference Number</span>
                      <p className="cup-sub-val">{fields.referenceNo || caseData.case_id}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Purpose of Verification</span>
                      <p className="cup-sub-val">{fields.purposeOfVerification || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Verification Date</span>
                      <p className="cup-sub-val">{fmtDate(criminalCheck?.updated_at || caseData.created_at)}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">State</span>
                      <p className="cup-sub-val">{fields.state || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Expected TAT</span>
                      <p className="cup-sub-val">
                        {fields.expectedTat
                          ? `${fields.expectedTat} Days`
                          : (criminalCheck?.working_days || criminalCheck?.calendar_days)
                          ? `${criminalCheck.working_days || criminalCheck.calendar_days} Days`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="cup-sub-label">District</span>
                      <p className="cup-sub-val">{fields.district || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Status</span>
                      <p style={{ margin: "3px 0 0 0", textAlign: "left" }}>
                        <span className={`cup-status-tag ${criminalCheck ? checkStatus.cls : "pending"}`}>
                          {criminalCheck ? checkStatus.label : "Not Started"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Police Station</span>
                      <p className="cup-sub-val">{fields.policeStation || "—"}</p>
                    </div>
                    <div>
                      <span className="cup-sub-label">Assigned Verifier</span>
                      <p className="cup-sub-val">{verifierName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cup-grid-2">
                {/* Documents Table */}
                <div className="cup-card" id="cup-documents-section">
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
                      {documentRows.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8", padding: "16px" }}>
                            No documents uploaded yet.
                          </td>
                        </tr>
                      ) : (
                        documentRows.map((doc) => (
                          <tr key={doc.key}>
                            <td>{doc.name || doc.key}</td>
                            <td>{doc.key}</td>
                            <td>{fmtDate(doc.uploaded_at)}</td>
                            <td><span className="cup-badge-verified">Uploaded</span></td>
                            <td>
                              <div className="cup-doc-actions">
                                <a className="cup-link-btn" href={doc.url} target="_blank" rel="noreferrer">👁 View</a>
                                <a className="cup-link-btn" href={doc.url} download target="_blank" rel="noreferrer">📥 Download</a>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Verification Timeline */}
                <div className="cup-card">
                  <div className="cup-card-header">
                    <h3>⏱ Verification Timeline</h3>
                  </div>
                  {timelineLoading ? (
                    <p style={{ fontSize: 12, color: "#94a3b8" }}>Loading…</p>
                  ) : timeline.length === 0 ? (
                    <p style={{ fontSize: 12, color: "#94a3b8" }}>No events yet.</p>
                  ) : (
                    <div className="cup-timeline">
                      {timeline.map((ev, idx) => (
                        <div className="cup-timeline-item" key={ev.id}>
                          <div className={`cup-timeline-dot ${idx === timeline.length - 1 && caseData.status === "completed" ? "success" : ""}`}>✓</div>
                          <div className="cup-timeline-content">
                            <span className="cup-time">{fmtDate(ev.timestamp)}</span>
                            <h4>{ev.title}</h4>
                            <p>{ev.description}{ev.actor ? ` — ${ev.actor}` : ""}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks Section */}
              <div className="cup-card">
                <div className="cup-card-header">
                  <h3>📋 Remarks</h3>
                </div>
                <p className="cup-remarks-text">{remarksText}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriminalUserProfile;
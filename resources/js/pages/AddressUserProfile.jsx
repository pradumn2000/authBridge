import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../css/style.css";

export default function AddressUserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'permanent' | 'correspondence'

  // Back button click handler to redirect to /AddressCheck
  const handleBack = () => {
    navigate("/AddressCheck");
  };

  const addressData = [
    {
      id: 1,
      type: "Permanent Address",
      isPermanent: true,
      address: "Flat 402, ABC Residency, Baner Road, Pune - 411045, Maharashtra, India",
      mobile: "+91 98765 43210",
      mode: "Video Verification",
      modeColor: "#9333ea",
      modeBg: "#faf5ff",
      docs: { idProof: 1, addressProof: 1, otherDocs: 0 },
      verifier: { name: "Amit Kumar", id: "VER-1001", assigned: true },
      status: "Link Sent",
      statusBg: "#fff7ed",
      statusColor: "#ea580c",
      sentOn: "24 Aug 2026, 10:30 AM",
      expiresOn: "24 Aug 2026, 06:30 PM",
      dueIn: "Due in 2 Days",
      dueDate: "27 Aug 2026",
      slaColor: "#d97706",
    },
    {
      id: 2,
      type: "Correspondence Address",
      isPermanent: false,
      address: "B-12, Shanti Nagar, Near City Mall, Nashik Road, Nashik - 422101, Maharashtra, India",
      mobile: "+91 98765 43210",
      mode: "Physical Verification",
      modeColor: "#0891b2",
      modeBg: "#ecfeff",
      docs: { idProof: 1, addressProof: 1, otherDocs: 0 },
      verifier: { name: "Not Assigned", id: "", assigned: false },
      status: "Pending Assignment",
      statusBg: "#f8fafc",
      statusColor: "#64748b",
      sentOn: "",
      expiresOn: "",
      dueIn: "Due in 3 Days",
      dueDate: "28 Aug 2026",
      slaColor: "#16a34a",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* 1. Sidebar Component */}
      <div id="sidebar">
        <Sidebar />
      </div>

      {/* 2. Main Content Container */}
      <div id="content" style={{ display: "flex", flexDirection: "column", minWidth: 0, width: "calc(100% - 270px)" }}>
        {/* Fixed Header */}
        <Header />

        <main style={{ padding: "20px 24px", flex: 1 }}>
          
          {/* Back Button */}
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
              marginBottom: "12px",
            }}
          >
            ‹ Back to Address Check
          </button>

          {/* Page Heading & Subtitle */}
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 2px 0" }}>Address Verification</h1>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Manage Permanent and Correspondence address verification for this case</p>
          </div>

          {/* CANDIDATE HEADER SUMMARY CARD */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px 20px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#475569", overflow: "hidden" }}>
                  👤
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Rahul Verma</h3>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Candidate ID: <strong style={{ color: "#334155" }}>CAN-10245</strong></span>
                </div>
              </div>

              <div style={{ height: "30px", width: "1px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Case ID</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>CAS-10245</strong>
              </div>

              <div style={{ height: "30px", width: "1px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Client Name</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>ABC Technologies</strong>
              </div>

              <div style={{ height: "30px", width: "1px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", marginBottom: "2px" }}>Case Status</span>
                <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "4px", border: "1px solid #dcfce7" }}>
                  In Progress
                </span>
              </div>

              <div style={{ height: "30px", width: "1px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Created On</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>21 Aug 2026</strong>
              </div>

              <div style={{ height: "30px", width: "1px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>SLA / TAT</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>3 Days</strong>
              </div>

              <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                Add Address Verification
              </button>

            </div>
          </div>

          {/* TABS & FILTERS BAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            
            {/* Left Tabs */}
            <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "2px" }}>
              <button
                onClick={() => setActiveTab("all")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 2px",
                  fontSize: "12px",
                  fontWeight: activeTab === "all" ? "700" : "500",
                  color: activeTab === "all" ? "#2563eb" : "#64748b",
                  borderBottom: activeTab === "all" ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                All (2)
              </button>
              <button
                onClick={() => setActiveTab("permanent")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 2px",
                  fontSize: "12px",
                  fontWeight: activeTab === "permanent" ? "700" : "500",
                  color: activeTab === "permanent" ? "#2563eb" : "#64748b",
                  borderBottom: activeTab === "permanent" ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                Permanent Address (1)
              </button>
              <button
                onClick={() => setActiveTab("correspondence")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 2px",
                  fontSize: "12px",
                  fontWeight: activeTab === "correspondence" ? "700" : "500",
                  color: activeTab === "correspondence" ? "#2563eb" : "#64748b",
                  borderBottom: activeTab === "correspondence" ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                Correspondence Address (1)
              </button>
            </div>

            {/* Right Action Filters */}
            <div style={{ display: "flex", gap: "8px" }}>
              <select style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#475569" }}>
                <option>All Status</option>
              </select>

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Date Range"
                  style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "6px", padding: "6px 28px 6px 10px", fontSize: "11px", color: "#475569", width: "110px", outline: "none" }}
                />
                <span style={{ position: "absolute", right: "8px", top: "5px", color: "#94a3b8", fontSize: "11px" }}>📅</span>
              </div>

              <button style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", fontWeight: "600", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                📥 Export
              </button>
            </div>

          </div>

          {/* MAIN ADDRESS TABLE */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "11px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#475569", borderBottom: "1px solid #e2e8f0", fontSize: "11px" }}>
                  <th style={{ padding: "12px 10px", width: "30px" }}>#</th>
                  <th style={{ padding: "12px 10px", width: "130px" }}>Address Type</th>
                  <th style={{ padding: "12px 10px", width: "240px" }}>Address Details</th>
                  <th style={{ padding: "12px 10px", width: "150px" }}>Verification Mode</th>
                  <th style={{ padding: "12px 10px", width: "160px" }}>Documents</th>
                  <th style={{ padding: "12px 10px", width: "130px" }}>Verifier</th>
                  <th style={{ padding: "12px 10px", width: "140px" }}>Status</th>
                  <th style={{ padding: "12px 10px", width: "110px" }}>SLA / Due Date</th>
                  <th style={{ padding: "12px 10px", width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {addressData.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9", verticalAlign: "top" }}>
                    {/* Index */}
                    <td style={{ padding: "14px 10px", color: "#64748b" }}>{row.id}</td>

                    {/* Address Type */}
                    <td style={{ padding: "14px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "14px" }}>{row.isPermanent ? "🏠" : "🏢"}</span>
                        <span style={{ fontWeight: "600", color: "#2563eb", fontSize: "11px" }}>{row.type}</span>
                      </div>
                    </td>

                    {/* Address Details */}
                    <td style={{ padding: "14px 10px" }}>
                      <p style={{ margin: "0 0 8px 0", color: "#334155", lineHeight: "1.4", fontSize: "11px" }}>{row.address}</p>
                      <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "500" }}>Mobile: {row.mobile}</span>
                    </td>

                    {/* Verification Mode */}
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ background: row.modeBg, color: row.modeColor, border: `1px solid ${row.modeColor}33`, fontSize: "10px", fontWeight: "600", padding: "3px 8px", borderRadius: "12px", display: "inline-block", marginBottom: "8px" }}>
                        {row.isPermanent ? "📹" : "👤"} {row.mode}
                      </span>
                      <br />
                      <button style={{ border: "none", background: "none", color: "#2563eb", fontSize: "10px", fontWeight: "600", cursor: "pointer", padding: 0 }}>
                        Change Mode
                      </button>
                    </td>

                    {/* Documents */}
                    <td style={{ padding: "14px 10px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#16a34a", fontSize: "10px" }}>✔</span>
                          <span style={{ fontSize: "10px", color: "#475569" }}>ID Proof</span>
                          <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: "50%", width: "14px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700" }}>{row.docs.idProof}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#16a34a", fontSize: "10px" }}>✔</span>
                          <span style={{ fontSize: "10px", color: "#475569" }}>Address Proof</span>
                          <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: "50%", width: "14px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700" }}>{row.docs.addressProof}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "#16a34a", fontSize: "10px" }}>✔</span>
                          <span style={{ fontSize: "10px", color: "#475569" }}>Other Docs</span>
                          <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: "50%", width: "14px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700" }}>{row.docs.otherDocs}</span>
                        </div>
                      </div>
                      <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", borderRadius: "4px", padding: "3px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer" }}>
                        📂 View Documents
                      </button>
                    </td>

                    {/* Verifier */}
                    <td style={{ padding: "14px 10px" }}>
                      {row.verifier.assigned ? (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>👤</div>
                            <div>
                              <strong style={{ fontSize: "11px", color: "#0f172a", display: "block" }}>{row.verifier.name}</strong>
                              <span style={{ fontSize: "9px", color: "#64748b" }}>{row.verifier.id}</span>
                            </div>
                          </div>
                          <button style={{ border: "none", background: "none", color: "#2563eb", fontSize: "10px", fontWeight: "600", cursor: "pointer", padding: 0 }}>
                            Reassign
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", color: "#64748b" }}>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>👤</div>
                            <span style={{ fontSize: "10px" }}>Not Assigned</span>
                          </div>
                          <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#2563eb", borderRadius: "4px", padding: "3px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer" }}>
                            Assign Verifier
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ background: row.statusBg, color: row.statusColor, fontSize: "10px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                        {row.status === "Link Sent" && "📣 "}
                        {row.status}
                      </span>
                      {row.sentOn && (
                        <div style={{ fontSize: "9px", color: "#64748b" }}>
                          <span>Sent On</span>
                          <span style={{ display: "block", color: "#334155" }}>{row.sentOn}</span>
                          <span style={{ marginTop: "4px", display: "block" }}>Expires On</span>
                          <span style={{ display: "block", color: "#334155" }}>{row.expiresOn}</span>
                        </div>
                      )}
                    </td>

                    {/* SLA / Due Date */}
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ fontSize: "10px", color: row.slaColor, fontWeight: "600", display: "block", marginBottom: "4px" }}>
                        {row.dueIn}
                      </span>
                      <span style={{ fontSize: "9px", color: "#64748b", display: "block" }}>Due Date</span>
                      <strong style={{ fontSize: "10px", color: "#0f172a" }}>{row.dueDate}</strong>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 10px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "fit-content" }}>
                        <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", borderRadius: "4px", padding: "4px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>
                          👤 Assign Verifier
                        </button>
                        {row.isPermanent && (
                          <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", borderRadius: "4px", padding: "4px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>
                            📣 Resend Link
                          </button>
                        )}
                        <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", borderRadius: "4px", padding: "4px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>
                          👁 View Details
                        </button>
                        <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", borderRadius: "4px", padding: "4px 8px", fontSize: "10px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>
                          ••• More ▾
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", fontSize: "11px", color: "#64748b" }}>
              <span>Showing 1 to 2 of 2 entries</span>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>‹</button>
                <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "3px 6px", borderRadius: "4px", fontWeight: 700 }}>1</button>
                <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>›</button>
                <select style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 6px", marginLeft: "8px" }}><option>10 / page</option></select>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
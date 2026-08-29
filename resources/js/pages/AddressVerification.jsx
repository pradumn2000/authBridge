import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AddressVerification() {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const addressData = [
    {
      id: 1,
      type: "Permanent Address",
      icon: "🏠",
      addressDetails: {
        line1: "Flat 402, ABC Residency,",
        line2: "Baner Road, Pune - 411045,",
        line3: "Maharashtra, India",
        mobile: "+91 98765 43210",
      },
      verificationMode: "Video Verification",
      modeBadgeColor: "#f3e8ff",
      modeTextColor: "#6b21a8",
      documents: [
        { name: "ID Proof", count: 1 },
        { name: "Address Proof", count: 1 },
        { name: "Other Docs", count: 0 },
      ],
      verifier: {
        name: "Amit Kumar",
        code: "VER-1001",
        avatar: "https://via.placeholder.com/32",
        assigned: true,
      },
      status: "Link Sent",
      statusBg: "#fef3c7",
      statusColor: "#d97706",
      statusDetails: {
        sentOn: "24 Aug 2026, 10:30 AM",
        expiresOn: "24 Aug 2026, 06:30 PM",
      },
      sla: {
        dueIn: "2 Days",
        dueDate: "27 Aug 2026",
      },
    },
    {
      id: 2,
      type: "Correspondence Address",
      icon: "🏢",
      addressDetails: {
        line1: "B-12, Shanti Nagar,",
        line2: "Near City Mall, Nashik Road,",
        line3: "Nashik - 422101, Maharashtra, India",
        mobile: "+91 98765 43210",
      },
      verificationMode: "Physical Verification",
      modeBadgeColor: "#e0f2fe",
      modeTextColor: "#0369a1",
      documents: [
        { name: "ID Proof", count: 1 },
        { name: "Address Proof", count: 1 },
        { name: "Other Docs", count: 0 },
      ],
      verifier: {
        name: "Not Assigned",
        code: "",
        avatar: "",
        assigned: false,
      },
      status: "Pending Assignment",
      statusBg: "#f1f5f9",
      statusColor: "#64748b",
      statusDetails: null,
      sla: {
        dueIn: "3 Days",
        dueDate: "28 Aug 2026",
      },
    },
  ];

  const totalEntries = addressData.length;
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  return (
    <>
      <Sidebar />

      <section id="content">
        <Header />

        {/* Outer Page Scroll Wrapper */}
        <main
          style={{
            padding: "24px",
            backgroundColor: "#f8fafc",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
            
            {/* Top Bar with space-between */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>
                  Address Verification
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  Manage Permanent and Correspondence address verification for this case
                </p>
              </div>

              <button
                style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 18px",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 4px rgba(37,99,235,0.2)",
                }}
              >
                <span>+</span> Add Address Verification
              </button>
            </div>

            {/* Candidate Summary Card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justify: "space-between",
                marginBottom: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                  src="https://via.placeholder.com/48"
                  alt="Candidate"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>Rahul Verma</h4>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Candidate ID: CAN-10245</span>
                </div>
              </div>

              <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>Case ID</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>CAS-10245</span>
              </div>

              <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>Client Name</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>ABC Technologies</span>
              </div>

              <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>Case Status</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#16a34a",
                    background: "#dcfce7",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: "2px",
                  }}
                >
                  In Progress
                </span>
              </div>

              <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>Created On</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>21 Aug 2026</span>
              </div>

              <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }}></div>

              <div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, display: "block" }}>SLA / TAT</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>3 Days</span>
              </div>
            </div>

            {/* Filter Controls Bar with space-between */}
            <div
              style={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {/* Left Tabs */}
              <div style={{ display: "flex", gap: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "4px" }}>
                <span
                  onClick={() => setActiveTab("all")}
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: activeTab === "all" ? "#2563eb" : "#64748b",
                    cursor: "pointer",
                    borderBottom: activeTab === "all" ? "2px solid #2563eb" : "none",
                    paddingBottom: "8px",
                    marginBottom: "-6px",
                  }}
                >
                  All ({totalEntries})
                </span>
                <span
                  onClick={() => setActiveTab("permanent")}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: activeTab === "permanent" ? "#2563eb" : "#64748b",
                    cursor: "pointer",
                    borderBottom: activeTab === "permanent" ? "2px solid #2563eb" : "none",
                    paddingBottom: "8px",
                    marginBottom: "-6px",
                  }}
                >
                  Permanent Address (1)
                </span>
                <span
                  onClick={() => setActiveTab("correspondence")}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: activeTab === "correspondence" ? "#2563eb" : "#64748b",
                    cursor: "pointer",
                    borderBottom: activeTab === "correspondence" ? "2px solid #2563eb" : "none",
                    paddingBottom: "8px",
                    marginBottom: "-6px",
                  }}
                >
                  Correspondence Address (1)
                </span>
              </div>

              {/* Right Controls */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    fontSize: "12px",
                    color: "#334155",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="link_sent">Link Sent</option>
                  <option value="pending">Pending Assignment</option>
                </select>

                <button
                  style={{
                    padding: "7px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    fontSize: "12px",
                    color: "#334155",
                    cursor: "pointer",
                  }}
                >
                  📅 Date Range ▾
                </button>

                <button
                  style={{
                    padding: "7px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    fontSize: "12px",
                    color: "#334155",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  📥 Export
                </button>
              </div>
            </div>

            {/* Table Container Card */}
            <div style={{ background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              
              {/* Inner Table Scroll Container */}
              <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "550px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px", minWidth: "1100px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 2 }}>
                      <th style={{ padding: "12px 16px" }}>#</th>
                      <th style={{ padding: "12px 16px" }}>Address Type</th>
                      <th style={{ padding: "12px 16px" }}>Address Details</th>
                      <th style={{ padding: "12px 16px" }}>Verification Mode</th>
                      <th style={{ padding: "12px 16px" }}>Documents</th>
                      <th style={{ padding: "12px 16px" }}>Verifier</th>
                      <th style={{ padding: "12px 16px" }}>Status</th>
                      <th style={{ padding: "12px 16px" }}>SLA / Due Date</th>
                      <th style={{ padding: "12px 16px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addressData.map((row) => (
                      <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9", verticalAlign: "top" }}>
                        <td style={{ padding: "16px", fontWeight: 600, color: "#64748b" }}>{row.id}</td>

                        <td style={{ padding: "16px", fontWeight: 700, color: "#2563eb", width: "170px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span>{row.icon}</span>
                            <span>{row.type}</span>
                          </div>
                        </td>

                        <td style={{ padding: "16px", color: "#334155", lineHeight: "1.5", maxWidth: "250px" }}>
                          <div>{row.addressDetails.line1}</div>
                          <div>{row.addressDetails.line2}</div>
                          <div>{row.addressDetails.line3}</div>
                          <div style={{ marginTop: "6px", color: "#64748b", fontSize: "12px" }}>
                            Mobile: {row.addressDetails.mobile}
                          </div>
                        </td>

                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              background: row.modeBadgeColor,
                              color: row.modeTextColor,
                              padding: "5px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: 600,
                              display: "inline-block",
                              marginBottom: "8px",
                            }}
                          >
                            {row.verificationMode}
                          </span>
                          <div>
                            <a href="#change-mode" style={{ color: "#2563eb", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                              Change Mode
                            </a>
                          </div>
                        </td>

                        <td style={{ padding: "16px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
                            {row.documents.map((doc, idx) => (
                              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                                <span style={{ color: "#16a34a" }}>✔</span>
                                <span style={{ color: "#475569" }}>{doc.name}</span>
                                <span
                                  style={{
                                    background: doc.count > 0 ? "#dcfce7" : "#f1f5f9",
                                    color: doc.count > 0 ? "#15803d" : "#64748b",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justify: "center",
                                  }}
                                >
                                  {doc.count}
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            style={{
                              background: "#fff",
                              border: "1px solid #cbd5e1",
                              borderRadius: "6px",
                              padding: "5px 10px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#2563eb",
                              cursor: "pointer",
                            }}
                          >
                            📁 View Documents
                          </button>
                        </td>

                        <td style={{ padding: "16px" }}>
                          {row.verifier.assigned ? (
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                                <img
                                  src={row.verifier.avatar}
                                  alt="Verifier"
                                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                />
                                <div>
                                  <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "12px" }}>{row.verifier.name}</div>
                                  <div style={{ color: "#64748b", fontSize: "11px" }}>{row.verifier.code}</div>
                                </div>
                              </div>
                              <a href="#reassign" style={{ color: "#2563eb", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                                Reassign
                              </a>
                            </div>
                          ) : (
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", marginBottom: "10px" }}>
                                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#e2e8f0" }}></div>
                                <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b" }}>Not Assigned</span>
                              </div>
                              <button
                                style={{
                                  background: "#fff",
                                  border: "1px solid #2563eb",
                                  borderRadius: "6px",
                                  padding: "5px 10px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "#2563eb",
                                  cursor: "pointer",
                                }}
                              >
                                Assign Verifier
                              </button>
                            </div>
                          )}
                        </td>

                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              background: row.statusBg,
                              color: row.statusColor,
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: 700,
                              display: "inline-block",
                              marginBottom: "8px",
                            }}
                          >
                            {row.status === "Link Sent" && "✈ "}
                            {row.status}
                          </span>

                          {row.statusDetails && (
                            <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.4" }}>
                              <div>Sent On</div>
                              <div style={{ fontWeight: 600, color: "#334155", marginBottom: "4px" }}>{row.statusDetails.sentOn}</div>
                              <div>Expires On</div>
                              <div style={{ fontWeight: 600, color: "#334155" }}>{row.statusDetails.expiresOn}</div>
                            </div>
                          )}
                        </td>

                        <td style={{ padding: "16px", fontSize: "12px" }}>
                          <div style={{ color: "#64748b" }}>Due In</div>
                          <div style={{ color: row.sla.dueIn.includes("2") ? "#d97706" : "#16a34a", fontWeight: 700, marginBottom: "8px" }}>
                            {row.sla.dueIn}
                          </div>
                          <div style={{ color: "#64748b" }}>Due Date</div>
                          <div style={{ fontWeight: 700, color: "#1e293b" }}>{row.sla.dueDate}</div>
                        </td>

                        <td style={{ padding: "16px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <button
                              style={{
                                background: "#fff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                padding: "5px 10px",
                                fontSize: "12px",
                                color: "#334155",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              👤 Assign Verifier
                            </button>
                            <button
                              style={{
                                background: "#fff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                padding: "5px 10px",
                                fontSize: "12px",
                                color: "#334155",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              ✈ Resend Link
                            </button>
                            <button
                              style={{
                                background: "#fff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                padding: "5px 10px",
                                fontSize: "12px",
                                color: "#334155",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              👁 View Details
                            </button>
                            <button
                              style={{
                                background: "#fff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                padding: "5px 10px",
                                fontSize: "12px",
                                color: "#334155",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              ••• More ▾
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Functional Pagination Bar with Space-Between */}
              <div
                style={{
                  display: "flex",
                  justify: "space-between",
                  alignItems: "center",
                  padding: "12px 18px",
                  background: "#fff",
                  borderTop: "1px solid #e2e8f0",
                  fontSize: "12px",
                  color: "#64748b",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  Showing <span style={{ fontWeight: 600, color: "#1e293b" }}>{startEntry}</span> to{" "}
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{endEntry}</span> of{" "}
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{totalEntries}</span> entries
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: "4px 8px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        borderRadius: "4px",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        opacity: currentPage === 1 ? 0.5 : 1,
                      }}
                    >
                      ‹
                    </button>
                    
                    <button
                      style={{
                        padding: "4px 10px",
                        border: "none",
                        background: "#2563eb",
                        color: "#fff",
                        borderRadius: "4px",
                        fontWeight: 700,
                      }}
                    >
                      {currentPage}
                    </button>

                    <button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={endEntry >= totalEntries}
                      style={{
                        padding: "4px 8px",
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        borderRadius: "4px",
                        cursor: endEntry >= totalEntries ? "not-allowed" : "pointer",
                        opacity: endEntry >= totalEntries ? 0.5 : 1,
                      }}
                    >
                      ›
                    </button>
                  </div>

                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{
                      padding: "4px 8px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      background: "#fff",
                      fontSize: "12px",
                      color: "#334155",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
        </main>
      </section>
    </>
  );
}
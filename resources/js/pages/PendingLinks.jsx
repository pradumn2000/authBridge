import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Mock Data matching the UI image
const INITIAL_PENDING_LINKS = [
  {
    id: 1,
    caseId: "STP-001246",
    candidateName: "Rahul Mehta",
    caseType: "New Case",
    checkType: "Employment Verification",
    sentDate: "18 Sep 2025 10:30 AM",
    linkExpiry: "25 Sep 2025",
    status: "Awaiting Candidate",
    link: "https://bgv.portal/candidate/stp001246",
  },
  {
    id: 2,
    caseId: "STP-001245",
    candidateName: "Neha Sharma",
    caseType: "New Case",
    checkType: "Address Verification",
    sentDate: "18 Sep 2025 09:15 AM",
    linkExpiry: "25 Sep 2025",
    status: "Awaiting Candidate",
    link: "https://bgv.portal/candidate/stp001245",
  },
  {
    id: 3,
    caseId: "STP-001244",
    candidateName: "Rohan Gupta",
    caseType: "New Case",
    checkType: "Education Verification",
    sentDate: "17 Sep 2025 04:45 PM",
    linkExpiry: "24 Sep 2025",
    status: "Link Sent",
    link: "https://bgv.portal/candidate/stp001244",
  },
  {
    id: 4,
    caseId: "STP-001242",
    candidateName: "Priya Singh",
    caseType: "New Case",
    checkType: "Employment Verification",
    sentDate: "16 Sep 2025 11:20 AM",
    linkExpiry: "23 Sep 2025",
    status: "Awaiting Candidate",
    link: "https://bgv.portal/candidate/stp001242",
  },
  {
    id: 5,
    caseId: "STP-001241",
    candidateName: "Ankit Verma",
    caseType: "New Case",
    checkType: "Address Verification",
    sentDate: "15 Sep 2025 02:10 PM",
    linkExpiry: "22 Sep 2025",
    status: "Link Sent",
    link: "https://bgv.portal/candidate/stp001241",
  },
  {
    id: 6,
    caseId: "STP-001240",
    candidateName: "Sakshi Iyer",
    caseType: "New Case",
    checkType: "Employment Verification",
    sentDate: "14 Sep 2025 10:05 AM",
    linkExpiry: "21 Sep 2025",
    status: "Expired",
    link: "https://bgv.portal/candidate/stp001240",
  },
  {
    id: 7,
    caseId: "STP-001238",
    candidateName: "Vivek Kumar",
    caseType: "New Case",
    checkType: "Education Verification",
    sentDate: "13 Sep 2025 03:40 PM",
    linkExpiry: "20 Sep 2025",
    status: "Awaiting Candidate",
    link: "https://bgv.portal/candidate/stp001238",
  },
  {
    id: 8,
    caseId: "STP-001237",
    candidateName: "Kavya Nair",
    caseType: "New Case",
    checkType: "Address Verification",
    sentDate: "12 Sep 2025 09:55 AM",
    linkExpiry: "19 Sep 2025",
    status: "Expired",
    link: "https://bgv.portal/candidate/stp001237",
  },
];

export default function PendingLinks() {
  const [links, setLinks] = useState(INITIAL_PENDING_LINKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState("All");
  const [selectedCheckType, setSelectedCheckType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter Logic
  const filteredLinks = links.filter((item) => {
    const matchesSearch =
      item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCaseType =
      selectedCaseType === "All" || item.caseType === selectedCaseType;
    const matchesCheckType =
      selectedCheckType === "All" || item.checkType === selectedCheckType;
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesCaseType && matchesCheckType && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  // Action handlers
  const handleCopyLink = (id, link) => {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResend = (caseId) => {
    alert(`Link resent for Case ID: ${caseId}`);
  };

  const handleResendAll = () => {
    alert("Resent verification links to all pending candidates!");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCaseType("All");
    setSelectedCheckType("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main style={{ padding: "24px", backgroundColor: "#f8fafc" }}>
          {/* Header Bar */}
          <div style={styles.topHeaderRow}>
            <div>
              <h1 style={styles.pageTitle}>Pending Links</h1>
              <p style={styles.pageSubTitle}>Track and manage pending verification links</p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={styles.searchBoxWrapper}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search by case ID, candidate name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <button style={styles.exportBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export
              </button>
            </div>
          </div>

          {/* Resend All Button Right Aligned Above Stats */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button style={styles.resendAllBtn} onClick={handleResendAll}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Resend All Pending Links
            </button>
          </div>

          {/* KPI Stat Cards */}
          <div style={styles.statsGrid}>
            <div style={{ ...styles.statCard, borderColor: "#f59e0b" }}>
              <div style={{ ...styles.iconCircle, backgroundColor: "#fef3c7", color: "#d97706" }}>
                🔗
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: "#d97706" }}>8</h3>
                <p style={styles.statLabel}>Total Pending Links</p>
              </div>
            </div>

            <div style={{ ...styles.statCard, borderColor: "#3b82f6" }}>
              <div style={{ ...styles.iconCircle, backgroundColor: "#dbeafe", color: "#2563eb" }}>
                🚀
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: "#2563eb" }}>3</h3>
                <p style={styles.statLabel}>Links Sent Today</p>
              </div>
            </div>

            <div style={{ ...styles.statCard, borderColor: "#8b5cf6" }}>
              <div style={{ ...styles.iconCircle, backgroundColor: "#f3e8ff", color: "#7c3aed" }}>
                👤
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: "#7c3aed" }}>5</h3>
                <p style={styles.statLabel}>Awaiting Candidate</p>
              </div>
            </div>

            <div style={{ ...styles.statCard, borderColor: "#ef4444" }}>
              <div style={{ ...styles.iconCircle, backgroundColor: "#fee2e2", color: "#dc2626" }}>
                ⏰
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: "#dc2626" }}>1</h3>
                <p style={styles.statLabel}>Expired Links</p>
              </div>
            </div>

            <div style={{ ...styles.statCard, borderColor: "#10b981" }}>
              <div style={{ ...styles.iconCircle, backgroundColor: "#d1fae5", color: "#059669" }}>
                📈
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: "#059669" }}>78%</h3>
                <p style={styles.statLabel}>Completion Rate</p>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div style={styles.filterCard}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Date Range</label>
              <div style={styles.datePickerInput}>
                📅 01 Sep 2025 - 30 Sep 2025 ▾
              </div>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Case Type</label>
              <select style={styles.selectInput} value={selectedCaseType} onChange={(e) => setSelectedCaseType(e.target.value)}>
                <option value="All">All</option>
                <option value="New Case">New Case</option>
                <option value="Re-verification">Re-verification</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Check Type (All Checks)</label>
              <select style={styles.selectInput} value={selectedCheckType} onChange={(e) => setSelectedCheckType(e.target.value)}>
                <option value="All">All</option>
                <option value="Employment Verification">Employment Verification</option>
                <option value="Address Verification">Address Verification</option>
                <option value="Education Verification">Education Verification</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Status</label>
              <select style={styles.selectInput} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Awaiting Candidate">Awaiting Candidate</option>
                <option value="Link Sent">Link Sent</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <button style={styles.resetBtn} onClick={handleResetFilters}>
              🔄 Reset
            </button>
          </div>

          {/* Table Container */}
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>CASE ID</th>
                  <th style={styles.th}>CANDIDATE NAME</th>
                  <th style={styles.th}>CASE TYPE</th>
                  <th style={styles.th}>CHECK TYPE</th>
                  <th style={styles.th}>LINK SENT DATE</th>
                  <th style={styles.th}>LINK EXPIRY</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const statusStyle = getStatusBadgeStyle(item.status);
                  const isExpired = item.status === "Expired";

                  return (
                    <tr key={item.id} style={styles.tableBodyRow}>
                      <td style={{ ...styles.td, fontWeight: 600, color: "#475569" }}>
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td style={{ ...styles.td, fontWeight: 600, color: "#1e293b" }}>{item.caseId}</td>
                      <td style={{ ...styles.td, fontWeight: 600, color: "#1e293b" }}>{item.candidateName}</td>
                      <td style={styles.td}>{item.caseType}</td>
                      <td style={styles.td}>{item.checkType}</td>
                      <td style={styles.td}>{item.sentDate}</td>
                      <td style={styles.td}>{item.linkExpiry}</td>
                      <td style={styles.td}>
                        <span style={statusStyle}>{item.status}</span>
                      </td>
                      <td style={{ ...styles.td, textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                          <button
                            style={{
                              ...styles.actionOutlineBtn,
                              opacity: isExpired ? 0.8 : 1,
                            }}
                            onClick={() => handleResend(item.caseId)}
                          >
                            📥 Resend Link
                          </button>

                          {!isExpired && (
                            <button
                              style={styles.actionOutlineBtn}
                              onClick={() => handleCopyLink(item.id, item.link)}
                            >
                              🔗 {copiedId === item.id ? "Copied" : "Copy Link"}
                            </button>
                          )}

                          {!isExpired && (
                            <button style={styles.actionTextBtn}>
                              View Details
                            </button>
                          )}

                          <button style={styles.moreOptionsBtn}>⋮</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div style={styles.paginationRow}>
              <div style={styles.showingText}>
                Showing {filteredLinks.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
                {Math.min(indexOfLastItem, filteredLinks.length)} of {filteredLinks.length} entries
              </div>

              <div style={styles.paginationControls}>
                <button
                  style={{
                    ...styles.pageArrowBtn,
                    opacity: currentPage === 1 ? 0.4 : 1,
                  }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ‹
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    style={{
                      ...styles.pageNumBtn,
                      backgroundColor: currentPage === i + 1 ? "#0a1b52" : "transparent",
                      color: currentPage === i + 1 ? "#fff" : "#334155",
                    }}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  style={{
                    ...styles.pageArrowBtn,
                    opacity: currentPage === totalPages ? 0.4 : 1,
                  }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

// Status Badges Colors UI matching
function getStatusBadgeStyle(status) {
  const base = {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    display: "inline-block",
  };

  if (status === "Awaiting Candidate") {
    return { ...base, backgroundColor: "#fef3c7", color: "#d97706" };
  }
  if (status === "Link Sent") {
    return { ...base, backgroundColor: "#eff6ff", color: "#2563eb" };
  }
  if (status === "Expired") {
    return { ...base, backgroundColor: "#fee2e2", color: "#dc2626" };
  }
  return base;
}

// Inline Styles strictly matching dashboard structure
const styles = {
  topHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0a1b52",
    margin: 0,
  },
  pageSubTitle: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
  },
  searchBoxWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "6px 12px",
    gap: "8px",
    width: "300px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "13px",
    color: "#334155",
  },
  exportBtn: {
    backgroundColor: "#0d9488",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  resendAllBtn: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "9px 18px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  statCard: {
    backgroundColor: "#fff",
    borderLeft: "4px solid",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  iconCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  statNumber: {
    fontSize: "20px",
    fontWeight: "800",
    margin: 0,
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
    fontWeight: 500,
  },
  filterCard: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    gap: "16px",
    alignItems: "flex-end",
    borderBottom: "1px solid #f1f5f9",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
  },
  datePickerInput: {
    backgroundColor: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "13px",
    color: "#334155",
    cursor: "pointer",
  },
  selectInput: {
    backgroundColor: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "13px",
    color: "#334155",
    outline: "none",
  },
  resetBtn: {
    border: "none",
    backgroundColor: "transparent",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    paddingBottom: "8px",
  },
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  tableHeaderRow: {
    backgroundColor: "#0a1b52",
  },
  th: {
    padding: "12px 14px",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  tableBodyRow: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "14px",
    fontSize: "13px",
    color: "#334155",
  },
  actionOutlineBtn: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#2563eb",
    cursor: "pointer",
  },
  actionTextBtn: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "12px",
    fontWeight: "600",
    color: "#2563eb",
    cursor: "pointer",
  },
  moreOptionsBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#64748b",
    cursor: "pointer",
    padding: "0 4px",
  },
  paginationRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderTop: "1px solid #f1f5f9",
  },
  showingText: {
    fontSize: "13px",
    color: "#64748b",
  },
  paginationControls: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  pageArrowBtn: {
    border: "1px solid #cbd5e1",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
  },
  pageNumBtn: {
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
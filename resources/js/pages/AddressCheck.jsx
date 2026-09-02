import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../../css/style.css";
// import Header from "./Header";


export default function AddressVerification() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAssignModal, setShowAssignModal] = useState(true);
  const [allocationMethod, setAllocationMethod] = useState("manual");
  const [casesToAllocate, setCasesToAllocate] = useState(2);

  const tableData = [
    {
      id: "CAN-10245",
      caseId: "CASE-5001",
      name: "Rahul Verma",
      empId: "EMP-10045",
      client: "ABC Technologies",
      phone: "9876543210",
      type: "Permanent",
      address: "Pune, Maharashtra 411001",
      mode: "Video Verification",
      docs: "Documents",
      verifier: "Amit Kumar",
      verifierId: "VER-1001",
      status: "Link Sent",
      subStatus: "Assigned",
      statusBg: "#eff6ff",
      statusColor: "#2563eb",
      dueDate: "27-Aug-26",
      sla: "2 Days Left",
      slaColor: "#16a34a",
      action: "View Details",
    },
    {
      id: "CAN-10245",
      caseId: "CASE-5001",
      name: "Rahul Verma",
      empId: "EMP-10045",
      client: "ABC Technologies",
      phone: "9876543210",
      type: "Correspondence",
      address: "Nashik, Maharashtra 422001",
      mode: "Physical Verification",
      docs: "2 Docs 📄",
      verifier: "—",
      verifierId: "",
      status: "Pending Assignment",
      subStatus: "Not Assigned",
      statusBg: "#f8fafc",
      statusColor: "#64748b",
      dueDate: "28-Aug-26",
      sla: "3 Days Left",
      slaColor: "#16a34a",
      action: "Assign",
    },
    {
      id: "CAN-10246",
      caseId: "CASE-5002",
      name: "Priya Sharma",
      empId: "EMP-10046",
      client: "XYZ Ltd.",
      phone: "9123456780",
      type: "Permanent",
      address: "Delhi, India 110001",
      mode: "Document Verification",
      docs: "3 Docs 📄",
      verifier: "Neha Singh",
      verifierId: "VER-1002",
      status: "In Progress",
      subStatus: "Verified",
      statusBg: "#f0fdf4",
      statusColor: "#16a34a",
      dueDate: "26-Aug-26",
      sla: "1 Day Left",
      slaColor: "#16a34a",
      action: "View Details",
    },
    {
      id: "CAN-10246",
      caseId: "CASE-5002",
      name: "Priya Sharma",
      empId: "EMP-10046",
      client: "XYZ Ltd.",
      phone: "9123456780",
      type: "Correspondence",
      address: "Noida, UP 201301",
      mode: "Video Verification",
      docs: "2 Docs 📄",
      verifier: "Amit Kumar",
      verifierId: "VER-1001",
      status: "Candidate Joined",
      subStatus: "Link Sent",
      statusBg: "#eff6ff",
      statusColor: "#2563eb",
      dueDate: "26-Aug-26",
      sla: "1 Day Left",
      slaColor: "#16a34a",
      action: "Join Video",
    },
    {
      id: "CAN-10247",
      caseId: "CASE-5003",
      name: "Amit Gupta",
      empId: "EMP-10047",
      client: "ABC Technologies",
      phone: "9876543210",
      type: "Permanent",
      address: "Mumbai, Maharashtra 400001",
      mode: "Physical + Video",
      docs: "4 Docs 📄",
      verifier: "Rajesh Kumar",
      verifierId: "VER-1003",
      status: "QC Review",
      subStatus: "Submitted",
      statusBg: "#faf5ff",
      statusColor: "#9333ea",
      dueDate: "25-Aug-26",
      sla: "Overdue",
      slaColor: "#dc2626",
      action: "Review",
    },
    {
      id: "CAN-10247",
      caseId: "CASE-5003",
      name: "Amit Gupta",
      empId: "EMP-10047",
      client: "ABC Technologies",
      phone: "9876543210",
      type: "Correspondence",
      address: "Mumbai, Maharashtra 400001",
      mode: "Document Verification",
      docs: "2 Docs 📄",
      verifier: "Neha Singh",
      verifierId: "VER-1002",
      status: "Verified",
      subStatus: "QC Approved",
      statusBg: "#f0fdf4",
      statusColor: "#16a34a",
      dueDate: "25-Aug-26",
      sla: "On Time",
      slaColor: "#16a34a",
      action: "View Details",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Container */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0,width: "calc(100% - 270px)",   position: "relative",     left: "270px",}}>
        {/* Fixed Top Header (Standard Component) */}
        {/* <Header /> */}

        <main style={{ padding: "20px" }}>
          
          {/* Top Title & User Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 2px 0" }}>Address Verification</h1>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Manage and track address verification for all candidates</p>
            </div>
            
            {/* <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button style={{ border: "none", background: "none", fontSize: "16px", cursor: "pointer" }}>🔍</button>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <span style={{ fontSize: "16px" }}>🔔</span>
                <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "#dc2626", color: "#fff", fontSize: "8px", borderRadius: "10px", padding: "1px 4px", fontWeight: 700 }}>12</span>
              </div>
              <button style={{ border: "none", background: "none", fontSize: "16px", cursor: "pointer" }}>📅</button>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e2e8f0", paddingLeft: "10px" }}>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "10px", color: "#64748b", display: "block" }}>Welcome,</span>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>QC Manager</span>
                </div>
                <span style={{ fontSize: "10px", color: "#64748b" }}>▼</span>
              </div>
            </div> */}
          </div>

          {/* Metric Summary Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "16px" }}>
            {[
              { label: "Total Cases", val: "250", sub: "All Address Verifications", icon: "📑", bg: "#eff6ff", color: "#2563eb" },
              { label: "Pending Assignment", val: "42", sub: "Awaiting Verifier", icon: "👤", bg: "#fff7ed", color: "#ea580c" },
              { label: "In Progress", val: "31", sub: "Under Verification", icon: "🔄", bg: "#f0fdf4", color: "#16a34a" },
              { label: "Verified", val: "156", sub: "Successfully Verified", icon: "🛡️", bg: "#f0fdf4", color: "#16a34a" },
              { label: "QC Review", val: "15", sub: "Awaiting QC Approval", icon: "🔍", bg: "#faf5ff", color: "#9333ea" },
              { label: "Overdue", val: "6", sub: "Past Due Date", icon: "⚠️", bg: "#fef2f2", color: "#dc2626" },
            ].map((card, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "4px", background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>{card.icon}</div>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: "600", color: "#64748b", display: "block" }}>{card.label}</span>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{card.val}</h3>
                  </div>
                </div>
                <span style={{ fontSize: "9px", color: "#94a3b8" }}>{card.sub}</span>
              </div>
            ))}
          </div>

          {/* Action Box */}
          <div style={{ background: "#fff", border: "1px dashed #cbd5e1", borderRadius: "6px", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px" }}>+</div>
              <div>
                <h4 style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#2563eb" }}>New Address Verification</h4>
                <p style={{ margin: 0, fontSize: "10px", color: "#64748b" }}>Create a new verification request</p>
              </div>
            </div>
            
            <div style={{ display: "flex", borderRadius: "4px", overflow: "hidden" }}>
              <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer" }}>
                New Address Verification
              </button>
              <button style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "6px 8px", borderLeft: "1px solid #3b82f6", cursor: "pointer" }}>▼</button>
            </div>
          </div>

          {/* Multi-column Search/Filter Bar */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "10px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
              <div style={{ position: "relative" }}>
                <input type="text" placeholder="Search Candidate / Case ID" style={{ width: "100%", padding: "6px 8px 6px 26px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", left: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>🔍</span>
              </div>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Client</option></select>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Address Type</option></select>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verification Mode</option></select>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Verifier</option></select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "8px" }}>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>Status</option></select>
              <div style={{ position: "relative" }}>
                <input type="text" placeholder="Due Date" style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", right: "6px", top: "6px", color: "#94a3b8", fontSize: "11px" }}>📅</span>
              </div>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>City</option></select>
              <select style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", color: "#64748b" }}><option>State</option></select>

              <div style={{ display: "flex", gap: "6px" }}>
                <button style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", color: "#2563eb", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Clear</button>
                <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Apply Filters</button>
              </div>
            </div>
          </div>

          {/* 3. MAIN DUAL-PANEL GRID LAYOUT (Left Table + Right Assign Panel) */}
          <div style={{ display: "grid", gridTemplateColumns: showAssignModal ? "1fr 280px" : "1fr", gap: "16px", alignItems: "start" }}>
            
            {/* Left Column: Table Container */}
            <div style={{ width: "100%", overflowX: "auto" }}>
              
              {/* Category Navigation Tabs */}
              {/* <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", marginBottom: "12px", gap: "12px", overflowX: "auto" }}>
                {[
                  { id: "all", label: "All (250)" },
                  { id: "perm", label: "Permanent Address (125)" },
                  { id: "corres", label: "Correspondence Address (125)" },
                  { id: "pending", label: "Pending Assignment (42)" },
                  { id: "video", label: "Video Verification (98)" },
                  { id: "physical", label: "Physical Verification (75)" },
                  { id: "qc", label: "QC Review (15)" },
                  { id: "verified", label: "Verified (156)" },
                  { id: "failed", label: "Failed (18)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "6px 2px 10px 2px",
                      border: "none",
                      background: "transparent",
                      fontSize: "11px",
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      color: activeTab === tab.id ? "#2563eb" : "#64748b",
                      borderBottom: activeTab === tab.id ? "2px solid #2563eb" : "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div> */}

              {/* Table Data */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "11px" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "8px" }}><input type="checkbox" /></th>
                      <th style={{ padding: "8px" }}>Candidate ID<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Case ID</span></th>
                      <th style={{ padding: "8px" }}>Candidate Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Employee ID</span></th>
                      <th style={{ padding: "8px" }}>Client Name<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Mobile Number</span></th>
                      <th style={{ padding: "8px" }}>Address Type<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Address</span></th>
                      <th style={{ padding: "8px" }}>Verification Mode<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Documents</span></th>
                      <th style={{ padding: "8px" }}>Verifier<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Verifier ID</span></th>
                      <th style={{ padding: "8px" }}>Status<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Assignment Status</span></th>
                      <th style={{ padding: "8px" }}>SLA / Due Date<br/><span style={{ fontSize: "9px", fontWeight: 400 }}>Days Remaining</span></th>
                      <th style={{ padding: "8px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "8px" }}><input type="checkbox" /></td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.id}</span>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{row.caseId}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.name}</span>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{row.empId}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>{row.client}</span>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{row.phone}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ background: row.type === "Permanent" ? "#dbeafe" : "#ffedd5", color: row.type === "Permanent" ? "#1e40af" : "#9a3412", fontSize: "9px", padding: "1px 4px", borderRadius: "3px", fontWeight: 600 }}>{row.type}</span>
                          <span style={{ fontSize: "10px", color: "#334155", display: "block", marginTop: "2px" }}>{row.address}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.mode}</span>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{row.docs}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.verifier}</span>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{row.verifierId}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ background: row.statusBg, color: row.statusColor, fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "3px", display: "inline-block" }}>{row.status}</span>
                          <span style={{ fontSize: "9px", color: "#64748b", display: "block", marginTop: "1px" }}>{row.subStatus}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{row.dueDate}</span>
                          <span style={{ fontSize: "9px", color: row.slaColor, fontWeight: 700 }}>{row.sla}</span>
                        </td>
                        <td style={{ padding: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, color: "#2563eb", cursor: "pointer" }}>{row.action}</button>
                            <button style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>⋮</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer / Pagination */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", fontSize: "11px", color: "#64748b" }}>
                  <span>Showing 1 to 8 of 250 entries</span>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>‹</button>
                    <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "3px 6px", borderRadius: "4px", fontWeight: 700 }}>1</button>
                    <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>2</button>
                    <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>3</button>
                    <span>...</span>
                    <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px" }}>32</button>
                    <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "3px 6px", borderRadius: "4px", cursor: "pointer" }}>›</button>
                  </div>
                  <select style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 4px" }}><option>10 / page</option></select>
                </div>
              </div>
            </div>

            {/* Right Column: Inline Panel (Assign Verification) */}
            {showAssignModal && (
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px", boxSizing: "border-box" }}>
                
                {/* Panel Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>Assign Verification</h3>
                  <button onClick={() => setShowAssignModal(false)} style={{ border: "none", background: "none", fontSize: "14px", cursor: "pointer", color: "#64748b" }}>✕</button>
                </div>

                {/* Verifier Search */}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Select Verifier</label>
                  <div style={{ position: "relative" }}>
                    <input type="text" placeholder="Search verifier..." style={{ width: "100%", padding: "5px 8px 5px 24px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "11px", outline: "none", boxSizing: "border-box" }} />
                    <span style={{ position: "absolute", left: "6px", top: "5px", color: "#94a3b8", fontSize: "10px" }}>🔍</span>
                  </div>
                </div>

                {/* List of Verifiers */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { name: "Amit Kumar", title: "Employment Verifier", cases: 12, checked: true },
                    { name: "Neha Patel", title: "Employment Verifier", cases: 8, checked: true },
                    { name: "Rahul Verma", title: "Employment Verifier", cases: 15, checked: false },
                  ].map((v, i) => (
                    <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", background: v.checked ? "#f8fafc" : "#fff" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <input type="checkbox" defaultChecked={v.checked} />
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700 }}>{v.name.charAt(0)}</div>
                        <div>
                          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#1e293b" }}>{v.name}</p>
                          <span style={{ fontSize: "9px", color: "#64748b" }}>{v.title}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "11px", fontWeight: "800", color: "#2563eb", display: "block" }}>{v.cases}</span>
                        <span style={{ fontSize: "8px", color: "#2563eb" }}>Active Cases</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Allocation Method Options */}
                {/* <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Allocation Method</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", color: "#334155" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                      <input type="radio" name="alloc" checked={allocationMethod === "manual"} onChange={() => setAllocationMethod("manual")} /> Manual Allocation
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                      <input type="radio" name="alloc" checked={allocationMethod === "workload"} onChange={() => setAllocationMethod("workload")} /> Auto Allocate by Workload
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                      <input type="radio" name="alloc" checked={allocationMethod === "expertise"} onChange={() => setAllocationMethod("expertise")} /> Auto Allocate by Company Expertise
                    </label>
                  </div>
                </div> */}

                {/* Stepper Count */}
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#374151", marginBottom: "4px" }}>Cases to Allocate</label>
                  <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "4px", width: "fit-content", padding: "2px" }}>
                    <button onClick={() => setCasesToAllocate(Math.max(1, casesToAllocate - 1))} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>-</button>
                    <span style={{ width: "28px", textAlign: "center", fontSize: "11px", fontWeight: 700 }}>{casesToAllocate}</span>
                    <button onClick={() => setCasesToAllocate(casesToAllocate + 1)} style={{ border: "none", background: "none", width: "24px", height: "24px", fontWeight: 700, cursor: "pointer" }}>+</button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button onClick={() => setShowAssignModal(false)} style={{ flex: 1, border: "1px solid #cbd5e1", background: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                  <button style={{ flex: 1, border: "none", background: "#2563eb", color: "#fff", padding: "7px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>Allocate Cases</button>
                </div>

              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../css/style.css";

export default function EmploymentUserProfile() {
  const navigate = useNavigate();

  // Back button handler
  const handleBackToCases = () => {
    navigate("/EmploymentCheck");
  };

  const previousEmployers = [
    {
      id: 1,
      company: "XYZ Ltd.",
      hrEmail: "hr@xyz.com",
      hrPhone: "+91 91234 56789",
      empId: "XYZ9876",
      doj: "15-Jun-2021",
      doe: "31-Dec-2022",
      designation: "Associate Developer",
      docs: [
        { label: "Offer Letter", file: "offer_xyz.pdf" },
        { label: "Appointment Letter", file: "appointment_xyz.pdf" },
        { label: "Relieving Letter", file: "relieving_xyz.pdf" },
        { label: "Experience Letter", file: "experience_xyz.pdf" },
      ],
    },
    {
      id: 2,
      company: "PQR Ltd.",
      hrEmail: "hr@pqr.com",
      hrPhone: "+91 99887 66554",
      empId: "PQR5566",
      doj: "10-Jan-2020",
      doe: "14-Jun-2021",
      designation: "Junior Developer",
      docs: [
        { label: "Offer Letter", file: "offer_pqr.pdf" },
        { label: "Appointment Letter", file: "appointment_pqr.pdf" },
        { label: "Relieving Letter", file: "relieving_pqr.pdf" },
        { label: "Experience Letter", file: "experience_pqr.pdf" },
      ],
    },
    {
      id: 3,
      company: "LMN Pvt. Ltd.",
      hrEmail: "hr@lmn.com",
      hrPhone: "+91 88776 55443",
      empId: "LMN3344",
      doj: "01-Mar-2018",
      doe: "09-Jan-2020",
      designation: "Trainee Developer",
      docs: [
        { label: "Offer Letter", file: "offer_lmn.pdf" },
        { label: "Appointment Letter", file: "appointment_lmn.pdf" },
        { label: "Relieving Letter", file: "relieving_lmn.pdf" },
        { label: "Experience Letter", file: "experience_lmn.pdf" },
      ],
    },
    {
      id: 4,
      company: "RST Solutions",
      hrEmail: "hr@rst.com",
      hrPhone: "+91 77665 44332",
      empId: "RST1122",
      doj: "01-Aug-2016",
      doe: "28-Feb-2018",
      designation: "Intern",
      docs: [
        { label: "Offer Letter", file: "offer_rst.pdf" },
        { label: "Appointment Letter", file: "appointment_rst.pdf" },
        { label: "Relieving Letter", file: "relieving_rst.pdf" },
        { label: "Experience Letter", file: "experience_rst.pdf" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar Component */}
      <div id="sidebar">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div id="content" style={{ display: "flex", flexDirection: "column", minWidth: 0, width: "calc(100% - 270px)" }}>
        {/* Header Component */}
        <Header />

        <main style={{ padding: "20px 24px", flex: 1 }}>
          
          {/* Top Back Button */}
          <button
            onClick={handleBackToCases}
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
              padding: "0",
              marginBottom: "8px",
            }}
          >
            ‹ Back to All Cases
          </button>

          {/* Title Banner & Global Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Employment Verification – Candidate Details
              </h1>
              <span style={{ background: "#faf5ff", color: "#9333ea", border: "1px solid #e9d5ff", fontSize: "11px", fontWeight: "600", padding: "2px 10px", borderRadius: "12px" }}>
                Awaiting Response
              </span>
            </div>
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ border: "1px solid #cbd5e1", background: "#fff", color: "#334155", padding: "7px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                View History
              </button>
              <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "7px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                ✈ Send for Verification
              </button>
            </div>
          </div>

          {/* SECTION 1: CANDIDATE PROFILE HEADER CARD */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px 20px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.2fr 1fr 1.2fr 1.2fr 1fr", gap: "16px", alignItems: "center" }}>
              
              {/* User Avatar + Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700" }}>
                  👤
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Rahul Verma</h3>
                  <span style={{ fontSize: "11px", color: "#2563eb", fontWeight: "600", display: "block", marginTop: "1px" }}>Candidate ID: CAN-10245</span>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Client: ABC Technologies</span>
                  <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Verifier: Amit Kumar</span>
                </div>
              </div>

              {/* Current Employer */}
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", fontWeight: "500" }}>Current Employer</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>ABC Technologies</strong>
              </div>

              {/* Employment Type */}
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", fontWeight: "500" }}>Employment Type</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>Full Time</strong>
              </div>

              {/* Overall Status */}
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", fontWeight: "500", marginBottom: "3px" }}>Overall Status</span>
                <span style={{ background: "#fff7ed", color: "#ea580c", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px", border: "1px solid #ffedd5" }}>
                  Awaiting Response
                </span>
              </div>

              {/* Request Status */}
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", fontWeight: "500", marginBottom: "3px" }}>Request Status</span>
                <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px", border: "1px solid #dbeafe" }}>
                  Sent to Employer
                </span>
              </div>

              {/* TAT */}
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", display: "block", fontWeight: "500" }}>TAT</span>
                <strong style={{ fontSize: "12px", color: "#0f172a" }}>3 Days</strong>
              </div>

            </div>
          </div>

          {/* SECTION 2: CURRENT EMPLOYER CARD */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px 20px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#2563eb", fontSize: "16px" }}>🏢</span>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Current Employer</h2>
              </div>
              <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                ✈ Send for Verification
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 2fr", gap: "20px" }}>
              {/* Employer Contact Details */}
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", rowGap: "8px", fontSize: "11px" }}>
                <span style={{ color: "#64748b" }}>Company Name</span>
                <strong style={{ color: "#0f172a" }}>ABC Technologies</strong>

                <span style={{ color: "#64748b" }}>HR Email ID</span>
                <span style={{ color: "#2563eb" }}>hr@abctech.com</span>

                <span style={{ color: "#64748b" }}>HR Phone Number</span>
                <span style={{ color: "#0f172a" }}>+91 98765 43210</span>

                <span style={{ color: "#64748b" }}>Employee ID</span>
                <span style={{ color: "#0f172a" }}>EMP12345</span>
              </div>

              {/* Tenure Details */}
              <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", rowGap: "8px", fontSize: "11px" }}>
                <span style={{ color: "#64748b" }}>Date of Joining (DOJ)</span>
                <strong style={{ color: "#0f172a" }}>01-Jan-2023</strong>

                <span style={{ color: "#64748b" }}>Date of Exit (DOE)</span>
                <span style={{ color: "#0f172a" }}>-</span>

                <span style={{ color: "#64748b" }}>Designation</span>
                <strong style={{ color: "#0f172a" }}>Software Engineer</strong>
              </div>

              {/* Documents Box */}
              <div>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "8px" }}>Documents</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: "#dc2626", fontSize: "14px" }}>📄</span>
                      <div>
                        <span style={{ fontSize: "9px", color: "#64748b", display: "block" }}>Offer Letter</span>
                        <span style={{ fontSize: "10px", fontWeight: "600", color: "#0f172a" }}>offer_rahul.pdf</span>
                      </div>
                    </div>
                    <span style={{ color: "#2563eb", cursor: "pointer", fontSize: "11px" }}>📥</span>
                  </div>

                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: "#dc2626", fontSize: "14px" }}>📄</span>
                      <div>
                        <span style={{ fontSize: "9px", color: "#64748b", display: "block" }}>Appointment Letter</span>
                        <span style={{ fontSize: "10px", fontWeight: "600", color: "#0f172a" }}>appointment_rahul.pdf</span>
                      </div>
                    </div>
                    <span style={{ color: "#2563eb", cursor: "pointer", fontSize: "11px" }}>📥</span>
                  </div>

                  <div style={{ border: "1px dashed #cbd5e1", borderRadius: "6px", padding: "8px", background: "#f8fafc" }}>
                    <span style={{ fontSize: "9px", color: "#94a3b8", display: "block" }}>Relieving Letter</span>
                    <span style={{ fontSize: "10px", color: "#cbd5e1" }}>-</span>
                  </div>

                  <div style={{ border: "1px dashed #cbd5e1", borderRadius: "6px", padding: "8px", background: "#f8fafc" }}>
                    <span style={{ fontSize: "9px", color: "#94a3b8", display: "block" }}>Experience Letter</span>
                    <span style={{ fontSize: "10px", color: "#cbd5e1" }}>-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: LAST 4 EMPLOYERS CARD LIST */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px 20px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#2563eb", fontSize: "16px" }}>🏢</span>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Last 4 Employers</h2>
              </div>
              <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                ✈ Send for Verification (All)
              </button>
            </div>

            {/* List of Previous Employers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {previousEmployers.map((emp) => (
                <div key={emp.id} style={{ border: "1px solid #f1f5f9", borderRadius: "6px", padding: "14px", background: "#ffffff" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "30px 1fr 1fr 2fr 100px", gap: "16px", alignItems: "center" }}>
                    
                    {/* Index */}
                    <span style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{emp.id}</span>

                    {/* Company info */}
                    <div style={{ display: "grid", gridTemplateColumns: "85px 1fr", rowGap: "4px", fontSize: "10px" }}>
                      <span style={{ color: "#64748b" }}>Company Name</span>
                      <strong style={{ color: "#0f172a" }}>{emp.company}</strong>

                      <span style={{ color: "#64748b" }}>HR Email ID</span>
                      <span style={{ color: "#2563eb" }}>{emp.hrEmail}</span>
                    </div>

                    {/* Phone & Tenure */}
                    <div style={{ display: "grid", gridTemplateColumns: "85px 1fr", rowGap: "4px", fontSize: "10px" }}>
                      <span style={{ color: "#64748b" }}>HR Phone Number</span>
                      <span style={{ color: "#0f172a" }}>{emp.hrPhone}</span>

                      <span style={{ color: "#64748b" }}>DOJ</span>
                      <span style={{ color: "#0f172a" }}>{emp.doj}</span>

                      <span style={{ color: "#64748b" }}>DOE</span>
                      <span style={{ color: "#0f172a" }}>{emp.doe}</span>

                      <span style={{ color: "#64748b" }}>Designation</span>
                      <strong style={{ color: "#0f172a" }}>{emp.designation}</strong>
                    </div>

                    {/* Documents List Grid */}
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>Documents</span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        {emp.docs.map((doc, dIdx) => (
                          <div key={dIdx} style={{ border: "1px solid #e2e8f0", borderRadius: "4px", padding: "4px 8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span style={{ color: "#dc2626", fontSize: "10px" }}>📄</span>
                              <div>
                                <span style={{ fontSize: "8px", color: "#64748b", display: "block" }}>{doc.label}</span>
                                <span style={{ fontSize: "9px", fontWeight: "600", color: "#0f172a" }}>{doc.file}</span>
                              </div>
                            </div>
                            <span style={{ color: "#2563eb", cursor: "pointer", fontSize: "9px" }}>📥</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Send Button for Single Item */}
                    <div style={{ textAlign: "right" }}>
                      <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "6px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: "600", cursor: "pointer", width: "100%" }}>
                        Send for Verification
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info Note Banner */}
          <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "6px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", color: "#1e40af", fontSize: "11px" }}>
            <span>ℹ️</span>
            <span>Once sent, the employment details and documents will be shared with the respective HR for verification.</span>
          </div>

        </main>
      </div>
    </div>
  );
}
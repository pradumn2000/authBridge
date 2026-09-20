// import Sidebar from "./Sidebar";
// import Header from "./Header";

// // TODO: replace with GET /api/clients/:id/invoices
// const MOCK_INVOICES = [
//   { id: "INV-1042", period: "May 2026", checks: 38, amount: 13860, status: "Paid", dueDate: "2026-06-05" },
//   { id: "INV-1051", period: "Jun 2026", checks: 21, amount: 7980,  status: "Due",  dueDate: "2026-07-05" },
// ];

// export default function ClientBilling() {
//   const totalDue = MOCK_INVOICES
//     .filter((i) => i.status === "Due")
//     .reduce((sum, i) => sum + i.amount, 0);

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">
//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total"><h4>{MOCK_INVOICES.length}</h4><p>Invoices</p></div>
//               <div className="card-inner-dash bdr-progress"><h4>₹{totalDue.toLocaleString()}</h4><p>Amount Due</p></div>
//               <div className="card-inner-dash bdr-com"><h4>{MOCK_INVOICES.filter(i => i.status === "Paid").length}</h4><p>Paid</p></div>
//             </div>

//             <div className="down-table" style={{ marginTop: "20px" }}>
//               <div style={{ background: "var(--primary-color)", padding: "12px 16px", borderRadius: "10px 10px 0 0" }}>
//                 <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>BILLING & INVOICES</h3>
//               </div>
//               <table>
//                 <thead>
//                   <tr><th>Invoice</th><th>Period</th><th>Checks</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
//                 </thead>
//                 <tbody>
//                   {MOCK_INVOICES.map((inv) => (
//                     <tr key={inv.id}>
//                       <td style={{ fontWeight: 600 }}>{inv.id}</td>
//                       <td>{inv.period}</td>
//                       <td>{inv.checks}</td>
//                       <td>₹{inv.amount.toLocaleString()}</td>
//                       <td>{inv.dueDate}</td>
//                       <td>
//                         <span className={`status ${inv.status === "Paid" ? "completed" : "in-progress"}`}
//                           style={{ width: "auto", padding: "4px 10px", fontSize: "11px" }}>
//                           {inv.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );'
// }
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Mock Data matching the UI design
const MOCK_SUMMARY = {
  walletBalance: 28450,
  totalCases: 48,
  amountUsed: 21550,
  pendingPayment: 8760,
  lastRecharge: "12 Sep 2025",
  lastRechargeAmount: 50000,
  autoRechargeThreshold: 5000,
  billingMode: "Prepaid — Client",
  billingModeDesc: "You will be billed in advance through your wallet.",
};

const MOCK_RATE_CARD = [
  { label: "Employment", rate: 1200 },
  { label: "Criminal", rate: 1500 },
  { label: "Education", rate: 1000 },
  { label: "Global Check", rate: 2000 },
  { label: "Identity", rate: 800 },
  { label: "Drug Verification", rate: 1800 },
  { label: "Address", rate: 700 },
  { label: "Other Checks", rate: 900 },
];

const MOCK_TRANSACTIONS = [
  { date: "19 Sep 2025 10:24 AM", id: "TXN-00876", desc: "Wallet Recharge", type: "-", cases: "-", amount: "+50,000", balance: "28,450", status: "Success", positive: true },
  { date: "18 Sep 2025 04:15 PM", id: "TXN-00875", desc: "Case Charge - Employment", type: "Employment", cases: 3, amount: "-3,600", balance: "-21,550", status: "Success", positive: false },
  { date: "17 Sep 2025 11:32 AM", id: "TXN-00874", desc: "Case Charge - Education", type: "Education", cases: 2, amount: "-2,000", balance: "-17,950", status: "Success", positive: false },
  { date: "16 Sep 2025 03:27 PM", id: "TXN-00873", desc: "Case Charge - Identity", type: "Identity", cases: 1, amount: "-800", balance: "-15,950", status: "Success", positive: false },
  { date: "14 Sep 2025 12:18 PM", id: "TXN-00872", desc: "Case Charge - Address", type: "Address", cases: 1, amount: "-700", balance: "-15,150", status: "Success", positive: false },
];

const MOCK_INVOICE = {
  no: "INV-2025-09-001",
  period: "01 Sep 2025 – 30 Sep 2025",
  checks: 42,
  amount: 21550,
  gst: 3879,
  total: 25429,
  paid: 16669,
  due: 8760,
};

const MOCK_CASE_CHARGES = [
  { name: "Rahul Sharma / C-1001", checks: "Employment, Education, Identity", rate: 3000, gst: 540, total: 3540 },
  { name: "Priya Verma / C-1002", checks: "Address, Criminal", rate: 2200, gst: 396, total: 2596 },
  { name: "Amit Kumar / C-1003", checks: "Education, Global Check", rate: 3000, gst: 540, total: 3540 },
  { name: "Neha Singh / C-1004", checks: "Identity, Drug Verification", rate: 3600, gst: 648, total: 4248 },
];

export default function ClientBilling() {
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main className="cb-main-container">
          {/* Top Title & Subtitle */}
          <div className="cb-page-header">
            <h2>Billing</h2>
            <p>Manage your wallet, payments and invoices</p>
          </div>

          {/* Top 4 Summary Cards */}
          <div className="cb-summary-grid">
            <div className="cb-summary-card">
              <div className="cb-card-icon green-bg">👛</div>
              <div>
                <span className="cb-summary-title">Wallet Balance</span>
                <div className="cb-summary-value">₹{MOCK_SUMMARY.walletBalance.toLocaleString()}</div>
                <span className="cb-summary-sub">Available balance in your wallet</span>
              </div>
            </div>

            <div className="cb-summary-card">
              <div className="cb-card-icon blue-bg">👤</div>
              <div>
                <span className="cb-summary-title">Total Cases</span>
                <div className="cb-summary-value">{MOCK_SUMMARY.totalCases}</div>
                <span className="cb-summary-sub">Cases created till date</span>
              </div>
            </div>

            <div className="cb-summary-card">
              <div className="cb-card-icon orange-bg">₹</div>
              <div>
                <span className="cb-summary-title">Amount Used</span>
                <div className="cb-summary-value">₹{MOCK_SUMMARY.amountUsed.toLocaleString()}</div>
                <span className="cb-summary-sub">Total amount deducted</span>
              </div>
            </div>

            <div className="cb-summary-card">
              <div className="cb-card-icon red-bg">🕒</div>
              <div>
                <span className="cb-summary-title">Pending Payment</span>
                <div className="cb-summary-value">₹{MOCK_SUMMARY.pendingPayment.toLocaleString()}</div>
                <span className="cb-summary-sub">Outstanding amount</span>
              </div>
            </div>
          </div>

          {/* Section 1: Wallet Details + Billing Mode + Rate Card */}
          <div className="cb-row-grid three-col">
            {/* Wallet Details */}
            <div className="cb-panel">
              <div className="cb-panel-header">
                <h3>👛 Wallet Details</h3>
              </div>
              <div className="cb-wallet-info">
                <div className="cb-wallet-amounts">
                  <div>
                    <span className="cb-label">Current Wallet Balance</span>
                    <p className="cb-bold-amount">₹{MOCK_SUMMARY.walletBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="cb-label">Available Credit / Balance</span>
                    <p className="cb-bold-amount">₹{MOCK_SUMMARY.walletBalance.toLocaleString()}</p>
                  </div>
                  <button className="cb-btn-primary" onClick={() => setRechargeModalOpen(true)}>
                    + Add Money / Recharge Wallet
                  </button>
                </div>
                <hr className="cb-divider" />
                <div className="cb-wallet-meta">
                  <div>
                    <span className="cb-label">🗓️ Last Recharge</span>
                    <p className="cb-sm-text">{MOCK_SUMMARY.lastRecharge} &nbsp; ₹{MOCK_SUMMARY.lastRechargeAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="cb-label">🔄 Auto-Recharge</span>
                    <p className="cb-status-text">
                      <span className="cb-badge-green">Enabled</span>
                      <small>(When balance falls below ₹{MOCK_SUMMARY.autoRechargeThreshold.toLocaleString()})</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Mode */}
            <div className="cb-panel">
              <div className="cb-panel-header">
                <h3>📄 Billing Mode</h3>
              </div>
              <div className="cb-mode-content">
                <h4 className="cb-mode-title">{MOCK_SUMMARY.billingMode}</h4>
                <p className="cb-mode-desc">{MOCK_SUMMARY.billingModeDesc}</p>
              </div>
            </div>

            {/* Rate Card */}
            <div className="cb-panel">
              <div className="cb-panel-header">
                <h3>🛡️ Rate Card <small>(Per Check)</small></h3>
              </div>
              <div className="cb-rate-grid">
                {MOCK_RATE_CARD.map((item) => (
                  <div key={item.label} className="cb-rate-item">
                    <span>{item.label}</span>
                    <strong>₹{item.rate.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Ledger & Side Menu */}
          <div className="cb-row-grid main-with-sidebar">
            <div className="cb-main-column">
              {/* Wallet Ledger / Transaction History */}
              <div className="cb-panel">
                <div className="cb-panel-header space-between">
                  <h3>📜 Wallet Ledger / Transaction History</h3>
                  <button className="cb-btn-outline">👁️ View All Transactions</button>
                </div>
                <div className="cb-table-wrapper">
                  <table className="cb-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Description</th>
                        <th>Check Type</th>
                        <th>Cases</th>
                        <th>Amount (₹)</th>
                        <th>Balance (₹)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_TRANSACTIONS.map((txn) => (
                        <tr key={txn.id}>
                          <td>{txn.date}</td>
                          <td className="cb-font-mono">{txn.id}</td>
                          <td>{txn.desc}</td>
                          <td>{txn.type}</td>
                          <td>{txn.cases}</td>
                          <td className={txn.positive ? "cb-text-green" : "cb-text-red"}>{txn.amount}</td>
                          <td>{txn.balance}</td>
                          <td><span className="cb-badge-pill">{txn.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Latest Invoice */}
              <div className="cb-panel">
                <div className="cb-panel-header">
                  <h3>🧾 Latest Invoice</h3>
                </div>
                <div className="cb-table-wrapper">
                  <table className="cb-table">
                    <thead>
                      <tr>
                        <th>Invoice No.</th>
                        <th>Billing Period</th>
                        <th>Total Checks</th>
                        <th>Amount (₹)</th>
                        <th>GST (₹)</th>
                        <th>Total (₹)</th>
                        <th>Paid / Due</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="cb-font-mono">{MOCK_INVOICE.no}</td>
                        <td>{MOCK_INVOICE.period}</td>
                        <td>{MOCK_INVOICE.checks}</td>
                        <td>₹{MOCK_INVOICE.amount.toLocaleString()}</td>
                        <td>₹{MOCK_INVOICE.gst.toLocaleString()}</td>
                        <td>₹{MOCK_INVOICE.total.toLocaleString()}</td>
                        <td>
                          <span className="cb-text-green">₹{MOCK_INVOICE.paid.toLocaleString()}</span> /{" "}
                          <span className="cb-text-red">₹{MOCK_INVOICE.due.toLocaleString()}</span>
                        </td>
                        <td>
                          <button className="cb-btn-sm-outline">📥 Download Invoice</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Case-wise Charges */}
              <div className="cb-panel">
                <div className="cb-panel-header space-between">
                  <h3>📋 Case-wise Charges</h3>
                  <span className="cb-chevron-icon">▼</span>
                </div>
                <div className="cb-table-wrapper">
                  <table className="cb-table">
                    <thead>
                      <tr>
                        <th>Candidate / Case ID</th>
                        <th>Checks Performed</th>
                        <th>Rate (₹)</th>
                        <th>GST (₹)</th>
                        <th>Total (₹)</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_CASE_CHARGES.map((c, i) => (
                        <tr key={i}>
                          <td className="cb-font-semibold">{c.name}</td>
                          <td>{c.checks}</td>
                          <td>{c.rate.toLocaleString()}</td>
                          <td>{c.gst}</td>
                          <td>{c.total.toLocaleString()}</td>
                          <td className="cb-text-center">&gt;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <div className="cb-side-column">
              {/* Connected Wallet Banner */}
              <div className="cb-panel cb-green-card">
                <div className="cb-green-card-title">
                  <span className="cb-check-circle">✓</span>
                  <h4>Connected to Admin Wallet</h4>
                </div>
                <p>
                  Your client wallet is managed by the Satyapan Admin Portal. Admin controls wallet credit, rates, invoices and adjustments.
                </p>
                <div className="cb-green-tags">
                  <span>● Secure</span>
                  <span>● Transparent</span>
                  <span>● Managed</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="cb-panel">
                <div className="cb-panel-header">
                  <h3>⚡ Quick Actions</h3>
                </div>
                <div className="cb-quick-actions">
                  <button className="cb-btn-full-green" onClick={() => setRechargeModalOpen(true)}>
                    👛 Recharge Wallet
                  </button>
                  <button className="cb-btn-full-outline">📥 Download Invoice</button>
                  <button className="cb-btn-full-outline">📊 View Transactions</button>
                  <button className="cb-btn-full-outline">💳 Request Credit</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Basic Recharge Modal */}
      {rechargeModalOpen && (
        <div className="cb-modal-overlay" onClick={() => setRechargeModalOpen(false)}>
          <div className="cb-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Recharge Wallet</h3>
            <p>Enter the amount to add to your wallet balance.</p>
            <input type="number" placeholder="Enter Amount (₹)" className="cb-input-field" defaultValue="5000" />
            <div className="cb-modal-actions">
              <button className="cb-btn-outline" onClick={() => setRechargeModalOpen(false)}>Cancel</button>
              <button className="cb-btn-primary" onClick={() => setRechargeModalOpen(false)}>Proceed to Pay</button>
            </div>
          </div>
        </div>
      )}

      <style>{styles}</style>
    </>
  );
}

const styles = `
  .cb-main-container { padding: 24px; background: #f4f7fc; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #334155; }
  .cb-page-header { margin-bottom: 20px; }
  .cb-page-header h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0; }
  .cb-page-header p { font-size: 0.875rem; color: #64748b; margin-top: 2px; }

  /* Summary Grid */
  .cb-summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
  .cb-summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; display: flex; align-items: flex-start; gap: 14px; }
  .cb-card-icon { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .green-bg { background: #e6f4ea; color: #137333; }
  .blue-bg { background: #e8f0fe; color: #1a73e8; }
  .orange-bg { background: #fef7e0; color: #b06000; }
  .red-bg { background: #fce8e6; color: #c5221f; }
  .cb-summary-title { font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
  .cb-summary-value { font-size: 1.35rem; font-weight: 800; color: #0f172a; margin: 2px 0; }
  .cb-summary-sub { font-size: 0.7rem; color: #94a3b8; }

  /* Generic Panels */
  .cb-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 16px; }
  .cb-panel-header { margin-bottom: 14px; }
  .cb-panel-header.space-between { display: flex; justify-content: space-between; align-items: center; }
  .cb-panel-header h3 { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 6px; }
  .cb-panel-header h3 small { font-size: 0.75rem; color: #64748b; font-weight: normal; }

  /* Layout Grids */
  .cb-row-grid { display: grid; gap: 16px; }
  .cb-row-grid.three-col { grid-template-columns: 2fr 1fr 1.5fr; }
  .cb-row-grid.main-with-sidebar { grid-template-columns: 1fr 300px; }

  /* Wallet Details Card */
  .cb-wallet-amounts { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .cb-label { font-size: 0.75rem; color: #64748b; font-weight: 500; }
  .cb-bold-amount { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-top: 2px; }
  .cb-divider { border: 0; border-top: 1px solid #f1f5f9; margin: 14px 0; }
  .cb-wallet-meta { display: flex; gap: 40px; }
  .cb-sm-text { font-size: 0.8rem; font-weight: 600; color: #334155; margin-top: 2px; }
  .cb-badge-green { background: #dcfce7; color: #166534; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; margin-right: 6px; }
  .cb-status-text { font-size: 0.8rem; color: #64748b; margin-top: 2px; display: flex; align-items: center; }

  /* Billing Mode Card */
  .cb-mode-content { background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px dashed #cbd5e1; }
  .cb-mode-title { font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin: 0 0 6px 0; }
  .cb-mode-desc { font-size: 0.75rem; color: #64748b; line-height: 1.4; margin: 0; }

  /* Rate Card Grid */
  .cb-rate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; font-size: 0.78rem; }
  .cb-rate-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  .cb-rate-item span { color: #475569; }
  .cb-rate-item strong { color: #0f172a; }

  /* Tables */
  .cb-table-wrapper { overflow-x: auto; }
  .cb-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left; }
  .cb-table th { background: #f8fafc; color: #64748b; font-weight: 600; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
  .cb-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #334155; white-space: nowrap; }
  .cb-font-mono { font-family: monospace; font-size: 0.8rem; }
  .cb-font-semibold { font-weight: 600; }
  .cb-text-green { color: #16a34a; font-weight: 600; }
  .cb-text-red { color: #dc2626; font-weight: 600; }
  .cb-badge-pill { background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: 600; }

  /* Buttons */
  .cb-btn-primary { background: #00a86b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .cb-btn-primary:hover { background: #008f5a; }
  .cb-btn-outline { background: #fff; border: 1px solid #cbd5e1; color: #334155; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
  .cb-btn-sm-outline { background: #fff; border: 1px solid #cbd5e1; color: #1e293b; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; cursor: pointer; }
  .cb-btn-full-green { width: 100%; background: #00a86b; color: #fff; border: none; padding: 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; margin-bottom: 8px; text-align: left; }
  .cb-btn-full-outline { width: 100%; background: #fff; border: 1px solid #e2e8f0; color: #334155; padding: 9px; border-radius: 6px; font-size: 0.78rem; font-weight: 500; cursor: pointer; margin-bottom: 8px; text-align: left; transition: background 0.15s; }
  .cb-btn-full-outline:hover { background: #f8fafc; }

  /* Right Side Connected Wallet Box */
  .cb-green-card { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .cb-green-card-title { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .cb-check-circle { width: 20px; height: 20px; background: #16a34a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; }
  .cb-green-card h4 { margin: 0; font-size: 0.85rem; color: #14532d; font-weight: 700; }
  .cb-green-card p { font-size: 0.75rem; color: #166534; line-height: 1.4; margin: 0 0 12px 0; }
  .cb-green-tags { display: flex; gap: 12px; font-size: 0.7rem; color: #15803d; font-weight: 600; }

  /* Modal */
  .cb-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .cb-modal-box { background: #fff; padding: 24px; border-radius: 10px; width: 360px; }
  .cb-modal-box h3 { margin: 0 0 6px 0; font-size: 1.1rem; }
  .cb-modal-box p { margin: 0 0 16px 0; font-size: 0.8rem; color: #64748b; }
  .cb-input-field { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; margin-bottom: 16px; box-sizing: border-box; }
  .cb-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .cb-summary-grid { grid-template-columns: 1fr 1fr; }
    .cb-row-grid.three-col { grid-template-columns: 1fr; }
    .cb-row-grid.main-with-sidebar { grid-template-columns: 1fr; }
  }
`;
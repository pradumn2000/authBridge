// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";

// export default function AllClients() {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");
//   const [search, setSearch]   = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     fetch(`${API_URL}/api/clients`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//     })
//       .then(r => r.json())
//       .then(data => setClients(data.clients || []))
//       .catch(() => setError("Failed to load clients."))
//       .finally(() => setLoading(false));
//   }, []);

//   // ── Filter ─────────────────────────────────────────────────
//   const filtered = clients.filter(c => {
//     if (!search) return true;
//     const q = search.toLowerCase();
//     return (
//       (c.company_name || "").toLowerCase().includes(q) ||
//       (c.name || "").toLowerCase().includes(q) ||
//       (c.contact_email || c.email || "").toLowerCase().includes(q) ||
//       (c.gstin || "").toLowerCase().includes(q)
//     );
//   });

//   // ── Action buttons — same handoff pattern as AllCases.jsx:
//   // View opens a read-only detail view, Edit hands off to AddClient.jsx.
//   // NOTE: AddClient.jsx needs to support loading/editing via editClientId
//   // for the Edit button to actually work — same pattern as AddCase's
//   // editCaseId. Flag if it doesn't yet.
//   const ViewButton = ({ c }) => (
//     <button
//       className="view-cta"
//       onClick={() => navigate(`/AddClient?editClientId=${encodeURIComponent(c.id)}&mode=view`)}
//     >
//       View
//     </button>
//   );

//   const EditButton = ({ c }) => (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         navigate(`/AddClient?editClientId=${encodeURIComponent(c.id)}`);
//       }}
//       style={{
//         background: "#fff", color: "#27348B", border: "1px solid #27348B",
//         padding: "6px 14px", borderRadius: "6px", fontSize: "13px",
//         fontWeight: 700, cursor: "pointer",
//       }}
//     >
//       Edit
//     </button>
//   );

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* ── Top bar ── */}
//             <div className="dash-upper-head">
//               <div className="left">
//                 <h3 className="dash-title-text">All Clients</h3>
//                 <span style={{ fontSize: "12px", color: "#64748b", background: "#eef3ff", padding: "3px 10px", borderRadius: "20px", marginLeft: "10px" }}>
//                   {filtered.length} of {clients.length}
//                 </span>
//               </div>
//               <div className="right">
//                 <button className="primary-cta export">
//                   <img src="images/dashboard/export-icon.svg" alt="" /> Export CSV
//                 </button>
//               </div>
//             </div>

//             {/* ── Search + Add Client ── */}
//             <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//               <input
//                 type="text"
//                 placeholder="Search company, contact name, email or GSTIN..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 style={{
//                   flex: 1, padding: "10px 16px", borderRadius: "10px",
//                   border: "1px solid #ddd", fontSize: "14px", outline: "none"
//                 }}
//               />
//               <button className="primary-cta" onClick={() => navigate("/AddClient")}>
//                 + Add Client
//               </button>
//             </div>

//             {/* ── Error ── */}
//             {error && (
//               <div style={{ padding: "12px 16px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "14px" }}>
//                 {error}
//               </div>
//             )}

//             {/* ── Table ── */}
//             <div className="down-table">
//               {loading ? (
//                 <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading clients...</p>
//               ) : (
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Company</th>
//                       <th>Contact Person</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>GSTIN</th>
//                       <th>Added</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filtered.length === 0 ? (
//                       <tr>
//                         <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "14px" }}>
//                           {clients.length === 0 ? (
//                             <>No clients yet. <button onClick={() => navigate("/AddClient")} style={{ color: "#2b3b8c", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Add your first client →</button></>
//                           ) : (
//                             "No clients match your search."
//                           )}
//                         </td>
//                       </tr>
//                     ) : (
//                       filtered.map(row => (
//                         <tr key={row.id}>
//                           <td style={{ fontWeight: 700, color: "#2b3b8c" }}>{row.company_name || "—"}</td>
//                           <td>{row.name || row.primary_contact || "—"}</td>
//                           <td style={{ fontSize: "13px" }}>{row.contact_email || row.email || "—"}</td>
//                           <td style={{ fontSize: "13px" }}>{row.contact_phone || row.phone || "—"}</td>
//                           <td style={{ fontSize: "12px", color: "#475569" }}>{row.gstin || "—"}</td>
//                           <td style={{ fontSize: "12px", color: "#94a3b8" }}>
//                             {row.created_at ? new Date(row.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
//                           </td>
//                           <td>
//                             <div style={{ display: "flex", gap: "8px" }}>
//                               <ViewButton c={row} />
//                               <EditButton c={row} />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {!loading && (
//                 <div style={{ padding: "10px 16px", fontSize: "12px", color: "#9ca3af", borderTop: "1px solid #f1f5f9" }}>
//                   Showing {filtered.length} of {clients.length} clients
//                 </div>
//               )}
//             </div>

//           </div>
//         </main>
//       </section>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

export default function AllClients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");

  // ── Cases — fetched alongside clients purely so we can aggregate
  // per-client TAT/billing totals for the table below. Non-critical: if
  // this fetch fails the client list still works, it just shows "—" for
  // the aggregate columns.
  const [cases, setCases] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/clients`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    })
      .then(r => r.json())
      .then(data => setClients(data.clients || []))
      .catch(() => setError("Failed to load clients."))
      .finally(() => setLoading(false));
  }, []);

  // ── Fetch cases so we can compute per-client Cases / Total Billed / Avg TAT
  useEffect(() => {
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    })
      .then(r => r.json())
      .then(data => setCases(data.cases || []))
      .catch(() => {}); // aggregate columns just show "—" if this fails
  }, []);

  // ── Aggregates a client's cases: how many, total billed amount, and
  // average TAT across their cases. Reads overall_tat first (what
  // AddCase.jsx actually saves), falling back to tat for legacy records.
  const clientStatsFor = (clientId) => {
    const clientCases = cases.filter(c => String(c.client_id) === String(clientId));
    const totalAmount = clientCases.reduce((s, c) => s + (Number(c.total_amount) || 0), 0);
    const tats = clientCases
      .map(c => Number(c.overall_tat ?? c.tat) || 0)
      .filter(t => t > 0);
    const avgTat = tats.length > 0
      ? Math.round(tats.reduce((s, t) => s + t, 0) / tats.length)
      : 0;
    return { caseCount: clientCases.length, totalAmount, avgTat };
  };

  // ── Filter ─────────────────────────────────────────────────
  const filtered = clients.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (c.company_name || "").toLowerCase().includes(q) ||
      (c.name || "").toLowerCase().includes(q) ||
      (c.contact_email || c.email || "").toLowerCase().includes(q) ||
      (c.gstin || "").toLowerCase().includes(q)
    );
  });

  // ── Action buttons — same handoff pattern as AllCases.jsx:
  // View opens a read-only detail view, Edit hands off to AddClient.jsx.
  // NOTE: AddClient.jsx needs to support loading/editing via editClientId
  // for the Edit button to actually work — same pattern as AddCase's
  // editCaseId. Flag if it doesn't yet.
  const ViewButton = ({ c }) => (
    <button
      className="view-cta"
      onClick={() => navigate(`/AddClient?editClientId=${encodeURIComponent(c.id)}&mode=view`)}
    >
      View
    </button>
  );

  const EditButton = ({ c }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/AddClient?editClientId=${encodeURIComponent(c.id)}`);
      }}
      style={{
        background: "#fff", color: "#27348B", border: "1px solid #27348B",
        padding: "6px 14px", borderRadius: "6px", fontSize: "13px",
        fontWeight: 700, cursor: "pointer",
      }}
    >
      Edit
    </button>
  );

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            {/* ── Top bar ── */}
            <div className="dash-upper-head">
              <div className="left">
                <h3 className="dash-title-text">All Clients</h3> <br></br>
                <span style={{ fontSize: "14px", color: "#606060", fontWeight: "500", padding: "3px 10px", borderRadius: "20px", marginLeft: "10px" }}>
                  {filtered.length} of {clients.length}
                </span>
              </div>
              <div className="right">
                <button className="primary-cta export">
                  <img src="images/dashboard/export-icon.svg" alt="" /> Export CSV
                </button>
              </div>
            </div>

            {/* ── Search + Add Client ── */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search company, contact name, email or GSTIN..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: "10px",
                  border: "1px solid #ddd", fontSize: "14px", outline: "none"
                }}
              />
              <button className="primary-cta" onClick={() => navigate("/AddClient")}>
                + Add Client
              </button>
            </div>

            {/* ── Error ── */}
            {error && (
              <div style={{ padding: "12px 16px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "14px" }}>
                {error}
              </div>
            )}

            {/* ── Table ── */}
            <div className="down-table">
              {loading ? (
                <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading clients...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Contact Person</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>GSTIN</th>
                      <th>Cases</th>
                      <th>Total Billed</th>
                      <th>Avg TAT</th>
                      <th>Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={10} style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "14px" }}>
                          {clients.length === 0 ? (
                            <>No clients yet. <button onClick={() => navigate("/AddClient")} style={{ color: "#2b3b8c", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Add your first client →</button></>
                          ) : (
                            "No clients match your search."
                          )}
                        </td>
                      </tr>
                    ) : (
                      filtered.map(row => {
                        const stats = clientStatsFor(row.id);
                        return (
                        <tr key={row.id}>
                          <td style={{ fontWeight: 700, color: "#2b3b8c" }}>{row.company_name || "—"}</td>
                          <td>{row.name || row.primary_contact || "—"}</td>
                          <td style={{ fontSize: "13px" }}>{row.contact_email || row.email || "—"}</td>
                          <td style={{ fontSize: "13px" }}>{row.contact_phone || row.phone || "—"}</td>
                          <td style={{ fontSize: "12px", color: "#475569" }}>{row.gstin || "—"}</td>
                          <td style={{ textAlign: "center", color: "#64748b", fontSize: "13px" }}>{stats.caseCount}</td>
                          <td style={{ fontWeight: 700, color: "#2b3b8c", fontSize: "13px", whiteSpace: "nowrap" }}>
                            {stats.totalAmount > 0 ? `₹${stats.totalAmount.toLocaleString()}` : "—"}
                          </td>
                          <td style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
                            {stats.avgTat > 0 ? `${stats.avgTat} day${stats.avgTat > 1 ? "s" : ""}` : "—"}
                          </td>
                          <td style={{ fontSize: "12px", color: "#94a3b8" }}>
                            {row.created_at ? new Date(row.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <ViewButton c={row} />
                              <EditButton c={row} />
                            </div>
                          </td>
                        </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

              {!loading && (
                <div style={{ padding: "10px 16px", fontSize: "12px", color: "#9ca3af", borderTop: "1px solid #f1f5f9" }}>
                  Showing {filtered.length} of {clients.length} clients
                </div>
              )}
            </div>

          </div>
        </main>
      </section>
    </>
  );
}
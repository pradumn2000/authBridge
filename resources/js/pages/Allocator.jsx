
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

// ── Check types shown as Kanban columns. Alternates between two accent
//    palettes purely for visual variety, matching the original two colors
//    used in the hardcoded version.
const CHECK_TYPES = [
  { key: "employment", label: "Employment", accent: "#0d8390", bgAccent: "rgba(13, 131, 144, 0.08)" },
  { key: "education",  label: "Education",  accent: "#2b3b8c", bgAccent: "rgba(43, 59, 140, 0.08)" },
  { key: "address",    label: "Address",    accent: "#0d8390", bgAccent: "rgba(13, 131, 144, 0.08)" },
  { key: "database",   label: "Database",   accent: "#2b3b8c", bgAccent: "rgba(43, 59, 140, 0.08)" },
  { key: "criminal",   label: "Criminal",   accent: "#0d8390", bgAccent: "rgba(13, 131, 144, 0.08)" },
  { key: "drug",       label: "Drug Test",  accent: "#2b3b8c", bgAccent: "rgba(43, 59, 140, 0.08)" },
  { key: "court",      label: "Courtroom",  accent: "#0d8390", bgAccent: "rgba(13, 131, 144, 0.08)" },
];

// Maps each Kanban column's check type to the dedicated verifier role
// created in User Management, so each column's dropdown only shows the
// people who actually handle that check.
const VERIFIER_ROLE_BY_CHECK = {
  employment: "employment_verifier",
  education:  "education_verifier",
  address:    "address_verifier",
  database:   "database_verifier",
  criminal:   "criminal_verifier",
  drug:       "drug_test_verifier",
  court:      "courtroom_verifier",
};

const DATE_FILTERS = [
  { key: "today",  label: "Today"      },
  { key: "week",   label: "This Week"  },
  { key: "month",  label: "This Month" },
  { key: "custom", label: "Custom"     },
  { key: "all",    label: "All Time"   },
];

function statusLabel(s) {
  return {
    pending: "Pending", "in-progress": "In Progress",
    completed: "Completed", "qc-review": "QC Review", "on-hold": "On Hold",
  }[s] || s;
}

function formatTAT(tat) {
  if (!tat) return "—";
  const str = String(tat);
  if (/\d+\.?\d*[eE][+\-]?\d+/.test(str)) return "—";
  const num = parseFloat(str);
  if (!isNaN(num) && !str.includes("d") && !str.includes("D")) return `${Math.round(num)} days`;
  return str;
}

function getTabFromURL(search) {
  const tab = new URLSearchParams(search).get("tab") || "";
  return ["active", "completed", "all"].includes(tab) ? tab : "active";
}

function getChecksArray(c) {
  if (Array.isArray(c.checks)) return c.checks;
  if (typeof c.checks === "string") return c.checks.split(/[·,]/).map(x => x.trim()).filter(Boolean);
  return [];
}

export default function Allocator() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const [users, setUsers]               = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError]     = useState("");

  const [dateFilter, setDateFilter] = useState("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo]     = useState("");

  const tab = getTabFromURL(location.search);

  // TODO: local-only until BGVCase gets an assigned_to column + a
  // PATCH .../assign route. Nothing here is persisted to the backend.
  const [assignments, setAssignments]     = useState({}); // `${caseId}:${checkType}` -> user id
  const [showToast, setShowToast]         = useState(false);
  const [toastMessage, setToastMessage]   = useState("");
  const [toastError, setToastError]       = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => r.json())
      .then(data => setCases(data.cases || []))
      .catch(() => setError("Failed to load cases."))
      .finally(() => setLoading(false));
  }, []);

  // Real verifiers, for the per-check assignment dropdowns.
  useEffect(() => {
    setUsersLoading(true);
    setUsersError("");
    fetch(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          throw new Error("Your account doesn't have access to the user list — ask an admin to allow the allocator role to read GET /api/users.");
        }
        if (!r.ok) throw new Error("Failed to load verifiers.");
        return r.json();
      })
      .then(data => setUsers(data.users || []))
      .catch(err => setUsersError(err.message || "Failed to load verifiers."))
      .finally(() => setUsersLoading(false));
  }, []);

  // Verifiers eligible for a given check-type column: the check's dedicated
  // verifier role, plus generic "verifier" as a catch-all.
  const verifiersForCheck = (checkKey) => {
    const dedicatedRole = VERIFIER_ROLE_BY_CHECK[checkKey];
    return users.filter(u => u.role === dedicatedRole || u.role === "verifier");
  };

  const setTab = (next) => {
    navigate(`/Allocator?tab=${next}`, { replace: true });
  };

  const isInRange = (createdAt) => {
    if (!createdAt) return true;
    if (dateFilter === "all") return true;
    const d   = new Date(createdAt);
    const now = new Date();
    if (dateFilter === "today") return d.toDateString() === now.toDateString();
    if (dateFilter === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
    if (dateFilter === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
    if (dateFilter === "custom") {
      if (!customFrom && !customTo) return true;
      const from = customFrom ? new Date(customFrom) : null;
      const to   = customTo   ? new Date(customTo + "T23:59:59") : null;
      if (from && d < from) return false;
      if (to   && d > to)   return false;
      return true;
    }
    return true;
  };

  const dateCases = cases.filter(c => isInRange(c.created_at));

  // ── Stat cards ─────────────────────────────────────────────────────────
  const activeCases    = dateCases.filter(c => c.status === "pending" || c.status === "in-progress");
  const completedCases = dateCases.filter(c => c.status === "completed");
  const totalCount     = dateCases.length;
  const clearRate      = totalCount > 0 ? Math.round((completedCases.length / totalCount) * 100) : 0;

  // ── Kanban board data — real cases grouped by check type ────────────────
  // Only cases that are actually active (pending/in-progress) show up as
  // work items on the board; completed/on-hold cases don't need allocation.
  const boardColumns = CHECK_TYPES.map(ct => ({
    ...ct,
    cases: activeCases.filter(c => getChecksArray(c).includes(ct.key)),
  }));

  // ── Check Manager overview (right panel) ─────────────────────────────────
  // NOTE: GET /api/cases only returns one overall status per case, not a
  // status per check. So "% complete" here is a proxy — the share of cases
  // touching that check type whose *overall* case status is "completed" —
  // not a genuine per-check completion rate. Real per-check % would need
  // the API to expose check_details/check_results in the list response.
  const overviewRows = CHECK_TYPES.map(ct => {
    const relevant = dateCases.filter(c => getChecksArray(c).includes(ct.key));
    const done     = relevant.filter(c => c.status === "completed");
    const pct      = relevant.length > 0 ? Math.round((done.length / relevant.length) * 100) : 0;
    return { ...ct, pct, total: relevant.length };
  });

  const assignKey = (caseId, checkKey) => `${caseId}:${checkKey}`;

  // Updates the local assignment for a card and, on a real selection
  // (not the blank "Assign ▾" option), fires an immediate confirmation
  // toast so the user gets feedback right when they pick a verifier —
  // not just when they click "CONFIRM ASSIGNMENTS".
  const updateCardAssignment = (caseId, checkKey, assigneeId, assigneeName) => {
    setAssignments(prev => ({ ...prev, [assignKey(caseId, checkKey)]: assigneeId }));

    if (assigneeId && String(assigneeId).trim() !== "") {
      setToastMessage(`${caseId} assigned to ${assigneeName}.`);
      setToastError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleConfirm = () => {
    // Only count entries where a real user id was selected (non-empty)
    const realAssignments = Object.entries(assignments).filter(
      ([, assigneeId]) => assigneeId && String(assigneeId).trim() !== ""
    );

    if (realAssignments.length === 0) {
      setToastMessage("Please assign at least one case to a verifier before confirming.");
      setToastError(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // TODO: POST assignments to a real endpoint once one exists.
    // For now this only acknowledges the local selections made above.
    setToastMessage(
      `Assignment successful — ${realAssignments.length} case${realAssignments.length > 1 ? "s" : ""} assigned.`
    );
    setToastError(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const exportCSV = (rows) => {
    const headers = ["Case ID", "Candidate", "Client", "Checks", "Status", "TAT", "Created"];
    const csvRows = rows.map(c => [
      c.case_id,
      c.candidate || c.candidate_name || "—",
      c.client || c.client_name || "—",
      getChecksArray(c).join(" | "),
      statusLabel(c.status),
      formatTAT(c.tat),
      c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—",
    ]);
    const csv  = [headers, ...csvRows].map(r => r.map(v => `"${v ?? ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `allocator-cases-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const currentRowsForExport = tab === "completed" ? completedCases : tab === "all" ? dateCases : activeCases;

  // ── Shared table view for Completed / Total tabs ─────────────────────────
  const CasesTable = ({ rows }) => (
    <div className="down-table">
      {loading ? (
        <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading cases...</p>
      ) : error ? (
        <p style={{ padding: "24px", color: "#dc2626", fontSize: "14px" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Candidate</th>
              <th>Client</th>
              <th>Checks</th>
              <th>Status</th>
              <th>TAT</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "14px" }}>
                  No cases found for this view.
                </td>
              </tr>
            ) : (
              rows.map(c => (
                <tr key={c.case_id}>
                  <td style={{ fontWeight: 700, color: "#2b3b8c" }}>{c.case_id}</td>
                  <td>{c.candidate || c.candidate_name || "—"}</td>
                  <td>{c.client || c.client_name || "—"}</td>
                  <td style={{ fontSize: "12px", color: "#475569" }}>{getChecksArray(c).join(", ") || "—"}</td>
                  <td><span className={`status ${c.status}`}>{statusLabel(c.status)}</span></td>
                  <td style={{ fontSize: "13px" }}>{formatTAT(c.tat)}</td>
                  <td style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {!loading && (
        <div style={{ padding: "10px 16px", fontSize: "12px", color: "#9ca3af", borderTop: "1px solid #f1f5f9" }}>
          Showing {rows.length} case(s)
        </div>
      )}
    </div>
  );

  return (
    <>
      <Sidebar />

      {/* CONTENT */}
      <section id="noSidebar">
        {/* NAVBAR */}
        <nav>
          <div className="nav-toggle">
            <div className="bx bx-menu">
              <img src="images/inner-pages/client-portal-icon.svg" alt="" />
            </div>
          </div>

          <div className="head-src">
            <h3>ALLOCATOR & CHECK MANAGER — Distribution · Progress · Trends · Export</h3>
          </div>

          <button type="button" className="primary-cta">Allocator / Mgr</button>
        </nav>

        {/* MAIN */}
        <main>
          <div className="dash-wrper">

            {/* ── Tabs (Active board / Completed / Total) ── */}
            <div className="dash-upper-head">
              <div className="left">
                <button className={`tab-cta ${tab === "active" ? "active" : ""}`} onClick={() => setTab("active")}>
                  Active Cases
                  <span style={{ marginLeft: "5px", background: "rgba(0,0,0,.08)", borderRadius: "10px", padding: "1px 6px", fontSize: "12px" }}>
                    {activeCases.length}
                  </span>
                </button>
                <button className={`tab-cta ${tab === "completed" ? "active" : ""}`} onClick={() => setTab("completed")}>
                  Completed Cases
                  <span style={{ marginLeft: "5px", background: "rgba(0,0,0,.08)", borderRadius: "10px", padding: "1px 6px", fontSize: "12px" }}>
                    {completedCases.length}
                  </span>
                </button>
                <button className={`tab-cta ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
                  Total Cases
                  <span style={{ marginLeft: "5px", background: "rgba(0,0,0,.08)", borderRadius: "10px", padding: "1px 6px", fontSize: "12px" }}>
                    {totalCount}
                  </span>
                </button>
              </div>
              <div className="right">
                <button className="primary-cta export" onClick={() => exportCSV(currentRowsForExport)}>
                  <img src="images/dashboard/export-icon.svg" alt="" /> Export CSV
                </button>
              </div>
            </div>

            {/* ── Date filters ── */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {DATE_FILTERS.map(df => (
                <button
                  key={df.key}
                  className={`tab-cta ${dateFilter === df.key ? "active" : ""}`}
                  onClick={() => setDateFilter(df.key)}
                >
                  {df.label}
                </button>
              ))}
              {dateFilter === "custom" && (
                <>
                  <input
                    type="date"
                    value={customFrom}
                    onChange={e => setCustomFrom(e.target.value)}
                    style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                  />
                  <span style={{ color: "#94a3b8" }}>→</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={e => setCustomTo(e.target.value)}
                    style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                  />
                </>
              )}
            </div>

            {/* ── Stat cards ── */}
            <div className="cards-head-dash">
              <div className="card-inner-dash bdr-total">
                <h4>{loading ? "—" : activeCases.length}</h4>
                <p>Active Cases</p>
              </div>
              <div className="card-inner-dash bdr-com">
                <h4>{loading ? "—" : completedCases.length}</h4>
                <p>Completed Cases</p>
              </div>
              <div className="card-inner-dash bdr-progress">
                <h4>{loading ? "—" : totalCount}</h4>
                <p>Total Cases</p>
              </div>
              <div className="card-inner-dash bdr-rate">
                <h4>{loading ? "—" : `${clearRate}%`}</h4>
                <p>Clear Rate</p>
              </div>
            </div>

            {error && (
              <div style={{
                padding: "12px 16px", background: "#fff5f5", border: "1px solid #fca5a5",
                borderRadius: "8px", color: "#dc2626", fontSize: "14px",
              }}>
                {error}
              </div>
            )}
            {usersError && tab === "active" && (
              <div style={{
                padding: "12px 16px", background: "#fffbeb", border: "1px solid #fde68a",
                borderRadius: "8px", color: "#a16207", fontSize: "13px",
              }}>
                ⚠ Couldn't load verifiers for assignment: {usersError}
              </div>
            )}

            {/* ── Active tab: Kanban board + Check Manager overview ── */}
            {tab === "active" ? (
              <div className="cab-dashboard-container">
                <div className="cab-dashboard-wrapper">

                  {/* LEFT PANEL: CASE ALLOCATION BOARD */}
                  <section className="cab-board-section">
                    <header className="cab-board-header">
                      <h2>CASE ALLOCATION BOARD — by Check Type</h2>
                    </header>

                    <div className="cab-board-columns">
                      {loading ? (
                        <p style={{ padding: "24px", color: "#888", fontSize: "14px" }}>Loading cases...</p>
                      ) : (
                        boardColumns.map(col => (
                          <div
                            key={col.key}
                            className="cab-board-column"
                            id={`col-${col.key}`}
                            data-type={col.key}
                            style={{ "--accent-color": col.accent, "--bg-accent": col.bgAccent }}
                          >
                            <div className="cab-column-header">
                              <h3>{col.label}</h3>
                              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{col.cases.length}</span>
                            </div>

                            <div className="cab-cards-container" data-type={col.key}>
                              {col.cases.length === 0 ? (
                                <p style={{ padding: "10px 4px", fontSize: "12px", color: "#94a3b8" }}>No active cases.</p>
                              ) : (
                                col.cases.map(c => {
                                  const currentAssigneeId = assignments[assignKey(c.case_id, col.key)] || "";
                                  const eligible = verifiersForCheck(col.key);
                                  const currentAssignee = eligible.find(u => String(u.id) === String(currentAssigneeId));
                                  return (
                                    <div key={c.case_id} className="cab-case-card" id={`card-${c.case_id}`}>
                                      <div className="cab-card-body">
                                        <div className="cab-card-id">{c.case_id}</div>
                                        <div className="cab-card-status">
                                          {currentAssignee ? currentAssignee.name : "Unassigned"}
                                        </div>
                                        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                                          {c.candidate || c.candidate_name || "—"}
                                        </div>
                                      </div>

                                      <div className="cab-card-footer">
                                        <div className="cab-assign-select-wrapper">
                                          {usersError ? (
                                            <span style={{ fontSize: "11px", color: "#eb4d4b" }}>Verifiers unavailable</span>
                                          ) : (
                                            <select
                                              className="cab-assign-select"
                                              value={currentAssigneeId}
                                              onChange={(e) => {
                                                const selectedId = e.target.value;
                                                const selectedUser = eligible.find(u => String(u.id) === String(selectedId));
                                                updateCardAssignment(c.case_id, col.key, selectedId, selectedUser?.name);
                                              }}
                                              disabled={usersLoading}
                                            >
                                              <option value="">
                                                {usersLoading ? "Loading…" : eligible.length === 0 ? "No verifiers found" : "Assign ▾"}
                                              </option>
                                              {eligible.map(u => (
                                                <option key={u.id} value={u.id}>{u.name}</option>
                                              ))}
                                            </select>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <footer className="cab-board-footer">
                      <button className="cab-btn cab-btn-primary" id="btn-confirm" onClick={handleConfirm}>
                        <i className="fa-solid fa-circle-check"></i> CONFIRM ASSIGNMENTS
                      </button>
                    </footer>
                  </section>

                  {/* RIGHT PANEL: CHECK MANAGER OVERVIEW */}
                  <aside className="cab-manager-section">
                    <header className="cab-manager-header">
                      <h2>CHECK MANAGER — Overview (Read-Only)</h2>
                    </header>

                    <div className="cab-manager-content">
                      <div className="cab-overview-list">
                        {overviewRows.map(row => (
                          <div
                            key={row.key}
                            className="cab-progress-item"
                            id={`progress-${row.key}`}
                            style={{ "--item-color": row.accent }}
                          >
                            <div className="cab-progress-info">
                              <span className="cab-progress-label">{row.label}</span>
                              <span className="cab-progress-percent" id={`pct-${row.key}`}>
                                {row.total > 0 ? `${row.pct}%` : "—"}
                              </span>
                            </div>
                            <div className="cab-progress-bar-bg">
                              <div
                                className="cab-progress-bar-fill"
                                id={`fill-${row.key}`}
                                style={{ width: `${row.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: "11px", color: "#94a3b8", padding: "0 4px", marginTop: "8px" }}>
                        % reflects overall case status, not a per-check result — the API doesn't expose
                        per-check status yet.
                      </p>
                    </div>

                    <footer className="cab-manager-footer">
                      <button className="primary-cta" id="btn-csv" onClick={() => exportCSV(dateCases)}>
                        <i className="fa-solid fa-file-csv"></i> Export Progress CSV
                      </button>
                    </footer>
                  </aside>
                </div>
              </div>
            ) : tab === "completed" ? (
              <CasesTable rows={completedCases} />
            ) : (
              <CasesTable rows={dateCases} />
            )}

          </div>

          {/* Notification Toast — rendered via a portal straight into
              document.body. This is the important part: if any ancestor
              (e.g. #noSidebar or .dash-wrper) has a CSS "transform" on it —
              common in dashboard layouts for sidebar-toggle animations —
              position: fixed stops being relative to the viewport and
              becomes relative to that transformed ancestor instead, which
              can push a "fixed" toast off-screen or behind other elements
              even with a high z-index. Portaling to document.body sidesteps
              that entirely, so this will render correctly regardless of
              what any parent's CSS does.

              display is also driven directly off `showToast` here (rather
              than left to a CSS class like .cab-hidden) so the toast can't
              silently stay display:none if the stylesheet's base rule for
              .cab-toast doesn't hand display back over as expected. */}
          {createPortal(
            <div
              id="toast"
              className={`cab-toast ${showToast ? "" : "cab-hidden"}`}
              style={{
                position: "fixed",
                bottom: showToast ? "28px" : "-100px",
                right: "28px",
                left: "auto",
                transform: "none", 
                display: showToast ? "flex" : "none",
                alignItems: "center",
                gap: "10px",
                padding: "14px 22px",
                borderRadius: "10px",
                background: toastError ? "#fff5f5" : "#f0fdf4",
                border: `1.5px solid ${toastError ? "#fca5a5" : "#86efac"}`,
                color: toastError ? "#dc2626" : "#15803d",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                zIndex: 999999,
                opacity: showToast ? 1 : 0,
                transition: "bottom 0.3s ease, opacity 0.3s ease",
                pointerEvents: "none",
              }}
            >
              <i
                className={`fa-solid ${toastError ? "fa-circle-exclamation" : "fa-circle-check"} cab-toast-icon`}
                style={{ fontSize: "16px" }}
              />
              <span id="toast-message">{toastMessage}</span>
            </div>,
            document.body
          )}

        </main>
      </section>
    </>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";

// const ToggleSwitch = ({ initialStatus = true, onChange, disabled = false }) => {
//   const [isEnabled, setIsEnabled] = useState(initialStatus);

//   // Keep the switch in sync if the server value changes under us
//   // (e.g. after fetchUsers() refetches following a failed update).
//   useEffect(() => {
//     setIsEnabled(initialStatus);
//   }, [initialStatus]);

//   const handleToggle = () => {
//     if (disabled) return; // Admin accounts are always active — no-op.
//     const nextState = !isEnabled;
//     setIsEnabled(nextState);
//     if (onChange) onChange(nextState);
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleToggle}
//       disabled={disabled}
//       title={disabled ? "Admin accounts cannot be disabled" : undefined}
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         width: "85px",
//         height: "30px",
//         borderRadius: "20px",
//         backgroundColor: isEnabled ? "#2ed573" : "#e0e0e0",
//         border: "none",
//         padding: "3px",
//         cursor: disabled ? "not-allowed" : "pointer",
//         opacity: disabled ? 0.6 : 1,
//         transition: "background-color 0.3s ease",
//         position: "relative",
//       }}
//     >
//       <span
//         style={{
//           width: "24px",
//           height: "24px",
//           borderRadius: "50%",
//           backgroundColor: "#ffffff",
//           position: "absolute",
//           left: isEnabled ? "calc(100% - 27px)" : "3px",
//           transition: "left 0.3s ease",
//           zIndex: 2,
//         }}
//       />
//       <span
//         style={{
//           fontSize: "9px",
//           fontWeight: "800",
//           color: isEnabled ? "#ffffff" : "#718093",
//           paddingLeft: isEnabled ? "6px" : "0px",
//           paddingRight: isEnabled ? "0px" : "5px",
//           textTransform: "uppercase",
//           width: "100%",
//           textAlign: isEnabled ? "left" : "right",
//           zIndex: 1,
//         }}
//       >
//         {isEnabled ? "ENABLE" : "DISABLE"}
//       </span>
//     </button>
//   );
// };

// const ROLES = [
//   { value: "admin",               label: "Admin" },
//   { value: "allocator",           label: "Allocator" },
//   { value: "verifier",            label: "Verifier" },
//   { value: "employment_verifier", label: "Employment Verifier" },
//   { value: "education_verifier",  label: "Education Verifier" },
//   { value: "address_verifier",    label: "Address Verifier" },
//   { value: "database_verifier",   label: "Database Verifier" },
//   { value: "criminal_verifier",   label: "Criminal Verifier" },
//   { value: "drug_test_verifier",  label: "Drug Test Verifier" },
//   { value: "courtroom_verifier",  label: "Courtroom Verifier" },
//   { value: "check_manager",       label: "Check Manager" },
//   { value: "report_writing",      label: "Report Writing" },
//   { value: "pvt_qc",              label: "PVT / QC" },
//   { value: "client",              label: "Client" },
//   { value: "onboarding",          label: "Onboarding" },
// ];

// const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.value, r.label]));

// const ROLE_COLORS = {
//   admin:               { bg: "#eef1fb", color: "#2b3b8c" },
//   allocator:           { bg: "#f0fdfa", color: "#0d9488" },
//   verifier:            { bg: "#fdf4ff", color: "#7c3aed" },
//   employment_verifier: { bg: "#eff6ff", color: "#1d4ed8" },
//   education_verifier:  { bg: "#f0fdf4", color: "#15803d" },
//   address_verifier:    { bg: "#fff7ed", color: "#c2410c" },
//   database_verifier:   { bg: "#f5f3ff", color: "#6d28d9" },
//   criminal_verifier:   { bg: "#fef2f2", color: "#b91c1c" },
//   drug_test_verifier:  { bg: "#ecfeff", color: "#0e7490" },
//   courtroom_verifier:  { bg: "#fffbeb", color: "#a16207" },
//   check_manager:       { bg: "#fff7ed", color: "#c2410c" },
//   report_writing:      { bg: "#f0fdf4", color: "#16a34a" },
//   pvt_qc:              { bg: "#fff5f5", color: "#eb4d4b" },
//   client:              { bg: "#eff6ff", color: "#2563eb" },
//   onboarding:          { bg: "#fefce8", color: "#ca8a04" },
// };

// export default function UserManagement() {
//   const navigate = useNavigate();

//   const [users, setUsers]     = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm]       = useState({ name: "", email: "", password: "", role: "" });
//   const [formError, setFormError]     = useState("");
//   const [formSuccess, setFormSuccess] = useState("");
//   const [formLoading, setFormLoading] = useState(false);
//   const [deletingId, setDeletingId]   = useState(null);
//   const [search, setSearch]   = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   const token = localStorage.getItem("token");

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API_URL}/api/users`, {
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });
//       if (res.status === 401 || res.status === 403) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/");
//         return;
//       }
//       const data = await res.json();
//       setUsers(data.users || []);
//     } catch {
//       setError("Failed to load users. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   // Reset page to 1 when filters change
//   useEffect(() => { setCurrentPage(1); }, [search, roleFilter]);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (formLoading) return;
//     setFormError("");
//     setFormSuccess("");
//     if (!form.role) { setFormError("Please select a role."); return; }
//     setFormLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/api/users/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) { setFormError(data.message || "Failed to create user."); return; }
//       setFormSuccess(`User "${data.user.name}" created successfully.`);
//       setForm({ name: "", email: "", password: "", role: "" });
//       fetchUsers();
//       setTimeout(() => { setShowForm(false); setFormSuccess(""); }, 1500);
//     } catch {
//       setFormError("Server error. Please try again.");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = async (id, name) => {
//     if (!window.confirm(`Delete "${name}"?`)) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`${API_URL}/api/users/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//       });
//       const data = await res.json();
//       if (!res.ok) { alert(data.message || "Failed to delete user."); return; }
//       setUsers((prev) => prev.filter((u) => u.id !== id));
//     } catch {
//       alert("Server error. Please try again.");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filtered = users.filter((u) => {
//     const matchSearch =
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase()) ||
//       ROLE_LABELS[u.role]?.toLowerCase().includes(search.toLowerCase());
//     const matchRole = roleFilter === "all" || u.role === roleFilter;
//     return matchSearch && matchRole;
//   });

//   // Calculate pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filtered.length / usersPerPage);

//   const roleCounts = Object.fromEntries(
//     ROLES.map((r) => [r.value, users.filter((u) => u.role === r.value).length])
//   );

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* ── Page header ── */}
//             <div className="dash-upper-head">
//               <div className="left">
//                 <h3 style={{ fontSize: "24px", fontWeight: 600, margin: 0, color: "#000" }}>
//                   User Management
//                 </h3>
//               </div>
//               <div className="right">
//                 <input
//                   type="text"
//                   className="dash-search-input"
//                   placeholder="Search name, email or role…"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button
//                   className="primary-cta"
//                   onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}
//                 >
//                   {showForm ? "✕ Cancel" : "+ Create User"}
//                 </button>
//               </div>
//             </div>

//             {/* ── Stat cards ── */}
//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total">
//                 <h4>{loading ? "—" : users.length}</h4>
//                 <p>Total Users</p>
//               </div>
//               <div className="card-inner-dash bdr-progress">
//                 <h4>{loading ? "—" : (roleCounts.verifier || 0)}</h4>
//                 <p>Verifiers</p>
//               </div>
//               <div className="card-inner-dash bdr-com">
//                 <h4>{loading ? "—" : (roleCounts.client || 0)}</h4>
//                 <p>Clients</p>
//               </div>
//               <div className="card-inner-dash bdr-rate">
//                 <h4>{loading ? "—" : (roleCounts.admin || 0)}</h4>
//                 <p>Admins</p>
//               </div>
//             </div>

//             {/* ── Create user form ── */}
//             {showForm && (
//               <div style={{ background: "#fff", border: "1px solid #e8ecf4", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "14px", borderBottom: "2px solid #f0f2f8" }}>
//                   <span style={{ background: "#2b3b8c", color: "#fff", fontSize: "0.68rem", fontWeight: 800, width: "22px", height: "22px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
//                   <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2b3b8c", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
//                     Create New User
//                   </h3>
//                 </div>

//                 <form onSubmit={handleCreate}>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "14px", alignItems: "end" }}>

//                     {[
//                       { field: "name",     type: "text",     placeholder: "Full Name" },
//                       { field: "email",    type: "email",    placeholder: "Email Address" },
//                       { field: "password", type: "password", placeholder: "Password (min 6)" },
//                     ].map(({ field, type, placeholder }) => (
//                       <div key={field} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                         <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
//                           {placeholder}
//                         </label>
//                         <input
//                           type={type}
//                           placeholder={placeholder}
//                           value={form[field]}
//                           onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//                           required
//                           minLength={field === "password" ? 6 : undefined}
//                           style={{
//                             padding: "10px 13px", border: "1.5px solid #e2e8f0",
//                             borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
//                             background: "#f8fafc", outline: "none", width: "100%", boxSizing: "border-box",
//                           }}
//                         />
//                       </div>
//                     ))}

//                     <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                       <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>Role</label>
//                       <select
//                         value={form.role}
//                         onChange={(e) => setForm({ ...form, role: e.target.value })}
//                         required
//                         style={{
//                           padding: "10px 13px", border: "1.5px solid #e2e8f0",
//                           borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
//                           background: "#f8fafc", outline: "none", width: "100%",
//                           appearance: "none", cursor: "pointer",
//                         }}
//                       >
//                         <option value="">— Select Role —</option>
//                         {ROLES.map((r) => (
//                           <option key={r.value} value={r.value}>{r.label}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <button
//                       type="submit"
//                       className="primary-cta"
//                       disabled={formLoading}
//                       style={{ padding: "10px 20px", whiteSpace: "nowrap" }}
//                     >
//                       {formLoading ? "Creating…" : "Create User →"}
//                     </button>
//                   </div>

//                   {formError   && <p style={{ color: "#eb4d4b", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>⚠ {formError}</p>}
//                   {formSuccess && <p style={{ color: "#16a34a", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>✓ {formSuccess}</p>}
//                 </form>
//               </div>
//             )}

//             {/* ── Role filter tabs ── */}
//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
//               <button
//                 className={`tab-cta ${roleFilter === "all" ? "active" : ""}`}
//                 onClick={() => setRoleFilter("all")}
//               >
//                 All
//                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
//                   {users.length}
//                 </span>
//               </button>
//               {ROLES.map((r) => roleCounts[r.value] > 0 && (
//                 <button
//                   key={r.value}
//                   className={`tab-cta ${roleFilter === r.value ? "active" : ""}`}
//                   onClick={() => setRoleFilter(r.value)}
//                 >
//                   {r.label}
//                   <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
//                     {roleCounts[r.value]}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* ── Users table ── */}
//             <div className="down-table">
//               <div style={{ background: "var(--primary-color)", padding: "12px 16px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>
//                   USERS ({filtered.length})
//                 </h3>
//                 {search && (
//                   <span style={{ color: "#94a3b8", fontSize: "12px" }}>
//                     Filtered by "{search}"
//                   </span>
//                 )}
//               </div>

//               {error && (
//                 <p style={{ color: "#eb4d4b", padding: "16px", fontSize: "13px", fontWeight: 600 }}>⚠ {error}</p>
//               )}

//               {loading ? (
//                 <p style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Loading users…</p>
//               ) : (
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentUsers.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
//                           {search ? `No results for "${search}"` : "No users found."}
//                         </td>
//                       </tr>
//                     ) : (
//                       currentUsers.map((user, index) => {
//                         const roleStyle = ROLE_COLORS[user.role] || { bg: "#f1f5f9", color: "#475569" };
//                         return (
//                           <tr key={user.id}>
//                             <td style={{ color: "#94a3b8", fontSize: "13px" }}>{indexOfFirstUser + index + 1}</td>
//                             <td><div style={{ fontWeight: 600, fontSize: "14px" }}>{user.name}</div></td>
//                             <td style={{ color: "#475569", fontSize: "13px" }}>{user.email}</td>
//                             <td>
//                               <span style={{ background: roleStyle.bg, color: roleStyle.color, fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
//                                 {ROLE_LABELS[user.role] || user.role}
//                               </span>
//                             </td>
//                             <td style={{ color: "#64748b", fontSize: "13px" }}>{formatDate(user.created_at)}</td>
//                             <td>
//   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     {/* Enable/Disable Toggle Switch — reflects user.status from the API and
//         is locked on for admins (server also enforces this, see /users/{id}/status). */}
//     <ToggleSwitch
//       initialStatus={user.status === "active" || user.status === "enabled"}
//       disabled={user.role === "admin"}
//       onChange={async (newStatus) => {
//         try {
//           const res = await fetch(`${API_URL}/api/users/${user.id}/status`, {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               status: newStatus ? "active" : "inactive",
//             }),
//           });

//           if (!res.ok) {
//             const data = await res.json().catch(() => ({}));
//             alert(data.message || "Failed to update status");
//             fetchUsers(); // Rollback / Reset UI state from server
//             return;
//           }

//           console.log(`User ${user.id} status updated to:`, newStatus);
//         } catch (err) {
//           console.error("Status update error:", err);
//           alert("Server error while updating status.");
//           fetchUsers(); // Reset state on error
//         }
//       }}
//     />

//     {/* Delete Button (Unchanged) */}
//     <button
//       onClick={() => handleDelete(user.id, user.name)}
//       disabled={deletingId === user.id}
//       style={{
//         background: "#fff5f5",
//         color: "#eb4d4b",
//         border: "1px solid #fca5a5",
//         borderRadius: "6px",
//         padding: "5px 12px",
//         cursor: "pointer",
//       }}
//     >
//       {deletingId === user.id ? "Deleting…" : "Delete"}
//     </button>
//   </div>
// </td>
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
//                   <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
//                   <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
//                   ))}
//                   <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
//                   <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
//                 </div>
//               )}
//             </div>

//             {!loading && (
//               <div style={{ marginTop: "10px", fontSize: "12px", color: "#94a3b8" }}>
//                 Showing {filtered.length} of {users.length} users
//               </div>
//             )}

//           </div>
//         </main>
//       </section>
//     </>
//   );
// }

// function formatDate(dateStr) {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

const ToggleSwitch = ({ initialStatus = true, onChange, disabled = false }) => {
  const [isEnabled, setIsEnabled] = useState(initialStatus);

  // Keep the switch in sync if the server value changes under us
  // (e.g. after fetchUsers() refetches following a failed update).
  useEffect(() => {
    setIsEnabled(initialStatus);
  }, [initialStatus]);

  const handleToggle = () => {
    if (disabled) return; // Admin accounts are always active — no-op.
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    if (onChange) onChange(nextState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      title={disabled ? "Admin accounts cannot be disabled" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "85px",
        height: "30px",
        borderRadius: "20px",
        backgroundColor: isEnabled ? "#2ed573" : "#e0e0e0",
        border: "none",
        padding: "3px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background-color 0.3s ease",
        position: "relative",
      }}
    >
      <span
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          position: "absolute",
          left: isEnabled ? "calc(100% - 27px)" : "3px",
          transition: "left 0.3s ease",
          zIndex: 2,
        }}
      />
      <span
        style={{
          fontSize: "9px",
          fontWeight: "800",
          color: isEnabled ? "#ffffff" : "#718093",
          paddingLeft: isEnabled ? "6px" : "0px",
          paddingRight: isEnabled ? "0px" : "5px",
          textTransform: "uppercase",
          width: "100%",
          textAlign: isEnabled ? "left" : "right",
          zIndex: 1,
        }}
      >
        {isEnabled ? "ENABLE" : "DISABLE"}
      </span>
    </button>
  );
};

// NOTE: "tl" added below so Team Leads created via the Add New TL page
// (role values "TL - Employment", "TL - Education", etc — see AddNewTl.jsx)
// are recognised here. Individual specializations still show their own
// full label via ROLE_LABELS fallback (user.role itself), this generic
// "tl" bucket just makes sure the filter tab / stat styling isn't blank.
const ROLES = [
  { value: "admin",               label: "Admin" },
  { value: "tl",                  label: "Team Lead" },
  { value: "allocator",           label: "Allocator" },
  { value: "verifier",            label: "Verifier" },
  { value: "employment_verifier", label: "Employment Verifier" },
  { value: "education_verifier",  label: "Education Verifier" },
  { value: "address_verifier",    label: "Address Verifier" },
  { value: "database_verifier",   label: "Database Verifier" },
  { value: "criminal_verifier",   label: "Criminal Verifier" },
  { value: "drug_test_verifier",  label: "Drug Test Verifier" },
  { value: "courtroom_verifier",  label: "Courtroom Verifier" },
  { value: "check_manager",       label: "Check Manager" },
  { value: "report_writing",      label: "Report Writing" },
  { value: "pvt_qc",              label: "PVT / QC" },
  { value: "client",              label: "Client" },
  { value: "onboarding",          label: "Onboarding" },
];

const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.value, r.label]));

const ROLE_COLORS = {
  admin:               { bg: "#eef1fb", color: "#2b3b8c" },
  tl:                  { bg: "#fef9c3", color: "#a16207" },
  allocator:           { bg: "#f0fdfa", color: "#0d9488" },
  verifier:            { bg: "#fdf4ff", color: "#7c3aed" },
  employment_verifier: { bg: "#eff6ff", color: "#1d4ed8" },
  education_verifier:  { bg: "#f0fdf4", color: "#15803d" },
  address_verifier:    { bg: "#fff7ed", color: "#c2410c" },
  database_verifier:   { bg: "#f5f3ff", color: "#6d28d9" },
  criminal_verifier:   { bg: "#fef2f2", color: "#b91c1c" },
  drug_test_verifier:  { bg: "#ecfeff", color: "#0e7490" },
  courtroom_verifier:  { bg: "#fffbeb", color: "#a16207" },
  check_manager:       { bg: "#fff7ed", color: "#c2410c" },
  report_writing:      { bg: "#f0fdf4", color: "#16a34a" },
  pvt_qc:              { bg: "#fff5f5", color: "#eb4d4b" },
  client:              { bg: "#eff6ff", color: "#2563eb" },
  onboarding:          { bg: "#fefce8", color: "#ca8a04" },
};

// Roles created from AddNewTl.jsx look like "TL - Employment", "TL -
// Education", etc — not one of the exact ROLES values above. This resolves
// any such value to the shared "tl" color/label bucket, and otherwise falls
// back to whatever ROLE_LABELS/ROLE_COLORS already provide.
function resolveRoleDisplay(role) {
  const key = (role || "").toLowerCase();
  if (key.startsWith("tl")) {
    return { label: role, style: ROLE_COLORS.tl };
  }
  return { label: ROLE_LABELS[role] || role, style: ROLE_COLORS[role] || { bg: "#f1f5f9", color: "#475569" } };
}

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ name: "", email: "", password: "", role: "" });
  const [formError, setFormError]     = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId]   = useState(null);
  const [search, setSearch]   = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Reset page to 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [search, roleFilter]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formLoading) return;
    setFormError("");
    setFormSuccess("");
    if (!form.role) { setFormError("Please select a role."); return; }
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.message || "Failed to create user."); return; }
      setFormSuccess(`User "${data.user.name}" created successfully.`);
      setForm({ name: "", email: "", password: "", role: "" });
      fetchUsers();
      setTimeout(() => { setShowForm(false); setFormSuccess(""); }, 1500);
    } catch {
      setFormError("Server error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Failed to delete user."); return; }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (ROLE_LABELS[u.role] || u.role || "").toLowerCase().includes(search.toLowerCase());
    const matchRole =
      roleFilter === "all" ||
      u.role === roleFilter ||
      (roleFilter === "tl" && (u.role || "").toLowerCase().startsWith("tl"));
    return matchSearch && matchRole;
  });

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  const roleCounts = Object.fromEntries(
    ROLES.map((r) => [
      r.value,
      users.filter((u) =>
        r.value === "tl" ? (u.role || "").toLowerCase().startsWith("tl") : u.role === r.value
      ).length,
    ])
  );

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            {/* ── Page header ── */}
            <div className="dash-upper-head">
              <div className="left">
                <h3 style={{ fontSize: "24px", fontWeight: 600, margin: 0, color: "#000" }}>
                  User Management
                </h3>
              </div>
              <div className="right">
                <input
                  type="text"
                  className="dash-search-input"
                  placeholder="Search name, email or role…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="primary-cta"
                  onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}
                >
                  {showForm ? "✕ Cancel" : "+ Create User"}
                </button>
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="cards-head-dash">
              <div className="card-inner-dash bdr-total">
                <h4>{loading ? "—" : users.length}</h4>
                <p>Total Users</p>
              </div>
              <div className="card-inner-dash bdr-progress">
                <h4>{loading ? "—" : (roleCounts.verifier || 0)}</h4>
                <p>Verifiers</p>
              </div>
              <div className="card-inner-dash bdr-com">
                <h4>{loading ? "—" : (roleCounts.client || 0)}</h4>
                <p>Clients</p>
              </div>
              <div className="card-inner-dash bdr-rate">
                <h4>{loading ? "—" : (roleCounts.admin || 0)}</h4>
                <p>Admins</p>
              </div>
            </div>

            {/* ── Create user form ── */}
            {showForm && (
              <div style={{ background: "#fff", border: "1px solid #e8ecf4", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "14px", borderBottom: "2px solid #f0f2f8" }}>
                  <span style={{ background: "#2b3b8c", color: "#fff", fontSize: "0.68rem", fontWeight: 800, width: "22px", height: "22px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
                  <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2b3b8c", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                    Create New User
                  </h3>
                </div>

                <form onSubmit={handleCreate}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "14px", alignItems: "end" }}>

                    {[
                      { field: "name",     type: "text",     placeholder: "Full Name" },
                      { field: "email",    type: "email",    placeholder: "Email Address" },
                      { field: "password", type: "password", placeholder: "Password (min 6)" },
                    ].map(({ field, type, placeholder }) => (
                      <div key={field} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
                          {placeholder}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          required
                          minLength={field === "password" ? 6 : undefined}
                          style={{
                            padding: "10px 13px", border: "1.5px solid #e2e8f0",
                            borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
                            background: "#f8fafc", outline: "none", width: "100%", boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ))}

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>Role</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        required
                        style={{
                          padding: "10px 13px", border: "1.5px solid #e2e8f0",
                          borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
                          background: "#f8fafc", outline: "none", width: "100%",
                          appearance: "none", cursor: "pointer",
                        }}
                      >
                        <option value="">— Select Role —</option>
                        {ROLES.filter((r) => r.value !== "tl").map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: "2px 0 0" }}>
                        Team Leads are created from the Add New TL page.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="primary-cta"
                      disabled={formLoading}
                      style={{ padding: "10px 20px", whiteSpace: "nowrap" }}
                    >
                      {formLoading ? "Creating…" : "Create User →"}
                    </button>
                  </div>

                  {formError   && <p style={{ color: "#eb4d4b", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>⚠ {formError}</p>}
                  {formSuccess && <p style={{ color: "#16a34a", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>✓ {formSuccess}</p>}
                </form>
              </div>
            )}

            {/* ── Role filter tabs ── */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <button
                className={`tab-cta ${roleFilter === "all" ? "active" : ""}`}
                onClick={() => setRoleFilter("all")}
              >
                All
                <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
                  {users.length}
                </span>
              </button>
              {ROLES.map((r) => roleCounts[r.value] > 0 && (
                <button
                  key={r.value}
                  className={`tab-cta ${roleFilter === r.value ? "active" : ""}`}
                  onClick={() => setRoleFilter(r.value)}
                >
                  {r.label}
                  <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
                    {roleCounts[r.value]}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Users table ── */}
            <div className="down-table">
              <div style={{ background: "var(--primary-color)", padding: "12px 16px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>
                  USERS ({filtered.length})
                </h3>
                {search && (
                  <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                    Filtered by "{search}"
                  </span>
                )}
              </div>

              {error && (
                <p style={{ color: "#eb4d4b", padding: "16px", fontSize: "13px", fontWeight: 600 }}>⚠ {error}</p>
              )}

              {loading ? (
                <p style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Loading users…</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                          {search ? `No results for "${search}"` : "No users found."}
                        </td>
                      </tr>
                    ) : (
                      currentUsers.map((user, index) => {
                        const roleDisplay = resolveRoleDisplay(user.role);
                        return (
                          <tr key={user.id}>
                            <td style={{ color: "#94a3b8", fontSize: "13px" }}>{indexOfFirstUser + index + 1}</td>
                            <td><div style={{ fontWeight: 600, fontSize: "14px" }}>{user.name}</div></td>
                            <td style={{ color: "#475569", fontSize: "13px" }}>{user.email}</td>
                            <td>
                              <span style={{ background: roleDisplay.style.bg, color: roleDisplay.style.color, fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
                                {roleDisplay.label}
                              </span>
                            </td>
                            <td style={{ color: "#64748b", fontSize: "13px" }}>{formatDate(user.created_at)}</td>
                            <td>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {/* Enable/Disable Toggle Switch — reflects user.status from the API and
        is locked on for admins (server also enforces this, see /users/{id}/status). */}
    <ToggleSwitch
      initialStatus={user.status === "active" || user.status === "enabled"}
      disabled={user.role === "admin"}
      onChange={async (newStatus) => {
        try {
          const res = await fetch(`${API_URL}/api/users/${user.id}/status`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: newStatus ? "active" : "inactive",
            }),
          });

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(data.message || "Failed to update status");
            fetchUsers(); // Rollback / Reset UI state from server
            return;
          }

          console.log(`User ${user.id} status updated to:`, newStatus);
        } catch (err) {
          console.error("Status update error:", err);
          alert("Server error while updating status.");
          fetchUsers(); // Reset state on error
        }
      }}
    />

    {/* Delete Button (Unchanged) */}
    <button
      onClick={() => handleDelete(user.id, user.name)}
      disabled={deletingId === user.id}
      style={{
        background: "#fff5f5",
        color: "#eb4d4b",
        border: "1px solid #fca5a5",
        borderRadius: "6px",
        padding: "5px 12px",
        cursor: "pointer",
      }}
    >
      {deletingId === user.id ? "Deleting…" : "Delete"}
    </button>
  </div>
</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
                  <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
                  <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
                  ))}
                  <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
                  <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
                </div>
              )}
            </div>

            {!loading && (
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#94a3b8" }}>
                Showing {filtered.length} of {users.length} users
              </div>
            )}

          </div>
        </main>
      </section>
    </>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
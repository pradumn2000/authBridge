// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";
// // import { API_URL } from "../src/config";

// // const ROLES = [
// //   { value: "admin",          label: "Admin" },
// //   { value: "allocator",      label: "Allocator" },
// //   { value: "verifier",       label: "Verifier" },
// //   { value: "check_manager",  label: "Check Manager" },
// //   { value: "report_writing", label: "Report Writing" },
// //   { value: "pvt_qc",         label: "PVT / QC" },
// //   { value: "client",         label: "Client" },
// //   { value: "onboarding",     label: "Onboarding" },
// // ];

// // const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.value, r.label]));

// // export default function UserManagement() {
// //   const navigate = useNavigate();

// //   const [users, setUsers]       = useState([]);
// //   const [loading, setLoading]   = useState(true);
// //   const [error, setError]       = useState("");

// //   // Create user form
// //   const [showForm, setShowForm] = useState(false);
// //   const [form, setForm]         = useState({ name: "", email: "", password: "", role: "" });
// //   const [formError, setFormError]     = useState("");
// //   const [formSuccess, setFormSuccess] = useState("");
// //   const [formLoading, setFormLoading] = useState(false);

// //   // Delete
// //   const [deletingId, setDeletingId] = useState(null);

// //   // Search
// //   const [search, setSearch] = useState("");

// //   const token = localStorage.getItem("token");

// //   // ── Fetch users ──────────────────────────────────────
// //   const fetchUsers = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await fetch(`${API_URL}/api/users`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           Accept: "application/json",
// //         },
// //       });

// //       if (res.status === 401 || res.status === 403) {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         navigate("/");
// //         return;
// //       }

// //       const data = await res.json();
// //       setUsers(data.users || []);
// //     } catch (err) {
// //       setError("Failed to load users. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchUsers(); }, []);

// //   // ── Create user ───────────────────────────────────────
// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     if (formLoading) return;

// //     setFormError("");
// //     setFormSuccess("");

// //     if (!form.role) {
// //       setFormError("Please select a role.");
// //       return;
// //     }

// //     setFormLoading(true);

// //     try {
// //       const res = await fetch(`${API_URL}/api/users/create`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setFormError(data.message || "Failed to create user.");
// //         return;
// //       }

// //       setFormSuccess(`User "${data.user.name}" created successfully.`);
// //       setForm({ name: "", email: "", password: "", role: "" });
// //       fetchUsers(); // Refresh table

// //       // Auto close form after 1.5s
// //       setTimeout(() => {
// //         setShowForm(false);
// //         setFormSuccess("");
// //       }, 1500);

// //     } catch (err) {
// //       setFormError("Server error. Please try again.");
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   // ── Delete user ───────────────────────────────────────
// //   const handleDelete = async (id, name) => {
// //     if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

// //     setDeletingId(id);

// //     try {
// //       const res = await fetch(`${API_URL}/api/users/${id}`, {
// //         method: "DELETE",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           Accept: "application/json",
// //         },
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         alert(data.message || "Failed to delete user.");
// //         return;
// //       }

// //       setUsers((prev) => prev.filter((u) => u.id !== id));

// //     } catch (err) {
// //       alert("Server error. Please try again.");
// //     } finally {
// //       setDeletingId(null);
// //     }
// //   };

// //   // ── Filtered users ────────────────────────────────────
// //   const filtered = users.filter((u) =>
// //     u.name.toLowerCase().includes(search.toLowerCase()) ||
// //     u.email.toLowerCase().includes(search.toLowerCase()) ||
// //     ROLE_LABELS[u.role]?.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <>
// //       <Sidebar />

// //       <section id="content">
// //         <Header />

// //         <main>
// //           <div className="dash-wrper">

// //             {/* ── Page header ── */}
// //             <div className="dash-upper-head">
// //               <div className="left">
// //                 <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
// //                   User Management
// //                 </h3>
// //               </div>
// //               <div className="right">
// //                 {/* Search */}
// //                 <div className="input-grp" style={{ margin: 0 }}>
// //                   <input
// //                     type="text"
// //                     placeholder="Search by name, email or role..."
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     style={{ minWidth: "240px" }}
// //                   />
// //                 </div>
// //                 {/* Create button */}
// //                 <button
// //                   className="primary-cta"
// //                   onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}
// //                 >
// //                   {showForm ? "Cancel" : "+ Create User"}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* ── Create user form ── */}
// //             {showForm && (
// //               <div className="down-table" style={{ marginBottom: "20px", padding: "20px" }}>
// //                 <h4 style={{ marginBottom: "16px", fontSize: "14px", fontWeight: 600 }}>
// //                   Create New User
// //                 </h4>
// //                 <form onSubmit={handleCreate}>
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "12px", alignItems: "end" }}>

// //                     <div className="login-pst" style={{ margin: 0 }}>
// //                       <div className="input-grp">
// //                         <input
// //                           type="text"
// //                           placeholder="Full Name"
// //                           value={form.name}
// //                           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                           required
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="login-pst" style={{ margin: 0 }}>
// //                       <div className="input-grp">
// //                         <input
// //                           type="email"
// //                           placeholder="Email Address"
// //                           value={form.email}
// //                           onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                           required
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="login-pst" style={{ margin: 0 }}>
// //                       <div className="input-grp">
// //                         <input
// //                           type="password"
// //                           placeholder="Password"
// //                           value={form.password}
// //                           onChange={(e) => setForm({ ...form, password: e.target.value })}
// //                           required
// //                           minLength={6}
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="login-pst" style={{ margin: 0 }}>
// //                       <div className="input-grp">
// //                         <select
// //                           value={form.role}
// //                           onChange={(e) => setForm({ ...form, role: e.target.value })}
// //                           required
// //                           style={{ width: "100%", height: "42px", padding: "0 12px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", fontSize: "13px" }}
// //                         >
// //                           <option value="">Select Role</option>
// //                           {ROLES.map((r) => (
// //                             <option key={r.value} value={r.value}>{r.label}</option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     <input
// //                       type="submit"
// //                       value={formLoading ? "Creating..." : "Create"}
// //                       className="primary-cta"
// //                       disabled={formLoading}
// //                       style={{ margin: 0, height: "42px" }}
// //                     />

// //                   </div>

// //                   {formError   && <p style={{ color: "red",   marginTop: "10px", fontSize: "13px" }}>{formError}</p>}
// //                   {formSuccess && <p style={{ color: "green", marginTop: "10px", fontSize: "13px" }}>{formSuccess}</p>}
// //                 </form>
// //               </div>
// //             )}

// //             {/* ── Users table ── */}
// //             <div className="down-table">
// //               {error && (
// //                 <p style={{ color: "red", padding: "16px", fontSize: "13px" }}>{error}</p>
// //               )}

// //               {loading ? (
// //                 <p style={{ padding: "20px", fontSize: "13px", color: "#888" }}>Loading users...</p>
// //               ) : (
// //                 <table>
// //                   <thead>
// //                     <tr>
// //                       <th>#</th>
// //                       <th>Name</th>
// //                       <th>Email</th>
// //                       <th>Role</th>
// //                       <th>Created</th>
// //                       <th>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filtered.length === 0 ? (
// //                       <tr>
// //                         <td colSpan="6" style={{ textAlign: "center", padding: "24px", color: "#888" }}>
// //                           {search ? "No users match your search." : "No users found."}
// //                         </td>
// //                       </tr>
// //                     ) : (
// //                       filtered.map((user, index) => (
// //                         <tr key={user.id}>
// //                           <td>{index + 1}</td>
// //                           <td>{user.name}</td>
// //                           <td>{user.email}</td>
// //                           <td>
// //                             <span className={`status ${getRoleClass(user.role)}`}>
// //                               {ROLE_LABELS[user.role] || user.role}
// //                             </span>
// //                           </td>
// //                           <td>{formatDate(user.created_at)}</td>
// //                           <td>
// //                             <button
// //                               className="view-cta"
// //                               style={{ background: "#fee2e2", color: "#dc2626", borderColor: "#fca5a5" }}
// //                               onClick={() => handleDelete(user.id, user.name)}
// //                               disabled={deletingId === user.id}
// //                             >
// //                               {deletingId === user.id ? "Deleting..." : "Delete"}
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))
// //                     )}
// //                   </tbody>
// //                 </table>
// //               )}
// //             </div>

// //             {/* ── Summary ── */}
// //             {!loading && (
// //               <div style={{ marginTop: "12px", fontSize: "12px", color: "#888" }}>
// //                 Showing {filtered.length} of {users.length} users
// //               </div>
// //             )}

// //           </div>
// //         </main>
// //       </section>
// //     </>
// //   );
// // }

// // // ── Helpers ──────────────────────────────────────────────

// // function getRoleClass(role) {
// //   const map = {
// //     admin:          "completed",
// //     allocator:      "in-progress",
// //     verifier:       "qc-review",
// //     check_manager:  "in-progress",
// //     report_writing: "qc-review",
// //     pvt_qc:         "pending",
// //     client:         "completed",
// //     onboarding:     "pending",
// //   };
// //   return map[role] || "pending";
// // }

// // function formatDate(dateStr) {
// //   if (!dateStr) return "—";
// //   const d = new Date(dateStr);
// //   return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";
// // import { API_URL } from "../src/config";

// // const ROLES = [
// //   { value: "admin",                label: "Admin" },
// //   { value: "allocator",            label: "Allocator" },
// //   { value: "verifier",             label: "Verifier" },
// //   { value: "employment_verifier",  label: "Employment Verifier" },
// //   { value: "education_verifier",   label: "Education Verifier" },
// //   { value: "address_verifier",     label: "Address Verifier" },
// //   { value: "database_verifier",    label: "Database Verifier" },
// //   { value: "criminal_verifier",    label: "Criminal Verifier" },
// //   { value: "drug_test_verifier",   label: "Drug Test Verifier" },
// //   { value: "courtroom_verifier",   label: "Courtroom Verifier" },
// //   { value: "check_manager",        label: "Check Manager" },
// //   { value: "report_writing",       label: "Report Writing" },
// //   { value: "pvt_qc",               label: "PVT / QC" },
// //   { value: "client",               label: "Client" },
// //   { value: "onboarding",           label: "Onboarding" },
// // ];

// // const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.value, r.label]));

// // const ROLE_COLORS = {
// //   admin:               { bg: "#eef1fb", color: "#2b3b8c" },
// //   allocator:           { bg: "#f0fdfa", color: "#0d9488" },
// //   verifier:            { bg: "#fdf4ff", color: "#7c3aed" },
// //   employment_verifier: { bg: "#eff6ff", color: "#1d4ed8" },
// //   education_verifier:  { bg: "#f0fdf4", color: "#15803d" },
// //   address_verifier:    { bg: "#fff7ed", color: "#c2410c" },
// //   database_verifier:   { bg: "#f5f3ff", color: "#6d28d9" },
// //   criminal_verifier:   { bg: "#fef2f2", color: "#b91c1c" },
// //   drug_test_verifier:  { bg: "#ecfeff", color: "#0e7490" },
// //   courtroom_verifier:  { bg: "#fffbeb", color: "#a16207" },
// //   check_manager:       { bg: "#fff7ed", color: "#c2410c" },
// //   report_writing:      { bg: "#f0fdf4", color: "#16a34a" },
// //   pvt_qc:              { bg: "#fff5f5", color: "#eb4d4b" },
// //   client:              { bg: "#eff6ff", color: "#2563eb" },
// //   onboarding:          { bg: "#fefce8", color: "#ca8a04" },
// // };

// // export default function UserManagement() {
// //   const navigate = useNavigate();

// //   const [users, setUsers]     = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError]     = useState("");
// //   const [showForm, setShowForm] = useState(false);
// //   const [form, setForm]       = useState({ name: "", email: "", password: "", role: "" });
// //   const [formError, setFormError]     = useState("");
// //   const [formSuccess, setFormSuccess] = useState("");
// //   const [formLoading, setFormLoading] = useState(false);
// //   const [deletingId, setDeletingId]   = useState(null);
// //   const [search, setSearch]   = useState("");
// //   const [roleFilter, setRoleFilter] = useState("all");

// //   const token = localStorage.getItem("token");

// //   const fetchUsers = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await fetch(`${API_URL}/api/users`, {
// //         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //       });
// //       if (res.status === 401 || res.status === 403) {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         navigate("/");
// //         return;
// //       }
// //       const data = await res.json();
// //       setUsers(data.users || []);
// //     } catch {
// //       setError("Failed to load users. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchUsers(); }, []);

// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     if (formLoading) return;
// //     setFormError("");
// //     setFormSuccess("");
// //     if (!form.role) { setFormError("Please select a role."); return; }
// //     setFormLoading(true);
// //     try {
// //       const res = await fetch(`${API_URL}/api/users/create`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(form),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) { setFormError(data.message || "Failed to create user."); return; }
// //       setFormSuccess(`User "${data.user.name}" created successfully.`);
// //       setForm({ name: "", email: "", password: "", role: "" });
// //       fetchUsers();
// //       setTimeout(() => { setShowForm(false); setFormSuccess(""); }, 1500);
// //     } catch {
// //       setFormError("Server error. Please try again.");
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id, name) => {
// //     if (!window.confirm(`Delete "${name}"?`)) return;
// //     setDeletingId(id);
// //     try {
// //       const res = await fetch(`${API_URL}/api/users/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //       });
// //       const data = await res.json();
// //       if (!res.ok) { alert(data.message || "Failed to delete user."); return; }
// //       setUsers((prev) => prev.filter((u) => u.id !== id));
// //     } catch {
// //       alert("Server error. Please try again.");
// //     } finally {
// //       setDeletingId(null);
// //     }
// //   };

// //   const filtered = users.filter((u) => {
// //     const matchSearch =
// //       u.name.toLowerCase().includes(search.toLowerCase()) ||
// //       u.email.toLowerCase().includes(search.toLowerCase()) ||
// //       ROLE_LABELS[u.role]?.toLowerCase().includes(search.toLowerCase());
// //     const matchRole = roleFilter === "all" || u.role === roleFilter;
// //     return matchSearch && matchRole;
// //   });

// //   const roleCounts = Object.fromEntries(
// //     ROLES.map((r) => [r.value, users.filter((u) => u.role === r.value).length])
// //   );

// //   return (
// //     <>
// //       <Sidebar />
// //       <section id="content">
// //         <Header />
// //         <main>
// //           <div className="dash-wrper">

// //             {/* ── Page header ── */}
// //             <div className="dash-upper-head">
// //               <div className="left">
// //                 <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#2b3b8c" }}>
// //                   User Management
// //                 </h3>
// //               </div>
// //               <div className="right">
// //                 <input
// //                   type="text"
// //                   className="dash-search-input"
// //                   placeholder="Search name, email or role…"
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                 />
// //                 <button
// //                   className="primary-cta"
// //                   onClick={() => { setShowForm(!showForm); setFormError(""); setFormSuccess(""); }}
// //                 >
// //                   {showForm ? "✕ Cancel" : "+ Create User"}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* ── Stat cards ── */}
// //             <div className="cards-head-dash">
// //               <div className="card-inner-dash bdr-total">
// //                 <h4>{loading ? "—" : users.length}</h4>
// //                 <p>Total Users</p>
// //               </div>
// //               <div className="card-inner-dash bdr-progress">
// //                 <h4>{loading ? "—" : (roleCounts.verifier || 0)}</h4>
// //                 <p>Verifiers</p>
// //               </div>
// //               <div className="card-inner-dash bdr-com">
// //                 <h4>{loading ? "—" : (roleCounts.client || 0)}</h4>
// //                 <p>Clients</p>
// //               </div>
// //               <div className="card-inner-dash bdr-rate">
// //                 <h4>{loading ? "—" : (roleCounts.admin || 0)}</h4>
// //                 <p>Admins</p>
// //               </div>
// //             </div>

// //             {/* ── Create user form ── */}
// //             {showForm && (
// //               <div style={{ background: "#fff", border: "1px solid #e8ecf4", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "14px", borderBottom: "2px solid #f0f2f8" }}>
// //                   <span style={{ background: "#2b3b8c", color: "#fff", fontSize: "0.68rem", fontWeight: 800, width: "22px", height: "22px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</span>
// //                   <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2b3b8c", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
// //                     Create New User
// //                   </h3>
// //                 </div>

// //                 <form onSubmit={handleCreate}>
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: "14px", alignItems: "end" }}>

// //                     {[
// //                       { field: "name",     type: "text",     placeholder: "Full Name" },
// //                       { field: "email",    type: "email",    placeholder: "Email Address" },
// //                       { field: "password", type: "password", placeholder: "Password (min 6)" },
// //                     ].map(({ field, type, placeholder }) => (
// //                       <div key={field} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
// //                         <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
// //                           {placeholder}
// //                         </label>
// //                         <input
// //                           type={type}
// //                           placeholder={placeholder}
// //                           value={form[field]}
// //                           onChange={(e) => setForm({ ...form, [field]: e.target.value })}
// //                           required
// //                           minLength={field === "password" ? 6 : undefined}
// //                           style={{
// //                             padding: "10px 13px", border: "1.5px solid #e2e8f0",
// //                             borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
// //                             background: "#f8fafc", outline: "none", width: "100%", boxSizing: "border-box",
// //                           }}
// //                         />
// //                       </div>
// //                     ))}

// //                     <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
// //                       <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>Role</label>
// //                       <select
// //                         value={form.role}
// //                         onChange={(e) => setForm({ ...form, role: e.target.value })}
// //                         required
// //                         style={{
// //                           padding: "10px 13px", border: "1.5px solid #e2e8f0",
// //                           borderRadius: "8px", fontSize: "0.875rem", color: "#1e293b",
// //                           background: "#f8fafc", outline: "none", width: "100%",
// //                           appearance: "none", cursor: "pointer",
// //                         }}
// //                       >
// //                         <option value="">— Select Role —</option>
// //                         {ROLES.map((r) => (
// //                           <option key={r.value} value={r.value}>{r.label}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <button
// //                       type="submit"
// //                       className="primary-cta"
// //                       disabled={formLoading}
// //                       style={{ padding: "10px 20px", whiteSpace: "nowrap" }}
// //                     >
// //                       {formLoading ? "Creating…" : "Create User →"}
// //                     </button>
// //                   </div>

// //                   {formError   && <p style={{ color: "#eb4d4b", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>⚠ {formError}</p>}
// //                   {formSuccess && <p style={{ color: "#16a34a", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>✓ {formSuccess}</p>}
// //                 </form>
// //               </div>
// //             )}

// //             {/* ── Role filter tabs ── */}
// //             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
// //               <button
// //                 className={`tab-cta ${roleFilter === "all" ? "active" : ""}`}
// //                 onClick={() => setRoleFilter("all")}
// //               >
// //                 All
// //                 <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// //                   {users.length}
// //                 </span>
// //               </button>
// //               {ROLES.map((r) => roleCounts[r.value] > 0 && (
// //                 <button
// //                   key={r.value}
// //                   className={`tab-cta ${roleFilter === r.value ? "active" : ""}`}
// //                   onClick={() => setRoleFilter(r.value)}
// //                 >
// //                   {r.label}
// //                   <span style={{ marginLeft: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "8px", padding: "1px 6px", fontSize: "11px", fontWeight: 700 }}>
// //                     {roleCounts[r.value]}
// //                   </span>
// //                 </button>
// //               ))}
// //             </div>

// //             {/* ── Users table ── */}
// //             <div className="down-table">
// //               <div style={{ background: "var(--primary-color)", padding: "12px 16px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                 <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>
// //                   USERS ({filtered.length})
// //                 </h3>
// //                 {search && (
// //                   <span style={{ color: "#94a3b8", fontSize: "12px" }}>
// //                     Filtered by "{search}"
// //                   </span>
// //                 )}
// //               </div>

// //               {error && (
// //                 <p style={{ color: "#eb4d4b", padding: "16px", fontSize: "13px", fontWeight: 600 }}>⚠ {error}</p>
// //               )}

// //               {loading ? (
// //                 <p style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Loading users…</p>
// //               ) : (
// //                 <table>
// //                   <thead>
// //                     <tr>
// //                       <th>#</th>
// //                       <th>Name</th>
// //                       <th>Email</th>
// //                       <th>Role</th>
// //                       <th>Created</th>
// //                       <th>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filtered.length === 0 ? (
// //                       <tr>
// //                         <td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "14px" }}>
// //                           {search ? `No users match "${search}".` : "No users found."}
// //                         </td>
// //                       </tr>
// //                     ) : (
// //                       filtered.map((user, index) => {
// //                         const roleStyle = ROLE_COLORS[user.role] || { bg: "#f1f5f9", color: "#475569" };
// //                         return (
// //                           <tr key={user.id}>
// //                             <td style={{ color: "#94a3b8", fontSize: "13px" }}>{index + 1}</td>
// //                             <td>
// //                               <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "14px" }}>{user.name}</div>
// //                             </td>
// //                             <td style={{ color: "#475569", fontSize: "13px" }}>{user.email}</td>
// //                             <td>
// //                               <span style={{
// //                                 background: roleStyle.bg, color: roleStyle.color,
// //                                 fontSize: "11px", fontWeight: 700,
// //                                 padding: "4px 10px", borderRadius: "20px",
// //                                 display: "inline-block",
// //                               }}>
// //                                 {ROLE_LABELS[user.role] || user.role}
// //                               </span>
// //                             </td>
// //                             <td style={{ color: "#64748b", fontSize: "13px" }}>{formatDate(user.created_at)}</td>
// //                             <td>
// //                               <button
// //                                 onClick={() => handleDelete(user.id, user.name)}
// //                                 disabled={deletingId === user.id}
// //                                 style={{
// //                                   background: "#fff5f5", color: "#eb4d4b",
// //                                   border: "1px solid #fca5a5", borderRadius: "6px",
// //                                   padding: "5px 12px", fontSize: "12px", fontWeight: 600,
// //                                   cursor: "pointer", transition: "all 0.15s",
// //                                 }}
// //                               >
// //                                 {deletingId === user.id ? "Deleting…" : "Delete"}
// //                               </button>
// //                             </td>
// //                           </tr>
// //                         );
// //                       })
// //                     )}
// //                   </tbody>
// //                 </table>
// //               )}
// //             </div>

// //             {!loading && (
// //               <div style={{ marginTop: "10px", fontSize: "12px", color: "#94a3b8" }}>
// //                 Showing {filtered.length} of {users.length} users
// //               </div>
// //             )}

// //           </div>
// //         </main>
// //       </section>
// //     </>
// //   );
// // }

// // function formatDate(dateStr) {
// //   if (!dateStr) return "—";
// //   return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// // }


























// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";

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
//             {/* ... (Header, Stats, Form remain same as before) */}
            
//             {/* ── Users table ── */}
//             <div className="down-table">
//               <div style={{ background: "var(--primary-color)", padding: "12px 16px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>
//                   USERS ({filtered.length})
//                 </h3>
//               </div>

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
//                               <button onClick={() => handleDelete(user.id, user.name)} disabled={deletingId === user.id} style={{ background: "#fff5f5", color: "#eb4d4b", border: "1px solid #fca5a5", borderRadius: "6px", padding: "5px 12px", cursor: "pointer" }}>
//                                 {deletingId === user.id ? "Deleting…" : "Delete"}
//                               </button>
//                             </td>
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

const ROLES = [
  { value: "admin",               label: "Admin" },
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
      ROLE_LABELS[u.role]?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  const roleCounts = Object.fromEntries(
    ROLES.map((r) => [r.value, users.filter((u) => u.role === r.value).length])
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
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#2b3b8c" }}>
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
                        {ROLES.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
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
                        const roleStyle = ROLE_COLORS[user.role] || { bg: "#f1f5f9", color: "#475569" };
                        return (
                          <tr key={user.id}>
                            <td style={{ color: "#94a3b8", fontSize: "13px" }}>{indexOfFirstUser + index + 1}</td>
                            <td><div style={{ fontWeight: 600, fontSize: "14px" }}>{user.name}</div></td>
                            <td style={{ color: "#475569", fontSize: "13px" }}>{user.email}</td>
                            <td>
                              <span style={{ background: roleStyle.bg, color: roleStyle.color, fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
                                {ROLE_LABELS[user.role] || user.role}
                              </span>
                            </td>
                            <td style={{ color: "#64748b", fontSize: "13px" }}>{formatDate(user.created_at)}</td>
                            <td>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {/* Enable/Disable Toggle Switch */}
    <ToggleSwitch
      initialStatus={user.status === "active" || user.is_active || true}
      onChange={(status) => {
        console.log(`User ${user.id} status:`, status ? "Enabled" : "Disabled");
        // Yaha aapki API call aayegi (e.g. updateUserStatus(user.id, status))
      }}
    />

    {/* Delete Button (Bilkul Unchanged) */}
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
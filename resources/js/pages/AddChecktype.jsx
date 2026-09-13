import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

const FIELD_TYPES = [
  { key: "text",     label: "Text" },
  { key: "number",   label: "Number" },
  { key: "date",     label: "Date" },
  { key: "dropdown", label: "Dropdown" },
  { key: "checkbox", label: "Checkbox" },
  { key: "file",     label: "File Upload" },
];

function slugify(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);
}

function newFieldRow() {
  return {
    id: `f${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    label: "",
    type: "text",
    required: false,
    options: [],
  };
}

function getEmptyForm() {
  return {
    id: null,
    label: "",
    key: "",
    keyTouched: false,
    defaultRate: "",
    defaultWorkingDays: "",
    defaultCalendarDays: "",
    fields: [],
    isSystem: false,
  };
}

function getUser() {
  try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
}

export default function AddCheckType() {
  const navigate = useNavigate();
  const user = getUser();

  const [checkTypes, setCheckTypes] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState(getEmptyForm());
  const [saving, setSaving]         = useState(false);
  const [formError, setFormError]   = useState("");
  const [banner, setBanner]         = useState("");

  const isEditing = Boolean(form.id);

  const loadCheckTypes = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");
    return fetch(`${API_URL}/api/check-types/all`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => {
        if (!r.ok) throw new Error("Failed to load check types.");
        return r.json();
      })
      .then(data => setCheckTypes(data.checkTypes || []))
      .catch(err => setError(err.message || "Failed to load check types."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCheckTypes(); }, []);

  useEffect(() => {
    if (!banner) return;
    const t = setTimeout(() => setBanner(""), 3000);
    return () => clearTimeout(t);
  }, [banner]);

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const setLabel = (value) => {
    setForm(p => ({
      ...p,
      label: value,
      key: p.keyTouched || p.isSystem ? p.key : slugify(value),
    }));
  };

  const setKey = (value) => {
    setForm(p => ({ ...p, key: value.toLowerCase().replace(/[^a-z0-9_]/g, ""), keyTouched: true }));
  };

  const addField = () => setForm(p => ({ ...p, fields: [...p.fields, newFieldRow()] }));
  const removeField = (id) => setForm(p => ({ ...p, fields: p.fields.filter(f => f.id !== id) }));
  const updateField = (id, patch) => setForm(p => ({
    ...p,
    fields: p.fields.map(f => (f.id === id ? { ...f, ...patch } : f)),
  }));

  const startCreate = () => {
    setForm(getEmptyForm());
    setFormError("");
    setShowForm(true);
  };

  const startEdit = (ct) => {
    setForm({
      id: ct.id,
      label: ct.label,
      key: ct.key,
      keyTouched: true,
      defaultRate: ct.default_rate ?? "",
      defaultWorkingDays: ct.default_working_days ?? "",
      defaultCalendarDays: ct.default_calendar_days ?? "",
      fields: Array.isArray(ct.fields)
        ? ct.fields.map(f => ({ id: f.id || newFieldRow().id, label: f.label || "", type: f.type || "text", required: Boolean(f.required), options: Array.isArray(f.options) ? f.options : [] }))
        : [],
      isSystem: Boolean(ct.is_system),
    });
    setFormError("");
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setForm(getEmptyForm());
    setFormError("");
  };

  const toggleActive = async (ct) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/check-types/${ct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label: ct.label,
          key: ct.key,
          icon: ct.icon,
          default_rate: ct.default_rate,
          default_working_days: ct.default_working_days,
          default_calendar_days: ct.default_calendar_days,
          fields: ct.fields,
          is_active: !ct.is_active,
        }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      await loadCheckTypes();
      setBanner(`${ct.label} ${ct.is_active ? "deactivated" : "activated"}.`);
    } catch (err) {
      setError(err.message || "Failed to update status.");
    }
  };

  const deleteCheckType = async (ct) => {
    if (ct.is_system) return;
    if (!window.confirm(`Deactivate "${ct.label}"? Existing cases using it keep their history.`)) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/check-types/${ct.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to remove check type.");
      }
      await loadCheckTypes();
      setBanner(`${ct.label} removed.`);
    } catch (err) {
      setError(err.message || "Failed to remove check type.");
    }
  };

  const validateForm = () => {
    if (!form.label.trim()) return "Check name is required.";
    if (!form.key.trim()) return "Key is required.";
    for (const f of form.fields) {
      if (!f.label.trim()) return "Every field needs a label.";
      if (f.type === "dropdown" && f.options.filter(Boolean).length === 0) {
        return `Field "${f.label}" needs at least one dropdown option.`;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validateForm();
    if (err) { setFormError(err); return; }

    setFormError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const url    = isEditing ? `${API_URL}/api/check-types/${form.id}` : `${API_URL}/api/check-types`;
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        label: form.label,
        key: form.key,
        default_rate: Number(form.defaultRate) || 0,
        default_working_days: Number(form.defaultWorkingDays) || 0,
        default_calendar_days: Number(form.defaultCalendarDays) || 0,
        fields: form.fields.map(f => ({
          id: f.id,
          label: f.label,
          type: f.type,
          required: Boolean(f.required),
          options: f.type === "dropdown" ? f.options.filter(Boolean) : [],
        })),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message || "Failed to save check type.");
        return;
      }

      await loadCheckTypes();
      setBanner(isEditing ? "Check type updated." : "Check type created.");
      cancelForm();
    } catch {
      setFormError("Server error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (user.role !== "admin") {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <p style={{ color: "#dc2626", fontSize: "14px" }}>Only admins can manage check types.</p>
              </div>
            </div>
          </main>
        </section>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            <div className="dash-upper-head">
              <div className="left">
                <h2 className="ac-page-title">Check Types</h2>
              </div>
              <div className="right">
                {!showForm && (
                  <button className="primary-cta" onClick={startCreate}>+ New Check Type</button>
                )}
                <button className="secondary-cta import" onClick={() => navigate(-1)}>← Back</button>
              </div>
            </div>

            {banner && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px",
                padding: "12px 16px", color: "#166534", fontSize: "14px", margin: "12px 0" }}>
                {banner}
              </div>
            )}
            {error && (
              <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px",
                padding: "12px 16px", color: "#dc2626", fontSize: "14px", margin: "12px 0" }}>
                {error}
              </div>
            )}

            {/* ── Existing check types ── */}
            <div className="ac-card" style={{ marginBottom: "20px" }}>
              <div className="ac-card-header">
                <span className="ac-num">01</span>
                <h3>All Check Types</h3>
              </div>

              {loading ? (
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading…</p>
              ) : (
                <div className="ac-checks-table-container">
                  <table className="ac-checks-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                        <th style={{ textAlign: "left", padding: "10px" }}>Key</th>
                        <th style={{ textAlign: "left", padding: "10px" }}>Default Rate</th>
                        <th style={{ textAlign: "left", padding: "10px" }}>Default TAT</th>
                        <th style={{ textAlign: "left", padding: "10px" }}>Fields</th>
                        <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
                        <th style={{ textAlign: "right", padding: "10px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkTypes.map(ct => (
                        <tr key={ct.id} style={{ borderBottom: "1px solid #eaeaea" }}>
                          <td style={{ padding: "10px" }}>
                            {ct.label}{" "}
                            {ct.is_system && (
                              <span style={{ fontSize: "0.65rem", color: "#94a3b8", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1px 7px", marginLeft: "4px" }}>
                                built-in
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "10px", color: "#64748b", fontFamily: "monospace", fontSize: "0.8rem" }}>{ct.key}</td>
                          <td style={{ padding: "10px" }}>₹{Number(ct.default_rate || 0).toLocaleString()}</td>
                          <td style={{ padding: "10px" }}>{ct.default_working_days || 0}WD / {ct.default_calendar_days || 0}CD</td>
                          <td style={{ padding: "10px" }}>{Array.isArray(ct.fields) ? ct.fields.length : 0}</td>
                          <td style={{ padding: "10px" }}>
                            <span style={{ color: ct.is_active ? "#16a34a" : "#94a3b8", fontWeight: 600, fontSize: "0.8rem" }}>
                              {ct.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td style={{ padding: "10px", textAlign: "right", whiteSpace: "nowrap" }}>
                            <button className="ac-link-btn" onClick={() => startEdit(ct)}>Edit</button>
                            <span> · </span>
                            <button className="ac-link-btn" onClick={() => toggleActive(ct)}>
                              {ct.is_active ? "Deactivate" : "Activate"}
                            </button>
                            {!ct.is_system && (
                              <>
                                <span> · </span>
                                <button className="ac-link-btn" style={{ color: "#dc2626" }} onClick={() => deleteCheckType(ct)}>Remove</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── Create / edit form ── */}
            {showForm && (
              <div className="ac-card">
                <div className="ac-card-header">
                  <span className="ac-num">02</span>
                  <h3>{isEditing ? `Edit — ${form.label}` : "New Check Type"}</h3>
                </div>

                {formError && (
                  <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px",
                    padding: "10px 14px", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>
                    {formError}
                  </div>
                )}

                <div className="ac-fields" style={{ marginBottom: "20px" }}>
                  <div className="ac-field">
                    <label className="ac-label">Check Name <span className="ac-req">*</span></label>
                    <input className="ac-input" type="text" placeholder="e.g. Reference Check"
                      value={form.label} onChange={e => setLabel(e.target.value)} />
                  </div>

                  <div className="ac-field">
                    <label className="ac-label">
                      Key <span className="ac-req">*</span>{" "}
                      <span className="ac-optional">(used internally — letters, numbers, underscores)</span>
                    </label>
                    <input className="ac-input" type="text" placeholder="reference"
                      value={form.key} disabled={form.isSystem}
                      onChange={e => setKey(e.target.value)} />
                    {form.isSystem && (
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>Built-in key can't be changed.</span>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div className="ac-field">
                      <label className="ac-label">Default Rate (₹)</label>
                      <input className="ac-input" type="number" min="0" placeholder="0"
                        value={form.defaultRate} onChange={e => set("defaultRate", e.target.value)} />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">Default Working Days</label>
                      <input className="ac-input" type="number" min="0" placeholder="0"
                        value={form.defaultWorkingDays} onChange={e => set("defaultWorkingDays", e.target.value)} />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">Default Calendar Days</label>
                      <input className="ac-input" type="number" min="0" placeholder="0"
                        value={form.defaultCalendarDays} onChange={e => set("defaultCalendarDays", e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* ── Field builder ── */}
                <div className="ac-card-header" style={{ marginBottom: "12px" }}>
                  <h3 style={{ flex: 1 }}>Fields Collected For This Check</h3>
                  <button type="button" className="ac-link-btn" onClick={addField}>+ Add Field</button>
                </div>

                {form.fields.length === 0 && (
                  <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}>
                    No fields yet — add the pieces of info a verifier or candidate needs to fill in for this check.
                  </p>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {form.fields.map((f) => (
                    <div key={f.id} style={{ border: "1.5px solid #e2e8f0", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto auto", gap: "8px", alignItems: "center" }}>
                        <input className="ac-input" type="text" placeholder="Field label (e.g. Previous Employer)"
                          value={f.label} onChange={e => updateField(f.id, { label: e.target.value })} />
                        <select className="ac-input ac-select" value={f.type}
                          onChange={e => updateField(f.id, { type: e.target.value })}>
                          {FIELD_TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                        </select>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#475569", whiteSpace: "nowrap" }}>
                          <input type="checkbox" checked={f.required}
                            onChange={e => updateField(f.id, { required: e.target.checked })} />
                          Required
                        </label>
                        <button type="button" className="ac-link-btn" style={{ color: "#dc2626" }}
                          onClick={() => removeField(f.id)}>Remove</button>
                      </div>
                      {f.type === "dropdown" && (
                        <input className="ac-input" type="text" placeholder="Options, comma-separated (e.g. Yes, No, N/A)"
                          value={f.options.join(", ")}
                          onChange={e => updateField(f.id, { options: e.target.value.split(",").map(o => o.trim()) })} />
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="primary-cta" onClick={handleSubmit} disabled={saving}>
                    {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Check Type"}
                  </button>
                  <button className="secondary-cta import" onClick={cancelForm}>Cancel</button>
                </div>
              </div>
            )}

          </div>
        </main>
      </section>
      <style>{sharedStyles}</style>
    </>
  );
}

const sharedStyles = `
  .ac-page-title { font-size: 1.25rem; font-weight: 700; color: #2b3b8c; margin: 0; }
  .ac-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 22px; }
  .ac-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #f0f2f8; flex-wrap: wrap; }
  .ac-card-header h3 { font-size: 0.82rem; font-weight: 700; color: #2b3b8c; letter-spacing: 0.06em; text-transform: uppercase; margin: 0; flex: 1; }
  .ac-num { background: #2b3b8c; color: #fff; font-size: 0.68rem; font-weight: 800; width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ac-fields { display: flex; flex-direction: column; gap: 14px; }
  .ac-field { display: flex; flex-direction: column; gap: 5px; }
  .ac-label { font-size: 0.78rem; font-weight: 600; color: #475569; }
  .ac-req { color: #eb4d4b; margin-left: 2px; }
  .ac-optional { color: #94a3b8; font-weight: 400; }
  .ac-input { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
  .ac-input:focus { border-color: #2b3b8c; background: #fff; }
  .ac-input:disabled { background: #eef1fb; color: #475569; cursor: default; opacity: 1; }
  .ac-select { appearance: none; cursor: pointer; }
  .ac-checks-table-container { overflow-x: auto; }
  .ac-checks-table thead th { border-bottom: 2px solid #f0f2f8; font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
  .ac-link-btn { background: none; border: none; color: #2b3b8c; font-size: 0.78rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; }
`;
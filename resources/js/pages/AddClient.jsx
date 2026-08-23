
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

const DEFAULT_CHECK_RATES = {
  employment: 0, education: 0, address: 0,
  database: 0, criminal: 0, drug: 0, court: 0,
};

const DEFAULT_CHECK_TAT = {
  employment: 0, education: 0, address: 0,
  database: 0, criminal: 0, drug: 0, court: 0,
};

const CHECK_TYPES = [
  { key: "employment", label: "Employment" },
  { key: "education", label: "Education" },
  { key: "address", label: "Address" },
  { key: "database", label: "Database" },
  { key: "criminal", label: "Criminal" },
  { key: "drug", label: "Drug Test" },
  { key: "court", label: "Courtroom" },
];

const BILLING_MODES = [
  { key: "prepaid_client", label: "Prepaid — Client", desc: "Client pays upfront. Case created immediately.", color: "#2b3b8c" },
  { key: "prepaid_candidate", label: "Prepaid — Candidate", desc: "Candidate pays via payment link before or after docs.", color: "#0d9488" },
  { key: "postpaid_client", label: "Postpaid — Client", desc: "Case created now. Client invoiced at month end.", color: "#7c3aed" },
];

function getTatIndicator(days) {
  if (days <= 1) return { color: "#2ecc71", label: `${days} Day` };
  if (days <= 3) return { color: "#f1c40f", label: `${days} Days` };
  return { color: "#e74c3c", label: `${days} Days` };
}

function getEmptyForm() {
  return {
    clientName: "",
    address: "",
    gstin: "",
    contactName: "",
    contactPhone: "",
    email: "",
    password: "",
    billingMode: "",
    checks: [],
    notes: "",
    agreementStartDate: "",
    agreementEndDate: "",
  };
}

function clientToForm(c, fallback) {
  return {
    ...fallback,
    clientName: c.company_name || c.companyName || fallback.clientName,
    address: c.address || fallback.address,
    gstin: c.gstin || fallback.gstin,
    contactName: c.primary_contact || c.primaryContact || fallback.contactName,
    contactPhone: c.contact_phone || c.contactPhone || fallback.contactPhone,
    email: c.contact_email || c.contactEmail || c.email || fallback.email,
    billingMode: c.billing_mode || c.billingMode || fallback.billingMode,
    checks: Array.isArray(c.agreed_checks)
      ? c.agreed_checks
      : Array.isArray(c.agreedChecks)
        ? c.agreedChecks
        : fallback.checks,
    notes: c.notes || fallback.notes,
    agreementStartDate: c.agreement_start_date || c.agreementStartDate || fallback.agreementStartDate,
    agreementEndDate: c.agreement_end_date || c.agreementEndDate || fallback.agreementEndDate,
  };
}

export default function AddClient() {
  const navigate = useNavigate();
  const location = useLocation();

  const registrationId = new URLSearchParams(location.search).get("registrationId");
  const [fetchingReg, setFetchingReg] = useState(Boolean(registrationId));

  const editClientId = new URLSearchParams(location.search).get("editClientId");
  const isEditMode = Boolean(editClientId);
  const isViewMode = isEditMode && new URLSearchParams(location.search).get("mode") === "view";

  const [fetchingClient, setFetchingClient] = useState(isEditMode);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(getEmptyForm());
  const [rates, setRates] = useState({ ...DEFAULT_CHECK_RATES });
  const [tats, setTats] = useState({ ...DEFAULT_CHECK_TAT });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientId, setClientId] = useState(null);
  const [sharePassword, setSharePassword] = useState("");
  const [agreementFile, setAgreementFile] = useState(null);
  const [existingAgreementUrl, setExistingAgreementUrl] = useState("");

  useEffect(() => {
    if (!registrationId) return;
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/client-registrations/${registrationId}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const reg = data.registration;
        if (!reg) return;
        setForm((p) => ({
          ...p,
          clientName: reg.company_name || "",
          address: reg.address || "",
          gstin: reg.gstin || "",
          contactName: reg.primary_contact || "",
          contactPhone: reg.contact_phone || "",
          email: reg.contact_email || "",
          billingMode: reg.billing_mode || "",
          checks: reg.agreed_checks || [],
        }));
      })
      .finally(() => setFetchingReg(false));
  }, [registrationId]);

  useEffect(() => {
    if (!editClientId) return;
    let cancelled = false;
    const token = localStorage.getItem("token");
    setFetchingClient(true);
    setLoadError("");
    fetch(`${API_URL}/api/clients/${encodeURIComponent(editClientId)}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error(
            r.status === 404 ? "This client could not be found." : "Failed to load client details."
          );
        }
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const c = data.client || data;
        setForm((prev) => clientToForm(c, prev));
        if (c.check_rates && typeof c.check_rates === "object") {
          setRates((prev) => ({ ...prev, ...c.check_rates }));
        }
        if (c.check_tat && typeof c.check_tat === "object") {
          setTats((prev) => ({ ...prev, ...c.check_tat }));
        }
        if (c.agreement_url || c.agreementUrl) {
          setExistingAgreementUrl(c.agreement_url || c.agreementUrl);
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || "Failed to load client details.");
      })
      .finally(() => {
        if (!cancelled) setFetchingClient(false);
      });
    return () => {
      cancelled = true;
    };
  }, [editClientId]);

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const setRate = (key, value) => {
    const num = Number(value);
    setRates((p) => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
  };

  const setTat = (key, value) => {
    const num = Number(value);
    setTats((p) => ({ ...p, [key]: Number.isFinite(num) && num >= 0 ? num : 0 }));
  };

  const toggleCheck = (key) => {
    if (isViewMode) return;
    setForm((p) => ({
      ...p,
      checks: p.checks.includes(key) ? p.checks.filter((c) => c !== key) : [...p.checks, key],
    }));
  };

  const selectAll = () => setForm((p) => ({ ...p, checks: CHECK_TYPES.map((c) => c.key) }));
  const clearAll = () => setForm((p) => ({ ...p, checks: [] }));

  const handleAgreementFileChange = (e) => {
    setAgreementFile(e.target.files?.[0] || null);
  };

  const totalAmount = form.checks.reduce((s, k) => s + (rates[k] || 0), 0);
  const overallTat =
    form.checks.length > 0 ? Math.max(...form.checks.map((k) => tats[k] || 0)) : 0;
  const activeBilling = BILLING_MODES.find((b) => b.key === form.billingMode);

  const validate = () => {
    if (!form.clientName.trim()) return "Client name is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.gstin.trim()) return "GST number is required.";
    if (!form.contactName.trim()) return "Contact person name is required.";
    if (!form.contactPhone.trim()) return "Contact person number is required.";
    if (!form.email.trim()) return "Email address is required.";
    if (!isEditMode && !/^\d{8}$/.test(form.password)) return "Password must be exactly 8 digits.";
    if (!form.billingMode) return "Please select a billing mode.";
    if (form.checks.length === 0) return "Select at least one check type.";
    if (
      form.agreementStartDate &&
      form.agreementEndDate &&
      form.agreementEndDate < form.agreementStartDate
    ) {
      return "Agreement end date can't be before the start date.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = isEditMode
        ? `${API_URL}/api/clients/${encodeURIComponent(editClientId)}`
        : `${API_URL}/api/clients/register`;
      const method = isEditMode ? "PUT" : "POST";

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      let body;

      if (agreementFile) {
        // Multipart when uploading agreement PDF/file — do NOT set Content-Type
        const fd = new FormData();
        fd.append("company_name", form.clientName.trim());
        fd.append("companyName", form.clientName.trim());
        fd.append("address", form.address.trim());
        fd.append("gstin", form.gstin.trim());
        fd.append("primary_contact", form.contactName.trim());
        fd.append("primaryContact", form.contactName.trim());
        fd.append("contact_phone", form.contactPhone.trim());
        fd.append("contactPhone", form.contactPhone.trim());
        fd.append("contact_email", form.email.trim());
        fd.append("contactEmail", form.email.trim());
        fd.append("billing_mode", form.billingMode);
        fd.append("billingMode", form.billingMode);
        fd.append("agreed_checks", JSON.stringify(form.checks));
        fd.append("agreedChecks", JSON.stringify(form.checks));
        fd.append("check_rates", JSON.stringify(rates));
        fd.append("checkRates", JSON.stringify(rates));
        fd.append("check_tat", JSON.stringify(tats));
        fd.append("checkTat", JSON.stringify(tats));
        fd.append("notes", form.notes || "");
        if (!isEditMode) fd.append("password", form.password);
        if (registrationId) {
          fd.append("registration_id", registrationId);
          fd.append("registrationId", registrationId);
        }
        if (form.agreementStartDate) {
          fd.append("agreement_start_date", form.agreementStartDate);
          fd.append("agreementStartDate", form.agreementStartDate);
        }
        if (form.agreementEndDate) {
          fd.append("agreement_end_date", form.agreementEndDate);
          fd.append("agreementEndDate", form.agreementEndDate);
        }
        fd.append("agreement", agreementFile);
        fd.append("agreement_file", agreementFile);
        body = fd;
      } else {
        headers["Content-Type"] = "application/json";
        const payload = {
          company_name: form.clientName.trim(),
          companyName: form.clientName.trim(),
          address: form.address.trim(),
          gstin: form.gstin.trim(),
          primary_contact: form.contactName.trim(),
          primaryContact: form.contactName.trim(),
          contact_phone: form.contactPhone.trim(),
          contactPhone: form.contactPhone.trim(),
          contact_email: form.email.trim(),
          contactEmail: form.email.trim(),
          billing_mode: form.billingMode,
          billingMode: form.billingMode,
          agreed_checks: form.checks,
          agreedChecks: form.checks,
          check_rates: rates,
          checkRates: rates,
          check_tat: tats,
          checkTat: tats,
          notes: form.notes || "",
        };
        if (!isEditMode) payload.password = form.password;
        if (registrationId) {
          payload.registration_id = registrationId;
          payload.registrationId = registrationId;
        }
        if (form.agreementStartDate) {
          payload.agreement_start_date = form.agreementStartDate;
          payload.agreementStartDate = form.agreementStartDate;
        }
        if (form.agreementEndDate) {
          payload.agreement_end_date = form.agreementEndDate;
          payload.agreementEndDate = form.agreementEndDate;
        }
        body = JSON.stringify(payload);
      }

      const res = await fetch(url, { method, headers, body });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors && typeof data.errors === "object") {
          const first = Object.values(data.errors).flat()[0];
          setError(first || data.message || "Validation failed.");
        } else {
          setError(
            data.message ||
              (isEditMode ? "Failed to update client." : "Failed to register client.")
          );
        }
        return;
      }

      setClientId(isEditMode ? editClientId : data.user?.id ?? data.client?.id ?? null);
      if (!isEditMode) setSharePassword(form.password);
      setSubmitted(true);
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(getEmptyForm());
    setRates({ ...DEFAULT_CHECK_RATES });
    setTats({ ...DEFAULT_CHECK_TAT });
    setAgreementFile(null);
    setExistingAgreementUrl("");
    setSharePassword("");
    setSubmitted(false);
    setClientId(null);
    setError("");
  };

  if (isEditMode && fetchingClient) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>Loading client details…</p>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
      </>
    );
  }

  if (isEditMode && loadError) {
    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <p style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>{loadError}</p>
                <button className="primary-cta" onClick={() => navigate("/AllClients")}>
                  ← Back to Clients
                </button>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
      </>
    );
  }

  if (submitted) {
    const loginUrl = `${window.location.origin}/login`;
    const canShareCredentials = !isEditMode && Boolean(sharePassword);
    const shareText = canShareCredentials
      ? [
          "Your AuthBridge client account is ready.",
          "",
          `Login URL: ${loginUrl}`,
          `Email: ${form.email}`,
          `Password: ${sharePassword}`,
          "",
          "Please log in and change your password after first sign-in.",
        ].join("\n")
      : "";

    const copyShareDetails = async () => {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Login details copied to clipboard.");
      } catch {
        alert("Could not copy. Please copy the details manually.");
      }
    };

    return (
      <>
        <Sidebar />
        <section id="content">
          <Header />
          <main>
            <div className="dash-wrper">
              <div className="ac-success-wrap">
                <div className="ac-success-card">
                  <div className="ac-success-icon">✓</div>
                  <h2 className="ac-success-title">
                    {isEditMode ? "Client Updated" : "Client Registered"}
                  </h2>
                  {clientId && <p className="ac-success-id">Client #{clientId}</p>}

                  <div className="ac-success-meta">
                    <div className="ac-success-meta-row">
                      <span>Client Name</span><strong>{form.clientName}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>GSTIN</span><strong>{form.gstin}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Contact</span><strong>{form.contactName}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Billing</span>
                      <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
                    </div>
                    <div className="ac-success-meta-row">
                      <span>Estimated TAT</span>
                      <strong>
                        {overallTat > 0 ? `${overallTat} day${overallTat > 1 ? "s" : ""}` : "—"}
                      </strong>
                    </div>
                    {(form.agreementStartDate || form.agreementEndDate) && (
                      <div className="ac-success-meta-row">
                        <span>Agreement Period</span>
                        <strong>
                          {form.agreementStartDate || "—"} → {form.agreementEndDate || "—"}
                        </strong>
                      </div>
                    )}
                  </div>

                  {canShareCredentials && (
                    <div
                      style={{
                        textAlign: "left",
                        background: "#f0fdf4",
                        border: "1px solid #86efac",
                        borderRadius: "12px",
                        padding: "16px 18px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#166534",
                          marginBottom: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Share with client — login details
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#14532d", lineHeight: 1.7 }}>
                        <div>
                          <span style={{ color: "#64748b" }}>Login URL: </span>
                          <strong>{loginUrl}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b" }}>Email: </span>
                          <strong>{form.email}</strong>
                        </div>
                        <div>
                          <span style={{ color: "#64748b" }}>Password: </span>
                          <strong style={{ fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em" }}>
                            {sharePassword}
                          </strong>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "10px 0 12px" }}>
                        Send these details to the client so they can log in and raise cases.
                        Password is shown only once here.
                      </p>
                      <button
                        type="button"
                        className="primary-cta"
                        onClick={copyShareDetails}
                        style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}
                      >
                        Copy login details
                      </button>
                    </div>
                  )}

                  <div className="ac-success-checks">
                    {form.checks.map((c) => (
                      <span key={c} className="ac-check-badge">
                        {CHECK_TYPES.find((t) => t.key === c)?.label}
                      </span>
                    ))}
                  </div>

                  <div className="ac-success-actions">
                    <button className="primary-cta" onClick={() => navigate("/AllClients")}>
                      View All Clients
                    </button>
                    {!isEditMode && (
                      <button className="secondary-cta import" onClick={handleReset}>
                        Add Another
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <style>{sharedStyles}</style>
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
                <h2 className="ac-page-title">
                  {isViewMode
                    ? `View Client — ${editClientId}`
                    : isEditMode
                      ? `Edit Client — ${editClientId}`
                      : "Add Client"}
                </h2>
              </div>
              <div className="right">
                {isViewMode && (
                  <button
                    className="secondary-cta import"
                    onClick={() =>
                      navigate(`/AddClient?editClientId=${encodeURIComponent(editClientId)}`)
                    }
                  >
                    Edit
                  </button>
                )}
                <button className="secondary-cta import" onClick={() => navigate("/AllClients")}>
                  ← All Clients
                </button>
              </div>
            </div>

            {isEditMode && !isViewMode && (
              <div
                style={{
                  background: "#eef3ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#2b3b8c",
                  fontSize: "14px",
                  margin: "12px 0",
                }}
              >
                Editing client <strong>{editClientId}</strong>. Your changes will be saved to this client.
              </div>
            )}

            {isViewMode && (
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#475569",
                  fontSize: "14px",
                  margin: "12px 0",
                }}
              >
                Viewing client <strong>{editClientId}</strong> in read-only mode. Click Edit to make changes.
              </div>
            )}

            {registrationId && !fetchingReg && (
              <div
                style={{
                  background: "#eef3ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#2b3b8c",
                  fontSize: "14px",
                  margin: "12px 0",
                }}
              >
                Reviewing a client self-registration. Company details are pre-filled — set a password
                and confirm billing/checks/TAT below to approve.
              </div>
            )}

            {error && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1px solid #fca5a5",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#dc2626",
                  fontSize: "14px",
                  margin: "12px 0",
                }}
              >
                {error}
              </div>
            )}

            <div className="ac-layout">
              {/* LEFT */}
              <div className="ac-left">
                {/* 01 Client Information */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">01</span>
                    <h3>Client Information</h3>
                  </div>
                  <div className="ac-fields">
                    <div className="ac-field">
                      <label className="ac-label">
                        Client Name <span className="ac-req">*</span>
                      </label>
                      <input
                        className="ac-input"
                        type="text"
                        placeholder="Company / Client name"
                        disabled={isViewMode}
                        value={form.clientName}
                        onChange={(e) => set("clientName", e.target.value)}
                      />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">
                        Address <span className="ac-req">*</span>
                      </label>
                      <textarea
                        className="ac-textarea"
                        rows={2}
                        placeholder="Registered office address"
                        disabled={isViewMode}
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                      />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">
                        GST Number <span className="ac-req">*</span>
                      </label>
                      <input
                        className="ac-input"
                        type="text"
                        placeholder="e.g. 07ABCDE1234F1Z5"
                        maxLength={15}
                        disabled={isViewMode}
                        value={form.gstin}
                        onChange={(e) => set("gstin", e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">
                        Contact Person Name <span className="ac-req">*</span>
                      </label>
                      <input
                        className="ac-input"
                        type="text"
                        placeholder="Full name"
                        disabled={isViewMode}
                        value={form.contactName}
                        onChange={(e) => set("contactName", e.target.value)}
                      />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">
                        Contact Person Number <span className="ac-req">*</span>
                      </label>
                      <input
                        className="ac-input"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        disabled={isViewMode}
                        value={form.contactPhone}
                        onChange={(e) =>
                          set("contactPhone", e.target.value.replace(/\D/g, "").slice(0, 12))
                        }
                      />
                    </div>
                    <div className="ac-field">
                      <label className="ac-label">
                        Email Address <span className="ac-req">*</span>
                      </label>
                      <input
                        className="ac-input"
                        type="email"
                        placeholder="client@company.com"
                        disabled={isViewMode}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    {!isEditMode && (
                      <div className="ac-field">
                        <label className="ac-label">
                          Password (8 digits) <span className="ac-req">*</span>
                        </label>
                        <input
                          className="ac-input"
                          type="password"
                          placeholder="••••••••"
                          maxLength={8}
                          inputMode="numeric"
                          pattern="[0-9]{8}"
                          value={form.password}
                          onChange={(e) =>
                            set("password", e.target.value.replace(/\D/g, "").slice(0, 8))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 02 Billing Mode */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">02</span>
                    <h3>
                      Billing Mode <span className="ac-req">*</span>
                    </h3>
                  </div>
                  <div className="ac-billing-grid">
                    {BILLING_MODES.map((mode) => {
                      const active = form.billingMode === mode.key;
                      return (
                        <button
                          key={mode.key}
                          type="button"
                          disabled={isViewMode}
                          className={`ac-billing-tile ${active ? "ac-billing-active" : ""}`}
                          style={
                            active
                              ? { borderColor: mode.color, background: `${mode.color}10` }
                              : {}
                          }
                          onClick={() => set("billingMode", mode.key)}
                        >
                          <div className="ac-billing-tile-top">
                            <span
                              className="ac-billing-dot"
                              style={{ background: active ? mode.color : "#cbd5e1" }}
                            />
                            <span
                              className="ac-billing-label"
                              style={active ? { color: mode.color } : {}}
                            >
                              {mode.label}
                            </span>
                          </div>
                          <p className="ac-billing-desc">{mode.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                  {form.billingMode === "prepaid_client" && (
                    <div className="ac-billing-section">
                      <div className="ac-billing-info-row">
                        <span className="ac-billing-info-icon">ℹ</span>
                        <span>Client will prepay a balance which future cases are deducted from.</span>
                      </div>
                    </div>
                  )}
                  {form.billingMode === "prepaid_candidate" && (
                    <div className="ac-billing-section">
                      <div className="ac-billing-info-row">
                        <span className="ac-billing-info-icon">ℹ</span>
                        <span>
                          Candidates will pay directly via payment link for cases raised by this client.
                        </span>
                      </div>
                    </div>
                  )}
                  {form.billingMode === "postpaid_client" && (
                    <div className="ac-billing-section">
                      <div className="ac-billing-info-row">
                        <span className="ac-billing-info-icon">ℹ</span>
                        <span>Client will be invoiced periodically for cases raised.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 05 Agreement — dates + upload */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">05</span>
                    <h3>Agreement</h3>
                  </div>
                  <div className="ac-fields">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div className="ac-field">
                        <label className="ac-label">Start Date</label>
                        <input
                          className="ac-input"
                          type="date"
                          disabled={isViewMode}
                          value={form.agreementStartDate}
                          onChange={(e) => set("agreementStartDate", e.target.value)}
                        />
                      </div>
                      <div className="ac-field">
                        <label className="ac-label">End Date</label>
                        <input
                          className="ac-input"
                          type="date"
                          disabled={isViewMode}
                          value={form.agreementEndDate}
                          onChange={(e) => set("agreementEndDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="ac-field">
                      <label className="ac-label">Agreement Document</label>
                      {isViewMode ? (
                        existingAgreementUrl ? (
                          <a
                            href={existingAgreementUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "0.875rem", color: "#2b3b8c", fontWeight: 600 }}
                          >
                            View uploaded agreement →
                          </a>
                        ) : (
                          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>No file uploaded</span>
                        )
                      ) : (
                        <>
                          <input
                            className="ac-input"
                            type="file"
                            accept=".pdf,.doc,.docx,image/*"
                            onChange={handleAgreementFileChange}
                          />
                          {agreementFile && (
                            <span style={{ fontSize: "0.78rem", color: "#0d9488", marginTop: "4px" }}>
                              Selected: {agreementFile.name}
                            </span>
                          )}
                          {!agreementFile && existingAgreementUrl && (
                            <a
                              href={existingAgreementUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "0.78rem",
                                color: "#2b3b8c",
                                marginTop: "4px",
                                display: "inline-block",
                              }}
                            >
                              Current file on record →
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="ac-right">
                {/* 03 Check Types */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">03</span>
                    <h3>
                      Check Types <span className="ac-req">*</span>
                    </h3>
                    {!isViewMode && (
                      <div className="ac-check-ctrl">
                        <button type="button" className="ac-link-btn" onClick={selectAll}>
                          All
                        </button>
                        <span>·</span>
                        <button type="button" className="ac-link-btn" onClick={clearAll}>
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="ac-checks-table-container">
                    <table
                      className="ac-checks-table"
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "12px" }}>Check Type</th>
                          <th style={{ textAlign: "left", padding: "12px" }}>Amount</th>
                          <th style={{ textAlign: "left", padding: "12px" }}>TAT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CHECK_TYPES.map((ct) => {
                          const active = form.checks.includes(ct.key);
                          const tatValue = Number(tats[ct.key]) || 0;
                          const tatDetails = getTatIndicator(tatValue);
                          return (
                            <tr
                              key={ct.key}
                              className={active ? "ac-check-active" : ""}
                              style={{
                                borderBottom: "1px solid #eaeaea",
                                cursor: isViewMode ? "default" : "pointer",
                              }}
                              onClick={() => toggleCheck(ct.key)}
                            >
                              <td
                                style={{
                                  padding: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <span className="ac-check-dot" />
                                <span>{ct.label}</span>
                              </td>
                              <td style={{ padding: "12px" }} onClick={(e) => e.stopPropagation()}>
                                {isViewMode ? (
                                  <div className="ac-check-rate-display">
                                    <span className="ac-rate-prefix">₹</span>
                                    <span className="ac-rate-value">{rates[ct.key] || "—"}</span>
                                  </div>
                                ) : (
                                  <div className="ac-check-rate-edit">
                                    <span className="ac-rate-prefix">₹</span>
                                    <input
                                      type="number"
                                      min="0"
                                      className="ac-rate-input"
                                      value={rates[ct.key] || ""}
                                      placeholder="0"
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => setRate(ct.key, e.target.value)}
                                    />
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: "12px" }} onClick={(e) => e.stopPropagation()}>
                                {isViewMode ? (
                                  <div
                                    className="ac-check-rate-display"
                                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                                  >
                                    <span
                                      style={{
                                        height: "10px",
                                        width: "10px",
                                        backgroundColor: tatDetails.color,
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                    />
                                    <span className="ac-rate-value">{tats[ct.key] || "—"}</span>
                                    <span className="ac-rate-suffix">days</span>
                                  </div>
                                ) : (
                                  <div
                                    className="ac-check-rate-edit"
                                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                                  >
                                    <span
                                      style={{
                                        height: "10px",
                                        width: "10px",
                                        backgroundColor: tatDetails.color,
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                    />
                                    <input
                                      type="number"
                                      min="0"
                                      className="ac-rate-input ac-tat-input"
                                      value={tats[ct.key] || ""}
                                      placeholder="0"
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => setTat(ct.key, e.target.value)}
                                      style={{ width: "60px" }}
                                    />
                                    <span className="ac-rate-suffix">days</span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="ac-amount-bar">
                    <span>
                      {form.checks.length} of {CHECK_TYPES.length} selected
                    </span>
                    <span className="ac-tat-bar-item">
                      Est. TAT:{" "}
                      <strong>
                        {overallTat > 0 ? `${overallTat} day${overallTat > 1 ? "s" : ""}` : "—"}
                      </strong>
                    </span>
                    <span className="ac-total-amt">Total: ₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* 04 Internal Notes */}
                <div className="ac-card">
                  <div className="ac-card-header">
                    <span className="ac-num">04</span>
                    <h3>Internal Notes</h3>
                  </div>
                  <textarea
                    className="ac-textarea"
                    rows={4}
                    disabled={isViewMode}
                    placeholder="Special instructions / notes about this client..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </div>

                {form.billingMode && form.checks.length > 0 && (
                  <div
                    className="ac-summary-strip"
                    style={{
                      borderColor: activeBilling?.color,
                      background: `${activeBilling?.color}0d`,
                    }}
                  >
                    <div className="ac-summary-row">
                      <span>Billing</span>
                      <strong style={{ color: activeBilling?.color }}>{activeBilling?.label}</strong>
                    </div>
                    <div className="ac-summary-row">
                      <span>Checks</span>
                      <strong>{form.checks.length} selected</strong>
                    </div>
                    <div className="ac-summary-row">
                      <span>Estimated TAT</span>
                      <strong>
                        {overallTat > 0 ? `${overallTat} day${overallTat > 1 ? "s" : ""}` : "—"}
                      </strong>
                    </div>
                    <div className="ac-summary-row">
                      <span>Total Rate</span>
                      <strong>₹{totalAmount.toLocaleString()}</strong>
                    </div>
                    {(form.agreementStartDate || form.agreementEndDate) && (
                      <div className="ac-summary-row">
                        <span>Agreement</span>
                        <strong>
                          {form.agreementStartDate || "—"} → {form.agreementEndDate || "—"}
                        </strong>
                      </div>
                    )}
                  </div>
                )}

                {!isViewMode && (
                  <button
                    className="primary-cta ac-submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading
                      ? isEditMode
                        ? "Saving Changes..."
                        : "Registering Client..."
                      : isEditMode
                        ? "Save Changes"
                        : "Add Client →"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
      <style>{sharedStyles}</style>
    </>
  );
}

const sharedStyles = `
  .ac-page-title { font-size: 1.25rem; font-weight: 700; color: #2b3b8c; margin: 0; }
  .ac-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 0px; }
  @media (max-width: 960px) { .ac-layout { grid-template-columns: 1fr; } }
  .ac-left, .ac-right { display: flex; flex-direction: column; gap: 20px; }
  .ac-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 12px; padding: 22px; }
  .ac-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 2px solid #f0f2f8; flex-wrap: wrap; }
  .ac-card-header h3 { font-size: 0.82rem; font-weight: 700; color: #2b3b8c; letter-spacing: 0.06em; text-transform: uppercase; margin: 0; flex: 1; }
  .ac-num { background: #2b3b8c; color: #fff; font-size: 0.68rem; font-weight: 800; width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ac-fields { display: flex; flex-direction: column; gap: 14px; }
  .ac-field { display: flex; flex-direction: column; gap: 5px; }
  .ac-label { font-size: 0.78rem; font-weight: 600; color: #475569; }
  .ac-req { color: #eb4d4b; margin-left: 2px; }
  .ac-input { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; transition: border-color 0.18s; box-sizing: border-box; }
  .ac-input:focus { border-color: #2b3b8c; background: #fff; }
  .ac-input:disabled { background: #eef1fb; color: #475569; cursor: default; opacity: 1; }
  .ac-billing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
  @media (max-width: 700px) { .ac-billing-grid { grid-template-columns: 1fr; } }
  .ac-billing-tile { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: #f8fafc; cursor: pointer; text-align: left; transition: all 0.18s; }
  .ac-billing-tile:disabled { cursor: default; opacity: 0.85; }
  .ac-billing-active { box-shadow: 0 0 0 2px currentColor; }
  .ac-billing-tile-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .ac-billing-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .ac-billing-label { font-size: 0.78rem; font-weight: 700; color: #334155; }
  .ac-billing-desc { font-size: 0.7rem; color: #94a3b8; margin: 0; line-height: 1.4; }
  .ac-billing-section { border-top: 1px dashed #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 14px; }
  .ac-billing-info-row { display: flex; align-items: flex-start; gap: 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; color: #0369a1; }
  .ac-billing-info-icon { font-style: normal; font-weight: 700; flex-shrink: 0; }
  .ac-check-ctrl { display: flex; gap: 6px; align-items: center; font-size: 0.75rem; color: #94a3b8; }
  .ac-link-btn { background: none; border: none; color: #2b3b8c; font-size: 0.75rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; }
  .ac-checks-table-container { border: 1.5px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
  .ac-checks-table { font-size: 0.8rem; color: #334155; }
  .ac-checks-table thead tr { background: #f8fafc; }
  .ac-checks-table th { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid #eef1fb; }
  .ac-checks-table tbody tr { transition: background 0.15s; }
  .ac-checks-table tbody tr:hover { background: #f8fafc; }
  .ac-checks-table tbody tr:last-child { border-bottom: none !important; }
  .ac-checks-table tbody tr.ac-check-active { background: #eef1fb; }
  .ac-checks-table tbody tr.ac-check-active td:first-child { color: #2b3b8c; font-weight: 600; }
  .ac-check-dot { width: 8px; height: 8px; border-radius: 50%; border: 2px solid #cbd5e1; flex-shrink: 0; }
  .ac-check-active .ac-check-dot { border-color: #2b3b8c; background: #2b3b8c; }
  .ac-check-rate-edit { display: flex; align-items: center; gap: 2px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 2px 6px; flex-shrink: 0; }
  .ac-check-rate-edit:focus-within { border-color: #2b3b8c; }
  .ac-check-rate-display { display: flex; align-items: center; gap: 2px; background: #f1f5f9; border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 2px 8px; flex-shrink: 0; }
  .ac-rate-value { font-size: 0.72rem; font-weight: 700; color: #475569; }
  .ac-rate-prefix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
  .ac-rate-suffix { font-size: 0.7rem; color: #94a3b8; font-weight: 700; }
  .ac-rate-input { width: 52px; border: none; outline: none; background: transparent; font-size: 0.72rem; font-weight: 700; color: #1e293b; padding: 2px 0; }
  .ac-tat-input { width: 34px; }
  .ac-rate-input::-webkit-inner-spin-button, .ac-rate-input::-webkit-outer-spin-button { margin: 0; }
  .ac-amount-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.75rem; color: #94a3b8; flex-wrap: wrap; gap: 8px; }
  .ac-tat-bar-item strong { color: #0d9488; font-weight: 700; }
  .ac-total-amt { font-weight: 700; color: #2b3b8c; font-size: 0.85rem; }
  .ac-textarea { width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.875rem; color: #1e293b; background: #f8fafc; outline: none; resize: vertical; font-family: inherit; box-sizing: border-box; }
  .ac-textarea:focus { border-color: #2b3b8c; background: #fff; }
  .ac-textarea:disabled { background: #eef1fb; color: #475569; cursor: default; opacity: 1; }
  .ac-summary-strip { border: 1.5px solid; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
  .ac-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; }
  .ac-summary-row strong { font-weight: 700; color: #1e293b; }
  .ac-submit-btn { width: 100%; padding: 14px; font-size: 0.95rem; font-weight: 700; }
  .ac-success-wrap { display: flex; align-items: center; justify-content: center; min-height: 70vh; }
  .ac-success-card { background: #fff; border: 1px solid #e8ecf4; border-radius: 16px; padding: 48px 40px; text-align: center; max-width: 500px; width: 100%; }
  .ac-success-icon { width: 64px; height: 64px; background: #10b981; color: #fff; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .ac-success-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
  .ac-success-id { font-size: 1.1rem; font-weight: 700; color: #2b3b8c; background: #eef1fb; display: inline-block; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px!important; }
  .ac-success-meta { background: #f8fafc; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
  .ac-success-meta-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: #64748b; }
  .ac-success-checks { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 24px; }
  .ac-check-badge { background: #eef1fb; color: #2b3b8c; font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
  .ac-success-actions { display: flex; gap: 12px; justify-content: center; }
`;
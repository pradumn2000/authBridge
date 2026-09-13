import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

export default function VerificationCheck() {
  const { key } = useParams();
  const navigate = useNavigate();
  const [checkType, setCheckType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/check-types/all`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        const found = (data.checkTypes || []).find((ct) => ct.key === key);
        setCheckType(found || null);
      })
      .finally(() => setLoading(false));
  }, [key]);

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">
            <h2 style={{ color: "#2b3b8c", marginBottom: 16 }}>
              {loading ? "Loading…" : checkType?.label || key} Check
            </h2>
            <div style={{ background: "#fff", border: "1px solid #e8ecf4", borderRadius: 12, padding: 22 }}>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Case-level detail for this check type isn't built yet — cases using{" "}
                <strong>{checkType?.label || key}</strong> can currently be found via{" "}
                <a href="/AllCases" onClick={(e) => { e.preventDefault(); navigate("/AllCases"); }}>
                  All Cases
                </a>.
              </p>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
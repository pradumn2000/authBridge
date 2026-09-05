import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";

// Reads ?caseId= from the URL (if present) and fetches that case's real
// data from the backend. Used by the per-check-type pages (EmploymentCheck,
// EducationCheck, etc.) so arriving from a case's Documents tab in
// AllCases.jsx shows which real case you came from — even though the rest
// of each page's tables/stats are still mock data.
export function useCaseContext() {
  const location = useLocation();
  const caseId = new URLSearchParams(location.search).get("caseId");

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(Boolean(caseId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!caseId) {
      setCaseData(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/cases/${encodeURIComponent(caseId)}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Case not found." : "Failed to load case.");
        return r.json();
      })
      .then((data) => { if (!cancelled) setCaseData(data.case || data); })
      .catch((err) => { if (!cancelled) setError(err.message || "Failed to load case."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [caseId]);

  return { caseId, caseData, loading, error };
}
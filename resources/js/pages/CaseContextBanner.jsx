import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../src/hooks/useCaseContext";

// Shown at the top of each check-type page when arriving from a specific
// case's Documents tab in AllCases.jsx (?caseId=...). Pulls the real case
// from the API — this page's own tables below are still mock data and
// don't yet know about this case.
export default function CaseContextBanner() {
  const navigate = useNavigate();
  const { caseId, caseData, loading, error } = useCaseContext();

  if (!caseId) return null;

  return (
    <div style={{
      background: "#eef3ff", border: "1px solid #c7d2fe", borderRadius: "8px",
      padding: "12px 16px", marginBottom: "16px", display: "flex",
      justifyContent: "space-between", alignItems: "center", fontSize: "13px",
    }}>
      <div>
        {loading ? (
          <span style={{ color: "#64748b" }}>Loading case {caseId}…</span>
        ) : error ? (
          <span style={{ color: "#dc2626" }}>{error} (Case ID: {caseId})</span>
        ) : (
          <span style={{ color: "#2b3b8c" }}>
            Viewing this check for case <strong>{caseData?.case_id || caseId}</strong>
            {caseData?.candidate_name && <> — <strong>{caseData.candidate_name}</strong></>}
            {caseData?.client_name && <> ({caseData.client_name})</>}
          </span>
        )}
      </div>
      <button
        onClick={() => navigate(`/AllCases`)}
        style={{ background: "none", border: "1px solid #c7d2fe", color: "#2b3b8c", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
      >
        ← Back to All Cases
      </button>
    </div>
  );
}
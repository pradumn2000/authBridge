import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config";

// ── Fetches the active check-type catalogue (GET /api/check-types).
//    This is the single source of truth for check selectors across
//    AddCase.jsx, AddClient.jsx, and (optionally) Sidebar.jsx — it
//    already includes the 7 legacy types plus anything admin has since
//    added via AddCheckType.jsx. ──────────────────────────────────────
export function useCheckTypes() {
  const [checkTypes, setCheckTypes] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  const refetch = useCallback(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");
    return fetch(`${API_URL}/api/check-types`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(r => r.json())
      .then(data => setCheckTypes(data.checkTypes || []))
      .catch(() => setError("Failed to load check types."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { checkTypes, loading, error, refetch };
}

// ── Build a { key: rate } map of each check type's default rate —
//    used to seed AddCase/AddClient's editable rates state. ───────────
export function buildDefaultRates(checkTypes) {
  const rates = {};
  checkTypes.forEach(ct => { rates[ct.key] = Number(ct.default_rate) || 0; });
  return rates;
}

// ── Same idea for TAT — { key: { workingDays, calendarDays } }. ──────
export function buildDefaultTats(checkTypes) {
  const tats = {};
  checkTypes.forEach(ct => {
    tats[ct.key] = {
      workingDays:  Number(ct.default_working_days)  || 0,
      calendarDays: Number(ct.default_calendar_days) || 0,
    };
  });
  return tats;
}
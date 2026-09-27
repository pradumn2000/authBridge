// // import { Navigate } from "react-router-dom";

// // export default function ProtectedRoute({ children, role }) {
// //   const userRole = localStorage.getItem("role");

// //   if (userRole !== role) {
// //     return <Navigate to="/" />;
// //   }

// //   return children;
// // }
// import { Navigate } from "react-router-dom";

// function getUser() {
//   try {
//     return JSON.parse(localStorage.getItem("user")) || {};
//   } catch {
//     return {};
//   }
// }

// export default function ProtectedRoute({ children, role }) {
//   const user = getUser();

//   if (user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
}

// ── Same normalization used in Sidebar.jsx (normalizeRole) and
//    Login.jsx (resolveRouteRole). AddNewTl.jsx saves roles like
//    "TL - Employment", "TL - Education", etc — none of which equal
//    the bare "tl" this route is guarded with. Without this,
//    ProtectedRoute's exact-match check (user.role !== role) always
//    failed for every TL variant and silently bounced them back to
//    "/" right after a successful login. Keep this in sync with the
//    other two copies if the role list changes.
function normalizeRole(role) {
  if (!role) return "admin";
  const r = role.toString().toLowerCase().trim();

  if (r.startsWith("tl") || r.includes("team lead") || r.includes("team_lead")) {
    return "tl";
  }

  const roleMap = {
    verifier: "verifyer",
    verifyer: "verifyer",
    employment_verifier: "employment_verifier",
    education_verifier: "education_verifier",
    address_verifier: "address_verifier",
    database_verifier: "database_verifier",
    criminal_verifier: "criminal_verifier",
    drug_test_verifier: "drug_test_verifier",
    courtroom_verifier: "courtroom_verifier",
    "employment verifier": "employment_verifier",
    "education verifier": "education_verifier",
    "address verifier": "address_verifier",
    "database verifier": "database_verifier",
    "criminal verifier": "criminal_verifier",
    "drug test verifier": "drug_test_verifier",
    "courtroom verifier": "courtroom_verifier",
  };

  return roleMap[r] || r;
}

export default function ProtectedRoute({ children, role }) {
  const user = getUser();
  const userRole = normalizeRole(user.role);

  // `role` prop can be a single string ("tl") or an array of allowed
  // roles (["verifyer", "employment_verifier", ...]) — support both so
  // routes shared by several specialist roles don't need one
  // ProtectedRoute per role.
  const allowed = Array.isArray(role) ? role.map(normalizeRole) : [normalizeRole(role)];

  if (!allowed.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}
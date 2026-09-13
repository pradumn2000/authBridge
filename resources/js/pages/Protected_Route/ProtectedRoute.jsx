// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const userRole = localStorage.getItem("role");

//   if (userRole !== role) {
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

export default function ProtectedRoute({ children, role }) {
  const user = getUser();

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
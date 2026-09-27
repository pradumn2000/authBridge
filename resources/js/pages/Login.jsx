 
// // // import { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "../../css/style.css";
// // // import { API_URL } from "../src/config"

// // // export default function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");

// // //   const navigate = useNavigate();
 

// // // const [loading, setLoading] = useState(false);

// // // const handleSubmit = async (e) => {
// // //   e.preventDefault();

// // //   if (loading) return; // 🔥 prevent duplicate
// // //   setLoading(true);
// // //   console.log("API URL:", import.meta.env.VITE_API_URL);

// // //   try {
// // //     // const res = await fetch("http://localhost:8000/api/login", {
// // //     const res = await fetch(`${API_URL}/api/login`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         Accept: "application/json",
// // //       },
// // //       body: JSON.stringify({
// // //         email: email.trim(),
// // //         password: password.trim(),
// // //       }),
// // //     });

// // //     const data = await res.json();

// // //     // console.log("LOGIN RESPONSE:", data);

// // //     if (!res.ok) {
// // //       setError(data.message || "Login failed");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     localStorage.setItem("token", data.token);

// // //     navigate("/dashboard");

// // //   } catch (err) {
// // //     setError("Server error");
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };

// // //   return (
// // //     <section className="log-in">
// // //       <div className="container">
// // //         <div className="row">
// // //         <div className="col-lg-6">
// // //     <div className="login-left-img">
// // //       <img src="/images/login/login-left.png" alt="logo" />
// // //     </div>
// // //         </div>
// // //           <div className="col-lg-6">
// // //             <div className="login-wrp">

// // //               <div className="log-in-logo">
// // //                 <img src="/images/login/logo.png" alt="logo" />
// // //               </div>

// // //               <div className="log-in-inner-wrp">
// // //                 <h2>Login</h2>
// // //                 <p>Varification Management System</p>

// // //                 <form onSubmit={handleSubmit}>
                  
// // //                   {/* Email */}
// // //                   <div className="login-pst">
// // //                     {/* <label>Email</label> */}
// // //                     <div className="input-grp">
// // //                       <input
// // //                         type="email"
// // //                         placeholder="Enter your email"
// // //                         value={email}
// // //                         onChange={(e) => setEmail(e.target.value)}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Password */}
// // //                   <div className="login-pst">
// // //                     {/* <label>Password</label> */}

// // //                     <div className="input-grp pass">
// // //                       <input
// // //                         type={showPassword ? "text" : "password"}
// // //                         placeholder="Enter your password"
// // //                         className="password"
// // //                         value={password}
// // //                         onChange={(e) => setPassword(e.target.value)}
// // //                         required
// // //                       />

// // //                       <div
// // //                         className="password-eye"
// // //                         onClick={() => setShowPassword(!showPassword)}
// // //                       >
// // //                         <div
// // //                           className={
// // //                             showPassword ? "eye eye-open" : "eye eye-close"
// // //                           }
// // //                         ></div>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Forgot Password */}
// // //                   <div className="forgot-pass">
// // //                     <a href="/Forgetpassword">Forgot Password?</a>
// // //                   </div>

// // //                   {/* Submit */}
              
// // //                     <input
// // //                     type="submit"
// // //                     value="Login"
// // //                     className="primary-cta"
// // //                   />
                  
// // //                 </form>

    

// // //                 {/* Signup Link */}
// // //                 <div className="ac-switch">
// // //                   New here? <a href="/signup"><u>Create an Account</u></a>
// // //                 </div>

// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // // {/* <!-- Modal --> */}
// // // <div className="modal fade" id="sucessModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// // //   <div className="modal-dialog modal-dialog-centered">
// // //     <div className="modal-content all-pop-bg">
// // //       <div className="modal-body">
// // //         <div className="login-succ-in">
// // //             <h3>Login Successful</h3>
// // //             <p>Welcome to <span>Styapan</span></p>
// // //             <form>
// // //               <button type="submit" className="primary-cta" data-bs-dismiss="modal" aria-label="Close">Get Started
            
// // //           </button></form></div>
// // //       </div>
      
// // //     </div>
// // //   </div>
// // // </div>
  
// // //     </section>
// // //   );
// // // }

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../css/style.css";
// // import { API_URL } from "../src/config";

// // // Maps role value from API to the correct frontend route
// // const ROLE_ROUTES = {
// //   admin:          "/dashboard",
// //   allocator:      "/Allocator",
// //   verifier:       "/Verifyer",
// //   check_manager:  "/AllCases",
// //   report_writing: "/Specialist",
// //   pvt_qc:         "/Intake",
// //   client:         "/Client",
// //   onboarding:     "/clientportal",
// // };

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (loading) return;

// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await fetch(`${API_URL}/api/login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //         },
// //         body: JSON.stringify({
// //           email: email.trim(),
// //           password: password.trim(),
// //         }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.message || "Login failed. Please check your credentials.");
// //         return;
// //       }

// //       // Save token and full user object
// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("user", JSON.stringify(data.user));

// //       // Redirect based on role
// //       const route = ROLE_ROUTES[data.user.role];

// //       if (!route) {
// //         setError("Your account role is not recognised. Please contact admin.");
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         return;
// //       }

// //       navigate(route);

// //     } catch (err) {
// //       setError("Unable to connect to server. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="log-in">
// //       <div className="container">
// //         <div className="row">

// //           <div className="col-lg-6">
// //             <div className="login-left-img">
// //               <img src="/images/login/login-left.png" alt="logo" />
// //             </div>
// //           </div>

// //           <div className="col-lg-6">
// //             <div className="login-wrp">

// //               <div className="log-in-logo">
// //                 <img src="/images/login/logo.png" alt="logo" />
// //               </div>

// //               <div className="log-in-inner-wrp">
// //                 <h2>Login</h2>
// //                 <p>Verification Management System</p>

// //                 <form onSubmit={handleSubmit}>

// //                   <div className="login-pst">
// //                     <div className="input-grp">
// //                       <input
// //                         type="email"
// //                         placeholder="Enter your email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="login-pst">
// //                     <div className="input-grp pass">
// //                       <input
// //                         type={showPassword ? "text" : "password"}
// //                         placeholder="Enter your password"
// //                         className="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                       />
// //                       <div
// //                         className="password-eye"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                       >
// //                         <div className={showPassword ? "eye eye-open" : "eye eye-close"} />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

// //                   <div className="forgot-pass">
// //                     <a href="/forgetpassword">Forgot Password?</a>
// //                   </div>

// //                   <input
// //                     type="submit"
// //                     value={loading ? "Logging in..." : "Login"}
// //                     className="primary-cta"
// //                     disabled={loading}
// //                   />

// //                 </form>

// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../css/style.css";
// // import { API_URL } from "../src/config";

// // const ROLE_ROUTES = {
// //   admin:          "/dashboard",
// //   allocator:      "/Allocator",
// //   verifier:       "/Verifyer",
// //   check_manager:  "/AllCases",
// //   report_writing: "/Specialist",
// //   pvt_qc:         "/Intake",
// //   client:         "/Client",
// //   onboarding:     "/clientportal",
// //   // Specialist verifier roles — all land on the Verifyer dashboard
// //   employment_verifier: "/Verifyer",
// //   education_verifier:  "/Verifyer",
// //   address_verifier:    "/Verifyer",
// //   database_verifier:   "/Verifyer",
// //   criminal_verifier:   "/Verifyer",
// //   drug_test_verifier:  "/Verifyer",
// //   courtroom_verifier:  "/Verifyer",
// // };

// // export default function Login() {
// //   const [email, setEmail]               = useState("");
// //   const [password, setPassword]         = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError]               = useState("");
// //   const [loading, setLoading]           = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (loading) return;
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res  = await fetch(`${API_URL}/api/login`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Accept: "application/json" },
// //         body: JSON.stringify({ email: email.trim(), password: password.trim() }),
// //       });
// //       const data = await res.json();

// //       if (!res.ok) {
// //         setError(data.message || "Login failed. Please check your credentials.");
// //         return;
// //       }

// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("user",  JSON.stringify(data.user));

// //       const route = ROLE_ROUTES[data.user?.role];
// //       if (!route) {
// //         setError("Your account role is not recognised. Please contact admin.");
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         return;
// //       }
// //       navigate(route);

// //     } catch {
// //       setError("Unable to connect to server. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="log-in">
// //       <div className="container">
// //         <div className="row">

// //           {/* <div className="col-lg-6">
// //             <div className="login-left-img">
// //               <img src="/images/login/login-left.png" alt="" />
// //             </div>
// //           </div> */}

// //           <div className="col-lg-12">
// //             <div className="login-wrp login">

// //               <div className="log-in-logo">
// //                 <img src="/images/login/logo.png" alt="logo" />
// //               </div>

// //               <div className="log-in-inner-wrp">
// //                 <h2>Login</h2>
// //                 <p>Verification Management System</p>

// //                 <form onSubmit={handleSubmit}>

// //                   <div className="login-pst">
// //                     <div className="input-grp">
// //                       <input
// //                         type="email"
// //                         placeholder="Enter your email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="login-pst">
// //                     <div className="input-grp pass">
// //                       <input
// //                         type={showPassword ? "text" : "password"}
// //                         placeholder="Enter your password"
// //                         className="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                       />
// //                       <div
// //                         className="password-eye"
// //                         onClick={() => setShowPassword((v) => !v)}
// //                       >
// //                         <div className={showPassword ? "eye eye-open" : "eye eye-close"} />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {error && (
// //                     <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: "10px" }}>
// //                       {error}
// //                     </p>
// //                   )}

// //                   <div className="forgot-pass">
// //                     <a href="/forgetpassword">Forgot Password?</a>
// //                   </div>

// //                   <input
// //                     type="submit"
// //                     value={loading ? "Logging in…" : "Login"}
// //                     className="primary-cta"
// //                     disabled={loading}
// //                     style={{ width: "100%", marginTop: "8px", cursor: loading ? "not-allowed" : "pointer" }}
// //                   />

// //                 </form>

// //                 {/* ── Create account link ── */}
// //                 {/* <div className="ac-switch" style={{
// //                   marginTop: "20px", textAlign: "center",
// //                   fontSize: "0.85rem", color: "#64748b",
// //                 }}>
// //                   New here?{" "}
// //                   <a href="/signup" style={{ color: "#2b3b8c", fontWeight: 700, textDecoration: "underline" }}>
// //                     Create an Account
// //                   </a>
// //                 </div> */}
              

// // <div className="ac-switch" style={{
// //   marginTop: "20px", textAlign: "center",
// //   fontSize: "0.85rem", color: "#64748b",
// // }}>
// //   New client?{" "}
// //   <a href="/client-register" style={{ color: "#02c39a", fontWeight: 700, textDecoration: "underline" }}>
// //     Register as Company
// //   </a>
// // </div>

// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../css/style.css";
// import { API_URL } from "../src/config";

// const ROLE_ROUTES = {
//   admin:          "/dashboard",
//   allocator:      "/Allocator",
//   tl:             "/TLDashboard",
//   verifier:       "/Verifyer",
//   check_manager:  "/AllCases",
//   report_writing: "/Specialist",
//   pvt_qc:         "/Intake",
//   client:         "/Client",
//   onboarding:     "/clientportal",
//   // Specialist verifier roles — all land on the Verifyer dashboard
//   employment_verifier: "/Verifyer",
//   education_verifier:  "/Verifyer",
//   address_verifier:    "/Verifyer",
//   database_verifier:   "/Verifyer",
//   criminal_verifier:   "/Verifyer",
//   drug_test_verifier:  "/Verifyer",
//   courtroom_verifier:  "/Verifyer",
// };

// // ── Normalize the backend user object before it goes into localStorage.
// //    Different endpoints (register vs login) or different API resources
// //    can return the same data under different key casing
// //    (e.g. billing_mode vs billingMode). AddCase.jsx and other screens
// //    read the camelCase keys, so we make sure those always exist here —
// //    once, in the one place every login response passes through — instead
// //    of every consuming screen having to guess which casing it got.
// function normalizeUser(u) {
//   if (!u || typeof u !== "object") return u;

//   return {
//     ...u,
//     billingMode: u.billingMode ?? u.billing_mode ?? u.billingmode ?? "",
//     checkRates:  u.checkRates  ?? u.check_rates  ?? u.checkrates  ?? undefined,
//     checkTat:    u.checkTat    ?? u.check_tat    ?? u.checktat    ?? undefined,
//     agreedChecks:
//       u.agreedChecks ?? u.agreed_checks ?? u.agreedchecks ?? undefined,
//   };
// }

// export default function Login() {
//   const [email, setEmail]               = useState("");
//   const [password, setPassword]         = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError]               = useState("");
//   const [loading, setLoading]           = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     setLoading(true);

//     try {
//       const res  = await fetch(`${API_URL}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({ email: email.trim(), password: password.trim() }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed. Please check your credentials.");
//         return;
//       }

//       const normalizedUser = normalizeUser(data.user);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user",  JSON.stringify(normalizedUser));

//       const route = ROLE_ROUTES[normalizedUser?.role];
//       if (!route) {
//         setError("Your account role is not recognised. Please contact admin.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         return;
//       }
//       navigate(route);

//     } catch {
//       setError("Unable to connect to server. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="log-in">
//       <div className="container">
//         <div className="row">

//           {/* <div className="col-lg-6">
//             <div className="login-left-img">
//               <img src="/images/login/login-left.png" alt="" />
//             </div>
//           </div> */}

//           <div className="col-lg-12">
//             <div className="login-wrp login">

//               <div className="log-in-logo">
//                 <img src="/images/login/logo.png" alt="logo" />
//               </div>

//               <div className="log-in-inner-wrp">
//                 <h2>Login</h2>
//                 <p>Verification Management System</p>

//                 <form onSubmit={handleSubmit}>

//                   <div className="login-pst">
//                     <div className="input-grp">
//                       <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="login-pst">
//                     <div className="input-grp pass">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                         className="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <div
//                         className="password-eye"
//                         onClick={() => setShowPassword((v) => !v)}
//                       >
//                         <div className={showPassword ? "eye eye-open" : "eye eye-close"} />
//                       </div>
//                     </div>
//                   </div>

//                   {error && (
//                     <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: "10px" }}>
//                       {error}
//                     </p>
//                   )}

//                   <div className="forgot-pass">
//                     <a href="/forgetpassword">Forgot Password?</a>
//                   </div>

//                   <input
//                     type="submit"
//                     value={loading ? "Logging in…" : "Login"}
//                     className="primary-cta"
//                     disabled={loading}
//                     style={{ width: "100%", marginTop: "8px", cursor: loading ? "not-allowed" : "pointer" }}
//                   />

//                 </form>

//                 {/* ── Create account link ── */}
//                 {/* <div className="ac-switch" style={{
//                   marginTop: "20px", textAlign: "center",
//                   fontSize: "0.85rem", color: "#64748b",
//                 }}>
//                   New here?{" "}
//                   <a href="/signup" style={{ color: "#2b3b8c", fontWeight: 700, textDecoration: "underline" }}>
//                     Create an Account
//                   </a>
//                 </div> */}
              

// {/* <div className="ac-switch" style={{
//   marginTop: "20px", textAlign: "center",
//   fontSize: "0.85rem", color: "#64748b",
// }}>
//   New client?{" "}
//   <a href="/client-register" style={{ color: "#02c39a", fontWeight: 700, textDecoration: "underline" }}>
//     Register as Company
//   </a>
// </div> */}

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";
import { API_URL } from "../src/config";

const ROLE_ROUTES = {
  admin:          "/dashboard",
  allocator:      "/Allocator",
  tl:             "/TLDashboard",
  verifier:       "/Verifyer",
  check_manager:  "/AllCases",
  report_writing: "/Specialist",
  pvt_qc:         "/Intake",
  client:         "/Client",
  onboarding:     "/clientportal",
  // Specialist verifier roles — all land on the Verifyer dashboard
  employment_verifier: "/Verifyer",
  education_verifier:  "/Verifyer",
  address_verifier:    "/Verifyer",
  database_verifier:   "/Verifyer",
  criminal_verifier:   "/Verifyer",
  drug_test_verifier:  "/Verifyer",
  courtroom_verifier:  "/Verifyer",
};

// ── Normalize the backend user object before it goes into localStorage.
//    Different endpoints (register vs login) or different API resources
//    can return the same data under different key casing
//    (e.g. billing_mode vs billingMode). AddCase.jsx and other screens
//    read the camelCase keys, so we make sure those always exist here —
//    once, in the one place every login response passes through — instead
//    of every consuming screen having to guess which casing it got.
function normalizeUser(u) {
  if (!u || typeof u !== "object") return u;

  return {
    ...u,
    billingMode: u.billingMode ?? u.billing_mode ?? u.billingmode ?? "",
    checkRates:  u.checkRates  ?? u.check_rates  ?? u.checkrates  ?? undefined,
    checkTat:    u.checkTat    ?? u.check_tat    ?? u.checktat    ?? undefined,
    agreedChecks:
      u.agreedChecks ?? u.agreed_checks ?? u.agreedchecks ?? undefined,
  };
}

// ── Resolve a saved `role` value to the key ROLE_ROUTES actually indexes
//    by. Most roles are already exact matches ("admin", "verifier", ...),
//    but AddNewTl.jsx saves roles as "TL - Employment", "TL - Education",
//    etc — none of which equal the bare "tl" key above. Without this, every
//    Team Lead's `ROLE_ROUTES[role]` lookup came back undefined and login
//    failed with "Your account role is not recognised", even though the
//    account and password were correct. Mirrors the same fix applied to
//    Sidebar.jsx's normalizeRole().
function resolveRouteRole(role) {
  if (!role) return role;
  const r = role.toString().toLowerCase().trim();
  if (r.startsWith("tl") || r.includes("team lead") || r.includes("team_lead")) {
    return "tl";
  }
  return r;
}

export default function Login() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please check your credentials.");
        return;
      }

      const normalizedUser = normalizeUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(normalizedUser));

      const routeRole = resolveRouteRole(normalizedUser?.role);
      const route = ROLE_ROUTES[routeRole];
      if (!route) {
        setError("Your account role is not recognised. Please contact admin.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }
      navigate(route);

    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="log-in">
      <div className="container">
        <div className="row">

          {/* <div className="col-lg-6">
            <div className="login-left-img">
              <img src="/images/login/login-left.png" alt="" />
            </div>
          </div> */}

          <div className="col-lg-12">
            <div className="login-wrp login">

              <div className="log-in-logo">
                <img src="/images/login/logo.png" alt="logo" />
              </div>

              <div className="log-in-inner-wrp">
                <h2>Login</h2>
                <p>Verification Management System</p>

                <form onSubmit={handleSubmit}>

                  <div className="login-pst">
                    <div className="input-grp">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="login-pst">
                    <div className="input-grp pass">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div
                        className="password-eye"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        <div className={showPassword ? "eye eye-open" : "eye eye-close"} />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: "10px" }}>
                      {error}
                    </p>
                  )}

                  <div className="forgot-pass">
                    <a href="/forgetpassword">Forgot Password?</a>
                  </div>

                  <input
                    type="submit"
                    value={loading ? "Logging in…" : "Login"}
                    className="primary-cta"
                    disabled={loading}
                    style={{ width: "100%", marginTop: "8px", cursor: loading ? "not-allowed" : "pointer" }}
                  />

                </form>

                {/* ── Create account link ── */}
                {/* <div className="ac-switch" style={{
                  marginTop: "20px", textAlign: "center",
                  fontSize: "0.85rem", color: "#64748b",
                }}>
                  New here?{" "}
                  <a href="/signup" style={{ color: "#2b3b8c", fontWeight: 700, textDecoration: "underline" }}>
                    Create an Account
                  </a>
                </div> */}
              

{/* <div className="ac-switch" style={{
  marginTop: "20px", textAlign: "center",
  fontSize: "0.85rem", color: "#64748b",
}}>
  New client?{" "}
  <a href="/client-register" style={{ color: "#02c39a", fontWeight: 700, textDecoration: "underline" }}>
    Register as Company
  </a>
</div> */}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
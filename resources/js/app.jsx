
// // // import React from "react";
// // // import ReactDOM from "react-dom/client";
// // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // import Login from "./pages/Login";
// // // import Signup from "./pages/Signup";
// // // import Forgetpassword from "./pages/Forgetpassword";
// // // import VerifyAccount from "./pages/Verifyaccount";
// // // import Resetpassword from "./pages/Resetpassword";
// // // import Confrimpassword from "./pages/Confrimpassword";
// // // import Dashboard from "./pages/Dashboard";
// // // import Emploment from "./pages/Emploment";
// // // import Verifyer from "./pages/verifyer";
// // // import Clientportal from "./pages/Clientportal";
// // // import Client from "./pages/Client";
// // // import Settings from "./pages/Settings";
// // // import Intake from "./pages/Intake";
// // // import Allocator from "./pages/Allocator";
// // // import Specialist from "./pages/Specialist";
// // // import AllCases from "./pages/AllCases";
// // // import Trends from "./pages/Trends";
// // // import Apiintegretion from "./pages/Apiintegretion";
// // // import StatusEmploment from "./pages/StatusEmploment";
// // // import UserManagement from "./pages/UserManagement";
// // // import AddCase from "./pages/AddCase";
// // // import ClientRegistration from "./pages/ClientRegistration";
// // // import AddInstitution from "./pages/AddInstitution";
// // // import CompanyManagement from "./pages/AddCompany";
// // // import ClientBilling from "./pages/ClientBilling";
// // // import ClientOnboardingForm from "./pages/Clientonbordingform";
// // // import AddClient from "./pages/AddClient";
// // // import PendingRegistrations from "./pages/PendingRegistrations";

// // // // ─────────────────────────────────────────
// // // // Helpers
// // // // ─────────────────────────────────────────

// // // const getToken = () => localStorage.getItem("token");

// // // const getUser = () => {
// // //   try {
// // //     return JSON.parse(localStorage.getItem("user")) || null;
// // //   } catch {
// // //     return null;
// // //   }
// // // };

// // // // All 7 new specialist verifier roles that map to the Verifyer dashboard
// // // const VERIFIER_ROLES = [
// // //   "verifier",
// // //   "verifyer",
// // //   "employment_verifier",
// // //   "education_verifier",
// // //   "address_verifier",
// // //   "database_verifier",
// // //   "criminal_verifier",
// // //   "drug_test_verifier",
// // //   "courtroom_verifier",
// // // ];

// // // // Returns the home route for a given role
// // // function getRoleRoute(role) {
// // //   const routes = {
// // //     admin:                "/dashboard",
// // //     allocator:            "/Allocator",
// // //     verifier:             "/Verifyer",
// // //     verifyer:             "/Verifyer",
// // //     check_manager:        "/AllCases",
// // //     report_writing:       "/Specialist",
// // //     pvt_qc:               "/Intake",
// // //     client:               "/Client",
// // //     onboarding:           "/clientportal",
// // //     // 7 specialist verifier roles — all land on Verifyer dashboard
// // //     employment_verifier:  "/Verifyer",
// // //     education_verifier:   "/Verifyer",
// // //     address_verifier:     "/Verifyer",
// // //     database_verifier:    "/Verifyer",
// // //     criminal_verifier:    "/Verifyer",
// // //     drug_test_verifier:   "/Verifyer",
// // //     courtroom_verifier:   "/Verifyer",
// // //   };
// // //   return routes[role] || "/";
// // // }

// // // // ─────────────────────────────────────────
// // // // PrivateRoute
// // // // - No role prop  → any logged-in user
// // // // - role="x"      → that role OR admin
// // // // - role={[...]}  → any of those roles OR admin
// // // // ─────────────────────────────────────────
// // // function PrivateRoute({ children, role }) {
// // //   const token = getToken();
// // //   const user  = getUser();

// // //   if (!token || !user) {
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   if (role) {
// // //     const allowed = Array.isArray(role) ? role : [role];
// // //     // Admin can always access any page
// // //     if (user.role !== "admin" && !allowed.includes(user.role)) {
// // //       return <Navigate to={getRoleRoute(user.role)} replace />;
// // //     }
// // //   }

// // //   return children;
// // // }

// // // // ─────────────────────────────────────────
// // // // App
// // // // ─────────────────────────────────────────
// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>

// // //         {/* ── Public routes ── */}
// // //         <Route path="/"                element={<Login />} />
// // //         <Route path="/signup"          element={<Signup />} />
// // //         <Route path="/client-register" element={<ClientRegistration />} />
// // //         <Route path="/forgetpassword"  element={<Forgetpassword />} />
// // //         <Route path="/verifyaccount"   element={<VerifyAccount />} />
// // //         <Route path="/resetpassword"   element={<Resetpassword />} />
// // //         <Route path="/confirmpassword" element={<Confrimpassword />} />

// // //         {/* ── Admin ── */}
// // //         <Route path="/dashboard" element={
// // //           <PrivateRoute role="admin"><Dashboard /></PrivateRoute>
// // //         } />
// // //         <Route path="/Trends" element={
// // //           <PrivateRoute role={["admin", "client"]}><Trends /></PrivateRoute>
// // //         } />
// // //         <Route path="/Apiintegretion" element={
// // //           <PrivateRoute role="admin"><Apiintegretion /></PrivateRoute>
// // //         } />
// // //         <Route path="/UserManagement" element={
// // //           <PrivateRoute role="admin"><UserManagement /></PrivateRoute>
// // //         } />
// // //         <Route path="/AddInstitution" element={
// // //           <PrivateRoute role="admin"><AddInstitution /></PrivateRoute>
// // //         } />

// // //         {/* ── Allocator (+ admin) ── */}
// // //         <Route path="/Allocator" element={
// // //           <PrivateRoute role="allocator"><Allocator /></PrivateRoute>
// // //         } />

// // //         {/* ── Add Case (admin, allocator, client) ── */}
// // //         <Route path="/AddCase" element={
// // //           <PrivateRoute role={["admin", "allocator", "client"]}><AddCase /></PrivateRoute>
// // //         } />

// // //         {/* ── Verifier — all 9 verifier roles (+ admin) ── */}
// // //         <Route path="/Verifyer" element={
// // //           <PrivateRoute role={VERIFIER_ROLES}><Verifyer /></PrivateRoute>
// // //         } />
// // //         <Route path="/VerifyerDashboard" element={
// // //           <PrivateRoute role={VERIFIER_ROLES}><Verifyer /></PrivateRoute>
// // //         } />
// // //         <Route path="/emploment" element={
// // //           <PrivateRoute role={VERIFIER_ROLES}><Emploment /></PrivateRoute>
// // //         } />
// // //         <Route path="/StatusEmploment" element={
// // //           <PrivateRoute role={VERIFIER_ROLES}><StatusEmploment /></PrivateRoute>
// // //         } />

// // //         {/* ── Check Manager (+ admin) ── */}
// // //         <Route path="/AllCases" element={
// // //           <PrivateRoute role="check_manager"><AllCases /></PrivateRoute>
// // //         } />

// // //         {/* ── Report Writing (+ admin) ── */}
// // //         <Route path="/Specialist" element={
// // //           <PrivateRoute role="report_writing"><Specialist /></PrivateRoute>
// // //         } />

// // //         {/* ── PVT / QC (+ admin) ── */}
// // //         <Route path="/Intake" element={
// // //           <PrivateRoute role="pvt_qc"><Intake /></PrivateRoute>
// // //         } />

// // //         {/* ── Client (+ admin) — dynamic case list + detail, filtered server-side ── */}
// // //         <Route path="/Client" element={
// // //           <PrivateRoute role="client"><Client /></PrivateRoute>
// // //         } />
// // //         <Route path="/ClientBilling" element={
// // //           <PrivateRoute role="client"><ClientBilling /></PrivateRoute>
// // //         } />

// // //         {/* ── Candidate Portal — Link Generator (onboarding + client + admin) ── */}
// // //         <Route path="/clientportal" element={
// // //           <PrivateRoute role={["onboarding", "client"]}><Clientportal /></PrivateRoute>
// // //         } />

// // //         {/* ── Settings — any logged-in user ── */}
// // //         <Route path="/Settings" element={
// // //           <PrivateRoute><Settings /></PrivateRoute>
// // //         } />
// // //         <Route path="/AddCompany" element={
// // //           <PrivateRoute><CompanyManagement /></PrivateRoute>
// // //         } />
// // //         <Route path="/ClientOnboardingForm" element={
// // //           <PrivateRoute><ClientOnboardingForm /></PrivateRoute>
// // //         } />
// // //         <Route path="/AddClient" element={
// // //   <PrivateRoute role="admin"><AddClient /></PrivateRoute>
// // // } />
// // // <Route path="/PendingRegistrations" element={
// // //   <PrivateRoute role="admin"><PendingRegistrations /></PrivateRoute>
// // // } />

// // //         {/* ── Catch all ── */}
// // //         <Route path="*" element={<Navigate to="/" replace />} />

// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // const container = document.getElementById("app");
// // // const root = ReactDOM.createRoot(container);
// // // root.render(<App />);
// // // import "./bootstrap";
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // Page Imports
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import Forgetpassword from "./pages/Forgetpassword";
// // import VerifyAccount from "./pages/Verifyaccount";
// // import Resetpassword from "./pages/Resetpassword";
// // import Confrimpassword from "./pages/Confrimpassword";
// // import Dashboard from "./pages/Dashboard";
// // import Emploment from "./pages/Emploment";
// // import Verifyer from "./pages/verifyer";
// // import Clientportal from "./pages/Clientportal";
// // import Client from "./pages/Client";
// // import Settings from "./pages/Settings";
// // import Intake from "./pages/Intake";
// // import Allocator from "./pages/Allocator";
// // import Specialist from "./pages/Specialist";
// // import AllCases from "./pages/AllCases";
// // import Trends from "./pages/Trends";
// // import Apiintegretion from "./pages/Apiintegretion";
// // import StatusEmploment from "./pages/StatusEmploment";
// // import UserManagement from "./pages/UserManagement";
// // import AddCase from "./pages/AddCase";
// // import ClientRegistration from "./pages/ClientRegistration";
// // import AddInstitution from "./pages/AddInstitution";
// // import CompanyManagement from "./pages/AddCompany";
// // import ClientBilling from "./pages/ClientBilling";
// // import ClientOnboardingForm from "./pages/Clientonbordingform";
// // import AddClient from "./pages/AddClient";
// // import PendingRegistrations from "./pages/PendingRegistrations";
// // import AllClients from "./pages/Allclients";
// // import EmploymentCheck from "./pages/EmploymentCheck";
// // import EducationCheck from "./pages/EducationCheck";
// // import AddressCheck from "./pages/AddressCheck";
// // import DatabaseCheck from "./pages/DatabaseCheck";
// // import CriminalCheck from "./pages/CriminalCheck";
// // import DrugtestCheck from "./pages/DrugtestCheck";
// // import CourtroomCheck from "./pages/CourtroomCheck";
// // import Bg from "./pages/bg";

// // // Helpers
// // const getToken = () => localStorage.getItem("token");

// // const getUser = () => {
// //   try {
// //     return JSON.parse(localStorage.getItem("user")) || null;
// //   } catch {
// //     return null;
// //   }
// // };

// // const VERIFIER_ROLES = [
// //   "verifier",
// //   "verifyer",
// //   "employment_verifier",
// //   "education_verifier",
// //   "address_verifier",
// //   "database_verifier",
// //   "criminal_verifier",
// //   "drug_test_verifier",
// //   "courtroom_verifier",
// // ];

// // function getRoleRoute(role) {
// //   const normalizedRole = role?.toLowerCase();
// //   const routes = {
// //     admin: "/dashboard",
// //     allocator: "/Allocator",
// //     verifier: "/Verifyer",
// //     verifyer: "/Verifyer",
// //     check_manager: "/AllCases",
// //     report_writing: "/Specialist",
// //     pvt_qc: "/Intake",
// //     client: "/Client",
// //     onboarding: "/clientportal",
// //     employment_verifier: "/EmploymentCheck",
// //     education_verifier: "/EducationCheck",
// //     address_verifier: "/AddressCheck",
// //     database_verifier: "/DatabaseCheck",
// //     criminal_verifier: "/CriminalCheck",
// //     drug_test_verifier: "/DrugtestCheck",
// //     courtroom_verifier: "/CourtroomCheck",
// //   };
// //   return routes[normalizedRole] || "/";
// // }

// // function PrivateRoute({ children, role }) {
// //   const token = getToken();
// //   const user = getUser();

// //   if (!token || !user) {
// //     return <Navigate to="/" replace />;
// //   }

// //   if (role) {
// //     const allowed = Array.isArray(role) ? role : [role];
// //     const userRole = user.role?.toLowerCase();

// //     // Check if user is admin or user's role exists in allowed list
// //     const hasAccess =
// //       userRole === "admin" ||
// //       allowed.some((r) => r.toLowerCase() === userRole);

// //     if (!hasAccess) {
// //       return <Navigate to={getRoleRoute(user.role)} replace />;
// //     }
// //   }

// //   return children;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/client-register" element={<ClientRegistration />} />
// //         <Route path="/forgetpassword" element={<Forgetpassword />} />
// //         <Route path="/verifyaccount" element={<VerifyAccount />} />
// //         <Route path="/resetpassword" element={<Resetpassword />} />
// //         <Route path="/confirmpassword" element={<Confrimpassword />} />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/dashboard"
// //           element={
// //             <PrivateRoute role="admin">
// //               <Dashboard />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/Trends"
// //           element={
// //             <PrivateRoute role={["admin", "client"]}>
// //               <Trends />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/Apiintegretion"
// //           element={
// //             <PrivateRoute role="admin">
// //               <Apiintegretion />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/UserManagement"
// //           element={
// //             <PrivateRoute role="admin">
// //               <UserManagement />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/AddInstitution"
// //           element={
// //             <PrivateRoute role="admin">
// //               <AddInstitution />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Check Type Routes */}
// //         <Route
// //           path="/EmploymentCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <EmploymentCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/EducationCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <EducationCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/AddressCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <AddressCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/DatabaseCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <DatabaseCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/CriminalCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <CriminalCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/DrugtestCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <DrugtestCheck />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/CourtroomCheck"
// //           element={
// //             <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //               <CourtroomCheck />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Allocator Routes */}
// //         <Route
// //           path="/Allocator"
// //           element={
// //             <PrivateRoute role="allocator">
// //               <Allocator />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Case Routes */}
// //         <Route
// //           path="/AddCase"
// //           element={
// //             <PrivateRoute role={["admin", "allocator", "client"]}>
// //               <AddCase />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Verifier Routes */}
// //         <Route
// //           path="/Verifyer"
// //           element={
// //             <PrivateRoute role={VERIFIER_ROLES}>
// //               <Verifyer />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/VerifyerDashboard"
// //           element={
// //             <PrivateRoute role={VERIFIER_ROLES}>
// //               <Verifyer />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/emploment"
// //           element={
// //             <PrivateRoute role={VERIFIER_ROLES}>
// //               <Emploment />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/StatusEmploment"
// //           element={
// //             <PrivateRoute role={VERIFIER_ROLES}>
// //               <StatusEmploment />
// //             </PrivateRoute>
// //           }
          
// //         />
// //         <Route
// //   path="/bg"
// //   element={
// //     <PrivateRoute role={["admin", ...VERIFIER_ROLES]}>
// //       <Bg />
// //     </PrivateRoute>
// //   }
// // />

// //         {/* Check Manager */}
// //         <Route
// //           path="/AllCases"
// //           element={
// //             <PrivateRoute role="check_manager">
// //               <AllCases />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Specialist & QC */}
// //         <Route
// //           path="/Specialist"
// //           element={
// //             <PrivateRoute role="report_writing">
// //               <Specialist />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/Intake"
// //           element={
// //             <PrivateRoute role="pvt_qc">
// //               <Intake />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Client Routes */}
// //         <Route
// //           path="/Client"
// //           element={
// //             <PrivateRoute role="client">
// //               <Client />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/ClientBilling"
// //           element={
// //             <PrivateRoute role="client">
// //               <ClientBilling />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/clientportal"
// //           element={
// //             <PrivateRoute role={["onboarding", "client"]}>
// //               <Clientportal />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Settings & Admin Ops */}
// //         <Route
// //           path="/Settings"
// //           element={
// //             <PrivateRoute>
// //               <Settings />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/AddCompany"
// //           element={
// //             <PrivateRoute>
// //               <CompanyManagement />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/ClientOnboardingForm"
// //           element={
// //             <PrivateRoute>
// //               <ClientOnboardingForm />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/AddClient"
// //           element={
// //             <PrivateRoute role="admin">
// //               <AddClient />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/AllClients"
// //           element={
// //             <PrivateRoute role="admin">
// //               <AllClients />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/PendingRegistrations"
// //           element={
// //             <PrivateRoute role="admin">
// //               <PendingRegistrations />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Catch All */}
// //         <Route path="*" element={<Navigate to="/" replace />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // // Laravel Vite DOM Mounting Check
// // const container = document.getElementById("app");
// // if (container) {
// //   const root = ReactDOM.createRoot(container);
// //   root.render(<App />);
// // }
// import React from "react";
// import ReactDOM from "react-dom/client";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // ─────────────────────────────────────────
// // Authentication / Public Pages
// // ─────────────────────────────────────────
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Forgetpassword from "./pages/Forgetpassword";
// import VerifyAccount from "./pages/Verifyaccount";
// import Resetpassword from "./pages/Resetpassword";
// import Confrimpassword from "./pages/Confrimpassword";
// import ClientRegistration from "./pages/ClientRegistration";

// // ─────────────────────────────────────────
// // Main Dashboard Pages
// // ─────────────────────────────────────────
// import Dashboard from "./pages/Dashboard";
// import Client from "./pages/Client";
// import Clientportal from "./pages/Clientportal";
// import ClientCases from "./pages/ClientCases";
// import ClientBilling from "./pages/ClientBilling";

// // ─────────────────────────────────────────
// // Case Management
// // ─────────────────────────────────────────
// import AllCases from "./pages/AllCases";
// import AddCase from "./pages/AddCase";
// import Allocator from "./pages/Allocator";

// // ─────────────────────────────────────────
// // Verification / Operations
// // ─────────────────────────────────────────
// import Verifyer from "./pages/verifyer";
// import Emploment from "./pages/Emploment";
// import StatusEmploment from "./pages/StatusEmploment";
// import Specialist from "./pages/Specialist";
// import Intake from "./pages/Intake";

// // ─────────────────────────────────────────
// // Verification Check Type Pages
// // ─────────────────────────────────────────
// import EmploymentCheck from "./pages/EmploymentCheck";
// import EducationCheck from "./pages/EducationCheck";
// import AddressCheck from "./pages/AddressCheck";
// import DatabaseCheck from "./pages/DatabaseCheck";
// import CriminalCheck from "./pages/CriminalCheck";
// import DrugtestCheck from "./pages/DrugtestCheck";
// import CourtroomCheck from "./pages/CourtroomCheck";

// // ─────────────────────────────────────────
// // Admin Pages
// // ─────────────────────────────────────────
// import UserManagement from "./pages/UserManagement";
// import AddInstitution from "./pages/AddInstitution";
// import CompanyManagement from "./pages/AddCompany";
// import Apiintegretion from "./pages/Apiintegretion";
// import AddressVerification from "./pages/AddressVerification";

// // ─────────────────────────────────────────
// // Other Pages
// // ─────────────────────────────────────────
// import Settings from "./pages/Settings";
// import Trends from "./pages/Trends";

// // ─────────────────────────────────────────
// // Candidate Self-Service
// // ─────────────────────────────────────────
// import CandidateVerificationWizard from "./pages/CandidateVerificationWizard";
// // ═════════════════════════════════════════
// // AUTHENTICATION HELPERS
// // ═════════════════════════════════════════

// const getToken = () => {
//   return localStorage.getItem("token");
// };


// const getUser = () => {
//   try {
//     return JSON.parse(localStorage.getItem("user")) || null;
//   } catch {
//     return null;
//   }
// };


// // ═════════════════════════════════════════
// // ROLE → DEFAULT ROUTE
// // ═════════════════════════════════════════

// function getRoleRoute(role) {
//   const routes = {
//     admin: "/dashboard",

//     allocator: "/Allocator",

//     verifier: "/Verifyer",
//     verifyer: "/Verifyer",

//     employment_verifier: "/Verifyer",
//     education_verifier: "/Verifyer",
//     address_verifier: "/Verifyer",
//     database_verifier: "/Verifyer",
//     criminal_verifier: "/Verifyer",
//     drug_test_verifier: "/Verifyer",
//     courtroom_verifier: "/Verifyer",

//     check_manager: "/AllCases",

//     report_writing: "/Specialist",

//     pvt_qc: "/Intake",

//     client: "/Client",

//     onboarding: "/clientportal",
//   };

//   return routes[role] || "/";
// }


// // ═════════════════════════════════════════
// // PRIVATE ROUTE
// // ═════════════════════════════════════════
// //
// // Usage:
// //
// // <PrivateRoute>
// //     <Page />
// // </PrivateRoute>
// //
// // OR
// //
// // <PrivateRoute role="admin">
// //     <Page />
// // </PrivateRoute>
// //
// // OR
// //
// // <PrivateRoute role={["admin", "client"]}>
// //     <Page />
// // </PrivateRoute>
// // ═════════════════════════════════════════

// function PrivateRoute({ children, role }) {
//   const token = getToken();
//   const user = getUser();

//   // User is not logged in
//   if (!token || !user) {
//     return <Navigate to="/" replace />;
//   }

//   // Role restriction
//   if (role) {
//     const allowedRoles = Array.isArray(role)
//       ? role
//       : [role];

//     // Admin has access to all protected pages
//     if (
//       user.role !== "admin" &&
//       !allowedRoles.includes(user.role)
//     ) {
//       return (
//         <Navigate
//           to={getRoleRoute(user.role)}
//           replace
//         />
//       );
//     }
//   }

//   return children;
// }


// // ═════════════════════════════════════════
// // APP
// // ═════════════════════════════════════════

// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>


//         {/* ═══════════════════════════════
//             PUBLIC ROUTES
//         ═══════════════════════════════ */}

//         <Route
//           path="/"
//           element={<Login />}
//         />

//         <Route
//           path="/signup"
//           element={<Signup />}
//         />

//         <Route
//           path="/client-register"
//           element={<ClientRegistration />}
//         />
//         <Route
//   path="/candidate-verification"
//   element={<CandidateVerificationWizard />}
// />

//         <Route
//           path="/forgetpassword"
//           element={<Forgetpassword />}
//         />

//         <Route
//           path="/verifyaccount"
//           element={<VerifyAccount />}
//         />

//         <Route
//           path="/resetpassword"
//           element={<Resetpassword />}
//         />

//         <Route
//           path="/confirmpassword"
//           element={<Confrimpassword />}
//         />


//         {/* ═══════════════════════════════
//             ADMIN DASHBOARD
//         ═══════════════════════════════ */}

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute role="admin">
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             ADMIN — CASES
//         ═══════════════════════════════ */}

//         <Route
//           path="/AllCases"
//           element={
//             <PrivateRoute role="check_manager">
//               <AllCases />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/AddCase"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "allocator",
//                 "client",
//               ]}
//             >
//               <AddCase />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/Allocator"
//           element={
//             <PrivateRoute role="allocator">
//               <Allocator />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             VERIFIER DASHBOARD
//         ═══════════════════════════════ */}

//         <Route
//           path="/Verifyer"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "verifier",
//                 "verifyer",
//                 "employment_verifier",
//                 "education_verifier",
//                 "address_verifier",
//                 "database_verifier",
//                 "criminal_verifier",
//                 "drug_test_verifier",
//                 "courtroom_verifier",
//               ]}
//             >
//               <Verifyer />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             EMPLOYMENT OPERATIONS
//         ═══════════════════════════════ */}

//         <Route
//           path="/emploment"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "verifier",
//                 "verifyer",
//                 "employment_verifier",
//                 "check_manager",
//               ]}
//             >
//               <Emploment />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/StatusEmploment"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "verifier",
//                 "verifyer",
//                 "employment_verifier",
//                 "check_manager",
//               ]}
//             >
//               <StatusEmploment />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             VERIFICATION CHECK TYPES
//         ═══════════════════════════════ */}

//         {/* Employment */}

//         <Route
//           path="/EmploymentCheck"
//           element={
//             <PrivateRoute role="admin">
//               <EmploymentCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Education */}

//         <Route
//           path="/EducationCheck"
//           element={
//             <PrivateRoute role="admin">
//               <EducationCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Address */}

//         <Route
//           path="/AddressCheck"
//           element={
//             <PrivateRoute role="admin">
//               <AddressCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Database */}

//         <Route
//           path="/DatabaseCheck"
//           element={
//             <PrivateRoute role="admin">
//               <DatabaseCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Criminal */}

//         <Route
//           path="/CriminalCheck"
//           element={
//             <PrivateRoute role="admin">
//               <CriminalCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Drug Test */}

//         <Route
//           path="/DrugtestCheck"
//           element={
//             <PrivateRoute role="admin">
//               <DrugtestCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* Courtroom */}

//         <Route
//           path="/CourtroomCheck"
//           element={
//             <PrivateRoute role="admin">
//               <CourtroomCheck />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             REPORT WRITING
//         ═══════════════════════════════ */}

//         <Route
//           path="/Specialist"
//           element={
//             <PrivateRoute role="report_writing">
//               <Specialist />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             QC / INTAKE
//         ═══════════════════════════════ */}

//         <Route
//           path="/Intake"
//           element={
//             <PrivateRoute role="pvt_qc">
//               <Intake />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             CLIENT
//         ═══════════════════════════════ */}

//         <Route
//           path="/Client"
//           element={
//             <PrivateRoute role="client">
//               <Client />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/ClientCases"
//           element={
//             <PrivateRoute role="client">
//               <ClientCases />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/ClientBilling"
//           element={
//             <PrivateRoute role="client">
//               <ClientBilling />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             CLIENT PORTAL
//         ═══════════════════════════════ */}

//         <Route
//           path="/clientportal"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "onboarding",
//                 "client",
//               ]}
//             >
//               <Clientportal />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             ADMIN — USER MANAGEMENT
//         ═══════════════════════════════ */}

//         <Route
//           path="/UserManagement"
//           element={
//             <PrivateRoute role="admin">
//               <UserManagement />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             ADMIN — INSTITUTION
//         ═══════════════════════════════ */}

//         <Route
//           path="/AddInstitution"
//           element={
//             <PrivateRoute role="admin">
//               <AddInstitution />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             ADMIN — COMPANY
//         ═══════════════════════════════ */}

//         <Route
//           path="/AddCompany"
//           element={
//             <PrivateRoute role="admin">
//               <CompanyManagement />
//             </PrivateRoute>
//           }
//         />



// <Route
//           path="/AddressVerification"
//           element={
//             <PrivateRoute role="admin">
//               <AddressVerification />
//             </PrivateRoute>
//           }
//         />

//         {/* ═══════════════════════════════
//             API INTEGRATION
//         ═══════════════════════════════ */}

//         <Route
//           path="/Apiintegretion"
//           element={
//             <PrivateRoute role="admin">
//               <Apiintegretion />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             REPORTS & TRENDS
//         ═══════════════════════════════ */}

//         <Route
//           path="/Trends"
//           element={
//             <PrivateRoute
//               role={[
//                 "admin",
//                 "client",
//               ]}
//             >
//               <Trends />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             SETTINGS
//             Any logged-in user
//         ═══════════════════════════════ */}

//         <Route
//           path="/Settings"
//           element={
//             <PrivateRoute>
//               <Settings />
//             </PrivateRoute>
//           }
//         />


//         {/* ═══════════════════════════════
//             FALLBACK
//         ═══════════════════════════════ */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }


// // ═════════════════════════════════════════
// // REACT MOUNT
// // ═════════════════════════════════════════

// const container = document.getElementById("app");

// const root = ReactDOM.createRoot(container);

// root.render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ─────────────────────────────────────────
// Authentication / Public Pages
// ─────────────────────────────────────────

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgetpassword from "./pages/Forgetpassword";
import VerifyAccount from "./pages/Verifyaccount";
import Resetpassword from "./pages/Resetpassword";
import Confrimpassword from "./pages/Confrimpassword";

// ─────────────────────────────────────────
// Admin / Dashboard Pages
// ─────────────────────────────────────────

import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import Apiintegretion from "./pages/Apiintegretion";
import UserManagement from "./pages/UserManagement";
import AddInstitution from "./pages/AddInstitution";

// ─────────────────────────────────────────
// Operational Pages
// ─────────────────────────────────────────

import Allocator from "./pages/Allocator";
import Verifyer from "./pages/verifyer";
import Emploment from "./pages/Emploment";
import StatusEmploment from "./pages/StatusEmploment";
import AllCases from "./pages/AllCases";
import Specialist from "./pages/Specialist";
import Intake from "./pages/Intake";

// ─────────────────────────────────────────
// Client Pages
// ─────────────────────────────────────────

import Client from "./pages/Client";
import ClientCases from "./pages/ClientCases";
import ClientBilling from "./pages/ClientBilling";
import Clientportal from "./pages/Clientportal";

// ─────────────────────────────────────────
// Case Pages
// ─────────────────────────────────────────

import AddCase from "./pages/AddCase";

// ─────────────────────────────────────────
// Company / Settings
// ─────────────────────────────────────────

import Settings from "./pages/Settings";
import CompanyManagement from "./pages/AddCompany";

// ─────────────────────────────────────────
// Client Registration
// ─────────────────────────────────────────

import ClientRegistration from "./pages/ClientRegistration";

// ─────────────────────────────────────────
// Candidate Verification
// IMPORTANT:
// Your actual file is:
// resources/js/pages/bg.jsx
// ─────────────────────────────────────────

import CandidateVerificationWizard from "./pages/bg";

// ─────────────────────────────────────────
// Helper: Get Authentication Token
// ─────────────────────────────────────────

const getToken = () => {
  return localStorage.getItem("token");
};

// ─────────────────────────────────────────
// Helper: Get Logged-in User
// ─────────────────────────────────────────

const getUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Unable to read user from localStorage:", error);
    return null;
  }
};

// ─────────────────────────────────────────
// Role → Default Route
// ─────────────────────────────────────────

function getRoleRoute(role) {
  const routes = {
    admin: "/dashboard",

    allocator: "/Allocator",

    verifier: "/Verifyer",

    check_manager: "/AllCases",

    report_writing: "/Specialist",

    pvt_qc: "/Intake",

    client: "/Client",

    onboarding: "/clientportal",
  };

  return routes[role] || "/";
}

// ─────────────────────────────────────────
// PrivateRoute
//
// No role:
//   Any authenticated user can access.
//
// role="admin":
//   Only admin.
//
// role={["admin", "client"]}:
//   Admin or client.
//
// Admin has access to all protected routes.
// ─────────────────────────────────────────

function PrivateRoute({ children, role }) {
  const token = getToken();
  const user = getUser();

  // ───────────────────────────────────────
  // User is not logged in
  // ───────────────────────────────────────

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // ───────────────────────────────────────
  // Role validation
  // ───────────────────────────────────────

  if (role) {
    const allowedRoles = Array.isArray(role)
      ? role
      : [role];

    // Admin can access protected modules
    if (
      user.role !== "admin" &&
      !allowedRoles.includes(user.role)
    ) {
      return (
        <Navigate
          to={getRoleRoute(user.role)}
          replace
        />
      );
    }
  }

  return children;
}

// ─────────────────────────────────────────
// Application
// ─────────────────────────────────────────

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ═══════════════════════════════════
            PUBLIC ROUTES
        ═══════════════════════════════════ */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Client Registration
            This is PUBLIC.
            No login required. */}

        <Route
          path="/client-register"
          element={<ClientRegistration />}
        />

        <Route
          path="/forgetpassword"
          element={<Forgetpassword />}
        />

        <Route
          path="/verifyaccount"
          element={<VerifyAccount />}
        />

        <Route
          path="/resetpassword"
          element={<Resetpassword />}
        />

        <Route
          path="/confirmpassword"
          element={<Confrimpassword />}
        />


        {/* ═══════════════════════════════════
            CANDIDATE VERIFICATION
            PUBLIC ROUTE
        ═══════════════════════════════════ */}

        <Route
          path="/candidate-verification"
          element={
            <CandidateVerificationWizard />
          }
        />


        {/* ═══════════════════════════════════
            ADMIN ROUTES
        ═══════════════════════════════════ */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/Trends"
          element={
            <PrivateRoute role="admin">
              <Trends />
            </PrivateRoute>
          }
        />

        <Route
          path="/Apiintegretion"
          element={
            <PrivateRoute role="admin">
              <Apiintegretion />
            </PrivateRoute>
          }
        />

        <Route
          path="/UserManagement"
          element={
            <PrivateRoute role="admin">
              <UserManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddInstitution"
          element={
            <PrivateRoute role="admin">
              <AddInstitution />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            ALLOCATOR
        ═══════════════════════════════════ */}

        <Route
          path="/Allocator"
          element={
            <PrivateRoute role="allocator">
              <Allocator />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            CASE CREATION
            Admin + Allocator + Client
        ═══════════════════════════════════ */}

        <Route
          path="/AddCase"
          element={
            <PrivateRoute
              role={[
                "admin",
                "allocator",
                "client",
              ]}
            >
              <AddCase />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            VERIFIER
        ═══════════════════════════════════ */}

        <Route
          path="/Verifyer"
          element={
            <PrivateRoute role="verifier">
              <Verifyer />
            </PrivateRoute>
          }
        />

        <Route
          path="/emploment"
          element={
            <PrivateRoute role="verifier">
              <Emploment />
            </PrivateRoute>
          }
        />

        <Route
          path="/StatusEmploment"
          element={
            <PrivateRoute role="verifier">
              <StatusEmploment />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            CHECK MANAGER
        ═══════════════════════════════════ */}

        <Route
          path="/AllCases"
          element={
            <PrivateRoute role="check_manager">
              <AllCases />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            REPORT WRITING / SPECIALIST
        ═══════════════════════════════════ */}

        <Route
          path="/Specialist"
          element={
            <PrivateRoute role="report_writing">
              <Specialist />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            PVT / QC
        ═══════════════════════════════════ */}

        <Route
          path="/Intake"
          element={
            <PrivateRoute role="pvt_qc">
              <Intake />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            CLIENT
        ═══════════════════════════════════ */}

        <Route
          path="/Client"
          element={
            <PrivateRoute role="client">
              <Client />
            </PrivateRoute>
          }
        />

        <Route
          path="/ClientCases"
          element={
            <PrivateRoute role="client">
              <ClientCases />
            </PrivateRoute>
          }
        />

        <Route
          path="/ClientBilling"
          element={
            <PrivateRoute role="client">
              <ClientBilling />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            CANDIDATE PORTAL
            Onboarding + Client + Admin
        ═══════════════════════════════════ */}

        <Route
          path="/clientportal"
          element={
            <PrivateRoute
              role={[
                "onboarding",
                "client",
              ]}
            >
              <Clientportal />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            SETTINGS
            Any logged-in user
        ═══════════════════════════════════ */}

        <Route
          path="/Settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            COMPANY MANAGEMENT
            Any authenticated user
        ═══════════════════════════════════ */}

        <Route
          path="/AddCompany"
          element={
            <PrivateRoute>
              <CompanyManagement />
            </PrivateRoute>
          }
        />


        {/* ═══════════════════════════════════
            FALLBACK
        ═══════════════════════════════════ */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

// ─────────────────────────────────────────
// React Mount
// ─────────────────────────────────────────

const container = document.getElementById("app");

if (!container) {
  throw new Error(
    'Root element "#app" was not found.'
  );
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* =========================================================
   PUBLIC / AUTH PAGES
   ========================================================= */

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgetpassword from "./pages/Forgetpassword";
import VerifyAccount from "./pages/Verifyaccount";
import Resetpassword from "./pages/Resetpassword";
import Confrimpassword from "./pages/Confrimpassword";

/* =========================================================
   MAIN DASHBOARDS
   ========================================================= */

import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Clientportal from "./pages/Clientportal";
import PendingLinks from "./pages/PendingLinks";
import Allocator from "./pages/Allocator";
import Verifyer from "./pages/verifyer";
import Specialist from "./pages/Specialist";
import Intake from "./pages/Intake";
import AllCases from "./pages/AllCases";
import VerificationCheck from "./pages/VerificationCheck";

/* =========================================================
   CASE / EMPLOYMENT PAGES
   ========================================================= */

import AddCase from "./pages/AddCase";
import Emploment from "./pages/Emploment";
import StatusEmploment from "./pages/StatusEmploment";

/* =========================================================
   VERIFICATION CHECK PAGES
   ========================================================= */

import EmploymentCheck from "./pages/EmploymentCheck";
import EducationCheck from "./pages/EducationCheck";
import AddressCheck from "./pages/AddressCheck";
import DatabaseCheck from "./pages/DatabaseCheck";
import CriminalCheck from "./pages/CriminalCheck";
import DrugtestCheck from "./pages/DrugtestCheck";
import CourtroomCheck from "./pages/CourtroomCheck";
import AddChecktype from "./pages/AddChecktype";

/* =========================================================
   CLIENT MANAGEMENT
   ========================================================= */

import AllClients from "./pages/Allclients";
import AddClient from "./pages/AddClient";
import ClientRegistration from "./pages/ClientRegistration";
import ClientCases from "./pages/ClientCases";
import ClientBilling from "./pages/ClientBilling";

/* =========================================================
   TL MANAGEMENT
   ========================================================= */

import AddNewTl from "./pages/AddNewTl";
import Permissions from "./pages/Permissions";
import ViewPermission from "./pages/ViewPermission";
import SubUser from "./pages/SubUser";
import SubUserPermission from "./pages/SubUserPermission";

// TL Custom Pages
import TLDashboard from "./pages/TLDashboard";
import TLEducationCheck from "./pages/TLEducationCheck";
import TLAllocator from "./pages/TLAllocator";
import TLIntake from "./pages/TLIntake";
import TLAddInstitution from "./pages/TLAddInstitution";
import TLViewPermission from "./pages/TLViewPermission";

/* =========================================================
   ADMIN MANAGEMENT
   ========================================================= */

import UserManagement from "./pages/UserManagement";
import AddInstitution from "./pages/AddInstitution";
import CompanyManagement from "./pages/AddCompany";

/* =========================================================
   OTHER PAGES
   ========================================================= */

import Settings from "./pages/Settings";
import Trends from "./pages/Trends";
import Apiintegretion from "./pages/Apiintegretion";

import CandidateVerificationWizard from "./pages/bg";

import CriminalUserProfile from "./pages/CriminalUserProfile";
import DatabaseUserProfile from "./pages/DatabaseUserProfile";
import EducationUserProfile from "./pages/EducationUserProfile";
import EmploymentUserProfile from "./pages/EmploymentUserProfile";
import AddressUserProfile from "./pages/AddressUserProfile";

/* =========================================================
   AUTH HELPERS
   ========================================================= */

const getToken = () => {
  return localStorage.getItem("token");
};

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    return null;
  }
};

/* =========================================================
   ROLE HOME ROUTES
   ========================================================= */

function getRoleRoute(role) {
  const routes = {
    admin: "/dashboard",
    tl: "/TLDashboard",
    allocator: "/Allocator",
    verifier: "/Verifyer",
    verifyer: "/Verifyer",
    check_manager: "/AllCases",
    report_writing: "/Specialist",
    pvt_qc: "/Intake",
    client: "/Client",
    onboarding: "/clientportal",
    pending_links: "/PendingLinks",
    employment_verifier: "/Verifyer",
    education_verifier: "/Verifyer",
    address_verifier: "/Verifyer",
    database_verifier: "/Verifyer",
    criminal_verifier: "/Verifyer",
    drug_test_verifier: "/Verifyer",
    courtroom_verifier: "/Verifyer",
  };

  return routes[role] || "/";
}

/* =========================================================
   NORMALIZE ROLE
   ========================================================= */

function normalizeRole(role) {
  if (!role) {
    return "admin";
  }

  const value = role
    .toString()
    .toLowerCase()
    .trim();

  const roleMap = {
    tl: "tl",
    "team lead": "tl",
    "team_lead": "tl",
    verifier: "verifier",
    verifyer: "verifier",
    "employment verifier": "employment_verifier",
    "education verifier": "education_verifier",
    "address verifier": "address_verifier",
    "database verifier": "database_verifier",
    "criminal verifier": "criminal_verifier",
    "drug test verifier": "drug_test_verifier",
    "courtroom verifier": "courtroom_verifier",
  };

  return roleMap[value] || value;
}

/* =========================================================
   PRIVATE ROUTE
   ========================================================= */

function PrivateRoute({ children, role }) {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (!role) {
    return children;
  }

  const currentRole = normalizeRole(user.role);

  const allowedRoles = Array.isArray(role)
    ? role.map(normalizeRole)
    : [normalizeRole(role)];

  if (currentRole === "admin") {
    return children;
  }

  if (allowedRoles.includes(currentRole)) {
    return children;
  }

  return <Navigate to={getRoleRoute(currentRole)} replace />;
}

/* =========================================================
   APPLICATION
   ========================================================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client-register" element={<ClientRegistration />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/verifyaccount" element={<VerifyAccount />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/confirmpassword" element={<Confrimpassword />} />
        <Route
          path="/candidate-verification"
          element={<CandidateVerificationWizard />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ADMIN - ALL CASES */}
        <Route
          path="/AllCases"
          element={
            <PrivateRoute role="admin">
              <AllCases />
            </PrivateRoute>
          }
        />

        {/* ADMIN - ADD CASE */}
        <Route
          path="/AddCase"
          element={
            <PrivateRoute role={["admin", "allocator", "client"]}>
              <AddCase />
            </PrivateRoute>
          }
        />

        {/* ADMIN - ALL CLIENTS */}
        <Route
          path="/AllClients"
          element={
            <PrivateRoute role="admin">
              <AllClients />
            </PrivateRoute>
          }
        />

        {/* TL MANAGEMENT */}
        <Route
          path="/AddNewTl"
          element={
            <PrivateRoute role="admin">
              <AddNewTl />
            </PrivateRoute>
          }
        />

        <Route
          path="/Permissions"
          element={
            <PrivateRoute role="admin">
              <Permissions />
            </PrivateRoute>
          }
        />

        <Route
          path="/ViewPermission"
          element={
            <PrivateRoute role="admin">
              <ViewPermission />
            </PrivateRoute>
          }
        />

        {/* SUB USER MANAGEMENT */}
        <Route
          path="/SubUsers"
          element={
            <PrivateRoute role="admin">
              <SubUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/SubUserPermissions"
          element={
            <PrivateRoute role="admin">
              <SubUserPermission />
            </PrivateRoute>
          }
        />

        {/* ADMIN - INNER USER PROFILES */}
        <Route
          path="/CriminalUserProfile"
          element={
            <PrivateRoute role="admin">
              <CriminalUserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/DatabaseUserProfile"
          element={
            <PrivateRoute role="admin">
              <DatabaseUserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/EducationUserProfile"
          element={
            <PrivateRoute role="admin">
              <EducationUserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/EmploymentUserProfile"
          element={
            <PrivateRoute role="admin">
              <EmploymentUserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddressUserProfile"
          element={
            <PrivateRoute role="admin">
              <AddressUserProfile />
            </PrivateRoute>
          }
        />

        {/* ADMIN - OTHER MANAGEMENT */}
        <Route
          path="/AddClient"
          element={
            <PrivateRoute role="admin">
              <AddClient />
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

        <Route
          path="/AddCompany"
          element={
            <PrivateRoute role="admin">
              <CompanyManagement />
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

        {/* ALLOCATOR & VERIFIER */}
        <Route
          path="/Allocator"
          element={
            <PrivateRoute role="allocator">
              <Allocator />
            </PrivateRoute>
          }
        />

        <Route
          path="/Verifyer"
          element={
            <PrivateRoute
              role={[
                "verifier",
                "employment_verifier",
                "education_verifier",
                "address_verifier",
                "database_verifier",
                "criminal_verifier",
                "drug_test_verifier",
                "courtroom_verifier",
              ]}
            >
              <Verifyer />
            </PrivateRoute>
          }
        />

        {/* EMPLOYMENT */}
        <Route
          path="/emploment"
          element={
            <PrivateRoute
              role={[
                "verifier",
                "employment_verifier",
                "check_manager",
              ]}
            >
              <Emploment />
            </PrivateRoute>
          }
        />

        <Route
          path="/StatusEmploment"
          element={
            <PrivateRoute
              role={[
                "verifier",
                "employment_verifier",
                "check_manager",
              ]}
            >
              <StatusEmploment />
            </PrivateRoute>
          }
        />

        {/* VERIFICATION CHECKS */}
        <Route
          path="/EmploymentCheck"
          element={
            <PrivateRoute role="admin">
              <EmploymentCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/EducationCheck"
          element={
            <PrivateRoute role="admin">
              <EducationCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddressCheck"
          element={
            <PrivateRoute role="admin">
              <AddressCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/DatabaseCheck"
          element={
            <PrivateRoute role="admin">
              <DatabaseCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/CriminalCheck"
          element={
            <PrivateRoute role="admin">
              <CriminalCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/DrugtestCheck"
          element={
            <PrivateRoute role="admin">
              <DrugtestCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/CourtroomCheck"
          element={
            <PrivateRoute role="admin">
              <CourtroomCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddCheckType/New"
          element={
            <PrivateRoute role="admin">
              <AddChecktype />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddCheckType/:id"
          element={
            <PrivateRoute role="admin">
              <AddChecktype />
            </PrivateRoute>
          }
        />

        <Route
          path="/VerificationCheck/:key"
          element={
            <PrivateRoute role="admin">
              <VerificationCheck />
            </PrivateRoute>
          }
        />

        {/* OTHER ROLES */}
        <Route
          path="/Specialist"
          element={
            <PrivateRoute role="report_writing">
              <Specialist />
            </PrivateRoute>
          }
        />

        <Route
          path="/Intake"
          element={
            <PrivateRoute role="pvt_qc">
              <Intake />
            </PrivateRoute>
          }
        />

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

        <Route
          path="/clientportal"
          element={
            <PrivateRoute role={["onboarding", "client"]}>
              <Clientportal />
            </PrivateRoute>
          }
        />

        <Route
          path="/PendingLinks"
          element={
            <PrivateRoute role={["onboarding", "client", "admin"]}>
              <PendingLinks />
            </PrivateRoute>
          }
        />

        <Route
          path="/Settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* TL MANAGEMENT & PAGES ROUTES */}
        <Route
          path="/TLDashboard"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/TLEducationCheck"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLEducationCheck />
            </PrivateRoute>
          }
        />

        <Route
          path="/TLAllocator"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLAllocator />
            </PrivateRoute>
          }
        />

        <Route
          path="/TLIntake"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLIntake />
            </PrivateRoute>
          }
        />

        <Route
          path="/TLAddInstitution"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLAddInstitution />
            </PrivateRoute>
          }
        />

        <Route
          path="/TLViewPermission"
          element={
            <PrivateRoute role={["tl", "admin"]}>
              <TLViewPermission />
            </PrivateRoute>
          }
        />

        {/* UNKNOWN ROUTE - ALWAYS KEEP THIS AT THE BOTTOM */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

/* =========================================================
   REACT ROOT
   ========================================================= */

const container = document.getElementById("app");

if (!container) {
  throw new Error("React root element #app was not found.");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
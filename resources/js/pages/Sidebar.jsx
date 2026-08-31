// // import { useNavigate, useLocation } from "react-router-dom";

// // function getUser() {
// //   try {
// //     return JSON.parse(localStorage.getItem("user")) || {};
// //   } catch {
// //     return {};
// //   }
// // }

// // // Helper to normalize role (handles spelling variations)
// // const normalizeRole = (role) => {
// //   if (!role) return "admin";

// //   const r = role.toString().toLowerCase().trim();

// //   const roleMap = {
// //     verifier: "verifyer",
// //     verifyer: "verifyer",
// //     employment_verifier: "employment_verifier",
// //     education_verifier: "education_verifier",
// //     address_verifier: "address_verifier",
// //     database_verifier: "database_verifier",
// //     criminal_verifier: "criminal_verifier",
// //     drug_test_verifier: "drug_test_verifier",
// //     courtroom_verifier: "courtroom_verifier",
// //     "employment verifier": "employment_verifier",
// //     "education verifier": "education_verifier",
// //   };

// //   return roleMap[r] || r;
// // };

// // // Common tabs
// // const STANDARD_CASE_TABS = (basePath) => [
// //   {
// //     path: `${basePath}?tab=pending`,
// //     label: "Active Cases",
// //     img: "images/sidebar/wip-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?tab=completed`,
// //     label: "Completed Cases",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?tab=all`,
// //     label: "Total Cases",
// //     img: "images/sidebar/cases-icon.svg",
// //   },
// // ];

// // // Verifier tabs
// // const VERIFIER_TABS = (basePath) => [
// //   {
// //     path: `${basePath}?view=active`,
// //     label: "Active Cases",
// //     img: "images/sidebar/wip-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=completed`,
// //     label: "Completed",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=clear`,
// //     label: "Clear",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=discrepancy`,
// //     label: "Discrepancy",
// //     img: "images/sidebar/setting-icon.svg",
// //   },
// // ];

// // const ROLE_NAV = {
// //   admin: [
// //     { path: "/dashboard", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/AddClient", label: "Add Client", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verifier Cases", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Specialist", label: "Report Writing", img: "images/sidebar/report-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/UserManagement", label: "User Management", img: "images/sidebar/clients-icon.svg" },
// //     { path: "/PendingRegistrations", label: "Pending Registrations", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Apiintegretion", label: "API Integration", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Settings", label: "Settings", img: "images/sidebar/setting-icon.svg" },
// //   ],

// //   client: [
// //     { path: "/Client", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Client?tab=all", label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Client?tab=pending", label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Client?tab=completed", label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/chart-bar-regular-full.svg" },
// //     { path: "/Trends", label: "Reports & Trends", img: "images/sidebar/money-check-dollar-solid-full.svg" },
// //     { path: "/ClientBilling", label: "Billing", img: "images/sidebar/trend-icon.svg" },
// //   ],

// //   allocator: [
// //     { path: "/Allocator", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Allocator"),
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   verifyer: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   employment_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //     { path: "/emploment", label: "Employment Check", img: "images/sidebar/report-icon.svg" },
// //   ],

// //   education_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   address_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   database_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   criminal_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   drug_test_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   courtroom_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   check_manager: [
// //     { path: "/AllCases", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verification", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/emploment", label: "Employment", img: "images/sidebar/report-icon.svg" },
// //     { path: "/StatusEmploment", label: "Employment Status", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/UserManagement", label: "Team", img: "images/sidebar/clients-icon.svg" },
// //   ],

// //   report_writing: [
// //     { path: "/Specialist", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Specialist"),
// //     { path: "/AllCases", label: "Case Reference", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   pvt_qc: [
// //     { path: "/Intake", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/Intake?tab=active", label: "Active", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake?tab=approved", label: "Approved", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/Intake?tab=incomplete", label: "Incomplete", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Intake?tab=clear-rate", label: "Clear Rate", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   onboarding: [
// //     { path: "/clientportal", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/AddCase", label: "New Case", img: "images/sidebar/plus-solid-full.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //   ],
// // };

// // export default function Sidebar() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const user = getUser();
// //   const rawRole = user.role || "admin";
// //   const role = normalizeRole(rawRole);

// //   const navItems = ROLE_NAV[role] || ROLE_NAV.admin;

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     navigate("/");
// //   };

// //   return (
// //     <aside id="sidebar">
// //       <div className="brand">
// //         <img src="/images/login/logo.png" alt="SATYAPAN" />
// //         <img
// //           src="/images/login/logo-small.png"
// //           alt=""
// //           className="collapsed"
// //         />
// //       </div>

// //       <ul className="side-menu">
// //         {navItems.map((item, idx) => {
// //           const [itemPath, itemQuery] = item.path.split("?");

// //           const isActive = (() => {
// //             if (location.pathname !== itemPath) return false;

// //             if (!itemQuery) {
// //               return !location.search;
// //             }

// //             return location.search === `?${itemQuery}`;
// //           })();

// //           return (
// //             <li
// //               key={`${item.path}-${idx}`}
// //               className={isActive ? "active" : ""}
// //             >
// //               <a
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   navigate(item.path);
// //                 }}
// //               >
// //                 <img
// //                   src={item.img}
// //                   alt={item.label}
// //                   onError={(e) => {
// //                     e.target.style.display = "none";
// //                   }}
// //                 />

// //                 <span className="text">{item.label}</span>
// //               </a>
// //             </li>
// //           );
// //         })}

// //         <li className="logout-menu">
// //           <a
// //             href="#"
// //             onClick={(e) => {
// //               e.preventDefault();
// //               logout();
// //             }}
// //           >
// //             <img
// //               src="/images/sidebar/logout-icon.svg"
// //               alt="Logout"
// //               onError={(e) => {
// //                 e.target.style.display = "none";
// //               }}
// //             />

// //             <span className="text logout">Logout</span>
// //           </a>
// //         </li>
// //       </ul>
// //     </aside>
// //   );
// // }
// // import { useNavigate, useLocation } from "react-router-dom";

// // function getUser() {
// //   try {
// //     return JSON.parse(localStorage.getItem("user")) || {};
// //   } catch {
// //     return {};
// //   }
// // }

// // // Helper to normalize role (handles spelling variations)
// // const normalizeRole = (role) => {
// //   if (!role) return "admin";

// //   const r = role.toString().toLowerCase().trim();

// //   const roleMap = {
// //     verifier: "verifyer",
// //     verifyer: "verifyer",
// //     employment_verifier: "employment_verifier",
// //     education_verifier: "education_verifier",
// //     address_verifier: "address_verifier",
// //     database_verifier: "database_verifier",
// //     criminal_verifier: "criminal_verifier",
// //     drug_test_verifier: "drug_test_verifier",
// //     courtroom_verifier: "courtroom_verifier",
// //     "employment verifier": "employment_verifier",
// //     "education verifier": "education_verifier",
// //   };

// //   return roleMap[r] || r;
// // };

// // // Common tabs
// // const STANDARD_CASE_TABS = (basePath) => [
// //   {
// //     path: `${basePath}?tab=pending`,
// //     label: "Active Cases",
// //     img: "images/sidebar/wip-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?tab=completed`,
// //     label: "Completed Cases",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?tab=all`,
// //     label: "Total Cases",
// //     img: "images/sidebar/cases-icon.svg",
// //   },
// // ];

// // // Verifier tabs
// // const VERIFIER_TABS = (basePath) => [
// //   {
// //     path: `${basePath}?view=active`,
// //     label: "Active Cases",
// //     img: "images/sidebar/wip-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=completed`,
// //     label: "Completed",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=clear`,
// //     label: "Clear",
// //     img: "images/sidebar/completed-icon.svg",
// //   },
// //   {
// //     path: `${basePath}?view=discrepancy`,
// //     label: "Discrepancy",
// //     img: "images/sidebar/setting-icon.svg",
// //   },
// // ];

// // const ROLE_NAV = {
// //   admin: [
// //     { path: "/dashboard", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/AllClients", label: "All Clients", img: "images/sidebar/clients-icon.svg" },
// //     { path: "/AddClient", label: "Add Client", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verifier Cases", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Specialist", label: "Report Writing", img: "images/sidebar/report-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/UserManagement", label: "User Management", img: "images/sidebar/clients-icon.svg" },
// //     { path: "/PendingRegistrations", label: "Pending Registrations", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Apiintegretion", label: "API Integration", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Settings", label: "Settings", img: "images/sidebar/setting-icon.svg" },
// //   ],

// //   client: [
// //     { path: "/Client", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Client?tab=all", label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Client?tab=pending", label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Client?tab=completed", label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/chart-bar-regular-full.svg" },
// //     { path: "/Trends", label: "Reports & Trends", img: "images/sidebar/money-check-dollar-solid-full.svg" },
// //     { path: "/ClientBilling", label: "Billing", img: "images/sidebar/trend-icon.svg" },
// //   ],

// //   allocator: [
// //     { path: "/Allocator", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Allocator"),
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   verifyer: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   employment_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //     { path: "/emploment", label: "Employment Check", img: "images/sidebar/report-icon.svg" },
// //   ],

// //   education_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   address_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   database_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   criminal_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   drug_test_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   courtroom_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   check_manager: [
// //     { path: "/AllCases", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verification", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/emploment", label: "Employment", img: "images/sidebar/report-icon.svg" },
// //     { path: "/StatusEmploment", label: "Employment Status", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/UserManagement", label: "Team", img: "images/sidebar/clients-icon.svg" },
// //   ],

// //   report_writing: [
// //     { path: "/Specialist", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Specialist"),
// //     { path: "/AllCases", label: "Case Reference", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   pvt_qc: [
// //     { path: "/Intake", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/Intake?tab=active", label: "Active", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake?tab=approved", label: "Approved", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/Intake?tab=incomplete", label: "Incomplete", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Intake?tab=clear-rate", label: "Clear Rate", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   onboarding: [
// //     { path: "/clientportal", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/AddCase", label: "New Case", img: "images/sidebar/plus-solid-full.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //   ],
// // };

// // export default function Sidebar() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const user = getUser();
// //   const rawRole = user.role || "admin";
// //   const role = normalizeRole(rawRole);

// //   const navItems = ROLE_NAV[role] || ROLE_NAV.admin;

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     navigate("/");
// //   };

// //   return (
// //     <aside id="sidebar">
// //       <div className="brand">
// //         <img src="/images/login/logo.png" alt="SATYAPAN" />
// //         <img
// //           src="/images/login/logo-small.png"
// //           alt=""
// //           className="collapsed"
// //         />
// //       </div>

// //       <ul className="side-menu">
// //         {navItems.map((item, idx) => {
// //           const [itemPath, itemQuery] = item.path.split("?");

// //           const isActive = (() => {
// //             if (location.pathname !== itemPath) return false;

// //             if (!itemQuery) {
// //               return !location.search;
// //             }

// //             return location.search === `?${itemQuery}`;
// //           })();

// //           return (
// //             <li
// //               key={`${item.path}-${idx}`}
// //               className={isActive ? "active" : ""}
// //             >
// //               <a
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   navigate(item.path);
// //                 }}
// //               >
// //                 <img
// //                   src={item.img}
// //                   alt={item.label}
// //                   onError={(e) => {
// //                     e.target.style.display = "none";
// //                   }}
// //                 />

// //                 <span className="text">{item.label}</span>
// //               </a>
// //             </li>
// //           );
// //         })}

// //         <li className="logout-menu">
// //           <a
// //             href="#"
// //             onClick={(e) => {
// //               e.preventDefault();
// //               logout();
// //             }}
// //           >
// //             <img
// //               src="/images/sidebar/logout-icon.svg"
// //               alt="Logout"
// //               onError={(e) => {
// //                 e.target.style.display = "none";
// //               }}
// //             />

// //             <span className="text logout">Logout</span>
// //           </a>
// //         </li>
// //       </ul>
// //     </aside>
// //   );
// // }

// // import { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // function getUser() {
// //   try {
// //     return JSON.parse(localStorage.getItem("user")) || {};
// //   } catch {
// //     return {};
// //   }
// // }

// // const normalizeRole = (role) => {
// //   if (!role) return "admin";
// //   const r = role.toString().toLowerCase().trim();
// //   const roleMap = {
// //     verifier: "verifyer",
// //     verifyer: "verifyer",
// //     employment_verifier: "employment_verifier",
// //     education_verifier: "education_verifier",
// //     address_verifier: "address_verifier",
// //     database_verifier: "database_verifier",
// //     criminal_verifier: "criminal_verifier",
// //     drug_test_verifier: "drug_test_verifier",
// //     courtroom_verifier: "courtroom_verifier",
// //     "employment verifier": "employment_verifier",
// //     "education verifier": "education_verifier",
// //   };
// //   return roleMap[r] || r;
// // };

// // const STANDARD_CASE_TABS = (basePath) => [
// //   { path: `${basePath}?tab=pending`, label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
// //   { path: `${basePath}?tab=completed`, label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
// //   { path: `${basePath}?tab=all`, label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
// // ];

// // const VERIFIER_TABS = (basePath) => [
// //   { path: `${basePath}?view=active`, label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
// //   { path: `${basePath}?view=completed`, label: "Completed", img: "images/sidebar/completed-icon.svg" },
// //   { path: `${basePath}?view=clear`, label: "Clear", img: "images/sidebar/completed-icon.svg" },
// //   { path: `${basePath}?view=discrepancy`, label: "Discrepancy", img: "images/sidebar/setting-icon.svg" },
// // ];

// // const CHECK_TYPE_SUBMENU = [
// //   { path: "/EmploymentCheck", label: "Employment" },
// //   { path: "/AddCheckType/Education", label: "Education" },
// //   { path: "/AddCheckType/Address", label: "Address" },
// //   { path: "/AddCheckType/Database", label: "Database" },
// //   { path: "/AddCheckType/Criminal", label: "Criminal" },
// //   { path: "/AddCheckType/DrugTest", label: "Drug Test" },
// //   { path: "/AddCheckType/Courtroom", label: "Courtroom" },
// //   { path: "/AddCheckType/New", label: "Add New Check" },
// // ];

// // const ROLE_NAV = {
// //   admin: [
// //     { path: "/dashboard", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/wip-icon.svg" },
    
// //     {
// //       label: "Add Check Type",
// //       img: "images/sidebar/setting-icon.svg",
// //       submenu: CHECK_TYPE_SUBMENU,
// //     },

// //     { path: "/AllClients", label: "All Clients", img: "images/sidebar/clients-icon.svg" },
// //     { path: "/AddClient", label: "Add Client", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verifier Cases", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Specialist", label: "Report Writing", img: "images/sidebar/report-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     // { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/UserManagement", label: "User Management", img: "images/sidebar/clients-icon.svg" },
// //     { path: "/PendingRegistrations", label: "Pending Registrations", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Apiintegretion", label: "API Integration", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Settings", label: "Settings", img: "images/sidebar/setting-icon.svg" },
// //   ],

// //   client: [
// //     { path: "/Client", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/AddCase", label: "Add Case", img: "images/sidebar/plus-solid-full-white.svg" },
// //     { path: "/Client?tab=all", label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Client?tab=pending", label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Client?tab=completed", label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/chart-bar-regular-full.svg" },
// //     { path: "/Trends", label: "Reports & Trends", img: "images/sidebar/money-check-dollar-solid-full.svg" },
// //     { path: "/ClientBilling", label: "Billing", img: "images/sidebar/trend-icon.svg" },
// //   ],

// //   allocator: [
// //     { path: "/Allocator", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Allocator"),
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   verifyer: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   employment_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //     { path: "/emploment", label: "Employment Check", img: "images/sidebar/report-icon.svg" },
// //   ],

// //   education_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   address_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   database_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   criminal_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   drug_test_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   courtroom_verifier: [
// //     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...VERIFIER_TABS("/Verifyer"),
// //   ],

// //   check_manager: [
// //     { path: "/AllCases", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/Verifyer", label: "Verification", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/emploment", label: "Employment", img: "images/sidebar/report-icon.svg" },
// //     { path: "/StatusEmploment", label: "Employment Status", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
// //     { path: "/UserManagement", label: "Team", img: "images/sidebar/clients-icon.svg" },
// //   ],

// //   report_writing: [
// //     { path: "/Specialist", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/Specialist"),
// //     { path: "/AllCases", label: "Case Reference", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   pvt_qc: [
// //     { path: "/Intake", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     { path: "/Intake?tab=active", label: "Active", img: "images/sidebar/wip-icon.svg" },
// //     { path: "/Intake?tab=approved", label: "Approved", img: "images/sidebar/completed-icon.svg" },
// //     { path: "/Intake?tab=incomplete", label: "Incomplete", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/Intake?tab=clear-rate", label: "Clear Rate", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
// //   ],

// //   onboarding: [
// //     { path: "/clientportal", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
// //     ...STANDARD_CASE_TABS("/AllCases"),
// //     { path: "/AddCase", label: "New Case", img: "images/sidebar/plus-solid-full.svg" },
// //     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
// //     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
// //     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
// //   ],
// // };

// // export default function Sidebar() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const user = getUser();
// //   const rawRole = user.role || "admin";
// //   const role = normalizeRole(rawRole);

// //   const navItems = ROLE_NAV[role] || ROLE_NAV.admin;
// //   const [isCheckTypeOpen, setIsCheckTypeOpen] = useState(false);
// //   const [hoveredSubIndex, setHoveredSubIndex] = useState(null);

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     navigate("/");
// //   };

// //   return (
// //     <aside id="sidebar">
// //       <div className="brand">
// //         <img src="/images/login/logo.png" alt="SATYAPAN" />
// //         <img src="/images/login/logo-small.png" alt="" className="collapsed" />
// //       </div>

// //       <ul className="side-menu">
// //         {navItems.map((item, idx) => {
// //           if (item.submenu) {
// //             const isChildActive = item.submenu.some(
// //               (sub) => location.pathname === sub.path.split("?")[0]
// //             );
// //             const isOpen = isCheckTypeOpen || isChildActive;

// //             return (
// //               <li
// //                 key={`${item.label}-${idx}`}
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   width: "100%",
// //                 }}
// //               >
// //                 <a
// //                   href="#"
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     setIsCheckTypeOpen(!isCheckTypeOpen);
// //                   }}
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                     width: "100%",
// //                   }}
// //                 >
// //                   <span style={{ display: "flex", alignItems: "center" }}>
// //                     <img
// //                       src={item.img}
// //                       alt={item.label}
// //                       onError={(e) => {
// //                         e.target.style.display = "none";
// //                       }}
// //                     />
// //                     <span className="text">{item.label}</span>
// //                   </span>

// //                   <span
// //                     style={{
// //                       transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
// //                       transition: "transform 0.2s ease",
// //                       fontSize: "10px",
// //                       marginLeft: "auto",
// //                       display: "inline-block",
// //                     }}
// //                   >
// //                     ▼
// //                   </span>
// //                 </a>

// //                 {/* Submenu Vertical Nested List */}
// //                 {isOpen && (
// //                   <ul
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       width: "100%",
// //                       paddingLeft: "35px",
// //                       margin: "2px 0 8px 0",
// //                       listStyle: "none",
// //                       boxSizing: "border-box",
// //                     }}
// //                   >
// //                     {item.submenu.map((sub, subIdx) => {
// //                       const isSubActive =
// //                         location.pathname === sub.path.split("?")[0];
// //                       const isHovered = hoveredSubIndex === subIdx;

// //                       return (
// //                         <li
// //                           key={`${sub.path}-${subIdx}`}
// //                           style={{
// //                             width: "100%",
// //                             listStyle: "none",
// //                             margin: "2px 0",
// //                           }}
// //                         >
// //                           <a
// //                             href="#"
// //                             onMouseEnter={() => setHoveredSubIndex(subIdx)}
// //                             onMouseLeave={() => setHoveredSubIndex(null)}
// //                             onClick={(e) => {
// //                               e.preventDefault();
// //                               navigate(sub.path);
// //                             }}
// //                             style={{
// //                               display: "block",
// //                               width: "100%",
// //                               padding: "8px 12px",
// //                               borderRadius: "6px",
// //                               fontSize: "13px",
// //                               textDecoration: "none",
// //                               color: "#ffffff",
// //                               backgroundColor: isSubActive || isHovered
// //                                 ? "#008080"
// //                                 : "transparent",
// //                               transition: "background-color 0.2s ease",
// //                               boxSizing: "border-box",
// //                             }}
// //                           >
// //                             <span className="text" style={{ color: "#ffffff" }}>
// //                               {sub.label}
// //                             </span>
// //                           </a>
// //                         </li>
// //                       );
// //                     })}
// //                   </ul>
// //                 )}
// //               </li>
// //             );
// //           }

// //           const [itemPath, itemQuery] = item.path.split("?");

// //           const isActive = (() => {
// //             if (location.pathname !== itemPath) return false;
// //             if (!itemQuery) return !location.search;
// //             return location.search === `?${itemQuery}`;
// //           })();

// //           return (
// //             <li key={`${item.path}-${idx}`} className={isActive ? "active" : ""}>
// //               <a
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   navigate(item.path);
// //                 }}
// //               >
// //                 <img
// //                   src={item.img}
// //                   alt={item.label}
// //                   onError={(e) => {
// //                     e.target.style.display = "none";
// //                   }}
// //                 />
// //                 <span className="text">{item.label}</span>
// //               </a>
// //             </li>
// //           );
// //         })}

// //         <li className="logout-menu">
// //           <a
// //             href="#"
// //             onClick={(e) => {
// //               e.preventDefault();
// //               logout();
// //             }}
// //           >
// //             <img
// //               src="/images/sidebar/logout-icon.svg"
// //               alt="Logout"
// //               onError={(e) => {
// //                 e.target.style.display = "none";
// //               }}
// //             />
// //             <span className="text logout">Logout</span>
// //           </a>
// //         </li>
// //       </ul>
// //     </aside>
// //   );
// // }



// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function getUser() {
//   try {
//     return JSON.parse(localStorage.getItem("user")) || {};
//   } catch {
//     return {};
//   }
// }

// const normalizeRole = (role) => {
//   if (!role) return "admin";
//   const r = role.toString().toLowerCase().trim();
//   const roleMap = {
//     verifier: "verifyer",
//     verifyer: "verifyer",
//     employment_verifier: "employment_verifier",
//     education_verifier: "education_verifier",
//     address_verifier: "address_verifier",
//     database_verifier: "database_verifier",
//     criminal_verifier: "criminal_verifier",
//     drug_test_verifier: "drug_test_verifier",
//     courtroom_verifier: "courtroom_verifier",
//     "employment verifier": "employment_verifier",
//     "education verifier": "education_verifier",
//   };
//   return roleMap[r] || r;
// };

// const STANDARD_CASE_TABS = (basePath) => [
//   { path: `${basePath}?tab=pending`, label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
//   { path: `${basePath}?tab=completed`, label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
//   { path: `${basePath}?tab=all`, label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
// ];

// const VERIFIER_TABS = (basePath) => [
//   { path: `${basePath}?view=active`, label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
//   { path: `${basePath}?view=completed`, label: "Completed", img: "images/sidebar/completed-icon.svg" },
//   { path: `${basePath}?view=clear`, label: "Clear", img: "images/sidebar/completed-icon.svg" },
//   { path: `${basePath}?view=discrepancy`, label: "Discrepancy", img: "images/sidebar/setting-icon.svg" },
// ];

// const CHECK_TYPE_SUBMENU = [
//   { path: "/EmploymentCheck", label: "Employment" },
//   { path: "/EducationCheck", label: "Education" },
//   { path: "/AddressCheck", label: "Address" },
//   { path: "/DatabaseCheck", label: "Database" },
//   { path: "/CriminalCheck", label: "Criminal" },
//   { path: "/DrugtestCheck", label: "Drug Test" },
//   { path: "/CourtroomCheck", label: "Courtroom" },
//   { path: "/AddCheckType/New", label: "Add New Product" },
// ];

// // Client Management Submenu
// const CLIENT_MANAGEMENT_SUBMENU = [
//   { path: "/AllClients", label: "All Clients" },
//   { path: "/AddClient", label: "Add Client" },
// ];

// const ROLE_NAV = {
//   admin: [
//     { path: "/dashboard", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
//     { path: "/AddCase", label: "Add Case", img: "images/sidebar/wip-icon.svg" },
    
//     {
//       label: "Verifications",
//       img: "images/sidebar/setting-icon.svg",
//       submenu: CHECK_TYPE_SUBMENU,
//       id: "checkType",
//     },

//     {
//       label: "Client Management",
//       img: "images/sidebar/clients-icon.svg",
//       submenu: CLIENT_MANAGEMENT_SUBMENU,
//       id: "clientManagement",
//     },

//     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
//     { path: "/Verifyer", label: "Verifier Cases", img: "images/sidebar/setting-icon.svg" },
//     { path: "/Specialist", label: "Report Writing", img: "images/sidebar/report-icon.svg" },
//     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
//     { path: "/UserManagement", label: "User Management", img: "images/sidebar/clients-icon.svg" },
//     { path: "/PendingRegistrations", label: "Pending Registrations", img: "images/sidebar/setting-icon.svg" },
//     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
//     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
//     { path: "/Apiintegretion", label: "API Integration", img: "images/sidebar/setting-icon.svg" },
//     { path: "/Settings", label: "Settings", img: "images/sidebar/setting-icon.svg" },
//   ],

//   client: [
//     { path: "/Client", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     { path: "/AddCase", label: "Add Case", img: "images/sidebar/plus-solid-full-white.svg" },
//     { path: "/Client?tab=all", label: "Total Cases", img: "images/sidebar/cases-icon.svg" },
//     { path: "/Client?tab=pending", label: "Active Cases", img: "images/sidebar/wip-icon.svg" },
//     { path: "/Client?tab=completed", label: "Completed Cases", img: "images/sidebar/completed-icon.svg" },
//     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/chart-bar-regular-full.svg" },
//     { path: "/Trends", label: "Reports & Trends", img: "images/sidebar/money-check-dollar-solid-full.svg" },
//     { path: "/ClientBilling", label: "Billing", img: "images/sidebar/trend-icon.svg" },
//   ],

//   allocator: [
//     { path: "/Allocator", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...STANDARD_CASE_TABS("/Allocator"),
//     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
//   ],

//   verifyer: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   employment_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//     { path: "/emploment", label: "Employment Check", img: "images/sidebar/report-icon.svg" },
//   ],

//   education_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   address_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   database_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   criminal_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   drug_test_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   courtroom_verifier: [
//     { path: "/Verifyer", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...VERIFIER_TABS("/Verifyer"),
//   ],

//   check_manager: [
//     { path: "/AllCases", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...STANDARD_CASE_TABS("/AllCases"),
//     { path: "/Allocator", label: "Case Allocation", img: "images/sidebar/cases-icon.svg" },
//     { path: "/Verifyer", label: "Verification", img: "images/sidebar/setting-icon.svg" },
//     { path: "/emploment", label: "Employment", img: "images/sidebar/report-icon.svg" },
//     { path: "/StatusEmploment", label: "Employment Status", img: "images/sidebar/wip-icon.svg" },
//     { path: "/Intake", label: "QC Intake", img: "images/sidebar/cases-icon.svg" },
//     { path: "/UserManagement", label: "Team", img: "images/sidebar/clients-icon.svg" },
//   ],

//   report_writing: [
//     { path: "/Specialist", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...STANDARD_CASE_TABS("/Specialist"),
//     { path: "/AllCases", label: "Case Reference", img: "images/sidebar/cases-icon.svg" },
//   ],

//   pvt_qc: [
//     { path: "/Intake", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     { path: "/Intake?tab=active", label: "Active", img: "images/sidebar/wip-icon.svg" },
//     { path: "/Intake?tab=approved", label: "Approved", img: "images/sidebar/completed-icon.svg" },
//     { path: "/Intake?tab=incomplete", label: "Incomplete", img: "images/sidebar/setting-icon.svg" },
//     { path: "/Intake?tab=clear-rate", label: "Clear Rate", img: "images/sidebar/trend-icon.svg" },
//     { path: "/AllCases", label: "All Cases", img: "images/sidebar/cases-icon.svg" },
//   ],

//   onboarding: [
//     { path: "/clientportal", label: "Dashboard", img: "images/sidebar/home-icon.svg" },
//     ...STANDARD_CASE_TABS("/AllCases"),
//     { path: "/AddCase", label: "New Case", img: "images/sidebar/plus-solid-full.svg" },
//     { path: "/clientportal", label: "Generate Links", img: "images/sidebar/trend-icon.svg" },
//     { path: "/AddInstitution", label: "Add Institution", img: "images/sidebar/setting-icon.svg" },
//     { path: "/AddCompany", label: "Add Company", img: "images/sidebar/setting-icon.svg" },
//   ],
// };

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = getUser();
//   const rawRole = user.role || "admin";
//   const role = normalizeRole(rawRole);

//   const navItems = ROLE_NAV[role] || ROLE_NAV.admin;

//   // Track active open submenu states separately
//   const [openMenus, setOpenMenus] = useState({});
//   const [hoveredSubIndex, setHoveredSubIndex] = useState(null);

//   const toggleSubmenu = (menuId) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [menuId]: !prev[menuId],
//     }));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <aside id="sidebar">
//       <div className="brand">
//         <img src="/images/login/logo.png" alt="SATYAPAN" />
//         <img src="/images/login/logo-small.png" alt="" className="collapsed" />
//       </div>

//       <ul className="side-menu">
//         {navItems.map((item, idx) => {
//           if (item.submenu) {
//             const menuId = item.id || `menu-${idx}`;
//             const isChildActive = item.submenu.some(
//               (sub) => location.pathname === sub.path.split("?")[0]
//             );
//             const isOpen = openMenus[menuId] !== undefined ? openMenus[menuId] : isChildActive;

//             return (
//               <li
//                 key={`${item.label}-${idx}`}
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   width: "100%",
//                 }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     toggleSubmenu(menuId);
//                   }}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     width: "100%",
//                   }}
//                 >
//                   <span style={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src={item.img}
//                       alt={item.label}
//                       onError={(e) => {
//                         e.target.style.display = "none";
//                       }}
//                     />
//                     <span className="text">{item.label}</span>
//                   </span>

//                   <span
//                     style={{
//                       transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//                       transition: "transform 0.2s ease",
//                       fontSize: "10px",
//                       marginLeft: "auto",
//                       display: "inline-block",
//                     }}
//                   >
//                     ▼
//                   </span>
//                 </a>

//                 {/* Submenu Vertical Nested List */}
//                 {isOpen && (
//                   <ul
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       width: "100%",
//                       paddingLeft: "35px",
//                       margin: "2px 0 8px 0",
//                       listStyle: "none",
//                       boxSizing: "border-box",
//                     }}
//                   >
//                     {item.submenu.map((sub, subIdx) => {
//                       const isSubActive =
//                         location.pathname === sub.path.split("?")[0];
//                       const uniqueSubKey = `${menuId}-${subIdx}`;
//                       const isHovered = hoveredSubIndex === uniqueSubKey;

//                       return (
//                         <li
//                           key={`${sub.path}-${subIdx}`}
//                           style={{
//                             width: "100%",
//                             listStyle: "none",
//                             margin: "2px 0",
//                           }}
//                         >
//                           <a
//                             href="#"
//                             onMouseEnter={() => setHoveredSubIndex(uniqueSubKey)}
//                             onMouseLeave={() => setHoveredSubIndex(null)}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               navigate(sub.path);
//                             }}
//                             style={{
//                               display: "block",
//                               width: "100%",
//                               padding: "8px 12px",
//                               borderRadius: "6px",
//                               fontSize: "13px",
//                               textDecoration: "none",
//                               color: "#ffffff",
//                               backgroundColor: isSubActive || isHovered
//                                 ? "#008080"
//                                 : "transparent",
//                               transition: "background-color 0.2s ease",
//                               boxSizing: "border-box",
//                             }}
//                           >
//                             <span className="text" style={{ color: "#ffffff" }}>
//                               {sub.label}
//                             </span>
//                           </a>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </li>
//             );
//           }

//           const [itemPath, itemQuery] = item.path.split("?");

//           const isActive = (() => {
//             if (location.pathname !== itemPath) return false;
//             if (!itemQuery) return !location.search;
//             return location.search === `?${itemQuery}`;
//           })();

//           return (
//             <li key={`${item.path}-${idx}`} className={isActive ? "active" : ""}>
//               <a
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(item.path);
//                 }}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.label}
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//                 <span className="text">{item.label}</span>
//               </a>
//             </li>
//           );
//         })}

//         <li className="logout-menu">
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               logout();
//             }}
//           >
//             <img
//               src="/images/sidebar/logout-icon.svg"
//               alt="Logout"
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//             <span className="text logout">Logout</span>
//           </a>
//         </li>
//       </ul>
//     </aside>
//   );
// }
import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";


/* =========================================================
   GET USER
   ========================================================= */

function getUser() {

  try {

    return (
      JSON.parse(
        localStorage.getItem("user")
      ) || {}
    );

  } catch (error) {

    return {};

  }

}


/* =========================================================
   NORMALIZE ROLE
   ========================================================= */

const normalizeRole = (role) => {

  if (!role) {
    return "admin";
  }

  const r = role
    .toString()
    .toLowerCase()
    .trim();


  const roleMap = {

    verifier: "verifyer",

    verifyer: "verifyer",

    employment_verifier:
      "employment_verifier",

    education_verifier:
      "education_verifier",

    address_verifier:
      "address_verifier",

    database_verifier:
      "database_verifier",

    criminal_verifier:
      "criminal_verifier",

    drug_test_verifier:
      "drug_test_verifier",

    courtroom_verifier:
      "courtroom_verifier",

    "employment verifier":
      "employment_verifier",

    "education verifier":
      "education_verifier",

    "address verifier":
      "address_verifier",

    "database verifier":
      "database_verifier",

    "criminal verifier":
      "criminal_verifier",

    "drug test verifier":
      "drug_test_verifier",

    "courtroom verifier":
      "courtroom_verifier",

  };


  return roleMap[r] || r;

};


/* =========================================================
   STANDARD CASE TABS
   ========================================================= */

const STANDARD_CASE_TABS = (basePath) => [

  {
    path: `${basePath}?tab=pending`,
    label: "Active Cases",
    img: "images/sidebar/wip-icon.svg",
  },

  {
    path: `${basePath}?tab=completed`,
    label: "Completed Cases",
    img: "images/sidebar/completed-icon.svg",
  },

  {
    path: `${basePath}?tab=all`,
    label: "Total Cases",
    img: "images/sidebar/cases-icon.svg",
  },

];


/* =========================================================
   VERIFIER TABS
   ========================================================= */

const VERIFIER_TABS = (basePath) => [

  {
    path: `${basePath}?view=active`,
    label: "Active Cases",
    img: "images/sidebar/wip-icon.svg",
  },

  {
    path: `${basePath}?view=completed`,
    label: "Completed",
    img: "images/sidebar/completed-icon.svg",
  },

  {
    path: `${basePath}?view=clear`,
    label: "Clear",
    img: "images/sidebar/completed-icon.svg",
  },

  {
    path: `${basePath}?view=discrepancy`,
    label: "Discrepancy",
    img: "images/sidebar/setting-icon.svg",
  },

];


/* =========================================================
   VERIFICATION SUBMENU
   ========================================================= */

const CHECK_TYPE_SUBMENU = [

  {
    path: "/EmploymentCheck",
    label: "Employment",
  },

  {
    path: "/EducationCheck",
    label: "Education",
  },

  {
    path: "/AddressCheck",
    label: "Address",
  },

  {
    path: "/DatabaseCheck",
    label: "Database",
  },

  {
    path: "/CriminalCheck",
    label: "Criminal",
  },

  {
    path: "/DrugtestCheck",
    label: "Drug Test",
  },

  {
    path: "/CourtroomCheck",
    label: "Courtroom",
  },

  {
    path: "/AddCheckType/New",
    label: "Add New Product",
  },

];


/* =========================================================
   CLIENT MANAGEMENT SUBMENU
   ========================================================= */

const CLIENT_MANAGEMENT_SUBMENU = [

  {
    path: "/AllClients",
    label: "All Clients",
  },

  {
    path: "/AddClient",
    label: "Add Client",
  },

];


/* =========================================================
   ROLE NAVIGATION
   ========================================================= */

const ROLE_NAV = {


  /* =======================================================
     ADMIN
     ======================================================= */

  admin: [

    {
      path: "/dashboard",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    {
      path: "/AllCases",
      label: "All Cases",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/AddCase",
      label: "Add Case",
      img: "images/sidebar/wip-icon.svg",
    },


    /* VERIFICATIONS */

    {
      label: "Verifications",
      img: "images/sidebar/setting-icon.svg",
      submenu: CHECK_TYPE_SUBMENU,
      id: "checkType",
    },


    /* CLIENT MANAGEMENT */

    {
      label: "Client Management",
      img: "images/sidebar/clients-icon.svg",
      submenu: CLIENT_MANAGEMENT_SUBMENU,
      id: "clientManagement",
    },


    {
      path: "/Allocator",
      label: "Case Allocation",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/Verifyer",
      label: "Verifier Cases",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/Specialist",
      label: "Report Writing",
      img: "images/sidebar/report-icon.svg",
    },

    {
      path: "/Intake",
      label: "QC Intake",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/UserManagement",
      label: "User Management",
      img: "images/sidebar/clients-icon.svg",
    },

    {
      path: "/PendingRegistrations",
      label: "Pending Registrations",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/AddInstitution",
      label: "Add Institution",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/AddCompany",
      label: "Add Company",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/Apiintegretion",
      label: "API Integration",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/Settings",
      label: "Settings",
      img: "images/sidebar/setting-icon.svg",
    },

  ],


  /* =======================================================
     CLIENT
     ======================================================= */

  client: [

    {
      path: "/Client",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    {
      path: "/AddCase",
      label: "Add Case",
      img: "images/sidebar/plus-solid-full-white.svg",
    },

    {
      path: "/Client?tab=all",
      label: "Total Cases",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/Client?tab=pending",
      label: "Active Cases",
      img: "images/sidebar/wip-icon.svg",
    },

    {
      path: "/Client?tab=completed",
      label: "Completed Cases",
      img: "images/sidebar/completed-icon.svg",
    },

    {
      path: "/clientportal",
      label: "Generate Links",
      img: "images/sidebar/chart-bar-regular-full.svg",
    },

    {
      path: "/Trends",
      label: "Reports & Trends",
      img: "images/sidebar/money-check-dollar-solid-full.svg",
    },

    {
      path: "/ClientBilling",
      label: "Billing",
      img: "images/sidebar/trend-icon.svg",
    },

  ],


  /* =======================================================
     ALLOCATOR
     ======================================================= */

  allocator: [

    {
      path: "/Allocator",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...STANDARD_CASE_TABS("/Allocator"),

    {
      path: "/AllCases",
      label: "All Cases",
      img: "images/sidebar/cases-icon.svg",
    },

  ],


  /* =======================================================
     VERIFIER
     ======================================================= */

  verifyer: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

  ],


  /* =======================================================
     EMPLOYMENT VERIFIER
     ======================================================= */

  employment_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/emploment",
      label: "Employment Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     EDUCATION VERIFIER
     ======================================================= */

  education_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/EducationCheck",
      label: "Education Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     ADDRESS VERIFIER
     ======================================================= */

  address_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/AddressCheck",
      label: "Address Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     DATABASE VERIFIER
     ======================================================= */

  database_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/DatabaseCheck",
      label: "Database Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     CRIMINAL VERIFIER
     ======================================================= */

  criminal_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/CriminalCheck",
      label: "Criminal Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     DRUG TEST VERIFIER
     ======================================================= */

  drug_test_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/DrugtestCheck",
      label: "Drug Test",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     COURTROOM VERIFIER
     ======================================================= */

  courtroom_verifier: [

    {
      path: "/Verifyer",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...VERIFIER_TABS("/Verifyer"),

    {
      path: "/CourtroomCheck",
      label: "Courtroom Check",
      img: "images/sidebar/report-icon.svg",
    },

  ],


  /* =======================================================
     CHECK MANAGER
     ======================================================= */

  check_manager: [

    {
      path: "/AllCases",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...STANDARD_CASE_TABS("/AllCases"),

    {
      path: "/Allocator",
      label: "Case Allocation",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/Verifyer",
      label: "Verification",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/emploment",
      label: "Employment",
      img: "images/sidebar/report-icon.svg",
    },

    {
      path: "/StatusEmploment",
      label: "Employment Status",
      img: "images/sidebar/wip-icon.svg",
    },

    {
      path: "/Intake",
      label: "QC Intake",
      img: "images/sidebar/cases-icon.svg",
    },

    {
      path: "/UserManagement",
      label: "Team",
      img: "images/sidebar/clients-icon.svg",
    },

  ],


  /* =======================================================
     REPORT WRITING
     ======================================================= */

  report_writing: [

    {
      path: "/Specialist",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...STANDARD_CASE_TABS("/Specialist"),

    {
      path: "/AllCases",
      label: "Case Reference",
      img: "images/sidebar/cases-icon.svg",
    },

  ],


  /* =======================================================
     PVT / QC
     ======================================================= */

  pvt_qc: [

    {
      path: "/Intake",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    {
      path: "/Intake?tab=active",
      label: "Active",
      img: "images/sidebar/wip-icon.svg",
    },

    {
      path: "/Intake?tab=approved",
      label: "Approved",
      img: "images/sidebar/completed-icon.svg",
    },

    {
      path: "/Intake?tab=incomplete",
      label: "Incomplete",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/Intake?tab=clear-rate",
      label: "Clear Rate",
      img: "images/sidebar/trend-icon.svg",
    },

    {
      path: "/AllCases",
      label: "All Cases",
      img: "images/sidebar/cases-icon.svg",
    },

  ],


  /* =======================================================
     ONBOARDING
     ======================================================= */

  onboarding: [

    {
      path: "/clientportal",
      label: "Dashboard",
      img: "images/sidebar/home-icon.svg",
    },

    ...STANDARD_CASE_TABS("/AllCases"),

    {
      path: "/AddCase",
      label: "New Case",
      img: "images/sidebar/plus-solid-full.svg",
    },

    {
      path: "/clientportal",
      label: "Generate Links",
      img: "images/sidebar/trend-icon.svg",
    },

    {
      path: "/AddInstitution",
      label: "Add Institution",
      img: "images/sidebar/setting-icon.svg",
    },

    {
      path: "/AddCompany",
      label: "Add Company",
      img: "images/sidebar/setting-icon.svg",
    },

  ],

};


/* =========================================================
   SIDEBAR COMPONENT
   ========================================================= */

export default function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();


  /* -------------------------------------------------------
     USER
     ------------------------------------------------------- */

  const user = getUser();

  const rawRole = user.role || "admin";

  const role = normalizeRole(rawRole);


  /* -------------------------------------------------------
     NAV ITEMS
     ------------------------------------------------------- */

  const navItems =
    ROLE_NAV[role] ||
    ROLE_NAV.admin;


  /* -------------------------------------------------------
     SUBMENU STATE
     ------------------------------------------------------- */

  const [openMenus, setOpenMenus] =
    useState({});


  const [hoveredSubIndex, setHoveredSubIndex] =
    useState(null);


  /* -------------------------------------------------------
     TOGGLE SUBMENU
     ------------------------------------------------------- */

  const toggleSubmenu = (menuId) => {

    setOpenMenus((previous) => ({

      ...previous,

      [menuId]:
        !previous[menuId],

    }));

  };


  /* -------------------------------------------------------
     LOGOUT
     ------------------------------------------------------- */

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <aside id="sidebar">


      {/* =================================================
          BRAND
          ================================================= */}

      <div className="brand">

        <img
          src="/images/login/logo.png"
          alt="SATYAPAN"
        />

        <img
          src="/images/login/logo-small.png"
          alt=""
          className="collapsed"
        />

      </div>


      {/* =================================================
          MENU
          ================================================= */}

      <ul className="side-menu">


        {navItems.map((item, idx) => {


          /* =================================================
             SUBMENU ITEM
             ================================================= */

          if (item.submenu) {

            const menuId =
              item.id ||
              `menu-${idx}`;


            const isChildActive =
              item.submenu.some(
                (sub) =>
                  location.pathname ===
                  sub.path.split("?")[0]
              );


            const isOpen =
              openMenus[menuId] !== undefined
                ? openMenus[menuId]
                : isChildActive;


            return (

              <li
                key={`${item.label}-${idx}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >


                {/* -----------------------------------------
                    PARENT MENU
                    ----------------------------------------- */}

                <a
                  href="#"
                  onClick={(event) => {

                    event.preventDefault();

                    toggleSubmenu(menuId);

                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >

                    <img
                      src={`/${item.img}`}
                      alt={item.label}
                      onError={(event) => {

                        event.currentTarget.style.display =
                          "none";

                      }}
                    />

                    <span className="text">
                      {item.label}
                    </span>

                  </span>


                  {/* ARROW */}

                  <span
                    style={{
                      transform: isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",

                      transition:
                        "transform 0.2s ease",

                      fontSize: "10px",

                      marginLeft: "auto",

                      display: "inline-block",
                    }}
                  >
                    ▼
                  </span>

                </a>


                {/* =================================================
                    SUBMENU
                    ================================================= */}

                {isOpen && (

                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      paddingLeft: "35px",
                      margin: "2px 0 8px 0",
                      listStyle: "none",
                      boxSizing: "border-box",
                    }}
                  >


                    {item.submenu.map(
                      (sub, subIdx) => {


                        const subPath =
                          sub.path.split("?")[0];


                        const isSubActive =
                          location.pathname ===
                          subPath;


                        const uniqueSubKey =
                          `${menuId}-${subIdx}`;


                        const isHovered =
                          hoveredSubIndex ===
                          uniqueSubKey;


                        return (

                          <li
                            key={`${sub.path}-${subIdx}`}
                            style={{
                              width: "100%",
                              listStyle: "none",
                              margin: "2px 0",
                            }}
                          >

                            <a
                              href="#"
                              onMouseEnter={() =>
                                setHoveredSubIndex(
                                  uniqueSubKey
                                )
                              }
                              onMouseLeave={() =>
                                setHoveredSubIndex(
                                  null
                                )
                              }
                              onClick={(event) => {

                                event.preventDefault();

                                navigate(
                                  sub.path
                                );

                              }}
                              style={{
                                display: "block",
                                width: "100%",
                                padding:
                                  "8px 12px",
                                borderRadius:
                                  "6px",
                                fontSize:
                                  "13px",
                                textDecoration:
                                  "none",
                                color:
                                  "#ffffff",
                                backgroundColor:
                                  isSubActive ||
                                  isHovered
                                    ? "#008080"
                                    : "transparent",
                                transition:
                                  "background-color 0.2s ease",
                                boxSizing:
                                  "border-box",
                              }}
                            >

                              <span
                                className="text"
                                style={{
                                  color:
                                    "#ffffff",
                                }}
                              >
                                {sub.label}
                              </span>

                            </a>

                          </li>

                        );

                      }
                    )}

                  </ul>

                )}

              </li>

            );

          }


          /* =================================================
             NORMAL MENU ITEM
             ================================================= */

          const [
            itemPath,
            itemQuery,
          ] =
            item.path.split("?");


          const isActive =
            (() => {

              if (
                location.pathname !==
                itemPath
              ) {
                return false;
              }


              if (!itemQuery) {

                return (
                  !location.search
                );

              }


              return (
                location.search ===
                `?${itemQuery}`
              );

            })();


          return (

            <li
              key={`${item.path}-${idx}`}
              className={
                isActive
                  ? "active"
                  : ""
              }
            >

              <a
                href="#"
                onClick={(event) => {

                  event.preventDefault();

                  navigate(
                    item.path
                  );

                }}
              >

                <img
                  src={`/${item.img}`}
                  alt={item.label}
                  onError={(event) => {

                    event.currentTarget.style.display =
                      "none";

                  }}
                />

                <span className="text">
                  {item.label}
                </span>

              </a>

            </li>

          );

        })}


        {/* =================================================
            LOGOUT
            ================================================= */}

        <li className="logout-menu">

          <a
            href="#"
            onClick={(event) => {

              event.preventDefault();

              logout();

            }}
          >

            <img
              src="/images/sidebar/logout-icon.svg"
              alt="Logout"
              onError={(event) => {

                event.currentTarget.style.display =
                  "none";

              }}
            />

            <span className="text logout">
              Logout
            </span>

          </a>

        </li>


      </ul>

    </aside>

  );

}
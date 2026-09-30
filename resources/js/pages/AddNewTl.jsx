// // import { useState } from "react";
// // import "../../css/style.css";
// // import Header from "./Header";
// // import Sidebar from "./Sidebar";

// // export default function AddNewTl() {
// //   // Password hide/show state
// //   const [showPassword, setShowPassword] = useState(false);

// //   // Form State
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     mobileNumber: "",
// //     password: "",
// //     email: "",
// //     role: "TL - Employment",
// //     status: true,
// //   });

// //   // Module Permissions State
// //   const [permissions, setPermissions] = useState({
// //     education: false,
// //     employment: false,
// //     address: false,
// //     identity: false,
// //     criminal: false,
// //     drugTest: false,
// //     courtroom: false,
// //     globalDatabase: false,
// //     caseAllocation: false,
// //     verifierCases: false,
// //     qcReview: false,
// //     reportWriting: false,
// //     finalReport: false,
// //     universitySelection: false,
// //     viewPermission: false,
// //   });

// //   // Check if all permissions are selected
// //   const isAllSelected = Object.values(permissions).every(Boolean);

// //   // Table Data State (Status toggle ke liye state update hogi)
// //   const [teamLeads, setTeamLeads] = useState([
// //     {
// //       id: 1,
// //       name: "Rohit Sharma",
// //       email: "rohit.sharma@company.com",
// //       mobile: "+91 9876543210",
// //       role: "TL - Employment",
// //       roleClass: "role-employment",
// //       status: true,
// //       createdOn: "05 Sep 2025\n10:24 AM",
// //     },
// //     {
// //       id: 2,
// //       name: "Priya Nair",
// //       email: "priya.nair@company.com",
// //       mobile: "+91 9123456780",
// //       role: "TL - Education",
// //       roleClass: "role-education",
// //       status: true,
// //       createdOn: "03 Sep 2025\n02:15 PM",
// //     },
// //     {
// //       id: 3,
// //       name: "Amit Verma",
// //       email: "amit.verma@company.com",
// //       mobile: "+91 9988776655",
// //       role: "TL - Database",
// //       roleClass: "role-database",
// //       status: true,
// //       createdOn: "01 Sep 2025\n11:42 AM",
// //     },
// //     {
// //       id: 4,
// //       name: "Neha Kapoor",
// //       email: "neha.kapoor@company.com",
// //       mobile: "+91 8765432109",
// //       role: "TL - Criminal",
// //       roleClass: "role-criminal",
// //       status: true,
// //       createdOn: "29 Aug 2025\n04:30 PM",
// //     },
// //     {
// //       id: 5,
// //       name: "Sandeep Yadav",
// //       email: "sandeep.yadav@company.com",
// //       mobile: "+91 7654321098",
// //       role: "TL - Global Database",
// //       roleClass: "role-global",
// //       status: true,
// //       createdOn: "27 Aug 2025\n09:20 AM",
// //     },
// //   ]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFormStatusToggle = () => {
// //     setFormData((prev) => ({ ...prev, status: !prev.status }));
// //   };

// //   // Permission Handlers
// //   const handlePermissionChange = (key) => {
// //     setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
// //   };

// //   const handleSelectAll = () => {
// //     const nextState = !isAllSelected;
// //     const updatedPermissions = {};
// //     Object.keys(permissions).forEach((key) => {
// //       updatedPermissions[key] = nextState;
// //     });
// //     setPermissions(updatedPermissions);
// //   };

// //   // Table row status toggle logic
// //   const handleTableStatusToggle = (id) => {
// //     setTeamLeads((prev) =>
// //       prev.map((item) =>
// //         item.id === id ? { ...item, status: !item.status } : item
// //       )
// //     );
// //   };

// //   const handleReset = () => {
// //     setFormData({
// //       fullName: "",
// //       mobileNumber: "",
// //       password: "",
// //       email: "",
// //       role: "TL - Employment",
// //       status: true,
// //     });
// //     const resetPerms = {};
// //     Object.keys(permissions).forEach((key) => {
// //       resetPerms[key] = false;
// //     });
// //     setPermissions(resetPerms);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Saved Data:", formData, "Permissions:", permissions);
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         /* Layout Styling */
// //         .add-tl-layout {
// //           display: flex;
// //           min-height: 100vh;
// //           background-color: #f4f6f9;
// //         }

// //         .add-tl-main-content {
// //           {/* flex: 1; */}
// //           display: flex;
// //           flex-direction: column;
// //         }

// //         .add-tl-container {
// //           padding: 20px 30px;
// //         }

// //         /* Page Header */
// //         .add-tl-page-header h2 {
// //           font-size: 24px;
// //           font-weight: 600;
// //           color: #000;
// //           margin: 0;
// //         }

// //         .add-tl-page-header p {
// //           font-size: 14px;
// //           color: #606060;
// //           font-weight: 500;
// //           margin-top: 4px;
// //           margin-bottom: 20px;
// //           text-align: left;
// //         }

// //         /* Card General */
// //         .add-tl-card {
// //           background: #ffffff;
// //           border-radius: 8px;
// //           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
// //           margin-bottom: 25px;
// //           overflow: hidden;
// //         }

// //         .add-tl-card-header {
// //           background-color: #0f2c59;
// //           color: #ffffff;
// //           padding: 12px 20px;
// //           font-size: 15px;
// //           font-weight: 600;
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //         }

// //         /* Form Styling */
// //         .add-tl-form-body {
// //           padding: 20px;
// //         }

// //         .add-tl-form-grid {
// //           display: grid;
// //           grid-template-columns: repeat(3, 1fr);
// //           gap: 20px;
// //         }

// //         .add-tl-input-group {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 6px;
// //         }

// //         .add-tl-input-group label {
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: #334155;
// //         }

// //         .add-tl-input-group label span {
// //           color: #ef4444;
// //         }

// //         .add-tl-input-wrapper {
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //         }

// //         .add-tl-input-wrapper .input-icon-svg {
// //           position: absolute;
// //           left: 12px;
// //           color: #94a3b8;
// //           width: 16px;
// //           height: 16px;
// //           pointer-events: none;
// //         }

// //         .add-tl-input-wrapper input,
// //         .add-tl-input-wrapper select {
// //           width: 100%;
// //           padding: 9px 12px 9px 38px;
// //           border: 1px solid #cbd5e1;
// //           border-radius: 6px;
// //           font-size: 13px;
// //           color: #1e293b;
// //           outline: none;
// //           transition: border-color 0.2s ease;
// //         }

// //         .add-tl-input-wrapper input:focus,
// //         .add-tl-input-wrapper select:focus {
// //           border-color: #0f2c59;
// //         }

// //         /* Password Eye Toggle Icon Button */
// //         .password-toggle-btn {
// //           position: absolute;
// //           right: 10px;
// //           background: none;
// //           border: none;
// //           color: #64748b;
// //           cursor: pointer;
// //           padding: 4px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           z-index: 2;
// //         }

// //         .password-toggle-btn:hover {
// //           color: #0f2c59;
// //         }

// //         .password-toggle-btn svg {
// //           width: 18px;
// //           height: 18px;
// //         }

// //         .select-wrapper select {
// //           padding-left: 12px;
// //           appearance: none;
// //           background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")
// //             no-repeat right 12px center;
// //           background-size: 10px auto;
// //         }

// //         /* Status Toggle Switch */
// //         .status-toggle-wrapper {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           height: 38px;
// //         }

// //         .switch {
// //           position: relative;
// //           display: inline-block;
// //           width: 44px;
// //           height: 22px;
// //         }

// //         .switch input {
// //           opacity: 0;
// //           width: 0;
// //           height: 0;
// //         }

// //         .slider {
// //           position: absolute;
// //           cursor: pointer;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background-color: #cbd5e1;
// //           transition: 0.3s;
// //         }

// //         .slider:before {
// //           position: absolute;
// //           content: "";
// //           height: 16px;
// //           width: 16px;
// //           left: 3px;
// //           bottom: 3px;
// //           background-color: white;
// //           transition: 0.3s;
// //         }

// //         input:checked + .slider {
// //           background-color: #10b981;
// //         }

// //         input:checked + .slider:before {
// //           transform: translateX(22px);
// //         }

// //         .slider.round {
// //           border-radius: 34px;
// //         }

// //         .slider.round:before {
// //           border-radius: 50%;
// //         }

// //         .status-label {
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: #334155;
// //         }

// //         /* Form Buttons */
// //         .add-tl-form-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 12px;
// //           margin-top: 20px;
// //         }

// //         .add-tl-btn-reset {
// //           padding: 8px 24px;
// //           border: 1px solid #cbd5e1;
// //           background: #ffffff;
// //           color: #334155;
// //           border-radius: 6px;
// //           font-weight: 600;
// //           cursor: pointer;
// //         }

// //         .add-tl-btn-submit {
// //           padding: 8px 20px;
// //           border: none;
// //           background: #0f2c59;
// //           color: #ffffff;
// //           border-radius: 6px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //         }

// //         /* Module Permissions Styling */
// //         .perm-card-header {
// //           justify-content: space-between;
// //         }

// //         .select-all-label {
// //           font-size: 13px;
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //           cursor: pointer;
// //         }

// //         .permissions-grid {
// //           padding: 20px;
// //           display: grid;
// //           grid-template-columns: repeat(3, 1fr);
// //           gap: 16px;
// //         }

// //         .perm-checkbox-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           font-size: 13px;
// //           color: #334155;
// //           font-weight: 500;
// //           cursor: pointer;
// //         }

// //         .perm-info-text {
// //           padding: 12px 20px;
// //           background-color: #f8fafc;
// //           border-top: 1px solid #f1f5f9;
// //           font-size: 12px;
// //           color: #64748b;
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //         }

// //         /* Table Header Controls */
// //         .table-card-header {
// //           justify-content: space-between;
// //         }

// //         .header-controls {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //         }

// //         .table-search-box {
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //         }

// //         .table-search-box svg {
// //           position: absolute;
// //           left: 10px;
// //           color: #94a3b8;
// //           width: 14px;
// //           height: 14px;
// //         }

// //         .table-search-box input {
// //           padding: 6px 12px 6px 30px;
// //           border-radius: 4px;
// //           border: none;
// //           font-size: 12px;
// //           width: 220px;
// //           outline: none;
// //         }

// //         .add-tl-btn-filter {
// //           background: #1e3a8a;
// //           color: #ffffff;
// //           border: none;
// //           padding: 6px 12px;
// //           border-radius: 4px;
// //           font-size: 12px;
// //           cursor: pointer;
// //           display: flex;
// //           align-items: center;
// //           gap: 6px;
// //         }

// //         /* Table Styling */
// //         .add-tl-table-wrapper {
// //           overflow-x: auto;
// //         }

// //         .add-tl-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           font-size: 13px;
// //         }

// //         .add-tl-table th {
// //           background-color: #f8fafc;
// //           color: #475569;
// //           text-align: left;
// //           padding: 12px 16px;
// //           border-bottom: 1px solid #e2e8f0;
// //           font-weight: 600;
// //         }

// //         .add-tl-table td {
// //           padding: 12px 16px;
// //           border-bottom: 1px solid #f1f5f9;
// //           color: #1e293b;
// //           vertical-align: middle;
// //         }

// //         .fw-bold {
// //           font-weight: 600;
// //         }

// //         .text-muted {
// //           color: #64748b;
// //           white-space: pre-line;
// //         }

// //         /* Role Badges */
// //         .role-badge {
// //           padding: 4px 10px;
// //           border-radius: 12px;
// //           font-size: 11px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .role-employment {
// //           background-color: #e0f2fe;
// //           color: #0284c7;
// //         }

// //         .role-education {
// //           background-color: #f3e8ff;
// //           color: #9333ea;
// //         }

// //         .role-database {
// //           background-color: #dcfce7;
// //           color: #16a34a;
// //         }

// //         .role-criminal {
// //           background-color: #ffedd5;
// //           color: #ea580c;
// //         }

// //         .role-global {
// //           background-color: #ccfbf1;
// //           color: #0d9488;
// //         }

// //         /* Action Ellipsis Button */
// //         .action-menu-btn {
// //           background: none;
// //           border: none;
// //           color: #475569;
// //           cursor: pointer;
// //           padding: 6px;
// //           border-radius: 4px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .action-menu-btn:hover {
// //           background-color: #f1f5f9;
// //           color: #0f2c59;
// //         }

// //         /* Table Footer */
// //         .add-tl-table-footer {
// //           padding: 12px 20px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           font-size: 12px;
// //           color: #64748b;
// //         }

// //         .pagination {
// //           display: flex;
// //           gap: 4px;
// //         }

// //         .page-btn {
// //           border: 1px solid #cbd5e1;
// //           background: #fff;
// //           padding: 4px 10px;
// //           border-radius: 4px;
// //           cursor: pointer;
// //         }

// //         .page-btn.active {
// //           background: #0f2c59;
// //           color: #fff;
// //           border-color: #0f2c59;
// //         }

// //         .page-btn:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }
// //       `}</style>

// //       <div className="add-tl-layout">
// //         <Sidebar />
// //         <div className="add-tl-main-content" id="content">
// //           <Header />

// //           <div className="add-tl-container">
// //             {/* Title Header */}
// //             <div className="add-tl-page-header">
// //               <h2>Add New TL</h2>
// //               <p>Create a new Team Lead and assign role with permissions</p>
// //             </div>

// //             {/* Form Card */}
// //             <div className="add-tl-card">
// //               <div className="add-tl-card-header">
// //                 <svg
// //                   width="18"
// //                   height="18"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="2"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
// //                   <circle cx="8.5" cy="7" r="4" />
// //                   <line x1="20" y1="8" x2="20" y2="14" />
// //                   <line x1="17" y1="11" x2="23" y2="11" />
// //                 </svg>
// //                 Add New TL
// //               </div>

// //               <form onSubmit={handleSubmit} className="add-tl-form-body">
// //                 <div className="add-tl-form-grid">
// //                   {/* Full Name */}
// //                   <div className="add-tl-input-group">
// //                     <label>
// //                       Full Name <span>*</span>
// //                     </label>
// //                     <div className="add-tl-input-wrapper">
// //                       <svg
// //                         className="input-icon-svg"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         strokeWidth="2"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
// //                         <circle cx="12" cy="7" r="4" />
// //                       </svg>
// //                       <input
// //                         type="text"
// //                         name="fullName"
// //                         placeholder="Enter full name"
// //                         value={formData.fullName}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Mobile Number */}
// //                   <div className="add-tl-input-group">
// //                     <label>
// //                       Mobile Number <span>*</span>
// //                     </label>
// //                     <div className="add-tl-input-wrapper">
// //                       <svg
// //                         className="input-icon-svg"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         strokeWidth="2"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
// //                       </svg>
// //                       <input
// //                         type="text"
// //                         name="mobileNumber"
// //                         placeholder="Enter mobile number"
// //                         value={formData.mobileNumber}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Password with Eye Icon Toggle */}
// //                   <div className="add-tl-input-group">
// //                     <label>
// //                       Password <span>*</span>
// //                     </label>
// //                     <div className="add-tl-input-wrapper">
// //                       <svg
// //                         className="input-icon-svg"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         strokeWidth="2"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <rect
// //                           x="3"
// //                           y="11"
// //                           width="18"
// //                           height="11"
// //                           rx="2"
// //                           ry="2"
// //                         />
// //                         <path d="M7 11V7a5 5 0 0110 0v4" />
// //                       </svg>
// //                       <input
// //                         type={showPassword ? "text" : "password"}
// //                         name="password"
// //                         placeholder="Enter password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                       <button
// //                         type="button"
// //                         className="password-toggle-btn"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                       >
// //                         {showPassword ? (
// //                           /* Eye Slash Icon */
// //                           <svg
// //                             fill="none"
// //                             stroke="currentColor"
// //                             strokeWidth="2"
// //                             viewBox="0 0 24 24"
// //                           >
// //                             <path d="M17.94 17.94A10.07 10.07 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
// //                             <line x1="1" y1="1" x2="23" y2="23" />
// //                           </svg>
// //                         ) : (
// //                           /* Eye Icon */
// //                           <svg
// //                             fill="none"
// //                             stroke="currentColor"
// //                             strokeWidth="2"
// //                             viewBox="0 0 24 24"
// //                           >
// //                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
// //                             <circle cx="12" cy="12" r="3" />
// //                           </svg>
// //                         )}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Email ID */}
// //                   <div className="add-tl-input-group">
// //                     <label>
// //                       Email ID <span>*</span>
// //                     </label>
// //                     <div className="add-tl-input-wrapper">
// //                       <svg
// //                         className="input-icon-svg"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         strokeWidth="2"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
// //                         <polyline points="22,6 12,13 2,6" />
// //                       </svg>
// //                       <input
// //                         type="email"
// //                         name="email"
// //                         placeholder="Enter email address"
// //                         value={formData.email}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Select Role */}
// //                   <div className="add-tl-input-group">
// //                     <label>
// //                       Select Role <span>*</span>
// //                     </label>
// //                     <div className="add-tl-input-wrapper select-wrapper">
// //                       <select
// //                         name="role"
// //                         value={formData.role}
// //                         onChange={handleChange}
// //                       >
// //                         <option value="TL - Employment">TL - Employment</option>
// //                         <option value="TL - Education">TL - Education</option>
// //                         <option value="TL - Database">TL - Database</option>
// //                         <option value="TL - Criminal">TL - Criminal</option>
// //                         <option value="TL - Global Database">
// //                           TL - Global Database
// //                         </option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   {/* Status Switch */}
// //                   <div className="add-tl-input-group">
// //                     <label>Status</label>
// //                     <div className="status-toggle-wrapper">
// //                       <label className="switch">
// //                         <input
// //                           type="checkbox"
// //                           checked={formData.status}
// //                           onChange={handleFormStatusToggle}
// //                         />
// //                         <span className="slider round"></span>
// //                       </label>
// //                       <span className="status-label">
// //                         {formData.status ? "Active" : "Inactive"}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="add-tl-form-actions">
// //                   <button
// //                     type="button"
// //                     className="add-tl-btn-reset"
// //                     onClick={handleReset}
// //                   >
// //                     Reset
// //                   </button>
// //                   <button type="submit" className="add-tl-btn-submit">
// //                     <svg
// //                       width="16"
// //                       height="16"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
// //                       <circle cx="8.5" cy="7" r="4" />
// //                       <line x1="20" y1="8" x2="20" y2="14" />
// //                       <line x1="17" y1="11" x2="23" y2="11" />
// //                     </svg>
// //                     Create TL
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>

// //             {/* Module Permissions Card */}
// //             <div className="add-tl-card">
// //               <div className="add-tl-card-header perm-card-header">
// //                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //                   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// //                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
// //                   </svg>
// //                   Module Permissions
// //                 </div>
// //                 <label className="select-all-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={isAllSelected}
// //                     onChange={handleSelectAll}
// //                   />
// //                   Select All
// //                 </label>
// //               </div>

// //               <div className="permissions-grid">
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.education}
// //                     onChange={() => handlePermissionChange("education")}
// //                   />
// //                   Education Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.employment}
// //                     onChange={() => handlePermissionChange("employment")}
// //                   />
// //                   Employment Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.address}
// //                     onChange={() => handlePermissionChange("address")}
// //                   />
// //                   Address Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.identity}
// //                     onChange={() => handlePermissionChange("identity")}
// //                   />
// //                   Identity/Database Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.criminal}
// //                     onChange={() => handlePermissionChange("criminal")}
// //                   />
// //                   Criminal Verification
// //                 </label>

// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.drugTest}
// //                     onChange={() => handlePermissionChange("drugTest")}
// //                   />
// //                   Drug Test
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.courtroom}
// //                     onChange={() => handlePermissionChange("courtroom")}
// //                   />
// //                   Courtroom Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.globalDatabase}
// //                     onChange={() => handlePermissionChange("globalDatabase")}
// //                   />
// //                   Global Database Verification
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.caseAllocation}
// //                     onChange={() => handlePermissionChange("caseAllocation")}
// //                   />
// //                   Case Allocation
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.verifierCases}
// //                     onChange={() => handlePermissionChange("verifierCases")}
// //                   />
// //                   Verifier Cases
// //                 </label>

// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.qcReview}
// //                     onChange={() => handlePermissionChange("qcReview")}
// //                   />
// //                   QC Review
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.reportWriting}
// //                     onChange={() => handlePermissionChange("reportWriting")}
// //                   />
// //                   Report Writing
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.finalReport}
// //                     onChange={() => handlePermissionChange("finalReport")}
// //                   />
// //                   Final Report Approval
// //                 </label>
// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.universitySelection}
// //                     onChange={() => handlePermissionChange("universitySelection")}
// //                   />
// //                   University Selection
// //                 </label>

// //                 <label className="perm-checkbox-item">
// //                   <input
// //                     type="checkbox"
// //                     checked={permissions.viewPermission}
// //                     onChange={() => handlePermissionChange("viewPermission")}
// //                   />
// //                   View Permission
// //                 </label>
// //               </div>

// //               <div className="perm-info-text">
// //                 <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
// //                   <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
// //                 </svg>
// //                 Team Lead will be able to view, manage and assign selected verification modules.
// //               </div>
// //             </div>

// //             {/* Table Card */}
// //             <div className="add-tl-card">
// //               <div className="add-tl-card-header table-card-header">
// //                 <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// //                   <svg
// //                     width="18"
// //                     height="18"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
// //                     <circle cx="9" cy="7" r="4" />
// //                     <path d="M23 21v-2a4 4 0 00-3-3.87" />
// //                     <path d="M16 3.13a4 4 0 010 7.75" />
// //                   </svg>
// //                   Created Team Leads
// //                 </div>
// //                 <div className="header-controls">
// //                   <div className="table-search-box">
// //                     <svg
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <circle cx="11" cy="11" r="8" />
// //                       <line x1="21" y1="21" x2="16.65" y2="16.65" />
// //                     </svg>
// //                     <input
// //                       type="text"
// //                       placeholder="Search by name, email or role..."
// //                     />
// //                   </div>
// //                   <button className="add-tl-btn-filter">
// //                     <svg
// //                       width="14"
// //                       height="14"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
// //                     </svg>
// //                     Filter
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="add-tl-table-wrapper">
// //                 <table className="add-tl-table">
// //                   <thead>
// //                     <tr>
// //                       <th>S.No</th>
// //                       <th>Name</th>
// //                       <th>Email ID</th>
// //                       <th>Mobile Number</th>
// //                       <th>Role</th>
// //                       <th>Status</th>
// //                       <th>Created On</th>
// //                       <th>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {teamLeads.map((tl, index) => (
// //                       <tr key={tl.id}>
// //                         <td>{index + 1}</td>
// //                         <td className="fw-bold">{tl.name}</td>
// //                         <td className="text-muted">{tl.email}</td>
// //                         <td>{tl.mobile}</td>
// //                         <td>
// //                           <span className={`role-badge ${tl.roleClass}`}>
// //                             {tl.role}
// //                           </span>
// //                         </td>

// //                         {/* Status Toggle in Table */}
// //                         <td>
// //                           <div className="status-toggle-wrapper">
// //                             <label className="switch">
// //                               <input
// //                                 type="checkbox"
// //                                 checked={tl.status}
// //                                 onChange={() => handleTableStatusToggle(tl.id)}
// //                               />
// //                               <span className="slider round"></span>
// //                             </label>
// //                             <span className="status-label">
// //                               {tl.status ? "Active" : "Inactive"}
// //                             </span>
// //                           </div>
// //                         </td>

// //                         <td className="text-muted">{tl.createdOn}</td>

// //                         {/* Visible Action Button */}
// //                         <td>
// //                           <button className="action-menu-btn" title="Actions">
// //                             <svg
// //                               width="16"
// //                               height="16"
// //                               fill="currentColor"
// //                               viewBox="0 0 16 16"
// //                             >
// //                               <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
// //                             </svg>
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {/* Pagination */}
// //               <div className="add-tl-table-footer">
// //                 <span>Showing 1 to 5 of 5 entries</span>
// //                 <div className="pagination">
// //                   <button disabled className="page-btn">
// //                     &lt;
// //                   </button>
// //                   <button className="page-btn active">1</button>
// //                   <button disabled className="page-btn">
// //                     &gt;
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
// import { API_URL } from "../src/config";

// const [teamLeads, setTeamLeads] = useState([]);
// const [loading, setLoading] = useState(true);
// const token = localStorage.getItem("token");

// const fetchTeamLeads = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${API_URL}/api/users`, {
//       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//     });
//     const data = await res.json();
//     setTeamLeads((data.users || []).filter(u => u.role?.toLowerCase().startsWith("tl")));
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => { fetchTeamLeads(); }, []);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const res = await fetch(`${API_URL}/api/users/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       name: formData.fullName,
//       mobile: formData.mobileNumber,
//       email: formData.email,
//       password: formData.password,
//       role: formData.role,          // "TL - Employment" etc.
//       permissions,                  // the 15 booleans state
//     }),
//   });
//   const data = await res.json();
//   if (!res.ok) { alert(data.message || "Failed to create TL"); return; }
//   handleReset();
//   fetchTeamLeads(); // refresh table
// };

// const handleTableStatusToggle = async (id, currentStatus) => {
//   const next = currentStatus === "active" ? "inactive" : "active";
//   const res = await fetch(`${API_URL}/api/users/${id}/status`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//     body: JSON.stringify({ status: next }),
//   });
//   if (!res.ok) return alert("Failed to update status");
//   fetchTeamLeads();
// };
import { useState, useEffect } from "react";
import "../../css/style.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

// ── Helpers ────────────────────────────────────────────────
const ROLE_BADGE_CLASSES = {
  employment: "role-employment",
  education: "role-education",
  database: "role-database",
  criminal: "role-criminal",
  global: "role-global",
};

function roleBadgeClass(role) {
  const key = (role || "").toLowerCase();
  if (key.includes("employment")) return ROLE_BADGE_CLASSES.employment;
  if (key.includes("education")) return ROLE_BADGE_CLASSES.education;
  if (key.includes("global")) return ROLE_BADGE_CLASSES.global;
  if (key.includes("database")) return ROLE_BADGE_CLASSES.database;
  if (key.includes("criminal")) return ROLE_BADGE_CLASSES.criminal;
  return "role-employment";
}

function formatCreatedOn(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  const date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return `${date}\n${time}`;
}

export default function AddNewTl() {
  // Password hide/show state
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    password: "",
    email: "",
    role: "TL - Employment",
    status: true,
  });

  // Module Permissions State
  const [permissions, setPermissions] = useState({
    education: false,
    employment: false,
    address: false,
    identity: false,
    criminal: false,
    drugTest: false,
    courtroom: false,
    globalDatabase: false,
    caseAllocation: false,
    verifierCases: false,
    qcReview: false,
    reportWriting: false,
    finalReport: false,
    universitySelection: false,
    viewPermission: false,
    documentsDespatch: false,
    paymentProcess: false,
  });

  // Check if all permissions are selected
  const isAllSelected = Object.values(permissions).every(Boolean);

  // ── Team Leads table — now backed by the real API ──────────
  const [teamLeads, setTeamLeads] = useState([]);
  const [loadingTeamLeads, setLoadingTeamLeads] = useState(true);
  const [tableError, setTableError] = useState("");

  // ── Create-form submit state ────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const token = localStorage.getItem("token");

  const fetchTeamLeads = async () => {
    setLoadingTeamLeads(true);
    setTableError("");
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setTableError(data.message || "Failed to load Team Leads.");
        return;
      }
      const all = data.users || [];
      // Only TL-type accounts belong on this page (role values look like
      // "TL - Employment", "TL - Education", etc — see the Select Role field below).
      setTeamLeads(all.filter((u) => (u.role || "").toLowerCase().startsWith("tl")));
    } catch (err) {
      setTableError("Failed to load Team Leads. Please try again.");
    } finally {
      setLoadingTeamLeads(false);
    }
  };

  useEffect(() => {
    fetchTeamLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormStatusToggle = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  // Permission Handlers
  const handlePermissionChange = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    const nextState = !isAllSelected;
    const updatedPermissions = {};
    Object.keys(permissions).forEach((key) => {
      updatedPermissions[key] = nextState;
    });
    setPermissions(updatedPermissions);
  };

  // Table row status toggle — PATCH /users/{id}/status, with optimistic
  // update + rollback (via refetch) on failure.
  const handleTableStatusToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";

    setTeamLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );

    try {
      const res = await fetch(`${API_URL}/api/users/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to update status.");
        fetchTeamLeads(); // rollback to server truth
      }
    } catch (err) {
      alert("Server error while updating status.");
      fetchTeamLeads();
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      password: "",
      email: "",
      role: "TL - Employment",
      status: true,
    });
    const resetPerms = {};
    Object.keys(permissions).forEach((key) => {
      resetPerms[key] = false;
    });
    setPermissions(resetPerms);
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitError("");
    setSubmitSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          mobile: formData.mobileNumber,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          status: formData.status ? "active" : "inactive",
          permissions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.message || "Failed to create Team Lead.");
        return;
      }

      setSubmitSuccess(`Team Lead "${data.user?.name || formData.fullName}" created successfully.`);
      handleReset();
      fetchTeamLeads(); // refresh the table below

      setTimeout(() => setSubmitSuccess(""), 2500);
    } catch (err) {
      setSubmitError("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        /* Layout Styling */
        .add-tl-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f9;
        }

        .add-tl-main-content {
          {/* flex: 1; */}
          display: flex;
          flex-direction: column;
        }

        .add-tl-container {
          padding: 20px 30px;
        }

        /* Page Header */
        .add-tl-page-header h2 {
          font-size: 24px;
          font-weight: 600;
          color: #000;
          margin: 0;
        }

        .add-tl-page-header p {
          font-size: 14px;
          color: #606060;
          font-weight: 500;
          margin-top: 4px;
          margin-bottom: 20px;
          text-align: left;
        }

        /* Card General */
        .add-tl-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 25px;
          overflow: hidden;
        }

        .add-tl-card-header {
          background-color: #0f2c59;
          color: #ffffff;
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Form Styling */
        .add-tl-form-body {
          padding: 20px;
        }

        .add-tl-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .add-tl-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .add-tl-input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .add-tl-input-group label span {
          color: #ef4444;
        }

        .add-tl-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .add-tl-input-wrapper .input-icon-svg {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .add-tl-input-wrapper input,
        .add-tl-input-wrapper select {
          width: 100%;
          padding: 9px 12px 9px 38px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 13px;
          color: #1e293b;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .add-tl-input-wrapper input:focus,
        .add-tl-input-wrapper select:focus {
          border-color: #0f2c59;
        }

        /* Password Eye Toggle Icon Button */
        .password-toggle-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .password-toggle-btn:hover {
          color: #0f2c59;
        }

        .password-toggle-btn svg {
          width: 18px;
          height: 18px;
        }

        .select-wrapper select {
          padding-left: 12px;
          appearance: none;
          background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")
            no-repeat right 12px center;
          background-size: 10px auto;
        }

        /* Status Toggle Switch */
        .status-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 38px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 22px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: 0.3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
        }

        input:checked + .slider {
          background-color: #10b981;
        }

        input:checked + .slider:before {
          transform: translateX(22px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .status-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        /* Form Buttons */
        .add-tl-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .add-tl-btn-reset {
          padding: 8px 24px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .add-tl-btn-submit {
          padding: 8px 20px;
          border: none;
          background: #0f2c59;
          color: #ffffff;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .add-tl-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Module Permissions Styling */
        .perm-card-header {
          justify-content: space-between;
        }

        .select-all-label {
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .permissions-grid {
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .perm-checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #334155;
          font-weight: 500;
          cursor: pointer;
        }

        .perm-info-text {
          padding: 12px 20px;
          background-color: #f8fafc;
          border-top: 1px solid #f1f5f9;
          font-size: 12px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Table Header Controls */
        .table-card-header {
          justify-content: space-between;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .table-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .table-search-box svg {
          position: absolute;
          left: 10px;
          color: #94a3b8;
          width: 14px;
          height: 14px;
        }

        .table-search-box input {
          padding: 6px 12px 6px 30px;
          border-radius: 4px;
          border: none;
          font-size: 12px;
          width: 220px;
          outline: none;
        }

        .add-tl-btn-filter {
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Table Styling */
        .add-tl-table-wrapper {
          overflow-x: auto;
        }

        .add-tl-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .add-tl-table th {
          background-color: #f8fafc;
          color: #475569;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
        }

        .add-tl-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
          vertical-align: middle;
        }

        .fw-bold {
          font-weight: 600;
        }

        .text-muted {
          color: #64748b;
          white-space: pre-line;
        }

        /* Role Badges */
        .role-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .role-employment {
          background-color: #e0f2fe;
          color: #0284c7;
        }

        .role-education {
          background-color: #f3e8ff;
          color: #9333ea;
        }

        .role-database {
          background-color: #dcfce7;
          color: #16a34a;
        }

        .role-criminal {
          background-color: #ffedd5;
          color: #ea580c;
        }

        .role-global {
          background-color: #ccfbf1;
          color: #0d9488;
        }

        /* Action Ellipsis Button */
        .action-menu-btn {
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-menu-btn:hover {
          background-color: #f1f5f9;
          color: #0f2c59;
        }

        /* Table Footer */
        .add-tl-table-footer {
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748b;
        }

        .pagination {
          display: flex;
          gap: 4px;
        }

        .page-btn {
          border: 1px solid #cbd5e1;
          background: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .page-btn.active {
          background: #0f2c59;
          color: #fff;
          border-color: #0f2c59;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="add-tl-layout">
        <Sidebar />
        <div className="add-tl-main-content" id="content">
          <Header />

          <div className="add-tl-container">
            {/* Title Header */}
            <div className="add-tl-page-header">
              <h2>Add New TL</h2>
              <p>Create a new Team Lead and assign role with permissions</p>
            </div>

            {/* Form Card */}
            <div className="add-tl-card">
              <div className="add-tl-card-header">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="17" y1="11" x2="23" y2="11" />
                </svg>
                Add New TL
              </div>

              <form onSubmit={handleSubmit} className="add-tl-form-body">
                <div className="add-tl-form-grid">
                  {/* Full Name */}
                  <div className="add-tl-input-group">
                    <label>
                      Full Name <span>*</span>
                    </label>
                    <div className="add-tl-input-wrapper">
                      <svg
                        className="input-icon-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="add-tl-input-group">
                    <label>
                      Mobile Number <span>*</span>
                    </label>
                    <div className="add-tl-input-wrapper">
                      <svg
                        className="input-icon-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter mobile number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password with Eye Icon Toggle */}
                  <div className="add-tl-input-group">
                    <label>
                      Password <span>*</span>
                    </label>
                    <div className="add-tl-input-wrapper">
                      <svg
                        className="input-icon-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          /* Eye Slash Icon */
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          /* Eye Icon */
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email ID */}
                  <div className="add-tl-input-group">
                    <label>
                      Email ID <span>*</span>
                    </label>
                    <div className="add-tl-input-wrapper">
                      <svg
                        className="input-icon-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Select Role */}
                  <div className="add-tl-input-group">
                    <label>
                      Select Role <span>*</span>
                    </label>
                    <div className="add-tl-input-wrapper select-wrapper">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="TL - Employment">TL - Employment</option>
                        <option value="TL - Education">TL - Education</option>
                        <option value="TL - Database">TL - Database</option>
                        <option value="TL - Criminal">TL - Criminal</option>
                        <option value="TL - Global Database">
                          TL - Global Database
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Status Switch */}
                  <div className="add-tl-input-group">
                    <label>Status</label>
                    <div className="status-toggle-wrapper">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={formData.status}
                          onChange={handleFormStatusToggle}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="status-label">
                        {formData.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="add-tl-form-actions">
                  <button
                    type="button"
                    className="add-tl-btn-reset"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button type="submit" className="add-tl-btn-submit" disabled={submitting}>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="17" y1="11" x2="23" y2="11" />
                    </svg>
                    {submitting ? "Creating…" : "Create TL"}
                  </button>
                </div>

                {submitError && (
                  <p style={{ color: "#dc2626", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>
                    ⚠ {submitError}
                  </p>
                )}
                {submitSuccess && (
                  <p style={{ color: "#16a34a", marginTop: "12px", fontSize: "13px", fontWeight: 600 }}>
                    ✓ {submitSuccess}
                  </p>
                )}
              </form>
            </div>

            {/* Module Permissions Card */}
            <div className="add-tl-card">
              <div className="add-tl-card-header perm-card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Module Permissions
                </div>
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>

              <div className="permissions-grid">
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.education}
                    onChange={() => handlePermissionChange("education")}
                  />
                  Education Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.employment}
                    onChange={() => handlePermissionChange("employment")}
                  />
                  Employment Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.address}
                    onChange={() => handlePermissionChange("address")}
                  />
                  Address Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.identity}
                    onChange={() => handlePermissionChange("identity")}
                  />
                  Identity/Database Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.criminal}
                    onChange={() => handlePermissionChange("criminal")}
                  />
                  Criminal Verification
                </label>

                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.drugTest}
                    onChange={() => handlePermissionChange("drugTest")}
                  />
                  Drug Test
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.courtroom}
                    onChange={() => handlePermissionChange("courtroom")}
                  />
                  Courtroom Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.globalDatabase}
                    onChange={() => handlePermissionChange("globalDatabase")}
                  />
                  Global Database Verification
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.caseAllocation}
                    onChange={() => handlePermissionChange("caseAllocation")}
                  />
                  Case Allocation
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.verifierCases}
                    onChange={() => handlePermissionChange("verifierCases")}
                  />
                  Verifier Cases
                </label>

                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.qcReview}
                    onChange={() => handlePermissionChange("qcReview")}
                  />
                  QC Review
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.reportWriting}
                    onChange={() => handlePermissionChange("reportWriting")}
                  />
                  Report Writing
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.finalReport}
                    onChange={() => handlePermissionChange("finalReport")}
                  />
                  Final Report Approval
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.universitySelection}
                    onChange={() => handlePermissionChange("universitySelection")}
                  />
                  University Selection
                </label>

                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.viewPermission}
                    onChange={() => handlePermissionChange("viewPermission")}
                  />
                  View Permission
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.paymentProcess}
                    onChange={() => handlePermissionChange("paymentProcess")}
                  />
                  Payment Process
                </label>
                <label className="perm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={permissions.documentsDespatch}
                    onChange={() => handlePermissionChange("documentsDespatch")}
                  />
                  Documents Despatch
                </label>
              </div>

              <div className="perm-info-text">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                Team Lead will be able to view, manage and assign selected verification modules.
              </div>
            </div>

            {/* Table Card */}
            <div className="add-tl-card">
              <div className="add-tl-card-header table-card-header">
                <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Created Team Leads
                </div>
                <div className="header-controls">
                  <div className="table-search-box">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by name, email or role..."
                    />
                  </div>
                  <button className="add-tl-btn-filter">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>

              {tableError && (
                <p style={{ color: "#dc2626", padding: "16px", fontSize: "13px", fontWeight: 600 }}>
                  ⚠ {tableError}
                </p>
              )}

              <div className="add-tl-table-wrapper">
                <table className="add-tl-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email ID</th>
                      <th>Mobile Number</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingTeamLeads ? (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>
                          Loading Team Leads…
                        </td>
                      </tr>
                    ) : teamLeads.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center", padding: "24px", color: "#64748b" }}>
                          No Team Leads created yet.
                        </td>
                      </tr>
                    ) : (
                      teamLeads.map((tl, index) => (
                        <tr key={tl.id}>
                          <td>{index + 1}</td>
                          <td className="fw-bold">{tl.name}</td>
                          <td className="text-muted">{tl.email}</td>
                          <td>{tl.mobile || "—"}</td>
                          <td>
                            <span className={`role-badge ${roleBadgeClass(tl.role)}`}>
                              {tl.role}
                            </span>
                          </td>

                          {/* Status Toggle in Table */}
                          <td>
                            <div className="status-toggle-wrapper">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={tl.status === "active"}
                                  onChange={() => handleTableStatusToggle(tl.id, tl.status)}
                                />
                                <span className="slider round"></span>
                              </label>
                              <span className="status-label">
                                {tl.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>

                          <td className="text-muted">{formatCreatedOn(tl.created_at)}</td>

                          {/* Visible Action Button */}
                          <td>
                            <button className="action-menu-btn" title="Actions">
                              <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="add-tl-table-footer">
                <span>
                  {teamLeads.length === 0
                    ? "Showing 0 entries"
                    : `Showing 1 to ${teamLeads.length} of ${teamLeads.length} entries`}
                </span>
                <div className="pagination">
                  <button disabled className="page-btn">
                    &lt;
                  </button>
                  <button className="page-btn active">1</button>
                  <button disabled className="page-btn">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
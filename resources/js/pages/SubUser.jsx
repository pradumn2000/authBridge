// import React, { useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// // Inline SVG Icon Components
// const IconDownload = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//   </svg>
// );

// const IconPlus = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const IconUsers = () => (
//   <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const IconUserCheck = () => (
//   <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const IconUserX = () => (
//   <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//   </svg>
// );

// const IconShield = () => (
//   <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// );

// const IconSearch = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const IconEye = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );

// const IconEdit = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//   </svg>
// );

// const IconTrash = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// const IconChevronLeft = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//   </svg>
// );

// const IconChevronRight = () => (
//   <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//   </svg>
// );

// const SubUser = () => {
//   // Sample Data matching the UI
//   const subUsersData = [
//     { id: 1, name: "Rahul Sharma", avatarBg: "bg-blue-600", email: "rahul.sharma@satyapan.com", mobile: "+91 98765 43210", role: "Verifier", roleStyle: "bg-blue-50 text-blue-600 border-blue-200", status: "Active", lastLogin: "21 Aug 2026, 11:45 AM", createdOn: "12 Aug 2026, 10:30 AM" },
//     { id: 2, name: "Priya Mehta", avatarBg: "bg-purple-600", email: "priya.mehta@satyapan.com", mobile: "+91 98765 43211", role: "QC Verifier", roleStyle: "bg-purple-50 text-purple-600 border-purple-200", status: "Active", lastLogin: "21 Aug 2026, 10:15 AM", createdOn: "12 Aug 2026, 11:20 AM" },
//     { id: 3, name: "Amit Singh", avatarBg: "bg-amber-500", email: "amit.singh@satyapan.com", mobile: "+91 98765 43212", role: "Report Writer", roleStyle: "bg-amber-50 text-amber-600 border-amber-200", status: "Active", lastLogin: "20 Aug 2026, 06:20 PM", createdOn: "13 Aug 2026, 09:15 AM" },
//     { id: 4, name: "Neha Kapoor", avatarBg: "bg-teal-500", email: "neha.kapoor@satyapan.com", mobile: "+91 98765 43213", role: "Case Allocator", roleStyle: "bg-teal-50 text-teal-600 border-teal-200", status: "Active", lastLogin: "21 Aug 2026, 09:05 AM", createdOn: "13 Aug 2026, 10:05 AM" },
//     { id: 5, name: "Vikas Dubey", avatarBg: "bg-red-500", email: "vikas.dubey@satyapan.com", mobile: "+91 98765 43214", role: "Verifier", roleStyle: "bg-blue-50 text-blue-600 border-blue-200", status: "Inactive", lastLogin: "18 Aug 2026, 04:30 PM", createdOn: "14 Aug 2026, 12:45 PM" },
//     { id: 6, name: "Sneha Mishra", avatarBg: "bg-indigo-500", email: "sneha.mishra@satyapan.com", mobile: "+91 98765 43215", role: "QC Verifier", roleStyle: "bg-purple-50 text-purple-600 border-purple-200", status: "Active", lastLogin: "21 Aug 2026, 01:10 PM", createdOn: "14 Aug 2026, 02:20 PM" },
//     { id: 7, name: "Rohit Jain", avatarBg: "bg-blue-500", email: "rohit.jain@satyapan.com", mobile: "+91 98765 43216", role: "Report Writer", roleStyle: "bg-amber-50 text-amber-600 border-amber-200", status: "Inactive", lastLogin: "17 Aug 2026, 11:00 AM", createdOn: "15 Aug 2026, 09:40 AM" },
//     { id: 8, name: "Kavita Tiwari", avatarBg: "bg-emerald-500", email: "kavita.tiwari@satyapan.com", mobile: "+91 98765 43217", role: "Verifier", roleStyle: "bg-blue-50 text-blue-600 border-blue-200", status: "Active", lastLogin: "21 Aug 2026, 08:50 AM", createdOn: "15 Aug 2026, 10:10 AM" },
//     { id: 9, name: "Ankit Bansal", avatarBg: "bg-cyan-600", email: "ankit.bansal@satyapan.com", mobile: "+91 98765 43218", role: "Case Allocator", roleStyle: "bg-teal-50 text-teal-600 border-teal-200", status: "Active", lastLogin: "20 Aug 2026, 03:25 PM", createdOn: "16 Aug 2026, 11:30 AM" },
//     { id: 10, name: "Yogesh Patel", avatarBg: "bg-fuchsia-600", email: "yogesh.patel@satyapan.com", mobile: "+91 98765 43219", role: "QC Verifier", roleStyle: "bg-purple-50 text-purple-600 border-purple-200", status: "Inactive", lastLogin: "16 Aug 2026, 05:40 PM", createdOn: "16 Aug 2026, 03:50 PM" },
//   ];

//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper p-4 md:p-6 bg-[#f4f7fe] min-h-screen text-slate-700 font-sans">
            
//             {/* Top Header & Breadcrumbs */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//               <div>
//                 <h1 className="text-xl md:text-2xl font-bold text-slate-800">Sub Users</h1>
//                 <p className="text-xs md:text-sm text-slate-500 mt-0.5">
//                   View and manage all sub users in the system. You can add, edit, deactivate or reset passwords.
//                 </p>
//               </div>
//               <div className="flex flex-col items-start md:items-end gap-3">
//                 <div className="text-xs text-slate-400">
//                   Dashboard &gt; Sub User Management &gt; <span className="text-blue-600 font-medium">Sub Users</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-md shadow-sm hover:bg-slate-50">
//                     <IconDownload /> Export
//                   </button>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700">
//                     <IconPlus /> Add Sub User
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Top Stat Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {/* Total Sub Users */}
//               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
//                   <IconUsers />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">Total Sub Users</p>
//                   <h3 className="text-xl font-bold text-slate-800">18</h3>
//                   <p className="text-[11px] text-slate-400">All registered sub users</p>
//                 </div>
//               </div>

//               {/* Active Users */}
//               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
//                   <IconUserCheck />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">Active Users</p>
//                   <h3 className="text-xl font-bold text-slate-800">15</h3>
//                   <p className="text-[11px] text-slate-400">Currently active users</p>
//                 </div>
//               </div>

//               {/* Inactive Users */}
//               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
//                   <IconUserX />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">Inactive Users</p>
//                   <h3 className="text-xl font-bold text-slate-800">3</h3>
//                   <p className="text-[11px] text-slate-400">Deactivated users</p>
//                 </div>
//               </div>

//               {/* Total Roles */}
//               <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
//                   <IconShield />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">Total Roles</p>
//                   <h3 className="text-xl font-bold text-slate-800">6</h3>
//                   <p className="text-[11px] text-slate-400">Assigned user roles</p>
//                 </div>
//               </div>
//             </div>

//             {/* Main Table Container */}
//             <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              
//               {/* Filters Header */}
//               <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
//                 <div className="relative w-full md:w-80">
//                   <input
//                     type="text"
//                     placeholder="Search by name, email or mobile..."
//                     className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700 placeholder-slate-400"
//                   />
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
//                     <IconSearch />
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
//                   <select className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:outline-none">
//                     <option value="">All Roles</option>
//                     <option value="verifier">Verifier</option>
//                     <option value="qc">QC Verifier</option>
//                     <option value="report">Report Writer</option>
//                     <option value="allocator">Case Allocator</option>
//                   </select>

//                   <select className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:outline-none">
//                     <option value="">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>

//                   <button className="px-3 py-1.5 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium">
//                     Reset
//                   </button>
//                   <button className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
//                     Filter
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Table Wrapper */}
//               <div className="w-full overflow-x-auto">
//                 <table className="w-full text-left border-collapse min-w-[900px]">
//                   <thead>
//                     <tr className="bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
//                       <th className="py-3 px-4 w-12 text-center">#</th>
//                       <th className="py-3 px-4">User Name</th>
//                       <th className="py-3 px-4">Email ID</th>
//                       <th className="py-3 px-4">Mobile Number</th>
//                       <th className="py-3 px-4">Role</th>
//                       <th className="py-3 px-4">Status</th>
//                       <th className="py-3 px-4">Last Login</th>
//                       <th className="py-3 px-4">Created On</th>
//                       <th className="py-3 px-4 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100 text-xs">
//                     {subUsersData.map((user) => (
//                       <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
//                         <td className="py-3 px-4 text-center text-slate-400 font-medium">{user.id}</td>
                        
//                         {/* User Name with Avatar */}
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-2.5">
//                             <div className={`w-7 h-7 rounded-full ${user.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
//                               {getInitials(user.name)}
//                             </div>
//                             <span className="font-semibold text-slate-800">{user.name}</span>
//                           </div>
//                         </td>

//                         <td className="py-3 px-4 text-slate-600 font-medium">{user.email}</td>
//                         <td className="py-3 px-4 text-slate-600">{user.mobile}</td>
                        
//                         {/* Role Badge */}
//                         <td className="py-3 px-4">
//                           <span className={`px-2 py-0.5 text-[11px] font-medium rounded border ${user.roleStyle}`}>
//                             {user.role}
//                           </span>
//                         </td>

//                         {/* Status Dot */}
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-1.5">
//                             <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}></span>
//                             <span className={`text-[11px] font-medium ${user.status === "Active" ? "text-emerald-600" : "text-red-500"}`}>
//                               {user.status}
//                             </span>
//                           </div>
//                         </td>

//                         <td className="py-3 px-4 text-slate-500">{user.lastLogin}</td>
//                         <td className="py-3 px-4 text-slate-500">{user.createdOn}</td>

//                         {/* Actions */}
//                         <td className="py-3 px-4">
//                           <div className="flex items-center justify-center gap-1">
//                             <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors" title="View">
//                               <IconEye />
//                             </button>
//                             <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded transition-colors" title="Edit">
//                               <IconEdit />
//                             </button>
//                             <button className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
//                               <IconTrash />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Footer & Pagination */}
//               <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
//                 <div>Showing 1 to 10 of 18 entries</div>
//                 <div className="flex items-center gap-1">
//                   <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-50">
//                     <IconChevronLeft />
//                   </button>
//                   <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded font-medium">
//                     1
//                   </button>
//                   <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50 font-medium">
//                     2
//                   </button>
//                   <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50">
//                     <IconChevronRight />
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// };

// export default SubUser;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

// Inline SVG Icon Components
const IconDownload = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconUserCheck = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconUserX = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const IconShield = () => (
  <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconEye = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEdit = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconChevronLeft = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const IconChevronRight = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

// ── Sub User roles — deliberately reusing roles the system already knows
//    end-to-end (dashboard route in Login.jsx's ROLE_ROUTES, sidebar nav in
//    Sidebar.jsx's ROLE_NAV) rather than inventing new ones that would need
//    routing/nav wired up separately. "verifier" doubles as the generic
//    Verifier role and this page's "Verifier" sub-user type.
const SUB_USER_ROLES = [
  { value: "verifier",       label: "Verifier",       style: "bg-blue-50 text-blue-600 border-blue-200" },
  { value: "pvt_qc",         label: "QC Verifier",     style: "bg-purple-50 text-purple-600 border-purple-200" },
  { value: "report_writing", label: "Report Writer",   style: "bg-amber-50 text-amber-600 border-amber-200" },
  { value: "allocator",      label: "Case Allocator",  style: "bg-teal-50 text-teal-600 border-teal-200" },
];

const ROLE_LABELS = Object.fromEntries(SUB_USER_ROLES.map((r) => [r.value, r.label]));
const ROLE_STYLES = Object.fromEntries(SUB_USER_ROLES.map((r) => [r.value, r.style]));
const AVATAR_COLORS = ["bg-blue-600", "bg-purple-600", "bg-amber-500", "bg-teal-500", "bg-red-500", "bg-indigo-500", "bg-emerald-500", "bg-cyan-600", "bg-fuchsia-600"];

function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const SubUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [subUsers, setSubUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "", role: "", status: true });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const fetchSubUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load Sub Users.");
        return;
      }
      const subRoleValues = SUB_USER_ROLES.map((r) => r.value);
      setSubUsers((data.users || []).filter((u) => subRoleValues.includes(u.role)));
    } catch (err) {
      setError("Failed to load Sub Users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formLoading) return;
    setFormError("");
    setFormSuccess("");
    if (!form.role) { setFormError("Please select a role."); return; }
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          password: form.password,
          role: form.role,
          status: form.status ? "active" : "inactive",
          permissions: {},
        }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.message || "Failed to create Sub User."); return; }

      setFormSuccess(`Sub User "${data.user?.name || form.name}" created successfully.`);
      setForm({ name: "", mobile: "", email: "", password: "", role: "", status: true });
      fetchSubUsers();
      setTimeout(() => { setShowForm(false); setFormSuccess(""); }, 1500);
    } catch (err) {
      setFormError("Server error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusToggle = async (user) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    setSubUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)));
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}/status`, {
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
        fetchSubUsers();
      }
    } catch {
      alert("Server error while updating status.");
      fetchSubUsers();
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete "${user.name}"? This cannot be undone.`)) return;
    setDeletingId(user.id);
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Failed to delete Sub User."); return; }
      setSubUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReset = () => {
    setSearch("");
    setRoleFilter("");
    setStatusFilter("");
  };

  const filtered = subUsers.filter((u) => {
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      (u.name || "").toLowerCase().includes(s) ||
      (u.email || "").toLowerCase().includes(s) ||
      (u.mobile || "").toLowerCase().includes(s);
    const matchRole = !roleFilter || u.role === roleFilter;
    const matchStatus = !statusFilter || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalCount = subUsers.length;
  const activeCount = subUsers.filter((u) => u.status === "active").length;
  const inactiveCount = subUsers.filter((u) => u.status === "inactive").length;
  const rolesInUse = new Set(subUsers.map((u) => u.role)).size;

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper p-4 md:p-6 bg-[#f4f7fe] min-h-screen text-slate-700 font-sans">
            
            {/* Top Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Sub Users</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                  View and manage all sub users in the system. You can add, deactivate or delete them.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="text-xs text-slate-400">
                  Dashboard &gt; Sub User Management &gt; <span className="text-blue-600 font-medium">Sub Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-md shadow-sm hover:bg-slate-50">
                    <IconDownload /> Export
                  </button>
                  <button
                    onClick={() => { setShowForm((v) => !v); setFormError(""); setFormSuccess(""); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-md shadow-sm hover:bg-emerald-700"
                  >
                    <IconPlus /> {showForm ? "Cancel" : "Add Sub User"}
                  </button>
                </div>
              </div>
            </div>

            {/* Add Sub User Form */}
            {showForm && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 mb-6">
                <h3 className="text-sm font-bold text-slate-800 mb-3">Add Sub User</h3>
                <form onSubmit={handleCreate}>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile</label>
                      <input
                        type="text"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Role</label>
                      <select
                        required
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="">— Select —</option>
                        {SUB_USER_ROLES.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-4 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm disabled:opacity-60"
                    >
                      {formLoading ? "Creating…" : "Create"}
                    </button>
                  </div>
                  {formError && <p className="text-red-600 text-xs font-semibold mt-3">⚠ {formError}</p>}
                  {formSuccess && <p className="text-emerald-600 text-xs font-semibold mt-3">✓ {formSuccess}</p>}
                </form>
              </div>
            )}

            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <IconUsers />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Sub Users</p>
                  <h3 className="text-xl font-bold text-slate-800">{loading ? "—" : totalCount}</h3>
                  <p className="text-[11px] text-slate-400">All registered sub users</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <IconUserCheck />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Users</p>
                  <h3 className="text-xl font-bold text-slate-800">{loading ? "—" : activeCount}</h3>
                  <p className="text-[11px] text-slate-400">Currently active users</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <IconUserX />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Inactive Users</p>
                  <h3 className="text-xl font-bold text-slate-800">{loading ? "—" : inactiveCount}</h3>
                  <p className="text-[11px] text-slate-400">Deactivated users</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <IconShield />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Roles In Use</p>
                  <h3 className="text-xl font-bold text-slate-800">{loading ? "—" : rolesInUse}</h3>
                  <p className="text-[11px] text-slate-400">Of {SUB_USER_ROLES.length} available roles</p>
                </div>
              </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              
              {/* Filters Header */}
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search by name, email or mobile..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700 placeholder-slate-400"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <IconSearch />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:outline-none"
                  >
                    <option value="">All Roles</option>
                    {SUB_USER_ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:outline-none"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-xs font-semibold px-4 py-3">⚠ {error}</p>
              )}

              {/* Scrollable Table Wrapper */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                      <th className="py-3 px-4 w-12 text-center">#</th>
                      <th className="py-3 px-4">User Name</th>
                      <th className="py-3 px-4">Email ID</th>
                      <th className="py-3 px-4">Mobile Number</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Created On</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {loading ? (
                      <tr><td colSpan="8" className="text-center py-8 text-slate-400">Loading Sub Users…</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan="8" className="text-center py-8 text-slate-400">
                        {subUsers.length === 0 ? "No Sub Users created yet." : "No Sub Users match your filters."}
                      </td></tr>
                    ) : (
                      filtered.map((user, index) => (
                        <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4 text-center text-slate-400 font-medium">{index + 1}</td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-full ${AVATAR_COLORS[user.id % AVATAR_COLORS.length]} text-white flex items-center justify-center font-bold text-[10px]`}>
                                {getInitials(user.name)}
                              </div>
                              <span className="font-semibold text-slate-800">{user.name}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-600 font-medium">{user.email}</td>
                          <td className="py-3 px-4 text-slate-600">{user.mobile || "—"}</td>

                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 text-[11px] font-medium rounded border ${ROLE_STYLES[user.role] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                              {ROLE_LABELS[user.role] || user.role}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleStatusToggle(user)}
                              className="flex items-center gap-1.5"
                              title="Click to toggle status"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                              <span className={`text-[11px] font-medium ${user.status === "active" ? "text-emerald-600" : "text-red-500"}`}>
                                {user.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </button>
                          </td>

                          <td className="py-3 px-4 text-slate-500">{formatDate(user.created_at)}</td>

                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => alert(`${user.name}\n${user.email}\n${user.mobile || "—"}\nRole: ${ROLE_LABELS[user.role] || user.role}\nStatus: ${user.status}`)}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors" title="View"
                              >
                                <IconEye />
                              </button>
                              <button
                                onClick={() => navigate(`/SubUserPermissions?id=${user.id}`)}
                                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded transition-colors" title="Edit Permissions"
                              >
                                <IconEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(user)}
                                disabled={deletingId === user.id}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50" title="Delete"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <div>{filtered.length === 0 ? "Showing 0 entries" : `Showing 1 to ${filtered.length} of ${subUsers.length} entries`}</div>
                <div className="flex items-center gap-1">
                  <button disabled className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 disabled:opacity-50">
                    <IconChevronLeft />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded font-medium">1</button>
                  <button disabled className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 disabled:opacity-50">
                    <IconChevronRight />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SubUser;
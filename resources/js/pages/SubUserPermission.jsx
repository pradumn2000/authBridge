import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

// Inline SVG Components (External library par dependency khatam karne ke liye)
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

const IconDownload = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconSave = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const IconReset = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const IconUser = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconMail = () => (
  <svg className="w-3.5 h-3.5 inline-block text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-3.5 h-3.5 inline-block text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconCheckCircle = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Module Specific Icons
const IconBadge = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
  </svg>
);

const IconBook = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconHome = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconShield = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconPulse = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconFile = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SubUserPermission = () => {
  const initialModules = [
    { id: 1, title: "Identity Verification", subtitle: "PAN, Identity Document, DL and other identity checks", icon: <IconBadge />, iconBg: "bg-blue-600", permissions: { view: true, edit: false, download: true, approve: false } },
    { id: 2, title: "Education Verification", subtitle: "10th, 12th, Graduation, PG and other qualifications", icon: <IconBook />, iconBg: "bg-emerald-500", permissions: { view: true, edit: true, download: true, approve: false } },
    { id: 3, title: "Employment Verification", subtitle: "Past employment, experience, offer/appointment letters", icon: <IconBriefcase />, iconBg: "bg-purple-600", permissions: { view: true, edit: true, download: true, approve: false } },
    { id: 4, title: "Address Verification", subtitle: "Permanent & Correspondence address", icon: <IconHome />, iconBg: "bg-amber-500", permissions: { view: true, edit: false, download: true, approve: false } },
    { id: 5, title: "Criminal Verification", subtitle: "Police verification, criminal records", icon: <IconShield />, iconBg: "bg-red-500", permissions: { view: true, edit: false, download: true, approve: true } },
    { id: 6, title: "Drug Test", subtitle: "Lab reports and test results", icon: <IconPulse />, iconBg: "bg-teal-500", permissions: { view: true, edit: false, download: true, approve: false } },
    { id: 7, title: "QC Review", subtitle: "Quality check and report review", icon: <IconCheckCircle />, iconBg: "bg-fuchsia-600", permissions: { view: true, edit: false, download: true, approve: true } },
    { id: 8, title: "Interim Report", subtitle: "Interim verification report", icon: <IconFile />, iconBg: "bg-indigo-600", permissions: { view: true, edit: false, download: true, approve: false } },
    { id: 9, title: "Final Report", subtitle: "Final verification report", icon: <IconFile />, iconBg: "bg-cyan-600", permissions: { view: true, edit: false, download: true, approve: true } },
  ];

  const [modules, setModules] = useState(initialModules);
  const [selectedUser, setSelectedUser] = useState("1");

  const handleCheckboxChange = (id, type) => {
    setModules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, permissions: { ...item.permissions, [type]: !item.permissions[type] } } : item
      )
    );
  };

  const handleSelectAllView = () => {
    const allChecked = modules.every((m) => m.permissions.view);
    setModules((prev) => prev.map((m) => ({ ...m, permissions: { ...m.permissions, view: !allChecked } })));
  };

  const handleSelectAllEdit = () => {
    const allChecked = modules.every((m) => m.permissions.edit);
    setModules((prev) => prev.map((m) => ({ ...m, permissions: { ...m.permissions, edit: !allChecked } })));
  };

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="p-4 md:p-6 bg-[#f4f7fe] min-h-screen text-slate-700 font-sans">
            
            {/* Top Header & Header Action Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Sub User Permissions</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                  Manage permissions for your sub users. Set access levels for different modules and verification checks.
                </p>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSelectAllView}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <IconEye /> Select All View
                </button>

                <button
                  onClick={handleSelectAllEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <IconEdit /> Select All Edit
                </button>

                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
                  <IconSave /> Save Permissions
                </button>

                <button
                  onClick={() => setModules(initialModules)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <IconReset /> Reset
                </button>
              </div>
            </div>

            {/* Select Sub User Card Bar */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                
                {/* Select Dropdown */}
                <div className="md:col-span-5 pr-0 md:pr-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Select Sub User
                  </label>
                  <div className="relative">
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                    >
                      <option value="1">Rahul Sharma — Verification Executive</option>
                      <option value="2">Priya Mehta — QC Verifier</option>
                      <option value="3">Amit Singh — Report Writer</option>
                    </select>
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <IconUser />
                    </div>
                  </div>
                </div>

                {/* Selected User Details */}
                <div className="md:col-span-3 pt-3 md:pt-0 md:px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold shrink-0">
                    <IconUser />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Rahul Sharma</h4>
                    <p className="text-[11px] text-slate-500">Verification Executive</p>
                  </div>
                </div>

                {/* User Contact Info */}
                <div className="md:col-span-4 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <IconMail />
                    <span className="truncate">rahul.sharma@satyapan.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconPhone />
                    <span>+91 98765 43210</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Main Permissions Table */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              
              {/* Scrollable Table Wrapper */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-slate-50/80 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200/80">
                      <th className="py-3.5 px-4 w-12 text-center">#</th>
                      <th className="py-3.5 px-4">Check / Module</th>
                      <th className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <IconEye /> View
                        </div>
                      </th>
                      <th className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <IconEdit /> Edit
                        </div>
                      </th>
                      <th className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <IconDownload /> Download
                        </div>
                      </th>
                      <th className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <IconCheckCircle />
                          <span>Approve <span className="text-[9px] text-slate-400 lowercase font-normal">(Where Applicable)</span></span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {modules.map((module) => (
                      <tr key={module.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-medium">{module.id}</td>
                        
                        {/* Module Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${module.iconBg} text-white flex items-center justify-center shrink-0`}>
                              {module.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{module.title}</div>
                              <div className="text-[11px] text-slate-400">{module.subtitle}</div>
                            </div>
                          </div>
                        </td>

                        {/* View Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.view}
                            onChange={() => handleCheckboxChange(module.id, "view")}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                          />
                        </td>

                        {/* Edit Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.edit}
                            onChange={() => handleCheckboxChange(module.id, "edit")}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                          />
                        </td>

                        {/* Download Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.download}
                            onChange={() => handleCheckboxChange(module.id, "download")}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                          />
                        </td>

                        {/* Approve Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={module.permissions.approve}
                            onChange={() => handleCheckboxChange(module.id, "approve")}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SubUserPermission;
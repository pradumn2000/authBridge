import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";
import { 
  FiEye, 
  FiEdit, 
  FiDownload, 
  FiCheckCircle, 
  FiSave, 
  FiRotateCcw, 
  FiUser, 
  FiMail, 
  FiPhone,
  FiShield,
  FiBookOpen,
  FiBriefcase,
  FiHome,
  FiFileText,
  FiActivity,
  FiCheckSquare
} from "react-icons/fi";

const SubUserPermission = () => {
  // Initial modules data reflecting the image checks & descriptions
  const initialModules = [
    {
      id: 1,
      title: "Identity Verification",
      subtitle: "PAN, Aadhaar, DL and other identity checks",
      icon: <FiUser />,
      iconBg: "bg-blue-600",
      permissions: { view: true, edit: false, download: true, approve: false },
    },
    {
      id: 2,
      title: "Education Verification",
      subtitle: "10th, 12th, Graduation, PG and other qualifications",
      icon: <FiBookOpen />,
      iconBg: "bg-emerald-500",
      permissions: { view: true, edit: true, download: true, approve: false },
    },
    {
      id: 3,
      title: "Employment Verification",
      subtitle: "Past employment, experience, offer/appointment letters",
      icon: <FiBriefcase />,
      iconBg: "bg-purple-600",
      permissions: { view: true, edit: true, download: true, approve: false },
    },
    {
      id: 4,
      title: "Address Verification",
      subtitle: "Permanent & Correspondence address",
      icon: <FiHome />,
      iconBg: "bg-amber-500",
      permissions: { view: true, edit: false, download: true, approve: false },
    },
    {
      id: 5,
      title: "Criminal Verification",
      subtitle: "Police verification, criminal records",
      icon: <FiShield />,
      iconBg: "bg-red-500",
      permissions: { view: true, edit: false, download: true, approve: true },
    },
    {
      id: 6,
      title: "Drug Test",
      subtitle: "Lab reports and test results",
      icon: <FiActivity />,
      iconBg: "bg-teal-500",
      permissions: { view: true, edit: false, download: true, approve: false },
    },
    {
      id: 7,
      title: "QC Review",
      subtitle: "Quality check and report review",
      icon: <FiCheckSquare />,
      iconBg: "bg-fuchsia-600",
      permissions: { view: true, edit: false, download: true, approve: true },
    },
    {
      id: 8,
      title: "Interim Report",
      subtitle: "Interim verification report",
      icon: <FiFileText />,
      iconBg: "bg-indigo-600",
      permissions: { view: true, edit: false, download: true, approve: false },
    },
    {
      id: 9,
      title: "Final Report",
      subtitle: "Final verification report",
      icon: <FiFileText />,
      iconBg: "bg-cyan-600",
      permissions: { view: true, edit: false, download: true, approve: true },
    },
  ];

  const [modules, setModules] = useState(initialModules);
  const [selectedUser, setSelectedUser] = useState("1");

  // Toggle individual checkbox
  const handleCheckboxChange = (id, type) => {
    setModules((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              permissions: {
                ...item.permissions,
                [type]: !item.permissions[type],
              },
            }
          : item
      )
    );
  };

  // Select/Deselect All View column
  const handleSelectAllView = () => {
    const allChecked = modules.every((m) => m.permissions.view);
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        permissions: { ...m.permissions, view: !allChecked },
      }))
    );
  };

  // Select/Deselect All Edit column
  const handleSelectAllEdit = () => {
    const allChecked = modules.every((m) => m.permissions.edit);
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        permissions: { ...m.permissions, edit: !allChecked },
      }))
    );
  };

  // Reset to initial state
  const handleReset = () => {
    setModules(initialModules);
  };

  return (
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
            <FiEye className="text-slate-500" /> Select All View
          </button>

          <button
            onClick={handleSelectAllEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
          >
            <FiEdit className="text-slate-500" /> Select All Edit
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
            <FiSave /> Save Permissions
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
          >
            <FiRotateCcw className="text-slate-400" /> Reset
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
              <FiUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            </div>
          </div>

          {/* Selected User Details */}
          <div className="md:col-span-3 pt-3 md:pt-0 md:px-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold shrink-0">
              <FiUser />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Rahul Sharma</h4>
              <p className="text-[11px] text-slate-500">Verification Executive</p>
            </div>
          </div>

          {/* User Contact Info */}
          <div className="md:col-span-4 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <FiMail className="text-slate-400 text-xs shrink-0" />
              <span className="truncate">rahul.sharma@satyapan.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-slate-400 text-xs shrink-0" />
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
                    <FiEye className="text-slate-500" /> View
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <FiEdit className="text-slate-500" /> Edit
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <FiDownload className="text-slate-500" /> Download
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <FiCheckCircle className="text-slate-500" /> 
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
                      <div className={`w-8 h-8 rounded-full ${module.iconBg} text-white flex items-center justify-center text-sm shrink-0`}>
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
  );
};

// Default Export to prevent build failures in Vite / React App
export default SubUserPermission;
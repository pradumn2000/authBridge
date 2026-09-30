import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

// Inline SVG Icons
const IconSearch = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconUser = () => (
  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const IconArrowLeft = () => (
  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const IconSave = () => (
  <svg className="w-4 h-4 inline-block mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const IconChevronLeft = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const IconChevronRight = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const Allocation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State for TLs and Sub Users
  const [tls, setTls] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Search States
  const [tlSearch, setTlSearch] = useState("");
  const [subUserSearch, setSubUserSearch] = useState("");

  // Selection States
  const [selectedTls, setSelectedTls] = useState([]);
  const [selectedSubUsers, setSelectedSubUsers] = useState([]);

  // Mock data fallbacks for initial UI viewing if API endpoint is not set up
  const mockTls = [
    { id: 1, name: "Amit Sharma", email: "amit.sharma@company.com", verification_type: "All Verification" },
    { id: 2, name: "Neha Verma", email: "neha.verma@company.com", verification_type: "Background Verification" },
    { id: 3, name: "Rohit Kumar", email: "rohit.kumar@company.com", verification_type: "Education Verification" },
    { id: 4, name: "Pooja Singh", email: "pooja.singh@company.com", verification_type: "Employment Verification" },
    { id: 5, name: "Vikas Yadav", email: "vikas.yadav@company.com", verification_type: "Address Verification" },
    { id: 6, name: "Simran Kaur", email: "simran.kaur@company.com", verification_type: "Document Verification" },
    { id: 7, name: "Sandeep Patel", email: "sandeep.patel@company.com", verification_type: "All Verification" },
    { id: 8, name: "Ritika Gupta", email: "ritika.gupta@company.com", verification_type: "Education Verification" },
  ];

  const mockSubUsers = [
    { id: 101, name: "Ravi Kumar", email: "ravi.kumar@company.com", status: "Active" },
    { id: 102, name: "Anjali Singh", email: "anjali.singh@company.com", status: "Active" },
    { id: 103, name: "Deepak Verma", email: "deepak.verma@company.com", status: "Active" },
    { id: 104, name: "Neha Joshi", email: "neha.joshi@company.com", status: "Active" },
    { id: 105, name: "Sahil Khan", email: "sahil.khan@company.com", status: "Active" },
    { id: 106, name: "Pooja Mehta", email: "pooja.mehta@company.com", status: "Active" },
    { id: 107, name: "Aman Gupta", email: "aman.gupta@company.com", status: "Active" },
    { id: 108, name: "Kavita Sharma", email: "kavita.sharma@company.com", status: "Active" },
  ];

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/allocations/data`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setTls(data.tls || mockTls);
        setSubUsers(data.subUsers || mockSubUsers);
      } else {
        // Fallback to mock data if backend route is pending
        setTls(mockTls);
        setSubUsers(mockSubUsers);
      }
    } catch (err) {
      // Fallback on error
      setTls(mockTls);
      setSubUsers(mockSubUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Checkbox handlers for Team Leads
  const toggleSelectAllTls = (e, filteredTls) => {
    if (e.target.checked) {
      setSelectedTls(filteredTls.map((tl) => tl.id));
    } else {
      setSelectedTls([]);
    }
  };

  const toggleSelectTl = (id) => {
    setSelectedTls((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Checkbox handlers for Sub Users
  const toggleSelectAllSubUsers = (e, filteredUsers) => {
    if (e.target.checked) {
      setSelectedSubUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedSubUsers([]);
    }
  };

  const toggleSelectSubUser = (id) => {
    setSelectedSubUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Save Allocation Handler
  const handleSaveAllocation = async () => {
    if (selectedTls.length === 0 || selectedSubUsers.length === 0) {
      alert("Please select at least one Team Lead and one Sub User to assign.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/allocations/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tl_ids: selectedTls,
          sub_user_ids: selectedSubUsers,
        }),
      });

      if (res.ok) {
        alert("Allocation saved successfully!");
        setSelectedTls([]);
        setSelectedSubUsers([]);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to save allocation.");
      }
    } catch (err) {
      alert("Server error while saving allocation.");
    } finally {
      setSaving(false);
    }
  };

  // Filters
  const filteredTls = tls.filter(
    (tl) =>
      tl.name.toLowerCase().includes(tlSearch.toLowerCase()) ||
      tl.email.toLowerCase().includes(tlSearch.toLowerCase())
  );

  const filteredSubUsers = subUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(subUserSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(subUserSearch.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="p-4 md:p-6 bg-[#f4f7fe] min-h-screen text-slate-700 font-sans">
            
            {/* Header Title & Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Allocation</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                  Assign multiple Sub Users to Team Leads (TLs) for different verification types.
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Dashboard &gt; Sub User Management &gt;{" "}
                <span className="text-blue-600 font-medium">Allocation</span>
              </div>
            </div>

            {/* Main Dual Box Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              
              {/* Left Card: Team Leads */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between min-h-[520px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <IconUsers />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Team Leads (TLs)</h3>
                      <p className="text-[11px] text-slate-400">Select a TL to assign Sub Users</p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search TL by name or email..."
                      value={tlSearch}
                      onChange={(e) => setTlSearch(e.target.value)}
                      className="w-full pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700 placeholder-slate-400"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <IconSearch />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/70 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-100">
                          <th className="py-2.5 px-2 w-8">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-0"
                              onChange={(e) => toggleSelectAllTls(e, filteredTls)}
                              checked={
                                filteredTls.length > 0 &&
                                filteredTls.every((tl) => selectedTls.includes(tl.id))
                              }
                            />
                          </th>
                          <th className="py-2.5 px-2">TL Name</th>
                          <th className="py-2.5 px-2">Email ID</th>
                          <th className="py-2.5 px-2">Verification Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-slate-400">Loading TLs...</td>
                          </tr>
                        ) : filteredTls.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-slate-400">No TLs found.</td>
                          </tr>
                        ) : (
                          filteredTls.map((tl) => {
                            const isSelected = selectedTls.includes(tl.id);
                            return (
                              <tr
                                key={tl.id}
                                className={`transition-colors cursor-pointer ${
                                  isSelected ? "bg-blue-50/60" : "hover:bg-slate-50/60"
                                }`}
                                onClick={() => toggleSelectTl(tl.id)}
                              >
                                <td className="py-2.5 px-2" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelectTl(tl.id)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-0"
                                  />
                                </td>
                                <td className="py-2.5 px-2 font-medium text-slate-800">{tl.name}</td>
                                <td className="py-2.5 px-2 text-slate-500">{tl.email}</td>
                                <td className="py-2.5 px-2 text-slate-600">{tl.verification_type}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Pagination */}
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div>Showing 1 to {filteredTls.length} of {tls.length} TLs</div>
                  <div className="flex items-center gap-1">
                    <button disabled className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-slate-400 opacity-50">
                      <IconChevronLeft />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded font-medium">1</button>
                    <button disabled className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-slate-400 opacity-50">
                      <IconChevronRight />
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle Transfer Buttons */}
              <div className="flex lg:flex-col gap-2 justify-center my-2 lg:my-0">
                <button
                  onClick={handleSaveAllocation}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
                  title="Assign Selected"
                >
                  <IconArrowRight />
                </button>
                <button
                  onClick={() => {
                    setSelectedTls([]);
                    setSelectedSubUsers([]);
                  }}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition-all"
                  title="Clear Selection"
                >
                  <IconArrowLeft />
                </button>
              </div>

              {/* Right Card: Sub Users */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between min-h-[520px]">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <IconUser />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Sub Users</h3>
                      <p className="text-[11px] text-slate-400">Select Sub Users to allocate with the selected TL(s)</p>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search sub user by name or email..."
                      value={subUserSearch}
                      onChange={(e) => setSubUserSearch(e.target.value)}
                      className="w-full pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-700 placeholder-slate-400"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <IconSearch />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/70 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-100">
                          <th className="py-2.5 px-2 w-8">
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-blue-600 focus:ring-0"
                              onChange={(e) => toggleSelectAllSubUsers(e, filteredSubUsers)}
                              checked={
                                filteredSubUsers.length > 0 &&
                                filteredSubUsers.every((u) => selectedSubUsers.includes(u.id))
                              }
                            />
                          </th>
                          <th className="py-2.5 px-2">Sub User Name</th>
                          <th className="py-2.5 px-2">Email ID</th>
                          <th className="py-2.5 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-slate-400">Loading Sub Users...</td>
                          </tr>
                        ) : filteredSubUsers.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-slate-400">No Sub Users found.</td>
                          </tr>
                        ) : (
                          filteredSubUsers.map((user) => {
                            const isSelected = selectedSubUsers.includes(user.id);
                            return (
                              <tr
                                key={user.id}
                                className={`transition-colors cursor-pointer ${
                                  isSelected ? "bg-blue-50/60" : "hover:bg-slate-50/60"
                                }`}
                                onClick={() => toggleSelectSubUser(user.id)}
                              >
                                <td className="py-2.5 px-2" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelectSubUser(user.id)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-0"
                                  />
                                </td>
                                <td className="py-2.5 px-2 font-medium text-slate-800">{user.name}</td>
                                <td className="py-2.5 px-2 text-slate-500">{user.email}</td>
                                <td className="py-2.5 px-2">
                                  <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-600 rounded">
                                    {user.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Pagination */}
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div>Showing 1 to {filteredSubUsers.length} of {subUsers.length} Sub Users</div>
                  <div className="flex items-center gap-1">
                    <button disabled className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-slate-400 opacity-50">
                      <IconChevronLeft />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded font-medium">1</button>
                    <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50 font-medium">2</button>
                    <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50">
                      <IconChevronRight />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAllocation}
                disabled={saving}
                className="flex items-center px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors disabled:opacity-60"
              >
                <IconSave /> {saving ? "Saving..." : "Save Allocation"}
              </button>
            </div>

          </div>
        </main>
      </section>
    </>
  );
};

export default Allocation;
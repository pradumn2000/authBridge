import React, { useState } from "react";
import {
  Users,
  UserCheck,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TLAllocator = () => {
  const [selectedVerifier, setSelectedVerifier] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'unassigned', 'assigned'
  const [selectedCases, setSelectedCases] = useState(["EDU-1002"]);

  // Verifier Workload Data
  const verifierWorkload = [
    { name: "Neha Sharma", assigned: 18, inProgress: 5, completed: 12, qaPending: 3, capacity: 30 },
    { name: "Amit Kumar", assigned: 12, inProgress: 3, completed: 9, qaPending: 2, capacity: 25 },
    { name: "Priya Nair", assigned: 21, inProgress: 7, completed: 16, qaPending: 5, capacity: 35 },
    { name: "Sandeep Yadav", assigned: 9, inProgress: 4, completed: 7, qaPending: 2, capacity: 20 },
  ];

  // Table Data
  const initialCases = [
    {
      id: "EDU-1001",
      candidate: "Rohan Sharma",
      qualification: "Graduation",
      client: "ABC Corp",
      receivedDate: "22 Sep 2025",
      tat: "5 Days",
      currentVerifier: "Neha Sharma",
      status: "In Progress",
      statusStyle: "bg-blue-50 text-blue-600 font-medium",
      assigned: true,
    },
    {
      id: "EDU-1002",
      candidate: "Priya Nair",
      qualification: "12th",
      client: "XYZ Ltd",
      receivedDate: "21 Sep 2025",
      tat: "3 Days",
      currentVerifier: "Amit Kumar",
      status: "QA Review",
      statusStyle: "bg-amber-50 text-amber-600 font-medium",
      assigned: true,
    },
    {
      id: "EDU-1003",
      candidate: "Amit Verma",
      qualification: "Post Graduation",
      client: "Global Tech",
      receivedDate: "20 Sep 2025",
      tat: "6 Days",
      currentVerifier: "Priya Nair",
      status: "Completed",
      statusStyle: "bg-emerald-50 text-emerald-600 font-medium",
      assigned: true,
    },
    {
      id: "EDU-1004",
      candidate: "Neha Kapoor",
      qualification: "10th",
      client: "Bright Future",
      receivedDate: "19 Sep 2025",
      tat: "4 Days",
      currentVerifier: "Sandeep Yadav",
      status: "Pending",
      statusStyle: "bg-purple-50 text-purple-600 font-medium",
      assigned: false,
    },
  ];

  // Handle Checkbox Selection
  const handleSelectCase = (id) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter((item) => item !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCases(initialCases.map((c) => c.id));
    } else {
      setSelectedCases([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER SECTION */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Case Allocation
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Allocate education cases to verifiers
          </p>
        </div>

        {/* TOP CARDS & ACTION BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Unassigned Cases */}
          <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Unassigned Cases</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">36</p>
            </div>
          </div>

          {/* Selected Cases */}
          <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Selected Cases</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {selectedCases.length}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-4 flex items-center gap-3 justify-start md:justify-end">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#00A37A] hover:bg-[#008f6b] text-white font-medium text-sm rounded-lg shadow-sm transition-colors">
              Allocate
            </button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg shadow-sm transition-colors">
              Reallocate
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION: SELECT VERIFIER + WORKLOAD TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Select Verifier Dropdown */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Verifier
            </label>
            <div className="relative">
              <select
                value={selectedVerifier}
                onChange={(e) => setSelectedVerifier(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A37A]/20 focus:border-[#00A37A]"
              >
                <option value="">Select Education Verifier</option>
                {verifierWorkload.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Verifier Workload Table */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Verifier Workload
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[11px] font-semibold uppercase">
                    <th className="pb-2.5">Verifier</th>
                    <th className="pb-2.5">Assigned</th>
                    <th className="pb-2.5">In Progress</th>
                    <th className="pb-2.5">Completed</th>
                    <th className="pb-2.5">QA Pending</th>
                    <th className="pb-2.5">Capacity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                  {verifierWorkload.map((v, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-semibold text-slate-900">{v.name}</td>
                      <td className="py-2.5">{v.assigned}</td>
                      <td className="py-2.5">{v.inProgress}</td>
                      <td className="py-2.5">{v.completed}</td>
                      <td className="py-2.5">{v.qaPending}</td>
                      <td className="py-2.5">{v.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: TABS & MAIN CASES TABLE */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* TABS */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-[#00A37A] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              All Cases (12)
            </button>
            <button
              onClick={() => setActiveTab("unassigned")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "unassigned"
                  ? "bg-[#00A37A] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Unassigned (3)
            </button>
            <button
              onClick={() => setActiveTab("assigned")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === "assigned"
                  ? "bg-[#00A37A] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Assigned (9)
            </button>
          </div>

          {/* MAIN TABLE */}
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                  <th className="pb-3 px-3 w-10">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedCases.length === initialCases.length &&
                        initialCases.length > 0
                      }
                      className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
                    />
                  </th>
                  <th className="pb-3 px-3">Case ID</th>
                  <th className="pb-3 px-3">Candidate Name</th>
                  <th className="pb-3 px-3">Qualification</th>
                  <th className="pb-3 px-3">Client</th>
                  <th className="pb-3 px-3">Received Date</th>
                  <th className="pb-3 px-3">TAT</th>
                  <th className="pb-3 px-3">Current Verifier</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {initialCases.map((row) => {
                  const isChecked = selectedCases.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        isChecked ? "bg-slate-50/80" : ""
                      }`}
                    >
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectCase(row.id)}
                          className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
                        />
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {row.candidate}
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {row.qualification}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {row.client}
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {row.receivedDate}
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {row.tat}
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                        {row.currentVerifier}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-medium rounded-md transition-colors">
                            View Case
                          </button>
                          <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
            <span>Showing 1 - 4 of 12 cases</span>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded bg-[#00A37A] text-white font-medium text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center">
                2
              </button>
              <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TLAllocator;
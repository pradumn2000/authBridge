import React, { useState } from "react";
import {
  FileText,
  Hourglass,
  Calendar,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const TLQCReview = () => {
  const [dateRange, setDateRange] = useState("01 Sep 2026 - 30 Sep 2026");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCases, setSelectedCases] = useState(["EDU-1002"]);
  const [qcAction, setQcAction] = useState("Approved");
  const [comments, setComments] = useState("");

  // Top Summary Metrics Data
  const stats = [
    {
      title: "Pending QC",
      value: "48",
      trend: "↑ 12%",
      trendType: "up",
      icon: Hourglass,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Reviewed Today",
      value: "36",
      trend: "↑ 8%",
      trendType: "up",
      icon: Calendar,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Approved",
      value: "22",
      trend: "↑ 16%",
      trendType: "up",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Rejected",
      value: "6",
      trend: "↓ 20%",
      trendType: "down",
      icon: XCircle,
      iconBg: "bg-rose-50 text-rose-600",
    },
  ];

  // Cases Table Data
  const casesData = [
    {
      id: "EDU-1001",
      candidate: "Rohan Sharma",
      client: "ABC Corp",
      qualification: "Graduation",
      university: "Delhi University",
      receivedDate: "22 Sep 2026",
      tat: "5 Days",
      verifier: "Neha S.",
      status: "In Progress",
      statusStyle: "bg-blue-50 text-blue-600",
    },
    {
      id: "EDU-1002",
      candidate: "Priya Nair",
      client: "XYZ Ltd",
      qualification: "12th",
      university: "Amity University",
      receivedDate: "21 Sep 2026",
      tat: "3 Days",
      verifier: "Amit K.",
      status: "QA Review",
      statusStyle: "bg-amber-50 text-amber-600",
    },
    {
      id: "EDU-1003",
      candidate: "Amit Verma",
      client: "Global Tech",
      qualification: "Post Graduation",
      university: "MDU University",
      receivedDate: "20 Sep 2026",
      tat: "6 Days",
      verifier: "Riya R.",
      status: "Completed",
      statusStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      id: "EDU-1004",
      candidate: "Neha Kapoor",
      client: "Bright Future",
      qualification: "10th",
      university: "St. Xavier's",
      receivedDate: "19 Sep 2026",
      tat: "4 Days",
      verifier: "Sandeep Y.",
      status: "Pending",
      statusStyle: "bg-purple-50 text-purple-600",
    },
    {
      id: "EDU-1005",
      candidate: "Sandeep Yadav",
      client: "Horizon Inc",
      qualification: "Graduation",
      university: "BHU",
      receivedDate: "18 Sep 2026",
      tat: "7 Days",
      verifier: "Pooja S.",
      status: "In Progress",
      statusStyle: "bg-blue-50 text-blue-600",
    },
    {
      id: "EDU-1006",
      candidate: "Pooja Singh",
      client: "Tech Solutions",
      qualification: "12th",
      university: "Punjab University",
      receivedDate: "17 Sep 2026",
      tat: "7 Days",
      verifier: "Amit K.",
      status: "Pending",
      statusStyle: "bg-purple-50 text-purple-600",
    },
    {
      id: "EDU-1007",
      candidate: "Rahul Mehta",
      client: "Global Tech",
      qualification: "Graduation",
      university: "SVNIT",
      receivedDate: "16 Sep 2026",
      tat: "5 Days",
      verifier: "Riya R.",
      status: "QA Review",
      statusStyle: "bg-amber-50 text-amber-600",
    },
    {
      id: "EDU-1008",
      candidate: "Karan Shah",
      client: "Bright Future",
      qualification: "10th",
      university: "Bangalore University",
      receivedDate: "15 Sep 2026",
      tat: "4 Days",
      verifier: "Sandeep Y.",
      status: "Completed",
      statusStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      id: "EDU-1009",
      candidate: "Anita Sharma",
      client: "ABC Corp",
      qualification: "Post Graduation",
      university: "IIT Delhi",
      receivedDate: "14 Sep 2026",
      tat: "6 Days",
      verifier: "Neha S.",
      status: "Rejected",
      statusStyle: "bg-rose-50 text-rose-600",
    },
    {
      id: "EDU-1010",
      candidate: "Vikram Rao",
      client: "Tech Solutions",
      qualification: "Graduation",
      university: "Pune University",
      receivedDate: "13 Sep 2026",
      tat: "5 Days",
      verifier: "Pooja S.",
      status: "Rejected",
      statusStyle: "bg-rose-50 text-rose-600",
    },
  ];

  const handleSelectCase = (id) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter((item) => item !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCases(casesData.map((c) => c.id));
    } else {
      setSelectedCases([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                QC Review
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review and verify all education verification cases before completion
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors self-start sm:self-auto">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>{dateRange}</span>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
          </button>
        </div>

        {/* SUMMARY CARDS (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-full ${stat.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      stat.trendType === "up"
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-rose-600 bg-rose-50"
                    }`}
                  >
                    {stat.trend}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">vs. last 30 days</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FILTERS & SEARCH SECTION */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
          
          {/* Dropdown Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Date Range
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>01 Sep 2026 - 30 Sep 2026</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Client
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>All Clients</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Qualification
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>All Qualifications</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                University
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>All Universities</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Verifier
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>All Verifiers</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Status
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs text-slate-700 focus:outline-none">
                  <option>All Status</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search bar & Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Case ID, Candidate Name, Client Name, University, Qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors">
                Reset
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors">
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

        </div>

        {/* MAIN CASES TABLE CONTAINER */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Table Top Action Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <span className="text-xs font-semibold text-slate-500">
              Showing 1 - 10 of 48 cases
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* Download Reports Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg shadow-sm">
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download All BGV Reports</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>
              </div>

              {/* Documents Review Button */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg shadow-sm">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Documents Review</span>
              </button>

              {/* Bulk Actions Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-lg shadow-sm">
                  <span>Bulk Actions</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedCases.length === casesData.length &&
                        casesData.length > 0
                      }
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-3 px-2">Case ID</th>
                  <th className="py-3 px-3">Candidate Name</th>
                  <th className="py-3 px-3">Client Name</th>
                  <th className="py-3 px-3">Qualification</th>
                  <th className="py-3 px-3">University</th>
                  <th className="py-3 px-3">Received Date</th>
                  <th className="py-3 px-3">TAT</th>
                  <th className="py-3 px-3">Assigned Verifier</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">BGV Report</th>
                  <th className="py-3 px-3 text-center">Documents</th>
                  <th className="py-3 px-3 text-center">Action</th>
                  <th className="py-3 px-3 text-center">QC Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {casesData.map((row) => {
                  const isChecked = selectedCases.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isChecked ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectCase(row.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-2 font-medium text-slate-900 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800 whitespace-nowrap">
                        {row.candidate}
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {row.client}
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {row.qualification}
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {row.university}
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {row.receivedDate}
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {row.tat}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {row.verifier}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${row.statusStyle}`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* BGV Report Download */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs">
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </td>

                      {/* Documents Review */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs">
                          <FileText className="w-3 h-3" />
                          <span>Review</span>
                        </button>
                      </td>

                      {/* View Case Action */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button className="px-2.5 py-1 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded text-xs font-medium transition-colors">
                          View Case
                        </button>
                      </td>

                      {/* QC Action Dropdown */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="relative inline-block text-left">
                          <select className="appearance-none bg-white border border-slate-200 rounded px-2.5 py-1 pr-6 text-xs text-slate-600 focus:outline-none">
                            <option>Select</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div></div>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 rounded bg-[#2563EB] text-white font-medium text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center justify-center">
                2
              </button>
              <button className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center justify-center">
                3
              </button>
              <button className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center justify-center">
                4
              </button>
              <button className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center justify-center">
                5
              </button>
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM QC ACTION PANEL & QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Bottom Left Panel: QC Action Entry */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>QC Action - EDU-1002 (Priya Nair)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              
              {/* Action Choice Buttons */}
              <div className="md:col-span-4 space-y-2">
                <button
                  onClick={() => setQcAction("Approved")}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold border transition-all ${
                    qcAction === "Approved"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-emerald-600 border-emerald-500 hover:bg-emerald-50"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approved</span>
                </button>

                <button
                  onClick={() => setQcAction("Rejected")}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold border transition-all ${
                    qcAction === "Rejected"
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-white text-rose-600 border-rose-200 hover:bg-rose-50"
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Rejected</span>
                </button>
              </div>

              {/* Comments Textarea & Save Actions */}
              <div className="md:col-span-8 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Comments <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your comments here..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    maxLength={600}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  ></textarea>
                  <p className="text-[10px] text-slate-400 text-right mt-0.5">0/600</p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors">
                    Save
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Right Panel: Quick Actions */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 border-b border-slate-100 pb-3">
              Quick Actions
            </h3>

            <div className="space-y-3">
              {/* Download BGV Report Quick Action */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors cursor-pointer">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600">Download BGV Report</p>
                  <p className="text-[11px] text-slate-400">Get complete verification report for this case</p>
                </div>
              </div>

              {/* View Documents Quick Action */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors cursor-pointer">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600">View Documents</p>
                  <p className="text-[11px] text-slate-400">Review uploaded and verified documents</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TLQCReview;
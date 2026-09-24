import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  Plus,
  GraduationCap,
  Link2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Upload,
  Eye,
  Send,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TLEducationCheck = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCases, setSelectedCases] = useState([]);

  // Top Summary Cards Data
  const stats = [
    {
      title: "Total Cases",
      value: "128",
      icon: GraduationCap,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Link Sent",
      value: "42",
      icon: Link2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "In Progress",
      value: "31",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed",
      value: "45",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Discrepancy",
      value: "10",
      icon: AlertTriangle,
      iconBg: "bg-rose-50 text-rose-600",
    },
  ];

  // Cases Table Data
  const casesData = [
    {
      sno: 1,
      id: "EDU-1024",
      candidate: "Aditi Sharma",
      client: "Acme Corp",
      university: "Delhi University",
      qualification: "MBA",
      passingYear: "2022",
      qcReview: "In Progress",
      qcStyle: "bg-amber-50 text-amber-600 border border-amber-200",
      linkSentOn: "-",
    },
    {
      sno: 2,
      id: "EDU-1025",
      candidate: "Rahul Verma",
      client: "Northstar Ltd",
      university: "JNTU Hyderabad",
      qualification: "B.Tech",
      passingYear: "2021",
      qcReview: "Reviewed",
      qcStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      linkSentOn: "22 Aug 2025",
    },
    {
      sno: 3,
      id: "EDU-1026",
      candidate: "Neha Singh",
      client: "BrightHire",
      university: "Amity University",
      qualification: "BBA",
      passingYear: "2023",
      qcReview: "Pending",
      qcStyle: "bg-purple-50 text-purple-600 border border-purple-200",
      linkSentOn: "-",
    },
    {
      sno: 4,
      id: "EDU-1027",
      candidate: "Karan Patel",
      client: "Acme Corp",
      university: "Pune University",
      qualification: "M.Com",
      passingYear: "2020",
      qcReview: "Reviewed",
      qcStyle: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      linkSentOn: "21 Aug 2025",
    },
    {
      sno: 5,
      id: "EDU-1028",
      candidate: "Pooja Reddy",
      client: "Vertex HR",
      university: "Osmania University",
      qualification: "B.Sc",
      passingYear: "2022",
      qcReview: "Flagged",
      qcStyle: "bg-rose-50 text-rose-600 border border-rose-200",
      linkSentOn: "20 Aug 2025",
    },
  ];

  // Checkbox Selection Logic
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
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP HEADER & SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Education Check
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage and send education verification links
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Case ID / Candidate Name / University"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* FILTERS & NEW ACTION BUTTON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Client Filter */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Client
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm">
                <option>All Clients</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* University / Institute Filter */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              University / Institute
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm">
                <option>All Universities</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Status
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm">
                <option>All Status</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Verification Mode Filter */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              Verification Mode
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm">
                <option>All Modes</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date & Add Action Buttons */}
          <div className="lg:col-span-3 flex items-center justify-end gap-2 mt-auto pt-2 sm:pt-0">
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm">
              <Calendar className="w-4 h-4" />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Education Check</span>
            </button>
          </div>

        </div>

        {/* SUMMARY STATS CARDS (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5"
              >
                <div className={`p-3 rounded-full ${stat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN CASES TABLE SECTION */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Table Header Action Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900">
              Education Verification Cases
            </h2>
            <button className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
              <ShieldCheck className="w-4 h-4" />
              <span>QC Review</span>
            </button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 uppercase text-[11px] tracking-wider font-semibold">
                  <th className="py-3 px-3 w-10">
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
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-3">Case ID</th>
                  <th className="py-3 px-3">Candidate Name</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">University / Institute</th>
                  <th className="py-3 px-3">Qualification</th>
                  <th className="py-3 px-3">Passing Year</th>
                  <th className="py-3 px-3">QC Review</th>
                  <th className="py-3 px-3">Link Sent On</th>
                  <th className="py-3 px-3 text-center">Documents</th>
                  <th className="py-3 px-3 text-center">Action</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {casesData.map((row) => {
                  const isChecked = selectedCases.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isChecked ? "bg-slate-50/80" : ""
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectCase(row.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3.5 px-2 text-slate-400 font-medium">{row.sno}</td>
                      <td className="py-3.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                        {row.candidate}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {row.client}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                        {row.university}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {row.qualification}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {row.passingYear}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${row.qcStyle}`}
                        >
                          {row.qcReview}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                        {row.linkSentOn}
                      </td>

                      {/* Documents Buttons (Upload / View) */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded text-xs font-medium transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </div>
                      </td>

                      {/* Send Link Action Button */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-center">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm transition-colors">
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Verification Link</span>
                        </button>
                      </td>

                      {/* Options Icon */}
                      <td className="py-3.5 px-2 text-right">
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>Showing 1 - 5 of 128 entries</span>

            <div className="flex items-center gap-3">
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-400">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 rounded bg-[#2563EB] text-white font-semibold text-xs flex items-center justify-center">
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
                <span className="px-1 text-slate-400">...</span>
                <button className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center justify-center">
                  26
                </button>
                <button className="p-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Rows Per Page Selector */}
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 rounded px-2 py-1 pr-6 text-xs text-slate-600 focus:outline-none">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TLEducationCheck;
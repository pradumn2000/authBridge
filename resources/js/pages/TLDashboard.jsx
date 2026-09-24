import React, { useState } from "react";
import {
  FileText,
  Users,
  Hourglass,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ChevronDown,
} from "lucide-react";

const TLDashboard = () => {
  const [dateRange, setDateRange] = useState("01 Sep 2025 - 30 Sep 2025");

  const stats = [
    {
      title: "Total Education Cases",
      value: "248",
      trend: "↑ 12%",
      trendType: "up",
      icon: FileText,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Allocation",
      value: "36",
      trend: "↑ 8%",
      trendType: "up",
      icon: Users,
      iconBg: "bg-orange-50 text-orange-500",
    },
    {
      title: "In Progress",
      value: "78",
      trend: "↑ 14%",
      trendType: "up",
      icon: Hourglass,
      iconBg: "bg-sky-50 text-sky-500",
    },
    {
      title: "QA Review Pending",
      value: "42",
      trend: "↑ 6%",
      trendType: "up",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-500",
    },
    {
      title: "Completed",
      value: "86",
      trend: "↑ 18%",
      trendType: "up",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-500",
    },
    {
      title: "TAT Breached",
      value: "6",
      trend: "↓ 50%",
      trendType: "down",
      icon: AlertTriangle,
      iconBg: "bg-rose-50 text-rose-500",
    },
  ];

  const qualificationData = [
    { name: "10th", value: 32, percentage: "12.9%", color: "#0088FE" },
    { name: "12th", value: 58, percentage: "23.4%", color: "#00C49F" },
    { name: "Graduation", value: 98, percentage: "39.5%", color: "#10B981" },
    { name: "Post Graduation", value: 44, percentage: "17.7%", color: "#8884d8" },
    { name: "Other", value: 16, percentage: "6.5%", color: "#FFBB28" },
  ];

  const recentCases = [
    {
      id: "EDU-1001",
      candidate: "Rohan Sharma",
      qualification: "Graduation",
      client: "ABC Corp",
      date: "22 Sep 2025",
      status: "In Progress",
      statusStyle: "bg-blue-50 text-blue-600 font-medium",
    },
    {
      id: "EDU-1002",
      candidate: "Priya Nair",
      qualification: "12th",
      client: "XYZ Ltd",
      date: "21 Sep 2025",
      status: "QA Review",
      statusStyle: "bg-amber-50 text-amber-600 font-medium",
    },
    {
      id: "EDU-1003",
      candidate: "Amit Verma",
      qualification: "Post Graduation",
      client: "Global Tech",
      date: "20 Sep 2025",
      status: "Completed",
      statusStyle: "bg-emerald-50 text-emerald-600 font-medium",
    },
    {
      id: "EDU-1004",
      candidate: "Neha Kapoor",
      qualification: "10th",
      client: "Bright Future",
      date: "19 Sep 2025",
      status: "Pending",
      statusStyle: "bg-purple-50 text-purple-600 font-medium",
    },
    {
      id: "EDU-1005",
      candidate: "Sandeep Yadav",
      qualification: "Graduation",
      client: "Horizon Inc",
      date: "18 Sep 2025",
      status: "In Progress",
      statusStyle: "bg-blue-50 text-blue-600 font-medium",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              TL Education Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Overview of your education verification cases
            </p>
          </div>

          <div className="relative self-start sm:self-auto">
            <button className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>
          </div>
        </div>

        {/* METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    vs. last 30 days
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      stat.trendType === "up"
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-rose-600 bg-rose-50"
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* LOWER SECTION: DONUT CHART + RECENT CASES TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* QUALIFICATION DISTRIBUTION (SVG Donut Chart) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <h2 className="text-base font-semibold text-slate-900 mb-4">
              Qualification Distribution
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Pure SVG Donut Chart */}
              <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#0088FE" strokeWidth="4.5" strokeDasharray="12.9 87.1" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#00C49F" strokeWidth="4.5" strokeDasharray="23.4 76.6" strokeDashoffset="-12.9" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#10B981" strokeWidth="4.5" strokeDasharray="39.5 60.5" strokeDashoffset="-36.3" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#8884d8" strokeWidth="4.5" strokeDasharray="17.7 82.3" strokeDashoffset="-75.8" />
                  <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#FFBB28" strokeWidth="4.5" strokeDasharray="6.5 93.5" strokeDashoffset="-93.5" />
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-slate-900 leading-none">
                    248
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1">
                    Total Cases
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="w-full space-y-2.5">
                {qualificationData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-slate-600 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">
                        {item.value}
                      </span>
                      <span className="text-slate-400 text-xs">
                        ({item.percentage})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT CASES TABLE */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                Recent Cases
              </h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                    <th className="pb-3 px-2">Case ID</th>
                    <th className="pb-3 px-2">Candidate Name</th>
                    <th className="pb-3 px-2">Qualification</th>
                    <th className="pb-3 px-2">Client</th>
                    <th className="pb-3 px-2">Received Date</th>
                    <th className="pb-3 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentCases.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3 px-2 font-medium text-slate-900 whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-3 px-2 text-slate-700 whitespace-nowrap">
                        {row.candidate}
                      </td>
                      <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                        {row.qualification}
                      </td>
                      <td className="py-3 px-2 text-slate-700 whitespace-nowrap">
                        {row.client}
                      </td>
                      <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="py-3 px-2 text-right whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TLDashboard;
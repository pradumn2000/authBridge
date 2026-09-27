// import React, { useState } from "react";
// import {
//   FileText,
//   Users,
//   Hourglass,
//   CheckCircle2,
//   AlertTriangle,
//   Calendar,
//   ChevronDown,
// } from "lucide-react";

// const TLDashboard = () => {
//   const [dateRange, setDateRange] = useState("01 Sep 2025 - 30 Sep 2025");

//   const stats = [
//     {
//       title: "Total Education Cases",
//       value: "248",
//       trend: "↑ 12%",
//       trendType: "up",
//       icon: FileText,
//       iconBg: "bg-blue-50 text-blue-600",
//     },
//     {
//       title: "Pending Allocation",
//       value: "36",
//       trend: "↑ 8%",
//       trendType: "up",
//       icon: Users,
//       iconBg: "bg-orange-50 text-orange-500",
//     },
//     {
//       title: "In Progress",
//       value: "78",
//       trend: "↑ 14%",
//       trendType: "up",
//       icon: Hourglass,
//       iconBg: "bg-sky-50 text-sky-500",
//     },
//     {
//       title: "QA Review Pending",
//       value: "42",
//       trend: "↑ 6%",
//       trendType: "up",
//       icon: CheckCircle2,
//       iconBg: "bg-emerald-50 text-emerald-500",
//     },
//     {
//       title: "Completed",
//       value: "86",
//       trend: "↑ 18%",
//       trendType: "up",
//       icon: CheckCircle2,
//       iconBg: "bg-emerald-50 text-emerald-500",
//     },
//     {
//       title: "TAT Breached",
//       value: "6",
//       trend: "↓ 50%",
//       trendType: "down",
//       icon: AlertTriangle,
//       iconBg: "bg-rose-50 text-rose-500",
//     },
//   ];

//   const qualificationData = [
//     { name: "10th", value: 32, percentage: "12.9%", color: "#0088FE" },
//     { name: "12th", value: 58, percentage: "23.4%", color: "#00C49F" },
//     { name: "Graduation", value: 98, percentage: "39.5%", color: "#10B981" },
//     { name: "Post Graduation", value: 44, percentage: "17.7%", color: "#8884d8" },
//     { name: "Other", value: 16, percentage: "6.5%", color: "#FFBB28" },
//   ];

//   const recentCases = [
//     {
//       id: "EDU-1001",
//       candidate: "Rohan Sharma",
//       qualification: "Graduation",
//       client: "ABC Corp",
//       date: "22 Sep 2025",
//       status: "In Progress",
//       statusStyle: "bg-blue-50 text-blue-600 font-medium",
//     },
//     {
//       id: "EDU-1002",
//       candidate: "Priya Nair",
//       qualification: "12th",
//       client: "XYZ Ltd",
//       date: "21 Sep 2025",
//       status: "QA Review",
//       statusStyle: "bg-amber-50 text-amber-600 font-medium",
//     },
//     {
//       id: "EDU-1003",
//       candidate: "Amit Verma",
//       qualification: "Post Graduation",
//       client: "Global Tech",
//       date: "20 Sep 2025",
//       status: "Completed",
//       statusStyle: "bg-emerald-50 text-emerald-600 font-medium",
//     },
//     {
//       id: "EDU-1004",
//       candidate: "Neha Kapoor",
//       qualification: "10th",
//       client: "Bright Future",
//       date: "19 Sep 2025",
//       status: "Pending",
//       statusStyle: "bg-purple-50 text-purple-600 font-medium",
//     },
//     {
//       id: "EDU-1005",
//       candidate: "Sandeep Yadav",
//       qualification: "Graduation",
//       client: "Horizon Inc",
//       date: "18 Sep 2025",
//       status: "In Progress",
//       statusStyle: "bg-blue-50 text-blue-600 font-medium",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* HEADER SECTION */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
//               TL Education Dashboard
//             </h1>
//             <p className="text-sm text-slate-500 mt-0.5">
//               Overview of your education verification cases
//             </p>
//           </div>

//           <div className="relative self-start sm:self-auto">
//             <button className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
//               <Calendar className="w-4 h-4 text-slate-500" />
//               <span>{dateRange}</span>
//               <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
//             </button>
//           </div>
//         </div>

//         {/* METRICS CARDS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {stats.map((stat, idx) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={idx}
//                 className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <span className="text-xs text-slate-400 font-medium">
//                     vs. last 30 days
//                   </span>
//                 </div>

//                 <div className="mt-4 flex items-baseline justify-between">
//                   <div>
//                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                       {stat.title}
//                     </p>
//                     <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
//                       {stat.value}
//                     </p>
//                   </div>
//                   <span
//                     className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
//                       stat.trendType === "up"
//                         ? "text-emerald-600 bg-emerald-50"
//                         : "text-rose-600 bg-rose-50"
//                     }`}
//                   >
//                     {stat.trend}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* LOWER SECTION: DONUT CHART + RECENT CASES TABLE */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
//           {/* QUALIFICATION DISTRIBUTION (SVG Donut Chart) */}
//           <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
//             <h2 className="text-base font-semibold text-slate-900 mb-4">
//               Qualification Distribution
//             </h2>

//             <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
//               {/* Pure SVG Donut Chart */}
//               <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#0088FE" strokeWidth="4.5" strokeDasharray="12.9 87.1" strokeDashoffset="0" />
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#00C49F" strokeWidth="4.5" strokeDasharray="23.4 76.6" strokeDashoffset="-12.9" />
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#10B981" strokeWidth="4.5" strokeDasharray="39.5 60.5" strokeDashoffset="-36.3" />
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#8884d8" strokeWidth="4.5" strokeDasharray="17.7 82.3" strokeDashoffset="-75.8" />
//                   <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#FFBB28" strokeWidth="4.5" strokeDasharray="6.5 93.5" strokeDashoffset="-93.5" />
//                 </svg>

//                 {/* Center Text */}
//                 <div className="absolute flex flex-col items-center justify-center text-center">
//                   <span className="text-2xl font-bold text-slate-900 leading-none">
//                     248
//                   </span>
//                   <span className="text-[11px] font-medium text-slate-400 mt-1">
//                     Total Cases
//                   </span>
//                 </div>
//               </div>

//               {/* Chart Legend */}
//               <div className="w-full space-y-2.5">
//                 {qualificationData.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between text-xs sm:text-sm"
//                   >
//                     <div className="flex items-center gap-2">
//                       <span
//                         className="w-2.5 h-2.5 rounded-full"
//                         style={{ backgroundColor: item.color }}
//                       ></span>
//                       <span className="text-slate-600 font-medium">
//                         {item.name}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="font-semibold text-slate-800">
//                         {item.value}
//                       </span>
//                       <span className="text-slate-400 text-xs">
//                         ({item.percentage})
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RECENT CASES TABLE */}
//           <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-base font-semibold text-slate-900">
//                 Recent Cases
//               </h2>
//               <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
//                 View All
//               </button>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-xs sm:text-sm">
//                 <thead>
//                   <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
//                     <th className="pb-3 px-2">Case ID</th>
//                     <th className="pb-3 px-2">Candidate Name</th>
//                     <th className="pb-3 px-2">Qualification</th>
//                     <th className="pb-3 px-2">Client</th>
//                     <th className="pb-3 px-2">Received Date</th>
//                     <th className="pb-3 px-2 text-right">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {recentCases.map((row) => (
//                     <tr
//                       key={row.id}
//                       className="hover:bg-slate-50/50 transition-colors"
//                     >
//                       <td className="py-3 px-2 font-medium text-slate-900 whitespace-nowrap">
//                         {row.id}
//                       </td>
//                       <td className="py-3 px-2 text-slate-700 whitespace-nowrap">
//                         {row.candidate}
//                       </td>
//                       <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
//                         {row.qualification}
//                       </td>
//                       <td className="py-3 px-2 text-slate-700 whitespace-nowrap">
//                         {row.client}
//                       </td>
//                       <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
//                         {row.date}
//                       </td>
//                       <td className="py-3 px-2 text-right whitespace-nowrap">
//                         <span
//                           className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
//                         >
//                           {row.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default TLDashboard;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  Hourglass,
  CheckCircle2,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { API_URL } from "../src/config";

const QUALIFICATION_COLORS = ["#0088FE", "#00C49F", "#10B981", "#8884d8", "#FFBB28"];

function firstQualification(eduFields) {
  const qs = eduFields?.qualifications;
  return Array.isArray(qs) && qs.length > 0 ? qs[0] : null;
}

// Buckets a qualification's type string into one of the five categories the
// donut chart shows. Falls back to "Other" for anything that doesn't match
// a recognisable school/degree level.
function bucketQualification(qType) {
  const q = String(qType || "").toLowerCase();
  if (q.includes("10th") || q === "sslc" || q.includes("matric")) return "10th";
  if (q.includes("12th") || q.includes("hsc") || q.includes("intermediate")) return "12th";
  if (q.includes("post") || q.includes("master") || q.includes("m.") || q.includes("mba") || q.includes("m tech")) return "Post Graduation";
  if (q.includes("graduation") || q.includes("bachelor") || q.includes("b.") || q.includes("b tech")) return "Graduation";
  return "Other";
}

const TLDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [dateRange] = useState("Last 30 Days");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCases = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/cases`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load cases.");
        return;
      }
      setCases(data.cases || []);
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Education cases only — this is a TL Education dashboard, mirroring the
  // scope of TLEducationCheck / TLQCReview / TLAllocator.
  const educationCases = useMemo(
    () => cases.filter((c) => (c.checks || []).includes("education")),
    [cases]
  );

  const stats = useMemo(() => {
    const total = educationCases.length;
    // "Pending Allocation" mirrors TLAllocator.jsx's own allocation pool: a
    // case isn't allocatable until it has cleared TL QC review, so this
    // counts QC-approved-but-unassigned cases, not just "no verifier yet"
    // (which would include cases still awaiting QC and never eligible for
    // allocation in the first place).
    const pendingAllocation = educationCases.filter(
      (c) => c.check_qc?.education?.status === "approved" && !c.assigned_verifiers?.education
    ).length;
    const inProgress = educationCases.filter((c) => c.check_status?.education === "in-progress").length;
    const qaPending = educationCases.filter(
      (c) => c.check_status?.education === "completed" && c.check_qc?.education?.status !== "approved" && c.check_qc?.education?.status !== "rejected"
    ).length;
    const completed = educationCases.filter((c) => c.check_qc?.education?.status === "approved").length;
    // "TAT Breached" is deliberately left out: GET /cases only returns a
    // case-level tat/created_at, not a per-check due date, so a breach
    // count scoped to education specifically isn't something the current
    // API can support without guessing. Add it back once the backend
    // exposes a per-check due date.

    return [
      { title: "Total Education Cases", value: String(total), icon: FileText, iconBg: "bg-blue-50 text-blue-600" },
      { title: "Pending Allocation", value: String(pendingAllocation), icon: Users, iconBg: "bg-orange-50 text-orange-500" },
      { title: "In Progress", value: String(inProgress), icon: Hourglass, iconBg: "bg-sky-50 text-sky-500" },
      { title: "QA Review Pending", value: String(qaPending), icon: CheckCircle2, iconBg: "bg-emerald-50 text-emerald-500" },
      { title: "Completed", value: String(completed), icon: CheckCircle2, iconBg: "bg-emerald-50 text-emerald-500" },
    ];
  }, [educationCases]);

  const qualificationData = useMemo(() => {
    const buckets = { "10th": 0, "12th": 0, "Graduation": 0, "Post Graduation": 0, "Other": 0 };
    educationCases.forEach((c) => {
      const q = firstQualification(c.check_details?.education?.fields);
      const key = bucketQualification(q?.qualificationType);
      buckets[key] += 1;
    });
    const total = Object.values(buckets).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(buckets).map(([name, value], i) => ({
      name,
      value,
      percentage: `${((value / total) * 100).toFixed(1)}%`,
      color: QUALIFICATION_COLORS[i],
    }));
  }, [educationCases]);

  // Convert the qualification buckets into cumulative stroke-dasharray/
  // offset pairs for the pure-SVG donut chart (percent of 100, matching the
  // circle's circumference convention used below).
  const donutSegments = useMemo(() => {
    const total = qualificationData.reduce((sum, d) => sum + d.value, 0) || 1;
    let cursor = 0;
    return qualificationData.map((d) => {
      const pct = (d.value / total) * 100;
      const seg = { ...d, dash: `${pct.toFixed(2)} ${(100 - pct).toFixed(2)}`, offset: -cursor.toFixed(2) };
      cursor += pct;
      return seg;
    });
  }, [qualificationData]);

  const recentCases = useMemo(() => {
    const statusStyleFor = (c) => {
      const qc = c.check_qc?.education;
      const checkStatus = c.check_status?.education;
      if (qc?.status === "approved") return { label: "Completed", style: "bg-emerald-50 text-emerald-600 font-medium" };
      if (qc?.status === "rejected") return { label: "Rejected", style: "bg-rose-50 text-rose-600 font-medium" };
      if (checkStatus === "completed") return { label: "QA Review", style: "bg-amber-50 text-amber-600 font-medium" };
      if (checkStatus === "in-progress") return { label: "In Progress", style: "bg-blue-50 text-blue-600 font-medium" };
      return { label: "Pending", style: "bg-purple-50 text-purple-600 font-medium" };
    };

    return [...educationCases]
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 5)
      .map((c) => {
        const q = firstQualification(c.check_details?.education?.fields);
        const { label: status, style: statusStyle } = statusStyleFor(c);
        return {
          id: c.case_id,
          candidate: c.candidate || "—",
          qualification: q?.qualificationType || "—",
          client: c.client || "—",
          date: c.created_at
            ? new Date(c.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : "—",
          status,
          statusStyle,
        };
      });
  }, [educationCases]);

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

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg px-4 py-3">
            ⚠ {error}
          </div>
        )}

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
                    {dateRange}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>
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
                  {donutSegments.map((seg) => (
                    <circle
                      key={seg.name}
                      cx="18" cy="18" r="15.9155" fill="transparent"
                      stroke={seg.color} strokeWidth="4.5"
                      strokeDasharray={seg.dash}
                      strokeDashoffset={seg.offset}
                    />
                  ))}
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-slate-900 leading-none">
                    {educationCases.length}
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
              <button
                onClick={() => navigate("/TLEducationCheck")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
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
                  {loading && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">Loading cases...</td>
                    </tr>
                  )}
                  {!loading && recentCases.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">No education cases found.</td>
                    </tr>
                  )}
                  {!loading && recentCases.map((row) => (
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
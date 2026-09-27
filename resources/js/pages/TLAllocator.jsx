// // // import React, { useState } from "react";
// // // import {
// // //   Users,
// // //   UserCheck,
// // //   ChevronDown,
// // //   MoreVertical,
// // //   ChevronLeft,
// // //   ChevronRight,
// // // } from "lucide-react";

// // // const TLAllocator = () => {
// // //   const [selectedVerifier, setSelectedVerifier] = useState("");
// // //   const [activeTab, setActiveTab] = useState("all"); // 'all', 'unassigned', 'assigned'
// // //   const [selectedCases, setSelectedCases] = useState(["EDU-1002"]);

// // //   // Verifier Workload Data
// // //   const verifierWorkload = [
// // //     { name: "Neha Sharma", assigned: 18, inProgress: 5, completed: 12, qaPending: 3, capacity: 30 },
// // //     { name: "Amit Kumar", assigned: 12, inProgress: 3, completed: 9, qaPending: 2, capacity: 25 },
// // //     { name: "Priya Nair", assigned: 21, inProgress: 7, completed: 16, qaPending: 5, capacity: 35 },
// // //     { name: "Sandeep Yadav", assigned: 9, inProgress: 4, completed: 7, qaPending: 2, capacity: 20 },
// // //   ];

// // //   // Table Data
// // //   const initialCases = [
// // //     {
// // //       id: "EDU-1001",
// // //       candidate: "Rohan Sharma",
// // //       qualification: "Graduation",
// // //       client: "ABC Corp",
// // //       receivedDate: "22 Sep 2025",
// // //       tat: "5 Days",
// // //       currentVerifier: "Neha Sharma",
// // //       status: "In Progress",
// // //       statusStyle: "bg-blue-50 text-blue-600 font-medium",
// // //       assigned: true,
// // //     },
// // //     {
// // //       id: "EDU-1002",
// // //       candidate: "Priya Nair",
// // //       qualification: "12th",
// // //       client: "XYZ Ltd",
// // //       receivedDate: "21 Sep 2025",
// // //       tat: "3 Days",
// // //       currentVerifier: "Amit Kumar",
// // //       status: "QA Review",
// // //       statusStyle: "bg-amber-50 text-amber-600 font-medium",
// // //       assigned: true,
// // //     },
// // //     {
// // //       id: "EDU-1003",
// // //       candidate: "Amit Verma",
// // //       qualification: "Post Graduation",
// // //       client: "Global Tech",
// // //       receivedDate: "20 Sep 2025",
// // //       tat: "6 Days",
// // //       currentVerifier: "Priya Nair",
// // //       status: "Completed",
// // //       statusStyle: "bg-emerald-50 text-emerald-600 font-medium",
// // //       assigned: true,
// // //     },
// // //     {
// // //       id: "EDU-1004",
// // //       candidate: "Neha Kapoor",
// // //       qualification: "10th",
// // //       client: "Bright Future",
// // //       receivedDate: "19 Sep 2025",
// // //       tat: "4 Days",
// // //       currentVerifier: "Sandeep Yadav",
// // //       status: "Pending",
// // //       statusStyle: "bg-purple-50 text-purple-600 font-medium",
// // //       assigned: false,
// // //     },
// // //   ];

// // //   // Handle Checkbox Selection
// // //   const handleSelectCase = (id) => {
// // //     if (selectedCases.includes(id)) {
// // //       setSelectedCases(selectedCases.filter((item) => item !== id));
// // //     } else {
// // //       setSelectedCases([...selectedCases, id]);
// // //     }
// // //   };

// // //   const handleSelectAll = (e) => {
// // //     if (e.target.checked) {
// // //       setSelectedCases(initialCases.map((c) => c.id));
// // //     } else {
// // //       setSelectedCases([]);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
// // //       <div className="max-w-7xl mx-auto space-y-6">

// // //         {/* HEADER SECTION */}
// // //         <div>
// // //           <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
// // //             Case Allocation
// // //           </h1>
// // //           <p className="text-sm text-slate-500 mt-0.5">
// // //             Allocate education cases to verifiers
// // //           </p>
// // //         </div>

// // //         {/* TOP CARDS & ACTION BUTTONS */}
// // //         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
// // //           {/* Unassigned Cases */}
// // //           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
// // //             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
// // //               <Users className="w-6 h-6" />
// // //             </div>
// // //             <div>
// // //               <p className="text-xs font-semibold text-slate-500">Unassigned Cases</p>
// // //               <p className="text-2xl font-bold text-slate-900 mt-0.5">36</p>
// // //             </div>
// // //           </div>

// // //           {/* Selected Cases */}
// // //           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
// // //             <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
// // //               <UserCheck className="w-6 h-6" />
// // //             </div>
// // //             <div>
// // //               <p className="text-xs font-semibold text-slate-500">Selected Cases</p>
// // //               <p className="text-2xl font-bold text-slate-900 mt-0.5">
// // //                 {selectedCases.length}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="md:col-span-4 flex items-center gap-3 justify-start md:justify-end">
// // //             <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#00A37A] hover:bg-[#008f6b] text-white font-medium text-sm rounded-lg shadow-sm transition-colors">
// // //               Allocate
// // //             </button>
// // //             <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg shadow-sm transition-colors">
// // //               Reallocate
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* MIDDLE SECTION: SELECT VERIFIER + WORKLOAD TABLE */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
// // //           {/* Select Verifier Dropdown */}
// // //           <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
// // //             <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //               Select Verifier
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedVerifier}
// // //                 onChange={(e) => setSelectedVerifier(e.target.value)}
// // //                 className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A37A]/20 focus:border-[#00A37A]"
// // //               >
// // //                 <option value="">Select Education Verifier</option>
// // //                 {verifierWorkload.map((v, i) => (
// // //                   <option key={i} value={v.name}>
// // //                     {v.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Verifier Workload Table */}
// // //           <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
// // //             <h2 className="text-sm font-semibold text-slate-900 mb-3">
// // //               Verifier Workload
// // //             </h2>
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full text-left text-xs sm:text-sm">
// // //                 <thead>
// // //                   <tr className="text-slate-400 border-b border-slate-100 text-[11px] font-semibold uppercase">
// // //                     <th className="pb-2.5">Verifier</th>
// // //                     <th className="pb-2.5">Assigned</th>
// // //                     <th className="pb-2.5">In Progress</th>
// // //                     <th className="pb-2.5">Completed</th>
// // //                     <th className="pb-2.5">QA Pending</th>
// // //                     <th className="pb-2.5">Capacity</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
// // //                   {verifierWorkload.map((v, idx) => (
// // //                     <tr key={idx} className="hover:bg-slate-50/50">
// // //                       <td className="py-2.5 font-semibold text-slate-900">{v.name}</td>
// // //                       <td className="py-2.5">{v.assigned}</td>
// // //                       <td className="py-2.5">{v.inProgress}</td>
// // //                       <td className="py-2.5">{v.completed}</td>
// // //                       <td className="py-2.5">{v.qaPending}</td>
// // //                       <td className="py-2.5">{v.capacity}</td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>

// // //         </div>

// // //         {/* BOTTOM SECTION: TABS & MAIN CASES TABLE */}
// // //         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
// // //           {/* TABS */}
// // //           <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-2">
// // //             <button
// // //               onClick={() => setActiveTab("all")}
// // //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// // //                 activeTab === "all"
// // //                   ? "bg-[#00A37A] text-white shadow-sm"
// // //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// // //               }`}
// // //             >
// // //               All Cases (12)
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveTab("unassigned")}
// // //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// // //                 activeTab === "unassigned"
// // //                   ? "bg-[#00A37A] text-white shadow-sm"
// // //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// // //               }`}
// // //             >
// // //               Unassigned (3)
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveTab("assigned")}
// // //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// // //                 activeTab === "assigned"
// // //                   ? "bg-[#00A37A] text-white shadow-sm"
// // //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// // //               }`}
// // //             >
// // //               Assigned (9)
// // //             </button>
// // //           </div>

// // //           {/* MAIN TABLE */}
// // //           <div className="p-4 overflow-x-auto">
// // //             <table className="w-full text-left text-xs sm:text-sm">
// // //               <thead>
// // //                 <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
// // //                   <th className="pb-3 px-3 w-10">
// // //                     <input
// // //                       type="checkbox"
// // //                       onChange={handleSelectAll}
// // //                       checked={
// // //                         selectedCases.length === initialCases.length &&
// // //                         initialCases.length > 0
// // //                       }
// // //                       className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
// // //                     />
// // //                   </th>
// // //                   <th className="pb-3 px-3">Case ID</th>
// // //                   <th className="pb-3 px-3">Candidate Name</th>
// // //                   <th className="pb-3 px-3">Qualification</th>
// // //                   <th className="pb-3 px-3">Client</th>
// // //                   <th className="pb-3 px-3">Received Date</th>
// // //                   <th className="pb-3 px-3">TAT</th>
// // //                   <th className="pb-3 px-3">Current Verifier</th>
// // //                   <th className="pb-3 px-3">Status</th>
// // //                   <th className="pb-3 px-3 text-right">Action</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-slate-50">
// // //                 {initialCases.map((row) => {
// // //                   const isChecked = selectedCases.includes(row.id);
// // //                   return (
// // //                     <tr
// // //                       key={row.id}
// // //                       className={`hover:bg-slate-50/60 transition-colors ${
// // //                         isChecked ? "bg-slate-50/80" : ""
// // //                       }`}
// // //                     >
// // //                       <td className="py-3 px-3">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={isChecked}
// // //                           onChange={() => handleSelectCase(row.id)}
// // //                           className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
// // //                         />
// // //                       </td>
// // //                       <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
// // //                         {row.id}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
// // //                         {row.candidate}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// // //                         {row.qualification}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
// // //                         {row.client}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// // //                         {row.receivedDate}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// // //                         {row.tat}
// // //                       </td>
// // //                       <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
// // //                         {row.currentVerifier}
// // //                       </td>
// // //                       <td className="py-3 px-3 whitespace-nowrap">
// // //                         <span
// // //                           className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
// // //                         >
// // //                           {row.status}
// // //                         </span>
// // //                       </td>
// // //                       <td className="py-3 px-3 text-right whitespace-nowrap">
// // //                         <div className="flex items-center justify-end gap-2">
// // //                           <button className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-medium rounded-md transition-colors">
// // //                             View Case
// // //                           </button>
// // //                           <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
// // //                             <MoreVertical className="w-4 h-4" />
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {/* PAGINATION FOOTER */}
// // //           <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
// // //             <span>Showing 1 - 4 of 12 cases</span>
// // //             <div className="flex items-center gap-1.5">
// // //               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">
// // //                 <ChevronLeft className="w-4 h-4" />
// // //               </button>
// // //               <button className="w-8 h-8 rounded bg-[#00A37A] text-white font-medium text-xs flex items-center justify-center">
// // //                 1
// // //               </button>
// // //               <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center">
// // //                 2
// // //               </button>
// // //               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
// // //                 <ChevronRight className="w-4 h-4" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TLAllocator;
// // import React, { useState, useEffect, useMemo } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Users,
// //   UserCheck,
// //   ChevronDown,
// //   MoreVertical,
// //   ChevronLeft,
// //   ChevronRight,
// //   RefreshCw,
// // } from "lucide-react";
// // import { API_URL } from "../src/config";

// // function checkStatusLabel(status) {
// //   if (status === "completed") return { label: "Completed", style: "bg-emerald-50 text-emerald-600 font-medium" };
// //   if (status === "in-progress") return { label: "In Progress", style: "bg-blue-50 text-blue-600 font-medium" };
// //   return { label: "Not Started", style: "bg-purple-50 text-purple-600 font-medium" };
// // }

// // const TLAllocator = () => {
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   const [selectedVerifier, setSelectedVerifier] = useState("");
// //   const [activeTab, setActiveTab] = useState("all"); // 'all', 'unassigned', 'assigned'
// //   const [selectedCases, setSelectedCases] = useState([]);

// //   const [cases, setCases] = useState([]);
// //   const [verifiers, setVerifiers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [allocating, setAllocating] = useState(false);

// //   const fetchAll = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const [casesRes, verifiersRes] = await Promise.all([
// //         fetch(`${API_URL}/api/cases`, {
// //           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //         }),
// //         fetch(`${API_URL}/api/verifiers`, {
// //           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
// //         }),
// //       ]);

// //       if (casesRes.status === 401 || casesRes.status === 403 || verifiersRes.status === 401 || verifiersRes.status === 403) {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         navigate("/");
// //         return;
// //       }

// //       const casesData = await casesRes.json();
// //       if (!casesRes.ok) {
// //         setError(casesData.message || "Failed to load cases.");
// //         return;
// //       }
// //       setCases(casesData.cases || []);

// //       const verifiersData = await verifiersRes.json();
// //       if (verifiersRes.ok) {
// //         setVerifiers(verifiersData.verifiers || []);
// //       }
// //       // A failed /verifiers fetch isn't fatal to the page — the case table
// //       // still loads, just with an empty "Select Verifier" dropdown.
// //     } catch {
// //       setError("Unable to connect to server. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAll();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const verifierNames = useMemo(
// //     () => Object.fromEntries(verifiers.map((v) => [v.id, v.name])),
// //     [verifiers]
// //   );

// //   // Case Allocation only shows education cases that have already cleared
// //   // TL QC Review (qc_status === 'approved' — see TLQCReview.jsx). Cases
// //   // still sitting in the QC queue, or not yet submitted, don't belong
// //   // here — they haven't been confirmed complete yet.
// //   const allocatableCases = useMemo(() => {
// //     return cases
// //       .filter((c) => (c.checks || []).includes("education"))
// //       .filter((c) => c.check_qc?.education?.status === "approved")
// //       .map((c) => {
// //         const eduFields = c.check_details?.education?.fields;
// //         const q = eduFields?.qualifications?.[0];
// //         const verifierId = c.assigned_verifiers?.education || null;
// //         const checkStatus = c.check_status?.education || "pending";
// //         const { label: status, style: statusStyle } = checkStatusLabel(checkStatus);

// //         return {
// //           id: c.case_id,
// //           candidate: c.candidate || "—",
// //           qualification: q?.qualificationType || "—",
// //           client: c.client || "—",
// //           receivedDate: c.created_at || "—",
// //           tat: c.tat || "—",
// //           verifierId,
// //           currentVerifier: verifierId ? (verifierNames[verifierId] || `User #${verifierId}`) : "Unassigned",
// //           status,
// //           statusStyle,
// //           assigned: !!verifierId,
// //         };
// //       });
// //   }, [cases, verifierNames]);

// //   const unassignedCount = useMemo(
// //     () => allocatableCases.filter((c) => !c.assigned).length,
// //     [allocatableCases]
// //   );
// //   const assignedCount = useMemo(
// //     () => allocatableCases.filter((c) => c.assigned).length,
// //     [allocatableCases]
// //   );

// //   const visibleCases = useMemo(() => {
// //     if (activeTab === "unassigned") return allocatableCases.filter((c) => !c.assigned);
// //     if (activeTab === "assigned") return allocatableCases.filter((c) => c.assigned);
// //     return allocatableCases;
// //   }, [allocatableCases, activeTab]);

// //   // Verifier Workload — computed from the same allocatable-case list.
// //   // "QA Pending" and "Capacity" columns from the original mock are
// //   // deliberately dropped: neither has backing data yet (no per-user
// //   // capacity field exists, and "QA Pending" belonged to the old
// //   // post-verification QC semantics this flow no longer uses).
// //   const verifierWorkload = useMemo(() => {
// //     return verifiers.map((v) => {
// //       const theirs = allocatableCases.filter((c) => c.verifierId === v.id);
// //       return {
// //         id: v.id,
// //         name: v.name,
// //         assigned: theirs.length,
// //         inProgress: theirs.filter((c) => c.status === "In Progress").length,
// //         completed: theirs.filter((c) => c.status === "Completed").length,
// //       };
// //     });
// //   }, [verifiers, allocatableCases]);

// //   // Handle Checkbox Selection
// //   const handleSelectCase = (id) => {
// //     if (selectedCases.includes(id)) {
// //       setSelectedCases(selectedCases.filter((item) => item !== id));
// //     } else {
// //       setSelectedCases([...selectedCases, id]);
// //     }
// //   };

// //   const handleSelectAll = (e) => {
// //     if (e.target.checked) {
// //       setSelectedCases(visibleCases.map((c) => c.id));
// //     } else {
// //       setSelectedCases([]);
// //     }
// //   };

// //   // Allocate / Reallocate — both call the same endpoint. PATCH
// //   // /cases/{caseId}/assign upserts verifier_id for the education check, so
// //   // setting a new verifier on an already-assigned case IS a reallocation;
// //   // there's no separate backend path for it.
// //   const handleAllocate = async () => {
// //     if (!selectedVerifier) {
// //       alert("Select a verifier first.");
// //       return;
// //     }
// //     if (selectedCases.length === 0) {
// //       alert("Select at least one case.");
// //       return;
// //     }

// //     setAllocating(true);
// //     try {
// //       const results = await Promise.all(
// //         selectedCases.map((caseId) =>
// //           fetch(`${API_URL}/api/cases/${caseId}/assign`, {
// //             method: "PATCH",
// //             headers: {
// //               "Content-Type": "application/json",
// //               Accept: "application/json",
// //               Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify({ check_type: "education", user_id: selectedVerifier }),
// //           })
// //         )
// //       );

// //       const failed = results.filter((r) => !r.ok).length;
// //       if (failed > 0) {
// //         alert(`${failed} of ${selectedCases.length} case(s) failed to allocate. Please retry those.`);
// //       }

// //       setSelectedCases([]);
// //       fetchAll();
// //     } catch {
// //       alert("Unable to connect to server. Please try again.");
// //     } finally {
// //       setAllocating(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
// //       <div className="max-w-7xl mx-auto space-y-6">

// //         {/* HEADER SECTION */}
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //           <div>
// //             <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
// //               Case Allocation
// //             </h1>
// //             <p className="text-sm text-slate-500 mt-0.5">
// //               Allocate QC-approved education cases to verifiers
// //             </p>
// //           </div>
// //           <button
// //             onClick={fetchAll}
// //             disabled={loading}
// //             className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-60 text-xs font-medium rounded-lg shadow-sm self-start sm:self-auto"
// //           >
// //             <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${loading ? "animate-spin" : ""}`} />
// //             <span>Refresh</span>
// //           </button>
// //         </div>

// //         {error && (
// //           <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg px-4 py-3">
// //             ⚠ {error}
// //           </div>
// //         )}

// //         {verifiers.length === 0 && !loading && (
// //           <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-4 py-3">
// //             No verifier accounts found. Case Allocation needs at least one active user with the
// //             "verifier" role before cases can be assigned.
// //           </div>
// //         )}

// //         {/* TOP CARDS & ACTION BUTTONS */}
// //         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
// //           {/* Unassigned Cases */}
// //           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
// //             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
// //               <Users className="w-6 h-6" />
// //             </div>
// //             <div>
// //               <p className="text-xs font-semibold text-slate-500">Unassigned Cases</p>
// //               <p className="text-2xl font-bold text-slate-900 mt-0.5">{unassignedCount}</p>
// //             </div>
// //           </div>

// //           {/* Selected Cases */}
// //           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
// //             <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
// //               <UserCheck className="w-6 h-6" />
// //             </div>
// //             <div>
// //               <p className="text-xs font-semibold text-slate-500">Selected Cases</p>
// //               <p className="text-2xl font-bold text-slate-900 mt-0.5">
// //                 {selectedCases.length}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="md:col-span-4 flex items-center gap-3 justify-start md:justify-end">
// //             <button
// //               onClick={handleAllocate}
// //               disabled={allocating || selectedCases.length === 0 || !selectedVerifier}
// //               className="flex-1 md:flex-none px-6 py-2.5 bg-[#00A37A] hover:bg-[#008f6b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
// //             >
// //               {allocating ? "Allocating..." : "Allocate"}
// //             </button>
// //             <button
// //               onClick={handleAllocate}
// //               disabled={
// //                 allocating ||
// //                 selectedCases.length === 0 ||
// //                 !selectedVerifier ||
// //                 !selectedCases.some((id) => allocatableCases.find((c) => c.id === id)?.assigned)
// //               }
// //               title="Reassigns already-allocated selected cases to the chosen verifier"
// //               className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm rounded-lg shadow-sm transition-colors"
// //             >
// //               Reallocate
// //             </button>
// //           </div>
// //         </div>

// //         {/* MIDDLE SECTION: SELECT VERIFIER + WORKLOAD TABLE */}
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
// //           {/* Select Verifier Dropdown */}
// //           <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
// //             <label className="block text-sm font-semibold text-slate-700 mb-2">
// //               Select Verifier
// //             </label>
// //             <div className="relative">
// //               <select
// //                 value={selectedVerifier}
// //                 onChange={(e) => setSelectedVerifier(e.target.value)}
// //                 className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A37A]/20 focus:border-[#00A37A]"
// //               >
// //                 <option value="">Select Education Verifier</option>
// //                 {verifiers.map((v) => (
// //                   <option key={v.id} value={v.id}>
// //                     {v.name}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Verifier Workload Table */}
// //           <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
// //             <h2 className="text-sm font-semibold text-slate-900 mb-3">
// //               Verifier Workload
// //             </h2>
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-left text-xs sm:text-sm">
// //                 <thead>
// //                   <tr className="text-slate-400 border-b border-slate-100 text-[11px] font-semibold uppercase">
// //                     <th className="pb-2.5">Verifier</th>
// //                     <th className="pb-2.5">Assigned</th>
// //                     <th className="pb-2.5">In Progress</th>
// //                     <th className="pb-2.5">Completed</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
// //                   {verifierWorkload.length === 0 && (
// //                     <tr>
// //                       <td colSpan={4} className="py-4 text-center text-slate-400 font-normal">
// //                         No verifiers yet.
// //                       </td>
// //                     </tr>
// //                   )}
// //                   {verifierWorkload.map((v) => (
// //                     <tr key={v.id} className="hover:bg-slate-50/50">
// //                       <td className="py-2.5 font-semibold text-slate-900">{v.name}</td>
// //                       <td className="py-2.5">{v.assigned}</td>
// //                       <td className="py-2.5">{v.inProgress}</td>
// //                       <td className="py-2.5">{v.completed}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //         </div>

// //         {/* BOTTOM SECTION: TABS & MAIN CASES TABLE */}
// //         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
// //           {/* TABS */}
// //           <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-2">
// //             <button
// //               onClick={() => setActiveTab("all")}
// //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// //                 activeTab === "all"
// //                   ? "bg-[#00A37A] text-white shadow-sm"
// //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// //               }`}
// //             >
// //               All Cases ({allocatableCases.length})
// //             </button>
// //             <button
// //               onClick={() => setActiveTab("unassigned")}
// //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// //                 activeTab === "unassigned"
// //                   ? "bg-[#00A37A] text-white shadow-sm"
// //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// //               }`}
// //             >
// //               Unassigned ({unassignedCount})
// //             </button>
// //             <button
// //               onClick={() => setActiveTab("assigned")}
// //               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
// //                 activeTab === "assigned"
// //                   ? "bg-[#00A37A] text-white shadow-sm"
// //                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// //               }`}
// //             >
// //               Assigned ({assignedCount})
// //             </button>
// //           </div>

// //           {/* MAIN TABLE */}
// //           <div className="p-4 overflow-x-auto">
// //             <table className="w-full text-left text-xs sm:text-sm">
// //               <thead>
// //                 <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
// //                   <th className="pb-3 px-3 w-10">
// //                     <input
// //                       type="checkbox"
// //                       onChange={handleSelectAll}
// //                       checked={
// //                         selectedCases.length === visibleCases.length &&
// //                         visibleCases.length > 0
// //                       }
// //                       className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
// //                     />
// //                   </th>
// //                   <th className="pb-3 px-3">Case ID</th>
// //                   <th className="pb-3 px-3">Candidate Name</th>
// //                   <th className="pb-3 px-3">Qualification</th>
// //                   <th className="pb-3 px-3">Client</th>
// //                   <th className="pb-3 px-3">Received Date</th>
// //                   <th className="pb-3 px-3">TAT</th>
// //                   <th className="pb-3 px-3">Current Verifier</th>
// //                   <th className="pb-3 px-3">Status</th>
// //                   <th className="pb-3 px-3 text-right">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-slate-50">
// //                 {loading && (
// //                   <tr><td colSpan={10} className="text-center py-8 text-slate-500">Loading cases...</td></tr>
// //                 )}
// //                 {!loading && visibleCases.length === 0 && (
// //                   <tr>
// //                     <td colSpan={10} className="text-center py-8 text-slate-400">
// //                       No QC-approved education cases {activeTab !== "all" ? `in this view` : "awaiting allocation"}.
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {!loading && visibleCases.map((row) => {
// //                   const isChecked = selectedCases.includes(row.id);
// //                   return (
// //                     <tr
// //                       key={row.id}
// //                       className={`hover:bg-slate-50/60 transition-colors ${
// //                         isChecked ? "bg-slate-50/80" : ""
// //                       }`}
// //                     >
// //                       <td className="py-3 px-3">
// //                         <input
// //                           type="checkbox"
// //                           checked={isChecked}
// //                           onChange={() => handleSelectCase(row.id)}
// //                           className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
// //                         />
// //                       </td>
// //                       <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
// //                         {row.id}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
// //                         {row.candidate}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// //                         {row.qualification}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
// //                         {row.client}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// //                         {row.receivedDate}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
// //                         {row.tat}
// //                       </td>
// //                       <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
// //                         {row.currentVerifier}
// //                       </td>
// //                       <td className="py-3 px-3 whitespace-nowrap">
// //                         <span
// //                           className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
// //                         >
// //                           {row.status}
// //                         </span>
// //                       </td>
// //                       <td className="py-3 px-3 text-right whitespace-nowrap">
// //                         <div className="flex items-center justify-end gap-2">
// //                           <button
// //                             onClick={() => navigate("/TLEducationCheck")}
// //                             className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-medium rounded-md transition-colors"
// //                           >
// //                             View Case
// //                           </button>
// //                           <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
// //                             <MoreVertical className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* PAGINATION FOOTER */}
// //           <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
// //             <span>
// //               {visibleCases.length === 0
// //                 ? "Showing 0 cases"
// //                 : `Showing 1 - ${visibleCases.length} of ${visibleCases.length} cases`}
// //             </span>
// //             <div className="flex items-center gap-1.5">
// //               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">
// //                 <ChevronLeft className="w-4 h-4" />
// //               </button>
// //               <button className="w-8 h-8 rounded bg-[#00A37A] text-white font-medium text-xs flex items-center justify-center">
// //                 1
// //               </button>
// //               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
// //                 <ChevronRight className="w-4 h-4" />
// //               </button>
// //             </div>
// //           </div>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default TLAllocator;
// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users,
//   UserCheck,
//   ChevronDown,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
// } from "lucide-react";
// import { API_URL } from "../src/config";

// function checkStatusLabel(status) {
//   if (status === "completed") return { label: "Completed", style: "bg-emerald-50 text-emerald-600 font-medium" };
//   if (status === "in-progress") return { label: "In Progress", style: "bg-blue-50 text-blue-600 font-medium" };
//   return { label: "Not Started", style: "bg-purple-50 text-purple-600 font-medium" };
// }

// // Same resolver as TLQCReview.jsx / TLEducationCheck.jsx / Verifyer.jsx —
// // reads across the client-submitted schema (singular keys), the admin
// // qualification-intake form (`qualifications` array, plural keys), and the
// // verifier's own saved result. Previously this file only checked the admin
// // schema, so any case whose education data came from client self-submission
// // showed "—" for qualification here.
// function getEducationDisplay(c) {
//   const clientFields   = c.check_details?.education?.fields;
//   const adminQual      = clientFields?.qualifications?.[0];
//   const verifierFields = c.check_results?.education?.form_data;

//   return {
//     university:
//       clientFields?.instituteName ||
//       adminQual?.instituteUniversity ||
//       verifierFields?.institution_name ||
//       "—",
//     qualification:
//       clientFields?.qualification ||
//       adminQual?.qualificationType ||
//       verifierFields?.degree ||
//       "—",
//   };
// }

// const TLAllocator = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [selectedVerifier, setSelectedVerifier] = useState("");
//   const [activeTab, setActiveTab] = useState("all"); // 'all', 'unassigned', 'assigned'
//   const [selectedCases, setSelectedCases] = useState([]);

//   const [cases, setCases] = useState([]);
//   const [verifiers, setVerifiers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [allocating, setAllocating] = useState(false);

//   const fetchAll = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const [casesRes, verifiersRes] = await Promise.all([
//         fetch(`${API_URL}/api/cases`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//         }),
//         fetch(`${API_URL}/api/verifiers`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//         }),
//       ]);

//       if (casesRes.status === 401 || casesRes.status === 403 || verifiersRes.status === 401 || verifiersRes.status === 403) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/");
//         return;
//       }

//       const casesData = await casesRes.json();
//       if (!casesRes.ok) {
//         setError(casesData.message || "Failed to load cases.");
//         return;
//       }
//       setCases(casesData.cases || []);

//       const verifiersData = await verifiersRes.json();
//       if (verifiersRes.ok) {
//         setVerifiers(verifiersData.verifiers || []);
//       }
//       // A failed /verifiers fetch isn't fatal to the page — the case table
//       // still loads, just with an empty "Select Verifier" dropdown.
//     } catch {
//       setError("Unable to connect to server. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const verifierNames = useMemo(
//     () => Object.fromEntries(verifiers.map((v) => [v.id, v.name])),
//     [verifiers]
//   );

//   // Case Allocation only shows education cases that have already cleared
//   // TL QC Review (qc_status === 'approved' — see TLQCReview.jsx). Cases
//   // still sitting in the QC queue, or not yet submitted, don't belong
//   // here — they haven't been confirmed complete yet.
//   const allocatableCases = useMemo(() => {
//     return cases
//       .filter((c) => (c.checks || []).includes("education"))
//       .filter((c) => c.check_qc?.education?.status === "approved")
//       .map((c) => {
//         const edu = getEducationDisplay(c);
//         const verifierId = c.assigned_verifiers?.education || null;
//         const checkStatus = c.check_status?.education || "pending";
//         const { label: status, style: statusStyle } = checkStatusLabel(checkStatus);

//         return {
//           id: c.case_id,
//           candidate: c.candidate || "—",
//           qualification: edu.qualification,
//           client: c.client || "—",
//           receivedDate: c.created_at || "—",
//           tat: c.tat || "—",
//           verifierId,
//           currentVerifier: verifierId ? (verifierNames[verifierId] || `User #${verifierId}`) : "Unassigned",
//           status,
//           statusStyle,
//           assigned: !!verifierId,
//         };
//       });
//   }, [cases, verifierNames]);

//   const unassignedCount = useMemo(
//     () => allocatableCases.filter((c) => !c.assigned).length,
//     [allocatableCases]
//   );
//   const assignedCount = useMemo(
//     () => allocatableCases.filter((c) => c.assigned).length,
//     [allocatableCases]
//   );

//   const visibleCases = useMemo(() => {
//     if (activeTab === "unassigned") return allocatableCases.filter((c) => !c.assigned);
//     if (activeTab === "assigned") return allocatableCases.filter((c) => c.assigned);
//     return allocatableCases;
//   }, [allocatableCases, activeTab]);

//   // Verifier Workload — computed from the same allocatable-case list.
//   // "QA Pending" and "Capacity" columns from the original mock are
//   // deliberately dropped: neither has backing data yet (no per-user
//   // capacity field exists, and "QA Pending" belonged to the old
//   // post-verification QC semantics this flow no longer uses).
//   const verifierWorkload = useMemo(() => {
//     return verifiers.map((v) => {
//       const theirs = allocatableCases.filter((c) => c.verifierId === v.id);
//       return {
//         id: v.id,
//         name: v.name,
//         assigned: theirs.length,
//         inProgress: theirs.filter((c) => c.status === "In Progress").length,
//         completed: theirs.filter((c) => c.status === "Completed").length,
//       };
//     });
//   }, [verifiers, allocatableCases]);

//   // Handle Checkbox Selection
//   const handleSelectCase = (id) => {
//     if (selectedCases.includes(id)) {
//       setSelectedCases(selectedCases.filter((item) => item !== id));
//     } else {
//       setSelectedCases([...selectedCases, id]);
//     }
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedCases(visibleCases.map((c) => c.id));
//     } else {
//       setSelectedCases([]);
//     }
//   };

//   // Allocate / Reallocate — both call the same endpoint. PATCH
//   // /cases/{caseId}/assign upserts verifier_id for the education check, so
//   // setting a new verifier on an already-assigned case IS a reallocation;
//   // there's no separate backend path for it.
//   const handleAllocate = async () => {
//     if (!selectedVerifier) {
//       alert("Select a verifier first.");
//       return;
//     }
//     if (selectedCases.length === 0) {
//       alert("Select at least one case.");
//       return;
//     }

//     setAllocating(true);
//     try {
//       const results = await Promise.all(
//         selectedCases.map((caseId) =>
//           fetch(`${API_URL}/api/cases/${caseId}/assign`, {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ check_type: "education", user_id: selectedVerifier }),
//           })
//         )
//       );

//       const failed = results.filter((r) => !r.ok).length;
//       if (failed > 0) {
//         alert(`${failed} of ${selectedCases.length} case(s) failed to allocate. Please retry those.`);
//       }

//       setSelectedCases([]);
//       fetchAll();
//     } catch {
//       alert("Unable to connect to server. Please try again.");
//     } finally {
//       setAllocating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* HEADER SECTION */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
//               Case Allocation
//             </h1>
//             <p className="text-sm text-slate-500 mt-0.5">
//               Allocate QC-approved education cases to verifiers
//             </p>
//           </div>
//           <button
//             onClick={fetchAll}
//             disabled={loading}
//             className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-60 text-xs font-medium rounded-lg shadow-sm self-start sm:self-auto"
//           >
//             <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${loading ? "animate-spin" : ""}`} />
//             <span>Refresh</span>
//           </button>
//         </div>

//         {error && (
//           <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg px-4 py-3">
//             ⚠ {error}
//           </div>
//         )}

//         {verifiers.length === 0 && !loading && (
//           <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-4 py-3">
//             No verifier accounts found. Case Allocation needs at least one active user with the
//             "verifier" role before cases can be assigned.
//           </div>
//         )}

//         {/* TOP CARDS & ACTION BUTTONS */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
//           {/* Unassigned Cases */}
//           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
//               <Users className="w-6 h-6" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-slate-500">Unassigned Cases</p>
//               <p className="text-2xl font-bold text-slate-900 mt-0.5">{unassignedCount}</p>
//             </div>
//           </div>

//           {/* Selected Cases */}
//           <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
//               <UserCheck className="w-6 h-6" />
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-slate-500">Selected Cases</p>
//               <p className="text-2xl font-bold text-slate-900 mt-0.5">
//                 {selectedCases.length}
//               </p>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="md:col-span-4 flex items-center gap-3 justify-start md:justify-end">
//             <button
//               onClick={handleAllocate}
//               disabled={allocating || selectedCases.length === 0 || !selectedVerifier}
//               className="flex-1 md:flex-none px-6 py-2.5 bg-[#00A37A] hover:bg-[#008f6b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
//             >
//               {allocating ? "Allocating..." : "Allocate"}
//             </button>
//             <button
//               onClick={handleAllocate}
//               disabled={
//                 allocating ||
//                 selectedCases.length === 0 ||
//                 !selectedVerifier ||
//                 !selectedCases.some((id) => allocatableCases.find((c) => c.id === id)?.assigned)
//               }
//               title="Reassigns already-allocated selected cases to the chosen verifier"
//               className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm rounded-lg shadow-sm transition-colors"
//             >
//               Reallocate
//             </button>
//           </div>
//         </div>

//         {/* MIDDLE SECTION: SELECT VERIFIER + WORKLOAD TABLE */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
//           {/* Select Verifier Dropdown */}
//           <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Select Verifier
//             </label>
//             <div className="relative">
//               <select
//                 value={selectedVerifier}
//                 onChange={(e) => setSelectedVerifier(e.target.value)}
//                 className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00A37A]/20 focus:border-[#00A37A]"
//               >
//                 <option value="">Select Education Verifier</option>
//                 {verifiers.map((v) => (
//                   <option key={v.id} value={v.id}>
//                     {v.name}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//             </div>
//           </div>

//           {/* Verifier Workload Table */}
//           <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
//             <h2 className="text-sm font-semibold text-slate-900 mb-3">
//               Verifier Workload
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-xs sm:text-sm">
//                 <thead>
//                   <tr className="text-slate-400 border-b border-slate-100 text-[11px] font-semibold uppercase">
//                     <th className="pb-2.5">Verifier</th>
//                     <th className="pb-2.5">Assigned</th>
//                     <th className="pb-2.5">In Progress</th>
//                     <th className="pb-2.5">Completed</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
//                   {verifierWorkload.length === 0 && (
//                     <tr>
//                       <td colSpan={4} className="py-4 text-center text-slate-400 font-normal">
//                         No verifiers yet.
//                       </td>
//                     </tr>
//                   )}
//                   {verifierWorkload.map((v) => (
//                     <tr key={v.id} className="hover:bg-slate-50/50">
//                       <td className="py-2.5 font-semibold text-slate-900">{v.name}</td>
//                       <td className="py-2.5">{v.assigned}</td>
//                       <td className="py-2.5">{v.inProgress}</td>
//                       <td className="py-2.5">{v.completed}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>

//         {/* BOTTOM SECTION: TABS & MAIN CASES TABLE */}
//         <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          
//           {/* TABS */}
//           <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-2">
//             <button
//               onClick={() => setActiveTab("all")}
//               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
//                 activeTab === "all"
//                   ? "bg-[#00A37A] text-white shadow-sm"
//                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//               }`}
//             >
//               All Cases ({allocatableCases.length})
//             </button>
//             <button
//               onClick={() => setActiveTab("unassigned")}
//               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
//                 activeTab === "unassigned"
//                   ? "bg-[#00A37A] text-white shadow-sm"
//                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//               }`}
//             >
//               Unassigned ({unassignedCount})
//             </button>
//             <button
//               onClick={() => setActiveTab("assigned")}
//               className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
//                 activeTab === "assigned"
//                   ? "bg-[#00A37A] text-white shadow-sm"
//                   : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//               }`}
//             >
//               Assigned ({assignedCount})
//             </button>
//           </div>

//           {/* MAIN TABLE */}
//           <div className="p-4 overflow-x-auto">
//             <table className="w-full text-left text-xs sm:text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
//                   <th className="pb-3 px-3 w-10">
//                     <input
//                       type="checkbox"
//                       onChange={handleSelectAll}
//                       checked={
//                         selectedCases.length === visibleCases.length &&
//                         visibleCases.length > 0
//                       }
//                       className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
//                     />
//                   </th>
//                   <th className="pb-3 px-3">Case ID</th>
//                   <th className="pb-3 px-3">Candidate Name</th>
//                   <th className="pb-3 px-3">Qualification</th>
//                   <th className="pb-3 px-3">Client</th>
//                   <th className="pb-3 px-3">Received Date</th>
//                   <th className="pb-3 px-3">TAT</th>
//                   <th className="pb-3 px-3">Current Verifier</th>
//                   <th className="pb-3 px-3">Status</th>
//                   <th className="pb-3 px-3 text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {loading && (
//                   <tr><td colSpan={10} className="text-center py-8 text-slate-500">Loading cases...</td></tr>
//                 )}
//                 {!loading && visibleCases.length === 0 && (
//                   <tr>
//                     <td colSpan={10} className="text-center py-8 text-slate-400">
//                       No QC-approved education cases {activeTab !== "all" ? `in this view` : "awaiting allocation"}.
//                     </td>
//                   </tr>
//                 )}
//                 {!loading && visibleCases.map((row) => {
//                   const isChecked = selectedCases.includes(row.id);
//                   return (
//                     <tr
//                       key={row.id}
//                       className={`hover:bg-slate-50/60 transition-colors ${
//                         isChecked ? "bg-slate-50/80" : ""
//                       }`}
//                     >
//                       <td className="py-3 px-3">
//                         <input
//                           type="checkbox"
//                           checked={isChecked}
//                           onChange={() => handleSelectCase(row.id)}
//                           className="rounded border-slate-300 text-[#00A37A] focus:ring-[#00A37A]"
//                         />
//                       </td>
//                       <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
//                         {row.id}
//                       </td>
//                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
//                         {row.candidate}
//                       </td>
//                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
//                         {row.qualification}
//                       </td>
//                       <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
//                         {row.client}
//                       </td>
//                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
//                         {row.receivedDate}
//                       </td>
//                       <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
//                         {row.tat}
//                       </td>
//                       <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
//                         {row.currentVerifier}
//                       </td>
//                       <td className="py-3 px-3 whitespace-nowrap">
//                         <span
//                           className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${row.statusStyle}`}
//                         >
//                           {row.status}
//                         </span>
//                       </td>
//                       <td className="py-3 px-3 text-right whitespace-nowrap">
//                         <div className="flex items-center justify-end gap-2">
//                           <button
//                             onClick={() => navigate("/TLEducationCheck")}
//                             className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-medium rounded-md transition-colors"
//                           >
//                             View Case
//                           </button>
//                           <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
//                             <MoreVertical className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* PAGINATION FOOTER */}
//           <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
//             <span>
//               {visibleCases.length === 0
//                 ? "Showing 0 cases"
//                 : `Showing 1 - ${visibleCases.length} of ${visibleCases.length} cases`}
//             </span>
//             <div className="flex items-center gap-1.5">
//               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               <button className="w-8 h-8 rounded bg-[#00A37A] text-white font-medium text-xs flex items-center justify-center">
//                 1
//               </button>
//               <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default TLAllocator;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_URL } from "../src/config";

function checkStatusLabel(status) {
  if (status === "completed") return { label: "Completed", style: "bg-emerald-50 text-emerald-600 font-medium" };
  if (status === "in-progress") return { label: "In Progress", style: "bg-blue-50 text-blue-600 font-medium" };
  return { label: "Not Started", style: "bg-purple-50 text-purple-600 font-medium" };
}

// Same resolver as TLQCReview.jsx / TLEducationCheck.jsx / Verifyer.jsx —
// reads across the client-submitted schema (singular keys), the admin
// qualification-intake form (`qualifications` array, plural keys), and the
// verifier's own saved result. Previously this file only checked the admin
// schema, so any case whose education data came from client self-submission
// showed "—" for qualification here.
function getEducationDisplay(c) {
  const clientFields   = c.check_details?.education?.fields;
  const adminQual      = clientFields?.qualifications?.[0];
  const verifierFields = c.check_results?.education?.form_data;

  return {
    university:
      clientFields?.instituteName ||
      adminQual?.instituteUniversity ||
      verifierFields?.institution_name ||
      "—",
    qualification:
      clientFields?.qualification ||
      adminQual?.qualificationType ||
      verifierFields?.degree ||
      "—",
  };
}

const TLAllocator = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [selectedVerifier, setSelectedVerifier] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'unassigned', 'assigned'
  const [selectedCases, setSelectedCases] = useState([]);

  const [cases, setCases] = useState([]);
  const [verifiers, setVerifiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allocating, setAllocating] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [casesRes, verifiersRes] = await Promise.all([
        fetch(`${API_URL}/api/cases`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }),
        fetch(`${API_URL}/api/verifiers`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }),
      ]);

      if (casesRes.status === 401 || casesRes.status === 403 || verifiersRes.status === 401 || verifiersRes.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }

      const casesData = await casesRes.json();
      if (!casesRes.ok) {
        setError(casesData.message || "Failed to load cases.");
        return;
      }
      setCases(casesData.cases || []);

      const verifiersData = await verifiersRes.json();
      if (verifiersRes.ok) {
        setVerifiers(verifiersData.verifiers || []);
      }
      // A failed /verifiers fetch isn't fatal to the page — the case table
      // still loads, just with an empty "Select Verifier" dropdown.
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifierNames = useMemo(
    () => Object.fromEntries(verifiers.map((v) => [v.id, v.name])),
    [verifiers]
  );

  // Case Allocation only shows education cases that have already cleared
  // TL QC Review (qc_status === 'approved' — see TLQCReview.jsx). Cases
  // still sitting in the QC queue, or not yet submitted, don't belong
  // here — they haven't been confirmed complete yet.
  const allocatableCases = useMemo(() => {
    return cases
      .filter((c) => (c.checks || []).includes("education"))
      .filter((c) => c.check_qc?.education?.status === "approved")
      .map((c) => {
        const edu = getEducationDisplay(c);
        const verifierId = c.assigned_verifiers?.education || null;
        const checkStatus = c.check_status?.education || "pending";
        const { label: status, style: statusStyle } = checkStatusLabel(checkStatus);

        return {
          id: c.case_id,
          candidate: c.candidate || "—",
          qualification: edu.qualification,
          client: c.client || "—",
          receivedDate: c.created_at || "—",
          tat: c.tat || "—",
          verifierId,
          currentVerifier: verifierId ? (verifierNames[verifierId] || `User #${verifierId}`) : "Unassigned",
          status,
          statusStyle,
          assigned: !!verifierId,
        };
      });
  }, [cases, verifierNames]);

  const unassignedCount = useMemo(
    () => allocatableCases.filter((c) => !c.assigned).length,
    [allocatableCases]
  );
  const assignedCount = useMemo(
    () => allocatableCases.filter((c) => c.assigned).length,
    [allocatableCases]
  );

  const visibleCases = useMemo(() => {
    if (activeTab === "unassigned") return allocatableCases.filter((c) => !c.assigned);
    if (activeTab === "assigned") return allocatableCases.filter((c) => c.assigned);
    return allocatableCases;
  }, [allocatableCases, activeTab]);

  // Verifier Workload — computed from the same allocatable-case list.
  // "QA Pending" and "Capacity" columns from the original mock are
  // deliberately dropped: neither has backing data yet (no per-user
  // capacity field exists, and "QA Pending" belonged to the old
  // post-verification QC semantics this flow no longer uses).
  const verifierWorkload = useMemo(() => {
    return verifiers.map((v) => {
      const theirs = allocatableCases.filter((c) => c.verifierId === v.id);
      return {
        id: v.id,
        name: v.name,
        assigned: theirs.length,
        inProgress: theirs.filter((c) => c.status === "In Progress").length,
        completed: theirs.filter((c) => c.status === "Completed").length,
      };
    });
  }, [verifiers, allocatableCases]);

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
      setSelectedCases(visibleCases.map((c) => c.id));
    } else {
      setSelectedCases([]);
    }
  };

  // Allocate / Reallocate — both call the same endpoint. PATCH
  // /cases/{caseId}/assign upserts verifier_id for the education check, so
  // setting a new verifier on an already-assigned case IS a reallocation;
  // there's no separate backend path for it.
  const handleAllocate = async () => {
    if (!selectedVerifier) {
      alert("Select a verifier first.");
      return;
    }
    if (selectedCases.length === 0) {
      alert("Select at least one case.");
      return;
    }

    setAllocating(true);
    try {
      const results = await Promise.all(
        selectedCases.map((caseId) =>
          fetch(`${API_URL}/api/cases/${caseId}/assign`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ check_type: "education", user_id: selectedVerifier }),
          })
        )
      );

      const failed = results.filter((r) => !r.ok).length;
      if (failed > 0) {
        alert(`${failed} of ${selectedCases.length} case(s) failed to allocate. Please retry those.`);
      }

      setSelectedCases([]);
      fetchAll();
    } catch {
      alert("Unable to connect to server. Please try again.");
    } finally {
      setAllocating(false);
    }
  };

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* HEADER SECTION */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Case Allocation
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Allocate QC-approved education cases to verifiers
                  </p>
                </div>
                <button
                  onClick={fetchAll}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-60 text-xs font-medium rounded-lg shadow-sm self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${loading ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg px-4 py-3">
                  ⚠ {error}
                </div>
              )}

              {verifiers.length === 0 && !loading && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-4 py-3">
                  No verifier accounts found. Case Allocation needs at least one active user with the
                  "verifier" role before cases can be assigned.
                </div>
              )}

              {/* TOP CARDS & ACTION BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Unassigned Cases */}
                <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Unassigned Cases</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{unassignedCount}</p>
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
                  <button
                    onClick={handleAllocate}
                    disabled={allocating || selectedCases.length === 0 || !selectedVerifier}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-[#00A37A] hover:bg-[#008f6b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
                  >
                    {allocating ? "Allocating..." : "Allocate"}
                  </button>
                  <button
                    onClick={handleAllocate}
                    disabled={
                      allocating ||
                      selectedCases.length === 0 ||
                      !selectedVerifier ||
                      !selectedCases.some((id) => allocatableCases.find((c) => c.id === id)?.assigned)
                    }
                    title="Reassigns already-allocated selected cases to the chosen verifier"
                    className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm rounded-lg shadow-sm transition-colors"
                  >
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
                      {verifiers.map((v) => (
                        <option key={v.id} value={v.id}>
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
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                        {verifierWorkload.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-4 text-center text-slate-400 font-normal">
                              No verifiers yet.
                            </td>
                          </tr>
                        )}
                        {verifierWorkload.map((v) => (
                          <tr key={v.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-semibold text-slate-900">{v.name}</td>
                            <td className="py-2.5">{v.assigned}</td>
                            <td className="py-2.5">{v.inProgress}</td>
                            <td className="py-2.5">{v.completed}</td>
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
                    All Cases ({allocatableCases.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("unassigned")}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                      activeTab === "unassigned"
                        ? "bg-[#00A37A] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    Unassigned ({unassignedCount})
                  </button>
                  <button
                    onClick={() => setActiveTab("assigned")}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                      activeTab === "assigned"
                        ? "bg-[#00A37A] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    Assigned ({assignedCount})
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
                              selectedCases.length === visibleCases.length &&
                              visibleCases.length > 0
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
                      {loading && (
                        <tr><td colSpan={10} className="text-center py-8 text-slate-500">Loading cases...</td></tr>
                      )}
                      {!loading && visibleCases.length === 0 && (
                        <tr>
                          <td colSpan={10} className="text-center py-8 text-slate-400">
                            No QC-approved education cases {activeTab !== "all" ? `in this view` : "awaiting allocation"}.
                          </td>
                        </tr>
                      )}
                      {!loading && visibleCases.map((row) => {
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
                                <button
                                  onClick={() => navigate("/TLEducationCheck")}
                                  className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs font-medium rounded-md transition-colors"
                                >
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
                  <span>
                    {visibleCases.length === 0
                      ? "Showing 0 cases"
                      : `Showing 1 - ${visibleCases.length} of ${visibleCases.length} cases`}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded bg-[#00A37A] text-white font-medium text-xs flex items-center justify-center">
                      1
                    </button>
                    <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default TLAllocator;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { API_URL } from "../src/config";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     total: 0,
//     in_progress: 0,
//     completed: 0,
//     clients: 0,
//     clear_rate: "0%",
//     avg_tat: "0 days",
//     pending: 0,
//   });

//   const [cases, setCases] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // Dashboard API
//   useEffect(() => {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     };

//     Promise.all([
//       fetch(`${API_URL}/api/dashboard-stats`, { headers })
//         .then(res => res.json()),

//       fetch(`${API_URL}/api/cases`, { headers })
//         .then(res => res.json()),

//       fetch(`${API_URL}/api/users`, { headers })
//         .then(res => res.json()),
//     ])
//       .then(([statsData, casesData, usersData]) => {
//         setStats(statsData);
//         setCases(casesData.cases || []);

//         const clientUsers =
//           (usersData.users || []).filter(
//             user => user.role === "client"
//           );

//         setClients(clientUsers);
//       })
//       .catch(error => {
//         console.error("Dashboard Error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//   }, []);


//   return (
//     <>
//       <Sidebar />

//       <section id="content">

//         <Header />

//         <main>

//           <div className="dash-wrper">


//             {/* Top Filter Bar */}

//             <div className="dash-upper-head">

//               <div className="left">

//                 <button className="tab-cta">
//                   Today
//                 </button>


//                 <button className="tab-cta">
//                   This Week
//                 </button>


//                 <button className="tab-cta active">
//                   This Month
//                 </button>


//                 <button className="tab-cta">
//                   Custom
//                 </button>

//               </div>


//               <div className="right">

//                 <button className="primary-cta export">

//                   <img
//                     src="/images/dashboard/export-icon.svg"
//                     alt=""
//                   />

//                   Export CSV

//                 </button>


//                 <button className="secondary-cta import">

//                   <img
//                     src="/images/dashboard/export-excel.svg"
//                     alt=""
//                   />

//                   Export Excel

//                 </button>

//               </div>

//             </div>



//             {/* Dashboard Cards */}

//             <div className="cards-head-dash">


//               <div className="card-inner-dash bdr-total">

//                 <h4>
//                   {loading ? "—" : stats.total}
//                 </h4>

//                 <p>Total Cases</p>

//               </div>



//               <div className="card-inner-dash bdr-progress">

//                 <h4>
//                   {loading ? "—" : stats.in_progress}
//                 </h4>

//                 <p>In Progress</p>

//               </div>



//               <div className="card-inner-dash bdr-com">

//                 <h4>
//                   {loading ? "—" : stats.completed}
//                 </h4>

//                 <p>Completed</p>

//               </div>



//               <div className="card-inner-dash bdr-client">

//                 <h4>
//                   {loading ? "—" : clients.length}
//                 </h4>

//                 <p>Clients</p>

//               </div>



//               <div className="card-inner-dash bdr-rate">

//                 <h4>
//                   {loading ? "—" : stats.clear_rate}
//                 </h4>

//                 <p>Clear Rate</p>

//               </div>

//             </div>



//             {/* Dashboard Body */}

//             <div className="dash-inner-wrp-both">


//               {/* Left Section */}

//               <div className="dash-inner-left">


//                 {/* Case Trends */}

//                 <div className="up-table">

//                   <div
//                     style={{
//                       background: "#27348B",
//                       color: "#fff",
//                       padding: "14px 18px",
//                       fontWeight: "700",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >

//                     <span>
//                       CASE TRENDS — This Month
//                     </span>


//                     <span
//                       style={{
//                         color: "#14d8a7",
//                       }}
//                     >
//                       ▲ 14% vs last month
//                     </span>

//                   </div>


//                   <img
//                     src="/images/dashboard/graph-dash.png"
//                     alt="Graph"
//                     style={{
//                       width: "100%",
//                       display: "block",
//                     }}
//                   />

//                 </div>
//                                 {/* Recent Cases Table */}

//                 <div className="down-table">

//                   <table>

//                     <thead>

//                       <tr>
//                         <th>Case ID</th>
//                         <th>Candidate</th>
//                         <th>Client</th>
//                         <th>Checks</th>
//                         <th>Status</th>
//                         <th>TAT</th>
//                         <th>Action</th>
//                       </tr>

//                     </thead>


//                     <tbody>

//                       {
//                         loading ? (

//                           <tr>
//                             <td colSpan="7"
//                               style={{
//                                 textAlign: "center",
//                                 padding: "25px"
//                               }}>
//                               Loading Cases...
//                             </td>
//                           </tr>

//                         ) : cases.length === 0 ? (

//                           <tr>

//                             <td
//                               colSpan="7"
//                               style={{
//                                 textAlign: "center",
//                                 padding: "25px"
//                               }}
//                             >

//                               No cases found

//                             </td>

//                           </tr>

//                         ) : (

//                           cases.slice(0, 4).map((row) => (

//                             <tr key={row.case_id}>

//                               <td>
//                                 {row.case_id}
//                               </td>


//                               <td>
//                                 {row.candidate}
//                               </td>


//                               <td>
//                                 {row.client}
//                               </td>


//                               <td>
//                                 {row.checks}
//                               </td>


//                               <td>

//                                 <span
//                                   className={`status ${row.status}`}
//                                 >
//                                   {statusLabel(row.status)}
//                                 </span>

//                               </td>


//                               <td>
//                                 {row.tat || "—"}
//                               </td>


//                               <td>

//                                 <button
//                                   className="view-cta"
//                                   onClick={() =>
//                                     navigate("/AllCases")
//                                   }
//                                 >
//                                   View
//                                 </button>

//                               </td>


//                             </tr>

//                           ))

//                         )

//                       }

//                     </tbody>

//                   </table>

//                 </div>

//               </div>


//               {/* RIGHT SIDE QUICK STATS */}


//               <div className="dash-inner-right">


//                 <div className="quick-stats">


//                   <div
//                     className="stats-header"
//                   >

//                     <h3>
//                       QUICK STATS
//                     </h3>

//                   </div>



//                   <div className="stats-body">


//                     <div className="stats-row">
//                       <span>Avg TAT</span>
//                       <strong>
//                         {stats.avg_tat}
//                       </strong>
//                     </div>


//                     <div className="stats-row">
//                       <span>Clear Rate</span>
//                       <strong>
//                         {stats.clear_rate}
//                       </strong>
//                     </div>


//                     <div className="stats-row">
//                       <span>Discrepancy</span>

//                       <strong>
//                         {stats.discrepancy || "8%"}
//                       </strong>
//                     </div>


//                     <div className="stats-row">
//                       <span>Pending QC</span>

//                       <strong>
//                         {stats.pending}
//                       </strong>

//                     </div>


//                     <div className="stats-row">

//                       <span>
//                         Clients
//                       </span>


//                       <strong>
//                         {clients.length}
//                       </strong>

//                     </div>


//                   </div>


//                 </div>


//               </div>


//             </div>


//           </div>

//         </main>


//       </section>


//     </>

//   );

// }



// /* Status Labels */

// function statusLabel(status) {

//   const labels = {

//     "in-progress": "In Progress",

//     "qc-review": "QC Review",

//     "completed": "Completed",

//     "pending": "Pending",

//     "on-hold": "On Hold"

//   };


//   return labels[status] || status;

// }
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import CaseTrendsChart from "./CaseTrendsChart";
// import { API_URL } from "../src/config";

// const DATE_FILTERS = [
//   { key: "today",  label: "Today"      },
//   { key: "week",   label: "This Week"  },
//   { key: "month",  label: "This Month" },
//   { key: "custom", label: "Custom"     },
// ];

// function statusLabel(status) {
//   return {
//     "in-progress": "In Progress", "qc-review": "QC Review",
//     "completed": "Completed", "pending": "Pending", "on-hold": "On Hold",
//   }[status] || status;
// }

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     total: 0, in_progress: 0, completed: 0,
//     clients: 0, clear_rate: "0%", avg_tat: "0 days",
//     pending: 0, discrepancy: "8%",
//   });
//   const [cases,   setCases]   = useState([]);
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [dateFilter, setDateFilter] = useState("month");
//   const [customFrom, setCustomFrom] = useState("");
//   const [customTo,   setCustomTo]   = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
//     Promise.all([
//       fetch(`${API_URL}/api/dashboard-stats`, { headers }).then(r => r.json()),
//       fetch(`${API_URL}/api/cases`,            { headers }).then(r => r.json()),
//       fetch(`${API_URL}/api/users`,            { headers }).then(r => r.json()),
//     ])
//       .then(([statsData, casesData, usersData]) => {
//         setStats(statsData);
//         setCases(casesData.cases || []);
//         setClients((usersData.users || []).filter(u => u.role === "client"));
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   // Filter cases by selected date range for the chart
//   const isInRange = (createdAt) => {
//     if (!createdAt) return true;
//     const d   = new Date(createdAt);
//     const now = new Date();
//     if (dateFilter === "today") return d.toDateString() === now.toDateString();
//     if (dateFilter === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
//     if (dateFilter === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
//     if (dateFilter === "custom") {
//       if (!customFrom && !customTo) return true;
//       const from = customFrom ? new Date(customFrom) : null;
//       const to   = customTo   ? new Date(customTo + "T23:59:59") : null;
//       if (from && d < from) return false;
//       if (to   && d > to)   return false;
//       return true;
//     }
//     return true;
//   };

//   const chartCases = cases.filter(c => isInRange(c.created_at));

//     // Calculate pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filtered.length / usersPerPage);

//   const vsText = (() => {
//     const label = DATE_FILTERS.find(d => d.key === dateFilter)?.label;
//     return `Showing ${chartCases.length} cases — ${label}`;
//   })();



//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* Top Filter Bar */}
//             <div className="dash-upper-head">
//               <div className="left">
//                 {DATE_FILTERS.map(df => (
//                   <button
//                     key={df.key}
//                     className={`tab-cta ${dateFilter === df.key ? "active" : ""}`}
//                     onClick={() => setDateFilter(df.key)}
//                   >
//                     {df.label}
//                   </button>
//                 ))}
//                 {dateFilter === "custom" && (
//                   <>
//                     <input
//                       type="date" value={customFrom}
//                       onChange={e => setCustomFrom(e.target.value)}
//                       style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
//                     />
//                     <span style={{ color: "#94a3b8" }}>→</span>
//                     <input
//                       type="date" value={customTo}
//                       onChange={e => setCustomTo(e.target.value)}
//                       style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
//                     />
//                   </>
//                 )}
//               </div>
//               <div className="right">
//                 <button className="primary-cta export">
//                   <img src="/images/dashboard/export-icon.svg" alt="" /> Export CSV
//                 </button>
//                 <button className="secondary-cta import">
//                   <img src="/images/dashboard/export-excel.svg" alt="" /> Export Excel
//                 </button>
//               </div>
//             </div>

//             {/* Stat cards */}
//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total">
//                 <h4>{loading ? "—" : stats.total}</h4>
//                 <p>Total Cases</p>
//               </div>
//               <div className="card-inner-dash bdr-progress">
//                 <h4>{loading ? "—" : stats.in_progress}</h4>
//                 <p>In Progress</p>
//               </div>
//               <div className="card-inner-dash bdr-com">
//                 <h4>{loading ? "—" : stats.completed}</h4>
//                 <p>Completed</p>
//               </div>
//               <div className="card-inner-dash bdr-client">
//                 <h4>{loading ? "—" : clients.length}</h4>
//                 <p>Clients</p>
//               </div>
//               <div className="card-inner-dash bdr-rate">
//                 <h4>{loading ? "—" : stats.clear_rate}</h4>
//                 <p>Clear Rate</p>
//               </div>
//             </div>

//             {/* Dashboard Body */}
//             <div className="dash-inner-wrp-both">

//               {/* Left: Chart + Recent Cases */}
//               <div className="dash-inner-left">

//                 <CaseTrendsChart
//                   casesData={chartCases}
//                   label={DATE_FILTERS.find(d => d.key === dateFilter)?.label}
//                   vsText={vsText}
//                   vsColor="#14d8a7"
//                   dateFilter={dateFilter}
//                   customFrom={customFrom}
//                   customTo={customTo}
//                 />

//                 {/* Recent Cases Table */}
//                 <div className="down-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Case ID</th>
//                         <th>Candidate</th>
//                         <th>Client</th>
//                         <th>Checks</th>
//                         <th>Status</th>
//                         <th>TAT</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr><td colSpan="7" style={{ textAlign: "center", padding: "25px" }}>Loading Cases...</td></tr>
//                       ) : cases.length === 0 ? (
//                         <tr><td colSpan="7" style={{ textAlign: "center", padding: "25px" }}>No cases found</td></tr>
//                       ) : (
//                         cases.slice(0, 4).map(row => (
//                           <tr key={row.case_id}>
//                             <td>{row.case_id}</td>
//                             <td>{row.candidate}</td>
//                             <td>{row.client}</td>
//                             <td>{row.checks}</td>
//                             <td><span className={`status ${row.status}`}>{statusLabel(row.status)}</span></td>
//                             <td>{row.tat || "—"}</td>
//                             <td>
//                               <button className="view-cta" onClick={() => navigate("/AllCases")}>View</button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>

//                    {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
//                   <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
//                   <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
//                   ))}
//                   <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
//                   <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
//                 </div>
//               )}
//                 </div>
//               </div>

//               {/* Right: Quick Stats */}
//               <div className="dash-inner-right">
//                 <div className="quick-stats">
//                   <div className="stats-header"><h3>QUICK STATS</h3></div>
//                   <div className="stats-body">
//                     <div className="stats-row"><span>Avg TAT</span><strong>{stats.avg_tat}</strong></div>
//                     <div className="stats-row"><span>Clear Rate</span><strong>{stats.clear_rate}</strong></div>
//                     <div className="stats-row"><span>Discrepancy</span><strong>{stats.discrepancy || "8%"}</strong></div>
//                     <div className="stats-row"><span>Pending QC</span><strong>{stats.pending}</strong></div>
//                     <div className="stats-row"><span>Clients</span><strong>{clients.length}</strong></div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CaseTrendsChart from "./CaseTrendsChart";
import { API_URL } from "../src/config";

const DATE_FILTERS = [
  { key: "today",  label: "Today"      },
  { key: "week",   label: "This Week"  },
  { key: "month",  label: "This Month" },
  { key: "custom", label: "Custom"     },
];

function statusLabel(status) {
  return {
    "in-progress": "In Progress", "qc-review": "QC Review",
    "completed": "Completed", "pending": "Pending", "on-hold": "On Hold",
  }[status] || status;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0, in_progress: 0, completed: 0,
    clients: 0, clear_rate: "0%", avg_tat: "0 days",
    pending: 0, discrepancy: "8%",
  });
  const [cases,   setCases]   = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo,   setCustomTo]   = useState("");

  // Pagination States (यहाँ हमने इन्हें define कर दिया है)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4; // प्रति पेज कितने केस दिखाने हैं

  const token = localStorage.getItem("token");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
    Promise.all([
      fetch(`${API_URL}/api/dashboard-stats`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/cases`,            { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/users`,            { headers }).then(r => r.json()),
    ])
      .then(([statsData, casesData, usersData]) => {
        setStats(statsData);
        setCases(casesData.cases || []);
        setClients((usersData.users || []).filter(u => u.role === "client"));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter cases by selected date range for the chart
  const isInRange = (createdAt) => {
    if (!createdAt) return true;
    const d   = new Date(createdAt);
    const now = new Date();
    if (dateFilter === "today") return d.toDateString() === now.toDateString();
    if (dateFilter === "week")  { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w; }
    if (dateFilter === "month") { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }
    if (dateFilter === "custom") {
      if (!customFrom && !customTo) return true;
      const from = customFrom ? new Date(customFrom) : null;
      const to   = customTo   ? new Date(customTo + "T23:59:59") : null;
      if (from && d < from) return false;
      if (to   && d > to)   return false;
      return true;
    }
    return true;
  };

  const chartCases = cases.filter(c => isInRange(c.created_at));

  // Calculate pagination based on cases
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentCases = cases.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(cases.length / usersPerPage);

  const vsText = (() => {
    const label = DATE_FILTERS.find(d => d.key === dateFilter)?.label;
    return `Showing ${chartCases.length} cases — ${label}`;
  })();

  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            {/* Top Filter Bar */}
            <div className="dash-upper-head">
              <div className="left">
                {DATE_FILTERS.map(df => (
                  <button
                    key={df.key}
                    className={`tab-cta ${dateFilter === df.key ? "active" : ""}`}
                    onClick={() => setDateFilter(df.key)}
                  >
                    {df.label}
                  </button>
                ))}
                {dateFilter === "custom" && (
                  <>
                    <input
                      type="date" value={customFrom}
                      onChange={e => setCustomFrom(e.target.value)}
                      style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                    />
                    <span style={{ color: "#94a3b8" }}>→</span>
                    <input
                      type="date" value={customTo}
                      onChange={e => setCustomTo(e.target.value)}
                      style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px" }}
                    />
                  </>
                )}
              </div>
              <div className="right">
                <button className="primary-cta export">
                  <img src="/images/dashboard/export-icon.svg" alt="" /> Export CSV
                </button>
                <button className="secondary-cta import">
                  <img src="/images/dashboard/export-excel.svg" alt="" /> Export Excel
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="cards-head-dash">
              <div className="card-inner-dash bdr-total">
                <h4>{loading ? "—" : stats.total}</h4>
                <p>Total Cases</p>
              </div>
              <div className="card-inner-dash bdr-progress">
                <h4>{loading ? "—" : stats.in_progress}</h4>
                <p>In Progress</p>
              </div>
              <div className="card-inner-dash bdr-com">
                <h4>{loading ? "—" : stats.completed}</h4>
                <p>Completed</p>
              </div>
              <div className="card-inner-dash bdr-client">
                <h4>{loading ? "—" : clients.length}</h4>
                <p>Clients</p>
              </div>
              <div className="card-inner-dash bdr-rate">
                <h4>{loading ? "—" : stats.clear_rate}</h4>
                <p>Clear Rate</p>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="dash-inner-wrp-both">

              {/* Left: Chart + Recent Cases */}
              <div className="dash-inner-left">

                <CaseTrendsChart
                  casesData={chartCases}
                  label={DATE_FILTERS.find(d => d.key === dateFilter)?.label}
                  vsText={vsText}
                  vsColor="#14d8a7"
                  dateFilter={dateFilter}
                  customFrom={customFrom}
                  customTo={customTo}
                />

                {/* Recent Cases Table */}
                <div className="down-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Case ID</th>
                        <th>Candidate</th>
                        <th>Client</th>
                        <th>Checks</th>
                        <th>Status</th>
                        <th>TAT</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan="7" style={{ textAlign: "center" }}>Loading Cases...</td></tr>
                      ) : cases.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: "center" }}>No cases found</td></tr>
                      ) : (
                        currentCases.map(row => (
                          <tr key={row.case_id}>
                            <td>{row.case_id}</td>
                            <td>{row.candidate}</td>
                            <td>{row.client}</td>
                            <td>{row.checks}</td>
                            <td><span className={`status ${row.status}`}>{statusLabel(row.status)}</span></td>
                            <td><div className="tat-custom-class green"> <span className="tat-label-dot green"></span>
    {row.tat || "—"}
  </div></td>
                            <td>
                              <button className="view-cta" onClick={() => navigate("/AllCases")}>View</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", padding: "20px", gap: "5px" }}>
                      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>«</button>
                      <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} style={{ padding: "5px 10px" }}>‹</button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: "5px 12px", background: currentPage === i + 1 ? "#2b3b8c" : "#fff", color: currentPage === i + 1 ? "#fff" : "#000" }}>{i + 1}</button>
                      ))}
                      <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>›</button>
                      <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "5px 10px" }}>»</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Quick Stats */}
              <div className="dash-inner-right">
                <div className="quick-stats">
                  <div className="stats-header"><h3>Quick Stats</h3></div>
                  <div className="stats-body">
                    <div className="stats-row"><span>Avg TAT</span><strong>{stats.avg_tat}</strong></div>
                    <div className="stats-row"><span>Clear Rate</span><strong>{stats.clear_rate}</strong></div>
                    <div className="stats-row"><span>Discrepancy</span><strong>{stats.discrepancy || "8%"}</strong></div>
                    <div className="stats-row"><span>Pending QC</span><strong>{stats.pending}</strong></div>
                    <div className="stats-row"><span>Clients</span><strong>{clients.length}</strong></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
}
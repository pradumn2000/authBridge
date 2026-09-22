// // import { useNavigate } from "react-router-dom";


// // export default function Client() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };


// //   return (
// //     <>
 

// //   {/* CONTENT */}
// //   <section id="noSidebar">
// //     {/* NAVBAR */}
// //     <nav>
// //       <div className="nav-toggle">
// //         <div className="bx bx-menu">
// //           <img src="images/inner-pages/client-portal-icon.svg" alt="" />
// //         </div>
// //       </div>
      
// //       <div className="head-src">
// //         <h3>PVT / QC INTAKE — Queue  · Case Detail · Comments · Trends  · Export</h3>
// //       </div>
      
// //       <button type="button" className="primary-cta">PVT Role</button>
// //     </nav>


// //     {/* MAIN */}
// //     <main>

// //      <div className="dash-wrper">

// //      {/* <div className="header-navbar">
      
// //           <button className="tab-cta">Dashboard</button>
// //           <button className="tab-cta active">Active Cases</button>
// //           <button className="tab-cta">Completed</button>
// //           <button className="tab-cta">Generate Link</button>
// //           <button className="tab-cta">Reports & Trends</button>
          
// //      </div> */}

// //           <div className="dash-upper-head">
// //           <div className="left"> 
// //           <button className="tab-cta">Today</button>
// //           <button className="tab-cta">This Week</button>
// //           <button className="tab-cta">This Month</button>
// //           <button className="tab-cta active">Custom</button>
// //           </div>
// //           <div className="right">
// //           <button className="date-wrapper"><img src="/images/dashboard/calendar-icon.svg"></img><input
// //         type="text"
// //         name="daterange"
// //         className="selectedDate"
// //         placeholder="Select Date"
// //         readOnly
// //       /></button>
// //           <button className="primary-cta export"><img src="images/dashboard/export-icon.svg" alt="" /> Export CSV</button>
// //           <button className="secondary-cta import"><img src="images/dashboard/export-excel.svg" alt="" />Export Excel</button>
// //           </div>
// //           </div>

// //        {/* TOP SECTION */}
// //       <div className="cards-head-dash">

// //        <div className="card-inner-dash bdr-total">
// //         <h4>18</h4>
// //         <p>Active</p>
// //        </div>

// //        <div className="card-inner-dash bdr-com">
// //         <h4>42</h4>
// //         <p>Completed</p>
// //        </div>

// //        <div className="card-inner-dash bdr-progress">
// //         <h4>3</h4>
// //         <p>Pending Link</p>
// //        </div>

       

// //        {/* <div className="card-inner-dash bdr-client">
// //         <h4>50</h4>
// //         <p>Clients</p>
// //        </div> */}

// //        <div className="card-inner-dash bdr-rate">
// //         <h4>96%</h4>
// //         <p>Clear Rate</p>
// //        </div>

// //       </div>

// //       {/* DASHBOARD Inner body */}

// //     <div className="intake-wrp">
// //   {/* COLUMN 1: NEW CASES QUEUE */}
// // <section className="dashboard-column queue-column" id="queue-section">
// //   <header className="column-header">
// //     <h2>NEW CASES QUEUE</h2>
// //   </header>

// //   <div className="column-content scrollable-content">
    
// //     {/* Case 1 */}
// //     <article className="case-card active" id="case-2420">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2420</h3>
// //         <p className="case-candidate">Amit Verma</p>
// //       </div>
// //       <span className="badge badge-new">NEW</span>
// //     </article>

// //     {/* Case 2 */}
// //     <article className="case-card" id="case-2421">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2421</h3>
// //         <p className="case-candidate">Deepa Nair</p>
// //       </div>
// //       <span className="badge badge-new">NEW</span>
// //     </article>

// //     {/* Case 3 */}
// //     <article className="case-card" id="case-2422">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2422</h3>
// //         <p className="case-candidate">Kiran Rao</p>
// //       </div>
// //       <span className="badge badge-incomplete">INCOMPLETE</span>
// //     </article>

// //     {/* Case 4 */}
// //     <article className="case-card" id="case-2423">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2423</h3>
// //         <p className="case-candidate">Sonal Joshi</p>
// //       </div>
// //       <span className="badge badge-new">NEW</span>
// //     </article>

// //     {/* Case 5 */}
// //     <article className="case-card" id="case-2424">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2424</h3>
// //         <p className="case-candidate">Manoj Tiwari</p>
// //       </div>
// //       <span className="badge badge-review">REVIEW</span>
// //     </article>

// //     {/* Case 6 */}
// //     <article className="case-card" id="case-2425">
// //       <div className="case-card-info">
// //         <h3 className="case-id">BGV-2425</h3>
// //         <p className="case-candidate">Preethi Iyer</p>
// //       </div>
// //       <span className="badge badge-review">REVIEW</span>
// //     </article>
// //   </div>
// // </section>

// // {/* COLUMN 2: CASE DETAIL */}
// // <section className="dashboard-column detail-column" id="detail-section">
  
// //   <header className="column-header">
// //     <h2>CASE DETAIL — BGV-2420 | Amit Verma</h2>
// //   </header>

// //   <div className="column-content detail-content">
    
// //     <div className="detail-fields-group">

// //       {/* Candidate */}
// //       <div className="detail-field">
// //         <span className="field-label">Candidate</span>
// //         <span className="field-value">Amit Verma</span>
// //       </div>

// //       {/* Client */}
// //       <div className="detail-field">
// //         <span className="field-label">Client</span>
// //         <span className="field-value">Deloitte India</span>
// //       </div>

// //       {/* Submitted */}
// //       <div className="detail-field">
// //         <span className="field-label">Submitted</span>
// //         <span className="field-value">Today 10:40 AM</span>
// //       </div>

// //       {/* Check Types */}
// //       <div className="detail-field">
// //         <span className="field-label">Check Types</span>
// //         <span className="field-value check-types">
// //           Emp · Edu · Criminal · DB
// //         </span>
// //       </div>

// //       {/* Documents */}
// //       <div className="detail-field documents-field">
// //         <span className="field-label">Documents</span>

// //         <div className="documents-list">
// //           <span className="doc-item">
// //             Aadhar <span className="checkmark">✓</span>
// //           </span>

// //           <span className="doc-item">
// //             PAN <span className="checkmark">✓</span>
// //           </span>

// //           <span className="doc-item">
// //             Degree <span className="checkmark">✓</span>
// //           </span>

// //           <span className="doc-item">
// //             Offer Letter <span className="checkmark">✓</span>
// //           </span>
// //         </div>
// //       </div>
// //     </div>

// //     {/* Action Buttons */}
// //     <div className="detail-actions">

// //       <button className="btn btn-approve" type="button">
// //         <svg
// //           className="btn-icon"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="3"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <polyline points="20 6 9 17 4 12"></polyline>
// //         </svg>

// //         APPROVE & ROUTE
// //       </button>

// //       <button className="btn btn-return" type="button">
// //         <svg
// //           className="btn-icon"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="3"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <line x1="18" y1="6" x2="6" y2="18"></line>
// //           <line x1="6" y1="6" x2="18" y2="18"></line>
// //         </svg>

// //         RETURN TO CLIENT
// //       </button>

// //       <button className="btn btn-request" type="button">
// //         <svg
// //           className="btn-icon"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="currentColor"
// //           strokeWidth="2.5"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
// //         </svg>

// //         REQUEST DOCS
// //       </button>
// //     </div>
// //   </div>
// // </section>

// // {/* COLUMN 3 */}
// // <div className="dashboard-column right-column">

// //   {/* COMMENTS */}
// //   <section
// //     className="right-subcolumn comments-section"
// //     id="comments-section"
// //   >
// //     <header className="column-header">
// //       <h2>COMMENTS</h2>
// //     </header>

// //     <div className="column-content comments-content">

// //       {/* Comments List */}
// //       <div className="comments-list">

// //         <div className="comment-card">
// //           <div className="comment-avatar">A</div>

// //           <div className="comment-body">

// //             <div className="comment-meta">
// //               <span className="comment-author">Admin</span>
// //               <span className="comment-time">09:45</span>
// //             </div>

// //             <p className="comment-text">
// //               Documents incomplete — degree cert missing.
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Comment Input */}
// //       <form
// //         className="comment-input-area"
// //         onSubmit={(e) => e.preventDefault()}
// //       >
// //         <input
// //           type="text"
// //           className="comment-input"
// //           placeholder="Add comment..."
// //           aria-label="Add comment"
// //         />

// //         <button
// //           type="submit"
// //           className="comment-send-btn"
// //           aria-label="Send comment"
// //         >
// //           <svg
// //             className="send-icon"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="2.5"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //           >
// //             <line x1="22" y1="2" x2="11" y2="13"></line>

// //             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
// //           </svg>
// //         </button>
// //       </form>
// //     </div>
// //   </section>
// // </div>
// //     </div>
      
// //      </div>
      
// //     </main>
// //   </section>
// // </>
// //   );
// // }
// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { API_URL } from "../src/config";

// // ── Mock cases — replace with: GET /api/cases?role=pvt_qc&status=intake
// const MOCK_CASES = [
//   {
//     id:"BGV-2420", candidate:"Amit Verma",    client:"Deloitte India", submitted:"Today 10:40 AM",
//     checks:"Emp · Edu · Criminal · DB", status:"new",
//     docs:["Aadhar","PAN","Degree","Offer Letter"],
//     comments:[{ author:"Admin", avatar:"A", color:"#7c3aed", time:"09:45", text:"Documents incomplete — degree cert missing." }],
//   },
//   {
//     id:"BGV-2421", candidate:"Deepa Nair",    client:"Infosys",       submitted:"Today 11:00 AM",
//     checks:"Emp · Edu", status:"new",
//     docs:["Aadhar","PAN"],
//     comments:[],
//   },
//   {
//     id:"BGV-2422", candidate:"Kiran Rao",     client:"TCS",           submitted:"Today 09:15 AM",
//     checks:"Emp · Addr · DB", status:"incomplete",
//     docs:["Aadhar"],
//     comments:[{ author:"PVT", avatar:"P", color:"#0d9488", time:"09:20", text:"Degree certificate not uploaded." }],
//   },
//   {
//     id:"BGV-2423", candidate:"Sonal Joshi",   client:"Wipro",         submitted:"Today 10:00 AM",
//     checks:"Edu · Criminal", status:"new",
//     docs:["Aadhar","PAN","Degree"],
//     comments:[],
//   },
//   {
//     id:"BGV-2424", candidate:"Manoj Tiwari",  client:"HCL",           submitted:"Today 08:45 AM",
//     checks:"All 7 Checks", status:"review",
//     docs:["Aadhar","PAN","Degree","Offer Letter","Address Proof"],
//     comments:[{ author:"Admin", avatar:"A", color:"#7c3aed", time:"08:50", text:"Please prioritise — urgent hire." }],
//   },
//   {
//     id:"BGV-2425", candidate:"Preethi Iyer",  client:"Accenture",     submitted:"Today 08:00 AM",
//     checks:"Emp · Edu · Addr", status:"review",
//     docs:["Aadhar","PAN","Degree"],
//     comments:[],
//   },
// ];

// const BADGE_CONFIG = {
//   new:        { label:"NEW",        bg:"var(--tab-btn-color)" },
//   incomplete: { label:"INCOMPLETE", bg:"var(--alert-red)"    },
//   review:     { label:"REVIEW",     bg:"var(--yellow-color)" },
//   approved:   { label:"APPROVED",   bg:"var(--sucess-btn-color)" },
//   returned:   { label:"RETURNED",   bg:"#64748b" },
// };

// export default function Intake() {
//   const navigate = useNavigate();

//   const [cases, setCases]               = useState(MOCK_CASES);
//   const [selected, setSelected]         = useState(MOCK_CASES[0]);
//   const [comments, setComments]         = useState(MOCK_CASES[0].comments);
//   const [commentInput, setCommentInput] = useState("");
//   const [actionMsg, setActionMsg]       = useState("");
//   const commentsEndRef = useRef(null);

//   useEffect(() => {
//     commentsEndRef.current?.scrollIntoView({ behavior:"smooth" });
//   }, [comments]);

//   const selectCase = (c) => {
//     setSelected(c);
//     setComments([...c.comments]);
//     setActionMsg("");
//   };

//   const handleAction = (action) => {
//     // TODO: POST /api/cases/{id}/action { action }
//     // action: "approve" | "return" | "request_docs"
//     const statusMap = { approve:"approved", return:"returned", request_docs:"incomplete" };
//     const msgMap    = {
//       approve:      "Case approved and routed to Allocator.",
//       return:       "Case returned to client.",
//       request_docs: "Document request sent to candidate.",
//     };

//     setCases(prev => prev.map(c =>
//       c.id === selected.id ? { ...c, status: statusMap[action] } : c
//     ));
//     setSelected(prev => ({ ...prev, status: statusMap[action] }));
//     setActionMsg(msgMap[action]);
//     setTimeout(() => setActionMsg(""), 4000);
//   };

//   const handleComment = (e) => {
//     e.preventDefault();
//     if (!commentInput.trim()) return;
//     const user = (() => { try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }})();
//     const name = user.name || "PVT";
//     // TODO: POST /api/cases/{id}/comments { text: commentInput }
//     const newComment = {
//       author: name, avatar: name.charAt(0).toUpperCase(),
//       color:"#0d9488",
//       time: new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),
//       text: commentInput.trim(),
//     };
//     setComments(prev => [...prev, newComment]);
//     setCases(prev => prev.map(c =>
//       c.id === selected.id ? { ...c, comments:[...c.comments, newComment] } : c
//     ));
//     setCommentInput("");
//   };

//   const counts = {
//     active:    cases.filter(c=>c.status==="new"||c.status==="review").length,
//     completed: cases.filter(c=>c.status==="approved").length,
//     pending:   cases.filter(c=>c.status==="incomplete").length,
//     clearRate: cases.length > 0
//       ? Math.round((cases.filter(c=>c.status==="approved").length / cases.length)*100)
//       : 0,
//   };

//   return (
//     <>
//       <Sidebar />
//       <section id="content">
//         <Header />
//         <main>
//           <div className="dash-wrper">

//             {/* ── Stats ── */}
//             <div className="cards-head-dash">
//               <div className="card-inner-dash bdr-total"><h4>{counts.active}</h4><p>Active</p></div>
//               <div className="card-inner-dash bdr-com"><h4>{counts.completed}</h4><p>Approved</p></div>
//               <div className="card-inner-dash bdr-progress"><h4>{counts.pending}</h4><p>Incomplete</p></div>
//               <div className="card-inner-dash bdr-rate"><h4>{counts.clearRate}%</h4><p>Clear Rate</p></div>
//             </div>

//             {/* ── 3-column intake layout ── */}
//             <div className="intake-wrp">

//               {/* ── COL 1: Queue ── */}
//               <section className="dashboard-column queue-column" id="queue-section">
//                 <header className="column-header"><h2>NEW CASES QUEUE</h2></header>
//                 <div className="column-content scrollable-content" style={{ padding:"12px" }}>
//                   {cases.map(c => {
//                     const badge = BADGE_CONFIG[c.status] || BADGE_CONFIG.new;
//                     const isSelected = selected?.id === c.id;
//                     return (
//                       <article key={c.id}
//                         className={`case-card ${isSelected ? "active" : ""}`}
//                         onClick={() => selectCase(c)}
//                         style={{ marginBottom:"10px", cursor:"pointer" }}>
//                         <div className="case-card-info">
//                           <h3 className="case-id">{c.id}</h3>
//                           <p className="case-candidate">{c.candidate}</p>
//                         </div>
//                         <span className="badge" style={{ background: badge.bg }}>{badge.label}</span>
//                       </article>
//                     );
//                   })}
//                 </div>
//               </section>

//               {/* ── COL 2: Case Detail ── */}
//               <section className="dashboard-column detail-column" id="detail-section">
//                 <header className="column-header">
//                   <h2>CASE DETAIL — {selected?.id} | {selected?.candidate}</h2>
//                 </header>
//                 {selected && (
//                   <div className="column-content detail-content">
//                     <div className="detail-fields-group">
//                       <div className="detail-field">
//                         <span className="field-label">Candidate</span>
//                         <span className="field-value">{selected.candidate}</span>
//                       </div>
//                       <div className="detail-field">
//                         <span className="field-label">Client</span>
//                         <span className="field-value">{selected.client}</span>
//                       </div>
//                       <div className="detail-field">
//                         <span className="field-label">Submitted</span>
//                         <span className="field-value">{selected.submitted}</span>
//                       </div>
//                       <div className="detail-field">
//                         <span className="field-label">Check Types</span>
//                         <span className="field-value check-types">{selected.checks}</span>
//                       </div>
//                       <div className="detail-field documents-field">
//                         <span className="field-label">Documents</span>
//                         <div className="documents-list">
//                           {selected.docs.map((d,i) => (
//                             <span key={i} className="doc-item">
//                               {d} <span className="checkmark">✓</span>
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {actionMsg && (
//                       <div style={{ background:"#f0fdf4", border:"1px solid #86efac", borderRadius:"8px",
//                         padding:"10px 14px", fontSize:"13px", fontWeight:600, color:"#16a34a", margin:"12px 0 0" }}>
//                         ✓ {actionMsg}
//                       </div>
//                     )}

//                     <div className="detail-actions">
//                       <button className="btn btn-approve" onClick={() => handleAction("approve")}>
//                         <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                         APPROVE & ROUTE
//                       </button>
//                       <button className="btn btn-return" onClick={() => handleAction("return")}>
//                         <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                           <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//                         </svg>
//                         RETURN TO CLIENT
//                       </button>
//                       <button className="btn btn-request" onClick={() => handleAction("request_docs")}>
//                         <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
//                         </svg>
//                         REQUEST DOCS
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </section>

//               {/* ── COL 3: Comments ── */}
//               <div className="dashboard-column right-column">
//                 <section className="right-subcolumn comments-section" id="comments-section"
//                   style={{ height:"100%" }}>
//                   <header className="column-header"><h2>COMMENTS</h2></header>
//                   <div className="column-content comments-content">
//                     <div className="comments-list" style={{ flex:1, overflowY:"auto", maxHeight:"340px" }}>
//                       {comments.length === 0 && (
//                         <p style={{ color:"#94a3b8", fontSize:"13px", textAlign:"center", padding:"16px" }}>
//                           No comments yet.
//                         </p>
//                       )}
//                       {comments.map((cm,i) => (
//                         <div key={i} className="comment-card">
//                           <div className="comment-avatar" style={{ background: cm.color }}>{cm.avatar}</div>
//                           <div className="comment-body">
//                             <div className="comment-meta">
//                               <span className="comment-author">{cm.author}</span>
//                               <span className="comment-time">{cm.time}</span>
//                             </div>
//                             <p className="comment-text">{cm.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={commentsEndRef} />
//                     </div>

//                     <form className="comment-input-area" onSubmit={handleComment} style={{ marginTop:"auto" }}>
//                       <input type="text" className="comment-input" placeholder="Add comment..."
//                         value={commentInput} onChange={e => setCommentInput(e.target.value)}
//                         aria-label="Add comment" />
//                       <button type="submit" className="comment-send-btn" aria-label="Send comment">
//                         <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                           <line x1="22" y1="2" x2="11" y2="13"/>
//                           <polygon points="22 2 15 22 11 13 2 9 22 2"/>
//                         </svg>
//                       </button>
//                     </form>
//                   </div>
//                 </section>
//               </div>

//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { API_URL } from "../src/config";

export default function Intake() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [dateRange, setDateRange] = useState("01 Apr 2025 - 30 Apr 2025");
  const [clientFilter, setClientFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkTypeFilter, setCheckTypeFilter] = useState("All");
  const [verificationStatus, setVerificationStatus] = useState("All");
  const [tlNameFilter, setTlNameFilter] = useState("All");
  const [reportStatusFilter, setReportStatusFilter] = useState("All");
  const [qcStatusFilter, setQcStatusFilter] = useState("All");

  const token = localStorage.getItem("token");

  const fetchCases = () => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/api/cases`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then(async (r) => {
        if (r.status === 401 || r.status === 403) {
          throw new Error("Your account doesn't have access to the case list.");
        }
        if (!r.ok) throw new Error("Failed to load cases.");
        return r.json();
      })
      .then((data) => setCases(data.cases || []))
      .catch((err) => setError(err.message || "Failed to load cases."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // Filter Logic
  const filteredCases = cases.filter((c) => {
    const caseIdStr = (c.case_id || "").toString().toLowerCase();
    const candidateStr = (c.candidate || c.candidate_name || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = caseIdStr.includes(query) || candidateStr.includes(query);
    const matchesClient = clientFilter === "All" || (c.client || c.client_name) === clientFilter;
    const matchesQc = qcStatusFilter === "All" || c.status === qcStatusFilter.toLowerCase();

    return matchesSearch && matchesClient && matchesQc;
  });

  return (
    <>
      <Sidebar />
      <section id="content" style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <Header />
        <main style={{ padding: "24px" }}>
          <div className="qc-intake-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Top Title Bar & Banner Alerts */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                  QC Intake <span style={{ fontWeight: "400", color: "#64748b" }}>— Verification Review & Report Status</span>
                </h1>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                  Review verification results, check documents, manage reports and QC approvals.
                </p>
              </div>

              {/* Alert Boxes */}
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#ef4444", fontSize: "18px" }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#991b1b", textTransform: "uppercase", fontWeight: "600" }}>Cases Awaiting QC Review</div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#991b1b" }}>12</div>
                  </div>
                </div>
                <div style={{ background: "#fffbebf", border: "1px solid #fef08a", borderRadius: "10px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#f59e0b", fontSize: "18px" }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#92400e", textTransform: "uppercase", fontWeight: "600" }}>Final Reports Not Generated</div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#92400e" }}>18</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
              {[
                { label: "Total Cases", count: cases.length || 156, color: "#2563eb", bg: "#eff6ff" },
                { label: "Documents Received", count: 142, color: "#059669", bg: "#ecfdf5" },
                { label: "Checks Completed", count: 118, color: "#7c3aed", bg: "#f5f3ff" },
                { label: "Checks Pending", count: 38, color: "#ea580c", bg: "#fff7ed" },
                { label: "Interim Reports", count: 42, color: "#4f46e5", bg: "#eef2ff" },
                { label: "Final Reports", count: 28, color: "#0d9488", bg: "#f0fdfa" },
                { label: "QC Pending", count: 12, color: "#e11d48", bg: "#fff1f2" },
                { label: "QC Approved", count: 36, color: "#0284c7", bg: "#f0f9ff" },
              ].map((m, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: m.bg, color: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
                    📋
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{m.count}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Section */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Date Range</label>
                  <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Client</label>
                  <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All Clients</option>
                    <option value="ABC Tech Pvt Ltd">ABC Tech Pvt Ltd</option>
                    <option value="Global Infotech">Global Infotech</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Case ID / Candidate Name</label>
                  <input type="text" placeholder="Search by Case ID or Candidate Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Check Type</label>
                  <select value={checkTypeFilter} onChange={(e) => setCheckTypeFilter(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All</option>
                    <option value="Identity">Identity</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              {/* Secondary Filters */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", alignItems: "flex-end" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Verification Status</label>
                  <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>TL Name</label>
                  <select value={tlNameFilter} onChange={(e) => setTlNameFilter(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>Report Status</label>
                  <select value={reportStatusFilter} onChange={(e) => setReportStatusFilter(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", marginBottom: "4px", display: "block" }}>QC Status</label>
                  <select value={qcStatusFilter} onChange={(e) => setQcStatusFilter(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ background: "#0d9488", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", fontWeight: "600", fontSize: "13px", cursor: "pointer", flex: 1 }}>Apply</button>
                  <button style={{ background: "#fff", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "8px 16px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>Reset</button>
                </div>
              </div>
            </div>

            {/* Responsive Scrollable Data Table Container */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              {/* Horizontal Scroll wrapper */}
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "1600px", borderCollapse: "collapse", textAlign: "left", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", color: "#475569", textTransform: "uppercase", fontSize: "10px", fontWeight: "700", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "12px 10px" }}>#</th>
                      <th style={{ padding: "12px 10px" }}>CASE ID</th>
                      <th style={{ padding: "12px 10px" }}>CANDIDATE NAME</th>
                      <th style={{ padding: "12px 10px" }}>CLIENT</th>
                      <th style={{ padding: "12px 10px" }}>CHECK TYPES</th>
                      <th style={{ padding: "12px 10px" }}>DOCUMENTS STATUS</th>
                      
                      {/* Verification Group Header */}
                      <th colSpan={6} style={{ padding: "12px 10px", textAlign: "center", background: "#e2e8f0", borderRight: "1px solid #cbd5e1" }}>VERIFICATION STATUS</th>
                      
                      <th style={{ padding: "12px 10px" }}>TL / VERIFIER</th>
                      <th colSpan={2} style={{ padding: "12px 10px", textAlign: "center", background: "#e2e8f0" }}>REPORTS</th>
                      <th style={{ padding: "12px 10px" }}>QC STATUS</th>
                      <th style={{ padding: "12px 10px" }}>LAST UPDATED</th>
                      <th style={{ padding: "12px 10px" }}>TAT</th>
                      <th style={{ padding: "12px 10px", textAlign: "center" }}>ACTION</th>
                    </tr>
                    <tr style={{ background: "#f8fafc", color: "#64748b", fontSize: "9px", borderBottom: "1px solid #e2e8f0" }}>
                      <th colSpan={6}></th>
                      <th style={{ padding: "6px" }}>IDENTITY</th>
                      <th style={{ padding: "6px" }}>EDUCATION</th>
                      <th style={{ padding: "6px" }}>EMPLOYMENT</th>
                      <th style={{ padding: "6px" }}>ADDRESS</th>
                      <th style={{ padding: "6px" }}>CRIMINAL</th>
                      <th style={{ padding: "6px", borderRight: "1px solid #cbd5e1" }}>DRUG TEST</th>
                      <th></th>
                      <th style={{ padding: "6px" }}>INTERIM</th>
                      <th style={{ padding: "6px" }}>FINAL</th>
                      <colSpan colSpan={4}></colSpan>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={18} style={{ padding: "24px", textAlign: "center", color: "#94a3b8" }}>Loading cases...</td></tr>
                    ) : filteredCases.length === 0 ? (
                      <tr><td colSpan={18} style={{ padding: "32px", textAlign: "center", color: "#94a3b8" }}>No records found.</td></tr>
                    ) : (
                      filteredCases.map((c, index) => (
                        <tr key={c.case_id || index} style={{ borderBottom: "1px solid #f1f5f9", height: "48px" }}>
                          <td style={{ padding: "10px", color: "#64748b" }}>{index + 1}</td>
                          <td style={{ padding: "10px", fontWeight: "700", color: "#2563eb" }}>{c.case_id || `BGV-250${index}`}</td>
                          <td style={{ padding: "10px", fontWeight: "600", color: "#1e293b" }}>{c.candidate || c.candidate_name || "Suraj Kumar"}</td>
                          <td style={{ padding: "10px", color: "#475569" }}>{c.client || c.client_name || "ABC Tech Pvt Ltd"}</td>
                          <td style={{ padding: "10px", color: "#475569" }}>6</td>
                          <td style={{ padding: "10px" }}>
                            <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "600" }}>Docs Received</span>
                          </td>

                          {/* Verification Badges */}
                          <td style={{ padding: "6px" }}><Badge status="Completed" /></td>
                          <td style={{ padding: "6px" }}><Badge status="Completed" /></td>
                          <td style={{ padding: "6px" }}><Badge status="In Review" /></td>
                          <td style={{ padding: "6px" }}><Badge status="Completed" /></td>
                          <td style={{ padding: "6px" }}><Badge status="N/A" /></td>
                          <td style={{ padding: "6px", borderRight: "1px solid #e2e8f0" }}><Badge status="Pending" /></td>

                          <td style={{ padding: "10px", color: "#475569" }}>Neha Sharma <br/><span style={{ fontSize: "10px", color: "#94a3b8" }}>(TL-Employment)</span></td>
                          
                          {/* Reports */}
                          <td style={{ padding: "10px", color: "#0d9488", fontWeight: "600" }}>Generated</td>
                          <td style={{ padding: "10px", color: "#94a3b8" }}>Not Generated</td>

                          {/* QC Status */}
                          <td style={{ padding: "10px" }}>
                            <span style={{
                              background: c.status === "approved" ? "#dcfce7" : c.status === "in-review" ? "#e0f2fe" : "#fef3c7",
                              color: c.status === "approved" ? "#15803d" : c.status === "in-review" ? "#0369a1" : "#b45309",
                              padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "10px"
                            }}>
                              {c.status ? c.status.toUpperCase() : "PENDING"}
                            </span>
                          </td>

                          <td style={{ padding: "10px", color: "#64748b", fontSize: "11px" }}>28 Apr 2025<br/>03:42 PM</td>
                          <td style={{ padding: "10px", color: "#ef4444", fontWeight: "600" }}>1d 4h</td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                              Actions ▾
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Pagination */}
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#64748b" }}>
                <div>Showing 1 to {filteredCases.length} of {cases.length || 156} entries</div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>&lt;</button>
                  <button style={{ border: "none", background: "#2563eb", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>1</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>2</button>
                  <button style={{ border: "1px solid #cbd5e1", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>&gt;</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </section>
    </>
  );
}

// Status Badges Component
function Badge({ status }) {
  const styles = {
    Completed: { bg: "#dcfce7", color: "#166534" },
    "In Review": { bg: "#fef3c7", color: "#92400e" },
    Pending: { bg: "#ffedd5", color: "#9a3412" },
    "N/A": { bg: "#f1f5f9", color: "#94a3b8" },
  };

  const current = styles[status] || styles["N/A"];

  return (
    <span style={{ background: current.bg, color: current.color, padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "600", display: "inline-block", textAlign: "center", width: "100%" }}>
      {status}
    </span>
  );
}
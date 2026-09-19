import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Settings() {
  return (
    <>
      <Sidebar />
      <section id="content">
        <Header />
        <main>
          <div className="dash-wrper">

            <div className="dash-upper-head">
              <div className="left">
                <h3 style={{ margin: 0, color: "#000", fontSize: "24px", fontWeight: 600 }}>Settings</h3>
              </div>
            </div>

            {/* Settings sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "16px" }}>

              {/* Profile */}
              <div className="quick-stats">
                <div className="stats-header"><h3>PROFILE</h3></div>
                <div className="stats-body" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Full Name</label>
                    <input type="text" defaultValue="Admin User" style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Email</label>
                    <input type="email" defaultValue="admin@bgvportal.com" style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Role</label>
                    <input type="text" defaultValue="Admin" disabled style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", background: "#f9f9f9" }} />
                  </div>
                  <button className="primary-cta export" style={{ width: "fit-content", marginTop: "8px" }}>Save Changes</button>
                </div>
              </div>

              {/* Change Password */}
              <div className="quick-stats">
                <div className="stats-header"><h3>CHANGE PASSWORD</h3></div>
                <div className="stats-body" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Current Password</label>
                    <input type="password" placeholder="••••••••" style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>New Password</label>
                    <input type="password" placeholder="••••••••" style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", color: "#888" }}>Confirm New Password</label>
                    <input type="password" placeholder="••••••••" style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" }} />
                  </div>
                  <button className="primary-cta export" style={{ width: "fit-content", marginTop: "8px" }}>Update Password</button>
                </div>
              </div>

              {/* Notifications */}
              <div className="quick-stats">
                <div className="stats-header"><h3>NOTIFICATIONS</h3></div>
                <div className="stats-body" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    "Email alerts for new cases",
                    "SLA breach warnings",
                    "QC rejection alerts",
                    "Daily summary report",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px" }}>{item}</span>
                      <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </section>
    </>
  );
}
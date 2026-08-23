import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AddressCheck() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    residencyType: "",
    yearsAtAddress: "",
    neighbourRefName: "",
    neighbourPhone: "",
    verificationMode: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    console.log("Draft Saved:", formData);
    alert("Draft saved successfully!");
  };

  const handleSaveAndMarkDone = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Saved and Marked Done!");

    // State reset after completion
    setFormData({
      address: "",
      city: "",
      state: "",
      pincode: "",
      residencyType: "",
      yearsAtAddress: "",
      neighbourRefName: "",
      neighbourPhone: "",
      verificationMode: "",
      remarks: "",
    });
  };

  return (
    <>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Layout Section */}
      <section id="content">
        <Header />

        <main>
          <div style={styles.container}>
            <form style={styles.card}>
              <h2 style={styles.title}>Address Verification Check</h2>

              {/* Row 1: Address & City */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ADDRESS</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 2: State & Pincode */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>STATE</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>PINCODE</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 3: Residency Type & Years At Address */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>RESIDENCY TYPE</label>
                  <select
                    name="residencyType"
                    value={formData.residencyType}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">— Select —</option>
                    <option value="Owned">Owned</option>
                    <option value="Rented">Rented</option>
                    <option value="Ancestral">Ancestral</option>
                    <option value="Company Provided">Company Provided</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>YEARS AT ADDRESS</label>
                  <input
                    type="text"
                    name="yearsAtAddress"
                    value={formData.yearsAtAddress}
                    onChange={handleChange}
                    placeholder="Enter years at address..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 4: Neighbour / Ref Name & Neighbour Phone */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>NEIGHBOUR / REF NAME</label>
                  <input
                    type="text"
                    name="neighbourRefName"
                    value={formData.neighbourRefName}
                    onChange={handleChange}
                    placeholder="Enter neighbour / ref name..."
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>NEIGHBOUR PHONE</label>
                  <input
                    type="tel"
                    name="neighbourPhone"
                    value={formData.neighbourPhone}
                    onChange={handleChange}
                    placeholder="Enter neighbour phone..."
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Row 5: Verification Mode */}
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>VERIFICATION MODE</label>
                  <select
                    name="verificationMode"
                    value={formData.verificationMode}
                    onChange={handleChange}
                    style={styles.select}
                  >
                    <option value="">— Select —</option>
                    <option value="Physical Visit">Physical Visit</option>
                    <option value="Postal / Digital">Postal / Digital</option>
                    <option value="Telephonic">Telephonic</option>
                  </select>
                </div>

                {/* Empty spacer */}
                <div style={styles.formGroup}></div>
              </div>

              {/* Row 6: Remarks */}
              <div style={styles.formGroupFull}>
                <label style={styles.label}>REMARKS</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks..."
                  rows={4}
                  style={styles.textarea}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  style={styles.btnSaveDraft}
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndMarkDone}
                  style={styles.btnSaveDone}
                >
                  ✓ Save & Mark Done
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px 28px",
    maxWidth: "850px",
    width: "100%",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    borderTop: "4px solid #1a237e",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "24px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  formGroup: {
    flex: "1 1 calc(50% - 10px)",
    display: "flex",
    flexDirection: "column",
    minWidth: "260px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    width: "100%",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "8px",
    letterSpacing: "0.4px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    resize: "vertical",
    minHeight: "90px",
  },
   buttonContainer: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
  },
  btnSaveDraft: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#23318c",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  btnSaveDone: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#475569",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
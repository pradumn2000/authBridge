import React, { useState } from "react";

export default function EmploymentCheck() {
  const [formData, setFormData] = useState({
    databasesChecked: "",
    matchFound: "",
    matchDetails: "",
    panVerified: "",
    aadhaarVerified: "",
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
    console.log("Draft Saved Data:", formData);
    alert("Draft saved successfully!");
  };

  const handleSaveAndMarkDone = (e) => {
    e.preventDefault();
    console.log("Final Submitted Data:", formData);
    alert("Submitted and Marked Done!");
    
    // Clear Form Fields After Submit
    setFormData({
      databasesChecked: "",
      matchFound: "",
      matchDetails: "",
      panVerified: "",
      aadhaarVerified: "",
      remarks: "",
    });
  };

  return (
    <div style={styles.container}>
      <form style={styles.card}>
        <h2 style={styles.title}>Database Check Verification</h2>
        
        {/* Row 1: Databases Checked & Match Found */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>DATABASES CHECKED</label>
            <input
              type="text"
              name="databasesChecked"
              value={formData.databasesChecked}
              onChange={handleChange}
              placeholder="Enter databases checked..."
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>MATCH FOUND?</label>
            <select
              name="matchFound"
              value={formData.matchFound}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Row 2: Match Details */}
        <div style={styles.formGroupFull}>
          <label style={styles.label}>MATCH DETAILS</label>
          <textarea
            name="matchDetails"
            value={formData.matchDetails}
            onChange={handleChange}
            placeholder="Enter match details..."
            rows={3}
            style={styles.textarea}
          />
        </div>

        {/* Row 3: PAN Verified & Aadhaar Verified */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>PAN VERIFIED?</label>
            <select
              name="panVerified"
              value={formData.panVerified}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>AADHAAR VERIFIED?</label>
            <select
              name="aadhaarVerified"
              value={formData.aadhaarVerified}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Row 4: Remarks */}
        <div style={styles.formGroupFull}>
          <label style={styles.label}>REMARKS</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter remarks..."
            rows={3}
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
  );
}

// Layout Styling
const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f4f7fe",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "28px",
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
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
    minWidth: "250px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
    width: "100%",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#4a5568",
    marginBottom: "8px",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
    resize: "vertical",
  },
  buttonContainer: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
  },
  btnSaveDraft: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#22338b",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
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
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
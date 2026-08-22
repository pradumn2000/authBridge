import React, { useState } from "react";

export default function CourtPoliceCheck() {
  const [formData, setFormData] = useState({
    courtsChecked: "",
    policeRecordCheck: "",
    caseDetails: "",
    state: "",
    district: "",
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

    // State reset
    setFormData({
      courtsChecked: "",
      policeRecordCheck: "",
      caseDetails: "",
      state: "",
      district: "",
      verificationMode: "",
      remarks: "",
    });
  };

  return (
    <div style={styles.container}>
      <form style={styles.card}>
        {/* Row 1: Courts Checked & Police Record Check */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>COURTS CHECKED</label>
            <input
              type="text"
              name="courtsChecked"
              value={formData.courtsChecked}
              onChange={handleChange}
              placeholder="Enter courts checked..."
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>POLICE RECORD CHECK</label>
            <select
              name="policeRecordCheck"
              value={formData.policeRecordCheck}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="Clear">Clear</option>
              <option value="Record Found">Record Found</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Row 2: Case Details (If Any) */}
        <div style={styles.formGroupFull}>
          <label style={styles.label}>CASE DETAILS (IF ANY)</label>
          <textarea
            name="caseDetails"
            value={formData.caseDetails}
            onChange={handleChange}
            placeholder="Enter case details (if any)..."
            rows={4}
            style={styles.textarea}
          />
        </div>

        {/* Row 3: State & District */}
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
            <label style={styles.label}>DISTRICT</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter district..."
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 4: Verification Mode */}
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
              <option value="Online Portal">Online Portal</option>
              <option value="Police Station Visit">Police Station Visit</option>
              <option value="Advocate Search">Advocate Search</option>
            </select>
          </div>

          <div style={styles.formGroup}></div>
        </div>

        {/* Row 5: Remarks */}
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
  );
}

// Inline Styles matching exact layout
const styles = {
  container: {
    padding: "30px 20px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px 28px",
    maxWidth: "850px",
    width: "100%",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    borderRight: "4px solid #1a237e",
    boxSizing: "border-box",
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
    marginBottom: "16px",
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
    backgroundColor: "#93a3be",
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
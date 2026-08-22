import React, { useState } from "react";

export default function MedicalCheck() {
  const [formData, setFormData] = useState({
    testType: "",
    labName: "",
    testDate: "",
    substancesTested: "",
    testResult: "",
    labReportRefNo: "",
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

    // Reset form after submit
    setFormData({
      testType: "",
      labName: "",
      testDate: "",
      substancesTested: "",
      testResult: "",
      labReportRefNo: "",
      remarks: "",
    });
  };

  return (
    <div style={styles.container}>
      <form style={styles.card}>
        {/* Row 1: Test Type & Lab Name */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>TEST TYPE</label>
            <select
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="5 Panel Drug Test">5 Panel Drug Test</option>
              <option value="10 Panel Drug Test">10 Panel Drug Test</option>
              <option value="General Health Checkup">General Health Checkup</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>LAB NAME</label>
            <input
              type="text"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              placeholder="Enter lab name..."
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 2: Test Date & Substances Tested */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>TEST DATE</label>
            <input
              type="date"
              name="testDate"
              value={formData.testDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>SUBSTANCES TESTED</label>
            <input
              type="text"
              name="substancesTested"
              value={formData.substancesTested}
              onChange={handleChange}
              placeholder="Enter substances tested..."
              style={styles.input}
            />
          </div>
        </div>

        {/* Row 3: Test Result & Lab Report Ref No. */}
        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>TEST RESULT</label>
            <select
              name="testResult"
              value={formData.testResult}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">— Select —</option>
              <option value="Negative / Passed">Negative / Passed</option>
              <option value="Positive / Failed">Positive / Failed</option>
              <option value="Inconclusive">Inconclusive</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>LAB REPORT REF NO.</label>
            <input
              type="text"
              name="labReportRefNo"
              value={formData.labReportRefNo}
              onChange={handleChange}
              placeholder="Enter lab report ref no...."
              style={styles.input}
            />
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

// Inline Styles strictly matching design
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
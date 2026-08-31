import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

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
    <>
      {/* Dynamic CSS Styles inside single file */}
      <style>{`
        .mc-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
        }

        .mc-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px 28px;
          max-width: 850px;
          width: 100%;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
          border-top: 4px solid #1a237e;
          box-sizing: border-box;
        }

        .mc-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a237e;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mc-row {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .mc-form-group {
          flex: 1 1 calc(50% - 10px);
          display: flex;
          flex-direction: column;
          min-width: 260px;
        }

        .mc-form-group-full {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          width: 100%;
        }

        .mc-label {
          font-size: 12px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.4px;
        }

        .mc-input,
        .mc-select,
        .mc-textarea {
          padding: 10px 14px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          font-size: 14px;
          color: #1f2937;
          outline: none;
        }

        .mc-select {
          cursor: pointer;
        }

        .mc-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .mc-input:focus,
        .mc-select:focus,
        .mc-textarea:focus {
          border-color: #1a237e;
          background-color: #ffffff;
        }

        .mc-button-container {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .mc-btn-draft,
        .mc-btn-done {
          flex: 1;
          padding: 12px 20px;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s ease;
        }

        .mc-btn-draft {
          background-color: #23318c;
        }

        .mc-btn-done {
          background-color: #93a3be;
        }

        .mc-btn-draft:hover,
        .mc-btn-done:hover {
          opacity: 0.9;
        }
      `}</style>

      <Sidebar />
      <section id="content">
        <Header />

        <main>
          <div className="mc-container">
            <form className="mc-card">
              <h2 className="mc-title">Medical & Drug Check</h2>

              {/* Row 1: Test Type & Lab Name */}
              <div className="mc-row">
                <div className="mc-form-group">
                  <label className="mc-label">TEST TYPE</label>
                  <select
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
                    className="mc-select"
                  >
                    <option value="">— Select —</option>
                    <option value="5 Panel Drug Test">5 Panel Drug Test</option>
                    <option value="10 Panel Drug Test">10 Panel Drug Test</option>
                    <option value="General Health Checkup">General Health Checkup</option>
                  </select>
                </div>

                <div className="mc-form-group">
                  <label className="mc-label">LAB NAME</label>
                  <input
                    type="text"
                    name="labName"
                    value={formData.labName}
                    onChange={handleChange}
                    placeholder="Enter lab name..."
                    className="mc-input"
                  />
                </div>
              </div>

              {/* Row 2: Test Date & Substances Tested */}
              <div className="mc-row">
                <div className="mc-form-group">
                  <label className="mc-label">TEST DATE</label>
                  <input
                    type="date"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleChange}
                    className="mc-input"
                  />
                </div>

                <div className="mc-form-group">
                  <label className="mc-label">SUBSTANCES TESTED</label>
                  <input
                    type="text"
                    name="substancesTested"
                    value={formData.substancesTested}
                    onChange={handleChange}
                    placeholder="Enter substances tested..."
                    className="mc-input"
                  />
                </div>
              </div>

              {/* Row 3: Test Result & Lab Report Ref No. */}
              <div className="mc-row">
                <div className="mc-form-group">
                  <label className="mc-label">TEST RESULT</label>
                  <select
                    name="testResult"
                    value={formData.testResult}
                    onChange={handleChange}
                    className="mc-select"
                  >
                    <option value="">— Select —</option>
                    <option value="Negative / Passed">Negative / Passed</option>
                    <option value="Positive / Failed">Positive / Failed</option>
                    <option value="Inconclusive">Inconclusive</option>
                  </select>
                </div>

                <div className="mc-form-group">
                  <label className="mc-label">LAB REPORT REF NO.</label>
                  <input
                    type="text"
                    name="labReportRefNo"
                    value={formData.labReportRefNo}
                    onChange={handleChange}
                    placeholder="Enter lab report ref no...."
                    className="mc-input"
                  />
                </div>
              </div>

              {/* Row 4: Remarks */}
              <div className="mc-form-group-full">
                <label className="mc-label">REMARKS</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks..."
                  rows={4}
                  className="mc-textarea"
                />
              </div>

              {/* Action Buttons */}
              <div className="mc-button-container">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="mc-btn-draft"
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndMarkDone}
                  className="mc-btn-done"
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
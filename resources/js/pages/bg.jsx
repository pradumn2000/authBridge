import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Check, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Download 
} from 'lucide-react';

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#1e293b' },
  stepBadge: { fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' },
  stepHeaderTitle: { fontSize: '20px', fontWeight: '700', margin: '4px 0 8px 0' },
  subtitle: { fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  sectionBox: { border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', backgroundColor: '#ffffff' },
  sectionBoxAmber: { border: '1px solid #fcd34d', borderRadius: '12px', padding: '16px', backgroundColor: '#fffbeb', marginTop: '16px' },
  sectionTitle: { fontSize: '14px', fontWeight: '700', margin: 0, color: '#0f172a' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' },
  input: { width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' },
  docGrid: { display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(150px, 1fr) )', gap: '12px', marginTop: '8px' },
  docBox: { border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#f8fafc' },
  uploadBtnLabel: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#2563eb', cursor: 'pointer', fontWeight: '600' },
  btnDashedAdd: { width: '100%', padding: '10px', border: '1px dashed #94a3b8', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#334155', fontWeight: '600', cursor: 'pointer', fontSize: '13px' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  btnSecondary: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  btnAccept: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#059669', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  btnFlag: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#ffffff', color: '#dc2626', border: '1px solid #fca5a5', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  btnOutlineFull: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#2563eb', border: '1px solid #2563eb', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', marginTop: '16px' },
  flexRowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  flexColumnGap: { display: 'flex', flexDirection: 'column' },
  progressBarBg: { width: '100%', backgroundColor: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' },
  progressBarFill: { width: '96%', backgroundColor: '#2563eb', height: '100%' },
  ocrRow: { display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '8px 16px', fontSize: '12px', alignItems: 'center' },
  badgeGreen: { color: '#059669', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' },
  successIconCircle: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }
};

export default function VerificationFlow() {
  const [currentStep, setCurrentStep] = useState(4);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  // Personal Info State
  const [personalDetails] = useState({
    fullName: 'Aarav Sharma',
    mobile: '+91 98765 43210',
    email: 'aarav.sharma@example.com'
  });

  // Employer Details State
  const [employers, setEmployers] = useState([
    { doe: '', documents: [null, null, null, null] }
  ]);

  // Education Details State
  const [educationList, setEducationList] = useState([
    { level: '', degree: '', institute: '', board: '', yearOfPassing: '', score: '', documents: [null, null, null, null] }
  ]);

  // Document Upload State
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Degree_Certificate.pdf',
    status: 'Verified via OCR',
    ocrData: [
      { label: 'Candidate Name', value: 'Aarav Sharma' },
      { label: 'Degree Name', value: 'Bachelor of Technology' },
      { label: 'Passing Year', value: '2022' }
    ]
  });

  // Navigation Handlers
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Employer Handlers
  const handleEmployerChange = (idx, field, value) => {
    const updated = [...employers];
    updated[idx][field] = value;
    setEmployers(updated);
  };

  const handleFileUpload = (empIdx, docIdx, file) => {
    const updated = [...employers];
    updated[empIdx].documents[docIdx] = file;
    setEmployers(updated);
  };

  const addEmployer = () => {
    setEmployers([...employers, { doe: '', documents: [null, null, null, null] }]);
  };

  // Education Handlers
  const handleEducationChange = (idx, field, value) => {
    const updated = [...educationList];
    updated[idx][field] = value;
    setEducationList(updated);
  };

  const handleEduFileUpload = (eduIdx, docIdx, file) => {
    const updated = [...educationList];
    updated[eduIdx].documents[docIdx] = file;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { level: '', degree: '', institute: '', board: '', yearOfPassing: '', score: '', documents: [null, null, null, null] }
    ]);
  };

  const removeEducation = (idx) => {
    setEducationList(educationList.filter((_, i) => i !== idx));
  };

  return (
    <div style={styles.container}>
      {/* STEP 4: EDUCATION DETAILS */}
      {currentStep === 4 && (
        <div>
          <span style={styles.stepBadge}>Step 4 of 7</span>
          <h2 style={styles.stepHeaderTitle}>Education Details</h2>
          <p style={styles.subtitle}>Provide details for all qualification levels.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
            {educationList.map((edu, idx) => (
              <div key={idx} style={{ ...styles.sectionBox, position: 'relative' }}>
                
                {/* Header & Remove Action */}
                <div style={{ ...styles.flexRowBetween, marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                  <h3 style={styles.sectionTitle}>Education #{idx + 1}</h3>
                  {educationList.length > 1 && (
                    <button 
                      onClick={() => removeEducation(idx)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <X size={14} /> Remove
                    </button>
                  )}
                </div>

                {/* Form Fields Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={styles.label}>Qualification Level *</label>
                    <select 
                      style={styles.input} 
                      value={edu.level} 
                      onChange={(e) => handleEducationChange(idx, 'level', e.target.value)}
                    >
                      <option value="">Select Level</option>
                      <option value="10th">10th Standard / Secondary</option>
                      <option value="12th">12th Standard / Higher Secondary</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduation">Graduation / Bachelor's</option>
                      <option value="PostGraduation">Post Graduation / Master's</option>
                      <option value="Doctorate">Doctorate / Ph.D.</option>
                    </select>
                  </div>

                  <div>
                    <label style={styles.label}>Degree / Course Name *</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      placeholder="e.g. B.Tech / B.Sc / B.Com" 
                      value={edu.degree} 
                      onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)} 
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Institute / School Name *</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      placeholder="e.g. Delhi University" 
                      value={edu.institute} 
                      onChange={(e) => handleEducationChange(idx, 'institute', e.target.value)} 
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Board / University *</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      placeholder="e.g. CBSE / State Board" 
                      value={edu.board} 
                      onChange={(e) => handleEducationChange(idx, 'board', e.target.value)} 
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Year of Passing *</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      placeholder="e.g. 2022" 
                      value={edu.yearOfPassing} 
                      onChange={(e) => handleEducationChange(idx, 'yearOfPassing', e.target.value)} 
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Percentage / CGPA *</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      placeholder="e.g. 85% or 8.5" 
                      value={edu.score} 
                      onChange={(e) => handleEducationChange(idx, 'score', e.target.value)} 
                    />
                  </div>
                </div>

                {/* Document Upload Grid */}
                <div>
                  <label style={styles.label}>Documents * (Upload up to 4 documents)</label>
                  <div style={styles.docGrid}>
                    {[1, 2, 3, 4].map((docNum, dIdx) => (
                      <div key={dIdx} style={styles.docBox}>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                          Document {docNum}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                          PDF, JPG, PNG (Max 10MB)
                        </div>
                        <label style={styles.uploadBtnLabel}>
                          <Upload size={14} /> Choose File
                          <input 
                            type="file" 
                            style={{ display: 'none' }} 
                            accept=".pdf,.jpg,.jpeg,.png" 
                            onChange={(e) => handleEduFileUpload(idx, dIdx, e.target.files[0])} 
                          />
                        </label>
                        {edu.documents && edu.documents[dIdx] && (
                          <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {edu.documents[dIdx].name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

            <button onClick={addEducation} style={styles.btnDashedAdd}>+ Add Education</button>
          </div>

          <div style={styles.footer}>
            <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
            <button onClick={nextStep} style={styles.btnPrimary}>
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: DOCUMENT UPLOAD */}
      {currentStep === 5 && (
        <div>
          <span style={styles.stepBadge}>Step 5 of 7</span>
          <h2 style={styles.stepHeaderTitle}>Document Upload</h2>
          <p style={styles.subtitle}>Upload a supporting certificate. Our AI will extract and verify content automatically.</p>

          {uploadedFile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ ...styles.sectionBox, ...styles.flexRowBetween, padding: '12px 16px', margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText color="#2563eb" size={24} />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{uploadedFile.name}</h4>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{uploadedFile.status}</span>
                  </div>
                </div>
                <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setUploadedFile(null)} />
              </div>

              <div style={styles.sectionBox}>
                <div style={{ ...styles.flexRowBetween, marginBottom: '8px' }}>
                  <span style={styles.label}>AI Confidence Score</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>96%</span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={styles.progressBarFill} />
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={styles.label}>OCR Extracted Fields</span>
                </div>
                {uploadedFile.ocrData.map((row, i) => (
                  <div key={i} style={{ ...styles.ocrRow, borderBottom: i < uploadedFile.ocrData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <span style={{ color: '#64748b' }}>{row.label}</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{row.value}</span>
                    <span style={styles.badgeGreen}>✓ Match</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button style={styles.btnAccept}>
                  <Check size={16} /> Auto Accept
                </button>
                <button style={styles.btnFlag}>
                  <Eye size={16} /> Flag for Review
                </button>
              </div>
            </div>
          )}

          <div style={styles.footer}>
            <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
            <button onClick={nextStep} style={styles.btnPrimary}>
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: REVIEW & SUBMIT */}
      {currentStep === 6 && (
        <div>
          <span style={styles.stepBadge}>Step 6 of 7</span>
          <h2 style={styles.stepHeaderTitle}>Review & Submit</h2>
          <p style={styles.subtitle}>Verify all information before submitting your verification request.</p>

          <div style={styles.sectionBox}>
            <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
              <span onClick={() => setCurrentStep(3)} style={{ color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div><span style={{ color: '#94a3b8' }}>Full Name</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.fullName}</p></div>
              <div><span style={{ color: '#94a3b8' }}>Mobile</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.mobile}</p></div>
              <div><span style={{ color: '#94a3b8' }}>Email</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.email}</p></div>
            </div>
          </div>

          <div style={styles.sectionBoxAmber}>
            <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} style={{ marginTop: '2px' }} />
              <span style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
                I hereby declare that all information provided is true and accurate to the best of my knowledge.
              </span>
            </label>
          </div>

          <div style={styles.footer}>
            <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
            <button onClick={nextStep} disabled={!declarationAccepted} style={{ ...styles.btnPrimary, opacity: declarationAccepted ? 1 : 0.5, cursor: declarationAccepted ? 'pointer' : 'not-allowed' }}>
              <span>Submit for Verification</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: VERIFICATION SUBMITTED */}
      {currentStep === 7 && (
        <div style={{ textAlign: 'center' }}>
          <div style={styles.successIconCircle}>
            <Check size={36} />
          </div>
          <h2 style={styles.stepHeaderTitle}>Verification Submitted</h2>
          <p style={{ ...styles.subtitle, fontSize: '13px' }}>
            Your background verification request has been submitted. We will notify you at <b>{personalDetails.email}</b>.
          </p>

          <div style={{ ...styles.sectionBox, textAlign: 'left' }}>
            <h3 style={styles.sectionTitle}>Reference Details</h3>
            <div style={{ ...styles.flexColumnGap, gap: '8px', fontSize: '13px', marginTop: '12px' }}>
              <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Case ID</span><span style={{ fontFamily: 'monospace', fontWeight: '700' }}>BGV-2024-08734</span></div>
              <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Submitted</span><span style={{ fontWeight: '700' }}>25 August 2026</span></div>
              <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Company</span><span style={{ fontWeight: '700' }}>Accenture Solutions Pvt. Ltd.</span></div>
            </div>
          </div>

          <button style={styles.btnOutlineFull}>
            <Download size={16} /> Download Acknowledgment PDF
          </button>
        </div>
      )}
    </div>
  );
}
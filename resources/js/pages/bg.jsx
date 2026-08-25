import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Upload, 
  FileText, 
  X, 
  GraduationCap, 
  Briefcase, 
  Phone, 
  Mail, 
  Clock, 
  Download,
  Eye
} from 'lucide-react';

export default function CandidateVerificationWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form States
  const [dpdpAccepted, setDpdpAccepted] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Priya Sharma',
    dob: '',
    gender: '',
    mobile: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    currentAddress: '',
    permanentAddress: '',
    panNumber: '',
    aadhaarNumber: ''
  });

  // Step 4 Tabs: 'education' | 'employment'
  const [step4Tab, setStep4Tab] = useState('education');
  const [qualifications, setQualifications] = useState([
    { university: '', degree: '', passingYear: '' }
  ]);
  const [employers, setEmployers] = useState([
    { company: '', designation: '', employeeId: '', joiningDate: '', leavingDate: '', hrContact: '' }
  ]);

  // Step 5 Document Upload State
  const [uploadedFile, setUploadedFile] = useState({
    name: 'CLIENT PORTAL.png',
    status: 'Uploaded · OCR complete',
    confidenceScore: 96,
    ocrData: [
      { label: 'Full Name', value: 'PRIYA SHARMA' },
      { label: 'Date of Birth', value: '14 March 1997' },
      { label: 'Issuing Authority', value: 'UNIVERSITY OF MUMBAI' },
      { label: 'Degree', value: 'Bachelor of Engineering' },
      { label: 'Passing Year', value: '2019' },
      { label: 'Roll Number', value: 'MU-ENG-2019-04782' }
    ],
    matches: ['Name Match', 'Date Match', 'Institution'],
    forgeryStatus: 'Low — No anomalies detected'
  });

  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const addQualification = () => {
    setQualifications([...qualifications, { university: '', degree: '', passingYear: '' }]);
  };

  const addEmployer = () => {
    setEmployers([...employers, { company: '', designation: '', employeeId: '', joiningDate: '', leavingDate: '', hrContact: '' }]);
  };

  // Stepper Header (Steps 2 to 7)
  const renderStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 0', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5, 6, 7].map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        return (
          <React.Fragment key={step}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s',
                backgroundColor: isCompleted ? '#059669' : isCurrent ? '#2563eb' : '#f1f5f9',
                color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
                boxShadow: isCurrent ? '0 0 0 4px #dbeafe' : 'none'
              }}
            >
              {isCompleted ? <Check size={16} /> : step}
            </div>
            {step < 7 && (
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: step < currentStep ? '#059669' : '#e2e8f0'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // Common UI Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    },
    card: {
      width: '100%',
      maxWidth: '640px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f1f5f9',
      overflow: 'hidden'
    },
    innerPadding: {
      padding: '32px'
    },
    sectionBox: {
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '12px'
    },
    label: {
      display: 'block',
      fontSize: '11px',
      fontWeight: '700',
      color: '#64748b',
      textTransform: 'uppercase',
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginTop: '12px'
    },
    btnPrimary: {
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '14px',
      padding: '10px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    btnSecondary: {
      backgroundColor: 'transparent',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #f1f5f9',
      marginTop: '24px'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* INITIAL LAUNCH BUTTON */}
      {!isOpen ? (
        <div style={{ ...styles.card, padding: '32px', textCenter: 'center', textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Candidate Verification Portal</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Start the 7-step identity, education, document, and background verification process.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            style={{ ...styles.btnPrimary, width: '100%', justifyContent: 'center' }}
          >
            <span>Start Verification Flow</span>
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        /* WIZARD CONTAINER */
        <div style={styles.card}>
          
          {/* STEPPER HEADER */}
          {currentStep > 1 && currentStep < 7 && renderStepper()}

          <div style={styles.innerPadding}>

            {/* STEP 1: WELCOME SCREEN */}
            {currentStep === 1 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <ShieldCheck size={36} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 1 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Background Verification</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                  Welcome! Please complete your background verification to proceed with your onboarding process.
                </p>

                <div style={{ ...styles.sectionBox, backgroundColor: '#f8fafc', textAlign: 'left' }}>
                  <h3 style={styles.sectionTitle}>Before you begin, ensure you have:</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Government ID (Aadhaar / PAN card)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Educational Certificates (Degree / Marksheets)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>✓</div>
                      <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Employment details & HR contact information</span>
                    </div>
                  </div>
                </div>

                <div style={styles.footer}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated time: ~5 minutes</span>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Begin Verification</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONSENT & VERIFICATION */}
            {currentStep === 2 && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 2 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Consent & Verification</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Verify your mobile number and provide consent under DPDP Act.</p>

                {/* Mobile OTP Box */}
                <div style={styles.sectionBox}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={styles.label}>Mobile Number Verification</label>
                    <span style={{ fontSize: '12px', color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>✓ Mobile Verified</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input key={i} type="text" value="•" readOnly style={{ width: '40px', height: '40px', border: '1px solid #cbd5e1', borderRadius: '8px', textAlign: 'center', fontSize: '18px', fontWeight: '700', backgroundColor: '#f8fafc' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                    <span>Enter 6-digit OTP sent to +91 98765 43210</span>
                    <span style={{ color: '#2563eb', cursor: 'pointer' }}>Resend OTP</span>
                  </div>
                </div>

                {/* DPDP Consent */}
                <div style={{ ...styles.sectionBox, backgroundColor: '#f8fafc' }}>
                  <label style={styles.label}>Data Protection Consent (DPDP Act 2023)</label>
                  <div style={{ height: '120px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', backgroundColor: '#ffffff', fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                    In accordance with the Digital Personal Data Protection Act, 2023, by checking the box below, you explicitly consent to the collection, processing, and sharing of your personal, educational, and professional data for background verification.
                  </div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '12px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={dpdpAccepted} onChange={(e) => setDpdpAccepted(e.target.checked)} style={{ marginTop: '3px' }} />
                    <span style={{ fontSize: '12px', color: '#475569' }}>I have read and agree to the data protection consent terms and authorize background checks.</span>
                  </label>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} disabled={!dpdpAccepted} style={{ ...styles.btnPrimary, opacity: dpdpAccepted ? 1 : 0.5, cursor: dpdpAccepted ? 'pointer' : 'not-allowed' }}>
                    <span>Give Consent & Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PERSONAL & IDENTITY */}
            {currentStep === 3 && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 3 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Personal & Identity</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Provide your personal details and government identity documents.</p>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Personal Details</h3>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={styles.label}>Full Name (As per Aadhaar)</label>
                    <input type="text" value={personalDetails.fullName} onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })} style={styles.input} />
                  </div>
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Date of Birth</label>
                      <input type="date" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>Gender</label>
                      <select style={styles.input}>
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                  </div>
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Mobile</label>
                      <input type="text" value={personalDetails.mobile} readOnly style={{ ...styles.input, backgroundColor: '#f8fafc' }} />
                    </div>
                    <div>
                      <label style={styles.label}>Email</label>
                      <input type="email" value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} style={styles.input} />
                    </div>
                  </div>
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Address</h3>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={styles.label}>Current Address</label>
                    <textarea placeholder="Flat/House No., Street, Area, City, State — PIN" style={{ ...styles.input, height: '60px', resize: 'none' }} />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
                    <input type="checkbox" />
                    <span style={{ fontSize: '12px', color: '#475569' }}>Permanent address same as current</span>
                  </label>
                  <div>
                    <label style={styles.label}>Permanent Address</label>
                    <textarea placeholder="Flat/House No., Street, Area, City, State — PIN" style={{ ...styles.input, height: '60px', resize: 'none' }} />
                  </div>
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Identity Documents</h3>
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>PAN Number</label>
                      <input type="text" placeholder="ABCDE1234F" style={{ ...styles.input, textTransform: 'uppercase' }} />
                    </div>
                    <div>
                      <label style={styles.label}>Aadhaar Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX" style={styles.input} />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', border: '1px solid #fde68a', backgroundColor: '#fffbeb', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>DigiLocker</h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Fetch Aadhaar & other govt. documents</p>
                    </div>
                    <button style={{ backgroundColor: '#ea580c', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Connect</button>
                  </div>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} style={styles.btnPrimary}>
                    <span>Verify Identity</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: EDUCATION & EMPLOYMENT */}
            {currentStep === 4 && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 4 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Education & Employment</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Add your qualifications and professional history.</p>

                {/* Sub Tab Navigation */}
                <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px', backgroundColor: '#f8fafc', marginBottom: '20px' }}>
                  <button
                    onClick={() => setStep4Tab('education')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: step4Tab === 'education' ? '#0f172a' : 'transparent',
                      color: step4Tab === 'education' ? '#ffffff' : '#475569'
                    }}
                  >
                    <GraduationCap size={16} /> Education
                  </button>
                  <button
                    onClick={() => setStep4Tab('employment')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: step4Tab === 'employment' ? '#0f172a' : 'transparent',
                      color: step4Tab === 'employment' ? '#ffffff' : '#475569'
                    }}
                  >
                    <Briefcase size={16} /> Employment
                  </button>
                </div>

                {step4Tab === 'education' ? (
                  <div>
                    {qualifications.map((_, idx) => (
                      <div key={idx} style={styles.sectionBox}>
                        <h3 style={styles.sectionTitle}>Qualification {idx + 1}</h3>
                        <div style={{ marginBottom: '12px' }}>
                          <label style={styles.label}>University / Institution</label>
                          <input type="text" placeholder="e.g. University of Mumbai" style={styles.input} />
                        </div>
                        <div style={styles.grid2}>
                          <div>
                            <label style={styles.label}>Qualification</label>
                            <select style={styles.input}>
                              <option value="">Select degree</option>
                              <option value="btech">Bachelor of Engineering</option>
                            </select>
                          </div>
                          <div>
                            <label style={styles.label}>Passing Year</label>
                            <input type="text" placeholder="2019" style={styles.input} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addQualification} style={{ width: '100%', border: '2px dashed #cbd5e1', backgroundColor: 'transparent', color: '#2563eb', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ Add Qualification</button>
                  </div>
                ) : (
                  <div>
                    {employers.map((_, idx) => (
                      <div key={idx} style={styles.sectionBox}>
                        <h3 style={styles.sectionTitle}>Employer {idx + 1}</h3>
                        <div style={{ marginBottom: '12px' }}>
                          <label style={styles.label}>Company Name</label>
                          <input type="text" placeholder="e.g. Tata Consultancy Services" style={styles.input} />
                        </div>
                        <div style={styles.grid2}>
                          <div>
                            <label style={styles.label}>Designation</label>
                            <input type="text" placeholder="e.g. Software Engineer" style={styles.input} />
                          </div>
                          <div>
                            <label style={styles.label}>Employee ID</label>
                            <input type="text" placeholder="TCS20XXXX" style={styles.input} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addEmployer} style={{ width: '100%', border: '2px dashed #cbd5e1', backgroundColor: 'transparent', color: '#2563eb', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ Add Employer</button>
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

            {/* STEP 5: DOCUMENT UPLOAD */}
            {currentStep === 5 && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 5 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Document Upload</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Upload a supporting certificate. Our AI will extract and verify content automatically.</p>

                {uploadedFile && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ ...styles.sectionBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', margin: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText color="#2563eb" size={24} />
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{uploadedFile.name}</h4>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{uploadedFile.status}</span>
                        </div>
                      </div>
                      <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setUploadedFile(null)} />
                    </div>

                    {/* AI Confidence */}
                    <div style={styles.sectionBox}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={styles.label}>AI Confidence Score</span>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>96%</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '96%', height: '100%', backgroundColor: '#059669' }} />
                      </div>
                    </div>

                    {/* OCR Data */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>
                        <span style={styles.label}>OCR Extracted Fields</span>
                      </div>
                      {uploadedFile.ocrData.map((row, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < uploadedFile.ocrData.length - 1 ? '1px solid #f1f5f9' : 'none', fontSize: '13px' }}>
                          <span style={{ color: '#64748b' }}>{row.label}</span>
                          <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{row.value}</span>
                          <span style={{ color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>✓ Match</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <button style={{ backgroundColor: '#059669', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Check size={16} /> Auto Accept
                      </button>
                      <button style={{ backgroundColor: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Step 6 of 7</span>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Review & Submit</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Verify all information before submitting your verification request.</p>

                <div style={styles.sectionBox}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={styles.sectionTitle}>Personal Information</h3>
                    <span onClick={() => setCurrentStep(3)} style={{ color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div><span style={{ color: '#94a3b8' }}>Full Name</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.fullName}</p></div>
                    <div><span style={{ color: '#94a3b8' }}>Mobile</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.mobile}</p></div>
                    <div><span style={{ color: '#94a3b8' }}>Email</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.email}</p></div>
                  </div>
                </div>

                <div style={{ ...styles.sectionBox, backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
                  <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} style={{ marginTop: '2px' }} />
                    <span style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
                      I hereby declare that all information provided is true and accurate to the best of my knowledge.
                    </span>
                  </label>
                </div>

                <div style={styles.footer}>
                  <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
                  <button onClick={nextStep} disabled={!declarationAccepted} style={{ ...styles.btnPrimary, opacity: declarationAccepted ? 1 : 0.5 }}>
                    <span>Submit for Verification</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: VERIFICATION SUBMITTED */}
            {currentStep === 7 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Check size={36} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '4px 0' }}>Verification Submitted</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>
                  Your background verification request has been submitted. We will notify you at <b>{personalDetails.email}</b>.
                </p>

                <div style={{ ...styles.sectionBox, textAlign: 'left' }}>
                  <h3 style={styles.sectionTitle}>Reference Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Case ID</span><span style={{ fontFamily: 'monospace', fontWeight: '700' }}>BGV-2024-08734</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Submitted</span><span style={{ fontWeight: '700' }}>25 August 2026</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Company</span><span style={{ fontWeight: '700' }}>Accenture Solutions Pvt. Ltd.</span></div>
                  </div>
                </div>

                <button style={{ ...styles.btnSecondary, border: '1px solid #cbd5e1', width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '8px', marginTop: '16px' }}>
                  <Download size={16} /> Download Acknowledgment PDF
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
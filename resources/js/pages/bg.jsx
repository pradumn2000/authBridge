// import React, { useState } from 'react';
// import { 
//   Check, 
//   ChevronRight, 
//   ChevronLeft, 
//   ShieldCheck, 
//   Upload, 
//   FileText, 
//   X, 
//   GraduationCap, 
//   Briefcase, 
//   Eye,
//   Download
// } from 'lucide-react';

// export default function CandidateVerificationWizard() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   // Form States
//   const [dpdpAccepted, setDpdpAccepted] = useState(false);
//   const [personalDetails, setPersonalDetails] = useState({
//     fullName: 'Priya Sharma',
//     dob: '',
//     gender: '',
//     mobile: '+91 98765 43210',
//     email: 'priya.sharma@email.com',
//     currentAddress: '',
//     permanentAddress: '',
//     panNumber: '',
//     aadhaarNumber: ''
//   });

//   // Step 4 Tabs: 'education' | 'employment'
//   const [step4Tab, setStep4Tab] = useState('education');
//   const [qualifications, setQualifications] = useState([
//     { university: '', degree: '', passingYear: '' }
//   ]);
  
//   // Employment state
//   const [employers, setEmployers] = useState([
//     { 
//       companyName: '', 
//       designation: '', 
//       employeeId: '', 
//       hrEmail: '', 
//       hrPhoneCode: '+91',
//       hrPhone: '', 
//       doj: '', 
//       doe: '',
//       documents: [null, null, null, null]
//     }
//   ]);

//   // Step 5 Document Upload State
//   const [uploadedFile, setUploadedFile] = useState({
//     name: 'CLIENT PORTAL.png',
//     status: 'Uploaded · OCR complete',
//     confidenceScore: 96,
//     ocrData: [
//       { label: 'Full Name', value: 'PRIYA SHARMA' },
//       { label: 'Date of Birth', value: '14 March 1997' },
//       { label: 'Issuing Authority', value: 'UNIVERSITY OF MUMBAI' },
//       { label: 'Degree', value: 'Bachelor of Engineering' },
//       { label: 'Passing Year', value: '2019' },
//       { label: 'Roll Number', value: 'MU-ENG-2019-04782' }
//     ],
//     matches: ['Name Match', 'Date Match', 'Institution'],
//     forgeryStatus: 'Low — No anomalies detected'
//   });

//   const [declarationAccepted, setDeclarationAccepted] = useState(false);

//   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
//   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

//   const addQualification = () => {
//     setQualifications([...qualifications, { university: '', degree: '', passingYear: '' }]);
//   };

//   const addEmployer = () => {
//     setEmployers([
//       ...employers, 
//       { 
//         companyName: '', 
//         designation: '', 
//         employeeId: '', 
//         hrEmail: '', 
//         hrPhoneCode: '+91',
//         hrPhone: '', 
//         doj: '', 
//         doe: '',
//         documents: [null, null, null, null]
//       }
//     ]);
//   };

//   const handleEmployerChange = (index, field, value) => {
//     const updated = [...employers];
//     updated[index][field] = value;
//     setEmployers(updated);
//   };

//   const handleFileUpload = (empIndex, docIndex, file) => {
//     const updated = [...employers];
//     updated[empIndex].documents[docIndex] = file;
//     setEmployers(updated);
//   };

//   // Internal CSS Styles Object
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '16px',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       color: '#1e293b'
//     },
//     card: {
//       width: '100%',
//       maxWidth: '850px',
//       backgroundColor: '#ffffff',
//       borderRadius: '16px',
//       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #f1f5f9',
//       overflow: 'hidden'
//     },
//     initialCard: {
//       width: '100%',
//       maxWidth: '400px',
//       backgroundColor: '#ffffff',
//       borderRadius: '16px',
//       padding: '32px',
//       textAlign: 'center',
//       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #f1f5f9'
//     },
//     iconHeaderCircle: {
//       width: '64px',
//       height: '64px',
//       backgroundColor: '#eff6ff',
//       color: '#2563eb',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 16px auto'
//     },
//     step1IconCircle: {
//       width: '64px',
//       height: '64px',
//       backgroundColor: '#dbeafe',
//       color: '#2563eb',
//       borderRadius: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 16px auto'
//     },
//     successIconCircle: {
//       width: '64px',
//       height: '64px',
//       backgroundColor: '#d1fae5',
//       color: '#059669',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 16px auto'
//     },
//     badgeCheck: {
//       width: '20px',
//       height: '20px',
//       borderRadius: '50%',
//       backgroundColor: '#d1fae5',
//       color: '#059669',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '12px',
//       fontWeight: '700'
//     },
//     innerPadding: {
//       padding: '32px'
//     },
//     stepperContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       padding: '16px 0',
//       marginBottom: '16px'
//     },
//     stepperLine: {
//       width: '24px',
//       height: '2px'
//     },
//     mainTitle: {
//       fontSize: '20px',
//       fontWeight: '700',
//       color: '#0f172a',
//       marginBottom: '8px'
//     },
//     stepHeaderTitle: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: '#0f172a',
//       margin: '4px 0'
//     },
//     subtitle: {
//       color: '#64748b',
//       fontSize: '14px',
//       marginBottom: '24px'
//     },
//     stepBadge: {
//       fontSize: '12px',
//       fontWeight: '700',
//       color: '#2563eb',
//       textTransform: 'uppercase'
//     },
//     sectionBox: {
//       border: '1px solid #e2e8f0',
//       borderRadius: '12px',
//       padding: '20px',
//       marginBottom: '16px'
//     },
//     sectionBoxGray: {
//       border: '1px solid #e2e8f0',
//       borderRadius: '12px',
//       padding: '20px',
//       marginBottom: '16px',
//       backgroundColor: '#f8fafc'
//     },
//     sectionBoxAmber: {
//       border: '1px solid #fde68a',
//       backgroundColor: '#fffbeb',
//       borderRadius: '12px',
//       padding: '16px',
//       marginBottom: '16px'
//     },
//     sectionTitle: {
//       fontSize: '11px',
//       fontWeight: '700',
//       color: '#94a3b8',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       marginBottom: '12px'
//     },
//     label: {
//       display: 'block',
//       fontSize: '11px',
//       fontWeight: '700',
//       color: '#475569',
//       textTransform: 'uppercase',
//       marginBottom: '6px',
//       letterSpacing: '0.02em'
//     },
//     input: {
//       width: '100%',
//       padding: '10px 12px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       fontSize: '14px',
//       outline: 'none',
//       boxSizing: 'border-box',
//       color: '#1e293b'
//     },
//     inputReadOnly: {
//       width: '100%',
//       padding: '10px 12px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       fontSize: '14px',
//       outline: 'none',
//       boxSizing: 'border-box',
//       color: '#1e293b',
//       backgroundColor: '#f8fafc'
//     },
//     textarea: {
//       width: '100%',
//       padding: '10px 12px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       fontSize: '14px',
//       outline: 'none',
//       boxSizing: 'border-box',
//       color: '#1e293b',
//       height: '60px',
//       resize: 'none'
//     },
//     otpInput: {
//       width: '40px',
//       height: '40px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       textAlign: 'center',
//       fontSize: '18px',
//       fontWeight: '700',
//       backgroundColor: '#f8fafc'
//     },
//     grid3: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr 1fr',
//       gap: '16px',
//       marginBottom: '16px'
//     },
//     grid2: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '16px',
//       marginBottom: '16px'
//     },
//     docGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(4, 1fr)',
//       gap: '12px',
//       marginTop: '12px'
//     },
//     docBox: {
//       border: '1px dashed #cbd5e1',
//       borderRadius: '8px',
//       padding: '16px 8px',
//       textAlign: 'center',
//       backgroundColor: '#ffffff'
//     },
//     uploadBtnLabel: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '6px',
//       backgroundColor: '#eff6ff',
//       color: '#2563eb',
//       padding: '6px 12px',
//       borderRadius: '6px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer'
//     },
//     btnPrimary: {
//       backgroundColor: '#0f172a',
//       color: '#ffffff',
//       fontWeight: '600',
//       fontSize: '14px',
//       padding: '10px 24px',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     btnPrimaryFull: {
//       backgroundColor: '#0f172a',
//       color: '#ffffff',
//       fontWeight: '600',
//       fontSize: '14px',
//       padding: '10px 24px',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       width: '100%',
//       justifyContent: 'center'
//     },
//     btnSecondary: {
//       backgroundColor: 'transparent',
//       color: '#64748b',
//       fontWeight: '600',
//       fontSize: '14px',
//       border: 'none',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px'
//     },
//     btnOutlineFull: {
//       backgroundColor: 'transparent',
//       color: '#64748b',
//       fontWeight: '600',
//       fontSize: '14px',
//       border: '1px solid #cbd5e1',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       width: '100%',
//       padding: '12px',
//       borderRadius: '8px',
//       marginTop: '16px'
//     },
//     btnDashedAdd: {
//       width: '100%',
//       border: '2px dashed #cbd5e1',
//       backgroundColor: 'transparent',
//       color: '#2563eb',
//       padding: '12px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer'
//     },
//     footer: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingTop: '16px',
//       borderTop: '1px solid #f1f5f9',
//       marginTop: '24px'
//     },
//     tabContainer: {
//       display: 'flex',
//       border: '1px solid #e2e8f0',
//       borderRadius: '8px',
//       padding: '4px',
//       backgroundColor: '#f8fafc',
//       marginBottom: '20px'
//     },
//     tabBtnActive: {
//       flex: 1,
//       padding: '8px',
//       borderRadius: '6px',
//       border: 'none',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       backgroundColor: '#0f172a',
//       color: '#ffffff'
//     },
//     tabBtnInactive: {
//       flex: 1,
//       padding: '8px',
//       borderRadius: '6px',
//       border: 'none',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       backgroundColor: 'transparent',
//       color: '#475569'
//     },
//     termsBox: {
//       height: '120px',
//       overflowY: 'auto',
//       border: '1px solid #e2e8f0',
//       borderRadius: '8px',
//       padding: '12px',
//       backgroundColor: '#ffffff',
//       fontSize: '12px',
//       color: '#475569',
//       lineHeight: '1.5'
//     },
//     digilockerBox: {
//       marginTop: '16px',
//       border: '1px solid #fde68a',
//       backgroundColor: '#fffbeb',
//       borderRadius: '12px',
//       padding: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between'
//     },
//     digilockerBtn: {
//       backgroundColor: '#ea580c',
//       color: '#ffffff',
//       border: 'none',
//       padding: '8px 16px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       fontSize: '12px',
//       cursor: 'pointer'
//     },
//     badgeGreen: {
//       fontSize: '12px',
//       color: '#059669',
//       backgroundColor: '#ecfdf5',
//       padding: '2px 8px',
//       borderRadius: '4px',
//       fontWeight: '600'
//     },
//     flexRowBetween: {
//       display: 'flex',
//       justify: 'space-between',
//       alignItems: 'center'
//     },
//     flexColumnGap: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '12px'
//     },
//     flexAlignGap: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     checkboxLabel: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '8px',
//       marginTop: '12px',
//       cursor: 'pointer'
//     },
//     ocrRow: {
//       display: 'flex',
//       justify: 'space-between',
//       alignItems: 'center',
//       padding: '10px 16px',
//       fontSize: '13px'
//     },
//     progressBarBg: {
//       height: '8px',
//       backgroundColor: '#f1f5f9',
//       borderRadius: '4px',
//       overflow: 'hidden'
//     },
//     progressBarFill: {
//       width: '96%',
//       height: '100%',
//       backgroundColor: '#059669'
//     },
//     btnAccept: {
//       backgroundColor: '#059669',
//       color: '#ffffff',
//       border: 'none',
//       padding: '10px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px'
//     },
//     btnFlag: {
//       backgroundColor: '#f59e0b',
//       color: '#ffffff',
//       border: 'none',
//       padding: '10px',
//       borderRadius: '8px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px'
//     }
//   };

//   // Helper for Stepper Item style
//   const getStepCircleStyle = (step) => {
//     const isCompleted = step < currentStep;
//     const isCurrent = step === currentStep;
//     return {
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '12px',
//       fontWeight: '600',
//       transition: 'all 0.2s',
//       backgroundColor: isCompleted ? '#059669' : isCurrent ? '#2563eb' : '#f1f5f9',
//       color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
//       boxShadow: isCurrent ? '0 0 0 4px #dbeafe' : 'none'
//     };
//   };

//   // Stepper Header
//   const renderStepper = () => (
//     <div style={styles.stepperContainer}>
//       {[1, 2, 3, 4, 5, 6, 7].map((step) => {
//         const isCompleted = step < currentStep;
//         return (
//           <React.Fragment key={step}>
//             <div style={getStepCircleStyle(step)}>
//               {isCompleted ? <Check size={16} /> : step}
//             </div>
//             {step < 7 && (
//               <div
//                 style={{
//                   ...styles.stepperLine,
//                   backgroundColor: step < currentStep ? '#059669' : '#e2e8f0'
//                 }}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div style={styles.container}>
      
//       {/* INITIAL LAUNCH BUTTON */}
//       {!isOpen ? (
//         <div style={styles.initialCard}>
//           <div style={styles.iconHeaderCircle}>
//             <ShieldCheck size={32} />
//           </div>
//           <h1 style={styles.mainTitle}>Candidate Verification Portal</h1>
//           <p style={styles.subtitle}>
//             Start the 7-step identity, education, document, and background verification process.
//           </p>
//           <button onClick={() => setIsOpen(true)} style={styles.btnPrimaryFull}>
//             <span>Start Verification Flow</span>
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       ) : (
//         /* WIZARD CONTAINER */
//         <div style={styles.card}>
          
//           {/* STEPPER HEADER */}
//           {currentStep > 1 && currentStep < 7 && renderStepper()}

//           <div style={styles.innerPadding}>

//             {/* STEP 1: WELCOME SCREEN */}
//             {currentStep === 1 && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={styles.step1IconCircle}>
//                   <ShieldCheck size={36} />
//                 </div>
//                 <span style={styles.stepBadge}>Step 1 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Background Verification</h2>
//                 <p style={styles.subtitle}>
//                   Welcome! Please complete your background verification to proceed with your onboarding process.
//                 </p>

//                 <div style={{ ...styles.sectionBoxGray, textAlign: 'left' }}>
//                   <h3 style={styles.sectionTitle}>Before you begin, ensure you have:</h3>
//                   <div style={styles.flexColumnGap}>
//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Government ID (Aadhaar / PAN card)</span>
//                     </div>
//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Educational Certificates (Degree / Marksheets)</span>
//                     </div>
//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Employment details & HR contact information</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.footer}>
//                   <span style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated time: ~5 minutes</span>
//                   <button onClick={nextStep} style={styles.btnPrimary}>
//                     <span>Begin Verification</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2: CONSENT & VERIFICATION */}
//             {currentStep === 2 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 2 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Consent & Verification</h2>
//                 <p style={styles.subtitle}>Verify your mobile number and provide consent under DPDP Act.</p>

//                 <div style={styles.sectionBox}>
//                   <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
//                     <label style={styles.label}>Mobile Number Verification</label>
//                     <span style={styles.badgeGreen}>✓ Mobile Verified</span>
//                   </div>
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     {[1, 2, 3, 4, 5, 6].map((i) => (
//                       <input key={i} type="text" value="•" readOnly style={styles.otpInput} />
//                     ))}
//                   </div>
//                   <div style={{ ...styles.flexRowBetween, fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
//                     <span>Enter 6-digit OTP sent to +91 98765 43210</span>
//                     <span style={{ color: '#2563eb', cursor: 'pointer' }}>Resend OTP</span>
//                   </div>
//                 </div>

//                 <div style={styles.sectionBoxGray}>
//                   <label style={styles.label}>Data Protection Consent (DPDP Act 2023)</label>
//                   <div style={styles.termsBox}>
//                     In accordance with the Digital Personal Data Protection Act, 2023, by checking the box below, you explicitly consent to the collection, processing, and sharing of your personal, educational, and professional data for background verification.
//                   </div>
//                   <label style={styles.checkboxLabel}>
//                     <input type="checkbox" checked={dpdpAccepted} onChange={(e) => setDpdpAccepted(e.target.checked)} style={{ marginTop: '3px' }} />
//                     <span style={{ fontSize: '12px', color: '#475569' }}>I have read and agree to the data protection consent terms and authorize background checks.</span>
//                   </label>
//                 </div>

//                 <div style={styles.footer}>
//                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
//                   <button onClick={nextStep} disabled={!dpdpAccepted} style={{ ...styles.btnPrimary, opacity: dpdpAccepted ? 1 : 0.5, cursor: dpdpAccepted ? 'pointer' : 'not-allowed' }}>
//                     <span>Give Consent & Continue</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3: PERSONAL & IDENTITY */}
//             {currentStep === 3 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 3 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Personal & Identity</h2>
//                 <p style={styles.subtitle}>Provide your personal details and government identity documents.</p>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>Personal Details</h3>
//                   <div style={{ marginBottom: '12px' }}>
//                     <label style={styles.label}>Full Name (As per Aadhaar)</label>
//                     <input type="text" value={personalDetails.fullName} onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })} style={styles.input} />
//                   </div>
//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>Date of Birth</label>
//                       <input type="date" style={styles.input} />
//                     </div>
//                     <div>
//                       <label style={styles.label}>Gender</label>
//                       <select style={styles.input}>
//                         <option value="">Select</option>
//                         <option value="female">Female</option>
//                         <option value="male">Male</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>Mobile</label>
//                       <input type="text" value={personalDetails.mobile} readOnly style={styles.inputReadOnly} />
//                     </div>
//                     <div>
//                       <label style={styles.label}>Email</label>
//                       <input type="email" value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} style={styles.input} />
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>Address</h3>
//                   <div style={{ marginBottom: '12px' }}>
//                     <label style={styles.label}>Current Address</label>
//                     <textarea placeholder="Flat/House No., Street, Area, City, State — PIN" style={styles.textarea} />
//                   </div>
//                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
//                     <input type="checkbox" />
//                     <span style={{ fontSize: '12px', color: '#475569' }}>Permanent address same as current</span>
//                   </label>
//                   <div>
//                     <label style={styles.label}>Permanent Address</label>
//                     <textarea placeholder="Flat/House No., Street, Area, City, State — PIN" style={styles.textarea} />
//                   </div>
//                 </div>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>Identity Documents</h3>
//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>PAN Number</label>
//                       <input type="text" placeholder="ABCDE1234F" style={{ ...styles.input, textTransform: 'uppercase' }} />
//                     </div>
//                     <div>
//                       <label style={styles.label}>Aadhaar Number</label>
//                       <input type="text" placeholder="XXXX XXXX XXXX" style={styles.input} />
//                     </div>
//                   </div>

//                   <div style={styles.digilockerBox}>
//                     <div>
//                       <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>DigiLocker</h4>
//                       <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Fetch Aadhaar & other govt. documents</p>
//                     </div>
//                     <button style={styles.digilockerBtn}>Connect</button>
//                   </div>
//                 </div>

//                 <div style={styles.footer}>
//                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
//                   <button onClick={nextStep} style={styles.btnPrimary}>
//                     <span>Verify Identity</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 4: EDUCATION & EMPLOYMENT */}
//             {currentStep === 4 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 4 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Education & Employment</h2>
//                 <p style={styles.subtitle}>Add your qualifications and professional history.</p>

//                 <div style={styles.tabContainer}>
//                   <button
//                     onClick={() => setStep4Tab('education')}
//                     style={step4Tab === 'education' ? styles.tabBtnActive : styles.tabBtnInactive}
//                   >
//                     <GraduationCap size={16} /> Education
//                   </button>
//                   <button
//                     onClick={() => setStep4Tab('employment')}
//                     style={step4Tab === 'employment' ? styles.tabBtnActive : styles.tabBtnInactive}
//                   >
//                     <Briefcase size={16} /> Employment
//                   </button>
//                 </div>

//                 {step4Tab === 'education' ? (
//                   <div>
//                     {qualifications.map((_, idx) => (
//                       <div key={idx} style={styles.sectionBox}>
//                         <h3 style={styles.sectionTitle}>Qualification {idx + 1}</h3>
//                         <div style={{ marginBottom: '12px' }}>
//                           <label style={styles.label}>University / Institution</label>
//                           <input type="text" placeholder="e.g. University of Mumbai" style={styles.input} />
//                         </div>
//                         <div style={styles.grid2}>
//                           <div>
//                             <label style={styles.label}>Qualification</label>
//                             <select style={styles.input}>
//                               <option value="">Select degree</option>
//                               <option value="btech">Bachelor of Engineering</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label style={styles.label}>Passing Year</label>
//                             <input type="text" placeholder="2019" style={styles.input} />
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <button onClick={addQualification} style={styles.btnDashedAdd}>+ Add Qualification</button>
//                   </div>
//                 ) : (
//                   <div>
//                     {employers.map((emp, idx) => (
//                       <div key={idx} style={styles.sectionBox}>
//                         <div style={styles.grid3}>
//                           <div>
//                             <label style={styles.label}>Company Name *</label>
//                             <input 
//                               type="text" 
//                               placeholder="Enter company name" 
//                               style={styles.input}
//                               value={emp.companyName}
//                               onChange={(e) => handleEmployerChange(idx, 'companyName', e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <label style={styles.label}>Designation *</label>
//                             <input 
//                               type="text" 
//                               placeholder="Enter designation" 
//                               style={styles.input}
//                               value={emp.designation}
//                               onChange={(e) => handleEmployerChange(idx, 'designation', e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <label style={styles.label}>Employee ID</label>
//                             <input 
//                               type="text" 
//                               placeholder="Enter employee ID" 
//                               style={styles.input}
//                               value={emp.employeeId}
//                               onChange={(e) => handleEmployerChange(idx, 'employeeId', e.target.value)}
//                             />
//                           </div>
//                         </div>

//                         <div style={styles.grid2}>
//                           <div>
//                             <label style={styles.label}>HR Email ID *</label>
//                             <input 
//                               type="email" 
//                               placeholder="Enter HR email ID" 
//                               style={styles.input}
//                               value={emp.hrEmail}
//                               onChange={(e) => handleEmployerChange(idx, 'hrEmail', e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <label style={styles.label}>HR Phone Number *</label>
//                             <div style={{ display: 'flex', gap: '8px' }}>
//                               <select 
//                                 style={{ ...styles.input, width: '80px' }}
//                                 value={emp.hrPhoneCode}
//                                 onChange={(e) => handleEmployerChange(idx, 'hrPhoneCode', e.target.value)}
//                               >
//                                 <option value="+91">+91</option>
//                               </select>
//                               <input 
//                                 type="text" 
//                                 placeholder="Enter phone number" 
//                                 style={{ ...styles.input, flex: 1 }}
//                                 value={emp.hrPhone}
//                                 onChange={(e) => handleEmployerChange(idx, 'hrPhone', e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div style={styles.grid2}>
//                           <div>
//                             <label style={styles.label}>Date of Joining (DOJ) *</label>
//                             <input 
//                               type="date" 
//                               style={styles.input}
//                               value={emp.doj}
//                               onChange={(e) => handleEmployerChange(idx, 'doj', e.target.value)}
//                             />
//                           </div>
//                           <div>
//                             <label style={styles.label}>Date of Exit (DOE) *</label>
//                             <input 
//                               type="date" 
//                               style={styles.input}
//                               value={emp.doe}
//                               onChange={(e) => handleEmployerChange(idx, 'doe', e.target.value)}
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label style={styles.label}>Documents * (Upload up to 4 documents)</label>
//                           <div style={styles.docGrid}>
//                             {[1, 2, 3, 4].map((docNum, dIdx) => (
//                               <div key={dIdx} style={styles.docBox}>
//                                 <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
//                                   Document {docNum}
//                                 </div>
//                                 <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
//                                   PDF, JPG, PNG (Max 10MB)
//                                 </div>
//                                 <label style={styles.uploadBtnLabel}>
//                                   <Upload size={14} /> Choose File
//                                   <input 
//                                     type="file" 
//                                     style={{ display: 'none' }}
//                                     accept=".pdf,.jpg,.jpeg,.png"
//                                     onChange={(e) => handleFileUpload(idx, dIdx, e.target.files[0])}
//                                   />
//                                 </label>
//                                 {emp.documents[dIdx] && (
//                                   <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
//                                     {emp.documents[dIdx].name}
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                       </div>
//                     ))}
//                     <button onClick={addEmployer} style={styles.btnDashedAdd}>+ Add Employer</button>
//                   </div>
//                 )}

//                 <div style={styles.footer}>
//                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
//                   <button onClick={nextStep} style={styles.btnPrimary}>
//                     <span>Continue</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 5: DOCUMENT UPLOAD */}
//             {currentStep === 5 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 5 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Document Upload</h2>
//                 <p style={styles.subtitle}>Upload a supporting certificate. Our AI will extract and verify content automatically.</p>

//                 {uploadedFile && (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                     <div style={{ ...styles.sectionBox, ...styles.flexRowBetween, padding: '12px 16px', margin: 0 }}>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                         <FileText color="#2563eb" size={24} />
//                         <div>
//                           <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{uploadedFile.name}</h4>
//                           <span style={{ fontSize: '11px', color: '#94a3b8' }}>{uploadedFile.status}</span>
//                         </div>
//                       </div>
//                       <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setUploadedFile(null)} />
//                     </div>

//                     <div style={styles.sectionBox}>
//                       <div style={{ ...styles.flexRowBetween, marginBottom: '8px' }}>
//                         <span style={styles.label}>AI Confidence Score</span>
//                         <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>96%</span>
//                       </div>
//                       <div style={styles.progressBarBg}>
//                         <div style={styles.progressBarFill} />
//                       </div>
//                     </div>

//                     <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
//                       <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>
//                         <span style={styles.label}>OCR Extracted Fields</span>
//                       </div>
//                       {uploadedFile.ocrData.map((row, i) => (
//                         <div key={i} style={{ ...styles.ocrRow, borderBottom: i < uploadedFile.ocrData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
//                           <span style={{ color: '#64748b' }}>{row.label}</span>
//                           <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{row.value}</span>
//                           <span style={styles.badgeGreen}>✓ Match</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//                       <button style={styles.btnAccept}>
//                         <Check size={16} /> Auto Accept
//                       </button>
//                       <button style={styles.btnFlag}>
//                         <Eye size={16} /> Flag for Review
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div style={styles.footer}>
//                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
//                   <button onClick={nextStep} style={styles.btnPrimary}>
//                     <span>Continue</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 6: REVIEW & SUBMIT */}
//             {currentStep === 6 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 6 of 7</span>
//                 <h2 style={styles.stepHeaderTitle}>Review & Submit</h2>
//                 <p style={styles.subtitle}>Verify all information before submitting your verification request.</p>

//                 <div style={styles.sectionBox}>
//                   <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
//                     <h3 style={styles.sectionTitle}>Personal Information</h3>
//                     <span onClick={() => setCurrentStep(3)} style={{ color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</span>
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
//                     <div><span style={{ color: '#94a3b8' }}>Full Name</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.fullName}</p></div>
//                     <div><span style={{ color: '#94a3b8' }}>Mobile</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.mobile}</p></div>
//                     <div><span style={{ color: '#94a3b8' }}>Email</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.email}</p></div>
//                   </div>
//                 </div>

//                 <div style={styles.sectionBoxAmber}>
//                   <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
//                     <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} style={{ marginTop: '2px' }} />
//                     <span style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
//                       I hereby declare that all information provided is true and accurate to the best of my knowledge.
//                     </span>
//                   </label>
//                 </div>

//                 <div style={styles.footer}>
//                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
//                   <button onClick={nextStep} disabled={!declarationAccepted} style={{ ...styles.btnPrimary, opacity: declarationAccepted ? 1 : 0.5, cursor: declarationAccepted ? 'pointer' : 'not-allowed' }}>
//                     <span>Submit for Verification</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 7: VERIFICATION SUBMITTED */}
//             {currentStep === 7 && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={styles.successIconCircle}>
//                   <Check size={36} />
//                 </div>
//                 <h2 style={styles.stepHeaderTitle}>Verification Submitted</h2>
//                 <p style={{ ...styles.subtitle, fontSize: '13px' }}>
//                   Your background verification request has been submitted. We will notify you at <b>{personalDetails.email}</b>.
//                 </p>

//                 <div style={{ ...styles.sectionBox, textAlign: 'left' }}>
//                   <h3 style={styles.sectionTitle}>Reference Details</h3>
//                   <div style={{ ...styles.flexColumnGap, gap: '8px', fontSize: '13px' }}>
//                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Case ID</span><span style={{ fontFamily: 'monospace', fontWeight: '700' }}>BGV-2024-08734</span></div>
//                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Submitted</span><span style={{ fontWeight: '700' }}>25 August 2026</span></div>
//                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Company</span><span style={{ fontWeight: '700' }}>Accenture Solutions Pvt. Ltd.</span></div>
//                   </div>
//                 </div>

//                 <button style={styles.btnOutlineFull}>
//                   <Download size={16} /> Download Acknowledgment PDF
//                 </button>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  FileText, 
  X, 
  Check, 
  Eye, 
  Download 
} from 'lucide-react';

const styles = {
  label: { fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' },
  input: { width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' },
  docGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '8px' },
  docBox: { border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#f8fafc' },
  uploadBtnLabel: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#334155' },
  btnDashedAdd: { width: '100%', padding: '10px', border: '1px dashed #2563eb', color: '#2563eb', backgroundColor: '#eff6ff', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' },
  btnSecondary: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: 'none', borderRadius: '6px', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
  stepBadge: { fontSize: '11px', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' },
  stepHeaderTitle: { fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '8px 0 4px 0' },
  subtitle: { fontSize: '12px', color: '#64748b', marginBottom: '16px' },
  sectionBox: { border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', backgroundColor: '#fff', marginBottom: '16px' },
  sectionBoxAmber: { border: '1px solid #fde68a', borderRadius: '12px', padding: '16px', backgroundColor: '#fffbeb', marginBottom: '16px' },
  flexRowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  flexColumnGap: { display: 'flex', flexDirection: 'column' },
  progressBarBg: { height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' },
  progressBarFill: { height: '100%', width: '96%', backgroundColor: '#10b981', borderRadius: '4px' },
  ocrRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', fontSize: '12px' },
  badgeGreen: { color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' },
  btnAccept: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' },
  btnFlag: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' },
  sectionTitle: { fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 },
  successIconCircle: { width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' },
  btnOutlineFull: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', marginTop: '16px' }
};

export default function VerificationForm() {
  const [currentStep, setCurrentStep] = useState(4);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Rahul Sharma',
    mobile: '+91 9876543210',
    email: 'rahul.sharma@example.com'
  });

  const [qualifications, setQualifications] = useState([
    { region: 'National', mode: '', yearOfPassing: '', charges: '', documents: [] }
  ]);

  const [uploadedFile, setUploadedFile] = useState({
    name: 'Degree_Certificate.pdf',
    status: 'Processed by AI OCR',
    ocrData: [
      { label: 'Degree Name', value: 'Bachelor of Technology' },
      { label: 'University', value: 'AKTU University' },
      { label: 'Passing Year', value: '2023' }
    ]
  });

  const handleQualChange = (index, field, value) => {
    const updated = [...qualifications];
    updated[index][field] = value;
    setQualifications(updated);
  };

  const handleQualDocUpload = (qIdx, dIdx, file) => {
    if (!file) return;
    const updated = [...qualifications];
    if (!updated[qIdx].documents) updated[qIdx].documents = [];
    updated[qIdx].documents[dIdx] = file;
    setQualifications(updated);
  };

  const addQualification = () => {
    setQualifications([...qualifications, { region: 'National', mode: '', yearOfPassing: '', charges: '', documents: [] }]);
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* STEP 4: QUALIFICATIONS */}
      {currentStep === 4 && (
        <div>
          <span style={styles.stepBadge}>Step 4 of 7</span>
          <h2 style={styles.stepHeaderTitle}>Educational Qualifications</h2>
          <p style={styles.subtitle}>Add details about your educational background.</p>

          {qualifications.map((qual, qIdx) => (
            <div key={qIdx} style={{ ...styles.sectionBox, marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
                <div>
                  <label style={styles.label}>National / International *</label>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '13px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name={`region-${qIdx}`} 
                        value="National" 
                        checked={qual.region === 'National'} 
                        onChange={(e) => handleQualChange(qIdx, 'region', e.target.value)} 
                      /> National
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name={`region-${qIdx}`} 
                        value="International" 
                        checked={qual.region === 'International'} 
                        onChange={(e) => handleQualChange(qIdx, 'region', e.target.value)} 
                      /> International
                    </label>
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Mode of Study *</label>
                  <select 
                    style={styles.input} 
                    value={qual.mode || ''} 
                    onChange={(e) => handleQualChange(qIdx, 'mode', e.target.value)}
                  >
                    <option value="">Select Mode</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Distance">Distance</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Year of Passing *</label>
                  <input 
                    type="text" 
                    placeholder="YYYY" 
                    style={styles.input} 
                    value={qual.yearOfPassing || ''} 
                    onChange={(e) => handleQualChange(qIdx, 'yearOfPassing', e.target.value)}
                  />
                </div>

                <div>
                  <label style={styles.label}>Education Charges (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Enter Charges" 
                    style={styles.input} 
                    value={qual.charges || ''} 
                    onChange={(e) => handleQualChange(qIdx, 'charges', e.target.value)}
                  />
                </div>
                <div></div>
              </div>

              {/* DOCUMENTS ATTACHMENT GRID */}
              <div>
                <label style={styles.label}>DOCUMENTS * (Upload up to 4 documents)</label>
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
                          onChange={(e) => handleQualDocUpload(qIdx, dIdx, e.target.files[0])}
                        />
                      </label>
                      {qual.documents && qual.documents[dIdx] && (
                        <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {qual.documents[dIdx].name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button onClick={addQualification} style={styles.btnDashedAdd}>+ Add Qualification</button>

          {/* NAVIGATION FOOTER */}
          <div style={styles.footer}>
            <button onClick={prevStep} style={styles.btnSecondary}>
              <ChevronLeft size={16} /> Back
            </button>
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
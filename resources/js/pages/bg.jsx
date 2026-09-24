
// // import React, { useState } from 'react';
// // import { 
// //   Check, 
// //   ChevronRight, 
// //   ChevronLeft, 
// //   ShieldCheck, 
// //   Upload, 
// //   FileText, 
// //   X, 
// //   GraduationCap, 
// //   Briefcase, 
// //   Eye,
// //   Download,
// //   User,
// //   CreditCard,
// //   Lock,
// //   Camera
// // } from 'lucide-react';

// // export default function CandidateVerificationWizard() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [currentStep, setCurrentStep] = useState(1);

// //   // Form States
// //   const [dpdpAccepted, setDpdpAccepted] = useState(false);
// //   const [personalDetails, setPersonalDetails] = useState({
// //     fullName: 'Priya Sharma',
// //     profileImage: null,
// //     profileImagePreview: null,
// //     candidateId: '',
// //     clientName: '',
// //     dob: '',
// //     gender: '',
// //     mobile: '+91 98765 43210',
// //     email: 'priya.sharma@email.com',
// //     currentAddress: '',
// //     currentAddressDocType: '',
// //     currentAddressDocFile: null,
// //     isPermanentSame: false,
// //     permanentAddress: '',
// //     permanentAddressDocType: '',
// //     permanentAddressDocFile: null,
// //     aadhaarNumber: '',
// //     panNumber: '',
// //     candidateDate: ''
// //   });

// //   // Step 4 Tabs: 'education' | 'employment'
// //   const [step4Tab, setStep4Tab] = useState('education');

// //   // Education state with dynamic fields
// //   const [qualifications, setQualifications] = useState([
// //     { 
// //       qualificationType: '', 
// //       courseStream: '', 
// //       specialization: '', 
// //       institute: '', 
// //       boardUniversity: '', 
// //       nationalInternational: 'National', 
// //       verificationFeesBy: 'Normal',
// //       fromYop: '',
// //       toYop: '',
// //       universityFees: '',
// //       commission: '',
// //       serviceCharge: '',
// //       modeOfStudy: '', 
// //       documents: [null, null, null, null] 
// //     }
// //   ]);
  
// //   // Employment state
// //   const [employers, setEmployers] = useState([
// //     { 
// //       companyName: '', 
// //       designation: '', 
// //       employeeId: '', 
// //       hrEmail: '', 
// //       hrPhoneCode: '+91',
// //       hrPhone: '', 
// //       doj: '', 
// //       doe: '',
// //       documents: [null, null, null, null]
// //     }
// //   ]);

// //   // Step 5 Document Upload State
// //   const [uploadedFile, setUploadedFile] = useState({
// //     name: 'CLIENT PORTAL.png',
// //     status: 'Uploaded · OCR complete',
// //     confidenceScore: 96,
// //     ocrData: [
// //       { label: 'Full Name', value: 'PRIYA SHARMA' },
// //       { label: 'Date of Birth', value: '14 March 1997' },
// //       { label: 'Issuing Authority', value: 'UNIVERSITY OF MUMBAI' },
// //       { label: 'Degree', value: 'Bachelor of Engineering' },
// //       { label: 'Passing Year', value: '2019' },
// //       { label: 'Roll Number', value: 'MU-ENG-2019-04782' }
// //     ],
// //     matches: ['Name Match', 'Date Match', 'Institution'],
// //     forgeryStatus: 'Low — No anomalies detected'
// //   });

// //   const [declarationAccepted, setDeclarationAccepted] = useState(false);

// //   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
// //   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

// //   // Profile Image Handler
// //   const handleProfileImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setPersonalDetails({
// //         ...personalDetails,
// //         profileImage: file,
// //         profileImagePreview: URL.createObjectURL(file)
// //       });
// //     }
// //   };

// //   // Qualification Handlers
// //   const addQualification = () => {
// //     setQualifications([
// //       ...qualifications, 
// //       { 
// //         qualificationType: '', 
// //         courseStream: '', 
// //         specialization: '', 
// //         institute: '', 
// //         boardUniversity: '', 
// //         nationalInternational: 'National', 
// //         verificationFeesBy: 'Normal',
// //         fromYop: '',
// //         toYop: '',
// //         universityFees: '',
// //         commission: '',
// //         serviceCharge: '',
// //         modeOfStudy: '', 
// //         documents: [null, null, null, null] 
// //       }
// //     ]);
// //   };

// //   const removeQualification = (index) => {
// //     if (qualifications.length > 1) {
// //       setQualifications(qualifications.filter((_, i) => i !== index));
// //     }
// //   };

// //   const handleQualificationChange = (index, field, value) => {
// //     const updated = [...qualifications];
// //     updated[index][field] = value;
// //     setQualifications(updated);
// //   };

// //   const handleQualDocumentUpload = (qualIndex, docIndex, file) => {
// //     const updated = [...qualifications];
// //     updated[qualIndex].documents[docIndex] = file;
// //     setQualifications(updated);
// //   };

// //   // Employer Handlers
// //   const addEmployer = () => {
// //     setEmployers([
// //       ...employers, 
// //       { 
// //         companyName: '', 
// //         designation: '', 
// //         employeeId: '', 
// //         hrEmail: '', 
// //         hrPhoneCode: '+91',
// //         hrPhone: '', 
// //         doj: '', 
// //         doe: '',
// //         documents: [null, null, null, null]
// //       }
// //     ]);
// //   };

// //   const removeEmployer = (index) => {
// //     if (employers.length > 1) {
// //       setEmployers(employers.filter((_, i) => i !== index));
// //     }
// //   };

// //   const handleEmployerChange = (index, field, value) => {
// //     const updated = [...employers];
// //     updated[index][field] = value;
// //     setEmployers(updated);
// //   };

// //   const handleFileUpload = (empIndex, docIndex, file) => {
// //     const updated = [...employers];
// //     updated[empIndex].documents[docIndex] = file;
// //     setEmployers(updated);
// //   };

// //   // Styles
// //   const styles = {
// //     container: {
// //       minHeight: '100vh',
// //       backgroundColor: '#f8fafc',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       padding: '16px',
// //       fontFamily: 'system-ui, -apple-system, sans-serif',
// //       color: '#1e293b'
// //     },
// //     card: {
// //       width: '100%',
// //       maxWidth: '1000px',
// //       backgroundColor: '#ffffff',
// //       borderRadius: '16px',
// //       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
// //       border: '1px solid #f1f5f9',
// //       overflow: 'hidden'
// //     },
// //     initialCard: {
// //       width: '100%',
// //       maxWidth: '400px',
// //       backgroundColor: '#ffffff',
// //       borderRadius: '16px',
// //       padding: '32px',
// //       textAlign: 'center',
// //       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
// //       border: '1px solid #f1f5f9'
// //     },
// //     iconHeaderCircle: {
// //       width: '64px',
// //       height: '64px',
// //       backgroundColor: '#eff6ff',
// //       color: '#2563eb',
// //       borderRadius: '50%',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       margin: '0 auto 16px auto'
// //     },
// //     step1IconCircle: {
// //       width: '64px',
// //       height: '64px',
// //       backgroundColor: '#dbeafe',
// //       color: '#2563eb',
// //       borderRadius: '16px',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       margin: '0 auto 16px auto'
// //     },
// //     successIconCircle: {
// //       width: '64px',
// //       height: '64px',
// //       backgroundColor: '#d1fae5',
// //       color: '#059669',
// //       borderRadius: '50%',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       margin: '0 auto 16px auto'
// //     },
// //     badgeCheck: {
// //       width: '20px',
// //       height: '20px',
// //       borderRadius: '50%',
// //       backgroundColor: '#d1fae5',
// //       color: '#059669',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       fontSize: '12px',
// //       fontWeight: '700'
// //     },
// //     innerPadding: {
// //       padding: '32px'
// //     },
// //     stepperContainer: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px',
// //       padding: '16px 0',
// //       marginBottom: '16px'
// //     },
// //     stepperLine: {
// //       width: '24px',
// //       height: '2px'
// //     },
// //     mainTitle: {
// //       fontSize: '20px',
// //       fontWeight: '700',
// //       color: '#0f172a',
// //       marginBottom: '8px'
// //     },
// //     stepHeaderTitle: {
// //       fontSize: '24px',
// //       fontWeight: '700',
// //       color: '#0f172a',
// //       margin: '4px 0'
// //     },
// //     subtitle: {
// //       color: '#64748b',
// //       fontSize: '14px',
// //       marginBottom: '24px'
// //     },
// //     stepBadge: {
// //       fontSize: '12px',
// //       fontWeight: '700',
// //       color: '#2563eb',
// //       textTransform: 'uppercase'
// //     },
// //     sectionBox: {
// //       border: '1px solid #e2e8f0',
// //       borderRadius: '12px',
// //       padding: '20px',
// //       marginBottom: '16px'
// //     },
// //     sectionBoxGray: {
// //       border: '1px solid #e2e8f0',
// //       borderRadius: '12px',
// //       padding: '20px',
// //       marginBottom: '16px',
// //       backgroundColor: '#f8fafc'
// //     },
// //     sectionBoxAmber: {
// //       border: '1px solid #fde68a',
// //       backgroundColor: '#fffbeb',
// //       borderRadius: '12px',
// //       padding: '16px',
// //       marginBottom: '16px'
// //     },
// //     sectionTitle: {
// //       fontSize: '12px',
// //       fontWeight: '700',
// //       color: '#1e293b',
// //       letterSpacing: '0.02em',
// //       marginBottom: '12px',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px'
// //     },
// //     sectionTitleCentered: {
// //       fontSize: '14px',
// //       fontWeight: '700',
// //       color: '#2563eb',
// //       textAlign: 'center',
// //       marginBottom: '16px'
// //     },
// //     label: {
// //       display: 'block',
// //       fontSize: '11px',
// //       fontWeight: '700',
// //       color: '#334155',
// //       textTransform: 'uppercase',
// //       marginBottom: '6px',
// //       letterSpacing: '0.02em'
// //     },
// //     input: {
// //       width: '100%',
// //       padding: '10px 12px',
// //       border: '1px solid #cbd5e1',
// //       borderRadius: '8px',
// //       fontSize: '13px',
// //       outline: 'none',
// //       boxSizing: 'border-box',
// //       color: '#1e293b',
// //       backgroundColor: '#ffffff'
// //     },
// //     inputReadOnly: {
// //       width: '100%',
// //       padding: '10px 12px',
// //       border: '1px solid #cbd5e1',
// //       borderRadius: '8px',
// //       fontSize: '13px',
// //       outline: 'none',
// //       boxSizing: 'border-box',
// //       color: '#1e293b',
// //       backgroundColor: '#f8fafc'
// //     },
// //     textarea: {
// //       width: '100%',
// //       padding: '10px 12px',
// //       border: '1px solid #cbd5e1',
// //       borderRadius: '8px',
// //       fontSize: '13px',
// //       outline: 'none',
// //       boxSizing: 'border-box',
// //       color: '#1e293b',
// //       height: '60px',
// //       resize: 'none'
// //     },
// //     otpInput: {
// //       width: '40px',
// //       height: '40px',
// //       border: '1px solid #cbd5e1',
// //       borderRadius: '8px',
// //       textAlign: 'center',
// //       fontSize: '18px',
// //       fontWeight: '700',
// //       backgroundColor: '#f8fafc'
// //     },
// //     grid5: {
// //       display: 'grid',
// //       gridTemplateColumns: 'repeat(5, 1fr)',
// //       gap: '12px',
// //       marginBottom: '16px'
// //     },
// //     grid3: {
// //       display: 'grid',
// //       gridTemplateColumns: '1fr 1fr 1fr',
// //       gap: '16px',
// //       marginBottom: '16px'
// //     },
// //     grid2: {
// //       display: 'grid',
// //       gridTemplateColumns: '1fr 1fr',
// //       gap: '16px',
// //       marginBottom: '16px'
// //     },
// //     avatarUploadContainer: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '16px',
// //       padding: '12px',
// //       border: '1px dashed #cbd5e1',
// //       borderRadius: '10px',
// //       backgroundColor: '#f8fafc'
// //     },
// //     avatarCircle: {
// //       width: '60px',
// //       height: '60px',
// //       borderRadius: '50%',
// //       backgroundColor: '#e2e8f0',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       overflow: 'hidden',
// //       border: '2px solid #cbd5e1',
// //       flexShrink: 0
// //     },
// //     docGrid: {
// //       display: 'grid',
// //       gridTemplateColumns: 'repeat(4, 1fr)',
// //       gap: '12px',
// //       marginTop: '12px'
// //     },
// //     docBox: {
// //       border: '1px dashed #cbd5e1',
// //       borderRadius: '8px',
// //       padding: '16px 8px',
// //       textAlign: 'center',
// //       backgroundColor: '#ffffff'
// //     },
// //     uploadBtnLabel: {
// //       display: 'inline-flex',
// //       alignItems: 'center',
// //       gap: '6px',
// //       backgroundColor: '#eff6ff',
// //       color: '#2563eb',
// //       padding: '6px 12px',
// //       borderRadius: '6px',
// //       fontSize: '12px',
// //       fontWeight: '600',
// //       cursor: 'pointer'
// //     },
// //     btnPrimary: {
// //       backgroundColor: '#0f172a',
// //       color: '#ffffff',
// //       fontWeight: '600',
// //       fontSize: '14px',
// //       padding: '10px 24px',
// //       borderRadius: '8px',
// //       border: 'none',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px'
// //     },
// //     btnPrimaryFull: {
// //       backgroundColor: '#0f172a',
// //       color: '#ffffff',
// //       fontWeight: '600',
// //       fontSize: '14px',
// //       padding: '10px 24px',
// //       borderRadius: '8px',
// //       border: 'none',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '8px',
// //       width: '100%',
// //       justifyContent: 'center'
// //     },
// //     btnSecondary: {
// //       backgroundColor: 'transparent',
// //       color: '#64748b',
// //       fontWeight: '600',
// //       fontSize: '14px',
// //       border: 'none',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '4px'
// //     },
// //     btnRemove: {
// //       backgroundColor: 'transparent',
// //       color: '#ef4444',
// //       border: '1px solid #fca5a5',
// //       borderRadius: '6px',
// //       padding: '4px 12px',
// //       fontSize: '12px',
// //       fontWeight: '600',
// //       cursor: 'pointer'
// //     },
// //     btnOutlineFull: {
// //       backgroundColor: 'transparent',
// //       color: '#64748b',
// //       fontWeight: '600',
// //       fontSize: '14px',
// //       border: '1px solid #cbd5e1',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px',
// //       width: '100%',
// //       padding: '12px',
// //       borderRadius: '8px',
// //       marginTop: '16px'
// //     },
// //     btnDashedAdd: {
// //       width: '100%',
// //       border: '2px dashed #cbd5e1',
// //       backgroundColor: 'transparent',
// //       color: '#2563eb',
// //       padding: '12px',
// //       borderRadius: '8px',
// //       fontWeight: '600',
// //       cursor: 'pointer',
// //       marginTop: '8px'
// //     },
// //     footer: {
// //       display: 'flex',
// //       justifyContent: 'space-between',
// //       alignItems: 'center',
// //       paddingTop: '16px',
// //       borderTop: '1px solid #f1f5f9',
// //       marginTop: '24px'
// //     },
// //     tabContainer: {
// //       display: 'flex',
// //       border: '1px solid #e2e8f0',
// //       borderRadius: '8px',
// //       padding: '4px',
// //       backgroundColor: '#f8fafc',
// //       marginBottom: '20px'
// //     },
// //     tabBtnActive: {
// //       flex: 1,
// //       padding: '8px',
// //       borderRadius: '6px',
// //       border: 'none',
// //       fontSize: '14px',
// //       fontWeight: '600',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px',
// //       backgroundColor: '#0f172a',
// //       color: '#ffffff'
// //     },
// //     tabBtnInactive: {
// //       flex: 1,
// //       padding: '8px',
// //       borderRadius: '6px',
// //       border: 'none',
// //       fontSize: '14px',
// //       fontWeight: '600',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px',
// //       backgroundColor: 'transparent',
// //       color: '#475569'
// //     },
// //     termsBox: {
// //       height: '120px',
// //       overflowY: 'auto',
// //       border: '1px solid #e2e8f0',
// //       borderRadius: '8px',
// //       padding: '12px',
// //       backgroundColor: '#ffffff',
// //       fontSize: '12px',
// //       color: '#475569',
// //       lineHeight: '1.5'
// //     },
// //     digilockerBox: {
// //       marginTop: '16px',
// //       border: '1px solid #fde68a',
// //       backgroundColor: '#fffbeb',
// //       borderRadius: '12px',
// //       padding: '16px',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'space-between'
// //     },
// //     digilockerBtn: {
// //       backgroundColor: '#ea580c',
// //       color: '#ffffff',
// //       border: 'none',
// //       padding: '8px 16px',
// //       borderRadius: '8px',
// //       fontWeight: '600',
// //       fontSize: '12px',
// //       cursor: 'pointer'
// //     },
// //     badgeGreen: {
// //       fontSize: '12px',
// //       color: '#059669',
// //       backgroundColor: '#ecfdf5',
// //       padding: '2px 8px',
// //       borderRadius: '4px',
// //       fontWeight: '600'
// //     },
// //     flexRowBetween: {
// //       display: 'flex',
// //       justify: 'space-between',
// //       alignItems: 'center'
// //     },
// //     flexColumnGap: {
// //       display: 'flex',
// //       flexDirection: 'column',
// //       gap: '12px'
// //     },
// //     flexAlignGap: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '12px'
// //     },
// //     checkboxLabel: {
// //       display: 'flex',
// //       alignItems: 'flex-start',
// //       gap: '8px',
// //       marginTop: '12px',
// //       cursor: 'pointer'
// //     },
// //     ocrRow: {
// //       display: 'flex',
// //       justify: 'space-between',
// //       alignItems: 'center',
// //       padding: '10px 16px',
// //       fontSize: '13px'
// //     },
// //     progressBarBg: {
// //       height: '8px',
// //       backgroundColor: '#f1f5f9',
// //       borderRadius: '4px',
// //       overflow: 'hidden'
// //     },
// //     progressBarFill: {
// //       width: '96%',
// //       height: '100%',
// //       backgroundColor: '#059669'
// //     },
// //     btnAccept: {
// //       backgroundColor: '#059669',
// //       color: '#ffffff',
// //       border: 'none',
// //       padding: '10px',
// //       borderRadius: '8px',
// //       fontWeight: '600',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px'
// //     },
// //     btnFlag: {
// //       backgroundColor: '#f59e0b',
// //       color: '#ffffff',
// //       border: 'none',
// //       padding: '10px',
// //       borderRadius: '8px',
// //       fontWeight: '600',
// //       cursor: 'pointer',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       gap: '8px'
// //     },
// //     radioGroup: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '16px',
// //       height: '38px'
// //     },
// //     radioLabel: {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '6px',
// //       fontSize: '13px',
// //       color: '#1e293b',
// //       cursor: 'pointer'
// //     }
// //   };

// //   const getStepCircleStyle = (step) => {
// //     const isCompleted = step < currentStep;
// //     const isCurrent = step === currentStep;
// //     return {
// //       width: '32px',
// //       height: '32px',
// //       borderRadius: '50%',
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       fontSize: '12px',
// //       fontWeight: '600',
// //       transition: 'all 0.2s',
// //       backgroundColor: isCompleted ? '#059669' : isCurrent ? '#2563eb' : '#f1f5f9',
// //       color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
// //       boxShadow: isCurrent ? '0 0 0 4px #dbeafe' : 'none'
// //     };
// //   };

// //   const renderStepper = () => (
// //     <div style={styles.stepperContainer}>
// //       {[1, 2, 3, 4, 5, 6, 7].map((step) => {
// //         const isCompleted = step < currentStep;
// //         return (
// //           <React.Fragment key={step}>
// //             <div style={getStepCircleStyle(step)}>
// //               {isCompleted ? <Check size={16} /> : step}
// //             </div>
// //             {step < 7 && (
// //               <div
// //                 style={{
// //                   ...styles.stepperLine,
// //                   backgroundColor: step < currentStep ? '#059669' : '#e2e8f0'
// //                 }}
// //               />
// //             )}
// //           </React.Fragment>
// //         );
// //       })}
// //     </div>
// //   );

// //   return (
// //     <div style={styles.container}>
      
// //       {!isOpen ? (
// //         <div style={styles.initialCard}>
// //           <div style={styles.iconHeaderCircle}>
// //             <ShieldCheck size={32} />
// //           </div>
// //           <h1 style={styles.mainTitle}>Candidate Verification Portal</h1>
// //           <p style={styles.subtitle}>
// //             Start the 7-step identity, education, document, and background verification process.
// //           </p>
// //           <button onClick={() => setIsOpen(true)} style={styles.btnPrimaryFull}>
// //             <span>Start Verification Flow</span>
// //             <ChevronRight size={16} />
// //           </button>
// //         </div>
// //       ) : (
// //         <div style={styles.card}>
          
// //           {currentStep > 1 && currentStep < 7 && renderStepper()}

// //           <div style={styles.innerPadding}>

// //             {/* STEP 1: WELCOME SCREEN */}
// //             {currentStep === 1 && (
// //               <div style={{ textAlign: 'center' }}>
// //                 <div style={styles.step1IconCircle}>
// //                   <ShieldCheck size={36} />
// //                 </div>
// //                 <span style={styles.stepBadge}>Step 1 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Background Verification</h2>
// //                 <p style={styles.subtitle}>
// //                   Welcome! Please complete your background verification to proceed with your onboarding process.
// //                 </p>

// //                 <div style={{ ...styles.sectionBoxGray, textAlign: 'left' }}>
// //                   <h3 style={styles.sectionTitle}>Before you begin, ensure you have:</h3>
// //                   <div style={styles.flexColumnGap}>
// //                     <div style={styles.flexAlignGap}>
// //                       <div style={styles.badgeCheck}>✓</div>
// //                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Government ID (Aadhaar / PAN card)</span>
// //                     </div>
// //                     <div style={styles.flexAlignGap}>
// //                       <div style={styles.badgeCheck}>✓</div>
// //                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Educational Certificates (Degree / Marksheets)</span>
// //                     </div>
// //                     <div style={styles.flexAlignGap}>
// //                       <div style={styles.badgeCheck}>✓</div>
// //                       <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Employment details & HR contact information</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div style={styles.footer}>
// //                   <span style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated time: ~5 minutes</span>
// //                   <button onClick={nextStep} style={styles.btnPrimary}>
// //                     <span>Begin Verification</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 2: CONSENT & VERIFICATION */}
// //             {currentStep === 2 && (
// //               <div>
// //                 <span style={styles.stepBadge}>Step 2 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Consent & Verification</h2>
// //                 <p style={styles.subtitle}>Verify your email address and provide consent under DPDP Act.</p>

// //                 <div style={styles.sectionBox}>
// //                   <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
// //                     <label style={styles.label}>E-mail Verification</label>
// //                     <span style={styles.badgeGreen}>✓ E-mail Verified</span>
// //                   </div>
// //                   <div style={{ display: 'flex', gap: '8px' }}>
// //                     {[1, 2, 3, 4, 5, 6].map((i) => (
// //                       <input key={i} type="text" value="•" readOnly style={styles.otpInput} />
// //                     ))}
// //                   </div>
// //                   <div style={{ ...styles.flexRowBetween, fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
// //                     <span>Enter 6-digit OTP sent to priya.sharma@email.com</span>
// //                     <span style={{ color: '#2563eb', cursor: 'pointer' }}>Resend OTP</span>
// //                   </div>
// //                 </div>

// //                 <div style={styles.sectionBoxGray}>
// //                   <label style={styles.label}>Data Protection Consent (DPDP Act 2023)</label>
// //                   <div style={styles.termsBox}>
// //                     In accordance with the Digital Personal Data Protection Act, 2023, by checking the box below, you explicitly consent to the collection, processing, and sharing of your personal, educational, and professional data for background verification.
// //                   </div>
// //                   <label style={styles.checkboxLabel}>
// //                     <input type="checkbox" checked={dpdpAccepted} onChange={(e) => setDpdpAccepted(e.target.checked)} style={{ marginTop: '3px' }} />
// //                     <span style={{ fontSize: '12px', color: '#475569' }}>I have read and agree to the data protection consent terms and authorize background checks.</span>
// //                   </label>
// //                 </div>

// //                 <div style={styles.footer}>
// //                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
// //                   <button onClick={nextStep} disabled={!dpdpAccepted} style={{ ...styles.btnPrimary, opacity: dpdpAccepted ? 1 : 0.5, cursor: dpdpAccepted ? 'pointer' : 'not-allowed' }}>
// //                     <span>Give Consent & Continue</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 3: PERSONAL & IDENTITY */}
// //             {currentStep === 3 && (
// //               <div>
// //                 <span style={styles.stepBadge}>Step 3 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Personal & Identity</h2>
// //                 <p style={styles.subtitle}>Provide your personal details and government identity documents.</p>

// //                 <div style={styles.sectionBox}>
// //                   <h3 style={styles.sectionTitle}>Personal Details</h3>
                  
// //                   {/* FULL NAME & PROFILE IMAGE UPLOAD IN GRID */}
// //                   <div style={{ ...styles.grid2, alignItems: 'center', marginBottom: '16px' }}>
// //                     <div>
// //                       <label style={styles.label}>Full Name *</label>
// //                       <input 
// //                         type="text" 
// //                         value={personalDetails.fullName} 
// //                         onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })} 
// //                         style={styles.input} 
// //                       />
// //                     </div>

// //                     <div>
// //                       <label style={styles.label}>Candidate Photo *</label>
// //                       <div style={styles.avatarUploadContainer}>
// //                         <div style={styles.avatarCircle}>
// //                           {personalDetails.profileImagePreview ? (
// //                             <img 
// //                               src={personalDetails.profileImagePreview} 
// //                               alt="Candidate Profile" 
// //                               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
// //                             />
// //                           ) : (
// //                             <User size={36} color="#94a3b8" />
// //                           )}
// //                         </div>
// //                         <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
// //                           <label style={{ ...styles.uploadBtnLabel, width: 'fit-content' }}>
// //                             <Camera size={14} /> Upload Image
// //                             <input 
// //                               type="file" 
// //                               accept="image/*" 
// //                               style={{ display: 'none' }} 
// //                               onChange={handleProfileImageChange}
// //                             />
// //                           </label>
// //                           <span style={{ fontSize: '10px', color: '#94a3b8' }}>JPG, PNG (Max 5MB)</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div style={styles.grid2}>
// //                     <div>
// //                       <label style={styles.label}>Date of Birth</label>
// //                       <input type="date" style={styles.input} />
// //                     </div>
// //                     <div>
// //                       <label style={styles.label}>Gender</label>
// //                       <select style={styles.input}>
// //                         <option value="">Select</option>
// //                         <option value="female">Female</option>
// //                         <option value="male">Male</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div style={styles.grid2}>
// //                     <div>
// //                       <label style={styles.label}>Mobile</label>
// //                       <input type="text" value={personalDetails.mobile} readOnly style={styles.inputReadOnly} />
// //                     </div>
// //                     <div>
// //                       <label style={styles.label}>Email</label>
// //                       <input type="email" value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} style={styles.input} />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div style={styles.sectionBox}>
// //                   <h3 style={styles.sectionTitle}>Address Details</h3>
                  
// //                   {/* CURRENT ADDRESS BLOCK */}
// //                   <div style={{ marginBottom: '16px' }}>
// //                     <label style={styles.label}>Current Address *</label>
// //                     <textarea 
// //                       placeholder="Flat/House No., Street, Area, City, State — PIN" 
// //                       style={styles.textarea} 
// //                       value={personalDetails.currentAddress}
// //                       onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddress: e.target.value })}
// //                     />
                    
// //                     <div style={{ ...styles.grid2, marginTop: '12px' }}>
// //                       <div>
// //                         <label style={styles.label}>Current Address Proof Type *</label>
// //                         <select 
// //                           style={styles.input}
// //                           value={personalDetails.currentAddressDocType}
// //                           onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocType: e.target.value })}
// //                         >
// //                           <option value="">Select Document Type</option>
// //                           <option value="Aadhaar Card">Aadhaar Card</option>
// //                           <option value="Driving License">Driving License (DL)</option>
// //                           <option value="Electricity Bill">Electricity Bill</option>
// //                           <option value="Passport">Passport</option>
// //                           <option value="Rent Agreement">Rent Agreement</option>
// //                           <option value="Voter ID">Voter ID</option>
// //                         </select>
// //                       </div>
// //                       <div>
// //                         <label style={styles.label}>Upload Address Proof Document *</label>
// //                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //                           <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
// //                             <Upload size={14} /> Choose File
// //                             <input 
// //                               type="file" 
// //                               style={{ display: 'none' }}
// //                               accept=".pdf,.jpg,.jpeg,.png"
// //                               onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocFile: e.target.files[0] })}
// //                             />
// //                           </label>
// //                         </div>
// //                         {personalDetails.currentAddressDocFile && (
// //                           <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
// //                             ✓ {personalDetails.currentAddressDocFile.name}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />

// //                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', cursor: 'pointer' }}>
// //                     <input 
// //                       type="checkbox" 
// //                       checked={personalDetails.isPermanentSame}
// //                       onChange={(e) => {
// //                         const checked = e.target.checked;
// //                         setPersonalDetails({ 
// //                           ...personalDetails, 
// //                           isPermanentSame: checked,
// //                           permanentAddress: checked ? personalDetails.currentAddress : '',
// //                           permanentAddressDocType: checked ? personalDetails.currentAddressDocType : '',
// //                           permanentAddressDocFile: checked ? personalDetails.currentAddressDocFile : null
// //                         });
// //                       }}
// //                     />
// //                     <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>Permanent address same as current</span>
// //                   </label>

// //                   {/* PERMANENT ADDRESS BLOCK */}
// //                   {!personalDetails.isPermanentSame && (
// //                     <div style={{ marginTop: '12px' }}>
// //                       <label style={styles.label}>Permanent Address *</label>
// //                       <textarea 
// //                         placeholder="Flat/House No., Street, Area, City, State — PIN" 
// //                         style={styles.textarea} 
// //                         value={personalDetails.permanentAddress}
// //                         onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddress: e.target.value })}
// //                       />

// //                       <div style={{ ...styles.grid2, marginTop: '12px' }}>
// //                         <div>
// //                           <label style={styles.label}>Permanent Address Proof Type *</label>
// //                           <select 
// //                             style={styles.input}
// //                             value={personalDetails.permanentAddressDocType}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocType: e.target.value })}
// //                           >
// //                             <option value="">Select Document Type</option>
// //                             <option value="Aadhaar Card">Aadhaar Card</option>
// //                             <option value="Driving License">Driving License (DL)</option>
// //                             <option value="Electricity Bill">Electricity Bill</option>
// //                             <option value="Passport">Passport</option>
// //                             <option value="Rent Agreement">Rent Agreement</option>
// //                             <option value="Voter ID">Voter ID</option>
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>Upload Address Proof Document *</label>
// //                           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //                             <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
// //                               <Upload size={14} /> Choose File
// //                               <input 
// //                                 type="file" 
// //                                 style={{ display: 'none' }}
// //                                 accept=".pdf,.jpg,.jpeg,.png"
// //                                 onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocFile: e.target.files[0] })}
// //                               />
// //                             </label>
// //                           </div>
// //                           {personalDetails.permanentAddressDocFile && (
// //                             <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
// //                               ✓ {personalDetails.permanentAddressDocFile.name}
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* IDENTITY DOCUMENTS (AADHAAR & PAN) */}
// //                 <div style={styles.sectionBox}>
// //                   <h3 style={styles.sectionTitle}>
// //                     <CreditCard size={16} color="#2563eb" /> Identity Documents
// //                   </h3>
// //                   <div style={styles.grid2}>
// //                     <div>
// //                       <label style={styles.label}>Aadhaar Number *</label>
// //                       <input 
// //                         type="text" 
// //                         placeholder="Enter 12-digit Aadhaar Number" 
// //                         style={styles.input}
// //                         maxLength={12}
// //                         value={personalDetails.aadhaarNumber}
// //                         onChange={(e) => setPersonalDetails({ ...personalDetails, aadhaarNumber: e.target.value })}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label style={styles.label}>PAN Number *</label>
// //                       <input 
// //                         type="text" 
// //                         placeholder="ABCDE1234F" 
// //                         style={{ ...styles.input, textTransform: 'uppercase' }} 
// //                         maxLength={10}
// //                         value={personalDetails.panNumber}
// //                         onChange={(e) => setPersonalDetails({ ...personalDetails, panNumber: e.target.value.toUpperCase() })}
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* DIGILOCKER INTEGRATION BOX */}
// //                   <div style={styles.digilockerBox}>
// //                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// //                       <Lock size={20} color="#ea580c" />
// //                       <div>
// //                         <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: '#9a3412' }}>Fast-track with DigiLocker</h4>
// //                         <p style={{ fontSize: '11px', color: '#c2410c', margin: '2px 0 0 0' }}>Fetch verified Aadhaar & PAN instantly via DigiLocker.</p>
// //                       </div>
// //                     </div>
// //                     <button style={styles.digilockerBtn}>Connect DigiLocker</button>
// //                   </div>
// //                 </div>

// //                 <div style={styles.footer}>
// //                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
// //                   <button onClick={nextStep} style={styles.btnPrimary}>
// //                     <span>Verify Identity</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 4: EDUCATION & EMPLOYMENT */}
// //             {currentStep === 4 && (
// //               <div>
// //                 <span style={styles.stepBadge}>Step 4 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Education & Employment</h2>
// //                 <p style={styles.subtitle}>Add your qualifications and professional history.</p>

// //                 <div style={styles.tabContainer}>
// //                   <button
// //                     onClick={() => setStep4Tab('education')}
// //                     style={step4Tab === 'education' ? styles.tabBtnActive : styles.tabBtnInactive}
// //                   >
// //                     <GraduationCap size={16} /> Education
// //                   </button>
// //                   <button
// //                     onClick={() => setStep4Tab('employment')}
// //                     style={step4Tab === 'employment' ? styles.tabBtnActive : styles.tabBtnInactive}
// //                   >
// //                     <Briefcase size={16} /> Employment
// //                   </button>
// //                 </div>

// //                 {step4Tab === 'education' ? (
// //                   <div>
// //                     <div style={styles.sectionBox}>
// //                       <h3 style={styles.sectionTitle}>
// //                         <User size={16} color="#4f46e5" /> Candidate Information
// //                       </h3>
// //                       <div style={styles.grid5}>
// //                         <div>
// //                           <label style={styles.label}>Candidate Name *</label>
// //                           <input 
// //                             type="text" 
// //                             placeholder="Enter Candidate Name" 
// //                             style={styles.input}
// //                             value={personalDetails.fullName}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>Candidate ID *</label>
// //                           <input 
// //                             type="text" 
// //                             placeholder="Enter Candidate ID" 
// //                             style={styles.input}
// //                             value={personalDetails.candidateId}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, candidateId: e.target.value })}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>Client Name *</label>
// //                           <input 
// //                             type="text" 
// //                             placeholder="Enter Client Name" 
// //                             style={styles.input}
// //                             value={personalDetails.clientName}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, clientName: e.target.value })}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>Mobile Number *</label>
// //                           <input 
// //                             type="text" 
// //                             placeholder="Enter Mobile Number" 
// //                             style={styles.input}
// //                             value={personalDetails.mobile}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, mobile: e.target.value })}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>Email Address *</label>
// //                           <input 
// //                             type="email" 
// //                             placeholder="Enter Email Address" 
// //                             style={styles.input}
// //                             value={personalDetails.email}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {qualifications.map((qual, idx) => (
// //                       <div key={idx} style={styles.sectionBox}>
// //   {/* TOP HEADER */}
// //   <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
// //     <h3 style={styles.sectionTitle}>Qualification {idx + 1}</h3>
// //     {qualifications.length > 1 && (
// //       <button onClick={() => removeQualification(idx)} style={styles.btnRemove}>
// //         Remove
// //       </button>
// //     )}
// //   </div>

// //   {/* 1. PRIMARY SELECTION (NATIONAL / INTERNATIONAL TOP ROW) */}
// //   <div style={{ 
// //     backgroundColor: '#f8fafc', 
// //     padding: '12px 16px', 
// //     borderRadius: '8px', 
// //     border: '1px solid #e2e8f0', 
// //     marginBottom: '20px' 
// //   }}>
// //     <label style={{ ...styles.label, marginBottom: '8px', display: 'block', color: '#1e293b' }}>
// //       QUALIFICATION SCOPE *
// //     </label>
// //     <div style={{
// //       display: 'flex',
// //       background: 'rgb(226, 232, 240)',
// //       borderRadius: '8px',
// //       padding: '3px',
// //       width: '320px',
// //     }}>
// //       {/* NATIONAL LABEL */}
// //       <label style={{
// //         flex: '1 1 0%',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         gap: '6px',
// //         padding: '8px 12px',
// //         borderRadius: '6px',
// //         border: 'none',
// //         fontSize: '12px',
// //         fontWeight: 600,
// //         cursor: 'pointer',
// //         transition: '0.2s',
// //         /* DYNAMIC ACTIVE STATE HARDCODED BACKGROUND RESTORED */
// //         background: qual.nationalInternational === 'National' ? 'rgb(0, 56, 131)' : 'transparent',
// //         color: qual.nationalInternational === 'National' ? 'rgb(255, 255, 255)' : 'rgb(71, 85, 105)',
// //       }}>
// //         <input 
// //           type="radio" 
// //           name={`nat-int-${idx}`} 
// //           value="National" 
// //           checked={qual.nationalInternational === 'National'} 
// //           onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
// //           style={{ display: 'none' }}
// //         />
// //         National
// //       </label>

// //       {/* INTERNATIONAL LABEL */}
// //       <label style={{
// //         flex: '1 1 0%',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         gap: '6px',
// //         padding: '8px 12px',
// //         borderRadius: '6px',
// //         border: 'none',
// //         fontSize: '12px',
// //         fontWeight: 600,
// //         cursor: 'pointer',
// //         transition: '0.2s',
// //         /* DYNAMIC ACTIVE STATE HARDCODED BACKGROUND RESTORED */
// //         background: qual.nationalInternational === 'International' ? 'rgb(0, 56, 131)' : 'transparent',
// //         color: qual.nationalInternational === 'International' ? 'rgb(255, 255, 255)' : 'rgb(71, 85, 105)',
// //       }}>
// //         <input 
// //           type="radio" 
// //           name={`nat-int-${idx}`} 
// //           value="International" 
// //           checked={qual.nationalInternational === 'International'} 
// //           onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
// //           style={{ display: 'none' }}
// //         />
// //         International
// //       </label>
// //     </div>
// //   </div>

// //   {/* 2. MAIN QUALIFICATION DETAILS */}
// //   <div style={{ ...styles.grid5, marginBottom: '16px' }}>
// //     <div>
// //       <label style={styles.label}>Qualification Type *</label>
// //       <select 
// //         style={styles.input}
// //         value={qual.qualificationType}
// //         onChange={(e) => handleQualificationChange(idx, 'qualificationType', e.target.value)}
// //       >
// //         <option value="">Select Qualification Type</option>
// //         <option value="Post Graduate">Post Graduate</option>
// //         <option value="Graduate">Graduate</option>
// //         <option value="Diploma">Diploma</option>
// //         <option value="12th">12th Standard</option>
// //         <option value="10th">10th Standard</option>
// //       </select>
// //     </div>
// //     <div>
// //       <label style={styles.label}>Course / Stream *</label>
// //       <select 
// //         style={styles.input}
// //         value={qual.courseStream}
// //         onChange={(e) => handleQualificationChange(idx, 'courseStream', e.target.value)}
// //       >
// //         <option value="">Select Course / Stream</option>
// //         <option value="B.Tech">B.Tech / B.E.</option>
// //         <option value="B.Sc">B.Sc</option>
// //         <option value="B.Com">B.Com</option>
// //         <option value="B.A">B.A</option>
// //         <option value="MCA">MCA</option>
// //       </select>
// //     </div>
// //     <div>
// //       <label style={styles.label}>Specialization (Optional)</label>
// //       <input 
// //         type="text" 
// //         placeholder="Enter Specialization" 
// //         style={styles.input}
// //         value={qual.specialization}
// //         onChange={(e) => handleQualificationChange(idx, 'specialization', e.target.value)}
// //       />
// //     </div>
// //     <div>
// //       <label style={styles.label}>Institute / University *</label>
// //       <select 
// //         style={styles.input}
// //         value={qual.institute}
// //         onChange={(e) => handleQualificationChange(idx, 'institute', e.target.value)}
// //       >
// //         <option value="">Enter Institute / School / Univer</option>
// //         <option value="University of Mumbai">University of Mumbai</option>
// //         <option value="Delhi University">Delhi University</option>
// //         <option value="IIT Bombay">IIT Bombay</option>
// //         <option value="Other">Other</option>
// //       </select>
// //     </div>
// //     <div>
// //       <label style={styles.label}>Board / University *</label>
// //       <select 
// //         style={styles.input}
// //         value={qual.boardUniversity}
// //         onChange={(e) => handleQualificationChange(idx, 'boardUniversity', e.target.value)}
// //       >
// //         <option value="">Select Board / University</option>
// //         <option value="State Board">State Board</option>
// //         <option value="CBSE">CBSE</option>
// //         <option value="ICSE">ICSE</option>
// //         <option value="Deemed University">Deemed University</option>
// //       </select>
// //     </div>
// //   </div>

// //   {/* 3. CONDITIONAL VERIFICATION & YOP SECTION */}
// //   {qual.nationalInternational === 'National' && (
// //     <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )', gap: '12px', marginBottom: '16px' }}>
// //       <div>
// //         <label style={styles.label}>Verification Fees By *</label>
// //         <select 
// //           style={styles.input}
// //           value={qual.verificationFeesBy}
// //           onChange={(e) => handleQualificationChange(idx, 'verificationFeesBy', e.target.value)}
// //         >
// //           <option value="">Select Verification Type</option>
// //           <option value="Normal">Normal</option>
// //           <option value="Year of Passing">Year of Passing</option>
// //           <option value="UG/PG">UG/PG</option>
// //         </select>
// //       </div>

// //       {qual.verificationFeesBy === 'Year of Passing' && (
// //         <>
// //           <div>
// //             <label style={styles.label}>From YOP *</label>
// //             <input 
// //               type="text" 
// //               placeholder="YYYY" 
// //               style={styles.input}
// //               value={qual.fromYop}
// //               onChange={(e) => handleQualificationChange(idx, 'fromYop', e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <label style={styles.label}>To YOP *</label>
// //             <input 
// //               type="text" 
// //               placeholder="YYYY" 
// //               style={styles.input}
// //               value={qual.toYop}
// //               onChange={(e) => handleQualificationChange(idx, 'toYop', e.target.value)}
// //             />
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   )}

// //   {/* 4. FEES DETAILS SECTION */}
// //   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
// //     <div>
// //       <label style={styles.label}>Verification Fees (₹)</label>
// //       <input 
// //         type="text" 
// //         placeholder="Enter Verification Fees" 
// //         style={styles.input}
// //         value={qual.universityFees}
// //         onChange={(e) => handleQualificationChange(idx, 'universityFees', e.target.value)}
// //       />
// //     </div>

// //     <div>
// //       <label style={styles.label}>GST (₹)</label>
// //       <input 
// //         type="text" 
// //         placeholder="Enter GST" 
// //         style={styles.input}
// //         value={qual.commission}
// //         onChange={(e) => handleQualificationChange(idx, 'commission', e.target.value)}
// //       />
// //     </div>

// //     <div>
// //       <label style={styles.label}>Total Amount (₹)</label>
// //       <input 
// //         type="text" 
// //         placeholder="Enter Total Amount" 
// //         style={styles.input}
// //         value={qual.serviceCharge}
// //         onChange={(e) => handleQualificationChange(idx, 'serviceCharge', e.target.value)}
// //       />
// //     </div>
// //   </div>

// //   {/* 5. DOCUMENTS SECTION */}
// //   <div>
// //     <label style={styles.label}>DOCUMENTS * (Upload up to 4 documents)</label>
// //     <div style={styles.docGrid}>
// //       {[1, 2, 3, 4].map((docNum, dIdx) => (
// //         <div key={dIdx} style={styles.docBox}>
// //           <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
// //             Document {docNum}
// //           </div>
// //           <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '10px' }}>
// //             PDF, JPG, PNG (Max 10MB)
// //           </div>
// //           <label style={styles.uploadBtnLabel}>
// //             <Upload size={12} /> Choose File
// //             <input 
// //               type="file" 
// //               style={{ display: 'none' }}
// //               accept=".pdf,.jpg,.jpeg,.png"
// //               onChange={(e) => handleQualDocumentUpload(idx, dIdx, e.target.files[0])}
// //             />
// //           </label>
// //           {qual.documents[dIdx] && (
// //             <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
// //               {qual.documents[dIdx].name}
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // </div>
// //                     ))}

// //                     <button onClick={addQualification} style={styles.btnDashedAdd}>+ Add Qualification</button>
// //                   </div>
// //                 ) : (
// //                   <div>
// //                     <div style={styles.sectionBox}>
// //                       <h3 style={styles.sectionTitleCentered}>Candidate Details</h3>
// //                       <div style={styles.grid2}>
// //                         <div>
// //                           <label style={styles.label}>CANDIDATE NAME *</label>
// //                           <input 
// //                             type="text" 
// //                             placeholder="Enter candidate name" 
// //                             style={styles.input}
// //                             value={personalDetails.fullName}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={styles.label}>DATE *</label>
// //                           <input 
// //                             type="date" 
// //                             style={styles.input}
// //                             value={personalDetails.candidateDate}
// //                             onChange={(e) => setPersonalDetails({ ...personalDetails, candidateDate: e.target.value })}
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {employers.map((emp, idx) => (
// //                       <div key={idx} style={styles.sectionBox}>
// //                         <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
// //                           <h3 style={styles.sectionTitle}>Employer {idx + 1}</h3>
// //                           {employers.length > 1 && (
// //                             <button onClick={() => removeEmployer(idx)} style={styles.btnRemove}>
// //                               Remove
// //                             </button>
// //                           )}
// //                         </div>

// //                         <div style={styles.grid3}>
// //                           <div>
// //                             <label style={styles.label}>Company Name *</label>
// //                             <input 
// //                               type="text" 
// //                               placeholder="Enter company name" 
// //                               style={styles.input}
// //                               value={emp.companyName}
// //                               onChange={(e) => handleEmployerChange(idx, 'companyName', e.target.value)}
// //                             />
// //                           </div>
// //                           <div>
// //                             <label style={styles.label}>Designation *</label>
// //                             <input 
// //                               type="text" 
// //                               placeholder="Enter designation" 
// //                               style={styles.input}
// //                               value={emp.designation}
// //                               onChange={(e) => handleEmployerChange(idx, 'designation', e.target.value)}
// //                             />
// //                           </div>
// //                           <div>
// //                             <label style={styles.label}>Employee ID</label>
// //                             <input 
// //                               type="text" 
// //                               placeholder="Enter employee ID" 
// //                               style={styles.input}
// //                               value={emp.employeeId}
// //                               onChange={(e) => handleEmployerChange(idx, 'employeeId', e.target.value)}
// //                             />
// //                           </div>
// //                         </div>

// //                         <div style={styles.grid2}>
// //                           <div>
// //                             <label style={styles.label}>HR Email ID *</label>
// //                             <input 
// //                               type="email" 
// //                               placeholder="Enter HR email ID" 
// //                               style={styles.input}
// //                               value={emp.hrEmail}
// //                               onChange={(e) => handleEmployerChange(idx, 'hrEmail', e.target.value)}
// //                             />
// //                           </div>
// //                           <div>
// //                             <label style={styles.label}>HR Phone Number *</label>
// //                             <div style={{ display: 'flex', gap: '8px' }}>
// //                               <select 
// //                                 style={{ ...styles.input, width: '80px' }}
// //                                 value={emp.hrPhoneCode}
// //                                 onChange={(e) => handleEmployerChange(idx, 'hrPhoneCode', e.target.value)}
// //                               >
// //                                 <option value="+91">+91</option>
// //                               </select>
// //                               <input 
// //                                 type="text" 
// //                                 placeholder="Enter phone number" 
// //                                 style={{ ...styles.input, flex: 1 }}
// //                                 value={emp.hrPhone}
// //                                 onChange={(e) => handleEmployerChange(idx, 'hrPhone', e.target.value)}
// //                               />
// //                             </div>
// //                           </div>
// //                         </div>

// //                         <div style={styles.grid2}>
// //                           <div>
// //                             <label style={styles.label}>Date of Joining (DOJ) *</label>
// //                             <input 
// //                               type="date" 
// //                               style={styles.input}
// //                               value={emp.doj}
// //                               onChange={(e) => handleEmployerChange(idx, 'doj', e.target.value)}
// //                             />
// //                           </div>
// //                           <div>
// //                             <label style={styles.label}>Date of Exit (DOE) *</label>
// //                             <input 
// //                               type="date" 
// //                               style={styles.input}
// //                               value={emp.doe}
// //                               onChange={(e) => handleEmployerChange(idx, 'doe', e.target.value)}
// //                             />
// //                           </div>
// //                         </div>

// //                         <div>
// //                           <label style={styles.label}>Documents * (Upload up to 4 documents)</label>
// //                           <div style={styles.docGrid}>
// //                             {[1, 2, 3, 4].map((docNum, dIdx) => (
// //                               <div key={dIdx} style={styles.docBox}>
// //                                 <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
// //                                   Document {docNum}
// //                                 </div>
// //                                 <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
// //                                   PDF, JPG, PNG (Max 10MB)
// //                                 </div>
// //                                 <label style={styles.uploadBtnLabel}>
// //                                   <Upload size={14} /> Choose File
// //                                   <input 
// //                                     type="file" 
// //                                     style={{ display: 'none' }}
// //                                     accept=".pdf,.jpg,.jpeg,.png"
// //                                     onChange={(e) => handleFileUpload(idx, dIdx, e.target.files[0])}
// //                                   />
// //                                 </label>
// //                                 {emp.documents[dIdx] && (
// //                                   <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
// //                                     {emp.documents[dIdx].name}
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>

// //                       </div>
// //                     ))}
// //                     <button onClick={addEmployer} style={styles.btnDashedAdd}>+ Add Employer</button>
// //                   </div>
// //                 )}

// //                 <div style={styles.footer}>
// //                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
// //                   <button onClick={nextStep} style={styles.btnPrimary}>
// //                     <span>Continue</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 5: DOCUMENT UPLOAD */}
// //             {currentStep === 5 && (
// //               <div>
// //                 <span style={styles.stepBadge}>Step 5 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Document Upload</h2>
// //                 <p style={styles.subtitle}>Upload a supporting certificate. Our AI will extract and verify content automatically.</p>

// //                 {uploadedFile && (
// //                   <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
// //                     <div style={{ ...styles.sectionBox, ...styles.flexRowBetween, padding: '12px 16px', margin: 0 }}>
// //                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// //                         <FileText color="#2563eb" size={24} />
// //                         <div>
// //                           <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>{uploadedFile.name}</h4>
// //                           <span style={{ fontSize: '11px', color: '#94a3b8' }}>{uploadedFile.status}</span>
// //                         </div>
// //                       </div>
// //                       <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setUploadedFile(null)} />
// //                     </div>

// //                     <div style={styles.sectionBox}>
// //                       <div style={{ ...styles.flexRowBetween, marginBottom: '8px' }}>
// //                         <span style={styles.label}>AI Confidence Score</span>
// //                         <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>96%</span>
// //                       </div>
// //                       <div style={styles.progressBarBg}>
// //                         <div style={styles.progressBarFill} />
// //                       </div>
// //                     </div>

// //                     <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
// //                       <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0' }}>
// //                         <span style={styles.label}>OCR Extracted Fields</span>
// //                       </div>
// //                       {uploadedFile.ocrData.map((row, i) => (
// //                         <div key={i} style={{ ...styles.ocrRow, borderBottom: i < uploadedFile.ocrData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
// //                           <span style={{ color: '#64748b' }}>{row.label}</span>
// //                           <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{row.value}</span>
// //                           <span style={styles.badgeGreen}>✓ Match</span>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
// //                       <button style={styles.btnAccept}>
// //                         <Check size={16} /> Auto Accept
// //                       </button>
// //                       <button style={styles.btnFlag}>
// //                         <Eye size={16} /> Flag for Review
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div style={styles.footer}>
// //                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
// //                   <button onClick={nextStep} style={styles.btnPrimary}>
// //                     <span>Continue</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 6: REVIEW & SUBMIT */}
// //             {currentStep === 6 && (
// //               <div>
// //                 <span style={styles.stepBadge}>Step 6 of 7</span>
// //                 <h2 style={styles.stepHeaderTitle}>Review & Submit</h2>
// //                 <p style={styles.subtitle}>Verify all information before submitting your verification request.</p>

// //                 <div style={styles.sectionBox}>
// //                   <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
// //                     <h3 style={styles.sectionTitle}>Personal Information</h3>
// //                     <span onClick={() => setCurrentStep(3)} style={{ color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</span>
// //                   </div>
// //                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
// //                     <div><span style={{ color: '#94a3b8' }}>Full Name</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.fullName}</p></div>
// //                     <div><span style={{ color: '#94a3b8' }}>Mobile</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.mobile}</p></div>
// //                     <div><span style={{ color: '#94a3b8' }}>Email</span><p style={{ fontWeight: '700', margin: '2px 0' }}>{personalDetails.email}</p></div>
// //                   </div>
// //                 </div>

// //                 <div style={styles.sectionBoxAmber}>
// //                   <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
// //                     <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} style={{ marginTop: '2px' }} />
// //                     <span style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
// //                       I hereby declare that all information provided is true and accurate to the best of my knowledge.
// //                     </span>
// //                   </label>
// //                 </div>

// //                 <div style={styles.footer}>
// //                   <button onClick={prevStep} style={styles.btnSecondary}><ChevronLeft size={16} /> Back</button>
// //                   <button onClick={nextStep} disabled={!declarationAccepted} style={{ ...styles.btnPrimary, opacity: declarationAccepted ? 1 : 0.5, cursor: declarationAccepted ? 'pointer' : 'not-allowed' }}>
// //                     <span>Submit for Verification</span>
// //                     <ChevronRight size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 7: VERIFICATION SUBMITTED */}
// //             {currentStep === 7 && (
// //               <div style={{ textAlign: 'center' }}>
// //                 <div style={styles.successIconCircle}>
// //                   <Check size={36} />
// //                 </div>
// //                 <h2 style={styles.stepHeaderTitle}>Verification Submitted</h2>
// //                 <p style={{ ...styles.subtitle, fontSize: '13px' }}>
// //                   Your background verification request has been submitted. We will notify you at <b>{personalDetails.email}</b>.
// //                 </p>

// //                 <div style={{ ...styles.sectionBox, textAlign: 'left' }}>
// //                   <h3 style={styles.sectionTitle}>Reference Details</h3>
// //                   <div style={{ ...styles.flexColumnGap, gap: '8px', fontSize: '13px' }}>
// //                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Case ID</span><span style={{ fontFamily: 'monospace', fontWeight: '700' }}>BGV-2024-08734</span></div>
// //                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Submitted</span><span style={{ fontWeight: '700' }}>25 August 2026</span></div>
// //                     <div style={styles.flexRowBetween}><span style={{ color: '#94a3b8' }}>Company</span><span style={{ fontWeight: '700' }}>Accenture Solutions Pvt. Ltd.</span></div>
// //                   </div>
// //                 </div>

// //                 <button style={styles.btnOutlineFull}>
// //                   <Download size={16} /> Download Acknowledgment PDF
// //                 </button>
// //               </div>
// //             )}

// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../src/config";

// // ── Field shapes below match exactly what the admin pages
// // (EmploymentCheck.jsx, EducationCheck.jsx) save via their own PATCH
// // calls to /cases/{caseId}/checks/{checkKey} — this wizard writes to the
// // same case_checks.fields column via /candidate-link/{token}/fields, so
// // keeping the shape identical means a candidate's submission renders
// // correctly on EmploymentUserProfile / EducationUserProfile without any
// // translation step.

// const EMPTY_EMPLOYER = () => ({
//   companyName: "",
//   designation: "",
//   employeeId: "",
//   hrEmail: "",
//   hrPhone: "",
//   doj: "",
//   doe: "",
// });

// const EMPTY_QUALIFICATION = () => ({
//   qualificationType: "",
//   courseStream: "",
//   specialization: "",
//   instituteUniversity: "",
//   boardUniversity: "",
//   studyType: "National",
// });

// const CHECK_LABELS = {
//   employment: "Employment History",
//   education: "Education Details",
//   address: "Address Details",
//   database: "Identity Documents",
//   criminal: "Police Verification",
//   drug: "Drug Test",
//   court: "Court Records",
// };

// const inputStyle = {
//   width: "100%",
//   padding: "10px 12px",
//   borderRadius: "8px",
//   border: "1px solid #cbd5e1",
//   fontSize: "14px",
//   outline: "none",
//   boxSizing: "border-box",
//   marginBottom: "12px",
// };

// const labelStyle = {
//   display: "block",
//   fontSize: "12px",
//   fontWeight: 700,
//   color: "#374151",
//   marginBottom: "6px",
// };

// export default function CandidateVerificationWizard() {
//   const { token } = useParams();

//   const [status, setStatus] = useState("loading"); // loading | ready | expired | submitted | invalid | error
//   const [linkData, setLinkData] = useState(null);
//   const [checkDetails, setCheckDetails] = useState({});
//   const [stepIndex, setStepIndex] = useState(0);
//   const [stepData, setStepData] = useState({}); // { [checkType]: fields object, live-edited }
//   const [saving, setSaving] = useState(false);
//   const [validationError, setValidationError] = useState("");
//   const [uploadFiles, setUploadFiles] = useState({}); // { [checkType]: File }

//   useEffect(() => {
//     if (!token) {
//       setStatus("invalid");
//       return;
//     }

//     fetch(`${API_URL}/api/candidate-link/${token}`)
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.status === 410 && data.expired) {
//           setStatus("expired");
//           return;
//         }
//         if (data.submitted) {
//           setStatus("submitted");
//           return;
//         }
//         if (!res.ok) {
//           setStatus("invalid");
//           return;
//         }
//         setLinkData(data.link);
//         setCheckDetails(data.checkDetails || {});

//         // Seed each step's editable state from whatever is already saved
//         // (admin-entered fields, if any) — never starts from a blank slate
//         // that would wipe existing data on save.
//         const initialStepData = {};
//         (data.link.checks || []).forEach((checkType) => {
//           const existing = data.checkDetails?.[checkType]?.fields || {};
//           initialStepData[checkType] = seedFieldsForCheck(checkType, existing, data.link);
//         });
//         setStepData(initialStepData);
//         setStatus("ready");
//       })
//       .catch(() => setStatus("error"));
//   }, [token]);

//   const seedFieldsForCheck = (checkType, existing, link) => {
//     if (checkType === "employment") {
//       return {
//         ...existing,
//         candidate_name: existing.candidate_name || link.candidateName || "",
//         date: existing.date || new Date().toISOString().slice(0, 10),
//         employers: Array.isArray(existing.employers) && existing.employers.length > 0
//           ? existing.employers
//           : [EMPTY_EMPLOYER()],
//       };
//     }
//     if (checkType === "education") {
//       return {
//         ...existing,
//         candidate_name: existing.candidate_name || link.candidateName || "",
//         candidate_id: existing.candidate_id || "",
//         mobile_number: existing.mobile_number || link.mobile || "",
//         email_address: existing.email_address || link.email || "",
//         qualifications: Array.isArray(existing.qualifications) && existing.qualifications.length > 0
//           ? existing.qualifications
//           : [EMPTY_QUALIFICATION()],
//       };
//     }
//     // Generic fallback for any check type without a dedicated UI
//     return {
//       ...existing,
//       candidate_name: existing.candidate_name || link.candidateName || "",
//       notes: existing.notes || "",
//     };
//   };

//   const checks = linkData?.checks || [];
//   const currentCheckType = checks[stepIndex];
//   const currentFields = stepData[currentCheckType] || {};

//   const updateField = (field, value) => {
//     setStepData((prev) => ({
//       ...prev,
//       [currentCheckType]: { ...prev[currentCheckType], [field]: value },
//     }));
//   };

//   const updateArrayItem = (arrayKey, index, field, value) => {
//     setStepData((prev) => {
//       const arr = [...(prev[currentCheckType][arrayKey] || [])];
//       arr[index] = { ...arr[index], [field]: value };
//       return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: arr } };
//     });
//   };

//   const addArrayItem = (arrayKey, emptyItemFn, max) => {
//     setStepData((prev) => {
//       const arr = prev[currentCheckType][arrayKey] || [];
//       if (arr.length >= max) return prev;
//       return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: [...arr, emptyItemFn()] } };
//     });
//   };

//   const removeArrayItem = (arrayKey, index) => {
//     setStepData((prev) => {
//       const arr = prev[currentCheckType][arrayKey] || [];
//       if (arr.length <= 1) return prev;
//       return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: arr.filter((_, i) => i !== index) } };
//     });
//   };

//   const validateStep = () => {
//     if (currentCheckType === "employment") {
//       if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
//       const emp = currentFields.employers?.[0];
//       if (!emp?.companyName?.trim()) return "Please enter at least one employer's company name.";
//       if (!emp?.hrEmail?.trim()) return "Please enter that employer's HR email.";
//       return "";
//     }
//     if (currentCheckType === "education") {
//       if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
//       const qual = currentFields.qualifications?.[0];
//       if (!qual?.qualificationType?.trim()) return "Please select at least one qualification type.";
//       if (!qual?.instituteUniversity?.trim()) return "Please enter that qualification's institute/university.";
//       return "";
//     }
//     if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
//     return "";
//   };

//   const saveCurrentStep = async () => {
//     const err = validateStep();
//     if (err) {
//       setValidationError(err);
//       return false;
//     }
//     setValidationError("");
//     setSaving(true);

//     try {
//       const res = await fetch(`${API_URL}/api/candidate-link/${token}/fields`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           check_type: currentCheckType,
//           fields: currentFields,
//         }),
//       });
//       if (!res.ok) throw new Error("Save failed");

//       const file = uploadFiles[currentCheckType];
//       if (file) {
//         const body = new FormData();
//         body.append("check_type", currentCheckType);
//         body.append("document_key", "supporting_doc");
//         body.append("file", file);
//         await fetch(`${API_URL}/api/candidate-link/${token}/documents`, {
//           method: "POST",
//           body,
//         });
//       }
//       return true;
//     } catch {
//       setValidationError("Something went wrong saving this step. Please try again.");
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleNext = async () => {
//     const ok = await saveCurrentStep();
//     if (!ok) return;
//     if (stepIndex < checks.length - 1) {
//       setStepIndex((i) => i + 1);
//     } else {
//       await handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     setValidationError("");
//     setStepIndex((i) => Math.max(0, i - 1));
//   };

//   const handleSubmit = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch(`${API_URL}/api/candidate-link/${token}/submit`, {
//         method: "POST",
//       });
//       if (!res.ok) throw new Error();
//       setStatus("submitted");
//     } catch {
//       setValidationError("Couldn't submit — please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Render states ─────────────────────────────────────────────────────
//   if (status === "loading") {
//     return <CenteredMessage>Loading your verification form…</CenteredMessage>;
//   }
//   if (status === "invalid") {
//     return <CenteredMessage title="Link not found">This verification link is invalid. Please check the link your employer sent you, or contact them for a new one.</CenteredMessage>;
//   }
//   if (status === "expired") {
//     return <CenteredMessage title="Link expired">This verification link has expired. Please contact whoever sent it to you for a new link.</CenteredMessage>;
//   }
//   if (status === "submitted") {
//     return (
//       <CenteredMessage title="Thank you!">
//         Your information has been submitted successfully. The team reviewing your background verification will be in touch if anything else is needed.
//       </CenteredMessage>
//     );
//   }
//   if (status === "error") {
//     return <CenteredMessage title="Something went wrong">We couldn't load this page right now. Please try again in a moment.</CenteredMessage>;
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
//       <div style={{ maxWidth: "680px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "24px" }}>
//           <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>Background Verification</h1>
//           <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
//             Hi {linkData.candidateName} — please complete the section{checks.length > 1 ? "s" : ""} below.
//           </p>
//         </div>

//         {/* Step indicator */}
//         {checks.length > 1 && (
//           <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
//             {checks.map((c, i) => (
//               <div
//                 key={c}
//                 style={{
//                   padding: "6px 14px",
//                   borderRadius: "20px",
//                   fontSize: "12px",
//                   fontWeight: 700,
//                   background: i === stepIndex ? "#2563eb" : i < stepIndex ? "#dcfce7" : "#e2e8f0",
//                   color: i === stepIndex ? "#fff" : i < stepIndex ? "#166534" : "#64748b",
//                 }}
//               >
//                 {i < stepIndex ? "✓ " : ""}{CHECK_LABELS[c] || c}
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
//           <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginTop: 0 }}>
//             {CHECK_LABELS[currentCheckType] || currentCheckType}
//           </h2>

//           {currentCheckType === "employment" && (
//             <EmploymentStep
//               fields={currentFields}
//               updateField={updateField}
//               updateArrayItem={updateArrayItem}
//               addArrayItem={addArrayItem}
//               removeArrayItem={removeArrayItem}
//             />
//           )}

//           {currentCheckType === "education" && (
//             <EducationStep
//               fields={currentFields}
//               updateField={updateField}
//               updateArrayItem={updateArrayItem}
//               addArrayItem={addArrayItem}
//               removeArrayItem={removeArrayItem}
//             />
//           )}

//           {currentCheckType !== "employment" && currentCheckType !== "education" && (
//             <GenericStep fields={currentFields} updateField={updateField} />
//           )}

//           {/* Optional supporting document, any check type */}
//           <div style={{ marginTop: "12px" }}>
//             <label style={labelStyle}>Supporting Document (optional)</label>
//             <input
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={(e) => setUploadFiles((prev) => ({ ...prev, [currentCheckType]: e.target.files[0] }))}
//               style={{ fontSize: "13px" }}
//             />
//           </div>

//           {validationError && (
//             <div style={{ marginTop: "16px", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "13px" }}>
//               {validationError}
//             </div>
//           )}

//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
//             <button
//               onClick={handleBack}
//               disabled={stepIndex === 0 || saving}
//               style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", color: "#475569", fontWeight: 600, cursor: stepIndex === 0 ? "not-allowed" : "pointer", opacity: stepIndex === 0 ? 0.5 : 1 }}
//             >
//               ← Back
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={saving}
//               style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
//             >
//               {saving ? "Saving…" : stepIndex < checks.length - 1 ? "Save & Continue →" : "Submit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CenteredMessage({ title, children }) {
//   return (
//     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "24px" }}>
//       <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "32px", maxWidth: "420px", textAlign: "center" }}>
//         {title && <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginTop: 0 }}>{title}</h2>}
//         <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>{children}</p>
//       </div>
//     </div>
//   );
// }

// function EmploymentStep({ fields, updateField, updateArrayItem, addArrayItem, removeArrayItem }) {
//   const employers = fields.employers || [];
//   return (
//     <div>
//       <label style={labelStyle}>Full Name *</label>
//       <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />

//       <label style={labelStyle}>Date</label>
//       <input style={inputStyle} type="date" value={fields.date || ""} onChange={(e) => updateField("date", e.target.value)} />

//       <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginTop: "16px" }}>Previous Employers (up to 4)</p>

//       {employers.map((emp, idx) => (
//         <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", marginBottom: "12px", background: "#f8fafc" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
//             <strong style={{ fontSize: "13px" }}>Employer {idx + 1}</strong>
//             {employers.length > 1 && (
//               <button onClick={() => removeArrayItem("employers", idx)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "12px" }}>Remove</button>
//             )}
//           </div>
//           <label style={labelStyle}>Company Name *</label>
//           <input style={inputStyle} type="text" value={emp.companyName || ""} onChange={(e) => updateArrayItem("employers", idx, "companyName", e.target.value)} />
//           <label style={labelStyle}>Designation</label>
//           <input style={inputStyle} type="text" value={emp.designation || ""} onChange={(e) => updateArrayItem("employers", idx, "designation", e.target.value)} />
//           <label style={labelStyle}>Employee ID</label>
//           <input style={inputStyle} type="text" value={emp.employeeId || ""} onChange={(e) => updateArrayItem("employers", idx, "employeeId", e.target.value)} />
//           <label style={labelStyle}>HR Email *</label>
//           <input style={inputStyle} type="email" value={emp.hrEmail || ""} onChange={(e) => updateArrayItem("employers", idx, "hrEmail", e.target.value)} />
//           <label style={labelStyle}>HR Phone</label>
//           <input style={inputStyle} type="text" value={emp.hrPhone || ""} onChange={(e) => updateArrayItem("employers", idx, "hrPhone", e.target.value)} />
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//             <div>
//               <label style={labelStyle}>Date of Joining</label>
//               <input style={inputStyle} type="date" value={emp.doj || ""} onChange={(e) => updateArrayItem("employers", idx, "doj", e.target.value)} />
//             </div>
//             <div>
//               <label style={labelStyle}>Date of Exit</label>
//               <input style={inputStyle} type="date" value={emp.doe || ""} onChange={(e) => updateArrayItem("employers", idx, "doe", e.target.value)} />
//             </div>
//           </div>
//         </div>
//       ))}

//       {employers.length < 4 && (
//         <button onClick={() => addArrayItem("employers", EMPTY_EMPLOYER, 4)} style={{ background: "none", border: "1px dashed #2563eb", color: "#2563eb", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
//           + Add Another Employer
//         </button>
//       )}
//     </div>
//   );
// }

// function EducationStep({ fields, updateField, updateArrayItem, addArrayItem, removeArrayItem }) {
//   const qualifications = fields.qualifications || [];
//   return (
//     <div>
//       <label style={labelStyle}>Full Name *</label>
//       <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />
//       <label style={labelStyle}>Candidate ID</label>
//       <input style={inputStyle} type="text" value={fields.candidate_id || ""} onChange={(e) => updateField("candidate_id", e.target.value)} />
//       <label style={labelStyle}>Mobile Number</label>
//       <input style={inputStyle} type="text" value={fields.mobile_number || ""} onChange={(e) => updateField("mobile_number", e.target.value)} />
//       <label style={labelStyle}>Email Address</label>
//       <input style={inputStyle} type="email" value={fields.email_address || ""} onChange={(e) => updateField("email_address", e.target.value)} />

//       <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginTop: "16px" }}>Qualifications</p>

//       {qualifications.map((q, idx) => (
//         <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", marginBottom: "12px", background: "#f8fafc" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
//             <strong style={{ fontSize: "13px" }}>Qualification {idx + 1}</strong>
//             {qualifications.length > 1 && (
//               <button onClick={() => removeArrayItem("qualifications", idx)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "12px" }}>Remove</button>
//             )}
//           </div>
//           <label style={labelStyle}>Qualification Type *</label>
//           <select style={inputStyle} value={q.qualificationType || ""} onChange={(e) => updateArrayItem("qualifications", idx, "qualificationType", e.target.value)}>
//             <option value="">Select</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Post Graduation">Post Graduation</option>
//             <option value="Diploma">Diploma</option>
//             <option value="10th / 12th">10th / 12th</option>
//           </select>
//           <label style={labelStyle}>Course / Stream</label>
//           <input style={inputStyle} type="text" value={q.courseStream || ""} onChange={(e) => updateArrayItem("qualifications", idx, "courseStream", e.target.value)} />
//           <label style={labelStyle}>Institute / University *</label>
//           <input style={inputStyle} type="text" value={q.instituteUniversity || ""} onChange={(e) => updateArrayItem("qualifications", idx, "instituteUniversity", e.target.value)} />
//           <label style={labelStyle}>Board / University</label>
//           <input style={inputStyle} type="text" value={q.boardUniversity || ""} onChange={(e) => updateArrayItem("qualifications", idx, "boardUniversity", e.target.value)} />
//         </div>
//       ))}

//       <button onClick={() => addArrayItem("qualifications", EMPTY_QUALIFICATION, 8)} style={{ background: "none", border: "1px dashed #2563eb", color: "#2563eb", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
//         + Add Another Qualification
//       </button>
//     </div>
//   );
// }

// // Fallback for any check type this wizard doesn't have dedicated fields
// // for yet (address, database, criminal, drug, court) — a single free-text
// // field rather than guessing that check's exact saved shape.
// function GenericStep({ fields, updateField }) {
//   return (
//     <div>
//       <label style={labelStyle}>Full Name *</label>
//       <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />
//       <label style={labelStyle}>Details</label>
//       <textarea
//         style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
//         value={fields.notes || ""}
//         onChange={(e) => updateField("notes", e.target.value)}
//         placeholder="Please provide any details relevant to this check."
//       />
//     </div>
//   );
// }
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
//   Download,
//   User,
//   CreditCard,
//   Lock,
//   Camera
// } from 'lucide-react';

// export default function CandidateVerificationWizard() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   // Form States
//   const [dpdpAccepted, setDpdpAccepted] = useState(false);
//   const [personalDetails, setPersonalDetails] = useState({
//     fullName: 'Priya Sharma',
//     profileImage: null,
//     profileImagePreview: null,
//     candidateId: '',
//     clientName: '',
//     dob: '',
//     gender: '',
//     mobile: '+91 98765 43210',
//     email: 'priya.sharma@email.com',
//     currentAddress: '',
//     currentAddressDocType: '',
//     currentAddressDocFile: null,
//     isPermanentSame: false,
//     permanentAddress: '',
//     permanentAddressDocType: '',
//     permanentAddressDocFile: null,
//     aadhaarNumber: '',
//     panNumber: '',
//     candidateDate: ''
//   });

//   // Step 4 Tabs: 'education' | 'employment'
//   const [step4Tab, setStep4Tab] = useState('education');

//   // Education state with dynamic fields
//   const [qualifications, setQualifications] = useState([
//     { 
//       qualificationType: '', 
//       courseStream: '', 
//       specialization: '', 
//       institute: '', 
//       boardUniversity: '', 
//       nationalInternational: 'National', 
//       verificationFeesBy: 'Normal',
//       fromYop: '',
//       toYop: '',
//       universityFees: '',
//       commission: '',
//       serviceCharge: '',
//       modeOfStudy: '', 
//       documents: [null, null, null, null] 
//     }
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

//   // Profile Image Handler
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPersonalDetails({
//         ...personalDetails,
//         profileImage: file,
//         profileImagePreview: URL.createObjectURL(file)
//       });
//     }
//   };

//   // Qualification Handlers
//   const addQualification = () => {
//     setQualifications([
//       ...qualifications, 
//       { 
//         qualificationType: '', 
//         courseStream: '', 
//         specialization: '', 
//         institute: '', 
//         boardUniversity: '', 
//         nationalInternational: 'National', 
//         verificationFeesBy: 'Normal',
//         fromYop: '',
//         toYop: '',
//         universityFees: '',
//         commission: '',
//         serviceCharge: '',
//         modeOfStudy: '', 
//         documents: [null, null, null, null] 
//       }
//     ]);
//   };

//   const removeQualification = (index) => {
//     if (qualifications.length > 1) {
//       setQualifications(qualifications.filter((_, i) => i !== index));
//     }
//   };

//   const handleQualificationChange = (index, field, value) => {
//     const updated = [...qualifications];
//     updated[index][field] = value;
//     setQualifications(updated);
//   };

//   const handleQualDocumentUpload = (qualIndex, docIndex, file) => {
//     const updated = [...qualifications];
//     updated[qualIndex].documents[docIndex] = file;
//     setQualifications(updated);
//   };

//   // Employer Handlers
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

//   const removeEmployer = (index) => {
//     if (employers.length > 1) {
//       setEmployers(employers.filter((_, i) => i !== index));
//     }
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

//   // Styles
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
//       maxWidth: '1000px',
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
//       fontSize: '12px',
//       fontWeight: '700',
//       color: '#1e293b',
//       letterSpacing: '0.02em',
//       marginBottom: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },
//     sectionTitleCentered: {
//       fontSize: '14px',
//       fontWeight: '700',
//       color: '#2563eb',
//       textAlign: 'center',
//       marginBottom: '16px'
//     },
//     label: {
//       display: 'block',
//       fontSize: '11px',
//       fontWeight: '700',
//       color: '#334155',
//       textTransform: 'uppercase',
//       marginBottom: '6px',
//       letterSpacing: '0.02em'
//     },
//     input: {
//       width: '100%',
//       padding: '10px 12px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       fontSize: '13px',
//       outline: 'none',
//       boxSizing: 'border-box',
//       color: '#1e293b',
//       backgroundColor: '#ffffff'
//     },
//     inputReadOnly: {
//       width: '100%',
//       padding: '10px 12px',
//       border: '1px solid #cbd5e1',
//       borderRadius: '8px',
//       fontSize: '13px',
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
//       fontSize: '13px',
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
//     grid5: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(5, 1fr)',
//       gap: '12px',
//       marginBottom: '16px'
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
//     avatarUploadContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       padding: '12px',
//       border: '1px dashed #cbd5e1',
//       borderRadius: '10px',
//       backgroundColor: '#f8fafc'
//     },
//     avatarCircle: {
//       width: '60px',
//       height: '60px',
//       borderRadius: '50%',
//       backgroundColor: '#e2e8f0',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       overflow: 'hidden',
//       border: '2px solid #cbd5e1',
//       flexShrink: 0
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
//     btnRemove: {
//       backgroundColor: 'transparent',
//       color: '#ef4444',
//       border: '1px solid #fca5a5',
//       borderRadius: '6px',
//       padding: '4px 12px',
//       fontSize: '12px',
//       fontWeight: '600',
//       cursor: 'pointer'
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
//       cursor: 'pointer',
//       marginTop: '8px'
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
//     },
//     radioGroup: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px',
//       height: '38px'
//     },
//     radioLabel: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       fontSize: '13px',
//       color: '#1e293b',
//       cursor: 'pointer'
//     }
//   };

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
//         <div style={styles.card}>
          
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
//                 <p style={styles.subtitle}>Verify your email address and provide consent under DPDP Act.</p>

//                 <div style={styles.sectionBox}>
//                   <div style={{ ...styles.flexRowBetween, marginBottom: '12px' }}>
//                     <label style={styles.label}>E-mail Verification</label>
//                     <span style={styles.badgeGreen}>✓ E-mail Verified</span>
//                   </div>
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     {[1, 2, 3, 4, 5, 6].map((i) => (
//                       <input key={i} type="text" value="•" readOnly style={styles.otpInput} />
//                     ))}
//                   </div>
//                   <div style={{ ...styles.flexRowBetween, fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
//                     <span>Enter 6-digit OTP sent to priya.sharma@email.com</span>
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
                  
//                   {/* FULL NAME & PROFILE IMAGE UPLOAD IN GRID */}
//                   <div style={{ ...styles.grid2, alignItems: 'center', marginBottom: '16px' }}>
//                     <div>
//                       <label style={styles.label}>Full Name *</label>
//                       <input 
//                         type="text" 
//                         value={personalDetails.fullName} 
//                         onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })} 
//                         style={styles.input} 
//                       />
//                     </div>

//                     <div>
//                       <label style={styles.label}>Candidate Photo *</label>
//                       <div style={styles.avatarUploadContainer}>
//                         <div style={styles.avatarCircle}>
//                           {personalDetails.profileImagePreview ? (
//                             <img 
//                               src={personalDetails.profileImagePreview} 
//                               alt="Candidate Profile" 
//                               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                             />
//                           ) : (
//                             <User size={36} color="#94a3b8" />
//                           )}
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                           <label style={{ ...styles.uploadBtnLabel, width: 'fit-content' }}>
//                             <Camera size={14} /> Upload Image
//                             <input 
//                               type="file" 
//                               accept="image/*" 
//                               style={{ display: 'none' }} 
//                               onChange={handleProfileImageChange}
//                             />
//                           </label>
//                           <span style={{ fontSize: '10px', color: '#94a3b8' }}>JPG, PNG (Max 5MB)</span>
//                         </div>
//                       </div>
//                     </div>
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
//                   <h3 style={styles.sectionTitle}>Address Details</h3>
                  
//                   {/* CURRENT ADDRESS BLOCK */}
//                   <div style={{ marginBottom: '16px' }}>
//                     <label style={styles.label}>Current Address *</label>
//                     <textarea 
//                       placeholder="Flat/House No., Street, Area, City, State — PIN" 
//                       style={styles.textarea} 
//                       value={personalDetails.currentAddress}
//                       onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddress: e.target.value })}
//                     />
                    
//                     <div style={{ ...styles.grid2, marginTop: '12px' }}>
//                       <div>
//                         <label style={styles.label}>Current Address Proof Type *</label>
//                         <select 
//                           style={styles.input}
//                           value={personalDetails.currentAddressDocType}
//                           onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocType: e.target.value })}
//                         >
//                           <option value="">Select Document Type</option>
//                           <option value="Aadhaar Card">Aadhaar Card</option>
//                           <option value="Driving License">Driving License (DL)</option>
//                           <option value="Electricity Bill">Electricity Bill</option>
//                           <option value="Passport">Passport</option>
//                           <option value="Rent Agreement">Rent Agreement</option>
//                           <option value="Voter ID">Voter ID</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label style={styles.label}>Upload Address Proof Document *</label>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                           <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
//                             <Upload size={14} /> Choose File
//                             <input 
//                               type="file" 
//                               style={{ display: 'none' }}
//                               accept=".pdf,.jpg,.jpeg,.png"
//                               onChange={(e) => setPersonalDetails({ ...personalDetails, currentAddressDocFile: e.target.files[0] })}
//                             />
//                           </label>
//                         </div>
//                         {personalDetails.currentAddressDocFile && (
//                           <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
//                             ✓ {personalDetails.currentAddressDocFile.name}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />

//                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0', cursor: 'pointer' }}>
//                     <input 
//                       type="checkbox" 
//                       checked={personalDetails.isPermanentSame}
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         setPersonalDetails({ 
//                           ...personalDetails, 
//                           isPermanentSame: checked,
//                           permanentAddress: checked ? personalDetails.currentAddress : '',
//                           permanentAddressDocType: checked ? personalDetails.currentAddressDocType : '',
//                           permanentAddressDocFile: checked ? personalDetails.currentAddressDocFile : null
//                         });
//                       }}
//                     />
//                     <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>Permanent address same as current</span>
//                   </label>

//                   {/* PERMANENT ADDRESS BLOCK */}
//                   {!personalDetails.isPermanentSame && (
//                     <div style={{ marginTop: '12px' }}>
//                       <label style={styles.label}>Permanent Address *</label>
//                       <textarea 
//                         placeholder="Flat/House No., Street, Area, City, State — PIN" 
//                         style={styles.textarea} 
//                         value={personalDetails.permanentAddress}
//                         onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddress: e.target.value })}
//                       />

//                       <div style={{ ...styles.grid2, marginTop: '12px' }}>
//                         <div>
//                           <label style={styles.label}>Permanent Address Proof Type *</label>
//                           <select 
//                             style={styles.input}
//                             value={personalDetails.permanentAddressDocType}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocType: e.target.value })}
//                           >
//                             <option value="">Select Document Type</option>
//                             <option value="Aadhaar Card">Aadhaar Card</option>
//                             <option value="Driving License">Driving License (DL)</option>
//                             <option value="Electricity Bill">Electricity Bill</option>
//                             <option value="Passport">Passport</option>
//                             <option value="Rent Agreement">Rent Agreement</option>
//                             <option value="Voter ID">Voter ID</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label style={styles.label}>Upload Address Proof Document *</label>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                             <label style={{ ...styles.uploadBtnLabel, padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
//                               <Upload size={14} /> Choose File
//                               <input 
//                                 type="file" 
//                                 style={{ display: 'none' }}
//                                 accept=".pdf,.jpg,.jpeg,.png"
//                                 onChange={(e) => setPersonalDetails({ ...personalDetails, permanentAddressDocFile: e.target.files[0] })}
//                               />
//                             </label>
//                           </div>
//                           {personalDetails.permanentAddressDocFile && (
//                             <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
//                               ✓ {personalDetails.permanentAddressDocFile.name}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* IDENTITY DOCUMENTS (AADHAAR & PAN) */}
//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>
//                     <CreditCard size={16} color="#2563eb" /> Identity Documents
//                   </h3>
//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>Aadhaar Number *</label>
//                       <input 
//                         type="text" 
//                         placeholder="Enter 12-digit Aadhaar Number" 
//                         style={styles.input}
//                         maxLength={12}
//                         value={personalDetails.aadhaarNumber}
//                         onChange={(e) => setPersonalDetails({ ...personalDetails, aadhaarNumber: e.target.value })}
//                       />
//                     </div>
//                     <div>
//                       <label style={styles.label}>PAN Number *</label>
//                       <input 
//                         type="text" 
//                         placeholder="ABCDE1234F" 
//                         style={{ ...styles.input, textTransform: 'uppercase' }} 
//                         maxLength={10}
//                         value={personalDetails.panNumber}
//                         onChange={(e) => setPersonalDetails({ ...personalDetails, panNumber: e.target.value.toUpperCase() })}
//                       />
//                     </div>
//                   </div>

//                   {/* DIGILOCKER INTEGRATION BOX */}
//                   <div style={styles.digilockerBox}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                       <Lock size={20} color="#ea580c" />
//                       <div>
//                         <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: '#9a3412' }}>Fast-track with DigiLocker</h4>
//                         <p style={{ fontSize: '11px', color: '#c2410c', margin: '2px 0 0 0' }}>Fetch verified Aadhaar & PAN instantly via DigiLocker.</p>
//                       </div>
//                     </div>
//                     <button style={styles.digilockerBtn}>Connect DigiLocker</button>
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
//                     <div style={styles.sectionBox}>
//                       <h3 style={styles.sectionTitle}>
//                         <User size={16} color="#4f46e5" /> Candidate Information
//                       </h3>
//                       <div style={styles.grid5}>
//                         <div>
//                           <label style={styles.label}>Candidate Name *</label>
//                           <input 
//                             type="text" 
//                             placeholder="Enter Candidate Name" 
//                             style={styles.input}
//                             value={personalDetails.fullName}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <label style={styles.label}>Candidate ID *</label>
//                           <input 
//                             type="text" 
//                             placeholder="Enter Candidate ID" 
//                             style={styles.input}
//                             value={personalDetails.candidateId}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, candidateId: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <label style={styles.label}>Client Name *</label>
//                           <input 
//                             type="text" 
//                             placeholder="Enter Client Name" 
//                             style={styles.input}
//                             value={personalDetails.clientName}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, clientName: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <label style={styles.label}>Mobile Number *</label>
//                           <input 
//                             type="text" 
//                             placeholder="Enter Mobile Number" 
//                             style={styles.input}
//                             value={personalDetails.mobile}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, mobile: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <label style={styles.label}>Email Address *</label>
//                           <input 
//                             type="email" 
//                             placeholder="Enter Email Address" 
//                             style={styles.input}
//                             value={personalDetails.email}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {qualifications.map((qual, idx) => (
//                       <div key={idx} style={styles.sectionBox}>
//   {/* TOP HEADER */}
//   <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
//     <h3 style={styles.sectionTitle}>Qualification {idx + 1}</h3>
//     {qualifications.length > 1 && (
//       <button onClick={() => removeQualification(idx)} style={styles.btnRemove}>
//         Remove
//       </button>
//     )}
//   </div>

//   {/* 1. PRIMARY SELECTION (NATIONAL / INTERNATIONAL TOP ROW) */}
//   <div style={{ 
//     backgroundColor: '#f8fafc', 
//     padding: '12px 16px', 
//     borderRadius: '8px', 
//     border: '1px solid #e2e8f0', 
//     marginBottom: '20px' 
//   }}>
//     <label style={{ ...styles.label, marginBottom: '8px', display: 'block', color: '#1e293b' }}>
//       QUALIFICATION SCOPE *
//     </label>
//     <div style={{
//       display: 'flex',
//       background: 'rgb(226, 232, 240)',
//       borderRadius: '8px',
//       padding: '3px',
//       width: '320px',
//     }}>
//       {/* NATIONAL LABEL */}
//       <label style={{
//         flex: '1 1 0%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '6px',
//         padding: '8px 12px',
//         borderRadius: '6px',
//         border: 'none',
//         fontSize: '12px',
//         fontWeight: 600,
//         cursor: 'pointer',
//         transition: '0.2s',
//         /* DYNAMIC ACTIVE STATE HARDCODED BACKGROUND RESTORED */
//         background: qual.nationalInternational === 'National' ? 'rgb(0, 56, 131)' : 'transparent',
//         color: qual.nationalInternational === 'National' ? 'rgb(255, 255, 255)' : 'rgb(71, 85, 105)',
//       }}>
//         <input 
//           type="radio" 
//           name={`nat-int-${idx}`} 
//           value="National" 
//           checked={qual.nationalInternational === 'National'} 
//           onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
//           style={{ display: 'none' }}
//         />
//         National
//       </label>

//       {/* INTERNATIONAL LABEL */}
//       <label style={{
//         flex: '1 1 0%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '6px',
//         padding: '8px 12px',
//         borderRadius: '6px',
//         border: 'none',
//         fontSize: '12px',
//         fontWeight: 600,
//         cursor: 'pointer',
//         transition: '0.2s',
//         /* DYNAMIC ACTIVE STATE HARDCODED BACKGROUND RESTORED */
//         background: qual.nationalInternational === 'International' ? 'rgb(0, 56, 131)' : 'transparent',
//         color: qual.nationalInternational === 'International' ? 'rgb(255, 255, 255)' : 'rgb(71, 85, 105)',
//       }}>
//         <input 
//           type="radio" 
//           name={`nat-int-${idx}`} 
//           value="International" 
//           checked={qual.nationalInternational === 'International'} 
//           onChange={(e) => handleQualificationChange(idx, 'nationalInternational', e.target.value)}
//           style={{ display: 'none' }}
//         />
//         International
//       </label>
//     </div>
//   </div>

//   {/* 2. MAIN QUALIFICATION DETAILS */}
//   <div style={{ ...styles.grid5, marginBottom: '16px' }}>
//     <div>
//       <label style={styles.label}>Qualification Type *</label>
//       <select 
//         style={styles.input}
//         value={qual.qualificationType}
//         onChange={(e) => handleQualificationChange(idx, 'qualificationType', e.target.value)}
//       >
//         <option value="">Select Qualification Type</option>
//         <option value="Post Graduate">Post Graduate</option>
//         <option value="Graduate">Graduate</option>
//         <option value="Diploma">Diploma</option>
//         <option value="12th">12th Standard</option>
//         <option value="10th">10th Standard</option>
//       </select>
//     </div>
//     <div>
//       <label style={styles.label}>Course / Stream *</label>
//       <select 
//         style={styles.input}
//         value={qual.courseStream}
//         onChange={(e) => handleQualificationChange(idx, 'courseStream', e.target.value)}
//       >
//         <option value="">Select Course / Stream</option>
//         <option value="B.Tech">B.Tech / B.E.</option>
//         <option value="B.Sc">B.Sc</option>
//         <option value="B.Com">B.Com</option>
//         <option value="B.A">B.A</option>
//         <option value="MCA">MCA</option>
//       </select>
//     </div>
//     <div>
//       <label style={styles.label}>Specialization (Optional)</label>
//       <input 
//         type="text" 
//         placeholder="Enter Specialization" 
//         style={styles.input}
//         value={qual.specialization}
//         onChange={(e) => handleQualificationChange(idx, 'specialization', e.target.value)}
//       />
//     </div>
//     <div>
//       <label style={styles.label}>Institute / University *</label>
//       <select 
//         style={styles.input}
//         value={qual.institute}
//         onChange={(e) => handleQualificationChange(idx, 'institute', e.target.value)}
//       >
//         <option value="">Enter Institute / School / Univer</option>
//         <option value="University of Mumbai">University of Mumbai</option>
//         <option value="Delhi University">Delhi University</option>
//         <option value="IIT Bombay">IIT Bombay</option>
//         <option value="Other">Other</option>
//       </select>
//     </div>
//     <div>
//       <label style={styles.label}>Board / University *</label>
//       <select 
//         style={styles.input}
//         value={qual.boardUniversity}
//         onChange={(e) => handleQualificationChange(idx, 'boardUniversity', e.target.value)}
//       >
//         <option value="">Select Board / University</option>
//         <option value="State Board">State Board</option>
//         <option value="CBSE">CBSE</option>
//         <option value="ICSE">ICSE</option>
//         <option value="Deemed University">Deemed University</option>
//       </select>
//     </div>
//   </div>

//   {/* 3. CONDITIONAL VERIFICATION & YOP SECTION */}
//   {qual.nationalInternational === 'National' && (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )', gap: '12px', marginBottom: '16px' }}>
//       <div>
//         <label style={styles.label}>Verification Fees By *</label>
//         <select 
//           style={styles.input}
//           value={qual.verificationFeesBy}
//           onChange={(e) => handleQualificationChange(idx, 'verificationFeesBy', e.target.value)}
//         >
//           <option value="">Select Verification Type</option>
//           <option value="Normal">Normal</option>
//           <option value="Year of Passing">Year of Passing</option>
//           <option value="UG/PG">UG/PG</option>
//         </select>
//       </div>

//       {qual.verificationFeesBy === 'Year of Passing' && (
//         <>
//           <div>
//             <label style={styles.label}>From YOP *</label>
//             <input 
//               type="text" 
//               placeholder="YYYY" 
//               style={styles.input}
//               value={qual.fromYop}
//               onChange={(e) => handleQualificationChange(idx, 'fromYop', e.target.value)}
//             />
//           </div>

//           <div>
//             <label style={styles.label}>To YOP *</label>
//             <input 
//               type="text" 
//               placeholder="YYYY" 
//               style={styles.input}
//               value={qual.toYop}
//               onChange={(e) => handleQualificationChange(idx, 'toYop', e.target.value)}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   )}

//   {/* 4. FEES DETAILS SECTION */}
//   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
//     <div>
//       <label style={styles.label}>Verification Fees (₹)</label>
//       <input 
//         type="text" 
//         placeholder="Enter Verification Fees" 
//         style={styles.input}
//         value={qual.universityFees}
//         onChange={(e) => handleQualificationChange(idx, 'universityFees', e.target.value)}
//       />
//     </div>

//     <div>
//       <label style={styles.label}>GST (₹)</label>
//       <input 
//         type="text" 
//         placeholder="Enter GST" 
//         style={styles.input}
//         value={qual.commission}
//         onChange={(e) => handleQualificationChange(idx, 'commission', e.target.value)}
//       />
//     </div>

//     <div>
//       <label style={styles.label}>Total Amount (₹)</label>
//       <input 
//         type="text" 
//         placeholder="Enter Total Amount" 
//         style={styles.input}
//         value={qual.serviceCharge}
//         onChange={(e) => handleQualificationChange(idx, 'serviceCharge', e.target.value)}
//       />
//     </div>
//   </div>

//   {/* 5. DOCUMENTS SECTION */}
//   <div>
//     <label style={styles.label}>DOCUMENTS * (Upload up to 4 documents)</label>
//     <div style={styles.docGrid}>
//       {[1, 2, 3, 4].map((docNum, dIdx) => (
//         <div key={dIdx} style={styles.docBox}>
//           <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
//             Document {docNum}
//           </div>
//           <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '10px' }}>
//             PDF, JPG, PNG (Max 10MB)
//           </div>
//           <label style={styles.uploadBtnLabel}>
//             <Upload size={12} /> Choose File
//             <input 
//               type="file" 
//               style={{ display: 'none' }}
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={(e) => handleQualDocumentUpload(idx, dIdx, e.target.files[0])}
//             />
//           </label>
//           {qual.documents[dIdx] && (
//             <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
//               {qual.documents[dIdx].name}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//                     ))}

//                     <button onClick={addQualification} style={styles.btnDashedAdd}>+ Add Qualification</button>
//                   </div>
//                 ) : (
//                   <div>
//                     <div style={styles.sectionBox}>
//                       <h3 style={styles.sectionTitleCentered}>Candidate Details</h3>
//                       <div style={styles.grid2}>
//                         <div>
//                           <label style={styles.label}>CANDIDATE NAME *</label>
//                           <input 
//                             type="text" 
//                             placeholder="Enter candidate name" 
//                             style={styles.input}
//                             value={personalDetails.fullName}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <label style={styles.label}>DATE *</label>
//                           <input 
//                             type="date" 
//                             style={styles.input}
//                             value={personalDetails.candidateDate}
//                             onChange={(e) => setPersonalDetails({ ...personalDetails, candidateDate: e.target.value })}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {employers.map((emp, idx) => (
//                       <div key={idx} style={styles.sectionBox}>
//                         <div style={{ ...styles.flexRowBetween, marginBottom: '16px' }}>
//                           <h3 style={styles.sectionTitle}>Employer {idx + 1}</h3>
//                           {employers.length > 1 && (
//                             <button onClick={() => removeEmployer(idx)} style={styles.btnRemove}>
//                               Remove
//                             </button>
//                           )}
//                         </div>

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
import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../src/config";

// ── Field shapes below match exactly what the admin pages
// (EmploymentCheck.jsx, EducationCheck.jsx) save via their own PATCH
// calls to /cases/{caseId}/checks/{checkKey} — this wizard writes to the
// same case_checks.fields column via /candidate-link/{token}/fields, so
// keeping the shape identical means a candidate's submission renders
// correctly on EmploymentUserProfile / EducationUserProfile without any
// translation step.

const EMPTY_EMPLOYER = () => ({
  companyName: "",
  designation: "",
  employeeId: "",
  hrEmail: "",
  hrPhone: "",
  doj: "",
  doe: "",
});

const EMPTY_QUALIFICATION = () => ({
  qualificationType: "",
  courseStream: "",
  specialization: "",
  instituteUniversity: "",
  boardUniversity: "",
  studyType: "National",
});

const CHECK_LABELS = {
  employment: "Employment History",
  education: "Education Details",
  address: "Address Details",
  database: "Identity Documents",
  criminal: "Police Verification",
  drug: "Drug Test",
  court: "Court Records",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "12px",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "#374151",
  marginBottom: "6px",
};

// ── Every /candidate-link/{token}/... route is token-gated by expires_at
// on the backend (see routes/api.php) — including the mid-flow ones this
// component calls after the initial page load: fields, documents, submit.
// A 410 from any of them means the same thing the initial GET already
// handles: the link lapsed, possibly *during* this session (e.g. someone
// left the tab open past the window). Wrapping fetch so every call reacts
// the same way means we don't have to remember to special-case 410 at
// every call site — miss one and it silently falls through to a generic
// "something went wrong" message instead of the real reason.
class LinkExpiredError extends Error {
  constructor() {
    super("Link expired");
    this.expired = true;
  }
}

async function fetchLinkGated(url, options) {
  const res = await fetch(url, options);
  if (res.status === 410) {
    throw new LinkExpiredError();
  }
  return res;
}

// export default function CandidateVerificationWizard() {
//   const { token } = useParams();
export default function CandidateVerificationWizard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState("loading"); // loading | ready | expired | submitted | invalid | error
  const [linkData, setLinkData] = useState(null);
  const [checkDetails, setCheckDetails] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [stepData, setStepData] = useState({}); // { [checkType]: fields object, live-edited }
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [uploadFiles, setUploadFiles] = useState({}); // { [checkType]: File }

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    fetch(`${API_URL}/api/candidate-link/${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 410 && data.expired) {
          setStatus("expired");
          return;
        }
        if (data.submitted) {
          setStatus("submitted");
          return;
        }
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        setLinkData(data.link);
        setCheckDetails(data.checkDetails || {});

        // Seed each step's editable state from whatever is already saved
        // (admin-entered fields, if any) — never starts from a blank slate
        // that would wipe existing data on save.
        const initialStepData = {};
        (data.link.checks || []).forEach((checkType) => {
          const existing = data.checkDetails?.[checkType]?.fields || {};
          initialStepData[checkType] = seedFieldsForCheck(checkType, existing, data.link);
        });
        setStepData(initialStepData);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const seedFieldsForCheck = (checkType, existing, link) => {
    if (checkType === "employment") {
      return {
        ...existing,
        candidate_name: existing.candidate_name || link.candidateName || "",
        date: existing.date || new Date().toISOString().slice(0, 10),
        employers: Array.isArray(existing.employers) && existing.employers.length > 0
          ? existing.employers
          : [EMPTY_EMPLOYER()],
      };
    }
    if (checkType === "education") {
      return {
        ...existing,
        candidate_name: existing.candidate_name || link.candidateName || "",
        candidate_id: existing.candidate_id || "",
        mobile_number: existing.mobile_number || link.mobile || "",
        email_address: existing.email_address || link.email || "",
        qualifications: Array.isArray(existing.qualifications) && existing.qualifications.length > 0
          ? existing.qualifications
          : [EMPTY_QUALIFICATION()],
      };
    }
    // Generic fallback for any check type without a dedicated UI
    return {
      ...existing,
      candidate_name: existing.candidate_name || link.candidateName || "",
      notes: existing.notes || "",
    };
  };

  const checks = linkData?.checks || [];
  const currentCheckType = checks[stepIndex];
  const currentFields = stepData[currentCheckType] || {};

  const updateField = (field, value) => {
    setStepData((prev) => ({
      ...prev,
      [currentCheckType]: { ...prev[currentCheckType], [field]: value },
    }));
  };

  const updateArrayItem = (arrayKey, index, field, value) => {
    setStepData((prev) => {
      const arr = [...(prev[currentCheckType][arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: arr } };
    });
  };

  const addArrayItem = (arrayKey, emptyItemFn, max) => {
    setStepData((prev) => {
      const arr = prev[currentCheckType][arrayKey] || [];
      if (arr.length >= max) return prev;
      return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: [...arr, emptyItemFn()] } };
    });
  };

  const removeArrayItem = (arrayKey, index) => {
    setStepData((prev) => {
      const arr = prev[currentCheckType][arrayKey] || [];
      if (arr.length <= 1) return prev;
      return { ...prev, [currentCheckType]: { ...prev[currentCheckType], [arrayKey]: arr.filter((_, i) => i !== index) } };
    });
  };

  const validateStep = () => {
    if (currentCheckType === "employment") {
      if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
      const emp = currentFields.employers?.[0];
      if (!emp?.companyName?.trim()) return "Please enter at least one employer's company name.";
      if (!emp?.hrEmail?.trim()) return "Please enter that employer's HR email.";
      return "";
    }
    if (currentCheckType === "education") {
      if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
      const qual = currentFields.qualifications?.[0];
      if (!qual?.qualificationType?.trim()) return "Please select at least one qualification type.";
      if (!qual?.instituteUniversity?.trim()) return "Please enter that qualification's institute/university.";
      return "";
    }
    if (!currentFields.candidate_name?.trim()) return "Please enter your name.";
    return "";
  };

  const saveCurrentStep = async () => {
    const err = validateStep();
    if (err) {
      setValidationError(err);
      return false;
    }
    setValidationError("");
    setSaving(true);

    try {
      const res = await fetchLinkGated(`${API_URL}/api/candidate-link/${token}/fields`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          check_type: currentCheckType,
          fields: currentFields,
        }),
      });
      if (!res.ok) throw new Error("Save failed");

      const file = uploadFiles[currentCheckType];
      if (file) {
        const body = new FormData();
        body.append("check_type", currentCheckType);
        body.append("document_key", "supporting_doc");
        body.append("file", file);
        const docRes = await fetchLinkGated(`${API_URL}/api/candidate-link/${token}/documents`, {
          method: "POST",
          body,
        });
        if (!docRes.ok) throw new Error("Upload failed");
      }
      return true;
    } catch (e) {
      // A 410 here means the link lapsed while this step was open — show
      // the same "Link expired" screen the initial load would have shown,
      // rather than a generic save-failure message that leaves the
      // candidate retrying a step that can never succeed.
      if (e instanceof LinkExpiredError) {
        setStatus("expired");
      } else {
        setValidationError("Something went wrong saving this step. Please try again.");
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const ok = await saveCurrentStep();
    if (!ok) return;
    if (stepIndex < checks.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    setValidationError("");
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetchLinkGated(`${API_URL}/api/candidate-link/${token}/submit`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      setStatus("submitted");
    } catch (e) {
      // Same reasoning as saveCurrentStep: a link that expired between the
      // last saved step and the final submit should say so, not "couldn't
      // submit, try again" — retrying a submit on an expired link will
      // just 410 forever.
      if (e instanceof LinkExpiredError) {
        setStatus("expired");
      } else {
        setValidationError("Couldn't submit — please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Render states ─────────────────────────────────────────────────────
  if (status === "loading") {
    return <CenteredMessage>Loading your verification form…</CenteredMessage>;
  }
  if (status === "invalid") {
    return <CenteredMessage title="Link not found">This verification link is invalid. Please check the link your employer sent you, or contact them for a new one.</CenteredMessage>;
  }
  if (status === "expired") {
    return <CenteredMessage title="Link expired">This verification link has expired. Please contact whoever sent it to you for a new link.</CenteredMessage>;
  }
  if (status === "submitted") {
    return (
      <CenteredMessage title="Thank you!">
        Your information has been submitted successfully. The team reviewing your background verification will be in touch if anything else is needed.
      </CenteredMessage>
    );
  }
  if (status === "error") {
    return <CenteredMessage title="Something went wrong">We couldn't load this page right now. Please try again in a moment.</CenteredMessage>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "24px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>Background Verification</h1>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Hi {linkData.candidateName} — please complete the section{checks.length > 1 ? "s" : ""} below.
          </p>
        </div>

        {/* Step indicator */}
        {checks.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            {checks.map((c, i) => (
              <div
                key={c}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  background: i === stepIndex ? "#2563eb" : i < stepIndex ? "#dcfce7" : "#e2e8f0",
                  color: i === stepIndex ? "#fff" : i < stepIndex ? "#166534" : "#64748b",
                }}
              >
                {i < stepIndex ? "✓ " : ""}{CHECK_LABELS[c] || c}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginTop: 0 }}>
            {CHECK_LABELS[currentCheckType] || currentCheckType}
          </h2>

          {currentCheckType === "employment" && (
            <EmploymentStep
              fields={currentFields}
              updateField={updateField}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          )}

          {currentCheckType === "education" && (
            <EducationStep
              fields={currentFields}
              updateField={updateField}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          )}

          {currentCheckType !== "employment" && currentCheckType !== "education" && (
            <GenericStep fields={currentFields} updateField={updateField} />
          )}

          {/* Optional supporting document, any check type */}
          <div style={{ marginTop: "12px" }}>
            <label style={labelStyle}>Supporting Document (optional)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setUploadFiles((prev) => ({ ...prev, [currentCheckType]: e.target.files[0] }))}
              style={{ fontSize: "13px" }}
            />
          </div>

          {validationError && (
            <div style={{ marginTop: "16px", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "13px" }}>
              {validationError}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={handleBack}
              disabled={stepIndex === 0 || saving}
              style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", color: "#475569", fontWeight: 600, cursor: stepIndex === 0 ? "not-allowed" : "pointer", opacity: stepIndex === 0 ? 0.5 : 1 }}
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={saving}
              style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Saving…" : stepIndex < checks.length - 1 ? "Save & Continue →" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenteredMessage({ title, children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "24px" }}>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "32px", maxWidth: "420px", textAlign: "center" }}>
        {title && <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginTop: 0 }}>{title}</h2>}
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function EmploymentStep({ fields, updateField, updateArrayItem, addArrayItem, removeArrayItem }) {
  const employers = fields.employers || [];
  return (
    <div>
      <label style={labelStyle}>Full Name *</label>
      <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />

      <label style={labelStyle}>Date</label>
      <input style={inputStyle} type="date" value={fields.date || ""} onChange={(e) => updateField("date", e.target.value)} />

      <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginTop: "16px" }}>Previous Employers (up to 4)</p>

      {employers.map((emp, idx) => (
        <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", marginBottom: "12px", background: "#f8fafc" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <strong style={{ fontSize: "13px" }}>Employer {idx + 1}</strong>
            {employers.length > 1 && (
              <button onClick={() => removeArrayItem("employers", idx)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "12px" }}>Remove</button>
            )}
          </div>
          <label style={labelStyle}>Company Name *</label>
          <input style={inputStyle} type="text" value={emp.companyName || ""} onChange={(e) => updateArrayItem("employers", idx, "companyName", e.target.value)} />
          <label style={labelStyle}>Designation</label>
          <input style={inputStyle} type="text" value={emp.designation || ""} onChange={(e) => updateArrayItem("employers", idx, "designation", e.target.value)} />
          <label style={labelStyle}>Employee ID</label>
          <input style={inputStyle} type="text" value={emp.employeeId || ""} onChange={(e) => updateArrayItem("employers", idx, "employeeId", e.target.value)} />
          <label style={labelStyle}>HR Email *</label>
          <input style={inputStyle} type="email" value={emp.hrEmail || ""} onChange={(e) => updateArrayItem("employers", idx, "hrEmail", e.target.value)} />
          <label style={labelStyle}>HR Phone</label>
          <input style={inputStyle} type="text" value={emp.hrPhone || ""} onChange={(e) => updateArrayItem("employers", idx, "hrPhone", e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Date of Joining</label>
              <input style={inputStyle} type="date" value={emp.doj || ""} onChange={(e) => updateArrayItem("employers", idx, "doj", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Date of Exit</label>
              <input style={inputStyle} type="date" value={emp.doe || ""} onChange={(e) => updateArrayItem("employers", idx, "doe", e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      {employers.length < 4 && (
        <button onClick={() => addArrayItem("employers", EMPTY_EMPLOYER, 4)} style={{ background: "none", border: "1px dashed #2563eb", color: "#2563eb", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          + Add Another Employer
        </button>
      )}
    </div>
  );
}

function EducationStep({ fields, updateField, updateArrayItem, addArrayItem, removeArrayItem }) {
  const qualifications = fields.qualifications || [];
  return (
    <div>
      <label style={labelStyle}>Full Name *</label>
      <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />
      <label style={labelStyle}>Candidate ID</label>
      <input style={inputStyle} type="text" value={fields.candidate_id || ""} onChange={(e) => updateField("candidate_id", e.target.value)} />
      <label style={labelStyle}>Mobile Number</label>
      <input style={inputStyle} type="text" value={fields.mobile_number || ""} onChange={(e) => updateField("mobile_number", e.target.value)} />
      <label style={labelStyle}>Email Address</label>
      <input style={inputStyle} type="email" value={fields.email_address || ""} onChange={(e) => updateField("email_address", e.target.value)} />

      <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginTop: "16px" }}>Qualifications</p>

      {qualifications.map((q, idx) => (
        <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px", marginBottom: "12px", background: "#f8fafc" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <strong style={{ fontSize: "13px" }}>Qualification {idx + 1}</strong>
            {qualifications.length > 1 && (
              <button onClick={() => removeArrayItem("qualifications", idx)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "12px" }}>Remove</button>
            )}
          </div>
          <label style={labelStyle}>Qualification Type *</label>
          <select style={inputStyle} value={q.qualificationType || ""} onChange={(e) => updateArrayItem("qualifications", idx, "qualificationType", e.target.value)}>
            <option value="">Select</option>
            <option value="Graduation">Graduation</option>
            <option value="Post Graduation">Post Graduation</option>
            <option value="Diploma">Diploma</option>
            <option value="10th / 12th">10th / 12th</option>
          </select>
          <label style={labelStyle}>Course / Stream</label>
          <input style={inputStyle} type="text" value={q.courseStream || ""} onChange={(e) => updateArrayItem("qualifications", idx, "courseStream", e.target.value)} />
          <label style={labelStyle}>Institute / University *</label>
          <input style={inputStyle} type="text" value={q.instituteUniversity || ""} onChange={(e) => updateArrayItem("qualifications", idx, "instituteUniversity", e.target.value)} />
          <label style={labelStyle}>Board / University</label>
          <input style={inputStyle} type="text" value={q.boardUniversity || ""} onChange={(e) => updateArrayItem("qualifications", idx, "boardUniversity", e.target.value)} />
        </div>
      ))}

      <button onClick={() => addArrayItem("qualifications", EMPTY_QUALIFICATION, 8)} style={{ background: "none", border: "1px dashed #2563eb", color: "#2563eb", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
        + Add Another Qualification
      </button>
    </div>
  );
}

// Fallback for any check type this wizard doesn't have dedicated fields
// for yet (address, database, criminal, drug, court) — a single free-text
// field rather than guessing that check's exact saved shape.
function GenericStep({ fields, updateField }) {
  return (
    <div>
      <label style={labelStyle}>Full Name *</label>
      <input style={inputStyle} type="text" value={fields.candidate_name || ""} onChange={(e) => updateField("candidate_name", e.target.value)} />
      <label style={labelStyle}>Details</label>
      <textarea
        style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
        value={fields.notes || ""}
        onChange={(e) => updateField("notes", e.target.value)}
        placeholder="Please provide any details relevant to this check."
      />
    </div>
  );
}
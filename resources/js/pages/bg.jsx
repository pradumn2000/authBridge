

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import {
//   AlertCircle,
//   Briefcase,
//   Camera,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   CreditCard,
//   FileText,
//   GraduationCap,
//   Loader2,
//   Lock,
//   ShieldCheck,
//   Upload,
//   User,
// } from "lucide-react";

// const API_BASE = "/api";

// const emptyQualification = () => ({
//   qualificationType: "",
//   courseStream: "",
//   specialization: "",
//   institute: "",
//   boardUniversity: "",
//   nationalInternational: "National",
//   verificationFeesBy: "Normal",
//   fromYop: "",
//   toYop: "",
//   universityFees: "",
//   commission: "",
//   serviceCharge: "",
//   modeOfStudy: "",
//   documents: [null, null, null, null],
// });

// const emptyEmployer = () => ({
//   companyName: "",
//   designation: "",
//   employeeId: "",
//   hrEmail: "",
//   hrPhoneCode: "+91",
//   hrPhone: "",
//   doj: "",
//   doe: "",
//   documents: [null, null, null, null],
// });

// const normalizeDocumentsArray = (documents, count = 4) => {
//   const normalized = Array(count).fill(null);

//   if (!documents) {
//     return normalized;
//   }

//   if (Array.isArray(documents)) {
//     documents.slice(0, count).forEach((item, index) => {
//       normalized[index] = item;
//     });
//     return normalized;
//   }

//   return normalized;
// };

// const getStoredDocument = (documents, key) => {
//   if (!documents || Array.isArray(documents)) {
//     return null;
//   }

//   return documents[key] || null;
// };

// const isStoredDocument = (value) =>
//   Boolean(value && typeof value === "object" && value.url && value.name);

// export default function CandidateVerificationWizard() {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");

//   const [isOpen, setIsOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [pageError, setPageError] = useState("");
//   const [actionError, setActionError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const [linkData, setLinkData] = useState(null);
//   const [availableChecks, setAvailableChecks] = useState([]);
//   const [checkDetails, setCheckDetails] = useState({});
//   const [identityDocuments, setIdentityDocuments] = useState({});

//   const [dpdpAccepted, setDpdpAccepted] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
//   const otpRefs = useRef([]);

//   const [personalDetails, setPersonalDetails] = useState({
//     fullName: "",
//     profileImage: null,
//     profileImagePreview: null,
//     candidateId: "",
//     clientName: "",
//     dob: "",
//     gender: "",
//     mobile: "",
//     email: "",
//     currentAddress: "",
//     currentAddressDocType: "",
//     currentAddressDocFile: null,
//     isPermanentSame: false,
//     permanentAddress: "",
//     permanentAddressDocType: "",
//     permanentAddressDocFile: null,
//     aadhaarNumber: "",
//     panNumber: "",
//     candidateDate: "",
//   });

//   const [step4Tab, setStep4Tab] = useState("education");
//   const [qualifications, setQualifications] = useState([emptyQualification()]);
//   const [employers, setEmployers] = useState([emptyEmployer()]);
//   const [declarationAccepted, setDeclarationAccepted] = useState(false);

//   const hasEducation = availableChecks.includes("education");
//   const hasEmployment = availableChecks.includes("employment");

//   const requestedCandidateChecks = useMemo(
//     () => availableChecks.filter((check) => ["education", "employment"].includes(check)),
//     [availableChecks],
//   );

//   const apiRequest = async (path, options = {}) => {
//     const response = await fetch(`${API_BASE}${path}`, {
//       ...options,
//       headers: {
//         Accept: "application/json",
//         ...(options.body instanceof FormData
//           ? {}
//           : { "Content-Type": "application/json" }),
//         ...(options.headers || {}),
//       },
//     });

//     let data = {};
//     const contentType = response.headers.get("content-type") || "";

//     if (contentType.includes("application/json")) {
//       data = await response.json();
//     } else {
//       const text = await response.text();
//       data = text ? { message: text } : {};
//     }

//     if (!response.ok) {
//       const validationMessage = data?.errors
//         ? Object.values(data.errors).flat().join(" ")
//         : "";

//       const error = new Error(
//         validationMessage || data?.message || `Request failed with status ${response.status}`,
//       );

//       error.status = response.status;
//       error.data = data;
//       throw error;
//     }

//     return data;
//   };

//   const mapEducationFromBackend = (details) => {
//     const fields = details?.fields || {};
//     const savedQualifications = Array.isArray(fields.qualifications)
//       ? fields.qualifications
//       : [];

//     if (savedQualifications.length === 0) {
//       return [emptyQualification()];
//     }

//     return savedQualifications.map((item, qualificationIndex) => {
//       const row = {
//         ...emptyQualification(),
//         ...item,
//       };

//       row.documents = Array(4)
//         .fill(null)
//         .map((_, docIndex) =>
//           getStoredDocument(
//             details?.documents,
//             `qualification_${qualificationIndex + 1}_document_${docIndex + 1}`,
//           ),
//         );

//       return row;
//     });
//   };

//   const mapEmploymentFromBackend = (details) => {
//     const fields = details?.fields || {};
//     const savedEmployers = Array.isArray(fields.employers) ? fields.employers : [];

//     if (savedEmployers.length === 0) {
//       return [emptyEmployer()];
//     }

//     return savedEmployers.map((item, employerIndex) => {
//       const row = {
//         ...emptyEmployer(),
//         ...item,
//       };

//       row.documents = Array(4)
//         .fill(null)
//         .map((_, docIndex) =>
//           getStoredDocument(
//             details?.documents,
//             `employer_${employerIndex + 1}_document_${docIndex + 1}`,
//           ),
//         );

//       return row;
//     });
//   };

//   const loadCandidate = async () => {
//     if (!token) {
//       setPageError("Candidate verification token is missing.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setPageError("");

//     try {
//       const data = await apiRequest(`/candidate-link/${token}`);
//       const link = data?.link || {};
//       const identity = data?.identity || {};
//       const details = data?.checkDetails || {};
//       const checks = Array.isArray(link.checks)
//         ? link.checks
//         : link.checkType
//           ? [link.checkType]
//           : [];

//       setLinkData(link);
//       setAvailableChecks(checks);
//       setCheckDetails(details);
//       setEmailVerified(Boolean(link.emailVerified));
//       setIdentityDocuments(identity?.documents || {});

//       setPersonalDetails((previous) => ({
//         ...previous,
//         fullName: link.candidateName || "",
//         candidateId: link.caseId || "",
//         dob: link.dob || "",
//         mobile: link.mobile || "",
//         email: link.email || "",
//         gender: identity.gender || "",
//         currentAddress: identity.current_address || "",
//         currentAddressDocType: identity.current_address_doc_type || "",
//         isPermanentSame: Boolean(identity.is_permanent_same),
//         permanentAddress: identity.permanent_address || "",
//         permanentAddressDocType: identity.permanent_address_doc_type || "",
//         aadhaarNumber: identity.aadhaar_number || "",
//         panNumber: identity.pan_number || "",
//         profileImagePreview:
//           identity?.documents?.profile_image?.url || previous.profileImagePreview,
//       }));

//       if (details.education) {
//         const educationFields = details.education.fields || {};

//         setPersonalDetails((previous) => ({
//           ...previous,
//           candidateId:
//             educationFields.candidateId || previous.candidateId || link.caseId || "",
//           clientName: educationFields.clientName || previous.clientName,
//         }));

//         setQualifications(mapEducationFromBackend(details.education));
//       }

//       if (details.employment) {
//         const employmentFields = details.employment.fields || {};

//         setPersonalDetails((previous) => ({
//           ...previous,
//           candidateDate:
//             employmentFields.candidateDate || previous.candidateDate || "",
//         }));

//         setEmployers(mapEmploymentFromBackend(details.employment));
//       }

//       if (checks.includes("education")) {
//         setStep4Tab("education");
//       } else if (checks.includes("employment")) {
//         setStep4Tab("employment");
//       }

//       setIsOpen(true);
//     } catch (error) {
//       if (error?.data?.submitted) {
//         setCurrentStep(7);
//         setIsOpen(true);
//       } else if (error?.status === 410 || error?.data?.expired) {
//         setPageError("This candidate verification link has expired.");
//       } else {
//         setPageError(error.message || "Unable to load candidate verification.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCandidate();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   useEffect(() => {
//     return () => {
//       if (
//         personalDetails.profileImagePreview &&
//         personalDetails.profileImagePreview.startsWith("blob:")
//       ) {
//         URL.revokeObjectURL(personalDetails.profileImagePreview);
//       }
//     };
//   }, [personalDetails.profileImagePreview]);

//   const nextStep = () => {
//     setActionError("");
//     setSuccessMessage("");
//     setCurrentStep((previous) => Math.min(previous + 1, 7));
//   };

//   const prevStep = () => {
//     setActionError("");
//     setSuccessMessage("");
//     setCurrentStep((previous) => Math.max(previous - 1, 1));
//   };

//   const handleProfileImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     if (
//       personalDetails.profileImagePreview &&
//       personalDetails.profileImagePreview.startsWith("blob:")
//     ) {
//       URL.revokeObjectURL(personalDetails.profileImagePreview);
//     }

//     setPersonalDetails((previous) => ({
//       ...previous,
//       profileImage: file,
//       profileImagePreview: URL.createObjectURL(file),
//     }));
//   };

//   const addQualification = () => {
//     setQualifications((previous) => [...previous, emptyQualification()]);
//   };

//   const removeQualification = (index) => {
//     setQualifications((previous) => {
//       if (previous.length <= 1) {
//         return previous;
//       }

//       return previous.filter((_, rowIndex) => rowIndex !== index);
//     });
//   };

//   const handleQualificationChange = (index, field, value) => {
//     setQualifications((previous) =>
//       previous.map((row, rowIndex) =>
//         rowIndex === index ? { ...row, [field]: value } : row,
//       ),
//     );
//   };

//   const handleQualDocumentUpload = (qualificationIndex, documentIndex, file) => {
//     if (!file) {
//       return;
//     }

//     setQualifications((previous) =>
//       previous.map((row, rowIndex) => {
//         if (rowIndex !== qualificationIndex) {
//           return row;
//         }

//         const documents = normalizeDocumentsArray(row.documents);
//         documents[documentIndex] = file;

//         return {
//           ...row,
//           documents,
//         };
//       }),
//     );
//   };

//   const addEmployer = () => {
//     setEmployers((previous) => [...previous, emptyEmployer()]);
//   };

//   const removeEmployer = (index) => {
//     setEmployers((previous) => {
//       if (previous.length <= 1) {
//         return previous;
//       }

//       return previous.filter((_, rowIndex) => rowIndex !== index);
//     });
//   };

//   const handleEmployerChange = (index, field, value) => {
//     setEmployers((previous) =>
//       previous.map((row, rowIndex) =>
//         rowIndex === index ? { ...row, [field]: value } : row,
//       ),
//     );
//   };

//   const handleFileUpload = (employerIndex, documentIndex, file) => {
//     if (!file) {
//       return;
//     }

//     setEmployers((previous) =>
//       previous.map((row, rowIndex) => {
//         if (rowIndex !== employerIndex) {
//           return row;
//         }

//         const documents = normalizeDocumentsArray(row.documents);
//         documents[documentIndex] = file;

//         return {
//           ...row,
//           documents,
//         };
//       }),
//     );
//   };

//   const handleOtpChange = (index, value) => {
//     const digit = value.replace(/\D/g, "").slice(-1);
//     const updated = [...otpDigits];
//     updated[index] = digit;
//     setOtpDigits(updated);

//     if (digit && index < otpDigits.length - 1) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, event) => {
//     if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const sendOtp = async () => {
//     if (!token || emailVerified) {
//       return;
//     }

//     setSaving(true);
//     setActionError("");
//     setSuccessMessage("");

//     try {
//       const data = await apiRequest(`/candidate-link/${token}/send-otp`, {
//         method: "POST",
//       });

//       setOtpSent(true);
//       setSuccessMessage(data?.message || "OTP sent successfully.");
//       setTimeout(() => otpRefs.current[0]?.focus(), 0);
//     } catch (error) {
//       setActionError(error.message || "Unable to send OTP.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const verifyOtp = async () => {
//     const otp = otpDigits.join("");

//     if (otp.length !== 4) {
//       setActionError("Enter the complete 4-digit OTP.");
//       return;
//     }

//     setSaving(true);
//     setActionError("");
//     setSuccessMessage("");

//     try {
//       const data = await apiRequest(`/candidate-link/${token}/verify-otp`, {
//         method: "POST",
//         body: JSON.stringify({ otp }),
//       });

//       setEmailVerified(true);
//       setSuccessMessage(data?.message || "Email verified successfully.");
//     } catch (error) {
//       setActionError(error.message || "Unable to verify OTP.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const uploadIdentityDocument = async (documentKey, file) => {
//     if (!file || isStoredDocument(file)) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("document_key", documentKey);
//     formData.append("file", file);

//     const data = await apiRequest(
//       `/candidate-link/${token}/identity-documents`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     );

//     setIdentityDocuments((previous) => ({
//       ...previous,
//       [documentKey]: {
//         name: file.name,
//         url: data?.url || "",
//       },
//     }));
//   };

//   const saveIdentity = async () => {
//     setSaving(true);
//     setActionError("");
//     setSuccessMessage("");

//     try {
//       await apiRequest(`/candidate-link/${token}/identity`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           gender: personalDetails.gender || null,
//           current_address: personalDetails.currentAddress || null,
//           current_address_doc_type:
//             personalDetails.currentAddressDocType || null,
//           is_permanent_same: Boolean(personalDetails.isPermanentSame),
//           permanent_address: personalDetails.isPermanentSame
//             ? personalDetails.currentAddress || null
//             : personalDetails.permanentAddress || null,
//           permanent_address_doc_type: personalDetails.isPermanentSame
//             ? personalDetails.currentAddressDocType || null
//             : personalDetails.permanentAddressDocType || null,
//           aadhaar_number: personalDetails.aadhaarNumber || null,
//           pan_number: personalDetails.panNumber || null,
//         }),
//       });

//       await uploadIdentityDocument(
//         "profile_image",
//         personalDetails.profileImage,
//       );

//       await uploadIdentityDocument(
//         "current_address_proof",
//         personalDetails.currentAddressDocFile,
//       );

//       if (
//         !personalDetails.isPermanentSame &&
//         personalDetails.permanentAddressDocFile
//       ) {
//         await uploadIdentityDocument(
//           "permanent_address_proof",
//           personalDetails.permanentAddressDocFile,
//         );
//       }

//       setSuccessMessage("Identity details saved.");
//       nextStep();
//     } catch (error) {
//       setActionError(error.message || "Unable to save identity details.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const uploadCheckDocument = async (checkType, documentKey, file) => {
//     if (!file || isStoredDocument(file)) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("check_type", checkType);
//     formData.append("document_key", documentKey);
//     formData.append("file", file);

//     return apiRequest(`/candidate-link/${token}/documents`, {
//       method: "POST",
//       body: formData,
//     });
//   };

//   const saveEducation = async () => {
//     if (!hasEducation) {
//       return;
//     }

//     await apiRequest(`/candidate-link/${token}/fields`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         check_type: "education",
//         fields: {
//           candidateName: personalDetails.fullName,
//           candidateId: personalDetails.candidateId,
//           clientName: personalDetails.clientName,
//           mobile: personalDetails.mobile,
//           email: personalDetails.email,
//           qualifications: qualifications.map((qualification) => ({
//             qualificationType: qualification.qualificationType,
//             courseStream: qualification.courseStream,
//             specialization: qualification.specialization,
//             institute: qualification.institute,
//             boardUniversity: qualification.boardUniversity,
//             nationalInternational: qualification.nationalInternational,
//             verificationFeesBy: qualification.verificationFeesBy,
//             fromYop: qualification.fromYop,
//             toYop: qualification.toYop,
//             universityFees: qualification.universityFees,
//             commission: qualification.commission,
//             serviceCharge: qualification.serviceCharge,
//             modeOfStudy: qualification.modeOfStudy,
//           })),
//         },
//       }),
//     });

//     for (let qualificationIndex = 0; qualificationIndex < qualifications.length; qualificationIndex += 1) {
//       const qualification = qualifications[qualificationIndex];

//       for (let documentIndex = 0; documentIndex < qualification.documents.length; documentIndex += 1) {
//         const file = qualification.documents[documentIndex];

//         if (file && !isStoredDocument(file)) {
//           await uploadCheckDocument(
//             "education",
//             `qualification_${qualificationIndex + 1}_document_${documentIndex + 1}`,
//             file,
//           );
//         }
//       }
//     }
//   };

//   const saveEmployment = async () => {
//     if (!hasEmployment) {
//       return;
//     }

//     await apiRequest(`/candidate-link/${token}/fields`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         check_type: "employment",
//         fields: {
//           candidateName: personalDetails.fullName,
//           candidateDate: personalDetails.candidateDate,
//           employers: employers.map((employer) => ({
//             companyName: employer.companyName,
//             designation: employer.designation,
//             employeeId: employer.employeeId,
//             hrEmail: employer.hrEmail,
//             hrPhoneCode: employer.hrPhoneCode,
//             hrPhone: employer.hrPhone,
//             doj: employer.doj,
//             doe: employer.doe,
//           })),
//         },
//       }),
//     });

//     for (let employerIndex = 0; employerIndex < employers.length; employerIndex += 1) {
//       const employer = employers[employerIndex];

//       for (let documentIndex = 0; documentIndex < employer.documents.length; documentIndex += 1) {
//         const file = employer.documents[documentIndex];

//         if (file && !isStoredDocument(file)) {
//           await uploadCheckDocument(
//             "employment",
//             `employer_${employerIndex + 1}_document_${documentIndex + 1}`,
//             file,
//           );
//         }
//       }
//     }
//   };

//   const saveEducationAndEmployment = async () => {
//     setSaving(true);
//     setActionError("");
//     setSuccessMessage("");

//     try {
//       await saveEducation();
//       await saveEmployment();

//       setSuccessMessage("Education and employment details saved.");
//       nextStep();
//     } catch (error) {
//       setActionError(
//         error.message || "Unable to save education and employment details.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const submitVerification = async () => {
//     if (!declarationAccepted) {
//       setActionError("Please accept the declaration before submitting.");
//       return;
//     }

//     setSaving(true);
//     setActionError("");
//     setSuccessMessage("");

//     try {
//       const data = await apiRequest(`/candidate-link/${token}/submit`, {
//         method: "POST",
//         body: JSON.stringify({}),
//       });

//       setSuccessMessage(data?.message || "Submitted successfully.");
//       setCurrentStep(7);
//     } catch (error) {
//       setActionError(error.message || "Unable to submit verification.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const styles = {
//     container: {
//       minHeight: "100vh",
//       backgroundColor: "#f8fafc",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "16px",
//       fontFamily: "system-ui, -apple-system, sans-serif",
//       color: "#1e293b",
//     },
//     card: {
//       width: "100%",
//       maxWidth: "1000px",
//       backgroundColor: "#ffffff",
//       borderRadius: "16px",
//       boxShadow:
//         "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
//       border: "1px solid #f1f5f9",
//       overflow: "hidden",
//     },
//     initialCard: {
//       width: "100%",
//       maxWidth: "400px",
//       backgroundColor: "#ffffff",
//       borderRadius: "16px",
//       padding: "32px",
//       textAlign: "center",
//       boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
//       border: "1px solid #f1f5f9",
//     },
//     iconHeaderCircle: {
//       width: "64px",
//       height: "64px",
//       backgroundColor: "#eff6ff",
//       color: "#2563eb",
//       borderRadius: "50%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       margin: "0 auto 16px auto",
//     },
//     step1IconCircle: {
//       width: "64px",
//       height: "64px",
//       backgroundColor: "#dbeafe",
//       color: "#2563eb",
//       borderRadius: "16px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       margin: "0 auto 16px auto",
//     },
//     successIconCircle: {
//       width: "64px",
//       height: "64px",
//       backgroundColor: "#d1fae5",
//       color: "#059669",
//       borderRadius: "50%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       margin: "0 auto 16px auto",
//     },
//     badgeCheck: {
//       width: "20px",
//       height: "20px",
//       borderRadius: "50%",
//       backgroundColor: "#d1fae5",
//       color: "#059669",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "12px",
//       fontWeight: "700",
//       flexShrink: 0,
//     },
//     innerPadding: {
//       padding: "32px",
//     },
//     stepperContainer: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "8px",
//       padding: "16px 16px 0",
//       marginBottom: "16px",
//     },
//     stepperLine: {
//       width: "24px",
//       height: "2px",
//     },
//     mainTitle: {
//       fontSize: "20px",
//       fontWeight: "700",
//       color: "#0f172a",
//       marginBottom: "8px",
//     },
//     stepHeaderTitle: {
//       fontSize: "24px",
//       fontWeight: "700",
//       color: "#0f172a",
//       margin: "4px 0",
//     },
//     subtitle: {
//       color: "#64748b",
//       fontSize: "14px",
//       marginBottom: "24px",
//     },
//     stepBadge: {
//       fontSize: "12px",
//       fontWeight: "700",
//       color: "#2563eb",
//       textTransform: "uppercase",
//     },
//     sectionBox: {
//       border: "1px solid #e2e8f0",
//       borderRadius: "12px",
//       padding: "20px",
//       marginBottom: "16px",
//     },
//     sectionBoxGray: {
//       border: "1px solid #e2e8f0",
//       borderRadius: "12px",
//       padding: "20px",
//       marginBottom: "16px",
//       backgroundColor: "#f8fafc",
//     },
//     sectionBoxAmber: {
//       border: "1px solid #fde68a",
//       backgroundColor: "#fffbeb",
//       borderRadius: "12px",
//       padding: "16px",
//       marginBottom: "16px",
//     },
//     sectionTitle: {
//       fontSize: "12px",
//       fontWeight: "700",
//       color: "#1e293b",
//       letterSpacing: "0.02em",
//       marginBottom: "12px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     sectionTitleCentered: {
//       fontSize: "14px",
//       fontWeight: "700",
//       color: "#2563eb",
//       textAlign: "center",
//       marginBottom: "16px",
//     },
//     label: {
//       display: "block",
//       fontSize: "11px",
//       fontWeight: "700",
//       color: "#334155",
//       textTransform: "uppercase",
//       marginBottom: "6px",
//       letterSpacing: "0.02em",
//     },
//     input: {
//       width: "100%",
//       padding: "10px 12px",
//       border: "1px solid #cbd5e1",
//       borderRadius: "8px",
//       fontSize: "13px",
//       outline: "none",
//       boxSizing: "border-box",
//       color: "#1e293b",
//       backgroundColor: "#ffffff",
//     },
//     inputReadOnly: {
//       width: "100%",
//       padding: "10px 12px",
//       border: "1px solid #cbd5e1",
//       borderRadius: "8px",
//       fontSize: "13px",
//       outline: "none",
//       boxSizing: "border-box",
//       color: "#1e293b",
//       backgroundColor: "#f8fafc",
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px 12px",
//       border: "1px solid #cbd5e1",
//       borderRadius: "8px",
//       fontSize: "13px",
//       outline: "none",
//       boxSizing: "border-box",
//       color: "#1e293b",
//       height: "60px",
//       resize: "none",
//     },
//     otpInput: {
//       width: "40px",
//       height: "40px",
//       border: "1px solid #cbd5e1",
//       borderRadius: "8px",
//       textAlign: "center",
//       fontSize: "18px",
//       fontWeight: "700",
//       backgroundColor: "#f8fafc",
//       outline: "none",
//     },
//     grid5: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
//       gap: "12px",
//       marginBottom: "16px",
//     },
//     grid4: {
//       display: "grid",
//       gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
//       gap: "12px",
//       marginBottom: "16px",
//     },
//     grid3: {
//       display: "grid",
//       gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//       gap: "16px",
//       marginBottom: "16px",
//     },
//     grid2: {
//       display: "grid",
//       gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//       gap: "16px",
//       marginBottom: "16px",
//     },
//     avatarUploadContainer: {
//       display: "flex",
//       alignItems: "center",
//       gap: "16px",
//       padding: "12px",
//       border: "1px dashed #cbd5e1",
//       borderRadius: "10px",
//       backgroundColor: "#f8fafc",
//     },
//     avatarCircle: {
//       width: "60px",
//       height: "60px",
//       borderRadius: "50%",
//       backgroundColor: "#e2e8f0",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       overflow: "hidden",
//       border: "2px solid #cbd5e1",
//       flexShrink: 0,
//     },
//     docGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
//       gap: "12px",
//       marginTop: "12px",
//     },
//     docBox: {
//       border: "1px dashed #cbd5e1",
//       borderRadius: "8px",
//       padding: "16px 8px",
//       textAlign: "center",
//       backgroundColor: "#ffffff",
//       minWidth: 0,
//     },
//     uploadBtnLabel: {
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "6px",
//       backgroundColor: "#eff6ff",
//       color: "#2563eb",
//       padding: "6px 12px",
//       borderRadius: "6px",
//       fontSize: "12px",
//       fontWeight: "600",
//       cursor: "pointer",
//       boxSizing: "border-box",
//     },
//     btnPrimary: {
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//       fontWeight: "600",
//       fontSize: "14px",
//       padding: "10px 24px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     btnPrimaryFull: {
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//       fontWeight: "600",
//       fontSize: "14px",
//       padding: "10px 24px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       width: "100%",
//       justifyContent: "center",
//     },
//     btnSecondary: {
//       backgroundColor: "transparent",
//       color: "#64748b",
//       fontWeight: "600",
//       fontSize: "14px",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       gap: "4px",
//     },
//     btnRemove: {
//       backgroundColor: "transparent",
//       color: "#ef4444",
//       border: "1px solid #fca5a5",
//       borderRadius: "6px",
//       padding: "4px 12px",
//       fontSize: "12px",
//       fontWeight: "600",
//       cursor: "pointer",
//     },
//     btnOutlineFull: {
//       backgroundColor: "transparent",
//       color: "#64748b",
//       fontWeight: "600",
//       fontSize: "14px",
//       border: "1px solid #cbd5e1",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "8px",
//       width: "100%",
//       padding: "12px",
//       borderRadius: "8px",
//       marginTop: "16px",
//     },
//     btnDashedAdd: {
//       width: "100%",
//       border: "2px dashed #cbd5e1",
//       backgroundColor: "transparent",
//       color: "#2563eb",
//       padding: "12px",
//       borderRadius: "8px",
//       fontWeight: "600",
//       cursor: "pointer",
//       marginTop: "8px",
//     },
//     footer: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       paddingTop: "16px",
//       borderTop: "1px solid #f1f5f9",
//       marginTop: "24px",
//       gap: "12px",
//     },
//     tabContainer: {
//       display: "flex",
//       border: "1px solid #e2e8f0",
//       borderRadius: "8px",
//       padding: "4px",
//       backgroundColor: "#f8fafc",
//       marginBottom: "20px",
//     },
//     tabBtnActive: {
//       flex: 1,
//       padding: "8px",
//       borderRadius: "6px",
//       border: "none",
//       fontSize: "14px",
//       fontWeight: "600",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "8px",
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//     },
//     tabBtnInactive: {
//       flex: 1,
//       padding: "8px",
//       borderRadius: "6px",
//       border: "none",
//       fontSize: "14px",
//       fontWeight: "600",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "8px",
//       backgroundColor: "transparent",
//       color: "#475569",
//     },
//     termsBox: {
//       height: "120px",
//       overflowY: "auto",
//       border: "1px solid #e2e8f0",
//       borderRadius: "8px",
//       padding: "12px",
//       backgroundColor: "#ffffff",
//       fontSize: "12px",
//       color: "#475569",
//       lineHeight: "1.5",
//     },
//     digilockerBox: {
//       marginTop: "16px",
//       border: "1px solid #fde68a",
//       backgroundColor: "#fffbeb",
//       borderRadius: "12px",
//       padding: "16px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       gap: "12px",
//     },
//     digilockerBtn: {
//       backgroundColor: "#ea580c",
//       color: "#ffffff",
//       border: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       fontWeight: "600",
//       fontSize: "12px",
//       cursor: "pointer",
//       whiteSpace: "nowrap",
//     },
//     badgeGreen: {
//       fontSize: "12px",
//       color: "#059669",
//       backgroundColor: "#ecfdf5",
//       padding: "2px 8px",
//       borderRadius: "4px",
//       fontWeight: "600",
//     },
//     flexRowBetween: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: "12px",
//     },
//     flexColumnGap: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "12px",
//     },
//     flexAlignGap: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//     checkboxLabel: {
//       display: "flex",
//       alignItems: "flex-start",
//       gap: "8px",
//       marginTop: "12px",
//       cursor: "pointer",
//     },
//     alertError: {
//       border: "1px solid #fecaca",
//       backgroundColor: "#fef2f2",
//       color: "#b91c1c",
//       borderRadius: "8px",
//       padding: "10px 12px",
//       fontSize: "12px",
//       display: "flex",
//       alignItems: "flex-start",
//       gap: "8px",
//       marginBottom: "16px",
//     },
//     alertSuccess: {
//       border: "1px solid #a7f3d0",
//       backgroundColor: "#ecfdf5",
//       color: "#047857",
//       borderRadius: "8px",
//       padding: "10px 12px",
//       fontSize: "12px",
//       display: "flex",
//       alignItems: "flex-start",
//       gap: "8px",
//       marginBottom: "16px",
//     },
//   };

//   const getStepCircleStyle = (step) => {
//     const isCompleted = step < currentStep;
//     const isCurrent = step === currentStep;

//     return {
//       width: "32px",
//       height: "32px",
//       borderRadius: "50%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "12px",
//       fontWeight: "600",
//       transition: "all 0.2s",
//       backgroundColor: isCompleted
//         ? "#059669"
//         : isCurrent
//           ? "#2563eb"
//           : "#f1f5f9",
//       color: isCompleted || isCurrent ? "#ffffff" : "#94a3b8",
//       boxShadow: isCurrent ? "0 0 0 4px #dbeafe" : "none",
//       flexShrink: 0,
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
//                   backgroundColor:
//                     step < currentStep ? "#059669" : "#e2e8f0",
//                 }}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );

//   const renderMessage = () => (
//     <>
//       {actionError && (
//         <div style={styles.alertError}>
//           <AlertCircle size={16} />
//           <span>{actionError}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div style={styles.alertSuccess}>
//           <Check size={16} />
//           <span>{successMessage}</span>
//         </div>
//       )}
//     </>
//   );

//   const renderDocumentName = (document) => {
//     if (!document) {
//       return null;
//     }

//     if (document instanceof File) {
//       return document.name;
//     }

//     return document.name || "Uploaded document";
//   };

//   const renderEducationForm = () => (
//     <div>
//       <div style={styles.sectionBox}>
//         <h3 style={styles.sectionTitle}>
//           <User size={16} color="#4f46e5" /> Candidate Information
//         </h3>

//         <div style={styles.grid5}>
//           <div>
//             <label style={styles.label}>Candidate Name *</label>
//             <input
//               type="text"
//               placeholder="Enter Candidate Name"
//               style={styles.input}
//               value={personalDetails.fullName}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   fullName: event.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <label style={styles.label}>Candidate ID *</label>
//             <input
//               type="text"
//               placeholder="Enter Candidate ID"
//               style={styles.input}
//               value={personalDetails.candidateId}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   candidateId: event.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <label style={styles.label}>Client Name *</label>
//             <input
//               type="text"
//               placeholder="Enter Client Name"
//               style={styles.input}
//               value={personalDetails.clientName}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   clientName: event.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <label style={styles.label}>Mobile Number *</label>
//             <input
//               type="text"
//               placeholder="Enter Mobile Number"
//               style={styles.input}
//               value={personalDetails.mobile}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   mobile: event.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <label style={styles.label}>Email Address *</label>
//             <input
//               type="email"
//               placeholder="Enter Email Address"
//               style={styles.input}
//               value={personalDetails.email}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   email: event.target.value,
//                 }))
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {qualifications.map((qualification, index) => (
//         <div key={index} style={styles.sectionBox}>
//           <div style={{ ...styles.flexRowBetween, marginBottom: "16px" }}>
//             <h3 style={styles.sectionTitle}>Qualification {index + 1}</h3>

//             {qualifications.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeQualification(index)}
//                 style={styles.btnRemove}
//               >
//                 Remove
//               </button>
//             )}
//           </div>

//           <div
//             style={{
//               backgroundColor: "#f8fafc",
//               padding: "12px 16px",
//               borderRadius: "8px",
//               border: "1px solid #e2e8f0",
//               marginBottom: "20px",
//             }}
//           >
//             <label
//               style={{
//                 ...styles.label,
//                 marginBottom: "8px",
//                 display: "block",
//                 color: "#1e293b",
//               }}
//             >
//               QUALIFICATION SCOPE *
//             </label>

//             <div
//               style={{
//                 display: "flex",
//                 background: "rgb(226, 232, 240)",
//                 borderRadius: "8px",
//                 padding: "3px",
//                 width: "320px",
//                 maxWidth: "100%",
//               }}
//             >
//               <label
//                 style={{
//                   flex: "1 1 0%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "6px",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "none",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "0.2s",
//                   background:
//                     qualification.nationalInternational === "National"
//                       ? "rgb(0, 56, 131)"
//                       : "transparent",
//                   color:
//                     qualification.nationalInternational === "National"
//                       ? "rgb(255, 255, 255)"
//                       : "rgb(71, 85, 105)",
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name={`nat-int-${index}`}
//                   value="National"
//                   checked={
//                     qualification.nationalInternational === "National"
//                   }
//                   onChange={(event) =>
//                     handleQualificationChange(
//                       index,
//                       "nationalInternational",
//                       event.target.value,
//                     )
//                   }
//                   style={{ display: "none" }}
//                 />
//                 National
//               </label>

//               <label
//                 style={{
//                   flex: "1 1 0%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "6px",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "none",
//                   fontSize: "12px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   transition: "0.2s",
//                   background:
//                     qualification.nationalInternational === "International"
//                       ? "rgb(0, 56, 131)"
//                       : "transparent",
//                   color:
//                     qualification.nationalInternational === "International"
//                       ? "rgb(255, 255, 255)"
//                       : "rgb(71, 85, 105)",
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name={`nat-int-${index}`}
//                   value="International"
//                   checked={
//                     qualification.nationalInternational === "International"
//                   }
//                   onChange={(event) =>
//                     handleQualificationChange(
//                       index,
//                       "nationalInternational",
//                       event.target.value,
//                     )
//                   }
//                   style={{ display: "none" }}
//                 />
//                 International
//               </label>
//             </div>
//           </div>

//           <div style={{ ...styles.grid5, marginBottom: "16px" }}>
//             <div>
//               <label style={styles.label}>Qualification Type *</label>
//               <select
//                 style={styles.input}
//                 value={qualification.qualificationType}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "qualificationType",
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">Select Qualification Type</option>
//                 <option value="Post Graduate">Post Graduate</option>
//                 <option value="Graduate">Graduate</option>
//                 <option value="Diploma">Diploma</option>
//                 <option value="12th">12th Standard</option>
//                 <option value="10th">10th Standard</option>
//               </select>
//             </div>

//             <div>
//               <label style={styles.label}>Course / Stream *</label>
//               <select
//                 style={styles.input}
//                 value={qualification.courseStream}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "courseStream",
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">Select Course / Stream</option>
//                 <option value="B.Tech">B.Tech / B.E.</option>
//                 <option value="B.Sc">B.Sc</option>
//                 <option value="B.Com">B.Com</option>
//                 <option value="B.A">B.A</option>
//                 <option value="MCA">MCA</option>
//               </select>
//             </div>

//             <div>
//               <label style={styles.label}>
//                 Specialization (Optional)
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Specialization"
//                 style={styles.input}
//                 value={qualification.specialization}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "specialization",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Institute / University *</label>
//               <select
//                 style={styles.input}
//                 value={qualification.institute}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "institute",
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">Enter Institute / School / Univer</option>
//                 <option value="University of Mumbai">
//                   University of Mumbai
//                 </option>
//                 <option value="Delhi University">Delhi University</option>
//                 <option value="IIT Bombay">IIT Bombay</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label style={styles.label}>Board / University *</label>
//               <select
//                 style={styles.input}
//                 value={qualification.boardUniversity}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "boardUniversity",
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">Select Board / University</option>
//                 <option value="State Board">State Board</option>
//                 <option value="CBSE">CBSE</option>
//                 <option value="ICSE">ICSE</option>
//                 <option value="Deemed University">
//                   Deemed University
//                 </option>
//               </select>
//             </div>
//           </div>

//           {qualification.nationalInternational === "National" && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit, minmax(200px, 1fr))",
//                 gap: "12px",
//                 marginBottom: "16px",
//               }}
//             >
//               <div>
//                 <label style={styles.label}>Verification Fees By *</label>
//                 <select
//                   style={styles.input}
//                   value={qualification.verificationFeesBy}
//                   onChange={(event) =>
//                     handleQualificationChange(
//                       index,
//                       "verificationFeesBy",
//                       event.target.value,
//                     )
//                   }
//                 >
//                   <option value="">Select Verification Type</option>
//                   <option value="Normal">Normal</option>
//                   <option value="Year of Passing">Year of Passing</option>
//                   <option value="UG/PG">UG/PG</option>
//                 </select>
//               </div>

//               {qualification.verificationFeesBy === "Year of Passing" && (
//                 <>
//                   <div>
//                     <label style={styles.label}>From YOP *</label>
//                     <input
//                       type="text"
//                       placeholder="YYYY"
//                       style={styles.input}
//                       value={qualification.fromYop}
//                       onChange={(event) =>
//                         handleQualificationChange(
//                           index,
//                           "fromYop",
//                           event.target.value,
//                         )
//                       }
//                     />
//                   </div>

//                   <div>
//                     <label style={styles.label}>To YOP *</label>
//                     <input
//                       type="text"
//                       placeholder="YYYY"
//                       style={styles.input}
//                       value={qualification.toYop}
//                       onChange={(event) =>
//                         handleQualificationChange(
//                           index,
//                           "toYop",
//                           event.target.value,
//                         )
//                       }
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           <div style={styles.grid4}>
//             <div>
//               <label style={styles.label}>Verification Fees (₹)</label>
//               <input
//                 type="text"
//                 placeholder="Enter Verification Fees"
//                 style={styles.input}
//                 value={qualification.universityFees}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "universityFees",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>GST (₹)</label>
//               <input
//                 type="text"
//                 placeholder="Enter GST"
//                 style={styles.input}
//                 value={qualification.commission}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "commission",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Total Amount (₹)</label>
//               <input
//                 type="text"
//                 placeholder="Enter Total Amount"
//                 style={styles.input}
//                 value={qualification.serviceCharge}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "serviceCharge",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Mode of Study</label>
//               <select
//                 style={styles.input}
//                 value={qualification.modeOfStudy}
//                 onChange={(event) =>
//                   handleQualificationChange(
//                     index,
//                     "modeOfStudy",
//                     event.target.value,
//                   )
//                 }
//               >
//                 <option value="">Select Mode</option>
//                 <option value="Regular">Regular</option>
//                 <option value="Distance">Distance</option>
//                 <option value="Online">Online</option>
//                 <option value="Part Time">Part Time</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label style={styles.label}>
//               DOCUMENTS * (Upload up to 4 documents)
//             </label>

//             <div style={styles.docGrid}>
//               {[1, 2, 3, 4].map((documentNumber, documentIndex) => {
//                 const document = qualification.documents?.[documentIndex];

//                 return (
//                   <div key={documentIndex} style={styles.docBox}>
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         fontWeight: "700",
//                         color: "#1e293b",
//                         marginBottom: "4px",
//                       }}
//                     >
//                       Document {documentNumber}
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "10px",
//                         color: "#94a3b8",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       PDF, JPG, PNG (Max 10MB)
//                     </div>

//                     <label style={styles.uploadBtnLabel}>
//                       <Upload size={12} /> Choose File
//                       <input
//                         type="file"
//                         style={{ display: "none" }}
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(event) =>
//                           handleQualDocumentUpload(
//                             index,
//                             documentIndex,
//                             event.target.files?.[0],
//                           )
//                         }
//                       />
//                     </label>

//                     {document && (
//                       <div
//                         style={{
//                           fontSize: "11px",
//                           color: "#059669",
//                           marginTop: "6px",
//                           textOverflow: "ellipsis",
//                           overflow: "hidden",
//                           whiteSpace: "nowrap",
//                         }}
//                         title={renderDocumentName(document)}
//                       >
//                         ✓ {renderDocumentName(document)}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={addQualification}
//         style={styles.btnDashedAdd}
//       >
//         + Add Qualification
//       </button>
//     </div>
//   );

//   const renderEmploymentForm = () => (
//     <div>
//       <div style={styles.sectionBox}>
//         <h3 style={styles.sectionTitleCentered}>Candidate Details</h3>

//         <div style={styles.grid2}>
//           <div>
//             <label style={styles.label}>CANDIDATE NAME *</label>
//             <input
//               type="text"
//               placeholder="Enter candidate name"
//               style={styles.input}
//               value={personalDetails.fullName}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   fullName: event.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div>
//             <label style={styles.label}>DATE *</label>
//             <input
//               type="date"
//               style={styles.input}
//               value={personalDetails.candidateDate}
//               onChange={(event) =>
//                 setPersonalDetails((previous) => ({
//                   ...previous,
//                   candidateDate: event.target.value,
//                 }))
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {employers.map((employer, index) => (
//         <div key={index} style={styles.sectionBox}>
//           <div style={{ ...styles.flexRowBetween, marginBottom: "16px" }}>
//             <h3 style={styles.sectionTitle}>Employer {index + 1}</h3>

//             {employers.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeEmployer(index)}
//                 style={styles.btnRemove}
//               >
//                 Remove
//               </button>
//             )}
//           </div>

//           <div style={styles.grid3}>
//             <div>
//               <label style={styles.label}>Company Name *</label>
//               <input
//                 type="text"
//                 placeholder="Enter company name"
//                 style={styles.input}
//                 value={employer.companyName}
//                 onChange={(event) =>
//                   handleEmployerChange(
//                     index,
//                     "companyName",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Designation *</label>
//               <input
//                 type="text"
//                 placeholder="Enter designation"
//                 style={styles.input}
//                 value={employer.designation}
//                 onChange={(event) =>
//                   handleEmployerChange(
//                     index,
//                     "designation",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Employee ID</label>
//               <input
//                 type="text"
//                 placeholder="Enter employee ID"
//                 style={styles.input}
//                 value={employer.employeeId}
//                 onChange={(event) =>
//                   handleEmployerChange(
//                     index,
//                     "employeeId",
//                     event.target.value,
//                   )
//                 }
//               />
//             </div>
//           </div>

//           <div style={styles.grid2}>
//             <div>
//               <label style={styles.label}>HR Email ID *</label>
//               <input
//                 type="email"
//                 placeholder="Enter HR email ID"
//                 style={styles.input}
//                 value={employer.hrEmail}
//                 onChange={(event) =>
//                   handleEmployerChange(index, "hrEmail", event.target.value)
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>HR Phone Number *</label>

//               <div style={{ display: "flex", gap: "8px" }}>
//                 <select
//                   style={{ ...styles.input, width: "90px" }}
//                   value={employer.hrPhoneCode}
//                   onChange={(event) =>
//                     handleEmployerChange(
//                       index,
//                       "hrPhoneCode",
//                       event.target.value,
//                     )
//                   }
//                 >
//                   <option value="+91">+91</option>
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Enter phone number"
//                   style={styles.input}
//                   value={employer.hrPhone}
//                   onChange={(event) =>
//                     handleEmployerChange(
//                       index,
//                       "hrPhone",
//                       event.target.value,
//                     )
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <div style={styles.grid2}>
//             <div>
//               <label style={styles.label}>Date of Joining *</label>
//               <input
//                 type="date"
//                 style={styles.input}
//                 value={employer.doj}
//                 onChange={(event) =>
//                   handleEmployerChange(index, "doj", event.target.value)
//                 }
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Date of Exit *</label>
//               <input
//                 type="date"
//                 style={styles.input}
//                 value={employer.doe}
//                 onChange={(event) =>
//                   handleEmployerChange(index, "doe", event.target.value)
//                 }
//               />
//             </div>
//           </div>

//           <div>
//             <label style={styles.label}>
//               DOCUMENTS * (Upload up to 4 documents)
//             </label>

//             <div style={styles.docGrid}>
//               {[1, 2, 3, 4].map((documentNumber, documentIndex) => {
//                 const document = employer.documents?.[documentIndex];

//                 return (
//                   <div key={documentIndex} style={styles.docBox}>
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         fontWeight: "700",
//                         color: "#1e293b",
//                         marginBottom: "4px",
//                       }}
//                     >
//                       Document {documentNumber}
//                     </div>

//                     <div
//                       style={{
//                         fontSize: "10px",
//                         color: "#94a3b8",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       PDF, JPG, PNG (Max 10MB)
//                     </div>

//                     <label style={styles.uploadBtnLabel}>
//                       <Upload size={12} /> Choose File
//                       <input
//                         type="file"
//                         style={{ display: "none" }}
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(event) =>
//                           handleFileUpload(
//                             index,
//                             documentIndex,
//                             event.target.files?.[0],
//                           )
//                         }
//                       />
//                     </label>

//                     {document && (
//                       <div
//                         style={{
//                           fontSize: "11px",
//                           color: "#059669",
//                           marginTop: "6px",
//                           textOverflow: "ellipsis",
//                           overflow: "hidden",
//                           whiteSpace: "nowrap",
//                         }}
//                         title={renderDocumentName(document)}
//                       >
//                         ✓ {renderDocumentName(document)}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={addEmployer}
//         style={styles.btnDashedAdd}
//       >
//         + Add Employer
//       </button>
//     </div>
//   );

//   const renderReviewItem = (label, value) => (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         gap: "20px",
//         padding: "10px 0",
//         borderBottom: "1px solid #f1f5f9",
//         fontSize: "13px",
//       }}
//     >
//       <span style={{ color: "#64748b", fontWeight: 600 }}>{label}</span>
//       <span style={{ color: "#0f172a", textAlign: "right" }}>
//         {value || "—"}
//       </span>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.initialCard}>
//           <div style={styles.iconHeaderCircle}>
//             <Loader2 size={32} />
//           </div>
//           <h1 style={styles.mainTitle}>Loading Verification</h1>
//           <p style={styles.subtitle}>
//             Please wait while your candidate verification link is loaded.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (pageError) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.initialCard}>
//           <div
//             style={{
//               ...styles.iconHeaderCircle,
//               backgroundColor: "#fef2f2",
//               color: "#dc2626",
//             }}
//           >
//             <AlertCircle size={32} />
//           </div>
//           <h1 style={styles.mainTitle}>Verification Link Error</h1>
//           <p style={styles.subtitle}>{pageError}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       {!isOpen ? (
//         <div style={styles.initialCard}>
//           <div style={styles.iconHeaderCircle}>
//             <ShieldCheck size={32} />
//           </div>

//           <h1 style={styles.mainTitle}>Candidate Verification Portal</h1>

//           <p style={styles.subtitle}>
//             Start the 7-step identity, education, document, and background
//             verification process.
//           </p>

//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             style={styles.btnPrimaryFull}
//           >
//             <span>Start Verification Flow</span>
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       ) : (
//         <div style={styles.card}>
//           {currentStep > 1 && currentStep < 7 && renderStepper()}

//           <div style={styles.innerPadding}>
//             {renderMessage()}

//             {currentStep === 1 && (
//               <div style={{ textAlign: "center" }}>
//                 <div style={styles.step1IconCircle}>
//                   <ShieldCheck size={36} />
//                 </div>

//                 <span style={styles.stepBadge}>Step 1 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Background Verification
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Welcome! Please complete your background verification to
//                   proceed with your onboarding process.
//                 </p>

//                 <div
//                   style={{
//                     ...styles.sectionBoxGray,
//                     textAlign: "left",
//                   }}
//                 >
//                   <h3 style={styles.sectionTitle}>
//                     Before you begin, ensure you have:
//                   </h3>

//                   <div style={styles.flexColumnGap}>
//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span
//                         style={{
//                           fontSize: "13px",
//                           color: "#475569",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Government ID (Aadhaar / PAN card)
//                       </span>
//                     </div>

//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span
//                         style={{
//                           fontSize: "13px",
//                           color: "#475569",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Educational Certificates (Degree / Marksheets)
//                       </span>
//                     </div>

//                     <div style={styles.flexAlignGap}>
//                       <div style={styles.badgeCheck}>✓</div>
//                       <span
//                         style={{
//                           fontSize: "13px",
//                           color: "#475569",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Employment details & HR contact information
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.footer}>
//                   <span
//                     style={{
//                       fontSize: "12px",
//                       color: "#94a3b8",
//                     }}
//                   >
//                     Case ID: {linkData?.caseId || "—"}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     style={styles.btnPrimary}
//                   >
//                     <span>Begin Verification</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 2 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Consent & Verification
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Verify your email address and provide consent under DPDP Act.
//                 </p>

//                 <div style={styles.sectionBox}>
//                   <div
//                     style={{
//                       ...styles.flexRowBetween,
//                       marginBottom: "12px",
//                     }}
//                   >
//                     <label style={styles.label}>E-mail Verification</label>

//                     {emailVerified && (
//                       <span style={styles.badgeGreen}>
//                         ✓ E-mail Verified
//                       </span>
//                     )}
//                   </div>

//                   {emailVerified ? (
//                     <div
//                       style={{
//                         fontSize: "13px",
//                         color: "#475569",
//                       }}
//                     >
//                       Verified email: <strong>{personalDetails.email}</strong>
//                     </div>
//                   ) : (
//                     <>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "8px",
//                           alignItems: "center",
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         {otpDigits.map((digit, index) => (
//                           <input
//                             key={index}
//                             ref={(element) => {
//                               otpRefs.current[index] = element;
//                             }}
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChange={(event) =>
//                               handleOtpChange(index, event.target.value)
//                             }
//                             onKeyDown={(event) =>
//                               handleOtpKeyDown(index, event)
//                             }
//                             style={styles.otpInput}
//                           />
//                         ))}

//                         <button
//                           type="button"
//                           onClick={verifyOtp}
//                           disabled={saving || otpDigits.join("").length !== 4}
//                           style={{
//                             ...styles.btnPrimary,
//                             opacity:
//                               saving || otpDigits.join("").length !== 4
//                                 ? 0.5
//                                 : 1,
//                           }}
//                         >
//                           Verify OTP
//                         </button>
//                       </div>

//                       <div
//                         style={{
//                           ...styles.flexRowBetween,
//                           fontSize: "12px",
//                           color: "#94a3b8",
//                           marginTop: "8px",
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         <span>
//                           Enter 4-digit OTP sent to{" "}
//                           {personalDetails.email || "your email"}
//                         </span>

//                         <button
//                           type="button"
//                           onClick={sendOtp}
//                           disabled={saving}
//                           style={{
//                             background: "none",
//                             border: "none",
//                             color: "#2563eb",
//                             cursor: saving ? "not-allowed" : "pointer",
//                             padding: 0,
//                             fontSize: "12px",
//                             fontWeight: 600,
//                           }}
//                         >
//                           {otpSent ? "Resend OTP" : "Send OTP"}
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 <div style={styles.sectionBoxGray}>
//                   <label style={styles.label}>
//                     Data Protection Consent (DPDP Act 2023)
//                   </label>

//                   <div style={styles.termsBox}>
//                     In accordance with the Digital Personal Data Protection Act,
//                     2023, by checking the box below, you explicitly consent to
//                     the collection, processing, and sharing of your personal,
//                     educational, and professional data for background
//                     verification.
//                   </div>

//                   <label style={styles.checkboxLabel}>
//                     <input
//                       type="checkbox"
//                       checked={dpdpAccepted}
//                       onChange={(event) =>
//                         setDpdpAccepted(event.target.checked)
//                       }
//                       style={{ marginTop: "3px" }}
//                     />

//                     <span
//                       style={{
//                         fontSize: "12px",
//                         color: "#475569",
//                       }}
//                     >
//                       I have read and agree to the data protection consent
//                       terms and authorize background checks.
//                     </span>
//                   </label>
//                 </div>

//                 <div style={styles.footer}>
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     style={styles.btnSecondary}
//                   >
//                     <ChevronLeft size={16} /> Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     disabled={!dpdpAccepted || !emailVerified}
//                     style={{
//                       ...styles.btnPrimary,
//                       opacity:
//                         dpdpAccepted && emailVerified ? 1 : 0.5,
//                       cursor:
//                         dpdpAccepted && emailVerified
//                           ? "pointer"
//                           : "not-allowed",
//                     }}
//                   >
//                     <span>Give Consent & Continue</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 3 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Personal & Identity
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Provide your personal details and government identity
//                   documents.
//                 </p>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>Personal Details</h3>

//                   <div
//                     style={{
//                       ...styles.grid2,
//                       alignItems: "center",
//                       marginBottom: "16px",
//                     }}
//                   >
//                     <div>
//                       <label style={styles.label}>Full Name *</label>

//                       <input
//                         type="text"
//                         value={personalDetails.fullName}
//                         onChange={(event) =>
//                           setPersonalDetails((previous) => ({
//                             ...previous,
//                             fullName: event.target.value,
//                           }))
//                         }
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
//                               style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                               }}
//                             />
//                           ) : (
//                             <User size={36} color="#94a3b8" />
//                           )}
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "4px",
//                           }}
//                         >
//                           <label
//                             style={{
//                               ...styles.uploadBtnLabel,
//                               width: "fit-content",
//                             }}
//                           >
//                             <Camera size={14} /> Upload Image

//                             <input
//                               type="file"
//                               accept="image/*"
//                               style={{ display: "none" }}
//                               onChange={handleProfileImageChange}
//                             />
//                           </label>

//                           <span
//                             style={{
//                               fontSize: "10px",
//                               color: "#94a3b8",
//                             }}
//                           >
//                             JPG, PNG (Max 10MB)
//                           </span>

//                           {identityDocuments?.profile_image?.name && (
//                             <span
//                               style={{
//                                 fontSize: "10px",
//                                 color: "#059669",
//                               }}
//                             >
//                               ✓ {identityDocuments.profile_image.name}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>Date of Birth</label>

//                       <input
//                         type="date"
//                         value={personalDetails.dob || ""}
//                         readOnly
//                         style={styles.inputReadOnly}
//                       />
//                     </div>

//                     <div>
//                       <label style={styles.label}>Gender</label>

//                       <select
//                         style={styles.input}
//                         value={personalDetails.gender}
//                         onChange={(event) =>
//                           setPersonalDetails((previous) => ({
//                             ...previous,
//                             gender: event.target.value,
//                           }))
//                         }
//                       >
//                         <option value="">Select</option>
//                         <option value="Female">Female</option>
//                         <option value="Male">Male</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>Mobile</label>

//                       <input
//                         type="text"
//                         value={personalDetails.mobile}
//                         readOnly
//                         style={styles.inputReadOnly}
//                       />
//                     </div>

//                     <div>
//                       <label style={styles.label}>Email</label>

//                       <input
//                         type="email"
//                         value={personalDetails.email}
//                         readOnly
//                         style={styles.inputReadOnly}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>Address Details</h3>

//                   <div style={{ marginBottom: "16px" }}>
//                     <label style={styles.label}>Current Address *</label>

//                     <textarea
//                       placeholder="Flat/House No., Street, Area, City, State — PIN"
//                       style={styles.textarea}
//                       value={personalDetails.currentAddress}
//                       onChange={(event) =>
//                         setPersonalDetails((previous) => ({
//                           ...previous,
//                           currentAddress: event.target.value,
//                         }))
//                       }
//                     />

//                     <div
//                       style={{
//                         ...styles.grid2,
//                         marginTop: "12px",
//                       }}
//                     >
//                       <div>
//                         <label style={styles.label}>
//                           Current Address Proof Type *
//                         </label>

//                         <select
//                           style={styles.input}
//                           value={personalDetails.currentAddressDocType}
//                           onChange={(event) =>
//                             setPersonalDetails((previous) => ({
//                               ...previous,
//                               currentAddressDocType: event.target.value,
//                             }))
//                           }
//                         >
//                           <option value="">
//                             Select Document Type
//                           </option>
//                           <option value="Aadhaar Card">
//                             Aadhaar Card
//                           </option>
//                           <option value="Driving License">
//                             Driving License (DL)
//                           </option>
//                           <option value="Electricity Bill">
//                             Electricity Bill
//                           </option>
//                           <option value="Passport">Passport</option>
//                           <option value="Rent Agreement">
//                             Rent Agreement
//                           </option>
//                           <option value="Voter ID">Voter ID</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label style={styles.label}>
//                           Upload Address Proof Document *
//                         </label>

//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "10px",
//                           }}
//                         >
//                           <label
//                             style={{
//                               ...styles.uploadBtnLabel,
//                               padding: "10px 14px",
//                               width: "100%",
//                             }}
//                           >
//                             <Upload size={14} /> Choose File

//                             <input
//                               type="file"
//                               style={{ display: "none" }}
//                               accept=".pdf,.jpg,.jpeg,.png"
//                               onChange={(event) =>
//                                 setPersonalDetails((previous) => ({
//                                   ...previous,
//                                   currentAddressDocFile:
//                                     event.target.files?.[0] || null,
//                                 }))
//                               }
//                             />
//                           </label>
//                         </div>

//                         {personalDetails.currentAddressDocFile && (
//                           <div
//                             style={{
//                               fontSize: "11px",
//                               color: "#059669",
//                               marginTop: "4px",
//                               textOverflow: "ellipsis",
//                               overflow: "hidden",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             ✓ {personalDetails.currentAddressDocFile.name}
//                           </div>
//                         )}

//                         {!personalDetails.currentAddressDocFile &&
//                           identityDocuments?.current_address_proof?.name && (
//                             <div
//                               style={{
//                                 fontSize: "11px",
//                                 color: "#059669",
//                                 marginTop: "4px",
//                               }}
//                             >
//                               ✓{" "}
//                               {
//                                 identityDocuments.current_address_proof
//                                   .name
//                               }
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>

//                   <hr
//                     style={{
//                       border: "none",
//                       borderTop: "1px solid #e2e8f0",
//                       margin: "16px 0",
//                     }}
//                   />

//                   <label
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       margin: "12px 0",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={personalDetails.isPermanentSame}
//                       onChange={(event) => {
//                         const checked = event.target.checked;

//                         setPersonalDetails((previous) => ({
//                           ...previous,
//                           isPermanentSame: checked,
//                           permanentAddress: checked
//                             ? previous.currentAddress
//                             : "",
//                           permanentAddressDocType: checked
//                             ? previous.currentAddressDocType
//                             : "",
//                           permanentAddressDocFile: checked
//                             ? previous.currentAddressDocFile
//                             : null,
//                         }));
//                       }}
//                     />

//                     <span
//                       style={{
//                         fontSize: "12px",
//                         color: "#475569",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Permanent address same as current
//                     </span>
//                   </label>

//                   {!personalDetails.isPermanentSame && (
//                     <div style={{ marginTop: "12px" }}>
//                       <label style={styles.label}>
//                         Permanent Address *
//                       </label>

//                       <textarea
//                         placeholder="Flat/House No., Street, Area, City, State — PIN"
//                         style={styles.textarea}
//                         value={personalDetails.permanentAddress}
//                         onChange={(event) =>
//                           setPersonalDetails((previous) => ({
//                             ...previous,
//                             permanentAddress: event.target.value,
//                           }))
//                         }
//                       />

//                       <div
//                         style={{
//                           ...styles.grid2,
//                           marginTop: "12px",
//                         }}
//                       >
//                         <div>
//                           <label style={styles.label}>
//                             Permanent Address Proof Type *
//                           </label>

//                           <select
//                             style={styles.input}
//                             value={
//                               personalDetails.permanentAddressDocType
//                             }
//                             onChange={(event) =>
//                               setPersonalDetails((previous) => ({
//                                 ...previous,
//                                 permanentAddressDocType:
//                                   event.target.value,
//                               }))
//                             }
//                           >
//                             <option value="">
//                               Select Document Type
//                             </option>
//                             <option value="Aadhaar Card">
//                               Aadhaar Card
//                             </option>
//                             <option value="Driving License">
//                               Driving License (DL)
//                             </option>
//                             <option value="Electricity Bill">
//                               Electricity Bill
//                             </option>
//                             <option value="Passport">Passport</option>
//                             <option value="Rent Agreement">
//                               Rent Agreement
//                             </option>
//                             <option value="Voter ID">Voter ID</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label style={styles.label}>
//                             Upload Address Proof Document *
//                           </label>

//                           <label
//                             style={{
//                               ...styles.uploadBtnLabel,
//                               padding: "10px 14px",
//                               width: "100%",
//                             }}
//                           >
//                             <Upload size={14} /> Choose File

//                             <input
//                               type="file"
//                               style={{ display: "none" }}
//                               accept=".pdf,.jpg,.jpeg,.png"
//                               onChange={(event) =>
//                                 setPersonalDetails((previous) => ({
//                                   ...previous,
//                                   permanentAddressDocFile:
//                                     event.target.files?.[0] || null,
//                                 }))
//                               }
//                             />
//                           </label>

//                           {personalDetails.permanentAddressDocFile && (
//                             <div
//                               style={{
//                                 fontSize: "11px",
//                                 color: "#059669",
//                                 marginTop: "4px",
//                                 textOverflow: "ellipsis",
//                                 overflow: "hidden",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               ✓{" "}
//                               {
//                                 personalDetails.permanentAddressDocFile
//                                   .name
//                               }
//                             </div>
//                           )}

//                           {!personalDetails.permanentAddressDocFile &&
//                             identityDocuments
//                               ?.permanent_address_proof?.name && (
//                               <div
//                                 style={{
//                                   fontSize: "11px",
//                                   color: "#059669",
//                                   marginTop: "4px",
//                                 }}
//                               >
//                                 ✓{" "}
//                                 {
//                                   identityDocuments
//                                     .permanent_address_proof.name
//                                 }
//                               </div>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>
//                     <CreditCard size={16} color="#2563eb" /> Identity
//                     Documents
//                   </h3>

//                   <div style={styles.grid2}>
//                     <div>
//                       <label style={styles.label}>
//                         Aadhaar Number *
//                       </label>

//                       <input
//                         type="text"
//                         placeholder="Enter 12-digit Aadhaar Number"
//                         style={styles.input}
//                         maxLength={12}
//                         value={personalDetails.aadhaarNumber}
//                         onChange={(event) =>
//                           setPersonalDetails((previous) => ({
//                             ...previous,
//                             aadhaarNumber: event.target.value
//                               .replace(/\D/g, "")
//                               .slice(0, 12),
//                           }))
//                         }
//                       />
//                     </div>

//                     <div>
//                       <label style={styles.label}>PAN Number *</label>

//                       <input
//                         type="text"
//                         placeholder="ABCDE1234F"
//                         style={{
//                           ...styles.input,
//                           textTransform: "uppercase",
//                         }}
//                         maxLength={10}
//                         value={personalDetails.panNumber}
//                         onChange={(event) =>
//                           setPersonalDetails((previous) => ({
//                             ...previous,
//                             panNumber: event.target.value
//                               .toUpperCase()
//                               .slice(0, 10),
//                           }))
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div style={styles.digilockerBox}>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "12px",
//                       }}
//                     >
//                       <Lock size={20} color="#ea580c" />

//                       <div>
//                         <h4
//                           style={{
//                             fontSize: "13px",
//                             fontWeight: "700",
//                             margin: 0,
//                             color: "#9a3412",
//                           }}
//                         >
//                           Fast-track with DigiLocker
//                         </h4>

//                         <p
//                           style={{
//                             fontSize: "11px",
//                             color: "#c2410c",
//                             margin: "2px 0 0 0",
//                           }}
//                         >
//                           Fetch verified Aadhaar & PAN instantly via
//                           DigiLocker.
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       type="button"
//                       style={styles.digilockerBtn}
//                       onClick={async () => {
//                         setActionError("");
//                         setSuccessMessage("");

//                         try {
//                           const data = await apiRequest(
//                             `/candidate-link/${token}/digilocker/connect`,
//                             { method: "POST" },
//                           );

//                           setSuccessMessage(
//                             data?.message || "DigiLocker connected.",
//                           );
//                         } catch (error) {
//                           setActionError(
//                             error.message ||
//                               "DigiLocker is not configured yet.",
//                           );
//                         }
//                       }}
//                     >
//                       Connect DigiLocker
//                     </button>
//                   </div>
//                 </div>

//                 <div style={styles.footer}>
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     style={styles.btnSecondary}
//                   >
//                     <ChevronLeft size={16} /> Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={saveIdentity}
//                     disabled={saving}
//                     style={{
//                       ...styles.btnPrimary,
//                       opacity: saving ? 0.6 : 1,
//                     }}
//                   >
//                     {saving ? (
//                       <Loader2 size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}

//                     <span>
//                       {saving ? "Saving..." : "Verify Identity"}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 4 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 4 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Education & Employment
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Add your qualifications and professional history.
//                 </p>

//                 {requestedCandidateChecks.length > 0 ? (
//                   <>
//                     {hasEducation && hasEmployment && (
//                       <div style={styles.tabContainer}>
//                         <button
//                           type="button"
//                           onClick={() => setStep4Tab("education")}
//                           style={
//                             step4Tab === "education"
//                               ? styles.tabBtnActive
//                               : styles.tabBtnInactive
//                           }
//                         >
//                           <GraduationCap size={16} /> Education
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => setStep4Tab("employment")}
//                           style={
//                             step4Tab === "employment"
//                               ? styles.tabBtnActive
//                               : styles.tabBtnInactive
//                           }
//                         >
//                           <Briefcase size={16} /> Employment
//                         </button>
//                       </div>
//                     )}

//                     {hasEducation &&
//                       (!hasEmployment || step4Tab === "education") &&
//                       renderEducationForm()}

//                     {hasEmployment &&
//                       (!hasEducation || step4Tab === "employment") &&
//                       renderEmploymentForm()}
//                   </>
//                 ) : (
//                   <div style={styles.sectionBoxGray}>
//                     <h3 style={styles.sectionTitle}>
//                       No Education / Employment Check Requested
//                     </h3>

//                     <p
//                       style={{
//                         fontSize: "13px",
//                         color: "#64748b",
//                         margin: 0,
//                       }}
//                     >
//                       This verification link does not contain an education
//                       or employment check.
//                     </p>
//                   </div>
//                 )}

//                 <div style={styles.footer}>
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     style={styles.btnSecondary}
//                   >
//                     <ChevronLeft size={16} /> Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={saveEducationAndEmployment}
//                     disabled={saving}
//                     style={{
//                       ...styles.btnPrimary,
//                       opacity: saving ? 0.6 : 1,
//                     }}
//                   >
//                     {saving ? (
//                       <Loader2 size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     )}

//                     <span>
//                       {saving ? "Saving..." : "Save & Continue"}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 5 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 5 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Review Submitted Details
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Review the information and documents before declaration.
//                 </p>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>
//                     <User size={16} color="#2563eb" /> Candidate
//                   </h3>

//                   {renderReviewItem(
//                     "Candidate Name",
//                     personalDetails.fullName,
//                   )}
//                   {renderReviewItem(
//                     "Candidate ID",
//                     personalDetails.candidateId,
//                   )}
//                   {renderReviewItem(
//                     "Email",
//                     personalDetails.email,
//                   )}
//                   {renderReviewItem(
//                     "Mobile",
//                     personalDetails.mobile,
//                   )}
//                   {renderReviewItem(
//                     "Date of Birth",
//                     personalDetails.dob,
//                   )}
//                   {renderReviewItem(
//                     "Gender",
//                     personalDetails.gender,
//                   )}
//                 </div>

//                 <div style={styles.sectionBox}>
//                   <h3 style={styles.sectionTitle}>
//                     <FileText size={16} color="#2563eb" /> Verification
//                     Details
//                   </h3>

//                   {hasEducation &&
//                     renderReviewItem(
//                       "Qualifications",
//                       `${qualifications.length} qualification${
//                         qualifications.length === 1 ? "" : "s"
//                       }`,
//                     )}

//                   {hasEmployment &&
//                     renderReviewItem(
//                       "Employers",
//                       `${employers.length} employer${
//                         employers.length === 1 ? "" : "s"
//                       }`,
//                     )}

//                   {renderReviewItem(
//                     "Requested Checks",
//                     availableChecks.join(", "),
//                   )}
//                 </div>

//                 <div style={styles.footer}>
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     style={styles.btnSecondary}
//                   >
//                     <ChevronLeft size={16} /> Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     style={styles.btnPrimary}
//                   >
//                     <span>Continue</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 6 && (
//               <div>
//                 <span style={styles.stepBadge}>Step 6 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Declaration & Submit
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Confirm the information provided and submit your
//                   verification.
//                 </p>

//                 <div style={styles.sectionBoxGray}>
//                   <h3 style={styles.sectionTitle}>Declaration</h3>

//                   <div style={styles.termsBox}>
//                     I declare that the information and documents submitted by
//                     me are true, complete, and correct to the best of my
//                     knowledge. I understand that the information will be used
//                     for background verification and that incorrect or
//                     misleading information may affect the verification result.
//                   </div>

//                   <label style={styles.checkboxLabel}>
//                     <input
//                       type="checkbox"
//                       checked={declarationAccepted}
//                       onChange={(event) =>
//                         setDeclarationAccepted(event.target.checked)
//                       }
//                       style={{ marginTop: "3px" }}
//                     />

//                     <span
//                       style={{
//                         fontSize: "12px",
//                         color: "#475569",
//                       }}
//                     >
//                       I confirm the above declaration and authorize submission
//                       of this background verification.
//                     </span>
//                   </label>
//                 </div>

//                 <div style={styles.sectionBoxAmber}>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: "10px",
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     <ShieldCheck
//                       size={18}
//                       color="#d97706"
//                       style={{ flexShrink: 0 }}
//                     />

//                     <div
//                       style={{
//                         fontSize: "12px",
//                         color: "#92400e",
//                         lineHeight: 1.5,
//                       }}
//                     >
//                       After final submission, this candidate link will be
//                       marked as submitted.
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.footer}>
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     style={styles.btnSecondary}
//                   >
//                     <ChevronLeft size={16} /> Back
//                   </button>

//                   <button
//                     type="button"
//                     onClick={submitVerification}
//                     disabled={!declarationAccepted || saving}
//                     style={{
//                       ...styles.btnPrimary,
//                       opacity:
//                         declarationAccepted && !saving ? 1 : 0.5,
//                       cursor:
//                         declarationAccepted && !saving
//                           ? "pointer"
//                           : "not-allowed",
//                     }}
//                   >
//                     {saving ? (
//                       <Loader2 size={16} />
//                     ) : (
//                       <Check size={16} />
//                     )}

//                     <span>
//                       {saving
//                         ? "Submitting..."
//                         : "Submit Verification"}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {currentStep === 7 && (
//               <div style={{ textAlign: "center", padding: "24px 0" }}>
//                 <div style={styles.successIconCircle}>
//                   <Check size={36} />
//                 </div>

//                 <span style={styles.stepBadge}>Step 7 of 7</span>

//                 <h2 style={styles.stepHeaderTitle}>
//                   Verification Submitted
//                 </h2>

//                 <p style={styles.subtitle}>
//                   Thank you. Your background verification information and
//                   documents have been submitted successfully.
//                 </p>

//                 <div
//                   style={{
//                     ...styles.sectionBoxGray,
//                     textAlign: "left",
//                     maxWidth: "560px",
//                     margin: "0 auto",
//                   }}
//                 >
//                   {renderReviewItem(
//                     "Candidate",
//                     personalDetails.fullName ||
//                       linkData?.candidateName,
//                   )}

//                   {renderReviewItem(
//                     "Case ID",
//                     personalDetails.candidateId ||
//                       linkData?.caseId,
//                   )}

//                   {renderReviewItem(
//                     "Status",
//                     "Submitted",
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @media (max-width: 900px) {
//             .candidate-responsive-helper {
//               display: block;
//             }
//           }

//           @media (max-width: 760px) {
//             input,
//             select,
//             textarea,
//             button {
//               font-size: 16px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Briefcase,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  GraduationCap,
  Loader2,
  Lock,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react";

const API_BASE = "/api";

// TEMP: the paid email API that sends OTPs isn't active yet, so skip OTP
// verification and treat the email as verified. Set to false to restore
// the normal Send OTP / Verify OTP flow.
const SKIP_EMAIL_OTP = true;

const emptyQualification = () => ({
  qualificationType: "",
  courseStream: "",
  specialization: "",
  institute: "",
  boardUniversity: "",
  nationalInternational: "National",
  verificationFeesBy: "Normal",
  fromYop: "",
  toYop: "",
  universityFees: "",
  commission: "",
  serviceCharge: "",
  modeOfStudy: "",
  documents: [null, null, null, null],
});

const emptyEmployer = () => ({
  companyName: "",
  designation: "",
  employeeId: "",
  hrEmail: "",
  hrPhoneCode: "+91",
  hrPhone: "",
  doj: "",
  doe: "",
  documents: [null, null, null, null],
});

const normalizeDocumentsArray = (documents, count = 4) => {
  const normalized = Array(count).fill(null);

  if (!documents) {
    return normalized;
  }

  if (Array.isArray(documents)) {
    documents.slice(0, count).forEach((item, index) => {
      normalized[index] = item;
    });
    return normalized;
  }

  return normalized;
};

const getStoredDocument = (documents, key) => {
  if (!documents || Array.isArray(documents)) {
    return null;
  }

  return documents[key] || null;
};

const isStoredDocument = (value) =>
  Boolean(value && typeof value === "object" && value.url && value.name);

export default function CandidateVerificationWizard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [linkData, setLinkData] = useState(null);
  const [availableChecks, setAvailableChecks] = useState([]);
  const [checkDetails, setCheckDetails] = useState({});
  const [identityDocuments, setIdentityDocuments] = useState({});

  const [dpdpAccepted, setDpdpAccepted] = useState(false);
  const [emailVerified, setEmailVerified] = useState(SKIP_EMAIL_OTP);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    profileImage: null,
    profileImagePreview: null,
    candidateId: "",
    clientName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    currentAddress: "",
    currentAddressDocType: "",
    currentAddressDocFile: null,
    isPermanentSame: false,
    permanentAddress: "",
    permanentAddressDocType: "",
    permanentAddressDocFile: null,
    aadhaarNumber: "",
    panNumber: "",
    candidateDate: "",
  });

  const [step4Tab, setStep4Tab] = useState("education");
  const [qualifications, setQualifications] = useState([emptyQualification()]);
  const [employers, setEmployers] = useState([emptyEmployer()]);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const hasEducation = availableChecks.includes("education");
  const hasEmployment = availableChecks.includes("employment");

  const requestedCandidateChecks = useMemo(
    () => availableChecks.filter((check) => ["education", "employment"].includes(check)),
    [availableChecks],
  );

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
    });

    let data = {};
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : {};
    }

    if (!response.ok) {
      const validationMessage = data?.errors
        ? Object.values(data.errors).flat().join(" ")
        : "";

      const error = new Error(
        validationMessage || data?.message || `Request failed with status ${response.status}`,
      );

      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  };

  const mapEducationFromBackend = (details) => {
    const fields = details?.fields || {};
    const savedQualifications = Array.isArray(fields.qualifications)
      ? fields.qualifications
      : [];

    if (savedQualifications.length === 0) {
      return [emptyQualification()];
    }

    return savedQualifications.map((item, qualificationIndex) => {
      const row = {
        ...emptyQualification(),
        ...item,
      };

      row.documents = Array(4)
        .fill(null)
        .map((_, docIndex) =>
          getStoredDocument(
            details?.documents,
            `qualification_${qualificationIndex + 1}_document_${docIndex + 1}`,
          ),
        );

      return row;
    });
  };

  const mapEmploymentFromBackend = (details) => {
    const fields = details?.fields || {};
    const savedEmployers = Array.isArray(fields.employers) ? fields.employers : [];

    if (savedEmployers.length === 0) {
      return [emptyEmployer()];
    }

    return savedEmployers.map((item, employerIndex) => {
      const row = {
        ...emptyEmployer(),
        ...item,
      };

      row.documents = Array(4)
        .fill(null)
        .map((_, docIndex) =>
          getStoredDocument(
            details?.documents,
            `employer_${employerIndex + 1}_document_${docIndex + 1}`,
          ),
        );

      return row;
    });
  };

  const loadCandidate = async () => {
    if (!token) {
      setPageError("Candidate verification token is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");

    try {
      const data = await apiRequest(`/candidate-link/${token}`);
      const link = data?.link || {};
      const identity = data?.identity || {};
      const details = data?.checkDetails || {};
      const checks = Array.isArray(link.checks)
        ? link.checks
        : link.checkType
          ? [link.checkType]
          : [];

      setLinkData(link);
      setAvailableChecks(checks);
      setCheckDetails(details);
      setEmailVerified(SKIP_EMAIL_OTP || Boolean(link.emailVerified));
      setIdentityDocuments(identity?.documents || {});

      setPersonalDetails((previous) => ({
        ...previous,
        fullName: link.candidateName || "",
        candidateId: link.caseId || "",
        dob: link.dob || "",
        mobile: link.mobile || "",
        email: link.email || "",
        gender: identity.gender || "",
        currentAddress: identity.current_address || "",
        currentAddressDocType: identity.current_address_doc_type || "",
        isPermanentSame: Boolean(identity.is_permanent_same),
        permanentAddress: identity.permanent_address || "",
        permanentAddressDocType: identity.permanent_address_doc_type || "",
        aadhaarNumber: identity.aadhaar_number || "",
        panNumber: identity.pan_number || "",
        profileImagePreview:
          identity?.documents?.profile_image?.url || previous.profileImagePreview,
      }));

      if (details.education) {
        const educationFields = details.education.fields || {};

        setPersonalDetails((previous) => ({
          ...previous,
          candidateId:
            educationFields.candidateId || previous.candidateId || link.caseId || "",
          clientName: educationFields.clientName || previous.clientName,
        }));

        setQualifications(mapEducationFromBackend(details.education));
      }

      if (details.employment) {
        const employmentFields = details.employment.fields || {};

        setPersonalDetails((previous) => ({
          ...previous,
          candidateDate:
            employmentFields.candidateDate || previous.candidateDate || "",
        }));

        setEmployers(mapEmploymentFromBackend(details.employment));
      }

      if (checks.includes("education")) {
        setStep4Tab("education");
      } else if (checks.includes("employment")) {
        setStep4Tab("employment");
      }

      setIsOpen(true);
    } catch (error) {
      if (error?.data?.submitted) {
        setCurrentStep(7);
        setIsOpen(true);
      } else if (error?.status === 410 || error?.data?.expired) {
        setPageError("This candidate verification link has expired.");
      } else {
        setPageError(error.message || "Unable to load candidate verification.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    return () => {
      if (
        personalDetails.profileImagePreview &&
        personalDetails.profileImagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(personalDetails.profileImagePreview);
      }
    };
  }, [personalDetails.profileImagePreview]);

  const nextStep = () => {
    setActionError("");
    setSuccessMessage("");
    setCurrentStep((previous) => Math.min(previous + 1, 7));
  };

  const prevStep = () => {
    setActionError("");
    setSuccessMessage("");
    setCurrentStep((previous) => Math.max(previous - 1, 1));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      personalDetails.profileImagePreview &&
      personalDetails.profileImagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(personalDetails.profileImagePreview);
    }

    setPersonalDetails((previous) => ({
      ...previous,
      profileImage: file,
      profileImagePreview: URL.createObjectURL(file),
    }));
  };

  const addQualification = () => {
    setQualifications((previous) => [...previous, emptyQualification()]);
  };

  const removeQualification = (index) => {
    setQualifications((previous) => {
      if (previous.length <= 1) {
        return previous;
      }

      return previous.filter((_, rowIndex) => rowIndex !== index);
    });
  };

  const handleQualificationChange = (index, field, value) => {
    setQualifications((previous) =>
      previous.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row,
      ),
    );
  };

  const handleQualDocumentUpload = (qualificationIndex, documentIndex, file) => {
    if (!file) {
      return;
    }

    setQualifications((previous) =>
      previous.map((row, rowIndex) => {
        if (rowIndex !== qualificationIndex) {
          return row;
        }

        const documents = normalizeDocumentsArray(row.documents);
        documents[documentIndex] = file;

        return {
          ...row,
          documents,
        };
      }),
    );
  };

  const addEmployer = () => {
    setEmployers((previous) => [...previous, emptyEmployer()]);
  };

  const removeEmployer = (index) => {
    setEmployers((previous) => {
      if (previous.length <= 1) {
        return previous;
      }

      return previous.filter((_, rowIndex) => rowIndex !== index);
    });
  };

  const handleEmployerChange = (index, field, value) => {
    setEmployers((previous) =>
      previous.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row,
      ),
    );
  };

  const handleFileUpload = (employerIndex, documentIndex, file) => {
    if (!file) {
      return;
    }

    setEmployers((previous) =>
      previous.map((row, rowIndex) => {
        if (rowIndex !== employerIndex) {
          return row;
        }

        const documents = normalizeDocumentsArray(row.documents);
        documents[documentIndex] = file;

        return {
          ...row,
          documents,
        };
      }),
    );
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);

    if (digit && index < otpDigits.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = async () => {
    if (!token || emailVerified) {
      return;
    }

    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    try {
      const data = await apiRequest(`/candidate-link/${token}/send-otp`, {
        method: "POST",
      });

      setOtpSent(true);
      setSuccessMessage(data?.message || "OTP sent successfully.");
      setTimeout(() => otpRefs.current[0]?.focus(), 0);
    } catch (error) {
      setActionError(error.message || "Unable to send OTP.");
    } finally {
      setSaving(false);
    }
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join("");

    if (otp.length !== 4) {
      setActionError("Enter the complete 4-digit OTP.");
      return;
    }

    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    try {
      const data = await apiRequest(`/candidate-link/${token}/verify-otp`, {
        method: "POST",
        body: JSON.stringify({ otp }),
      });

      setEmailVerified(true);
      setSuccessMessage(data?.message || "Email verified successfully.");
    } catch (error) {
      setActionError(error.message || "Unable to verify OTP.");
    } finally {
      setSaving(false);
    }
  };

  const uploadIdentityDocument = async (documentKey, file) => {
    if (!file || isStoredDocument(file)) {
      return;
    }

    const formData = new FormData();
    formData.append("document_key", documentKey);
    formData.append("file", file);

    const data = await apiRequest(
      `/candidate-link/${token}/identity-documents`,
      {
        method: "POST",
        body: formData,
      },
    );

    setIdentityDocuments((previous) => ({
      ...previous,
      [documentKey]: {
        name: file.name,
        url: data?.url || "",
      },
    }));
  };

  const saveIdentity = async () => {
    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    try {
      await apiRequest(`/candidate-link/${token}/identity`, {
        method: "PATCH",
        body: JSON.stringify({
          gender: personalDetails.gender || null,
          current_address: personalDetails.currentAddress || null,
          current_address_doc_type:
            personalDetails.currentAddressDocType || null,
          is_permanent_same: Boolean(personalDetails.isPermanentSame),
          permanent_address: personalDetails.isPermanentSame
            ? personalDetails.currentAddress || null
            : personalDetails.permanentAddress || null,
          permanent_address_doc_type: personalDetails.isPermanentSame
            ? personalDetails.currentAddressDocType || null
            : personalDetails.permanentAddressDocType || null,
          aadhaar_number: personalDetails.aadhaarNumber || null,
          pan_number: personalDetails.panNumber || null,
        }),
      });

      await uploadIdentityDocument(
        "profile_image",
        personalDetails.profileImage,
      );

      await uploadIdentityDocument(
        "current_address_proof",
        personalDetails.currentAddressDocFile,
      );

      if (
        !personalDetails.isPermanentSame &&
        personalDetails.permanentAddressDocFile
      ) {
        await uploadIdentityDocument(
          "permanent_address_proof",
          personalDetails.permanentAddressDocFile,
        );
      }

      setSuccessMessage("Identity details saved.");
      nextStep();
    } catch (error) {
      setActionError(error.message || "Unable to save identity details.");
    } finally {
      setSaving(false);
    }
  };

  const uploadCheckDocument = async (checkType, documentKey, file) => {
    if (!file || isStoredDocument(file)) {
      return;
    }

    const formData = new FormData();
    formData.append("check_type", checkType);
    formData.append("document_key", documentKey);
    formData.append("file", file);

    return apiRequest(`/candidate-link/${token}/documents`, {
      method: "POST",
      body: formData,
    });
  };

  const saveEducation = async () => {
    if (!hasEducation) {
      return;
    }

    await apiRequest(`/candidate-link/${token}/fields`, {
      method: "PATCH",
      body: JSON.stringify({
        check_type: "education",
        fields: {
          candidateName: personalDetails.fullName,
          candidateId: personalDetails.candidateId,
          clientName: personalDetails.clientName,
          mobile: personalDetails.mobile,
          email: personalDetails.email,
          qualifications: qualifications.map((qualification) => ({
            qualificationType: qualification.qualificationType,
            courseStream: qualification.courseStream,
            specialization: qualification.specialization,
            institute: qualification.institute,
            boardUniversity: qualification.boardUniversity,
            nationalInternational: qualification.nationalInternational,
            verificationFeesBy: qualification.verificationFeesBy,
            fromYop: qualification.fromYop,
            toYop: qualification.toYop,
            universityFees: qualification.universityFees,
            commission: qualification.commission,
            serviceCharge: qualification.serviceCharge,
            modeOfStudy: qualification.modeOfStudy,
          })),
        },
      }),
    });

    for (let qualificationIndex = 0; qualificationIndex < qualifications.length; qualificationIndex += 1) {
      const qualification = qualifications[qualificationIndex];

      for (let documentIndex = 0; documentIndex < qualification.documents.length; documentIndex += 1) {
        const file = qualification.documents[documentIndex];

        if (file && !isStoredDocument(file)) {
          await uploadCheckDocument(
            "education",
            `qualification_${qualificationIndex + 1}_document_${documentIndex + 1}`,
            file,
          );
        }
      }
    }
  };

  const saveEmployment = async () => {
    if (!hasEmployment) {
      return;
    }

    await apiRequest(`/candidate-link/${token}/fields`, {
      method: "PATCH",
      body: JSON.stringify({
        check_type: "employment",
        fields: {
          candidateName: personalDetails.fullName,
          candidateDate: personalDetails.candidateDate,
          employers: employers.map((employer) => ({
            companyName: employer.companyName,
            designation: employer.designation,
            employeeId: employer.employeeId,
            hrEmail: employer.hrEmail,
            hrPhoneCode: employer.hrPhoneCode,
            hrPhone: employer.hrPhone,
            doj: employer.doj,
            doe: employer.doe,
          })),
        },
      }),
    });

    for (let employerIndex = 0; employerIndex < employers.length; employerIndex += 1) {
      const employer = employers[employerIndex];

      for (let documentIndex = 0; documentIndex < employer.documents.length; documentIndex += 1) {
        const file = employer.documents[documentIndex];

        if (file && !isStoredDocument(file)) {
          await uploadCheckDocument(
            "employment",
            `employer_${employerIndex + 1}_document_${documentIndex + 1}`,
            file,
          );
        }
      }
    }
  };

  const saveEducationAndEmployment = async () => {
    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    try {
      await saveEducation();
      await saveEmployment();

      setSuccessMessage("Education and employment details saved.");
      nextStep();
    } catch (error) {
      setActionError(
        error.message || "Unable to save education and employment details.",
      );
    } finally {
      setSaving(false);
    }
  };

  const submitVerification = async () => {
    if (!declarationAccepted) {
      setActionError("Please accept the declaration before submitting.");
      return;
    }

    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    try {
      const data = await apiRequest(`/candidate-link/${token}/submit`, {
        method: "POST",
        body: JSON.stringify({}),
      });

      setSuccessMessage(data?.message || "Submitted successfully.");
      setCurrentStep(7);
    } catch (error) {
      setActionError(error.message || "Unable to submit verification.");
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#1e293b",
    },
    card: {
      width: "100%",
      maxWidth: "1000px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f1f5f9",
      overflow: "hidden",
    },
    initialCard: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      textAlign: "center",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f1f5f9",
    },
    iconHeaderCircle: {
      width: "64px",
      height: "64px",
      backgroundColor: "#eff6ff",
      color: "#2563eb",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto",
    },
    step1IconCircle: {
      width: "64px",
      height: "64px",
      backgroundColor: "#dbeafe",
      color: "#2563eb",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto",
    },
    successIconCircle: {
      width: "64px",
      height: "64px",
      backgroundColor: "#d1fae5",
      color: "#059669",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto",
    },
    badgeCheck: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "#d1fae5",
      color: "#059669",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      flexShrink: 0,
    },
    innerPadding: {
      padding: "32px",
    },
    stepperContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "16px 16px 0",
      marginBottom: "16px",
    },
    stepperLine: {
      width: "24px",
      height: "2px",
    },
    mainTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
    },
    stepHeaderTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
      margin: "4px 0",
    },
    subtitle: {
      color: "#64748b",
      fontSize: "14px",
      marginBottom: "24px",
    },
    stepBadge: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#2563eb",
      textTransform: "uppercase",
    },
    sectionBox: {
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
    },
    sectionBoxGray: {
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      backgroundColor: "#f8fafc",
    },
    sectionBoxAmber: {
      border: "1px solid #fde68a",
      backgroundColor: "#fffbeb",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "16px",
    },
    sectionTitle: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#1e293b",
      letterSpacing: "0.02em",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    sectionTitleCentered: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#2563eb",
      textAlign: "center",
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "11px",
      fontWeight: "700",
      color: "#334155",
      textTransform: "uppercase",
      marginBottom: "6px",
      letterSpacing: "0.02em",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "13px",
      outline: "none",
      boxSizing: "border-box",
      color: "#1e293b",
      backgroundColor: "#ffffff",
    },
    inputReadOnly: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "13px",
      outline: "none",
      boxSizing: "border-box",
      color: "#1e293b",
      backgroundColor: "#f8fafc",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "13px",
      outline: "none",
      boxSizing: "border-box",
      color: "#1e293b",
      height: "60px",
      resize: "none",
    },
    otpInput: {
      width: "40px",
      height: "40px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "700",
      backgroundColor: "#f8fafc",
      outline: "none",
    },
    grid5: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
      gap: "12px",
      marginBottom: "16px",
    },
    grid4: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "12px",
      marginBottom: "16px",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "16px",
      marginBottom: "16px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "16px",
      marginBottom: "16px",
    },
    avatarUploadContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "12px",
      border: "1px dashed #cbd5e1",
      borderRadius: "10px",
      backgroundColor: "#f8fafc",
    },
    avatarCircle: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      border: "2px solid #cbd5e1",
      flexShrink: 0,
    },
    docGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "12px",
      marginTop: "12px",
    },
    docBox: {
      border: "1px dashed #cbd5e1",
      borderRadius: "8px",
      padding: "16px 8px",
      textAlign: "center",
      backgroundColor: "#ffffff",
      minWidth: 0,
    },
    uploadBtnLabel: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      backgroundColor: "#eff6ff",
      color: "#2563eb",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    btnPrimary: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "14px",
      padding: "10px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    btnPrimaryFull: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "14px",
      padding: "10px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      justifyContent: "center",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      color: "#64748b",
      fontWeight: "600",
      fontSize: "14px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    btnRemove: {
      backgroundColor: "transparent",
      color: "#ef4444",
      border: "1px solid #fca5a5",
      borderRadius: "6px",
      padding: "4px 12px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
    },
    btnOutlineFull: {
      backgroundColor: "transparent",
      color: "#64748b",
      fontWeight: "600",
      fontSize: "14px",
      border: "1px solid #cbd5e1",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "16px",
    },
    btnDashedAdd: {
      width: "100%",
      border: "2px dashed #cbd5e1",
      backgroundColor: "transparent",
      color: "#2563eb",
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "8px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "16px",
      borderTop: "1px solid #f1f5f9",
      marginTop: "24px",
      gap: "12px",
    },
    tabContainer: {
      display: "flex",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "4px",
      backgroundColor: "#f8fafc",
      marginBottom: "20px",
    },
    tabBtnActive: {
      flex: 1,
      padding: "8px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      backgroundColor: "#0f172a",
      color: "#ffffff",
    },
    tabBtnInactive: {
      flex: 1,
      padding: "8px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      backgroundColor: "transparent",
      color: "#475569",
    },
    termsBox: {
      height: "120px",
      overflowY: "auto",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "12px",
      backgroundColor: "#ffffff",
      fontSize: "12px",
      color: "#475569",
      lineHeight: "1.5",
    },
    digilockerBox: {
      marginTop: "16px",
      border: "1px solid #fde68a",
      backgroundColor: "#fffbeb",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    },
    digilockerBtn: {
      backgroundColor: "#ea580c",
      color: "#ffffff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "12px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    badgeGreen: {
      fontSize: "12px",
      color: "#059669",
      backgroundColor: "#ecfdf5",
      padding: "2px 8px",
      borderRadius: "4px",
      fontWeight: "600",
    },
    flexRowBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
    },
    flexColumnGap: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    flexAlignGap: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      marginTop: "12px",
      cursor: "pointer",
    },
    alertError: {
      border: "1px solid #fecaca",
      backgroundColor: "#fef2f2",
      color: "#b91c1c",
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "12px",
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      marginBottom: "16px",
    },
    alertSuccess: {
      border: "1px solid #a7f3d0",
      backgroundColor: "#ecfdf5",
      color: "#047857",
      borderRadius: "8px",
      padding: "10px 12px",
      fontSize: "12px",
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      marginBottom: "16px",
    },
  };

  const getStepCircleStyle = (step) => {
    const isCompleted = step < currentStep;
    const isCurrent = step === currentStep;

    return {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "600",
      transition: "all 0.2s",
      backgroundColor: isCompleted
        ? "#059669"
        : isCurrent
          ? "#2563eb"
          : "#f1f5f9",
      color: isCompleted || isCurrent ? "#ffffff" : "#94a3b8",
      boxShadow: isCurrent ? "0 0 0 4px #dbeafe" : "none",
      flexShrink: 0,
    };
  };

  const renderStepper = () => (
    <div style={styles.stepperContainer}>
      {[1, 2, 3, 4, 5, 6, 7].map((step) => {
        const isCompleted = step < currentStep;

        return (
          <React.Fragment key={step}>
            <div style={getStepCircleStyle(step)}>
              {isCompleted ? <Check size={16} /> : step}
            </div>

            {step < 7 && (
              <div
                style={{
                  ...styles.stepperLine,
                  backgroundColor:
                    step < currentStep ? "#059669" : "#e2e8f0",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderMessage = () => (
    <>
      {actionError && (
        <div style={styles.alertError}>
          <AlertCircle size={16} />
          <span>{actionError}</span>
        </div>
      )}

      {successMessage && (
        <div style={styles.alertSuccess}>
          <Check size={16} />
          <span>{successMessage}</span>
        </div>
      )}
    </>
  );

  const renderDocumentName = (document) => {
    if (!document) {
      return null;
    }

    if (document instanceof File) {
      return document.name;
    }

    return document.name || "Uploaded document";
  };

  const renderEducationForm = () => (
    <div>
      <div style={styles.sectionBox}>
        <h3 style={styles.sectionTitle}>
          <User size={16} color="#4f46e5" /> Candidate Information
        </h3>

        <div style={styles.grid5}>
          <div>
            <label style={styles.label}>Candidate Name *</label>
            <input
              type="text"
              placeholder="Enter Candidate Name"
              style={styles.input}
              value={personalDetails.fullName}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  fullName: event.target.value,
                }))
              }
            />
          </div>

          <div>
            <label style={styles.label}>Candidate ID *</label>
            <input
              type="text"
              placeholder="Enter Candidate ID"
              style={styles.input}
              value={personalDetails.candidateId}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  candidateId: event.target.value,
                }))
              }
            />
          </div>

          <div>
            <label style={styles.label}>Client Name *</label>
            <input
              type="text"
              placeholder="Enter Client Name"
              style={styles.input}
              value={personalDetails.clientName}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  clientName: event.target.value,
                }))
              }
            />
          </div>

          <div>
            <label style={styles.label}>Mobile Number *</label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              style={styles.input}
              value={personalDetails.mobile}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  mobile: event.target.value,
                }))
              }
            />
          </div>

          <div>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              style={styles.input}
              value={personalDetails.email}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {qualifications.map((qualification, index) => (
        <div key={index} style={styles.sectionBox}>
          <div style={{ ...styles.flexRowBetween, marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Qualification {index + 1}</h3>

            {qualifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeQualification(index)}
                style={styles.btnRemove}
              >
                Remove
              </button>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                ...styles.label,
                marginBottom: "8px",
                display: "block",
                color: "#1e293b",
              }}
            >
              QUALIFICATION SCOPE *
            </label>

            <div
              style={{
                display: "flex",
                background: "rgb(226, 232, 240)",
                borderRadius: "8px",
                padding: "3px",
                width: "320px",
                maxWidth: "100%",
              }}
            >
              <label
                style={{
                  flex: "1 1 0%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.2s",
                  background:
                    qualification.nationalInternational === "National"
                      ? "rgb(0, 56, 131)"
                      : "transparent",
                  color:
                    qualification.nationalInternational === "National"
                      ? "rgb(255, 255, 255)"
                      : "rgb(71, 85, 105)",
                }}
              >
                <input
                  type="radio"
                  name={`nat-int-${index}`}
                  value="National"
                  checked={
                    qualification.nationalInternational === "National"
                  }
                  onChange={(event) =>
                    handleQualificationChange(
                      index,
                      "nationalInternational",
                      event.target.value,
                    )
                  }
                  style={{ display: "none" }}
                />
                National
              </label>

              <label
                style={{
                  flex: "1 1 0%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.2s",
                  background:
                    qualification.nationalInternational === "International"
                      ? "rgb(0, 56, 131)"
                      : "transparent",
                  color:
                    qualification.nationalInternational === "International"
                      ? "rgb(255, 255, 255)"
                      : "rgb(71, 85, 105)",
                }}
              >
                <input
                  type="radio"
                  name={`nat-int-${index}`}
                  value="International"
                  checked={
                    qualification.nationalInternational === "International"
                  }
                  onChange={(event) =>
                    handleQualificationChange(
                      index,
                      "nationalInternational",
                      event.target.value,
                    )
                  }
                  style={{ display: "none" }}
                />
                International
              </label>
            </div>
          </div>

          <div style={{ ...styles.grid5, marginBottom: "16px" }}>
            <div>
              <label style={styles.label}>Qualification Type *</label>
              <select
                style={styles.input}
                value={qualification.qualificationType}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "qualificationType",
                    event.target.value,
                  )
                }
              >
                <option value="">Select Qualification Type</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Diploma">Diploma</option>
                <option value="12th">12th Standard</option>
                <option value="10th">10th Standard</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Course / Stream *</label>
              <select
                style={styles.input}
                value={qualification.courseStream}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "courseStream",
                    event.target.value,
                  )
                }
              >
                <option value="">Select Course / Stream</option>
                <option value="B.Tech">B.Tech / B.E.</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Com">B.Com</option>
                <option value="B.A">B.A</option>
                <option value="MCA">MCA</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>
                Specialization (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter Specialization"
                style={styles.input}
                value={qualification.specialization}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "specialization",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>Institute / University *</label>
              <select
                style={styles.input}
                value={qualification.institute}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "institute",
                    event.target.value,
                  )
                }
              >
                <option value="">Enter Institute / School / Univer</option>
                <option value="University of Mumbai">
                  University of Mumbai
                </option>
                <option value="Delhi University">Delhi University</option>
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Board / University *</label>
              <select
                style={styles.input}
                value={qualification.boardUniversity}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "boardUniversity",
                    event.target.value,
                  )
                }
              >
                <option value="">Select Board / University</option>
                <option value="State Board">State Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="Deemed University">
                  Deemed University
                </option>
              </select>
            </div>
          </div>

          {qualification.nationalInternational === "National" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={styles.label}>Verification Fees By *</label>
                <select
                  style={styles.input}
                  value={qualification.verificationFeesBy}
                  onChange={(event) =>
                    handleQualificationChange(
                      index,
                      "verificationFeesBy",
                      event.target.value,
                    )
                  }
                >
                  <option value="">Select Verification Type</option>
                  <option value="Normal">Normal</option>
                  <option value="Year of Passing">Year of Passing</option>
                  <option value="UG/PG">UG/PG</option>
                </select>
              </div>

              {qualification.verificationFeesBy === "Year of Passing" && (
                <>
                  <div>
                    <label style={styles.label}>From YOP *</label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      style={styles.input}
                      value={qualification.fromYop}
                      onChange={(event) =>
                        handleQualificationChange(
                          index,
                          "fromYop",
                          event.target.value,
                        )
                      }
                    />
                  </div>

                  <div>
                    <label style={styles.label}>To YOP *</label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      style={styles.input}
                      value={qualification.toYop}
                      onChange={(event) =>
                        handleQualificationChange(
                          index,
                          "toYop",
                          event.target.value,
                        )
                      }
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div style={styles.grid4}>
            <div>
              <label style={styles.label}>Verification Fees (₹)</label>
              <input
                type="text"
                placeholder="Enter Verification Fees"
                style={styles.input}
                value={qualification.universityFees}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "universityFees",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>GST (₹)</label>
              <input
                type="text"
                placeholder="Enter GST"
                style={styles.input}
                value={qualification.commission}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "commission",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>Total Amount (₹)</label>
              <input
                type="text"
                placeholder="Enter Total Amount"
                style={styles.input}
                value={qualification.serviceCharge}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "serviceCharge",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>Mode of Study</label>
              <select
                style={styles.input}
                value={qualification.modeOfStudy}
                onChange={(event) =>
                  handleQualificationChange(
                    index,
                    "modeOfStudy",
                    event.target.value,
                  )
                }
              >
                <option value="">Select Mode</option>
                <option value="Regular">Regular</option>
                <option value="Distance">Distance</option>
                <option value="Online">Online</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>

          <div>
            <label style={styles.label}>
              DOCUMENTS * (Upload up to 4 documents)
            </label>

            <div style={styles.docGrid}>
              {[1, 2, 3, 4].map((documentNumber, documentIndex) => {
                const document = qualification.documents?.[documentIndex];

                return (
                  <div key={documentIndex} style={styles.docBox}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#1e293b",
                        marginBottom: "4px",
                      }}
                    >
                      Document {documentNumber}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      PDF, JPG, PNG (Max 10MB)
                    </div>

                    <label style={styles.uploadBtnLabel}>
                      <Upload size={12} /> Choose File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) =>
                          handleQualDocumentUpload(
                            index,
                            documentIndex,
                            event.target.files?.[0],
                          )
                        }
                      />
                    </label>

                    {document && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#059669",
                          marginTop: "6px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                        title={renderDocumentName(document)}
                      >
                        ✓ {renderDocumentName(document)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        style={styles.btnDashedAdd}
      >
        + Add Qualification
      </button>
    </div>
  );

  const renderEmploymentForm = () => (
    <div>
      <div style={styles.sectionBox}>
        <h3 style={styles.sectionTitleCentered}>Candidate Details</h3>

        <div style={styles.grid2}>
          <div>
            <label style={styles.label}>CANDIDATE NAME *</label>
            <input
              type="text"
              placeholder="Enter candidate name"
              style={styles.input}
              value={personalDetails.fullName}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  fullName: event.target.value,
                }))
              }
            />
          </div>

          <div>
            <label style={styles.label}>DATE *</label>
            <input
              type="date"
              style={styles.input}
              value={personalDetails.candidateDate}
              onChange={(event) =>
                setPersonalDetails((previous) => ({
                  ...previous,
                  candidateDate: event.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {employers.map((employer, index) => (
        <div key={index} style={styles.sectionBox}>
          <div style={{ ...styles.flexRowBetween, marginBottom: "16px" }}>
            <h3 style={styles.sectionTitle}>Employer {index + 1}</h3>

            {employers.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmployer(index)}
                style={styles.btnRemove}
              >
                Remove
              </button>
            )}
          </div>

          <div style={styles.grid3}>
            <div>
              <label style={styles.label}>Company Name *</label>
              <input
                type="text"
                placeholder="Enter company name"
                style={styles.input}
                value={employer.companyName}
                onChange={(event) =>
                  handleEmployerChange(
                    index,
                    "companyName",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>Designation *</label>
              <input
                type="text"
                placeholder="Enter designation"
                style={styles.input}
                value={employer.designation}
                onChange={(event) =>
                  handleEmployerChange(
                    index,
                    "designation",
                    event.target.value,
                  )
                }
              />
            </div>

            <div>
              <label style={styles.label}>Employee ID</label>
              <input
                type="text"
                placeholder="Enter employee ID"
                style={styles.input}
                value={employer.employeeId}
                onChange={(event) =>
                  handleEmployerChange(
                    index,
                    "employeeId",
                    event.target.value,
                  )
                }
              />
            </div>
          </div>

          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>HR Email ID *</label>
              <input
                type="email"
                placeholder="Enter HR email ID"
                style={styles.input}
                value={employer.hrEmail}
                onChange={(event) =>
                  handleEmployerChange(index, "hrEmail", event.target.value)
                }
              />
            </div>

            <div>
              <label style={styles.label}>HR Phone Number *</label>

              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  style={{ ...styles.input, width: "90px" }}
                  value={employer.hrPhoneCode}
                  onChange={(event) =>
                    handleEmployerChange(
                      index,
                      "hrPhoneCode",
                      event.target.value,
                    )
                  }
                >
                  <option value="+91">+91</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  style={styles.input}
                  value={employer.hrPhone}
                  onChange={(event) =>
                    handleEmployerChange(
                      index,
                      "hrPhone",
                      event.target.value,
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>Date of Joining *</label>
              <input
                type="date"
                style={styles.input}
                value={employer.doj}
                onChange={(event) =>
                  handleEmployerChange(index, "doj", event.target.value)
                }
              />
            </div>

            <div>
              <label style={styles.label}>Date of Exit *</label>
              <input
                type="date"
                style={styles.input}
                value={employer.doe}
                onChange={(event) =>
                  handleEmployerChange(index, "doe", event.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label style={styles.label}>
              DOCUMENTS * (Upload up to 4 documents)
            </label>

            <div style={styles.docGrid}>
              {[1, 2, 3, 4].map((documentNumber, documentIndex) => {
                const document = employer.documents?.[documentIndex];

                return (
                  <div key={documentIndex} style={styles.docBox}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#1e293b",
                        marginBottom: "4px",
                      }}
                    >
                      Document {documentNumber}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      PDF, JPG, PNG (Max 10MB)
                    </div>

                    <label style={styles.uploadBtnLabel}>
                      <Upload size={12} /> Choose File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) =>
                          handleFileUpload(
                            index,
                            documentIndex,
                            event.target.files?.[0],
                          )
                        }
                      />
                    </label>

                    {document && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#059669",
                          marginTop: "6px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                        title={renderDocumentName(document)}
                      >
                        ✓ {renderDocumentName(document)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEmployer}
        style={styles.btnDashedAdd}
      >
        + Add Employer
      </button>
    </div>
  );

  const renderReviewItem = (label, value) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "10px 0",
        borderBottom: "1px solid #f1f5f9",
        fontSize: "13px",
      }}
    >
      <span style={{ color: "#64748b", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "#0f172a", textAlign: "right" }}>
        {value || "—"}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.initialCard}>
          <div style={styles.iconHeaderCircle}>
            <Loader2 size={32} />
          </div>
          <h1 style={styles.mainTitle}>Loading Verification</h1>
          <p style={styles.subtitle}>
            Please wait while your candidate verification link is loaded.
          </p>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div style={styles.container}>
        <div style={styles.initialCard}>
          <div
            style={{
              ...styles.iconHeaderCircle,
              backgroundColor: "#fef2f2",
              color: "#dc2626",
            }}
          >
            <AlertCircle size={32} />
          </div>
          <h1 style={styles.mainTitle}>Verification Link Error</h1>
          <p style={styles.subtitle}>{pageError}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {!isOpen ? (
        <div style={styles.initialCard}>
          <div style={styles.iconHeaderCircle}>
            <ShieldCheck size={32} />
          </div>

          <h1 style={styles.mainTitle}>Candidate Verification Portal</h1>

          <p style={styles.subtitle}>
            Start the 7-step identity, education, document, and background
            verification process.
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={styles.btnPrimaryFull}
          >
            <span>Start Verification Flow</span>
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          {currentStep > 1 && currentStep < 7 && renderStepper()}

          <div style={styles.innerPadding}>
            {renderMessage()}

            {currentStep === 1 && (
              <div style={{ textAlign: "center" }}>
                <div style={styles.step1IconCircle}>
                  <ShieldCheck size={36} />
                </div>

                <span style={styles.stepBadge}>Step 1 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Background Verification
                </h2>

                <p style={styles.subtitle}>
                  Welcome! Please complete your background verification to
                  proceed with your onboarding process.
                </p>

                <div
                  style={{
                    ...styles.sectionBoxGray,
                    textAlign: "left",
                  }}
                >
                  <h3 style={styles.sectionTitle}>
                    Before you begin, ensure you have:
                  </h3>

                  <div style={styles.flexColumnGap}>
                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#475569",
                          fontWeight: "500",
                        }}
                      >
                        Government ID (Aadhaar / PAN card)
                      </span>
                    </div>

                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#475569",
                          fontWeight: "500",
                        }}
                      >
                        Educational Certificates (Degree / Marksheets)
                      </span>
                    </div>

                    <div style={styles.flexAlignGap}>
                      <div style={styles.badgeCheck}>✓</div>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#475569",
                          fontWeight: "500",
                        }}
                      >
                        Employment details & HR contact information
                      </span>
                    </div>
                  </div>
                </div>

                <div style={styles.footer}>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                    }}
                  >
                    Case ID: {linkData?.caseId || "—"}
                  </span>

                  <button
                    type="button"
                    onClick={nextStep}
                    style={styles.btnPrimary}
                  >
                    <span>Begin Verification</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <span style={styles.stepBadge}>Step 2 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Consent & Verification
                </h2>

                <p style={styles.subtitle}>
                  Verify your email address and provide consent under DPDP Act.
                </p>

                <div style={styles.sectionBox}>
                  <div
                    style={{
                      ...styles.flexRowBetween,
                      marginBottom: "12px",
                    }}
                  >
                    <label style={styles.label}>E-mail Verification</label>

                    {emailVerified && !SKIP_EMAIL_OTP && (
                      <span style={styles.badgeGreen}>
                        ✓ E-mail Verified
                      </span>
                    )}
                  </div>

                  {emailVerified ? (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#475569",
                      }}
                    >
                      {SKIP_EMAIL_OTP ? (
                        <>
                          Email OTP verification is temporarily skipped for{" "}
                          <strong>
                            {personalDetails.email || "your email"}
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          Verified email:{" "}
                          <strong>{personalDetails.email}</strong>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            ref={(element) => {
                              otpRefs.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(event) =>
                              handleOtpChange(index, event.target.value)
                            }
                            onKeyDown={(event) =>
                              handleOtpKeyDown(index, event)
                            }
                            style={styles.otpInput}
                          />
                        ))}

                        <button
                          type="button"
                          onClick={verifyOtp}
                          disabled={saving || otpDigits.join("").length !== 4}
                          style={{
                            ...styles.btnPrimary,
                            opacity:
                              saving || otpDigits.join("").length !== 4
                                ? 0.5
                                : 1,
                          }}
                        >
                          Verify OTP
                        </button>
                      </div>

                      <div
                        style={{
                          ...styles.flexRowBetween,
                          fontSize: "12px",
                          color: "#94a3b8",
                          marginTop: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span>
                          Enter 4-digit OTP sent to{" "}
                          {personalDetails.email || "your email"}
                        </span>

                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={saving}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#2563eb",
                            cursor: saving ? "not-allowed" : "pointer",
                            padding: 0,
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {otpSent ? "Resend OTP" : "Send OTP"}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div style={styles.sectionBoxGray}>
                  <label style={styles.label}>
                    Data Protection Consent (DPDP Act 2023)
                  </label>

                  <div style={styles.termsBox}>
                    In accordance with the Digital Personal Data Protection Act,
                    2023, by checking the box below, you explicitly consent to
                    the collection, processing, and sharing of your personal,
                    educational, and professional data for background
                    verification.
                  </div>

                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={dpdpAccepted}
                      onChange={(event) =>
                        setDpdpAccepted(event.target.checked)
                      }
                      style={{ marginTop: "3px" }}
                    />

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      I have read and agree to the data protection consent
                      terms and authorize background checks.
                    </span>
                  </label>
                </div>

                <div style={styles.footer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.btnSecondary}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!dpdpAccepted || !emailVerified}
                    style={{
                      ...styles.btnPrimary,
                      opacity:
                        dpdpAccepted && emailVerified ? 1 : 0.5,
                      cursor:
                        dpdpAccepted && emailVerified
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    <span>Give Consent & Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <span style={styles.stepBadge}>Step 3 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Personal & Identity
                </h2>

                <p style={styles.subtitle}>
                  Provide your personal details and government identity
                  documents.
                </p>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Personal Details</h3>

                  <div
                    style={{
                      ...styles.grid2,
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <label style={styles.label}>Full Name *</label>

                      <input
                        type="text"
                        value={personalDetails.fullName}
                        onChange={(event) =>
                          setPersonalDetails((previous) => ({
                            ...previous,
                            fullName: event.target.value,
                          }))
                        }
                        style={styles.input}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Candidate Photo *</label>

                      <div style={styles.avatarUploadContainer}>
                        <div style={styles.avatarCircle}>
                          {personalDetails.profileImagePreview ? (
                            <img
                              src={personalDetails.profileImagePreview}
                              alt="Candidate Profile"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <User size={36} color="#94a3b8" />
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          <label
                            style={{
                              ...styles.uploadBtnLabel,
                              width: "fit-content",
                            }}
                          >
                            <Camera size={14} /> Upload Image

                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleProfileImageChange}
                            />
                          </label>

                          <span
                            style={{
                              fontSize: "10px",
                              color: "#94a3b8",
                            }}
                          >
                            JPG, PNG (Max 10MB)
                          </span>

                          {identityDocuments?.profile_image?.name && (
                            <span
                              style={{
                                fontSize: "10px",
                                color: "#059669",
                              }}
                            >
                              ✓ {identityDocuments.profile_image.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Date of Birth</label>

                      <input
                        type="date"
                        value={personalDetails.dob || ""}
                        readOnly
                        style={styles.inputReadOnly}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Gender</label>

                      <select
                        style={styles.input}
                        value={personalDetails.gender}
                        onChange={(event) =>
                          setPersonalDetails((previous) => ({
                            ...previous,
                            gender: event.target.value,
                          }))
                        }
                      >
                        <option value="">Select</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Mobile</label>

                      <input
                        type="text"
                        value={personalDetails.mobile}
                        readOnly
                        style={styles.inputReadOnly}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Email</label>

                      <input
                        type="email"
                        value={personalDetails.email}
                        readOnly
                        style={styles.inputReadOnly}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>Address Details</h3>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={styles.label}>Current Address *</label>

                    <textarea
                      placeholder="Flat/House No., Street, Area, City, State — PIN"
                      style={styles.textarea}
                      value={personalDetails.currentAddress}
                      onChange={(event) =>
                        setPersonalDetails((previous) => ({
                          ...previous,
                          currentAddress: event.target.value,
                        }))
                      }
                    />

                    <div
                      style={{
                        ...styles.grid2,
                        marginTop: "12px",
                      }}
                    >
                      <div>
                        <label style={styles.label}>
                          Current Address Proof Type *
                        </label>

                        <select
                          style={styles.input}
                          value={personalDetails.currentAddressDocType}
                          onChange={(event) =>
                            setPersonalDetails((previous) => ({
                              ...previous,
                              currentAddressDocType: event.target.value,
                            }))
                          }
                        >
                          <option value="">
                            Select Document Type
                          </option>
                          <option value="Aadhaar Card">
                            Aadhaar Card
                          </option>
                          <option value="Driving License">
                            Driving License (DL)
                          </option>
                          <option value="Electricity Bill">
                            Electricity Bill
                          </option>
                          <option value="Passport">Passport</option>
                          <option value="Rent Agreement">
                            Rent Agreement
                          </option>
                          <option value="Voter ID">Voter ID</option>
                        </select>
                      </div>

                      <div>
                        <label style={styles.label}>
                          Upload Address Proof Document *
                        </label>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <label
                            style={{
                              ...styles.uploadBtnLabel,
                              padding: "10px 14px",
                              width: "100%",
                            }}
                          >
                            <Upload size={14} /> Choose File

                            <input
                              type="file"
                              style={{ display: "none" }}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(event) =>
                                setPersonalDetails((previous) => ({
                                  ...previous,
                                  currentAddressDocFile:
                                    event.target.files?.[0] || null,
                                }))
                              }
                            />
                          </label>
                        </div>

                        {personalDetails.currentAddressDocFile && (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#059669",
                              marginTop: "4px",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            ✓ {personalDetails.currentAddressDocFile.name}
                          </div>
                        )}

                        {!personalDetails.currentAddressDocFile &&
                          identityDocuments?.current_address_proof?.name && (
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#059669",
                                marginTop: "4px",
                              }}
                            >
                              ✓{" "}
                              {
                                identityDocuments.current_address_proof
                                  .name
                              }
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e2e8f0",
                      margin: "16px 0",
                    }}
                  />

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "12px 0",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={personalDetails.isPermanentSame}
                      onChange={(event) => {
                        const checked = event.target.checked;

                        setPersonalDetails((previous) => ({
                          ...previous,
                          isPermanentSame: checked,
                          permanentAddress: checked
                            ? previous.currentAddress
                            : "",
                          permanentAddressDocType: checked
                            ? previous.currentAddressDocType
                            : "",
                          permanentAddressDocFile: checked
                            ? previous.currentAddressDocFile
                            : null,
                        }));
                      }}
                    />

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#475569",
                        fontWeight: "600",
                      }}
                    >
                      Permanent address same as current
                    </span>
                  </label>

                  {!personalDetails.isPermanentSame && (
                    <div style={{ marginTop: "12px" }}>
                      <label style={styles.label}>
                        Permanent Address *
                      </label>

                      <textarea
                        placeholder="Flat/House No., Street, Area, City, State — PIN"
                        style={styles.textarea}
                        value={personalDetails.permanentAddress}
                        onChange={(event) =>
                          setPersonalDetails((previous) => ({
                            ...previous,
                            permanentAddress: event.target.value,
                          }))
                        }
                      />

                      <div
                        style={{
                          ...styles.grid2,
                          marginTop: "12px",
                        }}
                      >
                        <div>
                          <label style={styles.label}>
                            Permanent Address Proof Type *
                          </label>

                          <select
                            style={styles.input}
                            value={
                              personalDetails.permanentAddressDocType
                            }
                            onChange={(event) =>
                              setPersonalDetails((previous) => ({
                                ...previous,
                                permanentAddressDocType:
                                  event.target.value,
                              }))
                            }
                          >
                            <option value="">
                              Select Document Type
                            </option>
                            <option value="Aadhaar Card">
                              Aadhaar Card
                            </option>
                            <option value="Driving License">
                              Driving License (DL)
                            </option>
                            <option value="Electricity Bill">
                              Electricity Bill
                            </option>
                            <option value="Passport">Passport</option>
                            <option value="Rent Agreement">
                              Rent Agreement
                            </option>
                            <option value="Voter ID">Voter ID</option>
                          </select>
                        </div>

                        <div>
                          <label style={styles.label}>
                            Upload Address Proof Document *
                          </label>

                          <label
                            style={{
                              ...styles.uploadBtnLabel,
                              padding: "10px 14px",
                              width: "100%",
                            }}
                          >
                            <Upload size={14} /> Choose File

                            <input
                              type="file"
                              style={{ display: "none" }}
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(event) =>
                                setPersonalDetails((previous) => ({
                                  ...previous,
                                  permanentAddressDocFile:
                                    event.target.files?.[0] || null,
                                }))
                              }
                            />
                          </label>

                          {personalDetails.permanentAddressDocFile && (
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#059669",
                                marginTop: "4px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              ✓{" "}
                              {
                                personalDetails.permanentAddressDocFile
                                  .name
                              }
                            </div>
                          )}

                          {!personalDetails.permanentAddressDocFile &&
                            identityDocuments
                              ?.permanent_address_proof?.name && (
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#059669",
                                  marginTop: "4px",
                                }}
                              >
                                ✓{" "}
                                {
                                  identityDocuments
                                    .permanent_address_proof.name
                                }
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>
                    <CreditCard size={16} color="#2563eb" /> Identity
                    Documents
                  </h3>

                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>
                        Aadhaar Number *
                      </label>

                      <input
                        type="text"
                        placeholder="Enter 12-digit Aadhaar Number"
                        style={styles.input}
                        maxLength={12}
                        value={personalDetails.aadhaarNumber}
                        onChange={(event) =>
                          setPersonalDetails((previous) => ({
                            ...previous,
                            aadhaarNumber: event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 12),
                          }))
                        }
                      />
                    </div>

                    <div>
                      <label style={styles.label}>PAN Number *</label>

                      <input
                        type="text"
                        placeholder="ABCDE1234F"
                        style={{
                          ...styles.input,
                          textTransform: "uppercase",
                        }}
                        maxLength={10}
                        value={personalDetails.panNumber}
                        onChange={(event) =>
                          setPersonalDetails((previous) => ({
                            ...previous,
                            panNumber: event.target.value
                              .toUpperCase()
                              .slice(0, 10),
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div style={styles.digilockerBox}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Lock size={20} color="#ea580c" />

                      <div>
                        <h4
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            margin: 0,
                            color: "#9a3412",
                          }}
                        >
                          Fast-track with DigiLocker
                        </h4>

                        <p
                          style={{
                            fontSize: "11px",
                            color: "#c2410c",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Fetch verified Aadhaar & PAN instantly via
                          DigiLocker.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      style={styles.digilockerBtn}
                      onClick={async () => {
                        setActionError("");
                        setSuccessMessage("");

                        try {
                          const data = await apiRequest(
                            `/candidate-link/${token}/digilocker/connect`,
                            { method: "POST" },
                          );

                          setSuccessMessage(
                            data?.message || "DigiLocker connected.",
                          );
                        } catch (error) {
                          setActionError(
                            error.message ||
                              "DigiLocker is not configured yet.",
                          );
                        }
                      }}
                    >
                      Connect DigiLocker
                    </button>
                  </div>
                </div>

                <div style={styles.footer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.btnSecondary}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={saveIdentity}
                    disabled={saving}
                    style={{
                      ...styles.btnPrimary,
                      opacity: saving ? 0.6 : 1,
                    }}
                  >
                    {saving ? (
                      <Loader2 size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}

                    <span>
                      {saving ? "Saving..." : "Verify Identity"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <span style={styles.stepBadge}>Step 4 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Education & Employment
                </h2>

                <p style={styles.subtitle}>
                  Add your qualifications and professional history.
                </p>

                {requestedCandidateChecks.length > 0 ? (
                  <>
                    {hasEducation && hasEmployment && (
                      <div style={styles.tabContainer}>
                        <button
                          type="button"
                          onClick={() => setStep4Tab("education")}
                          style={
                            step4Tab === "education"
                              ? styles.tabBtnActive
                              : styles.tabBtnInactive
                          }
                        >
                          <GraduationCap size={16} /> Education
                        </button>

                        <button
                          type="button"
                          onClick={() => setStep4Tab("employment")}
                          style={
                            step4Tab === "employment"
                              ? styles.tabBtnActive
                              : styles.tabBtnInactive
                          }
                        >
                          <Briefcase size={16} /> Employment
                        </button>
                      </div>
                    )}

                    {hasEducation &&
                      (!hasEmployment || step4Tab === "education") &&
                      renderEducationForm()}

                    {hasEmployment &&
                      (!hasEducation || step4Tab === "employment") &&
                      renderEmploymentForm()}
                  </>
                ) : (
                  <div style={styles.sectionBoxGray}>
                    <h3 style={styles.sectionTitle}>
                      No Education / Employment Check Requested
                    </h3>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#64748b",
                        margin: 0,
                      }}
                    >
                      This verification link does not contain an education
                      or employment check.
                    </p>
                  </div>
                )}

                <div style={styles.footer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.btnSecondary}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={saveEducationAndEmployment}
                    disabled={saving}
                    style={{
                      ...styles.btnPrimary,
                      opacity: saving ? 0.6 : 1,
                    }}
                  >
                    {saving ? (
                      <Loader2 size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}

                    <span>
                      {saving ? "Saving..." : "Save & Continue"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <span style={styles.stepBadge}>Step 5 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Review Submitted Details
                </h2>

                <p style={styles.subtitle}>
                  Review the information and documents before declaration.
                </p>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>
                    <User size={16} color="#2563eb" /> Candidate
                  </h3>

                  {renderReviewItem(
                    "Candidate Name",
                    personalDetails.fullName,
                  )}
                  {renderReviewItem(
                    "Candidate ID",
                    personalDetails.candidateId,
                  )}
                  {renderReviewItem(
                    "Email",
                    personalDetails.email,
                  )}
                  {renderReviewItem(
                    "Mobile",
                    personalDetails.mobile,
                  )}
                  {renderReviewItem(
                    "Date of Birth",
                    personalDetails.dob,
                  )}
                  {renderReviewItem(
                    "Gender",
                    personalDetails.gender,
                  )}
                </div>

                <div style={styles.sectionBox}>
                  <h3 style={styles.sectionTitle}>
                    <FileText size={16} color="#2563eb" /> Verification
                    Details
                  </h3>

                  {hasEducation &&
                    renderReviewItem(
                      "Qualifications",
                      `${qualifications.length} qualification${
                        qualifications.length === 1 ? "" : "s"
                      }`,
                    )}

                  {hasEmployment &&
                    renderReviewItem(
                      "Employers",
                      `${employers.length} employer${
                        employers.length === 1 ? "" : "s"
                      }`,
                    )}

                  {renderReviewItem(
                    "Requested Checks",
                    availableChecks.join(", "),
                  )}
                </div>

                <div style={styles.footer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.btnSecondary}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    style={styles.btnPrimary}
                  >
                    <span>Continue</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div>
                <span style={styles.stepBadge}>Step 6 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Declaration & Submit
                </h2>

                <p style={styles.subtitle}>
                  Confirm the information provided and submit your
                  verification.
                </p>

                <div style={styles.sectionBoxGray}>
                  <h3 style={styles.sectionTitle}>Declaration</h3>

                  <div style={styles.termsBox}>
                    I declare that the information and documents submitted by
                    me are true, complete, and correct to the best of my
                    knowledge. I understand that the information will be used
                    for background verification and that incorrect or
                    misleading information may affect the verification result.
                  </div>

                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={declarationAccepted}
                      onChange={(event) =>
                        setDeclarationAccepted(event.target.checked)
                      }
                      style={{ marginTop: "3px" }}
                    />

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      I confirm the above declaration and authorize submission
                      of this background verification.
                    </span>
                  </label>
                </div>

                <div style={styles.sectionBoxAmber}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <ShieldCheck
                      size={18}
                      color="#d97706"
                      style={{ flexShrink: 0 }}
                    />

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#92400e",
                        lineHeight: 1.5,
                      }}
                    >
                      After final submission, this candidate link will be
                      marked as submitted.
                    </div>
                  </div>
                </div>

                <div style={styles.footer}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.btnSecondary}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={submitVerification}
                    disabled={!declarationAccepted || saving}
                    style={{
                      ...styles.btnPrimary,
                      opacity:
                        declarationAccepted && !saving ? 1 : 0.5,
                      cursor:
                        declarationAccepted && !saving
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    {saving ? (
                      <Loader2 size={16} />
                    ) : (
                      <Check size={16} />
                    )}

                    <span>
                      {saving
                        ? "Submitting..."
                        : "Submit Verification"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={styles.successIconCircle}>
                  <Check size={36} />
                </div>

                <span style={styles.stepBadge}>Step 7 of 7</span>

                <h2 style={styles.stepHeaderTitle}>
                  Verification Submitted
                </h2>

                <p style={styles.subtitle}>
                  Thank you. Your background verification information and
                  documents have been submitted successfully.
                </p>

                <div
                  style={{
                    ...styles.sectionBoxGray,
                    textAlign: "left",
                    maxWidth: "560px",
                    margin: "0 auto",
                  }}
                >
                  {renderReviewItem(
                    "Candidate",
                    personalDetails.fullName ||
                      linkData?.candidateName,
                  )}

                  {renderReviewItem(
                    "Case ID",
                    personalDetails.candidateId ||
                      linkData?.caseId,
                  )}

                  {renderReviewItem(
                    "Status",
                    "Submitted",
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @media (max-width: 900px) {
            .candidate-responsive-helper {
              display: block;
            }
          }

          @media (max-width: 760px) {
            input,
            select,
            textarea,
            button {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}
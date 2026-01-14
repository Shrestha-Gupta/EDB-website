import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  registerForEvent, 
  submitEventPdf, 
  getEventRegistration,
  eventInfo,
  type EventType,
  type EventRegistration,
  type TeamMember
} from '../../services/eventsApi';
import { canRegisterForEvent, canSubmitForEvent } from '../../config/eventConfig';
import { 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  FileText, 
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventType: EventType;
  onRegistrationComplete?: () => void;
}

type Step = 'check' | 'register' | 'success' | 'submit' | 'submitted';

const EventRegistrationModal = ({ 
  isOpen, 
  onClose, 
  eventType,
  onRegistrationComplete 
}: EventRegistrationModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('check');
  const [registration, setRegistration] = useState<EventRegistration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Team registration data (for Pralekh)
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const event = eventInfo[eventType];
  const isPralekh = eventType === 'pralekh';
  const isRegistrationOpen = canRegisterForEvent(eventType);
  const isSubmissionOpen = canSubmitForEvent(eventType);

  // Initialize team members with leader when modal opens
  useEffect(() => {
    if (isOpen && user && isPralekh) {
      // Set team leader as first member
      setTeamMembers([{
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        college: user.college || '',
        branch: user.branch || '',
        year: user.year || '',
      }]);
    }
  }, [isOpen, user, isPralekh]);

  // Check existing registration on open
  useEffect(() => {
    if (isOpen && user) {
      checkExistingRegistration();
    }
  }, [isOpen, user, eventType]);

  const checkExistingRegistration = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getEventRegistration(eventType);
      if (data.registration) {
        setRegistration(data.registration);
        if (data.registration.registrationStatus === 'registered') {
          setStep('submit');
        } else {
          setStep('submitted');
        }
      } else {
        setStep('register');
      }
    } catch (err: any) {
      setStep('register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) return;
    
    // Check if profile is complete
    if (!user.name || !user.phone || !user.college || !user.branch || !user.year) {
      setError('Please complete your profile before registering for events');
      return;
    }

    // For Pralekh, validate team registration
    if (isPralekh) {
      if (!teamName.trim()) {
        setError('Please enter a team name');
        return;
      }
      if (teamMembers.length < 2) {
        setError('Team must have at least 2 members');
        return;
      }
      if (teamMembers.length > 5) {
        setError('Team can have maximum 5 members');
        return;
      }
      // Validate all team members have required fields
      for (let i = 0; i < teamMembers.length; i++) {
        const member = teamMembers[i];
        if (!member.name || !member.email || !member.phone || !member.college || !member.branch || !member.year) {
          setError(`Please fill all details for ${i === 0 ? 'Team Leader' : `Member ${i + 1}`}`);
          return;
        }
      }
    }

    setIsLoading(true);
    setError('');
    
    try {
      const data = await registerForEvent(
        eventType, 
        title, 
        description,
        isPralekh ? teamName : undefined,
        isPralekh ? teamMembers : undefined
      );
      setRegistration(data.registration);
      setStep('success');
      
      // After 2 seconds, show submission step
      setTimeout(() => {
        setStep('submit');
      }, 2000);
      
      onRegistrationComplete?.();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file || !registration) {
      setError('Please select a PDF file to submit');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await submitEventPdf(registration._id, file, title, description);
      setRegistration(data.registration);
      setStep('submitted');
      onRegistrationComplete?.();
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('check');
    setRegistration(null);
    setError('');
    setTitle('');
    setDescription('');
    setFile(null);
    setTeamName('');
    setTeamMembers([]);
    onClose();
  };

  // Team member handlers
  const addTeamMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, {
        name: '',
        email: '',
        phone: '',
        college: '',
        branch: '',
        year: '',
      }]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (index > 0 && teamMembers.length > 2) { // Can't remove leader and need minimum 2
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  if (!isOpen) return null;

  const isProfileIncomplete = !user?.name || !user?.phone || !user?.college || !user?.branch || !user?.year;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden border-t-4 border-amber-600"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">{event.name}</h2>
                <p className="text-amber-600 font-medium text-sm mt-0.5">{event.fullName}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-stone-100 transition-colors -mr-1.5"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Loading State */}
            {step === 'check' && (
              <div className="text-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-stone-400 mx-auto mb-3" />
                <p className="text-stone-500 text-sm">Checking status...</p>
              </div>
            )}

            {/* Profile Incomplete Warning */}
            {step === 'register' && isProfileIncomplete && (
              <div className="text-center py-6">
                <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-stone-900 mb-1">Complete Your Profile</h3>
                <p className="text-stone-500 text-sm mb-5">
                  Add your details before registering.
                </p>
                <Link
                  to="/profile"
                  onClick={handleClose}
                  className="inline-block px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors"
                >
                  Go to Profile
                </Link>
              </div>
            )}

            {/* Registration Closed Notice */}
            {step === 'register' && !isRegistrationOpen && (
              <div className="text-center py-8">
                <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-stone-900 mb-2">Registrations Closed</h3>
                <p className="text-stone-600 text-sm mb-6 max-w-xs mx-auto">
                  Registrations for {event.name} are currently closed. Please check back later.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {/* Registration Form */}
            {step === 'register' && isRegistrationOpen && !isProfileIncomplete && user && (
              <div className="space-y-5">
                <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Team Registration for Pralekh */}
                {isPralekh ? (
                  <div className="space-y-4">
                    {/* Team Info Notice */}
                    <p className="text-xs text-stone-600 pb-3 border-b border-stone-100">
                      Team registration requires 2-5 members. You will be the team leader.
                    </p>

                    {/* Team Name */}
                    <div>
                      <label className="block text-xs font-medium text-stone-600 mb-1">
                        Team Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                        className="w-full px-3 py-2 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-sm"
                      />
                    </div>

                    {/* Team Members */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-stone-600">
                          Members ({teamMembers.length}/5)
                        </span>
                        {teamMembers.length < 5 && (
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                          >
                            + Add Member
                          </button>
                        )}
                      </div>

                      {teamMembers.map((member, index) => (
                        <div key={index} className="border border-stone-100 bg-white p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-600">
                              {index === 0 ? 'Team Leader (You)' : `Member ${index + 1}`}
                            </span>
                            {index > 0 && teamMembers.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="text-xs text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          {index === 0 ? (
                            // Team leader info (read-only)
                            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 -mx-3 -mb-3 mt-1 p-3 border-t border-stone-100">
                              <span>{member.name}</span>
                              <span className="truncate">{member.email}</span>
                              <span>{member.phone}</span>
                              <span className="truncate">{member.college}</span>
                              <span>{member.branch}</span>
                              <span>{member.year}</span>
                            </div>
                          ) : (
                            // Editable member fields
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                placeholder="Full Name *"
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              />
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                                placeholder="Email *"
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              />
                              <input
                                type="tel"
                                value={member.phone}
                                onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                placeholder="Phone *"
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              />
                              <input
                                type="text"
                                value={member.college}
                                onChange={(e) => updateTeamMember(index, 'college', e.target.value)}
                                placeholder="College *"
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              />
                              <input
                                type="text"
                                value={member.branch}
                                onChange={(e) => updateTeamMember(index, 'branch', e.target.value)}
                                placeholder="Branch *"
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              />
                              <select
                                value={member.year}
                                onChange={(e) => updateTeamMember(index, 'year', e.target.value)}
                                className="px-2.5 py-1.5 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs"
                              >
                                <option value="">Year *</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                                <option value="5th Year">5th Year</option>
                              </select>
                            </div>
                          )}
                        </div>
                      ))}

                      {teamMembers.length < 2 && (
                        <p className="text-xs text-stone-500 text-center">
                          Add at least one more member
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Individual Registration for other events */
                  <div className="border border-stone-100 p-3 bg-white">
                    <span className="text-xs font-medium text-stone-600 block mb-2 pb-2 border-b border-stone-100">Your Details</span>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                      <span>{user.name}</span>
                      <span className="truncate">{user.email}</span>
                      <span>{user.phone}</span>
                      <span className="truncate">{user.college}</span>
                      <span>{user.branch}</span>
                      <span>{user.year}</span>
                    </div>
                  </div>
                )}

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={isLoading || (isPralekh && teamMembers.length < 2)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    isPralekh ? 'Register Team' : 'Confirm Registration'
                  )}
                </button>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-8">
                <Check className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-stone-900 mb-1">
                  {isPralekh ? 'Team Registered' : 'Registration Complete'}
                </h3>
                <p className="text-stone-500 text-sm">
                  {isPralekh 
                    ? `Team "${teamName}" has been registered`
                    : `You're now registered for ${event.name}`
                  }
                </p>
                <p className="text-xs text-stone-400 mt-3">
                  Loading submission form...
                </p>
              </div>
            )}

            {/* Submission Form */}
            {step === 'submit' && (
              <div className="space-y-4">
                <div className="text-xs text-stone-600 pb-3 border-b border-stone-100">
                  {registration?.teamName ? `Team "${registration.teamName}" registered` : 'Registration complete'}.
                  {isSubmissionOpen ? ' You can submit your work below.' : ' Submissions will open soon.'}
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                {!isSubmissionOpen && (
                  <p className="text-stone-500 text-sm">
                    Submissions are currently closed. Check back later.
                  </p>
                )}

                {/* Title Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Submission Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your submission"
                    disabled={!isSubmissionOpen}
                    className="w-full px-3 py-2 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-sm disabled:bg-stone-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Description <span className="text-stone-400">(Optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a brief description"
                    rows={2}
                    disabled={!isSubmissionOpen}
                    className="w-full px-3 py-2 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none resize-none text-sm disabled:bg-stone-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Upload PDF <span className="text-amber-600">*</span>
                  </label>
                  <label className={`block ${isSubmissionOpen ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                    <div className={`border p-4 text-center transition-colors ${
                      file ? 'border-amber-600 bg-amber-50/30' : 'border-stone-200 hover:border-amber-600'
                    }`}>
                      {file ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-5 h-5 text-stone-600" />
                          <div className="text-left">
                            <p className="text-sm text-stone-700">{file.name}</p>
                            <p className="text-xs text-stone-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                          <p className="text-stone-600 text-sm">Click to upload PDF</p>
                          <p className="text-xs text-stone-400">Max 10MB</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={!isSubmissionOpen}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit Button */}
                {isSubmissionOpen ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !file}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                    <p className="text-xs text-stone-400 text-center">
                      You can also submit later from your dashboard
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            )}

            {/* Submitted State */}
            {step === 'submitted' && registration && (
              <div className="text-center py-6">
                <Check className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-stone-900 mb-1">Submission Complete</h3>
                <p className="text-stone-500 text-sm mb-5">
                  Your work has been submitted successfully.
                </p>
                
                <div className="border border-stone-100 p-3 text-left space-y-1.5 text-xs bg-white">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Status</span>
                    <span className="text-amber-600 capitalize">{registration.registrationStatus}</span>
                  </div>
                  {registration.teamName && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Team</span>
                      <span className="text-stone-700">{registration.teamName}</span>
                    </div>
                  )}
                  {registration.title && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Title</span>
                      <span className="text-stone-700 truncate max-w-[180px]">{registration.title}</span>
                    </div>
                  )}
                  {registration.submissionFileName && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">File</span>
                      <span className="text-stone-700 truncate max-w-[180px]">{registration.submissionFileName}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleClose}
                  className="mt-5 px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventRegistrationModal;

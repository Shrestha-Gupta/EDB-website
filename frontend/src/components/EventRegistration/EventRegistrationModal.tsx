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
import { 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  FileText, 
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Calendar,
  Users,
  Plus,
  Trash2
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 bg-linear-to-r ${event.gradientFrom} ${event.gradientTo} text-white rounded-t-2xl`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{event.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p className="text-sm opacity-90">{event.fullName}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Loading State */}
            {step === 'check' && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
                <p className="text-stone-600">Checking registration status...</p>
              </div>
            )}

            {/* Profile Incomplete Warning */}
            {step === 'register' && isProfileIncomplete && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">Complete Your Profile First</h3>
                <p className="text-stone-600 mb-6">
                  Please complete your profile before registering for events.
                </p>
                <Link
                  to="/profile"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Complete Profile
                </Link>
              </div>
            )}

            {/* Registration Form */}
            {step === 'register' && !isProfileIncomplete && user && (
              <div className="space-y-6">
                <p className="text-stone-600 text-sm">{event.description}</p>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Team Registration for Pralekh */}
                {isPralekh ? (
                  <div className="space-y-4">
                    {/* Team Info Banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Team Registration</p>
                        <p className="text-sm text-amber-600">Pralekh requires a team of 2-5 members. You are the Team Leader.</p>
                      </div>
                    </div>

                    {/* Team Name */}
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Team Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      />
                    </div>

                    {/* Team Members */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-stone-900 text-sm">
                          Team Members ({teamMembers.length}/5)
                        </h4>
                        {teamMembers.length < 5 && (
                          <button
                            type="button"
                            onClick={addTeamMember}
                            className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
                          >
                            <Plus className="w-4 h-4" />
                            Add Member
                          </button>
                        )}
                      </div>

                      {teamMembers.map((member, index) => (
                        <div key={index} className="bg-stone-50 rounded-xl p-4 space-y-3 relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-stone-700">
                              {index === 0 ? '👑 Team Leader (You)' : `Member ${index + 1}`}
                            </span>
                            {index > 0 && teamMembers.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {index === 0 ? (
                            // Team leader info (read-only, from profile)
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700">{member.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700 truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700">{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700 truncate">{member.college}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700">{member.branch}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-stone-400" />
                                <span className="text-stone-700">{member.year}</span>
                              </div>
                            </div>
                          ) : (
                            // Editable member fields
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                placeholder="Full Name *"
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                              />
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                                placeholder="Email *"
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                              />
                              <input
                                type="tel"
                                value={member.phone}
                                onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                placeholder="Phone *"
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                              />
                              <input
                                type="text"
                                value={member.college}
                                onChange={(e) => updateTeamMember(index, 'college', e.target.value)}
                                placeholder="College *"
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                              />
                              <input
                                type="text"
                                value={member.branch}
                                onChange={(e) => updateTeamMember(index, 'branch', e.target.value)}
                                placeholder="Branch *"
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                              />
                              <select
                                value={member.year}
                                onChange={(e) => updateTeamMember(index, 'year', e.target.value)}
                                className="px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
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
                        <p className="text-sm text-amber-600 text-center">
                          Add at least one more member to complete your team
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Individual Registration for other events */
                  <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-stone-900 text-sm mb-3">Your Details</h4>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.college}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.branch}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-stone-400" />
                      <span className="text-stone-700">{user.year}</span>
                    </div>
                  </div>
                )}

                {/* Register Button */}
                <motion.button
                  onClick={handleRegister}
                  disabled={isLoading || (isPralekh && teamMembers.length < 2)}
                  className={`w-full py-4 bg-linear-to-r ${event.gradientFrom} ${event.gradientTo} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2`}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    isPralekh ? 'Register Team' : 'Confirm Registration'
                  )}
                </motion.button>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {isPralekh ? 'Team Registration Successful!' : 'Registration Successful!'}
                </h3>
                <p className="text-stone-600">
                  {isPralekh 
                    ? `Your team "${teamName}" has been registered for ${event.name}.`
                    : `You have successfully registered for ${event.name}.`
                  }
                </p>
                <p className="text-sm text-stone-500 mt-2">
                  Opening submission window...
                </p>
              </div>
            )}

            {/* Submission Form */}
            {step === 'submit' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">
                      {registration?.teamName ? `Team "${registration.teamName}" is registered!` : 'You are registered!'}
                    </p>
                    <p className="text-sm text-green-600">Now submit your work</p>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Submission Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your submission"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Brief Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a brief description of your work"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Upload PDF <span className="text-red-500">*</span>
                  </label>
                  <label className="block cursor-pointer">
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      file ? 'border-green-400 bg-green-50' : 'border-stone-300 hover:border-amber-400'
                    }`}>
                      {file ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-8 h-8 text-green-500" />
                          <div className="text-left">
                            <p className="font-medium text-stone-900">{file.name}</p>
                            <p className="text-sm text-stone-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                          <p className="text-stone-600">Click to upload PDF</p>
                          <p className="text-xs text-stone-400 mt-1">Max size: 10MB</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading || !file}
                  className={`w-full py-4 bg-linear-to-r ${event.gradientFrom} ${event.gradientTo} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2`}
                  whileHover={{ scale: isLoading || !file ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || !file ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-stone-500 text-center">
                  You can also submit later from your dashboard
                </p>
              </div>
            )}

            {/* Submitted State */}
            {step === 'submitted' && registration && (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Submission Complete!</h3>
                <p className="text-stone-600 mb-4">
                  Your work has been submitted successfully.
                </p>
                
                <div className="bg-stone-50 rounded-xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{registration.registrationStatus}</span>
                  </div>
                  {registration.teamName && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Team:</span>
                      <span className="font-medium text-stone-700">{registration.teamName}</span>
                    </div>
                  )}
                  {registration.teamMembers && registration.teamMembers.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Members:</span>
                      <span className="font-medium text-stone-700">{registration.teamMembers.length} members</span>
                    </div>
                  )}
                  {registration.title && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Title:</span>
                      <span className="font-medium text-stone-700">{registration.title}</span>
                    </div>
                  )}
                  {registration.submissionFileName && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">File:</span>
                      <span className="font-medium text-stone-700 truncate max-w-[200px]">{registration.submissionFileName}</span>
                    </div>
                  )}
                  {registration.submissionDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Submitted:</span>
                      <span className="font-medium text-stone-700">
                        {new Date(registration.submissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-colors"
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

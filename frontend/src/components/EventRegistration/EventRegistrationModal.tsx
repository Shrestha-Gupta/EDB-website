import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  registerForEvent, 
  submitEventPdf, 
  getEventRegistration,
  eventInfo,
  type EventType,
  type EventRegistration
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
  Calendar
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

  const event = eventInfo[eventType];

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

    setIsLoading(true);
    setError('');
    
    try {
      const data = await registerForEvent(eventType, title, description);
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
    onClose();
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

                {/* Prefilled User Details */}
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

                {/* Register Button */}
                <motion.button
                  onClick={handleRegister}
                  disabled={isLoading}
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
                    'Confirm Registration'
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
                <h3 className="text-xl font-bold text-stone-900 mb-2">Registration Successful!</h3>
                <p className="text-stone-600">
                  You have successfully registered for {event.name}.
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
                    <p className="font-medium text-green-800">You are registered!</p>
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

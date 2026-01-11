import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getMyApplications,
  uploadPositionPaper,
  requestProfileEdit,
  submitFinalConfirmation,
  type MunApplication,
} from '../../services/munApi';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';

// Status Badge Component
const StatusBadge = ({ status, type }: { status: string; type: 'registration' | 'payment' | 'allotment' | 'paper' | 'confirmation' }) => {
  const getStyles = () => {
    switch (type) {
      case 'registration':
        return status === 'allotted' || status === 'approved'
          ? 'bg-green-100 text-green-700 border-green-200'
          : status === 'rejected'
          ? 'bg-red-100 text-red-700 border-red-200'
          : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'payment':
        return status === 'verified'
          ? 'bg-green-100 text-green-700 border-green-200'
          : status === 'failed'
          ? 'bg-red-100 text-red-700 border-red-200'
          : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'allotment':
        return status === 'allotted' || status === 'reassigned'
          ? 'bg-green-100 text-green-700 border-green-200'
          : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'paper':
        return status === 'approved'
          ? 'bg-green-100 text-green-700 border-green-200'
          : status === 'revision_requested'
          ? 'bg-orange-100 text-orange-700 border-orange-200'
          : status === 'submitted' || status === 'under_review'
          ? 'bg-blue-100 text-blue-700 border-blue-200'
          : 'bg-gray-100 text-gray-700 border-gray-200';
      case 'confirmation':
        return status === 'confirmed'
          ? 'bg-green-100 text-green-700 border-green-200'
          : 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'registration':
        return status === 'allotted' || status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳';
      case 'payment':
        return status === 'verified' ? '✅' : status === 'failed' ? '❌' : '⏳';
      case 'allotment':
        return status === 'allotted' || status === 'reassigned' ? '✅' : '⏳';
      case 'paper':
        return status === 'approved' ? '✅' : status === 'revision_requested' ? '⚠️' : status === 'submitted' || status === 'under_review' ? '📄' : '❌';
      case 'confirmation':
        return status === 'confirmed' ? '✅' : '⏳';
      default:
        return '📋';
    }
  };

  const getLabel = () => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      allotted: 'Allotted',
      reassigned: 'Reassigned',
      verified: 'Verified',
      failed: 'Failed',
      not_submitted: 'Not Submitted',
      submitted: 'Submitted',
      under_review: 'Under Review',
      revision_requested: 'Revision Requested',
      confirmed: 'Confirmed',
    };
    return labels[status] || status;
  };

  return (
    <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${getStyles()}`}>
      <span className="text-xs sm:text-sm">{getIcon()}</span>
      <span className="truncate max-w-[80px] sm:max-w-none">{getLabel()}</span>
    </span>
  );
};

// Progress Bar Component
const ProgressBar = ({ steps }: { steps: { label: string; completed: boolean; current?: boolean }[] }) => {
  const completedCount = steps.filter(s => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="w-full">
      {/* Mobile: Vertical progress */}
      <div className="sm:hidden space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : step.current
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-stone-200 text-stone-500'
              }`}
            >
              {step.completed ? '✓' : index + 1}
            </div>
            <span className={`text-sm ${step.completed ? 'text-green-600 font-medium' : 'text-stone-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Desktop: Horizontal progress */}
      <div className="hidden sm:block">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.current
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                {step.completed ? '✓' : index + 1}
              </div>
              <span className={`text-xs mt-1 text-center ${step.completed ? 'text-green-600 font-medium' : 'text-stone-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const MunProfileDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [applications, setApplications] = useState<MunApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'allotment' | 'paper' | 'info'>('profile');
  
  // Position Paper Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remarks, setRemarks] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  
  // Edit Request Modal State
  const [editRequestModal, setEditRequestModal] = useState(false);
  const [editRequestMessage, setEditRequestMessage] = useState('');
  const [editRequestSubmitting, setEditRequestSubmitting] = useState(false);
  
  // Final Confirmation State
  const [confirmingAttendance, setConfirmingAttendance] = useState(false);

  // Get the current/latest application
  const currentApplication = applications.length > 0 ? applications[0] : null;
  const isAllotted = currentApplication?.status === 'allotted';

  const fetchApplications = useCallback(async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/mun/login');
      return;
    }
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, authLoading, navigate, fetchApplications]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setUploadError('Only PDF files are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !currentApplication) return;

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      await uploadPositionPaper(currentApplication._id, selectedFile, remarks);
      setUploadSuccess('Position paper uploaded successfully!');
      setSelectedFile(null);
      setRemarks('');
      fetchApplications();
    } catch (error: unknown) {
      const err = error as { message?: string };
      setUploadError(err.message || 'Failed to upload position paper');
    } finally {
      setUploading(false);
    }
  };

  const handleEditRequest = async () => {
    if (!currentApplication || !editRequestMessage.trim()) return;

    setEditRequestSubmitting(true);
    try {
      await requestProfileEdit(currentApplication._id, editRequestMessage);
      alert('Edit request submitted successfully! Admin will review your request.');
      setEditRequestModal(false);
      setEditRequestMessage('');
      fetchApplications();
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || 'Failed to submit edit request');
    } finally {
      setEditRequestSubmitting(false);
    }
  };

  const handleFinalConfirmation = async () => {
    if (!currentApplication) return;

    if (!confirm('Are you sure you want to confirm your attendance? This action cannot be undone.')) {
      return;
    }

    setConfirmingAttendance(true);
    try {
      await submitFinalConfirmation(currentApplication._id);
      alert('Attendance confirmed successfully!');
      fetchApplications();
    } catch (error: unknown) {
      const err = error as { message?: string };
      alert(err.message || 'Failed to confirm attendance');
    } finally {
      setConfirmingAttendance(false);
    }
  };

  const getProgressSteps = () => {
    if (!currentApplication) return [];
    
    return [
      { label: 'Registration', completed: true },
      { label: 'Payment', completed: currentApplication.paymentStatus === 'verified', current: currentApplication.paymentStatus === 'pending' },
      { label: 'Allotment', completed: isAllotted, current: currentApplication.status === 'approved' },
      { label: 'Position Paper', completed: currentApplication.positionPaperStatus === 'approved', current: isAllotted && currentApplication.positionPaperStatus !== 'approved' },
      { label: 'Confirmation', completed: currentApplication.finalConfirmation },
    ];
  };

  const getDeadlineCountdown = (deadline: string | null) => {
    if (!deadline) return null;
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) return 'Deadline passed';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  if (loading || authLoading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentApplication) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">No Applications Found</h1>
          <p className="text-stone-600 mb-6">You haven't applied for any MUN events yet.</p>
          <Link
            to="/mun"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Browse MUN Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Delegate Dashboard<span className="text-amber-600">.</span>
            </h1>
            <p className="text-stone-600 mt-1">Welcome back, {user?.name || 'Delegate'}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/mun"
              className="px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
            >
              ← Back to MUN
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Status Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 border border-stone-200 shadow-xl"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
            📊 Status Overview
          </h2>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <ProgressBar steps={getProgressSteps()} />
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase mb-1 sm:mb-2">Registration</p>
              <StatusBadge status={currentApplication.status} type="registration" />
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase mb-1 sm:mb-2">Payment</p>
              <StatusBadge status={currentApplication.paymentStatus} type="payment" />
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase mb-1 sm:mb-2">Allotment</p>
              <StatusBadge status={currentApplication.allotmentStatus} type="allotment" />
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase mb-1 sm:mb-2">Position Paper</p>
              <StatusBadge status={currentApplication.positionPaperStatus} type="paper" />
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase mb-1 sm:mb-2">Confirmation</p>
              <StatusBadge status={currentApplication.finalConfirmation ? 'confirmed' : 'pending'} type="confirmation" />
            </div>
          </div>

          {/* Delegate ID Badge */}
          <div className="mt-4 sm:mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
              <span className="text-xl sm:text-2xl">🎫</span>
              <div>
                <p className="text-[10px] sm:text-xs opacity-80">Your Delegate ID</p>
                <p className="font-bold text-sm sm:text-lg tracking-wider">{currentApplication.delegateId || 'Generating...'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'profile', label: '👤 Profile', fullLabel: '👤 My Profile' },
            { id: 'allotment', label: '🌍 Allotment', fullLabel: '🌍 My Allotment' },
            { id: 'paper', label: '📄 Paper', fullLabel: '📄 Position Paper' },
            { id: 'info', label: '🎥 Guide', fullLabel: '🎥 MUN Guide' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
              }`}
            >
              <span className="sm:hidden">{tab.label}</span>
              <span className="hidden sm:inline">{tab.fullLabel}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* My Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  👤 Delegate Information
                </h2>
                {!currentApplication.editRequestPending ? (
                  <button
                    onClick={() => setEditRequestModal(true)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm hover:bg-stone-200 transition-colors"
                  >
                    ✏️ Request Edit
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
                    ⏳ Edit Request Pending
                  </span>
                )}
              </div>

              {/* Profile Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-stone-900">{user?.name}</h3>
                  <p className="text-stone-500">{user?.email}</p>
                  <p className="text-xs text-amber-600 font-medium mt-1">Delegate ID: {currentApplication.delegateId}</p>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Full Name</p>
                  <p className="text-stone-900 font-medium">{user?.name || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Email ID</p>
                  <p className="text-stone-900 font-medium">{user?.email || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Phone Number</p>
                  <p className="text-stone-900 font-medium">{user?.phone || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Institution / University</p>
                  <p className="text-stone-900 font-medium">{user?.college || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Year & Course</p>
                  <p className="text-stone-900 font-medium">{user?.year} - {user?.branch || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Preferred Committee</p>
                  <p className="text-stone-900 font-medium">{currentApplication.preferredCommittee || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Country Preferences</p>
                  <p className="text-stone-900 font-medium">{currentApplication.countryPreferences?.filter(c => c).join(', ') || 'None specified'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Experience Level</p>
                  <p className="text-stone-900 font-medium capitalize">{currentApplication.experienceLevel || 'N/A'}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <p className="text-xs text-stone-500 uppercase mb-1">Registration Date</p>
                  <p className="text-stone-900 font-medium">{new Date(currentApplication.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Download Acknowledgment */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  📥 Download Registration Acknowledgment
                </button>
              </div>
            </motion.div>
          )}

          {/* My Allotment Tab */}
          {activeTab === 'allotment' && (
            <motion.div
              key="allotment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xl"
            >
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                🌍 My Allotment
              </h2>

              {isAllotted ? (
                <div className="space-y-6">
                  {/* Allotment Status Banner */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-3xl">✅</span>
                    <div>
                      <p className="text-green-800 font-semibold">Allotment Confirmed!</p>
                      <p className="text-green-600 text-sm">Your committee and country have been assigned.</p>
                    </div>
                  </div>

                  {/* Allotment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                      <p className="text-xs text-blue-600 uppercase mb-2">Committee</p>
                      <p className="text-xl font-bold text-blue-900">{currentApplication.allottedCommittee}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                      <p className="text-xs text-green-600 uppercase mb-2">Country</p>
                      <p className="text-xl font-bold text-green-900">{currentApplication.allottedCountry}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200">
                      <p className="text-xs text-purple-600 uppercase mb-2">Agenda</p>
                      <p className="text-lg font-bold text-purple-900">{currentApplication.allottedAgenda || 'TBA'}</p>
                    </div>
                    {currentApplication.allottedRole && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                        <p className="text-xs text-amber-600 uppercase mb-2">Role</p>
                        <p className="text-lg font-bold text-amber-900">{currentApplication.allottedRole}</p>
                      </div>
                    )}
                    {currentApplication.committeeRoom && (
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-200">
                        <p className="text-xs text-pink-600 uppercase mb-2">Committee Room</p>
                        <p className="text-lg font-bold text-pink-900">{currentApplication.committeeRoom}</p>
                      </div>
                    )}
                    {currentApplication.reportingDate && (
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-200">
                        <p className="text-xs text-teal-600 uppercase mb-2">Reporting Date & Time</p>
                        <p className="text-lg font-bold text-teal-900">
                          {new Date(currentApplication.reportingDate).toLocaleDateString()}
                          {currentApplication.reportingTime && ` at ${currentApplication.reportingTime}`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Final Confirmation Section */}
                  {!currentApplication.finalConfirmation ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-amber-900 mb-2">📋 Confirm Your Attendance</h3>
                      <p className="text-amber-700 text-sm mb-4">
                        Please confirm your attendance to finalize your participation in the MUN conference.
                      </p>
                      <button
                        onClick={handleFinalConfirmation}
                        disabled={confirmingAttendance}
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
                      >
                        {confirmingAttendance ? 'Confirming...' : '✅ Confirm Attendance'}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3">
                      <span className="text-3xl">🎉</span>
                      <div>
                        <p className="text-green-800 font-semibold">Attendance Confirmed!</p>
                        <p className="text-green-600 text-sm">
                          Confirmed on {currentApplication.finalConfirmationAt ? new Date(currentApplication.finalConfirmationAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Lock Notice */}
                  {currentApplication.allotmentLocked && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                      <span className="text-2xl">🔒</span>
                      <p className="text-gray-700 text-sm">
                        Allotment has been locked by the organizers and cannot be changed.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl">⏳</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Awaiting Allotment</h3>
                  <p className="text-stone-600 max-w-md mx-auto">
                    Your committee and country will be assigned soon. Please check back later or wait for an email notification.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
                    <span className="animate-pulse">●</span>
                    <span>Status: Under Review</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Position Paper Tab */}
          {activeTab === 'paper' && (
            <motion.div
              key="paper"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xl"
            >
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                📄 Position Paper Submission
              </h2>

              {!isAllotted ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl">🔒</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Upload Disabled</h3>
                  <p className="text-stone-600 max-w-md mx-auto">
                    You can upload your position paper after you receive your committee and country allotment.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Deadline Banner */}
                  {currentApplication.positionPaperDeadline && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⏰</span>
                        <div>
                          <p className="text-orange-800 font-semibold">Submission Deadline</p>
                          <p className="text-orange-600 text-sm">
                            {new Date(currentApplication.positionPaperDeadline).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                        {getDeadlineCountdown(currentApplication.positionPaperDeadline)}
                      </div>
                    </div>
                  )}

                  {/* Current Status */}
                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-stone-500 uppercase mb-1">Submission Status</p>
                        <StatusBadge status={currentApplication.positionPaperStatus} type="paper" />
                      </div>
                      {currentApplication.positionPaperSubmittedAt && (
                        <div className="text-right">
                          <p className="text-xs text-stone-500 uppercase mb-1">Submitted On</p>
                          <p className="text-stone-700 font-medium">
                            {new Date(currentApplication.positionPaperSubmittedAt).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Admin Remarks */}
                  {currentApplication.positionPaperAdminRemarks && (
                    <div className={`rounded-xl p-4 ${
                      currentApplication.positionPaperStatus === 'revision_requested' 
                        ? 'bg-orange-50 border border-orange-200' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <p className="text-xs uppercase mb-2 font-semibold">
                        {currentApplication.positionPaperStatus === 'revision_requested' ? '⚠️ Revision Required' : '💬 Admin Remarks'}
                      </p>
                      <p className="text-stone-700">{currentApplication.positionPaperAdminRemarks}</p>
                    </div>
                  )}

                  {/* Already Submitted */}
                  {currentApplication.positionPaperUrl && currentApplication.positionPaperStatus === 'approved' ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                      <span className="text-5xl mb-4 block">✅</span>
                      <h3 className="text-xl font-bold text-green-900 mb-2">Position Paper Approved!</h3>
                      <p className="text-green-700 mb-4">Your position paper has been reviewed and approved.</p>
                      <a
                        href={currentApplication.positionPaperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        📥 View Submitted Paper
                      </a>
                    </div>
                  ) : (
                    <>
                      {/* View Current Submission */}
                      {currentApplication.positionPaperUrl && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📄</span>
                              <div>
                                <p className="text-blue-800 font-semibold">Current Submission</p>
                                <p className="text-blue-600 text-sm">
                                  {currentApplication.positionPaperRemarks || 'No remarks added'}
                                </p>
                              </div>
                            </div>
                            <a
                              href={currentApplication.positionPaperUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              View PDF
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Upload Form */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-stone-900">
                          {currentApplication.positionPaperUrl ? '📤 Re-upload Position Paper' : '📤 Upload Position Paper'}
                        </h3>

                        {/* File Upload Area */}
                        <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="position-paper-upload"
                          />
                          <label htmlFor="position-paper-upload" className="cursor-pointer block">
                            <span className="text-5xl mb-4 block">📎</span>
                            <p className="text-stone-900 font-medium mb-1">
                              {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                            </p>
                            <p className="text-stone-500 text-sm">PDF format only, max 10MB</p>
                          </label>
                        </div>

                        {/* Remarks */}
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Remarks (Optional)
                          </label>
                          <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Add any notes about your position paper..."
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 resize-none"
                            rows={3}
                          />
                        </div>

                        {/* Error/Success Messages */}
                        {uploadError && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm">{uploadError}</p>
                          </div>
                        )}
                        {uploadSuccess && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-green-600 text-sm">{uploadSuccess}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          onClick={handleUpload}
                          disabled={!selectedFile || uploading}
                          className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            selectedFile && !uploading
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          {uploading ? 'Uploading...' : '📤 Submit Position Paper'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* MUN Guide Tab */}
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xl"
            >
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                🎥 Common Committees & How MUN Works
              </h2>

              {/* Introduction Text */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-3">📚 What You Need to Know</h3>
                <div className="space-y-3 text-amber-800">
                  <p>
                    <strong>What are committees?</strong> Committees are simulation bodies where delegates represent 
                    different countries and debate on specific agendas. Each committee focuses on particular global issues.
                  </p>
                  <p>
                    <strong>How do allotments work?</strong> Based on your preferences and experience level, the organizing 
                    committee assigns you a country and committee. This is your portfolio for the conference.
                  </p>
                  <p>
                    <strong>What are delegates expected to do?</strong> Research your country's stance on the agenda, 
                    write a position paper, actively participate in debates, form alliances, and work towards passing resolutions.
                  </p>
                </div>
              </div>

              {/* Video Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">🎬 Watch: MUN Beginner's Guide</h3>
                <div className="aspect-video bg-stone-900 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/BYYwBLJ9q5E?rel=0&modestbranding=1"
                    title="MUN Guide Video - How Model United Nations Works"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl w-full h-full"
                    loading="lazy"
                    style={{ border: 'none' }}
                  />
                </div>
                <p className="text-stone-500 text-sm mt-2 text-center">
                  Learn the basics of MUN, committee procedures, and how to be an effective delegate.
                </p>
              </div>

              {/* Committee Info Accordion */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900">📋 Common Committee Types</h3>
                
                <details className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-stone-900 hover:bg-stone-100 transition-colors">
                    UNHRC - United Nations Human Rights Council
                  </summary>
                  <div className="px-5 pb-4 text-stone-600">
                    <p>The UNHRC is responsible for promoting and protecting human rights around the world. 
                    Delegates discuss issues like refugee rights, freedom of speech, and humanitarian crises.</p>
                  </div>
                </details>

                <details className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-stone-900 hover:bg-stone-100 transition-colors">
                    IP - International Press
                  </summary>
                  <div className="px-5 pb-4 text-stone-600">
                    <p>The International Press covers the proceedings of all committees, writes articles, 
                    conducts interviews, and creates content about the conference. Perfect for those interested in journalism!</p>
                  </div>
                </details>

                <details className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-stone-900 hover:bg-stone-100 transition-colors">
                    UNGA - United Nations General Assembly
                  </summary>
                  <div className="px-5 pb-4 text-stone-600">
                    <p>The UNGA is the main deliberative body of the UN where all member states have equal representation. 
                    Topics can range from international security to sustainable development.</p>
                  </div>
                </details>

                <details className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-stone-900 hover:bg-stone-100 transition-colors">
                    UNSC - United Nations Security Council
                  </summary>
                  <div className="px-5 pb-4 text-stone-600">
                    <p>The UNSC focuses on international peace and security. It includes 5 permanent members with veto power 
                    and discusses urgent global crises and conflicts.</p>
                  </div>
                </details>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Quick Tips for Success</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Research your country's foreign policy and stance on the agenda thoroughly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Write a well-structured position paper before the conference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Practice public speaking and formal debate procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Network with other delegates and form strategic alliances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Stay in character and maintain diplomatic decorum</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Request Modal */}
      <AnimatePresence>
        {editRequestModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">✏️ Request Profile Edit</h3>
              <p className="text-stone-600 text-sm mb-4">
                Describe what information you'd like to update. Your request will be sent to the admin for review.
              </p>
              <textarea
                value={editRequestMessage}
                onChange={(e) => setEditRequestMessage(e.target.value)}
                placeholder="I would like to update my phone number to..."
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 resize-none"
                rows={4}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditRequestModal(false)}
                  className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold hover:bg-stone-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditRequest}
                  disabled={!editRequestMessage.trim() || editRequestSubmitting}
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {editRequestSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MunProfileDashboard;

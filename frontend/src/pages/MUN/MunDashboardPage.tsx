import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getMyApplications, uploadPositionPaper, type MunApplication } from '../../services/munApi';
import { Link, useNavigate } from 'react-router-dom';

const MunDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<MunApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remarks, setRemarks] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Get the latest/current application
  const currentApplication = applications.length > 0 ? applications[0] : null;
  const isAllotted = currentApplication?.allottedCountry && currentApplication?.allottedCommittee;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const err = error as { response?: { data?: { error?: string } } };
      setUploadError(err.response?.data?.error || 'Failed to upload position paper');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'pending': return 'text-amber-600';
      default: return 'text-stone-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/30 to-orange-50/20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-700 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/30 to-orange-50/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">MUN Dashboard</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Section 1: Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-stone-200 shadow-lg"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            ✅ Status
          </h2>
          {currentApplication ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-2xl">{getStatusIcon(currentApplication.status)}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-base sm:text-lg font-medium ${getStatusColor(currentApplication.status)}`}>
                  Application: {currentApplication.status.charAt(0).toUpperCase() + currentApplication.status.slice(1)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              {user?.preferredCommittee ? (
                <>
                  <p className="text-green-600 font-medium mb-2">✅ Preferences Submitted</p>
                
                </>
              ) : (
                <>
                  <p className="text-stone-500 mb-4">No application submitted yet</p>
                  <Link
                    to="/mun/events"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg"
                  >
                    🚀 Apply for Committee
                  </Link>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Section: Assigned Country (from User model) */}
        {user?.allottedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-200 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
              🌍 Your Country Assignment
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🇺🇳</span>
                  <div>
                    <p className="text-2xl font-bold text-green-800">{user.allottedCountry}</p>
                    <p className="text-green-600">{user.allottedCommittee || user.preferredCommittee || 'UNHRC'}</p>
                  </div>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  🎉 Congratulations! You have been assigned to represent <strong>{user.allottedCountry}</strong> in the MUN conference.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section: Position Paper Info (for UNHRC) */}
        {user?.preferredCommittee === 'UNHRC' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-200 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2 flex items-center gap-2">
              📄 Position Paper
            </h2>
            <p className="text-blue-800 font-medium text-lg">
              Submission for position paper will start soon.
            </p>
          </motion.div>
        )}

        {/* Section 2: My Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-stone-200 shadow-lg"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            👤 My Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">Full Name</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base truncate">{user?.name || 'N/A'}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">Email</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base truncate">{user?.email || 'N/A'}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">Phone</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base">{user?.phone || 'N/A'}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">College</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base truncate">{user?.college || 'N/A'}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">Branch</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base">{user?.branch || 'N/A'}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <p className="text-stone-500 text-xs sm:text-sm mb-1">Year</p>
              <p className="text-stone-900 font-medium text-sm sm:text-base">{user?.year || 'N/A'}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: MUN Preferences */}
        {currentApplication && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-stone-200 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
              📋 MUN Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
                <p className="text-stone-500 text-xs sm:text-sm mb-1">Attended MUN Before?</p>
                <p className="text-stone-900 font-medium text-sm sm:text-base">
                  {currentApplication.hasAttendedMun ? '✅ Yes' : '❌ No'}
                </p>
              </div>
              <div className="bg-stone-50 rounded-xl p-3 sm:p-4">
                <p className="text-stone-500 text-xs sm:text-sm mb-1">Preferred Committee</p>
                <p className="text-stone-900 font-medium text-sm sm:text-base">
                  {currentApplication.preferredCommittee === 'UNHRC' 
                    ? '🌍 UNHRC' 
                    : currentApplication.preferredCommittee === 'IP' 
                    ? '📰 IP' 
                    : 'N/A'}
                </p>
              </div>
              <div className="bg-stone-50 rounded-xl p-3 sm:p-4 sm:col-span-2">
                <p className="text-stone-500 text-xs sm:text-sm mb-1">Country Preferences</p>
                <p className="text-stone-900 font-medium text-sm sm:text-base">
                  {currentApplication.countryPreferences?.filter(c => c).length > 0 
                    ? currentApplication.countryPreferences.filter(c => c).map((country, i) => (
                        <span key={i} className="inline-block mr-2">
                          {i + 1}. {country}
                        </span>
                      ))
                    : 'None specified'}
                </p>
              </div>
              {currentApplication.hasAttendedMun && currentApplication.previousMunExperience && (
                <div className="bg-stone-50 rounded-xl p-3 sm:p-4 sm:col-span-2">
                  <p className="text-stone-500 text-xs sm:text-sm mb-1">Previous MUN Experience</p>
                  <p className="text-stone-900 font-medium text-sm sm:text-base whitespace-pre-wrap">
                    {currentApplication.previousMunExperience}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        

        {/* Section 4: Position Paper Submission */}
        {currentApplication?.preferredCommittee === 'UNHRC' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-stone-200 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
              📄 Position Paper Submission
            </h2>
            
            {!isAllotted ? (
              <div className="bg-stone-100 border border-stone-200 rounded-xl p-6 text-center">
                <span className="text-4xl mb-3 block">🔒</span>
                <p className="text-stone-600 font-medium">Upload Disabled</p>
                <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                  You can upload your position paper after country allotment.
                </p>
              </div>
            ) : currentApplication?.positionPaperUrl ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                  <span className="text-2xl">✅</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-green-700 font-medium">Position Paper Submitted</p>
                    <p className="text-stone-500 text-sm">
                      Uploaded on: {currentApplication.positionPaperSubmittedAt ? new Date(currentApplication.positionPaperSubmittedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                {currentApplication.positionPaperRemarks && (
                  <div className="mt-4 bg-white rounded-xl p-3 sm:p-4 border border-green-100">
                    <p className="text-stone-500 text-xs sm:text-sm mb-1">Your Remarks:</p>
                    <p className="text-stone-700 text-sm sm:text-base">{currentApplication.positionPaperRemarks}</p>
                  </div>
                )}
                <a
                  href={currentApplication.positionPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  📥 View Uploaded Paper
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 sm:p-6 text-center hover:border-amber-400 transition-colors bg-stone-50">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="position-paper-upload"
                  />
                  <label
                    htmlFor="position-paper-upload"
                    className="cursor-pointer block"
                  >
                    <span className="text-4xl mb-3 block">📎</span>
                    <p className="text-stone-700 font-medium text-sm sm:text-base break-all">
                      {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                    </p>
                    <p className="text-stone-500 text-xs sm:text-sm mt-2">PDF only, max 10MB</p>
                  </label>
                </div>

                {/* Remarks Textbox */}
                <div>
                  <label className="block text-stone-600 text-xs sm:text-sm mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Add any remarks or notes about your position paper..."
                    className="w-full px-3 sm:px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none text-sm sm:text-base"
                    rows={3}
                  />
                </div>

                {/* Error/Success Messages */}
                {uploadError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm">{uploadError}</p>
                  </div>
                )}
                {uploadSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-green-600 text-sm">{uploadSuccess}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    selectedFile && !uploading
                      ? 'bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {uploading ? 'Uploading...' : '📤 Submit Position Paper'}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Application History (if multiple) */}
        {applications.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
              📋 Application History
            </h2>
            <div className="space-y-3">
              {applications.slice(1).map((app, index) => (
                <div
                  key={app._id}
                  className="bg-stone-50 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-800 font-medium text-sm sm:text-base">Application #{applications.length - index - 1}</p>
                    <p className="text-stone-500 text-xs sm:text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm shrink-0 ${
                    app.status === 'approved' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MunDashboardPage;

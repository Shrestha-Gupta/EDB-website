import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getMyApplications, uploadPositionPaper, type MunApplication } from '../../services/munApi';

const MunDashboardPage = () => {
  const { user, logout } = useAuth();
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
      case 'approved': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-gray-400';
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
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white">MUN Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </motion.div>

        {/* Section 1: Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            ✅ Status
          </h2>
          {currentApplication ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl">{getStatusIcon(currentApplication.status)}</span>
              <div>
                <p className={`text-lg font-medium ${getStatusColor(currentApplication.status)}`}>
                  Application: {currentApplication.status.charAt(0).toUpperCase() + currentApplication.status.slice(1)}
                </p>
                {isAllotted ? (
                  <p className="text-green-400">Country Allotted ✅</p>
                ) : (
                  <p className="text-yellow-400">Awaiting allotment ⏳</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No application submitted yet</p>
          )}
        </motion.div>

        {/* Section 2: My Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            👤 My Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-white font-medium">{user?.name || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{user?.email || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white font-medium">{user?.phone || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">College</p>
              <p className="text-white font-medium">{user?.college || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Branch</p>
              <p className="text-white font-medium">{user?.branch || 'N/A'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Year</p>
              <p className="text-white font-medium">{user?.year || 'N/A'}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: My Allotment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🌍 My Allotment
          </h2>
          {isAllotted ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-linear-to-br from-blue-600/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/30">
                <p className="text-blue-300 text-sm">Committee</p>
                <p className="text-white font-bold text-lg">{currentApplication?.allottedCommittee}</p>
              </div>
              <div className="bg-linear-to-br from-green-600/30 to-green-800/30 rounded-lg p-4 border border-green-500/30">
                <p className="text-green-300 text-sm">Country</p>
                <p className="text-white font-bold text-lg">{currentApplication?.allottedCountry}</p>
              </div>
              <div className="bg-linear-to-br from-purple-600/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
                <p className="text-purple-300 text-sm">Agenda</p>
                <p className="text-white font-bold text-lg">{currentApplication?.allottedAgenda || 'TBA'}</p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
              <span className="text-4xl mb-2 block">🔒</span>
              <p className="text-yellow-400 font-medium">Awaiting allotment ⏳</p>
              <p className="text-gray-400 text-sm mt-2">
                Your country and committee will appear here once allotted by the admin.
              </p>
            </div>
          )}
        </motion.div>

        {/* Section 4: Position Paper Submission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📄 Position Paper Submission
          </h2>
          
          {!isAllotted ? (
            <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-6 text-center">
              <span className="text-4xl mb-2 block">🔒</span>
              <p className="text-gray-400 font-medium">Upload Disabled</p>
              <p className="text-gray-500 text-sm mt-2">
                You can upload your position paper after country allotment.
              </p>
            </div>
          ) : currentApplication?.positionPaperUrl ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-400 font-medium">Position Paper Submitted</p>
                  <p className="text-gray-400 text-sm">
                    Uploaded on: {currentApplication.positionPaperSubmittedAt ? new Date(currentApplication.positionPaperSubmittedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              {currentApplication.positionPaperRemarks && (
                <div className="mt-4 bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Your Remarks:</p>
                  <p className="text-white">{currentApplication.positionPaperRemarks}</p>
                </div>
              )}
              <a
                href={currentApplication.positionPaperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                📥 View Uploaded Paper
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
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
                  <span className="text-4xl mb-2 block">📎</span>
                  <p className="text-white font-medium">
                    {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">PDF only, max 10MB</p>
                </label>
              </div>

              {/* Remarks Textbox */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add any remarks or notes about your position paper..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Error/Success Messages */}
              {uploadError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{uploadError}</p>
                </div>
              )}
              {uploadSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{uploadSuccess}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  selectedFile && !uploading
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {uploading ? 'Uploading...' : '📤 Submit Position Paper'}
              </button>
            </div>
          )}
        </motion.div>

        {/* Application History (if multiple) */}
        {applications.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📋 Application History
            </h2>
            <div className="space-y-3">
              {applications.slice(1).map((app, index) => (
                <div
                  key={app._id}
                  className="bg-white/5 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">Application #{applications.length - index - 1}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
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

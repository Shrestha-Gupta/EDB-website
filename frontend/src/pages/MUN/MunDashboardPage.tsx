import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getMyApplications, uploadPositionPaper, type MunApplication } from '../../services/munApi';
import { Link, useNavigate } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';

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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status] || styles.pending}`}>
        {status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading dashboard...</p>
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              MUN Dashboard<span className="text-amber-600">.</span>
            </h1>
            <p className="text-amber-600 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'Delegate'}</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors text-sm"
          >
            <span>↪</span> Sign out
          </button>
        </motion.div>

        {/* Status Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">✨</span>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Status</span>
            </div>
            {currentApplication ? (
              getStatusBadge(currentApplication.status)
            ) : user?.preferredCommittee ? (
              <span className="text-sm font-medium text-green-600">Preferences saved</span>
            ) : (
              <span className="text-sm text-stone-400">Not applied</span>
            )}
          </motion.div>

          {/* Committee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">📋</span>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Committee</span>
            </div>
            <span className="text-sm font-medium text-stone-900">
              {user?.preferredCommittee === 'UNHRC' ? 'UNHRC' : 
               user?.preferredCommittee === 'IP' ? 'International Press' : 
               '—'}
            </span>
          </motion.div>

          {/* Assigned Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">🌍</span>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Assigned Country</span>
            </div>
            <span className="text-sm font-medium text-stone-900">
              {user?.allottedCountry || '—'}
            </span>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Apply CTA */}
            {!currentApplication && !user?.preferredCommittee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white"
              >
                <h2 className="text-xl font-bold mb-2">Ready to participate?</h2>
                <p className="text-amber-100 text-sm mb-4">
                  Select your preferred committee and country to get started.
                </p>
                <Link
                  to="/mun/select-committee"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-amber-600 text-sm font-semibold rounded-xl hover:bg-amber-50 transition-colors"
                >
                  Apply Now <span>→</span>
                </Link>
              </motion.div>
            )}

            {/* Country Assignment Banner */}
            {user?.allottedCountry && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <h3 className="font-semibold text-green-900">Country Assigned!</h3>
                    <p className="text-green-700 mt-1">
                      You will represent <strong>{user.allottedCountry}</strong> in {user.allottedCommittee || user.preferredCommittee}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3">
                <span className="text-lg">👤</span>
                <h2 className="font-semibold text-stone-900">Profile</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Name</p>
                    <p className="text-sm text-stone-900">{user?.name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Email</p>
                    <p className="text-sm text-stone-900 truncate">{user?.email || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Phone</p>
                    <p className="text-sm text-stone-900">{user?.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">College</p>
                    <p className="text-sm text-stone-900 truncate">{user?.college || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Branch</p>
                    <p className="text-sm text-stone-900">{user?.branch || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Year</p>
                    <p className="text-sm text-stone-900">{user?.year || '—'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MUN Preferences */}
            {(currentApplication || user?.preferredCommittee) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3">
                  <span className="text-lg">📝</span>
                  <h2 className="font-semibold text-stone-900">MUN Preferences</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Committee</span>
                    <span className="text-sm font-medium text-stone-900">
                      {user?.preferredCommittee === 'UNHRC' ? 'UNHRC' : 
                       user?.preferredCommittee === 'IP' ? 'International Press' : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Previous MUN Experience</span>
                    <span className="text-sm font-medium text-stone-900">
                      {currentApplication?.hasAttendedMun || user?.hasAttendedMun ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {(currentApplication?.countryPreferences?.length || user?.countryPreferences?.length) ? (
                    <div className="py-2">
                      <p className="text-sm text-stone-500 mb-2">Country Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {(currentApplication?.countryPreferences || user?.countryPreferences)?.filter(c => c).map((country, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg border border-amber-200">
                            {i + 1}. {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Help Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-amber-50 rounded-2xl p-5 border border-amber-100"
            >
              <h3 className="font-semibold text-amber-900 mb-2">Need Help?</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Anurag Banerjee (7004324717)
                Ritesh Yadav (8115303806)
              </p>
            </motion.div>

            {/* Position Paper Section */}
            {user?.preferredCommittee === 'UNHRC' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3">
                  <span className="text-lg">📄</span>
                  <h2 className="font-semibold text-stone-900">Position Paper</h2>
                </div>
                <div className="p-5">
                  {!isAllotted ? (
                    <div className="text-center py-6">
                      <span className="text-3xl mb-3 block">🔒</span>
                      <p className="text-sm text-stone-500">
                        Available after country assignment
                      </p>
                    </div>
                  ) : currentApplication?.positionPaperUrl ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                        <span>✅</span>
                        <div>
                          <p className="text-sm font-medium text-green-900">Submitted</p>
                          <p className="text-xs text-green-600">
                            {currentApplication.positionPaperSubmittedAt 
                              ? new Date(currentApplication.positionPaperSubmittedAt).toLocaleDateString()
                              : ''}
                          </p>
                        </div>
                      </div>
                      <a
                        href={currentApplication.positionPaperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors"
                      >
                        View Document
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block">
                        <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <span className="text-2xl mb-2 block">📎</span>
                          <p className="text-sm text-stone-600">
                            {selectedFile ? selectedFile.name : 'Choose PDF file'}
                          </p>
                          <p className="text-xs text-stone-400 mt-1">Max 10MB</p>
                        </div>
                      </label>

                      <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Add remarks (optional)"
                        className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none"
                        rows={2}
                      />

                      {uploadError && (
                        <p className="text-sm text-red-600">{uploadError}</p>
                      )}
                      {uploadSuccess && (
                        <p className="text-sm text-green-600">{uploadSuccess}</p>
                      )}

                      <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                          selectedFile && !uploading
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MunDashboardPage;

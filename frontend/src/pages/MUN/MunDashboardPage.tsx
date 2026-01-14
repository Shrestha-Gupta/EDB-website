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
      approved: 'bg-green-50 text-green-700',
      rejected: 'bg-red-50 text-red-700',
      pending: 'bg-amber-50 text-amber-700',
    };
    return (
      <span className={`inline-block px-3 py-1 text-sm font-medium ${styles[status] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
              MUN Dashboard
            </h1>
            <div className="w-16 h-1 bg-amber-600 mb-3"></div>
            <p className="text-stone-600">Welcome back, {user?.name?.split(' ')[0] || 'Delegate'}</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-6 py-2.5 text-sm font-medium text-stone-900 hover:text-amber-600 transition-colors duration-200"
          >
            Sign Out
          </button>
        </motion.div>

        {/* Status Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-sm font-medium text-amber-600 mb-3 pb-3 border-b border-stone-100">Application Status</h3>
            {currentApplication ? (
              getStatusBadge(currentApplication.status)
            ) : user?.preferredCommittee ? (
              <span className="text-sm font-medium text-stone-900">Preferences Saved</span>
            ) : (
              <span className="text-sm text-stone-400">Not Applied</span>
            )}
          </motion.div>

          {/* Committee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-sm font-medium text-amber-600 mb-3 pb-3 border-b border-stone-100">Committee</h3>
            <span className="text-base font-medium text-stone-900">
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
            className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-sm font-medium text-amber-600 mb-3 pb-3 border-b border-stone-100">Assigned Country</h3>
            <span className="text-base font-medium text-stone-900">
              {user?.allottedCountry || '—'}
            </span>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Apply CTA */}
            {!currentApplication && !user?.preferredCommittee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="border-t-4 border-amber-600 bg-amber-50/50 p-8 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-3">Ready to Participate?</h2>
                <p className="text-stone-600 mb-6">
                  Select your preferred committee and country to get started with the Model United Nations conference.
                </p>
                <Link
                  to="/mun/select-committee"
                  className="inline-block px-6 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            )}

            {/* Country Assignment Banner */}
            {user?.allottedCountry && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="border-t-4 border-green-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">Country Assignment Confirmed</h3>
                <p className="text-stone-600">
                  You will represent <strong className="text-stone-900">{user.allottedCountry}</strong> in {user.allottedCommittee || user.preferredCommittee}
                </p>
              </motion.div>
            )}

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-1">Delegate Profile</h2>
              <div className="w-12 h-0.5 bg-amber-600 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Full Name</p>
                  <p className="text-base text-stone-900">{user?.name || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Email Address</p>
                  <p className="text-base text-stone-900 break-all">{user?.email || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Phone Number</p>
                  <p className="text-base text-stone-900">{user?.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Institution</p>
                  <p className="text-base text-stone-900">{user?.college || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Branch</p>
                  <p className="text-base text-stone-900">{user?.branch || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Academic Year</p>
                  <p className="text-base text-stone-900">{user?.year || '—'}</p>
                </div>
              </div>
            </motion.div>

            {/* MUN Preferences */}
            {(currentApplication || user?.preferredCommittee) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-serif font-bold text-stone-900 mb-1">Conference Preferences</h2>
                <div className="w-12 h-0.5 bg-amber-600 mb-6"></div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Committee</span>
                    <span className="text-base font-medium text-stone-900">
                      {user?.preferredCommittee === 'UNHRC' ? 'UNHRC' : 
                       user?.preferredCommittee === 'IP' ? 'International Press' : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-500">Previous Experience</span>
                    <span className="text-base font-medium text-stone-900">
                      {currentApplication?.hasAttendedMun || user?.hasAttendedMun ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {(currentApplication?.countryPreferences?.length || user?.countryPreferences?.length) ? (
                    <div className="pt-2">
                      <p className="text-sm text-stone-500 mb-3">Country Preferences</p>
                      <div className="space-y-2">
                        {(currentApplication?.countryPreferences || user?.countryPreferences)?.filter(c => c).map((country, i) => (
                          <div key={i} className="flex items-center gap-3 text-stone-900">
                            <span className="text-amber-600 font-medium">{i + 1}.</span>
                            <span className="text-base">{country}</span>
                          </div>
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
              className="border-l-4 border-amber-600 bg-amber-50/30 p-6"
            >
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Need Help?</h3>
              <p className="text-stone-600 mb-4">Contact our coordinators for assistance</p>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="text-sm text-green-700 font-medium">Available to assist</span>
              </div>
              <div className="space-y-3">
                <a 
                  href="tel:7004324717"
                  className="flex items-center gap-3 bg-white p-4 border border-stone-200 hover:border-amber-600 transition-colors"
                >
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-stone-900 font-medium text-sm">Anurag Banerjee</p>
                    <p className="text-stone-600 text-xs">7004324717</p>
                  </div>
                </a>
                <a 
                  href="tel:8115303806"
                  className="flex items-center gap-3 bg-white p-4 border border-stone-200 hover:border-amber-600 transition-colors"
                >
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-stone-900 font-medium text-sm">Ritesh Yadav</p>
                    <p className="text-stone-600 text-xs">8115303806</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Position Paper Section */}
            {user?.preferredCommittee === 'UNHRC' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t-4 border-amber-600 bg-white p-6 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-serif font-bold text-stone-900 mb-1">Position Paper</h2>
                <p className="text-sm text-amber-600 font-medium mb-6 pb-4 border-b border-stone-100">UNHRC Submission</p>
                <div>
                  {!isAllotted ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-stone-500">
                        Available after country assignment
                      </p>
                    </div>
                  ) : currentApplication?.positionPaperUrl ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-900 mb-1">Document Submitted</p>
                        <p className="text-xs text-green-700">
                          {currentApplication.positionPaperSubmittedAt 
                            ? new Date(currentApplication.positionPaperSubmittedAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })
                            : ''}
                        </p>
                      </div>
                      <a
                        href={currentApplication.positionPaperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-stone-900 hover:text-amber-600 font-medium transition-colors"
                      >
                        View Document
                        <span>→</span>
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block">
                        <div className="border-2 border-dashed border-stone-200 p-6 text-center hover:border-amber-600 transition-all duration-200 cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <p className="text-sm text-stone-600 mb-1">
                            {selectedFile ? selectedFile.name : 'Choose PDF file'}
                          </p>
                          <p className="text-xs text-stone-400">Maximum file size: 10MB</p>
                        </div>
                      </label>

                      <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Additional remarks (optional)"
                        className="w-full px-4 py-3 text-sm border border-stone-200 focus:outline-none focus:border-amber-600 resize-none transition-colors duration-200"
                        rows={3}
                      />

                      {uploadError && (
                        <p className="text-sm text-red-700">{uploadError}</p>
                      )}
                      {uploadSuccess && (
                        <p className="text-sm text-green-700">{uploadSuccess}</p>
                      )}

                      <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className={`inline-flex items-center gap-2 font-medium text-sm transition-colors ${
                          selectedFile && !uploading
                            ? 'text-stone-900 hover:text-amber-600'
                            : 'text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {uploading ? 'Uploading...' : 'Submit Position Paper'}
                        {selectedFile && !uploading && <span>→</span>}
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

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';

const MunSelectCommitteePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [selectedCommittee, setSelectedCommittee] = useState<'UNHRC' | 'IP' | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated or already has committee
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If user already has a committee selected, redirect to dashboard
    if (user?.preferredCommittee) {
      navigate('/mun/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Don't render if redirecting
  if (!isAuthenticated || user?.preferredCommittee) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCommittee) {
      setError('Please select a committee to proceed');
      return;
    }

    setSubmitting(true);

    try {
      await updateProfile({
        preferredCommittee: selectedCommittee,
      });
      
      // Redirect to dashboard after successful selection
      navigate('/mun/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save committee preference');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/mun/dashboard" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-4">
            Select Your Committee<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2 max-w-xl mx-auto">
            Choose which committee you'd like to participate in. This selection is required before proceeding.
          </p>
        </div>

        {/* Selection Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-stone-800 font-semibold mb-4 text-lg">
                Which committee would you like to join? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* UNHRC Option */}
                <button
                  type="button"
                  onClick={() => setSelectedCommittee('UNHRC')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedCommittee === 'UNHRC'
                      ? 'border-amber-500 bg-amber-50 shadow-lg'
                      : 'border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-amber-25'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🌍</span>
                    <div>
                      <h3 className="font-bold text-stone-900 text-lg">UNHRC</h3>
                      <p className="text-stone-500 text-sm">Delegate Committee</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm">
                    United Nations Human Rights Council - Represent a country and debate on human rights issues.
                  </p>
                  {selectedCommittee === 'UNHRC' && (
                    <div className="mt-3 flex items-center gap-2 text-amber-600 font-medium text-sm">
                      <span>✓</span> Selected
                    </div>
                  )}
                </button>

                {/* IP Option */}
                <button
                  type="button"
                  onClick={() => setSelectedCommittee('IP')}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedCommittee === 'IP'
                      ? 'border-amber-500 bg-amber-50 shadow-lg'
                      : 'border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-amber-25'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📰</span>
                    <div>
                      <h3 className="font-bold text-stone-900 text-lg">IP</h3>
                      <p className="text-stone-500 text-sm">International Press</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm">
                    International Press - Report on proceedings, interview delegates, and create news content.
                  </p>
                  {selectedCommittee === 'IP' && (
                    <div className="mt-3 flex items-center gap-2 text-amber-600 font-medium text-sm">
                      <span>✓</span> Selected
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !selectedCommittee}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                submitting || !selectedCommittee
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving...
                </span>
              ) : (
                'Confirm Selection'
              )}
            </button>

            <p className="text-center text-stone-500 text-sm">
              You can contact the organizing team if you need to change this later.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MunSelectCommitteePage;

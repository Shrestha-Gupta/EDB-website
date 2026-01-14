import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';

const MunSelectCommitteePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [selectedCommittee, setSelectedCommittee] = useState<'UNHRC' | 'IP' | ''>('');
  const [countryPreferences, setCountryPreferences] = useState<string[]>(['', '', '']);
  const [hasAttendedMun, setHasAttendedMun] = useState<boolean | null>(null);
  const [previousMunExperience, setPreviousMunExperience] = useState('');
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

  const handleCountryChange = (index: number, value: string) => {
    const newPreferences = [...countryPreferences];
    newPreferences[index] = value;
    setCountryPreferences(newPreferences);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCommittee) {
      setError('Please select a committee to proceed');
      return;
    }

    if (!countryPreferences[0]) {
      setError('Please enter at least your 1st country preference');
      return;
    }

    if (hasAttendedMun === null) {
      setError('Please indicate if you have attended MUN before');
      return;
    }

    if (hasAttendedMun && !previousMunExperience.trim()) {
      setError('Please share your previous MUN experience');
      return;
    }

    setSubmitting(true);

    try {
      await updateProfile({
        preferredCommittee: selectedCommittee,
        countryPreferences: countryPreferences.filter(c => c.trim()),
        hasAttendedMun: hasAttendedMun,
        previousMunExperience: previousMunExperience,
      });
      
      // Redirect to dashboard after successful selection
      navigate('/mun/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save preferences');
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
            MUN Preferences<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2 max-w-xl mx-auto">
            Fill in your committee preference and country choices to complete your MUN registration.
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

            {/* Country Preferences */}
            <div>
              <label className="block text-stone-800 font-semibold mb-3">
                Country Preferences <span className="text-red-500">*</span>
              </label>
              <p className="text-stone-500 text-sm mb-4">
                Enter your top 3 country preferences in order of priority.
              </p>
              <div className="space-y-3">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-stone-500 font-medium w-8">{index + 1}.</span>
                    <input
                      type="text"
                      value={countryPreferences[index]}
                      onChange={(e) => handleCountryChange(index, e.target.value)}
                      placeholder={index === 0 ? "Enter country (required)" : "Enter country (optional)"}
                      className="flex-1 px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-stone-50"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Previous MUN Experience */}
            <div>
              <label className="block text-stone-800 font-semibold mb-3">
                Have you attended MUN before? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setHasAttendedMun(true)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    hasAttendedMun === true
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-amber-300'
                  }`}
                >
                  ✅ Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasAttendedMun(false);
                    setPreviousMunExperience('');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    hasAttendedMun === false
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-amber-300'
                  }`}
                >
                  ❌ No
                </button>
              </div>
            </div>

            {/* Previous Experience Details */}
            {hasAttendedMun && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-stone-800 font-semibold mb-2">
                  Share your MUN experience <span className="text-red-500">*</span>
                </label>
                <p className="text-stone-500 text-sm mb-3">
                  Tell us about the MUNs you've attended, committees, awards, etc.
                </p>
                <textarea
                  value={previousMunExperience}
                  onChange={(e) => setPreviousMunExperience(e.target.value)}
                  placeholder="E.g., Attended XYZ MUN 2024 as delegate of India in UNHRC, received Honorable Mention..."
                  rows={4}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-stone-50 resize-none"
                />
              </motion.div>
            )}

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

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

    // Country preferences are only required for UNHRC
    if (selectedCommittee === 'UNHRC' && !countryPreferences[0]) {
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
        // Only include country preferences for UNHRC
        countryPreferences: selectedCommittee === 'UNHRC' ? countryPreferences.filter(c => c.trim()) : [],
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
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <ParticlesBackground />

      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-12">
          <Link to="/mun/dashboard" className="text-stone-900 hover:text-amber-600 text-sm font-medium transition-colors inline-flex items-center gap-2">
            <span>←</span> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-6 mb-2">
            Committee Selection
          </h1>
          <div className="w-16 h-1 bg-amber-600 mb-4"></div>
          <p className="text-stone-600 max-w-2xl">
            Select your preferred committee and country choices to complete your MUN registration.
          </p>
        </div>

        {/* Selection Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t-4 border-amber-600 bg-white p-8 hover:shadow-lg transition-all duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-stone-900 font-serif font-bold mb-1 text-xl">
                Select Committee <span className="text-amber-600">*</span>
              </label>
              <p className="text-stone-500 text-sm mb-6">Choose the committee you'd like to join</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* UNHRC Option */}
                <button
                  type="button"
                  onClick={() => setSelectedCommittee('UNHRC')}
                  className={`p-6 border-2 transition-all text-left hover:shadow-md ${
                    selectedCommittee === 'UNHRC'
                      ? 'border-amber-600 bg-amber-50/50'
                      : 'border-stone-200 bg-white hover:border-amber-600'
                  }`}
                >
                  <h3 className="font-bold text-stone-900 text-lg mb-1">UNHRC</h3>
                  <p className="text-amber-600 text-sm mb-3 font-medium">Delegate Committee</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    United Nations Human Rights Council - Represent a country and debate on human rights issues.
                  </p>
                  {selectedCommittee === 'UNHRC' && (
                    <div className="mt-4 pt-3 border-t border-amber-200 text-amber-600 font-medium text-sm">
                      Selected
                    </div>
                  )}
                </button>

                {/* IP Option - REGISTRATIONS CLOSED */}
                <div className="relative">
                  <button
                    type="button"
                    disabled
                    className="w-full p-6 border-2 border-stone-200 bg-stone-100 text-left opacity-60 cursor-not-allowed"
                  >
                    <h3 className="font-bold text-stone-500 text-lg mb-1">International Press</h3>
                    <p className="text-stone-400 text-sm mb-3 font-medium">Press Committee</p>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Question delegates and seek clarifications on resolutions.
                    </p>
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide shadow-lg transform -rotate-6">
                      Registrations Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Preferences - Only for UNHRC */}
            {selectedCommittee === 'UNHRC' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-stone-900 font-serif font-bold mb-1 text-xl">
                  Country Preferences <span className="text-amber-600">*</span>
                </label>
                <p className="text-stone-500 text-sm mb-4">
                  Enter your top 3 country preferences in order of priority
                </p>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-amber-600 font-medium w-8">{index + 1}.</span>
                      <input
                        type="text"
                        value={countryPreferences[index]}
                        onChange={(e) => handleCountryChange(index, e.target.value)}
                        placeholder={index === 0 ? "Enter country name (required)" : "Enter country name (optional)"}
                        className="flex-1 px-4 py-3 border border-stone-200 focus:outline-none focus:border-amber-600 transition-colors bg-white"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Previous MUN Experience */}
            <div>
              <label className="block text-stone-900 font-serif font-bold mb-1 text-xl">
                Previous MUN Experience <span className="text-amber-600">*</span>
              </label>
              <p className="text-stone-500 text-sm mb-4">Have you attended MUN before?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setHasAttendedMun(true)}
                  className={`py-3 px-4 border-2 font-medium transition-all ${
                    hasAttendedMun === true
                      ? 'border-amber-600 bg-amber-50/50 text-amber-700'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-amber-600'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasAttendedMun(false);
                    setPreviousMunExperience('');
                  }}
                  className={`py-3 px-4 border-2 font-medium transition-all ${
                    hasAttendedMun === false
                      ? 'border-amber-600 bg-amber-50/50 text-amber-700'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-amber-600'
                  }`}
                >
                  No
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
                <label className="block text-stone-900 font-serif font-bold mb-1 text-xl">
                  Experience Details <span className="text-amber-600">*</span>
                </label>
                <p className="text-stone-500 text-sm mb-3">
                  Tell us about the MUNs you've attended, committees, awards, etc.
                </p>
                <textarea
                  value={previousMunExperience}
                  onChange={(e) => setPreviousMunExperience(e.target.value)}
                  placeholder="Example: Attended XYZ MUN 2024 as delegate of India in UNHRC, received Honorable Mention..."
                  rows={4}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-amber-600 transition-colors bg-white resize-none"
                />
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !selectedCommittee}
              className={`w-full py-4 font-medium text-base transition-colors ${
                submitting || !selectedCommittee
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving preferences...
                </span>
              ) : (
                'Confirm Selection'
              )}
            </button>

            <p className="text-center text-stone-500 text-sm">
              Contact the organizing team if you need to modify your preferences later
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MunSelectCommitteePage;

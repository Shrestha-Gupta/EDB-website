import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const MunCompleteProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isAuthenticated } = useAuth();

  // Redirect to events page if profile is already complete
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user?.isProfileComplete) {
      // Profile already complete, skip to events page
      navigate("/mun/events");
      return;
    }
  }, [user, isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    // Personal Info
    name: user?.name || "",
    phone: user?.phone || "",
    college: user?.college || "",
    branch: user?.branch || "",
    year: user?.year || "",
    // MUN Preferences
    preferredCommittee: '' as '' | 'UNHRC' | 'IP',
    countryPreferences: ["", "", ""],
    agendaPreferences: "",
    experienceLevel: '' as '' | 'beginner' | 'intermediate' | 'advanced',
    hasAttendedMun: false,
    previousMunExperience: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Personal Info, Step 2: MUN Preferences

  const handleNextStep = () => {
    if (!formData.name || !formData.phone || !formData.college || !formData.branch || !formData.year) {
      setError("All fields are required");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.preferredCommittee) {
      setError("Please select your preferred committee (UNHRC or IP)");
      return;
    }

    if (!formData.experienceLevel) {
      setError("Please select your experience level");
      return;
    }

    setIsLoading(true);

    try {
      // Save profile with MUN preferences
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        preferredCommittee: formData.preferredCommittee as 'UNHRC' | 'IP',
        countryPreferences: formData.countryPreferences.filter(c => c),
        agendaPreferences: formData.agendaPreferences,
        experienceLevel: formData.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
        hasAttendedMun: formData.hasAttendedMun,
        previousMunExperience: formData.previousMunExperience,
      });
      
      // Redirect to dashboard after completing profile
      navigate("/mun/dashboard");
    } catch (err: any) {
      setError(err.message || "Profile update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-xl 2xl:max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{step === 1 ? '👤' : '🌍'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            {step === 1 ? 'Complete Profile' : 'MUN Preferences'}<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2">
            {step === 1 ? 'Fill in your personal details' : 'Tell us about your MUN preferences'}
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-stone-300'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-stone-300'}`} />
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  College/University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="MMMUT Gorakhpur"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="CSE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleNextStep}
                className="w-full mt-4 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next: MUN Preferences →
              </motion.button>
            </div>
          )}

          {/* Step 2: MUN Preferences */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Preferred Committee */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Which committee would you like to join? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredCommittee: 'UNHRC' })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.preferredCommittee === 'UNHRC'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-300 hover:border-amber-300'
                    }`}
                  >
                    <span className="font-bold text-stone-900">UNHRC</span>
                    <p className="text-xs text-stone-500 mt-1">United Nations Human Rights Council</p>
                  </button>
                  {/* IP Option - REGISTRATIONS CLOSED */}
                  <div className="relative">
                    <button
                      type="button"
                      disabled
                      className="w-full p-4 rounded-lg border-2 border-stone-200 bg-stone-100 text-left opacity-60 cursor-not-allowed"
                    >
                      <span className="font-bold text-stone-400">IP</span>
                      <p className="text-xs text-stone-400 mt-1">International Press</p>
                    </button>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-lg transform -rotate-6 rounded">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  What is your MUN experience level? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'First time' },
                    { value: 'intermediate', label: 'Intermediate', desc: '1-3 MUNs' },
                    { value: 'advanced', label: 'Advanced', desc: '4+ MUNs' },
                  ].map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, experienceLevel: level.value as any })}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        formData.experienceLevel === level.value
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-stone-300 hover:border-amber-300'
                      }`}
                    >
                      <span className="font-semibold text-stone-900 text-sm">{level.label}</span>
                      <p className="text-xs text-stone-500">{level.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Has Attended MUN */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Have you attended any MUN before? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hasAttendedMun: true })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                      formData.hasAttendedMun === true
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-stone-300 hover:border-amber-300 text-stone-700'
                    }`}
                  >
                    ✅ Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hasAttendedMun: false, previousMunExperience: '' })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                      formData.hasAttendedMun === false
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-stone-300 hover:border-amber-300 text-stone-700'
                    }`}
                  >
                    ❌ No
                  </button>
                </div>
              </div>

              {/* Previous Experience Details */}
              {formData.hasAttendedMun && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Tell us about your MUN experience
                  </label>
                  <textarea
                    value={formData.previousMunExperience}
                    onChange={(e) => setFormData({ ...formData, previousMunExperience: e.target.value })}
                    rows={3}
                    placeholder="E.g., Best Delegate at XYZ MUN 2024..."
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  />
                </div>
              )}

              {/* Country Preferences */}
              {formData.preferredCommittee === 'UNHRC' && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Country Preferences <span className="text-stone-500 font-normal">(optional)</span>
                  </label>
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={formData.countryPreferences[index]}
                      onChange={(e) => {
                        const newPrefs = [...formData.countryPreferences];
                        newPrefs[index] = e.target.value;
                        setFormData({ ...formData, countryPreferences: newPrefs });
                      }}
                      placeholder={`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Preference (e.g., India)`}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all mb-2"
                    />
                  ))}
                </div>
              )}



              <div className="flex gap-3 mt-6">
                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-stone-200 text-stone-700 font-bold rounded-lg hover:bg-stone-300 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? "Saving..." : "Complete Registration ✓"}
                </motion.button>
              </div>
            </div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default MunCompleteProfilePage;

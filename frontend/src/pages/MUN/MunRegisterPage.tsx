import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const MunRegisterPage = () => {
  const navigate = useNavigate();
  const { register, updateProfile } = useAuth();
  const [step, setStep] = useState(1); // Step 1: Account, Step 2: Personal, Step 3: MUN Preferences
  const [formData, setFormData] = useState({
    // Account Info (Step 1)
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Personal Info (Step 2)
    phone: "",
    college: "",
    branch: "",
    year: "",
    // MUN Preferences (Step 3)
    preferredCommittee: "" as "" | "UNHRC" | "IP",
    countryPreferences: ["", "", ""],
    experienceLevel: "" as "" | "beginner" | "intermediate" | "advanced",
    hasAttendedMun: null as boolean | null,
    previousMunExperience: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.college || !formData.branch || !formData.year) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.hasAttendedMun === null) {
      setError("Please indicate if you have attended MUN before");
      return false;
    }
    if (!formData.preferredCommittee) {
      setError("Please select your preferred committee");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateStep3()) return;

    setIsLoading(true);

    try {
      // Register the user
      await register(formData.email, formData.password, formData.name);
      
      // Update profile with all details
      await updateProfile({
        phone: formData.phone,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        preferredCommittee: formData.preferredCommittee as "UNHRC" | "IP",
        countryPreferences: formData.countryPreferences.filter(c => c),
        experienceLevel: formData.experienceLevel as "beginner" | "intermediate" | "advanced",
        hasAttendedMun: formData.hasAttendedMun || false,
        previousMunExperience: formData.previousMunExperience,
      });
      
      // Redirect to dashboard after registration
      navigate("/mun/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
          <Link to="/mun" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            ← Back to MUN
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">
            {step === 1 ? "Join MUN" : step === 2 ? "Your Details" : "MUN Preferences"}
            <span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2">
            {step === 1 ? "Create your delegate account" : step === 2 ? "Tell us about yourself" : "Your MUN preferences"}
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-amber-500' : 'bg-stone-300'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-amber-500' : 'bg-stone-300'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 3 ? 'bg-amber-500' : 'bg-stone-300'}`} />
          </div>
          <p className="text-xs text-stone-500 mt-2">Step {step} of 3</p>
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

          {/* Step 1: Account Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Full Name <span className="text-red-500">*</span></label>
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
                <label className="block text-sm font-medium text-stone-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Confirm Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                type="button"
                onClick={handleNext}
                className="w-full mt-4 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next: Personal Details →
              </motion.button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
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
                <label className="block text-sm font-medium text-stone-700 mb-2">College/University <span className="text-red-500">*</span></label>
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
                  <label className="block text-sm font-medium text-stone-700 mb-2">Branch <span className="text-red-500">*</span></label>
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
                  <label className="block text-sm font-medium text-stone-700 mb-2">Year <span className="text-red-500">*</span></label>
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
                  type="button"
                  onClick={handleNext}
                  className="flex-[2] py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next: MUN Preferences →
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 3: MUN Preferences */}
          {step === 3 && (
            <div className="space-y-6">
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

              {/* Country Preferences */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Country Preferences <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-stone-500 mb-3">Enter your top 3 country preferences in order</p>
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
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredCommittee: 'IP' })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.preferredCommittee === 'IP'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-300 hover:border-amber-300'
                    }`}
                  >
                    <span className="font-bold text-stone-900">IP</span>
                    <p className="text-xs text-stone-500 mt-1">International Press</p>
                  </button>
                </div>
              </div>

              {/* Previous Experience Details - only shown if attended MUN before */}
              {formData.hasAttendedMun && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Share your previous MUN experience <span className="text-stone-500 font-normal">(optional)</span>
                  </label>
                  <p className="text-xs text-stone-500 mb-2">Tell us about MUNs you've participated in, committees, awards, etc.</p>
                  <textarea
                    value={formData.previousMunExperience}
                    onChange={(e) => setFormData({ ...formData, previousMunExperience: e.target.value })}
                    rows={4}
                    placeholder="E.g., Best Delegate at XYZ MUN 2024, participated in UNHRC at ABC MUN 2023..."
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <motion.button
                  type="button"
                  onClick={() => setStep(2)}
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
                  {isLoading ? "Creating account..." : "Complete Registration ✓"}
                </motion.button>
              </div>
            </div>
          )}

          {step === 1 && (
            <p className="text-center text-stone-600 mt-6">
              Already have an account?{" "}
              <Link to="/mun/login" className="text-amber-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default MunRegisterPage;

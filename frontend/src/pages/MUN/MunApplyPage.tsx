import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getEvent, applyForEvent } from "../../services/munApi";
import type { MunEvent } from "../../services/munApi";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const MunApplyPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [event, setEvent] = useState<MunEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    preferredCommittee: '' as '' | 'UNHRC' | 'IP',
    countryPreferences: ["", "", ""],
    agendaPreferences: "",
    experienceLevel: '' as '' | 'beginner' | 'intermediate' | 'advanced',
    hasAttendedMun: false,
    previousMunExperience: "",
    whyJoin: "",
  });

  // Pre-fill form with user's saved preferences
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        preferredCommittee: (user.preferredCommittee || '') as '' | 'UNHRC' | 'IP',
        countryPreferences: user.countryPreferences?.length 
          ? [...user.countryPreferences, '', ''].slice(0, 3) 
          : ['', '', ''],
        agendaPreferences: user.agendaPreferences || '',
        experienceLevel: (user.experienceLevel || '') as '' | 'beginner' | 'intermediate' | 'advanced',
        hasAttendedMun: user.hasAttendedMun || false,
        previousMunExperience: user.previousMunExperience || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user && !user.isProfileComplete) {
      navigate("/mun/complete-profile");
      return;
    }

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, isAuthenticated, user]);

  const fetchEvent = async () => {
    try {
      const data = await getEvent(eventId!);
      setEvent(data);
    } catch (error) {
      console.error("Failed to fetch event:", error);
      setError("Event not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.hasAttendedMun === null) {
      setError("Please indicate if you have attended MUN before");
      return;
    }

    if (!formData.preferredCommittee) {
      setError("Please select your preferred committee (UNHRC or IP)");
      return;
    }

    // Country preferences are only required for UNHRC
    if (formData.preferredCommittee === 'UNHRC' && !formData.countryPreferences[0]) {
      setError("Please enter at least your 1st country preference");
      return;
    }

    if (!formData.whyJoin.trim()) {
      setError("Please tell us why you want to join");
      return;
    }

    setSubmitting(true);

    try {
      await applyForEvent({
        eventId: eventId!,
        preferredCommittee: formData.preferredCommittee as 'UNHRC' | 'IP',
        // Only include country preferences for UNHRC
        countryPreferences: formData.preferredCommittee === 'UNHRC' ? formData.countryPreferences.filter((c) => c) : [],
        agendaPreferences: formData.agendaPreferences,
        experienceLevel: formData.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
        hasAttendedMun: formData.hasAttendedMun,
        previousMunExperience: formData.previousMunExperience,
        whyJoin: formData.whyJoin,
      });
      alert("Application submitted successfully! Redirecting to your dashboard...");
      navigate("/mun/dashboard");
    } catch (err: any) {
      setError(err.message || "Application failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Event Not Found</h2>
          <Link to="/mun" className="text-amber-600 hover:underline">
            ← Back to MUN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-2xl 2xl:max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/mun" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            ← Back to MUN
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">
            Apply Now<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2">{event.title}</p>
        </div>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200"
        >
          <div className="flex flex-wrap gap-4 text-sm text-amber-800">
            <span>📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
            <span>📍 {event.venue}</span>
            <span>⏰ Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
          </div>
        </motion.div>

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

          {/* Has Attended MUN */}
          <div className="mb-6">
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

          {/* Preferred Committee - moved before Country Preferences */}
          <div className="mb-6">
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

          {/* Country Preferences - Only for UNHRC */}
          {formData.preferredCommittee === 'UNHRC' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
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
                  placeholder={
                    index === 0 ? "1st Preference (e.g., India)" : index === 1 ? "2nd Preference" : "3rd Preference"
                  }
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all mb-3"
                />
              ))}
            </motion.div>
          )}

          {/* Previous Experience Details (shown only if hasAttendedMun) */}
          {formData.hasAttendedMun && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Share your previous MUN experience
                <span className="text-stone-500 font-normal ml-2">(optional)</span>
              </label>
              <p className="text-xs text-stone-500 mb-2">Tell us about MUNs you've participated in, committees, awards, etc.</p>
              <textarea
                value={formData.previousMunExperience}
                onChange={(e) => setFormData({ ...formData, previousMunExperience: e.target.value })}
                rows={4}
                placeholder="E.g., Best Delegate at XYZ MUN 2024, Represented India in DISEC..."
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
              />
            </div>
          )}

          {/* Agenda Preferences */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Agenda/Topic Interest
              <span className="text-stone-500 font-normal ml-2">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.agendaPreferences}
              onChange={(e) => setFormData({ ...formData, agendaPreferences: e.target.value })}
              placeholder="E.g., Climate Change, Human Rights, Cybersecurity..."
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
          </div>

          {/* Why Join */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Why do you want to join this MUN? <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.whyJoin}
              onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
              rows={4}
              placeholder="Tell us about your motivation, what you hope to learn, and why you'd be a great delegate..."
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default MunApplyPage;

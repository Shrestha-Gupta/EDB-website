import { useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaLanguage, FaRocket, FaCheckCircle, FaRedoAlt } from "react-icons/fa";
import { HiUserGroup, HiIdentification, HiAcademicCap, HiMail } from "react-icons/hi";
import { MdGroups } from "react-icons/md";

interface TeamMember {
  name: string;
  rollNumber: string;
  branch: string;
}

interface FormData {
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderRollNumber: string;
  teamLeaderBranch: string;
  teamMembers: TeamMember[];
  preferredLanguage: string;
}

const ArunodayRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderRollNumber: "",
    teamLeaderBranch: "",
    teamMembers: [
      { name: "", rollNumber: "", branch: "" },
      { name: "", rollNumber: "", branch: "" },
      { name: "", rollNumber: "", branch: "" },
    ],
    preferredLanguage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData((prev) => {
      const newMembers = [...prev.teamMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, teamMembers: newMembers };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call actual backend API for Arunoday registration
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/arunoday/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: formData.teamName,
          teamLeaderName: formData.teamLeaderName,
          teamLeaderEmail: formData.teamLeaderEmail,
          teamLeaderRollNumber: formData.teamLeaderRollNumber,
          teamLeaderBranch: formData.teamLeaderBranch,
          teamMembers: formData.teamMembers.filter(m => m.name && m.rollNumber && m.branch),
          preferredLanguage: formData.preferredLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log("Form submitted:", data);
      setSubmitStatus("success");
      setErrorMessage("");
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      teamName: "",
      teamLeaderName: "",
      teamLeaderEmail: "",
      teamLeaderRollNumber: "",
      teamLeaderBranch: "",
      teamMembers: [
        { name: "", rollNumber: "", branch: "" },
        { name: "", rollNumber: "", branch: "" },
        { name: "", rollNumber: "", branch: "" },
      ],
      preferredLanguage: "",
    });
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors";
  const labelClasses = "block text-sm font-medium text-stone-700 mb-1.5";

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 md:p-16 border border-stone-200 shadow-xl shadow-stone-200/50 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
        >
          <FaCheckCircle className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">
          Registration Successful!
        </h3>
        <p className="text-stone-600 text-lg mb-8">
          Thank you for registering for Arunoday'26! We'll contact your team leader soon with more details.
        </p>
        <motion.button
          onClick={resetForm}
          className="px-8 py-3 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-lg flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedoAlt className="w-4 h-4" />
          Register Another Team
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl shadow-stone-200/50"
      id="registration-form"
    >
      <div className="text-center mb-10">
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full text-amber-700 text-sm font-medium mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HiUserGroup className="w-4 h-4" /> Team Registration
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3">
          Register Your Team
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto">
          Fill in the details below to register your team for Arunoday'26
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Team Name */}
        <div>
          <label className={labelClasses}>
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            placeholder="Enter your team name"
            className={inputClasses}
          />
        </div>

        {/* Team Leader Section */}
        <div className="border-t border-stone-200 pt-8">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <FaUserTie className="w-5 h-5 text-amber-600" />
            </span>
            Team Leader Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="teamLeaderName"
                value={formData.teamLeaderName}
                onChange={handleChange}
                required
                placeholder="Team leader's full name"
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="teamLeaderEmail"
                value={formData.teamLeaderEmail}
                onChange={handleChange}
                required
                placeholder="team.leader@email.com"
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="teamLeaderRollNumber"
                value={formData.teamLeaderRollNumber}
                onChange={handleChange}
                required
                placeholder="e.g., 2023001234"
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>
                Branch <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="teamLeaderBranch"
                value={formData.teamLeaderBranch}
                onChange={handleChange}
                required
                placeholder="e.g., CSE, ECE, ME"
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="border-t border-stone-200 pt-8">
          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MdGroups className="w-6 h-6 text-blue-600" />
              </span>
              Team Members (3 Members)
            </h3>
            <p className="text-stone-500 text-sm mt-2 ml-13">
              Please enter details for all 3 team members
            </p>
          </div>
          
          <div className="space-y-6">
            {formData.teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-50 rounded-xl p-6 border border-stone-200 relative"
              >
                <div className="mb-4">
                  <span className="text-sm font-medium text-amber-600">
                    Member {index + 1}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClasses}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                      required
                      placeholder="Member's full name"
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClasses}>
                      Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.rollNumber}
                      onChange={(e) => handleTeamMemberChange(index, "rollNumber", e.target.value)}
                      required
                      placeholder="e.g., 2023001234"
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClasses}>
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.branch}
                      onChange={(e) => handleTeamMemberChange(index, "branch", e.target.value)}
                      required
                      placeholder="e.g., CSE, ECE"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preferred Language Section */}
        <div className="border-t border-stone-200 pt-8">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaLanguage className="w-5 h-5 text-purple-600" />
            </span>
            Preferred Language
          </h3>
          
          <div>
            <label className={labelClasses}>
              Select your preferred language for the event <span className="text-red-500">*</span>
            </label>
            <select
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select a language</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Both">Both (Hindi & English)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting Registration...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Register Team for Arunoday'26
                <FaRocket className="w-5 h-5" />
              </span>
            )}
          </motion.button>

          {submitStatus === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm mt-4"
            >
              {errorMessage || "Something went wrong. Please try again."}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ArunodayRegistrationForm;

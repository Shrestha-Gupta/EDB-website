import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRedoAlt } from "react-icons/fa";

type ResidenceType = 'hosteler' | 'dayScholar' | '';
type HostelName = 'Tilak Bhawan' | 'Visveswaraya Bhawan' | 'Ambedkar Bhawan' | 'Tagore Bhawan' | 'Savitri Bai Phule Hostel' | '';

const HOSTEL_OPTIONS = [
  'Tilak Bhawan',
  'Visveswaraya Bhawan',
  'Ambedkar Bhawan',
  'Tagore Bhawan',
  'Savitri Bai Phule Hostel',
] as const;

interface TeamMember {
  name: string;
  rollNumber: string;
  branch: string;
  residenceType: ResidenceType;
  hostelName: HostelName;
}

interface FormData {
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderRollNumber: string;
  teamLeaderBranch: string;
  teamLeaderResidenceType: ResidenceType;
  teamLeaderHostelName: HostelName;
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
    teamLeaderResidenceType: "",
    teamLeaderHostelName: "",
    teamMembers: [
      { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
      { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
      { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
    ],
    preferredLanguage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [duplicateRollNumbers, setDuplicateRollNumbers] = useState<Set<string>>(new Set());

  // Check for duplicate roll numbers in real-time
  const checkDuplicateRollNumbers = (data: FormData) => {
    const allRollNumbers = [
      data.teamLeaderRollNumber,
      ...data.teamMembers.map(m => m.rollNumber)
    ].filter(roll => roll.trim() !== '');
    
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    
    allRollNumbers.forEach(roll => {
      if (seen.has(roll)) {
        duplicates.add(roll);
      } else {
        seen.add(roll);
      }
    });
    
    setDuplicateRollNumbers(duplicates);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (name === 'teamLeaderRollNumber') {
      checkDuplicateRollNumbers(updatedData);
    }
  };

  // Handle team leader residence type change - sync to all team members
  const handleLeaderResidenceChange = (value: ResidenceType) => {
    setFormData((prev) => {
      const newHostelName = value === 'dayScholar' ? '' : prev.teamLeaderHostelName;
      const updatedMembers = prev.teamMembers.map(member => ({
        ...member,
        residenceType: value,
        hostelName: value === 'dayScholar' ? '' as HostelName : newHostelName,
      }));
      return {
        ...prev,
        teamLeaderResidenceType: value,
        teamLeaderHostelName: newHostelName,
        teamMembers: updatedMembers,
      };
    });
  };

  // Handle team leader hostel change - sync to all team members
  const handleLeaderHostelChange = (value: HostelName) => {
    setFormData((prev) => {
      const updatedMembers = prev.teamMembers.map(member => ({
        ...member,
        hostelName: value,
      }));
      return {
        ...prev,
        teamLeaderHostelName: value,
        teamMembers: updatedMembers,
      };
    });
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    const updatedData = { ...formData, teamMembers: newMembers };
    setFormData(updatedData);
    if (field === 'rollNumber') {
      checkDuplicateRollNumbers(updatedData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate unique roll numbers
    const allRollNumbers = [
      formData.teamLeaderRollNumber,
      ...formData.teamMembers.filter(m => m.rollNumber).map(m => m.rollNumber)
    ];
    
    const uniqueRollNumbers = new Set(allRollNumbers);
    if (uniqueRollNumbers.size !== allRollNumbers.length) {
      setSubmitStatus("error");
      setErrorMessage('All roll numbers must be unique. Please check for duplicates.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Call actual backend API for Arunoday registration
      const API_URL = import.meta.env.PROD 
        ? 'https://edb-website-7oxz.vercel.app' 
        : 'http://localhost:5000';
      
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
          teamLeaderResidenceType: formData.teamLeaderResidenceType,
          teamLeaderHostelName: formData.teamLeaderHostelName,
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
      teamLeaderResidenceType: "",
      teamLeaderHostelName: "",
      teamMembers: [
        { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
        { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
        { name: "", rollNumber: "", branch: "", residenceType: "", hostelName: "" },
      ],
      preferredLanguage: "",
    });
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600 transition-colors";
  const labelClasses = "block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wide";

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-t-4 border-green-600 bg-white p-10 md:p-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 bg-green-50 flex items-center justify-center"
        >
          <FaCheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">
          Registration Successful
        </h3>
        <p className="text-stone-600 text-lg mb-8">
          Thank you for registering for Arunoday'26. We'll contact your team leader soon with more details.
        </p>
        <motion.button
          onClick={resetForm}
          className="px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors flex items-center gap-2 mx-auto"
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
      className="border-t-4 border-amber-600 bg-white p-8 md:p-12"
      id="registration-form"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
          Team Registration
        </h2>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-4"></div>
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
        <div className="border-t-2 border-stone-200 pt-8">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">
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
                className={`${inputClasses} ${duplicateRollNumbers.has(formData.teamLeaderRollNumber) && formData.teamLeaderRollNumber ? 'border-red-500 border-2' : ''}`}
              />
              {duplicateRollNumbers.has(formData.teamLeaderRollNumber) && formData.teamLeaderRollNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠</span> This roll number is duplicated
                </p>
              )}
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
            
            <div>
              <label className={labelClasses}>
                Residence Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.teamLeaderResidenceType}
                onChange={(e) => handleLeaderResidenceChange(e.target.value as ResidenceType)}
                required
                className={inputClasses}
              >
                <option value="">Select residence type</option>
                <option value="hosteler">Hosteler</option>
                <option value="dayScholar">Day Scholar</option>
              </select>
            </div>
            
            {formData.teamLeaderResidenceType === 'hosteler' && (
              <div>
                <label className={labelClasses}>
                  Hostel Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.teamLeaderHostelName}
                  onChange={(e) => handleLeaderHostelChange(e.target.value as HostelName)}
                  required
                  className={inputClasses}
                >
                  <option value="">Select your hostel</option>
                  {HOSTEL_OPTIONS.map((hostel) => (
                    <option key={hostel} value={hostel}>
                      {hostel}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-amber-700 mt-2">
                  Note: All team members should be from the same hostel
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Note: Participants may change teammates for further rounds if needed
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="border-t-2 border-stone-200 pt-8">
          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Team Members (3 Members)
            </h3>
            <p className="text-stone-500 text-sm mt-2">
              Please enter details for all 3 team members
            </p>
          </div>
          
          <div className="space-y-6">
            {formData.teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-50 p-6 border-l-4 border-amber-600 relative"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-700 uppercase tracking-wide">
                    Member {index + 1}
                  </span>
                  {formData.teamLeaderResidenceType && (
                    <span className={`text-xs px-3 py-1 font-medium ${
                      formData.teamLeaderResidenceType === 'hosteler' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {formData.teamLeaderResidenceType === 'hosteler' 
                        ? `${formData.teamLeaderHostelName || 'Hosteler'}` 
                        : 'Day Scholar'}
                    </span>
                  )}
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
                      className={`${inputClasses} ${duplicateRollNumbers.has(member.rollNumber) && member.rollNumber ? 'border-red-500 border-2' : ''}`}
                    />
                    {duplicateRollNumbers.has(member.rollNumber) && member.rollNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠</span> This roll number is duplicated
                      </p>
                    )}
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
        <div className="border-t-2 border-stone-200 pt-8">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">
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
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-600 text-white text-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span>Register Team</span>
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

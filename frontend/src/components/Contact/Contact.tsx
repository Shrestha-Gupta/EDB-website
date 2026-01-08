import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Upload,
  X,
  ArrowUpRight,
} from "lucide-react";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
import PageHero from "../PageHero/PageHero";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData to handle text fields + file
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      // NOTE: Do not set Content-Type header manually when using FormData;
      // the browser sets it automatically with the boundary.
      const response = await fetch("https://edb-website-7oxz.vercel.app/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSelectedFile(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to send message",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Network error. Please make sure the backend server is running.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative py-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Warm light background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-50 via-orange-50/30 to-amber-50/20" />

      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        {/* Section Header */}
        <PageHero 
          title="Get in touch" 
          subtitle="Contact Us"
        />

        {/* Contact Container */}
        <div className="grid lg:grid-cols-5 gap-8 bg-transparent rounded-3xl overflow-hidden">
          {/* Left Panel - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-8 sm:p-10 md:p-12 relative overflow-hidden"
          >
            {/* Light info cards - left column */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-semibold mb-2 text-gray-800">
                  Get in touch
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Have questions or ready to transform your contribution? Reach
                  out to us for submissions, collaborations, or queries.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-4 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Phone className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <p className="font-medium text-gray-900">
                          +91 9696148767
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-4 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Mail className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Email us
                        </p>
                        <p className="font-medium text-gray-900">
                          literaryedb@mmmut.ac.in
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-4 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Our location
                        </p>
                        <p className="font-medium text-gray-900">
                          MMMUT Campus, Gorakhpur, UP
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-6 rounded-xl overflow-hidden border border-orange-100 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.328676844447!2d83.41270707549926!3d26.88168437666672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991469f99999999%3A0xc6f6f6f6f6f6f6f6!2sMadan%20Mohan%20Malaviya%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1702000000000!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MMMUT Location"
                  ></iframe>
                </div>
              </div>

              <div className="mt-8 text-left">
                <p className="text-sm text-gray-500 italic">
                  "योगः कर्मसु कौशलम्"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-8 sm:p-10 md:p-12"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Regarding Article Submission..."
                  className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
              </motion.div>

              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={8}
                  className="w-full bg-gray-50 border border-gray-200 py-4 px-4 rounded-lg text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                ></textarea>
              </motion.div>

              {/* Image Upload Section - New Addition */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
                  Upload Attachment (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 cursor-pointer bg-linear-to-r from-orange-50 to-amber-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200 transition-colors text-sm font-medium"
                  >
                    <Upload className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-700">Choose File</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile ? (
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                      <span className="text-sm text-gray-700 truncate max-w-50">
                        {selectedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      No file selected
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-95"
                  whileHover={!isSubmitting ? { y: -2, scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

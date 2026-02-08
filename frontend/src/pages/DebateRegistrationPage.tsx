import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type DebateRegistrationData, registerForDebate } from '../services/debateService';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DebateRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<DebateRegistrationData>({
    fullName: '',
    branch: '',
    rollNo: '',
    contactNumber: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerForDebate(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        branch: '',
        rollNo: '',
        contactNumber: '',
        email: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-400 mb-8">
              You have successfully registered for the Annual Debate Competition. A confirmation email has been sent to your registered email address.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
            >
              Register Another
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Annual Debate Competition
            </h1>
            <p className="text-xl text-gray-400">
              Register now to showcase your oratory skills
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl"
          >
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="rollNo" className="block text-sm font-medium text-gray-400 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    required
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="University Roll No."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-400 mb-2">
                    Branch / Course
                  </label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Result e.g. B.Tech CSE"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-400 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="WhatsApp preferred"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Official email id"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DebateRegistrationPage;

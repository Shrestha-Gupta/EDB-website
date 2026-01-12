import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getEvents, getMyApplications } from "../../services/munApi";
import type { MunEvent, MunApplication } from "../../services/munApi";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import { Calendar, MapPin, Users, Clock, ArrowRight, CheckCircle } from "lucide-react";

const MunEventsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState<MunEvent[]>([]);
  const [applications, setApplications] = useState<MunApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (user && !user.isProfileComplete) {
      navigate("/mun/complete-profile");
      return;
    }

    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    try {
      const [eventsData, applicationsData] = await Promise.all([
        getEvents(),
        getMyApplications()
      ]);
      setEvents(eventsData);
      setApplications(applicationsData);
      
      // If no active events, redirect to dashboard
      if (eventsData.length === 0) {
        navigate("/mun/dashboard");
        return;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // On error, redirect to dashboard
      navigate("/mun/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const hasApplied = (eventId: string) => {
    return applications.some(app => app.event._id === eventId);
  };

  const getApplication = (eventId: string) => {
    return applications.find(app => app.event._id === eventId);
  };

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-700 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/mun" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            ← Back to MUN
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-4">
            Select Committee<span className="text-amber-600">.</span>
          </h1>
          <p className="text-stone-600 mt-2 max-w-xl mx-auto">
            Choose an MUN event to apply for. Your preferences from registration will be pre-filled.
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event, index) => {
              const applied = hasApplied(event._id);
              const application = getApplication(event._id);
              const deadlinePassed = new Date() > new Date(event.registrationDeadline);

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border shadow-lg ${
                    applied ? 'border-green-200' : 'border-stone-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-stone-900">{event.title}</h2>
                        {applied && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Applied
                          </span>
                        )}
                        {deadlinePassed && !applied && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Closed
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span>
                            {new Date(event.startDate).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short' 
                            })} - {new Date(event.endDate).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-amber-600" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span>
                            Deadline: {new Date(event.registrationDeadline).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Committees */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.committees?.map((committee, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200"
                          >
                            {committee.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:min-w-[160px]">
                      {applied ? (
                        <>
                          <div className={`text-center px-4 py-2 rounded-lg text-sm font-medium ${
                            application?.status === 'approved' ? 'bg-green-50 text-green-700' :
                            application?.status === 'rejected' ? 'bg-red-50 text-red-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            Status: {application?.status?.charAt(0).toUpperCase()}{application?.status?.slice(1)}
                          </div>
                          <Link
                            to="/mun/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition-colors text-sm"
                          >
                            View Dashboard
                          </Link>
                        </>
                      ) : deadlinePassed ? (
                        <div className="text-center px-4 py-2.5 bg-stone-100 text-stone-500 font-medium rounded-xl text-sm">
                          Registration Closed
                        </div>
                      ) : (
                        <Link
                          to={`/mun/apply/${event._id}`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg text-sm"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg text-center"
          >
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">No Active Events</h3>
            <p className="text-stone-600 mb-6 max-w-md mx-auto">
              There are no MUN events accepting applications at the moment. Please check back later or contact us for more information.
            </p>
            <Link
              to="/mun"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl transition-colors"
            >
              ← Back to MUN
            </Link>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/mun/dashboard"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            View My Dashboard →
          </Link>
          <span className="text-stone-300">|</span>
          <Link
            to="/mun/profile"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            View Full Profile →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MunEventsPage;

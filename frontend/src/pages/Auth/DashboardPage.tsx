import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import { EventRegistrationModal } from "../../components/EventRegistration";
import { getMyEventRegistrations, eventInfo, type EventType, type EventRegistration } from "../../services/eventsApi";
import { 
  User, 
  Mail, 
  LogOut, 
  Calendar, 
  BookOpen, 
  Users, 
  ArrowRight,
  Settings,
  Bell,
  FileText,
  Sparkles,
  Mic,
  PenTool,
  ScrollText,
  Globe,
  CheckCircle,
  Clock
} from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  
  // Event registration state
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [, setLoadingRegistrations] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fetch event registrations
  useEffect(() => {
    if (user) {
      fetchEventRegistrations();
    }
  }, [user]);

  const fetchEventRegistrations = async () => {
    try {
      const data = await getMyEventRegistrations();
      setEventRegistrations(data.registrations);
    } catch (error) {
      console.error('Failed to fetch event registrations:', error);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const getEventRegistrationStatus = (eventType: EventType) => {
    const reg = eventRegistrations.find(r => r.eventType === eventType);
    return reg;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/30 to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Quick action cards
  const quickActions = [
    {
      title: "Browse Events",
      description: "Explore upcoming literary events and workshops",
      icon: Calendar,
      link: "/events",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Publications",
      description: "Read our latest magazines and articles",
      icon: BookOpen,
      link: "/publications",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Canvas Gallery",
      description: "View creative works from our community",
      icon: Sparkles,
      link: "/canvas",
      color: "from-amber-400 to-amber-600",
    },
    {
      title: "Our Team",
      description: "Meet the editorial board members",
      icon: Users,
      link: "/team",
      color: "from-stone-500 to-stone-700",
    },
  ];

  // Recent activity placeholder
  const recentActivities = [
    { title: "New magazine issue released", date: "2 days ago", type: "publication" },
    { title: "Canvas submissions open", date: "5 days ago", type: "event" },
    { title: "Welcome to EDB!", date: "Just now", type: "welcome" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-50 via-orange-50/30 to-amber-50/20" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <ParticlesBackground />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900">
                Welcome back, <span className="text-amber-600">{user.name || "User"}</span>
                <span className="text-amber-600">.</span>
              </h1>
              <p className="text-stone-600 mt-2 text-lg">
                Here's what's happening with your account
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-600 hover:text-amber-600 hover:border-amber-300 transition-all shadow-sm"
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-600 hover:text-amber-600 hover:border-amber-300 transition-all shadow-sm"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all shadow-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-stone-200/50 shadow-xl"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900">
                    {user.name || "User"}
                  </h2>
                  <div className="flex items-center gap-2 text-stone-500 mt-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm md:text-base">{user.email}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {user.role === 'admin' ? '👑 Admin' : '✨ Member'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isProfileComplete 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {user.isProfileComplete ? '✓ Profile Complete' : '⚠ Complete Profile'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-stone-200/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${action.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-stone-900 mb-1">{action.title}</h4>
                      <p className="text-sm text-stone-500">{action.description}</p>
                      <div className="flex items-center text-amber-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Events Registration Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-4">🎭 Arunoday 2026 Events</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* MUN Event Card */}
                <Link to="/mun">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-stone-200/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-stone-800 to-stone-900 rounded-bl-[60px] opacity-10" />
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-stone-700 to-stone-900 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-stone-900 mb-1">MUN 2026</h4>
                    <p className="text-sm text-stone-500">Model United Nations</p>
                    <div className="flex items-center text-stone-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      Register <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.div>
                </Link>

                {/* Pralekh Event Card */}
                {(() => {
                  const reg = getEventRegistrationStatus('pralekh');
                  return (
                    <motion.div
                      onClick={() => setSelectedEvent('pralekh')}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-stone-200/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-amber-500 to-orange-500 rounded-bl-[60px] opacity-10" />
                      {reg && (
                        <div className="absolute top-3 right-3">
                          {reg.registrationStatus === 'submitted' ? (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Submitted
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Registered
                            </span>
                          )}
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <ScrollText className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-stone-900 mb-1">Pralekh</h4>
                      <p className="text-sm text-stone-500">Hindi Essay Writing</p>
                      <div className="flex items-center text-amber-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                        {reg ? 'View Status' : 'Register'} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Plotlines Event Card */}
                {(() => {
                  const reg = getEventRegistrationStatus('plotlines');
                  return (
                    <motion.div
                      onClick={() => setSelectedEvent('plotlines')}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-stone-200/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-500 rounded-bl-[60px] opacity-10" />
                      {reg && (
                        <div className="absolute top-3 right-3">
                          {reg.registrationStatus === 'submitted' ? (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Submitted
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Registered
                            </span>
                          )}
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <PenTool className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-stone-900 mb-1">Plotlines</h4>
                      <p className="text-sm text-stone-500">Creative Writing</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                        {reg ? 'View Status' : 'Register'} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Open Mic Event Card */}
                {(() => {
                  const reg = getEventRegistrationStatus('openmic');
                  return (
                    <motion.div
                      onClick={() => setSelectedEvent('openmic')}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-stone-200/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-bl-[60px] opacity-10" />
                      {reg && (
                        <div className="absolute top-3 right-3">
                          {reg.registrationStatus === 'submitted' ? (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Submitted
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Registered
                            </span>
                          )}
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <Mic className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-stone-900 mb-1">Open Mic</h4>
                      <p className="text-sm text-stone-500">Poetry & Performance</p>
                      <div className="flex items-center text-purple-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                        {reg ? 'View Status' : 'Register'} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-stone-200/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900">Recent Activity</h3>
                <FileText className="w-5 h-5 text-stone-400" />
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'welcome' ? 'bg-green-500' :
                      activity.type === 'event' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm text-stone-700">{activity.title}</p>
                      <p className="text-xs text-stone-400">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Completion */}
            {!user.isProfileComplete && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">Complete Profile</h3>
                    <p className="text-xs text-stone-500">Add more details</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 mb-4">
                  Complete your profile to unlock all features and personalized recommendations.
                </p>
                <div className="w-full bg-amber-200/50 rounded-full h-2 mb-4">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
                <Link
                  to="/profile"
                  className="block w-full py-2.5 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Complete Now
                </Link>
              </motion.div>
            )}

            {/* My Registrations Summary */}
            {eventRegistrations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-stone-200/50 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-stone-900">My Registrations</h3>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {eventRegistrations.length} event{eventRegistrations.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3">
                  {eventRegistrations.map((reg) => {
                    const info = eventInfo[reg.eventType];
                    return (
                      <div 
                        key={reg._id} 
                        className="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors"
                        onClick={() => setSelectedEvent(reg.eventType)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{info.icon}</span>
                          <div>
                            <p className="font-medium text-stone-900 text-sm">{info.name}</p>
                            <p className="text-xs text-stone-500 capitalize">{reg.registrationStatus}</p>
                          </div>
                        </div>
                        {reg.registrationStatus === 'submitted' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Arunoday Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-linear-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Arunoday 2026</h3>
                  <p className="text-xs text-stone-400">Annual Literary Festival</p>
                </div>
              </div>
              <p className="text-sm text-stone-300 mb-4">
                Register for our flagship events and showcase your literary talents!
              </p>
              <Link
                to="/arunoday-live"
                className="block w-full py-2.5 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Event Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          eventType={selectedEvent}
          onRegistrationComplete={fetchEventRegistrations}
        />
      )}
    </div>
  );
};

export default DashboardPage;

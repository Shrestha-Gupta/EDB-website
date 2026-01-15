import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { EventRegistrationModal } from "../../components/EventRegistration";
import { getMyEventRegistrations, type EventType, type EventRegistration } from "../../services/eventsApi";
// React Icons - Modern icon library
import { FiMail, FiLogOut, FiSettings, FiBell, FiArrowRight, FiCalendar, FiBook, FiImage, FiUsers } from "react-icons/fi";

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
      description: "Explore upcoming literary events ",
      icon: FiCalendar,
      link: "/events",
    },
    {
      title: "Publications",
      description: "Read our latest magazines and articles",
      icon: FiBook,
      link: "/publications",
    },
    {
      title: "Canvas Gallery",
      description: "View creative works from our community",
      icon: FiImage,
      link: "/canvas",
    },
    {
      title: "Our Team",
      description: "Meet the editorial board members",
      icon: FiUsers,
      link: "/team",
    },
  ];

  // Recent activity placeholder
  const recentActivities = [
    { title: "New magazine issue released", date: "2 days ago", type: "publication" },
    { title: "Canvas submissions open", date: "5 days ago", type: "event" },
    { title: "Welcome to EDB!", date: "Just now", type: "welcome" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg bg-amber-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-stone-900 mb-1">
                    {user.name || "User"}
                  </h2>
                  <div className="flex items-center gap-2 text-stone-600 mb-3">
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-stone-100 text-stone-700'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                    {user.isProfileComplete && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Profile Complete
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Admin-only buttons */}
              {user.role === 'admin' && (
                <>
                  <Link to="/admin">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium">
                      <FiSettings className="w-4 h-4" />
                      <span className="hidden sm:inline">Admin Panel</span>
                    </button>
                  </Link>
                  <Link to="/admin/user-info">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors font-medium">
                      <FiUsers className="w-4 h-4" />
                      <span className="hidden sm:inline">User Info</span>
                    </button>
                  </Link>
                </>
              )}
              <button className="px-4 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors">
                <FiBell className="w-5 h-5" />
              </button>
              <Link to="/profile">
                <button className="px-4 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors">
                  <FiSettings className="w-5 h-5" />
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

       
       

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-stone-900 mb-2"> Events</h3>
            <p className="text-stone-600">Register now and showcase your talents at MMMUT's premier literary and cultural fest</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {/* MUN Card */}
            <Link to="/mun/dashboard">
              <div className="bg-white rounded-lg overflow-hidden border-t-4 border-amber-500 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-stone-900">Model United Nations</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">OPEN</span>
                  </div>
                  <p className="text-amber-600 font-medium mb-4">Diplomatic Excellence</p>
                  <p className="text-stone-600 mb-6">
                    Step into the shoes of world leaders. Debate, negotiate, and make history.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 text-sm">Open to All Years</span>
                    <button className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">
                      Register <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
            {/* Arunoday Card */}
            <Link to="/arunoday-live">
              <div className="bg-white rounded-lg overflow-hidden border-t-4 border-amber-500 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-stone-900">Arunoday</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">OPEN</span>
                  </div>
                  <p className="text-amber-600 font-medium mb-4">Literary Extravaganza</p>
                  <p className="text-stone-600 mb-6">
                    Showcase your literary talents in Arunoday, the flagship event.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 text-sm">First year only</span>
                    <button className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">
                      Register <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Pralekh Card */}
            {(() => {
              const reg = getEventRegistrationStatus('pralekh');
              return (
                <div 
                  onClick={() => setSelectedEvent('pralekh')}
                  className="bg-white rounded-lg overflow-hidden border-t-4 border-amber-500 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-2xl font-bold text-stone-900">Pralekh</h4>
                      {reg ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          {reg.registrationStatus === 'submitted' ? 'SUBMITTED' : 'REGISTERED'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">OPEN</span>
                      )}
                    </div>
                    <p className="text-amber-600 font-medium mb-4">Newsletter Writing</p>
                    <p className="text-stone-600 mb-6">
                      Express your thoughts through compelling and creative newsletter writing.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 text-sm">Open to All Years</span>
                      <button className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">
                        {reg ? 'View Status' : 'Register'} <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Plotlines Card */}
            {(() => {
              const reg = getEventRegistrationStatus('plotlines');
              return (
                <div 
                  onClick={() => setSelectedEvent('plotlines')}
                  className="bg-white rounded-lg overflow-hidden border-t-4 border-amber-500 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-2xl font-bold text-stone-900">Plotlines</h4>
                      {reg ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          {reg.registrationStatus === 'submitted' ? 'SUBMITTED' : 'REGISTERED'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">OPEN</span>
                      )}
                    </div>
                    <p className="text-amber-600 font-medium mb-4">Creative Writing</p>
                    <p className="text-stone-600 mb-6">
                      Craft captivating stories and let your imagination run wild on paper.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 text-sm">Open to All Years</span>
                      <button className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">
                        {reg ? 'View Status' : 'Register'} <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Open Mic Card */}
            {(() => {
              const reg = getEventRegistrationStatus('openmic');
              return (
                <div 
                  onClick={() => setSelectedEvent('openmic')}
                  className="bg-white rounded-lg overflow-hidden border-t-4 border-amber-500 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-2xl font-bold text-stone-900">Open Mic</h4>
                      {reg ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          {reg.registrationStatus === 'submitted' ? 'SUBMITTED' : 'REGISTERED'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">OPEN</span>
                      )}
                    </div>
                    <p className="text-amber-600 font-medium mb-4">Poetry & Performance</p>
                    <p className="text-stone-600 mb-6">
                      Take the stage and share your voice through poetry, spoken word, or performance.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 text-sm">Open to All Years</span>
                      <button className="px-6 py-2 border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2">
                        {reg ? 'View Status' : 'Register'} <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </motion.div>


         {/* Quick Actions */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-stone-900 mb-6">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <div className="bg-white rounded-lg border border-stone-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-white mb-4">
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">{action.title}</h4>
                  <p className="text-sm text-stone-600 mb-4">{action.description}</p>
                  <div className="flex items-center text-amber-600 text-sm font-medium">
                    Explore <FiArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Sidebar */}
        {eventRegistrations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-6">Recent Activity</h3>
            <div className="grid gap-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-lg border border-stone-200 p-4 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'welcome' ? 'bg-green-500' :
                    activity.type === 'event' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">{activity.title}</p>
                    <p className="text-xs text-stone-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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

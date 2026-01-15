import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getEvents,
  getAllApplications,
  allotApplication,
  updateApplicationStatus,
  createEvent,
  getAllUsers,
  assignCountryToUser,
} from "../../services/munApi";
import type { MunEvent, MunApplication, MunUser } from "../../services/munApi";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

const MunAdminPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"applications" | "events" | "users">("applications");
  const [events, setEvents] = useState<MunEvent[]>([]);
  const [applications, setApplications] = useState<MunApplication[]>([]);
  const [users, setUsers] = useState<MunUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Allotment modal state
  const [allotmentModal, setAllotmentModal] = useState<{
    open: boolean;
    application: MunApplication | null;
  }>({ open: false, application: null });
  const [allotmentData, setAllotmentData] = useState({
    committee: "",
    country: "",
    agenda: "",
    notes: "",
  });

  // Create event modal state
  const [createEventModal, setCreateEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    venue: "",
    registrationDeadline: "",
    committees: [{ name: "", description: "", agenda: "", countries: [], maxDelegates: 30 }],
  });

  // Country assignment modal state (for Registrations tab)
  const [countryAssignModal, setCountryAssignModal] = useState<{
    open: boolean;
    user: MunUser | null;
  }>({ open: false, user: null });
  const [assignCountry, setAssignCountry] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/mun/login");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/mun/dashboard");
      return;
    }

    fetchData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchApplications();
    }
  }, [selectedEvent, statusFilter]);

  const fetchData = async () => {
    try {
      const [eventsData, usersData] = await Promise.all([getEvents(), getAllUsers()]);
      setEvents(eventsData);
      setUsers(usersData);
      await fetchApplications();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const filters: { eventId?: string; status?: string } = {};
      if (selectedEvent) filters.eventId = selectedEvent;
      if (statusFilter) filters.status = statusFilter;
      const data = await getAllApplications(filters);
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const handleStatusUpdate = async (appId: string, status: "approved" | "rejected") => {
    try {
      await updateApplicationStatus(appId, status);
      await fetchApplications();
      alert(`Application ${status}`);
    } catch (error: any) {
      alert(error.message || "Failed to update status");
    }
  };

  const handleAllot = async () => {
    if (!allotmentModal.application) return;

    try {
      await allotApplication(allotmentModal.application._id, allotmentData);
      setAllotmentModal({ open: false, application: null });
      setAllotmentData({ committee: "", country: "", agenda: "", notes: "" });
      await fetchApplications();
      alert("Allotment successful!");
    } catch (error: any) {
      alert(error.message || "Allotment failed");
    }
  };

  const handleCreateEvent = async () => {
    try {
      await createEvent(newEvent as any);
      setCreateEventModal(false);
      await fetchData();
      alert("Event created successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to create event");
    }
  };

  const handleAssignCountry = async () => {
    if (!countryAssignModal.user || !assignCountry.trim()) {
      alert("Please enter a country name");
      return;
    }
    try {
      await assignCountryToUser(
        countryAssignModal.user._id,
        assignCountry,
        countryAssignModal.user.preferredCommittee || 'UNHRC'
      );
      setCountryAssignModal({ open: false, user: null });
      setAssignCountry("");
      await fetchData();
      alert("Country assigned successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to assign country");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      allotted: "bg-blue-100 text-blue-700",
    };
    return styles[status] || styles.pending;
  };

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
              Admin Panel<span className="text-amber-600">.</span>
            </h1>
            <p className="text-stone-600 mt-1">Manage MUN events and applications</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/mun"
              className="px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50"
            >
              ← Back to MUN
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "applications"
                ? "bg-amber-600 text-white"
                : "bg-white text-stone-700 border border-stone-300"
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "users"
                ? "bg-amber-600 text-white"
                : "bg-white text-stone-700 border border-stone-300"
            }`}
          >
            Registrations ({users.filter(u => u.preferredCommittee).length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "events"
                ? "bg-amber-600 text-white"
                : "bg-white text-stone-700 border border-stone-300"
            }`}
          >
            Events ({events.length})
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
              >
                <option value="">All Events</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="allotted">Allotted</option>
              </select>
            </div>

            {/* UNHRC Section */}
            <div className="border border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-blue-800">UNHRC - United Nations Human Rights Council</h3>
                  <p className="text-sm text-blue-600">
                    {applications.filter(a => a.preferredCommittee === 'UNHRC').length} participants
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {applications
                  .filter(app => app.preferredCommittee === 'UNHRC')
                  .map((app) => (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {app.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-stone-600 text-sm">{app.user.email} | {app.user.phone}</p>
                        <p className="text-stone-500 text-sm">{app.user.college} - {app.user.branch} ({app.user.year})</p>
                        
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-blue-500 text-xs uppercase mb-1">Experience Level</p>
                            <p className="font-semibold text-stone-900 capitalize">{app.experienceLevel || 'N/A'}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-blue-500 text-xs uppercase mb-1">Attended MUN Before</p>
                            <p className="font-semibold text-stone-900">{app.hasAttendedMun ? '✅ Yes' : '❌ No'}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-blue-500 text-xs uppercase mb-1">Country Preferences</p>
                            <p className="font-semibold text-stone-900">{app.countryPreferences?.filter(c => c).join(", ") || "None"}</p>
                          </div>
                        </div>
                        
                        {app.status === "allotted" && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm border border-green-200">
                            <p><strong>Allotted:</strong> {app.allottedCommittee} - {app.allottedCountry}</p>
                            <p><strong>Agenda:</strong> {app.allottedAgenda}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {app.status === "pending" && (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, "approved")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">Approve</button>
                            <button onClick={() => handleStatusUpdate(app._id, "rejected")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Reject</button>
                          </>
                        )}
                        {app.status === "approved" && (
                          <button onClick={() => setAllotmentModal({ open: true, application: app })} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">🌍 Allot Country</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {applications.filter(a => a.preferredCommittee === 'UNHRC').length === 0 && (
                  <p className="text-center text-stone-500 py-4">No UNHRC participants found</p>
                )}
              </div>
            </div>

            {/* IP Section */}
            <div className="border border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <h3 className="font-semibold text-purple-800">IP - International Press</h3>
                  <p className="text-sm text-purple-600">
                    {applications.filter(a => a.preferredCommittee === 'IP').length} participants
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {applications
                  .filter(app => app.preferredCommittee === 'IP')
                  .map((app) => (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {app.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-stone-600 text-sm">{app.user.email} | {app.user.phone}</p>
                        <p className="text-stone-500 text-sm">{app.user.college} - {app.user.branch} ({app.user.year})</p>
                        
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-purple-500 text-xs uppercase mb-1">Experience Level</p>
                            <p className="font-semibold text-stone-900 capitalize">{app.experienceLevel || 'N/A'}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-purple-500 text-xs uppercase mb-1">Attended MUN Before</p>
                            <p className="font-semibold text-stone-900">{app.hasAttendedMun ? '✅ Yes' : '❌ No'}</p>
                          </div>
                        </div>
                        
                        {app.status === "allotted" && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm border border-green-200">
                            <p><strong>Allotted:</strong> {app.allottedCommittee} - {app.allottedRole || 'Press Member'}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {app.status === "pending" && (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, "approved")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">Approve</button>
                            <button onClick={() => handleStatusUpdate(app._id, "rejected")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Reject</button>
                          </>
                        )}
                        {app.status === "approved" && (
                          <button onClick={() => setAllotmentModal({ open: true, application: app })} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">📰 Assign Role</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {applications.filter(a => a.preferredCommittee === 'IP').length === 0 && (
                  <p className="text-center text-stone-500 py-4">No International Press participants found</p>
                )}
              </div>
            </div>

            {applications.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
                <p className="text-stone-600">No applications found</p>
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <button
              onClick={() => setCreateEventModal(true)}
              className="mb-6 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700"
            >
              + Create New Event
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-xl p-6 border border-stone-200 shadow-lg">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{event.title}</h3>
                  <p className="text-stone-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="text-sm text-stone-500 space-y-1">
                    <p>📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
                    <p>📍 {event.venue}</p>
                    <p>⏰ Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</p>
                    <p>📋 {event.committees.length} Committees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab - MUN Registrations by Committee */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-stone-600">Total registered users: <strong>{users.length}</strong></p>
                <p className="text-sm text-stone-500">
                  UNHRC: {users.filter(u => u.preferredCommittee === 'UNHRC').length} | 
                  IP: {users.filter(u => u.preferredCommittee === 'IP').length} |
                  Unselected: {users.filter(u => !u.preferredCommittee).length}
                </p>
              </div>
            </div>

            {/* UNHRC Registrations Section */}
            <div className="border border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-blue-800">UNHRC - United Nations Human Rights Council</h3>
                  <p className="text-sm text-blue-600">
                    {users.filter(u => u.preferredCommittee === 'UNHRC').length} registered users
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Country Preferences</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Assigned Country</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Experience</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Position Paper</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {users.filter(u => u.preferredCommittee === 'UNHRC').map((u) => (
                      <tr key={u._id} className="hover:bg-blue-50/30">
                        <td className="px-4 py-3 text-sm text-stone-900 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.phone}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.countryPreferences?.filter(c => c).join(', ') || '-'}</td>
                        <td className="px-4 py-3 text-sm">
                          {u.allottedCountry ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              🌍 {u.allottedCountry}
                            </span>
                          ) : (
                            <span className="text-stone-400">Not assigned</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.experienceLevel === 'advanced' ? 'bg-green-100 text-green-700' :
                            u.experienceLevel === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {u.experienceLevel || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {u.positionPaperUrl ? (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                u.positionPaperStatus === 'approved' ? 'bg-green-100 text-green-700' :
                                u.positionPaperStatus === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                u.positionPaperStatus === 'under_review' ? 'bg-purple-100 text-purple-700' :
                                u.positionPaperStatus === 'revision_requested' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {u.positionPaperStatus === 'submitted' ? '📄 Submitted' :
                                 u.positionPaperStatus === 'approved' ? '✅ Approved' :
                                 u.positionPaperStatus === 'under_review' ? '🔍 Review' :
                                 u.positionPaperStatus === 'revision_requested' ? '📝 Revision' :
                                 u.positionPaperStatus || 'Uploaded'}
                              </span>
                              <a
                                href={u.positionPaperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
                              >
                                View
                              </a>
                            </div>
                          ) : (
                            <span className="text-stone-400">Not submitted</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => {
                              setCountryAssignModal({ open: true, user: u });
                              setAssignCountry(u.allottedCountry || '');
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              u.allottedCountry 
                                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {u.allottedCountry ? '🔄 Change' : '🌍 Assign'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.filter(u => u.preferredCommittee === 'UNHRC').length === 0 && (
                  <p className="text-center text-stone-500 py-6">No UNHRC registrations yet</p>
                )}
              </div>
            </div>

            {/* IP Registrations Section */}
            <div className="border border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">📰</span>
                <div>
                  <h3 className="font-semibold text-purple-800">IP - International Press</h3>
                  <p className="text-sm text-purple-600">
                    {users.filter(u => u.preferredCommittee === 'IP').length} registered users
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">College</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Experience</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Position Paper</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {users.filter(u => u.preferredCommittee === 'IP').map((u) => (
                      <tr key={u._id} className="hover:bg-purple-50/30">
                        <td className="px-4 py-3 text-sm text-stone-900 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.phone}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.college}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.experienceLevel === 'advanced' ? 'bg-green-100 text-green-700' :
                            u.experienceLevel === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {u.experienceLevel || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {u.positionPaperUrl ? (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                u.positionPaperStatus === 'approved' ? 'bg-green-100 text-green-700' :
                                u.positionPaperStatus === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                u.positionPaperStatus === 'under_review' ? 'bg-purple-100 text-purple-700' :
                                u.positionPaperStatus === 'revision_requested' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {u.positionPaperStatus === 'submitted' ? '📄 Submitted' :
                                 u.positionPaperStatus === 'approved' ? '✅ Approved' :
                                 u.positionPaperStatus === 'under_review' ? '🔍 Review' :
                                 u.positionPaperStatus === 'revision_requested' ? '📝 Revision' :
                                 u.positionPaperStatus || 'Uploaded'}
                              </span>
                              <a
                                href={u.positionPaperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700"
                              >
                                View
                              </a>
                            </div>
                          ) : (
                            <span className="text-stone-400">Not submitted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.filter(u => u.preferredCommittee === 'IP').length === 0 && (
                  <p className="text-center text-stone-500 py-6">No International Press registrations yet</p>
                )}
              </div>
            </div>

            {/* Unselected Users */}
            {users.filter(u => !u.preferredCommittee).length > 0 && (
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-50 px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">❓</span>
                  <div>
                    <h3 className="font-semibold text-stone-800">No Committee Selected</h3>
                    <p className="text-sm text-stone-600">
                      {users.filter(u => !u.preferredCommittee).length} users haven't selected a committee
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-50/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">College</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {users.filter(u => !u.preferredCommittee).map((u) => (
                        <tr key={u._id} className="hover:bg-stone-50">
                          <td className="px-4 py-3 text-sm text-stone-900 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{u.college}</td>
                          <td className="px-4 py-3 text-sm text-stone-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Allotment Modal */}
      {allotmentModal.open && allotmentModal.application && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Allot Country & Committee</h3>
            <p className="text-stone-600 text-sm mb-4">
              Allotting for: <strong>{allotmentModal.application.user.name}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Committee</label>
                <input
                  type="text"
                  value={allotmentData.committee}
                  onChange={(e) => setAllotmentData({ ...allotmentData, committee: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  placeholder="e.g., UNGA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
                <input
                  type="text"
                  value={allotmentData.country}
                  onChange={(e) => setAllotmentData({ ...allotmentData, country: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  placeholder="e.g., India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Agenda</label>
                <input
                  type="text"
                  value={allotmentData.agenda}
                  onChange={(e) => setAllotmentData({ ...allotmentData, agenda: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  placeholder="e.g., Climate Change"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Notes (optional)</label>
                <textarea
                  value={allotmentData.notes}
                  onChange={(e) => setAllotmentData({ ...allotmentData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAllotmentModal({ open: false, application: null })}
                className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAllot}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-semibold"
              >
                Allot
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Event Modal */}
      {createEventModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Create New Event</h3>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Venue</label>
                <input
                  type="text"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Registration Deadline</label>
                <input
                  type="date"
                  value={newEvent.registrationDeadline}
                  onChange={(e) => setNewEvent({ ...newEvent, registrationDeadline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCreateEventModal(false)}
                className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-semibold"
              >
                Create Event
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Country Assignment Modal */}
      {countryAssignModal.open && countryAssignModal.user && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Assign Country</h3>
            <p className="text-stone-600 text-sm mb-2">
              Assigning for: <strong>{countryAssignModal.user.name}</strong>
            </p>
            <p className="text-stone-500 text-xs mb-4">
              Their preferences: {countryAssignModal.user.countryPreferences?.filter(c => c).join(', ') || 'None specified'}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
                <input
                  type="text"
                  value={assignCountry}
                  onChange={(e) => setAssignCountry(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  placeholder="e.g., India, USA, Germany"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setCountryAssignModal({ open: false, user: null });
                  setAssignCountry("");
                }}
                className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignCountry}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold"
              >
                Assign Country
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MunAdminPage;

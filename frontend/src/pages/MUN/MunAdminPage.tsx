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
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
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
            Users ({users.length})
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
          <div>
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

            {/* Applications List */}
            <div className="space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-stone-200 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-stone-600 text-sm">{app.user.email} | {app.user.phone}</p>
                      <p className="text-stone-500 text-sm">{app.user.college} - {app.user.branch} ({app.user.year})</p>
                      
                      {/* Preferences Section */}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-stone-50 p-3 rounded-lg">
                          <p className="text-stone-500 text-xs uppercase mb-1">Preferred Committee</p>
                          <p className="font-semibold text-stone-900">{app.preferredCommittee || app.committeePreferences?.[0] || 'N/A'}</p>
                        </div>
                        <div className="bg-stone-50 p-3 rounded-lg">
                          <p className="text-stone-500 text-xs uppercase mb-1">Experience Level</p>
                          <p className="font-semibold text-stone-900 capitalize">{app.experienceLevel || 'N/A'}</p>
                        </div>
                        <div className="bg-stone-50 p-3 rounded-lg">
                          <p className="text-stone-500 text-xs uppercase mb-1">Attended MUN Before</p>
                          <p className="font-semibold text-stone-900">{app.hasAttendedMun ? '✅ Yes' : '❌ No'}</p>
                        </div>
                        <div className="bg-stone-50 p-3 rounded-lg">
                          <p className="text-stone-500 text-xs uppercase mb-1">Country Preferences</p>
                          <p className="font-semibold text-stone-900">{app.countryPreferences?.filter(c => c).join(", ") || "None"}</p>
                        </div>
                      </div>
                      
                      {app.agendaPreferences && (
                        <div className="mt-2 text-sm">
                          <p className="text-stone-500">Agenda Interest: <span className="text-stone-700">{app.agendaPreferences}</span></p>
                        </div>
                      )}
                      
                      {app.previousMunExperience && (
                        <div className="mt-2 text-sm">
                          <p className="text-stone-500">Previous Experience: <span className="text-stone-700">{app.previousMunExperience}</span></p>
                        </div>
                      )}
                      
                      <div className="mt-2 text-sm">
                        <p><strong>Event:</strong> {app.event.title}</p>
                      </div>
                      
                      {app.status === "allotted" && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                          <p><strong>Allotted:</strong> {app.allottedCommittee} - {app.allottedCountry}</p>
                          <p><strong>Agenda:</strong> {app.allottedAgenda}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "approved")}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "rejected")}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.status === "approved" && (
                        <button
                          onClick={() => {
                            setAllotmentModal({ open: true, application: app });
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                        >
                          Allot Country
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {applications.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
                  <p className="text-stone-600">No applications found</p>
                </div>
              )}
            </div>
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

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="mb-6">
              <p className="text-stone-600">Total registered users: <strong>{users.length}</strong></p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">College</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Branch</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Year</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-stone-700">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-stone-50">
                        <td className="px-4 py-3 text-sm text-stone-900 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.phone}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.college}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.branch}</td>
                        <td className="px-4 py-3 text-sm text-stone-600">{u.year}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-stone-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-stone-600">No registered users found</p>
                </div>
              )}
            </div>
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
    </div>
  );
};

export default MunAdminPage;

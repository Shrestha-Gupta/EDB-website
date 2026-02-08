import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiChevronDown, FiChevronUp, FiFile, FiDownload, FiCalendar, FiUsers, FiBook, FiGlobe, FiLogOut, FiCheck, FiX } from "react-icons/fi";
import {
  getAllEventRegistrations,
  updateEventRegistration,
  getArunodayRegistrations,
  updateArunodayStatus,
  getAllUsers,
  exportEventRegistrations,
  exportArunodayRegistrations,
  exportMunRegistrations,
  type EventRegistration,
  type ArunodayRegistration,
  type MunUser,
  getAllDebateRegistrations,
  type DebateRegistrationData,
} from "../../services/adminApi";

type TabType = "users" | "events" | "arunoday" | "debate" | "mun";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [loading, setLoading] = useState(true);

  // Data states
  const [users, setUsers] = useState<MunUser[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [arunodayRegistrations, setArunodayRegistrations] = useState<ArunodayRegistration[]>([]);
  const [debateRegistrations, setDebateRegistrations] = useState<DebateRegistrationData[]>([]);
  
  // Filters
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      navigate("/mun/login");
      return;
    }
    fetchData();
  }, [user, navigate, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, eventsData, arunodayData, debateData] = await Promise.all([
        getAllUsers(),
        getAllEventRegistrations(),
        getArunodayRegistrations(),
        getAllDebateRegistrations(),
      ]);
      setUsers(usersData);
      setEventRegistrations(eventsData.registrations);
      setArunodayRegistrations(arunodayData);
      setDebateRegistrations(debateData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventStatusUpdate = async (
    id: string,
    status: string,
    remarks?: string
  ) => {
    try {
      await updateEventRegistration(id, status, remarks);
      fetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleArunodayStatusUpdate = async (
    id: string,
    status: "pending" | "approved" | "rejected",
    remarks?: string
  ) => {
    try {
      await updateArunodayStatus(id, status, remarks);
      fetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };



  const filteredUsers = users.filter((u) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.college.toLowerCase().includes(query)
    );
  });

  const filteredArunoday = arunodayRegistrations.filter((reg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reg.teamName.toLowerCase().includes(query) ||
      reg.teamLeaderName.toLowerCase().includes(query) ||
      reg.teamLeaderEmail.toLowerCase().includes(query)
    );
  });

  const filteredDebate = debateRegistrations.filter((reg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reg.fullName.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.rollNo.toLowerCase().includes(query)
    );
  });

  const tabs = [
    { id: "users" as TabType, label: "Users", count: users.length },
    { id: "events" as TabType, label: "Events", count: eventRegistrations.length },
    { id: "arunoday" as TabType, label: "Arunoday", count: arunodayRegistrations.length },
    { id: "debate" as TabType, label: "Debate", count: debateRegistrations.length },
    { id: "mun" as TabType, label: "MUN", count: null },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-700 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-stone-600 mt-1">
              Welcome, {user?.name || "Admin"}
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-stone-300 hover:border-red-500 hover:text-red-600 text-stone-700 rounded-lg transition-colors font-medium shadow-sm"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900 mb-1">{users.length}</p>
            <p className="text-stone-600 text-sm">Total Users</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900 mb-1">
              {eventRegistrations.length}
            </p>
            <p className="text-stone-600 text-sm">Event Registrations</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiBook className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900 mb-1">
              {arunodayRegistrations.length}
            </p>
            <p className="text-stone-600 text-sm">Arunoday Teams</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <span className="text-2xl">🎤</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-900 mb-1">
              {debateRegistrations.length}
            </p>
            <p className="text-stone-600 text-sm">Debate Registrations</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiGlobe className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <Link
              to="/mun/admin"
              className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
            >
              Manage MUN →
            </Link>
            <p className="text-stone-600 text-sm mt-1">MUN Dashboard</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Link
              to="/admin/user-info"
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
            >
              User Info →
            </Link>
            <p className="text-stone-600 text-sm mt-1">Comprehensive User Data</p>
          </motion.div>

          {/* Certificate Generator Card */}
          <motion.div
            className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm"
            whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <span className="text-2xl">📜</span>
              </div>
            </div>
            <Link
              to="/admin/certificates"
              className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
            >
              Certificates →
            </Link>
            <p className="text-stone-600 text-sm mt-1">Bulk Certificate Generator</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-stone-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "mun") {
                    navigate("/mun/admin");
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex-1 min-w-max px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="bg-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-stone-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              {activeTab === "events" && (
                <>
                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="all">All Events</option>
                    <option value="pralekh">Pralekh</option>
                    <option value="plotlines">Plotlines</option>
                    <option value="openmic">Open Mic</option>
                  </select>
                  <button
                    onClick={() => exportEventRegistrations(eventFilter !== 'all' ? eventFilter : undefined)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export CSV
                  </button>
                </>
              )}
              {activeTab === "arunoday" && (
                <button
                  onClick={() => exportArunodayRegistrations()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <FiDownload className="w-4 h-4" />
                  Export CSV
                </button>
              )}
              {activeTab === "users" && (
                <button
                  onClick={() => exportMunRegistrations()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <FiDownload className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Users Tab */}
              {activeTab === "users" && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            College
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Branch
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Year
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Role
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr
                            key={u._id}
                            className="border-b border-stone-100 hover:bg-stone-50"
                          >
                            <td className="py-3 px-4 font-medium text-stone-900">
                              {u.name || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {u.email}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {u.phone || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {u.college || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {u.branch || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {u.year || "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  u.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-stone-100 text-stone-700"
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                      <p className="text-center text-stone-500 py-8">
                        No users found
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Events Tab */}
              {activeTab === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Pralekh Section */}
                  <div className="border border-stone-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                          <FiFile className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900">Pralekh - Newsletter Writing</h3>
                          <p className="text-sm text-stone-600">
                            {eventRegistrations.filter(r => r.eventType === 'pralekh').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Team</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Submission</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'pralekh')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <>
                              <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                                <td className="py-3 px-4">
                                  <button 
                                    onClick={() => toggleRowExpansion(reg._id)}
                                    className="p-1 hover:bg-stone-200 rounded"
                                  >
                                    {expandedRows.has(reg._id) ? <FiChevronUp /> : <FiChevronDown />}
                                  </button>
                                </td>
                                <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                                <td className="py-3 px-4 text-stone-600">{reg.email}</td>
                                <td className="py-3 px-4 text-stone-600">{reg.teamName || "-"}</td>
                                <td className="py-3 px-4">
                                  {reg.submissionUrl ? (
                                    <a href={reg.submissionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                      <FiFile className="text-sm" />
                                      <span className="text-xs">View PDF</span>
                                    </a>
                                  ) : (
                                    <span className="text-stone-400 text-xs">Not submitted</span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reg.registrationStatus === "approved" ? "bg-green-100 text-green-700" :
                                    reg.registrationStatus === "rejected" ? "bg-red-100 text-red-700" :
                                    reg.registrationStatus === "submitted" ? "bg-blue-100 text-blue-700" :
                                    "bg-amber-100 text-amber-700"
                                  }`}>
                                    {reg.registrationStatus}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "approved")} 
                                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                      title="Approve"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "rejected")} 
                                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                      title="Reject"
                                    >
                                      <FiX className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {expandedRows.has(reg._id) && (
                                <tr key={`${reg._id}-details`} className="bg-amber-50/50">
                                  <td colSpan={7} className="px-4 py-4">
                                    <div className="space-y-4">
                                      {/* Submission Details */}
                                      <div className="bg-white rounded-lg p-4 border border-amber-100">
                                        <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                                          <FiFile className="text-amber-600" /> Submission Details
                                        </h4>
                                        {reg.submissionUrl ? (
                                          <div className="space-y-2">
                                            <div className="flex items-center gap-4 text-sm">
                                              <span className="text-stone-500">Title:</span>
                                              <span className="font-medium text-stone-800">{reg.title || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                              <span className="text-stone-500">Description:</span>
                                              <span className="text-stone-700">{reg.description || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                              <span className="text-stone-500">File:</span>
                                              <span className="text-stone-700">{reg.submissionFileName || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                              <span className="text-stone-500">Submitted:</span>
                                              <span className="text-stone-700 flex items-center gap-1">
                                                <FiCalendar className="text-xs" />
                                                {reg.submissionDate ? new Date(reg.submissionDate).toLocaleString() : "N/A"}
                                              </span>
                                            </div>
                                            <a 
                                              href={reg.submissionUrl} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors"
                                            >
                                              <FiDownload /> Download PDF
                                            </a>
                                          </div>
                                        ) : (
                                          <p className="text-stone-500 text-sm">No submission yet</p>
                                        )}
                                      </div>

                                      {/* Team Members */}
                                      {reg.teamMembers && reg.teamMembers.length > 0 && (
                                        <div className="bg-white rounded-lg p-4 border border-amber-100">
                                          <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                                            <FiUsers className="text-amber-600" /> Team Members ({reg.teamMembers.length})
                                          </h4>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {reg.teamMembers.map((member, idx) => (
                                              <div key={idx} className="p-3 bg-stone-50 rounded-lg text-sm">
                                                <p className="font-medium text-stone-800">{member.name}</p>
                                                <p className="text-stone-600">{member.email}</p>
                                                <p className="text-stone-500">{member.college} • {member.branch} • {member.year}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                      {eventRegistrations.filter(r => r.eventType === 'pralekh').length === 0 && (
                        <p className="text-center text-stone-500 py-4">No Pralekh registrations</p>
                      )}
                    </div>
                  </div>

                  {/* Plotlines Section */}
                  <div className="border border-stone-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FiBook className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900">Plotlines - Creative Writing</h3>
                          <p className="text-sm text-stone-600">
                            {eventRegistrations.filter(r => r.eventType === 'plotlines').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Submission</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'plotlines')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <>
                              <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                                <td className="py-3 px-4">
                                  <button 
                                    onClick={() => toggleRowExpansion(reg._id)}
                                    className="p-1 hover:bg-stone-200 rounded"
                                  >
                                    {expandedRows.has(reg._id) ? <FiChevronUp /> : <FiChevronDown />}
                                  </button>
                                </td>
                                <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                                <td className="py-3 px-4 text-stone-600">{reg.email}</td>
                                <td className="py-3 px-4">
                                  {reg.submissionUrl ? (
                                    <a href={reg.submissionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                      <FiFile className="text-sm" />
                                      <span className="text-xs">View PDF</span>
                                    </a>
                                  ) : (
                                    <span className="text-stone-400 text-xs">Not submitted</span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reg.registrationStatus === "approved" ? "bg-green-100 text-green-700" :
                                    reg.registrationStatus === "rejected" ? "bg-red-100 text-red-700" :
                                    reg.registrationStatus === "submitted" ? "bg-blue-100 text-blue-700" :
                                    "bg-amber-100 text-amber-700"
                                  }`}>
                                    {reg.registrationStatus}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "approved")} 
                                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                      title="Approve"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "rejected")} 
                                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                      title="Reject"
                                    >
                                      <FiX className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {expandedRows.has(reg._id) && (
                                <tr key={`${reg._id}-details`} className="bg-blue-50/50">
                                  <td colSpan={6} className="px-4 py-4">
                                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                                      <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                                        <FiFile className="text-blue-600" /> Submission Details
                                      </h4>
                                      {reg.submissionUrl ? (
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Title:</span>
                                            <span className="font-medium text-stone-800">{reg.title || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Description:</span>
                                            <span className="text-stone-700">{reg.description || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">File:</span>
                                            <span className="text-stone-700">{reg.submissionFileName || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Submitted:</span>
                                            <span className="text-stone-700 flex items-center gap-1">
                                              <FiCalendar className="text-xs" />
                                              {reg.submissionDate ? new Date(reg.submissionDate).toLocaleString() : "N/A"}
                                            </span>
                                          </div>
                                          <a 
                                            href={reg.submissionUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                          >
                                            <FiDownload /> Download PDF
                                          </a>
                                        </div>
                                      ) : (
                                        <p className="text-stone-500 text-sm">No submission yet</p>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                      {eventRegistrations.filter(r => r.eventType === 'plotlines').length === 0 && (
                        <p className="text-center text-stone-500 py-4">No Plotlines registrations</p>
                      )}
                    </div>
                  </div>

                  {/* Open Mic Section */}
                  <div className="border border-stone-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <FiCalendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900">Open Mic - Poetry & Performance</h3>
                          <p className="text-sm text-stone-600">
                            {eventRegistrations.filter(r => r.eventType === 'openmic').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Submission</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'openmic')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <>
                              <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                                <td className="py-3 px-4">
                                  <button 
                                    onClick={() => toggleRowExpansion(reg._id)}
                                    className="p-1 hover:bg-stone-200 rounded"
                                  >
                                    {expandedRows.has(reg._id) ? <FiChevronUp /> : <FiChevronDown />}
                                  </button>
                                </td>
                                <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                                <td className="py-3 px-4 text-stone-600">{reg.email}</td>
                                <td className="py-3 px-4">
                                  {reg.submissionUrl ? (
                                    <a href={reg.submissionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-600 hover:text-purple-800">
                                      <FiFile className="text-sm" />
                                      <span className="text-xs">View PDF</span>
                                    </a>
                                  ) : (
                                    <span className="text-stone-400 text-xs">Not submitted</span>
                                  )}
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reg.registrationStatus === "approved" ? "bg-green-100 text-green-700" :
                                    reg.registrationStatus === "rejected" ? "bg-red-100 text-red-700" :
                                    reg.registrationStatus === "submitted" ? "bg-blue-100 text-blue-700" :
                                    "bg-amber-100 text-amber-700"
                                  }`}>
                                    {reg.registrationStatus}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "approved")} 
                                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                      title="Approve"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleEventStatusUpdate(reg._id, "rejected")} 
                                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                      title="Reject"
                                    >
                                      <FiX className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {expandedRows.has(reg._id) && (
                                <tr key={`${reg._id}-details`} className="bg-purple-50/50">
                                  <td colSpan={6} className="px-4 py-4">
                                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                                      <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                                        <FiFile className="text-purple-600" /> Submission Details
                                      </h4>
                                      {reg.submissionUrl ? (
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Title:</span>
                                            <span className="font-medium text-stone-800">{reg.title || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Description:</span>
                                            <span className="text-stone-700">{reg.description || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">File:</span>
                                            <span className="text-stone-700">{reg.submissionFileName || "N/A"}</span>
                                          </div>
                                          <div className="flex items-center gap-4 text-sm">
                                            <span className="text-stone-500">Submitted:</span>
                                            <span className="text-stone-700 flex items-center gap-1">
                                              <FiCalendar className="text-xs" />
                                              {reg.submissionDate ? new Date(reg.submissionDate).toLocaleString() : "N/A"}
                                            </span>
                                          </div>
                                          <a 
                                            href={reg.submissionUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                                          >
                                            <FiDownload /> Download PDF
                                          </a>
                                        </div>
                                      ) : (
                                        <p className="text-stone-500 text-sm">No submission yet</p>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                      {eventRegistrations.filter(r => r.eventType === 'openmic').length === 0 && (
                        <p className="text-center text-stone-500 py-4">No Open Mic registrations</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Arunoday Tab */}
              {activeTab === "arunoday" && (
                <motion.div
                  key="arunoday"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Team Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Leader
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Members
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredArunoday.map((reg) => (
                          <tr
                            key={reg._id}
                            className="border-b border-stone-100 hover:bg-stone-50"
                          >
                            <td className="py-3 px-4 font-medium text-stone-900">
                              {reg.teamName}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.teamLeaderName}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.teamLeaderEmail}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.teamMembers.length + 1}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.eventCategory || "-"}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  reg.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : reg.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {reg.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleArunodayStatusUpdate(
                                      reg._id,
                                      "approved"
                                    )
                                  }
                                  className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                  title="Approve"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleArunodayStatusUpdate(
                                      reg._id,
                                      "rejected"
                                    )
                                  }
                                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                  title="Reject"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredArunoday.length === 0 && (
                      <p className="text-center text-stone-500 py-8">
                        No Arunoday registrations found
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Debate Tab */}
              {activeTab === "debate" && (
                <motion.div
                  key="debate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Roll No
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Branch
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-stone-600">
                            Phone
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDebate.map((reg, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-stone-100 hover:bg-stone-50"
                          >
                            <td className="py-3 px-4 font-medium text-stone-900">
                              {reg.fullName}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.rollNo}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.branch}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.email}
                            </td>
                            <td className="py-3 px-4 text-stone-600">
                              {reg.contactNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredDebate.length === 0 && (
                      <p className="text-center text-stone-500 py-8">
                        No Debate registrations found
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiUsers,
  FiCalendar,
  FiGlobe,
  FiBook,
  FiMic,
  FiFile,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiArrowLeft,
  FiSearch,
  FiUserX,
  FiGrid,
} from "react-icons/fi";
import {
  getAllUsersInfo,
  getEventRegistrations,
  getUnregisteredUsers,
  exportAllUsers,
  exportEventRegistrations,
  exportUnregisteredUsers,
  type UserInfo,
  type EventRegistrationsResponse,
  type UnregisteredUser,
} from "../../services/userInfoApi";

type TabType = "all-users" | "events" | "unregistered";
type EventSubTab = "mun" | "arunoday" | "pralekh" | "plotlines" | "openmic";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("all-users");
  const [activeEventTab, setActiveEventTab] = useState<EventSubTab>("mun");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Data states
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistrationsResponse | null>(null);
  const [unregisteredUsers, setUnregisteredUsers] = useState<UnregisteredUser[]>([]);

  // UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => {
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
      navigate("/dashboard");
      return;
    }
    fetchData();
  }, [user, navigate, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, eventsData, unregisteredData] = await Promise.all([
        getAllUsersInfo(),
        getEventRegistrations(),
        getUnregisteredUsers(),
      ]);
      setAllUsers(usersData.data);
      setEventRegistrations(eventsData);
      setUnregisteredUsers(unregisteredData.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: string) => {
    setExporting(true);
    try {
      if (type === "all-users") {
        await exportAllUsers();
      } else if (type === "unregistered") {
        await exportUnregisteredUsers();
      } else {
        await exportEventRegistrations(type);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  // Filter functions
  const filteredUsers = allUsers.filter((u) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.college.toLowerCase().includes(query)
    );
  });

  const filteredUnregistered = unregisteredUsers.filter((u) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.college.toLowerCase().includes(query)
    );
  });

  const tabs = [
    { id: "all-users" as TabType, label: "All Users", icon: FiUsers, count: allUsers.length },
    { id: "events" as TabType, label: "Event Registrations", icon: FiCalendar, count: null },
    { id: "unregistered" as TabType, label: "Unregistered", icon: FiUserX, count: unregisteredUsers.length },
  ];

  const eventTabs = [
    { id: "mun" as EventSubTab, label: "MUN", icon: FiGlobe, count: eventRegistrations?.mun?.count || 0 },
    { id: "arunoday" as EventSubTab, label: "Arunoday", icon: FiBook, count: eventRegistrations?.arunoday?.count || 0 },
    { id: "pralekh" as EventSubTab, label: "Pralekh", icon: FiFile, count: eventRegistrations?.pralekh?.count || 0 },
    { id: "plotlines" as EventSubTab, label: "Plotlines", icon: FiBook, count: eventRegistrations?.plotlines?.count || 0 },
    { id: "openmic" as EventSubTab, label: "Open Mic", icon: FiMic, count: eventRegistrations?.openmic?.count || 0 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-700 text-lg font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 bg-white hover:bg-stone-100 rounded-lg text-stone-600 transition-colors border border-stone-200 shadow-sm"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-stone-800">User Information</h1>
                <p className="text-stone-500 mt-1">
                  Comprehensive view of all users and registrations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium shadow-sm"
              >
                <FiGrid className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-lg transition-colors font-medium"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-stone-800">{allUsers.length}</p>
                <p className="text-stone-500 text-sm">Total Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-stone-800">
                  {(eventRegistrations?.mun?.count || 0) +
                    (eventRegistrations?.arunoday?.count || 0) +
                    (eventRegistrations?.pralekh?.count || 0) +
                    (eventRegistrations?.plotlines?.count || 0) +
                    (eventRegistrations?.openmic?.count || 0)}
                </p>
                <p className="text-stone-500 text-sm">Event Registrations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiGlobe className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-stone-800">{eventRegistrations?.mun?.count || 0}</p>
                <p className="text-stone-500 text-sm">MUN Delegates</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <FiUserX className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-stone-800">{unregisteredUsers.length}</p>
                <p className="text-stone-500 text-sm">Unregistered Users</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-stone-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-max px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== null && (
                  <span className="bg-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Event Sub-tabs */}
          {activeTab === "events" && (
            <div className="flex border-b border-stone-200 overflow-x-auto bg-stone-50">
              {eventTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveEventTab(tab.id)}
                  className={`flex-1 min-w-max px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeEventTab === tab.id
                      ? "text-amber-600 border-b-2 border-amber-500 bg-white"
                      : "text-stone-500 hover:text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  <span className="bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Search & Export Bar */}
          <div className="p-4 border-b border-stone-200 bg-stone-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 placeholder-stone-400 transition-all"
                />
              </div>
              <button
                onClick={() => {
                  if (activeTab === "all-users") handleExport("all-users");
                  else if (activeTab === "unregistered") handleExport("unregistered");
                  else handleExport(activeEventTab);
                }}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors font-medium shadow-sm"
              >
                <FiDownload className="w-4 h-4" />
                {exporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              {/* All Users Tab */}
              {activeTab === "all-users" && (
                <motion.div
                  key="all-users"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50">
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Phone</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">College</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Branch</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Year</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr key={u._id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-stone-800">{u.name || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.email}</td>
                            <td className="py-3 px-4 text-stone-600">{u.phone || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.college || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.branch || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.year || "N/A"}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  u.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-stone-200 text-stone-600"
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
                      <p className="text-center text-stone-500 py-8">No users found</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Event Registrations Tab */}
              {activeTab === "events" && eventRegistrations && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* MUN Registrations */}
                  {activeEventTab === "mun" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-semibold text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Delegate ID</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Committee</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Allotment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations.mun.registrations
                            .filter((r) => {
                              if (!searchQuery) return true;
                              const query = searchQuery.toLowerCase();
                              return (
                                r.user?.name?.toLowerCase().includes(query) ||
                                r.user?.email?.toLowerCase().includes(query)
                              );
                            })
                            .map((reg) => (
                              <>
                                <tr
                                  key={reg._id}
                                  className="border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer"
                                  onClick={() => toggleRowExpansion(reg._id)}
                                >
                                  <td className="py-3 px-4">
                                    <button className="p-1 hover:bg-stone-200 rounded">
                                      {expandedRows.has(reg._id) ? (
                                        <FiChevronUp className="text-stone-500" />
                                      ) : (
                                        <FiChevronDown className="text-stone-500" />
                                      )}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4 font-mono text-amber-600">{reg.delegateId}</td>
                                  <td className="py-3 px-4 font-medium text-stone-800">{reg.user?.name || "N/A"}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.user?.email || "N/A"}</td>
                                  <td className="py-3 px-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                      {reg.preferredCommittee}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`px-2 py-1 rounded text-xs font-medium ${
                                        reg.status === "allotted"
                                          ? "bg-green-100 text-green-700"
                                          : reg.status === "approved"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-amber-100 text-amber-700"
                                      }`}
                                    >
                                      {reg.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-stone-600">
                                    {reg.allottedCountry ? `${reg.allottedCountry}` : "Pending"}
                                  </td>
                                </tr>
                                {expandedRows.has(reg._id) && (
                                  <tr className="bg-amber-50">
                                    <td colSpan={7} className="px-4 py-4">
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Phone</p>
                                          <p className="text-stone-800">{reg.user?.phone || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">College</p>
                                          <p className="text-stone-800">{reg.user?.college || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Branch/Year</p>
                                          <p className="text-stone-800">
                                            {reg.user?.branch || "N/A"} - {reg.user?.year || "N/A"}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Experience</p>
                                          <p className="text-stone-800 capitalize">{reg.experienceLevel}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Country Preferences</p>
                                          <p className="text-stone-800">{reg.countryPreferences?.join(", ") || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Position Paper</p>
                                          <p className="text-stone-800 capitalize">{reg.positionPaperStatus?.replace(/_/g, " ")}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Allotted Committee</p>
                                          <p className="text-stone-800">{reg.allottedCommittee || "Pending"}</p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                        </tbody>
                      </table>
                      {eventRegistrations.mun.registrations.length === 0 && (
                        <p className="text-center text-stone-500 py-8">No MUN registrations</p>
                      )}
                    </div>
                  )}

                  {/* Arunoday Registrations */}
                  {activeEventTab === "arunoday" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-semibold text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Team Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Leader</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Language</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Members</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations.arunoday.registrations
                            .filter((r) => {
                              if (!searchQuery) return true;
                              const query = searchQuery.toLowerCase();
                              return (
                                r.teamName?.toLowerCase().includes(query) ||
                                r.teamLeaderName?.toLowerCase().includes(query) ||
                                r.teamLeaderEmail?.toLowerCase().includes(query)
                              );
                            })
                            .map((reg) => (
                              <>
                                <tr
                                  key={reg._id}
                                  className="border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer"
                                  onClick={() => toggleRowExpansion(reg._id)}
                                >
                                  <td className="py-3 px-4">
                                    <button className="p-1 hover:bg-stone-200 rounded">
                                      {expandedRows.has(reg._id) ? (
                                        <FiChevronUp className="text-stone-500" />
                                      ) : (
                                        <FiChevronDown className="text-stone-500" />
                                      )}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4 font-medium text-stone-800">{reg.teamName}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.teamLeaderName}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.teamLeaderEmail}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.preferredLanguage || "N/A"}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.teamMembers?.length || 0}</td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`px-2 py-1 rounded text-xs font-medium ${
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
                                </tr>
                                {expandedRows.has(reg._id) && (
                                  <tr className="bg-amber-50">
                                    <td colSpan={7} className="px-4 py-4">
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                          <div>
                                            <p className="text-stone-500 text-xs mb-1">Phone</p>
                                            <p className="text-stone-800">{reg.teamLeaderPhone || "N/A"}</p>
                                          </div>
                                          <div>
                                            <p className="text-stone-500 text-xs mb-1">Roll Number</p>
                                            <p className="text-stone-800">{reg.teamLeaderRollNumber}</p>
                                          </div>
                                          <div>
                                            <p className="text-stone-500 text-xs mb-1">Branch</p>
                                            <p className="text-stone-800">{reg.teamLeaderBranch}</p>
                                          </div>
                                        </div>
                                        {reg.teamMembers && reg.teamMembers.length > 0 && (
                                          <div>
                                            <p className="text-stone-500 text-xs mb-2">Team Members</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                              {reg.teamMembers.map((m, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-3 border border-stone-200">
                                                  <p className="text-stone-800 font-medium">{m.name}</p>
                                                  <p className="text-stone-500 text-xs">
                                                    {m.rollNumber} • {m.branch}
                                                  </p>
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
                      {eventRegistrations.arunoday.registrations.length === 0 && (
                        <p className="text-center text-stone-500 py-8">No Arunoday registrations</p>
                      )}
                    </div>
                  )}

                  {/* Pralekh, Plotlines, Open Mic */}
                  {(activeEventTab === "pralekh" ||
                    activeEventTab === "plotlines" ||
                    activeEventTab === "openmic") && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-semibold text-stone-600 w-8"></th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">College</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Submission</th>
                            <th className="text-left py-3 px-4 font-semibold text-stone-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations[activeEventTab].registrations
                            .filter((r) => {
                              if (!searchQuery) return true;
                              const query = searchQuery.toLowerCase();
                              return (
                                r.name?.toLowerCase().includes(query) ||
                                r.email?.toLowerCase().includes(query)
                              );
                            })
                            .map((reg) => (
                              <>
                                <tr
                                  key={reg._id}
                                  className="border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer"
                                  onClick={() => toggleRowExpansion(reg._id)}
                                >
                                  <td className="py-3 px-4">
                                    <button className="p-1 hover:bg-stone-200 rounded">
                                      {expandedRows.has(reg._id) ? (
                                        <FiChevronUp className="text-stone-500" />
                                      ) : (
                                        <FiChevronDown className="text-stone-500" />
                                      )}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4 font-medium text-stone-800">{reg.name}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.email}</td>
                                  <td className="py-3 px-4 text-stone-600">{reg.college || "N/A"}</td>
                                  <td className="py-3 px-4">
                                    {reg.submissionUrl ? (
                                      <a
                                        href={reg.submissionUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <FiFile className="w-4 h-4" />
                                        <span className="text-xs font-medium">View</span>
                                      </a>
                                    ) : (
                                      <span className="text-stone-400 text-xs">Not submitted</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`px-2 py-1 rounded text-xs font-medium ${
                                        reg.registrationStatus === "approved"
                                          ? "bg-green-100 text-green-700"
                                          : reg.registrationStatus === "submitted"
                                          ? "bg-blue-100 text-blue-700"
                                          : reg.registrationStatus === "rejected"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-amber-100 text-amber-700"
                                      }`}
                                    >
                                      {reg.registrationStatus}
                                    </span>
                                  </td>
                                </tr>
                                {expandedRows.has(reg._id) && (
                                  <tr className="bg-amber-50">
                                    <td colSpan={6} className="px-4 py-4">
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Phone</p>
                                          <p className="text-stone-800">{reg.phone || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Branch/Year</p>
                                          <p className="text-stone-800">
                                            {reg.branch || "N/A"} - {reg.year || "N/A"}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Title</p>
                                          <p className="text-stone-800">{reg.title || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-stone-500 text-xs mb-1">Team</p>
                                          <p className="text-stone-800">{reg.teamName || "Individual"}</p>
                                        </div>
                                        {reg.description && (
                                          <div className="col-span-2 md:col-span-4">
                                            <p className="text-stone-500 text-xs mb-1">Description</p>
                                            <p className="text-stone-800">{reg.description}</p>
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
                      {eventRegistrations[activeEventTab].registrations.length === 0 && (
                        <p className="text-center text-stone-500 py-8">
                          No {activeEventTab} registrations
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Unregistered Users Tab */}
              {activeTab === "unregistered" && (
                <motion.div
                  key="unregistered"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-50">
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Phone</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">College</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Branch</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Year</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-600">Profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUnregistered.map((u) => (
                          <tr
                            key={u._id}
                            className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium text-stone-800">{u.name || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.email}</td>
                            <td className="py-3 px-4 text-stone-600">{u.phone || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.college || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.branch || "N/A"}</td>
                            <td className="py-3 px-4 text-stone-600">{u.year || "N/A"}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  u.isProfileComplete
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {u.isProfileComplete ? "Complete" : "Incomplete"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUnregistered.length === 0 && (
                      <p className="text-center text-stone-500 py-8">No unregistered users found</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserInfoPage;

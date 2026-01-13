import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllEventRegistrations,
  updateEventRegistration,
  getArunodayRegistrations,
  updateArunodayStatus,
  getAllUsers,
  type EventRegistration,
  type ArunodayRegistration,
  type MunUser,
} from "../../services/adminApi";

type TabType = "users" | "events" | "arunoday" | "mun";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [loading, setLoading] = useState(true);

  // Data states
  const [users, setUsers] = useState<MunUser[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [arunodayRegistrations, setArunodayRegistrations] = useState<ArunodayRegistration[]>([]);
  
  // Filters
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/mun/login");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, eventsData, arunodayData] = await Promise.all([
        getAllUsers(),
        getAllEventRegistrations(),
        getArunodayRegistrations(),
      ]);
      setUsers(usersData);
      setEventRegistrations(eventsData.registrations);
      setArunodayRegistrations(arunodayData);
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

  const tabs = [
    { id: "users" as TabType, label: "Users", icon: "👥", count: users.length },
    { id: "events" as TabType, label: "Events", icon: "📅", count: eventRegistrations.length },
    { id: "arunoday" as TabType, label: "Arunoday", icon: "🎭", count: arunodayRegistrations.length },
    { id: "mun" as TabType, label: "MUN", icon: "🌍", count: null },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/30 to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-700 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-amber-50/30 to-orange-50/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Welcome, {user?.name || "Admin"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm"
          >
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-stone-900">{users.length}</p>
            <p className="text-stone-500 text-sm">Total Users</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm"
          >
            <div className="text-3xl mb-2">📅</div>
            <p className="text-2xl font-bold text-stone-900">
              {eventRegistrations.length}
            </p>
            <p className="text-stone-500 text-sm">Event Registrations</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm"
          >
            <div className="text-3xl mb-2">🎭</div>
            <p className="text-2xl font-bold text-stone-900">
              {arunodayRegistrations.length}
            </p>
            <p className="text-stone-500 text-sm">Arunoday Teams</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm"
          >
            <div className="text-3xl mb-2">🌍</div>
            <Link
              to="/mun/admin"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Open MUN Dashboard →
            </Link>
            <p className="text-stone-500 text-sm">Manage MUN</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
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
                className={`flex-1 min-w-max px-4 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50/50"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.count !== null && (
                  <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-stone-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              {activeTab === "events" && (
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Events</option>
                  <option value="pralekh">Pralekh</option>
                  <option value="plotlines">Plotlines</option>
                  <option value="openmic">Open Mic</option>
                </select>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
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
                  <div className="border border-amber-200 rounded-xl overflow-hidden">
                    <div className="bg-amber-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📜</span>
                        <div>
                          <h3 className="font-semibold text-amber-800">Pralekh - Newsletter Writing</h3>
                          <p className="text-sm text-amber-600">
                            {eventRegistrations.filter(r => r.eventType === 'pralekh').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Team</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'pralekh')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                              <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                              <td className="py-3 px-4 text-stone-600">{reg.email}</td>
                              <td className="py-3 px-4 text-stone-600">{reg.teamName || "-"}</td>
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
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "approved")} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">✓</button>
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "rejected")} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">✗</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {eventRegistrations.filter(r => r.eventType === 'pralekh').length === 0 && (
                        <p className="text-center text-stone-500 py-4">No Pralekh registrations</p>
                      )}
                    </div>
                  </div>

                  {/* Plotlines Section */}
                  <div className="border border-blue-200 rounded-xl overflow-hidden">
                    <div className="bg-blue-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✍️</span>
                        <div>
                          <h3 className="font-semibold text-blue-800">Plotlines - Creative Writing</h3>
                          <p className="text-sm text-blue-600">
                            {eventRegistrations.filter(r => r.eventType === 'plotlines').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'plotlines')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                              <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                              <td className="py-3 px-4 text-stone-600">{reg.email}</td>
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
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "approved")} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">✓</button>
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "rejected")} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">✗</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {eventRegistrations.filter(r => r.eventType === 'plotlines').length === 0 && (
                        <p className="text-center text-stone-500 py-4">No Plotlines registrations</p>
                      )}
                    </div>
                  </div>

                  {/* Open Mic Section */}
                  <div className="border border-purple-200 rounded-xl overflow-hidden">
                    <div className="bg-purple-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎤</span>
                        <div>
                          <h3 className="font-semibold text-purple-800">Open Mic - Poetry & Performance</h3>
                          <p className="text-sm text-purple-600">
                            {eventRegistrations.filter(r => r.eventType === 'openmic').length} registrations
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50">
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-stone-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations
                            .filter(reg => reg.eventType === 'openmic')
                            .filter(reg => !searchQuery || reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || reg.email.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((reg) => (
                            <tr key={reg._id} className="border-b border-stone-100 hover:bg-stone-50">
                              <td className="py-3 px-4 font-medium text-stone-900">{reg.name}</td>
                              <td className="py-3 px-4 text-stone-600">{reg.email}</td>
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
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "approved")} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">✓</button>
                                  <button onClick={() => handleEventStatusUpdate(reg._id, "rejected")} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">✗</button>
                                </div>
                              </td>
                            </tr>
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
                                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={() =>
                                    handleArunodayStatusUpdate(
                                      reg._id,
                                      "rejected"
                                    )
                                  }
                                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                                >
                                  ✗
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
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

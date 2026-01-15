import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getEvents,
  getAllApplications,
  allotApplicationEnhanced,
  updateApplicationStatus,
  updatePaymentStatus,
  updatePositionPaperStatus,
  lockAllotment,
  handleEditRequest,
  bulkLockAllotments,
  createEvent,
  getAllUsers,
} from "../../services/munApi";
import type { MunEvent, MunApplication, MunUser } from "../../services/munApi";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'allotted':
        return 'bg-blue-100 text-blue-700';
      case 'verified':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'under_review':
        return 'bg-purple-100 text-purple-700';
      case 'revision_requested':
        return 'bg-orange-100 text-orange-700';
      case 'not_submitted':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLabel = () => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      allotted: 'Allotted',
      verified: 'Verified',
      failed: 'Failed',
      submitted: 'Submitted',
      under_review: 'Under Review',
      revision_requested: 'Revision Required',
      not_submitted: 'Not Submitted',
      reassigned: 'Reassigned',
    };
    return labels[status] || status;
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStyles()}`}>
      {getLabel()}
    </span>
  );
};

const MunAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"allotments" | "papers" | "requests" | "events" | "users">("allotments");
  const [events, setEvents] = useState<MunEvent[]>([]);
  const [applications, setApplications] = useState<MunApplication[]>([]);
  const [users, setUsers] = useState<MunUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [committeeFilter, setCommitteeFilter] = useState<string>("");
  const [experienceFilter, setExperienceFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Allotment modal state
  const [allotmentModal, setAllotmentModal] = useState<{
    open: boolean;
    application: MunApplication | null;
  }>({ open: false, application: null });
  
  const [allotmentData, setAllotmentData] = useState({
    committee: "",
    country: "",
    agenda: "",
    role: "",
    committeeRoom: "",
    reportingTime: "",
    reportingDate: "",
    positionPaperDeadline: "",
    notes: "",
  });

  // Position Paper Review Modal
  const [paperReviewModal, setPaperReviewModal] = useState<{
    open: boolean;
    application: MunApplication | null;
  }>({ open: false, application: null });
  
  const [paperReviewData, setPaperReviewData] = useState({
    status: "" as 'approved' | 'revision_requested' | 'under_review',
    remarks: "",
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
    committees: [{ name: "", description: "", agenda: "", countries: [] as string[], maxDelegates: 30 }],
  });

  // Bulk operations - reserved for future use
  // const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/mun/login");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/mun/profile");
      return;
    }

    fetchData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchApplications();
    }
  }, [selectedEvent, statusFilter, committeeFilter, experienceFilter]);

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

  // Filter applications by committee preference and experience
  const filteredApplications = applications.filter(app => {
    if (committeeFilter && app.preferredCommittee !== committeeFilter) return false;
    if (experienceFilter && app.experienceLevel !== experienceFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        app.user.name.toLowerCase().includes(query) ||
        app.user.email.toLowerCase().includes(query) ||
        app.user.college.toLowerCase().includes(query) ||
        (app.delegateId && app.delegateId.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Get applications with edit requests pending
  const editRequests = applications.filter(app => app.editRequestPending);
  
  // Get applications with submitted position papers (any status except not_submitted)
  const positionPapers = applications.filter(app => 
    app.positionPaperUrl || 
    app.positionPaperStatus === 'submitted' || 
    app.positionPaperStatus === 'under_review' ||
    app.positionPaperStatus === 'approved' ||
    app.positionPaperStatus === 'revision_requested'
  );

  // Get users with position papers (direct uploads)
  const usersWithPapers = users.filter(u => 
    u.positionPaperUrl || 
    (u.positionPaperStatus && u.positionPaperStatus !== 'not_submitted')
  );

  const handleStatusUpdate = async (appId: string, status: "approved" | "rejected") => {
    try {
      await updateApplicationStatus(appId, status);
      await fetchApplications();
      alert(`Application ${status}`);
    } catch (error: any) {
      alert(error.message || "Failed to update status");
    }
  };

  const handlePaymentUpdate = async (appId: string, status: "pending" | "verified" | "failed") => {
    try {
      await updatePaymentStatus(appId, status);
      await fetchApplications();
      alert(`Payment status updated to ${status}`);
    } catch (error: any) {
      alert(error.message || "Failed to update payment status");
    }
  };

  const handleAllot = async () => {
    if (!allotmentModal.application) return;

    try {
      await allotApplicationEnhanced(allotmentModal.application._id, {
        committee: allotmentData.committee,
        country: allotmentData.country,
        agenda: allotmentData.agenda,
        role: allotmentData.role || undefined,
        committeeRoom: allotmentData.committeeRoom || undefined,
        reportingTime: allotmentData.reportingTime || undefined,
        reportingDate: allotmentData.reportingDate || undefined,
        positionPaperDeadline: allotmentData.positionPaperDeadline || undefined,
        notes: allotmentData.notes || undefined,
      });
      setAllotmentModal({ open: false, application: null });
      setAllotmentData({
        committee: "",
        country: "",
        agenda: "",
        role: "",
        committeeRoom: "",
        reportingTime: "",
        reportingDate: "",
        positionPaperDeadline: "",
        notes: "",
      });
      await fetchApplications();
      alert("Allotment successful!");
    } catch (error: any) {
      alert(error.message || "Allotment failed");
    }
  };

  const handleLockAllotment = async (appId: string, lock: boolean) => {
    try {
      await lockAllotment(appId, lock);
      await fetchApplications();
      alert(`Allotment ${lock ? 'locked' : 'unlocked'}`);
    } catch (error: any) {
      alert(error.message || "Failed to update lock status");
    }
  };

  const handleBulkLock = async (lock: boolean) => {
    if (!selectedEvent) {
      alert("Please select an event first");
      return;
    }
    try {
      const result = await bulkLockAllotments(selectedEvent, lock);
      await fetchApplications();
      alert(`${result.modifiedCount} allotments ${lock ? 'locked' : 'unlocked'}`);
    } catch (error: any) {
      alert(error.message || "Bulk operation failed");
    }
  };

  const handlePaperReview = async () => {
    if (!paperReviewModal.application || !paperReviewData.status) return;

    try {
      await updatePositionPaperStatus(
        paperReviewModal.application._id,
        paperReviewData.status,
        paperReviewData.remarks || undefined
      );
      setPaperReviewModal({ open: false, application: null });
      setPaperReviewData({ status: "" as any, remarks: "" });
      await fetchApplications();
      alert("Position paper status updated!");
    } catch (error: any) {
      alert(error.message || "Failed to update paper status");
    }
  };

  const handleEditRequestResponse = async (appId: string, approved: boolean, response?: string) => {
    try {
      await handleEditRequest(appId, approved, response);
      await fetchApplications();
      alert("Edit request handled");
    } catch (error: any) {
      alert(error.message || "Failed to handle edit request");
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

  // Statistics
  const stats = {
    totalApplications: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    allotted: applications.filter(a => a.status === 'allotted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    pendingPapers: positionPapers.length + usersWithPapers.length,
    editRequests: editRequests.length,
  };

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="bg-stone-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans text-stone-800">
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
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Admin Dashboard<span className="text-amber-600">.</span>
            </h1>
            <p className="text-stone-600 mt-1">Manage MUN applications, allotments & events</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
            <p className="text-xs text-stone-500 uppercase">Total</p>
            <p className="text-2xl font-bold text-stone-900">{stats.totalApplications}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-xs text-yellow-600 uppercase">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-xs text-green-600 uppercase">Approved</p>
            <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-xs text-blue-600 uppercase">Allotted</p>
            <p className="text-2xl font-bold text-blue-700">{stats.allotted}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="text-xs text-red-600 uppercase">Rejected</p>
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <p className="text-xs text-purple-600 uppercase">Papers</p>
            <p className="text-2xl font-bold text-purple-700">{stats.pendingPapers}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <p className="text-xs text-orange-600 uppercase">Edit Req.</p>
            <p className="text-2xl font-bold text-orange-700">{stats.editRequests}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'allotments', label: '🌍 Allotments', count: stats.approved + stats.allotted },
            { id: 'papers', label: '📄 Position Papers', count: stats.pendingPapers },
            { id: 'requests', label: '✏️ Edit Requests', count: stats.editRequests },
            { id: 'events', label: '📅 Events', count: events.length },
            { id: 'users', label: '👥 Users', count: users.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-stone-100'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Allotments Tab */}
        {activeTab === "allotments" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search by name, email, college, or delegate ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  />
                </div>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                >
                  <option value="">All Events</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>{event.title}</option>
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
                  <option value="allotted">Allotted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={committeeFilter}
                  onChange={(e) => setCommitteeFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                >
                  <option value="">All Committees</option>
                  <option value="UNHRC">UNHRC</option>
                  <option value="IP">International Press</option>
                </select>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                >
                  <option value="">All Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedEvent && (
                <div className="mt-4 pt-4 border-t border-stone-200 flex gap-2">
                  <button
                    onClick={() => handleBulkLock(true)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                  >
                    🔒 Lock All Allotments
                  </button>
                  <button
                    onClick={() => handleBulkLock(false)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100"
                  >
                    🔓 Unlock All Allotments
                  </button>
                </div>
              )}
            </div>

            {/* UNHRC Section */}
            <div className="border border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <h3 className="font-semibold text-blue-800">UNHRC - United Nations Human Rights Council</h3>
                    <p className="text-sm text-blue-600">
                      {filteredApplications.filter(a => a.preferredCommittee === 'UNHRC').length} participants
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {filteredApplications
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
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {app.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                            <p className="text-stone-500 text-xs">{app.delegateId || 'No ID'}</p>
                          </div>
                          <div className="flex gap-2 ml-auto">
                            <StatusBadge status={app.status} />
                            <StatusBadge status={app.paymentStatus} />
                            {app.allotmentLocked && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">🔒 Locked</span>}
                          </div>
                        </div>
                        <div className="text-sm text-stone-600 mb-3">
                          <p>{app.user.email} | {app.user.phone}</p>
                          <p>{app.user.college} - {app.user.branch} ({app.user.year})</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <p className="text-xs text-blue-500">Experience</p>
                            <p className="font-semibold capitalize">{app.experienceLevel}</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <p className="text-xs text-blue-500">Past MUN</p>
                            <p className="font-semibold">{app.hasAttendedMun ? 'Yes' : 'No'}</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-lg col-span-2">
                            <p className="text-xs text-blue-500">Country Preferences</p>
                            <p className="font-semibold text-xs">{app.countryPreferences?.filter(c => c).join(", ") || "None"}</p>
                          </div>
                        </div>
                        {app.status === "allotted" && (
                          <div className="bg-green-50 rounded-lg p-3 text-sm border border-green-200">
                            <p className="font-semibold text-green-900 mb-1">Allotment Details:</p>
                            <div className="grid grid-cols-3 gap-2">
                              <p><span className="text-green-600">Committee:</span> {app.allottedCommittee}</p>
                              <p><span className="text-green-600">Country:</span> {app.allottedCountry}</p>
                              <p><span className="text-green-600">Agenda:</span> {app.allottedAgenda || 'TBA'}</p>
                            </div>
                          </div>
                        )}
                        {/* Position Paper Section */}
                        {app.positionPaperUrl && (
                          <div className="bg-purple-50 rounded-lg p-3 text-sm border border-purple-200 mt-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-purple-900 mb-1">📄 Position Paper</p>
                                <div className="flex items-center gap-2">
                                  <StatusBadge status={app.positionPaperStatus} />
                                  <span className="text-xs text-purple-600">
                                    {app.positionPaperSubmittedAt 
                                      ? `Submitted: ${new Date(app.positionPaperSubmittedAt).toLocaleDateString()}`
                                      : ''}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <a
                                  href={app.positionPaperUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700"
                                >
                                  View
                                </a>
                                <a
                                  href={app.positionPaperUrl}
                                  download={`position_paper_${app.user.name.replace(/\s+/g, '_')}.pdf`}
                                  className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700"
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        {app.status === "pending" && (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, "approved")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">✓ Approve</button>
                            <button onClick={() => handleStatusUpdate(app._id, "rejected")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">✕ Reject</button>
                          </>
                        )}
                        {app.status === "approved" && (
                          <button onClick={() => { setAllotmentModal({ open: true, application: app }); setAllotmentData({ ...allotmentData, committee: app.preferredCommittee }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">🌍 Allot Country</button>
                        )}
                        {app.paymentStatus === "pending" && (
                          <div className="flex gap-1">
                            <button onClick={() => handlePaymentUpdate(app._id, "verified")} className="flex-1 px-2 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100">💰 Verify</button>
                            <button onClick={() => handlePaymentUpdate(app._id, "failed")} className="flex-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100">✕ Fail</button>
                          </div>
                        )}
                        {app.status === "allotted" && (
                          <button onClick={() => handleLockAllotment(app._id, !app.allotmentLocked)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${app.allotmentLocked ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>{app.allotmentLocked ? '🔓 Unlock' : '🔒 Lock'}</button>
                        )}
                        {app.status === "allotted" && !app.allotmentLocked && (
                          <button onClick={() => { setAllotmentModal({ open: true, application: app }); setAllotmentData({ committee: app.allottedCommittee || "", country: app.allottedCountry || "", agenda: app.allottedAgenda || "", role: app.allottedRole || "", committeeRoom: app.committeeRoom || "", reportingTime: app.reportingTime || "", reportingDate: app.reportingDate?.split('T')[0] || "", positionPaperDeadline: app.positionPaperDeadline?.split('T')[0] || "", notes: app.adminNotes || "" }); }} className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm font-semibold hover:bg-amber-100">🔄 Re-allot</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredApplications.filter(a => a.preferredCommittee === 'UNHRC').length === 0 && (
                  <p className="text-center text-stone-500 py-4">No UNHRC participants found</p>
                )}
              </div>
            </div>

            {/* IP Section */}
            <div className="border border-purple-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📰</span>
                  <div>
                    <h3 className="font-semibold text-purple-800">IP - International Press</h3>
                    <p className="text-sm text-purple-600">
                      {filteredApplications.filter(a => a.preferredCommittee === 'IP').length} participants
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {filteredApplications
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
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {app.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                            <p className="text-stone-500 text-xs">{app.delegateId || 'No ID'}</p>
                          </div>
                          <div className="flex gap-2 ml-auto">
                            <StatusBadge status={app.status} />
                            <StatusBadge status={app.paymentStatus} />
                            {app.allotmentLocked && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">🔒 Locked</span>}
                          </div>
                        </div>
                        <div className="text-sm text-stone-600 mb-3">
                          <p>{app.user.email} | {app.user.phone}</p>
                          <p>{app.user.college} - {app.user.branch} ({app.user.year})</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div className="bg-purple-50 p-2 rounded-lg">
                            <p className="text-xs text-purple-500">Experience</p>
                            <p className="font-semibold capitalize">{app.experienceLevel}</p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-lg">
                            <p className="text-xs text-purple-500">Past MUN</p>
                            <p className="font-semibold">{app.hasAttendedMun ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                        {app.status === "allotted" && (
                          <div className="bg-green-50 rounded-lg p-3 text-sm border border-green-200">
                            <p className="font-semibold text-green-900 mb-1">Allotment Details:</p>
                            <div className="grid grid-cols-2 gap-2">
                              <p><span className="text-green-600">Committee:</span> {app.allottedCommittee}</p>
                              <p><span className="text-green-600">Role:</span> {app.allottedRole || 'Press Member'}</p>
                            </div>
                          </div>
                        )}
                        {/* Position Paper Section */}
                        {app.positionPaperUrl && (
                          <div className="bg-purple-50 rounded-lg p-3 text-sm border border-purple-200 mt-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-purple-900 mb-1">📄 Position Paper</p>
                                <div className="flex items-center gap-2">
                                  <StatusBadge status={app.positionPaperStatus} />
                                  <span className="text-xs text-purple-600">
                                    {app.positionPaperSubmittedAt 
                                      ? `Submitted: ${new Date(app.positionPaperSubmittedAt).toLocaleDateString()}`
                                      : ''}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <a
                                  href={app.positionPaperUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700"
                                >
                                  View
                                </a>
                                <a
                                  href={app.positionPaperUrl}
                                  download={`position_paper_${app.user.name.replace(/\s+/g, '_')}.pdf`}
                                  className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700"
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        {app.status === "pending" && (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, "approved")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">✓ Approve</button>
                            <button onClick={() => handleStatusUpdate(app._id, "rejected")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">✕ Reject</button>
                          </>
                        )}
                        {app.status === "approved" && (
                          <button onClick={() => { setAllotmentModal({ open: true, application: app }); setAllotmentData({ ...allotmentData, committee: app.preferredCommittee }); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">📰 Assign Role</button>
                        )}
                        {app.paymentStatus === "pending" && (
                          <div className="flex gap-1">
                            <button onClick={() => handlePaymentUpdate(app._id, "verified")} className="flex-1 px-2 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100">💰 Verify</button>
                            <button onClick={() => handlePaymentUpdate(app._id, "failed")} className="flex-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100">✕ Fail</button>
                          </div>
                        )}
                        {app.status === "allotted" && (
                          <button onClick={() => handleLockAllotment(app._id, !app.allotmentLocked)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${app.allotmentLocked ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>{app.allotmentLocked ? '🔓 Unlock' : '🔒 Lock'}</button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredApplications.filter(a => a.preferredCommittee === 'IP').length === 0 && (
                  <p className="text-center text-stone-500 py-4">No International Press participants found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Position Papers Tab */}
        {activeTab === "papers" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-bold text-stone-900 mb-2">📄 Position Papers</h3>
                  <p className="text-stone-600 text-sm">Review and approve position papers submitted by delegates</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-stone-500">Filter:</span>
                  <select
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-sm focus:border-amber-500 outline-none"
                    onChange={(e) => {
                      const value = e.target.value;
                      // This is a client-side filter for the position papers display
                      const cards = document.querySelectorAll('[data-paper-status]');
                      cards.forEach((card) => {
                        const status = card.getAttribute('data-paper-status');
                        if (value === '' || status === value) {
                          (card as HTMLElement).style.display = '';
                        } else {
                          (card as HTMLElement).style.display = 'none';
                        }
                      });
                    }}
                  >
                    <option value="">All Papers</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="revision_requested">Revision Requested</option>
                  </select>
                </div>
              </div>
            </div>

            {positionPapers.length > 0 ? (
              positionPapers.map((app) => (
                <motion.div
                  key={app._id}
                  data-paper-status={app.positionPaperStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-stone-200 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                        <StatusBadge status={app.positionPaperStatus} />
                      </div>
                      <p className="text-stone-600 text-sm">{app.user.email}</p>
                      <p className="text-stone-500 text-sm">{app.user.college}</p>
                      
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-blue-50 p-2 rounded">
                          <p className="text-xs text-blue-600">Committee</p>
                          <p className="font-semibold">{app.allottedCommittee || 'N/A'}</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <p className="text-xs text-green-600">Country</p>
                          <p className="font-semibold">{app.allottedCountry || 'N/A'}</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="text-xs text-purple-600">Submitted</p>
                          <p className="font-semibold">
                            {app.positionPaperSubmittedAt 
                              ? new Date(app.positionPaperSubmittedAt).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                        <div className="bg-amber-50 p-2 rounded">
                          <p className="text-xs text-amber-600">File</p>
                          <p className="font-semibold text-xs truncate">
                            {app.positionPaperUrl ? '📄 PDF Uploaded' : 'No file'}
                          </p>
                        </div>
                      </div>

                      {app.positionPaperRemarks && (
                        <div className="mt-3 bg-stone-50 p-3 rounded">
                          <p className="text-xs text-stone-500 mb-1">Delegate's Remarks:</p>
                          <p className="text-sm text-stone-700">{app.positionPaperRemarks}</p>
                        </div>
                      )}

                      {app.positionPaperAdminRemarks && (
                        <div className="mt-3 bg-amber-50 p-3 rounded border border-amber-200">
                          <p className="text-xs text-amber-600 mb-1">Admin Remarks:</p>
                          <p className="text-sm text-stone-700">{app.positionPaperAdminRemarks}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[160px]">
                      {app.positionPaperUrl && (
                        <>
                          <a
                            href={app.positionPaperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 text-center"
                          >
                            📄 View Paper
                          </a>
                          <a
                            href={app.positionPaperUrl}
                            download={`position_paper_${app.user.name.replace(/\s+/g, '_')}.pdf`}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 text-center"
                          >
                            📥 Download
                          </a>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setPaperReviewModal({ open: true, application: app });
                        }}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700"
                      >
                        ✏️ Review
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : null}

            {/* User-based position papers (direct uploads) */}
            {usersWithPapers.length > 0 && (
              <>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 mt-6">
                  <h3 className="font-bold text-purple-900 mb-2">📄 Direct Uploads (No Application)</h3>
                  <p className="text-purple-600 text-sm">Position papers uploaded directly by users without MUN application</p>
                </div>
                {usersWithPapers.map((u) => (
                  <motion.div
                    key={u._id}
                    data-paper-status={u.positionPaperStatus}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 border border-purple-200 shadow-lg"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-stone-900">{u.name}</h3>
                          <StatusBadge status={u.positionPaperStatus || 'not_submitted'} />
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            Direct Upload
                          </span>
                        </div>
                        <p className="text-stone-600 text-sm">{u.email}</p>
                        <p className="text-stone-500 text-sm">{u.college}</p>
                        
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="text-xs text-blue-600">Committee</p>
                            <p className="font-semibold">{u.allottedCommittee || u.preferredCommittee || 'N/A'}</p>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <p className="text-xs text-green-600">Country</p>
                            <p className="font-semibold">{u.allottedCountry || 'N/A'}</p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded">
                            <p className="text-xs text-purple-600">Submitted</p>
                            <p className="font-semibold">
                              {u.positionPaperSubmittedAt 
                                ? new Date(u.positionPaperSubmittedAt).toLocaleDateString()
                                : 'N/A'}
                            </p>
                          </div>
                          <div className="bg-amber-50 p-2 rounded">
                            <p className="text-xs text-amber-600">File</p>
                            <p className="font-semibold text-xs truncate">
                              {u.positionPaperUrl ? '📄 PDF Uploaded' : 'No file'}
                            </p>
                          </div>
                        </div>

                        {u.positionPaperRemarks && (
                          <div className="mt-3 bg-stone-50 p-3 rounded">
                            <p className="text-xs text-stone-500 mb-1">User's Remarks:</p>
                            <p className="text-sm text-stone-700">{u.positionPaperRemarks}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 min-w-[160px]">
                        {u.positionPaperUrl && (
                          <>
                            <a
                              href={u.positionPaperUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 text-center"
                            >
                              📄 View Paper
                            </a>
                            <a
                              href={u.positionPaperUrl}
                              download={`position_paper_${u.name.replace(/\s+/g, '_')}.pdf`}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 text-center"
                            >
                              📥 Download
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {positionPapers.length === 0 && usersWithPapers.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
                <p className="text-stone-600">No position papers submitted yet</p>
              </div>
            )}
          </div>
        )}

        {/* Edit Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">✏️ Profile Edit Requests</h3>
              <p className="text-stone-600 text-sm">Review requests from delegates to update their profile information</p>
            </div>

            {editRequests.length > 0 ? (
              editRequests.map((app) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-orange-200 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-stone-900">{app.user.name}</h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          Edit Pending
                        </span>
                      </div>
                      <p className="text-stone-600 text-sm">{app.user.email}</p>
                      
                      <div className="mt-3 bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <p className="text-xs text-orange-600 mb-1 font-semibold">Request Message:</p>
                        <p className="text-stone-800">{app.editRequestMessage}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <button
                        onClick={() => handleEditRequestResponse(app._id, true, "Request approved. You can now contact admin for changes.")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleEditRequestResponse(app._id, false, "Request reviewed - no changes needed.")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                      >
                        ✕ Decline
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
                <p className="text-stone-600">No edit requests pending</p>
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
            </div>
          </div>
        )}
      </motion.div>

      {/* Allotment Modal */}
      <AnimatePresence>
        {allotmentModal.open && allotmentModal.application && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full my-8"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-2">🌍 Country & Committee Allotment</h3>
              <p className="text-stone-600 text-sm mb-4">
                Allotting for: <strong>{allotmentModal.application.user.name}</strong>
                <br />
                <span className="text-xs">Preferred: {allotmentModal.application.preferredCommittee} | Experience: {allotmentModal.application.experienceLevel}</span>
              </p>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Committee *</label>
                    <input
                      type="text"
                      value={allotmentData.committee}
                      onChange={(e) => setAllotmentData({ ...allotmentData, committee: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                      placeholder="e.g., UNHRC"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Country *</label>
                    <input
                      type="text"
                      value={allotmentData.country}
                      onChange={(e) => setAllotmentData({ ...allotmentData, country: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                      placeholder="e.g., India"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Agenda *</label>
                  <input
                    type="text"
                    value={allotmentData.agenda}
                    onChange={(e) => setAllotmentData({ ...allotmentData, agenda: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                    placeholder="e.g., Climate Change"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={allotmentData.role}
                      onChange={(e) => setAllotmentData({ ...allotmentData, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                      placeholder="e.g., Delegate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Committee Room</label>
                    <input
                      type="text"
                      value={allotmentData.committeeRoom}
                      onChange={(e) => setAllotmentData({ ...allotmentData, committeeRoom: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                      placeholder="e.g., Room 101"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Reporting Date</label>
                    <input
                      type="date"
                      value={allotmentData.reportingDate}
                      onChange={(e) => setAllotmentData({ ...allotmentData, reportingDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Reporting Time</label>
                    <input
                      type="time"
                      value={allotmentData.reportingTime}
                      onChange={(e) => setAllotmentData({ ...allotmentData, reportingTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Position Paper Deadline</label>
                  <input
                    type="date"
                    value={allotmentData.positionPaperDeadline}
                    onChange={(e) => setAllotmentData({ ...allotmentData, positionPaperDeadline: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Admin Notes</label>
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
                  className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAllot}
                  disabled={!allotmentData.committee || !allotmentData.country || !allotmentData.agenda}
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50"
                >
                  Allot
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Position Paper Review Modal */}
      <AnimatePresence>
        {paperReviewModal.open && paperReviewModal.application && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-2">📄 Review Position Paper</h3>
              <p className="text-stone-600 text-sm mb-4">
                Paper by: <strong>{paperReviewModal.application.user.name}</strong>
                <br />
                {paperReviewModal.application.allottedCommittee} - {paperReviewModal.application.allottedCountry}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'under_review', label: '🔍 Under Review' },
                      { value: 'approved', label: '✅ Approve' },
                      { value: 'revision_requested', label: '⚠️ Revision' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPaperReviewData({ ...paperReviewData, status: opt.value as any })}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          paperReviewData.status === opt.value
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Remarks for Delegate</label>
                  <textarea
                    value={paperReviewData.remarks}
                    onChange={(e) => setPaperReviewData({ ...paperReviewData, remarks: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none"
                    rows={3}
                    placeholder="Add feedback or revision notes..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setPaperReviewModal({ open: false, application: null })}
                  className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg font-semibold hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaperReview}
                  disabled={!paperReviewData.status}
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50"
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
      <AnimatePresence>
        {createEventModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
      </AnimatePresence>
    </div>
  );
};

export default MunAdminDashboard;

import express, { Response } from 'express';
import ExcelJS from 'exceljs';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';
import User from '../models/User';
import EventRegistration from '../models/EventRegistration';
import ArunodayRegistration from '../models/ArunodayRegistration';
import MunApplication from '../models/MunApplication';

const router = express.Router();

// Helper to format date
const formatDate = (date: Date | null | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString();
};

// @route   GET /api/admin/user-info/all-users
// @desc    Get all registered users with complete details
// @access  Private/Admin
router.get('/all-users', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    
    res.json({
      success: true,
      count: users.length,
      data: users.map((user: any) => ({
        _id: user._id,
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        college: user.college || '',
        branch: user.branch || '',
        year: user.year || '',
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        preferredCommittee: user.preferredCommittee || '',
        countryPreferences: user.countryPreferences || [],
        experienceLevel: user.experienceLevel || '',
        allottedCountry: user.allottedCountry || '',
        allottedCommittee: user.allottedCommittee || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch users' });
  }
});

// @route   GET /api/admin/user-info/event-registrations
// @desc    Get all event-specific registrations grouped by type
// @access  Private/Admin
router.get('/event-registrations', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Fetch MUN registrations - users who have selected UNHRC or IP as their committee
    const munUsers = await User.find({
      preferredCommittee: { $in: ['UNHRC', 'IP'] }
    }).sort({ createdAt: -1 }).lean();

    // Also fetch MUN applications to get additional details (allotment info, position papers)
    const munApplications = await MunApplication.find({}).lean();
    const applicationMap = new Map();
    munApplications.forEach((app: any) => {
      applicationMap.set(app.user.toString(), app);
    });

    // Merge user data with application data
    const munRegistrations = munUsers.map((user: any) => {
      const app = applicationMap.get(user._id.toString());
      return {
        _id: user._id,
        delegateId: app?.delegateId || `MUN-${user._id.toString().slice(-6).toUpperCase()}`,
        user: {
          _id: user._id,
          name: user.name || '',
          email: user.email,
          phone: user.phone || '',
          college: user.college || '',
          branch: user.branch || '',
          year: user.year || '',
        },
        preferredCommittee: user.preferredCommittee,
        countryPreferences: user.countryPreferences || [],
        experienceLevel: user.experienceLevel || '',
        agendaPreferences: user.agendaPreferences || '',
        hasAttendedMun: user.hasAttendedMun || false,
        previousMunExperience: user.previousMunExperience || '',
        status: app?.status || 'registered',
        allottedCommittee: user.allottedCommittee || app?.allottedCommittee || null,
        allottedCountry: user.allottedCountry || app?.allottedCountry || null,
        positionPaperStatus: user.positionPaperStatus || app?.positionPaperStatus || 'not_submitted',
        positionPaperUrl: user.positionPaperUrl || app?.positionPaperUrl || null,
        createdAt: user.createdAt,
      };
    });

    // Fetch Arunoday registrations
    const arunodayRegistrations = await ArunodayRegistration.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Fetch Event registrations (Pralekh, Plotlines, Open Mic)
    const eventRegistrations = await EventRegistration.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Group event registrations by type
    const pralekh = eventRegistrations.filter((r: any) => r.eventType === 'pralekh');
    const plotlines = eventRegistrations.filter((r: any) => r.eventType === 'plotlines');
    const openmic = eventRegistrations.filter((r: any) => r.eventType === 'openmic');

    res.json({
      success: true,
      data: {
        mun: {
          count: munRegistrations.length,
          registrations: munRegistrations,
        },
        arunoday: {
          count: arunodayRegistrations.length,
          registrations: arunodayRegistrations,
        },
        pralekh: {
          count: pralekh.length,
          registrations: pralekh,
        },
        plotlines: {
          count: plotlines.length,
          registrations: plotlines,
        },
        openmic: {
          count: openmic.length,
          registrations: openmic,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch event registrations' });
  }
});

// @route   GET /api/admin/user-info/unregistered-users
// @desc    Get users who have accounts but haven't registered for any event
// @access  Private/Admin
router.get('/unregistered-users', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get all users
    const allUsers = await User.find({}).lean();
    
    // Get user IDs who have registered for MUN (by checking if preferredCommittee is selected)
    const munRegisteredIds = await MunApplication.distinct('user');
    
    // Get user IDs who have registered for events
    const eventRegisteredIds = await EventRegistration.distinct('userId');
    
    // Get emails who have registered for Arunoday
    const arunodayRegistrations = await ArunodayRegistration.find({}).lean();
    const arunodayEmails = arunodayRegistrations.map((r: any) => r.teamLeaderEmail.toLowerCase());
    
    // Filter users who haven't registered for anything
    const unregisteredUsers = allUsers.filter((user: any) => {
      // Check MUN - user must have selected UNHRC or IP to be considered registered
      const hasSelectedMunCommittee = user.preferredCommittee === 'UNHRC' || user.preferredCommittee === 'IP';
      const hasAppliedMun = munRegisteredIds.some((id: any) => id.toString() === user._id.toString());
      
      // Check other events
      const hasRegisteredEvent = eventRegisteredIds.some((id: any) => id.toString() === user._id.toString());
      
      // Check Arunoday
      const hasRegisteredArunoday = arunodayEmails.includes(user.email.toLowerCase());
      
      // User is unregistered if they haven't done any of these
      return !hasSelectedMunCommittee && !hasAppliedMun && !hasRegisteredEvent && !hasRegisteredArunoday;
    });

    res.json({
      success: true,
      count: unregisteredUsers.length,
      data: unregisteredUsers.map((user: any) => ({
        _id: user._id,
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        college: user.college || '',
        branch: user.branch || '',
        year: user.year || '',
        isProfileComplete: user.isProfileComplete,
        createdAt: user.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching unregistered users:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch unregistered users' });
  }
});

// @route   GET /api/admin/user-info/export/all-users
// @desc    Export all users as Excel
// @access  Private/Admin
router.get('/export/all-users', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('All Users');

    // Set columns
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'College', key: 'college', width: 30 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'Year', key: 'year', width: 10 },
      { header: 'Role', key: 'role', width: 10 },
      { header: 'Profile Complete', key: 'isProfileComplete', width: 15 },
      { header: 'Preferred Committee', key: 'preferredCommittee', width: 20 },
      { header: 'Allotted Country', key: 'allottedCountry', width: 20 },
      { header: 'Allotted Committee', key: 'allottedCommittee', width: 20 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Add data
    users.forEach((user: any) => {
      worksheet.addRow({
        name: user.name || 'N/A',
        email: user.email,
        phone: user.phone || 'N/A',
        college: user.college || 'N/A',
        branch: user.branch || 'N/A',
        year: user.year || 'N/A',
        role: user.role,
        isProfileComplete: user.isProfileComplete ? 'Yes' : 'No',
        preferredCommittee: user.preferredCommittee || 'N/A',
        allottedCountry: user.allottedCountry || 'N/A',
        allottedCommittee: user.allottedCommittee || 'N/A',
        createdAt: formatDate(user.createdAt),
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=all_users.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    console.error('Error exporting users:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to export users' });
  }
});

// @route   GET /api/admin/user-info/export/event/:eventType
// @desc    Export specific event registrations as Excel
// @access  Private/Admin
router.get('/export/event/:eventType', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventType } = req.params;
    const workbook = new ExcelJS.Workbook();

    if (eventType === 'mun') {
      // Fetch MUN registrations - users who have selected UNHRC or IP
      const munUsers = await User.find({
        preferredCommittee: { $in: ['UNHRC', 'IP'] }
      }).sort({ createdAt: -1 }).lean();

      // Also fetch MUN applications for additional data
      const munApplications = await MunApplication.find({}).lean();
      const applicationMap = new Map();
      munApplications.forEach((app: any) => {
        applicationMap.set(app.user.toString(), app);
      });

      const worksheet = workbook.addWorksheet('MUN Registrations');
      worksheet.columns = [
        { header: 'Delegate ID', key: 'delegateId', width: 15 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'College', key: 'college', width: 30 },
        { header: 'Branch', key: 'branch', width: 15 },
        { header: 'Year', key: 'year', width: 10 },
        { header: 'Preferred Committee', key: 'preferredCommittee', width: 20 },
        { header: 'Country Preferences', key: 'countryPreferences', width: 30 },
        { header: 'Experience Level', key: 'experienceLevel', width: 15 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Allotted Committee', key: 'allottedCommittee', width: 18 },
        { header: 'Allotted Country', key: 'allottedCountry', width: 18 },
        { header: 'Position Paper Status', key: 'positionPaperStatus', width: 20 },
        { header: 'Created At', key: 'createdAt', width: 20 },
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' },
      };
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

      munUsers.forEach((user: any) => {
        const app = applicationMap.get(user._id.toString());
        worksheet.addRow({
          delegateId: app?.delegateId || `MUN-${user._id.toString().slice(-6).toUpperCase()}`,
          name: user.name || 'N/A',
          email: user.email || 'N/A',
          phone: user.phone || 'N/A',
          college: user.college || 'N/A',
          branch: user.branch || 'N/A',
          year: user.year || 'N/A',
          preferredCommittee: user.preferredCommittee || 'N/A',
          countryPreferences: (user.countryPreferences || []).join(', '),
          experienceLevel: user.experienceLevel || 'N/A',
          status: app?.status || 'registered',
          allottedCommittee: user.allottedCommittee || app?.allottedCommittee || 'N/A',
          allottedCountry: user.allottedCountry || app?.allottedCountry || 'N/A',
          positionPaperStatus: user.positionPaperStatus || app?.positionPaperStatus || 'not_submitted',
          createdAt: formatDate(user.createdAt),
        });
      });

      res.setHeader('Content-Disposition', 'attachment; filename=mun_registrations.xlsx');
    } else if (eventType === 'arunoday') {
      const registrations = await ArunodayRegistration.find({}).sort({ createdAt: -1 }).lean();

      const worksheet = workbook.addWorksheet('Arunoday Registrations');
      worksheet.columns = [
        { header: 'Team Name', key: 'teamName', width: 25 },
        { header: 'Leader Name', key: 'teamLeaderName', width: 25 },
        { header: 'Leader Email', key: 'teamLeaderEmail', width: 35 },
        { header: 'Leader Phone', key: 'teamLeaderPhone', width: 15 },
        { header: 'Leader Roll Number', key: 'teamLeaderRollNumber', width: 18 },
        { header: 'Leader Branch', key: 'teamLeaderBranch', width: 15 },
        { header: 'Preferred Language', key: 'preferredLanguage', width: 18 },
        { header: 'Event Category', key: 'eventCategory', width: 18 },
        { header: 'Team Members', key: 'teamMembers', width: 50 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Created At', key: 'createdAt', width: 20 },
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' },
      };
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

      registrations.forEach((reg: any) => {
        const teamMembersStr = (reg.teamMembers || [])
          .map((m: any) => `${m.name} (${m.rollNumber}, ${m.branch})`)
          .join('; ');
        worksheet.addRow({
          teamName: reg.teamName || 'N/A',
          teamLeaderName: reg.teamLeaderName || 'N/A',
          teamLeaderEmail: reg.teamLeaderEmail || 'N/A',
          teamLeaderPhone: reg.teamLeaderPhone || 'N/A',
          teamLeaderRollNumber: reg.teamLeaderRollNumber || 'N/A',
          teamLeaderBranch: reg.teamLeaderBranch || 'N/A',
          preferredLanguage: reg.preferredLanguage || 'N/A',
          eventCategory: reg.eventCategory || 'N/A',
          teamMembers: teamMembersStr || 'N/A',
          status: reg.status || 'N/A',
          createdAt: formatDate(reg.createdAt),
        });
      });

      res.setHeader('Content-Disposition', 'attachment; filename=arunoday_registrations.xlsx');
    } else {
      // Pralekh, Plotlines, Open Mic
      const registrations = await EventRegistration.find({ eventType })
        .sort({ createdAt: -1 })
        .lean();

      const worksheet = workbook.addWorksheet(`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Registrations`);
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'College', key: 'college', width: 30 },
        { header: 'Branch', key: 'branch', width: 15 },
        { header: 'Year', key: 'year', width: 10 },
        { header: 'Team Name', key: 'teamName', width: 20 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Description', key: 'description', width: 40 },
        { header: 'Submission URL', key: 'submissionUrl', width: 40 },
        { header: 'Status', key: 'registrationStatus', width: 15 },
        { header: 'Created At', key: 'createdAt', width: 20 },
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' },
      };
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

      registrations.forEach((reg: any) => {
        worksheet.addRow({
          name: reg.name || 'N/A',
          email: reg.email || 'N/A',
          phone: reg.phone || 'N/A',
          college: reg.college || 'N/A',
          branch: reg.branch || 'N/A',
          year: reg.year || 'N/A',
          teamName: reg.teamName || 'N/A',
          title: reg.title || 'N/A',
          description: reg.description || 'N/A',
          submissionUrl: reg.submissionUrl || 'N/A',
          registrationStatus: reg.registrationStatus || 'N/A',
          createdAt: formatDate(reg.createdAt),
        });
      });

      res.setHeader('Content-Disposition', `attachment; filename=${eventType}_registrations.xlsx`);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    console.error('Error exporting event registrations:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to export event registrations' });
  }
});

// @route   GET /api/admin/user-info/export/unregistered
// @desc    Export unregistered users as Excel
// @access  Private/Admin
router.get('/export/unregistered', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get all users
    const allUsers = await User.find({}).lean();
    
    // Get user IDs who have registered for MUN
    const munRegisteredIds = await MunApplication.distinct('user');
    
    // Get user IDs who have registered for events
    const eventRegisteredIds = await EventRegistration.distinct('userId');
    
    // Get emails who have registered for Arunoday
    const arunodayRegistrations = await ArunodayRegistration.find({}).lean();
    const arunodayEmails = arunodayRegistrations.map((r: any) => r.teamLeaderEmail.toLowerCase());
    
    // Filter unregistered users
    const unregisteredUsers = allUsers.filter((user: any) => {
      const hasSelectedMunCommittee = user.preferredCommittee === 'UNHRC' || user.preferredCommittee === 'IP';
      const hasAppliedMun = munRegisteredIds.some((id: any) => id.toString() === user._id.toString());
      const hasRegisteredEvent = eventRegisteredIds.some((id: any) => id.toString() === user._id.toString());
      const hasRegisteredArunoday = arunodayEmails.includes(user.email.toLowerCase());
      
      return !hasSelectedMunCommittee && !hasAppliedMun && !hasRegisteredEvent && !hasRegisteredArunoday;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Unregistered Users');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'College', key: 'college', width: 30 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'Year', key: 'year', width: 10 },
      { header: 'Profile Complete', key: 'isProfileComplete', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF6B35' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    unregisteredUsers.forEach((user: any) => {
      worksheet.addRow({
        name: user.name || 'N/A',
        email: user.email,
        phone: user.phone || 'N/A',
        college: user.college || 'N/A',
        branch: user.branch || 'N/A',
        year: user.year || 'N/A',
        isProfileComplete: user.isProfileComplete ? 'Yes' : 'No',
        createdAt: formatDate(user.createdAt),
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=unregistered_users.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    console.error('Error exporting unregistered users:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to export unregistered users' });
  }
});

export default router;

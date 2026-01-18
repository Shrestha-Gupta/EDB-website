import express, { Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import MunEvent from '../models/MunEvent';
import MunApplication from '../models/MunApplication';
import { protect, adminOnly, profileComplete, AuthRequest } from '../middleware/auth';
import { sendMunCountryAssignmentEmail, sendMunNewspaperAssignmentEmail } from '../utils/emailService';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for position paper uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// ==================== PUBLIC ROUTES ====================

// @route   GET /api/mun/events
// @desc    Get all active MUN events
// @access  Public
router.get('/events', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const events = await MunEvent.find({ isActive: true }).sort({ startDate: 1 });
    res.json({ events });
  } catch (error: any) {
    console.error('Get events error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch events' });
  }
});

// @route   GET /api/mun/events/:id
// @desc    Get single MUN event
// @access  Public
router.get('/events/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await MunEvent.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json({ event });
  } catch (error: any) {
    console.error('Get event error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch event' });
  }
});

// ==================== USER ROUTES ====================

// @route   POST /api/mun/apply
// @desc    Apply for a MUN event
// @access  Private (profile complete required)
router.post('/apply', protect, profileComplete, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // MUN Registrations are CLOSED
    res.status(400).json({ message: 'MUN registrations are now closed. Thank you for your interest.' });
    return;

    // Check if user already applied
    const userId = req.user!._id;
    const { 
      eventId, 
      preferredCommittee, 
      countryPreferences, 
      agendaPreferences, 
      experienceLevel, 
      hasAttendedMun, 
      previousMunExperience, 
      whyJoin 
    } = req.body;

    const existingApplication = await MunApplication.findOne({ user: userId, event: eventId });
    if (existingApplication) {
      res.status(400).json({ message: 'You have already applied for this event' });
      return;
    }

    // Create application
    const application = await MunApplication.create({
      user: userId,
      event: eventId,
      preferredCommittee,
      countryPreferences,
      agendaPreferences,
      experienceLevel,
      hasAttendedMun,
      previousMunExperience,
      whyJoin,
      committeePreferences: [preferredCommittee], // Legacy field
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error: any) {
    console.error('Application error:', error);
    res.status(500).json({ message: error.message || 'Application failed' });
  }
});

// @route   GET /api/mun/my-applications
// @desc    Get current user's applications
// @access  Private
router.get('/my-applications', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await MunApplication.find({ user: req.user!._id })
      .populate('event', 'title startDate endDate venue registrationDeadline')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch applications' });
  }
});

// @route   GET /api/mun/my-profile/:applicationId
// @desc    Get detailed profile/dashboard data for a specific application
// @access  Private
router.get('/my-profile/:applicationId', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await MunApplication.findOne({
      _id: req.params.applicationId,
      user: req.user!._id,
    })
      .populate('event', 'title startDate endDate venue registrationDeadline committees')
      .populate('user', 'name email phone college branch year');

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.json({ application });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch profile' });
  }
});

// @route   POST /api/mun/request-edit/:applicationId
// @desc    Request profile edit (sends request to admin)
// @access  Private
router.post('/request-edit/:applicationId', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    const application = await MunApplication.findOne({
      _id: req.params.applicationId,
      user: req.user!._id,
    });

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.editRequestPending = true;
    application.editRequestMessage = message || 'User requested profile edit';
    application.editRequestAt = new Date();
    await application.save();

    res.json({ message: 'Edit request submitted successfully' });
  } catch (error: any) {
    console.error('Edit request error:', error);
    res.status(500).json({ message: error.message || 'Failed to submit edit request' });
  }
});

// @route   POST /api/mun/final-confirmation/:applicationId
// @desc    Submit final confirmation for attendance
// @access  Private
router.post('/final-confirmation/:applicationId', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await MunApplication.findOne({
      _id: req.params.applicationId,
      user: req.user!._id,
    });

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    if (application.status !== 'allotted') {
      res.status(400).json({ message: 'You can only confirm after allotment' });
      return;
    }

    application.finalConfirmation = true;
    application.finalConfirmationAt = new Date();
    await application.save();

    res.json({ message: 'Final confirmation submitted successfully', application });
  } catch (error: any) {
    console.error('Final confirmation error:', error);
    res.status(500).json({ message: error.message || 'Failed to submit confirmation' });
  }
});

// @route   POST /api/mun/upload-position-paper/:applicationId
// @desc    Upload position paper for an application (stored in Cloudinary)
// @access  Private
router.post(
  '/upload-position-paper/:applicationId',
  protect,
  upload.single('positionPaper'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Position paper submissions are CLOSED
      res.status(400).json({ message: 'Position paper submissions are now closed. The deadline has passed.' });
      return;

      // Check if deadline has passed
      if (application.positionPaperDeadline && new Date() > application.positionPaperDeadline) {
        res.status(400).json({ message: 'Position paper submission deadline has passed' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'Please upload a PDF file' });
        return;
      }

      // Get remarks from body
      const { remarks } = req.body;

      // Upload to Cloudinary
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'mun-position-papers',
            public_id: `${req.user!._id}_${application._id}_${Date.now()}`,
            format: 'pdf',
          },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error('Upload failed'));
          }
        );
        uploadStream.end(req.file!.buffer);
      });

      // Update application with Cloudinary URL
      application.positionPaperUrl = uploadResult.secure_url;
      application.positionPaperSubmittedAt = new Date();
      application.positionPaperStatus = 'submitted';
      if (remarks) application.positionPaperRemarks = remarks;

      await application.save();

      res.json({
        message: 'Position paper uploaded successfully',
        positionPaperUrl: application.positionPaperUrl,
        submittedAt: application.positionPaperSubmittedAt,
        status: application.positionPaperStatus,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ message: error.message || 'Upload failed' });
    }
  }
);

// @route   POST /api/mun/upload-position-paper-direct
// @desc    Upload position paper directly to user profile (no application needed)
// @access  Private
router.post(
  '/upload-position-paper-direct',
  protect,
  upload.single('positionPaper'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Position paper submissions are CLOSED
      res.status(400).json({ message: 'Position paper submissions are now closed. The deadline has passed.' });
      return;

      if (!req.file) {
        res.status(400).json({ message: 'Please upload a PDF file' });
        return;
      }

      // Get remarks from body
      const { remarks } = req.body;

      // Upload to Cloudinary
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'mun-position-papers',
            public_id: `user_${req.user!._id}_${Date.now()}`,
            format: 'pdf',
          },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error('Upload failed'));
          }
        );
        uploadStream.end(req.file!.buffer);
      });

      // Update user with Cloudinary URL
      const user = req.user!;
      user.positionPaperUrl = uploadResult.secure_url;
      user.positionPaperSubmittedAt = new Date();
      user.positionPaperStatus = 'submitted';
      if (remarks) user.positionPaperRemarks = remarks;

      await user.save();

      res.json({
        message: 'Position paper uploaded successfully',
        positionPaperUrl: user.positionPaperUrl,
        submittedAt: user.positionPaperSubmittedAt,
        status: user.positionPaperStatus,
      });
    } catch (error: any) {
      console.error('Direct upload error:', error);
      res.status(500).json({ message: error.message || 'Upload failed' });
    }
  }
);


// ==================== ADMIN ROUTES ====================

// @route   GET /api/mun/admin/users
// @desc    Get all registered users
// @access  Admin only
router.get('/admin/users', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const User = (await import('../models/User')).default;
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch users' });
  }
});

// @route   PUT /api/mun/admin/users/:id/assign-country
// @desc    Assign country to a user
// @access  Admin only
router.put('/admin/users/:id/assign-country', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { country, committee } = req.body;
    const User = (await import('../models/User')).default;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        allottedCountry: country,
        allottedCommittee: committee || 'UNHRC'
      },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Send email notification to the participant (async, don't block response)
    if (country && user.email) {
      sendMunCountryAssignmentEmail({
        recipientEmail: user.email,
        recipientName: user.name || 'Delegate',
        country: country,
        committee: committee || 'UNHRC',
      }).then((emailSent) => {
        if (emailSent) {
          console.log(`Country assignment email sent successfully to ${user.email}`);
        } else {
          console.warn(`Failed to send country assignment email to ${user.email}`);
        }
      }).catch((err) => {
        console.error('Error sending country assignment email:', err);
      });
    }
    
    res.json({ message: 'Country assigned successfully', user });
  } catch (error: any) {
    console.error('Assign country error:', error);
    res.status(500).json({ message: error.message || 'Failed to assign country' });
  }
});

// @route   PUT /api/mun/admin/users/:id/assign-newspaper
// @desc    Assign newspaper company to an IP participant
// @access  Admin only
router.put('/admin/users/:id/assign-newspaper', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { newspaper } = req.body;
    const User = (await import('../models/User')).default;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        allottedNewspaper: newspaper,
        allottedCommittee: 'IP'
      },
      { new: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Send email notification to the participant (async, don't block response)
    if (newspaper && user.email) {
      sendMunNewspaperAssignmentEmail({
        recipientEmail: user.email,
        recipientName: user.name || 'Press Reporter',
        newspaper: newspaper,
      }).then((emailSent) => {
        if (emailSent) {
          console.log(`Newspaper assignment email sent successfully to ${user.email}`);
        } else {
          console.warn(`Failed to send newspaper assignment email to ${user.email}`);
        }
      }).catch((err) => {
        console.error('Error sending newspaper assignment email:', err);
      });
    }
    
    res.json({ message: 'Newspaper assigned successfully', user });
  } catch (error: any) {
    console.error('Assign newspaper error:', error);
    res.status(500).json({ message: error.message || 'Failed to assign newspaper' });
  }
});

// @route   POST /api/mun/admin/events
// @desc    Create a new MUN event
// @access  Admin only
router.post('/admin/events', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await MunEvent.create(req.body);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error: any) {
    console.error('Create event error:', error);
    res.status(500).json({ message: error.message || 'Failed to create event' });
  }
});

// @route   PUT /api/mun/admin/events/:id
// @desc    Update a MUN event
// @access  Admin only
router.put('/admin/events/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await MunEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json({ message: 'Event updated successfully', event });
  } catch (error: any) {
    console.error('Update event error:', error);
    res.status(500).json({ message: error.message || 'Failed to update event' });
  }
});

// @route   GET /api/mun/admin/applications
// @desc    Get all applications (optionally filter by event)
// @access  Admin only
router.get('/admin/applications', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.eventId) {
      filter.event = req.query.eventId;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const applications = await MunApplication.find(filter)
      .populate('user', 'name email phone college branch year')
      .populate('event', 'title')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch applications' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/allot
// @desc    Allot country and committee to an application
// @access  Admin only
router.put('/admin/applications/:id/allot', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      committee, 
      country, 
      agenda, 
      role, 
      committeeRoom, 
      reportingTime, 
      reportingDate,
      positionPaperDeadline,
      notes 
    } = req.body;

    const application = await MunApplication.findById(req.params.id).populate('user', 'name email');
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    // Check if allotment is locked
    if (application.allotmentLocked) {
      res.status(400).json({ message: 'Allotment is locked and cannot be modified' });
      return;
    }

    // Check if this is a new allotment (not a reassignment)
    const isNewAllotment = !application.allottedCountry;

    application.status = 'allotted';
    application.allotmentStatus = application.allottedCountry ? 'reassigned' : 'allotted';
    application.allottedCommittee = committee;
    application.allottedCountry = country;
    application.allottedAgenda = agenda;
    if (role) application.allottedRole = role;
    if (committeeRoom) application.committeeRoom = committeeRoom;
    if (reportingTime) application.reportingTime = reportingTime;
    if (reportingDate) application.reportingDate = new Date(reportingDate);
    if (positionPaperDeadline) application.positionPaperDeadline = new Date(positionPaperDeadline);
    if (notes) application.adminNotes = notes;

    await application.save();

    // Send email notification to the participant (async, don't block response)
    // Only send for new allotments, not reassignments
    const user = application.user as any;
    if (country && user && user.email && isNewAllotment) {
      sendMunCountryAssignmentEmail({
        recipientEmail: user.email,
        recipientName: user.name || 'Delegate',
        country: country,
        committee: committee || 'UNHRC',
      }).then((emailSent) => {
        if (emailSent) {
          console.log(`Country allotment email sent successfully to ${user.email}`);
        } else {
          console.warn(`Failed to send country allotment email to ${user.email}`);
        }
      }).catch((err) => {
        console.error('Error sending country allotment email:', err);
      });
    }

    res.json({ message: 'Allotment successful', application });
  } catch (error: any) {
    console.error('Allotment error:', error);
    res.status(500).json({ message: error.message || 'Allotment failed' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/lock-allotment
// @desc    Lock/unlock allotment for an application
// @access  Admin only
router.put('/admin/applications/:id/lock-allotment', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lock } = req.body;
    const application = await MunApplication.findById(req.params.id);
    
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.allotmentLocked = lock;
    application.allotmentLockedAt = lock ? new Date() : null;
    await application.save();

    res.json({ message: `Allotment ${lock ? 'locked' : 'unlocked'}`, application });
  } catch (error: any) {
    console.error('Lock allotment error:', error);
    res.status(500).json({ message: error.message || 'Failed to update lock status' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/payment-status
// @desc    Update payment verification status
// @access  Admin only
router.put('/admin/applications/:id/payment-status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { paymentStatus } = req.body;
    
    if (!['pending', 'verified', 'failed'].includes(paymentStatus)) {
      res.status(400).json({ message: 'Invalid payment status' });
      return;
    }

    const application = await MunApplication.findById(req.params.id);
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.paymentStatus = paymentStatus;
    await application.save();

    res.json({ message: `Payment ${paymentStatus}`, application });
  } catch (error: any) {
    console.error('Payment status error:', error);
    res.status(500).json({ message: error.message || 'Failed to update payment status' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/position-paper-status
// @desc    Update position paper review status
// @access  Admin only
router.put('/admin/applications/:id/position-paper-status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, remarks } = req.body;
    
    if (!['not_submitted', 'submitted', 'under_review', 'approved', 'revision_requested'].includes(status)) {
      res.status(400).json({ message: 'Invalid position paper status' });
      return;
    }

    const application = await MunApplication.findById(req.params.id);
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.positionPaperStatus = status;
    if (remarks) application.positionPaperAdminRemarks = remarks;
    await application.save();

    res.json({ message: 'Position paper status updated', application });
  } catch (error: any) {
    console.error('Position paper status error:', error);
    res.status(500).json({ message: error.message || 'Failed to update status' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/handle-edit-request
// @desc    Handle delegate's edit request
// @access  Admin only
router.put('/admin/applications/:id/handle-edit-request', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { approved, adminResponse } = req.body;
    const application = await MunApplication.findById(req.params.id);
    
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.editRequestPending = false;
    if (adminResponse) application.adminNotes = (application.adminNotes || '') + '\n' + adminResponse;
    await application.save();

    res.json({ 
      message: approved ? 'Edit request approved - delegate can now update profile' : 'Edit request handled', 
      application 
    });
  } catch (error: any) {
    console.error('Handle edit request error:', error);
    res.status(500).json({ message: error.message || 'Failed to handle edit request' });
  }
});

// @route   POST /api/mun/admin/bulk-lock-allotments
// @desc    Lock all allotments for an event
// @access  Admin only
router.post('/admin/bulk-lock-allotments', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId, lock } = req.body;
    
    const result = await MunApplication.updateMany(
      { event: eventId, status: 'allotted' },
      { 
        allotmentLocked: lock, 
        allotmentLockedAt: lock ? new Date() : null 
      }
    );

    res.json({ 
      message: `${result.modifiedCount} allotments ${lock ? 'locked' : 'unlocked'}`,
      modifiedCount: result.modifiedCount 
    });
  } catch (error: any) {
    console.error('Bulk lock error:', error);
    res.status(500).json({ message: error.message || 'Failed to bulk lock allotments' });
  }
});

// @route   PUT /api/mun/admin/applications/:id/status
// @desc    Update application status (approve/reject)
// @access  Admin only
router.put('/admin/applications/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const application = await MunApplication.findById(req.params.id);
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.status = status;
    if (notes) application.adminNotes = notes;

    await application.save();

    res.json({ message: `Application ${status}`, application });
  } catch (error: any) {
    console.error('Status update error:', error);
    res.status(500).json({ message: error.message || 'Status update failed' });
  }
});

// @route   GET /api/mun/admin/export/csv
// @desc    Export all MUN registrations as CSV
// @access  Admin only
router.get('/admin/export/csv', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const User = (await import('../models/User')).default;
    const users = await User.find({ preferredCommittee: { $ne: '' } })
      .select('-password')
      .sort({ createdAt: -1 });

    // CSV header
    const headers = [
      'Name',
      'Email',
      'Phone',
      'College',
      'Branch',
      'Year',
      'Preferred Committee',
      'Country Preferences',
      'Experience Level',
      'Has Attended MUN',
      'Previous MUN Experience',
      'Allotted Country',
      'Allotted Committee',
      'Allotted Newspaper',
      'Position Paper Status',
      'Position Paper URL',
      'Registration Date',
    ];

    // Convert to CSV rows
    const rows = users.map((user) => {
      const countryPrefsStr = (user.countryPreferences || []).filter(c => c).join('; ');
      
      return [
        `"${(user.name || '').replace(/"/g, '""')}"`,
        `"${user.email}"`,
        `"${user.phone || ''}"`,
        `"${(user.college || '').replace(/"/g, '""')}"`,
        `"${(user.branch || '').replace(/"/g, '""')}"`,
        `"${user.year || ''}"`,
        `"${user.preferredCommittee || ''}"`,
        `"${countryPrefsStr}"`,
        `"${user.experienceLevel || ''}"`,
        `"${user.hasAttendedMun ? 'Yes' : 'No'}"`,
        `"${(user.previousMunExperience || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${user.allottedCountry || ''}"`,
        `"${user.allottedCommittee || ''}"`,
        `"${user.allottedNewspaper || ''}"`,
        `"${user.positionPaperStatus || 'not_submitted'}"`,
        `"${user.positionPaperUrl || ''}"`,
        `"${new Date(user.createdAt).toLocaleString()}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=mun_registrations.csv');
    res.send(csvContent);
  } catch (error: any) {
    console.error('Error exporting MUN registrations:', error);
    res.status(500).json({ message: error.message || 'Failed to export registrations' });
  }
});

export default router;

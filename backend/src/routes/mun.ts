import express, { Response } from 'express';
import multer from 'multer';
import MunEvent from '../models/MunEvent';
import MunApplication from '../models/MunApplication';
import { protect, adminOnly, profileComplete, AuthRequest } from '../middleware/auth';

const router = express.Router();

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
    const userId = req.user!._id;

    // Check if event exists and is active
    const event = await MunEvent.findById(eventId);
    if (!event || !event.isActive) {
      res.status(404).json({ message: 'Event not found or not accepting applications' });
      return;
    }

    // Check if registration deadline has passed
    if (new Date() > event.registrationDeadline) {
      res.status(400).json({ message: 'Registration deadline has passed' });
      return;
    }

    // Check if user already applied
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
      .populate('event', 'title startDate endDate venue')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error: any) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch applications' });
  }
});

// @route   POST /api/mun/upload-position-paper/:applicationId
// @desc    Upload position paper for an application
// @access  Private
router.post(
  '/upload-position-paper/:applicationId',
  protect,
  upload.single('positionPaper'),
  async (req: AuthRequest, res: Response): Promise<void> => {
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
        res.status(400).json({ message: 'You can only upload position paper after allotment' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'Please upload a PDF file' });
        return;
      }

      // Get remarks from body
      const { remarks } = req.body;

      // In production, upload to cloud storage (Cloudinary, S3, etc.)
      // For now, we'll store the base64 data (not recommended for production)
      const base64Data = req.file.buffer.toString('base64');
      application.positionPaperUrl = `data:application/pdf;base64,${base64Data}`;
      application.positionPaperSubmittedAt = new Date();
      if (remarks) application.positionPaperRemarks = remarks;

      await application.save();

      res.json({
        message: 'Position paper uploaded successfully',
        submittedAt: application.positionPaperSubmittedAt,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
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
    const { committee, country, agenda, notes } = req.body;

    const application = await MunApplication.findById(req.params.id);
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    application.status = 'allotted';
    application.allottedCommittee = committee;
    application.allottedCountry = country;
    application.allottedAgenda = agenda;
    if (notes) application.adminNotes = notes;

    await application.save();

    res.json({ message: 'Allotment successful', application });
  } catch (error: any) {
    console.error('Allotment error:', error);
    res.status(500).json({ message: error.message || 'Allotment failed' });
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

export default router;

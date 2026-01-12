import express, { Response } from 'express';
import EventRegistration from '../models/EventRegistration';
import { protect, AuthRequest } from '../middleware/auth';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// @route   POST /api/events/register
// @desc    Register for an event (Pralekh, Plotlines, OpenMic)
// @access  Private
router.post('/register', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventType, title, description } = req.body;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    // Validate event type
    if (!['pralekh', 'plotlines', 'openmic'].includes(eventType)) {
      res.status(400).json({ message: 'Invalid event type' });
      return;
    }

    // Check if user has complete profile
    if (!user.name || !user.phone || !user.college || !user.branch || !user.year) {
      res.status(400).json({ 
        message: 'Please complete your profile before registering for events',
        profileIncomplete: true 
      });
      return;
    }

    // Check if already registered
    const existingRegistration = await EventRegistration.findOne({
      userId: user._id,
      eventType,
    });

    if (existingRegistration) {
      res.status(400).json({ 
        message: 'You have already registered for this event',
        registration: existingRegistration 
      });
      return;
    }

    // Create registration
    const registration = await EventRegistration.create({
      userId: user._id,
      eventType,
      name: user.name,
      email: user.email,
      phone: user.phone,
      college: user.college,
      branch: user.branch,
      year: user.year,
      title: title || '',
      description: description || '',
      registrationStatus: 'registered',
    });

    res.status(201).json({
      message: 'Registration successful!',
      registration,
    });
  } catch (error: any) {
    console.error('Event registration error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'You have already registered for this event' });
      return;
    }
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

// @route   POST /api/events/submit/:registrationId
// @desc    Submit PDF for an event
// @access  Private
router.post('/submit/:registrationId', protect, upload.single('file'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { registrationId } = req.params;
    const { title, description } = req.body;
    const user = req.user;
    const file = req.file;

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    if (!file) {
      res.status(400).json({ message: 'Please upload a PDF file' });
      return;
    }

    // Find registration
    const registration = await EventRegistration.findOne({
      _id: registrationId,
      userId: user._id,
    });

    if (!registration) {
      res.status(404).json({ message: 'Registration not found' });
      return;
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: `edb-events/${registration.eventType}`,
          public_id: `${user._id}_${Date.now()}`,
          format: 'pdf',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Upload failed'));
        }
      );
      uploadStream.end(file.buffer);
    });

    // Update registration with submission details
    registration.submissionUrl = uploadResult.secure_url;
    registration.submissionFileName = file.originalname;
    registration.submissionDate = new Date();
    registration.registrationStatus = 'submitted';
    if (title) registration.title = title;
    if (description) registration.description = description;

    await registration.save();

    res.json({
      message: 'Submission successful!',
      registration,
    });
  } catch (error: any) {
    console.error('Event submission error:', error);
    res.status(500).json({ message: error.message || 'Submission failed' });
  }
});

// @route   GET /api/events/my-registrations
// @desc    Get user's event registrations
// @access  Private
router.get('/my-registrations', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const registrations = await EventRegistration.find({ userId: user._id })
      .sort({ createdAt: -1 });

    res.json({ registrations });
  } catch (error: any) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: error.message || 'Failed to get registrations' });
  }
});

// @route   GET /api/events/registration/:eventType
// @desc    Get user's registration for a specific event
// @access  Private
router.get('/registration/:eventType', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventType } = req.params;
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const registration = await EventRegistration.findOne({
      userId: user._id,
      eventType,
    });

    res.json({ registration });
  } catch (error: any) {
    console.error('Get registration error:', error);
    res.status(500).json({ message: error.message || 'Failed to get registration' });
  }
});

// @route   GET /api/events/all (Admin)
// @desc    Get all event registrations
// @access  Private/Admin
router.get('/all', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    const { eventType, status } = req.query;
    
    const query: any = {};
    if (eventType) query.eventType = eventType;
    if (status) query.registrationStatus = status;

    const registrations = await EventRegistration.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.json({ registrations });
  } catch (error: any) {
    console.error('Get all registrations error:', error);
    res.status(500).json({ message: error.message || 'Failed to get registrations' });
  }
});

// @route   PUT /api/events/admin/:registrationId
// @desc    Update registration status (Admin)
// @access  Private/Admin
router.put('/admin/:registrationId', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { registrationId } = req.params;
    const { registrationStatus, adminRemarks } = req.body;
    const user = req.user;

    if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      { registrationStatus, adminRemarks },
      { new: true }
    );

    if (!registration) {
      res.status(404).json({ message: 'Registration not found' });
      return;
    }

    res.json({ message: 'Registration updated', registration });
  } catch (error: any) {
    console.error('Update registration error:', error);
    res.status(500).json({ message: error.message || 'Failed to update registration' });
  }
});

export default router;

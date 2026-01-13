import express, { Request, Response } from 'express';
import ArunodayRegistration from '../models/ArunodayRegistration';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/arunoday/register
// @desc    Register a team for Arunoday
// @access  Public
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderRollNumber,
      teamLeaderBranch,
      teamLeaderPhone,
      teamMembers,
      preferredLanguage,
      eventCategory,
    } = req.body;

    // Validate required fields
    if (!teamName || !teamLeaderName || !teamLeaderEmail || !teamLeaderRollNumber || !teamLeaderBranch) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: teamName, teamLeaderName, teamLeaderEmail, teamLeaderRollNumber, teamLeaderBranch',
      });
      return;
    }

    // Check if team name already exists (optional - can be removed if duplicate team names are allowed)
    const existingTeam = await ArunodayRegistration.findOne({ teamName: teamName.trim() });
    if (existingTeam) {
      res.status(400).json({
        success: false,
        message: 'A team with this name already exists. Please choose a different team name.',
      });
      return;
    }

    // Create new Arunoday registration
    const registration = new ArunodayRegistration({
      teamName: teamName.trim(),
      teamLeaderName: teamLeaderName.trim(),
      teamLeaderEmail: teamLeaderEmail.trim().toLowerCase(),
      teamLeaderRollNumber: teamLeaderRollNumber.trim(),
      teamLeaderBranch: teamLeaderBranch.trim(),
      teamLeaderPhone: teamLeaderPhone?.trim() || '',
      teamMembers: teamMembers || [],
      preferredLanguage: preferredLanguage?.trim() || '',
      eventCategory: eventCategory?.trim() || '',
      status: 'pending',
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Team registration successful! You will receive a confirmation email shortly.',
      data: {
        teamName: registration.teamName,
        teamLeaderEmail: registration.teamLeaderEmail,
        registrationId: registration._id,
      },
    });
  } catch (error: any) {
    console.error('Arunoday registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again later.',
    });
  }
});

// @route   GET /api/arunoday/registrations
// @desc    Get all Arunoday registrations
// @access  Private/Admin
router.get('/registrations', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registrations = await ArunodayRegistration.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error: any) {
    console.error('Error fetching Arunoday registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registrations.',
    });
  }
});

// @route   GET /api/arunoday/registration/:id
// @desc    Get single Arunoday registration by ID
// @access  Public (can be made private if needed)
router.get('/registration/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const registration = await ArunodayRegistration.findById(req.params.id).select('-__v');

    if (!registration) {
      res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error: any) {
    console.error('Error fetching Arunoday registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registration.',
    });
  }
});

// @route   PATCH /api/arunoday/registration/:id/status
// @desc    Update registration status
// @access  Private/Admin
router.patch('/registration/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, remarks } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid status: pending, approved, or rejected.',
      });
      return;
    }

    const registration = await ArunodayRegistration.findByIdAndUpdate(
      req.params.id,
      { status, remarks: remarks || '' },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!registration) {
      res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Registration status updated to ${status}.`,
      data: registration,
    });
  } catch (error: any) {
    console.error('Error updating Arunoday registration status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating registration.',
    });
  }
});

// @route   DELETE /api/arunoday/registration/:id
// @desc    Delete a registration
// @access  Private/Admin
router.delete('/registration/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await ArunodayRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      res.status(404).json({
        success: false,
        message: 'Registration not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting Arunoday registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting registration.',
    });
  }
});

export default router;

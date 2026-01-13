import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Generate JWT Token
const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name: name || '',
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user: any = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        college: user.college,
        branch: user.branch,
        year: user.year,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        preferredCommittee: user.preferredCommittee,
        countryPreferences: user.countryPreferences,
        agendaPreferences: user.agendaPreferences,
        experienceLevel: user.experienceLevel,
        hasAttendedMun: user.hasAttendedMun,
        previousMunExperience: user.previousMunExperience,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        college: user.college,
        branch: user.branch,
        year: user.year,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        preferredCommittee: user.preferredCommittee,
        countryPreferences: user.countryPreferences,
        agendaPreferences: user.agendaPreferences,
        experienceLevel: user.experienceLevel,
        hasAttendedMun: user.hasAttendedMun,
        previousMunExperience: user.previousMunExperience,
        allottedCountry: user.allottedCountry,
        allottedCommittee: user.allottedCommittee,
      },
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message || 'Failed to get user' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      name, phone, college, branch, year,
      preferredCommittee, countryPreferences, agendaPreferences,
      experienceLevel, hasAttendedMun, previousMunExperience
    } = req.body;
    const user = req.user;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update fields using findByIdAndUpdate
    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (college !== undefined) updateData.college = college;
    if (branch !== undefined) updateData.branch = branch;
    if (year !== undefined) updateData.year = year;
    // MUN Preferences
    if (preferredCommittee !== undefined) updateData.preferredCommittee = preferredCommittee;
    if (countryPreferences !== undefined) updateData.countryPreferences = countryPreferences;
    if (agendaPreferences !== undefined) updateData.agendaPreferences = agendaPreferences;
    if (experienceLevel !== undefined) updateData.experienceLevel = experienceLevel;
    if (hasAttendedMun !== undefined) updateData.hasAttendedMun = hasAttendedMun;
    if (previousMunExperience !== undefined) updateData.previousMunExperience = previousMunExperience;

    // Check if profile will be complete after update
    const isProfileComplete = !!(
      (name || user.name) &&
      (phone || user.phone) &&
      (college || user.college) &&
      (branch || user.branch) &&
      (year || user.year)
    );
    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...updateData, isProfileComplete },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        college: updatedUser.college,
        branch: updatedUser.branch,
        year: updatedUser.year,
        role: updatedUser.role,
        isProfileComplete: updatedUser.isProfileComplete,
        preferredCommittee: updatedUser.preferredCommittee,
        countryPreferences: updatedUser.countryPreferences,
        agendaPreferences: updatedUser.agendaPreferences,
        experienceLevel: updatedUser.experienceLevel,
        hasAttendedMun: updatedUser.hasAttendedMun,
        previousMunExperience: updatedUser.previousMunExperience,
      },
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: error.message || 'Profile update failed' });
  }
});

export default router;

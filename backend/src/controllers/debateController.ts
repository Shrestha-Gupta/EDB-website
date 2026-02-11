import { Request, Response } from 'express';
import DebateRegistration from '../models/DebateRegistration';
import { sendDebateConfirmationEmail } from '../utils/emailService';

export const registerDebate = async (req: Request, res: Response) => {
  try {
    const { fullName, branch, rollNo, contactNumber, email } = req.body;

    // key duplicate email check
    const existingRegistration = await DebateRegistration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newRegistration = new DebateRegistration({
      fullName,
      branch,
      rollNo,
      contactNumber,
      email,
    });

    await newRegistration.save();

    // Send confirmation email
    await sendDebateConfirmationEmail(email, fullName);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering for debate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await DebateRegistration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching debate registrations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

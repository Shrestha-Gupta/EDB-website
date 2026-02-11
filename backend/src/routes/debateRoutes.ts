import express from 'express';
import { registerDebate, getAllRegistrations } from '../controllers/debateController';

const router = express.Router();

// Register a new user for the debate
router.post('/register', registerDebate);

// Get all registrations (should be protected in a real app, but for now it's open or you can middleware later)
router.get('/all', getAllRegistrations);

export default router;

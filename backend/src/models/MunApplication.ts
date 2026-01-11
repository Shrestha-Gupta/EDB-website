import mongoose, { Document, Schema } from 'mongoose';

export interface IMunApplication extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  // New preference fields
  preferredCommittee: 'UNHRC' | 'IP'; // UNHRC or International Press
  countryPreferences: string[]; // Array of country names in order of preference
  agendaPreferences: string; // User's agenda interest
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  hasAttendedMun: boolean;
  previousMunExperience: string; // Details if hasAttendedMun is true
  whyJoin: string;
  // Legacy field (kept for backward compatibility)
  committeePreferences: string[];
  status: 'pending' | 'approved' | 'rejected' | 'allotted';
  allottedCommittee: string | null;
  allottedCountry: string | null;
  allottedAgenda: string | null;
  positionPaperUrl: string | null;
  positionPaperSubmittedAt: Date | null;
  positionPaperRemarks: string;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const munApplicationSchema = new Schema<IMunApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'MunEvent',
      required: true,
    },
    // New preference fields
    preferredCommittee: {
      type: String,
      enum: ['UNHRC', 'IP'],
      required: [true, 'Please select your preferred committee'],
    },
    countryPreferences: [{
      type: String,
    }],
    agendaPreferences: {
      type: String,
      default: '',
    },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Please select your experience level'],
    },
    hasAttendedMun: {
      type: Boolean,
      default: false,
    },
    previousMunExperience: {
      type: String,
      default: '',
    },
    whyJoin: {
      type: String,
      required: [true, 'Please tell us why you want to join'],
    },
    // Legacy field (kept for backward compatibility)
    committeePreferences: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'allotted'],
      default: 'pending',
    },
    allottedCommittee: {
      type: String,
      default: null,
    },
    allottedCountry: {
      type: String,
      default: null,
    },
    allottedAgenda: {
      type: String,
      default: null,
    },
    positionPaperUrl: {
      type: String,
      default: null,
    },
    positionPaperSubmittedAt: {
      type: Date,
      default: null,
    },
    positionPaperRemarks: {
      type: String,
      default: '',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one application per user per event
munApplicationSchema.index({ user: 1, event: 1 }, { unique: true });

const MunApplication = mongoose.model<IMunApplication>('MunApplication', munApplicationSchema);

export default MunApplication;

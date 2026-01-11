import mongoose, { Document, Schema } from 'mongoose';

export interface IMunApplication extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  // Delegate ID (auto-generated)
  delegateId: string;
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
  // Application & Allotment Status
  status: 'pending' | 'approved' | 'rejected' | 'allotted';
  paymentStatus: 'pending' | 'verified' | 'failed';
  allotmentStatus: 'pending' | 'allotted' | 'reassigned';
  allottedCommittee: string | null;
  allottedCountry: string | null;
  allottedAgenda: string | null;
  allottedRole: string | null; // e.g., "Delegate", "Chair", "Vice-Chair"
  committeeRoom: string | null;
  reportingTime: string | null;
  reportingDate: Date | null;
  // Position Paper
  positionPaperUrl: string | null;
  positionPaperSubmittedAt: Date | null;
  positionPaperStatus: 'not_submitted' | 'submitted' | 'under_review' | 'approved' | 'revision_requested';
  positionPaperRemarks: string;
  positionPaperDeadline: Date | null;
  positionPaperAdminRemarks: string;
  // Final Confirmation
  finalConfirmation: boolean;
  finalConfirmationAt: Date | null;
  // Admin Notes
  adminNotes: string;
  // Edit Request
  editRequestPending: boolean;
  editRequestMessage: string;
  editRequestAt: Date | null;
  // Allotment Lock
  allotmentLocked: boolean;
  allotmentLockedAt: Date | null;
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
    // Auto-generated Delegate ID
    delegateId: {
      type: String,
      unique: true,
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
    // Application Status
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'allotted'],
      default: 'pending',
    },
    // Payment Status
    paymentStatus: {
      type: String,
      enum: ['pending', 'verified', 'failed'],
      default: 'pending',
    },
    // Allotment Status
    allotmentStatus: {
      type: String,
      enum: ['pending', 'allotted', 'reassigned'],
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
    allottedRole: {
      type: String,
      default: null,
    },
    committeeRoom: {
      type: String,
      default: null,
    },
    reportingTime: {
      type: String,
      default: null,
    },
    reportingDate: {
      type: Date,
      default: null,
    },
    // Position Paper
    positionPaperUrl: {
      type: String,
      default: null,
    },
    positionPaperSubmittedAt: {
      type: Date,
      default: null,
    },
    positionPaperStatus: {
      type: String,
      enum: ['not_submitted', 'submitted', 'under_review', 'approved', 'revision_requested'],
      default: 'not_submitted',
    },
    positionPaperRemarks: {
      type: String,
      default: '',
    },
    positionPaperDeadline: {
      type: Date,
      default: null,
    },
    positionPaperAdminRemarks: {
      type: String,
      default: '',
    },
    // Final Confirmation
    finalConfirmation: {
      type: Boolean,
      default: false,
    },
    finalConfirmationAt: {
      type: Date,
      default: null,
    },
    // Admin Notes
    adminNotes: {
      type: String,
      default: '',
    },
    // Edit Request
    editRequestPending: {
      type: Boolean,
      default: false,
    },
    editRequestMessage: {
      type: String,
      default: '',
    },
    editRequestAt: {
      type: Date,
      default: null,
    },
    // Allotment Lock
    allotmentLocked: {
      type: Boolean,
      default: false,
    },
    allotmentLockedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate delegateId
munApplicationSchema.pre('save', async function() {
  if (!this.delegateId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.model('MunApplication').countDocuments();
    this.delegateId = `MUN${year}${String(count + 1).padStart(4, '0')}`;
  }
});

// Ensure one application per user per event
munApplicationSchema.index({ user: 1, event: 1 }, { unique: true });
munApplicationSchema.index({ delegateId: 1 }, { unique: true });

const MunApplication = mongoose.model<IMunApplication>('MunApplication', munApplicationSchema);

export default MunApplication;

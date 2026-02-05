import mongoose, { Document, Schema } from 'mongoose';

// Team member interface for Pralekh
export interface ITeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
}

export interface IEventRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  eventType: 'pralekh' | 'plotlines' | 'openmic';
  // User details (prefilled from profile) - Team Leader for Pralekh
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  // Team fields (for Pralekh only)
  isTeamRegistration?: boolean;
  teamName?: string;
  teamMembers?: ITeamMember[]; // 2-5 members including leader
  // Event specific fields
  title?: string; // For submission title
  description?: string; // Brief description of submission
  // Submission
  submissionUrl?: string; // Cloudinary URL
  submissionFileName?: string;
  submissionDate?: Date;
  // Status
  registrationStatus: 'registered' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  // Admin
  adminRemarks?: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Workaround for mongoose v9 TypeScript depth issue
const EventRegistrationSchema: any = new (Schema as any)(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      enum: ['pralekh', 'plotlines', 'openmic'],
      required: true,
    },
    // User details
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    college: {
      type: String,
      required: [true, 'College is required'],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    // Team fields (for Pralekh only)
    isTeamRegistration: {
      type: Boolean,
      default: false,
    },
    teamName: {
      type: String,
      trim: true,
    },
    teamMembers: [{
      name: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      college: { type: String, trim: true },
      branch: { type: String, trim: true },
      year: { type: String, trim: true },
    }],
    // Event specific
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Submission
    submissionUrl: {
      type: String,
      trim: true,
    },
    submissionFileName: {
      type: String,
      trim: true,
    },
    submissionDate: {
      type: Date,
    },
    // Status
    registrationStatus: {
      type: String,
      enum: ['registered', 'submitted', 'under_review', 'approved', 'rejected'],
      default: 'registered',
    },
    // Admin
    adminRemarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate registrations for the same event
EventRegistrationSchema.index({ userId: 1, eventType: 1 }, { unique: true });

export default (mongoose.model as any)('EventRegistration', EventRegistrationSchema) as mongoose.Model<IEventRegistration>;

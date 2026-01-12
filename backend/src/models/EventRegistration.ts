import mongoose, { Document, Schema } from 'mongoose';

export interface IEventRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  eventType: 'pralekh' | 'plotlines' | 'openmic';
  // User details (prefilled from profile)
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
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

const EventRegistrationSchema = new Schema<IEventRegistration>(
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

export default mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);

import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  role: 'user' | 'admin';
  isProfileComplete: boolean;
  // MUN Preferences
  preferredCommittee: 'UNHRC' | 'IP' | '';
  countryPreferences: string[];
  agendaPreferences: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | '';
  hasAttendedMun: boolean;
  previousMunExperience: string;
  // Allotted details (assigned by admin)
  allottedCountry: string;
  allottedCommittee: string;
  allottedNewspaper: string; // For IP participants
  // Position Paper fields
  positionPaperUrl: string;
  positionPaperSubmittedAt: Date | null;
  positionPaperStatus: 'not_submitted' | 'submitted' | 'under_review' | 'approved' | 'revision_requested';
  positionPaperRemarks: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in queries by default
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    college: {
      type: String,
      trim: true,
      default: '',
    },
    branch: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: String,
      enum: ['', '1st', '2nd', '3rd', '4th', '5th'],
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    // MUN Preferences
    preferredCommittee: {
      type: String,
      enum: ['', 'UNHRC', 'IP'],
      default: '',
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
      enum: ['', 'beginner', 'intermediate', 'advanced'],
      default: '',
    },
    hasAttendedMun: {
      type: Boolean,
      default: false,
    },
    previousMunExperience: {
      type: String,
      default: '',
    },
    // Allotted details (assigned by admin)
    allottedCountry: {
      type: String,
      default: '',
    },
    allottedCommittee: {
      type: String,
      default: '',
    },
    // Newspaper assignment for IP participants
    allottedNewspaper: {
      type: String,
      default: '',
    },
    // Position Paper fields (for direct upload without application)
    positionPaperUrl: {
      type: String,
      default: '',
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
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Check if profile is complete
userSchema.pre('save', function () {
  this.isProfileComplete = !!(
    this.name &&
    this.phone &&
    this.college &&
    this.branch &&
    this.year
  );
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Workaround for mongoose v9 TypeScript depth issue
const schemaAny = userSchema as any;
const User = mongoose.model('User', schemaAny) as any as Model<IUser>;

export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
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
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
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

// @ts-expect-error - Mongoose typing issue with complex schemas
const User = mongoose.model('User', userSchema);

export default User;

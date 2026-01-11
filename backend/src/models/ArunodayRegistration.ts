import mongoose from 'mongoose';

export interface ITeamMember {
  name: string;
  rollNumber: string;
  branch: string;
}

export interface IArunodayRegistration {
  _id: mongoose.Types.ObjectId;
  teamName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  teamLeaderRollNumber: string;
  teamLeaderBranch: string;
  teamLeaderPhone?: string;
  teamMembers: ITeamMember[];
  preferredLanguage: string;
  eventCategory?: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true,
  },
  rollNumber: {
    type: String,
    required: [true, 'Team member roll number is required'],
    trim: true,
  },
  branch: {
    type: String,
    required: [true, 'Team member branch is required'],
    trim: true,
  },
});

const arunodayRegistrationSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    teamLeaderName: {
      type: String,
      required: [true, 'Team leader name is required'],
      trim: true,
    },
    teamLeaderEmail: {
      type: String,
      required: [true, 'Team leader email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    teamLeaderRollNumber: {
      type: String,
      required: [true, 'Team leader roll number is required'],
      trim: true,
    },
    teamLeaderBranch: {
      type: String,
      required: [true, 'Team leader branch is required'],
      trim: true,
    },
    teamLeaderPhone: {
      type: String,
      trim: true,
      default: '',
    },
    teamMembers: {
      type: [teamMemberSchema],
      default: [],
      validate: {
        validator: function(members: ITeamMember[]) {
          return members.length <= 10; // Maximum 10 team members
        },
        message: 'Maximum 10 team members allowed',
      },
    },
    preferredLanguage: {
      type: String,
      trim: true,
      default: '',
    },
    eventCategory: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    remarks: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries - allows same email for different team registrations
// but we can add a compound index if we want to prevent duplicate teams
arunodayRegistrationSchema.index({ teamLeaderEmail: 1 });
arunodayRegistrationSchema.index({ teamName: 1 });
arunodayRegistrationSchema.index({ status: 1 });

const ArunodayRegistration = mongoose.model<IArunodayRegistration>(
  'ArunodayRegistration',
  arunodayRegistrationSchema
);

export default ArunodayRegistration;

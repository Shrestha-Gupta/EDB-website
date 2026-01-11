import mongoose, { Document, Schema } from 'mongoose';

export interface ICommittee {
  name: string;
  description: string;
  agenda: string;
  countries: string[];
  maxDelegates: number;
}

export interface IMunEvent extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  registrationDeadline: Date;
  committees: ICommittee[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const committeeSchema = new Schema<ICommittee>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    agenda: {
      type: String,
      required: true,
    },
    countries: [{
      type: String,
    }],
    maxDelegates: {
      type: Number,
      default: 30,
    },
  },
  { _id: false }
);

const munEventSchema = new Schema<IMunEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
    },
    registrationDeadline: {
      type: Date,
      required: [true, 'Registration deadline is required'],
    },
    committees: [committeeSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MunEvent = mongoose.model<IMunEvent>('MunEvent', munEventSchema);

export default MunEvent;

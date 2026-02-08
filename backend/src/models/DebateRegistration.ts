import mongoose, { Schema, Document } from 'mongoose';

export interface IDebateRegistration extends Document {
  fullName: string;
  branch: string;
  rollNo: string;
  contactNumber: string;
  email: string;
  createdAt: Date;
}

const DebateRegistrationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  branch: { type: String, required: true },
  rollNo: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDebateRegistration>('DebateRegistration', DebateRegistrationSchema);

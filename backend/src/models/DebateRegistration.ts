import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDebateRegistration extends Document {
  fullName: string;
  branch: string;
  rollNo: string;
  contactNumber: string;
  email: string;
  createdAt: Date;
}

const DebateRegistrationSchema = new Schema({
  fullName: { type: String, required: true },
  branch: { type: String, required: true },
  rollNo: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Workaround for mongoose v9 TypeScript depth issue
const schemaAny = DebateRegistrationSchema as any;
const DebateRegistration = mongoose.model('DebateRegistration', schemaAny) as any as Model<IDebateRegistration>;

export default DebateRegistration;

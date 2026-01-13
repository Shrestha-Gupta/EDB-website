import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envFiles = ['.env.local', '.env'];
for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, '../../', envFile);
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    console.log(`Loaded env from: ${envPath}`);
    break;
  }
}

// Import User model
import User from '../models/User';

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Delete existing admin if exists (to allow re-seeding)
    const deleted = await User.deleteOne({ email: 'admin@edb.com' });
    if (deleted.deletedCount > 0) {
      console.log('Deleted existing admin user');
    }

    // Create admin user - password will be hashed by User model's pre-save hook
    const adminUser = await User.create({
      email: 'admin@edb.com',
      password: 'admin123', // Will be hashed automatically by User model
      name: 'Admin',
      role: 'admin',
      phone: '0000000000',
      college: 'MMMUT',
      branch: 'Admin',
      year: '1st',
      isProfileComplete: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@edb.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('-----------------------------------');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();

# MUN (Model United Nations) System

This guide covers the setup and usage of the MUN system for The Editorial Board website.

## Features

### User Flow
1. **Register/Login** - Create an account or sign in
2. **Complete Profile** - Fill in required details (phone, college, branch, year)
3. **Apply for Events** - Browse MUN events and apply with committee/country preferences
4. **View Allotment** - See assigned committee, country, and agenda after admin approval
5. **Upload Position Paper** - Submit position paper (PDF) for allotted applications

### Admin Features
- Create and manage MUN events
- View all applications with filters
- Approve/Reject applications
- Allot committee, country, and agenda to applicants
- Track position paper submissions

## Setup Instructions

### 1. Environment Variables

Add these to your backend `.env` or `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Secret (use a long random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Existing SMTP variables
SMTP_HOST=...
SMTP_PORT=...
SMTP_EMAIL=...
SMTP_PASSWORD=...
```

### 2. MongoDB Setup

1. Create a free MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Get your connection string and add it to `MONGODB_URI`
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install mongoose jsonwebtoken bcryptjs cookie-parser
npm install -D @types/jsonwebtoken @types/bcryptjs @types/cookie-parser
```

### 4. Create Admin User

To create an admin user, you can:

**Option A: Use MongoDB Compass or Atlas UI**
1. Connect to your database
2. Go to the `users` collection
3. Find your user and update `role` to `"admin"`

**Option B: Create a script**
```javascript
// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const User = require('../src/models/User').default;

async function createAdmin() {
  const admin = await User.create({
    email: 'admin@example.com',
    password: 'securepassword123',
    name: 'Admin User',
    phone: '1234567890',
    college: 'MMMUT',
    branch: 'CSE',
    year: '4th',
    role: 'admin',
    isProfileComplete: true
  });
  console.log('Admin created:', admin.email);
  process.exit(0);
}

createAdmin().catch(console.error);
```

### 5. Create First Event

1. Log in as admin
2. Navigate to `/mun/admin`
3. Click "Create New Event"
4. Fill in event details including committees

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `PUT /profile` - Update profile (protected)

### MUN Routes (`/api/mun`)

**Public:**
- `GET /events` - List all events
- `GET /events/:id` - Get single event

**User (Protected):**
- `POST /apply` - Apply for an event
- `GET /my-applications` - Get user's applications
- `POST /upload-position-paper/:applicationId` - Upload position paper

**Admin:**
- `POST /admin/events` - Create event
- `PUT /admin/events/:id` - Update event
- `GET /admin/applications` - List all applications (with filters)
- `PUT /admin/applications/:id/allot` - Allot committee/country
- `PUT /admin/applications/:id/status` - Update application status

## Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/mun` | MunPage | Landing page with event info |
| `/mun/login` | MunLoginPage | User login |
| `/mun/register` | MunRegisterPage | User registration |
| `/mun/complete-profile` | MunCompleteProfilePage | Profile completion |
| `/mun/dashboard` | MunDashboardPage | User dashboard |
| `/mun/apply/:eventId` | MunApplyPage | Application form |
| `/mun/admin` | MunAdminPage | Admin panel |

## Data Models

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  phone: String,
  college: String,
  branch: String,
  year: String,
  role: 'user' | 'admin',
  isProfileComplete: Boolean
}
```

### MunEvent
```javascript
{
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  venue: String,
  registrationDeadline: Date,
  committees: [{
    name: String,
    description: String,
    agenda: String,
    countries: [String],
    maxDelegates: Number
  }],
  isActive: Boolean
}
```

### MunApplication
```javascript
{
  user: ObjectId (ref: User),
  event: ObjectId (ref: MunEvent),
  committeePreferences: [String],
  countryPreferences: [String],
  previousMunExperience: String,
  whyJoin: String,
  status: 'pending' | 'approved' | 'rejected' | 'allotted',
  allottedCommittee: String,
  allottedCountry: String,
  allottedAgenda: String,
  adminNotes: String,
  positionPaperUrl: String,
  positionPaperSubmittedAt: Date
}
```

## Troubleshooting

### "MongoDB connection failed"
- Check your `MONGODB_URI` is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

### "JWT Error"
- Ensure `JWT_SECRET` is set in environment
- Clear browser cookies and try again

### "Profile not complete" redirects
- This is expected - users must complete their profile before applying
- Navigate to `/mun/complete-profile` to fill in required fields

## Security Notes

1. Change `JWT_SECRET` to a strong random string in production
2. Use HTTPS in production
3. Set proper CORS origins in production
4. Never commit `.env` files to version control

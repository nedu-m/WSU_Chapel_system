# WSU Chapel System - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A comprehensive backend API for the WSU Chapel System, supporting user authentication, announcements, voting, prayer requests, and administrative functions.

## 🚀 Features

- **User Authentication** - Secure registration, login, and JWT-based sessions
- **Announcement Management** - Create, read, update announcements with image uploads
- **Voting System** - Create polls, vote, and manage voting categories
- **Prayer Requests** - Submit and manage prayer requests
- **Admin Dashboard** - Administrative controls and analytics
- **File Uploads** - Image upload support for announcements and profiles
- **Department Management** - Organize users by departments
- **Calendar Integration** - Chapel event scheduling

## 🛠️ Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Validation:** bcryptjs for password hashing
- **Environment:** cross-env for cross-platform environment variables
- **Development:** Nodemon for auto-restart

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ MongoDB database (local or MongoDB Atlas)
- ✅ Git for version control
- ✅ GitHub account (for deployment)

## 🔧 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/nedu-m/WSU_Chapel_system.git
cd WSU_Chapel_system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# Database
MONGO_URI=mongodb://localhost:27017/chapel_system
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chapel_system

# Security
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters

# CORS (add your frontend URLs)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Start Development Server
```bash
# Development mode with auto-restart
npm run dev

# Or standard development
npm run start:dev
```

### 5. Verify Setup
Visit `http://localhost:8000` - you should see: **"API is live!"**

## 🚀 Complete Render Deployment Guide - Fresh Start

### 📋 Prerequisites
- ✅ Your code is committed and pushed to GitHub
- ✅ You have a GitHub account
- ✅ Your project structure is ready (which it is!)

---

## Step 1: Set Up Database (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Choose **"Build a database"** → **"M0 Sandbox"** (Free tier)

### 1.2 Configure Database
1. **Cloud Provider:** AWS (recommended)
2. **Region:** Choose closest to your users
3. **Cluster Name:** `chapel-system-db` (or your preference)
4. Click **"Create Cluster"**

### 1.3 Create Database User
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `chapel-admin` (or your choice)
5. **Password:** Generate secure password (save it!)
6. **Database User Privileges:** Atlas admin
7. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render deployment)
4. Confirm: `0.0.0.0/0` 
5. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Clusters"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. **Driver:** Node.js, **Version:** Latest
4. Copy the connection string:
```
mongodb+srv://chapel-admin:<password>@chapel-system-db.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Replace `<password>` with your actual password
6. **Save this connection string!**

---

## Step 2: Create Render Account & Deploy

### 2.1 Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with your **GitHub account**
3. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. **Connect Repository:**
   - Find `WSU_Chapel_system` repository
   - Click **"Connect"**

### 2.3 Configure Service Settings
Fill in these exact values:

```yaml
Name: wellspring-chapel-backend
Region: Oregon (US West) # or closest to you
Branch: master
Root Directory: (leave empty)
Runtime: Node
Build Command: npm run build
Start Command: npm start
```

### 2.4 Advanced Settings
```yaml
Node Version: 18 # or latest LTS
Auto-Deploy: Yes
Health Check Path: /
```

---

## Step 3: Configure Environment Variables

Before clicking **"Create Web Service"**, scroll down to **"Environment Variables"** and add:

```bash
# Required Variables
NODE_ENV=production
PORT=10000

# Database (replace with your actual MongoDB connection string)
MONGO_URI=mongodb+srv://chapel-admin:YOUR_PASSWORD@chapel-system-db.xxxxx.mongodb.net/chapel_db?retryWrites=true&w=majority

# Security (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-here-minimum-32-characters
```

### 🔐 Generate JWT Secret:
```bash
# Run this in your terminal to generate a secure key:
openssl rand -base64 32
```

---

## Step 4: Deploy

1. Click **"Create Web Service"**
2. **Monitor the build logs** - you'll see:

```bash
==> Running 'npm run build'
🏗️  Building Node.js application...
✅ Build successful - No compilation needed for Node.js

==> Running 'npm start'
✅ MongoDB Connected Successfully
🚀 Server Environment: production
🎉 Server running successfully on port 10000
📍 Server URL: http://localhost:10000
🔗 Health check: GET /
──────────────────────────────────────
```

3. **Your API will be live at:** `https://wellspring-chapel-backend.onrender.com`

---

## Step 5: Test Your Deployment

### 5.1 Health Check
```bash
curl https://wellspring-chapel-backend.onrender.com/
# Expected response: "API is live!"
```

### 5.2 Test Key Endpoints
```bash
# Test CORS
curl -H "Origin: http://localhost:3000" https://your-service.onrender.com/

# Test API structure
curl https://your-service.onrender.com/api/
```

---

## Step 6: Update CORS for Production

After deployment, update your CORS settings in `backend/config/allowedOrigins.js`:

```javascript
const allowedOrigins = [
    'https://wellspring-chapel-backend.onrender.com', // Your Render backend URL
    'https://your-frontend-domain.com', // Replace with your actual frontend URL
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
];
```

---

## Step 7: Final Steps

### 7.1 Commit CORS Update
```bash
git add backend/config/allowedOrigins.js
git commit -m "Add production URL to CORS origins"
git push origin master
```

### 7.2 Monitor Auto-Deploy
- Render will automatically redeploy when you push changes
- Monitor the build logs for any issues

---

## 🎉 Your API Endpoints

Once deployed, your API will be available at:

```
Base URL: https://wellspring-chapel-backend.onrender.com

Endpoints:
GET  /                           # Health check: "API is live!"
POST /api/auth/register          # User registration
POST /api/auth/login             # User login
POST /api/auth/logout            # User logout
GET  /api/users/profile          # User profile
PUT  /api/users/profile          # Update profile
POST /api/announcements          # Create announcements
GET  /api/announcements          # Get announcements
POST /api/votes                  # Create votes
GET  /api/votes                  # Get votes
POST /api/prayers                # Create prayer requests
GET  /api/prayers                # Get prayer requests
GET  /api/dashboard/stats        # Dashboard statistics
POST /api/admin/departments      # Create departments (Admin)
GET  /api/admin/calendar         # Get calendar events (Admin)
```

---

## 🔧 Post-Deployment Checklist

✅ **Database Connected** - Check logs for "✅ MongoDB Connected Successfully"  
✅ **Environment Variables Set** - NODE_ENV=production visible in logs  
✅ **Health Check Passing** - GET / returns "API is live!"  
✅ **CORS Configured** - Frontend can connect to your API  
✅ **Auto-Deploy Working** - Changes trigger new deployments  

---

## 📊 Monitoring Your Deployment

- **Render Dashboard:** Monitor performance, logs, and metrics
- **Build Logs:** Check for any deployment issues
- **Runtime Logs:** Monitor application behavior
- **Metrics:** CPU, memory usage, and response times

**Your Chapel System backend is now live and production-ready!** 🎉

**Expected total deployment time:** 5-10 minutes for the entire process.

## 📁 Project Structure

```
WSU_Chapel_system/
├── backend/
│   ├── api/
│   │   └── index.js              # Main server file
│   ├── config/
│   │   ├── allowedOrigins.js     # CORS configuration
│   │   ├── corsOptions.js        # CORS options
│   │   ├── multer.js            # File upload config
│   │   └── announceMulter.js    # Announcement upload config
│   ├── controllers/
│   │   ├── Admin_Con/           # Admin controllers
│   │   ├── authControllers.js   # Authentication logic
│   │   ├── userController.js    # User management
│   │   ├── announcementControllers.js
│   │   ├── votesControllers.js
│   │   └── prayerController.js
│   ├── DB/
│   │   └── connectMongoDB.js    # Database connection
│   ├── middleware/
│   │   ├── protectRoute.js      # Authentication middleware
│   │   ├── errorHandler.js      # Error handling
│   │   └── logEvents.js         # Request logging
│   ├── models/
│   │   ├── userModel.js         # User schema
│   │   ├── adminModel.js        # Admin schema
│   │   ├── announcementModel.js # Announcement schema
│   │   ├── voteModel.js         # Vote schema
│   │   ├── prayerModel.js       # Prayer schema
│   │   ├── calendarModel.js     # Calendar schema
│   │   ├── departmentModel.js   # Department schema
│   │   └── notificationModel.js # Notification schema
│   ├── routes/
│   │   ├── AdminRoutes/         # Admin-specific routes
│   │   ├── user_Routes/         # User-specific routes
│   │   └── dashboardRoutes.js   # Dashboard routes
│   └── lib/
│       └── utils/               # Utility functions
├── uploads/                     # File upload directory
├── package.json                 # Dependencies and scripts
└── README.md                   # This file
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start with nodemon (auto-restart)
npm run start:dev        # Start development server

# Production
npm start               # Start production server
npm run start:prod      # Start with explicit production env

# Build
npm run build           # Build command (Node.js placeholder)
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **CORS Protection** - Configured allowed origins
- **Environment Variables** - Sensitive data protection
- **Input Validation** - Mongoose schema validation
- **Route Protection** - Middleware-based access control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact the development team or create an issue in the GitHub repository.

---

**Made with ❤️ for WSU Chapel System** 
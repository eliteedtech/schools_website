# School Management System - Installation Guide

This is a complete school management system with both public website and admin dashboard integrated into a single application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd school-project

# Install dependencies
npm install
```

### 2. Database Setup

```bash
# Start MySQL service
# Create database
mysql -u root -p
CREATE DATABASE school_cms;
exit;

# Navigate to backend and install dependencies
cd backend
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=school_cms
# DB_USER=root
# DB_PASSWORD=your_password
```

### 3. Environment Configuration

```bash
# In the root directory, copy environment file
cp .env.example .env

# Edit .env file if needed
# VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Applications

```bash
# Terminal 1: Start the backend server
cd backend
npm start
# Backend will run on http://localhost:5000

# Terminal 2: Start the frontend (from root directory)
npm run dev
# Frontend will run on http://localhost:5173
```

### 5. Seed the Database (Optional)

```bash
# In the backend directory
cd backend
node scripts/seed.js
```

## 📱 Application Structure

### Public Website
- **URL**: `http://localhost:5173`
- **Features**: Home, About, Gallery, Apply, Results, Pricing, Contact

### Admin Dashboard
- **URL**: `http://localhost:5173/admin`
- **Login**: `http://localhost:5173/admin/login`
- **Demo Credentials**: 
  - Email: `admin@school.com`
  - Password: `password123`

## 🔧 Available Scripts

### Frontend (Root Directory)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm run seed         # Seed database with sample data
```

## 📂 Project Structure

```
school-project/
├── src/                          # Frontend source
│   ├── admin/                    # Admin dashboard
│   │   ├── components/           # Admin components
│   │   ├── contexts/             # Admin contexts
│   │   └── pages/                # Admin pages
│   ├── componetes/               # Public website components
│   └── App.jsx                   # Main app component
├── backend/                      # Backend API
│   ├── config/                   # Database config
│   ├── models/                   # Sequelize models
│   ├── routes/                   # API routes
│   ├── middleware/               # Auth middleware
│   └── server.js                 # Express server
├── public/                       # Static assets
└── package.json                  # Dependencies
```

## 🎯 Features

### Public Website
- ✅ Responsive design
- ✅ School information pages
- ✅ Online application form
- ✅ Gallery showcase
- ✅ Contact form
- ✅ Pricing information

### Admin Dashboard
- ✅ Dashboard with statistics
- ✅ Application management
- ✅ Gallery management
- ✅ Staff management
- ✅ Pricing management
- ✅ Content management
- ✅ Contact message management
- ✅ User settings

### Super Admin Features
- ✅ Multi-school management
- ✅ Theme customization
- ✅ School duplication
- ✅ System monitoring

## 🔐 Authentication

The system uses JWT tokens for authentication:
- Public website: No authentication required
- Admin dashboard: Login required
- Super admin: Special role-based access

## 🗄️ Database

The system uses MySQL with Sequelize ORM:
- **Models**: User, School, Application, Gallery, Staff, Pricing, ContactMessage
- **Relationships**: Properly defined associations
- **Migrations**: Auto-sync enabled

## 🚀 Deployment

### Single Application Deployment

Since everything is integrated into one application:

1. **Build the frontend**:
```bash
npm run build
```

2. **Deploy backend**:
```bash
cd backend
# Deploy to your preferred hosting (Heroku, DigitalOcean, etc.)
```

3. **Serve frontend**:
The built frontend can be served by the backend or separately.

### Environment Variables for Production

```bash
# Frontend
VITE_API_URL=https://your-api-domain.com/api

# Backend
NODE_ENV=production
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
JWT_SECRET=your-strong-jwt-secret
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**:
   - Change ports in configuration
   - Kill existing processes

3. **Module Not Found**:
   - Run `npm install` in both root and backend directories
   - Clear node_modules and reinstall

4. **CORS Issues**:
   - Check backend CORS configuration
   - Verify frontend URL in backend settings

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the console for error messages
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

## 🎉 Success!

If everything is set up correctly:
- Public website: `http://localhost:5173`
- Admin login: `http://localhost:5173/admin/login`
- API: `http://localhost:5000/api`

The system is now ready for development and customization!
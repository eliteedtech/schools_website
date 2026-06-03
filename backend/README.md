# School CMS Backend

A comprehensive multi-tenant school management system backend with admin and super admin dashboards.

## Features

### Admin Dashboard Features
- **Content Management**: Update website content, hero sections, about pages, programs, and events
- **Student Applications**: Manage student applications, review submissions, update statuses
- **Gallery Management**: Upload and organize photos/videos, categorize media, manage featured content
- **Staff Management**: Add/edit staff profiles, manage departments, track performance
- **Pricing Management**: Set fee structures, manage payment terms, handle discounts
- **Contact Management**: Handle contact form submissions, respond to inquiries
- **Analytics**: View application statistics, gallery metrics, contact insights

### Super Admin Dashboard Features
- **Multi-tenant Management**: Create and manage multiple schools
- **Theme Customization**: Customize colors, fonts, layouts for each school
- **Template System**: Create school templates for easy duplication
- **User Management**: Manage admin users and permissions
- **System Settings**: Global configuration and monitoring

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with role-based access control
- **File Upload**: Multer with Cloudinary integration
- **Image Processing**: Sharp for optimization
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Joi for request validation

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/school-cms
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   
   # Cloudinary (for file uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Email (for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Frontend URLs
   FRONTEND_URL=http://localhost:3000
   ADMIN_URL=http://localhost:3001
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Schools Management
- `GET /api/schools` - Get all schools
- `POST /api/schools` - Create new school
- `GET /api/schools/:schoolId` - Get single school
- `PUT /api/schools/:schoolId` - Update school
- `DELETE /api/schools/:schoolId` - Delete school
- `POST /api/schools/:schoolId/duplicate` - Duplicate school

### Content Management
- `GET /api/content/:schoolId` - Get school content
- `PUT /api/content/:schoolId/hero` - Update hero section
- `PUT /api/content/:schoolId/about` - Update about section
- `GET /api/content/:schoolId/programs` - Get programs
- `POST /api/content/:schoolId/programs` - Add program
- `PUT /api/content/:schoolId/programs/:programId` - Update program
- `DELETE /api/content/:schoolId/programs/:programId` - Delete program

### Applications Management
- `GET /api/applications/:schoolId` - Get applications
- `POST /api/applications/:schoolId` - Submit application (public)
- `GET /api/applications/:schoolId/:applicationId` - Get single application
- `PUT /api/applications/:schoolId/:applicationId/status` - Update status
- `GET /api/applications/:schoolId/stats` - Get statistics
- `GET /api/applications/:schoolId/export` - Export to CSV

### Gallery Management
- `GET /api/gallery/:schoolId` - Get gallery items
- `POST /api/gallery/:schoolId` - Add gallery item
- `PUT /api/gallery/:schoolId/:itemId` - Update gallery item
- `DELETE /api/gallery/:schoolId/:itemId` - Delete gallery item
- `GET /api/gallery/:schoolId/public` - Get public gallery (for website)
- `GET /api/gallery/:schoolId/featured` - Get featured items

### Staff Management
- `GET /api/staff/:schoolId` - Get staff members
- `POST /api/staff/:schoolId` - Add staff member
- `PUT /api/staff/:schoolId/:staffId` - Update staff member
- `DELETE /api/staff/:schoolId/:staffId` - Delete staff member
- `GET /api/staff/:schoolId/public` - Get public staff list
- `GET /api/staff/:schoolId/management` - Get management staff

### Pricing Management
- `GET /api/pricing/:schoolId` - Get pricing
- `POST /api/pricing/:schoolId` - Create/update pricing
- `GET /api/pricing/:schoolId/public` - Get public pricing
- `POST /api/pricing/:schoolId/calculate` - Calculate fees
- `POST /api/pricing/:schoolId/installments` - Get installment schedule

### Contact Management
- `GET /api/contact/:schoolId` - Get contact messages
- `POST /api/contact/:schoolId` - Submit contact message (public)
- `PUT /api/contact/:schoolId/:messageId/status` - Update message status
- `POST /api/contact/:schoolId/:messageId/response` - Add response
- `GET /api/contact/:schoolId/stats` - Get contact statistics

### Theme Management
- `GET /api/themes/:schoolId` - Get theme configuration
- `PUT /api/themes/:schoolId/colors` - Update colors
- `PUT /api/themes/:schoolId/typography` - Update typography
- `PUT /api/themes/:schoolId/branding` - Update branding
- `GET /api/themes/presets/list` - Get theme presets
- `POST /api/themes/:schoolId/apply-preset` - Apply theme preset

### File Upload
- `POST /api/upload/:schoolId/image` - Upload image
- `POST /api/upload/:schoolId/video` - Upload video
- `POST /api/upload/:schoolId/document` - Upload document
- `POST /api/upload/:schoolId/multiple` - Upload multiple files
- `DELETE /api/upload/:schoolId/:publicId` - Delete file

## Database Models

### User Model
- Personal information and authentication
- Role-based permissions (super_admin, admin, editor, viewer)
- School associations with specific roles
- Profile settings and preferences

### School Model
- Basic school information
- Theme configuration (colors, fonts, layout)
- Branding (logos, social media)
- Content sections (hero, about, programs, events)
- Settings and features

### Application Model
- Student information
- Guardian details
- Application status and review
- Payment information
- Document attachments

### Gallery Model
- Media files (images/videos)
- Categorization and tagging
- Display settings
- View and like tracking

### Staff Model
- Personal and professional information
- Department and position
- Performance tracking
- Document management

### Pricing Model
- Fee structures by program
- Payment terms and discounts
- Academic year management
- Version control

## Authentication & Authorization

The system uses JWT-based authentication with role-based access control:

- **Super Admin**: Full system access, can manage all schools
- **Admin**: Full access to assigned schools
- **Editor**: Limited editing permissions
- **Viewer**: Read-only access

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- Account lockout after failed attempts

## File Upload & Storage

- Multer for handling multipart/form-data
- Sharp for image optimization
- Cloudinary integration for cloud storage
- Support for images, videos, and documents
- Automatic thumbnail generation

## Default Credentials

After running the seed script:

- **Super Admin**: `superadmin@schoolcms.com` / `password123`
- **School Admin**: `admin@dkgacademy.com` / `admin123`

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run database seeding
npm run seed

# Run tests (when implemented)
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up reverse proxy with Nginx
4. Configure SSL certificates
5. Set up database backups
6. Configure monitoring and logging

## API Documentation

The API follows RESTful conventions with consistent response formats:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "current": 1,
    "pages": 10,
    "total": 100
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
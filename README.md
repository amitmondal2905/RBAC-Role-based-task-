# 🚀 Role-Based Assignment Management System (RBAC)

A production-level task management backend built with Node.js, Express, and MongoDB. This system features advanced authorization, secure authentication, and a complete audit trail.

##  Key Features
- ** Secure Authentication:** JWT-based auth with HttpOnly cookies and password hashing using bcryptjs.
- ** RBAC (Role-Based Access Control):** Granular permissions for Admin, Manager, and Employee roles.
- ** Task Workflow:** Full CRUD for tasks with priority levels, due dates, and status tracking.
- ** Audit Logs:** Automatic tracking of task reassignments and status changes via Assignment History.
- ** File Uploads:** Integration with Cloudinary for task attachments (Images/PDFs).
- ** Analytics Dashboard:** MongoDB Aggregation for real-time task statistics.
- ** Production Ready:** Security headers (Helmet), Rate Limiting, CORS, and Response Compression.
- ** Error Handling:** Centralized global error middleware for consistent API responses.

##  Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, Bcryptjs, Helmet, Express-Rate-Limit
- **Media:** Multer, Cloudinary

##  Project Structure
```text
├── app/
│   ├── config/         # Database and Cloudinary settings
│   ├── controllers/    # Business logic for Auth, Tasks, Roles, Users
│   ├── middlewares/    # Security, RBAC, Error, and Upload middlewares
│   ├── models/         # MongoDB Schemas (User, Role, Task, History)
│   ├── routes/         # API endpoints
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

##  Getting Started

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Environment Setup:** Create a `.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

##  API Endpoints

### Auth & Roles
- `POST /api/auth/register` - User Registration
- `POST /api/auth/login` - User Login
- `POST /api/roles` - Create Roles (Admin)

### Task Management
- `POST /api/tasks` - Create Task (Manager/Admin)
- `GET /api/tasks` - View Tasks (Filtered by role)
- `PATCH /api/tasks/:id/status` - Update Task Status
- `PATCH /api/tasks/:id/reassign` - Reassign Task (Manager)
- `GET /api/tasks/stats` - Dashboard Analytics

### User Management
- `GET /api/users` - View All Users (Admin)
- `PUT /api/users/:id` - Update User/Role (Admin)
- `DELETE /api/users/:id` - Soft Delete User (Admin)

##  Security & Performance
- **Helmet:** Protects against common web vulnerabilities by setting various HTTP headers.
- **CORS:** Controlled access to the API from different domains.
- **Compression:** Gzip compression to reduce response sizes and improve speed.
- **Rate Limiting:** Prevents brute-force attacks and abuse.
- **Error Middleware:** Global handling of Mongoose and server errors for clean JSON responses.

---
Developed with ❤️ by Amit Mondal

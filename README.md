# Simple SaaS Starter Kit

A modern, full-stack SaaS starter kit built with Node.js, React, and PostgreSQL. This boilerplate provides a solid foundation for building SaaS applications with authentication, user management, and a clean, responsive UI.

## 🚀 Features

### Backend
- **Express.js** server with ES modules
- **PostgreSQL** database with **Prisma ORM**
- **JWT-based authentication** (access + refresh tokens)
- **Password hashing** with bcrypt
- **Email verification** and password reset
- **Role-based access control**
- **Rate limiting** and security middleware
- **Input validation** with express-validator
- **Email service** with Nodemailer

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **Material-UI** for beautiful, responsive design
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Yup validation
- **Axios** for API calls with interceptors

### Development
- **ES Modules** throughout the codebase
- **ESLint** configuration for code quality
- **Jest** for testing
- **Concurrently** for running dev servers
- **Nodemon** for server auto-restart

## 📁 Project Structure

```
simple-saas-starter/
├── src/
│   ├── client/                 # React frontend
│   │   ├── public/            # Static assets
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── pages/         # Page components
│   │   │   ├── contexts/      # React contexts
│   │   │   ├── utils/         # Utilities and API calls
│   │   │   ├── App.jsx        # Main App component
│   │   │   └── main.jsx       # Entry point
│   │   ├── index.html         # HTML template
│   │   └── vite.config.js     # Vite configuration
│   │
│   ├── server/                # Node.js backend
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/           # Database models (Prisma)
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── app.js            # Express app
│   │
│   └── shared/               # Shared utilities (if needed)
│
├── prisma/
│   └── schema.prisma         # Database schema
├── tests/                    # Test files
├── scripts/                  # Setup and utility scripts
├── .env.example             # Environment variables template
└── package.json             # Dependencies and scripts
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL database

### Installation

1. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd simple-saas-starter
   node scripts/setup.js
   ```

2. **Configure environment:**
   Update `.env` with your database URL and other settings:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/saas_db"
   JWT_SECRET="your-super-secret-jwt-key"
   # ... other settings
   ```

3. **Setup database:**
   ```bash
   npm run db:push
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Health: http://localhost:3001/health

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Building
npm run build           # Build frontend for production
npm start              # Start production server

# Database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Create and run migrations
npm run db:studio      # Open Prisma Studio

# Testing
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

## 🔐 Authentication Flow

1. **Registration:** User signs up with email/password
2. **Email Verification:** Verification email sent (check console in dev)
3. **Login:** JWT tokens issued (access + refresh)
4. **Protected Routes:** Access token required
5. **Token Refresh:** Automatic refresh when access token expires
6. **Password Reset:** Email-based password reset flow

## 🎨 UI Components

The frontend uses Material-UI with a clean, modern design:

- **Login/Register** pages with validation
- **Dashboard** with user information
- **Profile** page for updating user details
- **Password reset** flow
- **Email verification** handling
- **Responsive layout** with navigation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

## 🛡️ Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** (100 requests per 15 minutes)
- **Password hashing** with bcrypt (12 rounds)
- **JWT tokens** with expiration
- **Input validation** and sanitization
- **SQL injection** protection via Prisma
- **XSS protection** via React's built-in escaping

## 🚀 Deployment

### Environment Variables
Set these in production:
```env
NODE_ENV=production
DATABASE_URL=your-production-db-url
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
# ... other production settings
```

### Build and Deploy
```bash
npm run build
npm start
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Tests include:
- Authentication endpoints
- User management
- Middleware functionality
- Input validation

## 📈 Extending the Starter

This starter provides a solid foundation. Consider adding:

- **Subscription/billing** (Stripe integration)
- **Team/organization** management
- **File upload** functionality
- **Real-time features** (WebSockets)
- **Admin dashboard**
- **API documentation** (Swagger)
- **Monitoring** and logging
- **CI/CD** pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this starter for your projects!

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Issues](your-repo-issues-url)
2. Review the environment configuration
3. Ensure PostgreSQL is running
4. Check the console for error messages

---

**Happy building!** 🚀
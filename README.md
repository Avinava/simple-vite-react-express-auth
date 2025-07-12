# 🚀 Simple Vite React Express Auth

A modern, full-stack authentication starter built with Vite, React, Express, and PostgreSQL. This boilerplate provides a solid foundation for building web applications with complete authentication, user management, and a beautiful, responsive UI.

> **✨ Features**: Modular landing page components, comprehensive database scripts, automated setup tools, and production-ready authentication!

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
- **Modular Landing Page** with 7 reusable components
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Yup validation
- **Axios** for API calls with interceptors
- **Animated Components** with smooth transitions

### Development & Database
- **ES Modules** throughout the codebase
- **ESLint** configuration for code quality
- **Jest** for testing
- **Concurrently** for running dev servers
- **Nodemon** for server auto-restart
- **Comprehensive Database Scripts** for setup, seeding, backup/restore
- **Automated Setup Tools** for quick project initialization
- **Sample Data** with realistic user accounts and roles

## 📁 Project Structure

```
simple-vite-react-express-auth/
├── src/
│   ├── client/                 # React frontend
│   │   ├── public/            # Static assets
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   │   └── landing/   # Modular landing page components
│   │   │   ├── pages/         # Page components
│   │   │   ├── contexts/      # React contexts
│   │   │   ├── utils/         # Utilities and API calls
│   │   │   ├── theme/         # Material-UI theme configuration
│   │   │   ├── App.jsx        # Main App component
│   │   │   └── main.jsx       # Entry point
│   │   ├── index.html         # HTML template
│   │   └── vite.config.js     # Vite configuration
│   │
│   ├── server/                # Node.js backend
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/       # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── errorHandler.middleware.js
│   │   │   └── notFound.middleware.js
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   │   ├── auth.service.js
│   │   │   └── email.service.js
│   │   └── app.js            # Express app
│   │
│   └── shared/               # Shared utilities (if needed)
│
├── prisma/
│   └── schema.prisma         # Database schema
├── tests/                    # Test files
├── scripts/                  # Database and setup scripts
│   ├── setup.js             # Initial project setup
│   ├── db-setup.js          # Database configuration
│   ├── seed.js              # Sample data seeding
│   ├── db-migrate.js        # Smart migration handling
│   ├── db-reset.js          # Database reset utility
│   ├── db-backup.js         # Database backup utility
│   └── db-restore.js        # Database restore utility
├── backups/                  # Database backups (auto-created)
├── .env.example             # Environment variables template
└── package.json             # Dependencies and scripts
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL database

### Installation

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd simple-vite-react-express-auth

# Run automated setup
npm run setup

# Set up database
npm run db:setup

# Seed with sample data
npm run db:seed

# Start development
npm run dev
```

### Option 2: Manual Setup
```bash
# Clone and install
git clone <your-repo-url>
cd simple-vite-react-express-auth
npm install

# Environment setup
cp .env.example .env
# Edit .env with your database URL and other settings

# Database setup
npm run db:migrate
npm run db:seed

# Start development
npm run dev
```

### 🔑 Sample Login Credentials
After seeding, you can use these accounts:
- **Super Admin**: `admin@saasStarter.com` / `Admin123!`
- **Admin**: `moderator@saasStarter.com` / `Mod123!`
- **User**: `john.doe@example.com` / `User123!`

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **Database Studio**: Run `npm run db:studio` to open Prisma Studio

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Building
npm run build           # Build frontend for production
npm start              # Start production server

# Setup & Database Management
npm run setup              # Initial project setup
npm run db:setup           # Complete database setup
npm run db:migrate         # Smart migration handling
npm run db:migrate:dev     # Run Prisma migrate dev
npm run db:migrate:reset   # Reset all migrations
npm run db:migrate:status  # Check migration status
npm run db:seed            # Populate with sample data
npm run db:reset           # Reset database and re-seed (⚠️ destructive)
npm run db:backup          # Create database backup
npm run db:restore         # Restore from backup
npm run db:generate        # Generate Prisma client
npm run db:push            # Push schema to database
npm run db:studio          # Open Prisma Studio

# Testing
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

## 🎨 Landing Page Components

The landing page has been refactored into 7 modular, reusable components:

### Component Structure
```
src/client/src/components/landing/
├── HeroSection.jsx          # Main hero with CTA buttons
├── StatsSection.jsx         # Animated statistics display
├── FeaturesSection.jsx      # Feature cards grid
├── TestimonialsSection.jsx  # Customer testimonials
├── CTASection.jsx          # Call-to-action section
├── FAQSection.jsx          # Frequently asked questions
├── NewsletterSection.jsx   # Email newsletter signup
└── index.js               # Barrel export for clean imports
```

### Features
- **Modular Design**: Each section is independently editable
- **Smooth Animations**: Fade-in effects and hover transitions
- **Responsive Layout**: Mobile-first design with Material-UI breakpoints
- **Interactive Elements**: Animated counters, expandable FAQs, form validation
- **Modern Styling**: Gradient backgrounds, glassmorphism effects, and micro-interactions

## 🗄️ Database Management

Comprehensive database scripts for development and production:

### Quick Commands
```bash
# Setup & Initialization
npm run setup              # Complete project setup
npm run db:setup           # Database configuration
npm run db:seed            # Add sample data

# Development
npm run db:migrate         # Smart migration handling
npm run db:studio          # Open database GUI

# Backup & Restore
npm run db:backup          # Create timestamped backup
npm run db:restore         # Interactive restore from backup

# Maintenance
npm run db:reset           # Reset and re-seed (⚠️ destructive)
```

### Sample Data
After running `npm run db:seed`, you'll have these test accounts:

| Role | Email | Password | Status |
|------|-------|----------|---------|
| Super Admin | admin@authstarter.com | Admin123! | ✅ Verified |
| Admin | moderator@authstarter.com | Mod123! | ✅ Verified |
| User | john.doe@example.com | User123! | ✅ Verified |
| User | jane.smith@example.com | User123! | ✅ Verified |
| User | sarah.chen@techstart.com | User123! | ✅ Verified |
| User | mike.rodriguez@devco.com | User123! | ❌ Unverified |

### Safety Features
- **Production Protection**: Destructive operations blocked in production
- **Backup Management**: Automatic timestamping and cleanup
- **Error Handling**: Comprehensive troubleshooting guidance
- **Confirmation Prompts**: Double confirmation for destructive operations

## 📁 Project Structure & Conventions

### File Naming Conventions
This project follows consistent naming patterns for better organization:

- **Controllers**: `*.controller.js` (e.g., `auth.controller.js`, `user.controller.js`)
- **Services**: `*.service.js` (e.g., `auth.service.js`, `email.service.js`)
- **Middleware**: `*.middleware.js` (e.g., `auth.middleware.js`, `errorHandler.middleware.js`)
- **Routes**: Standard naming (e.g., `auth.js`, `users.js`)

### Key Points
- **Single package.json**: Uses only the root-level `package.json` for dependency management
- **Single Prisma schema**: Database schema is located at `prisma/schema.prisma`
- **ES Modules**: All server code uses ES module syntax (`import/export`)
- **Consistent imports**: All file imports reflect the new naming conventions

## 🛠️ Development Workflow

### Daily Development
```bash
npm run dev             # Start development servers
npm run db:studio       # View/edit data in browser
```

### Schema Changes
```bash
# 1. Edit prisma/schema.prisma
# 2. Run migration
npm run db:migrate
# 3. Restart your app
```

### Before Major Changes
```bash
npm run db:backup       # Create safety backup
# Make your changes
npm run db:restore      # Restore if needed
```

### Fresh Start
```bash
npm run db:reset        # Reset everything
npm run dev             # Start fresh
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

## 🚨 Troubleshooting

### Database Issues
```bash
# Connection problems
npm run db:setup        # Validates connection and setup

# Migration issues
npm run db:migrate:status   # Check migration status
npm run db:push            # Force push schema (dev only)

# Reset if needed
npm run db:reset           # Nuclear option - resets everything
```

### Common Problems
- **Database connection failed**: Check if PostgreSQL is running and DATABASE_URL is correct
- **Permission denied**: Ensure database user has CREATE/DROP privileges
- **Migration conflicts**: Use `npm run db:migrate:reset` to reset migrations
- **Backup/restore fails**: Install PostgreSQL client tools (`brew install postgresql`)

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Material-UI Documentation](https://mui.com/)
- [React 18 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices from the React and Node.js communities
- Special thanks to all contributors and the open-source community

---

**Happy building!** 🚀

> **💡 Pro Tip**: Start with `npm run setup` for the smoothest experience!
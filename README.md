# 🚀 Backend Template - Drizzle ORM

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A modern, production-ready backend template with TypeScript, Fastify, and Drizzle ORM**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Database Management](#-database-management)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

This is a **production-ready backend template** built with modern technologies and best practices. It provides a solid foundation for building scalable REST APIs with TypeScript, featuring authentication, database management with Drizzle ORM, Redis caching, and comprehensive API documentation.

Perfect for:
- 🏢 Enterprise applications
- 🚀 MVPs and startups
- 📱 Mobile app backends
- 🌐 SaaS platforms
- 🔐 Applications requiring robust authentication

---

## ✨ Features

### Core Features
- ⚡ **High Performance** - Built on Fastify, one of the fastest web frameworks
- 🔒 **Authentication & Authorization** - JWT-based auth with role management
- 🗄️ **Type-Safe Database** - Drizzle ORM with full TypeScript support
- 📝 **Auto-Generated Docs** - Swagger/OpenAPI documentation
- 🔄 **Redis Caching** - Built-in Redis integration for optimal performance
- 🐳 **Docker Ready** - Complete Docker Compose setup
- 🎨 **Modular Architecture** - Clean, organized code structure
- ✅ **Input Validation** - Zod schemas for request/response validation
- 🛡️ **Security First** - CORS, password hashing, JWT tokens
- 📊 **Database Migrations** - Version-controlled schema changes

### Developer Experience
- 🔥 **Hot Reload** - Instant feedback during development
- 📐 **ESLint** - Code quality and consistency
- 🎯 **TypeScript** - Full type safety across the stack
- 🔍 **Type Provider** - Automatic type inference for routes
- 📦 **PNPM** - Fast, efficient package management

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Web Framework** | Fastify |
| **ORM** | Drizzle ORM |
| **Database** | PostgreSQL |
| **Cache** | Redis |
| **Validation** | Zod |
| **Authentication** | JWT (@fastify/jwt) |
| **Documentation** | Swagger/OpenAPI |
| **Dev Tools** | tsx, ESLint, TypeScript ESLint |
| **Container** | Docker & Docker Compose |
| **Package Manager** | pnpm |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Install](https://pnpm.io/installation)
- **Docker** & **Docker Compose** - [Install](https://docs.docker.com/get-docker/)
- **Git** - [Download](https://git-scm.com/downloads)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend-template-drizzle
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Application
PORT=3333
PRIVATE_KEY=your-super-secret-jwt-key-change-this

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=core_funnel

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis123
```

### 4. Start Docker Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379

### 5. Run Database Migrations

```bash
pnpm drizzle-kit push
```

### 6. Start Development Server

```bash
pnpm dev
```

The API will be available at `http://localhost:3333`

### 7. Access API Documentation

Open your browser and navigate to:
```
http://localhost:3333/docs
```

🎉 **You're all set!** The API is now running and ready for development.

---

## 📁 Project Structure

```
backend-template-drizzle/
├── drizzle/                    # Database migrations
├── source/
│   ├── database/              # Database configuration and schema
│   │   ├── client.ts          # Database client setup
│   │   └── schema.ts          # Drizzle schema definitions
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication module
│   │   │   ├── controller.ts  # Auth routes
│   │   │   ├── model.ts       # Auth database models
│   │   │   ├── schema.ts      # Auth validation schemas
│   │   │   └── service.ts     # Auth business logic
│   │   └── users/             # Users module
│   │       ├── controller.ts  # User routes
│   │       ├── model.ts       # User database models
│   │       ├── schema.ts      # User validation schemas
│   │       └── service.ts     # User business logic
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   │   ├── encrypt.ts         # Encryption utilities
│   │   ├── error.ts           # Error handling
│   │   ├── habilities.ts      # Authorization helpers
│   │   └── password.ts        # Password hashing
│   └── index.ts               # Application entry point
├── .env                       # Environment variables (not in git)
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # Docker services configuration
├── drizzle.config.ts          # Drizzle ORM configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Project dependencies
├── pnpm-lock.yaml            # Locked dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # You are here!
```

### Architecture Patterns

This project follows:
- **Modular Architecture** - Each feature is self-contained
- **Controller-Service Pattern** - Separation of routing and business logic
- **Repository Pattern** - Database access abstraction via Drizzle models
- **Schema Validation** - Input/output validation with Zod

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3333` |
| `PRIVATE_KEY` | JWT secret key | `your-secret-key` |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `postgres` |
| `POSTGRES_HOST` | PostgreSQL host | `localhost` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DATABASE` | Database name | `core_funnel` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | `redis123` |

### Security Notes

⚠️ **Important**: 
- Never commit `.env` files to version control
- Use strong, unique passwords in production
- Rotate JWT secrets regularly
- Use environment-specific configurations

---

## 🗄️ Database Management

### Drizzle Commands

```bash
# Generate migrations from schema changes
pnpm drizzle-kit generate

# Push schema changes to database
pnpm drizzle-kit push

# Open Drizzle Studio (visual database browser)
pnpm drizzle-kit studio

# Drop all tables (⚠️ dangerous!)
pnpm drizzle-kit drop
```

### Creating a New Model

1. Define your schema in the appropriate module:

```typescript
// source/modules/products/model.ts
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

2. Export it in `source/database/schema.ts`:

```typescript
export const products = ProductModel.products
```

3. Generate and push migrations:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

---

## 📚 API Documentation

### Swagger UI

The API documentation is automatically generated and available at:

```
http://localhost:3333/docs
```

Features:
- 📖 Interactive API documentation
- 🧪 Try-it-out functionality
- 📋 Request/response examples
- 🔒 JWT authentication support

### API Endpoints

#### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login user | ❌ |
| `POST` | `/auth/refresh` | Refresh token | ✅ |
| `POST` | `/auth/logout` | Logout user | ✅ |

#### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/users` | List all users | ✅ |
| `GET` | `/users/:id` | Get user by ID | ✅ |
| `PUT` | `/users/:id` | Update user | ✅ |
| `DELETE` | `/users/:id` | Delete user | ✅ |
| `GET` | `/users/me` | Get current user | ✅ |

---

## 🔐 Authentication

This template uses **JWT (JSON Web Tokens)** for authentication.

### How It Works

1. **Register** - User creates an account with email/password
2. **Login** - User receives a JWT token
3. **Authenticated Requests** - Token is sent in the Authorization header
4. **Authorization** - Routes can require specific roles

### Usage Example

#### Registration

```bash
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Authenticated Request

```bash
curl -X GET http://localhost:3333/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Role-Based Access Control

The template includes role management:
- `admin` - Full system access
- `user` - Standard user access
- Custom roles can be added in `source/database/schema.ts`

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Adding a New Module

1. Create module directory:
```bash
mkdir -p source/modules/products
```

2. Create module files:
```
source/modules/products/
├── controller.ts   # Routes
├── service.ts      # Business logic
├── model.ts        # Database models
└── schema.ts       # Validation schemas
```

3. Register in `source/index.ts`:
```typescript
import { ProductsController } from './modules/products'

app.register(ProductsController, { prefix: '/products' })
```

### Code Style

This project uses ESLint with TypeScript rules. Format your code:

```bash
pnpm lint
```

---

## 🧪 Testing

### Manual Testing

Use the Swagger UI at `http://localhost:3333/docs` for interactive testing.

### Testing with Postman/Insomnia

Import the OpenAPI spec:
```
http://localhost:3333/docs/json
```

---

## 🚢 Deployment

### Docker Production Build

```bash
# Build image
docker build -t backend-api .

# Run container
docker run -p 3333:3333 --env-file .env backend-api
```

### Environment Setup

1. Set production environment variables
2. Update `POSTGRES_HOST` and `REDIS_HOST` to production URLs
3. Use strong, unique `PRIVATE_KEY`
4. Enable SSL for database connections
5. Set up proper CORS origins

### Recommended Platforms

- **Docker** - Self-hosted or any cloud provider
- **Railway** - Easy deployment with Docker
- **Render** - Simple Node.js hosting
- **AWS ECS/Fargate** - Enterprise-grade container hosting
- **Google Cloud Run** - Serverless containers
- **DigitalOcean App Platform** - Managed hosting

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

Built with:
- [Fastify](https://fastify.dev/) - Fast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Zod](https://zod.dev/) - Schema validation
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Redis](https://redis.io/) - Caching

---

## 📞 Support

If you have any questions or need help:

- 📧 Open an issue on GitHub
- 💬 Start a discussion
- 📖 Check the documentation

---

<div align="center">

**Made with ❤️ and TypeScript**

⭐ Star this repo if you find it helpful!

</div>
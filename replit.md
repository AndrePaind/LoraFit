# Gentle Moves - Prenatal Fitness App

## Overview

Gentle Moves is a mobile-first web application designed for prenatal fitness and wellness. The app provides safe exercise routines specifically tailored for pregnant individuals, featuring 7 specific pregnancy-safe exercises with actual user-provided illustrations. Users can track their pregnancy progress, complete workout sessions of varying durations (5, 10, or 15 minutes), and monitor their daily fitness goals throughout their pregnancy journey. The app now focuses on a simplified, single-page experience without complex navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **UI Components**: Shadcn/ui component library providing accessible, customizable components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom pregnancy-themed color palette (sage, lavender, peach colors)
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive design optimized for mobile devices with simplified single-page interface

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent type safety across the stack
- **Storage Pattern**: Interface-based storage abstraction (IStorage) with in-memory implementation for development
- **API Design**: RESTful API endpoints for user management, exercises, and workout sessions
- **Development Server**: Vite integration for hot module replacement and fast development

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema versioning
- **Connection**: Neon Database serverless PostgreSQL for production
- **Development Storage**: In-memory storage implementation with seeded data for quick development

### Database Schema Design
- **Users**: Stores user profiles with pregnancy week tracking and daily goals
- **Exercises**: Comprehensive exercise library with difficulty levels, categories, and safety flags
- **Workout Sessions**: Tracks completed workout sessions with duration and completion metrics
- **Session Exercises**: Links exercises to specific workout sessions with completion status

### Authentication and Authorization
- **Current Implementation**: Single default user system for MVP
- **Session Management**: Uses connect-pg-simple for PostgreSQL-backed session storage
- **Future Extensibility**: Architecture supports multi-user authentication expansion

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **express**: Node.js web framework
- **vite**: Build tool and development server

### Database and ORM
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **drizzle-kit**: Database migration and schema management
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **connect-pg-simple**: PostgreSQL session store

### UI Component Libraries
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### Development Tools
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development plugins

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **zod**: Schema validation and type inference
- **react-hook-form**: Form state management
- **embla-carousel-react**: Touch-friendly carousel component

## Recent Changes (January 2025)

### App Simplification
- Removed bottom navigation and multiple menu pages (exercises, progress, profile)
- Created streamlined single-page experience focused directly on exercises
- Combined exercise library directly into the main home page
- Simplified routing to only include home page and workout session page

### Exercise Implementation
- Replaced all exercises with user's 7 specific exercises: Grounding Yourself, Cat and Cow, Hip Stretch, Lunges, Squats, Windmill, and Child Pose
- Integrated actual user-provided exercise images instead of SVG illustrations
- Increased image sizes significantly for better visibility (exercise cards: h-32, workout timer: h-40)
- Purple-themed exercise illustrations provided by user

### Workout Automation & Streak Tracking (January 2025)
- Fixed critical auto-advance bug preventing exercises from automatically progressing between sessions
- Implemented proper timer reset logic using exerciseId parameter to prevent restart loops
- Added comprehensive streak tracking system with database persistence
- Created separate UI sections for pregnancy progress and exercise streaks
- Added visual streak badges: 🌱 for beginners, ⭐ for 3+ day streaks, 🔥 for 7+ day streaks
- Automatic streak calculation: consecutive days, personal best tracking, smart reset logic
- Migrated from in-memory storage to PostgreSQL database for reliable data persistence
- Streak updates automatically after each completed workout session
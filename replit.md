# Gentle Moves - Prenatal Fitness App

## Overview

Gentle Moves is a mobile-first web application designed for prenatal fitness and wellness. The app provides safe exercise routines specifically tailored for pregnant individuals, featuring pregnancy-safe exercises across categories like breathing, stretching, strength training, and relaxation. Users can track their pregnancy progress, complete workout sessions of varying durations (5, 10, or 15 minutes), and monitor their daily fitness goals throughout their pregnancy journey.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **UI Components**: Shadcn/ui component library providing accessible, customizable components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom pregnancy-themed color palette (sage, lavender, peach colors)
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

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
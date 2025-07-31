# Education Platform - Replit Development Guide

## Overview

This is a full-stack educational platform built with React and Express, designed to deliver online courses with video content, progress tracking, and user management. The application follows a modern web architecture with a TypeScript frontend and backend, using Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Design**: RESTful API endpoints under `/api` prefix
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: In-memory storage implementation with interface for easy swapping

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Tables**: Users, Instructors, Courses, Lessons, Sections, Enrollments, Reviews
- **Migration Strategy**: Schema-first with Drizzle Kit

## Key Components

### Course Management System
- Course catalog with filtering by category
- Course details with instructor information, sections, and reviews
- Video-based lessons with progress tracking
- User enrollment and progress management

### Video Player
- Custom video player component with playback controls
- Progress tracking and lesson completion
- Course navigation with lesson sidebar
- Responsive design for mobile and desktop

### User Interface
- Modern, education-focused design with blue primary color scheme
- Responsive navigation with course discovery and progress tracking
- Card-based layouts for course listings
- Comprehensive UI component library using Shadcn/ui

### Data Layer
- Shared TypeScript types between frontend and backend
- Drizzle schema definitions with Zod validation
- In-memory storage implementation for development
- Interface-based storage design for easy database swapping

## Data Flow

1. **Course Discovery**: Users browse courses through the main catalog page with category filtering
2. **Course Enrollment**: Users can view course details and enroll in courses
3. **Video Learning**: Enrolled users access video lessons through the video player
4. **Progress Tracking**: System tracks lesson completion and overall course progress
5. **User Dashboard**: Progress page shows enrollment status and learning analytics

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for server state synchronization
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL with connection pooling
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: TSX for TypeScript execution in development

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Database Management**: Drizzle Kit for schema management and migrations
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Server**: Express with Vite middleware integration

## Deployment Strategy

### Development Setup
- Single command development with `npm run dev`
- Hot module replacement through Vite
- Automatic TypeScript checking
- Database schema synchronization with `npm run db:push`

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied during deployment
- **Static Assets**: Served through Express in production

### Environment Configuration
- Database connection through `DATABASE_URL` environment variable
- PostgreSQL dialect configuration in Drizzle
- Production/development environment detection
- Replit-specific optimizations for cloud deployment

### Key Architectural Decisions

1. **Monorepo Structure**: Frontend, backend, and shared code in single repository for easier development and type sharing
2. **TypeScript First**: Full TypeScript implementation for type safety across the entire stack
3. **Component-Based UI**: Shadcn/ui for consistent, accessible, and customizable components
4. **Server-Side Storage**: In-memory implementation with interface design for easy database integration
5. **Modern Tooling**: Vite for fast development, Drizzle for type-safe database operations
6. **Educational Focus**: Specialized features for course delivery, video learning, and progress tracking
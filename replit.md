# ShopHub E-Commerce Platform

## Overview

ShopHub is a modern e-commerce web application that combines products from the FakeStore API with admin-created products. Built with React, Express, and PostgreSQL, it provides a full-featured shopping experience with product browsing, cart management, and administrative capabilities for authenticated users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** React Context API for cart and theme management
- **Data Fetching:** TanStack React Query for server state management
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI primitives with shadcn/ui component library
- **Animations:** Framer Motion for smooth transitions and animations

**Design System:**
- Custom color palette based on HSL variables supporting light/dark themes
- Typography system using Inter (UI/body) and Space Grotesk (headings) from Google Fonts
- Responsive grid layouts with mobile-first approach
- Consistent spacing primitives using Tailwind utilities
- Component variants using class-variance-authority

**Key Features:**
- Product browsing with search, filtering, and pagination
- Shopping cart with local storage persistence
- Theme switching (light/dark mode)
- Responsive design with mobile navigation drawer
- Skeleton loaders for improved perceived performance
- Admin dashboard for authenticated users to create products

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM with Neon serverless PostgreSQL
- **Authentication:** Replit Auth (OpenID Connect) with Passport.js
- **Session Management:** express-session with PostgreSQL store

**API Design:**
- RESTful API endpoints under `/api/*`
- Product aggregation from FakeStore API and admin-created products
- Authentication-protected admin routes
- Session-based authentication with secure cookies

**Authentication Flow:**
- Implements Replit Auth for user authentication
- Uses OpenID Connect discovery protocol
- Session persistence in PostgreSQL
- Protected routes require authentication middleware
- Token refresh mechanism for maintaining user sessions

### Data Storage Solutions

**Database Schema:**
- **users:** Stores authenticated user profiles from Replit Auth
  - Fields: id, email, firstName, lastName, profileImageUrl, timestamps
  - Primary authentication entity

- **sessions:** Express session storage for authentication state
  - Session ID as primary key
  - JSON session data
  - Expiration timestamp with index

- **adminProducts:** User-created products
  - Auto-incrementing integer ID
  - Product details: title, price, description, category, image
  - Foreign key reference to users table
  - Creation timestamp

**Data Integration Strategy:**
- Merges external FakeStore API products with admin products
- Tags products by source ('fakestore' or 'admin') for identification
- Stores admin products in PostgreSQL for persistence
- Client-side cart state persisted in localStorage

### External Dependencies

**Third-Party APIs:**
- **FakeStore API** (https://fakestoreapi.com/products): Provides base product catalog
  - Free, no authentication required
  - Returns product data with id, title, price, description, category, image, and rating

**Authentication Services:**
- **Replit Auth**: OAuth2/OpenID Connect provider for user authentication
  - Issuer URL: https://replit.com/oidc
  - Requires REPL_ID and SESSION_SECRET environment variables
  - Provides user profile claims (sub, email, name, profile image)

**Database:**
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database
  - WebSocket-based connection using @neondatabase/serverless
  - Requires DATABASE_URL environment variable
  - Connection pooling for optimal performance

**UI Libraries:**
- **Radix UI**: Unstyled, accessible component primitives
  - Provides foundation for dialogs, dropdowns, navigation, forms
  - ARIA-compliant interactive components

- **shadcn/ui**: Pre-built component library built on Radix UI
  - New York style variant
  - Customized with project color scheme
  - TypeScript support with path aliases

**Development Tools:**
- **Vite**: Frontend build tool and development server
  - HMR (Hot Module Replacement) for rapid development
  - Production build optimization
  - Custom middleware mode for Express integration

- **Replit Vite Plugins**: Development enhancements
  - Runtime error overlay
  - Cartographer for code navigation
  - Development banner

**Asset Management:**
- Static images stored in attached_assets directory
- Google Fonts for web typography
- Unsplash for placeholder category images
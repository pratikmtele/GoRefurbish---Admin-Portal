<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# GoRefurbish Admin Portal - Development Guidelines

## Project Overview

This is a React-based admin portal for the GoRefurbish marketplace platform. It provides administrators and staff with tools to manage products, users, analytics, and platform settings.

## Technology Stack

- **Framework**: React 18 with JavaScript (not TypeScript)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics)

## Code Standards

### Component Structure

- Use functional components with hooks
- Follow React naming conventions (PascalCase for components)
- Keep components focused and single-responsibility
- Use custom hooks for complex logic

### Styling Guidelines

- Use Tailwind CSS classes exclusively
- Follow responsive design principles (mobile-first)
- Use consistent spacing: 4, 6, 8, 12, 16, 24 units
- Primary color scheme: Blue (blue-600, blue-700)
- Secondary colors: Gray shades for backgrounds and text

### State Management

- Use React Context for global state (auth, theme)
- Local state with useState for component-specific data
- Consider useReducer for complex state logic

### File Organization

```
src/
├── Components/     # Reusable UI components
├── Pages/          # Route-level components
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
├── context/        # React context providers
└── assets/         # Static assets
```

### Authentication

- Centralized auth context in App.jsx
- Protected routes for admin functionality
- Role-based access control (admin vs staff)
- Demo credentials for development

### Data Handling

- Mock data for development/demo purposes
- Consistent data formatting (dates, currency)
- Error handling for API-like operations
- Loading states for better UX

### UI/UX Guidelines

- Consistent color scheme matching main GoRefurbish site
- Professional admin interface design
- Responsive layout for all screen sizes
- Accessible components with proper ARIA labels
- Loading states and error handling
- Intuitive navigation and breadcrumbs

## Feature Requirements

### Core Features

1. **Authentication System**

   - Login with email/password
   - Role-based access (Admin/Staff)
   - Session management

2. **Dashboard**

   - Key metrics and statistics
   - Recent activity feed
   - Quick action buttons
   - Performance charts

3. **Product Management**

   - View all products with filtering
   - Approve/reject product listings
   - Bulk actions for multiple products
   - Product details and editing

4. **User Management**

   - View all platform users
   - User activity monitoring
   - Account management actions

5. **Analytics**

   - Sales and revenue charts
   - User engagement metrics
   - Platform performance data

6. **Settings**
   - Platform configuration
   - Admin user management
   - System settings

### Development Priorities

1. Focus on core admin functionality first
2. Ensure mobile responsiveness
3. Implement proper error handling
4. Add loading states for all async operations
5. Maintain consistency with main site design

## API Integration Notes

- Currently using mock data for development
- Prepare for real API integration
- Use consistent error handling patterns
- Implement proper loading states

## Security Considerations

- Input validation on all forms
- Proper authentication checks
- Role-based route protection
- Secure credential handling

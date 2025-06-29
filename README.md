# GoRefurbish Admin Portal

A modern, professional admin dashboard for managing the GoRefurbish marketplace platform.

## 🚀 Features

### ✅ Implemented

- **Authentication System** - Role-based login (Admin/Staff)
- **Dashboard Overview** - Real-time statistics and metrics
- **Product Management** - Review, approve/reject products with bulk actions
- **Responsive Layout** - Mobile-first design with collapsible sidebar
- **Professional UI** - Clean, modern interface with Tailwind CSS

### 🚧 Coming Soon

- **User Management** - Manage platform users and permissions
- **Advanced Analytics** - Charts and detailed reporting
- **System Settings** - Platform configuration options
- **Notifications** - Real-time alerts and messaging

## 🛠️ Technology Stack

- **React 18** - Modern functional components with hooks
- **JavaScript** - No TypeScript for simplicity
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side navigation
- **Lucide React** - Beautiful, consistent icons
- **Recharts** - For future analytics charts

## 🔐 Demo Credentials

### Administrator Access

- Email: `admin@gorefurbish.com`
- Password: `admin123`
- Permissions: Full system access

### Staff Access

- Email: `staff@gorefurbish.com`
- Password: `staff123`
- Permissions: Products and Users only

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── Components/
│   └── Layout.jsx          # Main admin layout with sidebar
├── Pages/
│   ├── Login.jsx           # Authentication page
│   ├── Dashboard.jsx       # Main dashboard with stats
│   ├── ProductManagement.jsx # Product review and management
│   ├── UserManagement.jsx  # User management (coming soon)
│   ├── Analytics.jsx       # Analytics dashboard (coming soon)
│   └── Settings.jsx        # System settings (coming soon)
├── App.jsx                 # Main app with routing and auth context
├── main.jsx               # App entry point
└── index.css              # Tailwind CSS imports
```

## 🎨 Design System

### Colors

- **Primary**: Blue (blue-600, blue-700)
- **Success**: Green (green-600, green-700)
- **Warning**: Yellow (yellow-600, yellow-700)
- **Danger**: Red (red-600, red-700)
- **Neutral**: Gray scale (gray-50 to gray-900)

### Layout

- **Sidebar**: 256px wide, collapsible on mobile
- **Content**: Full height with scrollable content area
- **Cards**: Rounded corners (rounded-lg) with subtle shadows

## 🔧 Development Guidelines

### Component Patterns

- Use functional components with React hooks
- Implement proper loading states for all async operations
- Include error handling and validation
- Follow accessibility best practices

### State Management

- Global auth state via React Context
- Local component state for UI interactions
- Mock data for development (easily replaceable with API calls)

### Styling

- Use Tailwind utility classes exclusively
- Maintain consistent spacing scale
- Implement responsive design patterns
- Follow mobile-first approach

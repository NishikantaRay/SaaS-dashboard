# SaaS Dashboard

A modern, full-featured SaaS admin dashboard built with React, Redux Toolkit, and Tailwind CSS. Features comprehensive user management, data visualization, dark/light theme support, and complete CRUD operations with form validation.

![Dashboard Preview](https://img.shields.io/badge/React-19.2.0-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.10.1-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-cyan) ![Tests Passing](https://img.shields.io/badge/tests-65_passing-success)

## ✨ Features

### 🎨 User Interface
- **Modern Flat Design** - Clean, minimalist UI without shadows
- **Dark/Light Theme** - Seamless theme switching with persistent preferences
- **Responsive Layout** - Three-column layout (sidebar, main content, notifications)
- **Smooth Animations** - Fluid transitions and interactions
- **Mobile Friendly** - Responsive design that works on all screen sizes

### 📊 Dashboard
- **4 Stat Cards** - Revenue, Orders, Customers, and Growth metrics
- **Revenue Line Chart** - Track revenue trends over time
- **Projections Bar Chart** - Visualize future projections
- **Revenue by Location Pie Chart** - Geographic revenue breakdown
- **Total Sales Donut Chart** - Sales distribution visualization
- **Products Table** - Sortable products with price and stock info

### 👥 User Management (CRUD)
- **Create Orders** - Add new user orders with validation
- **Read Orders** - View paginated list of all orders
- **Update Orders** - Edit existing orders with pre-filled forms
- **Delete Orders** - Remove orders with confirmation dialog
- **Search & Filter** - Real-time search across all order fields
- **Pagination** - Display 10 items per page with navigation

### ✅ Form Validation
- **Required Fields** - Order ID, User Name, Project, Address
- **Length Validation** - User Name (min 3), Address (min 5)
- **Real-time Errors** - Instant feedback with error messages
- **Toast Notifications** - Success/error notifications for all actions
- **Smart Validation** - Prevents submission of invalid data

### 🔔 Notifications System
- **Right Sidebar** - Dedicated notifications panel
- **Recent Activities** - Track user actions and updates
- **Contacts List** - Quick access to team members
- **Notification Count** - Visual indicators for unread items

### 🛠️ State Management
- **Redux Toolkit** - Global state management for orders
- **Persistent State** - Data consistency across components
- **Optimized Actions** - Efficient add, update, delete operations
- **DevTools Support** - Redux DevTools integration

### 🧪 Testing
- **65 Tests Passing** - Comprehensive test coverage
- **Unit Tests** - Form validation logic tests
- **Redux Tests** - Store and slice tests
- **Component Tests** - UI component tests
- **Integration Tests** - Full user flow tests

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NishikantaRay/SaaS-dashboard.git
   cd assiginment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Run all tests (watch mode)
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
assiginment/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base components (Button, Card, Input, Modal)
│   │   ├── Dashboard.jsx  # Main dashboard layout
│   │   ├── Header.jsx     # Top navigation bar
│   │   ├── Sidebar.jsx    # Left navigation menu
│   │   ├── NotificationsSidebar.jsx
│   │   ├── OrdersTable.jsx # User orders CRUD table
│   │   ├── StatCard.jsx   # Dashboard stat cards
│   │   ├── *Chart.jsx     # Chart components
│   │   └── Pagination.jsx # Pagination component
│   ├── pages/             # Page components
│   │   └── UserProfile.jsx
│   ├── store/             # Redux store
│   │   ├── store.js       # Store configuration
│   │   └── slices/
│   │       └── ordersSlice.js # Orders state management
│   ├── context/           # React Context
│   │   └── ThemeContext.jsx # Theme provider
│   ├── data/              # Mock data
│   │   ├── mockData.js
│   │   ├── ordersData.js
│   │   └── notificationsData.js
│   ├── tests/             # Test files
│   │   ├── setup.js
│   │   ├── test-utils.jsx
│   │   ├── formValidation.test.js
│   │   ├── ordersSlice.test.js
│   │   └── OrdersTable.test.jsx
│   ├── utils/             # Utility functions
│   │   └── cn.js          # Class name utility
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── eslint.config.js       # ESLint config
└── package.json           # Dependencies
```

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - UI library
- **Vite 7.2.2** - Build tool and dev server
- **Redux Toolkit 2.10.1** - State management
- **React Router DOM 7.9.6** - Client-side routing

### Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Lucide React 0.554.0** - Icon library
- **clsx 2.1.1** - Conditional class names

### Visualization
- **Recharts 3.4.1** - Charts and data visualization

### Notifications
- **React Toastify 11.0.5** - Toast notifications

### Testing
- **Vitest 4.0.12** - Unit test framework
- **Testing Library 16.3.0** - React component testing
- **jsdom 27.2.0** - DOM implementation for testing

## 🎯 Key Features Explained

### 1. User Management System

The user management system provides complete CRUD functionality:

**Create:**
- Click "Add Order" button
- Fill in all required fields
- Form validation ensures data quality
- Success notification confirms creation

**Read:**
- View all orders in a paginated table
- Search across all fields (ID, user, project, address)
- See formatted dates (relative time)
- View status with color-coded badges

**Update:**
- Click edit icon next to any order
- Form pre-fills with existing data
- Modify fields as needed
- Save changes with validation

**Delete:**
- Click delete icon
- Confirmation dialog prevents accidents
- Order removed from Redux store
- Success notification appears

### 2. Form Validation

Validation rules:
- **Order ID**: Required, cannot be empty
- **User Name**: Required, minimum 3 characters
- **Project**: Required, cannot be empty
- **Address**: Required, minimum 5 characters
- **Status**: Dropdown selection (Pending, In Progress, Complete, Approved, Rejected)

Validation feedback:
- Red border on invalid fields
- Error message below each field
- Toast notification on submission error
- Prevents form submission until valid

### 3. Redux State Management

All order data flows through Redux:
```javascript
// Actions available:
- addOrder(order)       // Add new order
- updateOrder(data)     // Update existing order
- deleteOrder(data)     // Remove order
- setOrders(orders)     // Replace all orders
- setLoading(bool)      // Set loading state
- setError(error)       // Set error state
```

Benefits:
- Single source of truth
- Predictable state updates
- Easy to debug with DevTools
- Persistent across components

### 4. Theme System

Theme management with React Context:
- **Dark Mode**: Pure black (#000000) with white/10% opacity overlays
- **Light Mode**: White backgrounds with gray accents
- **Persistent**: Saves preference to localStorage
- **Smooth**: Transitions between themes

### 5. Testing Coverage

**Form Validation Tests (23 tests):**
- Required field validation
- Length validation
- Edge cases (null, undefined, special chars)

**Redux Slice Tests (23 tests):**
- Initial state
- Add/update/delete operations
- State mutations
- Action creators

**Component Tests (19 active tests):**
- Rendering
- User interactions
- Search functionality
- CRUD operations
- Notifications

## 🔧 Configuration

### Environment Variables

No environment variables required for basic setup. All data is mocked locally.

### Customization

**Theme Colors (tailwind.config.js):**
```javascript
darkMode: 'class',
// Colors are defined in Tailwind defaults
```

**Redux Store (src/store/store.js):**
```javascript
export const store = configureStore({
  reducer: {
    orders: ordersReducer
  }
});
```

## 📸 Screenshots

### Light Mode Dashboard
- Clean stat cards with metrics
- Multiple chart visualizations
- Products table with sorting

### Dark Mode Dashboard
- Pure black backgrounds
- White/10% opacity overlays
- Smooth theme transitions

### User Management
- Complete CRUD operations
- Form validation in action
- Toast notifications
- Search and pagination

## 🧪 Testing

Run the test suite:

```bash
# Run all tests in watch mode
npm test

# Run tests once (CI mode)
npm test -- --run

# Run specific test file
npm test OrdersTable.test

# Run with coverage
npm run test:coverage
```

Test organization:
- `formValidation.test.js` - Pure validation logic
- `ordersSlice.test.js` - Redux store tests
- `OrdersTable.test.jsx` - Component integration tests

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Nishikanta Ray**
- GitHub: [@NishikantaRay](https://github.com/NishikantaRay)
- Repository: [SaaS-dashboard](https://github.com/NishikantaRay/SaaS-dashboard)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Redux Toolkit for simplified state management
- Recharts for beautiful visualizations
- Lucide for the icon library

---

**Built with ❤️ using React, Redux Toolkit, and Tailwind CSS**

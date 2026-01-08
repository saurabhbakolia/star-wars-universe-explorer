# Star Wars Universe Explorer - Setup Guide

## 🎯 Project Overview

**Project Name**: Star Wars Universe Explorer (`sw-universe-explorer`)

A modern, type-safe React application built for a coding challenge that demonstrates:
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- TanStack Query for server state
- Zustand for client state
- Zod for validation
- Comprehensive testing setup

## 📋 What's Been Built

### ✅ Completed Features

1. **Project Setup**
   - Vite + React 18 + TypeScript
   - Tailwind CSS configured with custom theme
   - All required dependencies installed

2. **Type Safety**
   - Complete Zod schemas for all SWAPI resources
   - TypeScript types generated from Zod schemas
   - No `any` types used

3. **API Integration**
   - Robust API client with error handling
   - TanStack Query hooks for data fetching
   - Request/response interceptors
   - Proper error messages for users

4. **State Management**
   - Zustand store for favorites (with localStorage persistence)
   - TanStack Query for server state caching

5. **UI Components**
   - Reusable Card components
   - Search bar with debouncing
   - Loading spinners
   - Error displays
   - Responsive navigation

6. **Pages**
   - Characters page with search and pagination
   - Starships page with search and pagination
   - Films timeline page
   - Character detail page
   - Starship detail page

7. **Features**
   - Search functionality (debounced)
   - Pagination
   - Favorites system (localStorage)
   - Responsive design
   - Loading states
   - Error handling

8. **Testing**
   - Vitest configuration
   - Unit tests for utilities
   - Playwright E2E tests
   - Test setup files

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (or 22+)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies** (if not already done):
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open browser**:
Navigate to `http://localhost:5173`

### Running Tests

**Unit Tests**:
```bash
npm run test
```

**E2E Tests**:
```bash
npm run test:e2e
```

**E2E Tests with UI**:
```bash
npm run test:e2e:ui
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # UI components
│   │   ├── ui/             # Base components (Button, Card, etc.)
│   │   ├── CharacterCard.tsx
│   │   ├── StarshipCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorDisplay.tsx
│   │   └── Layout.tsx
│   ├── pages/              # Page components
│   │   ├── CharactersPage.tsx
│   │   ├── StarshipsPage.tsx
│   │   ├── FilmsPage.tsx
│   │   ├── CharacterDetailPage.tsx
│   │   └── StarshipDetailPage.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useCharacters.ts
│   │   ├── useStarships.ts
│   │   └── useFilms.ts
│   ├── lib/                # Utilities and services
│   │   ├── api/
│   │   │   ├── client.ts   # Axios client with error handling
│   │   │   └── swapi.ts    # SWAPI service
│   │   ├── schemas/
│   │   │   └── swapi.ts    # Zod schemas
│   │   ├── utils.ts        # Helper functions
│   │   └── cn.ts           # className utility
│   ├── store/
│   │   └── favoritesStore.ts  # Zustand store
│   ├── test/
│   │   └── setup.ts        # Test setup
│   ├── App.tsx             # Main app with routing
│   └── main.tsx             # Entry point
├── e2e/                     # Playwright tests
│   └── app.spec.ts
├── public/                  # Static assets
├── vitest.config.ts         # Vitest configuration
├── playwright.config.ts     # Playwright configuration
└── package.json
```

## 🎨 Design Decisions

### Color Palette
- **Dark Theme**: Space-inspired dark backgrounds
- **Gold Accents**: Star Wars gold (#FFD700) for highlights
- **Glassmorphism**: Modern glass effects for cards

### Component Architecture
- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Reusability**: Base components that can be composed
- **Accessibility**: Proper ARIA labels and semantic HTML

### State Management Strategy
- **TanStack Query**: All server state (API data)
- **Zustand**: Client state (favorites, UI state)
- **React State**: Component-local state only

### Error Handling
- **API Level**: Interceptors for request/response errors
- **Component Level**: Error boundaries and error displays
- **User-Friendly**: Clear error messages with retry options

## 🔧 Key Features Explained

### 1. Type Safety
- All API responses validated with Zod
- TypeScript types generated from schemas
- No `any` types anywhere

### 2. Search Functionality
- Debounced search (300ms delay)
- Real-time filtering
- Works across all resource types

### 3. Favorites System
- Persisted in localStorage
- Zustand store for state management
- Visual indicators (star icons)

### 4. Pagination
- Server-side pagination
- Previous/Next buttons
- Page indicators

### 5. Responsive Design
- Mobile-first approach
- Grid layouts that adapt
- Touch-friendly interactions

## 🐛 Known Issues / Future Improvements

1. **Backend Proxy** (Optional)
   - Could add Express backend for caching
   - Rate limiting
   - Request aggregation

2. **Additional Features**
   - Character comparison
   - Starship comparison tool
   - Advanced filtering
   - Export favorites

3. **Performance**
   - Image optimization
   - Code splitting
   - Lazy loading

4. **Accessibility**
   - Keyboard navigation improvements
   - Screen reader optimizations
   - Focus management

## 📝 Notes for Demo

### What to Highlight

1. **Type Safety**: Show Zod schemas and TypeScript usage
2. **State Management**: Explain TanStack Query vs Zustand usage
3. **Error Handling**: Show error states and retry mechanisms
4. **Component Architecture**: Show reusable components
5. **Testing**: Show test files and explain coverage
6. **AI Usage**: Discuss how AI was used (code generation, refactoring, etc.)

### Demo Flow

1. Start with the Characters page
2. Show search functionality
3. Navigate to a character detail
4. Add to favorites
5. Show Starships page
6. Show Films timeline
7. Show responsive design (resize browser)
8. Show error handling (disconnect network)
9. Show tests running

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `dist` folder

## 📚 Resources

- [SWAPI Documentation](https://swapi.info/)
- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)

## ✅ Checklist for Demo

- [x] Project setup complete
- [x] All dependencies installed
- [x] Type safety implemented
- [x] API integration working
- [x] UI components built
- [x] Pages implemented
- [x] Routing configured
- [x] Error handling added
- [x] Loading states added
- [x] Tests written
- [x] README created
- [x] Code is clean and well-organized

## 🎉 Ready for Demo!

The application is ready for demonstration. All core features are implemented, tested, and documented.

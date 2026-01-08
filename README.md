# Star Wars Universe Explorer

A modern, type-safe React application for exploring the Star Wars universe using the SWAPI (Star Wars API). Built with React 18, TypeScript, Vite, Tailwind CSS, and TanStack Query.

## 🚀 Features

- **Character Explorer**: Browse and search Star Wars characters with detailed information
- **Starship Catalog**: Explore starships with specifications and comparisons
- **Film Timeline**: View all Star Wars films in chronological order
- **Favorites System**: Save your favorite characters and starships (persisted in localStorage)
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI components
- **Zustand** - Client state management (favorites)
- **TanStack Query** - Server state management (API data)
- **Zod** - Schema validation
- **React Router** - Navigation

### Testing
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Testing Library** - Component testing utilities

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
# Run Playwright tests
npx playwright test

# Run with UI
npx playwright test --ui
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Card, etc.)
│   │   ├── CharacterCard.tsx
│   │   ├── StarshipCard.tsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── CharactersPage.tsx
│   │   ├── StarshipsPage.tsx
│   │   └── FilmsPage.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useCharacters.ts
│   │   └── useStarships.ts
│   ├── lib/                 # Utilities and services
│   │   ├── api/             # API client and services
│   │   ├── schemas/         # Zod schemas
│   │   └── utils.ts         # Helper functions
│   ├── store/               # Zustand stores
│   │   └── favoritesStore.ts
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── e2e/                     # Playwright E2E tests
└── public/                  # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Deep space blue (#0A1929)
- **Accent**: Gold (#FFD700) for highlights
- **Background**: Dark (#0F1419) with gradients
- **Text**: Light gray (#E5E7EB)

### Components
- Glassmorphism effects
- Smooth transitions and hover states
- Responsive grid layouts
- Accessible components with proper ARIA labels

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (if configured)

## 📝 API Integration

The app uses the SWAPI (Star Wars API) at `https://swapi.info/api`. All API responses are validated using Zod schemas for type safety.

### API Endpoints Used
- `/people` - Characters
- `/starships` - Starships
- `/films` - Films
- `/planets` - Planets (available but not fully implemented)

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables

Currently, no environment variables are required. The API base URL is hardcoded, but can be moved to an env variable if needed.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is created for a coding challenge/demo purposes.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.info/) for providing the Star Wars API
- All the amazing open-source libraries used in this project

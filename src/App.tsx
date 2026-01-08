import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { CharactersPage } from './pages/CharactersPage';
import { StarshipsPage } from './pages/StarshipsPage';
import { FilmsPage } from './pages/FilmsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { StarshipDetailPage } from './pages/StarshipDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/characters/:id" element={<CharacterDetailPage />} />
            <Route path="/starships" element={<StarshipsPage />} />
            <Route path="/starships/:id" element={<StarshipDetailPage />} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

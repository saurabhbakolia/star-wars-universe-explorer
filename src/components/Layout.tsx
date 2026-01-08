import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Characters' },
    { path: '/starships', label: 'Starships' },
    { path: '/films', label: 'Films' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sw-dark via-sw-blue to-sw-dark">
      <nav className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-sw-gold">⭐</span>
              <span className="text-xl font-bold text-sw-gray">Star Wars Explorer</span>
            </Link>
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-lg transition-all duration-200',
                    location.pathname === item.path
                      ? 'bg-sw-gold/20 text-sw-gold font-semibold'
                      : 'text-sw-gray hover:text-sw-gold hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

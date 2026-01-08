import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Characters' },
    { path: '/starships', label: 'Starships' },
    { path: '/films', label: 'Films' },
    { path: '/favorites', label: 'Favorites' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sw-dark via-sw-blue to-sw-dark">
      <nav className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-xl sm:text-2xl font-bold text-sw-gold">⭐</span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-sw-gray">Star Wars Explorer</span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base',
                    location.pathname === item.path
                      ? 'bg-sw-gold/20 text-sw-gold font-semibold'
                      : 'text-sw-gray hover:text-sw-gold hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-sw-gray hover:text-sw-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t border-white/10 pt-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
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
          )}
        </div>
      </nav>
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">{children}</main>
    </div>
  );
};

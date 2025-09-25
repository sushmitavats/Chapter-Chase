import React, { useState } from 'react';
import { Search, Heart, User, Sun, Moon, Menu, X, BookOpen } from 'lucide-react';
import UserProfileDropdown from './UserProfileDropdown';
import { User as UserType } from '../types';

interface HeaderProps {
  currentPage: 'home' | 'favorites';
  setCurrentPage: (page: 'home' | 'favorites') => void;
  onSearch: (query: string) => void;
  favoritesCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onSearch,
  favoritesCount,
  isDarkMode,
  toggleDarkMode,
  user,
  onAuthClick,
  onLogout
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setCurrentPage('home');
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (page: 'home' | 'favorites') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    // Handle profile settings click
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/95 border-gray-700' 
        : 'bg-white/95 border-purple-100'
    } backdrop-blur-md border-b shadow-sm`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Book Finder
              </h1>
              <p className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user ? `Hi ${user.name.split(' ')[0]} — find your next read` : 'Hi Alex — find your next read'}
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search books by title, author, or subject..."
                  className={`w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400 border border-gray-600' 
                      : 'bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-blue-400 border border-gray-200'
                  } hover:shadow-md`}
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavigation('favorites')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                currentPage === 'favorites'
                  ? (isDarkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white')
                  : (isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700')
              }`}
            >
              <Heart className={`w-5 h-5 ${
                currentPage === 'favorites' ? 'fill-current' : ''
              }`} />
              <span className="font-medium">Favorites</span>
              {favoritesCount > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isDarkMode ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {user ? (
              <UserProfileDropdown
                user={user}
                onLogout={onLogout}
                onProfileClick={handleProfileClick}
                isDarkMode={isDarkMode}
              />
            ) : (
              <button
                onClick={onAuthClick}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-purple-50 text-gray-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t transition-colors ${
            isDarkMode ? 'border-gray-700' : 'border-purple-100'
          }`}>
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mt-4 mb-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search books..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-400 border border-gray-600' 
                      : 'bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-blue-400 border border-gray-200'
                  }`}
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => handleNavigation('favorites')}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  currentPage === 'favorites'
                    ? (isDarkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white')
                    : (isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700')
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  currentPage === 'favorites' ? 'fill-current' : ''
                }`} />
                <span className="font-medium">Favorites</span>
                {favoritesCount > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isDarkMode ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700'
                  }`}>
                    {favoritesCount}
                  </span>
                )}
              </button>

              <div className="flex items-center justify-between pt-2">
                {user ? (
                  <div className="flex items-center space-x-3 p-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isDarkMode ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    }`}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.name}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={onAuthClick}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Sign In</span>
                  </button>
                )}

                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-purple-50 text-gray-700'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="font-medium">{isDarkMode ? 'Light' : 'Dark'} Mode</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Search, BookOpen, Star, Users } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  userName?: string;
}

const Hero: React.FC<HeroProps> = ({ onSearch, userName }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const popularSearches = [
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'Psychology',
    'History'
  ];

  return (
    <section className="text-center py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Hi {userName || 'Alex'}! 👋
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Discover Your Next Amazing Read
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search through millions of books from the Open Library. Find books by title, author, or explore new subjects to expand your reading horizons.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for books by title, author, or subject..."
              className="block w-full pl-12 pr-20 py-4 text-lg border-2 border-purple-200 rounded-2xl
                       focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300
                       bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="submit"
                disabled={!searchInput.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl
                         hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-md"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="mb-16">
          <p className="text-gray-600 mb-4 font-medium">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => {
                  setSearchInput(search);
                  onSearch(search);
                }}
                className="px-4 py-2 bg-white/70 text-gray-700 rounded-full border border-purple-200
                         hover:bg-purple-50 hover:border-purple-300 transition-all duration-300
                         hover:scale-105 shadow-sm hover:shadow-md"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Vast Library</h3>
            <p className="text-gray-600">
              Access millions of books from the Open Library database with detailed information and covers.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Favorites</h3>
            <p className="text-gray-600">
              Keep track of interesting books by adding them to your personal favorites list.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-br from-green-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Discover More</h3>
            <p className="text-gray-600">
              Explore books by subject, author, or publication year to find your next great read.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
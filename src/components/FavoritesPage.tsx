import React from 'react';
import { Heart, BookOpen } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '../types';

interface FavoritesPageProps {
  favorites: Book[];
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  isDarkMode: boolean;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onBookClick,
  onToggleFavorite,
  isDarkMode
}) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          isDarkMode ? 'bg-gray-700' : 'bg-pink-100'
        }`}>
          <Heart className={`w-10 h-10 ${
            isDarkMode ? 'text-gray-400' : 'text-pink-500'
          }`} />
        </div>
        <h2 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          No Favorites Yet
        </h2>
        <p className={`text-lg mb-8 max-w-md mx-auto ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Start exploring books and add them to your favorites to see them here!
        </p>
        <div className={`inline-flex items-center px-6 py-3 rounded-full ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          <BookOpen className="w-5 h-5 mr-2" />
          Search for books to get started
        </div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Heart className={`w-8 h-8 mr-3 ${
            isDarkMode ? 'text-pink-400' : 'text-pink-500'
          } fill-current`} />
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Your Favorites
          </h1>
        </div>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          You have {favorites.length} favorite book{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onBookClick={onBookClick}
            onToggleFavorite={onToggleFavorite}
            isFavorite={true}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
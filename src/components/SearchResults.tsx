import React from 'react';
import { AlertCircle, BookOpen } from 'lucide-react';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';
import { Book } from '../types';

interface SearchResultsProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  searchQuery: string;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  isFavorite: (book: Book) => boolean;
  onLoadMore: () => void;
  hasMoreResults: boolean;
  isDarkMode: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  books,
  isLoading,
  error,
  hasSearched,
  searchQuery,
  onBookClick,
  onToggleFavorite,
  isFavorite,
  onLoadMore,
  hasMoreResults,
  isDarkMode
}) => {
  if (!hasSearched && !isLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
        }`}>
          <AlertCircle className={`w-8 h-8 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Oops! Something went wrong
        </h3>
        <p className={`text-gray-600 mb-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl
                   hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading && books.length === 0) {
    return (
      <div className="text-center py-16">
        <LoadingSpinner />
        <p className={`mt-4 text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Searching for books...
        </p>
      </div>
    );
  }

  if (hasSearched && books.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <BookOpen className={`w-8 h-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          No books found
        </h3>
        <p className={`mb-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          We couldn't find any books matching "{searchQuery}". Try searching for:
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          {['Classic Literature', 'Science Fiction', 'Mystery', 'Biography'].map((suggestion) => (
            <span
              key={suggestion}
              className={`px-3 py-1 text-sm rounded-full ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="pb-8">
      {hasSearched && (
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Search Results for "{searchQuery}"
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Found {books.length} book{books.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onBookClick={onBookClick}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(book)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreResults && !isLoading && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className={`px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Load More Books
          </button>
        </div>
      )}

      {/* Loading More Indicator */}
      {isLoading && books.length > 0 && (
        <div className="text-center py-8">
          <LoadingSpinner size="sm" />
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Loading more books...
          </p>
        </div>
      )}
    </section>
  );
};

export default SearchResults;
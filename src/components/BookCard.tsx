import React, { useState } from 'react';
import { Heart, Calendar, User, Eye } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
  isDarkMode: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onBookClick,
  onToggleFavorite,
  isFavorite,
  isDarkMode
}) => {
  const [imageError, setImageError] = useState(false);

  const coverUrl = book.cover_i && !imageError
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(book);
  };

  return (
    <div
      className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 
                 hover:shadow-2xl hover:scale-105 ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-750' 
          : 'bg-white hover:bg-gray-50'
      }`}
      onClick={() => onBookClick(book)}
    >
      {/* Book Cover */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-purple-100'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-gray-600' : 'bg-white/70'
              }`}>
                📚
              </div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No Cover
              </p>
            </div>
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            isFavorite
              ? 'bg-pink-500 text-white shadow-lg'
              : (isDarkMode ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' : 'bg-white/80 text-gray-600 hover:bg-white')
          } backdrop-blur-sm`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Book Details */}
      <div className="p-5">
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {book.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <User className={`w-4 h-4 mr-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {book.author_name.slice(0, 2).join(', ')}
              {book.author_name.length > 2 && '...'}
            </span>
          </div>
          
          {book.first_publish_year && (
            <div className="flex items-center text-sm">
              <Calendar className={`w-4 h-4 mr-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {book.first_publish_year}
              </span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookClick(book);
          }}
          className={`flex items-center justify-center w-full py-2.5 px-4 rounded-xl transition-all duration-300 
                     hover:scale-105 shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
          }`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
import React from 'react';
import { X, Heart, Calendar, User, Globe, BookOpen, Building, Hash } from 'lucide-react';
import { Book } from '../types';

interface BookDetailsModalProps {
  book: Book;
  onClose: () => void;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
  isDarkMode: boolean;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  book,
  onClose,
  onToggleFavorite,
  isFavorite,
  isDarkMode
}) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Book Details
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors hover:scale-110 ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                  />
                ) : (
                  <div className={`w-full max-w-sm mx-auto aspect-[3/4] rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-purple-100'
                  }`}>
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-600' : 'bg-white/70'
                      }`}>
                        📚
                      </div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        No Cover Available
                      </p>
                    </div>
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => onToggleFavorite(book)}
                  className={`flex items-center justify-center w-full mt-6 py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-md ${
                    isFavorite
                      ? 'bg-pink-500 hover:bg-pink-600 text-white'
                      : (isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>

            {/* Book Information */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className={`text-3xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {book.title}
                </h1>
                <div className="flex items-center mb-4">
                  <User className={`w-5 h-5 mr-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {book.author_name.join(', ')}
                  </span>
                </div>
              </div>

              {/* Basic Details */}
              <div className={`grid sm:grid-cols-2 gap-4 p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                {book.first_publish_year && (
                  <div className="flex items-center">
                    <Calendar className={`w-5 h-5 mr-3 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        First Published
                      </p>
                      <p className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {book.first_publish_year}
                      </p>
                    </div>
                  </div>
                )}

                {book.number_of_pages_median && (
                  <div className="flex items-center">
                    <BookOpen className={`w-5 h-5 mr-3 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Pages
                      </p>
                      <p className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {book.number_of_pages_median}
                      </p>
                    </div>
                  </div>
                )}

                {book.isbn && (
                  <div className="flex items-center">
                    <Hash className={`w-5 h-5 mr-3 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-500'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        ISBN
                      </p>
                      <p className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {book.isbn}
                      </p>
                    </div>
                  </div>
                )}

                {book.language && book.language.length > 0 && (
                  <div className="flex items-center">
                    <Globe className={`w-5 h-5 mr-3 ${
                      isDarkMode ? 'text-orange-400' : 'text-orange-500'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Language
                      </p>
                      <p className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {book.language.join(', ').toUpperCase()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Publishers */}
              {book.publisher && book.publisher.length > 0 && (
                <div>
                  <div className="flex items-center mb-3">
                    <Building className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Publishers
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.publisher.map((pub, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {pub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {book.subject && book.subject.length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Subjects & Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.map((subject, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Open Library Link */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
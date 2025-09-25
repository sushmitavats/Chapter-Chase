import { useState, useEffect } from 'react';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Hero from './components/Hero';
import SearchResults from './components/SearchResults';
import BookDetailsModal from './components/BookDetailsModal';
import FavoritesPage from './components/FavoritesPage';
import Footer from './components/Footer';
import { Book, SearchResponse, User, AuthState } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'favorites'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchOffset, setCurrentSearchOffset] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false, isLoading: false });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bookFinderUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('bookFinderUser');
      }
    }
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('bookFinderFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('bookFinderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save user data to localStorage whenever auth state changes
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('bookFinderUser', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('bookFinderUser');
    }
  }, [authState.user]);

  const handleLogin = async (email: string, name?: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user (in real app, this would be an API call)
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Alex Johnson',
      email: email,
      joinDate: new Date().toISOString()
    };
    
    setAuthState({ user, isAuthenticated: true, isLoading: false });
  };

  const handleLogout = () => {
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    // Optionally clear favorites on logout
    // setFavorites([]);
  };

  const searchBooks = async (query: string, offset = 0, append = false) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20&offset=${offset}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data: SearchResponse = await response.json();
      
      const formattedBooks: Book[] = data.docs.map(doc => ({
        key: doc.key,
        title: doc.title || 'Unknown Title',
        author_name: doc.author_name || ['Unknown Author'],
        first_publish_year: doc.first_publish_year,
        isbn: doc.isbn?.[0],
        cover_i: doc.cover_i,
        subject: doc.subject?.slice(0, 5) || [],
        publisher: doc.publisher?.slice(0, 3) || [],
        language: doc.language || ['eng'],
        number_of_pages_median: doc.number_of_pages_median,
      }));

      if (append) {
        setBooks(prev => [...prev, ...formattedBooks]);
      } else {
        setBooks(formattedBooks);
        setHasSearched(true);
      }

      setHasMoreResults(formattedBooks.length === 20);
      setCurrentSearchOffset(offset + 20);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentSearchOffset(0);
    searchBooks(query, 0, false);
  };

  const handleLoadMore = () => {
    if (searchQuery && hasMoreResults && !isLoading) {
      searchBooks(searchQuery, currentSearchOffset, true);
    }
  };

  const toggleFavorite = (book: Book) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.key === book.key);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.key !== book.key);
      } else {
        return [...prev, book];
      }
    });
  };

  const isFavorite = (book: Book) => {
    return favorites.some(fav => fav.key === book.key);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
        favoritesCount={favorites.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        user={authState.user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' ? (
          <>
            {!hasSearched && (
              <Hero 
                onSearch={handleSearch} 
                userName={authState.user?.name.split(' ')[0]}
              />
            )}
            
            <SearchResults 
              books={books}
              isLoading={isLoading}
              error={error}
              hasSearched={hasSearched}
              searchQuery={searchQuery}
              onBookClick={setSelectedBook}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              onLoadMore={handleLoadMore}
              hasMoreResults={hasMoreResults}
              isDarkMode={isDarkMode}
            />
          </>
        ) : (
          <FavoritesPage 
            favorites={favorites}
            onBookClick={setSelectedBook}
            onToggleFavorite={toggleFavorite}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedBook)}
          isDarkMode={isDarkMode}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
      />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`py-8 border-t ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm">
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Made with{' '}
              <Heart className="inline w-4 h-4 text-red-500 fill-current" />{' '}
              for Alex
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 transition-colors hover:scale-105 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span>Powered by Open Library</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <div className={`${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              •
            </div>
            
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 Book Finder
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
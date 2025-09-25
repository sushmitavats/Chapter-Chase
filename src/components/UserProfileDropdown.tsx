import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, BookOpen, Heart, LogOut, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileDropdownProps {
  user: UserType;
  onLogout: () => void;
  onProfileClick: () => void;
  isDarkMode: boolean;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onLogout,
  onProfileClick,
  isDarkMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300 hover:scale-105 ${
          isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-700'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isDarkMode ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
        }`}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border z-50 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* User Info */}
          <div className={`p-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              }`}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              <div>
                <p className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {user.name}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                onProfileClick();
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile Settings</span>
            </button>

            <button
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>My Library</span>
            </button>

            <button
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Reading List</span>
            </button>

            <button
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>

            <div className={`border-t my-2 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`} />

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
                isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
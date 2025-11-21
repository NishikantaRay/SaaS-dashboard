import { Bell, Menu, Moon, Sun, LogOut, User } from 'lucide-react';
import { Button } from './ui/Button';
import { SearchInput } from './ui/Input';
import { useTheme } from '../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';

export const Header = ({ onMenuClick, onNotificationsClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-white/10 transition-colors duration-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="icon"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </Button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Dashboards</span>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Default</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:block w-64">
            <SearchInput placeholder="Search" />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="icon"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* Notifications */}
          <Button 
            variant="icon" 
            size="icon" 
            onClick={onNotificationsClick}
            aria-label="Notifications"
            className="lg:hidden"
          >
            <Bell size={18} />
          </Button>

          {/* User Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">admin@example.com</p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import { Bell, Menu, Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { SearchInput } from './ui/Input';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ onMenuClick, onNotificationsClick }) => {
  const { theme, toggleTheme } = useTheme();

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

          {/* User Avatar */}
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

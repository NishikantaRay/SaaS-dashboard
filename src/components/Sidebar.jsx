import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  UserPlus,
  Settings,
  BookOpen,
  Share2,
  ChevronDown
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  {
    id: 'favorites',
    label: 'Favorites',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard }
    ]
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    items: [
      { id: 'default', label: 'Default', active: true },
      { id: 'ecommerce', label: 'eCommerce', icon: ShoppingCart },
      { id: 'projects', label: 'Projects', icon: FileText },
      { id: 'online-courses', label: 'Online Courses', icon: BookOpen }
    ]
  },
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'user-profile', label: 'User Profile', icon: Users, hasSubmenu: true },
      { id: 'account', label: 'Account', icon: Settings },
      { id: 'corporate', label: 'Corporate', icon: Share2 },
      { id: 'blog', label: 'Blog', icon: BookOpen },
      { id: 'social', label: 'Social', icon: Share2 }
    ]
  }
];

export const Sidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState(['favorites', 'dashboards']);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-900',
          'border-r border-gray-200 dark:border-gray-800',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">ByeWind</span>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 overflow-y-auto h-[calc(100vh-73px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {menuItems.map((section) => (
            <div key={section.id} className="mb-6">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {section.label}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-200',
                    expandedSections.includes(section.id) ? 'rotate-180' : ''
                  )}
                />
              </button>

              {expandedSections.includes(section.id) && (
                <div className="mt-1 space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm',
                        'transition-all duration-200',
                        item.active
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                    >
                      {item.icon && <item.icon size={18} />}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

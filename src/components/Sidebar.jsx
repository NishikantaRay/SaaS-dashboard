import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' }
    ]
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    items: [
      { id: 'default', label: 'Default', path: '' },
      { id: 'ecommerce', label: 'eCommerce', icon: ShoppingCart, path: '/ecommerce' },
      { id: 'projects', label: 'Projects', icon: FileText, path: '' },
      { id: 'online-courses', label: 'Online Courses', icon: BookOpen, path: '' }
    ]
  },
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { 
        id: 'user-profile', 
        label: 'User Profile', 
        icon: Users, 
        hasSubmenu: true,
        submenu: [
          { id: 'user-overview', label: 'Overview', path: '/user-profile' },
          { id: 'projects', label: 'Projects', path: '/user-profile/projects' },
          { id: 'campaigns', label: 'Campaigns', path: '/user-profile/campaigns' }
        ]
      },
      { id: 'account', label: 'Account', icon: Settings, path: '' },
      { id: 'corporate', label: 'Corporate', icon: Share2, path: '' },
      { id: 'blog', label: 'Blog', icon: BookOpen, path: '' },
      { id: 'social', label: 'Social', icon: Share2, path: '' }
    ]
  }
];

export const Sidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState(['favorites', 'dashboards', 'pages']);
  const [expandedSubmenus, setExpandedSubmenus] = useState([]);
  const location = useLocation();

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleSubmenu = (itemId) => {
    setExpandedSubmenus(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
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
          'fixed top-0 left-0 z-50 h-screen w-64 bg-gray-50 dark:bg-[#1A1D1F]',
          'border-r border-gray-200 dark:border-gray-800',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">ByeWind</span>
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
                  {section.items.map((item) => {
                    const isActive = item.path && (location.pathname === item.path || 
                      (location.pathname === '/' && item.path === ''));
                    const hasActiveSubmenu = item.submenu?.some(sub => location.pathname === sub.path);
                    
                    return (
                      <div key={item.id}>
                        {item.hasSubmenu ? (
                          <>
                            <button
                              onClick={() => toggleSubmenu(item.id)}
                              className={cn(
                                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium',
                                'transition-all duration-200',
                                hasActiveSubmenu
                                  ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                              )}
                            >
                              {item.icon && <item.icon size={18} />}
                              <span className="flex-1 text-left">{item.label}</span>
                              <ChevronDown 
                                size={14} 
                                className={cn(
                                  'text-gray-400 transition-transform duration-200',
                                  expandedSubmenus.includes(item.id) ? 'rotate-180' : ''
                                )} 
                              />
                            </button>
                            
                            {expandedSubmenus.includes(item.id) && item.submenu && (
                              <div className="ml-6 mt-1 space-y-1">
                                {item.submenu.map((subItem) => {
                                  const isSubActive = location.pathname === subItem.path;
                                  return (
                                    <Link
                                      key={subItem.id}
                                      to={subItem.path}
                                      onClick={handleNavigation}
                                      className={cn(
                                        'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm',
                                        'transition-all duration-200',
                                        isSubActive
                                          ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium'
                                          : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                                      )}
                                    >
                                      {subItem.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={handleNavigation}
                            className={cn(
                              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium',
                              'transition-all duration-200',
                              isActive
                                ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                            )}
                          >
                            {item.icon && <item.icon size={18} />}
                            <span className="flex-1 text-left">{item.label}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

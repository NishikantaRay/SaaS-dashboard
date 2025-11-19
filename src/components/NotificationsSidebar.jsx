import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import { notifications, activities, contacts } from '../data/notificationsData';

export const NotificationsSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Notifications Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-screen w-80 bg-white dark:bg-black',
          'border-l border-gray-200 dark:border-white/10',
          'transition-transform duration-300 ease-in-out',
          'overflow-y-auto',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        {/* Notifications Section */}
        <div className="border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Notifications</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="px-4 pb-4 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-base">{notification.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div className="border-b border-gray-200 dark:border-white/10">
          <div className="px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Activities</h2>
          </div>
          
          <div className="px-4 pb-4 space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{activity.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-600 dark:text-gray-400"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div>
          <div className="px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Contacts</h2>
          </div>
          
          <div className="px-4 pb-4 space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{contact.avatar}</span>
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-black" />
                  )}
                </div>
                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {contact.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

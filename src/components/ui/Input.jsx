import { cn } from '../../utils/cn';
import { Search } from 'lucide-react';

/**
 * Input component with optional icon
 */
export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          'transition-colors duration-200',
          Icon && 'pl-10',
          className
        )}
        {...props}
      />
    </div>
  );
};

/**
 * Search Input component
 */
export const SearchInput = ({ placeholder = 'Search...', ...props }) => {
  return <Input icon={Search} placeholder={placeholder} {...props} />;
};

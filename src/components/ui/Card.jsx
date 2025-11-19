import { cn } from '../../utils/cn';

/**
 * Card component for wrapping content
 */
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10',
        'transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200 dark:border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Content component
 */
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Title component
 */
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn(
        'text-base font-semibold text-gray-900 dark:text-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

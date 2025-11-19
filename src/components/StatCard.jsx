import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { cn } from '../utils/cn';

export const StatCard = ({ title, value, change, changeType, prefix = '', suffix = '' }) => {
  const isIncrease = changeType === 'increase';

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="py-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
              </h3>
            </div>
          </div>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-3">
            {isIncrease ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isIncrease ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
              )}
            >
              {isIncrease ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

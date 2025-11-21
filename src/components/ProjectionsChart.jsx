import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

export const ProjectionsChart = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle>Projections vs Actuals</CardTitle>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              30M
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              20M
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250} className="min-h-[200px]">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#374151' : '#E5E7EB'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke={isDark ? '#6B7280' : '#9CA3AF'}
              tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke={isDark ? '#6B7280' : '#9CA3AF'}
              tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: isDark ? '#F3F4F6' : '#111827'
              }}
              cursor={{ fill: isDark ? '#1F2937' : '#F3F4F6' }}
            />
            <Bar dataKey="value" fill="#A5B4FC" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

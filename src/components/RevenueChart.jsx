import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

export const RevenueChart = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Transform data for current and previous week
  const chartData = data.map((item, index) => ({
    ...item,
    current: item.value,
    previous: item.value * 0.85 // Mock previous week data
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revenue</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Current Week</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">$58,211</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Previous Week</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">$68,768</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
              tickFormatter={(value) => `${value / 1000}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                color: isDark ? '#F3F4F6' : '#111827'
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#A78BFA"
              strokeWidth={2}
              dot={false}
              name="Current Week"
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#C4B5FD"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              name="Previous Week"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

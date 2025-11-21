import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];

export const TotalSales = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          {/* Donut Chart */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">38.6%</div>
              </div>
            </div>
          </div>

          {/* Sales Breakdown */}
          <div className="flex-1 space-y-3">
            {data.map((item, index) => (
              <div key={item.channel}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.channel}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    ${item.value}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">E-mail</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  $48.96
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

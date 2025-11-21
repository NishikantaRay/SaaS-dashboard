import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { ProjectionsChart } from './ProjectionsChart';
import { RevenueByLocation } from './RevenueByLocation';
import { TotalSales } from './TotalSales';
import { ProductsTable } from './ProductsTable';
import {
  dashboardStats,
  revenueData,
  projectionsData,
  revenueByLocation,
  totalSalesData,
  topSellingProducts
} from '../data/mockData';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50 dark:bg-black min-h-full">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">eCommerce</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Customers"
          value={dashboardStats.customers.value}
          change={dashboardStats.customers.change}
          changeType={dashboardStats.customers.changeType}
        />
        <StatCard
          title="Orders"
          value={dashboardStats.orders.value}
          change={dashboardStats.orders.change}
          changeType={dashboardStats.orders.changeType}
        />
        <StatCard
          title="Revenue"
          value={dashboardStats.revenue.value}
          change={dashboardStats.revenue.change}
          changeType={dashboardStats.revenue.changeType}
          prefix="$"
        />
        <StatCard
          title="Growth"
          value={dashboardStats.growth.value}
          change={dashboardStats.growth.change}
          changeType={dashboardStats.growth.changeType}
          suffix="%"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <ProjectionsChart data={projectionsData} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByLocation data={revenueByLocation} />
        <TotalSales data={totalSalesData} />
      </div>

      {/* Products Table */}
      <ProductsTable products={topSellingProducts} />
    </div>
  );
};

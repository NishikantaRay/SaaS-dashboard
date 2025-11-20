import { OrdersTable } from '../components/OrdersTable';

export const UserProfile = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-black min-h-full">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Pages</span>
          <span>/</span>
          <span>User Profile</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">Overview</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Profile</h1>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
};

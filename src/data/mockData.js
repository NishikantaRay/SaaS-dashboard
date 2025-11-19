/**
 * Mock data for the eCommerce dashboard
 */

export const dashboardStats = {
  customers: {
    value: 3781,
    change: -1.01,
    changeType: 'decrease'
  },
  orders: {
    value: 1219,
    change: -0.03,
    changeType: 'decrease'
  },
  revenue: {
    value: 695,
    change: 15.03,
    changeType: 'increase'
  },
  growth: {
    value: 30.1,
    change: 6.08,
    changeType: 'increase'
  }
};

export const revenueData = [
  { month: 'Jan', value: 25000 },
  { month: 'Feb', value: 32000 },
  { month: 'Mar', value: 28000 },
  { month: 'Apr', value: 45000 },
  { month: 'May', value: 38000 },
  { month: 'Jun', value: 52000 }
];

export const projectionsData = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 20 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 28 },
  { month: 'Jun', value: 35 }
];

export const revenueByLocation = [
  { location: 'New York', value: 72, color: '#6366F1' },
  { location: 'San Francisco', value: 39, color: '#8B5CF6' },
  { location: 'Sydney', value: 25, color: '#EC4899' },
  { location: 'Singapore', value: 61, color: '#F59E0B' }
];

export const topSellingProducts = [
  {
    id: 1,
    name: 'ASOS Ridley High Waist',
    price: 79.49,
    quantity: 82,
    amount: 6518.18
  },
  {
    id: 2,
    name: 'Marco Lightweight Shirt',
    price: 128.50,
    quantity: 37,
    amount: 4754.50
  },
  {
    id: 3,
    name: 'Half Sleeve Shirt',
    price: 39.99,
    quantity: 64,
    amount: 2559.36
  },
  {
    id: 4,
    name: 'Lightweight Jacket',
    price: 20.00,
    quantity: 184,
    amount: 3680.00
  },
  {
    id: 5,
    name: 'Marco Shoes',
    price: 79.49,
    quantity: 64,
    amount: 1965.81
  }
];

export const totalSalesData = [
  { channel: 'Direct', value: 300.56, percentage: 38.6 },
  { channel: 'Affiliate', value: 135.18, percentage: 17.4 },
  { channel: 'Sponsored', value: 154.02, percentage: 19.8 },
  { channel: 'E-mail', value: 48.96, percentage: 6.3 }
];

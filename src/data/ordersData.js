/**
 * Mock data for User Profile - Orders/Projects
 */

export const ordersData = [
  {
    id: 'CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'NC'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: new Date().toISOString(),
    status: 'In Progress'
  },
  {
    id: 'CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'KM'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    status: 'Complete'
  },
  {
    id: 'CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'DC'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocata',
    date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'Pending'
  },
  {
    id: 'CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'OD'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: 'Approved'
  },
  {
    id: 'CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'AL'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: new Date('2023-02-02').toISOString(),
    status: 'Rejected'
  },
  {
    id: 'CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'NC'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: new Date().toISOString(),
    status: 'In Progress'
  },
  {
    id: 'CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'KM'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: new Date(Date.now() - 60000).toISOString(),
    status: 'Complete'
  },
  {
    id: 'CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'DC'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocata',
    date: new Date(Date.now() - 3600000).toISOString(),
    status: 'Pending'
  },
  {
    id: 'CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'OD'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'Approved'
  },
  {
    id: 'CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'AL'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: new Date('2023-02-02').toISOString(),
    status: 'Rejected'
  }
];

export const statusColors = {
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Complete': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Approved': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

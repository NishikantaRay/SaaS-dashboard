/**
 * Mock data for notifications
 */

export const notifications = [
  {
    id: 1,
    type: 'bug',
    title: 'You have a bug that needs...',
    time: 'Just now',
    icon: '🐛',
    read: false
  },
  {
    id: 2,
    type: 'user',
    title: 'New user registered',
    time: '59 minutes ago',
    icon: '👤',
    read: false
  },
  {
    id: 3,
    type: 'bug',
    title: 'You have a bug that needs...',
    time: '12 hours ago',
    icon: '🐛',
    read: false
  },
  {
    id: 4,
    type: 'subscription',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    icon: '📧',
    read: false
  }
];

export const activities = [
  {
    id: 1,
    user: 'You',
    action: 'have a bug that needs...',
    time: 'Just now',
    avatar: 'Y'
  },
  {
    id: 2,
    user: 'Released',
    action: 'a new version',
    time: '59 minutes ago',
    avatar: 'R'
  },
  {
    id: 3,
    user: 'Submitted',
    action: 'a bug',
    time: '12 hours ago',
    avatar: 'S'
  },
  {
    id: 4,
    user: 'Modified',
    action: 'A data in Page X',
    time: 'Today, 11:59 AM',
    avatar: 'M'
  },
  {
    id: 5,
    user: 'Deleted',
    action: 'a page in Project X',
    time: 'Feb 2, 2023',
    avatar: 'D'
  }
];

export const contacts = [
  { id: 1, name: 'Natali Craig', avatar: 'NC', online: true },
  { id: 2, name: 'Drew Cano', avatar: 'DC', online: false },
  { id: 3, name: 'Orlando Diggs', avatar: 'OD', online: true },
  { id: 4, name: 'Andi Lane', avatar: 'AL', online: true },
  { id: 5, name: 'Kate Morrison', avatar: 'KM', online: false },
  { id: 6, name: 'Koray Okumus', avatar: 'KO', online: true }
];

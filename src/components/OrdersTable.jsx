import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, updateOrder, deleteOrder } from '../store/slices/ordersSlice';
import { Card } from './ui/Card';
import { SearchInput } from './ui/Input';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Pagination } from './Pagination';
import { Plus, Pencil, Trash2, Copy } from 'lucide-react';
import { cn } from '../utils/cn';
import { statusColors } from '../data/ordersData';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

export const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    userAvatar: '',
    project: '',
    address: '',
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  // Filter orders based on search
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id.trim()) {
      newErrors.id = 'Order ID is required';
    }
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'User name is required';
    } else if (formData.userName.trim().length < 3) {
      newErrors.userName = 'User name must be at least 3 characters';
    }
    
    if (!formData.project.trim()) {
      newErrors.project = 'Project name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle add/edit
  const handleOpenModal = (order = null) => {
    setErrors({});
    if (order) {
      setEditingOrder(order);
      setFormData({
        id: order.id,
        userName: order.user.name,
        userAvatar: order.user.avatar,
        project: order.project,
        address: order.address,
        status: order.status
      });
    } else {
      setEditingOrder(null);
      setFormData({
        id: `#CM${Math.floor(Math.random() * 10000)}`,
        userName: '',
        userAvatar: '',
        project: '',
        address: '',
        status: 'Pending'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    const orderData = {
      id: formData.id,
      user: {
        name: formData.userName,
        avatar: formData.userAvatar || formData.userName.split(' ').map(n => n[0]).join('')
      },
      project: formData.project,
      address: formData.address,
      date: editingOrder ? editingOrder.date : new Date().toISOString(),
      status: formData.status
    };

    if (editingOrder) {
      // Update existing order using Redux
      dispatch(updateOrder({
        id: editingOrder.id,
        oldUserName: editingOrder.user.name,
        orderData
      }));
      toast.success('Order updated successfully!');
    } else {
      // Add new order using Redux
      dispatch(addOrder(orderData));
      toast.success('Order created successfully!');
    }

    setIsModalOpen(false);
    setErrors({});
  };

  // Handle delete
  const handleDelete = (order) => {
    if (window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      dispatch(deleteOrder({
        id: order.id,
        userName: order.user.name
      }));
      toast.success('Order deleted successfully!');
    }
  };

  // Handle checkbox
  const handleSelectOrder = (order) => {
    const key = `${order.id}-${order.user.name}`;
    setSelectedOrders(prev =>
      prev.includes(key) ? prev.filter(id => id !== key) : [...prev, key]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(paginatedOrders.map(o => `${o.id}-${o.user.name}`));
    } else {
      setSelectedOrders([]);
    }
  };

  return (
    <>
      <Card>
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Order List</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="w-full sm:w-64">
                <SearchInput
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleOpenModal()}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Plus size={18} />
                <span>Add Order</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="px-4 sm:px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <tr
                    key={`${order.id}-${order.user.name}-${index}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(`${order.id}-${order.user.name}`)}
                        onChange={() => handleSelectOrder(order)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">
                            {order.user.avatar}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          {order.user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {order.project}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {order.address}
                        </span>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0">
                          <Copy size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(order.date)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(order)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} className="text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(order)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No orders found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredOrders.length}
          />
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOrder ? 'Edit Order' : 'Add New Order'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className={cn(
                'w-full px-4 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                errors.id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              )}
            />
            {errors.id && (
              <p className="mt-1 text-xs text-red-500">{errors.id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className={cn(
                'w-full px-4 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                errors.userName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              )}
            />
            {errors.userName && (
              <p className="mt-1 text-xs text-red-500">{errors.userName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className={cn(
                'w-full px-4 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                errors.project ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              )}
            />
            {errors.project && (
              <p className="mt-1 text-xs text-red-500">{errors.project}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={cn(
                'w-full px-4 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              )}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {editingOrder ? 'Update' : 'Add'} Order
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

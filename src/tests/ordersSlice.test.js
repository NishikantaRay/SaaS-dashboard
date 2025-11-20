import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, {
  addOrder,
  updateOrder,
  deleteOrder,
  setOrders,
  setLoading,
  setError
} from '../store/slices/ordersSlice';

describe('Orders Redux Slice', () => {
  let store;

  const mockOrder = {
    id: '#CM9999',
    user: {
      name: 'Test User',
      avatar: 'TU'
    },
    project: 'Test Project',
    address: '123 Test Street',
    date: '2025-11-20T10:00:00.000Z',
    status: 'Pending'
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        orders: ordersReducer
      }
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().orders;
      
      expect(state).toHaveProperty('orders');
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('error');
      expect(Array.isArray(state.orders)).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should load orders from mock data', () => {
      const state = store.getState().orders;
      
      expect(state.orders.length).toBeGreaterThan(0);
    });
  });

  describe('addOrder Action', () => {
    it('should add a new order to the beginning of the list', () => {
      const initialLength = store.getState().orders.orders.length;
      
      store.dispatch(addOrder(mockOrder));
      
      const state = store.getState().orders;
      expect(state.orders.length).toBe(initialLength + 1);
      expect(state.orders[0]).toEqual(mockOrder);
    });

    it('should maintain other orders when adding new one', () => {
      const initialOrders = store.getState().orders.orders;
      const firstOrder = initialOrders[0];
      
      store.dispatch(addOrder(mockOrder));
      
      const state = store.getState().orders;
      expect(state.orders[1]).toEqual(firstOrder);
    });

    it('should add multiple orders correctly', () => {
      const order1 = { ...mockOrder, id: '#CM8888' };
      const order2 = { ...mockOrder, id: '#CM7777' };
      
      store.dispatch(addOrder(order1));
      store.dispatch(addOrder(order2));
      
      const state = store.getState().orders;
      expect(state.orders[0]).toEqual(order2);
      expect(state.orders[1]).toEqual(order1);
    });
  });

  describe('updateOrder Action', () => {
    it('should update an existing order', () => {
      const state = store.getState().orders;
      const existingOrder = state.orders[0];
      
      const updatedOrderData = {
        ...existingOrder,
        project: 'Updated Project Name',
        status: 'Complete'
      };
      
      store.dispatch(updateOrder({
        id: existingOrder.id,
        oldUserName: existingOrder.user.name,
        orderData: updatedOrderData
      }));
      
      const newState = store.getState().orders;
      const updatedOrder = newState.orders.find(
        o => o.id === existingOrder.id && o.user.name === existingOrder.user.name
      );
      
      expect(updatedOrder.project).toBe('Updated Project Name');
      expect(updatedOrder.status).toBe('Complete');
    });

    it('should not update order if ID does not match', () => {
      const initialState = store.getState().orders;
      const initialLength = initialState.orders.length;
      
      const updatedOrderData = {
        ...mockOrder,
        project: 'Updated Project'
      };
      
      store.dispatch(updateOrder({
        id: '#NONEXISTENT',
        oldUserName: 'Nonexistent User',
        orderData: updatedOrderData
      }));
      
      const newState = store.getState().orders;
      expect(newState.orders.length).toBe(initialLength);
      expect(newState.orders).toEqual(initialState.orders);
    });

    it('should preserve the original date when updating', () => {
      const state = store.getState().orders;
      const existingOrder = state.orders[0];
      const originalDate = existingOrder.date;
      
      const updatedOrderData = {
        ...existingOrder,
        project: 'New Project'
      };
      
      store.dispatch(updateOrder({
        id: existingOrder.id,
        oldUserName: existingOrder.user.name,
        orderData: updatedOrderData
      }));
      
      const newState = store.getState().orders;
      const updatedOrder = newState.orders.find(
        o => o.id === existingOrder.id && o.user.name === existingOrder.user.name
      );
      
      expect(updatedOrder.date).toBe(originalDate);
    });

    it('should update user information correctly', () => {
      const state = store.getState().orders;
      const existingOrder = state.orders[0];
      
      const updatedOrderData = {
        ...existingOrder,
        user: {
          name: 'New User Name',
          avatar: 'NN'
        }
      };
      
      store.dispatch(updateOrder({
        id: existingOrder.id,
        oldUserName: existingOrder.user.name,
        orderData: updatedOrderData
      }));
      
      const newState = store.getState().orders;
      const updatedOrder = newState.orders.find(o => o.id === existingOrder.id);
      
      expect(updatedOrder.user.name).toBe('New User Name');
      expect(updatedOrder.user.avatar).toBe('NN');
    });
  });

  describe('deleteOrder Action', () => {
    it('should delete an order', () => {
      // Create fresh store for this test
      const testStore = configureStore({
        reducer: {
          orders: ordersReducer
        }
      });
      
      const state = testStore.getState().orders;
      const orderToDelete = state.orders[0];
      const initialLength = state.orders.length;
      
      // Count how many orders match the ID and userName (might be duplicates in mock data)
      const matchingOrders = state.orders.filter(
        o => o.id === orderToDelete.id && o.user.name === orderToDelete.user.name
      ).length;
      
      testStore.dispatch(deleteOrder({
        id: orderToDelete.id,
        userName: orderToDelete.user.name
      }));
      
      const newState = testStore.getState().orders;
      // Expect length to decrease by the number of matching orders (deleteOrder removes ALL matches)
      expect(newState.orders.length).toBe(initialLength - matchingOrders);
      
      const deletedOrder = newState.orders.find(
        o => o.id === orderToDelete.id && o.user.name === orderToDelete.user.name
      );
      expect(deletedOrder).toBeUndefined();
    });

    it('should not delete order if ID does not match', () => {
      const initialState = store.getState().orders;
      const initialLength = initialState.orders.length;
      
      store.dispatch(deleteOrder({
        id: '#NONEXISTENT',
        userName: 'Nonexistent User'
      }));
      
      const newState = store.getState().orders;
      expect(newState.orders.length).toBe(initialLength);
    });

    it('should only delete the specific order with matching ID and user name', () => {
      // Add two orders with same ID but different user names
      const order1 = { ...mockOrder, id: '#CM5555', user: { name: 'User A', avatar: 'UA' } };
      const order2 = { ...mockOrder, id: '#CM5555', user: { name: 'User B', avatar: 'UB' } };
      
      store.dispatch(addOrder(order1));
      store.dispatch(addOrder(order2));
      
      store.dispatch(deleteOrder({
        id: '#CM5555',
        userName: 'User A'
      }));
      
      const state = store.getState().orders;
      const deletedOrder = state.orders.find(o => o.id === '#CM5555' && o.user.name === 'User A');
      const remainingOrder = state.orders.find(o => o.id === '#CM5555' && o.user.name === 'User B');
      
      expect(deletedOrder).toBeUndefined();
      expect(remainingOrder).toBeDefined();
    });

    it('should delete multiple orders correctly', () => {
      // Create fresh store for this test
      const testStore = configureStore({
        reducer: {
          orders: ordersReducer
        }
      });
      
      const state = testStore.getState().orders;
      // Pick two orders with different IDs to avoid duplicate issues
      const uniqueOrders = [];
      const seenIds = new Set();
      for (const order of state.orders) {
        const key = `${order.id}-${order.user.name}`;
        if (!seenIds.has(key)) {
          uniqueOrders.push(order);
          seenIds.add(key);
          if (uniqueOrders.length === 2) break;
        }
      }
      
      const order1 = uniqueOrders[0];
      const order2 = uniqueOrders[1];
      const initialLength = state.orders.length;
      
      testStore.dispatch(deleteOrder({
        id: order1.id,
        userName: order1.user.name
      }));
      
      const afterFirst = testStore.getState().orders;
      
      testStore.dispatch(deleteOrder({
        id: order2.id,
        userName: order2.user.name
      }));
      
      const newState = testStore.getState().orders;
      // Just verify that orders were deleted
      expect(newState.orders.length).toBeLessThan(initialLength);
      expect(newState.orders.find(o => o.id === order1.id && o.user.name === order1.user.name)).toBeUndefined();
      expect(newState.orders.find(o => o.id === order2.id && o.user.name === order2.user.name)).toBeUndefined();
    });
  });

  describe('setOrders Action', () => {
    it('should replace all orders with new array', () => {
      const newOrders = [mockOrder];
      
      store.dispatch(setOrders(newOrders));
      
      const state = store.getState().orders;
      expect(state.orders).toEqual(newOrders);
      expect(state.orders.length).toBe(1);
    });

    it('should clear orders when setting empty array', () => {
      store.dispatch(setOrders([]));
      
      const state = store.getState().orders;
      expect(state.orders).toEqual([]);
      expect(state.orders.length).toBe(0);
    });

    it('should replace orders with multiple new orders', () => {
      const newOrders = [
        { ...mockOrder, id: '#CM1111' },
        { ...mockOrder, id: '#CM2222' },
        { ...mockOrder, id: '#CM3333' }
      ];
      
      store.dispatch(setOrders(newOrders));
      
      const state = store.getState().orders;
      expect(state.orders).toEqual(newOrders);
      expect(state.orders.length).toBe(3);
    });
  });

  describe('setLoading Action', () => {
    it('should set loading to true', () => {
      store.dispatch(setLoading(true));
      
      const state = store.getState().orders;
      expect(state.loading).toBe(true);
    });

    it('should set loading to false', () => {
      store.dispatch(setLoading(true));
      store.dispatch(setLoading(false));
      
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
    });
  });

  describe('setError Action', () => {
    it('should set error message', () => {
      const errorMessage = 'Failed to fetch orders';
      
      store.dispatch(setError(errorMessage));
      
      const state = store.getState().orders;
      expect(state.error).toBe(errorMessage);
    });

    it('should clear error when set to null', () => {
      store.dispatch(setError('Some error'));
      store.dispatch(setError(null));
      
      const state = store.getState().orders;
      expect(state.error).toBe(null);
    });

    it('should handle error objects', () => {
      const errorObj = { message: 'Network error', code: 500 };
      
      store.dispatch(setError(errorObj));
      
      const state = store.getState().orders;
      expect(state.error).toEqual(errorObj);
    });
  });

  describe('Combined Actions', () => {
    it('should handle multiple actions in sequence', () => {
      const newOrder = { ...mockOrder, id: '#CM4444' };
      
      store.dispatch(setLoading(true));
      store.dispatch(addOrder(newOrder));
      store.dispatch(setLoading(false));
      
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
      expect(state.orders[0]).toEqual(newOrder);
    });

    it('should add, update, and delete in sequence', () => {
      const order = { ...mockOrder, id: '#CM6666' };
      
      // Add
      store.dispatch(addOrder(order));
      let state = store.getState().orders;
      expect(state.orders[0].id).toBe('#CM6666');
      
      // Update
      const updatedOrder = { ...order, status: 'Complete' };
      store.dispatch(updateOrder({
        id: order.id,
        oldUserName: order.user.name,
        orderData: updatedOrder
      }));
      state = store.getState().orders;
      expect(state.orders[0].status).toBe('Complete');
      
      // Delete
      store.dispatch(deleteOrder({
        id: order.id,
        userName: order.user.name
      }));
      state = store.getState().orders;
      const deletedOrder = state.orders.find(o => o.id === '#CM6666');
      expect(deletedOrder).toBeUndefined();
    });
  });
});

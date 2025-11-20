import { createSlice } from '@reduxjs/toolkit';
import { ordersData } from '../../data/ordersData';

const initialState = {
  orders: ordersData,
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(
        order => order.id === action.payload.id && 
        order.user.name === action.payload.oldUserName
      );
      if (index !== -1) {
        state.orders[index] = {
          ...action.payload.orderData,
          date: state.orders[index].date
        };
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        order => !(order.id === action.payload.id && 
        order.user.name === action.payload.userName)
      );
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  addOrder,
  updateOrder,
  deleteOrder,
  setOrders,
  setLoading,
  setError
} = ordersSlice.actions;

export default ordersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_STATE = { orders: [], users: [] };

const adminSlice = createSlice({
  name: 'admin',
  initialState: INITIAL_STATE,
  reducers: {
    setUsers(state, action) {
      state.users = [...state.users, ...action.payload];
    },
    setOrders(state, action) {
      state.orders = [...state.orders, ...action.payload];
    },
    signOut(state) {
      state.orders = [];
      state.users = [];
    },
    addToOrder: (state, action) => {
      const orders = state.orders;
      state.orders = [...orders, action.payload];
    },
    updateOrder(state, action) {
      const orders = state.orders;
      const orderIndex = orders.findIndex(
        (order) => order.id === action.payload.id
      );
      orders[orderIndex].status = action.payload.status;
    },
    deleteOrder: (state, action) => {
      const orders = state.orders;
      const orderIndex = orders.findIndex((o) => o.id === action.payload);
      orders.splice(orderIndex, 1);
    },
    deleteUser: (state, action) => {
      const users = state.users;
      const userIndex = users.findIndex((u) => u.id === action.payload);
      users.splice(userIndex, 1);
    },
  },
});

export const syncAdmin = () => {
  return async (dispatch) => {
    axios.get('users.json').then((res) => {
      const data = res.data;
      const users = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key,
        };
      });
      dispatch(adminSlice.actions.setUsers(users));
      const orders = users
        .map((user) => {
          const temp = user.orders?.map((order) => {
            order = {
              ...order,
              orderAccount: user.email,
            };
            return order;
          });
          return temp;
        })
        .flat()
        .filter((order) => {
          return typeof order !== 'undefined';
        });
      dispatch(adminSlice.actions.setOrders(orders));
    });
  };
};

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;

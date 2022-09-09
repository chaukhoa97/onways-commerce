import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { databaseItems: [], showedItems: [] };

const itemsSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {
    firstFetch(state, action) {
      state.databaseItems = action.payload;
      state.showedItems = action.payload;
    },
    filter(state, action) {
      state.showedItems = [...state.databaseItems];
      if (action.payload.category.length > 0) {
        state.showedItems = state.databaseItems.filter((item) => {
          return action.payload.category.includes(item.category);
        });
      } else {
        state.showedItems = state.databaseItems;
      }
      state.showedItems = state.showedItems.filter((item) => {
        return item.rating.rate >= action.payload.rate;
      });
      switch (action.payload.priceRange) {
        case 0:
          state.showedItems = state.showedItems.filter(
            (item) => item.price < 20
          );
          break;
        case 1:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 20 && item.price <= 100;
          });
          break;
        case 2:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 100 && item.price <= 500;
          });
          break;
        case 3:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 500;
          });
          break;
        default:
          return;
      }
    },
    sort(state, action) {
      switch (action.payload) {
        default:
          state.showedItems.sort((a, b) => b.rating.count - a.rating.count);
          break;
        case 'rate':
          state.showedItems.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case 'asc':
          state.showedItems.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          state.showedItems.sort((a, b) => b.price - a.price);
          break;
      }
    },
    delete(state, action) {
      state.databaseItems = state.databaseItems.filter((item) => {
        return item.id !== action.payload;
      });
    },
    update(state, action) {
      const updateItemIndex = state.databaseItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const updateItem = state.databaseItems[updateItemIndex];
      state.databaseItems[updateItemIndex] = {
        ...updateItem,
        ...action.payload,
      };
    },
    add(state, action) {
      state.databaseItems.push(action.payload);
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;

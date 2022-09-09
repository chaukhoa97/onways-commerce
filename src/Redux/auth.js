import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoggedIn: false,
  localId: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signIn(state, action) {
      state.isLoggedIn = true;
      state.localId = action.payload.localId;
      state.email = action.payload.email;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.localId = null;
      state.email = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

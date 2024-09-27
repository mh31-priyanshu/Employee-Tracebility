// src/redux/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  role: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, role } = action.payload;
      // console.log('Setting user in Redux:', action.payload);  // Log the payload to check
      state.token = token;
      state.role = role;
    },
    clearUser: (state) => {
      state.token = null;
      state.role = '';
    }
  }
});

export const userRole = (state) => state.auth.role;


export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
// src/redux/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  first_name: '',
  role: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, first_name, role } = action.payload;
      // console.log('Setting user in Redux:', action.payload);  // Log the payload to check
      state.token = token;
      state.first_name = first_name;
      state.role = role;
    },
    clearUser: (state) => {
      state.token = null;
      state.first_name = '';
      state.role = '';
    }
  }
});



export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

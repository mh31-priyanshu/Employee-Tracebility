import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for the global state
const globalSlice = createSlice({
  name: 'global',
  initialState: {
    selectedPage: '',
    openSideBar: false,
  },
  reducers: {
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setOpenSideBar: (state, action) => {
      state.openSideBar = action.payload;
    },
  },
});

// Export actions
export const { setSelectedPage, setOpenSideBar } = globalSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export default store;

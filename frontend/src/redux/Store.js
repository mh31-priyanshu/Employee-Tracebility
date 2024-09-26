// Import dependencies
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Global slice for handling UI-related global state
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

// Export global actions
export const { setSelectedPage, setOpenSideBar } = globalSlice.actions;

// Configure persistence for AuthSlice
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, AuthSlice);

// Configure the store
export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,         // Global slice reducer
    auth: persistedAuthReducer,          // Persisted Auth slice reducer
  },
});

// Configure persistor for redux-persist
export const persistor = persistStore(store);

// Export the store as default
export default store;

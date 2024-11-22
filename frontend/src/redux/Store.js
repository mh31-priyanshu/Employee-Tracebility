import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from './AuthSlice';
import { themes } from './themes';


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

// Theme slice for handling theme state
const themeSlice = createSlice({
  name: 'theme',
  initialState: themes.default,
  reducers: {
    setTheme: (state, action) => {
      const newTheme = themes[action.payload];
      return newTheme ? { ...newTheme } : state;
    },
  },
});

// Configure persistence for AuthSlice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'] // Specify which reducers to persist
};

const rootReducer = {
  global: globalSlice.reducer,
  auth: persistReducer(persistConfig, AuthSlice),
  theme: themeSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

// Export actions
export const { setSelectedPage, setOpenSideBar } = globalSlice.actions;
export const { setTheme } = themeSlice.actions;

export default store;
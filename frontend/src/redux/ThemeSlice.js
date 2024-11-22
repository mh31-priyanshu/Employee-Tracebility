import { createSlice } from '@reduxjs/toolkit';
import { themes } from './themes';

const themeSlice = createSlice({
  name: 'theme',
  initialState: themes.default,
  reducers: {
    setTheme: (state, action) => {
      return themes[action.payload] || state;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
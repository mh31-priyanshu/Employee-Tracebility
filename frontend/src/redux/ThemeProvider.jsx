import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const activeTheme = useSelector((state) => state.theme);

  useEffect(() => {
    if (activeTheme) {
      Object.entries(activeTheme).forEach(([key, value]) => {
        // Convert camelCase to kebab-case for CSS variables
        const cssVariableName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        document.documentElement.style.setProperty(cssVariableName, value);
      });
    }
  }, [activeTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
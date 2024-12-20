import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext'; // Use AuthProvider instead of AuthContext
import App from './App.jsx';
import { store, persistor } from './redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import ThemeProvider from './redux/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>

      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
      
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

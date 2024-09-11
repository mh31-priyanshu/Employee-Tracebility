import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/Store.js';  // Named import
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading = {null} persistor={persistor}>
        <App />
        </PersistGate>

      </Provider>
    </StrictMode>
  </AuthProvider>,
);

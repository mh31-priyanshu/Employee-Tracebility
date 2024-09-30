import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './Layouts/ManagerLayout/Dashboard';
import Login from './Pages/Login';

// Selector to get authentication state from Redux store
const isAuthenticated = () => {
  const token = useSelector((state) => state.auth.token);
  return !!token;  // Returns true if token exists
}

function App() {
  const loggedIn = isAuthenticated();

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Redirect to dashboard if user is already logged in */}
          <Route path='/' element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path='/login' element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path='/dashboard' element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

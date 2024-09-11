import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/ApiEndpoint';
import { clearUser } from '../redux/AuthSlice';
import { toast } from 'react-hot-toast';

const Worker = () => {
  const user = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const request = await get('http://localhost:5000/user/logout');
      const response = request.data;
      if (request.status === 200) {
        dispatch(clearUser());
        navigate('/login');
        toast.success('Logout successful!');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className='home-container'>
      <div className='user-card'>
        <h2> Welcome, {user && user.first_name}</h2>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        {user && user.role === 'supervisor' && (
          <button className='admin-btn' onClick={gotoAdmin}>Go To Supervisor</button>
        )}
      </div>
    </div>
  );
};

export default Worker;

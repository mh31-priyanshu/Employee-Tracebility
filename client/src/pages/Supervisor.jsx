import React, { useEffect, useState } from 'react';
import { get, deleteUser } from '../services/ApiEndpoint';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/AuthSlice';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const Supervisor = () => {
  const user = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();

  const gotoSupervisor = () => {
    setShowTable(true);
  };

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

  useEffect(() => {
    const GetWorkers = async () => {
      setLoading(true);
      try {
        if (!user || user.role !== 'supervisor') {
          console.error('Unauthorized: Only supervisors can fetch worker data');
          navigate('/login');
          toast.error('Unauthorized: Only supervisors can fetch worker data');
          return;
        }

        const response = await get('/supervisor/getWorkers');
        setWorkers(response.data.data); // Assuming the data is within a `data` property
        toast.success('Workers data fetched successfully!');
      } catch (error) {
        console.error('Error fetching worker data:', error);
        toast.error('Failed to fetch worker data.');
      } finally {
        setLoading(false);
      }
    };

    if (showTable) {
      GetWorkers();
    }
  }, [user, navigate, showTable]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelet = async (id) => {
    try {
      const request = await deleteUser(`/supervisor/deleteWorker/${id}`);
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message || 'Worker deleted successfully!');
        setWorkers(workers.filter(worker => worker.user_id !== id)); // Update UI to remove deleted worker
      }
    } catch (error) {
      console.error('Error deleting worker:', error);
      toast.error('Failed to delete worker. Please try again.');
    }
  };

  return (
    <div className='home-container'>
      {!showTable ? (
        <div className='user-card'>
          <h2> Welcome, {user && user.first_name}</h2>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          {user && user.role === 'supervisor' && (
            <button className='admin-btn' onClick={gotoSupervisor}>Go To Supervisor</button>
          )}
        </div>
      ) : (
        <div className='admin-container'>
          <h2>Manage Workers</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker, index) => (
                <tr key={index}>
                  <td>{worker.first_name}</td>
                  <td>{worker.email}</td>
                  <td>
                    <button onClick={() => handleDelet(worker.user_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Supervisor;

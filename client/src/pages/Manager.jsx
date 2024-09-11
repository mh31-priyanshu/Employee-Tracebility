import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get, deleteUser } from '../services/ApiEndpoint';
import { clearUser } from '../redux/AuthSlice';
import { toast } from 'react-hot-toast';

const Manager = () => {
  const user = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);

  const gotoManager = () => {
    setShowTable(true);
  };

  const handleLogout = async () => {
    try {
      const request = await get('http://localhost:5000/user/logout');
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
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user.role !== 'manager') {
          navigate('/login');
          toast.error('Unauthorized: Only managers can access this data.');
          return;
        }

        const workersResponse = await get('/manager/getWorkers');
        const supervisorsResponse = await get('/manager/getSupervisors');

        setWorkers(workersResponse.data.data || []);
        setSupervisors(supervisorsResponse.data.data || []);

        toast.success('Data fetched successfully!');
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    if (showTable) {
      fetchData();
    }
  }, [showTable, user, navigate]);

  const handleDeleteWorker = async (id) => {
    try {
      const request = await deleteUser(`/manager/deleteWorker/${id}`);
      if (request.status === 200) {
        setWorkers(workers.filter(worker => worker.user_id !== id));
        toast.success('Worker deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting worker:', error);
      toast.error('Failed to delete worker. Please try again.');
    }
  };

  const handleDeleteSupervisor = async (id) => {
    try {
      const request = await deleteUser(`/manager/deleteSupervisor/${id}`);
      if (request.status === 200) {
        setSupervisors(supervisors.filter(supervisor => supervisor.user_id !== id));
        toast.success('Supervisor deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting supervisor:', error);
      toast.error('Failed to delete supervisor. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home-container'>
      {!showTable ? (
        <div className='user-card'>
          <h2> Welcome, {user && user.first_name}</h2>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          {user && user.role === 'manager' && (
            <button className='admin-btn' onClick={gotoManager}>Go To Manager</button>
          )}
        </div>
      ) : (
        <div className='admin-container'>
          <h2>Manage Workers and Supervisors</h2>

          <h3>Workers</h3>
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
                    <button onClick={() => handleDeleteWorker(worker.user_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Supervisors</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {supervisors.map((supervisor, index) => (
                <tr key={index}>
                  <td>{supervisor.first_name}</td>
                  <td>{supervisor.email}</td>
                  <td>
                    <button onClick={() => handleDeleteSupervisor(supervisor.user_id)}>Delete</button>
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

export default Manager;

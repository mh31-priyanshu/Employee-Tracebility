import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import { parseJwt } from '../utils/jwtUtils';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    employee_id: "",
    email: "",
    password: "",
    role: "worker",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employee_id, email, password, role } = formData;
  
    const loginData = {
      employee_id,
      email,
      password,
    };

    toast.loading('Attempting to log in...'); // Add loading toast

    try {
      const response = await axios.post(`http://localhost:5000/user/login/${role}`, loginData, {
        withCredentials: true
      });
    
      // console.log('API Response:', response.data);  // Log the full response data
    
      if (response.status === 200) {
        const { token, first_name } = response.data;
        const decodedToken = parseJwt(token);
    
        if (!decodedToken) {
          throw new Error('Failed to decode token');
        }
    
        const userRole = decodedToken.role;
    
        login(userRole);
        dispatch(setUser({ token, first_name, role: userRole }));

        toast.dismiss(); // Dismiss loading toast
        toast.success(`Login successful! Welcome, ${first_name}!`);

        if (userRole === 'supervisor') {
          navigate('/supervisor');
        } else if (userRole === 'worker') {
          navigate('/worker');
        } else if (userRole === 'manager') {
          navigate('/manager');
        }
      }
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast in case of error
      console.error('Error during login:', error.response?.data || error.message);
      toast.error(`Login failed: ${error.response?.data?.message || 'Please check your credentials and try again.'}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="employee_id">Employee ID</label>
          <input
            type="text"
            id="employee_id"
            name="employee_id"
            placeholder="Enter your Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="worker">Worker</option>
            <option value="supervisor">Supervisor</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

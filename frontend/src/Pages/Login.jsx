import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    employee_id: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employee_id, password } = formData;
    const loginData = { employee_id, password };

    toast.loading('Attempting to log in...'); // Show loading toast

    try {
      // Step 1: Login API Call
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/login`,
        loginData,
        {
          withCredentials: true, // for handling cookies
        }
      );

      if (loginResponse.status === 200) {
        const { token, role } = loginResponse.data; // Extract both token and role

        console.log(role);

        // Step 2: Make an authenticated request (if needed) or use the token and role
        await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/getuser`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,  // Use backticks for template string
          }
        });

        // Save token and user info in the app state
        login(role);
        dispatch(setUser({ token, role }));

        toast.dismiss(); // Dismiss loading toast
        if (role === 'supervisor') {
          navigate('/supervisor');
        } else if (role === 'worker') {
          navigate('/worker');
        } else if (role === 'manager') {
          navigate('/manager');
        } // Navigate to the dashboard
      }
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast in case of error
      console.error('Error during login:', error.response?.data || error.message);
      toast.error(
        `Login failed: ${error.response?.data?.message || 'Please check your credentials and try again.'}`
      );
    }

  };

  return (
    <div className="bg-header h-screen">
      <div className="h-24"></div>
      <div className="max-w-md mx-auto  p-8 rounded-lg shadow-lg bg-hover text-primary-font">
        <h2 className="text-center mb-8 text-2xl ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="employee_id" className="block mb-2 font-bold ">Employee ID</label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              placeholder="Enter your Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full p-3 border rounded-md border-gray-300 text-lg"
            />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block mb-2 font-bold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md border-gray-300 text-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-14 transform -translate-y-1/2"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <button
              type="submit"
              className="w-full p-3 text-lg font-semibold text-white bg-button rounded-md hover:bg-header transition duration-300"
            >
              Login
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
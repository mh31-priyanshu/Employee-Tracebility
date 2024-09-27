import React, { useState } from "react";
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
      const loginResponse = await axios.post(`https://employee-tracebility-backend.vercel.app/user/login`, loginData, {
        withCredentials: true,  // for cookies
      });

      if (loginResponse.status === 200) {
        const { token } = loginResponse.data; // Receive token

        // Step 2: Fetch User Data using the getUser API
        const userResponse = await axios.get('https://employee-tracebility-backend.vercel.app/user/getuser', {
          withCredentials: true,
        });

        const user = userResponse.data.user;  // Get user data from the response
        const { role, first_name } = user;  // Extract role and first name
        console.log(role);
        // Save token and user info in the app state
        login(role);
        dispatch(setUser({ token, role }));

        toast.dismiss(); // Dismiss loading toast
        toast.success(`Login successful! Welcome, ${first_name}!`);
        navigate('/dashboard'); // Navigate to the dashboard
      }
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast in case of error
      console.error('Error during login:', error.response?.data || error.message);
      toast.error(`Login failed: ${error.response?.data?.message || 'Please check your credentials and try again.'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-center mb-8 text-2xl text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="employee_id" className="block mb-2 font-bold text-gray-700">Employee ID</label>
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
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 text-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
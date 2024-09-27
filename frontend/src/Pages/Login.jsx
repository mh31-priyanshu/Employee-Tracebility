import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
// import { parseJwt } from '../utils/jwtUtils';
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
      password,
    };

    toast.loading('Attempting to log in...'); // Add loading toast

    try {
      const response = await axios.post(`http://localhost:5000/user/login/${role}`, loginData, {
        withCredentials: true
      });
    
      console.log('API Response:', response.data);  // Log the full response data
    
      if (response.status === 200) {
        const { token, role } = response.data;
        // const decodedToken = parseJwt(token);
    
        // if (!decodedToken) {
        //   throw new Error('Failed to decode token');
        // }
        
        const userRole = role;
        login(userRole);
        dispatch(setUser({ token,  role: userRole }));

        toast.dismiss(); // Dismiss loading toast
        toast.success(`Login successful! Welcome , ${userRole}!`);
        navigate('/dashboard');
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
      <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
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
    <div className="mb-5">
      <label htmlFor="role" className="block mb-2 font-bold text-gray-700">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-3 border rounded-md border-gray-300 text-lg"
      >
        <option value="worker">Worker</option>
        <option value="supervisor">Supervisor</option>
        <option value="manager">Manager</option>
      </select>
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
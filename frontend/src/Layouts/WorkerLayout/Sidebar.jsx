import React, { useEffect } from 'react';
import { ArchiveRestore, Barcode, ChartNoAxesColumn, ChartNoAxesGantt, ChevronDown, ChevronUp, DatabaseBackup, PenLine, RadioTower, User, UsersRoundIcon, WrapText } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPage, setOpenSideBar } from '../../context/context';
import toast from 'react-hot-toast';
import { clearUser } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';


const sidebarItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/feac93fdbfa80cd5da4ec08ccf5d6af0ccbd1da5da3358fb50fa3b1a83edbc42?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3", text: "Dashboard", isActive: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d177a2f15dd05adc5c834de067a3c32c8420ae51baa8a54933d6a4ad6b88ba1?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3", text: "Help" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7fee6f4df07e00aa4f15982d377f328be105882d2c30f0866d5f4f1e346b2b00?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3", text: "Report" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/754d0d9b3297ac1ff4e414dc0b1a0d38c5859b3a4dccd1d821aec7c03225a874?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3", text: "Run" }
];

function Sidebar() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);
    const selectedPage = useSelector((state) => state.global.selectedPage);
    const openSideBar = useSelector((state) => state.global.openSideBar);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    // Handle logout action
    const handleLogout = async () => {
      try {
        const response = await fetch((import.meta.env.VITE_REACT_APP_SERVER_URL) + '/user/logout', {
          method: 'GET',
          credentials: 'include', // Include cookies if necessary
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          dispatch(clearUser());
          toast.success('Logout successful!');
        } else {
          throw new Error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        toast.error('Logout failed. Please try again.');
      }
    };

  // Redirect to login when token is cleared (logged out)
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
      

    return (
        <nav className={`${openSideBar?'max-md:block z-50 fixed shadow-lg w-[320px]':'max-md:hidden'} p-4 bg-white md:w-[320px]`}>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6798a9241c17dbb1d4d5c7490ae3dfaa3561f3d4bed1a9847acf18d80520877?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3" alt="Logo" className="object-contain aspect-[5.15] w-[160px] mb-[60px]" />
            <ul className="space-y-1">
            <li>
                <a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 rounded p-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 rounded p-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 rounded p-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Report
                </a>
            </li>
            <li onClick={handleLogout}>
                <a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 rounded p-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Logout
                </a>
            </li>
            <li>
                <button 
                onClick={() => {setIsSettingsOpen(!isSettingsOpen)}} 
                className={`flex items-center justify-between w-full text-gray-700  rounded p-2 ${!isSettingsOpen?' bg-gray-200':'text-gray-700'} `}
                >
                <span className={`flex items-center `}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                </span>
                {isSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isSettingsOpen && (
                <ul className="ml-4 mt-2 space-y-2">

                    <button className={`flex items-center p-2 w-full hover:bg-[#E8F1FD] rounded  ${selectedPage=='line-assignment'?'text-blue-600 bg-[#E8F1FD]':'text-gray-700'}`}
                        onClick={() => {dispatch(setSelectedPage('line-assignment')); dispatch(setOpenSideBar(false));}}
                    >
                        <PenLine className="w-4 h-4 mr-2" />
                        Line Assignment
                    </button>

                </ul>
                )}
            </li>
            </ul>
      </nav>
  );
}

export default Sidebar;


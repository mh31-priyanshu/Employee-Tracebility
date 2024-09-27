import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import UserMaster from '../Components/Settings/UserMaster';
import ShiftMaster from '../Components/Settings/ShiftMaster';
import LineMaster from '../Components/Settings/LineMaster';
import LineAssignment from '../Components/Settings/LineAssignment';
import axios from 'axios';

function Dashboard() {
    const selectedPage = useSelector((state) => state.global.selectedPage);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          let user = await axios.get((import.meta.env.VITE_REACT_APP_SERVER_URL)+'/user/getuser', {
        withCredentials: true,  // for cookies
      });
          console.log(user.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchUser(); // Call the async function
    }, []);
  return (
    <div className="flex overflow-hidden  bg-gray-100">
      <Sidebar />
      <main className="w-[100%]">
        <Header/>
        {selectedPage=='' && ''}
        {selectedPage=='user-master' && <UserMaster />}
        {selectedPage=='shift-master' && <ShiftMaster />}
        {selectedPage=='line-master' && <LineMaster />}
        {selectedPage=='line-assignment' && <LineAssignment />}
        {selectedPage=='station-master' && <div>awnfibn</div>}
      </main>
    </div>
  );
}

export default Dashboard;
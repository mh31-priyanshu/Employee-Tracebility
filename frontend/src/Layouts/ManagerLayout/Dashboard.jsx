import React, { useEffect } from 'react';
import Sidebar from '../ManagerLayout/Sidebar';
import Header from '../ManagerLayout/Header';
import { useSelector } from 'react-redux';
import UserMaster from '../../Components/Settings/UserMaster';
import ShiftMaster from '../../Components/Settings/ShiftMaster';
import LineMaster from '../../Components/Settings/LineMaster';
import LineAssignment from '../../Components/Settings/LineAssignment';
import axios from 'axios';
import StationMaster from '../../Components/Settings/StationMaster';
import ControllerFamily from '../../Components/Settings/ControllerFamily';

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
    <div className="flex overflow-hidden  bg-bg">
      <Sidebar />
      <main className="w-[100%]">
        <Header/>
        {selectedPage=='' && ''}
        {selectedPage=='user-master' && <UserMaster />}
        {selectedPage=='shift-master' && <ShiftMaster />}
        {selectedPage=='line-master' && <LineMaster />}
        {selectedPage=='line-assignment' && <LineAssignment />}
        {selectedPage=='station-master' && <div><StationMaster /></div>}
        {selectedPage=='controller-family' && <div><ControllerFamily /></div>}
      </main>
    </div>
  );
}

export default Dashboard;
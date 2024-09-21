import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import UserMaster from '../Components/Settings/UserMaster';
import ShiftMaster from '../Components/Settings/ShiftMaster';
import LineMaster from '../Components/Settings/LineMaster';
import LineAssignment from '../Components/Settings/LineAssignment';

function Dashboard() {
    const selectedPage = useSelector((state) => state.global.selectedPage);
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
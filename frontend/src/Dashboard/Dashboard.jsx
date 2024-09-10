import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useGlobal } from '../context/GlobalContext';
import UserMaster from '../Components/Settings/UserMaster';
import ShiftMaster from '../Components/Settings/ShiftMaster';
import LineMaster from '../Components/Settings/LineMaster';
import LineAssignment from '../Components/Settings/LineAssignment';

function Dashboard() {
    const {selectedPage} = useGlobal();
  return (
    <div className="flex overflow-hidden flex-wrap bg-gray-100">
      <Sidebar />
      <main className="w-4/5">
        <Header/>
        {selectedPage=='' && ''}
        {selectedPage=='user-master' && <UserMaster />}
        {selectedPage=='shift-master' && <ShiftMaster />}
        {selectedPage=='line-master' && <LineMaster />}
        {selectedPage=='line-assignment' && <LineAssignment />}
      </main>
    </div>
  );
}

export default Dashboard;
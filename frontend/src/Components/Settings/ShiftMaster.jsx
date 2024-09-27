import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';

export default function ShiftMaster() {
  // State to hold shifts data
  const [shifts, setShifts] = useState([]);
  const columns = ["Shift Name", "Start Time", "End Time", "Edit", "Delete"];

  // Fetch shifts from API when the component mounts
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch('http://localhost:5000/shift/getall', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.success) {
            // Transform the data to match your shifts format
            const transformedShifts = data.data.map(shift => ({
              name: shift.shift_name,
              startTime: shift.start_time,
              endTime: shift.end_time,
            }));
            setShifts(transformedShifts); // Update shifts state with fetched data
          } else {
            throw new Error('Failed to fetch shifts');
          }
        } else {
          throw new Error('Failed to fetch shifts');
        }
      } catch (error) {
        console.error('Error during fetching shifts:', error);
        toast.error('Fetching shifts failed. Please try again.');
      }
    };

    fetchShifts(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Shift Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Shift Management:</h3>
          <div className="flex space-x-2 max-md:mt-3">
            <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
            <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
            <input type="text" id="shift-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input type="time" id="start-time" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input type="time" id="end-time" className="w-full p-2 border rounded" />
          </div>
        </form>
      </div>

      <TableSearch data={shifts} header={columns} name="Shift Management" />
    </main>
  );
}

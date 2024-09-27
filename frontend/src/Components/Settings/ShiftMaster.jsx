import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';

export default function ShiftMaster() {
  const [shifts, setShifts] = useState([]);
  const [shiftName, setShiftName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editingShiftId, setEditingShiftId] = useState(null);

  const columns = ["Shift Id", "Shift Name", "Start Time", "End Time", "Edit", "Delete"];

  // Fetch shifts (all shifts) from the API when the component mounts
  const fetchShifts = async () => {
    try {
      const response = await fetch((import.meta.env.VITE_REACT_APP_SERVER_URL)+'/shift/getall', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          const transformedShifts = data.data.map(shift => ({
            id: shift.shift_id,
            name: shift.shift_name,
            startTime: shift.start_time,
            endTime: shift.end_time,
          }));
          setShifts(transformedShifts);
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

  useEffect(() => {
    fetchShifts(); // Fetch all shifts on component mount
  }, []);

  // Handle Edit Click (with API call to fetch single shift)
  const handleEditClick = async (shift) => {
    try {
      const response = await fetch((import.meta.env.VITE_REACT_APP_SERVER_URL)+`/shift/get/${shift.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          const shiftData = data.data;
          setShiftName(shiftData.shift_name);
          setStartTime(shiftData.start_time);
          setEndTime(shiftData.end_time);
          setEditingShiftId(shiftData.shift_id); // Set the shift ID being edited
        } else {
          throw new Error('Failed to fetch the shift');
        }
      } else {
        throw new Error('Failed to fetch the shift');
      }
    } catch (error) {
      console.error('Error during fetching shift:', error);
      toast.error('Fetching shift failed. Please try again.');
    }
  };

  // Handle Save (either create or update a shift)
  const handleSave = async () => {
    const formattedStartTime = startTime.length === 5 ? `${startTime}:00` : startTime;
    const formattedEndTime = endTime.length === 5 ? `${endTime}:00` : endTime;

    const payload = {
      shift_name: shiftName,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    };

    let apiUrl = 'http://localhost:5000/shift/addshift'; // Default for creating new shift
    let method = 'POST';

    if (editingShiftId) {
      apiUrl = `http://localhost:5000/shift/updateshift/${editingShiftId}`; // Update for editing shift
      method = 'PUT';
    }

    try {
      const response = await fetch(apiUrl, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        if (result.success) {
          toast.success('Shift saved successfully');
          const updatedShift = {
            id: editingShiftId || result.shift_id, // ID from response or existing ID
            name: shiftName,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };

          if (editingShiftId) {
            // Update existing shift in the list
            setShifts((prevShifts) => prevShifts.map((shift) => shift.id === editingShiftId ? updatedShift : shift));
          } else {
            // Add new shift to the list
            setShifts((prevShifts) => [...prevShifts, updatedShift]);
          }

          // Reset form
          setEditingShiftId(null);
          setShiftName('');
          setStartTime('');
          setEndTime('');
        }
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error during saving shift:', error);
      toast.error('Saving shift failed. Please try again.');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Shift Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Shift Management:</h3>
          <div className="flex space-x-2 max-md:mt-3">
            <button 
              className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" 
              onClick={() => {
                setShiftName('');
                setStartTime('');
                setEndTime('');
                setEditingShiftId(null); // Reset the form
              }}
            >
              Reset
            </button>
            <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
            <input
              type="text"
              id="shift-name"
              className="w-full p-2 border rounded"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
            />
          </div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Active
            <input type="checkbox" value="false" class="sr-only peer"  />
            <div class="relative w-11 h-6 px-8 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              id="start-time"
              className="w-full p-2 border rounded"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              id="end-time"
              className="w-full p-2 border rounded"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
          
          </div>
        </form>
      </div>

      {/* Shifts Table */}
      <TableSearch
        data={shifts}
        header={columns}
        name="Shift Management"
        onEditClick={handleEditClick} // Pass edit handler to TableSearch
      />
    </main>
  );
}

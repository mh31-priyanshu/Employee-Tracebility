import React from 'react';
import TableSearch from '../Additional/TableSearch';
import { useEffect,useState } from 'react';
export default function LineAssignment() {
  const [currentShift, setCurrentShift] = useState('');
  const lines = [
    { date: "04-09-2024", shift: "Morning", lineName: "Line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "Line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Mornings", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "Line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "Line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
    { date: "04-09-2024", shift: "Morning", lineName: "line 1", employeeName: "Alex", employeeBarcode: "||||||||||||||||||||||||||||||||" },
  ]
  const columns = [
    "Date","Shift","Line Name","Employee Name","Employee Barcode","Edit","Delete"
  ]
  const shifts = [
    { name: "Morning", startTime: "07:00", endTime: "12:00" },
    { name: "Afternoon", startTime: "12:00", endTime: "18:00" },
    { name: "Evening", startTime: "18:00", endTime: "22:00" },
    { name: "Night", startTime: "22:00", endTime: "03:00" },
  ]
  useEffect(() => {
    const getCurrentShift = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      for (const shift of shifts) {
        let [startHour, startMinute] = shift.startTime.split(':').map(Number);
        let [endHour, endMinute] = shift.endTime.split(':').map(Number);

        let startTimeMinutes = startHour * 60 + startMinute;
        let endTimeMinutes = endHour * 60 + endMinute;

        // Handle the night shift that crosses midnight
        if (endTimeMinutes < startTimeMinutes) {
          endTimeMinutes += 24 * 60;
        }

        if (currentTime >= startTimeMinutes && currentTime < endTimeMinutes) {
          return shift.name;
        }

        // Special case for the night shift
        if (shift.name === "Night" && (currentTime >= startTimeMinutes || currentTime < endTimeMinutes % (24 * 60))) {
          return shift.name;
        }
      }

      return shifts[0].name; // Default to the first shift if no match is found
    };

    setCurrentShift(getCurrentShift());
  }, []);
  const handleEditClick = () =>{}
  const handleDeleteClick = () =>{}
  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Line Assignment:</h3>
            <div className="flex  space-x-2  max-md:mt-3">
                <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
            <input type="text" id="shift-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input type="text" id="start-time" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">Employee Barcode</label>
            <input type="url" id="end-time" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="datetime-local" id="shift-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
            <select 
              className="w-full p-2 border rounded" 
              name="shift" 
              value={currentShift}
              onChange={(e) => setCurrentShift(e.target.value)}
            >
              {shifts.map((shift, index) => (
                <option key={index} value={shift.name} className="px-4 py-2 text-left">
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        
      </div>
      <TableSearch name="Line Assignment Table" header={columns} data={lines} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick}/>
    </main>
  );
}
/* eslint-disable no-unused-vars */
import React from 'react';
import TableSearch from '../Additional/TableSearch';
import AutocompleteInput from '../Additional/AutocompleteInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { name } from 'react-date-object/calendars/julian';

export default function LineAssignment() {

  const [shiftData, setShiftData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [stationData, setStationData] = useState([]);


  const [inputValues, setInputValues] = useState({
    employee: { user_id: '', employee_id: '', name: '' },
    station: { station_id: '', station_name: '' },
    line: { line_id: '', line_name: '' },
    shift: '',
  });

  const columns = [
    "Date", "Shift", "Line Name", "Employee Name", "Employee Barcode", "Edit", "Delete"
  ]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/shift/getall`),
          axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/getall`),
          axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getall`)
        ]);

        const [shifts, employees, stations] = responses.map(res => res.data.data);
        setShiftData(
          shifts.filter(shift => shift.active === 1).map(shift => ({
            name: shift.shift_name,
            startTime: shift.start_time,
            endTime: shift.end_time,
          }))
        );
        setEmployeeData(employees.map(user => ({
          id: user.employee_id,
          name: user.employee_name,
          user_id: user.user_id.toString(),
        })));
        setStationData(stations.map(station => ({
          id: station.station_id.toString(),
          name: station.station_name,
        })));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const getCurrentShift = (shiftData) => {
      if (!Array.isArray(shiftData)) {
        console.error('Invalid input: shiftData is not an array', shiftData);
        return '';
      }
    
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
    
      for (const shift of shiftData) {
        const [startHour, startMinute] = shift.startTime.split(':').map(Number);
        const [endHour, endMinute] = shift.endTime.split(':').map(Number);
    
        const startTimeMinutes = startHour * 60 + startMinute;
        let endTimeMinutes = endHour * 60 + endMinute;
    
        if (endTimeMinutes < startTimeMinutes) {
          endTimeMinutes += 24 * 60;
        }
    
        const adjustedCurrentTime = currentTime < startTimeMinutes ? currentTime + 24 * 60 : currentTime;
    
        if (adjustedCurrentTime >= startTimeMinutes && adjustedCurrentTime < endTimeMinutes) {
          return shift.name;
        }
      }
    
      return shiftData.length > 0 ? shiftData[0].name : '';
    };

    if (shiftData.length > 0) {
      const Shift = getCurrentShift(shiftData);
      setInputValues(prevValues => ({ ...prevValues, shift: Shift }));
    }
  }, [shiftData]);

  useEffect(() => {
    if (inputValues.station.station_id) {
      (async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getline/${inputValues.station.station_id}`
          );
          const { line_id, line_name } = response.data.data;
          setInputValues(prev => ({
            ...prev,
            line: { line_id, line_name },
          }));
        } catch (err) {
          console.error('Error fetching line data:', err);
        }
      })();
    }
  }, [inputValues.station.station_id]);



  const handleEditClick = () => { }
  const handleDeleteClick = () => { }


  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-card-header px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Line Assignment:</h3>
          <div className="flex  space-x-2  max-md:mt-3">
            <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
            <button className="px-8 py-2 bg-button text-white rounded-lg hover:bg-header">Save</button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            < AutocompleteInput
              suggestions={employeeData}
              label="Employee ID"
              // value={{ id: inputValues.employee.employee_id, name: inputValues.employee.name }}
              onChange={(value) => setInputValues({
                ...inputValues, employee: {
                  user_id: value.user_id,
                  employee_id: value.id,
                  name: value.name
                }
              })}
            />
          </div>
          <div>
            < AutocompleteInput
              suggestions={stationData}
              label="Station Name"
              // value={{ name: inputValues.station.station_name }}
              onChange={(value) => setInputValues({
                ...inputValues, station: {
                  station_id: value.id,
                  station_name: value.name,
                }
              })}
            />
          </div>
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
            <input type="text" id="shift-name" value={inputValues.line.line_name} className="w-full p-2 border rounded" readOnly />
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
              value={inputValues.shift}
              onChange={(e) => setInputValues({ ...inputValues, shift: e.target.value })}
            >
              {shiftData.map((shift, index) => (
                <option key={index} value={shift.name} className="px-4 py-2 text-left">
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
        </form>

      </div>
      {/* <TableSearch name="Line Assignment Table" header={columns} data={lines} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick}/> */}
    </main>
  );
}




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function LineAssignment() {
//   const [lines, setLines] = useState([]);       // For line data
//   const [employees, setEmployees] = useState([]); // For employee data
//   const [shifts, setShifts] = useState([]);      // For shift data
//   const [selectedLine, setSelectedLine] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedShift, setSelectedShift] = useState('');

//   // Fetch line data from API
//   useEffect(() => {
//     const fetchLines = async () => {
//       try {
//         const response = await axios.get('/line/getall');
//         setLines(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
//       } catch (error) {
//         console.error('Error fetching lines:', error);
//       }
//     };
//     fetchLines();
//   }, []);

//   // Fetch employee data from API
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('/user/getallusers');
//         setEmployees(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   // Fetch shift data from API
//   useEffect(() => {
//     const fetchShifts = async () => {
//       try {
//         const response = await axios.get('/shift/getall');
//         setShifts(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
//       } catch (error) {
//         console.error('Error fetching shifts:', error);
//       }
//     };
//     fetchShifts();
//   }, []);

//   // Handler to create a job using the selected data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/job/addjob', {
//         line: selectedLine,
//         employee: selectedEmployee,
//         shift: selectedShift,
//       });
//       console.log('Job created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating job:', error);
//     }
//   };

//   return (
//     <main className="flex-1 overflow-y-auto p-6">
//       <div className="bg-white shadow rounded-lg mb-6">
//         <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
//           <h3 className="text-lg font-semibold">Line Assignment:</h3>
//           <div className="flex  space-x-2  max-md:mt-3">
//             <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
//             <button onClick={handleSubmit} className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
//           </div>
//         </div>

//         <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
//           <div>
//             <label htmlFor="line-name" className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
//             <input
//               list="lines"
//               id="line-name"
//               className="w-full p-2 border rounded"
//               onChange={(e) => setSelectedLine(e.target.value)}
//             />
//             <datalist id="lines">
//               {Array.isArray(lines) && lines.map((line) => (
//                 <option key={line.id} value={line.line_name} />
//               ))}
//             </datalist>
//           </div>

//           <div>
//             <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
//             <input
//               list="employees"
//               id="employee-name"
//               className="w-full p-2 border rounded"
//               onChange={(e) => setSelectedEmployee(e.target.value)}
//             />
//             <datalist id="employees">
//               {Array.isArray(employees) && employees.map((employee) => (
//                 <option key={employee.id} value={employee.name} />
//               ))}
//             </datalist>
//           </div>

//           <div>
//             <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
//             <select
//               className="w-full p-2 border rounded"
//               name="shift"
//               value={selectedShift}
//               onChange={(e) => setSelectedShift(e.target.value)}
//             >
//               {Array.isArray(shifts) && shifts.map((shift) => (
//                 <option key={shift.id} value={shift.name}>
//                   {shift.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

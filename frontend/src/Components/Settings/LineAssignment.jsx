/* eslint-disable no-unused-vars */
import React from 'react';
import TableSearch from '../Additional/TableSearch';
import AutocompleteInput from '../Additional/AutocompleteInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { name } from 'react-date-object/calendars/julian';

export default function LineAssignment() {

  const [shiftData, setShiftData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editKey, setEditKey] = useState(null);


  const [inputValues, setInputValues] = useState({
    employee: { user_id: '', employee_id: '', name: '' },
    station: { station_id: '', station_name: '' },
    line: { line_id: '', line_name: '' },
    shift: { shift_id: '', shift_name: '' },
    date: ''
  });

  const columns = [
    "Job Number", "Employee ID", "Employee Name", "Station Name", "Line Name", "Shift", "Job Date", "Status", "Edit", "Delete"
  ]

  const fetchData = async () => {
    try {
      const responses = await axios.all([
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/shift/getall`),
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/getall`),
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getall`),
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/job/getall`)
      ]);

      const [shifts, employees, stations, jobs] = responses.map(res => res.data.data);
      setShiftData(
        shifts.filter(shift => shift.active === 1).map(shift => ({
          id: shift.shift_id.toString(),
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
      setTableData(jobs);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);


  const getCurrentShift = () => {
    const currentTime = new Date();
    const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Convert "HH:mm:ss" to total minutes from midnight
    const convertToMinutes = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };

    const currentShift = shiftData.find((shift) => {
      const startTotalMinutes = convertToMinutes(shift.startTime);
      const endTotalMinutes = convertToMinutes(shift.endTime);

      if (startTotalMinutes <= endTotalMinutes) {
        // Regular shift (does not span midnight)
        return (
          currentTotalMinutes >= startTotalMinutes &&
          currentTotalMinutes <= endTotalMinutes
        );
      } else {
        // Shift that spans midnight
        return (
          currentTotalMinutes >= startTotalMinutes ||
          currentTotalMinutes <= endTotalMinutes
        );
      }
    });

    return currentShift ? {
      shift_id: currentShift.id,
      shift_name: currentShift.name
    } : null;
  };


  useEffect(() => {
    if (shiftData.length > 0) {
      const Shift = getCurrentShift();
      if (Shift) {
        setInputValues(prevValues => ({
          ...prevValues, shift: {
            shift_id: Shift.shift_id,
            shift_name: Shift.shift_name
          }
        }));
      }
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

  const handleResetClick = () => {
    setInputValues({
      employee: { user_id: '', employee_id: '', name: '' },
      station: { station_id: '', station_name: '' },
      line: { line_id: '', line_name: '' },
      shift: { shift_id: '', shift_name: '' },
      date: ''
    });
  }


  const handleSaveClick = async () => {

    if (!inputValues.employee.user_id || !inputValues.station.station_id || !inputValues.line.line_id || !inputValues.shift.shift_id) {
      toast.error('Fill all Fields to Save');
      return;
    }

    const payload = {
      station_id: inputValues.station.station_id,
      line_id: inputValues.line.line_id,
      user_id: inputValues.employee.user_id,
      shift_id: inputValues.shift.shift_id,
      job_date: inputValues.date || ''  
    };

    console.log(inputValues.date);
  
    try {
      let api_endpoint;
      let response;
      if (editKey) {
        api_endpoint = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/job/updatejob/${editKey}`;
        response = await axios.put(api_endpoint, payload);
      } else {
        api_endpoint = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/job/addjob`;
        response = await axios.post(api_endpoint, payload);
      }
  
      if (response.data.success) {
        toast.success(response.data.message);
        handleResetClick(); 
        fetchData(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to save the data");
    }
  };
  


  const handleEditClick = async (row) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/job/get/${row.job_id}`);
      if (response.data.success) {
        const { data } = response.data; 
        setInputValues({
          employee: {
            user_id: data.user_id,
            employee_id: data.employee_id,
            name: data.employee_name,
          },
          station: {
            station_id: data.station_id,
            station_name: data.station_name,
          },
          line: {
            line_id: data.line_id,
            line_name: data.line_name,
          },
          shift: {
            shift_id: data.shift_id,
            shift_name: data.shift_name,
          },
          date: data.job_date,
        });
      }
      setEditKey(row.job_id)
    } catch (error) {
      console.error(error);
      toast.error("Unable to save the data");
    }
  };

  const handleDeleteClick = async (row) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/job/delete/${row.job_id}`);
      if (response.data.success) {
        toast.success("Job deleted successfully");
        fetchData()
      } else {
        toast.error("Failed to delete the job");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete the job");
    }
  };
  

  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-card-header px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Line Assignment:</h3>
          <div className="flex  space-x-2  max-md:mt-3">
            <button onClick={handleResetClick} className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
            <button onClick={handleSaveClick} className="px-8 py-2 bg-button text-white rounded-lg hover:bg-header">Save</button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            < AutocompleteInput
              suggestions={employeeData}
              label="Employee ID"
              value={{ id: inputValues.employee.employee_id, name: inputValues.employee.name }}
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
              value={{ name: inputValues.station.station_name }}
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
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1" >Date</label>
            <input onChange={(e) => { setInputValues({ ...inputValues, date: e.target.value }) }} value={inputValues.date} type="datetime-local" id="shift-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
            <select
              className="w-full p-2 border rounded"
              name="shift"
              value={inputValues.shift.shift_id || ""}
              onChange={(e) => {
                const selectedShift = shiftData.find(
                  (shift) => shift.id === e.target.value
                );

                if (selectedShift) {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    shift: {
                      shift_id: selectedShift.id,
                      shift_name: selectedShift.name,
                    },
                  }));
                }
              }}
            >
              <option value="" disabled>
                Select Shift
              </option>
              {shiftData.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>
        </form>

      </div>
      <TableSearch name="Line Assignment Table" header={columns} data={tableData} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
    </main>
  );
}






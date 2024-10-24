import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';
export default function ControllerFamily() {
  const [controllerFamilies, setControllerFamilies] = useState([]);
  const [controllerFamilyName, setControllerFamilyName] = useState('');
  const [controllerFamilyProductionTime, setControllerFamilyProductionTime] = useState("01:00:00");
  const [controllerFamilyDescription, setControllerFamilyDescription] = useState();
  const [editingControllerFamilyId, setEditingControllerFamilyId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  const columns = ["Station Number", "Station Name", "Production Time (hrs. )", "Description", "Edit", "Delete"];

  const transformedControllerFamily = controllerFamilies.map(controllerFamily =>({
    id: controllerFamily.controller_family_id,
    name: controllerFamily.family_name,
    time: controllerFamily.production_time,
    description: controllerFamily.description
  }))

  const fetchControllerFamily = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/controller_family/getall`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);
  
      // Set the data regardless of success status
      if (data.success) {
        setControllerFamilies(data.data);
      } else {
        setControllerFamilies([]);
        // Only show toast if we're actually changing from having data to no data
        if (controllerFamilies.length > 0) {
          toast.success(data.message || 'No Controller Families found');
        }
      }
    } catch (error) {
      console.error('Error during fetching Controller Family:', error);
      toast.error('Fetching Controller Family failed. Please try again.');
    }
  };
  
  

  useEffect(() => {
    let isFirstMount = true;
    
    const fetchData = async () => {
      if (isFirstMount) {
        await fetchControllerFamily();
      }
    };
    
    fetchData();
    
    return () => {
      isFirstMount = false;
    };
  }, [refreshTable]);

  const handleSave = async () => {
    const payload = {
        family_name: controllerFamilyName,
        production_time: controllerFamilyProductionTime,
      description: controllerFamilyDescription,
    };

    let apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/controller_family/add`;
    let method = 'POST';

    if (editingControllerFamilyId) {
      apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/controller_family/update/${editingControllerFamilyId}`;
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
          toast.success('Controller Family saved successfully');

          const updatedControllerFamily = {
            id: editingControllerFamilyId || result.controller_family_id, // Assuming the response returns station_id
            name: controllerFamilyName,
            description: controllerFamilyDescription,
            productionTime: controllerFamilyProductionTime
          };

          if (editingControllerFamilyId) {
            setControllerFamilies(prevControllerFamily => prevControllerFamily.map(ControllerFamily => ControllerFamily.id === editingControllerFamilyId ? updatedControllerFamily : ControllerFamily));
          } else {
            setControllerFamilies(prevControllerFamily => [...prevControllerFamily, updatedControllerFamily]);
          }

          setRefreshTable(prev => !prev);
          setEditingControllerFamilyId(null);
          setControllerFamilyName('');
          setControllerFamilyProductionTime("01:00:00");
          setControllerFamilyDescription('');
        }
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error during saving Controller Family:', error);
      toast.error('Saving Controller Family failed. Please try again.');
    }
  };

  const handleDeleteClick = async (controller_family) => { 
    if (window.confirm('Are you sure you want to delete this Controller Family?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/controller_family/delete/${controller_family.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const result = await response.json();
          if (result.success) {
            toast.success('Controller Family deleted successfully');
            setControllerFamilies(prevControllerFamily => prevControllerFamily.filter(l => l.id !== controller_family.id));
            setRefreshTable(prev => !prev);
          } else {
            throw new Error('Delete failed');
          }
        } else {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error('Error during deleting Controller Family:', error);
        toast.error('Deleting Controller Family failed. Please try again.');
      }
    }
  };
  const handleEditClick = async (controller_family) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/controller_family/get/${controller_family.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          const controllerFamilyData = data.data;
          setControllerFamilyName(controllerFamilyData.family_name);
          setControllerFamilyDescription(controllerFamilyData.description);
          setEditingControllerFamilyId(controllerFamilyData.controller_family_id);
          setControllerFamilyProductionTime(controllerFamilyData.production_time) // Set the station ID being edited
        } else {
          throw new Error('Failed to fetch the Controller Family');
        }
      } else {
        throw new Error('Failed to fetch the Controller Family');
      }
    } catch (error) {
      console.error('Error during fetching Controller Family:', error);
      toast.error('Fetching Controller Family failed. Please try again.');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Station Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Controller Family Management:</h3>
          <div className="flex space-x-2 max-md:mt-3">
            <button 
              className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" 
              onClick={() => {
                setStationName('');
                setStationDescription('');
                setEditingStationId(null);
                setControllerFamilyProductionTime('');
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
            <label htmlFor="station-name" className="block text-sm font-medium text-gray-700 mb-1">Controller Family Name</label>
            <input
              type="text"
              id="station-name"
              className="w-full p-2 border rounded"
              value={controllerFamilyName}
              onChange={(e) => setControllerFamilyName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="station-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="station-description"
              className="w-full p-2 border rounded"
              value={controllerFamilyDescription}
              onChange={(e) => setControllerFamilyDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="station-description" className="block text-sm font-medium text-gray-700 mb-1">Production Time (hrs. )</label>
            <input
              type="time"
              id="station-description"
              className="w-full p-2 border rounded"
              min="0" step="1"
              value={controllerFamilyProductionTime}
              onChange={(e) => setControllerFamilyProductionTime(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Stations Table */}
      <TableSearch
        data={transformedControllerFamily}
        header={columns}
        name="Controller Family Management:"
        onEditClick={handleEditClick} // You can add an edit handler similar to ShiftMaster
        onDeleteClick={handleDeleteClick}
      />
    </main>
  );
}

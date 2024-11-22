import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';

export default function StationMaster() {
  const [stations, setStations] = useState([]);
  const [stationName, setStationName] = useState('');
  const [stationDescription, setStationDescription] = useState('');
  const [editingStationId, setEditingStationId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  const columns = ["Station Number", "Station Name", "Description", "Edit", "Delete"];

  const transformedStations = stations.map(station => ({
    id: station.station_id, // Assuming the database has a station_id field
    name: station.station_name,
    description: station.station_description,
  }));

  const fetchStations = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getall`, {
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
      setStations(data.data);
    } else {
      setStations([]); // Set empty array if no data
      // Only show toast if we're actually changing from having data to no data
      if (stations.length > 0) {
        toast.info(data.message || 'No Stations found');
      }
    }
  } catch (error) {
    console.error('Error during fetching stations:', error);
    toast.error('Fetching stations failed. Please try again.');
  }
};

// Update useEffect to prevent double fetching
useEffect(() => {
  let isFirstMount = true;
  
  const fetchData = async () => {
    if (isFirstMount) {
      await fetchStations();
    }
  };
  
  fetchData();
  
  return () => {
    isFirstMount = false;
  };
}, [refreshTable]);

  const handleSave = async () => {
    const payload = {
      station_name: stationName,
      station_description: stationDescription,
    };

    let apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/addstation`;
    let method = 'POST';

    if (editingStationId) {
      apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/updatestation/${editingStationId}`;
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
          toast.success('Station saved successfully');

          const updatedStation = {
            id: editingStationId || result.station_id, // Assuming the response returns station_id
            name: stationName,
            description: stationDescription,
          };

          if (editingStationId) {
            setStations(prevStations => prevStations.map(station => station.id === editingStationId ? updatedStation : station));
          } else {
            setStations(prevStations => [...prevStations, updatedStation]);
          }

          setRefreshTable(prev => !prev);
          setEditingStationId(null);
          setStationName('');
          setStationDescription('');
        }
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error during saving station:', error);
      toast.error('Saving station failed. Please try again.');
    }
  };

  const handleDeleteClick = async (station) => {
    if (window.confirm('Are you sure you want to delete this station?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/delete/${station.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const result = await response.json();
          if (result.success) {
            toast.success('Station deleted successfully');
            setStations(prevStations => prevStations.filter(l => l.id !== station.id));
            setRefreshTable(prev => !prev);
          } else {
            throw new Error('Delete failed');
          }
        } else {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error('Error during deleting station:', error);
        toast.error('Deleting station failed. Please try again.');
      }
    }
  };
  const handleEditClick = async (station) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/get/${station.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          const stationData = data.data;
          setStationName(stationData.station_name);
          setStationDescription(stationData.station_description);
          setEditingStationId(stationData.station_id); // Set the station ID being edited
        } else {
          throw new Error('Failed to fetch the station');
        }
      } else {
        throw new Error('Failed to fetch the station');
      }
    } catch (error) {
      console.error('Error during fetching station:', error);
      toast.error('Fetching station failed. Please try again.');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Station Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-card-header px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Station Management:</h3>
          <div className="flex space-x-2 max-md:mt-3">
            <button 
              className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" 
              onClick={() => {
                setStationName('');
                setStationDescription('');
                setEditingStationId(null);
              }}
            >
              Reset
            </button>
            <button className="px-8 py-2 bg-button text-white rounded-lg hover:bg-header" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="station-name" className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
            <input
              type="text"
              id="station-name"
              className="w-full p-2 border rounded"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="station-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="station-description"
              className="w-full p-2 border rounded"
              value={stationDescription}
              onChange={(e) => setStationDescription(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Stations Table */}
      <TableSearch
        data={transformedStations}
        header={columns}
        name="Station Management"
        onEditClick={handleEditClick} // You can add an edit handler similar to ShiftMaster
        onDeleteClick={handleDeleteClick}
      />
    </main>
  );
}

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StationAssign = () => {
  const [lines, setLines] = useState([]);
  const [stations, setStations] = useState({
    free: [],
    allocated: [],
  });
  const [lineName, setLineName] = useState('');
  const [filteredLines, setFilteredLines] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [lineSpecificStations, setLineSpecificStations] = useState([]);
  const [currentLineId, setCurrentLineId] = useState(null);

  // Fetch Lines
  useEffect(() => {
    const fetchLines = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/getall`
        );
        setLines(response.data.data);
      } catch (error) {
        toast.error('Error fetching lines!');
      }
    };
    fetchLines();
  }, []);

  // Fetch Stations
  const fetchStations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getAllStations`
      );
      setStations(response.data);
    } catch (error) {
      toast.error('Error fetching stations!');
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  // Fetch Stations for Specific Line
  const fetchLineSpecificStations = async (lineId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/getStationsByLine/${lineId}`
      );
      setLineSpecificStations(response.data.data);
    } catch (error) {
      toast.error('Error fetching line-specific stations!');
    }
  };

  // Handle Line Name Input
  const handleLineNameChange = (e) => {
    const value = e.target.value;
    setLineName(value);

    const filtered = lines.filter((line) =>
      line.line_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLines(filtered);
  };

  // Select Line from Dropdown
  const selectLine = (line) => {
    setLineName(line.line_name);
    setCurrentLineId(line.line_id);
    setFilteredLines([]);
    fetchLineSpecificStations(line.line_id);
  };

  // Toggle Station Selection
  const toggleStationSelection = (station) => {
    setSelectedStations((prev) =>
      prev.includes(station)
        ? prev.filter((s) => s !== station)
        : [...prev, station]
    );
  };

  // Determine if a station should be checked
  const isStationChecked = (station) => {
    const isLineSpecific = lineSpecificStations.some(
      (lineStation) => lineStation.station_id === station.station_id
    );

    return isLineSpecific || selectedStations.includes(station);
  };

  // Save Assignments
  const handleSave = async () => {
    if (!currentLineId) {
      toast.error('Please select a line first!');
      return;
    }

    try {
      const promises = selectedStations.map((station) =>
        axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/station/assignStation`, {
          line_id: currentLineId,
          station_id: station.station_id,
        })
      );
      await Promise.all(promises);
      toast.success('Stations assigned successfully!');
      setSelectedStations([]);
      fetchStations(); // Refresh component data
      fetchLineSpecificStations(currentLineId); // Refresh specific line data
    } catch (error) {
      toast.error('Error assigning stations!');
    }
  };

  return (
    <div className='flex-1 overflow-y-auto p-6'>
      <div>
        <div className="bg-white shadow rounded-lg mb-6">
          <div className='md:flex justify-between items-center bg-card-header px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Station Allocation:</h3>
            <div className="flex space-x-2 max-md:mt-3">
              <button
                className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setSelectedStations([])}
              >
                Reset
              </button>
              <button
                className="px-8 py-2 bg-button text-white rounded-lg hover:bg-header"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
          <div className="relative px-6 pb-6">
            <label
              htmlFor="line-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Line Name
            </label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              id="line-name"
              value={lineName}
              onChange={handleLineNameChange}
              placeholder="Search lines..."
            />
            {filteredLines.length > 0 && (
              <ul className="absolute z-10 w-full border rounded mt-1 max-h-60 overflow-y-auto bg-white shadow-lg">
                {filteredLines.map((line) => (
                  <li
                    key={line.line_id}
                    onClick={() => selectLine(line)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {line.line_name}
                  </li>
                ))}
              </ul>
            )}
            <div className='mt-6'>
        <div className='font-medium mb-3'>Working Stations:</div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">Free Stations</h4>
          {stations.free.map((station) => (
            <div key={station.station_id} className="flex items-center">
              <input
                type="checkbox"
                id={`free-station-${station.station_id}`}
                checked={isStationChecked(station)}
                onChange={() => toggleStationSelection(station)}
                className="mr-2"
              />
              <label htmlFor={`free-station-${station.station_id}`}>
                {station.station_name}
              </label>
            </div>
          ))}

          <h4 className="text-sm font-semibold text-gray-600 mt-4">Allocated Stations</h4>
          
          <div className='flex flex-col gap-2 flex-wrap'>
            {stations.allocated.map((station) => (
                <div key={station.station_id} className="flex items-center">
                <input
                    type="checkbox"
                    id={`allocated-station-${station.station_id}`}
                    checked={isStationChecked(station)}
                    onChange={() => toggleStationSelection(station)}
                    className="mr-2"
                />
                <label htmlFor={`allocated-station-${station.station_id}`}>
                    {station.station_name} (Line: {station.line_name})
                </label>
                </div>
            ))}
          </div>
        </div>
      </div>
          </div>
          
        </div>
      </div>

      
    </div>
  );
};

export default StationAssign;

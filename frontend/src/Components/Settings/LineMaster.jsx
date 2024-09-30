import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';

export default function LineMaster() {
  const [lines, setLines] = useState([]);
  const [lineName, setLineName] = useState('');
  const [lineDescription, setLineDescription] = useState('');
  const [editingLineId, setEditingLineId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  const columns = ["Line Number", "Line Name", "Description", "Edit", "Delete"];

  const transformedLines = lines.map(line => ({
    id: line.line_id, // Assuming the database has a line_id field
    name: line.line_name,
    description: line.line_description,
  }));

  const fetchLines = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/getall`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setLines(data.data);
        } else {
          throw new Error('Failed to fetch lines');
        }
      } else {
        throw new Error('Failed to fetch lines');
      }
    } catch (error) {
      console.error('Error during fetching lines:', error);
      toast.error('Fetching lines failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchLines();
  }, [refreshTable]);

  const handleSave = async () => {
    const payload = {
      line_name: lineName,
      line_description: lineDescription,
    };

    let apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/addline`;
    let method = 'POST';

    if (editingLineId) {
      apiUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/updateline/${editingLineId}`;
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
          toast.success('Line saved successfully');

          const updatedLine = {
            id: editingLineId || result.line_id, // Assuming the response returns line_id
            name: lineName,
            description: lineDescription,
          };

          if (editingLineId) {
            setLines(prevLines => prevLines.map(line => line.id === editingLineId ? updatedLine : line));
          } else {
            setLines(prevLines => [...prevLines, updatedLine]);
          }

          setRefreshTable(prev => !prev);
          setEditingLineId(null);
          setLineName('');
          setLineDescription('');
        }
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error during saving line:', error);
      toast.error('Saving line failed. Please try again.');
    }
  };

  const handleDeleteClick = async (line) => {
    if (window.confirm('Are you sure you want to delete this line?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/deleteline/${line.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const result = await response.json();
          if (result.success) {
            toast.success('Line deleted successfully');
            setLines(prevLines => prevLines.filter(l => l.id !== line.id));
            setRefreshTable(prev => !prev);
          } else {
            throw new Error('Delete failed');
          }
        } else {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error('Error during deleting line:', error);
        toast.error('Deleting line failed. Please try again.');
      }
    }
  };
  const handleEditClick = async (line) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/line/get/${line.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          const lineData = data.data;
          setLineName(lineData.line_name);
          setLineDescription(lineData.line_description);
          setEditingLineId(lineData.line_id); // Set the line ID being edited
        } else {
          throw new Error('Failed to fetch the line');
        }
      } else {
        throw new Error('Failed to fetch the line');
      }
    } catch (error) {
      console.error('Error during fetching line:', error);
      toast.error('Fetching line failed. Please try again.');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Line Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
          <h3 className="text-lg font-semibold">Line Management:</h3>
          <div className="flex space-x-2 max-md:mt-3">
            <button 
              className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" 
              onClick={() => {
                setLineName('');
                setLineDescription('');
                setEditingLineId(null);
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
            <label htmlFor="line-name" className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
            <input
              type="text"
              id="line-name"
              className="w-full p-2 border rounded"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="line-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="line-description"
              className="w-full p-2 border rounded"
              value={lineDescription}
              onChange={(e) => setLineDescription(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Lines Table */}
      <TableSearch
        data={transformedLines}
        header={columns}
        name="Line Management"
        onEditClick={handleEditClick} // You can add an edit handler similar to ShiftMaster
        onDeleteClick={handleDeleteClick}
      />
    </main>
  );
}

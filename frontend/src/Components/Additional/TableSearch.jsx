import { useState } from "react";
export default function TableSearch({ name, header, data = [], onEditClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsToShow, setRowsToShow] = useState(5);

  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
        <h3 className="text-lg font-semibold">{name}:</h3>
        <div className="flex max-md:justify-between space-x-2">
          <input 
            type="text" 
            placeholder="Search" 
            className="p-2 border rounded-lg px-5 w-[450px] max-md:mt-2 max-md:w-[160px]" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}  
          />
          <button className="px-8 py-2 max-md:px-6 max-md:py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 max-md:mt-2">
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto px-6 pb-12">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              {header.map((column, index) => (
                <th key={index} className="px-4 py-2 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, rowsToShow).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      {row[column]}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => onEditClick(row)} // Handle edit click
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='mt-3'>
          <label htmlFor="rowsToShow" className="mr-2">Rows to show:</label>
          <select
            id="rowsToShow"
            className="p-2 border rounded-lg"
            value={rowsToShow}
            onChange={(e) => setRowsToShow(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value={filteredData.length}>All</option>
          </select>
        </div>
      </div>
    </div>
  );
}

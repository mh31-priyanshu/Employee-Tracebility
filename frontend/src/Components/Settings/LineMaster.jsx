import React from 'react';
import TableSearch from '../Additional/TableSearch';

export default function LineMaster() {
  const columns =[
    "Line Number","Line Name","Description","Edit","Delete"
  ]
  const lines = [
    { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },
    { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },
    { lineNumber: "002", lineName: "line 2", lineDescription: "This is dedicated for mechanical purpose" },
    { lineNumber: "003", lineName: "line 3", lineDescription: "This is dedicated for mechanical purpose" },
    { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },       
  ]

  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Line Management:</h3>
            <div className="flex  space-x-2  max-md:mt-3">
                <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="shift-name" className="block text-sm font-medium text-gray-700 mb-1">Line Number</label>
            <input type="text" id="shift-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
            <input type="text" id="start-time" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" id="end-time" className="w-full p-2 border rounded" />
          </div>
          
        </form>
        
      </div>

      <TableSearch name="Line Management Table" data={lines} header={columns}/>
      
    </main>
  );
}
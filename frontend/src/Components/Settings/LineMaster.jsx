import React from 'react';

export default function LineMaster() {
  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Line Management:</h3>
            <div className="flex justify-end  space-x-2">
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

      {/* Shift Time Table */}
      <div className="bg-white shadow rounded-lg">
        <div className='flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Line Management Table:</h3>
            <div className="flex justify-end  space-x-2">
                <input type="text" placeholder="Search" className="p-2 border rounded-lg px-5 w-[450px] " />
                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Export</button>
            </div>
        </div>
        <div className="overflow-x-auto  px-6 pb-12 ">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Line Number</th>
                <th className="px-4 py-2 text-left">Line Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Edit</th>
                <th className="px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {[
                { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },
                { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },
                { lineNumber: "002", lineName: "line 2", lineDescription: "This is dedicated for mechanical purpose" },
                { lineNumber: "003", lineName: "line 3", lineDescription: "This is dedicated for mechanical purpose" },
                { lineNumber: "001", lineName: "line 1", lineDescription: "This is dedicated for mechanical purpose" },
              ].map((line) => (
                <tr key={line.id} className="border-b">
                  <td className="px-4 py-2">{line.lineNumber}</td>
                  <td className="px-4 py-2">{line.lineName}</td>
                  <td className="px-4 py-2">{line.lineDescription}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
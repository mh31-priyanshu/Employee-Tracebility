import React from 'react';

export default function UserMaster() {
  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">User Master:</h3>
            <div className="flex justify-end  space-x-2">
                <button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Reset</button>
                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12">
          <div>
            <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input type="text" id="employee-name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" id="phone-number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="email-id" className="block text-sm font-medium text-gray-700 mb-1">Email-Id</label>
            <input type="email" id="email-id" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700 mb-1">Employee Id</label>
            <input type="text" id="employee-id" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
            <input type="text" id="barcode" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input type="text" id="qualification" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input type="text" id="experience" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input type="text" id="designation" className="w-full p-2 border rounded" />
          </div>
        </form>
        
      </div>

      {/* Permissions */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Permissions:</h3>
        </div>
        <div className='flex px-6 pb-12 gap-10'>
          <span className="block text-md font-medium text-gray-700 mb-2">User Type :</span>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="user-type" value="admin" className="form-radio" />
              <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="user-type" value="operative" className="form-radio" />
              <span className="ml-2">Operative</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="user-type" value="supervisor" className="form-radio" />
              <span className="ml-2">Supervisor</span>
            </label>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white shadow rounded-lg">
        <div className='flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">Employees Table:</h3>
            <div className="flex justify-end  space-x-2">
                <input type="text" placeholder="Search" className="p-2 border rounded-lg px-5 w-[450px] " />
                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Export</button>
            </div>
        </div>
        <div className="overflow-x-auto  px-6 pb-12 ">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Employee ID</th>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Email-Id</th>
                <th className="px-4 py-2 text-left">Barcode</th>
                <th className="px-4 py-2 text-left">Qualification</th>
                <th className="px-4 py-2 text-left">Edit</th>
                <th className="px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#5644", name: "Alexander", phone: "9999999999", email: "Alexander@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
                { id: "#6112", name: "Pegasus", phone: "9999999999", email: "Pegasus@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
                { id: "#6141", name: "Martin", phone: "9999999999", email: "Martin@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
                { id: "#6535", name: "Cecil", phone: "9999999999", email: "Cecil@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
                { id: "#6541", name: "Luke", phone: "9999999999", email: "Luke@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
              ].map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-2">{employee.id}</td>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.phone}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.barcode}</td>
                  <td className="px-4 py-2">{employee.qualification}</td>
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
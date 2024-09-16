import React from 'react';
import TableSearch from '../Additional/TableSearch';

export default function UserMaster() {
  const employees = [
    { id: "#5644", name: "Alexander", phone: "9999999999", email: "Alexander@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6112", name: "Luke", phone: "9999999999", email: "Pegasus@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
    { id: "#6141", name: "Martin", phone: "9999999999", email: "Martin@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6535", name: "Cecil", phone: "9999999999", email: "Cecil@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6541", name: "Lukera", phone: "9999999999", email: "Luke@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
    { id: "#5644", name: "Alexander", phone: "9999999999", email: "Alexander@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6112", name: "Luke", phone: "9999999999", email: "Pegasus@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
    { id: "#6141", name: "Martin", phone: "9999999999", email: "Martin@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6535", name: "Cecil", phone: "9999999999", email: "Cecil@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6541", name: "Lukera", phone: "9999999999", email: "Luke@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
    { id: "#5644", name: "Alexander", phone: "9999999999", email: "Alexander@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6112", name: "Luke", phone: "9999999999", email: "Pegasus@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
    { id: "#6141", name: "Martin", phone: "9999999999", email: "Martin@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6535", name: "Cecil", phone: "9999999999", email: "Cecil@gmail.com", barcode: "||||||||||||", qualification: "10th pass" },
    { id: "#6541", name: "Lukera", phone: "9999999999", email: "Luke@gmail.com", barcode: "||||||||||||", qualification: "12th pass" },
  ]
  const columns = [
    "Employee ID","Employee Name","Phone Number","Email-ID","Barcode","Qualification","Edit","Delete"
  ]

  return (
    <main className="flex-1 overflow-y-auto p-6">

      {/* User Master Form */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className='md:flex justify-between items-center bg-[#F7F9FC] px-6 py-6 mb-6 rounded-t-lg'>
            <h3 className="text-lg font-semibold">User Master:</h3>
            <div className="flex  space-x-2  max-md:mt-3">
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
        <div className='md:flex px-6 pb-12 gap-10'>
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
      <TableSearch name="Employee Table" data={employees} header={columns}/>
      
    </main>
  );
}
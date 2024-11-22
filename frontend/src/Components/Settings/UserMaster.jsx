import React, { useState, useEffect } from 'react';
import TableSearch from '../Additional/TableSearch';
import toast from 'react-hot-toast';

export default function UserMaster() {
const [employees, setEmployees] = useState([]);
const [formData, setFormData] = useState({
employee_id: '',
employee_name: '',
email: '',
password: '',
phone_number: '',
qualification: '',
experience: '',
role: '',
postal_address: '',
date_of_joining: '',
documents: ''
});
const [editingEmployeeId, setEditingEmployeeId] = useState(null); // State to track editing employee ID
const [refreshTable, setRefreshTable] = useState(false); // State to trigger refresh

const columns = [
"Employee ID",
"Employee Name",
"Phone Number",
"Email-ID",
"Barcode",
"Qualification",
"Edit",
"Delete"
];

const transformedEmployees = employees.map(employee => ({
employee_id: employee.employee_id,
employee_name: employee.employee_name,
phone_number: employee.phone_number,
email: employee.email,
barcode: (
<img
src={employee.barcode}
alt={`Barcode for ${employee.employee_id}`}
style={{ width: '100px', height: 'auto' }}
/>
),
qualification: employee.qualification,
}));

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleFileChange = (e) => {
setFormData((prevData) => ({ ...prevData, documents: e.target.files[0] }));
};

const fetchEmployees = async () => {
try {
const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/getall`, {
method: 'GET',
credentials: 'include',
});

const data = await response.json();
if (data.success) {
const transformedData = data.data.map(({ password, ...rest }) => rest); // Exclude password
setEmployees(transformedData);
} else {
toast.error(data.message);
}
} catch (error) {
console.error('Error fetching users:', error);
toast.error('Failed to fetch users. Please try again.');
}
};



const handleEditClick = async (employee) => {
try {
const response = await fetch((import.meta.env.VITE_REACT_APP_SERVER_URL) + `/user/fetchuser/${employee.employee_id}`, {
method: 'GET',
credentials: 'include',
headers: {
'Content-Type': 'application/json',
},
});

if (response.status === 200) {
const data = await response.json();
if (data.success) {
const userData = data.user;

setFormData({
employee_id: userData.employee_id,
employee_name: userData.employee_name,
email: userData.email,
phone_number: userData.phone_number,
qualification: userData.qualification,
experience: userData.experience,
role: userData.role,
postal_address: userData.postal_address,
date_of_joining: userData.date_of_joining,
documents: '',
});
setEditingEmployeeId(userData.employee_id);

} else {
throw new Error('Failed to fetch the shift');
}
} else {
throw new Error('Failed to fetch the shift');
}
} catch (error) {
console.error('Error during fetching shift:', error);
toast.error('Fetching shift failed. Please try again.');
}
};

const handleFormSubmit = async (e) => {
e.preventDefault();

try {
const method = editingEmployeeId ? 'PUT' : 'POST';
const apiUrl = editingEmployeeId
? `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/updateuser/${editingEmployeeId}`
: `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/adduser`;

const response = await fetch(apiUrl, {
method,
credentials: 'include',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
});

const data = await response.json();
if (data.success) {
toast.success(data.message);
fetchEmployees(); // Refresh the employee list
resetForm(); // Reset form after save
} else {
toast.error(data.message);
}
} catch (error) {
console.error('Error saving user:', error);
toast.error('Failed to save user. Please try again.');
}
};

const handleDeleteClick = async (employee) => {
if (window.confirm('Are you sure you want to delete this user?')) {
try {
const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/deleteuser/${employee.employee_id}`, {
method: 'DELETE',
credentials: 'include',
});

const data = await response.json();
if (data.success) {
toast.success('User deleted successfully');
fetchEmployees();
} else {
toast.error(data.message);
}
} catch (error) {
console.error('Error deleting user:', error);
toast.error('Failed to delete user. Please try again.');
}
}
};

const resetForm = () => {
setFormData({
employee_id: '',
employee_name: '',
email: '',
password: '',
phone_number: '',
qualification: '',
experience: '',
role: '',
postal_address: '',
date_of_joining: '',
documents: null,
});
setEditingEmployeeId(null);
};

useEffect(() => {
fetchEmployees(); // Fetch employees on component mount
}, [refreshTable]);

return (
<main className="flex-1 overflow-y-auto p-6">
<div className="bg-white shadow rounded-lg mb-6">
<div className='md:flex justify-between items-center bg-card-header px-6 py-6 mb-6 rounded-t-lg'>
<h3 className="text-lg font-semibold">User Master:</h3>
<div className="flex space-x-2 max-md:mt-3">
<button className="px-8 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" onClick={resetForm}>Reset</button>
<button className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleFormSubmit}>Save</button>
</div>
</div>
<form className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12" onSubmit={handleFormSubmit}>
<div>
<label htmlFor="employee-id" className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
<input type="text" id="employee-id" name="employee_id" value={formData.employee_id} onChange={handleInputChange} className="w-full p-2 border rounded" required />
</div>
<div>
<label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
<input type="text" id="employee-name" name="employee_name" value={formData.employee_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
</div>
<div>
<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
<input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" required />
</div>
<div>
<label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
<input type="text" id="phone-number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} className="w-full p-2 border rounded" required />
</div>
<div>
<label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
<input type="text" id="address" name="postal_address" value={formData.postal_address} onChange={handleInputChange} className="w-full p-2 border rounded" />
</div>
<div>
<label htmlFor="date-of-joining" className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
<input type="datetime-local" id="date-of-joining" name="date_of_joining" value={formData.date_of_joining} onChange={handleInputChange} className="w-full p-2 border rounded" />
</div>
<div>
<label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
<input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full p-2 border rounded" />
</div>
<div>
<label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
<input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} className="w-full p-2 border rounded" />
</div>
<div>
<label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
<input type="file" id="documents" name="documents" onChange={handleFileChange} className="w-full p-2 border rounded" />
</div>
<div>
<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
<input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border rounded" required />
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
<input type="radio" name="role" value="worker" onChange={handleInputChange} className="form-radio" />
<span className="ml-2">Worker</span>
</label>
<label className="inline-flex items-center">
<input type="radio" name="role" value="supervisor" onChange={handleInputChange} className="form-radio" />
<span className="ml-2">Supervisor</span>
</label>
<label className="inline-flex items-center">
<input type="radio" name="role" value="manager" onChange={handleInputChange} className="form-radio" />
<span className="ml-2">Manager</span>
</label>
</div>
</div>
</div>

{/* User Table */}
<TableSearch
data={transformedEmployees}
header={columns}
name="Shift Management"
onEditClick={handleEditClick}
onDeleteClick={handleDeleteClick}

/>
</main>
);
}
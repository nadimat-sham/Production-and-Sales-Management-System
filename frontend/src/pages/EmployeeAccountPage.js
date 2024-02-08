// EmployeeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeAccount from '../components/EmployeeAccountComponent';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('/employees', { params: { search: searchQuery } })
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
        // Handle error
      });
  };

  const handleSearch = () => {
    fetchEmployees();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Account List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or position"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value) } }
          className="border border-gray-500 px-4 py-2 mr-2 rounded-lg"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <div className=" border-gray-500 p-4 rounded-lg my-10 shadow-xl">
                <li key={employee._id} className="mb-4">
                <h3 className="text-lg font-bold">{employee.name}</h3>
                <p className="text-gray-600 mb-2">Position: {employee.position}</p>
                <EmployeeAccount employeeId={employee._id} />
                </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
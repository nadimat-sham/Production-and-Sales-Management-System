import React, { useState } from 'react';
import axios from 'axios';

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    axios.get(`/employees?search=${searchTerm}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Employee Search</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-400 p-2 rounded-l w-full"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r"
        >
          Search
        </button>
      </div>
      
      {searchResults.map(employee => (
        <div key={employee._id} className="bg-gray-100 rounded p-4 mb-4">
          <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
          <p className="mb-2">Position: {employee.position}</p>
          <p className="mb-2">Email: {employee.email}</p>
          <p className="mb-2">Phone: {employee.phone}</p>
          <p className="mb-2">Salary: ${employee.salary}</p>
          <p className="mb-2">Hire Date: {employee.hireDate}</p>
        </div>
      ))}
      
    </div>
  );
};

export default EmployeeSearch;
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Employee = ({employee, employees, setEmployees}) => {

  const navigate = useNavigate()

  const handleDelete = (employeeId) => {

    // Send delete request to the server
    axios.delete(`/employees/${employeeId}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== employeeId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = (employeeId)=>{
    navigate(`/employees/${employeeId}/update`)
  }

  return (
  
        <div key={employee._id} className="bg-gray-100 rounded p-4 mb-4">
          <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
          <p className="mb-2">Position: {employee.position}</p>
          <p className="mb-2">Email: {employee.email}</p>
          <p className="mb-2">Phone: {employee.phone}</p>
          <p className="mb-2">Salary: {employee.salary}</p>
          <p className="mb-2">Address: {employee.address}</p>
          <p className="mb-2">Hire Date: {
          
          new Date(employee.hireDate).toLocaleString('en-US',{
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
          }
          )
          
          }</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => handleDelete(employee._id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2"
            onClick={() => handleUpdate(employee._id)}
          >
            Update
          </button>
        </div>  
 
  );
};

export default Employee;
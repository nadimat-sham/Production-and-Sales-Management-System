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
  
        <div key={employee._id} className=" rounded-xl shadow-lg p-4 mb-4">
          <h3 className="text-xl font-bold my-4">{employee.name}</h3>
          <h3 className="text-lg font-bold my-4">{employee.username}</h3>
          <p className="my-4"><span className='font-bold mr-4'>Position:</span> {employee.position}</p>
          <p className="my-4"><span className='font-bold mr-4'>Email:</span> {employee.email}</p>
          <p className="my-4"><span className='font-bold mr-4'>Phone:</span> {employee.phone}</p>
          <p className="my-4"><span className='font-bold mr-4'>Salary:</span> {employee.salary}</p>
          <p className="my-4"><span className='font-bold mr-4'>Address:</span> {employee.address}</p>
          <p className="my-4"><span className='font-bold mr-4'>Hire Date:</span> {
          
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
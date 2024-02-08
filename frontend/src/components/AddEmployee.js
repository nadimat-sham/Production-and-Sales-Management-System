import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({employees, setEmployees, setAddAnEmployee}) => {
  const [name, setName] = useState('');
  
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAdress] = useState('');
  const [hireDate, setHireDate] = useState('');

  const handleAddEmployee = () => {
    const newEmployee = {
      name,
      position,
      email,
      phone,
      address,
      salary,
      hireDate,
    };

    axios.post('/employees', newEmployee)
      .then(response => {
        console.log(response.data);
        setName('');
        setPosition('');
        setEmail('');
        setPhone('');
        setSalary('');
        setHireDate('');
      })
      .catch(error => {
        console.log(error);
      });

      setEmployees([...employees,newEmployee])
      setAddAnEmployee(false)
  };

  const handleCancelEmployee = () => {
    setAddAnEmployee(false)
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form className="bg-gray-100 rounded p-4">
        <label className="mb-2 block"><span className='text-red-600'>* </span>Name:</label>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block"><span className='text-red-600'>* </span>Position:</label>
        <input
          type="text"
          onChange={e => setPosition(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Email:</label>
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block"><span className='text-red-600'>* </span>Phone:</label>
        <input
          type="tel"
          onChange={e => setPhone(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
          required
        />

        <label className="mb-2 block"><span className='text-red-600'>* </span>Salary:</label>
        <input
          type="number"
          onChange={e => setSalary(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Address:</label>
        <input
          type="text"
          onChange={e => setAdress(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Hire Date:</label>
        <input
          type="datetime-local"
          onChange={e => setHireDate(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <button
          type="button"
          onClick={handleAddEmployee}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          
          Add
        </button>

        <button
          type="button"
          onClick={handleCancelEmployee}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
import React, { useState } from "react";

const AddEmployee = ({ employees, setEmployees, setAddAnEmployee }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [hireDate, setHireDate] = useState("");

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
    setEmployees([...employees, newEmployee]);
    setAddAnEmployee(false);
  };

  const handleCancelEmployee = () => {
    setAddAnEmployee(false);
  };

  return (
    <div className="ml-72">
      <div className="mt-20 ml-56 flex-col items-center justify-center h-screen ">
        <div className="p-12 bg-white rounded shadow-xl w-2/3">
          <h1 className="text-3xl font-bold mb-4">Add Employee</h1>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-white">*</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-white">*</span>
            <input
              type="datetime-local"
              placeholder="Hire Date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleAddEmployee}
              className="w-20 px-3 py-2 text-white bg-green-600 rounded-md"
            >
              Add
            </button>
            <button
              onClick={handleCancelEmployee}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;

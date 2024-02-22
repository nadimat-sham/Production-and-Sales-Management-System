import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [hireDate, setHireDate] = useState("");

  useEffect(() => {
    axios
      .get(`/employees/${id}`)
      .then((response) => {
        const { name, position, email, phone, salary, address, hireDate } =
          response.data;
        setName(name);
        setPosition(position);
        setAddress(address);
        setEmail(email);
        setPhone(phone);
        setSalary(salary);
        setHireDate(hireDate);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, [id]);

  const handleUpdateEmployee = () => {
    const updatedEmployee = {
      name,
      position,
      email,
      phone,
      address,
      salary,
      hireDate,
    };

    axios
      .put(`/employees/${id}`, updatedEmployee)
      .then((response) => {
        //console.log(response.data);
        navigate("/employees");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleCancelEmployee = () => {
    navigate("/employees");
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
      <form className="bg-gray-100 rounded p-4">
        <label className="mb-2 block">
          <span className="text-red-600">* </span>Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">
          <span className="text-red-600">* </span>Position:
        </label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">
          <span className="text-red-600">* </span>Phone:
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">
          <span className="text-red-600">* </span>Salary:
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <label className="mb-2 block">Hire Date:</label>
        <input
          type="datetime-local"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          className="border border-gray-400 p-2 rounded mb-2 w-full"
        />

        <div className="flex">
          <div>
            <button
              type="button"
              onClick={handleUpdateEmployee}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancelEmployee}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;

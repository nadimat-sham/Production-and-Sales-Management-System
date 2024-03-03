import React, { useState } from "react";
import axios from "axios";

function SearchAttendanceRecords() {
  // Updated state to use employeeUsername
  const [searchParams, setSearchParams] = useState({
    date: "",
    employeeUsername: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`employeesAttendance/search`, {
        params: searchParams,
      });
      setResults(response.data);
    } catch (error) {
      alert("Failed to search attendance records");
    }
  };

  // Updated form to use employeeUsername
  return (
    <div className="max-w-md mx-auto my-0">
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 bg-white px-0 pt-6 pb-8 mb-2 items-center"
      >
        <div className="mb-4 flex gap-2 items-center">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex gap-0 items-center">
          <label
            htmlFor="employeeUsername"
            className="block text-gray-700 text-sm font-bold"
          >
            Employee Username
          </label>
          <input
            type="text"
            name="employeeUsername"
            value={searchParams.employeeUsername}
            onChange={handleChange}
            placeholder="Employee Username"
            className="w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-start">
          <button
            type="submit"
            className="mb-3 bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Display */}
      <div>
        <h2 className="text-xl mb-4">Search Results</h2>
        {results.map((record) => (
          <div key={record._id} className="mb-4 p-4 border-b last:border-b-0">
            <p>Employee Username: {record.employeeUsername}</p>
            <p>Date: {new Date(record.date).toLocaleDateString()}</p>
            <p>Status: {record.status}</p>
            {record.checkIn && (
              <p>Check-In: {new Date(record.checkIn).toLocaleTimeString()}</p>
            )}
            {record.checkOut && (
              <p>Check-Out: {new Date(record.checkOut).toLocaleTimeString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchAttendanceRecords;

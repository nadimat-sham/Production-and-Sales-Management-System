import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeePerformanceComponent = () => {
  const [performances, setPerformances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPerformance = async () => {
    const response = await fetch("/employeesPerformance");
    const data = await response.json();
    setPerformances(data);
  };

  useEffect(() => {
    // Fetch the performance data

    fetchPerformance();
  }, []);

  const handleResetPerformance = async (id) => {
    try {
      await axios.delete("/employeesPerformance/" + id);
      setPerformances(
        performances.filter((performance) => performance._id !== id)
      );
      fetchPerformance(); // Refresh the list after deletion
    } catch (error) {
      alert("Failed to delete record");
    }
  };

  // Filter performances based on search query
  const filteredPerformances = performances.filter((performance) => {
    return (
      performance.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      performance.performance.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="flex justify-end p-2">
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Search by Username or Performance"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Username</th>
              <th className="px-4 py-2 border border-gray-300">
                Total Working Days
              </th>
              <th className="px-4 py-2 border border-gray-300">Present</th>
              <th className="px-4 py-2 border border-gray-300">Absent</th>
              <th className="px-4 py-2 border border-gray-300">Late</th>
              <th className="px-4 py-2 border border-gray-300">On Leave</th>
              <th className="px-4 py-2 border border-gray-300">Performance</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPerformances.map((performance) => (
              <tr key={performance._id}>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.username}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.totalWorkingDays}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.present}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.absent}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.late}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.onLeave}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  {performance.performance}
                </td>
                <td className="px-4 py-2 whitespace-nowrap border border-gray-300">
                  <button
                    onClick={() => handleResetPerformance(performance._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePerformanceComponent;

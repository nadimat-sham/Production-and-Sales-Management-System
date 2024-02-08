import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewAttendanceRecords() {
  const [records, setRecords] = useState([]);
  const fetchRecords = async () => {
    try {
      const response = await axios.get('employeesAttendance');
      // Check if the response data is an array before setting it
      if (Array.isArray(response.data)) {
        setRecords(response.data);
      } else {
        // If not an array, set records to an empty array
        setRecords([]);
        console.warn('Expected an array for attendance records, but received:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch attendance records', error);
      // Ensure records is set to an empty array in case of error
      setRecords([]);
      alert('Failed to fetch attendance records');
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('/employeesAttendance/'+id);
      fetchRecords(); // Refresh the list after deletion
    } catch (error) {
      alert('Failed to delete record');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      {records.length > 0 ? (
        records.map((record) => (
          <div key={record._id} className="mb-4 p-4 border-b last:border-b-0">
            <p>Employee Username: {record.employeeUsername}</p>
            <p>Date: {new Date(record.date).toLocaleDateString()}</p>
            <p>Status: {record.status}</p>
            {record.checkIn && <p>Check-In: {new Date(record.checkIn).toLocaleTimeString()}</p>}
            {record.checkOut && <p>Check-Out: {new Date(record.checkOut).toLocaleTimeString()}</p>}
            {record.reason && <p>Reason: {record.reason}</p>}
            {record.location && <p>Location: {record.location}</p>}
            <button
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
            Delete
            </button>
          </div>
        ))
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}

export default ViewAttendanceRecords;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitAttendanceForm from '../components/SubmitAttendanceForm';
import ViewAttendanceRecords from '../components/ViewAttendanceRecords';
import SearchAttendanceRecords from '../components/SearchAttendanceRecords';

function EmployeeAttendancePage() {
  const navigate= useNavigate();

  const handleNavigate = () => {
    navigate('/employeesAttendance/add'); // Navigate to SubmitAttendanceForm
  };
  return (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold mb-10">Attendance Management</h1>
      <button
        onClick={handleNavigate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Submit Attendance
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-center text-2xl font-bold mb-5">View Records</h2>
          <ViewAttendanceRecords />
        </div>
        <div>
          <h2 className="text-center text-2xl font-bold mb-5">Search Records</h2>
          <SearchAttendanceRecords />
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendancePage;

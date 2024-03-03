import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubmitAttendanceForm() {
  const [formData, setFormData] = useState({
    employeeUsername: "",
    date: "",
    status: "",
    checkInTime: "",
    checkOutTime: "",
    reason: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null; // Check if both date and time are provided
    let [hours, minutes] = time.split(":");
    let combined = new Date(date);
    combined.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return combined;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      checkIn: combineDateAndTime(formData.date, formData.checkInTime),
      checkOut: combineDateAndTime(formData.date, formData.checkOutTime),
    };
    // Remove temporary time fields
    delete dataToSend.checkInTime;
    delete dataToSend.checkOutTime;

    try {
      await axios.post("/employeesAttendance/add", dataToSend);
      alert("Attendance record added successfully!");

      navigate(-1);
    } catch (error) {
      alert("Failed to submit attendance record.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="employee"
          >
            Employee Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="employeeUsername"
            type="text"
            name="employeeUsername"
            value={formData.employeeUsername}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {["Present", "Late"].includes(formData.status) && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="checkIn"
              >
                Check-In Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="checkInTime"
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="checkOut"
              >
                Check-Out Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="checkOutTime"
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {["Absent", "On Leave"].includes(formData.status) && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              placeholder="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitAttendanceForm;

import React from "react";
import { useNavigate } from "react-router-dom";

const Employee = ({ employee }) => {
  const navigate = useNavigate();

  const handleDelete = async (employeeId) => {
    const response = await fetch(`/employees/${employeeId}`, {
      method: "DELETE",
    });
    const json = await response.json();
    window.location.reload();
  };

  const handleUpdate = (employeeId) => {
    navigate(`/employees/${employeeId}/update`);
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="mt-2 text-black font-medium text-lg">Name:</td>
              <td className="text-black font-medium text-lg">
                {employee.name}
              </td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">ID:</td>
              <td className="text-gray-500">{employee._id}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Position:</td>
              <td className="text-gray-500">{employee.position}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Email:</td>
              <td className="text-gray-500">{employee.email}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Phone:</td>
              <td className="text-gray-500">{employee.phone}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Salary:</td>
              <td className="text-gray-500">{employee.salary}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Address:</td>
              <td className="text-gray-500">{employee.address}</td>
            </tr>
            <tr>
              <td className="mt-2 text-gray-500">Hire Date:</td>
              <td className="text-gray-500">
                {new Date(employee.hireDate).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={() => handleUpdate(employee._id)}
            className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(employee._id)}
            className="mt-3 ml-3 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;

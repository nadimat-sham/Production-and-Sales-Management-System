import React, { useEffect, useState } from "react";

import AddEmployee from "../components/AddEmployee";
import Employee from "../components/Employee";
import EmployeeSearch from "../components/EmployeeSearch";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [addAnEmployee, setAddAnEmployee] = useState(false);

  //console.log(searchTerm, selectedOption);

  useEffect(() => {
    const fetchEmployees = async () => {
      //console.log("Fetching employees");
      const response = await fetch("/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        //console.log(data);
      } else {
        //console.log("Error:", response.status);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setAddAnEmployee(true);
  };

  const filterEmployees = (employee) => {
    let matchesSearchTerm = true;
    if (searchTerm !== "") {
      matchesSearchTerm =
        selectedOption === "Name"
          ? employee.name.includes(searchTerm)
          : employee.mobile.includes(searchTerm);
    }

    let matchesStatusFilter = true;
    if (statusFilter !== "all") {
      matchesStatusFilter = employee.position.toLowerCase() === statusFilter;
    }

    return matchesSearchTerm && matchesStatusFilter;
  };

  const filteredEmployees = employees.filter(filterEmployees);

  return (
    <div className="container mx-auto">
      <div className="fixed w-[1200px]">
        <div className=" py-4 bg-white pr-[100px] flex justify-between gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
          <div>
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded ${
                statusFilter === "all" ? "bg-blue-200" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("cashiers")}
              className={`px-4 py-2 rounded ${
                statusFilter === "cashiers" ? "bg-blue-200" : ""
              }`}
            >
              Cashiers
            </button>
            <button
              onClick={() => setStatusFilter("salesman")}
              className={`px-4 py-2 rounded ${
                statusFilter === "salesman" ? "bg-blue-200" : ""
              }`}
            >
              Salesman
            </button>
            <button
              onClick={() => setStatusFilter("guard")}
              className={`px-4 py-2 rounded ${
                statusFilter === "guard" ? "bg-blue-200" : ""
              }`}
            >
              Guards
            </button>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            >
              <option value="Name">Name</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddEmployee}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Employee
          </button>
        </div>
      </div>
      <div className="pt-16">
        {addAnEmployee ? (
          <AddEmployee
            employees={employees}
            setEmployees={setEmployees}
            setAddAnEmployee={setAddAnEmployee}
          />
        ) : (
          filteredEmployees.map((employee) => (
            <Employee
              employee={employee}
              employees={employees}
              setEmployees={setEmployees}
              key={employee._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeePage;

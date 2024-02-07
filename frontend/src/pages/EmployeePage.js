import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AddEmployee from '../components/AddEmployee'
import Employee from '../components/Employee';
import EmployeeSearch from '../components/EmployeeSearch';


const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const [addAnEmployee, setAddAnEmployee] = useState(false)

  console.log(searchTerm, selectedOption)
  
  useEffect(() => {
    axios.get('/employees')
      .then(response => {
        setEmployees(response.data);
        console.log(employees)
      })
      .catch(error => {
        console.log(error);
      });
  }, [employees]);

  const handleAddEmployee = () =>{
    setAddAnEmployee(true)
  }
  return (
    
    <div className="container mx-auto">
      {
        addAnEmployee ?

         (<AddEmployee employees={employees} setEmployees={setEmployees} setAddAnEmployee={setAddAnEmployee}/>)
          
          :


          (
            <div>
              <div>
                <EmployeeSearch setSearchTerm={setSearchTerm} setSelectedOption={setSelectedOption}/>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddEmployee}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Add Employee
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Employee List</h2>
                {
                  employees.map(employee => (
                     searchTerm===''? <Employee employee = {employee} employees={employees} setEmployees={setEmployees}/>
                     :
                     ((selectedOption==="Name" && employee.name.includes(searchTerm)) || 
                      (selectedOption==="Email" && employee.email.includes(searchTerm)) ||
                      (selectedOption==="Phone" && employee.phone.includes(searchTerm)) ||
                      (selectedOption==="Position" && employee.position.includes(searchTerm)) ||
                      (selectedOption==="Address" && employee.address.includes(searchTerm))
                     )
                      && <Employee employee = {employee} employees={employees} setEmployees={setEmployees}/>
                  ))  
                }
              </div>
            </div>
          )
      }
      
    </div>
  );
};

export default EmployeePage;
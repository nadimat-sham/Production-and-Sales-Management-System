import { useEffect } from "react";

const EmployeeSearch = ({setSearchTerm, setSelectedOption}) => {

  const options = ['Name', 'Position', 'Email', 'Phone', 'Address', 'UserName'];

  
  useEffect(()=>{
    
    setSelectedOption('Name')

  },[])

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Employee Search</h2>
      <div className="flex mb-4 mr-100">
        <input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-400 p-2 rounded-l"
        />
        
        
        <div>
            <select
              onChange={handleChange}
              className="appearance-none bg-white border border-gray-400 px-4 py-2 rounded shadow"
            >
              
              
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
        </div>


      </div>
      
      
    </div>
  );
};

export default EmployeeSearch;
import React, { useState, useEffect } from "react";
import Customer from "../components/Customer";
import AddCustomer from "../components/AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("/showroom/customers");
      const json = await response.json();
      if (response.ok) {
        setCustomers(json);
        //console.log(json);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    setAddingCustomer(true);
  };

  const handleCancel = () => {
    setAddingCustomer(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mt-0">
      {addingCustomer ? (
        <AddCustomer onCancel={handleCancel} setCustomers={setCustomers} />
      ) : (
        <>
          <div className="fixed w-[1200px]">
            <div className=" py-4 bg-white pr-[100px] flex justify-end gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              />
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Customer
              </button>
            </div>
          </div>
          <div className="customers pt-16">
            {customers &&
              customers
                .filter((customer) =>
                  customer.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                )
                .map((customer) => (
                  <Customer customer={customer} key={customer._id} />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;

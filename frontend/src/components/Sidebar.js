import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEmployeeManagementOpen, setIsEmployeeManagementOpen] =
    useState(false);
  const [isFactoryManagementOpen, setIsFactoryManagementOpen] = useState(false);
  return (
    <div className="flex">
      <div className="h-screen w-64 bg-gray-800 p-4 fixed">
        <Link
          to="/"
          className="text-3xl mb-4 block text-blue-500 hover:text-blue-400 ml-4 px-14"
        >
          Home
        </Link>

        <div className="text-white text-lg ">
          <div
            className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
              if (isHistoryOpen) setIsHistoryOpen(!isHistoryOpen);
              if (isEmployeeManagementOpen)
                setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
              if (isFactoryManagementOpen)
                setIsFactoryManagementOpen(!isFactoryManagementOpen);
            }}
          >
            Sell Management
          </div>
          {isOpen && (
            <>
              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/products" className="block w-full h-full">
                  Products
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/customers" className="block w-full h-full">
                  Customers
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/sell" className="block w-full h-full">
                  Sell
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/order" className="block w-full h-full">
                  Order
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/receive" className="block w-full h-full">
                  Receive
                </Link>
              </div>
              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/sell-history" className="block w-full h-full">
                  Sell History
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/order-history" className="block w-full h-full">
                  Order History
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/receive-history" className="block w-full h-full">
                  Receive History
                </Link>
              </div>
            </>
          )}

          {/* <div
            className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setIsHistoryOpen(!isHistoryOpen);
              if (isOpen) setIsOpen(!isOpen);
              if (isEmployeeManagementOpen)
                setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
              if (isFactoryManagementOpen)
                setIsFactoryManagementOpen(!isFactoryManagementOpen);
            }}
          >
            History
          </div> */}

          {isHistoryOpen && <></>}
          {/*
          <div
            className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
              if (isHistoryOpen) setIsHistoryOpen(!isHistoryOpen);
              if (isOpen) setIsOpen(!isOpen);
              if (isFactoryManagementOpen)
                setIsFactoryManagementOpen(!isFactoryManagementOpen);
            }}
          >
            Employee Management
          </div>

          {isEmployeeManagementOpen && (
            <>
              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/employees" className="block w-full h-full">
                  Employees
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/accounts" className="block w-full h-full">
                  Accounts
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/employeesAttendance" className="block w-full h-full">
                  Attendance
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link
                  to="/employeesPerformance"
                  className="block w-full h-full"
                >
                  Performance
                </Link>
              </div>
            </>
          )}
          */}

          <div
            className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setIsFactoryManagementOpen(!isFactoryManagementOpen);
              if (isHistoryOpen) setIsHistoryOpen(!isHistoryOpen);
              if (isEmployeeManagementOpen)
                setIsEmployeeManagementOpen(!isEmployeeManagementOpen);
              if (isOpen) setIsOpen(!isOpen);
            }}
          >
            Factory Management
          </div>

          {isFactoryManagementOpen && (
            <>
              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/rawmaterials" className="block w-full h-full">
                  Raw Materials
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/products" className="block w-full h-full">
                  Products
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/purchaseRawmaterial" className="block w-full h-full">
                  Purchase Raw Materials
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/useRawmaterial" className="block w-full h-full">
                  Use Raw Materials
                </Link>
              </div>

              {/* <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/" className="block w-full h-full">
                  Produce
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/" className="block w-full h-full">
                  Send product to showroom
                </Link>
              </div> */}

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/order-history" className="block w-full h-full">
                  Order List
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/purchaseRawmaterialHistory" className="block w-full h-full">
                  Purchase Raw Materials History
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/factory/useRawmaterialHistory" className="block w-full h-full">
                  Use Raw Materials History
                </Link>
              </div>

              {/* <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/" className="block w-full h-full">
                  Produce History
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700">
                <Link to="/" className="block w-full h-full">
                  Send product to showroom History
                </Link>
              </div> */}
            </>
          )}
        </div>
      </div>
      {/* <div className="flex-grow p-4">{renderComponent()}</div> */}
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
              Employee Attendance
            </Link>
          </div>

          {/* <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/sell-history">Sell History</Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/order-history">Order History</Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/receive-history">Receive History</Link>
          </div> */}
          <div className="w-full py-2 px-4 hover:bg-gray-700 relative group">
            <span className="cursor-pointer">History</span>
            <div className="absolute left-0 w-full mt-2 hidden group-hover:block">
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
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex-grow p-4">{renderComponent()}</div> */}
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
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
            <Link to="/products" >
              Products
            </Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/customers">
              Customers
            </Link>
          </div>

          <div  className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/sell">
              Sell
            </Link>
          </div>


          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/order" >
              Order
            </Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link to="/employees" >
              Employees
            </Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link
              to="/sell-history"
            >
              Sell History
            </Link>
          </div>

          <div className="w-full py-2 px-4 hover:bg-gray-700">
            <Link
              to="/order-history"
            >
              Order History
            </Link>
          </div>

        </div>
      </div>
      {/* <div className="flex-grow p-4">{renderComponent()}</div> */}
    </div>
  );
};

export default Sidebar;

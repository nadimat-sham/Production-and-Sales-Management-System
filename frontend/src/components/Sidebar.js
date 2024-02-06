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
          <div>
            <Link to="/products" className="w-full py-2 px-4 hover:bg-gray-700">
              Products
            </Link>
          </div>
          <div>
            <Link
              to="/customers"
              className="w-full py-2 px-4 hover:bg-gray-700"
            >
              Customers
            </Link>
          </div>
          <div>
            <Link to="/sell" className="w-full py-2 px-4 hover:bg-gray-700">
              Sell
            </Link>
          </div>
          <div>
            <Link to="/order" className="w-full py-2 px-4 hover:bg-gray-700">
              Order
            </Link>
          </div>
          <div>
            <Link
              to="/sell-history"
              className="w-full py-2 px-4 hover:bg-gray-700"
            >
              Sell History
            </Link>
          </div>
          <div>
            <Link
              to="/order-history"
              className="w-full py-2 px-4 hover:bg-gray-700"
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

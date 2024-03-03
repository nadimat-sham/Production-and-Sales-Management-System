import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEmployeeManagementOpen, setIsEmployeeManagementOpen] =
    useState(false);
  const [isFactoryManagementOpen, setIsFactoryManagementOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const showroom_manager = "showroom_manager";
  const factory_manager = "factory_manager";
  const desert_seller = "desert_seller";
  const sweet_seller = "sweet_seller";
  const cake_seller = "cake_seller";

  return (
    <div className="flex">
      <div className="h-screen w-64 bg-gray-800 p-4 fixed text-center">
        <Link
          to="/"
          className="text-3xl mb-4 block text-blue-500 hover:text-blue-400 ml-4 px-14"
        >
          Home
        </Link>

        <div className="text-white text-lg ">
          {(user.username === showroom_manager ||
            user.username === desert_seller ||
            user.username === sweet_seller ||
            user.username === cake_seller) && (
            <div
              className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 hover:scale-105 cursor-pointer"
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
          )}

          {isOpen && (
            <>
              <div
                onClick={() => setSelectedLink("products")}
                className={
                  selectedLink === "products"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/products" className="block w-full h-full">
                  Products
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("customers")}
                className={
                  selectedLink === "customers"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/customers" className="block w-full h-full">
                  Customers
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("sell")}
                className={
                  selectedLink === "sell"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/sell" className="block w-full h-full">
                  Sell
                </Link>
              </div>

              {user.username === showroom_manager && (
                <div
                  onClick={() => setSelectedLink("order")}
                  className={
                    selectedLink === "order"
                      ? "w-full py-2 px-4 bg-gray-700 scale-105"
                      : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                  }
                >
                  <Link to="/order" className="block w-full h-full">
                    Order
                  </Link>
                </div>
              )}

              {user.username === showroom_manager && (
                <div
                  onClick={() => setSelectedLink("receive")}
                  className={
                    selectedLink === "receive"
                      ? "w-full py-2 px-4 bg-gray-700 scale-105"
                      : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                  }
                >
                  <Link to="/receive" className="block w-full h-full">
                    Receive
                  </Link>
                </div>
              )}

              <div
                onClick={() => setSelectedLink("sell-history")}
                className={
                  selectedLink === "sell-history"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/sell-history" className="block w-full h-full">
                  Sell History
                </Link>
              </div>

              {(user.username === showroom_manager ||
                user.username === factory_manager) && (
                <div>
                  <div
                    onClick={() => setSelectedLink("order-history")}
                    className={
                      selectedLink === "order-history"
                        ? "w-full py-2 px-4 bg-gray-700 scale-105"
                        : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                    }
                  >
                    <Link to="/order-history" className="block w-full h-full">
                      Order History
                    </Link>
                  </div>

                  <div
                    onClick={() => setSelectedLink("receive-history")}
                    className={
                      selectedLink === "receive-history"
                        ? "w-full py-2 px-4 bg-gray-700 scale-105"
                        : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                    }
                  >
                    <Link to="/receive-history" className="block w-full h-full">
                      Receive History
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {/* <div
            className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 hover:scale-105 cursor-pointer"
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

          {user.username === "employee_manager" && (
            <div
              className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 hover:scale-105 cursor-pointer"
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
          )}

          {isEmployeeManagementOpen && (
            <>
              <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/employees" className="block w-full h-full">
                  Employees
                </Link>
              </div>

              {/* <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/accounts" className="block w-full h-full">
                  Accounts
                </Link>
              </div> */}

              <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/employeesAttendance" className="block w-full h-full">
                  Attendance
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link
                  to="/employeesPerformance"
                  className="block w-full h-full"
                >
                  Performance
                </Link>
              </div>
            </>
          )}

          {user.username === factory_manager && (
            <div
              className="text-red-500 w-full py-2 px-4 hover:bg-gray-700 hover:scale-105 cursor-pointer"
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
          )}

          {isFactoryManagementOpen && (
            <>
              <div
                onClick={() => setSelectedLink("factory/rawmaterials")}
                className={
                  selectedLink === "factory/rawmaterials"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link
                  to="/factory/rawmaterials"
                  className="block w-full h-full"
                >
                  Raw Materials
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("factory/products")}
                className={
                  selectedLink === "factory/products"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/factory/products" className="block w-full h-full">
                  Products
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("factory/purchaseRawmaterial")}
                className={
                  selectedLink === "factory/purchaseRawmaterial"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link
                  to="/factory/purchaseRawmaterial"
                  className="block w-full h-full"
                >
                  Purchase Raw Materials
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("factory/useRawmaterial")}
                className={
                  selectedLink === "factory/useRawmaterial"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link
                  to="/factory/useRawmaterial"
                  className="block w-full h-full"
                >
                  Use Raw Materials
                </Link>
              </div>

              {/* <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/" className="block w-full h-full">
                  Produce
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/" className="block w-full h-full">
                  Send product to showroom
                </Link>
              </div> */}

              <div
                onClick={() => setSelectedLink("order-history")}
                className={
                  selectedLink === "order-history"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link to="/order-history" className="block w-full h-full">
                  Order List
                </Link>
              </div>

              <div
                onClick={() =>
                  setSelectedLink("factory/purchaseRawmaterialHistory")
                }
                className={
                  selectedLink === "factory/purchaseRawmaterialHistory"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link
                  to="/factory/purchaseRawmaterialHistory"
                  className="block w-full h-full"
                >
                  Purchase Raw Materials History
                </Link>
              </div>

              <div
                onClick={() => setSelectedLink("factory/useRawmaterialHistory")}
                className={
                  selectedLink === "factory/useRawmaterialHistory"
                    ? "w-full py-2 px-4 bg-gray-700 scale-105"
                    : "w-full py-2 px-4 hover:bg-gray-700 hover:scale-105"
                }
              >
                <Link
                  to="/factory/useRawmaterialHistory"
                  className="block w-full h-full"
                >
                  Use Raw Materials History
                </Link>
              </div>

              {/* <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/" className="block w-full h-full">
                  Produce History
                </Link>
              </div>

              <div className="w-full py-2 px-4 hover:bg-gray-700 hover:scale-105">
                <Link to="/" className="block w-full h-full">
                  Send product to showroom History
                </Link>
              </div> */}
            </>
          )}
          <div className="text-center w-full py-2 px-4 bg-red-300 hover:bg-red-400 text-red-500 hover:text-red-600 hover:scale-105">
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </div>
      <div className="fixed top-[689px] p-4 text-blue-200 hover:scale-110 hover:text-white">
        Welcome, {user.username}
      </div>
      {/* <div className="flex-grow p-4">{renderComponent()}</div> */}
    </div>
  );
};

export default Sidebar;

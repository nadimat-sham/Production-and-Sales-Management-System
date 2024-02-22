import React from "react";
import { Navigate } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Sidebar from "./components/Sidebar";
import Products from "./pages/ProductsPage";
import FactoryProducts from "./pages/FactoryProductsPage";
import FactoryRawmaterials from "./pages/FactoryRawmaterialsPage";
import Home from "./pages/HomePage";
import Sell from "./pages/SellPage";
import SellHistory from "./pages/SellHistoryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/CustomersPage";
import CustomersSellHistory from "./components/CustomersSellHistory";
import Order from "./pages/OrderPage";
import OrderHistory from "./pages/OrderHistoryPage";
import ReceivePage from "./pages/ReceivePage";
import ReceiveHistoryPage from "./pages/ReceiveHistoryPage";

import PurchaseRawmaterialPage from "./pages/purchaseRawmaterialPage";
import PurchaseRawmaterialHistoryPage from "./pages/purchaseRawmaterialHistoryPage";
import UseRawmaterialPage from "./pages/UseRawmaterialPage";
import UseRawmaterialHistoryPage from "./pages/UseRawmaterialHistoryPage";

//Employees
import EmployeePage from "./pages/EmployeePage";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployeeForm from "./components/UpdateEmployee";
import EmployeeAccount from "./pages/EmployeeAccountPage";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import SubmitAttendanceForm from "./components/SubmitAttendanceForm";
import ViewAttendanceRecords from "./components/ViewAttendanceRecords";
import SearchAttendanceRecords from "./components/SearchAttendanceRecords";

import EmployeePerformancePage from "./pages/EmployeePerformancePage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./hooks/useAuthContext";
import SignupPage from "./pages/SignupPage";

function App() {
  const showroom_manager = "showroom_manager";
  const factory_manager = "factory_manager";

  const { user } = useAuthContext();
  //console.log("user");
  //console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex">
          <div className={user ? "w-1/5" : "w-0"}>
            {user ? <Sidebar /> : null}
          </div>
          <div className={user ? "w-4/5" : "w-full"}>
            <div className="pages">
              <Routes>
                <Route
                  path="/"
                  element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <SignupPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/products"
                  element={
                    user && user.username === showroom_manager ? (
                      <Products />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/factory/rawmaterials"
                  element={
                    user ? <FactoryRawmaterials /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/factory/products"
                  element={
                    user ? <FactoryProducts /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    user && user.username === showroom_manager ? (
                      <AddProduct />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/sell"
                  element={
                    user && user.username === showroom_manager ? (
                      <Sell />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/sell-history"
                  element={
                    user && user.username === showroom_manager ? (
                      <SellHistory />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/customers"
                  element={
                    user && user.username === showroom_manager ? (
                      <Customers />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/customers/:id"
                  element={
                    user && user.username === showroom_manager ? (
                      <CustomersSellHistory />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/order"
                  element={
                    user && user.username === showroom_manager ? (
                      <Order />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/order-history"
                  element={user ? <OrderHistory /> : <Navigate to="/login" />}
                />
                <Route
                  path="/employees"
                  element={user ? <EmployeePage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/employees/:id/update"
                  element={
                    user ? <UpdateEmployeeForm /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/employees/add"
                  element={user ? <AddEmployee /> : <Navigate to="/login" />}
                />
                <Route
                  path="/accounts"
                  element={
                    user ? <EmployeeAccount /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/employeesAttendance"
                  element={
                    user ? <EmployeeAttendancePage /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/employeesAttendance/add"
                  element={
                    user ? <SubmitAttendanceForm /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/employeesAttendance/search"
                  element={
                    user ? <ViewAttendanceRecords /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/receive"
                  element={
                    user && user.username === showroom_manager ? (
                      <ReceivePage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/receive-history"
                  element={
                    user && user.username === showroom_manager ? (
                      <ReceiveHistoryPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/factory/purchaseRawmaterial"
                  element={
                    user ? (
                      <PurchaseRawmaterialPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/factory/purchaseRawmaterialHistory"
                  element={
                    user ? (
                      <PurchaseRawmaterialHistoryPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/factory/useRawmaterial"
                  element={
                    user ? <UseRawmaterialPage /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/factory/useRawmaterialHistory"
                  element={
                    user ? (
                      <UseRawmaterialHistoryPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/employeesPerformance"
                  element={
                    user ? (
                      <EmployeePerformancePage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

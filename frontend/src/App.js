import AddProduct from "./components/AddProduct";
import Sidebar from "./components/Sidebar";
import Products from "./pages/ProductsPage";
import Home from "./pages/HomePage";
import Sell from "./pages/SellPage";
import SellHistory from "./pages/SellHistoryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/CustomersPage";
import CustomersSellHistory from "./components/CustomersSellHistory";
import Order from "./pages/OrderPage";
import OrderHistory from "./pages/OrderHistoryPage";

//Employees
import EmployeePage from "./pages/EmployeePage";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployeeForm from "./components/UpdateEmployee";
import EmployeeAccount from "./pages/EmployeeAccountPage";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import SubmitAttendanceForm from "./components/SubmitAttendanceForm";
import ViewAttendanceRecords from "./components/ViewAttendanceRecords";
import SearchAttendanceRecords from "./components/SearchAttendanceRecords";
import ReceivePage from "./pages/ReceivePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5">
            <div className="pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/sell-history" element={<SellHistory />} />
                <Route path="/customers" element={<Customers />} />
                <Route
                  path="/customers/:id"
                  element={<CustomersSellHistory />}
                />
                <Route path="/order" element={<Order />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/employees" element={<EmployeePage />} />
                <Route
                  path="/employees/:id/update"
                  element={<UpdateEmployeeForm />}
                />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/accounts" element={<EmployeeAccount />} />
                <Route
                  path="/employeesAttendance"
                  element={<EmployeeAttendancePage />}
                />
                <Route
                  path="/employeesAttendance/add"
                  element={<SubmitAttendanceForm />}
                />
                <Route
                  path="/employeesAttendance/search"
                  element={<ViewAttendanceRecords />}
                />
                <Route path="/products/receive" element={<ReceivePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

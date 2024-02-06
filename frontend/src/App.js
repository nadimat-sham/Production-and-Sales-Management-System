import AddProduct from "./components/AddProduct";
import Sidebar from "./components/Sidebar";
import Products from "./pages/ProductsPage";
import Home from "./pages/HomePage";
import Sell from "./pages/SellPage";
import SellHistory from "./pages/SellHistoryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/CustomersPage";
import CustomersSellHistory from "./components/CustomersSellHistory";
import Order from "./pages/OrderPage"
import OrderHistory from "./pages/OrderHistoryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="w-3/4">
            <div className="pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/sell-history" element={<SellHistory />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomersSellHistory />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

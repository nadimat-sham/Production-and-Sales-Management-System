import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderHistory from "../components/OrderHistory";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("product");
  const [searchDate, setSearchDate] = useState(""); // New state variable for search date
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("showroom/orders/history/order");
        setOrderHistory(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredOrderHistory = orderHistory.filter((record) => {
    let matchesSearchTerm = true;
    switch (searchType) {
      case "product":
        matchesSearchTerm = record.orderedProducts
          ? record.orderedProducts.some((orderedProduct) =>
              orderedProduct.product && orderedProduct.product.name
                ? orderedProduct.product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                : false
            )
          : false;
        break;
      default:
      // Add more cases as needed
    }

    let matchesSearchDate = true;
    if (searchDate) {
      const recordDate = new Date(record.createdAt);
      const searchDateObj = new Date(searchDate);
      matchesSearchDate =
        recordDate.getFullYear() === searchDateObj.getFullYear() &&
        recordDate.getMonth() === searchDateObj.getMonth() &&
        recordDate.getDate() === searchDateObj.getDate();
    }

    let matchesStatusFilter = true;
    if (statusFilter !== "all") {
      matchesStatusFilter = record.status === statusFilter;
    }

    return matchesSearchTerm && matchesSearchDate && matchesStatusFilter;
  });

  return (
    <div>
      <div className="fixed w-[1200px]">
        <div className=" py-4 bg-white pr-[100px] flex justify-end gap-0 mr-0 items-center ml-[0px] bg-opacity-100">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded ${
              statusFilter === "all" ? "bg-gray-800 text-white" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded ${
              statusFilter === "pending" ? "bg-gray-800 text-white" : ""
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("accepted")}
            className={`px-4 py-2 rounded ${
              statusFilter === "accepted" ? "bg-gray-800 text-white" : ""
            }`}
          >
            Accepted
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-4 py-2 rounded ${
              statusFilter === "rejected" ? "bg-gray-800 text-white" : ""
            }`}
          >
            Rejected
          </button>

          <button
            onClick={() => setStatusFilter("received")}
            className={`px-4 py-2 rounded ${
              statusFilter === "received" ? "bg-gray-800 text-white" : ""
            }`}
          >
            Received
          </button>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="product">Product</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            className="ml-0 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="pt-16">
        {filteredOrderHistory
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((record, index) => (
            <OrderHistory key={index} orderRecord={record} />
          ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;

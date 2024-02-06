import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderHistory from "../components/OrderHistory";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("product"); // New state variable for search type

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("showroom/orders/history/order");
        setOrderHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrderHistory = orderHistory.filter((record) => {
    switch (searchType) {
      case "date":
        if (record.createdAt) {
          const date = new Date(record.createdAt); 
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          return formattedDate.startsWith(searchTerm);
        }
        return false;
      case "product":
        return record.orderedProducts
          ? record.orderedProducts.some((orderedProduct) =>
          orderedProduct.product.name
                ? orderedProduct.product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                : false
            )
          : false;
      default:
        return true;
    }
  });

  return (
    <div>
      <div className="fixed w-[1200px]">
      <div className=" py-4 bg-white pr-[100px] flex justify-end gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
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
          <option value="date">Date</option>
          <option value="product">Product</option>
        </select>
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

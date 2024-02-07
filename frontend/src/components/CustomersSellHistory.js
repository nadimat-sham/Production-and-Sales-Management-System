import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SellHistory from "../components/SellHistory";

const CustomerSellHistory = () => {
  const { id } = useParams();
  const location = useLocation();
  const customer = location.state.customer;
  const sellRecords = customer.purchases;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("product"); // New state variable for search type
  const [searchDate, setSearchDate] = useState(""); // New state variable for search date

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredSellRecords = sellRecords.filter((record) => {
    // Filter by search term and type
    let matchesSearchTerm = true;
    switch (searchType) {
      case "product":
        matchesSearchTerm = record.soldProducts
          ? record.soldProducts.some((soldProduct) =>
              soldProduct.product && soldProduct.product.name
                ? soldProduct.product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                : false
            )
          : false;
        break;
      // Add more cases as needed
    }

    // Filter by date
    let matchesSearchDate = true;
    if (searchDate) {
      const recordDate = new Date(record.createdAt);
      const searchDateObj = new Date(searchDate);
      matchesSearchDate =
        recordDate.getFullYear() === searchDateObj.getFullYear() &&
        recordDate.getMonth() === searchDateObj.getMonth() &&
        recordDate.getDate() === searchDateObj.getDate();
    }

    return matchesSearchTerm && matchesSearchDate;
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
            <option value="product">Product</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="pt-16">
        {filteredSellRecords
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((record, index) => (
            <SellHistory key={index} sellRecord={record} />
          ))}
      </div>
    </div>
  );
};

export default CustomerSellHistory;

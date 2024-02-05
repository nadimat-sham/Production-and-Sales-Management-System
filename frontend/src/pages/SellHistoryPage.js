import React, { useState, useEffect } from "react";
import axios from "axios";
import SellHistory from "../components/SellHistory";

const SellHistoryPage = () => {
  const [sellHistory, setSellHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("mobile"); // New state variable for search type

  useEffect(() => {
    const fetchSellHistory = async () => {
      try {
        const response = await axios.get("showroom/sells");
        setSellHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sell history:", error);
      }
    };

    fetchSellHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSellHistory = sellHistory.filter((record) => {
    switch (searchType) {
      case "mobile":
        return record.mobile ? record.mobile.startsWith(searchTerm) : false;
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
        return record.soldProducts
          ? record.soldProducts.some((soldProduct) =>
              soldProduct.product.name
                ? soldProduct.product.name
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
          <option value="mobile">Mobile</option>
          <option value="date">Date</option>
          <option value="product">Product</option>
        </select>
      </div>
      </div>
      <div className="pt-16">
      {filteredSellHistory
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((record, index) => (
          <SellHistory key={index} sellRecord={record} />
        ))}
      </div>
    </div>
  );
};

export default SellHistoryPage;

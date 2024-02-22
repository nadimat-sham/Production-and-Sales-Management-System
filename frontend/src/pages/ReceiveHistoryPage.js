import React, { useState, useEffect } from "react";
import axios from "axios";
import ReceiveHistory from "../components/ReceiveHistory";

const ReceiveHistoryPage = () => {
  const [receiveHistory, setReceiveHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("product");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchReceiveHistory = async () => {
      try {
        const response = await axios.get("showroom/receives/history/receive");
        setReceiveHistory(response.data);
        //console.log("heloooooooooooooooooo");
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching receive history:", error);
      }
    };

    fetchReceiveHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };

  const filteredReceiveHistory = receiveHistory.filter((record) => {
    let matchesSearchTerm = true;
    switch (searchType) {
      case "product":
        matchesSearchTerm = record.receivedProducts
          ? record.receivedProducts.some((receivedProduct) =>
              receivedProduct.product && receivedProduct.product.name
                ? receivedProduct.product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                : false
            )
          : false;
        break;
      default:
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

    return matchesSearchTerm && matchesSearchDate;
  });

  return (
    <div>
      <div className="fixed w-[1200px]">
        <div className=" py-4 bg-white pr-[100px] flex justify-end gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
          <p className="text-2xl mr-10">Receive Histories</p>
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
            {/* <option value="mobile">Mobile</option> */}
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
        {filteredReceiveHistory
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((record, index) => (
            <ReceiveHistory key={index} receiveRecord={record} />
          ))}
      </div>
    </div>
  );
};

export default ReceiveHistoryPage;

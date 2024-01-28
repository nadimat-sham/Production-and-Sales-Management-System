import React, { useState, useEffect } from "react";
import axios from "axios";
import SellHistory from "../components/SellHistory"; // Import the SellHistoryCard component

const SellHistoryPage = () => {
  const [sellHistory, setSellHistory] = useState([]);

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

  return (
    <div>
      <h1>Sell History</h1>
      {sellHistory.map((record, index) => (
        <SellHistory key={index} sellRecord={record} /> // Use the SellHistoryCard component for each sell record
      ))}
    </div>
  );
};

export default SellHistoryPage;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function BarChartQuantity({ products, startingDate, endingDate }) {
  const [chartData, setChartData] = useState(null);
  const [sellHistory, setSellHistory] = useState([]);

  useEffect(() => {
    const fetchSellHistory = async () => {
      try {
        const response = await axios.get("showroom/sells/history/sell");
        let sellHistoryy = response.data;
        setSellHistory(sellHistoryy);
        let labelss = products.map((product) => product.name);
        //console.log("sellHistoryy", sellHistoryy, "sellHistoryy");

        let datas = labelss.map((label) => {
          let total = 0;
          for (let record of sellHistoryy) {
            let recordDate = new Date(record.createdAt);
            let start = new Date(startingDate);
            let end = new Date(endingDate);
            if (recordDate >= start && recordDate <= end) {
              for (let soldProduct of record.soldProducts) {
                if (soldProduct.product) {
                  if (soldProduct.name === "kheer") {
                    //console.log("kheer");
                  }
                  if (soldProduct.product.name === label) {
                    total += soldProduct.quantity;
                  }
                }
              }
            }
          }
          return total;
        });
        // //console.log("labelss", labelss, "labelss");
        // //console.log("datas", datas, "datas");
        setChartData({
          labels: labelss,
          datasets: [
            {
              label: "Total Sell Quantity",
              data: datas,
              backgroundColor: ["#50AF95"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        });
        // //console.log("chartData", chartData, "chartData");
      } catch (error) {
        console.error("Error fetching sell history:", error);
      }
    };

    fetchSellHistory();
  }, [products, startingDate, endingDate]);

  return <div>{chartData && <Bar data={chartData} />}</div>;
}

export default BarChartQuantity;

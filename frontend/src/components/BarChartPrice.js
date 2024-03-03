import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function BarChartPrice({ products, startingDate, endingDate }) {
  const [chartData, setChartData] = useState(null);
  const [sellHistory, setSellHistory] = useState([]);

  useEffect(() => {
    const fetchSellHistory = async () => {
      try {
        const response = await axios.get("showroom/sells/history/sell");
        let sellHistoryy = response.data;
        setSellHistory(sellHistoryy);
        let labelss = products.map((product) => product.name);

        let datas = labelss.map((label) => {
          let total = 0;
          for (let record of sellHistoryy) {
            let recordDate = new Date(record.createdAt);
            let start = new Date(startingDate);
            let end = new Date(endingDate);
            if (recordDate >= start && recordDate <= end) {
              for (let soldProduct of record.soldProducts) {
                if (soldProduct.product) {
                  if (soldProduct.product.name === label) {
                    total += soldProduct.quantity * soldProduct.product.price;
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
              label: "Total Sell Amount",
              data: datas,
              backgroundColor: [
                "#2a71d0",
                // "rgba(75,192,192,1)",
                // "#ecf0f1",
                // "#50AF95",
                // "#f3ba2f",
              ],
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

export default BarChartPrice;

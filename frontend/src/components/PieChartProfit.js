import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function PieChartProfit({ products, startingDate, endingDate }) {
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
          let totalSell = 0;
          let totalCost = 0;
          for (let record of sellHistoryy) {
            let recordDate = new Date(record.createdAt);
            let start = new Date(startingDate);
            let end = new Date(endingDate);
            // console.log("recordDate", recordDate, "recordDate");
            // console.log("start", start, "start");
            // console.log("end", end, "end");
            if (recordDate >= start && recordDate <= end) {
              // console.log("herereerererer");
              for (let soldProduct of record.soldProducts) {
                if (soldProduct.product) {
                  if (soldProduct.product.name === label) {
                    // console.log("soldProduct", soldProduct, "soldProduct");
                    // totalSell += soldProduct.quantity * soldProduct.price;
                    // totalCost +=
                    //   soldProduct.quantity * soldProduct.productionCost;
                    totalCost +=
                      soldProduct.quantity * soldProduct.product.productionCost;
                    totalSell +=
                      soldProduct.quantity * soldProduct.product.price;
                  }
                }
              }
            }
          }
          // console.log("totalSell", totalSell, "totalSell");
          // console.log("totalCost", totalCost, "totalCost");
          return totalSell - totalCost;
        });
        // console.log("labelss", labelss, "labelss");
        // console.log("datas", datas, "datas");

        const newArray = labelss.map((label, index) => ({
          label: label,
          data: datas[index],
        }));

        // console.log(newArray);
        newArray.sort((a, b) => b.data - a.data);
        labelss = newArray.map((item) => item.label);
        datas = newArray.map((item) => item.data);

        setChartData({
          labels: labelss,
          datasets: [
            {
              label: "Total Profit",
              data: datas,
              backgroundColor: [
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                "rgba(255,0,0,.2)",
                "rgba(255,0,0,.9)",
                "rgba(100,100,0,.8)",
                "#ecf0f1",
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

  return (
    <div>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                text: "Total Profit",
                font: {
                  size: 20,
                },
              },
            },
            cutout: "0%",
            radius: "80%",
          }}
        />
      )}
    </div>
  );
}

export default PieChartProfit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChartQuantity";
import BarChartQuantity from "../components/BarChartQuantity";
import BarChartPrice from "../components/BarChartPrice";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Category,
  BarSeries,
} from "@syncfusion/ej2-react-charts";

const Home = () => {
  const [products, setProducts] = useState([]);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const [startingDate, setStartingDate] = useState(startDate.toISOString());
  const [endingDate, setEndingDate] = useState(endDate.toISOString());
  const [chartData, setChartData] = useState(null);
  const [sellHistory, setSellHistory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/showroom/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        //console.log(json, "here");
      }
      const response2 = await axios.get("showroom/sells/history/sell");
      let sellHistoryy = response2.data;
      setSellHistory(sellHistoryy);
    };

    fetchProducts();
  }, []);

  let labelss = products.map((product) => product.name);
  let stocks = products.map((product) => product.inStock);

  let soldInLastMonth = labelss.map((label) => {
    let total = 0;
    for (let record of sellHistory) {
      let recordDate = new Date(record.createdAt);
      let start = new Date(startDate.toISOString());
      let end = new Date(endDate.toISOString());
      if (recordDate >= start && recordDate <= end) {
        for (let soldProduct of record.soldProducts) {
          if (soldProduct.product) {
            if (soldProduct.product.name === label) {
              total += soldProduct.quantity;
            }
          }
        }
      }
    }
    return total;
  });
  let expectedEndDays = labelss.map((label, index) => {
    let soldPerDay = (soldInLastMonth[index] * 1.0) / 30.0;
    let expectedEndDay = Math.ceil(stocks[index] / soldPerDay);
    return { name: label, expectedEndDay };
  });

  expectedEndDays.sort((a, b) => a.expectedEndDay - b.expectedEndDay);
  //console.log("labelss", labelss, "labelss");
  //console.log("stocks", stocks, "stocks");
  //console.log("soldInLastMonth", soldInLastMonth, "soldInLastMonth");
  //console.log("expectedEndDays", expectedEndDays, "expectedEndDays");

  let maxExpectedEndDay =
    expectedEndDays.length > 0
      ? expectedEndDays[expectedEndDays.length - 1].expectedEndDay
      : 0;
  let ratio = maxExpectedEndDay > 0 ? 500.0 / maxExpectedEndDay : 0.0;

  const handleStartingDateChange = (event) => {
    setStartingDate(event.target.value);
  };

  const handleEndingDateChange = (event) => {
    setEndingDate(event.target.value);
  };

  return (
    <div className="ml-32">
      <h1 className="text-3xl mt-3">Production and Sales Management System</h1>
      {expectedEndDays.length > 0 && (
        <div className="mt-20">
          <div className="stock-ends w-[900px]  bg-white rounded-xl shadow-md overflow-hidden p-12">
            <h1 className="text-xl font-bold text-gray-800 text-center">
              Expected Stock Ending Time
            </h1>{" "}
            <table className="table-auto w-full mt-9">
              <tbody>
                {expectedEndDays.map((item, index) => {
                  let color;
                  if (item.expectedEndDay <= 2) {
                    color = "bg-red-800";
                  } else if (item.expectedEndDay <= 4) {
                    color = "bg-red-700";
                  } else if (item.expectedEndDay <= 7) {
                    color = "bg-red-600";
                  } else if (item.expectedEndDay <= 10) {
                    color = "bg-red-500";
                  } else if (item.expectedEndDay <= 20) {
                    color = "bg-green-900";
                  } else if (item.expectedEndDay <= 30) {
                    color = "bg-green-700";
                  } else {
                    color = "bg-green-500";
                  }

                  return (
                    <tr key={index}>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 flex gap-4">
                        <div
                          className={`h-5 ${color}`}
                          style={{
                            width: `${item.expectedEndDay * ratio}px`,
                          }}
                        />
                        <div>{item.expectedEndDay} days</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bar-charts mt-20">
            <label htmlFor="start-date" className="mr-1">
              Start:
            </label>
            <input
              id="start-date"
              type="date"
              value={startingDate}
              onChange={handleStartingDateChange}
              className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <label htmlFor="end-date" className="mr-1 ml-14">
              End:
            </label>
            <input
              id="end-date"
              type="date"
              value={endingDate}
              onChange={handleEndingDateChange}
              className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <div className="mt-8">
              <div className="w-[600px]">
                <BarChartQuantity
                  products={products}
                  startingDate={startingDate}
                  endingDate={endingDate}
                />
              </div>
              <div className="w-[600px] mt-10">
                <BarChartPrice
                  products={products}
                  startingDate={startingDate}
                  endingDate={endingDate}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

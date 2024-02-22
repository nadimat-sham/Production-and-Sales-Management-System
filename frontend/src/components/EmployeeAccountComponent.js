// EmployeeAccount.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeAccount = ({ employeeId }) => {
  const [account, setAccount] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = () => {
    axios
      .get(`/accounts/${employeeId}`)
      .then((response) => {
        setAccount(response.data);
      })
      .catch((error) => {
        //console.log(error);
        // Handle error
      });
  };

  const handleAddSalary = () => {
    axios
      .post(`/accounts/${employeeId}/add`)
      .then((response) => {
        //console.log(response.data);
        // Handle success
        fetchAccount();
      })
      .catch((error) => {
        //console.log(error);
        // Handle error
      });
  };

  const handleWithdrawSalary = () => {
    axios
      .post(`/accounts/${employeeId}/withdraw`, { amount: withdrawalAmount })
      .then((response) => {
        //console.log(response.data);
        // Handle success
        fetchAccount();
        setWithdrawalAmount("");
      })
      .catch((error) => {
        //console.log(error);
        // Handle error
      });
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" border-gray-500 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Account</h2>
      <p className="mb-2 text-gray-500">ID: {account.employee}</p>
      <p className="mb-4 text-green-600 font-bold text-xl">
        Total Money: {account.totalMoney}
      </p>

      <div className="flex justify-between">
        <button
          onClick={handleAddSalary}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-8"
        >
          Add Salary
        </button>

        <div className="my-8 mr-60">
          <input
            type="number"
            placeholder="Enter withdrawal amount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            className="border border-gray-500 px-4 py-2 mr-2 rounded-lg"
          />
          <button
            onClick={handleWithdrawSalary}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Withdraw
          </button>
        </div>
      </div>
      <h3 className="text-lg font-bold mt-8">History</h3>
      <div className="border-x border-t border-gray-500 rounded-lg m-4 p-4">
        <div className="mt-2 flex justify-between">
          <div className="flex flex-col justify-center ">
            <div className="font-bold text-center">Status</div>
            {account.history.map((entry) => (
              <div
                className={`${
                  entry.type === "Credited" ? "text-green-700" : "text-red-700"
                } my-2 text-center`}
              >
                {entry.type}
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-bold text-center">Amount</div>
            {account.history.map((entry) => (
              <div
                className={`${
                  entry.type === "Credited" ? "text-green-700" : "text-red-700"
                } my-2 text-center`}
              >
                {entry.type === "Credited" ? "+" : "-"}
                {entry.amount}
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-bold text-center ">Date</div>
            {account.history.map((entry) => (
              <div className=" my-2 text-center">
                {new Date(entry.date).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAccount;

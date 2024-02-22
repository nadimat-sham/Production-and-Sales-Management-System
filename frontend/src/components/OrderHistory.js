import React, { useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

const OrderHistory = ({ orderRecord }) => {
  let id = 1;
  let totalSum = 0;
  const { user } = useAuthContext();
  const [changed, setChanged] = useState(false);

  const handleStatusChange = async (orderId, newStatus) => {
    const response = await fetch(`/factory/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (response.ok) {
      orderRecord.status = newStatus;
    }
    // window.location.reload();
    setChanged(!changed);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-200 text-blue-700 px-2 py-1 rounded";
      case "accepted":
        return "bg-green-200 text-green-700 px-2 py-1 rounded";
      case "rejected":
        return "bg-red-200 text-red-700 px-2 py-1 rounded";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <div className="flex justify-between items-center">
          <div className="tracking-wide text-indigo-500 font-semibold">
            ID: {orderRecord._id}
          </div>
          <div className={getStatusStyle(orderRecord.status)}>
            {orderRecord.status}
          </div>
          {user.username === "factory_manager" &&
            orderRecord.status === "pending" && (
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() =>
                    handleStatusChange(orderRecord._id, "accepted")
                  }
                  className="bg-green-200 text-green-700 px-2 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(orderRecord._id, "rejected")
                  }
                  className="bg-red-200 text-red-700 px-2 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
        </div>
        <div className="flex gap-5">
          <p className="mt-2 text-gray-500">
            Date: {new Date(orderRecord.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p className="mt-2 text-gray-500">
            Time:{" "}
            {new Date(orderRecord.createdAt).toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        {/* <div className="mt-6 uppercase tracking-wide text-sm  font-semibold">
          Items:
        </div> */}
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity Sold</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderRecord.orderedProducts.map((orderedProduct, index) => {
              if (!orderedProduct.product) return null;
              const totalAmount =
                orderedProduct.quantity * orderedProduct.product.price;
              totalSum += totalAmount;
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{id++}</td>
                  <td className="border px-4 py-2">
                    {orderedProduct.product.name}
                  </td>
                  <td className="border px-4 py-2">
                    {orderedProduct.quantity}
                  </td>
                  <td className="border px-4 py-2">
                    {orderedProduct.product.price}
                  </td>
                  <td className="border px-4 py-2">{totalAmount}</td>
                </tr>
              );
            })}
            <tr>
              <td
                colSpan="4"
                className="border px-4 py-2 text-right font-semibold"
              >
                Total:
              </td>
              <td className="border px-4 py-2">{totalSum}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;

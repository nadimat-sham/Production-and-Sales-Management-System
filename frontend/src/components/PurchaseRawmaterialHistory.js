import React from "react";

const ReceiveHistory = ({ receiveRecord }) => {
  let id = 1;
  let totalQuantity = 0;
  //console.log("inside receive history");
  //console.log(receiveRecord);

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <div className="tracking-wide text-indigo-500 font-semibold">
          ID: {receiveRecord._id}
        </div>
        <div className="flex gap-5">
          <p className="mt-2 text-gray-500">
            Date:{" "}
            {new Date(receiveRecord.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p className="mt-2 text-gray-500">
            Time:{" "}
            {new Date(receiveRecord.createdAt).toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity Purchased</th>
            </tr>
          </thead>
          <tbody>
            {receiveRecord.receivedProducts.map((receivedProduct, index) => {
              if (!receivedProduct.product) return null;
              totalQuantity += receivedProduct.quantity;
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{id++}</td>
                  <td className="border px-4 py-2">
                    {receivedProduct.product.name}
                  </td>
                  <td className="border px-4 py-2">
                    {receivedProduct.quantity}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td
                colSpan="2"
                className="border px-4 py-2 text-right font-semibold"
              >
                Total Quantity:
              </td>
              <td className="border px-4 py-2">{totalQuantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiveHistory;

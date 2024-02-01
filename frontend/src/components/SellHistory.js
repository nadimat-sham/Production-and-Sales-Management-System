import React from "react";

const SellHistory = ({ sellRecord }) => {
  let id = 1;
  let totalSum = 0;

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <div className="tracking-wide text-indigo-500 font-semibold">
          ID: {sellRecord._id}
        </div>
        <p className="mt-2 text-gray-500">
          Date: {new Date(sellRecord.createdAt).toLocaleDateString("en-GB")}
        </p>
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
            {sellRecord.soldProducts.map((soldProduct, index) => {
              const totalAmount =
                soldProduct.quantity * soldProduct.product.price;
              totalSum += totalAmount;
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{id++}</td>
                  <td className="border px-4 py-2">
                    {soldProduct.product.name}
                  </td>
                  <td className="border px-4 py-2">{soldProduct.quantity}</td>
                  <td className="border px-4 py-2">
                    {soldProduct.product.price}
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

export default SellHistory;

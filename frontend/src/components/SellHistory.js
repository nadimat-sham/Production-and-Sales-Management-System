import React from "react";

const SellHistory = ({ sellRecord }) => {
  return (
    <div className="max-w-md ml-[350px] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Sell Record
        </div>
        {sellRecord.soldProducts.map((soldProduct, index) => (
          <div key={index}>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              Name: {soldProduct.product.name}
            </p>
            <p className="mt-2 text-gray-500">
              Quantity Sold: {soldProduct.quantity}
            </p>
            <p className="mt-2 text-gray-500">
              Unit Price: {soldProduct.product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellHistory;

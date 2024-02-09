import React, { useState } from "react";

const Product = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const [newPrice, setNewPrice] = useState(product.price);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const response = await fetch("/factory/rawmaterials/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();
    window.location.reload();
  };

  const handleSave = async () => {
    // return;
    const response = await fetch(`/factory/rawmaterials/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        price: newPrice,
      }),
    });

    if (response.ok) {
      // If the response is ok, update the product name and price
      product.name = newName;
      product.price = newPrice;
    } else {
      // Handle error
      console.error("Failed to update product");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      {isEditing ? (
        <div className="p-8 space-y-4">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="New product name"
          />
          <input
            type="number"
            min="0"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="New product price"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              disabled={newPrice <= 0}
              className={`px-4 py-2 rounded-md text-white ${
                newPrice > 0 ? "bg-blue-500" : "bg-blue-200"
              } focus:outline-none`}
            >
              OK
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8">
          {/* Your existing product card code */}
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Category: {product.catagory}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            Name: {product.name}
          </p>
          <p className="mt-2 text-gray-500">ID: {product._id}</p>
          <p className="mt-2 text-gray-500">Price: {product.price}</p>
          <p className="mt-2 text-gray-500">Sold: {product.sold}</p>
          <p className="mt-2 text-gray-500">In Stock: {product.inStock}</p>
          <button
            onClick={handleEdit}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
          
          <button
            onClick={handleDelete}
            className="mt-3 ml-72 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;

import React, { useState } from "react";
import axios from "axios";

const Product = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newImage, setNewImage] = useState(null);

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
    if (newImage) {
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("id", product._id);
      await axios
        .post("/factory/rawmaterials/upload", formData)
        .then((res) => {
          // console.log(res);
          product.image = res.data.image;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
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
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              disabled={newPrice <= 0}
              className={`px-4 py-2 rounded-md text-white ${
                newPrice > 0 ? "bg-gray-800" : "bg-gray-500"
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
          <div className="grid grid-cols-7">
            <div className="col-span-2">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.name}
              </div>
              <p className="mt-2 text-gray-500">Catagory: {product.catagory}</p>
              {/* <p className="mt-2 text-gray-500">ID: {product._id}</p> */}
              <p className="mt-2 text-gray-500">Price: {product.price}</p>
              {/* <p className="mt-2 text-gray-500">Sold: {product.sold}</p> */}
              <p className="mt-2 text-gray-500">In Stock: {product.inStock}</p>
            </div>
            <div className="picture col-span-5">
              <img
                src={"/uploads/" + product.image}
                alt={product.name}
                className="w-full h-44 object-cover rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="w-[70px] mt-3 bg-gray-800  hover:scale-105 cursor-pointer text-gray-200 rounded-md"
              >
                Edit
              </button>
            </div>

            <button
              onClick={() => handleDelete(product)}
              className="mt-3 w-[80px] py-1 bg-red-500 hover:scale-105 cursor-pointer text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

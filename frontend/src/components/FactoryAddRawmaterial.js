import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = ({ onCancel, setProducts }) => {
  const [name, setName] = useState("");
  const [catagory, setCatagory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");

  const handleAdd = async () => {
    const product = { name, catagory, price, inStock };
    const response = await fetch("/factory/rawmaterials/add", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setProducts((prev) => [json, ...prev]);
    onCancel();
  };

  const isAddDisabled = !name || !catagory || !price || !inStock;

  return (
    <div className="ml-72">
      <div className="mt-20 ml-56 flex-col items-center justify-center h-screen ">
        <div className="p-12 bg-white rounded shadow-xl w-2/3">
          <h1 className="text-3xl font-bold mb-4">Add Raw Material</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
          />
          <select
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none bg-white"
          >
            <option value="">Select catagory</option>
            <option value="Main">Main</option>
            <option value="Secondary">Secondary</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
          />
          <input
            type="number"
            placeholder="In Stock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
          />
          <div className="flex justify-around">
            <button
              onClick={handleAdd}
              disabled={isAddDisabled}
              className={`px-3 py-2 text-white ${
                isAddDisabled ? "bg-green-300" : "bg-green-600"
              } rounded-md`}
            >
              Add
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

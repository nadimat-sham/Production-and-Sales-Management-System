import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = ({ onCancel, setProducts }) => {
  const [name, setName] = useState("");
  const [catagory, setCatagory] = useState("");
  const [productionCost, setProductionCost] = useState(""); // New state variable for production cost
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [file, setFile] = useState(null);

  const handleAdd = async () => {
    const product = { name, catagory, productionCost, price, inStock };

    const response = await fetch("/showroom/products/add", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // setProducts((prev) => [json, ...prev]);

    if (response.ok) {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", json._id);
        await axios
          .post("/showroom/products/upload", formData)
          .then((res) => {
            // console.log(res);
            setProducts((prev) => {
              return [res.data, ...prev];
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    onCancel();
  };

  const isAddDisabled = !name || !catagory || !price || !inStock || !file;

  return (
    <div className="ml-0">
      <div className="mt-20 ml-56 flex-col items-center justify-center h-screen ">
        <div className="p-12 bg-white rounded shadow-xl w-2/3">
          <h1 className="text-3xl font-bold mb-4">Add Product</h1>
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
            <option value="sweets">Sweets</option>
            <option value="deserts">Deserts</option>
            <option value="cake">Cake</option>
          </select>
          <input
            type="number"
            placeholder="Production Cost"
            value={productionCost}
            onChange={(e) => setProductionCost(e.target.value)}
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
          />
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
          <label className="mr-3">Picture:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <div className="flex justify-around mt-6">
            <button
              onClick={handleAdd}
              disabled={isAddDisabled}
              className={`px-3 py-2 text-white ${
                isAddDisabled ? "bg-gray-500" : "bg-gray-800"
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

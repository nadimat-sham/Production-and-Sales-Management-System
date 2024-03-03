import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Product = ({ product, handleDelete }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newSold, setNewSold] = useState(product.sold);
  const [newInStock, setNewInStock] = useState(product.inStock);
  const [newProductionCost, setNewProductionCost] = useState(
    product.productionCost
  );
  const [newImage, setNewImage] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleViewSellHistory = () => {
    //console.log(`View sell history for product with ID: ${product.id}`);
    navigate("/sell-history", { state: { product } });
  };

  const handleSave = async () => {
    // return;
    const response = await fetch(`/showroom/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        price: newPrice,
        sold: newSold,
        inStock: newInStock,
        productionCost: newProductionCost,
      }),
    });

    if (response.ok) {
      // If the response is ok, update the product name and price
      product.name = newName;
      product.price = newPrice;
      product.sold = newSold;
      product.inStock = newInStock;
      product.productionCost = newProductionCost;
    } else {
      // Handle error
      console.error("Failed to update product");
    }
    if (newImage) {
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("id", product._id);
      await axios
        .post("/showroom/products/upload", formData)
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
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                Name:
              </label>
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                ProductionCost:
              </label>
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                Price:
              </label>
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                Sold:
              </label>
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                InStock:
              </label>
              <label
                htmlFor=""
                className="py-2 text-sm rounded-md  border-white"
              >
                Image:
              </label>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New product name"
              />
              <input
                type="number"
                min="0"
                value={newProductionCost}
                onChange={(e) => setNewProductionCost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New productionCost"
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
                type="number"
                min="0"
                value={newSold}
                onChange={(e) => setNewSold(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New sold quantity"
              />
              <input
                type="number"
                min="0"
                value={newInStock}
                onChange={(e) => setNewInStock(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New In Stock"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              disabled={newPrice <= 0 || newSold < 0}
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
        <div className="px-6 py-6">
          {/* Your existing product card code */}
          <div className="grid grid-cols-7">
            <div className="col-span-2">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.name}
              </div>
              <p className="mt-2 text-gray-500">Catagory: {product.catagory}</p>
              {/* <p className="mt-2 text-gray-500">ID: {product._id}</p> */}
              <p className="mt-2 text-gray-500">
                ProductionCost: {product.productionCost}
              </p>
              <p className="mt-2 text-gray-500">Price: {product.price}</p>
              <p className="mt-2 text-gray-500">Sold: {product.sold}</p>
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
              {user.username === "showroom_manager" && (
                <button
                  onClick={handleEdit}
                  className="w-[70px] mt-3 bg-gray-800  hover:scale-105 cursor-pointer text-gray-200 rounded-md"
                >
                  Edit
                </button>
              )}
              {user.username !== "factory_manager" && (
                <button
                  onClick={handleViewSellHistory}
                  className="mt-3 w-[150px] bg-gray-800  hover:scale-105 cursor-pointer text-gray-200 rounded-md"
                >
                  View Sell History
                </button>
              )}
            </div>
            {user.username === "showroom_manager" && (
              <button
                onClick={() => handleDelete(product)}
                className="mt-3 w-[80px] py-1 bg-red-500 hover:scale-105 cursor-pointer text-white rounded-md"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

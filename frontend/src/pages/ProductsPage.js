import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import AddProduct from "../components/AddProduct";
import { useAuthContext } from "../hooks/useAuthContext";

const Products = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // New state variable for selected category

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/showroom/products");
      const json = await response.json();

      if (response.ok) {
        // console.log(json);
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleCancel = () => {
    setAddingProduct(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (product) => {
    // console.log("hereeeeeeeeeeeeeeeeeee", product);
    const response = await fetch("/showroom/products/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();
    // window.location.reload();
    setProducts(products.filter((p) => p._id !== product._id));
  };

  return (
    <div className="mt-0">
      {addingProduct ? (
        <AddProduct onCancel={handleCancel} setProducts={setProducts} />
      ) : (
        <>
          <div className="fixed w-[1200px]">
            <div className=" py-4 bg-white pr-[100px] flex justify-between gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
              <div className="pl-10">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === "all" ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory("sweets")}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === "sweets"
                      ? "bg-gray-800 text-white"
                      : ""
                  }`}
                >
                  Sweets
                </button>
                <button
                  onClick={() => setSelectedCategory("deserts")}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === "deserts"
                      ? "bg-gray-800 text-white"
                      : ""
                  }`}
                >
                  Deserts
                </button>
                <button
                  onClick={() => setSelectedCategory("cake")}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === "cake" ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  Cake
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
                {user.username === "showroom_manager" && (
                  <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 ml-3 bg-gray-800 text-white rounded-md"
                  >
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="products pt-16 flex flex-wrap">
            {products &&
              products
                .filter((product) =>
                  product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                )
                .filter((product) =>
                  selectedCategory === "all"
                    ? true
                    : product.catagory === selectedCategory
                )
                .map((product) => (
                  <div className="w-1/2">
                    <Product
                      product={product}
                      handleDelete={handleDelete}
                      key={product._id}
                    />
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import AddProduct from "../components/AddProduct";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/showroom/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        console.log(json);
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

  return (
    <div className="mt-0">
      {addingProduct ? (
        <AddProduct onCancel={handleCancel} setProducts={setProducts} />
      ) : (
        <>
          <div className="fixed w-[1200px]">
            <div className=" py-4 bg-white pr-[100px] flex justify-end gap-10 mr-0 items-center ml-[0px] bg-opacity-90">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              />
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
          <div className="products pt-16">
            {products &&
              products
                .filter((product) =>
                  product.name
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <Product product={product} key={product._id} />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;

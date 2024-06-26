import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/FactoryRawmaterial";
import AddProduct from "../components/FactoryAddRawmaterial";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/factory/rawmaterials");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        //console.log(json);
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
            <div className=" py-4 bg-white pr-[100px] flex justify-end gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              />
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-gray-800 text-white rounded-md"
              >
                Add Raw Material
              </button>
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
                .map((product) => (
                  <div className="w-1/2">
                    <Product product={product} key={product._id} />
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;

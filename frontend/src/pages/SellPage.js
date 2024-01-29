import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInSell from "../components/ProductInSell";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product, quantity) => {
    setCart([...cart, { product, quantity }]);
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((p) => p.product._id !== product._id));
  };

  const handleSell = async () => {
    try {
      const response = await fetch("/showroom/sells/sell", {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.error("Error selling products:", error);
    }
  };

  const total = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="Product grid grid-cols-3 gap-4 mt-0 ">
      <div className="col-span-2">
        <div className=" fixed w-3/6 bg-white bg-opacity-90">
          <div className="py-4 flex justify-end items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className=" border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="products pt-16">
          {products &&
            products
              .filter((product) =>
                product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
              )
              .map((product) => (
                <ProductInSell
                  product={product}
                  key={product._id}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              ))}
        </div>
      </div>
      <div className="col-span-1 mt-24">
        <div className=" fixed">
          <h2 className="text-2xl font-bold mb-2 text-center">Cart</h2>
          {cart.map((item, index) => (
            <div key={index} className="mb-2 flex gap-4">
              <p className="text-lg font-bold">{item.product.name}</p>
              <p>Unit Price: {item.product.price.toFixed(0)}/=</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <h2 className="text-2xl font-bold mt-2 text-center mt-6">
            Total: {total.toFixed(0)}/=
          </h2>
          <div className="flex justify-center">
            <button
              onClick={handleSell}
              className="mt-3 px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

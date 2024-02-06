import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInOrder from "../components/ProductInOrder";

const Products = () => {
  //const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderCart, setOrderCart] = useState([]);
  //const [referenceName, setReferenceName] = useState(""); // New state variable for reference name

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/showroom/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        console.log(json);
      }
    };
    /*
    const fetchCustomers = async () => {
      const response = await fetch("/showroom/customers");
      const json = await response.json();

      if (response.ok) {
        setCustomers(json);
      }
    };
*/
    //fetchCustomers();
    fetchProducts();
    //console.log(products);
    //console.log(customers);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToOrderCart = (product, quantity) => {
    setOrderCart([...orderCart, { product, quantity }]);
  };

  const handleRemoveFromOrderCart = (product) => {
    setOrderCart(orderCart.filter((p) => p.product._id !== product._id));
  };

  const handleOrder = async () => {
    try {
      const response = await fetch("/showroom/orders/order", {
        method: "POST",
        body: JSON.stringify({ orderCart }), // Include referenceName in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.error("Error ordering products:", error);
    }
  };

  const total = orderCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="Product grid grid-cols-5 gap-4 mt-0 ">
      <div className="col-span-3">
        <div className=" fixed w-[1200px]">
        <div className=" py-4 bg-white pr-[100px] flex justify-end gap-3 mr-0 items-center ml-[0px] bg-opacity-100">
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
                <ProductInOrder
                  product={product}
                  key={product._id}
                  onAddToOrderCart={handleAddToOrderCart}
                  onRemoveFromOrderCart={handleRemoveFromOrderCart}
                />
              ))}
        </div>
      </div>
      <div className="col-span-2 mt-24">
        <div className=" fixed">
          <h2 className="text-2xl font-bold mb-2 text-center">Cart</h2>
          <table className="table-auto w-full mt-2">
            <thead>
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Unit Price</th>
                <th className="px-4 py-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderCart.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.product.name}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">
                    {item.product.price.toFixed(0)}
                  </td>
                  <td className="border px-4 py-2">
                    {(item.product.price * item.quantity).toFixed(0)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="4"
                  className="border px-4 py-2 text-right font-semibold"
                >
                  Total:
                </td>
                <td className="border px-4 py-2">{total.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handleOrder}
              disabled={ orderCart.length === 0} // Disable the button when referenceName is empty or there are no items in the cart
              className={` px-4 py-2 text-white rounded-md ${
                orderCart.length === 0
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

import React, { useState, useEffect, useRef } from "react";

const ReceivePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationMessageQuantity, setValidationMessageQuantity] =
    useState("Quantity ok");
  const [quantity, setQuantity] = useState(1); // New state variable for quantity
  const [selectedProduct, setSelectedProduct] = useState(null); // New state variable for selected product
  const [cart, setCart] = useState([]); // New state variable for cart

  useEffect(() => {
    const isValidProduct = products.some(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (searchTerm === "") {
      setValidationMessage("plz enter a raw material name");
    } else if (isValidProduct) {
      setValidationMessage("ok raw material is in database");
    } else {
      setValidationMessage("raw material is not valid");
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/factory/rawmaterials");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // //console.log("searchTerm:", searchTerm);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleProductSelect = (product) => {
    //console.log("onClick");
    setSearchTerm(product.name);
    //console.log("Selected Raw Material:", product);
    //console.log(searchTerm);
    setIsFocused(false);
    setSelectedProduct(product);
  };
  const qauntityOk = "Quantity ok";
  const handleQuantityInput = (quantity) => {
    if (quantity < 1) {
      setValidationMessageQuantity("Quantity must be at least 1");
    } else {
      setValidationMessageQuantity(qauntityOk);
    }
    setQuantity(quantity);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleAddToCart = () => {
    setCart([...cart, { product: selectedProduct, quantity: quantity }]);
    setSearchTerm("");
    setQuantity(1);
    setValidationMessageQuantity("Quantity ok");
  };
  //   const handleRemoveFromCart = (productToRemove) => {
  //     //console.log("productToRemove:", productToRemove.name);
  //     // setCart(
  //     //   cart.filter((product) => product.product.id !== productToRemove.id)
  //     // );
  //   };
  const handleRemoveFromCart = (indexToRemove) => {
    const newCart = [...cart];
    newCart.splice(indexToRemove, 1);
    setCart(newCart);
  };

  const handleReceive = async () => {
    const cartToSend = cart.map((item) => ({
      product_id: item.product._id,
      quantity: item.quantity,
    }));
    //console.log("cartToSend:", cartToSend);
    // return;
    try {
      const response = await fetch("/factory/purchaseRawmaterial/purchase", {
        method: "POST",
        body: JSON.stringify({ cartReceived: cartToSend }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      //console.log(json);
      window.location.reload();
    } catch (error) {
      console.error("Error purchasing raw materials:", error);
    }
  };

  //console.log(cart);
  return (
    <div className="p-4">
      <h1 className="text-3xl mt-8 mb-4">Purchase page</h1>
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-3">
          <div className="flex items-end">
            <div className="relative" ref={wrapperRef}>
              <p
                className={`mt-2 ${
                  validationMessage !== "ok raw material is in database"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {validationMessage && `* ${validationMessage}`}
              </p>
              <input
                type="text"
                placeholder="Search for a raw material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                //   onBlur={() => setIsFocused(false)}
                className="border p-2 rounded w-full"
              />
              {searchTerm && isFocused && (
                <div className="absolute z-10 bg-white border rounded w-full mt-1">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={index}
                      onClick={() => handleProductSelect(product)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p
                className={`mt-2 ml-4 ${
                  validationMessageQuantity !== qauntityOk
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {validationMessageQuantity && `* ${validationMessageQuantity}`}
              </p>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => handleQuantityInput(e.target.value)}
                className="border p-2 rounded w-full ml-2" // ml-2 for margin-left
              />
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleAddToCart}
              disabled={
                validationMessage !== "ok raw material is in database" ||
                validationMessageQuantity !== qauntityOk
              }
              className={` px-4 py-2 text-white rounded-md ${
                validationMessage !== "ok raw material is in database" ||
                validationMessageQuantity !== qauntityOk
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
            >
              Add
            </button>
          </div>
        </div>
        <div className="col-span-4">
          <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  Item
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  Unit Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  Total Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.product.price * item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-gray-600">
            Total:{" "}
            {cart.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )}
          </div>
          <button
            onClick={handleReceive}
            disabled={cart.length === 0}
            className={
              cart.length === 0
                ? "mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded"
                : "mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;

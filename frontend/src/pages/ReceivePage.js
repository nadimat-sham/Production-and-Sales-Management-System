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

  useEffect(() => {
    const isValidProduct = products.some(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (searchTerm === "") {
      setValidationMessage("plz enter a product name");
    } else if (isValidProduct) {
      setValidationMessage("ok product is in database");
    } else {
      setValidationMessage("Product is not valid");
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/showroom/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // console.log("searchTerm:", searchTerm);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleProductSelect = (product) => {
    console.log("onClick");
    setSearchTerm(product.name);
    console.log("Selected product:", product);
    console.log(searchTerm);
    setIsFocused(false);
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

  return (
    <div className="p-4">
      <h1 className="text-3xl mt-8 mb-4">Receive page</h1>
      <div className="grid grid-cols-7">
        <div className="col-span-3">
          <div className="flex items-end">
            <div className="relative" ref={wrapperRef}>
              <p
                className={`mt-2 ${
                  validationMessage !== "ok product is in database"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {validationMessage && `* ${validationMessage}`}
              </p>
              <input
                type="text"
                placeholder="Search for a product..."
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
                      className="p-2 cursor-pointer hover:bg-gray-600"
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
              disabled={
                validationMessage !== "ok product is in database" ||
                validationMessageQuantity !== qauntityOk
              }
              className={` px-4 py-2 text-white rounded-md ${
                validationMessage !== "ok product is in database" ||
                validationMessageQuantity !== qauntityOk
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;

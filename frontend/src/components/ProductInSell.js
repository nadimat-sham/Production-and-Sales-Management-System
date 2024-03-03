import React, { useState } from "react";

const ProductInSell = ({ product, onAddToCart, onRemoveFromCart }) => {
  const [isInCart, setIsInCart] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    // Here you can add the product to the cart
    // After that, toggle the isInCart state variable
    if (isInCart) {
      await onRemoveFromCart(product);
    } else {
      await onAddToCart(product, quantity);
    }
    setIsInCart(!isInCart);
  };

  return (
    <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 w-[550px]">
      <div className="p-8">
        <div className="grid grid-cols-7">
          <div className="col-span-2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.name}
            </div>
            <p className="mt-2 text-gray-500">Category: {product.catagory}</p>
            {/* <p className="mt-2 text-gray-500">ID: {product._id}</p> */}
            <p className="mt-2 text-gray-500">
              ProductionCost: {product.productionCost}
            </p>

            <p className="mt-2 text-gray-500">Price: {product.price}</p>
            <p className="mt-2 text-gray-500">Sold: {product.sold}</p>
            <p className="mt-2 text-gray-500">In Stock: {product.inStock}</p>
          </div>
          <div className="col-span-5">
            <img
              src={"/uploads/" + product.image}
              alt={product.name}
              className="w-full h-44 object-cover rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6 items-center">
          <input
            type="number"
            min="1"
            max={product.inStock}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-3 mt-3 border rounded-md outline-none h-8 w-28"
          />
          <button
            onClick={handleAddToCart}
            className={`mt-3  px-4 py-2 text-white rounded-md ${
              isInCart ? "bg-red-500" : "bg-gray-800"
            }`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInSell;

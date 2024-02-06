import React, { useState } from "react";

const ProductInOrder = ({ product, onAddToOrderCart, onRemoveFromOrderCart }) => {
  const [isInOrderCart, setIsInOrderCart] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const handleAddToOrderCart = async () => {
    // Here you can add the product to the cart
    // After that, toggle the isInCart state variable
    if (isInOrderCart) {
      await onRemoveFromOrderCart(product);
    } else {
      await onAddToOrderCart(product, quantity);
    }
    setIsInOrderCart(!isInOrderCart);
  };

  return (
    <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 w-[550px]">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Category: {product.catagory}
        </div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          Name: {product.name}
        </p>
        <p className="mt-2 text-gray-500">ID: {product._id}</p>
        <p className="mt-2 text-gray-500">Price: {product.price}</p>
        <p className="mt-2 text-gray-500">Sold: {product.sold}</p>
        <p className="mt-2 text-gray-500">In Stock: {product.inStock}</p>

        <div className="flex justify-end gap-6 items-center">
          <input
            type="number"
            min="1"
            //max={product.inStock}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-3 mt-3 border rounded-md outline-none h-8 w-28"
          />
          <button
            onClick={handleAddToOrderCart}
            className={`mt-3  px-4 py-2 text-white rounded-md ${
              isInOrderCart ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isInOrderCart ? "Remove from Order" : "Add to Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInOrder;

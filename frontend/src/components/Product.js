const Product = ({ product }) => {
  const handleEdit = () => {
    console.log(`Edit product with ID: ${product.id}`);
  };

  const handleViewSellHistory = () => {
    console.log(`View sell history for product with ID: ${product.id}`);
  };
  const handleDelete = async () => {
    const response = await fetch("/showroom/products/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();
    window.location.reload();
  };

  return (
    <div className="max-w-md  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3  ">
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
        <button
          onClick={handleEdit}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleViewSellHistory}
          className="mt-3 ml-3 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          View Sell History
        </button>
        <button className="icons" onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Product;

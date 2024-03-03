import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Customer = ({ customer }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    //console.log(`Edit customer with ID: ${customer.id}`);
  };

  const handleViewBuyHistory = () => {
    //console.log(`View buy history for customer with ID: ${customer.id}`);
    navigate(`/customers/${customer._id}`, { state: { customer } });
  };

  const handleDelete = async () => {
    const response = await fetch("/showroom/customers/" + customer._id, {
      method: "DELETE",
    });
    const json = await response.json();
    window.location.reload();
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="p-8">
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          Name: {customer.name}
        </p>
        <p className="mt-2 text-gray-500">ID: {customer._id}</p>
        <p className="mt-2 text-gray-500">Mobile: {customer.mobile}</p>
        <p className="mt-2 text-gray-500">Address: {customer.address}</p>
        {user.username === "showroom_manager" && (
          <button
            onClick={handleEdit}
            className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleViewBuyHistory}
          className="mt-3 ml-3 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          View Buy History
        </button>
        {user.username === "showroom_manager" && (
          <button
            onClick={handleDelete}
            className="mt-3 ml-72 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Customer;

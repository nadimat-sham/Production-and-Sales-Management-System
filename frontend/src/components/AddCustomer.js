import React, { useState } from "react";

const AddCustomer = ({ onCancel, setCustomers }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = async () => {
    const customer = { name, mobile, gender, address };
    const response = await fetch("/showroom/customers/add", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setCustomers((prev) => [json, ...prev]);
    onCancel();
  };

  const isAddDisabled =
    !name ||
    !mobile ||
    !gender ||
    mobile.length !== 11 ||
    !mobile.startsWith("01");

  return (
    <div className="ml-72">
      <div className="mt-20 ml-56 flex-col items-center justify-center h-screen ">
        <div className="p-12 bg-white rounded shadow-xl w-2/3">
          <h1 className="text-3xl font-bold mb-4">Add Customer</h1>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex  gap-1">
            <span className="text-red-500">*</span>
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex gap-1">
            <span className="text-red-500">*</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none bg-white"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex gap-1">
            <span className="text-white">*</span>

            <input
              type="text"
              placeholder="Address (Optional"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
            />
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleAdd}
              disabled={isAddDisabled}
              className={`w-20 px-3 py-2 text-white ${
                isAddDisabled ? "bg-green-300" : "bg-green-600"
              } rounded-md`}
            >
              Add
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

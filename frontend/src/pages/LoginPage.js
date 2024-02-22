import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login logic here
    await login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Production and Sales Management System
        </h2>
        <h2 className="text-2xl font-bold mb-5 text-gray-700">Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Username
            </label>
            <input
              className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-indigo-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full py-3 bg-indigo-500 mt-10 text-white rounded hover:bg-indigo-400">
            Log in
          </button>
        </form>
        <p className="mt-8 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-400">
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

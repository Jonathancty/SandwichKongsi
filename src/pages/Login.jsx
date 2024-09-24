import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/userContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password1: "",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const loginUser = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const response = await axios.post("/api/users/login", userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-playfair font-semibold text-center mb-6">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={loginUser}>
          {err && (
            <p className="inline-block mt-4 bg-red-500 w-full rounded-md p-2 text-white shadow-md text-center">
              {err}
            </p>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-playfair">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-playfair">
              Passowrd
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password1"
              value={userData.password1}
              onChange={(e) =>
                setUserData({ ...userData, password1: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-block px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300 font-playfair font-semibold"
          >
            {" "}
            Login
          </button>
        </form>
        <small className="block text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="hover:underline text-blue-800">
            Sign Up{" "}
          </Link>{" "}
        </small>
      </div>
    </section>
  );
};

export default Login;

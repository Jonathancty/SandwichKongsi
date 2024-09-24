import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const reponse = await axios.post("/api/users/register", userData);
      const newUser = await reponse.data;
      console.log(newUser);
      if (!newUser) {
        setError("Could not register user. Please try again. ");
      }
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-playfair font-semibold text-center mb-6">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={registerUser}>
          {error && (
            <p className="inline-block mt-4 bg-red-500 w-full rounded-md p-2 text-white shadow-md text-center">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-playfair">
              Username
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-playfair">
              Confirm your password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={userData.password2}
              onChange={(e) =>
                setUserData({ ...userData, password2: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-block px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300 font-playfair font-semibold"
          >
            {" "}
            Register Now
          </button>
        </form>
        <small className="block text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline text-blue-800">
            Sign In{" "}
          </Link>{" "}
        </small>
      </div>
    </section>
  );
};

export default Register;

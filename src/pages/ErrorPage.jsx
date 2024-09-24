import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4"> 404 </h1>
      <h2 className="text-3xl mb-8"> Page Not Found!</h2>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        {" "}
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/users");
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="py-8 px-4 bg-gray-100 min-h-screen">
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(({ _id: id, avatar, name, posts }) => {
            return (
              <Link
                to={`/posts/user/${id}`}
                key={id}
                className="block p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center space-x-4 py-4">
                  <img
                    src={`http://localhost:5000/uploads/${avatar}`}
                    alt={`Image of ${name}`}
                    className="w-32 h-32 rounded-md mx-auto object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 font-playfair">
                    {name}
                  </h4>
                  <p className="text-sm text-gray-600">{posts} Posts</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="font-semibold text-2xl font-sans text-center min-h-screen">
          No authors found!
        </h2>
      )}
    </section>
  );
};

export default Authors;

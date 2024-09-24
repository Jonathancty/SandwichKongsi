import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "../pages/DeletePost";

const Dashboard = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts/user/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-8">
      <div className="container mx-auto px-4">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {posts.map((post) => {
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden "
                >
                  <div className="flex justify-between items-center my-4 px-8">
                    <img
                      src={`http://localhost:5000/uploads/${post.thumbnail}`}
                      alt=""
                      className="w-full max-w-sm h-32 object-cover rounded-md shadow-md"
                    />
                    <h5 className="text-lg font-semibold mb-2 mt-4 text-center px-8">
                      {post.title}
                    </h5>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                      <Link
                        to={`/posts/${post._id}`}
                        className="inline-block px-4 py-2 rounded-md shadow-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
                      >
                        View
                      </Link>
                      <Link
                        to={`/posts/${post._id}/edit`}
                        className="inline-block px-4 py-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                      >
                        Edit
                      </Link>
                      <DeletePost postId={post._id} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <h2 className="font-semibold text-2xl font-sans text-center">
            No posts found!
          </h2>
        )}
      </div>
    </section>
  );
};

export default Dashboard;

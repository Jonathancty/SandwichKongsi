import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Link
      onClick={() => removePost(id)}
      className="inline-block px-4 py-2 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600 transition duration-300"
    >
      Delete
    </Link>
  );
};

export default DeletePost;

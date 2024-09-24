import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response?.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  if (IsLoading) {
    return <Loader />;
  }

  return (
    <section className="flex justify-center py-8 px-4 bg-gray-100">
      {error && <p>{error}</p>}
      {post && (
        <div className="w-3/4 bg-white p-6 rounded-md shadow-md">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="inline-block px-4 py-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 "
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-4 font-playfair">
            {post?.title}
          </h1>
          <div>
            <img
              src={`http://localhost:5000/uploads/${post?.thumbnail}`}
              alt=""
              className="w-full max-w-2xl h-auto max-h-96 rounded-md shadow-md mx-auto my-8"
            />
          </div>
          <div className="prose prose-sm font-sans">
            <div dangerouslySetInnerHTML={{ __html: post?.description }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;

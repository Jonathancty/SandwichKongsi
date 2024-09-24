import React, { useEffect } from "react";
import { useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/posts");
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="p-8">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="font-semibold text-2xl font-sans text-center">
          No posts found!
        </h2>
      )}
    </div>
  );
};

export default Posts;

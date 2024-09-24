import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`/api/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link
      to={`/posts/user/${authorID}`}
      className="flex items-center space-x-4 my-4"
    >
      <div>
        <img
          src={`http://localhost:5000/uploads/${author?.avatar}`}
          className="h-12 w-12 rounded-full border-2 border-gray-300 "
        />
      </div>
      <div>
        <h5 className="text-lg font-semibold font-playfair">
          By: {author.name}
        </h5>
        <small className="text-sm font-playfair">
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;

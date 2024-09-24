import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const postCategories = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "weather",
  ];
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    getPost();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    try {
      const response = await axios.patch(`/api/posts/${id}`, postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100  py-8 flex justify-center items-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
        <h1 className="font-semibold text-2xl mb-6 text-center font-playfair">
          Edit Post
        </h1>
        {error && (
          <p className="inline-block mt-4 bg-red-500 w-full rounded-md p-2 text-white shadow-md text-center">
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-4 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {postCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="mb-4"
          />
          <div className="flex flex-col">
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="png,jpg,jpeg"
              className="my-8"
            />
            <button
              type="submit"
              className="inline-block px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300 mt-4"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;

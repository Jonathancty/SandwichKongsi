import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

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
    const getUser = async () => {
      const response = await axios.get(`/api/users/${currentUser.id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, []);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post("/api/users/change-avatar", postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.set("name", name);
      postData.set("email", email);
      postData.set("currentPassword", currentPassword);
      postData.set("newPassword", newPassword);
      postData.set("confirmPassword", confirmPassword);
      const response = await axios.patch(`/api/users/edit-user`, postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // log out user
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="flex justify-center items-center bg-gray-100 py-4">
      <div className="w-full max-w-md p-8 ">
        <div className="flex justify-center mb-4">
          <Link
            to={`/myposts/${currentUser.id}`}
            className="inline-block px-4 py-2 bg-white rounded-md shadow-md font-semibold font-playfair hover:bg-gray-100 transition duration-300"
          >
            My posts
          </Link>
        </div>
        <div>
          <div>
            <div>
              <img
                src={`http://localhost:5000/uploads/${avatar}`}
                alt=""
                className="w-48 h-48 rounded-full shadow-md object-cover border-8 border-white mx-auto"
              />
            </div>
            <form className="relative">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png,jpg,jpeg"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-16 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300"
                onClick={() => setIsAvatarTouched(true)}
              >
                <FaEdit />
              </label>
              {isAvatarTouched && (
                <button
                  className="absolute bottom-0 right-16 bg-green-500 text-white p-2 rounded-full cursor-pointer"
                  onClick={changeAvatarHandler}
                >
                  <FaCheck />
                </button>
              )}
            </form>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center font-playfair">
            {currentUser.name}
          </h1>

          <form className="space-y-4" onSubmit={updateUserDetails}>
            {error && (
              <p className="inline-block mt-4 bg-red-500 w-full rounded-md p-2 text-white shadow-md text-center">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-playfair">
                Username
              </label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-playfair">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-playfair">
                Passowrd
              </label>
              <input
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-playfair">
                New password
              </label>
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-playfair">
                Confirm your password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="inline-block px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300 font-playfair font-semibold"
            >
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

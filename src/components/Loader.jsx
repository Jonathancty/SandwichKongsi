import React from "react";
import LoadingGif from "../images/loading.gif";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100 ">
      <img src={LoadingGif} alt="Loading..." />
    </div>
  );
};

export default Loader;

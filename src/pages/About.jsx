import React from "react";
import logo3 from "../images/logo3.png";

const About = () => {
  return (
    <section className="container mx-auto p-8 sm:p-8 font-playfair">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-playfair font-bold mb-4 text-center">
          About Us
        </h1>
        <div className="flex justify-center flex-col ">
          <p className="text-xl text-gray-700 mb-4 text-center">
            Welcome to our company! We are dedicated to providing the best
            service possible.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Our team is composed of experienced professionals who are passionate
            about what they do.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            We believe in continuous improvement and always strive to exceed our
            customers' expectations.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <img src={logo3} alt="" className="rounded-full shadow-sm h-36" />
        </div>
      </div>
    </section>
  );
};

export default About;

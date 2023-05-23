import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Book Talks</h1>
      <p className="text-xl mb-8">
        Discover, discuss, and share your favorite books.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

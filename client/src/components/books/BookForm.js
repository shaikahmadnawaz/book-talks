import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";

const BookForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("coverImage", coverImage);

    // Obtain the authorization token from your client application
    const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

    // Make a POST request to your server with the form data and include the authorization token in the headers
    fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
        // Fetch the updated books after successful submission
        dispatch(fetchBooks());
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors that occur during the request
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-6">Add a Book</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author:
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="coverImage"
          >
            Cover Image:
          </label>
          <input
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;

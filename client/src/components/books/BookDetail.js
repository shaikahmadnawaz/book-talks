import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const books = useSelector((state) => state.books.books);
  const book = books.find((book) => book._id === bookId);

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <div className="bg-gray-100 p-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="author"
          >
            Author:
          </label>
          <p className="text-gray-600">{book.author}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <p className="text-gray-600">{book.description}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="coverImage"
          >
            Cover Image:
          </label>
          <img
            src={book.coverImage}
            alt=""
            className="w-36 h-24 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

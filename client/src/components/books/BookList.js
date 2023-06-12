import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books List</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {books &&
          books.map((book) => (
            <div key={book._id} className="bg-gray-100 p-4 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-600 mb-2">
                Description: {book.description}
              </p>
              <img
                src={book.coverImage}
                alt=""
                className="w-36 h-24 object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books["books"]);
  console.log(books, "books");
  const loading = useSelector((state) => state.books["loading"]);
  const error = useSelector((state) => state.books["error"]);

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
      {books &&
        books.map((book) => (
          <div key={book._id} className="bg-gray-100 p-4 mb-4">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Description: {book.description}</p>
          </div>
        ))}
    </div>
  );
};

export default BookList;

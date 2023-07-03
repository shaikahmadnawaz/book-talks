import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBooks } from "../../redux/bookSlice";

const UserBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector((state) => state.books.userBooks);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading user books...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Books</h2>
      {userBooks.map((book) => (
        <div
          key={book.id}
          className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="text-xl font-semibold">{book.title}</h4>
            <p className="text-gray-500">{book.author}</p>
          </div>
        </div>
      ))}
      {userBooks.length === 0 && (
        <p className="text-center text-gray-600">No books found.</p>
      )}
    </div>
  );
};

export default UserBooks;

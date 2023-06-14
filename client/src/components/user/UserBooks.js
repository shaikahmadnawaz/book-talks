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
        <div key={book.id} className="bg-white p-4 mb-4 shadow">
          <h3 className="text-lg font-bold mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">Author: {book.author}</p>
          <p className="text-gray-600">{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBooks;

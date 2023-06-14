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
    return <div>Loading user books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Books</h2>
      {userBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBooks;

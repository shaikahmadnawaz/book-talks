import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../../redux/bookSlice";
import ReviewForm from "../reviews/ReviewForm";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector((store) => store.books.book);
  const isUser = useSelector((store) => store.auth.user);
  console.log(isUser, "is logged in");

  useEffect(() => {
    dispatch(getBook({ id: bookId }));
  }, [dispatch, bookId]);

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
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Reviews</h3>
          {book.reviews.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            <ul>
              {book.reviews.map((review) => (
                <li key={review._id}>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {isUser ? (
          <ReviewForm bookId={book._id} />
        ) : (
          <p>
            To add a review, you need to login.{" "}
            <span>Insert login link/button here.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

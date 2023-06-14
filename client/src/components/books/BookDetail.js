import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBook,
  addReview,
  deleteReview,
  editReview,
} from "../../redux/bookSlice";
import ReviewForm from "../reviews/ReviewForm";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector((store) => store.books.book);
  const isUser = useSelector((store) => store.auth.user);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");

  useEffect(() => {
    dispatch(getBook({ id: bookId }));
  }, [dispatch, bookId]);

  const handleAddReview = (comment) => {
    dispatch(addReview({ bookId, comment }));
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview({ bookId, reviewId }));
  };

  const handleEditReview = (reviewId, comment) => {
    dispatch(editReview({ bookId, reviewId, comment }));
    setEditingReviewId(null);
    setEditReviewText("");
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
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
          <h3 className="text-2xl font-bold mb-2">Reviews</h3>
          {book.reviews.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            <ul>
              {book.reviews.map((review) => (
                <li key={review._id} className="mb-4">
                  {editingReviewId === review._id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editReviewText}
                        onChange={(e) => setEditReviewText(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-full mr-2"
                      />
                      <button
                        onClick={() =>
                          handleEditReview(review._id, editReviewText)
                        }
                        className="text-white bg-blue-500 py-2 px-4 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600">{review.comment}</p>
                      {isUser && (
                        <div className="flex items-center mt-2">
                          {isUser._id === review.userId && (
                            <>
                              <button
                                onClick={() => setEditingReviewId(review._id)}
                                className="text-blue-500 font-bold mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="text-red-500 font-bold"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {isUser ? (
          <ReviewForm bookId={book._id} handleAddReview={handleAddReview} />
        ) : (
          <p>
            To add a review, you need to{" "}
            <span>
              <Link
                to="/login"
                title=""
                class="font-medium text-black transition-all duration-200 hover:underline"
              >
                Log In
              </Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

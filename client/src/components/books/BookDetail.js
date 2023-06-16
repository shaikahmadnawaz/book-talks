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
import { Rings } from "react-loader-spinner";

const BookDetails = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const book = useSelector((store) => store.books.book);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const reviews = useSelector((store) => store.books.book.reviews);
  const isUser = useSelector((store) => store.auth.user);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);

  useEffect(() => {
    dispatch(getBook({ id: bookId }));
  }, [dispatch, bookId]);

  const handleAddReview = (comment, rating) => {
    dispatch(addReview({ bookId, comment, rating }));
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview({ bookId, reviewId }))
      .then(() => {
        dispatch(getBook({ id: bookId }));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  const handleEditReview = (reviewId, comment, rating) => {
    setEditingReviewId(null);
    const reviewToEdit = reviews.find((review) => review._id === reviewId);
    if (reviewToEdit) {
      dispatch(editReview({ bookId, reviewId, comment, rating }))
        .then(() => {
          dispatch(getBook({ id: bookId }));
        })
        .catch((error) => {
          console.error("Error editing review:", error);
        });
    } else {
      console.error("Review not found");
    }
  };

  useEffect(() => {
    if (editingReviewId !== null) {
      const reviewToEdit = reviews.find(
        (review) => review._id === editingReviewId
      );
      if (reviewToEdit) {
        setEditReviewText(reviewToEdit.comment);
        setEditReviewRating(reviewToEdit.rating);
      }
    }
  }, [editingReviewId, reviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
        <div className="mb-4">
          <label className="text-gray-700 font-bold mb-2" htmlFor="author">
            Author:
          </label>
          <p className="text-gray-600">{book.author}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <p className="text-gray-600">{book.description}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold mb-2" htmlFor="coverImage">
            Cover Image:
          </label>
          <img
            className="w-40 h-56 object-cover"
            src={book.coverImage}
            alt={book.title}
          />
        </div>
        {isUser && (
          <div className="mb-4">
            <ReviewForm bookId={book._id} onSubmit={handleAddReview} />
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">Reviews:</h3>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review._id} className="mb-2">
                <p className="text-gray-600">{review.comment}</p>
                {isUser && isUser._id === review.user && (
                  <div className="flex items-center mt-1">
                    {editingReviewId === review._id ? (
                      <>
                        <input
                          className="border rounded-l px-2 py-1 mr-1"
                          type="text"
                          value={editReviewText}
                          onChange={(e) => setEditReviewText(e.target.value)}
                        />
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditReviewRating(star)}
                            className={`text-2xl ${
                              star <= editReviewRating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r"
                          onClick={() =>
                            handleEditReview(
                              review._id,
                              editReviewText,
                              editReviewRating
                            )
                          }
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-l"
                          onClick={() => setEditingReviewId(review._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-r"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className="mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
        <Link to="/" className="text-blue-500 mt-4 block">
          Back to Books
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;

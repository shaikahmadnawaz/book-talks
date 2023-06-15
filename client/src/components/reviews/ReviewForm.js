import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/bookSlice";

const ReviewForm = ({ bookId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the addReview action with the review data
    dispatch(addReview({ bookId, comment, rating }));

    // Clear the comment and rating fields after submission
    setComment("");
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
          Add Review:
        </label>
        <textarea
          id="comment"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex items-center mb-4">
        <label className="block text-gray-700 font-bold mr-2" htmlFor="rating">
          Rating:
        </label>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="bg-primary text-white font-bold py-2 px-4 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

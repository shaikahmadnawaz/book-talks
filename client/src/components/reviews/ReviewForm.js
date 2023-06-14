import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/bookSlice";

const ReviewForm = ({ bookId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the addReview action with the review data
    dispatch(addReview({ bookId, comment }));

    // Clear the comment field after submission
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
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

import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import { uploadCoverImage } from "../middlewares/uploadMiddleware.js";

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({}).populate("reviews");
    if (books.length > 0) {
      res
        .status(200)
        .json({ message: "Books found", totalBooks: books.length, books });
    } else {
      res.status(404).json({ message: "No books found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (book) {
      res.status(200).json({ message: "Book found", book });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
export const addBook = asyncHandler(async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const book = new Book({
      title,
      author,
      description,
      user: req.userId,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book" });
  }
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = asyncHandler(async (req, res) => {
  const { title, author, description, coverImage } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title;
      book.author = author;
      book.description = description;
      book.coverImage = coverImage;

      const updatedBook = await book.save();
      res.status(200).json({ message: "Book updated", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.remove();

    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
});

// @desc    Get reviews for a book
// @route   GET /api/books/:bookId/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("reviews");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Reviews sent", reviews: book.reviews });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add a review to a book
// @route   POST /api/books/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;

  if (!comment || !rating) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = new Review({
      comment,
      rating,
      user: req.userId,
      book: req.params.id,
    });

    await newReview.save();

    res.status(200).json({ message: "Review created", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Failed to create review" });
  }
});

// @desc    Update a book review
// @route   PUT /api/books/:id/reviews/:reviewId
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;

  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comment = comment;
    review.rating = rating;

    await review.save();

    res.status(200).json({ message: "Review updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review" });
  }
});

// @desc    Delete a book review
// @route   DELETE /api/books/:id/reviews/:reviewId
// @access  Private
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.remove();

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
});

// @desc    Add a new book with file upload
// @route   POST /api/books
// @access  Private
export const addBookWithUpload = asyncHandler(async (req, res) => {
  try {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const book = new Book({
      title,
      author,
      description,
      user: req.userId,
    });

    const createdBook = await book.save();

    if (req.file) {
      const file = req.file;
      await uploadCoverImage(file, createdBook._id);
      createdBook.coverImage = file.location;
      await createdBook.save();
    }

    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book" });
  }
});

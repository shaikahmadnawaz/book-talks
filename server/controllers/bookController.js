import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import Review from "../models/Review.js";

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
    if (!book) {
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
  const { title, author, description, coverImage } = req.body;

  try {
    const book = new Book({
      title,
      author,
      description,
      coverImage,
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

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.author = author;
    book.description = description;
    book.coverImage = coverImage;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.remove();
    res.json({ message: "Book removed" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

export const getReviews = asyncHandler(async (req, res, next) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    return res.status(400).json({ message: "Book ID not received !" });
  }
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book Not Found !" });
    }
    const reviews = await Book.findById(bookId).populate("reviews");
    return res.status(200).json({ message: "reviews sent ", reviews });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// @desc    Add a review to a book
// @route   POST /api/books/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const { text, rating } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    const userId = req.userId;
    if (book) {
      const newReview = await Review.create({
        text,
        rating,
        user: userId,
        book: req.params.id,
      });
      return res.status(200).json({ message: "Review Created !" });
    }
    return res.status(404).json({ message: "Book Not Found !" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// @desc    Update a book review
// @route   PUT /api/books/:id/reviews/:reviewId
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  const { text, rating } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const review = book.reviews.find(
      (review) => review._id.toString() === req.params.reviewId.toString() // Add toString() for comparison
    );

    if (review) {
      review.text = text;
      review.rating = rating;

      await book.save();
      res.json({ message: "Review updated" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// @desc    Delete a book review
// @route   DELETE /api/books/:id/reviews/:reviewId
// @access  Private
export const deleteReview = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.reviews = book.reviews.filter(
      (review) => review._id.toString() !== req.params.reviewId.toString() // Add toString() for comparison
    );

    await book.save();
    res.json({ message: "Review removed" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

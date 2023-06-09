import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
export const addBook = asyncHandler(async (req, res) => {
  const { title, author, description, coverImage } = req.body;

  const book = new Book({
    title,
    author,
    description,
    coverImage,
    user: req.user._id,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
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

// @desc    Add a review to a book
// @route   POST /api/books/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const { text, rating } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const review = {
      user: req.user._id,
      text,
      rating,
    };

    book.reviews.unshift(review); // Change from 'push' to 'unshift'
    await book.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Book not found" });
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

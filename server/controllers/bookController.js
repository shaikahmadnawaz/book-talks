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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooks } from "../services/book";
import axios from "axios";
import { BASE_URL } from "../config/url";
import { toast } from "react-hot-toast";

// Async thunk action to fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await getAllBooks();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
});

export const addBook = createAsyncThunk(
  "api/addBooks",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/books/`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getBook = createAsyncThunk(
  "api/books/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchUserBooks = createAsyncThunk(
  "books/fetchUserBooks",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books/myBooks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addReview = createAsyncThunk(
  "books/addReview",
  async ({ bookId, comment, rating }, { rejectWithValue }) => {
    try {
      console.log(bookId, comment, rating);
      const response = await axios.post(
        `${BASE_URL}/api/books/${bookId}/reviews`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "books/deleteReview",
  async ({ bookId, reviewId }, { rejectWithValue }) => {
    try {
      console.log(bookId, reviewId);
      const response = await axios.delete(
        `${BASE_URL}/api/books/${bookId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const editReview = createAsyncThunk(
  "books/editReview",
  async ({ bookId, reviewId, comment, rating }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/books/${bookId}/reviews/${reviewId}`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: {
      reviews: [],
    },
    userBooks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.books, "present");
        state.books = action.payload.books;
        console.log(action.payload.books);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBook.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.book = payload.book;
      })
      .addCase(getBook.rejected, (state, { payload }) => {
        state.loading = false;
      });

    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.book = payload.book;
        toast.success("Book added successfully");
      })
      .addCase(addBook.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.message);
      });

    // Adding the addReview case to the extraReducers
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // Updating the book's reviews with the new review
        state.book.reviews.push(action.payload.review);
        toast.success("Review added successfully");
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchUserBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.userBooks = action.payload;
        console.log(state.userBooks);
      })
      .addCase(fetchUserBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        // Removing the deleted review from the book's reviews
        state.book.reviews = state.book.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(editReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.loading = false;
        const editedReview = action.payload?.review;
        if (editedReview) {
          // Finding the edited review and update its comment
          state.book.reviews = state.book.reviews.map((review) => {
            if (review._id === editedReview._id) {
              return { ...review, comment: editedReview.comment };
            }
            return review;
          });
        } else {
          console.error("Edited review not found");
        }
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export default bookSlice.reducer;

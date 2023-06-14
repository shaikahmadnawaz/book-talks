import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooks } from "../services/book";
import axios from "axios";

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
      const response = await axios.post(
        `http://localhost:5000/api/books/`,
        payload,
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

export const getBook = createAsyncThunk(
  "api/books/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/${payload.id}`,
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

export const addReview = createAsyncThunk(
  "books/addReview",
  async ({ bookId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/books/${bookId}/reviews`,
        { comment },
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
      })
      .addCase(addBook.rejected, (state, { payload }) => {
        state.loading = false;
      });

    // Add the addReview case to the extraReducers
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // Update the book's reviews with the new review
        state.book.reviews.push(action.payload.review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export default bookSlice.reducer;

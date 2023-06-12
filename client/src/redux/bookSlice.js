import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooks } from "../services/book";

// Async thunk action to fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await getAllBooks();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
});

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
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
  },
});

// Export actions and reducer
export default bookSlice.reducer;

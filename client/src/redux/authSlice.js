import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../services/auth";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk action to handle user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    console.log({ email, password });
    try {
      const response = await login(email, password);
      // Save the token to local storage
      localStorage.setItem("token", response.token);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk action to handle user signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    try {
      const response = await signup(name, email, password);
      // Save the token to local storage
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Redux slice for auth state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Additional reducers for managing the auth state if needed
    setUserLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUserLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userData, token } = action.payload;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        state.user = userData;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

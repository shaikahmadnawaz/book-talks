// services/auth.js

import axios from "axios";

// Function to make login API request
export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to make signup API request
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

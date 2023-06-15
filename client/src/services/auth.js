import axios from "axios";
import { BASE_URL } from "../config/url";

// Function to make login API request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
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
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

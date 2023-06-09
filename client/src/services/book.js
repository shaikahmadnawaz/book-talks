import axios from "axios";

export const getAllBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
};

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { Rings } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import Search from "./Search";
import Filter from "./Filter";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const isAuthenticated = useSelector((state) => state.auth.user);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchBooks(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } else {
      setSearchResults([]);
    }
  }, [books, searchQuery]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Rings
  //         height={80}
  //         width={80}
  //         color="#21BF73"
  //         radius={6}
  //         visible={true}
  //         ariaLabel="rings-loading"
  //       />
  //     </div>
  //   );
  // }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold m-4 text-center">Books List</h2>
        <div className="flex justify-center m-4">
          {isAuthenticated ? (
            <Link
              to="/user/book/new"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
            >
              Add New Book
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
            >
              Login to Add Book
            </Link>
          )}
        </div>
      </div>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Filter
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(searchQuery ? searchResults : filteredBooks).map((book) => (
          <div
            key={book._id}
            className="rounded-lg overflow-hidden border border-primary"
          >
            <img
              className="h-64 w-full object-cover object-center"
              src={book.coverImage}
              alt="book"
            />
            <div className="p-6">
              <h2 className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">
                {book.category}
              </h2>
              <h1 className="text-lg font-medium text-gray-900 mb-3">
                {book.title}
              </h1>
              <p className="mb-3 leading-relaxed">{book.description}</p>
              <div className="flex items-center flex-wrap justify-between">
                <Link
                  to={`/book/${book._id}`}
                  className="inline-flex items-center text-secondary bg-primary px-4 py-2 rounded-sm cursor-pointer transition duration-300 ease-in-out hover:bg-primary-light hover:text-white"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <div className="mt-3 md:mt-0">
                  <span className="inline-flex items-center mr-3 text-gray-400 leading-none text-sm border-r-2 border-gray-200 pr-3 py-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {book.viewCount}
                  </span>
                  <span className="inline-flex items-center text-gray-400 leading-none text-sm">
                    <MdOutlineRateReview className="w-4 h-4 mr-1" />
                    {book.reviews.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Link to={`/book/profile/${book.user.id}`}>
                  <img
                    className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                    src={book.user.profileImage}
                    alt="user"
                  />
                </Link>
                <div>
                  <Link
                    to={`/book/profile/${book.user.id}`}
                    className="text-sm font-medium text-gray-600 cursor-pointer"
                    onClick={() => handleUserClick(book.user.id)}
                  >
                    {book.user.name}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(book.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;

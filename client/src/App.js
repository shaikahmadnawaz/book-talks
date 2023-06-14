import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import BookList from "./components/books/BookList";
import BookDetail from "./components/books/BookDetail";
import UserProfile from "./components/user/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import BookForm from "./components/books/BookForm";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

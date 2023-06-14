import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks, addBook } from "../../redux/bookSlice";

const BookForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    formData.append("category", category);

    dispatch(addBook(formData))
      .unwrap()
      .then(() => {
        dispatch(fetchBooks());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-black">Add a book</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 border-2 border-primary rounded-lg p-4 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-black"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white border-black placeholder-gray-500 caret-black text-black focus:ring-primary-500 border-primary-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type book title"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-black"
              >
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                className="bg-white border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 placeholder-gray-500 caret-black block w-full p-2.5"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Book author"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-black"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-black placeholder-gray-500 caret-black focus:ring-primary-500 focus:border-primary-500 "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your description here"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-black"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-white border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="biography">Biography</option>
                <option value="history">History</option>
                <option value="business">Business</option>
                <option value="self-help">Self-help</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="thriller">Thriller</option>
                <option value="horror">Horror</option>
                <option value="children">Children</option>
                <option value="young-adult">Young Adult</option>
                <option value="comics">Comics</option>
                <option value="art">Art</option>
                <option value="cookbooks">Cookbooks</option>
                <option value="journals">Journals</option>
                <option value="poetry">Poetry</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="coverImage"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                accept="image/*"
                className="bg-white border border-black text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Add Book
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookForm;

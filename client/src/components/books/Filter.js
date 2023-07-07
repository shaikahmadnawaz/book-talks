import React from "react";

const Filter = ({ selectedCategory, handleCategoryChange }) => {
  const categories = [
    { label: "All", value: "" },
    { label: "Fiction", value: "fiction" },
    { label: "Non-fiction", value: "non-fiction" },
    { label: "Mystery", value: "mystery" },
    { label: "Comics", value: "comics" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Thriller", value: "thriller" },
    { label: "Romance", value: "romance" },
    { label: "Horror", value: "horror" },
    { label: "Children", value: "children" },
    { label: "Biography", value: "biography" },
    { label: "History", value: "history" },
    { label: "Poetry", value: "poetry" },
    { label: "Self-help", value: "self-help" },
    { label: "Cooking", value: "cooking" },
  ];

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`px-3 py-1 my-1 rounded-md ${
            selectedCategory === category.value
              ? "bg-primary text-secondary"
              : "bg-gray-200"
          } mr-2`}
          onClick={() => handleCategoryChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;

import React from "react";

const Filter = ({ selectedCategory, handleCategoryChange }) => {
  const categories = [
    { label: "All", value: "" },
    { label: "Fiction", value: "fiction" },
    { label: "Non-fiction", value: "non-fiction" },
    { label: "Mystery", value: "mystery" },
    { label: "Comics", value: "comics" },
  ];

  return (
    <div className="flex justify-center mb-4">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`px-3 py-1 rounded-md ${
            selectedCategory === category.value ? "bg-primary" : "bg-gray-200"
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

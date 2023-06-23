import React from "react";

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 border-2 border-primary rounded-lg">
      <input
        type="text"
        placeholder="Search books"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-md border-primary focus:border-primary focus:ring focus:ring-primary py-2 px-4 block w-full appearance-none leading-normal"
      />
    </div>
  );
};

export default Search;

import React from "react";

const User = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Books:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.books?.map((book) => (
          <div
            key={book.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="text-xl font-semibold">{book.title}</h4>
              <p className="text-gray-500">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;

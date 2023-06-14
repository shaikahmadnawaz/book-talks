import React from "react";
import { useSelector } from "react-redux";
import UserBooks from "./UserBooks";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white p-8 rounded shadow w-full">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        User Profile
      </h2>
      {user ? (
        <div>
          <p className="text-lg font-medium mb-2">
            <span className="text-gray-600">Name:</span> {user.name}
          </p>
          <p className="text-lg font-medium mb-2">
            <span className="text-gray-600">Email:</span> {user.email}
          </p>
        </div>
      ) : (
        <p className="text-lg font-medium mb-2 text-center text-gray-600">
          No user profile found.
        </p>
      )}

      <UserBooks />
    </div>
  );
};

export default UserProfile;

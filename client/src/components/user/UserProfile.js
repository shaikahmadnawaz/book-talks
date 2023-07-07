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
        <div className="text-center">
          <div className="flex flex-col items-center mb-6">
            {user.profileImage && (
              <img
                src={user.profileImage}
                alt="Profile"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg font-medium mb-6 text-center text-gray-600">
          No user profile found.
        </p>
      )}

      <div className="mt-8">
        <UserBooks />
      </div>
    </div>
  );
};

export default UserProfile;

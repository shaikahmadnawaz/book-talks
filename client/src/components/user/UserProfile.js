import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white p-8 rounded shadow w-96">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user profile found.</p>
      )}
    </div>
  );
};

export default UserProfile;

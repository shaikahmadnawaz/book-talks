import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/userSlice";
import { useParams } from "react-router-dom";
import User from "./User";

const BookUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.users.selectedUser);

  console.log(user);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <User user={user} />
    </div>
  );
};

export default BookUser;

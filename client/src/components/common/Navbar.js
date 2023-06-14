import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            BooksTalks
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-gray-300">
                Books
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" className="hover:text-gray-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-gray-300">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

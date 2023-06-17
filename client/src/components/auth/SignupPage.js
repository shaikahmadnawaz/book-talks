import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    toast.success("Cover image uploaded successfully");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Dispatching the signupUser async thunk action
    await dispatch(signupUser({ name, email, password, profileImage }));

    // Clearing the input fields
    setName("");
    setEmail("");
    setPassword("");

    // Checking if signup is successful
    const signUpSuccessful = !error;

    // If signup is successful, navigating to the login page
    if (signUpSuccessful) {
      navigate("/login");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div class="mb-2 flex justify-center">
            <BsFillJournalBookmarkFill className="text-primary p-1" size={60} />
          </div>
          <h2 class="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p class="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              title=""
              class="font-medium text-black transition-all duration-200 hover:underline"
            >
              Log In
            </Link>
          </p>
          <form onSubmit={handleSignup} className="mt-8">
            <div class="space-y-5">
              <div>
                <label for="name" class="text-base font-medium text-gray-900">
                  {" "}
                  Full Name{" "}
                </label>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label for="email" class="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  accept="image/*"
                  className="bg-white border border-black text-black text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  class="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;

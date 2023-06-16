import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillJournalBookmarkFill,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="relative border-t-2 border-black overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-full flex flex-col md:flex-row justify-between p-8">
            <Link to="/" className="flex justify-center items-center">
              <div className="inline-flex justify-center items-center">
                <BsFillJournalBookmarkFill
                  className="text-primary p-1"
                  size={35}
                />
                <span className="ml-4 text-lg font-bold">Book Talks</span>
              </div>
            </Link>
            <div className="w-auto p-8">Made with ❤️ by Shaik Ahmad Nawaz</div>
            <div className="w-auto p-8">
              <div className="-m-1.5 flex flex-wrap">
                <div className="w-auto p-1.5">
                  <a href="#">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <BsGithub size={14} />
                    </div>
                  </a>
                </div>
                <div className="w-auto p-1.5">
                  <a href="#">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <BsLinkedin size={14} />
                    </div>
                  </a>
                </div>
                <div className="w-auto p-1.5">
                  <a href="#">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <BsTwitter size={14} />
                    </div>
                  </a>
                </div>
                <div className="w-auto p-1.5">
                  <a href="#">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <BsInstagram size={14} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

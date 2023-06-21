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
    <footer className="border-t-2 border-black bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between p-8">
          <Link to="/" className="flex justify-center items-center">
            <div className="flex items-center">
              <BsFillJournalBookmarkFill
                className="text-primary mr-2"
                size={35}
              />
              <span className="text-lg font-bold">Book Talks</span>
            </div>
          </Link>
          <div className="text-center md:text-left text-gray-700 py-4 md:py-0">
            Made with ❤️ by{" "}
            <a
              href="https://shaikahmadnawaz.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              Shaik Ahmad Nawaz
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <a href="https://github.com/shaikahmadnawaz" className="mr-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                <BsGithub size={14} />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/shaik-ahmad-nawaz-894425239"
              className="mr-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                <BsLinkedin size={14} />
              </div>
            </a>
            <a href="https://twitter.com/shaikahmadnawaz" className="mr-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                <BsTwitter size={14} />
              </div>
            </a>
            <a href="https://www.instagram.com/shaikahmadnawaz/">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                <BsInstagram size={14} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

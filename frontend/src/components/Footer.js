import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 shadow md:px-6 md:py-8 bg-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-8"
            alt="Flowbite Logo"
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Blogger
          </span>
        </Link>
        <ul className="flex flex-wrap items-center md:mb-6 text-sm mb-0 text-gray-400">
          <li>
            <Link to={"/about"} className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6  mx-auto border-gray-700 lg:my-8" />
      <span className="block text-sm text-center text-gray-400">
        © 2022{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Blogger™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;

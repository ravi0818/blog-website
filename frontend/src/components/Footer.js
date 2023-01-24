import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 shadow md:px-6 md:py-8 bg-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            RCoding
          </span>
        </Link>
        <ul className="flex flex-wrap items-center md:mb-6 text-sm mb-0 text-gray-400">
          <li>
            <a
              href="https://www.linkedin.com/in/ravikantprasad/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 hover:underline md:mr-6"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ravi0818"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 hover:underline md:mr-6"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://leetcode.com/Ravi_KP/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 hover:underline md:mr-6"
            >
              Leetcode
            </a>
          </li>
          <li>
            <a
              href="https://www.codechef.com/users/ravi_kp"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 hover:underline md:mr-6"
            >
              Codechef
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6  mx-auto border-gray-700 lg:my-8" />
      <span className="block text-sm text-center text-gray-400">
        © 2023{" "}
        <a href="/" className="hover:underline">
          RCoding™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;

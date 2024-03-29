import React from "react";

const About = () => {
  return (
    <div className="">
      <div className="flex justify-center pt-10">
        <img
          className="rounded-full w-1/6"
          src="https://avatars.githubusercontent.com/u/63839002?s=400&u=3ce93efc7205c86e127ba1b98e0b5a6f48b70131&v=4"
          alt=""
        />
      </div>

      <div className="flex justify-center pt-10">
        <div className="w-10/12 lg:w-2/4">
          <p className="text-center">
            Hey! I'm <b>Ravi</b>
          </p>
          <p>
            Computer science graduate skilled in full-stack technologies like
            React.js, Angular, Spring Boot, Node.js, and other frameworks.
            Ability to create full fledge websites with reusable and documented
            codes.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-10">
        <a
          href="https://www.linkedin.com/in/ravikantprasad/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-blue-400"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ravi0818"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-blue-400"
        >
          GitHub
        </a>
        <a
          href="https://leetcode.com/Ravi_KP/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-blue-400"
        >
          Leetcode
        </a>
        <a
          href="https://www.codechef.com/users/ravi0818"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-blue-400"
        >
          Codechef
        </a>
      </div>
    </div>
  );
};

export default About;

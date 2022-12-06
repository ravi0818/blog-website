import { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../Context";

const Navigation = () => {
  const [user, setUser] = useContext(UserContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const menu = useRef();

  const toggle = () => {
    menu.current.classList.toggle("hidden");
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      condition: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      condition: user.isLoggedIn && !user.isAdmin,
    },
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      condition: user.isLoggedIn && user.isAdmin,
    },
    {
      name: "About",
      path: "/about",
      condition: true,
    },
    {
      name: "Post",
      path: "/newpost",
      condition: user.isLoggedIn && !user.isAdmin,
    },
    {
      name: "Signup",
      path: "/register",
      condition: !user.isLoggedIn,
    },
    {
      name: "Login",
      path: "/login",
      condition: !user.isLoggedIn,
    },
  ];

  return (
    <>
      <nav className="w-full flex flex-wrap justify-between p-4 md:px-16 h-14 bg-purple-200 z-5">
        <div className="-my-5">
          <Link className="nav-link" to={"/"}>
            <img
              className="h-16"
              src="https://img.icons8.com/nolan/2x/blogger.png"
              alt="LOGO"
            />
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="inline-flex items-center  text-sm"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className="hidden bg-purple-200 md:bg-transparent md:w-auto md:block w-full pt-5 p-2 md:pt-0 rounded"
          ref={menu}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-10">
            {user.isLoggedIn && <li>{`👤 Welcome, ${user.name}`}</li>}
            {menuItems.map((item) => {
              if (item.condition === true)
                return (
                  <li
                    key={item.path}
                    className="border p-2 md:p-0 md:border-0"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                );
            })}
            {user.isLoggedIn && (
              <li className="border p-2 md:p-0 md:border-0">
                <Link
                  to={"/"}
                  onClick={() => {
                    setUser({ name: "", email: "", isLoggedIn: false });
                    localStorage.clear();
                  }}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

const NavigationBar = ({ fixed }) => {
  const [user, setUser] = useContext(UserContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      path: "/",
      condition: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      condition: user.isLoggedIn && !user.isAdmin,
    },
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      condition: user.isLoggedIn && user.isAdmin,
    },
    {
      name: "About",
      path: "/about",
      condition: true,
    },
    {
      name: "Post",
      path: "/newpost",
      condition: user.isLoggedIn && !user.isAdmin,
    },
    {
      name: "Signup",
      path: "/register",
      condition: !user.isLoggedIn,
    },
    {
      name: "Login",
      path: "/login",
      condition: !user.isLoggedIn,
    },
  ];
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to={"/"}
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              // href="#pablo"
            >
              Blogger
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {user.isLoggedIn && (
                <li className="nav-item">
                  <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white lg:px-10">{`Welcome, ${user.name}`}</span>
                </li>
              )}
              {menuItems.map((item) => {
                if (item.condition === true)
                  return (
                    <li
                      key={item.path}
                      className="nav-item"
                      onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                      <Link
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        to={item.path}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
              })}
              {user.isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to={"/"}
                    onClick={() => {
                      setUser({ name: "", email: "", isLoggedIn: false });
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              )}
              {/* <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Pin</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;

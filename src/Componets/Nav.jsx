import React ,{useEffect,useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
 

import {
  useClerk,
  useUser,
  UserButton,
} from "@clerk/react";

const BookIcon = () => {
  return (
    <svg
      className="w-4 h-4 text-gray-700"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
      />
    </svg>
  );
};

const Nav = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
     if(location.pathname !=='/'){
        setIsScrolled(true);
        return;
     }else{
        setIsScrolled(false)
     }
     setIsScrolled(prev=>location.pathname !=='/' ? true: prev);


    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* LOGO */}

      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className={`h-9 transition-all duration-500 ${
            isScrolled ? "invert opacity-80" : ""
          }`}
        />
      </Link>

      {/* DESKTOP NAV */}

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}

            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        <button
          onClick={() => navigate("/owner")}
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${
            isScrolled
              ? "text-black border-black"
              : "text-white border-white"
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* DESKTOP RIGHT */}

      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="Search"
          className={`h-7 transition-all duration-500 ${
            isScrolled ? "invert" : ""
          }`}
        />

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Booking"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              isScrolled
                ? "text-white bg-black"
                : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* MOBILE RIGHT */}

      <div className="flex items-center gap-3 md:hidden">

        {/* MOBILE LOGIN OUTSIDE MENU */}

        {!user && (
          <button
            onClick={() => openSignIn()}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              isScrolled
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}

        {/* MOBILE USER */}

        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Booking"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        {/* MENU ICON */}

        <img
          onClick={() => setIsMenuOpen(true)}
          src={assets.menuIcon}
          alt="Menu"
          className={`h-5 w-5 cursor-pointer ${
            isScrolled ? "invert" : ""
          }`}
        />
      </div>

      {/* MOBILE MENU */}

      <div
        className={`fixed inset-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-7 md:hidden transition-transform duration-500 z-[100] ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* CLOSE BUTTON */}

        <button
          className="absolute top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon}
            alt="Close menu"
            className="h-6 w-6"
          />
        </button>

        {/* MOBILE LOGO */}

        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="h-9"
          />
        </Link>

        {/* MOBILE LINKS */}

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        {/* MOBILE LOGIN INSIDE MENU */}

        {!user && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openSignIn();
            }}
            className="bg-black text-white px-10 py-3 rounded-full text-lg"
          >
            Login
          </button>
        )}

        {/* MOBILE DASHBOARD */}

        {user && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/owner");
            }}
            className="border border-black px-6 py-2 rounded-full"
          >
            Dashboard
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
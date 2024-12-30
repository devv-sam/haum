import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".mobile-menu", {
        x: "0%",
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/list" },
  ];

  // Mobile navigation links (including Profile)
  const mobileNavLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/list" },
    { name: "Profile", path: "/register" },
  ];

  const getPageTitle = () => {
    const currentLink = mobileNavLinks.find(
      (link) => link.path === currentPath
    );
    return currentLink ? currentLink.name : "Haum";
  };

  return (
    <nav className="h-24 px-8 flex items-center justify-between bg-white relative">
      {/* Logo - Left on desktop */}
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
      </Link>

      <div className="md:hidden flex-1 text-center font-['Mona_Sans'] text-lg">
        {getPageTitle()}
      </div>

      <div className="hidden md:flex items-center gap-8 font-['Mona_Sans']">
        {/* Navigation Links */}
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`transition-all duration-300 ${
              currentPath === link.path
                ? "text-black font-medium"
                : "text-black/60 hover:text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
        {/* Auth Buttons */}
        <Link
          to="/login"
          className="text-black/80 hover:text-black transition-all duration-300 font-medium ml-4"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-black/90 transition-all duration-300 font-medium"
        >
          Sign up
        </Link>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-50 w-6 h-6 flex flex-col justify-center gap-1.5 relative"
      >
        <span
          className={`w-full h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-full h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-full h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 w-full h-screen bg-black transform translate-x-full
          transition-transform duration-300 z-40`}
      >
        <div className="flex flex-col items-end justify-center h-full pr-12 gap-8">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="font-['Mona_Sans'] text-white text-3xl font-medium hover:text-gray-300 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

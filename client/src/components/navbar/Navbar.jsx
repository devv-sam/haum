import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { AuthContext } from "../../context/AuthContext";
import { X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".menu-overlay", {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(".menu-content", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(".menu-overlay", {
        opacity: 0,
        visibility: "hidden",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(".menu-content", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/list" },
    { name: "How it works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="h-16 px-4 md:px-8 flex items-center justify-between bg-white relative">
      <Link to="/" className="flex items-center gap-3 z-30">
        <img src="/logo.svg" alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/profile">
          <img
            src={
              currentUser && currentUser.avatar
                ? currentUser.avatar
                : "/circle-user.svg"
            }
            alt="Profile"
            className="w-6 h-6 md:w-9 md:h-9 rounded-full hidden md:block hover:opacity-70 transition-opacity"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-30 flex items-center gap-2 font-['Mona_Sans'] hover:opacity-70 transition-opacity"
        >
          <span className="text-lg">•</span>
          <span className="text-lg font-['Mona_Sans'] font-medium">Menu</span>
        </button>
      </div>

      <div
        className={`menu-overlay fixed inset-0 flex items-center justify-center ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } bg-white/10 backdrop-blur-md border border-white/20 z-50`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div
          className={`menu-content fixed w-full  md:w-[700px] md:h-auto md:rounded-2xl rounded-lg bg-black md:p-12 p-6 opacity-0 md:opacity-100 z-20`}
        >
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-white/60 font-['Mona_Sans'] md:text-xl text-lg">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium font-['Mona_Sans'] hover:text-white/80 transition-colors "
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium font-['Mona_Sans'] hover:text-white/80 transition-colors md:hidden"
            >
              Profile
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-white/60 font-light">Follow us</span>
              <div className="flex gap-6">
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {currentUser ? (
              <Link
                to="/portfolio"
                onClick={() => setIsOpen(false)}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-['Mona_Sans'] text-lg text-center"
              >
                Launch Portfolio
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 font-['Mona_Sans'] transition-colors text-lg text-center"
              >
                Connect Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

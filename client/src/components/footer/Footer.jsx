import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/" },
        { name: "Contact", path: "/" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Marketplace", path: "/list" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "FAQs", path: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/" },
        { name: "Terms of Service", path: "/" },
        { name: "Cookie Policy", path: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-8 md:py-16 px-4 md:px-8 lg:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 md:space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logow.svg" alt="Logo" className="h-8 md:h-12 w-auto" />
            </Link>
            <p className="text-white/60 text-xs md:text-sm max-w-xs">
              Revolutionizing real estate through innovative solutions and
              seamless experiences.
            </p>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4 md:space-y-6">
              <h3 className="text-xs md:text-sm font-medium text-white/60">
                {section.title}
              </h3>
              <ul className="space-y-2 md:space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm md:text-base text-white hover:text-white/80 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 pb-8 md:pb-12">
          <div className="max-w-md space-y-4">
            <h3 className="text-lg md:text-xl font-medium">
              Stay in the loop!
            </h3>
            <p className="text-xs md:text-sm text-white/60">
              Subscribe to get updates on new listings, features, and industry
              news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="https://instagram.com"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Twitter size={18} />
            </a>
          </div>

          <p className="text-xs md:text-sm text-white/60">
            © {new Date().getFullYear()} Haum, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

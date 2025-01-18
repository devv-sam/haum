import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Showcase from "../../components/showcase/Showcase";
import { Link } from "react-router-dom";
function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white">
      <div className=" px-4 md:px-8 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight mb-8">
              Real Estate, Reinvented: Powered by Blockchain
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg md:text-xl text-gray-600 font-['Mona_Sans']">
              Our blockchain-powered platform enables buying, selling, and
              fractional ownership of tokenized real estate.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                to="/wallet"
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 font-['Mona_Sans'] transition-colors text-lg text-center"
              >
                Launch Wallet
              </Link>
              <Link
                to="/how-it-works"
                className="w-full md:w-auto bg-blue-100 text-blue-600 px-6 py-4 rounded-full hover:bg-blue-200 font-['Mona_Sans'] transition-colors text-lg text-center"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/modern-houses.png"
            alt="Modern Houses"
            className="w-full h-[500px] object-cover rounded-3xl mb-8"
          />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[90%]">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 sm:px-6 lg:px-8">
        <Showcase />
      </div>
    </div>
  );
}

export default HomePage;

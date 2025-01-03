import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

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
          <div>
            <p className="text-lg md:text-xl text-gray-600 font-['Mona_Sans']">
              Haum is a blockchain-powered platform that enables the buying,
              selling, and fractional ownership of tokenized real estate.
            </p>
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
    </div>
  );
}

export default HomePage;

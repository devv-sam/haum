import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
const types = ["buy", "rent"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center">
      {/* Type Buttons */}
      <div className="flex w-full md:w-1/4">
        <div className="flex space-x-4">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={`px-6 py-3 rounded-full text-full font-medium font-['Mona_Sans']  capitalize transition-colors 
                ${
                  query.type === type
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Input */}
      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-500 mb-1 font-['Mona_Sans']">
          Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="City"
          className="p-2 font-['Mona_Sans'] focus:outline-none"
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, location: e.target.value }))
          }
        />
      </div>

      {/* Min Price Input */}
      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-500 mb-1 font-['Mona_Sans']">
          Min token price
        </label>
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="00.05 ETH"
          className="p-2 font-['Mona_Sans'] focus:outline-none"
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, minPrice: Number(e.target.value) }))
          }
        />
      </div>

      {/* Max Price Input */}
      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-500 mb-1 font-['Mona_Sans']">
          Max token price
        </label>
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="01.35 ETH"
          className="p-2 font-['Mona_Sans'] focus:outline-none"
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
        />
      </div>

      {/* Search Button */}
      <Link
        to={`/list?type=${query.type}&location=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 duration-300 w-full md:w-auto text-center"
      >
        <Search className="inline-block" size={20} />
        Search
      </Link>
    </div>
  );
};

export default SearchBar;

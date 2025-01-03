import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    bedroom: searchParams.get("bedroom") || undefined,
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-[mona_sans] text-gray-900">
          {searchParams.get("city") ? (
            <>
              Search results for{" "}
              <span className="font-[mona_sans] font-medium">
                {searchParams.get("city")}
              </span>
            </>
          ) : (
            <span className="font-[mona_sans] font-medium">
              Discover trending properties
            </span>
          )}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter location"
            onChange={handleChange}
            defaultValue={query.city}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <select
          name="type"
          id="type"
          onChange={handleChange}
          defaultValue={query.type}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans] bg-white"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>

        <select
          name="property"
          id="property"
          onChange={handleChange}
          defaultValue={query.property}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans] bg-white"
        >
          <option value="">All</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Villa</option>
        </select>

        <input
          type="number"
          id="minPrice"
          name="minPrice"
          placeholder="Min price"
          onChange={handleChange}
          defaultValue={query.minPrice}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans]"
        />

        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="Max price"
          onChange={handleChange}
          defaultValue={query.maxPrice}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans]"
        />

        <input
          type="number"
          id="bedroom"
          name="bedroom"
          placeholder="Bedrooms"
          onChange={handleChange}
          defaultValue={query.bedroom}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-[mona_sans]"
        />

        <button
          onClick={handleFilter}
          className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 font-[mona_sans]"
        >
          <Search size={20} className="mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}

export default Filter;

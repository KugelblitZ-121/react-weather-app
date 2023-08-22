import { useContext, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { SearchContext } from "../API/search-api";

export default function SearchBar() {
  const { getDailyWeather, isLoading } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    getDailyWeather(searchInput);
    setSearchInput("");
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <form className="md:w-1/2">
        <label htmlFor="search" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Search any city in the world
        </label>
        <div className="flex space-between w-full">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <BiWorld />
          </span>
          <input
            onChange={handleInputChange}
            value={searchInput}
            type="text"
            id="search"
            className="rounded-none rounded-r-lg bg-gray-50 border w-full text-gray-900 focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a city's name"
          />
          <button
            disabled={!searchInput.trim()}
            className={`bg-blue-500 text-white text-center font-bold py-2 px-4 border border-blue-700 rounded ml-2 w-1/4 ${
              !searchInput.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            onClick={handleSearch}
          >
            {isLoading ? (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

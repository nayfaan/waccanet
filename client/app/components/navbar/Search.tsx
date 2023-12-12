"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <form>
      <div className="relative w-full">
        <a href="developing" >
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <div className="absolute p-2 end-2 bottom-1.5 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
            <BiSearch size={18} />
          </div>
        </a>
      </div>
    </form>
  );
};

export default Search;

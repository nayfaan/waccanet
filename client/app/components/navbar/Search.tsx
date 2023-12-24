"use client";
import React, { useEffect, useState, useContext } from "react";
import { Property } from "@/app/types/types";
import { BiSearch } from "react-icons/bi";
import { SearchQureyContext } from "../../page";
const Search = () => {

  //変数の状態を保持しておく
  const [search, setSearch] = useState("");
  const { search_qurey, setQuery } = useContext(SearchQureyContext);

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {

    //HTMLでデフォルト動きを止めるためのもの
    e.preventDefault();
    setQuery(search);
  }

  return (
    <>
      <form onSubmit={getSearch}>
        <div className="relative w-full">
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={search}
            onChange={updateSearch}
          />
          <button type="submit" className="absolute p-2 end-2 bottom-1.5 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
            <BiSearch size={18} />
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;

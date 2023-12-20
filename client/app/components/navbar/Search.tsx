import React, { useEffect, useState } from "react";
import { getPropertyListSearch } from "@/app/actions/getPropertyListSearch";
import { Property } from "@/app/types/types";
import { BiSearch } from "react-icons/bi";

const Search = () => {

  //変数の状態を保持しておく
  const [search, setSearch] = useState("");
  const [qurey, setQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  // qureyの値が変更された時に実行される。
  useEffect(() => {
    const fetchData = async () => {

      try {
        console.log("データの取得をしている！");
        // const data = getPropertyListSearchx(qurey);
        // setProperties(data); // もしくは適切なデータをセットする
        console.log("ooooo!");
        const property: Property = await getPropertyListSearch(qurey);

        setProperties(property);
        console.log(property);



      } catch (error) {
        console.log("マジで！");

        console.error("Failed to fetch data:", error);
      }
    };

    if (qurey) {
      fetchData();
    }


  }, [qurey])

  const getSearch = e => {
    //HTMLでデフォルト動きを止めるための呪文
    e.preventDefault();

    setQuery(search);

    setSearch('');
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
      <p></p>
    </>
  );
};

export default Search;

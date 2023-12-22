"use client";

import { Property, PaginationProperties } from "@/app/types/types";
import PropertiesList from "./components/properties/PropertiesList";
import Search from "./components/navbar/Search";
import { getAllProperties } from "./actions/getAllProperties";
import { getPropertyListPagination } from "./actions/getPropertyListPagination";
import { useEffect, useState, createContext } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";

export const SearchQureyContext = createContext('');

export default function Home() {

  const [search_qurey, setQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const handleClickNext = (e) => {
    const up_offset = offset + 20;
    if (up_offset <= total) {
      setOffset(offset + 20)
    }
  };
  const handleClickPrevious = (e) => {
    const up_offset = offset - 20;
    if (up_offset >= 0) {
      setOffset(offset - 20)
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const paginationPropertiesData: PaginationProperties = await getAllProperties();
        console.log(paginationPropertiesData);
        setProperties(paginationPropertiesData.results);
        setTotal(paginationPropertiesData.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();

    // useEffect の第二引数が空の場合、マウント時に1度だけ実行される
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const paginationPropertiesData: Property[] = await getPropertyListPagination(limit, offset);
        setProperties(paginationPropertiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();

  }, [offset]);


  return (
    <main className="relative h-full top-20">
      <SearchQureyContext.Provider value={{ search_qurey, setQuery }}>
        <Search />
      </SearchQureyContext.Provider>
      <div>
        <h3> 検索する文字列はこれだ！！</h3>
        <p>{search_qurey}</p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button onClick={handleClickPrevious}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button onClick={handleClickNext}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{offset + 1}件</span>から<span className="font-medium">{offset + limit}件</span>の物件表示 (合計<span className="font-medium">{total}</span>件)
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button onClick={handleClickPrevious}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <MdOutlineFirstPage className="h-5 w-5" aria-hidden="true" />
              </button>

              <button onClick={handleClickNext}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <MdOutlineLastPage className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Show Properties Data */}
      <PropertiesList propertiesData={properties} />
    </main>
  );
}

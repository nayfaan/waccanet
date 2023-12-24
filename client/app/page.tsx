"use client";

import { Property, PaginationProperties } from "@/app/types/types";
import PropertiesList from "./components/properties/PropertiesList";
import Search from "./components/navbar/Search";
import { getPropertyListSearchPagination } from "./actions/getPropertyListSearchPagination";
import { useEffect, useState, createContext } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";

export const SearchQureyContext = createContext('');

export default function Home() {

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [current_page, setCurrent_page] = useState(1);
  const [properties_per_page, setProperties_per_page] = useState(20);
  const [num_pages, setNum_pages] = useState(0);
  const [search_qurey, setQuery] = useState("");

  const handleClickNext = (e) => {
    const up_current_page = current_page + 1;
    if (up_current_page <= num_pages) {
      setCurrent_page(current_page + 1)
    }
  };
  const handleClickPrevious = (e) => {
    const down_current_page = current_page - 1;
    if (down_current_page >= 1) {
      setCurrent_page(current_page - 1)
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const paginationPropertiesData: PaginationProperties = await getPropertyListSearchPagination(search_qurey, current_page);
        setProperties(paginationPropertiesData.results);
        setTotal(paginationPropertiesData.total);
        setProperties_per_page(paginationPropertiesData.properties_per_page);
        setNum_pages(paginationPropertiesData.num_pages);

        console.log("paginationPropertiesData check");
        console.log(paginationPropertiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();

  }, [search_qurey, current_page]);

  useEffect(() => {
    setCurrent_page(1)
  }, [search_qurey]);

  return (
    <main className="relative h-full top-20">
      <SearchQureyContext.Provider value={{ search_qurey, setQuery }}>
        <Search />
      </SearchQureyContext.Provider>
      <div>
        <h3> searching qurey</h3>
        <p>{search_qurey}</p>
        <h3></h3>
        <h3> current_page</h3>
        <p>{current_page}</p>
        <h3></h3>
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
              <span className="font-medium">{properties_per_page * (current_page - 1) + 1}件</span>から<span className="font-medium">{properties_per_page * (current_page - 1) + properties_per_page}件</span>の物件表示 (合計<span className="font-medium">{total}</span>件)
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

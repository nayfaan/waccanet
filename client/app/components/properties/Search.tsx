"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { BiSearch } from "react-icons/bi";

export default function Search({ placeholder }: { placeholder: string }) {

  //変数の状態を保持しておく
  const [search_query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const queryParam = searchParams.get('search_query') || '';
    setQuery(queryParam);
  }, [searchParams]);

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault(); // フォームのデフォルトの送信を防止
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (search_query) {
      params.set('search_query', search_query);
    } else {
      params.delete('search_query');
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
  <form onSubmit={getSearch}>
      <div className="relative w-full">
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          onChange={updateSearch}
          value={search_query}
        />
        <button type="submit" className="absolute p-2 end-2 bottom-1.5 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
          <BiSearch size={18} />
        </button>
      </div>
    </form>
  );
};


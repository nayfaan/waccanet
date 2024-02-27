"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

interface SearchProps {
  placeholder: string;
  search_query: string[];
}

const Search: React.FC<SearchProps> = ({ placeholder, search_query }) => {
  //変数の状態を保持しておく
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの送信を防止

    const form = new FormData(e.currentTarget);
    const search_query = form.get("search-query");
    const params = new URLSearchParams(searchParams);
    if (search_query) {
      params.set("search_query", search_query.toString());
    } else {
      params.delete("search_query");
    }
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={getSearch}>
      <div className="relative w-full my-3">
        <input
          type="search"
          name="search-query"
          className="block w-full p-3 ps-5 text-sm text-gray-900 border rounded-full bg-gray-50 focus:border-blue-500"
          placeholder={placeholder}
          defaultValue={search_query.join(" ")}
        />
        <button
          type="submit"
          className="absolute p-2 end-2 bottom-1.5 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none cursor-pointer"
        >
          <BiSearch size={18} />
        </button>
      </div>
    </form>
  );
};

export default Search;

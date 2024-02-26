"use client";

import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  total: number;
  current_page: number;
  properties_per_page: number;
  num_pages: number;
}

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

const Pagination: React.FC<PaginationProps> = ({
  total,
  current_page,
  properties_per_page,
  num_pages,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paginationCurrent_page, setPaginationCurrent_page] = useState(0);

  useEffect(() => {
    setPaginationCurrent_page(current_page);
  }, [current_page]);

  const handleClickNext = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const up_current_page = paginationCurrent_page + 1;
    if (up_current_page <= num_pages) {
      setPaginationCurrent_page(paginationCurrent_page + 1);
      const params = new URLSearchParams(searchParams);
      params.set("page", up_current_page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleClickPrevious = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const down_current_page = paginationCurrent_page - 1;
    if (down_current_page >= 1) {
      setPaginationCurrent_page(paginationCurrent_page - 1);
      const params = new URLSearchParams(searchParams);
      params.set("page", down_current_page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const onClick = (index: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", index.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center px-1 py-3 sm:pb-3 sm:px-6">
      <nav
        className="isolate inline-flex gap-2 sm:gap-2 -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={handleClickPrevious}
          className={`relative inline-flex justify-center items-center rounded-md ring-1 w-7 h-7 sm:h-8 sm:w-auto sm:pr-2
          ${
            current_page === 1
              ? "cursor-default bg-gray-200 ring-gray-400 text-gray-400"
              : "cursor-pointer ring-gray-500 text-gray-500 hover:bg-gray-200"
          }
          `}
          disabled={current_page === 1}
        >
          <MdKeyboardArrowLeft
            className="sm:h-6 sm:w-6 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden sm:block text-sm">前へ</span>
        </button>

        <>
          {range(1, num_pages).map((number, index) =>
            number == current_page ? (
              <span
                key={index}
                className="relative inline-flex justify-center items-center text-xs sm:text-sm font-semibold rounded-md ring-1 ring-blue-500 bg-blue-500 text-white w-7 h-7 sm:w-8 sm:h-8 focus:outline-offset-0"
              >
                {number}
              </span>
            ) : number == current_page - 1 ||
              number == current_page ||
              number == current_page + 1 ||
              number == 1 ||
              number == num_pages ||
              number === Math.floor(num_pages / 2) ? (
              <button
                key={index}
                className="relative inline-flex justify-center items-center text-xs sm:text-sm font-semibold rounded-md ring-1 ring-gray-500 w-7 h-7 sm:w-8 sm:h-8 text-gray-500 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                onClick={() => onClick(number)}
              >
                {number}
              </button>
            ) : number === 2 || number === num_pages - 1 ? (
              <span
                key={index}
                className="relative inline-flex items-center sm:p-1 text-xs sm:text-sm font-semibold text-gray-500 focus:outline-offset-0"
              >
                ...
              </span>
            ) : null
          )}
        </>

        <button
          onClick={handleClickNext}
          className={`relative inline-flex justify-center items-center rounded-md ring-1 sm:pl-2 w-7 h-7 sm:h-8 sm:w-auto focus:z-20 focus:outline-offset-0 ${
            current_page === num_pages
              ? "cursor-default bg-gray-200 ring-gray-400 text-gray-400"
              : "cursor-pointer ring-gray-500 text-gray-500 hover:bg-gray-200"
          }`}
          disabled={current_page === num_pages}
        >
          <span className="hidden sm:block text-sm">次へ</span>
          <MdKeyboardArrowRight
            className="sm:h-6 sm:w-6 h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

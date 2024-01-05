"use client";

import { useState, useEffect } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type Props = {
    total: number;
    current_page: number;
    properties_per_page: number;
    num_pages: number;
}

export default function Pagination({
    total,
    current_page,
    properties_per_page,
    num_pages,
}: Props) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [paginationCurrent_page, setPaginationCurrent_page] = useState(0);

    useEffect(() => {
        setPaginationCurrent_page(current_page)
    }, [current_page]);


    const handleClickNext = (e) => {
        const up_current_page = paginationCurrent_page + 1;
        if (up_current_page <= num_pages) {
            setPaginationCurrent_page(paginationCurrent_page + 1)
            const params = new URLSearchParams(searchParams);
            params.set('page', up_current_page.toString());
            router.push(`${pathname}?${params.toString()}`)
        }
    };

    const handleClickPrevious = (e) => {
        const down_current_page = paginationCurrent_page - 1;
        if (down_current_page >= 1) {
            setPaginationCurrent_page(paginationCurrent_page - 1)
            const params = new URLSearchParams(searchParams);
            params.set('page', down_current_page.toString());
            router.push(`${pathname}?${params.toString()}`)
        }
    };

    return (
        <div className="flex items-center justify-between border-gray-200 bg-white px-4 py-2 sm:px-6">
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
                        <span className="font-medium">{properties_per_page * (paginationCurrent_page - 1) + 1}件</span>から<span className="font-medium">{properties_per_page * (paginationCurrent_page - 1) + properties_per_page}件</span>の物件表示 (合計<span className="font-medium">{total}</span>件)
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
    );
}
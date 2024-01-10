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

const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

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


    const handleClickNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const up_current_page = paginationCurrent_page + 1;
        if (up_current_page <= num_pages) {
            setPaginationCurrent_page(paginationCurrent_page + 1)
            const params = new URLSearchParams(searchParams);
            params.set('page', up_current_page.toString());
            router.push(`${pathname}?${params.toString()}`)
        }
    };

    const handleClickPrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const down_current_page = paginationCurrent_page - 1;
        if (down_current_page >= 1) {
            setPaginationCurrent_page(paginationCurrent_page - 1)
            const params = new URLSearchParams(searchParams);
            params.set('page', down_current_page.toString());
            router.push(`${pathname}?${params.toString()}`)
        }
    };

    const onClick = (index: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', index.toString());
        router.push(`${pathname}?${params.toString()}`)

    };

    return (
        <div className="flex items-center justify-center px-4 py-3 sm:px-6">

            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm  bg-white" aria-label="Pagination">
                    <button onClick={handleClickPrevious}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <MdOutlineFirstPage className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div>
                        {range(1, num_pages).map((number, index) => (
                            (number == 1 || number == num_pages || number === Math.floor(num_pages / 2)) ? (
                                <button
                                    key={index}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => onClick(number)}
                                >
                                    {number}
                                </button>
                            ) : null
                        ))}
                    </div>

                    <button onClick={handleClickNext}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <MdOutlineLastPage className="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    );
}

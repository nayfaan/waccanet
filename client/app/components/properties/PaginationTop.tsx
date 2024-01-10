"use client";

import { useState, useEffect } from "react";

type Props = {
    total: number;
    current_page: number;
    properties_per_page: number;
    num_pages: number;
}

export default function PaginationTop({
    total,
    current_page,
    properties_per_page,
    num_pages,
}: Props) {

    const [paginationCurrent_page, setPaginationCurrent_page] = useState(0);
    useEffect(() => {
        setPaginationCurrent_page(current_page)
    }, [current_page]);


    return (
        <div className="flex items-center justify-end border-gray-200 bg-white px-4 py-2 sm:px-6">
            <div>
                <p className="text-sm text-gray-700">
                    <span className="font-medium">{properties_per_page * (paginationCurrent_page - 1) + 1}件</span>から<span className="font-medium">{properties_per_page * (paginationCurrent_page - 1) + properties_per_page}件</span>の物件表示 (合計<span className="font-medium">{total}</span>件)
                </p>
            </div>
        </div>
    );
}
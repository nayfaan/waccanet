"use client";

import { useRouter } from 'next/navigation'

export default function PreviousButton() {

    const router = useRouter()
    return (
        <button onClick={() => router.back()}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"        >
            戻る
        </button>
    );
}

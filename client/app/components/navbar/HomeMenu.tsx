"use client";

import { FaHome } from "react-icons/fa";

const HomeMenu = () => {
    return (
        <div className="flex flex-row items-center gap-1">
            <a href="/home" >
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    <FaHome size={25} />
                </div>
            </a>
        </div>
    );
};

export default HomeMenu;
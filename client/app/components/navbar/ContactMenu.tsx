"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avator from "@/app/Avator";

const ContactMenu = () => {
    return (
        <div className="flex flex-row items-center gap-3">
            <a href="developing" >
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    お問い合わせ
                </div>
            </a>
        </div>
    );
};

export default ContactMenu;
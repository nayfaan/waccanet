"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avator from "@/app/Avator";

const UserMenu = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
        Find Tenants
      </div>
      <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avator />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

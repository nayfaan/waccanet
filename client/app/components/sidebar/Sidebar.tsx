"use client";

import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { PiTrainSimple } from "react-icons/pi";
import { TfiAgenda } from "react-icons/tfi";
import Search from "../properties/Search";

const Sidebar = () => {
  return (
    <>
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <Search placeholder="Search..." />
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/developing"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <LiaMoneyCheckAltSolid size={20} />

                <span className="ms-3">価格</span>
              </a>
            </li>
            <li>
              <a
                href="/developing"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <PiTrainSimple size={20} />
                <span className="ms-3">最寄り駅</span>
              </a>
            </li>
            <li>
              <a
                href="/developing"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <TfiAgenda size={20} />
                <span className="ms-3">物件情報参照元</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

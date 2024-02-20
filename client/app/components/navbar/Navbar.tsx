"use client";

import { FiMenu, FiX } from "react-icons/fi";
import { PiSidebar } from "react-icons/pi";
import Image from "next/image";
import WaccanetLogo from "../../../public/favicon.ico";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";

const navigations = [
  { name: "物件新規登録", href: "/developing", current: false },
  { name: "サイト概要", href: "/about-our-site", current: false },
  { name: "お問い合わせ", href: "/contact-us", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <nav className="fixed flex justify-between items-center z-40 md:px-5 border-b-[1px] bg-white w-screen h-14">
        <div className="w-full flex items-center justify-between">
          {/* ----- Sidebar Open Button ----- */}
          <PiSidebar
            className="text-gray-600 m-2 md:hidden"
            size={24}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* ----- Logo ----- */}
          <a href="/" className="flex items-center justify-center">
            <Image src={WaccanetLogo} width={35} alt="Waccanet Logo" />
            <span className="ml-2 font-semibold text-xl tracking-widest">
              Waccanet
            </span>
          </a>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {navigations.map((nav) => (
                <li key={nav.name}>
                  <a
                    href={nav.href}
                    className={classNames(
                      nav.current
                        ? "bg-white "
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-semibold "
                    )}
                    aria-current={nav.current ? "page" : undefined}
                  >
                    {nav.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden flex flex-col items-center top-14">
            <div className="m-2" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
              {isNavbarOpen ? (
                <FiX
                  className="block h-6 w-6 text-gray-600 "
                  aria-hidden="true"
                  size={24}
                />
              ) : (
                <FiMenu
                  className="block h-6 w-6 text-gray-600 "
                  aria-hidden="true"
                  size={24}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar for Mobile */}
      {isNavbarOpen && (
        <div className="absolute z-50 text-base bg-white border-[0.5px] border-gray-100 rounded shadow top-12 right-1">
          <ul className="list-none flex flex-col" role="none">
            {navigations.map((nav) => (
              <li key={nav.name}>
                <a
                  href={nav.href}
                  className="block px-5 py-2 text-gray-600 hover:bg-gray-100"
                  role="menuitem"
                >
                  {nav.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
};

export default Navbar;

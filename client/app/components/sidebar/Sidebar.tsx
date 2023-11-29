"use client";

import { useState } from "react";
import { BsHouseDoor } from "react-icons/bs";

const Sidebar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const sideBarItems = [
    { name: "Furnished" },
    { name: "Has Image" },
    { name: "Pets ok" },
    { name: "No smoking" },
    { name: "Air conditioning" },
  ];

  const signIn = () => {
    console.log("signIn function called");
  };

  const logout = () => {
    console.log("logout function called");
  };
  return (
    <>
      {/* <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button> */}

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-50 w-56 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2 h-20 ml-5">
            <BsHouseDoor className="text-2xl font-bold" />
            <div className="text-xl font-bold">SCH</div>
          </div>

          <ul className="space-y-2 font-medium">
            {sideBarItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}

            <li onClick={isSignedIn ? logout : signIn}>
              <a
                href="#"
                className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {isSignedIn ? "Logout" : "Sign In"}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;

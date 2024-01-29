"use client";

import { Disclosure } from "@headlessui/react";
import { IoMdFunnel } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../../public/images/wacca_logo.png";
import Image from "next/image";

const navigation = [
  { name: "物件新規登録", href: "/developing", current: false },
  { name: "サイト概要", href: "/about-our-site", current: false },
  { name: "お問い合わせ", href: "/contact-us", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <>
      <Disclosure as="nav" className="md:px-5 border-b-[2px] bg-white h-14">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center h-full">
              {/* Mobile menu button */}

              <div className="p-2 flex md:hidden">
                {/* Mobile menu button */}
                {/* <IoMdFunnel
                  className="p-2
                    text-black hover:bg-gray-700 hover:text-white
                      rounded-md "
                  size={35}
                /> */}
              </div>

              <a
                href="/"
                className="p-2 
                      text-black
                        rounded-md "
                aria-current="page"
              >
                <Image src={Logo} alt="logo" width={80} height={25} />
              </a>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-white "
                          : "text-black hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-semibold "
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md bg-gray-800  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {open ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-white  border-b-[2px]">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-900 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;

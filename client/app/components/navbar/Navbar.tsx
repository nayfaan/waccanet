'use client';

import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ContactMenu from "./ContactMenu";
import AboutOurSiteMenu from "./AboutOurSiteMenu"
import Link from 'next/link';
import { Disclosure } from '@headlessui/react'
import { FaHome } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const navigation = [
  { name: '物件新規登録', href: '/developing', current: false },
  { name: 'サイト概要', href: '/about-our-site', current: false },
  { name: 'お問い合わせ', href: '/contact-us', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  return (
    <>
      <Disclosure as="nav" className="w-full sm:px-3 sm:py-1 md:px-8 md:py-2  border-b-[2px] bg-white">
        {({ open }) => (
          <>
            <div className=" flex justify-between  items-center  ">
              {/* <div >
                < HomeMenu />
              </div> */}

              <a
                href="/"
                className='p-2 
                      text-black hover:bg-gray-700 hover:text-white
                        rounded-md '

                aria-current='page'
              >
                <FaHome size={25} />

              </a>

              <div className="hidden md:block">

                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-white '
                          : 'text-black hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-semibold '
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {open ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
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

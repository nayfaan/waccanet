"use client";
import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ContactMenu from "./ContactMenu";
import Search from "./Search";


const Navbar = () => {
  return (
    <nav className="fixed clearfix px-1 md:px-8 py-3 border-b-[1px] top-0 right-0 z-40 w-full bg-white">
      <div className="flex float-left flex-row items-center  gap-1 md:gap-0">
        < HomeMenu />
      </div>
      <div className="flex float-right flex-row  items-center gap-4 md:gap-0">
        <PostMenu />
        <ContactMenu />
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;

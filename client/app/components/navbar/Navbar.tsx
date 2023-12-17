"use client";
import Container from "@/app/Container";
import HomeMenu from "./HomeMenu";
import PosttMenu from "./PosttMenu";
import ContactMenu from "./ContactMenu";
import Search from "./Search";
import UserMenu from "./UserMenu";


const Navbar = () => {
  return (
    <nav className="fixed clearfix px-1 md:px-8 py-3 border-b-[1px] top-0 right-0 z-40 w-full bg-white">
      <Container>
        <div className="flex float-left flex-row items-center  gap-1 md:gap-0">
          < HomeMenu />
        </div>
        <div className="flex float-right flex-row  items-center gap-4 md:gap-0">
          <PosttMenu />
          <ContactMenu />
          <Search />
          {/* <UserMenu /> */}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

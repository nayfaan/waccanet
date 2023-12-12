"use client";
import Container from "@/app/Container";
import UserMenu from "./UserMenu";
import Search from "./Search";
import ContactMenu from "./ContactMenu";

const Navbar = () => {
  return (
    <nav className="fixed px-1 md:px-8 py-4 border-b-[1px] top-0 right-0 z-40 w-full bg-white">
      <Container>
        <div className="flex flex-row items-center justify-end gap-3 md:gap-0">
          <ContactMenu />
          <Search />
          {/* <UserMenu /> */}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

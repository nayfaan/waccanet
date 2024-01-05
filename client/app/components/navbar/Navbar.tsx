import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ContactMenu from "./ContactMenu";

const Navbar = () => {
  return (
    <nav className="fixed flex justify-between px-1 md:px-8 py-4 items-center top-0 border-b-[2px] w-full bg-white">
      <div >
        < HomeMenu />
      </div>
      <div className="flex">
        <PostMenu />
        <ContactMenu />
      </div>
    </nav>

  );
};

export default Navbar;

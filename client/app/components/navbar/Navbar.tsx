import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ContactMenu from "./ContactMenu";
import AboutOurSiteMenu from "./AboutOurSiteMenu"
import Pagination from "@/app/components/properties/Pagination";
import Search from "@/app/components/properties/Search";

const Navbar = () => {
  return (
    <>
      <nav className="w-full md:px-8 py-2  border-b-[2px] bg-white">
        <div className=" flex justify-between  items-center  ">
          <div >
            < HomeMenu />
          </div>
          <div className="flex">
            <PostMenu />
            <AboutOurSiteMenu />
            <ContactMenu />
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;

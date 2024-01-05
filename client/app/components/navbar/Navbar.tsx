import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ContactMenu from "./ContactMenu";
import Pagination from "@/app/components/properties/Pagination";
import Search from "@/app/components/properties/Search";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full md:px-8 py-2  border-b-[2px] bg-white">
        <div className=" flex justify-between  items-center  ">
          <div >
            < HomeMenu />
          </div>
          <div className="flex">
            <PostMenu />
            <ContactMenu />
          </div>
        </div>

        <Search placeholder="Search..." />
        {/* <Pagination total={60} current_page={currentPage} properties_per_page={20} num_pages={2} /> */}
      </nav>
    </>
  );
};

export default Navbar;

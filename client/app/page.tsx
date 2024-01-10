import { Property, PaginationProperties } from "@/app/types/types";
import PropertiesList from "./components/properties/PropertiesList";
import Search from "./components/properties/Search";
import Pagination from "./components/properties/Pagination"
import PaginationTop from "./components/properties/PaginationTop";
import { fetchPropertyListSearchPagination } from "./lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.search_query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const paginationPropertiesData: PaginationProperties = await fetchPropertyListSearchPagination(query, currentPage);

  const paginationTotal = paginationPropertiesData.total;
  const paginationCurrent_page = paginationPropertiesData.current_page;
  const paginationProperties_per_page = paginationPropertiesData.properties_per_page;
  const paginationNum_pages = paginationPropertiesData.num_pages;

  return (
    <>
      <main>

        <div className="fixed z-50 w-full bg-white shadow-md py-2 px-6">
          <Search placeholder="Search..." />
          <PaginationTop total={paginationTotal} current_page={paginationCurrent_page} properties_per_page={paginationProperties_per_page} num_pages={paginationNum_pages} />
        </div>

        {/* Show Properties Data */}
        <div className="pt-36 pb-12">
          <PropertiesList propertiesData={paginationPropertiesData.results} />
        </div >

        <Pagination total={paginationTotal} current_page={paginationCurrent_page} properties_per_page={paginationProperties_per_page} num_pages={paginationNum_pages} />

      </main>
    </>
  );
}

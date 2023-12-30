import { Property, PaginationProperties } from "@/app/types/types";
import PropertiesList from "./components/properties/PropertiesList";
import Search from "./components/properties/Search";
import Pagination from "./components/properties/Pagination"
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
    <main className="relative h-full top-20">
      <Search placeholder="Search..." />
      <Pagination total={paginationTotal} current_page={paginationCurrent_page} properties_per_page={paginationProperties_per_page} num_pages={paginationNum_pages} />
      {/* Show Properties Data */}
      <PropertiesList propertiesData={paginationPropertiesData.results} />
    </main>
  );
}

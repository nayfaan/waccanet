import { Property, PaginationProperties } from "@/app/types/types";
import PropertiesList from "./PropertiesList";
import Search from "./Search";
import Pagination from "./Pagination";
import PaginationTop from "./PaginationTop";
import { fetchPropertyListSearchPagination } from "../../lib/data";

type Props = {
  search_query: string;
  page: number;
};

export default async function Home({ search_query, page }: Props) {
  const paginationPropertiesData: PaginationProperties =
    await fetchPropertyListSearchPagination(search_query, page);

  const paginationTotal = paginationPropertiesData.total;
  const paginationCurrent_page = paginationPropertiesData.current_page;
  const paginationProperties_per_page =
    paginationPropertiesData.properties_per_page;
  const paginationNum_pages = paginationPropertiesData.num_pages;

  return (
    <>
      <main>
        <div className="bg-white p-1 sm:px-6">
          <Search placeholder="Search..." />
          <PaginationTop
            total={paginationTotal}
            current_page={paginationCurrent_page}
            properties_per_page={paginationProperties_per_page}
            num_pages={paginationNum_pages}
          />
        </div>

        {/* Show Properties Data */}
        <PropertiesList propertiesData={paginationPropertiesData.results} />

        <Pagination
          total={paginationTotal}
          current_page={paginationCurrent_page}
          properties_per_page={paginationProperties_per_page}
          num_pages={paginationNum_pages}
        />
      </main>
    </>
  );
}

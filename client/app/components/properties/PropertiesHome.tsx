import { PaginationProperties } from "@/app/types/types";
import PropertiesList from "./PropertiesList";
import Pagination from "./Pagination";
import PaginationTop from "./PaginationTop";
import { fetchPropertyListSearchPagination } from "../../lib/data";
import { Suspense } from "react";
import Sidebar from "../sidebar/Sidebar";

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
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72 min-h-screen flex flex-col justify-between">
      <Sidebar />
      <div>
        <div className="p-1 sm:px-6 min-w-screen">
          <PaginationTop
            total={paginationTotal}
            current_page={paginationCurrent_page}
            properties_per_page={paginationProperties_per_page}
            num_pages={paginationNum_pages}
          />
        </div>

        {/* Show Properties Data */}
        <PropertiesList propertiesData={paginationPropertiesData.results} />
      </div>

      <Suspense>
        <Pagination
          total={paginationTotal}
          current_page={paginationCurrent_page}
          properties_per_page={paginationProperties_per_page}
          num_pages={paginationNum_pages}
        />
      </Suspense>
    </main>
  );
}

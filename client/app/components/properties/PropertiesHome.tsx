import PropertiesList from "./PropertiesList";
import Loading from "@/app/loading";
import { Suspense } from "react";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

import { PaginationProperties } from "@/app/types/types";
import React from "react";
import { fetchPropertyListPagination } from "../../lib/data";
import PaginationTop from "./PaginationTop";
import Pagination from "./Pagination";

interface PropertiesHomeProps {
  search_query: string;
  price_from: string;
  price_to: string;
  areas: string;
  reference: string;
  page: number;
}

const PropertiesHome: React.FC<PropertiesHomeProps> = async ({
  search_query,
  price_from,
  price_to,
  areas,
  reference,
  page,
}) => {
  const paginationPropertiesData: PaginationProperties =
    await fetchPropertyListPagination(
      search_query,
      price_from,
      price_to,
      areas,
      reference,
      page
    );

  return (
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72 flex flex-col justify-between pt-14">
      <Sidebar />

      <div className="flex flex-col justify-between h-full">
        <div className="p-1 sm:px-6 min-w-screen">
          <PaginationTop
            total={paginationPropertiesData.total}
            current_page={paginationPropertiesData.current_page}
            properties_per_page={paginationPropertiesData.properties_per_page}
            num_pages={paginationPropertiesData.num_pages}
          />
        </div>
        <Suspense
          key={`${search_query}-${price_from}-${price_to}-${areas}-${reference}-${page}`}
          fallback={<Loading />}
        >
          <PropertiesList properties={paginationPropertiesData.results} />
        </Suspense>
        <Pagination
          total={paginationPropertiesData.total}
          current_page={paginationPropertiesData.current_page}
          properties_per_page={paginationPropertiesData.properties_per_page}
          num_pages={paginationPropertiesData.num_pages}
        />
      </div>
      <Footer />
    </main>
  );
};

export default PropertiesHome;

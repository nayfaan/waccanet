import { PaginationProperties } from "@/app/types/types";
import React from "react";
import { fetchPropertyListPagination } from "../../lib/data";
import PropertyCard from "./PropertyCard";
import EmptyState from "../EmptyState";
import PaginationTop from "./PaginationTop";
import Pagination from "./Pagination";

type Props = {
  search_query: string;
  price_from: string;
  price_to: string;
  areas: string;
  reference: string;
  page: number;
};

async function PropertiesList({
  search_query,
  price_from,
  price_to,
  areas,
  reference,
  page,
}: Props) {
  const paginationPropertiesData: PaginationProperties =
    await fetchPropertyListPagination(
      search_query,
      price_from,
      price_to,
      areas,
      reference,
      page
    );

  const paginationTotal = paginationPropertiesData.total;
  const paginationCurrent_page = paginationPropertiesData.current_page;
  const paginationProperties_per_page =
    paginationPropertiesData.properties_per_page;
  const paginationNum_pages = paginationPropertiesData.num_pages;

  return (
    <>
      <div className="p-1 sm:px-6 min-w-screen">
        <PaginationTop
          total={paginationTotal}
          current_page={paginationCurrent_page}
          properties_per_page={paginationProperties_per_page}
          num_pages={paginationNum_pages}
        />
      </div>
      <div>
        {paginationPropertiesData.results.length === 0 ? (
          <EmptyState
            title="物件"
            message="再度条件を設定するか、下のボタンでホームへ戻ってください。"
          />
        ) : (
          <div className="flex flex-wrap justify-center mx-1">
            {paginationPropertiesData.results.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        total={paginationTotal}
        current_page={paginationCurrent_page}
        properties_per_page={paginationProperties_per_page}
        num_pages={paginationNum_pages}
      />
    </>
  );
}

export default PropertiesList;

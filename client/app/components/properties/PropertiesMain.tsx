import React from "react";
import { PaginationProperties } from "@/app/types/types";
import { fetchPropertyListPagination } from "../../lib/data";
import PaginationTop from "../pagination/PaginationTop";
import PropertiesList from "./PropertiesList";
import Pagination from "../pagination/Pagination";

interface PropertiesMainProps {
  query: string;
}

const PropertiesMain: React.FC<PropertiesMainProps> = async ({ query }) => {
  const paginationPropertiesData: PaginationProperties =
    await fetchPropertyListPagination(query);

  return (
    <div>
      {paginationPropertiesData.results.length > 0 && (
        // 物件データがない時は表示しない
        <div className="p-1 sm:px-6 min-w-screen">
          <PaginationTop
            total={paginationPropertiesData.total}
            current_page={paginationPropertiesData.current_page}
            properties_per_page={paginationPropertiesData.properties_per_page}
          />
        </div>
      )}

      <PropertiesList properties={paginationPropertiesData.results} />

      {paginationPropertiesData.results.length > 0 && (
        // 物件データがない時は表示しない
        <Pagination
          total={paginationPropertiesData.total}
          current_page={paginationPropertiesData.current_page}
          properties_per_page={paginationPropertiesData.properties_per_page}
          num_pages={paginationPropertiesData.num_pages}
        />
      )}
    </div>
  );
};

export default PropertiesMain;

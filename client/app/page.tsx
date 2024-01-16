import PropertiesHome from "@/app/components/properties/PropertiesHome";
import Loading from "./loading";
import { Suspense } from "react";

export default function ({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    page?: string;
  };
}) {


  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.search_query || '';

  return (
    <Suspense key={`${searchParams?.search_query}-${searchParams?.page}`} fallback={<Loading />}>
        <PropertiesHome page={currentPage} search_query={query} />
    </Suspense>
  );
}

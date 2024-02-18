import PropertiesHome from "@/app/components/properties/PropertiesHome";

export default function page({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    filter_query?: string;
    page?: string;
  };
}) {
  const search_query = searchParams?.search_query || "";
  const filter_query = searchParams?.filter_query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <PropertiesHome
      page={currentPage}
      search_query={search_query}
      filter_query={filter_query}
    />
  );
}

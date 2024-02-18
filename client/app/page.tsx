import PropertiesHome from "@/app/components/properties/PropertiesHome";

export default function page({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    areas?: string;
    reference?: string;
    page?: string;
  };
}) {
  const search_query = searchParams?.search_query || "";
  const areas = searchParams?.areas || "";
  const reference = searchParams?.reference || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <PropertiesHome
      search_query={search_query}
      areas={areas}
      reference={reference}
      page={currentPage}
    />
  );
}

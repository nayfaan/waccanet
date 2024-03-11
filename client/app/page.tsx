import PropertiesHome from "@/app/components/properties/PropertiesHome";

export default function page({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    price_from?: string;
    price_to?: string;
    areas?: string;
    references?: string;
    page?: string;
  };
}) {
  const search_query = searchParams?.search_query || "";
  const areas = searchParams?.areas || "";
  const price_from = searchParams?.price_from || "0";
  const price_to = searchParams?.price_to || "99999";
  const reference = searchParams?.references || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <PropertiesHome
      search_query={search_query}
      price_from={price_from}
      price_to={price_to}
      areas={areas}
      reference={reference}
      page={currentPage}
    />
  );
}

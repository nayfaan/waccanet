import PropertiesHome from "@/app/components/properties/PropertiesHome";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <PropertiesHome searchParams={searchParams} />;
}

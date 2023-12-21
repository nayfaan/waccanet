import PropertiesList from "./components/properties/PropertiesList";
import { getAllProperties } from "./actions/getAllProperties";
import { PaginationProperties } from "./types/types";

export default async function Home() {
  const paginationPropertiesData: PaginationProperties = await getAllProperties();
  console.log(paginationPropertiesData);

  return (
    <main className="relative h-full top-20">
      <PropertiesList propertiesData={paginationPropertiesData.results} />
    </main>
  );
}

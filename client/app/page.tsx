import PropertiesList from "./components/properties/PropertiesList";
import { getAllProperties } from "./actions/getAllProperties";
import { AllData } from "./types/types";

export default async function Home() {
  const allData: AllData = await getAllProperties();
  console.log(allData);

  return (
    <main className="relative h-full top-20">
      <PropertiesList allData={allData.results} />
    </main>
  );
}

import ClientOnly from "./ClientOnly";
import Container from "./Container";
import PropertiesList from "./components/properties/PropertiesList";
import { getAllProperties } from "./actions/getAllProperties";
import { AllData } from "./types/types";

export default async function Home() {
  const allData: AllData = await getAllProperties();
  console.log(allData);

  return (
    <ClientOnly>
      <Container>
        <main className="relative h-full top-20">
          <PropertiesList allData={allData} />
        </main>
      </Container>
    </ClientOnly>
  );
}

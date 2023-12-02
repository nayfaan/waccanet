import ClientOnly from "./ClientOnly";
import Container from "./Container";
import PropertiesList from "./components/properties/PropertiesList";
import { getAllProperties } from "./actions/getAllProperties";
import { Property } from "./types/types";

export default async function Home() {
  const properties: Property[] = await getAllProperties();
  // const properties: Property[] = [];

  return (
    <ClientOnly>
      <Container>
        {/* <main className="relative h-full top-20 ml-0 md:ml-56 overflow-y-auto"> */}
        <main className="relative h-full top-20">
          <PropertiesList properties={properties} />
        </main>
      </Container>
    </ClientOnly>
  );
}

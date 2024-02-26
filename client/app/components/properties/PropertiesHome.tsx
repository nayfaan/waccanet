import React from "react";
import { Suspense } from "react";
import Loading from "@/app/loading";
import PropertiesMain from "@/app/components/properties/PropertiesMain";
import Footer from "../footer/Footer";
import SidebarProvider from "../sidebar/SidebarProvider";

interface PropertiesHomeProps {
  search_query: string;
  price_from: string;
  price_to: string;
  areas: string;
  reference: string;
  page: number;
}

const PropertiesHome: React.FC<PropertiesHomeProps> = async ({
  search_query,
  price_from,
  price_to,
  areas,
  reference,
  page,
}) => {
  return (
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72 min-h-screen flex flex-col justify-between pt-14">
      <SidebarProvider />
      <Suspense
        key={`${search_query}-${price_from}-${price_to}-${areas}-${reference}-${page}`}
        fallback={<Loading />}
      >
        <PropertiesMain
          search_query={search_query}
          price_from={price_from}
          price_to={price_to}
          areas={areas}
          reference={reference}
          page={page}
        />
      </Suspense>

      <Footer />
    </main>
  );
};

export default PropertiesHome;

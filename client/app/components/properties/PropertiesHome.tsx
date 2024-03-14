import React from "react";
import { Suspense } from "react";
import Loading from "@/app/loading";
import PropertiesMain from "@/app/components/properties/PropertiesMain";
import Footer from "../footer/Footer";
import SidebarProvider from "../sidebar/SidebarProvider";

export default function PropertiesHome({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let query = "";
  for (const key in searchParams) {
    if (Object.hasOwnProperty.call(searchParams, key)) {
      const value = searchParams[key];
      query += `${key}=${value}&`;
    }
  }
  if (query.slice(-1) == "&") {
    query = query.slice(0, -1);
  }

  return (
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72 min-h-screen flex flex-col justify-between pt-14">
      <SidebarProvider />
      <Suspense key={`${query}`} fallback={<Loading />}>
        <PropertiesMain query={query} />
      </Suspense>
      <Footer />
    </main>
  );
}

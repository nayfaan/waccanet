import PropertiesList from "./PropertiesList";
import Loading from "@/app/loading";
import { Suspense } from "react";
import Sidebar from "../sidebar/Sidebar";

type Props = {
  search_query: string;
  price_from: string;
  price_to: string;
  areas: string;
  reference: string;
  page: number;
};

export default async function Home({
  search_query,
  price_from,
  price_to,
  areas,
  reference,
  page,
}: Props) {
  return (
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72 min-h-screen flex flex-col justify-between">
      <Sidebar />

      <Suspense
        key={`${search_query}-${price_from}-${price_to}-${areas}-${reference}-${page}`}
        fallback={<Loading />}
      >
        <PropertiesList
          search_query={search_query}
          price_from={price_from}
          price_to={price_to}
          areas={areas}
          reference={reference}
          page={page}
        />
      </Suspense>
    </main>
  );
}

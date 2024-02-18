import PropertiesList from "./PropertiesList";
import Loading from "@/app/loading";
import { Suspense } from "react";
import Sidebar from "../sidebar/Sidebar";

type Props = {
  search_query: string;
  filter_query: string;
  page: number;
};

export default async function Home({
  search_query,
  filter_query,
  page,
}: Props) {
  return (
    <main className="bg-gray-50 relative overflow-y-auto md:ml-72">
      <Sidebar />

      <Suspense
        key={`${search_query}-${filter_query}-${page}`}
        fallback={<Loading />}
      >
        <PropertiesList
          search_query={search_query}
          filter_query={filter_query}
          page={page}
        />
      </Suspense>
    </main>
  );
}

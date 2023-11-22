"use client";
import { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import Container from "./Container";

export default function Home() {
  // const [apiData, setApiData] = useState([]);

  // useEffect(() => {
  //   const getAllData = async () => {
  //     const res = await fetch(
  //       "http://localhost:8000/property/propertiesGetAll/"
  //     );
  //     const data = await res.json();

  //     setApiData(data);
  //   };

  //   getAllData();
  // }, []);

  // useEffect(() => {
  //   console.log(apiData);
  // }, [apiData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
    </main>
  );
}

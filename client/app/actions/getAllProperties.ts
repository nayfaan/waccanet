import { PaginationProperties } from "../types/types";

export const getAllProperties = async (): Promise<PaginationProperties> => {
  try {
    const res = await fetch("http://172.30.0.3:8000/property/propertiesInfo", { cache: "no-store" });
    const data: PaginationProperties = await res.json();

    return data;
  } catch (error: any) {
    console.error("Error in getAllProperties:", error.message);
    return {
      count: 0,
      next: "",
      previous: "",
      results: [],
    };
  }
};

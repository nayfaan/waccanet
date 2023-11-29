import axios from "axios";
import { Property } from "../types/types";

export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const res = await fetch("http://localhost:8000/property/propertiesGetAll");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: Property[] = await res.json();

    return data;
  } catch (error: any) {
    console.error("Error in getAllProperties:", error.message);

    return [];
  }
};

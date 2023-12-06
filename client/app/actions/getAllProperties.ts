import axios, { AxiosResponse } from "axios";
import { AllData } from "../types/types";

export const getAllProperties = async (): Promise<AllData> => {
  try {
    const response: AxiosResponse<AllData> = await axios.get(
      "http://172.30.0.3:8000/property/propertiesInfo"
    );

    return response.data;
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

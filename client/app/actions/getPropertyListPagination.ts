import { PaginationProperties } from "../types/types";

export const getPropertyListPagination = async (limit: number, offset: number) => {
    try {
        const API_link = "http://localhost:8000/property/propertiesInfo/";
        const apt_link = `${API_link}?limit=${limit}&offset=${offset}`
        const res = await fetch(apt_link, { cache: "no-store" });
        const data: PaginationProperties = await res.json();

        if (res.status === 404) {
            throw new Error("Failed to fetch");
        }
        return data.results
    }
    catch (error: any) {
        throw new Error("Failed to fetch");
    }
};

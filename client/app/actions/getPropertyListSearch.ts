import { Property } from "../types/types";

export const getPropertyListSearch = async (slug: string) => {
    try {
        const API_link = "http://localhost:8000/property/propertiesInfo/";
        const apt_link = `${API_link}${slug}`
        const res = await fetch(apt_link, { cache: "no-store" });
        const data: Property = await res.json();

        if (res.status === 404) {
            throw new Error("Failed to fetch");
        }
        return data
    }
    catch (error: any) {
        throw new Error("Failed to fetch");
    }
};
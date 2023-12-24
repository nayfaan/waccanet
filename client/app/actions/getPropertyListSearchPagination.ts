import { PaginationProperties } from "../types/types";

export const getPropertyListSearchPagination = async (search_query: string, page: number) => {
    try {

        const api_server_link = "http://localhost:8000/property/apis/property_search/";
        const apt_query = `${api_server_link}?search_query=${search_query}&page=${page}`
        console.log("API ULR is");
        console.log(apt_query);

        const res = await fetch(apt_query, { cache: "no-store" });
        const data: PaginationProperties = await res.json();

        if (res.status === 404) {
            throw new Error("Failed to fetch");
        }
        return data
    }
    catch (error: any) {
        throw new Error("Failed to fetch");
    }
};

import {
    Property,
    PaginationProperties,
} from "../types/types";

export async function fetchPropertyListSearchPagination(search_query: string, page: number) {
    try {
        const api_server_link = process.env.api_server_link
        const headers = { 'X-Api-Key': process.env.X_Api_Key }
        const apt_query = `${api_server_link}/property/apis/property_search/?search_query=${search_query}&page=${page}`
        const res = await fetch(apt_query, { cache: "no-store", headers: headers });
        const data: PaginationProperties = await res.json();
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch properties data.');
    }
}

export async function fetchPropertyDetail(slug: string) {
    try {
        const api_server_link = process.env.api_server_link
        const headers = { 'X-Api-Key': process.env.X_Api_Key }
        const apt_query = `${api_server_link}/property/apis/${slug}`
        const res = await fetch(apt_query, { cache: "no-store", headers: headers });
        const data: Property = await res.json();
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch property detail.');
    }
}




import {
    Property,
    PaginationProperties,
} from "../types/types";

export async function fetchPropertyListSearchPagination(search_query: string, page: number) {
    try {
        const api_server_link = process.env.api_server_link
        const headers: Record<string, string> = {};
        const X_Api_Key = process.env.X_Api_Key;
        if (X_Api_Key) {
            headers['X-Api-Key'] = X_Api_Key;
        } else {
            console.error('X_Api_Key is missing or undefined.'); // X_Api_Keyが存在しない場合のエラー処理
            throw new Error('X_Api_Key is missing or undefined.');
        }
        const apt_query = `${api_server_link}/property/apis/property_search/?search_query=${search_query}&page=${page}`
        const res = await fetch(apt_query, { cache: "no-store", headers: headers });
        if (!res.ok) {
            // エラー処理
            console.error('Request failed with status:', res.status);
            throw new Error('Request failed with status:');
        }
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
        const headers: Record<string, string> = {};
        const X_Api_Key = process.env.X_Api_Key;
        if (X_Api_Key) {
            headers['X-Api-Key'] = X_Api_Key;
        } else {
            console.error('X_Api_Key is missing or undefined.'); // X_Api_Keyが存在しない場合のエラー処理
            throw new Error('X_Api_Key is missing or undefined.');
        }
        const apt_query = `${api_server_link}/property/apis/property_id/?id=${slug}`
        const res = await fetch(apt_query, { cache: "no-store", headers: headers });
        if (!res.ok) {
            // エラー処理
            console.error('Request failed with status:', res.status);
            throw new Error('Request failed with status:');
        }
        const data: Property = await res.json();
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch property detail.');
    }
}



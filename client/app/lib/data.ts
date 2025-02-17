
import {
    Property,
    PaginationProperties,
    PropertyExistResponse,
} from "../types/types";

export async function fetchPropertyListPagination(query: string) {
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
        const apt_query = `${api_server_link}/property/apis/properties_info_get/?${query}`
        // const res = await fetch(apt_query, { headers: headers, next: {revalidate: 3600} });
        // const res = await fetch(apt_query, { headers: headers, next: {revalidate: 10800} });
        const res = await fetch(apt_query, { headers: headers, cache: 'no-store'  });

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
        // const apt_query = `${api_server_link}/property/apis/property_id/?id=${slug}`
        const apt_query = `${api_server_link}/property/apis/${slug}/`

        // const res = await fetch(apt_query, { headers: headers, next: {revalidate: 3600} });
        const res = await fetch(apt_query, {  headers: headers });
        
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

export async function fetchPropertyExist(slug: string) {
    // await new Promise(resolve => setTimeout(resolve, 5000));
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

        const apt_query = `${api_server_link}/property/apis/${slug}/property_exists/`
        const res = await fetch(apt_query, {  headers: headers,  cache: 'no-store'  });

        
        if (!res.ok) {
            // エラー処理
            console.error('Request failed with status:', res.status);
            throw new Error('Request failed with status:');
        }
        const data: PropertyExistResponse = await res.json();
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch property detail.');
    }
}

export async function fetchPropertyWatch() {
    return  0
}

export async function fetchPropertyBad() {
    return  0
}
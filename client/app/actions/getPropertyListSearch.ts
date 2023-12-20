import { Property } from "../types/types";

export const getPropertyListSearch = async (slug: string) => {
    try {
        // const API_link = "http://172.30.0.3:8000/property/propertiesInfo/";
        // const apt_link = `${API_link}${slug}`
        const API_link = "http://172.30.0.3:8000/property/propertiesInfo/get_all_data/";
        const apt_link = API_link
        console.log(apt_link);

        const res = await fetch(apt_link, { cache: "no-store" });
        const data: Property = await res.json();
        console.log("接続先のサーバ詳細");
        // console.log(apt_link);

        // const res = await fetch(apt_link);
        // const data: Property = await res.json();

        if (res.status === 404) {
            throw new Error("Failed to fetch");
        }
        return data
    }
    catch (error: any) {
        throw new Error("Failed to fetch");
    }
};

"use client";
import { Property } from "../types/types";
import { getPropertyDetail } from "@/app/actions/getPropertyDetail";
import { CiAlarmOn } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";



export default async function PropertyDetail({ params }: { params: { slug: string } }) {

    const property: Property = await getPropertyDetail(params.slug);
    const formattedImg_name = property.images.length > 0 ? property.images[0].image : '/images/defaultImg.png';
    const formattedImg = formattedImg_name.replace("172.30.0.3", "localhost");
    const dateObject = new Date(property.pub_date);
    const options = {
        month: "2-digit" as const,
        day: "2-digit" as const,
        year: "numeric" as const,
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: true,
        timeZone: "America/Vancouver",
    };

    const vancouverDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObject
    );

    const dateParts = vancouverDate.split(/[.,/ :]+/);

    const month = dateParts[0].padStart(2, "0");
    const day = dateParts[1].padStart(2, "0");
    let hour = parseInt(dateParts[3]);
    hour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    const minute = dateParts[4].padStart(2, "0");
    const formattedDate = `${dateParts[2]}/${month}/${day} ${ampm}${hour}:${minute}`;


    return (
        <>
            <div className=" z-50 f-full w-full">
                <main className=" p-6   bg-slate-50	flex   ">
                    <div>
                        <a href="#" className="">
                            <img
                                className="rounded-t-lg min-w-ful h-48 object-cover"
                                src={formattedImg || "/images/defaultImg.png"}
                                width="400"
                                height="380"
                                alt={`Image of ${property.name}`}
                            />
                        </a>

                        <div className="p-3  flex flex-col ">
                            <div className="flex items-center gap-1">
                                <CiAlarmOn className="text-blue-600" />
                                <span className="text-xs font-thin">{formattedDate}</span>
                            </div>
                            <h5 className="text-md font-semibold tracking-tight text-gray-900 leading-tight">
                                {property.name}
                            </h5>
                            <div className="p-1">
                                価格：${property.price}
                            </div>
                            <p>詳細</p>
                            <p class=" whitespace-pre-wrap">{property.description}</p>

                            <div className="flex items-center gap-1">
                                <TfiAgenda className="text-green-600" />
                                <span className="font-light">{property.reference}</span>
                            </div>


                        </div>
                        <a
                            href="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            物件一覧へ
                        </a>
                    </div>

                </main>
            </div>

        </>
    );
}




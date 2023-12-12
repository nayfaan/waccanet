"use client";
import React from "react";
import { Property } from "@/app/types/types";
import { CiAlarmOn } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
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
    <div className="flex flex-col justify-between max-w-[300px] m-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <a href="#" className="relative">
          <div className="absolute top-0 left-0 bg-white py-1 px-2 rounded-lg ">
            ${property.price}
          </div>
          <img
            className="rounded-t-lg min-w-ful h-48 object-cover"
            src={formattedImg || "/images/defaultImg.png"}
            width="300"
            height="280"
            alt={`Image of ${property.name}`}
          />
        </a>
        <div className="p-3 w-full flex flex-col justify-start">
          <div className="flex items-center gap-1">
            <CiAlarmOn className="text-blue-600" />
            <span className="text-xs font-thin">{formattedDate}</span>
          </div>
          <h5 className="text-md font-semibold tracking-tight text-gray-900 leading-tight h-20 ">
            {property.name}
          </h5>

          <div className="flex items-center gap-1">
            <SlLocationPin className="text-red-600" />
            <span className="font-light">{property.address}</span>
          </div>

          <div className="flex items-center gap-1">
            <TfiAgenda className="text-green-600" />
            <span className="font-light">{property.reference}</span>
          </div>
        </div>
      </div>
      <a
        href={`/${property.id}`}
        className="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm mt-2 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        詳細
      </a>
    </div>
  );
};

export default PropertyCard;

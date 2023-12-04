"use client";
import React from "react";
import { Property } from "@/app/types/types";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const newImg = property.imags?.replace("172.30.0.3", "localhost");

  return (
    <div className="flex flex-col justify-between max-w-[300px] m-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <a href="#" className="relative">
          <div className="absolute top-0 left-0 bg-white py-1 px-2 rounded-lg ">
            ${property.price}
          </div>
          <img
            className="rounded-t-lg min-w-ful h-48 object-cover"
            src={newImg || "/images/defaultImg.png"}
            width="300"
            height="280"
            alt={`Image of ${property.name}`}
          />
        </a>
        <div className="p-3 w-full flex flex-col justify-start">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 ">
            {property.name}
          </h5>

          <div className="flex items-center gap-1">
            <SlLocationPin className="text-red-600" />
            <span className="font-light">{property.address}</span>
          </div>

          <div className="flex items-center gap-1">
            <SlCalender className="text-green-600" />
            <span className="font-light">Available from January 1</span>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm mt-2 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Contact
      </a>
    </div>
  );
};

export default PropertyCard;

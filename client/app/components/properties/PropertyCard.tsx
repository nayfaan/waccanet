"use client";
import React from "react";
import { Property } from "@/app/types/types";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const newImg = property.imags?.replace("172.30.0.3", "localhost");

  console.log(newImg);

  return (
    <div className="w-full flex flex-col justify-between max-w-xs m-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="relative">
        <div className="absolute top-0 left-0 bg-white py-1 px-2 rounded-lg ">
          ${property.price}
        </div>
        <Image
          className="rounded-t-lg"
          src="/images/defaultImg.png"
          width="350"
          height="300"
          alt={`Image of ${property.name}`}
        />
      </a>
      <div className="p-3 w-full flex flex-col justify-start items-stretch">
        <a href="#">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 ">
            {property.name}
          </h5>
        </a>

        <div className="flex items-center gap-1">
          <SlLocationPin className="text-red-600" />
          <span className="font-light">{property.address}</span>
        </div>

        <div className="flex items-center gap-1">
          <SlCalender className="text-green-600" />
          <span className="font-light">Available from January 1</span>
        </div>
        <a
          href="#"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm mt-2 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;

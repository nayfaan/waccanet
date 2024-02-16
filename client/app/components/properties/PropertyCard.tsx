import React from "react";
import { Property } from "@/app/types/types";
import { CiAlarmOn } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
import Image from "next/image";
import DefaultImage from "../../../public/images/defaultImg.png";
import Button from "../Button";
import {
  getFormattedDate,
  getFormattedImages,
  getPriceColor,
  getTruncatedText,
} from "@/app/format/formattedData";
import ImageSlider from "./ImageSlider";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formattedDate = getFormattedDate(property.pub_date);
  const priceColor = getPriceColor(property.price);
  const formattedImgs = getFormattedImages(property.images);
  const truncatedDescription = getTruncatedText(property.description, 50);


  return (
    <div className="flex flex-col w-[290px] lg:w-[260px] m-1 bg-white border border-gray-200 rounded-lg shadow">
      <div className="relative">
        <div
          className={`absolute z-40 top-0 left-0 border-2 ${priceColor} py-1 px-2 rounded-lg ${
            property.price <= 1000 && property.price >= 400
              ? "text-white border-white"
              : "text-gray-900 border-gray-900"
          }`}
        >
          ${property.price}
        </div>
        {property.images.length > 0 ? (
          <ImageSlider images={formattedImgs} name={property.name} small />
        ) : (
          <Image
            src={DefaultImage}
            alt="Default Image"
            className="rounded-t-lg min-w-ful h-48 object-cover"
            width="300"
            height="280"
          />
        )}
      </div>
      <div className="p-2 w-full h-full flex flex-col gap-1 justify-between">
        <div className="flex items-center gap-1">
          <CiAlarmOn className="text-blue-600" />
          <span className="text-xs font-light">{formattedDate}</span>
        </div>
        <h5 className="text-md font-semibold text-gray-900">{property.name}</h5>

        {property.address && (
          <div className="flex items-center gap-1">
            <SlLocationPin className="text-red-600" />
            <span className="font-light">{property.address}</span>
          </div>
        )}

        <div className="text-sm text-gray-600">{truncatedDescription}</div>

        <div className="flex items-center gap-1  text-sm">
          <TfiAgenda className="text-green-600" />
          <span className="font-light">{property.reference}</span>
        </div>

        <Button
          label="物件詳細"
          actionType="link"
          href={`properties/${property.id}`}
        />
      </div>
    </div>
  );
};

export default PropertyCard;

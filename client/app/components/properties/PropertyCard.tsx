import React from "react";
import { Property } from "@/app/types/types";
import { SlLocationPin } from "react-icons/sl";
import Image from "next/image";
import DefaultImage from "../../../public/images/defaultImg.png";
import Button from "../Button";
import {
  getFormattedDateAndTime,
  getFormattedImages,
  getPriceColor,
  getTimeAgo,
  getTruncatedText,
} from "@/app/format/formattedData";
import ImageSlider from "../image/ImageSlider";
import { IoTimeOutline } from "react-icons/io5";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const timeAgo = getTimeAgo(property.pub_date);
  const priceColor = getPriceColor(property.price);
  const formattedImgs = property.images;
  const truncatedDescription = getTruncatedText(property.description, 100);

  return (
    <div className="flex flex-col w-full max-w-[500px] sm:w-[290px] md:w-[225px] xl:w-[260px] m-1 bg-white border border-gray-200 rounded-lg shadow">
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
          <ImageSlider images={formattedImgs} alt={property.title} small />
        ) : (
          <Image
            src={DefaultImage}
            alt="No Image"
            className="rounded-t-lg min-w-ful h-64 sm:h-48 xl:h-56 object-cover"
            width={500}
            height={80}
          />
        )}
      </div>
      <div className="p-2 w-full h-full flex flex-col gap-1 justify-between">
        <div className="flex items-center text-gray-500">
          <IoTimeOutline size={16} />
          <span className="text-xs">{timeAgo}</span>
        </div>

        <h5 className="text-md font-semibold text-gray-900">
          {property.title}
        </h5>

        {property.address && (
          <div className="flex items-center gap-1 font-light">
            <SlLocationPin className="text-red-600" />
            <span>{property.address}</span>
          </div>
        )}

        <div className="text-sm text-gray-500 font-light">
          {truncatedDescription}
        </div>

        {/* <div className="flex items-center text-gray-500 gap-1 text-xs font-light">
          <TfiAgenda className="text-green-600" />
          <span>{property.reference}</span>
        </div> */}

        <div className="pt-2">
          <Button
            label="物件詳細"
            actionType="link"
            href={`properties/${property.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

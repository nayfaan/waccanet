import { Property } from "@/app/types/types";
import { fetchPropertyDetail } from "../../lib/data";
import { IoTimeOutline } from "react-icons/io5";
import { TfiAgenda } from "react-icons/tfi";
import { PiUserCircle } from "react-icons/pi";
import Button from "@/app/components/Button";
import {
  getFormattedDateAndTime,
  getFormattedImages,
  getTimeAgo,
} from "@/app/format/formattedData";
import ImageSlider from "@/app/components/image/ImageSlider";
import Image from "next/image";
import DefaultImage from "../../../public/images/defaultImg.png";
import Footer from "@/app/components/footer/Footer";

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const property: Property = await fetchPropertyDetail(params.slug);
  const formattedDateAndTime = getFormattedDateAndTime(property.pub_date);
  const timeAgo = getTimeAgo(property.pub_date);
  const formattedImgs = property.images;

  return (
    <main className="bg-white min-h-screen flex flex-col justify-between ">
      <div className="mt-14 h-full flex flex-col items-center p-3 md:p-5 px-1 md:py-3">
        <h2 className="text-2xl font-bold md:text-3xl text-center">
          {property.title}
        </h2>

        <div className="w-full flex items-center justify-center gap-1 py-2">
          <IoTimeOutline size={24} className="text-blue-600" />
          <span className="text-normal">{timeAgo}</span>
        </div>

        {property.images.length > 0 ? (
          <div className="relative w-full h-[350px]  sm:w-[640px] sm:h-[400px] ">
            <ImageSlider images={formattedImgs} alt={property.title} />
          </div>
        ) : (
          <Image
            src={DefaultImage}
            alt="Default Image"
            className="rounded-lg w-full h-[350px] sm:w-[640px] sm:h-[400px] object-cover"
          />
        )}

        {property.owner && (
          <div className="w-full flex items-center justify-center gap-1 py-2">
            <PiUserCircle size={24} className="text-green-600" />
            <span className="text-normal">
              投稿者: {property.owner.ownerName}
            </span>
          </div>
        )}

        <div className="p-2 font-semibold text-lg">家賃：${property.price}</div>

        <div className="md:px-3 lg:px-16">
          <div className="flex flex-col border rounded-xl p-2 sm:p-6 lg:p-8">
            <p className="text-gray-600 whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-2">
          <TfiAgenda className="text-green-600" />
          <span>{property.reference}</span>
        </div>
        <div className="flex flex-col gap-1 p-4 sm:px-7">
          <Button label="連絡する" color="blue" />
          <Button label="戻る" actionType="back" color="gray" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

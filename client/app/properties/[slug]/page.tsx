import { Property } from "@/app/types/types";
import { fetchPropertyDetail } from "../../lib/data";
import { CiAlarmOn } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";
import Button from "@/app/components/Button";
import {
  getFormattedDateAndTime,
  getFormattedImages,
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
  const formattedDate = getFormattedDateAndTime(property.pub_date);
  const formattedImgs = property.images;

  return (
    <main className="bg-white min-h-screen flex flex-col justify-between ">
      <div className="mt-14 h-full flex flex-col items-center p-3 md:p-5 px-1 md:py-3">
        <h2 className="text-2xl font-bold md:text-3xl text-center">
          {property.name}
        </h2>

        <div className="w-full flex items-center justify-center gap-1 p-2">
          <CiAlarmOn className="text-blue-600" />
          <span className="text-normal">{formattedDate}</span>
        </div>

        {property.images.length > 0 ? (
          <div className="relative w-full h-[350px]  sm:w-[640px] sm:h-[400px] ">
            <ImageSlider images={formattedImgs} name={property.name} />
          </div>
        ) : (
          <img
            src={DefaultImage}
            alt="Default Image"
            className="rounded-lg w-full h-[350px] sm:w-[640px] sm:h-[400px] object-cover"
          />
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
        <blockquote className="text-center p-4 sm:px-7">
          <Button label="戻る" small actionType="back" />
        </blockquote>
      </div>
      <Footer />
    </main>
  );
}

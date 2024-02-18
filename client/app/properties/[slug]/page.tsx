import { Property } from "@/app/types/types";
import { fetchPropertyDetail } from "../../lib/data";
import { CiAlarmOn } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/sidebar/Sidebar";
import {
  getFormattedDate,
  getFormattedImages,
} from "@/app/format/formattedData";
import ImageSlider from "@/app/components/properties/ImageSlider";
import Image from "next/image";
import DefaultImage from "../../../public/images/defaultImg.png";

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  // const router = useRouter();

  const property: Property = await fetchPropertyDetail(params.slug);
  const formattedDate = getFormattedDate(property.pub_date);
  const formattedImgs = property.images;

  return (
    <main className="p-3 md:p-5 px-1 bg-white">
      {/* <Sidebar /> */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold md:text-3xl text-center">
          {property.name}
        </h2>

        <div className="w-full flex items-center justify-center gap-1 p-2">
          <CiAlarmOn className="text-blue-600" />
          <span className="text-normal">{formattedDate}</span>
        </div>

        <div className="relative w-[300px] h-[200px]  sm:w-[450px] sm:h-[300px] lg:w-[650px] lg:h-[420px]">
          {property.images.length > 0 ? (
            <ImageSlider images={formattedImgs} name={property.name} />
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

        <div className="p-2 font-semibold text-lg">家賃：${property.price}</div>

        <div className="px-1 md:px-3 lg:px-16">
          <div className="flex flex-col border rounded-xl p-2 sm:p-6 lg:p-8 ">
            <p className=" whitespace-pre-wrap ">{property.description}</p>
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
    </main>
  );
}

import { Property } from "@/app/types/types";
import { fetchPropertyDetail } from "../../lib/data";
import { CiAlarmOn } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";
import PreviousButton from "@/app/components/Button";
import ImageSwiper from "../ImageSwiper";

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const property: Property = await fetchPropertyDetail(params.slug);

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
    <main className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto bg-white">
      <div className="max-w-2xl">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold md:text-3xl ">{property.name}</h2>
        </div>
        <div className="flex items-center gap-1">
          <CiAlarmOn className="text-blue-600" />
          <span className="text-xs font-thin">{formattedDate}</span>
        </div>

        <ImageSwiper imagesSwipe={property.images} />

        <div className="p-1">価格：${property.price}</div>

        <div className="p-2">
          <p>詳細</p>
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 ">
            <p className=" whitespace-pre-wrap ">{property.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <p>物件データ参照元：</p>
          <TfiAgenda className="text-green-600" />
          <span className="font-light">{property.reference}</span>
        </div>

        <blockquote className="text-center p-4 sm:px-7">
          <PreviousButton />
        </blockquote>
      </div>
    </main>
  );
}

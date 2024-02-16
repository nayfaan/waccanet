import { Property } from "@/app/types/types";
import { fetchPropertyDetail } from "../../lib/data";
import { CiAlarmOn } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";
import ImageSwiper from "../ImageSwiper";
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { getFormattedDate } from "@/app/format/formattedData";

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  // const router = useRouter();

  const property: Property = await fetchPropertyDetail(params.slug);
  const formattedDate = getFormattedDate(property.pub_date);

  return (
    <main className="py-3 md:py-5 px-3 md:px-5  bg-white md:ml-72">
      <Sidebar />
      <div>
        <h2 className="text-2xl font-bold md:text-3xl text-center">
          {property.name}
        </h2>

        <div className="w-full flex items-center gap-1">
          <CiAlarmOn className="text-blue-600" />
          <span className="text-normal">{formattedDate}</span>
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
          <Button label="戻る" small actionType="back" />
        </blockquote>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface images {
  file_name: string;
  image_path: string;
}

interface SwipeImages {
  imagesSwipe: images[];
}

const ImageSwiper: React.FC<SwipeImages> = ({ imagesSwipe }) => {
  const api_server_link = process.env.api_server_link;
  console.log("image nemsi");
  if (imagesSwipe.length > 0) console.log(imagesSwipe[0].image_path);

  return (
    <Swiper
      navigation
      pagination={{ type: "bullets" }}
      modules={[Navigation, Pagination]}
      loop={true}
    >
      {imagesSwipe.map((imageswipe, index: number) => {
        return (
          <SwiperSlide key={`${index}`}>
            <div className="flex  justify-center ">
              <Image
                className="min-w-ful h-48 object-fill rounded-xl"
                src={`${imageswipe.image_path}` || "/images/defaultImg.png"}
                width="400"
                height="380"
                alt={`Image of ${imageswipe.file_name}`}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSwiper;

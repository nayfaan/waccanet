"use client";
import Image from "next/image";

const Avator = () => {
  return (
    <Image
      className="rounded-full"
      src="/images/defaultUser.png"
      height="30"
      width="30"
      alt="Avator"
    />
  );
};

export default Avator;

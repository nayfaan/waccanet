import Image from "next/image";

interface ImageProps {
  src: { file_name: string; image_path: string };
  alt: string;
  active: boolean;
  small?: boolean;
}

const SlideImage: React.FC<ImageProps> = ({ src, alt, active, small }) => {
  return (
    <div
      className="duration-700 ease-in-out transition-opacity"
      data-carousel-item
    >
      <img
        src={src.image_path}
        className={`absolute z-20 w-full h-full object-cover ${
          active ? "opacity-100 block" : "opacity-0 hidden"
        }
        ${small ? "w-full h-64 sm:h-48 xl:h-56" : "w-full h-full"}
        `}
        alt={alt}
        width={500}
        height={400}
        // priority
      />
    </div>
  );
};

export default SlideImage;

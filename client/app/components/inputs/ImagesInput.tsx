import React, { ChangeEvent, useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

interface ImagesInputProps {
  id: string;
  values: string[];
  onChange: (id: string, value: string[]) => void;
}

const ImagesInput: React.FC<ImagesInputProps> = ({ id, values, onChange }) => {
  const [images, setImages] = useState<string[]>(values);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // 新しい画像を既存の画像と結合してセットする
      setImages((prevImages) => [
        ...prevImages,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  useEffect(() => {
    onChange(id, images);
  }, [images]);

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <LuImagePlus size={36} className="text-gray-500" />
            <p className="my-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG or JPG(MAX. 800x400px)
            </p>
          </div>
          {/* onChange イベントを追加 */}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            multiple
          />
        </label>
      </div>
      <div>
        {/* <ImageSlider images={images} name="Selected Image" /> */}
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Uploaded Image ${index}`}
            className=""
          />
        ))}
      </div>
    </>
  );
};

export default ImagesInput;

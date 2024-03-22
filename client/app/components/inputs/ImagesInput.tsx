import React, { ChangeEvent, useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";

interface ImagesInputProps {
  id: string;
  values: File[];
  onChange: (id: string, value: File[]) => void;
}

const ImagesInput: React.FC<ImagesInputProps> = ({ id, values, onChange }) => {
  const [images, setImages] = useState<File[]>(values);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      console.log("onchange called");

      // 新しい画像を既存の画像と結合してセットする
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleImageRemove = (imageToRemove: File) => {
    setImages(images.filter((image) => image.name !== imageToRemove.name));
  };

  useEffect(() => {
    onChange(id, images);
  }, [images, setImages]);

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
            accept="image/*"
            multiple
            key={images.length}
          />
        </label>
      </div>
      <div className="flex flex-wrap ">
        {images.map((imageFile, index) => (
          <div className="relative m-2" key={index}>
            <button
              className="absolute top-2 right-2"
              onClick={() => handleImageRemove(imageFile)}
            >
              <MdCancel
                size={28}
                className="text-gray-600 hover:text-gray-500"
              />
            </button>
            <img
              src={URL.createObjectURL(imageFile)}
              alt={`Uploaded Image ${index}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesInput;

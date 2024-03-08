export const getFormattedDateAndTime = (pub_date: string) => {
  const dateObject = new Date(pub_date);

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

  return formattedDate;
};

export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const getPriceColor = (price: number) => {
  let priceColor;
  switch (price) {
    case 400:
      priceColor = "bg-orange-500";
      break;
    case 500:
      priceColor = "bg-yellow-500";
      break;
    case 600:
      priceColor = "bg-lime-500";
      break;
    case 700:
      priceColor = "bg-green-500";
      break;
    case 800:
      priceColor = "bg-sky-400";
      break;
    case 900:
      priceColor = "bg-blue-600";
      break;
    case 1000:
      priceColor = "bg-purple-500";
      break;
    default:
      priceColor = "bg-white";
      break;
  }

  return priceColor;
};

export const getFormattedImages = (
  images: {
    file_name: string;
    image_path: string;
  }[]
) => {
  // すべての画像データをbase64形式に変換して格納するための配列
  const formattedImages: string[] = [];

  // 画像データをbase64形式に変換し、formattedImagesに格納する
  images.forEach((image) => {
    const formattedImage = `data:image/jpeg;base64,${image.image_path}`;
    formattedImages.push(formattedImage);
  });

  return formattedImages;
};

export const getTruncatedText = (text: string, maxLength: number) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return truncatedText;
};

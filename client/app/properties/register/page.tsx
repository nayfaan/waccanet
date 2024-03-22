"use client";
import Heading from "@/app/components/Heading";
import RegisterForm from "@/app/components/RegisterForm";
import Footer from "@/app/components/footer/Footer";
import Calendar from "@/app/components/inputs/Calendar";
import Dropdown from "@/app/components/inputs/Dropdown";
import ImagesInput from "@/app/components/inputs/ImagesInput";
import Input from "@/app/components/inputs/Input";
import Toggle from "@/app/components/inputs/Toggle";
import {
  getFormattedDate,
  convertBoolean2Char,
} from "@/app/format/formattedData";
import {
  areas,
  gender,
  paymentMethod,
  roomTypes,
  stations,
} from "@/app/selectLists";
import { PropertyRegisterData } from "@/app/types/types";
import { registerPropertyData } from "@/app/lib/action";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import validator from "validator";
import { useRouter } from "next/navigation";

enum STEPS {
  PROFILE = 0,
  REQUIRED_INFO = 1,
  MAP = 2,
  LOCATION = 3,
  IMAGES = 4,
  INCLUDED_IN_RENT = 5,
  OTHER_OPTIONS = 6,
  DATES = 7,
  DESCRIPTION = 8,
  CONFIRMATION = 9,
}

const Register = () => {
  const [step, setStep] = useState(STEPS.PROFILE);
  const [propertyRegisterData, setPropertyRegisterData] =
    useState<PropertyRegisterData>({
      ownerName: "",
      ownerAddress: "",
      ownerEmail: "",
      ownerPhoneNumber: "",
      pub_date: new Date(),
      title: "",
      rent: "",
      roomType: "",
      houseAddress: "",
      center: [49.246292, -123.116226], //バンクーバー
      station: "",
      area: "",
      images: [],
      wifi: false,
      utilities: false,
      furnished: false,
      laundry: false,
      gender: "",
      minimumStay: "",
      roommates: "",
      payment: "",
      takeover: "",
      onlineViewing: false,
      moveInDate: new Date(),
      description: "",
      reference: "",
    });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formatDate = getFormattedDate(propertyRegisterData.moveInDate);
  const router = useRouter();

  const Map = dynamic(() => import("../../components/inputs/Map"), {
    ssr: false,
  });

  const actionLabel = useMemo(() => {
    if (step === STEPS.CONFIRMATION) {
      return "Post";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PROFILE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const onBack = () => {
    setStep((value) => Math.max(value - 1, STEPS.PROFILE)); // ステップがPROFILEより小さくならないように制限
  };

  const onNext = () => {
    // バリデーションエラーがあるかどうかチェック
    if (stepValidation()) {
      // エラーがある場合は何もせずに終了
      return;
    }
    // エラーがない場合は次のステップに進む
    setStep((value) => Math.min(value + 1, STEPS.CONFIRMATION));
    // エラーが解消されたらエラー状態をクリア
    setErrors({});
  };

  const onSubmit = async () => {
    if (step !== STEPS.CONFIRMATION) {
      return onNext();
    }

    //create Data-Form
    const formData = new FormData();
    const post_day = new Date();

    // Add a text field
    formData.append("ownerName", propertyRegisterData.ownerName);
    formData.append("ownerEmail", propertyRegisterData.ownerEmail);
    formData.append("ownerPhoneNumber", propertyRegisterData.ownerPhoneNumber);

    formData.append("pub_date", getFormattedDate(post_day));
    formData.append("title", propertyRegisterData.title);
    formData.append("price", propertyRegisterData.rent);
    formData.append("roomType", propertyRegisterData.roomType);
    //緯度と経度を入力処理
    formData.append("station", propertyRegisterData.station);
    formData.append("area", propertyRegisterData.area);
    propertyRegisterData.images.forEach((imageFile, index) => {
      formData.append("images", imageFile);
    });
    formData.append("wifi", convertBoolean2Char(propertyRegisterData.wifi));
    formData.append(
      "utilities",
      convertBoolean2Char(propertyRegisterData.utilities)
    );
    formData.append(
      "furnished",
      convertBoolean2Char(propertyRegisterData.furnished)
    );
    formData.append(
      "laundry",
      convertBoolean2Char(propertyRegisterData.laundry)
    );
    formData.append("gender", propertyRegisterData.gender);
    formData.append("minimumStay", propertyRegisterData.minimumStay);
    formData.append("roommates", propertyRegisterData.roommates);
    formData.append("payment", propertyRegisterData.payment);
    formData.append("takeover", propertyRegisterData.takeover);
    formData.append(
      "onlineViewing",
      convertBoolean2Char(propertyRegisterData.onlineViewing)
    );
    formData.append(
      "moveInDate",
      getFormattedDate(propertyRegisterData.moveInDate)
    );
    formData.append("description", propertyRegisterData.description);
    formData.append("reference", "Waccanet");

    const res = await registerPropertyData(formData);

    router.push(`/properties/${res["property-id"]}`);
  };

  const stepValidation = () => {
    // ステップごとのバリデーションを行う
    switch (step) {
      case STEPS.PROFILE:
        if (validator.isEmpty(propertyRegisterData.ownerName)) {
          setErrors({
            ownerName: "Please input your name.",
          });
          return true; // エラーがある場合は true を返す
        } else if (
          validator.isEmpty(propertyRegisterData.ownerEmail) ||
          !validator.isEmail(propertyRegisterData.ownerEmail)
        ) {
          setErrors({
            ownerEmail: "Please input valid email.",
          });
          return true;
        }
        if (
          !validator.isEmpty(propertyRegisterData.ownerPhoneNumber) &&
          !validator.isMobilePhone(propertyRegisterData.ownerPhoneNumber)
        ) {
          setErrors({
            ownerPhoneNumber: "Please input valid phone number.",
          });
          return true;
        }
        break;
      case STEPS.REQUIRED_INFO:
        if (validator.isEmpty(propertyRegisterData.title)) {
          setErrors({
            title: "Please input the title.",
          });
          return true;
        } else if (validator.isEmpty(propertyRegisterData.rent)) {
          setErrors({
            rent: "Please input rent",
          });
          return true;
        } else if (!validator.isNumeric(propertyRegisterData.rent)) {
          setErrors({
            rent: "Rent must be a number.",
          });
          return true;
        }
        break;
      case STEPS.OTHER_OPTIONS:
        if (
          !validator.isEmpty(propertyRegisterData.roommates) &&
          !validator.isNumeric(propertyRegisterData.roommates)
        ) {
          setErrors({
            roommates: "Number of roommates must be a number.",
          });
          return true;
        } else if (
          !validator.isEmpty(propertyRegisterData.roommates) &&
          !validator.isInt(propertyRegisterData.roommates)
        ) {
          setErrors({
            roommates: "Number of roommates must be an integer.",
          });
          return true;
        } else if (
          !validator.isEmpty(propertyRegisterData.minimumStay) &&
          !validator.isNumeric(propertyRegisterData.minimumStay)
        ) {
          setErrors({
            minimumStay: "Minimum stay must be a number.",
          });
          return true;
        } else if (
          !validator.isEmpty(propertyRegisterData.takeover) &&
          !validator.isNumeric(propertyRegisterData.takeover)
        ) {
          setErrors({
            takeover: "Takeover must be a number.",
          });
          return true;
        } else if (
          !validator.isEmpty(propertyRegisterData.takeover) &&
          !validator.isInt(propertyRegisterData.takeover)
        ) {
          setErrors({
            takeover: "Takeover must be an integer.",
          });
          return true;
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (
    id: string,
    value: string | string[] | boolean | Date | LatLngTuple | File[]
  ) => {
    console.log(id, value);
    setPropertyRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  let bodyContent;
  let next;
  let back;

  if (step === STEPS.PROFILE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Your Profile"
          stepNum="1/10"
          subtitle="Please input your information! (Only your name will be public)"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input
            id="ownerName"
            label="Name"
            value={propertyRegisterData.ownerName}
            onChange={handleInputChange}
            errorMessage={errors.ownerName}
            required
          />
          <Input
            id="ownerAddress"
            label="Address"
            value={propertyRegisterData.ownerAddress}
            onChange={handleInputChange}
          />
          <Input
            id="ownerEmail"
            label="Email"
            value={propertyRegisterData.ownerEmail}
            onChange={handleInputChange}
            errorMessage={errors.ownerEmail}
            required
          />
          <Input
            id="ownerPhoneNumber"
            label="Phone Number"
            value={propertyRegisterData.ownerPhoneNumber}
            onChange={handleInputChange}
            errorMessage={errors.ownerPhoneNumber}
          />
        </div>
      </div>
    );
    next = "Title, Rent and Room";
    back = "";
  }

  if (step === STEPS.REQUIRED_INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Title, Rent and Room"
          stepNum="2/10"
          subtitle="Basic information about the place."
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input
            id="title"
            label="Title"
            value={propertyRegisterData.title}
            onChange={handleInputChange}
            errorMessage={errors.title}
            required
          />
          <Input
            id="rent"
            label="Rent"
            value={propertyRegisterData.rent}
            onChange={handleInputChange}
            errorMessage={errors.rent}
            formatPrice
            required
          />
          <Dropdown
            id="roomType"
            label="Select room type"
            value={propertyRegisterData.roomType}
            onChange={handleInputChange}
            items={roomTypes.english}
          />
        </div>
      </div>
    );
    next = "Map";
    back = "Profile";
  }

  if (step === STEPS.MAP) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Map"
          stepNum="3/10"
          subtitle="Where is the place located?"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Map
            center={propertyRegisterData.center}
            houseAddress={propertyRegisterData.houseAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
    next = "Area and Station";
    back = "Title, Rent and Room";
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Area and Station"
          stepNum="4/10"
          subtitle="Which area and station is your place loacated?"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Dropdown
            id="area"
            label="Select area"
            value={propertyRegisterData.area}
            onChange={handleInputChange}
            items={areas.english}
          />
          <Dropdown
            id="station"
            label="Select closest station"
            value={propertyRegisterData.station}
            onChange={handleInputChange}
            items={stations}
          />
        </div>
      </div>
    );
    next = "Images of the place";
    back = "Map";
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Images of the place"
          stepNum="5/10"
          subtitle="Upload some images so people get interested!"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagesInput
            id="images"
            values={propertyRegisterData.images}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
    next = "Utilities, Wifi, Laundry and Furniture";
    back = "Area and Station";
  }

  if (step === STEPS.INCLUDED_IN_RENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Utilities, Wifi, Laundry and Furniture"
          stepNum="6/10"
          subtitle="Are these is included in rent?"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">
              Utilities
            </div>
            <Toggle
              id="utilities"
              messageTrue="Yes! Included in rent"
              messageFalse="Tenants have to pay"
              value={propertyRegisterData.utilities}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">Wifi</div>
            <Toggle
              id="wifi"
              messageTrue="Yes! Included in rent"
              messageFalse="Not part of rent"
              value={propertyRegisterData.wifi}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">
              Laundry
            </div>
            <Toggle
              id="laundry"
              messageTrue="Yes! Included in rent"
              messageFalse="Not part of rent"
              value={propertyRegisterData.laundry}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">
              Furniture
            </div>
            <Toggle
              id="furnished"
              messageTrue="Yes! Furnished"
              messageFalse="No furniture"
              value={propertyRegisterData.furnished}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    );
    next = "Other information";
    back = "Images of the place";
  }

  if (step === STEPS.OTHER_OPTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Other information"
          stepNum="7/10"
          subtitle="Tell us more details!"
        />
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <Dropdown
            id="gender"
            label="Select gender preference"
            value={propertyRegisterData.gender}
            onChange={handleInputChange}
            items={gender.english}
          />
          <Dropdown
            id="payment"
            label="Select rent payment preference"
            value={propertyRegisterData.payment}
            onChange={handleInputChange}
            items={paymentMethod.english}
          />
          <Input
            id="roommates"
            label="Number of roommates"
            value={propertyRegisterData.roommates}
            onChange={handleInputChange}
            errorMessage={errors.roommates}
          />
          <Input
            id="minimumStay"
            label="Minimum stay (Month)"
            value={propertyRegisterData.minimumStay}
            onChange={handleInputChange}
            errorMessage={errors.minimumStay}
          />
          <Input
            id="takeover"
            label="Price of takeover"
            value={propertyRegisterData.takeover}
            onChange={handleInputChange}
            errorMessage={errors.takeover}
            formatPrice
          />
          <div className="flex items-center justify-start w-full gap-2">
            <div className="text-gray-500">Online Viewing</div>
            <Toggle
              id="onlineViewing"
              messageTrue="Yes! Online tour available"
              messageFalse="In person only"
              value={propertyRegisterData.onlineViewing}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    );
    next = "Move-in Date";
    back = "Utilities, Wifi, Laundry and Furniture";
  }

  if (step === STEPS.DATES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Move-in Date"
          stepNum="8/10"
          subtitle="When is the room available? Note: The room is available from today if you do not choose the date."
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Calendar
            id="moveInDate"
            value={propertyRegisterData.moveInDate}
            onChange={handleInputChange}
            inline
          />
        </div>
      </div>
    );
    next = "Description";
    back = "Other information";
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Description"
          stepNum="9/10"
          subtitle="More about the place..."
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input
            id="description"
            label="Description"
            value={propertyRegisterData.description}
            onChange={handleInputChange}
            textarea
          />
        </div>
      </div>
    );
    next = "Confirm";
    back = "Move-in Date";
  }

  if (step === STEPS.CONFIRMATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Confirm"
          stepNum="10/10"
          subtitle="Please check if all the information you provided is correct. "
        />
        <div className="flex flex-col justify-center gap-2">
          <div>
            <div className="text-xl font-bold">Your Information</div>
            <div className="flex gap-3">
              <div>Name</div>
              <div className="text-gray-500">
                {propertyRegisterData.ownerName || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Address</div>
              <div className="text-gray-500">
                {propertyRegisterData.ownerAddress || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Email</div>
              <div className="text-gray-500">
                {propertyRegisterData.ownerEmail || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Phone Number</div>
              <div className="text-gray-500">
                {propertyRegisterData.ownerPhoneNumber || "NA"}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">House Information</div>
            <div className="flex gap-3">
              <div>Title</div>
              <div className="text-gray-500">{propertyRegisterData.title}</div>
            </div>
            <div className="flex gap-3">
              <div>Rent</div>
              <div className="text-gray-500">${propertyRegisterData.rent}</div>
            </div>
            <div className="flex gap-3">
              <div>Room Type</div>
              <div className="text-gray-500">
                {propertyRegisterData.roomType || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Area</div>
              <div className="text-gray-500">
                {propertyRegisterData.area || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Station</div>
              <div className="text-gray-500">
                {propertyRegisterData.station || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Wifi</div>
              <div className="text-gray-500">
                {propertyRegisterData.wifi
                  ? "Included in rent"
                  : "Not included"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Utilities</div>
              <div className="text-gray-500">
                {propertyRegisterData.utilities
                  ? "Included in rent"
                  : "Not included"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Furnished</div>
              <div className="text-gray-500">
                {propertyRegisterData.furnished ? "Furnished" : "Not Furnished"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Laundry</div>
              <div className="text-gray-500">
                {propertyRegisterData.laundry
                  ? "Included in rent"
                  : "Not included"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Gender</div>
              <div className="text-gray-500">
                {propertyRegisterData.gender || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Minimum Stay</div>
              <div className="text-gray-500">
                {propertyRegisterData.minimumStay
                  ? `${propertyRegisterData.minimumStay} month`
                  : "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Number of Roommates</div>
              <div className="text-gray-500">
                {propertyRegisterData.roommates
                  ? `${propertyRegisterData.roommates} people`
                  : "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Payment Method</div>
              <div className="text-gray-500">
                {propertyRegisterData.payment || "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Takeover</div>
              <div className="text-gray-500">
                {propertyRegisterData.takeover
                  ? `$${propertyRegisterData.takeover}`
                  : "NA"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Online Viewing</div>
              <div className="text-gray-500">
                {propertyRegisterData.onlineViewing
                  ? "Available"
                  : "In person only"}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Move-in Date</div>
              <div className="text-gray-500">{formatDate}</div>
            </div>
            <div>
              <div>Description</div>
              <div className="text-gray-500">
                {propertyRegisterData.description || "NA"}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold">Images</div>
            {propertyRegisterData.images.length === 0 && (
              <div className="text-gray-500">No image provided...</div>
            )}
            <div className="flex flex-wrap gap-1">
              {propertyRegisterData.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(imageUrl)}
                  alt="register images"
                  className="w-48 object-contain"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Map</div>
            {propertyRegisterData.houseAddress ? (
              <Map
                houseAddress={propertyRegisterData.houseAddress}
                center={propertyRegisterData.center}
              />
            ) : (
              <div className="text-gray-500">No address provided...</div>
            )}
          </div>
        </div>
      </div>
    );
    next = "Finally, Post on Waccanet!";
    back = "Description";
  }

  return (
    <div className="p-2 pt-14 min-h-screen flex flex-col justify-between">
      <RegisterForm
        onSubmit={onSubmit}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.PROFILE ? undefined : onBack}
        body={bodyContent}
        title="Post Ad on Waccanet"
        next={next}
        back={back}
      />
      <Footer />
    </div>
  );
};

export default Register;

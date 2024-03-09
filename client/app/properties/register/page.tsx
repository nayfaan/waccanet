"use client";
import Heading from "@/app/components/Heading";
import RegisterForm from "@/app/components/RegisterForm";
import Footer from "@/app/components/footer/Footer";
import Calendar from "@/app/components/inputs/Calendar";
import Dropdown from "@/app/components/inputs/Dropdown";
import ImagesInput from "@/app/components/inputs/ImagesInput";
import Input from "@/app/components/inputs/Input";
import Toggle from "@/app/components/inputs/Toggle";
import { getFormattedDate } from "@/app/format/formattedData";
import {
  areas,
  gender,
  paymentMethod,
  roomTypes,
  stations,
} from "@/app/selectLists";
import {
  PropertyRegisterData,
  PropertyRegisterDataPrevious,
} from "@/app/types/types";
import { registerePropertyData } from "@/app/lib/action";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

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
  PREVIEW = 10,
}

const Register = () => {
  const [step, setStep] = useState(STEPS.PROFILE);
  const [propertyRegisterData, setPropertyRegisterData] =
    useState<PropertyRegisterData>({
      ownerName: "",
      ownerAddress: "",
      ownerEmail: "",
      ownerPhoneNumber: "",
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
    });

  // const [profile, setProfile] = useState({
  //   owner_name: "",
  //   owner_address: "",
  //   owner_email: "",
  //   owner_phone_number: "",
  // });
  // const [requiredInfo, setRequiredInfo] = useState({
  //   title: "",
  //   rent: "",
  //   roomType: "",
  // });
  // const [houseAddress, setHouseAddress] = useState("");
  // const [center, setCenter] = useState([49.246292, -123.116226]);
  // const [location, setLocation] = useState({
  //   station: "",
  //   area: "",
  // });
  // const [images, setImages] = useState([]);
  // const [includedInRent, setIncludedInRent] = useState({
  //   wifi: false,
  //   utilities: false,
  //   furnished: false,
  //   laundry: false,
  // });
  // const [otherOptions, setOtherOptions] = useState({
  //   gender: "",
  //   minimumStay: "",
  //   roommates: "",
  //   payment: "",
  //   takeover: "",
  //   onlineViewing: false,
  // });
  // const [moveInDate, setMoveInDate] = useState(new Date());
  // const [description, setDescription] = useState("");

  const formatDate = getFormattedDate(propertyRegisterData.moveInDate);

  const Map = dynamic(() => import("../../components/inputs/Map"), {
    ssr: false,
  });

  const onBack = () => {
    setStep((value) => Math.max(value - 1, STEPS.PROFILE)); // ステップがPROFILEより小さくならないように制限
  };

  const onNext = () => {
    setStep((value) => Math.min(value + 1, STEPS.PREVIEW)); // ステップがPREVIEWより大きくならないように制限
  };

  const onSubmit = () => {
    if (step !== STEPS.PREVIEW) {
      return onNext();
    }

    var today = new Date();
    const PropertyData: PropertyRegisterDataPrevious = {
      pub_date: today,
      title: propertyRegisterData.title,
      rent: propertyRegisterData.rent,
      description: propertyRegisterData.description,
      reference: "Waccanet",
      ownerEmail: propertyRegisterData.ownerEmail,
    };

    registerePropertyData(PropertyData);

    // setIsLoading(true);
    // axios
    //   .post("/api/listings", data)
    //   .then(() => {
    //     toast.success("Listing Created!");
    //     router.refresh();
    //     reset();
    //     setStep(STEPS.CATEGORY);
    //     rentModal.onClose();
    //   })
    //   .catch(() => {
    //     toast.error("Something went wrong");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CONFIRMATION) {
      return "Preview";
    }
    if (step === STEPS.PREVIEW) {
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

  const handleInputChange = (
    id: string,
    value: string | string[] | boolean | Date | LatLngTuple
  ) => {
    setPropertyRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Your Profile" subtitle="Please input your information!" />
      <div className="flex flex-col items-center justify-center gap-2">
        <Input
          id="ownerName"
          label="Name"
          value={propertyRegisterData.ownerName}
          onChange={handleInputChange}
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
        />
        <Input
          id="ownerPhoneNumber"
          label="Phone Number"
          value={propertyRegisterData.ownerPhoneNumber}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  if (step === STEPS.REQUIRED_INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Title, Rent and Room"
          subtitle="Basic information about the place"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input
            id="title"
            label="Title"
            value={propertyRegisterData.title}
            onChange={handleInputChange}
            required
          />
          <Input
            id="rent"
            label="Rent"
            value={propertyRegisterData.rent}
            onChange={handleInputChange}
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
  }

  if (step === STEPS.MAP) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Address" subtitle="Where is the place located?" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Map
            center={propertyRegisterData.center}
            houseAddress={propertyRegisterData.houseAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Area and Station"
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
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Images of the place"
          subtitle="Insert some images so people get interested"
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
  }

  if (step === STEPS.INCLUDED_IN_RENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Utilities, Wifi, Laundry and Furniture"
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
  }

  if (step === STEPS.OTHER_OPTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Other information" subtitle="Tell us more details!" />
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
          />
          <Input
            id="minimumStay"
            label="Minimum stay (Month)"
            value={propertyRegisterData.minimumStay}
            onChange={handleInputChange}
          />
          <Input
            id="takeover"
            label="Price of takeover"
            value={propertyRegisterData.takeover}
            onChange={handleInputChange}
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
  }

  if (step === STEPS.DATES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Move-in Date" subtitle="When is the room available?" />
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
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Description" subtitle="More about the place..." />
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
  }

  if (step === STEPS.CONFIRMATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Provided Information"
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
              <div className="text-gray-500">{propertyRegisterData.gender}</div>
            </div>
            <div className="flex gap-3">
              <div>Minimum Stay</div>
              <div className="text-gray-500">
                {propertyRegisterData.minimumStay} Month
              </div>
            </div>
            <div className="flex gap-3">
              <div>Number of Roommates</div>
              <div className="text-gray-500">
                {propertyRegisterData.roommates} people
              </div>
            </div>
            <div className="flex gap-3">
              <div>Payment Method</div>
              <div className="text-gray-500">
                {propertyRegisterData.payment}
              </div>
            </div>
            <div className="flex gap-3">
              <div>Takeover</div>
              <div className="text-gray-500">
                ${propertyRegisterData.takeover}
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
                {propertyRegisterData.description}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold">Images</div>
            {propertyRegisterData.images.length === 0 && (
              <div className="text-gray-500">No image provided...</div>
            )}
            <div className="flex flex-wrap gap-1">
              {propertyRegisterData.images.map((img) => (
                <img
                  key={img}
                  src={img}
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

          <div className="font-light text-neutral-500 mt-2">
            Before you submit, You can see the preview on the next page!
          </div>
        </div>
      </div>
    );
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
      />
      <Footer />
    </div>
  );
};

export default Register;

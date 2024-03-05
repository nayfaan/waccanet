"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import RegisterForm from "@/app/components/RegisterForm";
import Footer from "@/app/components/footer/Footer";
import Calendar from "@/app/components/inputs/Calendar";
import Dropdown from "@/app/components/inputs/Dropdown";
import Input from "@/app/components/inputs/Input";
import Toggle from "@/app/components/inputs/Toggle";
import {
  areas,
  furnished,
  gender,
  laundry,
  minimumStay,
  paymentMethod,
  roomTypes,
  roommates,
  stations,
  utilities,
  wifi,
} from "@/app/selectLists";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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
}

const Register = () => {
  const [step, setStep] = useState(STEPS.PROFILE);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      profile: {
        owner_name: "",
        owner_address: "",
        contact_info: {
          email: "",
          phone_number: "",
        },
      },
      required_info: {
        title: "",
        price: "",
        room_type: "",
      },
      map: {
        house_address: "",
        map: "",
      },
      location: {
        station: "",
        area: "",
      },
      images: [],
      included_in_rent: {
        wifi: false,
        utilities: false,
        furnished: false,
        laundry: false,
      },
      other_options: {
        gender: "",
        minimum_stay: "",
        roommates: "",
        payment: "",
        takeover: "",
        online_viewing: false,
      },
      move_in_date: "",
      description: "",
    },
  });

  const profile = watch("profile");
  const required_info = watch("required_info");
  const location = watch("location");
  const images = watch("images");
  const included_in_rent = watch("included_in_rent");
  const other_options = watch("other_options");
  const dates = watch("dates");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

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
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PROFILE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Your Profile" subtitle="Please input your information!" />
      <div className="flex flex-col items-center justify-center gap-2">
        <Input id="name" label="Name" />
        <Input id="owner_address" label="Address" />
        <Input id="email" label="Email" />
        <Input id="phone_number" label="Phone Number" />
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
          <Input id="title" label="Title" required />
          <Input id="rent" label="Rent" formatPrice required />
          <Dropdown label="Select room type" items={roomTypes.english} />
        </div>
      </div>
    );
  }

  if (step === STEPS.MAP) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Address" subtitle="Where is the place located?" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input id="house_address" label="Address" />
          <div>GoogleMapをここに追加</div>
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
          <Dropdown label="Select area" items={areas.english} />
          <Dropdown label="Select closest station" items={stations} />
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
          画像を挿入できるものをここに追加
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
              messageTrue="Yes! Included in rent"
              messageFalse="Tenants have to pay"
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">Wifi</div>
            <Toggle
              messageTrue="Yes! Included in rent"
              messageFalse="Not part of rent"
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">
              Laundry
            </div>
            <Toggle
              messageTrue="Yes! Included in rent"
              messageFalse="Not part of rent"
            />
          </div>

          <div className="flex items-center justify-start w-full gap-2">
            <div className="w-1/4 text-sm md:text-base text-gray-500">
              Furniture
            </div>
            <Toggle messageTrue="Yes! Furnished" messageFalse="No furniture" />
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
          <Dropdown label="Select gender preference" items={gender.english} />
          <Dropdown
            label="Select rent payment preference"
            items={paymentMethod.english}
          />
          <Input id="roommates" label="Number of roommates" />
          <Input id="minimum_stay" label="Minimum stay (Month)" />
          <Input id="takeover" label="Price of takeover" formatPrice />
          <div className="flex items-center justify-start w-full gap-2">
            <div className="text-gray-500">Online Viewing</div>
            <Toggle
              messageTrue="Yes! Online tour available"
              messageFalse="In person only"
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
          <Calendar id="move_in_date" inline register={register} />
        </div>
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Description" subtitle="More about the place..." />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input id="description" label="Description" textarea />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 pt-14 min-h-screen flex flex-col justify-between">
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
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

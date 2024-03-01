"use client";
import Heading from "@/app/components/Heading";
import RegisterForm from "@/app/components/RegisterForm";
import Footer from "@/app/components/footer/Footer";
import Dropdown from "@/app/components/inputs/Dropdown";
import Input from "@/app/components/inputs/Input";
import SelectButton from "@/app/components/sidebar/filter_body/SelectButton";
import { areas, stations } from "@/app/selectLists";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  PROFILE = 0,
  REQUIRED_INFO = 1,
  LOCATION = 2,
  IMAGES = 3,
  INCLUDED_IN_RENT = 4,
  OTHER_OPTIONS = 5,
  DATES = 6,
  DESCRIPTION = 7,
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
        name: "",
        owner_address: "",
        contact_info: {
          email: "",
          phone_number: "",
        },
      },
      required_info: {
        title: "",
        price: 1,
      },
      location: {
        house_address: "",
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
        roommates: 1,
        takeover: 0,
        payment: "",
        online_viewing: false,
      },
      dates: {
        move_in_date: "",
        move_out_date: "",
      },
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
      <Heading
        title="Complete your profile"
        subtitle="Please input your information!"
      />
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
          title="Title and Rent"
          subtitle="What is the title of the place and how much it the rent?"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input id="title" label="Title" />
          <Input id="rent" label="Rent" formatPrice />
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Location" subtitle="Where is the place located?" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Input id="house_address" label="Address" />
          <Dropdown label="Select area" items={areas} />
          {/* <Dropdown label="Select closest station" items={stations} /> */}
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

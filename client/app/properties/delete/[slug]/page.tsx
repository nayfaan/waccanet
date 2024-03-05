"use client";

import RegisterForm from "@/app/components/RegisterForm";
import Footer from "@/app/components/footer/Footer";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  PASSWORD = 0,
  CONFIRMATION = 1,
  COMPLETED = 2,
}

const Delete = () => {
  const [step, setStep] = useState(STEPS.PASSWORD);

  console.log("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const password = watch("password");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.COMPLETED) {
      return onNext();
    }
    setStep(0);

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
      return "Yes";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PASSWORD) {
      return undefined;
    } else if (step === STEPS.CONFIRMATION) {
      return "No";
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <div className="font-light text-neutral-500 mt-2">
          Are you sure to delete your property information?
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Input id="password" label="Your Password" />
      </div>
    </div>
  );

  if (step === STEPS.CONFIRMATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <div className="font-light text-neutral-500 mt-2">
            Are you sure you want to delete it?
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.COMPLETED) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="pt-20 px-2 flex flex-col items-center justify-center">
          <h1 className="font-semibold">
            登録されていたデータの削除が完了しました。
          </h1>
          <Button label="物件一覧情報に戻る" small actionType="link" href="/" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 pt-14 min-h-screen flex flex-col justify-between">
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={step === STEPS.COMPLETED ? "off" : actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={
          step === STEPS.PASSWORD || step === STEPS.COMPLETED
            ? undefined
            : onBack
        }
        body={bodyContent}
        title="Delete property information"
      />
      <Footer />
    </div>
  );
};

export default Delete;

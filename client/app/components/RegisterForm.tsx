import React, { useCallback } from "react";
import Button from "./Button";

interface RegisterFormProps {
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto border-[1px] rounded-lg">
        {/* CONTENT */}
        <div className="translate duration-300 h-full">
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/* HEADER */}
            <div className="flex items-center p-6 justify-center relative border-b-[1px]">
              <div className="text-lg font-semibold">{title}</div>
            </div>

            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    color="gray"
                  />
                )}
                {actionLabel != "off" && (
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    color="blue"
                  />
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

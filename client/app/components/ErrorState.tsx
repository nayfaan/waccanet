import Button from "./Button";

interface ErrorStateProps {
  errorNumber?: number;
  title: string;
  message_ja?: string;
  message_en: string;
  buttonLabel: string;
  onClick?: any;
  actionType?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  errorNumber,
  title,
  message_ja,
  message_en,
  buttonLabel,
  onClick,
  actionType,
}) => {
  return (
    <main className="h-screen p-6 w-full place-items-center bg-white flex flex-col items-center justify-center  ">
      <p className="text-base font-semibold text-indigo-600">{errorNumber}</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">{message_ja}</p>
      <p className="mt-1 text-base leading-7 text-gray-600">{message_en}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button
          label={buttonLabel}
          small
          onClick={onClick}
          actionType={actionType}
        />
      </div>
    </main>
  );
};

export default ErrorState;

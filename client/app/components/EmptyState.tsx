import React from "react";
import Button from "./Button";

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="h-screen flex flex-col items-center pt-10">
      <h1 className="font-semibold">お探しの{title}は見つかりませんでした。</h1>
      <p className="mt-2 mb-5">{message}</p>
      <Button label="ホームへ戻る" small actionType="link" href="/" />
    </div>
  );
};

export default EmptyState;

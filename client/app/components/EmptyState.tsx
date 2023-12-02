import React from "react";

interface EmptyStateProps {
  title: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center">No {title} found...</div>
  );
};

export default EmptyState;

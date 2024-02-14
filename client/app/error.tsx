"use client";

import { useEffect } from "react";
import NotFound from "./components/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <NotFound
      title={error.name}
      message_en={error.message}
      buttonLabel="Try Again"
      onClick={
        // Attempt to recover by trying to re-render the invoices route
        () => reset()
      }
    />
  );
}

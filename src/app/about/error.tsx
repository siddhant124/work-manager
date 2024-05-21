"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({error, reset}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

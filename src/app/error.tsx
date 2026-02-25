'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
      <h2 className="text-4xl font-bold text-red-500">Something went wrong!</h2>
      <p className="text-gray-400 max-w-md">
        We encountered an error while trying to fetch the Star Wars data. 
        The archives might be incomplete or the connection was lost.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2 border border-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

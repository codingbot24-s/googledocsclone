"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {error.message || "An unexpected error occurred."}
          </h2>
          {error.digest && (
            <p className="mt-2 text-xs text-gray-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button 
            onClick={reset} 
            variant="default" 
            className="font-meduim">
            <Link href="/">Try again</Link>
          </Button>
          <Button
            asChild
            onClick={reset}
            variant="default"
            className="font-meduim"
          >
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

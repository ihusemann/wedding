"use client";

import { PropsWithChildren, Suspense } from "react";
import SearchForm from "./search-form";

export default function RsvpLayout({ children }: PropsWithChildren) {
  return (
    <div className="mt-8 flex flex-col items-center w-full max-w-2xl mx-auto">
      <Suspense>
        <SearchForm />
        <div className="mt-9">{children}</div>
      </Suspense>
    </div>
  );
}

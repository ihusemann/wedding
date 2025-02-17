import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import CreateEventForm from "./create-event-form";

export default async function EventsLayout({ children }: PropsWithChildren) {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-lg mx-auto py-10 grid grid-cols-1 gap-y-2">
      <div className="mb-4">
        <CreateEventForm />
      </div>
      {children}
    </div>
  );
}

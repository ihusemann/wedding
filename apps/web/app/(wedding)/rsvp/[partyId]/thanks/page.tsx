import { trpc } from "@/trpc/server";
import { Button } from "@repo/ui/components/button";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    partyId: string;
  }>;
};

export default async function ThanksPage({ params }: Props) {
  const { partyId } = await params;
  const guests = await trpc.parties.listGuests({ partyId });

  const allAttending = guests.every(({ rsvp }) => rsvp === "attending");

  const meals: Record<string, string> = {
    steak: "Steak with Potatoes",
    chicken: "Marry-Me Chicken",
    risotto: "Mushroom Risotto (Vegetarian)",
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl text-center font-semibold">
        {allAttending
          ? "We can't wait to see you there!"
          : "Thanks for your response!"}
      </h1>
      <div className="divide-y w-full mt-9 divide-primary/50 border-y border-primary/50">
        {guests.map(({ id, name, rsvp, mealSelection }) => (
          <div key={id} className="py-8 flex items-center justify-between">
            <div className="font-medium relative">{name || "Guest"}</div>
            <div className="flex flex-col space-y-1 items-end">
              {rsvp === "attending" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <CircleCheckBigIcon className="h-4 w-4 text-green-600" />
                    <p className="font-medium text-sm">Attending</p>
                  </div>
                  <p className="text-sm font-mono">{`Meal: ${meals[mealSelection!]}`}</p>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <CircleXIcon className="h-4 w-4 text-red-700" />
                  <p className="font-medium text-sm">Not Attending</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" className="text-base" asChild>
          <Link href={`/rsvp/${partyId}`}>Edit RSVP</Link>
        </Button>
      </div>
    </div>
  );
}

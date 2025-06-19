import { trpc } from "@/trpc/server";
import RsvpForm from "./rsvp-form";
import { Guest } from "@repo/db";

type Props = {
  params: Promise<{
    partyId: string;
  }>;
};

function sortGuests(
  { name: aName, isPlusOne: aPlusOne }: Guest,
  { name: bName, isPlusOne: bPlusOne }: Guest
) {
  if (aName == null && bName == null) return 0;
  if (aName === null) return 1;
  if (bName === null) return -1;

  if (aPlusOne && !bPlusOne) return 1;
  if (!aPlusOne && bPlusOne) return -1;

  return aName.localeCompare(bName);
}

export default async function RsvpPartyPage({ params }: Props) {
  const { partyId } = await params;
  const guests = (await trpc.parties.listGuests({ partyId })).sort(sortGuests);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <RsvpForm guests={guests} />
      </div>
    </>
  );
}

import { trpc } from "@/trpc/server";
import RsvpForm from "./rsvp-form";
import { sortGuests } from "@/lib/util";

type Props = {
  params: Promise<{
    partyId: string;
  }>;
};

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

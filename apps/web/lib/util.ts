import { Guest } from "@repo/db";

export function sortGuests(
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

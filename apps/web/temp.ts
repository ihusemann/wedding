import { rsvpSchema } from "@repo/schemas/rsvp";

const data = {
  id: "5a1cae19-473d-4533-9e09-85c85029be31",
  isPlusOne: false,
  name: "Ike",
  rsvp: "Attending",
  mealSelection: "Chicken",
};

(() => {
  try {
    rsvpSchema.parse(data);
    console.log("ok");
  } catch (e) {
    console.log(e);
  }
})();

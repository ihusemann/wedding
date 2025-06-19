"use client";

import { partyRsvpSchema } from "@repo/schemas/rsvp";
import { FieldArrayWithId, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@repo/ui/components/form";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Input } from "@repo/ui/components/input";

type Props = FieldArrayWithId<z.infer<typeof partyRsvpSchema>> & {
  index: number;
};

export default function GuestForm({ name, index, isPlusOne }: Props) {
  const { control } = useFormContext<z.infer<typeof partyRsvpSchema>>();
  const rsvp = useWatch({
    control,
    name: `guests.${index}.rsvp`,
  });

  console.log(name, isPlusOne);

  return (
    <div className="py-8 flex items-center justify-between">
      <div className="font-medium relative">
        {name || "Guest Name Unknown"}
        <span className="text-base text-red-600 absolute -top-1 -right-3">
          *
        </span>
      </div>
      <div className="flex flex-col space-y-1">
        <FormField
          control={control}
          name={`guests.${index}.rsvp`}
          render={({ field: { onChange, value } }) => (
            <FormItem className="mb-1">
              <FormControl>
                <RadioGroup
                  defaultValue={value}
                  onValueChange={onChange}
                  className="grid grid-cols-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="attending" />
                    </FormControl>
                    <FormLabel className="font-medium">Attending</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="declined" />
                    </FormControl>
                    <FormLabel className="font-medium">Not Attending</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {rsvp === "attending" && (
          <>
            {(!name || isPlusOne) && (
              <FormField
                control={control}
                name={`guests.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name={`guests.${index}.mealSelection`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Meal selection</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Select meal option"
                          className="w-full shrink-0"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="steak" className="py-2.5">
                        Steak with Potatoes
                      </SelectItem>
                      <SelectItem value="chicken" className="py-2.5">
                        Marry-Me Chicken
                      </SelectItem>
                      <SelectItem value="risotto" className="py-2.5">
                        Mushroom Risotto (Vegetarian)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}

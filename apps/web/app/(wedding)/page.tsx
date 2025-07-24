import Image from "next/image";
import heroImage from "../Isaac53.jpg";
import image1 from "../assets/compressed/Isaac23.jpg";
import image2 from "../assets/compressed/Isaac41.jpg";
import image3 from "../assets/compressed/Isaac49.jpg";
import image4 from "../assets/Isaac20.jpg";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="pt-12 ">
        <div className="w-full flex h-[90svh] items-center overflow-hidden justify-center">
          <Image
            src={heroImage}
            alt=""
            className="object-cover h-full object-top"
            width={2000}
          />
        </div>
      </div>

      <div className=" mt-3">
        <div className="text-base max-w-sm tracking-tight">
          We&apos;re getting married! We hope you can join us to celebrate our
          special day.
        </div>
      </div>

      {/* <div className="relative mb-12 opacity-80">
        <div className="absolute left-1/2 text-sm -translate-x-1/2 px-3 top-0 -translate-y-1/2 bg-background uppercase tracking-[0.2em] font-medium">
          We&apos;re getting married
        </div>
        <div className="h-px w-full bg-primary" />
      </div> */}

      {/* <div className="my-24 grid grid-cols-2 max-w-3xl mx-auto place-items-center">
        <div>
          <p className="text-sm font-serif">When</p>
          <div className="flex flex-col -space-y-1 text-lg tracking-wide">
            <p>Friday</p>
            <p>October 10, 2025</p>
            <p>4:00 pm</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-serif">Where</p>
          <div className="flex flex-col -space-y-1 text-lg tracking-wide">
            <p>Ravenswood Event Center</p>
            <p>4021 N Ravenswood Ave</p>
            <p>Chicago, IL</p>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] my-16 gap-x-24 items-center  max-w-5xl mx-auto">
        <div>
          <div className="w-full lg:max-w-[400px] flex items-center justify-start">
            <Image
              src={image2}
              alt=""
              className="object-cover object-bottom h-full w-full"
              width={500}
            />
          </div>
        </div>
        <div className="grid grid-cols-[80px,1fr] sm:grid-cols-[150px,1fr] gap-y-20 gap-x-12 text-sm mt-12 lg:mt-0 uppercase font-mono">
          <div className="text-sm font-semibold uppercase">Itinerary</div>
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between space-x-2">
              <div className="text-sm">5:00 PM</div>
              <div className="grow border-b-2 border-primary h-[calc(50%+2px)] border-dotted" />
              <div className="text-sm">Arrival</div>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="text-sm">5:30 PM</div>
              <div className="grow border-b-2 border-primary h-[calc(50%+2px)] border-dotted" />
              <div className="text-sm">Ceremony</div>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="text-sm">6:00 PM</div>
              <div className="grow border-b-2 border-primary h-[calc(50%+2px)] border-dotted" />
              <div className="text-sm">Cocktails</div>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="text-sm">7:00 PM</div>
              <div className="grow border-b-2 border-primary h-[calc(50%+2px)] border-dotted" />
              <div className="text-sm">Dinner</div>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="text-sm">8:30 PM</div>
              <div className="grow border-b-2 border-primary h-[calc(50%+2px)] border-dotted" />
              <div className="text-sm">Dancing</div>
            </div>
          </div>
          <div className="grid grid-cols-[80px,1fr] sm:grid-cols-[150px,1fr] gap-x-12 text-sm uppercase font-mono">
            <div className="text-sm font-semibold uppercase">Wear</div>
            <div className="flex flex-col gap-y-1">
              <div className="whitespace-nowrap">Cocktail attire</div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12  text-sm gap-x-12 max-w-lg w-full mx-auto">
        <div>
          We are so grateful to have you as a part of our lives, and your
          presence at our wedding is the greatest gift of all. If you would like
          to celebrate this occasion with a gift, we have created a registry.
        </div>
        <div className="flex max-w-md justify-center items-center h-full mt-6">
          <Link
            href="https://www.zola.com/registry/isaacandlaura2025/?preview=true"
            target="_blank"
            className="border border-primary hover:underline hover:underline-offset-2 px-5 text-xs flex items-center uppercase h-fit py-3 font-medium tracking-wide"
          >
            View our wedding registry
            <ArrowUpRightIcon className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-x-4 mb-12 overflow-hidden">
        <div className="md:h-[500px] hidden md:flex items-center justify-center">
          <Image
            src={image4}
            alt=""
            className="object-cover object-bottom h-full w-full"
            width={500}
          />
        </div>
        <div className="md:h-[500px] hidden lg:flex items-center justify-center">
          <Image
            src={image1}
            alt=""
            className="object-cover h-full object-bottom"
            width={500}
          />
        </div>
        <div className="md:h-[500px] flex items-center justify-center">
          <Image
            src={image3}
            alt=""
            className="object-cover object-bottom h-full"
            width={500}
          />
        </div>
      </div>

      <div className="my-12">
        <div className="grid grid-cols-1 max-w-sm md:grid-cols-2 md:max-w-3xl mx-auto w-full gap-12 text-sm font-mono">
          <div>
            <div className="font-bold">What is the RSVP deadline?</div>
            <div>
              We kindly ask that you{" "}
              <Link href="/rsvp" className="underline underline-offset-2">
                RSVP
              </Link>{" "}
              by Saturday, September 20th.
            </div>
          </div>
          <div>
            <div className="font-bold">What should I wear?</div>
            <div>
              Cocktail attire includes suits, cocktail dresses, or polished
              separates—think festive and stylish, but not too formal. Come
              celebrate with us in your sharpest party look!
            </div>
          </div>
          <div>
            <div className="font-bold">Can I bring a gift?</div>
            <div>
              There will be a box for cards at the venue. If you wish to gift a
              physical object that does not fit inside a card, we kindly ask
              that you ship it to the address on our{" "}
              <Link
                href="https://www.zola.com/registry/isaacandlaura2025/?preview=true"
                target="_blank"
                className="underline underline-offset-2"
              >
                registry
              </Link>
              . Thank you for your generosity!
            </div>
          </div>
          <div>
            <div className="font-bold">Is there parking?</div>
            <div>
              There is no dedicated parking at the venue. Free street parking
              should be readily available on Ravenswood Ave or on the
              surrounding blocks. Take care not to park in permit-only areas!
            </div>
          </div>
          <div>
            <div className="font-bold">Can I bring my kids?</div>
            <div>
              Unless specifically listed on the invitation, we kindly ask that
              your kids stay home.
            </div>
          </div>
          <div>
            <div className="font-bold">Do you have a hotel block?</div>
            <div>
              No, we don&apos;t have a hotel block. There are plenty of hotels
              and AirBnbs in the area to choose from!
            </div>
          </div>

          <div>
            <div className="font-bold">Do I need to bring cash?</div>
            <div>
              Nope! We&apos;ll be handling gratuity with all event staff.
            </div>
          </div>
          <div>
            <div className="font-bold">Who made this cool website?</div>
            <div>The groom!</div>
          </div>
        </div>
      </div>
    </>
  );
}

import { PropsWithChildren } from "react";
import Flower from "../assets/flower.png";
import Image from "next/image";
import Links from "./links";

export default async function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="pb-8">
      <div className="px-8 py-8 flex flex-col md:flex-row gap-y-12 md:gap-y-0">
        <div className="flex md:flex-col flex-col-reverse items-start gap-y-6">
          <Links />
          {/* <div className="mt-4">
              <div>Love,</div>
              <div>L &amp; I</div>
            </div> */}
          <Image src={Flower} alt="" height={70} className="object-contain" />
        </div>

        <div className="flex md:ml-auto justify-around md:justify-normal md:gap-x-24">
          <div>
            <p className="font-bold uppercase text-sm mb-1">Date &amp; Time</p>
            <p className="text-sm uppercase">Friday, October 10</p>
            <p className="text-sm uppercase">5:00 PM - 12:00 AM</p>
          </div>
          <div>
            <p className="font-bold uppercase text-sm mb-1">
              Ceremony &amp; Reception
            </p>
            <p className="text-sm uppercase">Ravenswood Event Center</p>
            <p className="text-sm uppercase">4021 N Ravenswood Ave</p>
            <p className="text-sm uppercase">Chicago, IL</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

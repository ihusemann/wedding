import Flower from "@/components/flower";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
// import Flower from "../../assets/flower.png";
// import Image from "next/image";

export default async function LoginLayout({ children }: PropsWithChildren) {
  if ((await cookies()).get("session")?.value === process.env.WEBSITE_PASSWORD)
    redirect("/");

  return (
    <div className="bg-[#efe8da] h-screen w-screen flex items-center justify-center px-4">
      {/* <Image src={Flower} alt="" height={70} className="object-contain" /> */}
      <div className="flex flex-col items-center text-center">
        <Flower className="h-24 w-24 mb-4 -ml-4" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          We&apos;re getting married!
        </h1>
        <p className="text-base md:text-lg mb-4">
          Please sign in using the password on the invitation
        </p>
        {children}
      </div>
    </div>
  );
}

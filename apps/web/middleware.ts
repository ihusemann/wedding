import { NextRequest, NextResponse } from "next/server";

function hashPassword(password: string): string {
  return password;
  // return crypto.createHash("sha256").update(password).digest("hex");
}

if (!process.env.WEBSITE_PASSWORD) throw new Error();

export default function middleware(request: NextRequest) {
  const pw = request.cookies.get("session");

  const { pathname } = request.nextUrl;

  console.log(pathname);

  if (pathname === "/login") return NextResponse.next();

  if (
    pw &&
    hashPassword(pw.value) === hashPassword(process.env.WEBSITE_PASSWORD!)
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.nextUrl.clone()));
}

export const config = {
  // matcher: ["/((?!_next|favicon\\.ico|images|fonts).*)"],
  matcher: ["/", "/rsvp/:path*"],
};

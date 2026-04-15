import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED = ["/dashboard", "/editor"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Run middleware on all routes except static files and Next internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logos|.*\\.svg|.*\\.png).*)"],
};

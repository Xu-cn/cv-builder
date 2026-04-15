import { NextRequest, NextResponse } from "next/server";

// Only these routes require a session
const PROTECTED = ["/dashboard", "/editor"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // NextAuth v5 stores the session in one of these two cookies
  const session =
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token");

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|logos|.*\\.svg|.*\\.png).*)"],
};

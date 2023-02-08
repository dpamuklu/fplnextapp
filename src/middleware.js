import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  if (!session) return NextResponse.redirect(url);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/standings/:path*", "/fixtures/:path*", "/results/:path*"],
};

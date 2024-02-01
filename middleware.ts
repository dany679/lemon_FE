// // /middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: "/((?!.*\\.).*)" }; //stop middleware in static files please
export async function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  // const session = request.cookies.get("token")?.value || "";
  const pathname = request.nextUrl.pathname;
  const publicPaths = ["/login", "/registrar"];
  const isPublic =
    publicPaths.includes(pathname) || pathname.startsWith("/api/auth");

  if (isPublic) return NextResponse.next();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  // console.log("MIDDLEWARE-----------------------------------------------");
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

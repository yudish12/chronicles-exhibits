import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  let size = null;

  // Match against possible patterns
  const sizeMatch = pathname.match(/\/booth\/size\/([^/]+)/) || pathname.match(/\/([^/]+)-trade-show-booth/);

  if (sizeMatch) {
    size = sizeMatch[1];
    console.log("Extracted size:", size);
  }

  const response = NextResponse.next();
  if (size) {
    response.headers.set("X-Booth-Size", size);
  }

  return response;
}

export const config = {
  matcher: [
    "/booth/:path*",
    "/:size-trade-show-booth",
    "/:size-trade-show-booth/:booth_code",
  ],
};

"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("access-token");
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (accessToken === undefined) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/")) {
    if (accessToken !== undefined || accessToken !== "") {
      return NextResponse.rewrite(new URL("/dashboard/schedules", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

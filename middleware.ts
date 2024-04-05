"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { updateSession } from "./utils/refreshSupbaseAuth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const auth:any = getCookieAuth()
  // Protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (auth === undefined) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }

  return await updateSession(request);

  // if (request.nextUrl.pathname.startsWith("/")) {
  //   if (accessToken !== undefined) {
  //     return NextResponse.rewrite(new URL("/dashboard/", request.url));
  //   }
  // }
}


const getCookieAuth = () => {
  const cookieStore = cookies();
  const cookieList = cookieStore.getAll();
  let auth;
  cookieList.map((cookie) => {
    auth = JSON.parse(cookie.value);
  })
  return auth;
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { updateSession } from "./utils/refreshSupbaseAuth";

// Utils
import { supabaseAuth } from "./utils/cookiesUtils";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const auth: any = getCookieAuth();
  // const auth: any = supabaseAuth(request);

  // console.log('auth', request.cookies.getAll());
  // console.log('request', request.cookies.getAll());
  // Protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (request.cookies.getAll().length === 0) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
  // console.log(auth);
  // const response = createCSP(request);
  // return response;
  return await updateSession(request);
}

const createCSP = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline' ${
    process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  };
    style-src 'self' ${
      process.env.NODE_ENV === "production" ? `'nonce-${nonce}'` : `'unsafe-inline'`
    };
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

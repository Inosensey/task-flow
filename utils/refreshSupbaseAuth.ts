import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { deleteCookieAuth } from "@/actions/authActions";

export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey: string = process.env.NEXT_PUBLIC_ANON_KEY ?? "";

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if(error) {
    deleteCookieAuth()
  }

  
  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
}

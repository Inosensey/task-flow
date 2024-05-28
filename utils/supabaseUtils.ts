import { cookies } from "next/headers";
import type { NextApiResponse, NextApiRequest } from "next";

import {
  createServerClient,
  type CookieOptions,
  serialize,
} from "@supabase/ssr";

export const getSupabaseUser = async () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const user = await supabase.auth.getUser();

  return user;
};

export const apiRouteSupbaseIns = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader("Set-Cookie", serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader("Set-Cookie", serialize(name, "", options));
        },
      },
    }
  );
  return supabase;
};

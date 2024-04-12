import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";
import { createClient } from "@/utils/supabaseSSR";
// import { getCookieAuth } from "@/utils/cookiesUtils";

// Types
import { TableRow } from "@/Types/database.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  // const auth:any = getCookieAuth();
  try {
    result = await useSupabase
      .from("Schedules")
      .select("*")
      .eq("userId", "fb911397-dd7c-4a85-849d-3c2b34718e05");
    // console.log(auth)
    if (result.error) {
      console.log(result.error);
    }
    const schedules = result;
    // Respond with JSON data
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json(error);
  }
}

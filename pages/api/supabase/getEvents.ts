import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error } = await useSupabase.from("Events").select("*");

    if (error) {
      console.log(error);
    }
    const events = data;
    console.log(events);
    // Respond with JSON data
    return res
      .status(200)
      .json(events);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

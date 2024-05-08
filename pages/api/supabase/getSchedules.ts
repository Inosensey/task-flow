import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

// Types
import { TableRow } from "@/Types/database.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error } = await useSupabase.from("Schedules").select("*");

    if (error) {
      console.log(error);
    }
    const schedules = data;
    // Respond with JSON data
    return res
      .status(200)
      .json({schedules});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

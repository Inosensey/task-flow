import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error } = await useSupabase.from("LocationKeys").select("*");
    if (error) {
      console.log(error);
    }
    const LocationKeys = data;
    // Respond with JSON data
    return res
      .status(200)
      .json(LocationKeys);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

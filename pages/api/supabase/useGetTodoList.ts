import type { NextApiRequest, NextApiResponse } from "next";
import { useSupabase } from "../../../utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error } = await useSupabase.from("TodoList").select("*");

    if (error) {
      console.log(error);
    }
    // Respond with JSON data
    return res
      .status(200)
      .json({ message: "Todo List SuccessFully Fetch", TodoList: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

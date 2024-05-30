import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error } = await useSupabase.from("LocationCategories").select(`*`);
    if (error) {
      console.log(error);
    }
    const LocationCategories = data;
    // Respond with JSON data
    return res
      .status(200)
      .json(LocationCategories);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}


// const { data, error } = await supabase.from('countries').select(`
//   id, 
//   name, 
//   cities ( id, name )
// `)
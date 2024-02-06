import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // req.body.currentDate
  //   city, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category)
  try {
    let { data, error } = await useSupabase
      .from("Schedules")
      .select(
        `*, ScheduleLocation(city, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
      )
      .eq("id", 134);
    if (error) {
      console.log(error);
    }
    const ScheduleDetails = data;
    // Respond with JSON data
    return res.status(200).json(ScheduleDetails);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

// const { data, error } = await supabase.from('countries').select(`
//   id,
//   name,
//   cities ( id, name )
// `)

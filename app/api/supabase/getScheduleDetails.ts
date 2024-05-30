import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   city, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category)
  if (req.query.scheduleId === undefined) return;
  const scheduleId = parseInt(req.query.scheduleId.toString());
  try {
    let { data, error } = await useSupabase
      .from("Schedules")
      .select(
        `*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))`
      )
      .eq("id", scheduleId);
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

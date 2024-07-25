import {routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

// types
import { todoListDetails } from "@/Types/todoListTypes";

export async function GET(
  req: Request
) {
    
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user')?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: schedules, error } = await supabase
      .from("Schedules")
      .select(
        "*, ScheduleLocation(id, city, cityId, namePlace, long, lat, LocationKeys:categoryKeyId(id, key), LocationCategories:categoryKey(id, category))"
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log(error);
    }
    // Respond with JSON data
    return Response.json({ schedules });
  } catch (error) {
    return Response.json({ message: error });
  }
}

import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: locationKeys, error } = await supabase.from("LocationKeys").select(`*`);

    if (error) {
      console.log(error);
    }
    const response = locationKeys;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

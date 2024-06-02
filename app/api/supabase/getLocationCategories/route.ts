import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: locationCategories, error } = await supabase.from("LocationCategories").select(`*`);

    if (error) {
      console.log(error);
    }
    const response = locationCategories;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

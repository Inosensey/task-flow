import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: priorityLevels, error } = await supabase
      .from("PriorityLevel")
      .select("*");

    if (error) {
      console.log(error);
    }
    const response = priorityLevels;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

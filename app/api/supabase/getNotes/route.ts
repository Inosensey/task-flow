import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user")?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: notes, error } = await supabase
      .from("Notes")
      .select(`*,  Schedules:scheduleId(id, title), TodoList:todoId(id, title)`)
      .eq("userId", `${userId}`);

    if (error) {
      console.log(error);
    }
    const response = notes;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

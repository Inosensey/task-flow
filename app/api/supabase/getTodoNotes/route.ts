import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user")?.toString();
  const todoId = searchParams.get("todoId")?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: notes, error } = await supabase
      .from("Notes")
      .select(
        `id, note, scheduleId, todoId, NoteType:noteType(id, type), TodoList:todoId(id, title)`
      )
      .eq("userId", `${userId}`)
      .eq("todoId", `${todoId}`);

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

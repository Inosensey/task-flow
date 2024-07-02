import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const todoId = searchParams.get("todoId")?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: todo, error } = await supabase
      .from("TodoList")
      .select(
        "id, title, description, PriorityLevel(level, description, color), Frequencies(id, frequency), TodoListStatus(id, status)"
      )
      .eq("id", `${todoId}`)

    if (error) {
      return Response.json({ message: error });
    }
    return Response.json({ todo });
  } catch (error) {
    return Response.json({ message: error });
  }
}

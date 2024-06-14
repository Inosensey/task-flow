import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user")?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: noteTypes, error } = await supabase
      .from("NoteType")
      .select(`*`)

    if (error) {
      console.log(error);
    }
    const response = noteTypes;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

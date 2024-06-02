import { routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(req: Request) {
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: frequencies, error } = await supabase
      .from("Frequencies")
      .select("*");

    if (error) {
      console.log(error);
    }
    const response = frequencies;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

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
    let { data: settings, error } = await supabase
      .from("Settings")
      .select(
        "scheduleRemainder"
      )
      .eq("user_id", `${userId}`);

    if (error) {
      console.log(error);
    }

    
    const response = settings;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

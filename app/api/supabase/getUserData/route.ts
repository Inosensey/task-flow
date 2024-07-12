import {routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(
  req: Request
) {
    
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user')?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: userInfo, error } = await supabase
      .from("User")
      .select(
        "username"
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log(error);
    }

    const response = userInfo;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

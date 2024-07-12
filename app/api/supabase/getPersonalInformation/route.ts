import {routeHandlerSupabaseIns } from "@/utils/supabaseUtils";

export async function GET(
  req: Request
) {
    
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user')?.toString();
  const supabase = routeHandlerSupabaseIns();
  try {
    let { data: personalInfo, error } = await supabase
      .from("PersonalInformation")
      .select(
        "firstName, lastName, age, gender, contactNumber, country, state, zip, street"
      )
      .eq("userId", `${userId}`);

    if (error) {
      console.log(error);
    }

    const response = personalInfo;
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

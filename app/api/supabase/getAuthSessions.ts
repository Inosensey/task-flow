import type { NextApiResponse, NextApiRequest } from "next";
import { useSupabase } from "@/utils/useSupabaseClient";

// utils
import { returnError, returnSuccess } from "@/utils/formUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await useSupabase.auth.getSession();
    console.log(data);
    if (error)
      return res
        .status(400)
        .json(
          returnError(
            "An error occurred when getting the authenticated user",
            error.message
          )
        );
    return res.status(200).json(returnSuccess("Authenticated User", data));
  } catch (e) {
    return res
      .status(400)
      .json(
        returnError("An error occurred when getting the authenticated user", e)
      );
  }
}

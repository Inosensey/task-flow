"use server";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";

type credentials = {
  email: string;
  password: string;
};

export const loginAuthWithEmailPass = async (credentials: credentials) => {
  try {
    let result = await useSupabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (result.error) return returnError("Login Failed", result.error);
    return returnSuccess("Login Successfully", result.data);
  } catch (error) {
    return returnError("Login Failed", error);
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const { data, error } = await useSupabase.auth.getSession();
    if (error)
      return returnError(
        "An error occurred when getting the authenticated user",
        error
      );
    return returnSuccess("Authenticated User", data);
  } catch (e) {
    return returnError(
      "An error occurred when getting the authenticated user",
      e
    );
  }
};

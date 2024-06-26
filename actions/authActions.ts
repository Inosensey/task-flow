"use server";
import { cookies } from "next/headers";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";

// Utils
import { returnError, returnSuccess } from "@/utils/formUtils";
import { createClient } from "@/utils/supabaseSSR";
import { getCookieAuth } from "@/utils/cookiesUtils";

type credentials = {
  email: string;
  password: string;
};

export const loginAuthWithEmailPass = async (credentials: credentials) => {
  try {
    const supabase = createClient()
    let result = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (result.error) return returnError("Login Failed", result.error.message);

    return returnSuccess("Login Successfully", result.data.user);
  } catch (error) {
    return returnError("Login Failed", error);
  }
};

export const signOut = async () => {  try {
  // const cookieStore = cookies();
  const supabase = createClient()
  let result = await supabase.auth.signOut();
  if (result.error) return returnError("Sign out Failed:", result.error.message);

  // cookieStore.getAll().forEach((cookie) => {
  //   cookieStore.delete(cookie.name);
  // });

  return true;
} catch (error) {
  return returnError("Sign out Failed:", error);
}
}

export const getAuthenticatedUser = async () => {
  try {
    const { data, error } = await useSupabase.auth.getUser();
    if (error)
      return returnError(
        "An error occurred when getting the authenticated user",
        error.message
      );
    return returnSuccess("Authenticated User", data);
  } catch (e) {
    return returnError(
      "An error occurred when getting the authenticated user",
      e
    );
  }
};


export const deleteCookieAuth = () => {
  const cookieStore = cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
};

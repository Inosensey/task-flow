"use server";
import { cookies } from "next/headers";

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
    if (result.error) return returnError("Login Failed", result.error.message);
    
    cookies().set({name: 'access-token', value: result.data.session.access_token})
    cookies().set({name: 'refresh-token', value: result.data.session.refresh_token})
    cookies().set({name: 'token-type', value: result.data.session.token_type})
    cookies().set({name: 'expires-in', value: result.data.session.expires_in.toString()})

    return returnSuccess("Login Successfully", result.data.user);
  } catch (error) {
    return returnError("Login Failed", error);
  }
};

export const signOut = async () => {  try {
  let result = await useSupabase.auth.signOut();
  if (result.error) return returnError("Sign out Failed:", result.error.message);
  
  cookies().delete('access-token');
  cookies().delete('refresh-token');
  cookies().delete('token-type');
  cookies().delete('expires-in');

  return true;
} catch (error) {
  return returnError("Sign out Failed:", error);
}
}

export const getAuthenticatedUser = async () => {
  try {
    const { data, error } = await useSupabase.auth.getSession();
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

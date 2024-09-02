"use server";
import { cookies } from "next/headers";

// Supabase
import { useSupabase } from "@/utils/useSupabaseClient";
import { createClient } from "@/utils/supabaseSSR";

// Utils
import { returnError, returnResult, returnSuccess } from "@/utils/formUtils";
import { getCookieAuth } from "@/utils/cookiesUtils";

type credentials = {
  email: string;
  password: string;
};
type nameInfo = {
  firstName: string;
  lastName: string;
};
type additionalInfo = {
  age: number;
  gender: string;
  contactNumber: string;
  country: string;
  state: string;
  zip: string;
  street: string;
  userId?: string;
};
type accountInfo = {
  username: string;
  email: string;
  password: string;
};
type personalInfo = nameInfo & additionalInfo & accountInfo;
import { useFormStateType } from "@/Types/formStates";
import { TableInsert } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import { Provider } from "react";

export const signIn = async (
  prevState: useFormStateType,
  formData: FormData
) => {
  try {
    const supabase = createClient();
    let result;
    let personaInfo: personalInfo = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      age: parseInt(formData.get("age") as string),
      gender: formData.get("gender") as string,
      contactNumber: formData.get("contactNumber") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      street: formData.get("street") as string,
      zip: formData.get("zip") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    // Register user
    let { data, error } = await supabase.auth.signUp({
      email: personaInfo.email,
      password: personaInfo.password,
      phone: personaInfo.contactNumber,
    });
    if (error) {
      console.log(error);
      return {
        success: true,
        error: false,
        data: [],
        message: "There is an error creating new account",
      };
    }
    personaInfo.userId = data.user?.id;
    const personalInfoMutationResult: ReturnInterface<
      TableInsert<"PersonalInformation"> | any
    > = await insertProfileInformation(personaInfo);
    const userMutationResult: ReturnInterface<TableInsert<"User"> | any> =
      await insertUserData(personaInfo);
    if (personalInfoMutationResult.Status === "error") {
      return {
        success: false,
        error: true,
        data: [personalInfoMutationResult.Response],
        message: personalInfoMutationResult.Message,
      };
    }
    if (userMutationResult.Status === "error") {
      return {
        success: false,
        error: true,
        data: [],
        message: userMutationResult.Message,
      };
    }
    return {
      success: true,
      error: false,
      data: [data],
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      data: [],
      message: "There is an error creating new account",
    };
  }
};

const insertProfileInformation = async (
  profile: personalInfo
): Promise<ReturnInterface<TableInsert<"PersonalInformation"> | any>> => {
  const supabase = createClient();
  try {
    let result = await supabase
      .from("PersonalInformation")
      .insert<TableInsert<"PersonalInformation">>({
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        gender: profile.gender,
        contactNumber: profile.contactNumber,
        country: profile.country,
        state: profile.state,
        street: profile.street,
        zip: profile.zip,
        userId: profile.userId,
      });

    if (result.error)
      return returnResult(
        "error",
        "There is an error inserting the Profile information",
        result.error
      );
    return returnResult(
      "success",
      "Profile Information Successfully Added",
      result.data
    );
  } catch (error) {
    return returnResult(
      "error",
      "There is an error inserting the Profile information",
      error
    );
  }
};

const insertUserData = async (
  profile: personalInfo
): Promise<ReturnInterface<TableInsert<"User"> | any>> => {
  const supabase = createClient();
  // Insert User data
  try {
    let result = await supabase
      .from("User")
      .insert({ username: profile.username, userId: profile.userId });
    if (result.error)
      return returnResult(
        "error",
        "There is an error inserting the User Data",
        result.error
      );
    return returnResult("success", "User Data Successfully Added", result.data);
  } catch (error) {
    return returnResult(
      "error",
      "There is an error inserting the User Data",
      error
    );
  }
};

export const loginAuthWithEmailPass = async (credentials: credentials) => {
  try {
    const supabase = createClient();
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

export const loginWithThirdParty = async (providerString: any) => {
  let nextUrl;
  if (process.env.NODE_ENV === "development") {
    nextUrl = `${process.env.NEXT_DEV_URL}auth/callback?next=/dashboard`;
  } else {
    nextUrl = `${process.env.NEXT_PROD_URL}auth/callback?next=/dashboard`;
  }
  try {
    const supabase = createClient();
    const provider = providerString;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: nextUrl,
        queryParams: {
          next: "/dashboard",
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) return returnError("Login Failed", error.message);

    const response: { redirectLink: string; loginType: string } = {
      redirectLink: data.url,
      loginType: "thirdParty",
    };

    return returnSuccess<{ redirectLink: string; loginType: string }>(
      "Login Successfully",
      response
    );
  } catch (error) {
    return returnError("Login Failed", error);
  }
};

export const signOut = async () => {
  try {
    // const cookieStore = cookies();
    const supabase = createClient();
    let result = await supabase.auth.signOut();
    if (result.error)
      return returnError("Sign out Failed:", result.error.message);

    // cookieStore.getAll().forEach((cookie) => {
    //   cookieStore.delete(cookie.name);
    // });

    return true;
  } catch (error) {
    return returnError("Sign out Failed:", error);
  }
};

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

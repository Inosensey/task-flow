"use server";
import { revalidateTag } from "next/cache";

// Utils
import { createClient } from "@/utils/supabaseSSR";
import { getSupabaseUser } from "@/utils/supabaseUtils";

//Types
import { useFormStateType } from "@/Types/formStates";
import { TableUpdate } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import { returnResult } from "@/utils/formUtils";
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

export const mutatePersonalInformation = async (
  prevState: useFormStateType,
  formData: FormData
) => {
  try {
    let result: ReturnInterface<TableUpdate<"PersonalInformation"> | any>;
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
      userId: formData.get("userId") as string
    };

    result = await updateProfileInformation(personaInfo);
    revalidateTag("personalInformation")

    if (result.Status === "error") {
      return {
        success: false,
        error: true,
        data: [result.Response],
        message: "There is an error creating new account",
      };
    }
    
    return {
      success: true,
      error: false,
      data: [],
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

const updateProfileInformation = async (
  profile: personalInfo
): Promise<ReturnInterface<TableUpdate<"PersonalInformation"> | any>> => {
  const supabase = createClient();
  try {
    let result = await supabase
      .from("PersonalInformation")
      .update<TableUpdate<"PersonalInformation">>({
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        gender: profile.gender,
        contactNumber: profile.contactNumber,
        country: profile.country,
        state: profile.state,
        street: profile.street,
        zip: profile.zip,
      })
      .eq("userId", profile.userId);

    if (result.error)
      return returnResult(
        "error",
        "There is an error updating the Profile information",
        result.error
      );
    return returnResult(
      "success",
      "Profile Information Successfully Updated",
      result.data
    );
  } catch (error) {
    return returnResult(
      "error",
      "There is an error updating the Profile information",
      error
    );
  }
};

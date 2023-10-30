import type { NextApiRequest, NextApiResponse } from "next";
import { useSupabase } from "../../../utils/useSupabaseClient";
import { Database, Table } from "@/Types/database.types";

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
  confirmPassword: string;
};
interface SignUpInfo {
  nameInfo: nameInfo;
  additionalInfo: additionalInfo;
  accountInfo: accountInfo;
}

const insertProfile = async (
  personalInformation: additionalInfo,
  nameInformation: nameInfo,
  userInfo: any
) => {
  const additionalInfo: additionalInfo = personalInformation;
  const nameInfo: nameInfo = nameInformation;
  try {
    let { data, error } = await useSupabase.from("PersonalInformation").insert({
      firstName: nameInfo.firstName,
      lastName: nameInfo.lastName,
      age: additionalInfo.age,
      gender: additionalInfo.gender,
      contactNumber: additionalInfo.contactNumber,
      country: additionalInfo.country,
      state: additionalInfo.state,
      street: additionalInfo.street,
      zip: additionalInfo.zip,
      userId: userInfo.user?.id,
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
};

const insertUserData = async (userInfo: any, profileInfo: accountInfo) => {
  const accountInfo: accountInfo = profileInfo;
  // Insert User data
  try {
    let { data, error } = await useSupabase
      .from("User")
      .insert({ username: accountInfo.username, userId: userInfo.user?.id });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userInfo: SignUpInfo = req.body.userInfo;
    const nameInfo: nameInfo = userInfo.nameInfo;
    const accountInfo: accountInfo = userInfo.accountInfo;
    const additionalInfo: additionalInfo = userInfo.additionalInfo;

    // Register user
    let { data, error } = await useSupabase.auth.signUp({
      email: accountInfo.email,
      password: accountInfo.password,
      phone: additionalInfo.contactNumber,
    });

    insertUserData(data, accountInfo);
    insertProfile(additionalInfo, nameInfo, data);

    // Respond with JSON data
    return res.status(200).json({ message: "Success", userData: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

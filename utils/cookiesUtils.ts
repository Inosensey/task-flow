"use server";

import { cookies } from "next/headers";

export const getCookieAuth = () => {
  const cookieStore = cookies();
  const cookieList = cookieStore.getAll();
  let auth;
  cookieList.map((cookie) => {
    auth = JSON.parse(cookie.value);
  });
  return auth;
};


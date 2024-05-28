"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const getCookieAuth = () => {
  const cookieStore = cookies();
  const cookieList = cookieStore.getAll();
  let auth;
  if(!cookieList) return 
  cookieList.map((cookie) => {
    auth = JSON.parse(cookie.value);
  });
  return auth;
};

export const supabaseAuth = (request:NextRequest) => {
  const cookieStore = request.cookies
  const cookieList = cookieStore.getAll();
  let auth;
  cookieList.map((cookie) => {
    auth = JSON.parse(cookie.value);
  });
  return auth;
}
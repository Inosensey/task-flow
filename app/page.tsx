"use client";

import { getAuthenticatedUser } from "@/actions/authActions";
import SignIn from "@/components/HomeComponents/SignIn";
import SignUp from "@/components/HomeComponents/SignUp";
import { Playfair_Display, Roboto, Poppins } from "next/font/google";
import { useEffect, useState } from "react";

// Import fonts
const playFairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});


export default function Home() {
  // States
  const [currentForm, setCurrentForm] = useState<string>("Sign In")

  return (
    <main className="bg-Primary flex h-screen items-center justify-center">
      {currentForm === "Sign In" && <SignIn setCurrentForm={setCurrentForm} />}
      {currentForm === "Sign Up" && <SignUp setCurrentForm={setCurrentForm} />}
    </main>
  );
}

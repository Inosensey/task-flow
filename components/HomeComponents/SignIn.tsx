import React from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Roboto, Poppins } from "next/font/google";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

// Icons
import SolarChecklistMinimalisticBroken from "@/Icones/SolarChecklistMinimalisticBroken";

// Actions
import { loginAuthWithEmailPass } from "@/actions/authActions";

// Utils
import { useFormSerialize } from "@/utils/formUtils";

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

// Types
// Set prop types
type props = {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
};
type credentials = {
  email: string;
  password: string;
};

const SignIn = ({ setCurrentForm }: props) => {
  // Initial use query
  const queryClient = useQueryClient();

  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: (credentials: credentials) => {
      return loginAuthWithEmailPass(credentials);
    },
    onSuccess: (data) => {
      console.log(data);
      // queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues: credentials = useFormSerialize(event);
    console.log(formValues);
    mutate(formValues);
  };
  return (
    <section className="bg-white rounded-2xl text-black p-3 relative phone:h-[390px] phone:w-11/12">
      <div className="flex items-center gap-2">
        <h1
          className={`${poppins.className} text-LightPrimary font-bold text-2xl`}
        >
          Task Flow
        </h1>
        <SolarChecklistMinimalisticBroken />
      </div>
      <small className="text-Secondary">Your Personal Task Manager</small>
      <form className="flex flex-col phone:py-4 phone:px-2 gap-3" onSubmit={useHandleFormSubmit}>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="bg-Secondary text-white px-2 py-3 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="bg-Secondary text-white px-2 py-3 rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-LightPrimary text-lg text-LightSecondary rounded-xl mt-2 phone:w-max phone:px-9 phone:py-2"
          >
            Sign In
          </motion.button>
        </div>
      </form>
      <div className="text-center absolute bottom-1 left-[50%] -translate-x-[50%] w-52">
        <p>
          Don&apos;t have an account yet?{" "}
          <span
            onClick={() => setCurrentForm("Sign Up")}
            className="cursor-pointer underline text-LightPrimary"
          >
            Sign Up
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignIn;

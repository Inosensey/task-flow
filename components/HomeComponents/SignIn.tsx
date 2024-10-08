import React, { useState } from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Roboto, Poppins } from "next/font/google";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Icons
import SolarChecklistMinimalisticBroken from "@/Icones/SolarChecklistMinimalisticBroken";
import MdiGithub from "@/Icones/MdiGithub";
import TablerBrandGoogle from "@/Icones/TablerBrandGoogle";

// Actions
import {
  loginAuthWithEmailPass,
  loginWithThirdParty,
} from "@/actions/authActions";

// Utils
import { useFormSerialize } from "@/utils/formUtils";
import CarbonLogin from "@/Icones/CarbonLogin";

// Components
import Loading from "../ReusableComponents/Loading/Loading";
import ThirdPartyLoginButton from "./ThirdPartyLoginButton";

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
type loginError = {
  isError: boolean;
  errorMessage: any;
};
interface mutateProps {
  credentials?: credentials;
  loginType: string;
  provider?: string;
}

const SignIn = ({ setCurrentForm }: props) => {
  // Initialize useRouter
  const router = useRouter();

  // states
  const [loginProcessInfo, setLoginProcessInfo] = useState<{
    isLoading: boolean;
    message: string;
  }>({
    isLoading: false,
    message: "",
  });
  const [loginError, setLoginError] = useState<loginError>({
    isError: false,
    errorMessage: "",
  });

  // Initial use query
  const queryClient = useQueryClient();

  // Mutation
  const { status, error, mutate, isPending, isSuccess, isIdle } = useMutation({
    mutationFn: ({ credentials, loginType, provider }: mutateProps) => {
      if (loginType === "loginWithEmail") {
        setLoginProcessInfo({
          isLoading: true,
          message: "Authenticating Your Credentials 🔍",
        });
        return loginAuthWithEmailPass(credentials!);
      }
      {
        setLoginProcessInfo({
          isLoading: true,
          message: `Redirecting to ${provider} 🔍`,
        });
        return loginWithThirdParty(provider!);
      }
    },
    onSuccess: (data) => {
      const res: any = data.Response;
      if (data.Status === "Error") {
        setLoginError({
          isError: true,
          errorMessage: data.Response,
        });
        setLoginProcessInfo({
          isLoading: false,
          message: "",
        });
        return;
      }
      if (res.loginType === "thirdParty") {
        router.push(res.redirectLink);
      } else {
        setLoginProcessInfo({
          isLoading: true,
          message: "Success! Redirecting to Your Workspace 🛠️",
        });
        queryClient.setQueryData(["user-session"], data);
        router.push("/dashboard");
      }
    },
  });

  const useLoginWithThirdParty = (loginType: string, provider: string) => {
    mutate({ loginType: loginType, provider: provider });
  };

  const useHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues: credentials = useFormSerialize(event);
    mutate({ credentials: formValues, loginType: "loginWithEmail" });
  };
  return (
    <>
      <Loading
        isLoading={loginProcessInfo.isLoading}
        message={loginProcessInfo.message}
      />

      <section
        data-testid="signIn-container"
        className="bg-white rounded-xl text-black p-3 relative phone:mt-12 phone:h-[410px] phone:w-11/12 tablet:max-w-[420px]"
      >
        <div className="flex items-center gap-2">
          <h1
            className={`${poppins.className} text-LightPrimary font-bold text-2xl`}
          >
            Task Flow
          </h1>
          <SolarChecklistMinimalisticBroken />
        </div>
        <small className="text-Secondary">Your Personal Task Manager</small>
        <form
          className="flex flex-col phone:py-4 phone:px-2 gap-3"
          onSubmit={useHandleFormSubmit}
        >
          <div data-testid="email-input" className="flex flex-col">
            <label className="phone:text-sm">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="bg-Secondary text-white px-2 py-3 rounded-md phone:text-sm"
            />
          </div>
          <div data-testid="password-input" className="flex flex-col">
            <label className="phone:text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="bg-Secondary text-white px-2 py-3 rounded-md phone:text-sm"
            />
          </div>
          {loginError.isError && (
            <p className="text-Error bg-SmoothError px-2 py-1 text-sm font-semibold">
              {loginError.errorMessage}
            </p>
          )}
          <div
            data-testid="signIn-button"
            className="flex justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-LightPrimary flex items-center gap-2 text-base text-LightSecondary rounded-md mt-2 phone:w-max phone:px-3 phone:py-2"
            >
              <CarbonLogin color="#fff" />
              Sign In
            </motion.button>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <p className="max-w-max phone:text-sm text-LightPrimary">
            Or Sign in Using
          </p>
          <div className="flex gap-2" data-testid="third-party-login">
            <ThirdPartyLoginButton
              mutateFn={useLoginWithThirdParty}
              buttonName="Google"
              provider="google"
              Icon={TablerBrandGoogle}
              backgroundColor="#34A853"
            />
            <ThirdPartyLoginButton
              mutateFn={useLoginWithThirdParty}
              buttonName="Github"
              provider="github"
              Icon={MdiGithub}
              backgroundColor="#181717"
            />
          </div>
        </div>
        <div
          data-testid="signUp-button"
          className="text-center absolute bottom-1 left-[50%] -translate-x-[50%] w-52"
        >
          <p className="phone:text-sm w-max">
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
    </>
  );
};

export default SignIn;

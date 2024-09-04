import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import SignUp from "@/components/HomeComponents/SignUp";
import FirstStep from "@/components/HomeComponents/SignUpSteps/FirstStep";
import SecondStep from "@/components/HomeComponents/SignUpSteps/SecondStep";
import ThirdStep from "@/components/HomeComponents/SignUpSteps/ThirdStep";

const queryClient = new QueryClient();

// Mocks
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    useFormState: () => [
      [
        {
          // Return a mock state object
          success: null,
          error: null,
          message: "",
          data: [],
        },
        // Mock setState function
        jest.fn(),
      ],
    ],
  };
});

describe("Sign Up Component", () => {
  it("Renders the Sign Up Form", () => {
    const setCurrentForm = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp setCurrentForm={setCurrentForm} />
      </QueryClientProvider>
    );
    // check if all important elements are present
    expect(screen.getByTestId("signUp-container")).toBeInTheDocument();
    expect(screen.getByTestId("first-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("second-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("third-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("navigate-submit-container")).toBeInTheDocument();
    expect(screen.getByTestId("signIn-button")).toBeInTheDocument();
  });

  it("Renders the First Step of the Sign Up form", () => {
    const setNameInfo = jest.fn();
    const setIsValid = jest.fn();
    const nameInfo: { firstName: string; lastName: string } = {
      firstName: "Philip",
      lastName: "Dingcong",
    };
    const currentStep = 1;
    render(
      <FirstStep
        currentStep={currentStep}
        nameInfo={nameInfo}
        setIsValid={setIsValid}
        setNameInfo={setNameInfo}
      />
    );

    // check if all important elements are present
    expect(screen.getByTestId("first-step")).toBeInTheDocument();
    expect(screen.getByTestId("greetings-container")).toBeInTheDocument();
    expect(screen.getByTestId("firstName-input")).toBeInTheDocument();
    expect(screen.getByTestId("secondName-input")).toBeInTheDocument();
  });

  it("Renders the Second Step of the Sign Up form", () => {
    const setAdditioNalInfo = jest.fn();
    const setIsValid = jest.fn();

    const additionalInfo: {
      age: string;
      gender: string;
      contactNumber: string;
      country: string;
      state: string;
      zip: string;
      street: string;
    } = {
      age: "",
      gender: "",
      contactNumber: "",
      country: "",
      state: "",
      zip: "",
      street: "",
    };
    const firstName: string = "Philip";
    const currentStep = 2;

    render(
      <SecondStep
        additionalInfo={additionalInfo}
        currentStep={currentStep}
        firstName={firstName}
        setAdditioNalInfo={setAdditioNalInfo}
        setIsValid={setIsValid}
      />
    );

    // check if all important elements are present
    expect(screen.getByTestId("second-step")).toBeInTheDocument();
    expect(screen.getByTestId("greetings-container")).toBeInTheDocument();
    expect(screen.getByTestId("age-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-input")).toBeInTheDocument();
    expect(screen.getByTestId("contactNumber-input")).toBeInTheDocument();
    expect(screen.getByTestId("country-input")).toBeInTheDocument();
    expect(screen.getByTestId("state-input")).toBeInTheDocument();
    expect(screen.getByTestId("street-input")).toBeInTheDocument();
    expect(screen.getByTestId("zip-input")).toBeInTheDocument();
  });

  it("Renders the Third Step of the Sign Up Form", () => {
    const setAccountInfo = jest.fn();
    const setIsValid = jest.fn();

    const currentStep = 3;
    const accountInfo: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    render(
      <ThirdStep
        accountInfo={accountInfo}
        setAccountInfo={setAccountInfo}
        currentStep={currentStep}
        setIsValid={setIsValid}
      />
    );
    
    // check if all important elements are present
    expect(screen.getByTestId("third-step")).toBeInTheDocument();
    expect(screen.getByTestId("greetings-container")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
  });
});

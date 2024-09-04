import SignIn from "@/components/HomeComponents/SignIn";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// Mocks
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  }, 
}));


describe("Sign In Component", () => {
  it("Renders the Sign In Form", () => {
    const setCurrentForm = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <SignIn setCurrentForm={setCurrentForm} />
      </QueryClientProvider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("signIn-container")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("signIn-button")).toBeInTheDocument();
    expect(screen.getByTestId("third-party-login")).toBeInTheDocument();
    expect(screen.getByTestId("signUp-button")).toBeInTheDocument();
  });
});

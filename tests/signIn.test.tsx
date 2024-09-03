import SignIn from "@/components/HomeComponents/SignIn";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// Mock useRouter:
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
    expect(screen.getByTestId("login-contianer")).toBeInTheDocument();
  });
});

import Sidebar from "@/components/ReusableComponents/Sidebar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

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

describe("Sidebar", () => {
  it("Renders the Sidebar", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Sidebar />
      </QueryClientProvider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});

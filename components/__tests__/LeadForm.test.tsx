import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeadForm from "@/components/LeadForm";
import "@testing-library/jest-dom";
import axios from "axios";

// mock axios module
vi.mock("axios");
const mockedAxios = axios as unknown as { post: ReturnType<typeof vi.fn> };

// mock next/router
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// fill form
const fillForm = async () => {
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "Edward" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Akoto" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "edward@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/LinkedIn/i), {
    target: { value: "https://linkedin.com/in/edward" },
  });

  fireEvent.mouseDown(screen.getByText("Country of Citizenship"));
  const option = await screen.findByRole("option", {
    name: "United States of America",
  });
  fireEvent.click(option);
};

describe("LeadForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    mockedAxios.post.mockReset();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<LeadForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const errors = [
      "First name is required",
      "Last name is required",
      "Email is required",
      "LinkedIn is required",
      "Please select country of Citizenship",
    ];

    for (const text of errors) {
      expect(await screen.findByText(text)).toBeInTheDocument();
    }
  });

  it("submits successfully when form is filled", async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(<LeadForm />);
    await fillForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/thank-you"));
  });
});

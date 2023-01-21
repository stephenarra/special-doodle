import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "jsdom-testing-mocks";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

const mockUseSession = useSession as jest.Mock;

describe("Home", () => {
  const renderHome = (user: object | null = null) => {
    mockUseSession.mockReturnValue({
      status: user ? "authenticated" : "unauthenticated",
      data: user ? { user, expires: "3000-02-20T21:29:10.775Z" } : null,
    });

    render(<Home />);
  };

  it("renders a heading", () => {
    renderHome();

    const heading = screen.getByRole("heading", {
      name: /Hello world!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders a login when logged out", async () => {
    const user = userEvent.setup();
    renderHome();

    const logInButton = screen.queryByRole("button", {
      name: "Sign In",
    });

    expect(logInButton).toBeInTheDocument();

    await user.click(logInButton as HTMLElement);

    const googleLogInButton = screen.queryByRole("button", {
      name: "Sign In with Google",
    });

    expect(googleLogInButton).toBeInTheDocument();
  });

  it("renders user dropdown when logged in", async () => {
    const user = userEvent.setup();
    const userObj = {
      email: "foo@bar.com",
      name: "Delta",
      image: "c.svg",
    };
    renderHome(userObj);

    const userDropdown = screen.getByAltText(userObj.email);
    const logInButton = screen.queryByRole("button", {
      name: "Sign In",
    });

    expect(userDropdown).toBeInTheDocument();
    expect(logInButton).not.toBeInTheDocument();
  });
});

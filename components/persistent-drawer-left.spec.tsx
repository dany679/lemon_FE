import { describe, expect, it } from "@jest/globals";
import { fireEvent } from "@testing-library/dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { act } from "react-dom/test-utils";
import PersistentDrawerLeft from "./persistent-drawer-left";

jest.mock("next-auth/react");

describe("Layout", () => {
  beforeEach(() => {
    async () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: {
            username: "jeffrafter",
          },
        },
        status: "authenticated",
      });
    };
  });
  it("renders correctly when signed out", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });

    render(<PersistentDrawerLeft />);
    expect(screen.getByText("Login"));
  });

  it("renders correctly when signed in", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "user name",
        },
      },
      status: "authenticated",
    });

    const persist = render(<PersistentDrawerLeft />);
    expect(persist);
    const canLogOut = persist.getByText("Sair");
    const userName = persist.getByText(/user name/i);
    expect(canLogOut).toBeInTheDocument();
    expect(userName).toBeInTheDocument();

    const menuIcon = screen.getByTestId("menu-icon-id");
    await act(async () => {
      fireEvent.click(menuIcon);
    });
    await waitFor(() => {
      const linkDashAbout = expect(persist.findByTestId("menu-item-link-id/about"));
      const linkDashBoard = expect(persist.findByTestId("menu-item-link-id/"));
      const linkFees = expect(persist.getByTestId("menu-item-link-id/faturas"));
    });
  });
});

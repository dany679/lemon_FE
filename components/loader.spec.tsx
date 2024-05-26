import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("Loader component", () => {
  it("should render the loader container", () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId("loader-id");
    expect(loaderContainer).toBeInTheDocument();
  });

  it("should render the spinning logo image", () => {
    render(<Loader />);
    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
  });

  it("should render the loading text", () => {
    render(<Loader />);
    const loadingText = screen.getByText("Lumi esta carregando...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should apply the correct CSS classes", () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId("loader-id");
    expect(loaderContainer).toHaveClass("h-full flex flex-col gap-4 items-center");
    const logoContainer = screen.getByAltText("logo").parentElement;
    expect(logoContainer).toHaveClass("w-10 h-10 relative animate-spin");
    const loadingText = screen.getByText("Lumi esta carregando...");
    expect(loadingText).toHaveClass("text-sm text-muted-foreground");
  });
});

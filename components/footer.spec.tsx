import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer component", () => {
  it("renders the copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2024 Danie Rosa/i);
    expect(copyrightText).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByTestId("link-github");
    expect(githubLink).toHaveAttribute("href", "https://github.com/dany679");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");
  });

  it("renders the LinkedIn link", () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId("link-linkedin");
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/danie-dev/");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noreferrer");
  });

  it("applies the correct CSS classes", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    const copyrightText = screen.getByText(/© 2024 Danie Rosa/i);
    expect(copyrightText.parentElement);
    const githubIcon = screen.getByTestId("link-github").firstChild;
    expect(githubIcon).toHaveClass("button_icons mx-2 text-gray-800 hover:text-gray-500");
    const linkedinIcon = screen.getByTestId("link-linkedin").firstChild;
    expect(linkedinIcon).toHaveClass("button_icons mx-2 text-sky-800 hover:text-sky-500");
  });
});

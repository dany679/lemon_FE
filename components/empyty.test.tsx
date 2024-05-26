import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Empty from "./empty";

describe("ButtonClear component", () => {
  it("renders without crashing", () => {
    render(<Empty label="Nothing here" />);
    // No errors mean the component renders successfully
  });
  it("should have h4 element", () => {
    render(<Empty label="Nothing here" />);
    const h4Element = screen.getByText("Nothing here", { selector: "h4" });
    expect(h4Element);
  });
});

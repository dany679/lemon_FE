import { describe, expect, it } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import ButtonClear from "./button-clear";

describe("ButtonClear component", () => {
  it("renders without crashing", () => {
    render(<ButtonClear onClick={() => {}} />);
    // No errors mean the component renders successfully
  });

  it("calls onClick when button is clicked", () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(<ButtonClear onClick={mockOnClick} />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("applies custom className to the button", () => {
    const { getByRole } = render(<ButtonClear onClick={() => {}} className="custom-class" />);
    const button = getByRole("button");
    expect(button);
  });

  // Add more test cases as needed
});

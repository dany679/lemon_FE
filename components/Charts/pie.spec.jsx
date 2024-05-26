import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Pie from "./pie";

describe("Pie component", () => {
  it("renders the pie chart correctly", () => {
    const data = [
      { name: "Category 1", value: 10 },
      { name: "Category 2", value: 20 },
      { name: "Category 3", value: 15 },
    ];

    render(<Pie data={data} />);

    const slices = screen.getAllByTestId("pie-slice");
    expect(slices).toHaveLength(3);
  });

  it("renders the category names correctly", () => {
    const data = [
      { name: "Category 1", value: 10 },
      { name: "Category 2", value: 20 },
      { name: "Category 3", value: 15 },
    ];

    render(<Pie data={data} />);

    const categoryNames = screen.getAllByTestId("category-name");
    expect(categoryNames).toHaveLength(3);

    expect(categoryNames[0]).toHaveTextContent("Category 1");
    expect(categoryNames[1]).toHaveTextContent("Category 2");
    expect(categoryNames[2]).toHaveTextContent("Category 3");
  });

  it("renders an empty chart when no data is provided", () => {
    render(<Pie data={[]} />);

    const slices = screen.queryAllByTestId("pie-slice");
    expect(slices).toHaveLength(0);

    const categoryNames = screen.queryAllByTestId("category-name");
    expect(categoryNames).toHaveLength(0);
  });

  it("renders the correct slice sizes based on data values", () => {
    const data = [
      { name: "Category 1", value: 10 },
      { name: "Category 2", value: 20 },
      { name: "Category 3", value: 30 },
    ];

    render(<Pie data={data} />);

    const slices = screen.getAllByTestId("pie-slice");
    expect(slices[0]).toHaveStyle("--slice-percent: 16.67%");
    expect(slices[1]).toHaveStyle("--slice-percent: 33.33%");
    expect(slices[2]).toHaveStyle("--slice-percent: 50%");
  });
});

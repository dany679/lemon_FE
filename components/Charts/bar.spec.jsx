import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
const Bar = require("./bar").default;

describe("Bar component", () => {
  it("renders the bar chart correctly", () => {
    const data = [
      { name: "Category 1", value: 10 },
      { name: "Category 2", value: 20 },
      { name: "Category 3", value: 15 },
    ];

    render(
      <div>
        <Bar data={data} />
      </div>
    );
  });

  it("renders the category names correctly", () => {
    const data = [
      { name: "Category 1", value: 10 },
      { name: "Category 2", value: 20 },
      { name: "Category 3", value: 15 },
    ];

    render(<Bar data={data} />);

    const categoryNames = screen.getAllByTestId("category-name");
    expect(categoryNames).toHaveLength(3);

    expect(categoryNames[0]).toHaveTextContent("Category 1");
    expect(categoryNames[1]).toHaveTextContent("Category 2");
    expect(categoryNames[2]).toHaveTextContent("Category 3");
  });

  it("renders an empty chart when no data is provided", () => {
    render(<Bar data={[]} />);

    const bars = screen.queryAllByTestId("bar");
    expect(bars).toHaveLength(0);

    const categoryNames = screen.queryAllByTestId("category-name");
    expect(categoryNames).toHaveLength(0);
  });
});

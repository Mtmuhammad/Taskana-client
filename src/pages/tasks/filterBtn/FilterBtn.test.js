import React from "react";
import { render, screen } from "@testing-library/react";
import FilterBtn from "./FilterBtn";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<FilterBtn />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<FilterBtn />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("filter btn", () => {
  test("should render filter btn", () => {
    render(<FilterBtn />, { wrapper: BrowserRouter });
    const btn = screen.getByTestId("filter-btn");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("task-filter");
  });
  test("should render filter icon", () => {
    render(<FilterBtn />, { wrapper: BrowserRouter });
    const icon = screen.getByTestId("filter-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("task-filter-icon");
  });
  test("should render filter title", () => {
    render(<FilterBtn />, { wrapper: BrowserRouter });
    const title = screen.getByTestId("filter-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("task-filter-title");
  });
  test("should render filter number", () => {
    render(<FilterBtn />, { wrapper: BrowserRouter });
    const number = screen.getByTestId("filter-number");
    expect(number).toBeInTheDocument();
    expect(number).toHaveClass("task-filter-count badge badge-pill px-3");
  });
});

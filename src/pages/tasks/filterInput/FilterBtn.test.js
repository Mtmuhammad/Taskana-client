import React from "react";
import { render, screen } from "@testing-library/react";
import FilterInput from "./FilterInput";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<FilterInput />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<FilterInput />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("filter input", () => {
  test("should render filter input container", () => {
    render(<FilterInput />, { wrapper: BrowserRouter });
    const container = screen.getByTestId("input-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("input-group searchbar");
  });
  test("should render filter input icon", () => {
    render(<FilterInput />, { wrapper: BrowserRouter });
    const icon = screen.getByTestId("input-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("input-group-text text-muted");
  });
  test("should render filter input", () => {
    render(<FilterInput />, { wrapper: BrowserRouter });
    const input = screen.getByTestId("input-search");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("form-control");
  });
});

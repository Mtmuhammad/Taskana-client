import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<Breadcrumb page="Dashboard" />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<Breadcrumb page="Dashboard" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("breadcrumb", () => {
  test("should render breadcrumb", () => {
    render(<Breadcrumb page="Dashboard" />);
    const breadcrumb = screen.getByTestId("breadcrumb");
    expect(breadcrumb).toBeInTheDocument();
    expect(breadcrumb).toHaveClass("page-breadcrumb");
  });
  test("should render breadcrumb title", () => {
    render(<Breadcrumb page="Dashboard" />);
    const title = screen.getByTestId("breadcrumb-title");
    expect(title).toBeInTheDocument();
  });
  test("should render breadcrumb pages", () => {
    render(<Breadcrumb page="Dashboard" />);
    const title = screen.getByTestId("pages");
    expect(title).toBeInTheDocument();
  });
});

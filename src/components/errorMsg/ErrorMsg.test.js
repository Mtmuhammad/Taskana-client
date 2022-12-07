import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMsg from "./ErrorMsg";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<ErrorMsg />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<ErrorMsg />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("error msg", () => {
  test("should render error msg container", () => {
    render(<ErrorMsg />);
    const container = screen.getByTestId("error-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "msg d-flex justify-content-between alert alert-danger alert-dismissible fade show"
    );
  });
  test("should render error msg", () => {
    render(<ErrorMsg />);
    const msg = screen.getByTestId("error-msg");
    expect(msg).toBeInTheDocument();
  });
  test("should render error msg icon", () => {
    render(<ErrorMsg />);
    const icon = screen.getByTestId("error-msg-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("close text-danger bx bx-x");
  });
}); 

import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessMsg from "./SuccessMsg";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<SuccessMsg />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<SuccessMsg />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("error msg", () => {
  test("should render error msg container", () => {
    render(<SuccessMsg />);
    const container = screen.getByTestId("success-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "msg d-flex justify-content-between alert alert-success alert-dismissible fade show"
    );
  });
  test("should render error msg", () => {
    render(<SuccessMsg />);
    const msg = screen.getByTestId("success-msg");
    expect(msg).toBeInTheDocument();
  });
  test("should render error msg icon", () => {
    render(<SuccessMsg />);
    const icon = screen.getByTestId("success-msg-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("close text-success bx bx-x");
  });
});

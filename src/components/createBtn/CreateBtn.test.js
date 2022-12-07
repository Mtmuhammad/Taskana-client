import React from "react";
import { render, screen } from "@testing-library/react";
import CreateBtn from "./CreateBtn";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<CreateBtn name="Project" />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<CreateBtn name="Project" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("create btn", () => {
  test("should render btn container", () => {
    render(<CreateBtn name="Project" />);
    const container = screen.getByTestId("btn-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("mb-5 d-flex justify-content-end");
  });
  test("should render btn", () => {
    render(<CreateBtn name="Project" />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("btn create-btn");
  });
  test("should render btn icon", () => {
    render(<CreateBtn name="Project" />);
    const icon = screen.getByTestId("btn-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("me-2 bx bxs-plus-circle");
  });
});

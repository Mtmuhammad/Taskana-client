import React from "react";
import { render, screen } from "@testing-library/react";
import CreateModal from "./CreateModal";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<CreateModal />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("create modal", () => {
  test("should render modal", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const modal = screen.getByTestId("create-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("modal fade");
  });
  test("should render modal header", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("modal-title");
    expect(header).toContainHTML("Create Task");
  });
  test("should render close btn (x)", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const close = screen.getByTestId("close-btn");
    expect(close).toBeInTheDocument();
    expect(close).toHaveClass("btn-close");
  });
  test("should render inputs", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const inputs = screen.getAllByTestId("input");
    expect(inputs.length).toBe(3);
  });
  test("should render cancel button", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("cancel-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-secondary");
  });
  test("should render create button", () => {
    render(<CreateModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("create-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-success");
  });
});

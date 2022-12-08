import React from "react";
import { render, screen } from "@testing-library/react";
import DeleteModal from "./DeleteModal";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<DeleteModal />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("create modal", () => {
  test("should render modal", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const modal = screen.getByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("modal fade");
  });
  test("should render modal header", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("modal-title");
    expect(header).toContainHTML("Delete item Permanently?");
  });
  test("should render close btn (x)", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const close = screen.getByTestId("close-btn");
    expect(close).toBeInTheDocument();
    expect(close).toHaveClass("btn-close");
  });
  test("should render delete icon", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const icon = screen.getByTestId("delete-icon");
    expect(icon).toHaveClass("bx bxs-trash text-danger");
  });
  test("should render delete text", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const text = screen.getByTestId("delete-text");
    expect(text).toHaveClass("text-center");
  });
  test("should render cancel button", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("cancel-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-secondary");
  });
  test("should render create button", () => {
    render(<DeleteModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("delete-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-danger");
  });
});

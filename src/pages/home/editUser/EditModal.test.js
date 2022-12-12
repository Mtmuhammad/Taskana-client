import React from "react";
import { render, screen } from "@testing-library/react";
import EditModal from "./EditModal";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => { 
    render(<EditModal />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<EditModal />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("create modal", () => {
  test("should render modal", () => {
    render(<EditModal />, { wrapper: BrowserRouter });
    const modal = screen.getByTestId("edit-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("modal fade");
  });
  test("should render modal header", () => {
    render(<EditModal />, { wrapper: BrowserRouter });
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("modal-title");
    expect(header).toContainHTML("Edit User");
  });
  test("should render close btn (x)", () => {
    render(<EditModal />, { wrapper: BrowserRouter });
    const close = screen.getByTestId("close-btn");
    expect(close).toBeInTheDocument();
    expect(close).toHaveClass("btn-close");
  });
  test("should render inputs", () => {
   render(<EditModal />, { wrapper: BrowserRouter });
   const inputs = screen.getAllByTestId("input");
   expect(inputs.length).toBe(3);
 });
  test("should render cancel button", () => {
    render(<EditModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("cancel-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-secondary");
  });
  test("should render create button", () => {
    render(<EditModal />, { wrapper: BrowserRouter });
    const cancel = screen.getByTestId("edit-btn");
    expect(cancel).toBeInTheDocument();
    expect(cancel).toHaveClass("btn-success");
  });
});

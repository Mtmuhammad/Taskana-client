import React from "react";
import { render, screen } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<TaskItem />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("task item", () => {
  test("should render task item container", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const container = screen.getByTestId("task-item");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      "task-item p-3 border-bottom position-relative"
    );
  });
  test("should render task checkbox", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const checkbox = screen.getByTestId("task-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("form-check-input flex-shrink-0 me-3");
  });
  test("should render task title", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const title = screen.getByTestId("task-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("fs-4");
  });
  test("should render task description", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const description = screen.getByTestId("task-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("fs-3");
  });
  test("should render task date", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const date = screen.getByTestId("task-date");
    expect(date).toBeInTheDocument();
    expect(date).toHaveClass("fs-2 text-muted");
  });
  test("should render task btn group", () => {
    render(<TaskItem />, { wrapper: BrowserRouter });
    const btnGroup = screen.getByTestId("task-btn-group");
    expect(btnGroup).toBeInTheDocument();
    expect(btnGroup).toHaveClass("mt-3");

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});

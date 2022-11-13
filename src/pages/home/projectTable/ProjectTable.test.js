import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectTable from "./ProjectTable";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<ProjectTable />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<ProjectTable />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("project-table", () => {
  test("should render a project table", () => {
    render(<ProjectTable />, { wrapper: BrowserRouter });
    const table = screen.getByTestId("project-table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("table-style card");
  });

  test("should render table heading", () => {
    render(<ProjectTable />, { wrapper: BrowserRouter });
    const heading = screen.getByText("Projects");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("card-title");
  });

  test("should render table headers", () => {
    render(<ProjectTable />, { wrapper: BrowserRouter });
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(4);
  });
});

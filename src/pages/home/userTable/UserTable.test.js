import React from "react";
import { render, screen } from "@testing-library/react";
import UserTable from "./UserTable";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<UserTable />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<UserTable />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("user-table", () => {
  test("should render a project table", () => {
    render(<UserTable />, { wrapper: BrowserRouter });
    const table = screen.getByTestId("user-table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("table-style card");
  });

  test("should render table heading", () => {
    render(<UserTable />, { wrapper: BrowserRouter });
    const heading = screen.getByText("Team Members");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("card-title");
  });

  test("should render table headers", () => {
    render(<UserTable />, { wrapper: BrowserRouter });
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(4);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import TicketBox from "./TicketBox";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<TicketBox />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<TicketBox />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ticket box", () => {
  test("should render ticket box", () => {
    render(<TicketBox />, { wrapper: BrowserRouter });
    const container = screen.getByTestId("ticket-box");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("mb-4 ticketBox card");
  });
  test("should render ticket box body", () => {
    render(<TicketBox />, { wrapper: BrowserRouter });
    const body = screen.getByTestId("ticket-box-body");
    expect(body).toBeInTheDocument();
    expect(body).toHaveClass("px-5 py-3 rounded text-center");
  });
  test("should render ticket box number", () => {
    render(<TicketBox />, { wrapper: BrowserRouter });
    const number = screen.getByTestId("ticket-box-number");
    expect(number).toBeInTheDocument();
  });
  test("should render ticket box title", () => {
    render(<TicketBox />, { wrapper: BrowserRouter });
    const number = screen.getByTestId("ticket-box-title");
    expect(number).toBeInTheDocument();
  });
});

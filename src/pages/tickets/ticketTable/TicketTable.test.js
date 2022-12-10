import React from "react";
import { render} from "@testing-library/react";
import TicketTable from "./TicketTable";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<TicketTable />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<TicketTable />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});


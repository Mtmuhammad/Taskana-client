import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import {BrowserRouter} from "react-router-dom"


describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<Sidebar/>, {wrapper: BrowserRouter});
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<Sidebar />, {wrapper: BrowserRouter});
    expect(asFragment()).toMatchSnapshot();
  });
});

test("should render nav", () => {
   render(<Sidebar/>, {wrapper: BrowserRouter});
   const nav = screen.getByRole("navigation")
   expect(nav).toBeInTheDocument()
   expect(nav).toHaveClass("sidebar")
})

describe("header", () => {
   test("should render header", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const header = screen.getByRole("banner")
      expect(header).toBeInTheDocument()
   })
   test("should render header image", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const img = screen.getByRole("img")
      expect(img).toBeInTheDocument()
   })
})

describe("nav links", () => {
   test("should render nav links", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const links = screen.getAllByTestId("sidebar-link")
      expect(links.length).toBe(7)
   })
})
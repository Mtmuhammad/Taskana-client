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
   test("should render user first name", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const firstName = screen.getByTestId("first-name")
      expect(firstName).toBeInTheDocument()
      expect(firstName).toHaveClass("name")
   })
   test("should render user last name", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const lastName = screen.getByTestId("last-name")
      expect(lastName).toBeInTheDocument()
      expect(lastName).toHaveClass("name")
   })
   test("should render user role", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const empRole = screen.getByTestId("role")
      expect(empRole).toBeInTheDocument()
      expect(empRole).toHaveClass("role")
   })
})

describe("nav links", () => {
   test("should render nav links", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const links = screen.getAllByTestId("sidebar-link")
      expect(links.length).toBe(5)
   })

   test("should render toggle switch", () => {
      render(<Sidebar/>, {wrapper: BrowserRouter});
      const toggle = screen.getByTestId("toggle-switch")
      expect(toggle).toBeInTheDocument()
      expect(toggle).toHaveClass("toggle-switch")
   })
})
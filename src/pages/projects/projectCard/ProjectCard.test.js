import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}} />, { wrapper: BrowserRouter });
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("project card", () => {
  test("should render project card", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const card = screen.getByTestId("project-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("project-card card");
  });
  test("should render project name", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const name = screen.getByTestId("project-header");
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("h3 fw-bold");
  });
  test("should render project icons", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const icons = screen.getAllByTestId("project-card-icon");
    expect(icons.length).toBe(4);
  });
  test("should render project date", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const date = screen.getByTestId("project-date");
    expect(date).toBeInTheDocument();
    expect(date).toHaveClass("ms-2");
  });
  test("should render project deadline", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const deadline = screen.getByTestId("project-deadline");
    expect(deadline).toBeInTheDocument();
    expect(deadline).toHaveClass("ms-2");
  });
  test("should render project status", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const status = screen.getByTestId("project-status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("ms-2");
  });
  test("should render project tickets", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}}/>, { wrapper: BrowserRouter });
    const tickets = screen.getByTestId("project-tickets");
    expect(tickets).toBeInTheDocument();
    expect(tickets).toHaveClass("ms-2");
  });
  test("should render project description", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}} />, { wrapper: BrowserRouter });
    const description = screen.getByTestId("project-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("mt-4 h5");
  });
  test("should render project progress", () => {
    render(<ProjectCard project={{deadline: "07-22-22"}} />, { wrapper: BrowserRouter });
    const progress = screen.getByTestId("project-progress");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass("progress");
  });
});

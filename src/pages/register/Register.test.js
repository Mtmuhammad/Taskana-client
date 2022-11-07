import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom"

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<Register /> , {wrapper: BrowserRouter});
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<Register /> , {wrapper: BrowserRouter});
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("navbar brand", () => {
  test("should render logo", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });
});

describe("register form", () => {
  test("should render register form", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const form = screen.getByTestId("register-form");
    expect(form).toBeInTheDocument();
  });

  test("should render firstName input", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("First Name");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("First Name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render lastName input", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("Last Name");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("Last Name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render email input", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("E-mail");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("E-mail address");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render password input", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("Password");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render confirm password input", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("Confirm Password");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("Re-enter password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render empRole select field", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const label = screen.getByText("Employee Role");
    expect(label).toHaveClass("text-muted m-0");
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass("form-select");

    expect(
      screen.getByRole("option", { name: "Choose a role:" }).selected
    ).toBe(true);
    expect(screen.getAllByRole("option").length).toBe(7);
  });
});

describe("submit btn", () => {
  test("should render", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("btn btn-block w-100 my-5");
    expect(btn).toHaveTextContent("Sign Up");
    expect(btn.disabled).toBe(true);
  });

  test("should enable btn when fields are valid", () => {
    render(<Register />, {wrapper: BrowserRouter});
    const btn = screen.getByRole("button");
    expect(btn.disabled).toBe(true);

    userEvent.type(screen.getByPlaceholderText("First Name"), "Marcellus");
    userEvent.type(screen.getByPlaceholderText("Last Name"), "Muhammad");
    userEvent.type(
      screen.getByPlaceholderText("E-mail address"),
      "marcellustm@yahoo.com"
    );
    userEvent.type(screen.getByPlaceholderText("Password"), "Password1!");
    userEvent.type(
      screen.getByPlaceholderText("Re-enter password"),
      "Password1!"
    );
    userEvent.selectOptions(screen.getByRole("combobox"), "Software Engineer");
    expect(btn.disabled).toBe(false);
  });
});

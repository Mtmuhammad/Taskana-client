import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(<Login />);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("navbar brand", () => {
  test("should render logo", () => {
    render(<Login />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });
});

describe("register form", () => {
  test("should render register form", () => {
    render(<Login />);
    const form = screen.getByTestId("register-form");
    expect(form).toBeInTheDocument();
  });

  test("should render email input", () => {
    render(<Login />);
    const label = screen.getByText("E-mail");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("E-mail address");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  test("should render password input", () => {
    render(<Login />);
    const label = screen.getByText("Password");
    expect(label).toHaveClass("text-muted m-0");
    const input = screen.getByPlaceholderText("Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "form-control form-control-lg bg rounded-0 mt-n3"
    );
  });
  
});

describe("submit btn", () => {
  test("should render", () => {
    render(<Login />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("btn btn-block w-100 my-5");
    expect(btn).toHaveTextContent("Login");
    expect(btn.disabled).toBe(true);
  });

  test("should enable btn when fields are valid", () => {
    render(<Login />);
    const btn = screen.getByRole("button");
    expect(btn.disabled).toBe(true);
    userEvent.type(
      screen.getByPlaceholderText("E-mail address"),
      "marcellustm@yahoo.com"
    );
    userEvent.type(screen.getByPlaceholderText("Password"), "Password1!");
    expect(btn.disabled).toBe(false);
  });
});

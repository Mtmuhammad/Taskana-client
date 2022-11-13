import React from "react";
import { render, screen } from "@testing-library/react";
import HomeBox from "./HomeBox";
import { BrowserRouter } from "react-router-dom";

describe("smoke and snapshot tests", () => {
  test("should render without crashing", () => {
    render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("homebox", () => {
  test("should render homebox", () => {
    render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
    const homeBox = screen.getByTestId("homebox");
    expect(homeBox).toBeInTheDocument();
    expect(homeBox).toHaveClass("card homebox");
  });
  test("should render homebox body", () => {
    render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
    const body = screen.getByTestId("homebox-body");
    expect(body).toBeInTheDocument();
    expect(body).toHaveClass("card-body");
  });
  test("should render icon background", () => {
    render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
    const body = screen.getByTestId("icon-bg");
    expect(body).toBeInTheDocument();
    expect(body).toHaveClass("box-icon rounded-circle");

    const icon = screen.getByTestId("homebox-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("bx bx-briefcase-alt icon");
  });
  test("should render homebox text", () => {
    render(
      <HomeBox
        bgColor="#00d09c90"
        number="1"
        type="Projects"
        icon="bx bx-briefcase-alt icon"
      />,
      { wrapper: BrowserRouter }
    );
    const count = screen.getByTestId("homebox-count");
    expect(count).toBeInTheDocument();
    const type = screen.getByTestId("homebox-type");
    expect(type).toBeInTheDocument();
  });
});
